/* HTTP adapter shared by the demo's views. Remote writes never settle locally. */
(function () {
  'use strict';
  const S = window.YK_STORE;
  const CONFIG_KEY = 'yukomon-api-config-v1';
  const DEVICE_KEY = 'yukomon-device-key-v1';
  const MAP_CACHE_TTL = 60000;
  const hosted = !!(window.YK_RUNTIME?.hosted && window.YK_RUNTIME?.production);
  const serviceBase = window.YK_RUNTIME?.apiBase || location.origin;
  let config;
  try { config = JSON.parse(localStorage.getItem(CONFIG_KEY) || '{}') || {}; } catch { config = {}; }
  let remote = false, connected = false, applying = false, saveTimer, lastProfile = '';
  let cache = null, generation = 0, mapGeneration = 0;
  let services = window.YK_RUNTIME || {};
  const profiles = new Map(), uploads = new Map(), mapCache = new Map(), mapLoads = new Map();
  const originals = Object.fromEntries(['checkin', 'encounter', 'removeCatch', 'updateCatch', 'toggleLike', 'likesOf', 'rankOf', 'ladderRankOf', 'sizeRankOf', 'profileOf', 'mapCells', 'precheck', 'wipe', 'reset'].map(k => [k, S[k]]));
  const notice = message => document.dispatchEvent(new CustomEvent('yk-notice', { detail: message }));
  function persist() {
    const saved = { ...config };
    if (window.YK_RUNTIME?.native) delete saved.token;
    localStorage.setItem(CONFIG_KEY, JSON.stringify(saved));
  }
  async function persistSession() {
    if (window.YK_NATIVE?.session) await window.YK_NATIVE.session.set(config.token || '');
    persist();
  }
  function invalidateMap() {
    mapGeneration++;
    mapCache.clear(); mapLoads.clear();
  }
  function clearAccount() {
    generation++;
    invalidateMap();
    clearTimeout(saveTimer); uploads.clear(); profiles.clear(); cache = null;
    applying = true;
    try {
      S.replace({ v: 2, me: { id: 'me', nickname: '新钓友', city: '杭州', bio: '' },
        settings: { sfx: true, haptics: true }, catches: [], cards: {}, ranks: {}, ladderRanks: {}, sizeRanks: {},
        rank: { points: 0, tier: '初见', stars: 0 }, rankEvents: [], setProgress: {}, gear: {}, gearHistory: {},
        draft: null, likes: {}, mapSettings: { enabled: false }, remoteAccount: `${config.base}|pending` });
    } finally { applying = false; }
    document.dispatchEvent(new Event('yk-data-ready'));
  }
  function normalizeBase(value) {
    const url = new URL(value);
    if (url.username || url.password || url.search || url.hash || !['http:', 'https:'].includes(url.protocol)) throw new Error('请输入完整的 HTTPS 服务地址');
    if (url.protocol !== 'https:' && !['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) throw new Error('远程服务必须使用 HTTPS');
    return url.href.replace(/\/$/, '');
  }
  async function request(path, options = {}) {
    const started = generation;
    const headers = { ...options.headers };
    if (config.token && !options.anonymous) headers.Authorization = `Bearer ${config.token}`;
    if (options.body && !(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';
    let response;
    try { response = await fetch(`${config.base || ''}/api${path}`, { ...options, headers, signal: AbortSignal.timeout(options.body instanceof FormData ? 120000 : path === '/recognition' ? 60000 : 20000) }); }
    catch { connected = false; const error = new Error('无法连接服务器，草稿已保留，请检查连接后重试'); error.code = 'NETWORK'; throw error; }
    let data = null;
    if (response.status !== 204) {
      try { data = await response.json(); }
      catch { const error = new Error(response.status >= 500 ? '服务器繁忙，请稍后重试' : '请求未完成，请重试'); error.code = response.status >= 500 ? 'UPSTREAM' : 'BAD_RESPONSE'; throw error; }
    }
    if (started !== generation) { const error = new Error('账号已切换，请重试'); error.code = 'ACCOUNT_CHANGED'; throw error; }
    if (!response.ok) {
      const error = new Error(data?.error?.message || '请求未完成，请重试'); error.code = data?.error?.code;
      if (error.code === 'UNAUTHORIZED') {
        config.token = ''; delete config.pending; persist();
        try { await persistSession(); } catch { notice('安全存储暂不可用，请重新登录'); }
        clearAccount();
        document.dispatchEvent(new Event('yk-auth-required'));
      }
      throw error;
    }
    connected = true;
    return data;
  }
  const json = (method, body) => ({ method, body: JSON.stringify(body) });
  const absolute = value => value?.startsWith('/api/') ? `${config.base || location.origin}${value}` : value;
  function mapCatch(c) { return { ...c, photo: absolute(c.photo), videoUrl: absolute(c.videoUrl) }; }
  function apply(snapshot) {
    cache = snapshot;
    const old = S.db;
    applying = true;
    try {
      const sameAccount = old.remoteAccount === `${config.base}|${snapshot.me.serverId}`;
      S.replace({ ...snapshot, catches: snapshot.catches.map(mapCatch), gear: sameAccount ? old.gear || {} : {}, gearHistory: sameAccount ? old.gearHistory || {} : {}, draft: sameAccount ? old.draft || null : null, mapSettings: snapshot.mapSettings || (sameAccount ? old.mapSettings || { enabled: false } : { enabled: false }), likes: {}, remoteAccount: `${config.base}|${snapshot.me.serverId}` });
      Object.assign(window.YK_AUDIO.settings, snapshot.settings);
      lastProfile = profileBody();
    } finally { applying = false; }
  }
  const profileBody = () => JSON.stringify({ nickname: S.db.me.nickname, city: S.db.me.city, bio: S.db.me.bio, settings: S.db.settings });
  async function refresh() { invalidateMap(); apply(await request('/bootstrap')); }
  async function refreshServices() {
    const health = await request('/health');
    services = health.services || {};
    services.wechatLogin = !!health.wechatLogin;
    window.YK_MAP_PROVIDER?.configure({ key: services.map?.browserKey || '' });
    return health;
  }
  async function upload(blob, filename) {
    const form = new FormData(); form.append('file', blob, filename);
    return request('/media', { method: 'POST', body: form });
  }
  async function prepare(form, includeVideo = true) {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(form.photo));
    const identity = Array.from(new Uint8Array(digest), n => n.toString(16).padStart(2, '0')).join('');
    let item = uploads.get(identity);
    if (!item && config.pending?.identity === identity) item = config.pending.media;
    if (!item) {
      const blob = await (await fetch(form.photo)).blob();
      const photo = await upload(blob, 'catch.jpg');
      item = { mediaId: photo.id, videoId: null };
      uploads.set(identity, item);
    }
    if (includeVideo && form.videoId && !item.videoId) {
      const blob = await window.YK_MEDIA.get(form.videoId);
      if (!blob) throw new Error('找不到视频，请重新选择');
      item.videoId = (await upload(blob, blob.type.includes('webm') ? 'catch.webm' : 'catch.mp4')).id;
    }
    config.pending = { ...config.pending, identity, media: item }; persist();
    return item;
  }
  async function create(form, speciesId, protectedIndex) {
    if (!connected) await request('/health');
    const media = await prepare(form);
    const body = { ...media, source: form.source === 'camera' && !form.sample ? 'camera' : form.sample ? 'sample' : 'album',
      speciesId, protectedIndex, desc: form.desc.trim(), gear: form.gear, location: form.location,
      lengthCm: form.lengthCm ? Number(form.lengthCm) : null, released: !!form.released,
      mapVisibility: form.source === 'camera' && !form.sample ? (form.mapVisibility || 'private') : 'private',
      recognitionStatus: form.recognitionStatus || 'manual', recognitionProvider: form.recognitionProvider || 'manual',
      recognitionModel: form.recognitionModel || null, recognitionConfidence: form.recognitionConfidence ?? null,
      recognitionCandidates: form.recognitionCandidates || [] };
    // Persist the key in the draft before sending so a lost response is safe to retry after reload.
    const fingerprint = JSON.stringify(body);
    if (config.pending.fingerprint !== fingerprint) { config.pending.key = crypto.randomUUID(); config.pending.fingerprint = fingerprint; }
    persist();
    const response = await request('/catches', { ...json('POST', body), headers: { 'Idempotency-Key': config.pending.key } });
    await refresh();
    delete config.pending; persist(); uploads.clear();
    response.catchObj = mapCatch(response.catchObj);
    return response;
  }
  function install() {
    remote = true;
    S.checkin = (form, speciesId) => create(form, speciesId);
    S.encounter = async (form, p) => (await create({ ...form, desc: form.desc || `遇见${p.name}，已放归` }, undefined, S.PROTECTED.indexOf(p))).catchObj;
    S.removeCatch = async id => { const snapshot = await request(`/catches/${id}`, { method: 'DELETE' }); invalidateMap(); apply(snapshot); };
    S.updateCatch = async (id, patch) => { await request(`/catches/${id}`, json('PATCH', patch)); await refresh(); };
    S.likesOf = c => ({ count: c.likesBase || 0, liked: !!c.liked });
    S.toggleLike = async c => {
      const result = await request(`/catches/${c.id}/like`, json('PUT', { liked: !c.liked }));
      c.liked = result.liked; c.likesBase = result.count; return result;
    };
    S.rankOf = scope => cache?.ranks?.[scope] || { top: [], me: null, total: 0 };
    S.ladderRankOf = scope => cache?.ladderRanks?.[scope] || { top: [], me: null, total: 0 };
    S.sizeRankOf = (speciesId, scope) => cache?.sizeRanks?.[scope]?.[speciesId] || { top: [], me: null, total: 0 };
    S.mapCells = filters => {
      const key = JSON.stringify(filters || {}), cached = mapCache.get(key);
      if (cached && cached.expiresAt > Date.now()) return cached.cells;
      if (cached) mapCache.delete(key);
      if (!mapLoads.has(key)) {
        const started = mapGeneration;
        const query = new URLSearchParams(Object.entries(filters || {}).filter(([, value]) => value && value !== 'all'));
        const load = request(`/map/cells${query.toString() ? `?${query}` : ''}`).then(result => {
          if (started !== mapGeneration) return [];
          mapCache.set(key, { cells: result.cells || [], expiresAt: Date.now() + MAP_CACHE_TTL });
          mapLoads.delete(key);
          document.dispatchEvent(new CustomEvent('yk-map-ready', { detail: { key } }));
          return result.cells || [];
        }).catch(error => {
          if (started !== mapGeneration) return [];
          mapLoads.delete(key);
          notice(error.message);
          return [];
        });
        mapLoads.set(key, load);
      }
      return [];
    };
    S.profileOf = id => profiles.get(id);
    S.fetchProfile = async id => { const p = await request(`/users/${encodeURIComponent(id)}`); p.catches = p.catches.map(mapCatch); profiles.set(id, p); };
    S.precheck = () => null;
    S.wipe = async () => { const snapshot = await request('/me/catches', { method: 'DELETE' }); invalidateMap(); apply(snapshot); };
    S.reset = () => { throw new Error('在线账号不能恢复演示数据；请先断开服务连接'); };
  }
  async function connect(base, token) {
    const previous = { ...config };
    const localBackup = !remote && !S.db.remoteAccount ? JSON.stringify(S.db) : null;
    const nextBase = hosted && base === location.origin ? base : normalizeBase(base);
    config = nextBase === config.base ? { ...config, token: token || config.token } : { base: nextBase, token };
    try {
    const health = await refreshServices();
    if (!config.token) {
      if (!health.devLogin) { const error = new Error('请登录账号后继续'); error.code = 'LOGIN_REQUIRED'; throw error; }
      let key = localStorage.getItem(DEVICE_KEY);
      if (!key) { key = crypto.randomUUID() + crypto.randomUUID(); localStorage.setItem(DEVICE_KEY, key); }
      const auth = await request('/auth/dev', json('POST', { deviceKey: key }));
      config.token = auth.token;
    }
    try { await refresh(); }
    catch (error) {
      if (error.code !== 'UNAUTHORIZED' || !health.devLogin) throw error;
      config.token = (await request('/auth/dev', json('POST', { deviceKey: localStorage.getItem(DEVICE_KEY) }))).token;
      await refresh();
    }
    if (localBackup) localStorage.setItem('yukomon-local-demo-backup', localBackup);
    delete config.mode;
    await persistSession(); install();
    document.dispatchEvent(new Event('yk-data-ready'));
    } catch (error) { config = previous; connected = false; throw error; }
  }
  async function init() {
    await window.YK_NATIVE_READY;
    if (window.YK_NATIVE?.session) {
      try { config.token = await window.YK_NATIVE.session.get(); }
      catch { config.token = ''; notice('安全会话读取失败，请重新登录'); }
    }
    const url = new URL(location.href);
    const fragment = new URLSearchParams(url.hash.slice(1));
    const testSession = fragment.get('testSession');
    if (hosted && !window.YK_RUNTIME?.native && testSession) {
      fragment.delete('testSession'); url.hash = fragment.toString();
      history.replaceState(null, '', url);
      if (/^[A-Za-z0-9_-]{43}$/.test(testSession)) config = { base: location.origin, token: testSession };
    }
    if (hosted) {
      if (config.base !== serviceBase) config = { base: serviceBase, token: window.YK_RUNTIME?.native ? config.token : '' };
      delete config.mode;
      install();
      if (S.db.remoteAccount === `${config.base}|${S.db.me.serverId}`) cache = S.db;
      else {
        S.replace({ ...S.db, me: { id: 'me', nickname: '新钓友', city: '杭州', bio: '' }, catches: [], cards: {}, ranks: {}, ladderRanks: {}, sizeRanks: {}, rank: { points: 0, tier: '初见', stars: 0 }, rankEvents: [], setProgress: {}, remoteAccount: `${config.base}|pending` });
      }
      document.dispatchEvent(new Event('yk-data-ready'));
      try { await connect(serviceBase); }
      catch (error) {
        connected = false;
        if (['LOGIN_REQUIRED', 'UNAUTHORIZED'].includes(error.code)) document.dispatchEvent(new Event('yk-auth-required'));
        else notice(error.message);
      }
      return;
    }
    if (url.searchParams.get('demo') === '1') {
      disconnect();
      S.fillDemo();
      url.searchParams.delete('demo');
      history.replaceState(null, '', url);
      document.dispatchEvent(new Event('yk-data-ready'));
      return;
    }
    if (config.mode === 'demo') return;
    if (config.base) {
      // Keep remote accounts read-only when temporarily offline, never fall back to local settlement.
      if (S.db.remoteAccount) { install(); cache = S.db; }
      try { await connect(config.base); } catch (e) { notice(e.message); }
    } else if (['localhost', '127.0.0.1'].includes(location.hostname)) {
      try {
        const response = await fetch('/api/health', { signal: AbortSignal.timeout(2000) });
        if (response.ok && (await response.json()).storage === 'sqlite') await connect(location.origin);
      } catch { /* Static preview remains usable without a service. */ }
    }
  }
  function disconnect() {
    if (hosted) throw new Error('线上服务无法切换到本机演示');
    clearTimeout(saveTimer);
    const wasRemote = remote || !!S.db.remoteAccount;
    if (wasRemote) localStorage.setItem('yukomon-last-cloud-cache', JSON.stringify(S.db));
    config = { mode: 'demo' }; persist(); remote = connected = false; invalidateMap();
    Object.assign(S, originals); delete S.fetchProfile;
    // Preserve the cloud cache separately; a demo must never reuse its server IDs.
    const saved = wasRemote && localStorage.getItem('yukomon-local-demo-backup');
    if (saved) { try { S.replace(JSON.parse(saved)); } catch { S.reset(); } }
    else if (wasRemote) S.reset();
    Object.assign(window.YK_AUDIO.settings, S.db.settings);
    document.dispatchEvent(new Event('yk-data-ready'));
  }
  document.addEventListener('yk-store-save', () => {
    if (!remote || applying) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(async () => {
      const body = profileBody(); if (body === lastProfile) return;
      try { await request('/me', { method: 'PATCH', body }); lastProfile = body; }
      catch (error) { notice(error.message); }
    }, 400);
  });
  window.YK_API = {
    init, connect, disconnect, refresh, request, refreshServices,
    get remote() { return remote; }, get connected() { return connected; }, get base() { return config.base || ''; },
    get hosted() { return hosted; },
    get authenticated() { return !!config.token; },
    get services() { return services; },
    async account(action, body) {
      if (!['register', 'login', 'recover', 'password', 'recovery-code', 'wechat'].includes(action)) throw new Error('账号操作无效');
      if (!config.base) config.base = hosted ? serviceBase : location.origin;
      const result = await request(`/auth/${action}`, { ...json('POST', body), anonymous: ['register', 'login', 'recover', 'wechat'].includes(action) });
      if (result.token) {
        generation++;
        config = { base: config.base, token: result.token };
        clearAccount(); install();
        try { await persistSession(); } catch { notice('安全存储暂不可用，请勿关闭应用；下次启动需要重新登录'); }
        try { await refreshServices(); } catch { notice('账号操作已成功，服务状态暂未同步，请稍后重试'); }
        try { await refresh(); document.dispatchEvent(new Event('yk-data-ready')); }
        catch { notice('账号操作已成功，记录暂未同步，请稍后刷新'); }
      }
      return result;
    },
    async logout() {
      if (config.token) await request('/auth/logout', json('POST', {}));
      config.token = ''; delete config.pending; persist();
      try { await persistSession(); } catch { notice('安全存储暂不可用，旧会话已退出'); }
      clearAccount();
    },
    async deleteAccount() {
      await request('/me', { method: 'DELETE' });
      config.token = ''; delete config.pending; persist();
      try { await persistSession(); } catch { notice('安全存储暂不可用，账号已注销'); }
      clearAccount();
    },
    async recognize(form, { force = false } = {}) {
      if (!remote) throw new Error('请先连接服务器，再使用 AI 识别');
      if (!connected || !services.recognition?.enabled) await refreshServices();
      if (!services.recognition?.enabled) throw new Error('AI 识别尚未配置，请手动选择鱼种');
      if (window.YK_ACCOUNT && !await window.YK_ACCOUNT.consentAI()) throw new Error('已取消 AI 识别，可手动选择鱼种');
      const media = await prepare(form, false);
      // The model link is occasionally slow: retry transient failures automatically before surfacing an error.
      for (let attempt = 0; ; attempt++) {
        try { return await request('/recognition', json('POST', { mediaId: media.mediaId, force: force || attempt > 0 })); }
        catch (error) {
          const transient = ['AI_UNAVAILABLE', 'AI_BUSY', 'NETWORK', 'UPSTREAM'].includes(error.code);
          if (!transient || attempt >= 2) throw error;
          if (typeof document !== 'undefined') document.dispatchEvent(new CustomEvent('yk-ai-retry', { detail: { attempt: attempt + 1 } }));
          await new Promise(resolve => setTimeout(resolve, 1500 * (attempt + 1)));
        }
      }
    },
    async reverseGeocode(lat, lng, coordType = 'wgs84') { return request('/map/reverse-geocode', json('POST', { lat, lng, coordType })); },
    async mapSettings() {
      if (!remote || !config.token) throw new Error('请先登录账号，再设置地图共享');
      const settings = await request('/me/map-settings');
      if (typeof settings?.enabled !== 'boolean') throw new Error('地图共享状态无法确认，请重试');
      S.db.mapSettings = { enabled: settings.enabled }; S.save();
      return S.db.mapSettings;
    },
    async setMapSharing(enabled) {
      if (!remote || !config.token) throw new Error('请先登录账号，再设置地图共享');
      if (typeof enabled !== 'boolean') throw new Error('地图共享设置无效');
      const settings = await request('/me/map-settings', json('PATCH', { enabled }));
      if (settings?.enabled !== enabled) throw new Error('地图共享设置未保存，请重试');
      S.db.mapSettings = { enabled }; S.save();
      invalidateMap();
      document.dispatchEvent(new Event('yk-map-ready'));
      return S.db.mapSettings;
    },
    async share(catchId, ur) { return request('/shares', json('POST', { catchId, ur })); },
    async shared(id, base) {
      const shareBase = base ? normalizeBase(base) : config.base || location.origin;
      const response = await fetch(`${shareBase}/api/shares/${encodeURIComponent(id)}`, { signal: AbortSignal.timeout(20000), credentials: 'omit' });
      const p = await response.json(); if (!response.ok) throw new Error(p.error?.message || '分享链接已失效');
      if (p.photo?.startsWith('/api/')) p.photo = `${shareBase}${p.photo}`;
      if (p.videoUrl?.startsWith('/api/')) p.videoUrl = `${shareBase}${p.videoUrl}`;
      return p;
    },
    async exportData() {
      const data = remote ? await request('/me/export') : S.db;
      if (window.YK_NATIVE?.exportText) return window.YK_NATIVE.exportText('yukomon-records.json', JSON.stringify(data, null, 2));
      const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
      const a = document.createElement('a'); a.href = url; a.download = 'yukomon-records.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  };
})();
