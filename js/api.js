/* HTTP adapter shared by the demo's views. Remote writes never settle locally. */
(function () {
  'use strict';
  const S = window.YK_STORE;
  const CONFIG_KEY = 'yukomon-api-config-v1';
  const DEVICE_KEY = 'yukomon-device-key-v1';
  let config;
  try { config = JSON.parse(localStorage.getItem(CONFIG_KEY) || '{}') || {}; } catch { config = {}; }
  let remote = false, connected = false, applying = false, saveTimer, lastProfile = '';
  let cache = null;
  const profiles = new Map(), uploads = new Map();
  const originals = Object.fromEntries(['checkin', 'encounter', 'removeCatch', 'updateCatch', 'toggleLike', 'likesOf', 'rankOf', 'sizeRankOf', 'profileOf', 'precheck', 'wipe', 'reset'].map(k => [k, S[k]]));
  const notice = message => document.dispatchEvent(new CustomEvent('yk-notice', { detail: message }));
  function persist() { localStorage.setItem(CONFIG_KEY, JSON.stringify(config)); }
  function normalizeBase(value) {
    const url = new URL(value);
    if (url.username || url.password || url.search || url.hash || !['http:', 'https:'].includes(url.protocol)) throw new Error('请输入完整的 HTTPS 服务地址');
    if (url.protocol !== 'https:' && !['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) throw new Error('远程服务必须使用 HTTPS');
    return url.href.replace(/\/$/, '');
  }
  async function request(path, options = {}) {
    const headers = { ...options.headers };
    if (config.token) headers.Authorization = `Bearer ${config.token}`;
    if (options.body && !(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';
    let response;
    try { response = await fetch(`${config.base || ''}/api${path}`, { ...options, headers, signal: AbortSignal.timeout(options.body instanceof FormData ? 120000 : 20000) }); }
    catch { connected = false; throw new Error('无法连接服务器，草稿已保留，请检查连接后重试'); }
    const data = response.status === 204 ? null : await response.json();
    if (!response.ok) { const error = new Error(data?.error?.message || '请求未完成，请重试'); error.code = data?.error?.code; throw error; }
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
      S.replace({ ...snapshot, catches: snapshot.catches.map(mapCatch), gear: old.gear || {}, gearHistory: old.gearHistory || { rod: [], reel: [], line: [], bait: [] }, draft: old.draft || null, likes: {}, remoteAccount: `${config.base}|${snapshot.me.serverId}` });
      Object.assign(window.YK_AUDIO.settings, snapshot.settings);
      lastProfile = profileBody();
    } finally { applying = false; }
  }
  const profileBody = () => JSON.stringify({ nickname: S.db.me.nickname, city: S.db.me.city, bio: S.db.me.bio, settings: S.db.settings });
  async function refresh() { apply(await request('/bootstrap')); }
  async function upload(blob, filename) {
    const form = new FormData(); form.append('file', blob, filename);
    return request('/media', { method: 'POST', body: form });
  }
  async function prepare(form) {
    const identity = `${window.YK_FISH.hash(form.photo)}|${form.videoId || ''}`;
    let item = uploads.get(identity);
    if (!item && config.pending?.identity === identity) item = config.pending.media;
    if (!item) {
      const blob = await (await fetch(form.photo)).blob();
      const photo = await upload(blob, 'catch.jpg');
      item = { mediaId: photo.id, videoId: null };
      uploads.set(identity, item);
    }
    if (form.videoId && !item.videoId) {
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
      lengthCm: form.lengthCm ? Number(form.lengthCm) : null, released: !!form.released };
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
    S.removeCatch = async id => { apply(await request(`/catches/${id}`, { method: 'DELETE' })); };
    S.updateCatch = async (id, patch) => { await request(`/catches/${id}`, json('PATCH', patch)); await refresh(); };
    S.likesOf = c => ({ count: c.likesBase || 0, liked: !!c.liked });
    S.toggleLike = async c => {
      const result = await request(`/catches/${c.id}/like`, json('PUT', { liked: !c.liked }));
      c.liked = result.liked; c.likesBase = result.count; return result;
    };
    S.rankOf = scope => cache?.ranks[scope] || { top: [], me: null, total: 0 };
    S.sizeRankOf = (id, scope) => cache?.sizeRanks[scope]?.[id] || { top: [], me: null, total: 0 };
    S.profileOf = id => profiles.get(id);
    S.fetchProfile = async id => { const p = await request(`/users/${encodeURIComponent(id)}`); p.catches = p.catches.map(mapCatch); profiles.set(id, p); };
    S.precheck = () => null;
    S.wipe = async () => { apply(await request('/me/catches', { method: 'DELETE' })); };
    S.reset = () => { throw new Error('在线账号不能恢复演示数据；请先断开服务连接'); };
  }
  async function connect(base, token) {
    const previous = { ...config };
    const localBackup = !remote && !S.db.remoteAccount ? JSON.stringify(S.db) : null;
    const nextBase = normalizeBase(base);
    config = nextBase === config.base ? { ...config, token: token || config.token } : { base: nextBase, token };
    try {
    const health = await request('/health');
    if (!config.token) {
      if (!health.devLogin) throw new Error('此服务需要微信登录，请使用微信小程序连接');
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
    persist(); install();
    document.dispatchEvent(new Event('yk-data-ready'));
    } catch (error) { config = previous; throw error; }
  }
  async function init() {
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
    clearTimeout(saveTimer); config = {}; persist(); remote = connected = false;
    Object.assign(S, originals); delete S.fetchProfile;
    // Preserve the cloud cache separately; a demo must never reuse its server IDs.
    localStorage.setItem('yukomon-last-cloud-cache', JSON.stringify(S.db));
    const saved = localStorage.getItem('yukomon-local-demo-backup');
    if (saved) { try { S.replace(JSON.parse(saved)); } catch { S.reset(); } }
    else S.reset();
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
    init, connect, disconnect, refresh, request,
    get remote() { return remote; }, get connected() { return connected; }, get base() { return config.base || ''; },
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
      const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
      const a = document.createElement('a'); a.href = url; a.download = 'yukomon-records.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  };
})();
