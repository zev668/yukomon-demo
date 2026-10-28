import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash, randomUUID } from 'node:crypto';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createApp } from '../app.mjs';
import { byId } from '../catalog.mjs';
import { mapGrid, mapRegion } from '../map-grid.mjs';
import { createProviders } from '../providers.mjs';

const point = { city: '杭州', district: '西湖区', place: '精确地址测试123号入口', lat: 30.12345, lng: 120.12345, coordType: 'gcj02' };

test('fixed GCJ-02 grid shares centers for nearby positions independently of labels', () => {
  const one = mapGrid(point);
  const two = mapGrid({ ...point, lat: 30.12355, lng: 120.12355, place: '另一个水域名称' });
  assert.deepEqual(one, two);
  assert.notEqual(one.lat, point.lat);
  assert.notEqual(one.lng, point.lng);
  assert.notEqual(one.key, mapGrid({ ...point, lng: 120.17345 }).key);
  assert.equal(mapGrid({ ...point, coordType: 'wgs84' }), null);
  assert.equal(mapGrid({ ...point, coordType: undefined }), null);
  assert.equal(mapGrid({ ...point, lat: undefined }), null);
  assert.equal(mapGrid({ ...point, lng: Infinity }), null);
  assert.equal(mapGrid({ ...point, lat: 90 }), null);
  assert.deepEqual(mapRegion(point), { city: '杭州', district: '西湖区', place: '西湖区附近水域' });
  assert.deepEqual(mapRegion({ city: '杭州', district: '某某路123号', place: point.place }), { city: '杭州', district: '', place: '杭州附近水域' });
});

async function fixture(options = {}) {
  const directory = mkdtempSync(join(tmpdir(), 'yukomon-map-grid-'));
  const now = Date.UTC(2026, 9, 27, 3);
  const service = createApp({ dataDir: directory, now: () => now, production: true, ...options });
  const server = service.app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}/api`;
  const token = randomUUID();
  const users = Array.from({ length: 4 }, (_, i) => {
    const id = randomUUID();
    service.db.prepare('INSERT INTO users(id,identity,nickname,city,created_at) VALUES(?,?,?,?,?)').run(id, `test-map:${id}`, `地图钓友${i}`, '杭州', now);
    service.db.prepare('INSERT INTO user_map_settings VALUES(?,?,?)').run(id, 1, now);
    return id;
  });
  service.db.prepare('INSERT INTO sessions VALUES(?,?,?)').run(createHash('sha256').update(token).digest('hex'), users[0], now + 86400000);
  function caught(userIndex, patch = {}) {
    const id = randomUUID(), mediaId = randomUUID(), hash = randomUUID();
    const body = { status: 'confirmed', speciesId: '001', source: 'camera', mapVisibility: 'grid', location: { ...point }, desc: '不应从地图返回的精确地址：123号', lengthCm: 20, ...patch };
    service.db.prepare('INSERT INTO media(id,user_id,mime,size,hash,filename,created_at) VALUES(?,?,?,?,?,?,?)').run(mediaId, users[userIndex], 'image/jpeg', 1, hash, `${mediaId}.jpg`, now);
    service.db.prepare('INSERT INTO catches VALUES(?,?,?,?,?,?,?,?,?)').run(id, users[userIndex], body.speciesId, body.status, JSON.stringify(body), hash, mediaId, null, patch.createdAt ?? now - 3 * 3600000);
    return id;
  }
  async function api(path, expected = 200, { method = 'GET', body } = {}) {
    const response = await fetch(base + path, { method, headers: { Authorization: `Bearer ${token}`, ...(body ? { 'Content-Type': 'application/json' } : {}) }, body: body ? JSON.stringify(body) : undefined });
    const value = await response.json();
    assert.equal(response.status, expected, JSON.stringify(value));
    return value;
  }
  return { caught, api, users, now, db: service.db, async close() { await new Promise(resolve => server.close(resolve)); service.close(); rmSync(directory, { recursive: true, force: true }); } };
}

test('reverse geocoder preserves the actual Tencent GCJ-02 output and rejects missing conversion coordinates', async () => {
  const requests = [];
  let location = { lat: 30.2, lng: 120.1 };
  const provider = createProviders({ TENCENT_MAP_SERVER_KEY: 'fixture-map-key' }, async url => {
    requests.push(new URL(url));
    return Response.json({ status: 0, result: { address_component: { city: '杭州市', district: '西湖区' }, location } });
  });
  const converted = await provider.reverseGeocode(point.lat, point.lng, 'wgs84');
  assert.equal(requests[0].searchParams.get('coord_type'), '1');
  assert.equal(converted.coordType, 'gcj02');
  assert.equal(converted.lat, 30.2);
  assert.equal(converted.lng, 120.1);
  await provider.reverseGeocode(point.lat, point.lng, 'gcj02');
  assert.equal(requests[1].searchParams.get('coord_type'), '5');
  location = undefined;
  await assert.rejects(provider.reverseGeocode(point.lat, point.lng, 'wgs84'), error => error.code === 'MAP_RESPONSE');
  location = { lat: '30.2', lng: 120.1 };
  await assert.rejects(provider.reverseGeocode(point.lat, point.lng, 'wgs84'), error => error.code === 'MAP_RESPONSE');
  await assert.rejects(provider.reverseGeocode(30, 120, 'unknown'), error => error.code === 'MAP_COORDINATES');
});

test('reverse-geocode HTTP contract requires an explicit input coordinate system', async () => {
  let calls = 0;
  const f = await fixture({ providers: { config: { recognition: { enabled: false }, map: { geocoding: true } }, async reverseGeocode(lat, lng, coordType) { calls++; assert.equal(coordType, 'wgs84'); return { city: '杭州', lat: lat + 0.001, lng: lng + 0.001, coordType: 'gcj02' }; } } });
  try {
    const body = { lat: point.lat, lng: point.lng };
    await f.api('/map/reverse-geocode', 400, { method: 'POST', body });
    assert.equal(calls, 0);
    const location = await f.api('/map/reverse-geocode', 200, { method: 'POST', body: { ...body, coordType: 'wgs84' } });
    assert.equal(location.coordType, 'gcj02');
    assert.equal(location.lat, point.lat + 0.001);
    assert.equal(calls, 1);
  } finally { await f.close(); }
});

test('global map-sharing opt-out immediately removes a user from cells and the three-user disclosure threshold', async () => {
  const f = await fixture();
  try {
    for (const index of [0, 1, 2]) f.caught(index);
    assert.equal((await f.api('/map/cells')).cells[0].records.length, 3);
    assert.deepEqual(await f.api('/me/map-settings', 200, { method: 'PATCH', body: { enabled: false } }), { enabled: false });
    const cell = (await f.api('/map/cells')).cells[0];
    assert.equal(cell.catchCount, 2);
    assert.equal(cell.publicUserCount, 2);
    assert.deepEqual(cell.records, []);
    f.db.prepare('DELETE FROM user_map_settings').run();
    assert.deepEqual((await f.api('/map/cells')).cells, []);
    await f.api('/me/map-settings', 200, { method: 'PATCH', body: { enabled: true } });
    assert.equal((await f.api('/map/cells')).cells[0].catchCount, 1);
  } finally { await f.close(); }
});

test('map API groups by quantized coordinates and never sends precise locations or addresses', async () => {
  const f = await fixture();
  try {
    f.caught(0);
    f.caught(1, { location: { ...point, lat: 30.12355, lng: 120.12355, place: '同网格的另一名称' } });
    const sparse = (await f.api('/map/cells')).cells;
    assert.equal(sparse.length, 1);
    assert.equal(sparse[0].catchCount, 2);
    assert.equal(sparse[0].publicUserCount, 2);
    assert.deepEqual(sparse[0].records, []);
    f.caught(2, { location: { ...point, place: '第三种名称' } });
    f.caught(0, { location: { ...point, lng: 120.17345 } });
    const cells = (await f.api('/map/cells')).cells;
    assert.equal(cells.length, 2, 'the same place text must not merge distant coordinates');
    const cell = cells.find(cell => cell.catchCount === 3), distant = cells.find(cell => cell.catchCount === 1);
    const center = mapGrid(point);
    assert.equal(cell.lat, center.lat);
    assert.equal(cell.lng, center.lng);
    assert.equal(cell.coordType, 'gcj02');
    assert.equal(cell.publicUserCount, 3);
    assert.equal(cell.records.length, 3);
    assert.deepEqual(distant.records, []);
    assert.equal(cell.place, '西湖区附近水域');
    for (const record of cell.records) {
      assert.deepEqual(record.location, { city: '杭州', district: '西湖区', place: '西湖区附近水域' });
      assert.equal('desc' in record, false);
    }
    const wire = JSON.stringify(cells);
    for (const privateValue of [point.place, '同网格的另一名称', '第三种名称', String(point.lat), String(point.lng), '123号']) assert.equal(wire.includes(privateValue), false);
    assert.deepEqual(await f.api(`/map/cells/${cell.id}`), cell);
    const profile = await f.api(`/users/${f.users[0]}`);
    for (const record of profile.catches) assert.deepEqual(record.location, { city: '杭州' });
  } finally { await f.close(); }
});

test('map API excludes unknown or WGS-84 coordinates, private and recent catches, album and protected species', async () => {
  const f = await fixture();
  try {
    f.caught(0, { location: { ...point, coordType: undefined } });
    f.caught(0, { location: { ...point, coordType: 'wgs84' } });
    f.caught(0, { location: { city: '杭州', district: '西湖区', place: point.place } });
    f.caught(0, { location: { ...point, lat: null } });
    f.caught(0, { location: { ...point, lat: 90 } });
    f.caught(0, { source: 'album' });
    f.caught(0, { source: 'sample' });
    f.caught(0, { mapVisibility: 'private' });
    f.caught(0, { mapVisibility: 'city' });
    f.caught(0, { status: 'protected', speciesId: null });
    const forbidden = Object.values(byId).find(species => species.releasePolicy === 'forbid');
    assert.ok(forbidden);
    f.caught(0, { speciesId: forbidden.no });
    f.caught(0, { createdAt: f.now - 2 * 3600000 + 1 });
    assert.deepEqual((await f.api('/map/cells')).cells, []);
    const id = f.caught(0, { createdAt: f.now - 2 * 3600000 });
    const visible = (await f.api('/map/cells')).cells;
    assert.equal(visible.length, 1);
    assert.equal(visible[0].catchCount, 1);
    assert.deepEqual(visible[0].records, []);
    assert.equal((await f.api('/map/cells?city=上海')).cells.length, 0);
    assert.equal((await f.api('/map/cells?speciesId=002')).cells.length, 0);
    await f.api('/map/cells/not-a-cell', 404);
    assert.ok(id);
  } finally { await f.close(); }
});
