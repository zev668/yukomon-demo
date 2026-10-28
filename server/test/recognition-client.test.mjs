import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { randomUUID, webcrypto } from 'node:crypto';
import { runInNewContext } from 'node:vm';

const apiSource = readFileSync(new URL('../../demo/js/api.js', import.meta.url), 'utf8');
const appSource = readFileSync(new URL('../../demo/js/app.js', import.meta.url), 'utf8');
const recognitionSource = appSource.slice(appSource.indexOf('  const recognitionTasks = new WeakMap();'), appSource.indexOf('  function scorePreviewHTMLV2('));

function recognitionContext(recognize) {
  const state = { tab: 'catch', draft: null };
  let saves = 0;
  const context = {
    state, publishStep: 'edit', crypto: { randomUUID }, S: { byId: { '001': {}, '002': {} } },
    window: { YK_API: { recognize } }, saveDraft() { saves++; }, render() {}
  };
  runInNewContext(recognitionSource + '\nglobalThis.recognition = { ensureDraftV2, recognizeFish, confirmRecognition };', context);
  return { ...context.recognition, state, get saves() { return saves; } };
}

function adapterFixture({ failHealth = 0, failMapSave = false, mapSaveResult, mapCellFetch } = {}) {
  const requests = [], settings = new Map(), document = new EventTarget();
  let healthCalls = 0;
  let mapEnabled = false;
  let now = Date.now();
  const store = { db: { me: {}, settings: {}, catches: [] }, replace(value) { this.db = value; }, save() {} };
  const snapshot = { me: { id: 'me', serverId: 'account-1', nickname: 'Angler', city: '杭州', bio: '' }, settings: {}, catches: [], cards: {} };
  const mapConfigs = [];
  const window = {
    YK_RUNTIME: { hosted: true, production: true, native: true, apiBase: 'https://api.example.test' },
    YK_STORE: store, YK_AUDIO: { settings: {} }, YK_MAP_PROVIDER: { configure(value) { mapConfigs.push(value); } },
    YK_ACCOUNT: { async consentAI() { return true; } }
  };
  const context = {
    window, document, location: { origin: 'https://localhost', href: 'https://localhost/', hostname: 'localhost' },
    localStorage: { getItem(key) { return settings.get(key) || null; }, setItem(key, value) { settings.set(key, value); } },
    Event, CustomEvent, URL, URLSearchParams, AbortSignal, FormData, Blob, TextEncoder,
    Date: class extends Date { static now() { return now; } },
    crypto: { randomUUID, subtle: webcrypto.subtle }, setTimeout, clearTimeout,
    async fetch(url, options = {}) {
      requests.push({ url, options });
      if (url.startsWith('data:')) return new Response(new Blob(['photo'], { type: 'image/jpeg' }));
      const path = new URL(url).pathname;
      if (path === '/api/health') {
        healthCalls++;
        if (healthCalls <= failHealth) throw new Error('fixture connection failure');
        return Response.json({ devLogin: false, services: { recognition: { enabled: true, provider: 'fixture', model: 'fixture-vision' }, map: { browserKey: 'fixture-map-key' } } });
      }
      if (path === '/api/auth/login') return Response.json({ token: 'fixture-token', expiresAt: 1, me: snapshot.me });
      if (path === '/api/bootstrap') return Response.json(snapshot);
      if (path === '/api/catches' && options.method === 'POST') return Response.json({ catchObj: { id: 'fixture-catch' } });
      if (path.startsWith('/api/catches/') && options.method === 'PATCH') return Response.json({});
      if ((path.startsWith('/api/catches/') || path === '/api/me/catches') && options.method === 'DELETE') return Response.json(snapshot);
      if (path === '/api/me/map-settings') {
        if (options.method === 'PATCH') {
          if (failMapSave) return Response.json({ error: { code: 'MAP_SAVE_FAILED', message: 'fixture save failed' } }, { status: 503 });
          mapEnabled = JSON.parse(options.body).enabled;
          return Response.json(mapSaveResult ?? { enabled: mapEnabled });
        }
        return Response.json({ enabled: mapEnabled });
      }
      if (path === '/api/map/cells' && mapCellFetch) return mapCellFetch();
      if (path === '/api/media') return Response.json({ id: 'fixture-media' });
      if (path === '/api/recognition') return Response.json({ candidates: [{ speciesId: '001', confidence: 0 }], provider: 'fixture', model: 'fixture-vision' });
      throw new Error(`Unexpected fixture path: ${path}`);
    }
  };
  runInNewContext(apiSource, context);
  return { api: window.YK_API, store, requests, mapConfigs, advance(ms) { now += ms; }, get healthCalls() { return healthCalls; } };
}

test('a restored pending draft restarts recognition but rendering an active task does not duplicate it', async () => {
  let calls = 0, release;
  const f = recognitionContext(async (draft, options) => {
    calls++;
    assert.equal(options.force, false);
    await new Promise(resolve => { release = resolve; });
    return { candidates: [{ speciesId: '001', confidence: 0 }], provider: 'fixture', model: 'fixture-vision' };
  });
  const draft = { photo: 'data:image/jpeg;base64,AAAA', recognitionStatus: 'pending', recognitionToken: 'from-previous-process' };
  f.state.draft = draft;
  f.ensureDraftV2(draft);
  assert.equal(draft.recognitionStatus, 'idle'); assert.equal(draft.recognitionToken, null);
  const pending = f.recognizeFish(draft);
  assert.equal(draft.recognitionStatus, 'pending');
  f.ensureDraftV2(draft);
  assert.equal(draft.recognitionStatus, 'pending');
  await f.recognizeFish(draft); assert.equal(calls, 1);
  release(); await pending;
  assert.equal(draft.recognitionStatus, 'suggested');
  assert.equal(f.confirmRecognition(draft, '001'), true);
  assert.equal(draft.recognitionConfidence, 0);
  assert.equal(f.confirmRecognition(draft, '002'), false);
});

test('explicit recognition retry forwards force and discards the result of an older task', async () => {
  const pending = [];
  const f = recognitionContext((draft, options) => new Promise(resolve => pending.push({ resolve, force: options.force })));
  const draft = { photo: 'photo', recognitionStatus: 'idle' }; f.state.draft = draft;
  const first = f.recognizeFish(draft), second = f.recognizeFish(draft, true);
  assert.deepEqual(pending.map(item => item.force), [false, true]);
  pending[1].resolve({ candidates: [{ speciesId: '002', confidence: 0 }], provider: 'fixture', model: 'new' });
  await second;
  pending[0].resolve({ candidates: [{ speciesId: '001', confidence: .9 }], provider: 'fixture', model: 'old' });
  await first;
  assert.equal(draft.recognitionModel, 'new');
  assert.equal(draft.recognitionCandidates[0].speciesId, '002');
});

test('login refreshes provider status after an initial health failure and sends the force flag', async () => {
  const f = adapterFixture({ failHealth: 1 });
  await f.api.init();
  assert.equal(f.healthCalls, 1); assert.equal(f.api.connected, false);
  await f.api.account('login', { username: 'angler', password: 'fixture password' });
  assert.equal(f.healthCalls, 2); assert.equal(f.api.services.recognition.enabled, true);
  assert.equal(f.store.db.me.serverId, 'account-1');
  assert.equal(f.mapConfigs.at(-1).key, 'fixture-map-key');
  const draft = { photo: 'data:image/jpeg;base64,AAAA' };
  const result = await f.api.recognize(draft, { force: true });
  assert.equal(result.candidates[0].confidence, 0);
  await f.api.recognize(draft);
  const bodies = f.requests.filter(request => request.url.endsWith('/api/recognition')).map(request => JSON.parse(request.options.body));
  assert.deepEqual(bodies, [{ mediaId: 'fixture-media', force: true }, { mediaId: 'fixture-media', force: false }]);
  assert.equal(f.requests.filter(request => request.url.endsWith('/api/media')).length, 1);
});

test('a temporary health failure after successful login preserves the new session and retries status before recognition', async () => {
  const f = adapterFixture({ failHealth: 2 });
  await f.api.init();
  const result = await f.api.account('login', { username: 'angler', password: 'fixture password' });
  assert.equal(result.token, 'fixture-token'); assert.equal(f.api.authenticated, true);
  assert.equal(f.store.db.me.serverId, 'account-1');
  await f.api.recognize({ photo: 'data:image/jpeg;base64,AAAA' });
  assert.equal(f.healthCalls, 3);
  const recognition = f.requests.find(request => request.url.endsWith('/api/recognition'));
  assert.equal(recognition.options.headers.Authorization, 'Bearer fixture-token');
});

test('map sharing reads the server default, saves through PATCH and survives same-account bootstrap refresh', async () => {
  const f = adapterFixture();
  await f.api.account('login', { username: 'angler', password: 'fixture password' });
  assert.equal(f.store.db.mapSettings.enabled, false);
  assert.equal((await f.api.mapSettings()).enabled, false);
  assert.equal((await f.api.setMapSharing(true)).enabled, true);
  assert.equal(f.store.db.mapSettings.enabled, true);
  await f.api.refresh();
  assert.equal(f.store.db.mapSettings.enabled, true);
  const update = f.requests.find(request => request.url.endsWith('/api/me/map-settings') && request.options.method === 'PATCH');
  assert.deepEqual(JSON.parse(update.options.body), { enabled: true });
  assert.equal((await f.api.setMapSharing(false)).enabled, false);
});

test('map sharing does not commit local success on failed or mismatched server responses', async () => {
  for (const options of [{ failMapSave: true }, { mapSaveResult: { enabled: false } }]) {
    const f = adapterFixture(options);
    await f.api.account('login', { username: 'angler', password: 'fixture password' });
    await f.api.mapSettings();
    await assert.rejects(f.api.setMapSharing(true));
    assert.equal(f.store.db.mapSettings.enabled, false);
  }
});

test('a sharing change discards an older in-flight map response instead of restoring stale visible cells', async () => {
  let mapCalls = 0, finishOld;
  const f = adapterFixture({ mapCellFetch() {
    if (++mapCalls === 1) return new Promise(resolve => { finishOld = resolve; });
    return Response.json({ cells: [{ id: 'current-cell' }] });
  } });
  await f.api.account('login', { username: 'angler', password: 'fixture password' });
  const filters = { city: '杭州' };
  assert.equal(f.store.mapCells(filters).length, 0);
  await f.api.setMapSharing(false);
  finishOld(Response.json({ cells: [{ id: 'stale-cell' }] }));
  await new Promise(setImmediate);
  assert.equal(f.store.mapCells(filters).length, 0);
  await new Promise(setImmediate);
  assert.equal(f.store.mapCells(filters)[0].id, 'current-cell');
  assert.equal(mapCalls, 2);
});

test('map cells expire after 60 seconds and deduplicate the replacement request', async () => {
  let mapCalls = 0;
  const f = adapterFixture({ mapCellFetch() { return Response.json({ cells: [{ id: `cell-${++mapCalls}` }] }); } });
  await f.api.account('login', { username: 'angler', password: 'fixture password' });
  const filters = { city: '杭州' };
  assert.equal(f.store.mapCells(filters).length, 0);
  assert.equal(f.store.mapCells(filters).length, 0);
  await new Promise(setImmediate);
  assert.equal(f.store.mapCells(filters)[0].id, 'cell-1');
  f.advance(59999);
  assert.equal(f.store.mapCells(filters)[0].id, 'cell-1');
  assert.equal(mapCalls, 1);
  f.advance(1);
  assert.equal(f.store.mapCells(filters).length, 0);
  assert.equal(f.store.mapCells(filters).length, 0);
  await new Promise(setImmediate);
  assert.equal(f.store.mapCells(filters)[0].id, 'cell-2');
  assert.equal(mapCalls, 2);
});

const catchMutations = {
  create: f => f.store.checkin({ photo: 'data:image/jpeg;base64,AAAA', source: 'camera', desc: '', gear: {}, location: {}, lengthCm: 10 }, '001'),
  update: f => f.store.updateCatch('fixture-catch', { mapVisibility: 'private' }),
  delete: f => f.store.removeCatch('fixture-catch'),
  wipe: f => f.store.wipe()
};

for (const [name, mutate] of Object.entries(catchMutations)) {
  test(`${name} catch invalidates cached map cells and rejects a pre-mutation response`, async () => {
    let mapCalls = 0, finishOld;
    const f = adapterFixture({ mapCellFetch() {
      const call = ++mapCalls;
      if (call === 2) return new Promise(resolve => { finishOld = resolve; });
      return Response.json({ cells: [{ id: `cell-${call}` }] });
    } });
    await f.api.account('login', { username: 'angler', password: 'fixture password' });
    const filters = { city: '杭州' }, pendingFilters = { city: '上海' };
    f.store.mapCells(filters);
    await new Promise(setImmediate);
    assert.equal(f.store.mapCells(filters)[0].id, 'cell-1');
    f.store.mapCells(pendingFilters);
    await mutate(f);
    assert.equal(f.store.mapCells(filters).length, 0);
    assert.equal(f.store.mapCells(pendingFilters).length, 0);
    await new Promise(setImmediate);
    assert.equal(f.store.mapCells(filters)[0].id, 'cell-3');
    assert.equal(f.store.mapCells(pendingFilters)[0].id, 'cell-4');
    finishOld(Response.json({ cells: [{ id: 'stale-cell' }] }));
    await new Promise(setImmediate);
    assert.equal(f.store.mapCells(pendingFilters)[0].id, 'cell-4');
    assert.equal(mapCalls, 4);
  });
}

function mapSharingUI(api) {
  const accountSource = readFileSync(new URL('../../demo/js/account.js', import.meta.url), 'utf8');
  const source = accountSource.slice(accountSource.indexOf('  function mountMapSharing('), accountSource.indexOf('  function mountSettings('));
  const makeControl = () => {
    const attributes = {}, classes = new Set();
    return { disabled: false, hidden: false, textContent: '',
      setAttribute(key, value) { attributes[key] = value; }, getAttribute(key) { return attributes[key]; },
      classList: { toggle(key, enabled) { if (enabled) classes.add(key); else classes.delete(key); }, contains(key) { return classes.has(key); } }
    };
  };
  const toggle = makeControl(), status = makeControl(), retry = makeControl();
  const group = { isConnected: true, querySelector(selector) { return ({ '[data-map-sharing]': toggle, '[data-map-sharing-status]': status, '[data-map-sharing-retry]': retry })[selector]; } };
  const context = { api: () => api };
  runInNewContext(source + '\nglobalThis.mountMapSharingUI = mountMapSharing;', context);
  return { toggle, status, retry, load: () => context.mountMapSharingUI(group, true) };
}

test('map sharing UI stays disabled until loaded and never optimistically reports a failed save', async () => {
  let finishLoad, saves = 0;
  const f = mapSharingUI({
    mapSettings: () => new Promise(resolve => { finishLoad = resolve; }),
    async setMapSharing(enabled) { saves++; if (saves === 1) throw new Error('fixture save failed'); return { enabled }; }
  });
  const loading = f.load();
  assert.equal(f.toggle.disabled, true); assert.equal(f.toggle.getAttribute('aria-checked'), 'false');
  await f.toggle.onclick(); assert.equal(saves, 0);
  finishLoad({ enabled: false }); await loading;
  assert.equal(f.toggle.disabled, false);
  await f.toggle.onclick();
  assert.equal(f.toggle.getAttribute('aria-checked'), 'false');
  assert.match(f.status.textContent, /fixture save failed/);
  await f.toggle.onclick();
  assert.equal(f.toggle.getAttribute('aria-checked'), 'true');
  assert.equal(f.toggle.disabled, false);
});

test('map sharing UI exposes a real retry after a failed load', async () => {
  let loads = 0;
  const f = mapSharingUI({ async mapSettings() { if (++loads === 1) throw new Error('fixture load failed'); return { enabled: true }; } });
  await f.load();
  assert.equal(f.toggle.disabled, true); assert.equal(f.retry.hidden, false);
  await f.retry.onclick();
  assert.equal(f.toggle.disabled, false); assert.equal(f.retry.hidden, true);
  assert.equal(f.toggle.getAttribute('aria-checked'), 'true');
});
