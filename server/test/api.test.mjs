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

test('catalog and authentication boundaries', async () => {
  const f = await fixture();
  try {
    assert.equal((await f.api('/health')).storage, 'sqlite');
    const catalog = await f.api('/species'); assert.equal(catalog.species.length, 82); assert.equal(catalog.protectedSpecies.length, 32);
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

test('album, sample, camera, stars, giant and deletion aggregate correctly', async () => {
  const f = await fixture();
  try {
    const { token } = await f.login();
    const album = await f.caught(token, { source: 'album', lengthCm: 100 });
    assert.deepEqual(album.result.events, ['new']);
    assert.equal(album.result.card.verifiedCount, 0); assert.equal(album.result.card.giant.status, 'none');
    await f.caught(token, { source: 'sample', lengthCm: 150 });
    const camera = await f.caught(token, { lengthCm: 36 });
    assert.ok(camera.result.events.includes('giant')); assert.equal(camera.result.card.verifiedCount, 1);
    assert.equal((await f.api('/ranks', { token })).me.count, 1);
    f.advance();
    await f.caught(token, { lengthCm: 24 });
    const up = await f.caught(token, { lengthCm: 25 }); assert.equal(up.result.card.stars, 2); assert.ok(up.result.events.includes('star_up'));
    const after = await f.api(`/catches/${camera.result.catchObj.id}`, { token, method: 'DELETE' });
    assert.equal(after.cards['001'].giant.status, 'none'); assert.equal(after.cards['001'].stars, 1); assert.equal(after.cards['001'].catchCount, 4);
    assert.equal(after.cards['001'].bestLengthCm, 150);
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
    const share = await f.api('/shares', { token: a.token, method: 'POST', body: { catchId: id, ur: true }, expected: 201 });
    const shared = await f.api(`/shares/${share.id}`); assert.equal(shared.city, '杭州'); assert.equal(shared.ur, 1); assert.equal(shared.location, undefined);
    const image = await fetch(f.base + shared.photo); assert.equal(image.status, 200); assert.equal(image.headers.get('content-type'), 'image/jpeg');
    await f.api(`/shares/${share.id}`, { token: b.token, method: 'DELETE', expected: 404 });
    await f.api(`/catches/${id}`, { token: a.token, method: 'DELETE' });
    await f.api(`/shares/${share.id}`, { expected: 404 });
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

test('rank ties use achievement time, city and largest camera record', async () => {
  const f = await fixture();
  try {
    const a = await f.login(), b = await f.login();
    await f.api('/me', { token: b.token, method: 'PATCH', body: { city: '武汉' } });
    await f.caught(a.token, { lengthCm: 22 }); f.advance();
    await f.caught(b.token, { lengthCm: 28 });
    const rank = await f.api('/ranks', { token: a.token }); assert.equal(rank.top[0].me, true); assert.equal(rank.total, 2);
    assert.equal((await f.api('/ranks?scope=city', { token: a.token })).total, 1);
    assert.equal((await f.api('/ranks/001', { token: a.token })).top[0].lengthCm, 28);
    await f.caught(a.token, { source: 'album', lengthCm: 200 });
    assert.equal((await f.api('/ranks/001', { token: a.token })).me.lengthCm, 22);
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
