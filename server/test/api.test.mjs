import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, readdirSync, readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { DatabaseSync } from 'node:sqlite';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';
import { createApp } from '../app.mjs';
import { createProviders, ProviderError } from '../providers.mjs';

async function fixture(options = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'yukomon-api-'));
  let now = Date.UTC(2026, 9, 19, 3);
  const service = createApp({ dataDir: dir, now: () => now, ...options });
  const server = service.app.listen(0, '127.0.0.1');
  await new Promise(r => server.once('listening', r));
  const base = `http://127.0.0.1:${server.address().port}`;
  async function api(path, { token, method = 'GET', body, key, expected = 200, rawBody, headers } = {}) {
    const response = await fetch(base + '/api' + path, {
      method, headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(body ? { 'Content-Type': 'application/json' } : {}), ...(key ? { 'Idempotency-Key': key } : {}), ...headers },
      body: rawBody || (body ? JSON.stringify(body) : undefined)
    });
    const data = response.status === 204 ? null : await response.json();
    assert.equal(response.status, expected, `${method} ${path}: ${JSON.stringify(data)}`);
    return data;
  }
  const login = () => api('/auth/dev', { method: 'POST', body: { deviceKey: randomUUID() + randomUUID() } });
  let photoIndex = 0;
  async function upload(token, extra = {}) {
    const color = ++photoIndex;
    const bytes = await sharp({ create: { width: 32, height: 32, channels: 3, background: { r: color % 255, g: (color * 7) % 255, b: 130 } } }).png().toBuffer();
    const form = new FormData(); form.append('file', new Blob([bytes], { type: 'image/png' }), 'photo.png');
    return api('/media', { method: 'POST', token, rawBody: form, expected: 201, ...extra });
  }
  async function caught(token, patch = {}, extra = {}) {
    const media = await upload(token);
    const body = { mediaId: media.id, speciesId: '001', source: 'camera', desc: '测试渔获', location: { city: '杭州', district: '西湖', place: '私密钓点', lat: 30.12345, lng: 120.12345 }, lengthCm: 20, released: true, ...patch };
    const key = randomUUID();
    return { result: await api('/catches', { method: 'POST', token, body, key, expected: 201, ...extra }), body, key, media };
  }
  return { ...service, base, api, login, upload, caught, advance(ms = 61000) { now += ms; }, async closeAll({ preserve = false } = {}) { await new Promise(r => server.close(r)); service.close(); if (!preserve) rmSync(dir, { recursive: true, force: true }); } };
}

test('recognition verifies media ownership, deduplicates requests and persists cached results', async () => {
  let calls = 0, release;
  const providers = {
    config: { recognition: { enabled: true, provider: 'test', model: 'fixture-v1' }, map: { browserKey: '', geocoding: false } },
    async recognize() { calls++; await new Promise(r => { release = r; }); return { provider: 'test', model: 'fixture-v1', candidates: [{ speciesId: '001', confidence: .8 }] }; }
  };
  const f = await fixture({ providers });
  try {
    const { token } = await f.login(), other = await f.login();
    const media = await f.upload(token);
    await f.api('/recognition', { method: 'POST', body: { mediaId: media.id }, expected: 401 });
    await f.api('/recognition', { method: 'POST', token: other.token, body: { mediaId: media.id }, expected: 400 });
    const first = f.api('/recognition', { method: 'POST', token, body: { mediaId: media.id } });
    while (!release) await new Promise(r => setTimeout(r, 5));
    const second = f.api('/recognition', { method: 'POST', token, body: { mediaId: media.id } });
    release();
    const [a, b] = await Promise.all([first, second]);
    assert.deepEqual(a, b); assert.equal(calls, 1);
    assert.deepEqual(await f.api('/recognition', { method: 'POST', token, body: { mediaId: media.id } }), a);
    assert.equal(f.db.prepare('SELECT count(*) AS n FROM recognition_requests').get().n, 1);
  } finally { await f.closeAll(); }
});

test('forced recognition bypasses cache, validates flags and retains request limits', async () => {
  let calls = 0;
  const providers = {
    config: { recognition: { enabled: true, provider: 'test', model: 'fixture-force' }, map: {} },
    async recognize() { calls++; return { provider: 'test', model: 'fixture-force', candidates: [{ speciesId: calls === 1 ? '001' : '002', confidence: 0 }] }; }
  };
  const f = await fixture({ providers });
  try {
    const { token } = await f.login(), media = await f.upload(token);
    const recognize = (force, expected = 200) => f.api('/recognition', { method: 'POST', token, body: { mediaId: media.id, force }, expected });
    const first = await recognize(false);
    assert.equal(first.candidates[0].speciesId, '001');
    assert.equal(first.candidates[0].confidence, 0);
    assert.deepEqual(await recognize(false), first); assert.equal(calls, 1);
    const next = await recognize(true);
    assert.equal(next.candidates[0].speciesId, '002');
    assert.notEqual(next.recognitionId, first.recognitionId);
    assert.deepEqual(await recognize(false), next); assert.equal(calls, 2);
    await recognize('true', 400); assert.equal(calls, 2);
    for (let i = 0; i < 3; i++) await recognize(true);
    await recognize(true, 429); assert.equal(calls, 5);
    f.advance();
    for (let i = 0; i < 15; i++) { await recognize(true); f.advance(); }
    const limited = await recognize(true, 429);
    assert.equal(limited.error.code, 'AI_DAILY_LIMIT'); assert.equal(calls, 20);
    assert.equal(f.db.prepare('SELECT count(*) AS n FROM recognition_requests').get().n, 20);
    await recognize(false); assert.equal(calls, 20);
  } finally { await f.closeAll(); }
});

test('concurrent forced recognition joins one upstream task instead of consuming extra quota', async () => {
  let calls = 0, release;
  const providers = {
    config: { recognition: { enabled: true, provider: 'test', model: 'fixture-force' }, map: {} },
    async recognize() { calls++; await new Promise(resolve => { release = resolve; }); return { provider: 'test', model: 'fixture-force', candidates: [] }; }
  };
  const f = await fixture({ providers });
  try {
    const { token } = await f.login(), media = await f.upload(token);
    const first = f.api('/recognition', { method: 'POST', token, body: { mediaId: media.id, force: true } });
    while (!release) await new Promise(resolve => setTimeout(resolve, 5));
    const second = f.api('/recognition', { method: 'POST', token, body: { mediaId: media.id, force: true } });
    await new Promise(resolve => setTimeout(resolve, 20));
    release();
    const [a, b] = await Promise.all([first, second]);
    assert.deepEqual(a, b); assert.equal(calls, 1);
    assert.equal(f.db.prepare('SELECT count(*) AS n FROM recognition_requests').get().n, 1);
  } finally { await f.closeAll(); }
});

test('provider configuration stays honest and credentials never enter public runtime', async () => {
  const f = await fixture({ production: true });
  try {
    const health = await f.api('/health');
    assert.equal(health.devLogin, false); assert.equal(health.services.recognition.enabled, false);
    const response = await fetch(f.base + '/api/runtime.js');
    assert.equal(response.status, 200); assert.match(await response.text(), /"production":true/);
    await f.api('/auth/dev', { method: 'POST', headers: { Origin: f.base }, body: { deviceKey: randomUUID() + randomUUID() }, expected: 404 });
  } finally { await f.closeAll(); }
  const disabled = createProviders({});
  await assert.rejects(disabled.recognize(Buffer.from('test')), e => e.code === 'AI_UNCONFIGURED');
  // Without a WebService key GPS is still converted locally (WGS-84 → GCJ-02) with an approximate city.
  const offline = await disabled.reverseGeocode(30.25, 120.15, 'wgs84');
  assert.equal(offline.coordType, 'gcj02'); assert.equal(offline.approximate, true); assert.equal(offline.city, '杭州');
  assert.ok(Math.abs(offline.lat - 30.25) < 0.01 && offline.lng - 120.15 > 0.003);
  const denied = createProviders({ TENCENT_MAP_SERVER_KEY: 'k' }, async () => Response.json({ status: 199, message: '此key未开启WebserviceAPI功能' }));
  assert.equal((await denied.reverseGeocode(31.23, 121.47, 'gcj02')).city, '上海');
});

test('vision and geocoder adapters validate upstream payloads and sanitize failures', async () => {
  const requests = [];
  const providers = createProviders({ AI_BASE_URL: 'https://example.com/v1', AI_API_KEY: 'server-only-secret', AI_MODEL: 'vision-fixture', TENCENT_MAP_SERVER_KEY: 'map-server-secret', TENCENT_MAP_SECRET: 'sign-secret' }, async (url, init) => {
    requests.push({ url, init });
    return Response.json(url.includes('geocoder')
      ? { status: 0, result: { address_component: { city: '杭州市', district: '西湖区' }, address: '地址', location: { lat: 30.2, lng: 120.1 } } }
      : { choices: [{ message: { content: '```json\n{"candidates":[{"speciesId":"001","confidence":0.8},{"speciesId":"999","confidence":0.99},{"speciesId":"001","confidence":0.7}]}\n```' } }] });
  });
  const result = await providers.recognize(Buffer.from('photo'));
  assert.deepEqual(result.candidates, [{ speciesId: '001', confidence: .8 }]);
  const body = JSON.parse(requests[0].init.body);
  assert.equal(body.model, 'vision-fixture'); assert.match(body.messages[1].content.find(part => part.type === 'image_url').image_url.url, /^data:image\/jpeg;base64,/);
  assert.equal((await providers.reverseGeocode(30, 120, 'wgs84')).city, '杭州');
  assert.equal(new URL(requests[1].url).searchParams.get('coord_type'), '1');
  assert.match(new URL(requests[1].url).searchParams.get('sig'), /^[a-f0-9]{32}$/);
  assert.ok(!JSON.stringify(providers.config).includes('secret'));
  const broken = createProviders({ AI_BASE_URL: 'https://example.com/v1', AI_API_KEY: 'private', AI_MODEL: 'fixture' }, async () => Response.json({ error: { message: 'private' } }, { status: 401 }));
  await assert.rejects(broken.recognize(Buffer.from('photo')), e => e.code === 'AI_UNAVAILABLE' && !e.message.includes('private'));
});

test('recognition daily quota also limits failing upstream requests', async () => {
  const providers = { config: { recognition: { enabled: true }, map: {} }, async recognize() { throw new ProviderError(502, 'AI_UNAVAILABLE', '识别失败'); } };
  const f = await fixture({ providers });
  try {
    const { token } = await f.login(), media = await f.upload(token);
    for (let i = 0; i < 20; i++) {
      await f.api('/recognition', { method: 'POST', token, body: { mediaId: media.id }, expected: 502 });
      f.advance();
    }
    await f.api('/recognition', { method: 'POST', token, body: { mediaId: media.id }, expected: 429 });
    assert.equal(f.db.prepare('SELECT count(*) AS n FROM recognition_requests').get().n, 20);
  } finally { await f.closeAll(); }
});

test('catalog and authentication boundaries', async () => {
  const f = await fixture();
  try {
    assert.equal((await f.api('/health')).storage, 'sqlite');
    const catalog = await f.api('/species'); assert.equal(catalog.species.length, 118); assert.equal(catalog.protectedSpecies.length, 32);
    await f.api('/bootstrap', { expected: 401 });
    await f.api('/auth/dev', { method: 'POST', body: { deviceKey: 'short' }, expected: 400 });
    await f.api('/auth/wechat', { method: 'POST', body: { code: 'unconfigured' }, expected: 503 });
    const { token } = await f.login();
    assert.equal((await f.api('/bootstrap', { token })).catches.length, 0);
    await f.api('/me', { token, method: 'PATCH', body: { nickname: '测试钓友', city: '武汉', settings: { sfx: false, haptics: false } } });
    const boot = await f.api('/bootstrap', { token }); assert.equal(boot.me.nickname, '测试钓友'); assert.equal(boot.settings.sfx, false);
    await f.api('/auth/logout', { token, method: 'POST', expected: 204 });
    await f.api('/me', { token, expected: 401 });
  } finally { await f.closeAll(); }
});

test('album, sample and camera records aggregate into cards and lifetime rank', async () => {
  const f = await fixture();
  try {
    const { token } = await f.login();
    const album = await f.caught(token, { source: 'album', lengthCm: 100 });
    assert.deepEqual(album.result.events, ['new']);
    assert.deepEqual(Object.keys(album.result.card).sort(), ['catchCount', 'firstCatchId', 'firstUnlockedAt', 'giant', 'lastCatchAt', 'speciesId']);
    assert.equal(album.result.card.giant.status, 'none');
    assert.equal(album.result.points, 0); assert.equal(album.result.rank.points, 0);
    await f.caught(token, { source: 'sample', lengthCm: 150 });
    const camera = await f.caught(token, { lengthCm: 36 });
    assert.equal(camera.result.card.catchCount, 3); assert.ok(camera.result.points > 0);
    assert.equal(camera.result.card.giant.status, 'approved'); assert.ok(camera.result.events.includes('giant'));
    assert.equal((await f.api('/ranks', { token })).me.uniqueSpeciesCount, 1);
    f.advance();
    await f.caught(token, { lengthCm: 24 });
    const up = await f.caught(token, { lengthCm: 25 }); assert.ok(up.result.scoreEvents.some(event => event.repeatMultiplier === 0.7 || event.repeatMultiplier === 1));
    const after = await f.api(`/catches/${camera.result.catchObj.id}`, { token, method: 'DELETE' });
    assert.equal(after.cards['001'].catchCount, 4); assert.equal(after.rankEvents.some(event => event.catchId === camera.result.catchObj.id), false);
    assert.equal(after.cards['001'].giant.status, 'none');
    assert.equal(after.rank.points < up.result.rank.points, true);
  } finally { await f.closeAll(); }
});

test('UR threshold, repeat records, share variant and deletion recomputation', async () => {
  const f = await fixture();
  try {
    const { token } = await f.login();
    const threshold = (await f.api('/species')).species.find(sp => sp.no === '001').giantThresholdCm;
    assert.equal(threshold, 35);
    const below = await f.caught(token, { lengthCm: threshold - .1 });
    assert.equal(below.result.card.giant.status, 'none');
    const exact = await f.caught(token, { lengthCm: threshold });
    assert.ok(exact.result.events.includes('giant'));
    assert.equal(exact.result.card.giant.catchId, exact.result.catchObj.id);
    const larger = await f.caught(token, { lengthCm: threshold + 10 });
    assert.ok(larger.result.events.includes('giant_record'));
    assert.equal(larger.result.card.giant.lengthCm, threshold + 10);
    f.advance();
    const smaller = await f.caught(token, { lengthCm: threshold + 1 });
    assert.ok(!smaller.result.events.includes('giant_record'));
    assert.equal(smaller.result.card.giant.catchId, larger.result.catchObj.id);
    const urShare = await f.api('/shares', { token, method: 'POST', body: { catchId: larger.result.catchObj.id, ur: true }, expected: 201 });
    assert.equal((await f.api(`/shares/${urShare.id}`)).ur, 1);
    const normalShare = await f.api('/shares', { token, method: 'POST', body: { catchId: larger.result.catchObj.id, ur: false }, expected: 201 });
    assert.equal((await f.api(`/shares/${normalShare.id}`)).ur, 0);
    await f.api('/shares', { token, method: 'POST', body: { catchId: below.result.catchObj.id, ur: true }, expected: 400 });
    const album = await f.caught(token, { source: 'album', lengthCm: threshold + 100 });
    await f.api('/shares', { token, method: 'POST', body: { catchId: album.result.catchObj.id, ur: true }, expected: 400 });
    let snapshot = await f.api(`/catches/${larger.result.catchObj.id}`, { token, method: 'DELETE' });
    assert.equal(snapshot.cards['001'].giant.catchId, smaller.result.catchObj.id);
    await f.api(`/shares/${urShare.id}`, { expected: 404 });
    snapshot = await f.api(`/catches/${smaller.result.catchObj.id}`, { token, method: 'DELETE' });
    assert.equal(snapshot.cards['001'].giant.catchId, exact.result.catchObj.id);
    snapshot = await f.api(`/catches/${exact.result.catchObj.id}`, { token, method: 'DELETE' });
    assert.equal(snapshot.cards['001'].giant.status, 'none');
    assert.equal(snapshot.cards['001'].catchCount, 2);
    assert.equal('stars' in snapshot.cards['001'], false);
  } finally { await f.closeAll(); }
});

test('idempotency replays atomically and invalid requests never consume quota', async () => {
  const f = await fixture();
  try {
    const { token } = await f.login();
    const first = await f.caught(token);
    const results = await Promise.all(Array.from({ length: 8 }, () => f.api('/catches', { token, method: 'POST', body: first.body, key: first.key, expected: 201 })));
    assert.ok(results.every(r => r.catchObj.id === first.result.catchObj.id));
    assert.equal((await f.api('/catches', { token })).total, 1);
    await f.api('/catches', { token, method: 'POST', key: first.key, body: { ...first.body, desc: 'different' }, expected: 409 });
    await f.api('/catches', { token, method: 'POST', key: randomUUID(), body: first.body, expected: 409 });
    for (const lengthCm of [0, -1, 301, 2.45]) await f.api('/catches', { token, method: 'POST', key: randomUUID(), body: { ...first.body, lengthCm }, expected: 400 });
    await f.caught(token); await f.caught(token);
    await f.caught(token, {}, { expected: 429 });
    assert.equal(f.db.prepare('SELECT count(*) AS n FROM submissions').get().n, 3);
    await f.api(`/catches/${first.result.catchObj.id}`, { token, method: 'DELETE' });
    await f.caught(token, {}, { expected: 429 });
  } finally { await f.closeAll(); }
});

test('ownership, private coordinates, deterministic likes and share revocation', async () => {
  const f = await fixture();
  try {
    const a = await f.login(), b = await f.login();
    const post = await f.caught(a.token, { lengthCm: 38 });
    const id = post.result.catchObj.id;
    await f.api(`/catches/${id}`, { token: b.token, method: 'DELETE', expected: 404 });
    await f.api(`/catches/${id}`, { token: b.token, method: 'PATCH', body: { desc: 'hijacked' }, expected: 404 });
    await f.api(`/catches/${id}/like`, { token: a.token, method: 'PUT', body: { liked: true }, expected: 403 });
    const profile = await f.api(`/users/${a.me.serverId}`, { token: b.token });
    assert.deepEqual(profile.catches[0].location, { city: '杭州' }); assert.equal(profile.catches[0].gear, undefined);
    for (let i = 0; i < 3; i++) assert.deepEqual(await f.api(`/catches/${id}/like`, { token: b.token, method: 'PUT', body: { liked: true } }), { liked: true, count: 1 });
    assert.deepEqual(await f.api(`/catches/${id}/like`, { token: b.token, method: 'PUT', body: { liked: false } }), { liked: false, count: 0 });
    const validShare = await f.api('/shares', { token: a.token, method: 'POST', body: { catchId: id }, expected: 201 });
    const shared = await f.api(`/shares/${validShare.id}`); assert.equal(shared.city, '杭州'); assert.equal(shared.v, 2); assert.equal(shared.ur, 1); assert.equal('st' in shared, false); assert.equal(shared.location, undefined);
    const image = await fetch(f.base + shared.photo); assert.equal(image.status, 200); assert.equal(image.headers.get('content-type'), 'image/jpeg');
    await f.api(`/shares/${validShare.id}`, { token: b.token, method: 'DELETE', expected: 404 });
    await f.api(`/catches/${id}`, { token: a.token, method: 'DELETE' });
    await f.api(`/shares/${validShare.id}`, { expected: 404 });
    assert.equal((await fetch(f.base + shared.photo)).status, 404);
  } finally { await f.closeAll(); }
});

test('protected encounter grants no card and its media stays private', async () => {
  const f = await fixture();
  try {
    const a = await f.login(), b = await f.login();
    const post = await f.caught(a.token, { speciesId: undefined, protectedIndex: 0, released: false });
    assert.equal(post.result.catchObj.status, 'protected'); assert.equal(post.result.catchObj.released, true);
    const boot = await f.api('/bootstrap', { token: a.token }); assert.deepEqual(boot.cards, {}); assert.equal(boot.ranks.nation.me, null);
    assert.equal((await f.api(`/users/${a.me.serverId}`, { token: b.token })).catches.length, 0);
    assert.equal((await fetch(f.base + '/api/media/' + post.media.id)).status, 403);
    assert.equal((await fetch(f.base + boot.catches[0].photo)).status, 200);
    await f.api('/shares', { token: a.token, method: 'POST', body: { catchId: post.result.catchObj.id }, expected: 404 });
    await f.api(`/catches/${post.result.catchObj.id}`, { token: a.token, method: 'PATCH', body: { released: false, desc: '修改后的记录' } });
    assert.equal((await f.api('/catches', { token: a.token })).items[0].released, true);
  } finally { await f.closeAll(); }
});

test('uploads reject forged formats and foreign media; failed uploads clean temporary files', async () => {
  const f = await fixture();
  try {
    const a = await f.login(), b = await f.login();
    const media = await f.upload(a.token);
    await f.api('/catches', { token: b.token, method: 'POST', key: randomUUID(), body: { mediaId: media.id, speciesId: '001', source: 'camera', desc: 'test', location: { city: '杭州' } }, expected: 400 });
    for (const type of ['image/png', 'application/javascript']) {
      const form = new FormData(); form.append('file', new Blob(['<script>alert(1)</script>'], { type }), 'bad.png');
      await f.api('/media', { token: a.token, method: 'POST', rawBody: form, expected: 415 });
    }
    assert.equal(readdirSync(join(f.dataDir, 'media')).length, 1);
    await f.api(`/media/${media.id}`, { token: b.token, method: 'DELETE', expected: 404 });
    await f.api(`/media/${media.id}`, { token: a.token, method: 'DELETE', expected: 204 });
    assert.equal(readdirSync(join(f.dataDir, 'media')).length, 0);
  } finally { await f.closeAll(); }
});

test('daily limit survives deletion; new Shanghai day resets limit', async () => {
  const f = await fixture();
  try {
    const { token } = await f.login();
    for (let i = 0; i < 30; i++) { f.advance(); await f.caught(token); }
    f.advance(); await f.caught(token, {}, { expected: 429 });
    await f.api('/me/catches', { token, method: 'DELETE' });
    await f.caught(token, {}, { expected: 429 });
    f.advance(86400000); await f.caught(token);
  } finally { await f.closeAll(); }
});

test('rank sorting uses score, city and album records stay out of the ladder', async () => {
  const f = await fixture();
  try {
    const a = await f.login(), b = await f.login();
    await f.api('/me', { token: b.token, method: 'PATCH', body: { city: '武汉' } });
    await f.caught(a.token, { lengthCm: 22 }); f.advance();
    await f.caught(b.token, { lengthCm: 28 });
    const rank = await f.api('/ranks/ladder', { token: a.token }); assert.equal(rank.top.length, 2); assert.equal(rank.total, 2); assert.equal(rank.me.me, true);
    assert.equal((await f.api('/ranks/ladder?scope=city', { token: a.token })).total, 1);
    assert.equal((await f.api('/rank/me', { token: a.token })).points > 0, true);
    const beforeAlbum = (await f.api('/rank/me', { token: a.token })).points;
    await f.caught(a.token, { source: 'album', lengthCm: 200 });
    assert.equal((await f.api('/rank/me', { token: a.token })).points, beforeAlbum);
  } finally { await f.closeAll(); }
});

test('unlock, per-species size and ladder rankings keep separate data and city scopes', async () => {
  const f = await fixture();
  try {
    const a = await f.login(), b = await f.login(), albumOnly = await f.login();
    await f.api('/me', { token: b.token, method: 'PATCH', body: { city: '武汉' } });
    await f.caught(a.token, { speciesId: '001', lengthCm: 20 }); f.advance();
    await f.caught(a.token, { speciesId: '002', lengthCm: 30 }); f.advance();
    await f.caught(b.token, { speciesId: '001', lengthCm: 40 }); f.advance();
    await f.caught(b.token, { speciesId: '001', lengthCm: 50 }); f.advance();
    const largest = await f.caught(b.token, { speciesId: '001', lengthCm: 60 }); f.advance();
    await f.caught(a.token, { speciesId: '003', source: 'album', lengthCm: 200 }); f.advance();
    await f.caught(a.token, { speciesId: '001', source: 'sample', lengthCm: 300 }); f.advance();
    await f.caught(albumOnly.token, { speciesId: '001', source: 'album', lengthCm: 250 });

    const unlock = await f.api('/ranks', { token: a.token });
    const ladder = await f.api('/ranks/ladder', { token: a.token });
    const size = await f.api('/ranks/size/001', { token: a.token });
    assert.deepEqual(unlock.top.map(u => [u.id, u.count]), [['me', 2], [b.me.serverId, 1]]);
    assert.equal(ladder.top[0].id, b.me.serverId);
    assert.ok(ladder.top[0].points > ladder.top[1].points);
    assert.deepEqual(size.top.map(u => [u.id, u.lengthCm]), [[b.me.serverId, 60], ['me', 20]]);
    assert.equal(size.total, 2, 'repeat catches produce one row per user');
    assert.equal(size.me.rank, 2);
    assert.equal(size.top[0].place, '杭州', 'catch city is display-only; scope uses the user city');
    assert.deepEqual(Object.keys(size.top[0]).sort(), ['at', 'city', 'id', 'lengthCm', 'me', 'nickname', 'place', 'rank']);
    for (const path of ['/ranks', '/ranks/ladder', '/ranks/size/001']) {
      const city = await f.api(`${path}?scope=city`, { token: a.token });
      assert.equal(city.total, 1);
      assert.equal(city.me.rank, 1);
    }
    const boot = await f.api('/bootstrap', { token: a.token });
    assert.deepEqual(boot.ranks.nation, unlock);
    assert.deepEqual(boot.ladderRanks.nation, ladder);
    assert.deepEqual(boot.sizeRanks.nation['001'], size);
    assert.equal(boot.sizeRanks.nation['003'].total, 0);
    const empty = await f.api('/bootstrap', { token: albumOnly.token });
    assert.equal(empty.ranks.nation.me, null);
    assert.equal(empty.ladderRanks.nation.me, null);
    assert.equal(empty.sizeRanks.nation['001'].me, null);
    await f.api(`/catches/${largest.result.catchObj.id}`, { token: b.token, method: 'DELETE' });
    assert.equal((await f.api('/ranks/size/001', { token: a.token })).top[0].lengthCm, 50);
    await f.api('/ranks/size/unknown', { token: a.token, expected: 404 });
  } finally { await f.closeAll(); }
});

test('public map cells expose only grid centers, delay records and ignore album catches', async () => {
  const f = await fixture();
  try {
    const a = await f.login(), b = await f.login(), c = await f.login();
    const location = { city: '杭州', district: '西湖区', place: '公开钓点', lat: 30.12345, lng: 120.12345, coordType: 'gcj02' };
    const created = await f.caught(a.token, { location, mapVisibility: 'grid' });
    assert.equal(created.result.catchObj.location.coordType, 'gcj02');
    await f.caught(b.token, { location, mapVisibility: 'grid' });
    await f.caught(c.token, { location, mapVisibility: 'grid' });
    await f.caught(a.token, { location, source: 'album', mapVisibility: 'grid' });
    assert.deepEqual(await f.api('/me/map-settings', { token: a.token }), { enabled: false });
    assert.deepEqual(await f.api('/me/map-settings', { token: a.token, method: 'PATCH', body: { enabled: true } }), { enabled: true });
    assert.deepEqual(await f.api('/me/map-settings', { token: a.token }), { enabled: true });
    for (const token of [b.token, c.token]) await f.api('/me/map-settings', { token, method: 'PATCH', body: { enabled: true } });
    assert.equal((await f.api('/map/cells?city=杭州', { token: a.token })).cells.length, 0);
    f.advance(2 * 3600000 + 1000);
    const cells = (await f.api('/map/cells?city=杭州', { token: a.token })).cells;
    assert.equal(cells.length, 1); assert.equal(cells[0].catchCount, 3); assert.equal(cells[0].publicUserCount, 3);
    assert.equal(cells[0].coordType, 'gcj02'); assert.equal(cells[0].gridSizeMeters, 1000); assert.equal(cells[0].records.length, 3);
    assert.notEqual(cells[0].lat, location.lat); assert.notEqual(cells[0].lng, location.lng);
    assert.equal(cells[0].place, '西湖区附近水域');
    assert.equal('lat' in cells[0].records[0].location, false); assert.equal('lng' in cells[0].records[0].location, false);
  } finally { await f.closeAll(); }
});

test('records persist across restart; logout and expiry invalidate tokens; account deletion cleans data', async () => {
  const f = await fixture();
  let second;
  try {
    const { token, me } = await f.login(); await f.caught(token);
    await f.closeAll({ preserve: true });
    second = createApp({ dataDir: f.dataDir });
    assert.equal(second.db.prepare('SELECT count(*) AS n FROM catches WHERE user_id=?').get(me.serverId).n, 1);
    assert.equal(second.db.prepare('PRAGMA integrity_check').get().integrity_check, 'ok');
    second.db.close(); second = null;
    rmSync(f.dataDir, { recursive: true, force: true });
  } catch (error) { second?.close(); throw error; }
  const g = await fixture();
  try {
    const { token } = await g.login(); await g.caught(token);
    await g.api('/me', { token, method: 'DELETE', expected: 204 });
    await g.api('/me', { token, expected: 401 });
    assert.equal(g.db.prepare('SELECT count(*) AS n FROM media').get().n, 0); assert.equal(readdirSync(join(g.dataDir, 'media')).length, 0);
    const account = await g.login(); g.advance(31 * 86400000); await g.api('/me', { token: account.token, expected: 401 });
  } finally { await g.closeAll(); }
});

test('production disables demo login; disallowed origins and malformed JSON fail clearly', async () => {
  const f = await fixture({ production: true, origins: ['https://zev668.github.io'] });
  try {
    assert.equal((await f.api('/health')).devLogin, false);
    await f.api('/auth/dev', { method: 'POST', body: { deviceKey: randomUUID() }, expected: 404 });
    await f.api('/health', { headers: { Origin: 'https://untrusted.example' }, expected: 403 });
    await f.api('/health', { headers: { Origin: 'https://zev668.github.io' } });
    const response = await fetch(f.base + '/api/auth/wechat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' }); assert.equal(response.status, 400);
    for (const path of ['/server/data/yukomon.sqlite', '/server/.env', '/package.json']) assert.equal((await fetch(f.base + path)).status, 404);
  } finally { await f.closeAll(); }
});

test('online backup restores a readable database, media and signing key', async () => {
  const f = await fixture();
  const destination = mkdtempSync(join(tmpdir(), 'yukomon-backup-'));
  try {
    const { token } = await f.login(); await f.caught(token);
    const snapshot = execFileSync(process.execPath, ['server/backup.mjs'], { encoding: 'utf8', env: { ...process.env, DATA_DIR: f.dataDir, BACKUP_DIR: destination }, windowsHide: true }).trim();
    const restored = new DatabaseSync(join(snapshot, 'yukomon.sqlite'), { readOnly: true });
    try {
      assert.equal(restored.prepare('PRAGMA integrity_check').get().integrity_check, 'ok');
      assert.equal(restored.prepare('SELECT count(*) AS n FROM catches').get().n, 1);
      const m = restored.prepare('SELECT filename FROM media').get();
      assert.ok(existsSync(join(snapshot, 'media', m.filename)));
      assert.deepEqual(readFileSync(join(snapshot, 'media-signing-key')), readFileSync(join(f.dataDir, 'media-signing-key')));
    } finally { restored.close(); }
  } finally { await f.closeAll(); rmSync(destination, { recursive: true, force: true }); }
});
