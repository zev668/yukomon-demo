import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import test from 'node:test';

const providerSource = await readFile(new URL('../demo/js/map-provider.js', import.meta.url), 'utf8');
const appSource = await readFile(new URL('../demo/js/app.js', import.meta.url), 'utf8');
const deferred = () => { let resolve; const promise = new Promise(done => { resolve = done; }); return { promise, resolve }; };
function providerHarness(key = 'test-key') {
  const scripts = [], timers = new Map(), maps = [], layers = [];
  const context = vm.createContext({ navigator: {}, console,
    setTimeout(fn) { const id = timers.size + 1; timers.set(id, fn); return id; },
    clearTimeout(id) { timers.delete(id); },
    document: {
      createElement() { return { remove() { this.removed = true; } }; },
      head: { appendChild(script) { scripts.push(script); } }
    },
    YK_RUNTIME: { map: { browserKey: key } }
  });
  context.window = context;
  vm.runInContext(providerSource, context);
  function installSdk() {
    context.TMap = {
      LatLng: class { constructor(lat, lng) { this.lat = lat; this.lng = lng; } },
      Map: class {
        constructor(container, options) { Object.assign(this, { container, options, centers: [] }); maps.push(this); }
        setCenter(point) { this.centers.push(point); }
        setZoom(zoom) { this.zoom = zoom; }
        destroy() { this.destroyed = true; }
      },
      MarkerStyle: class {},
      MultiMarker: class {
        constructor(options) { this.options = options; layers.push(this); }
        on(type, fn) { this[type] = fn; }
        setMap(value) { this.map = value; }
      }
    };
    scripts.at(-1)?.onload?.();
  }
  return { context, scripts, timers, maps, layers, installSdk, provider: context.YK_MAP_PROVIDER };
}

test('missing key never mounts a map, and native positioning does not require the browser API', async () => {
  const h = providerHarness('');
  assert.equal((await h.provider.load()).ready, false);
  assert.equal(await h.provider.mount({ isConnected: true }), false);
  assert.equal(h.scripts.length, 0);
  let requested = false;
  h.context.YK_NATIVE = { geolocation: { getCurrentPosition(success) { requested = true; success({ coords: { latitude: 30, longitude: 120 } }); } } };
  const position = await h.provider.locate();
  assert.equal(requested, true);
  assert.equal(position.coords.latitude, 30);
  assert.equal(h.provider.focus({ lat: 30, lng: 120, coordType: 'gcj02' }), false);
});

test('failed and timed out SDK loads remove their scripts and can be retried', async () => {
  const h = providerHarness();
  const failed = h.provider.load();
  h.scripts[0].onerror();
  await assert.rejects(failed, /加载失败/);
  assert.equal(h.scripts[0].removed, true);
  const timedOut = h.provider.load();
  [...h.timers.values()][0]();
  await assert.rejects(timedOut, /超时/);
  assert.equal(h.scripts[1].removed, true);
  const retry = h.provider.load();
  h.installSdk();
  assert.equal((await retry).ready, true);
  assert.equal(h.scripts.length, 3);
});

test('only the latest connected mount survives an SDK wait and markers require valid GCJ-02 cells', async () => {
  const h = providerHarness(), oldContainer = { isConnected: true }, currentContainer = { isConnected: true };
  const stale = h.provider.mount(oldContainer);
  const current = h.provider.mount(currentContainer, { cells: [
    { id: 'valid', lat: 30, lng: 120, coordType: 'gcj02' },
    { id: 'missing', coordType: 'gcj02' },
    { id: 'invalid', lat: NaN, lng: 120, coordType: 'gcj02' },
    { id: 'range', lat: 91, lng: 120, coordType: 'gcj02' },
    { id: 'gps', lat: 30, lng: 120, coordType: 'wgs84' },
    { id: 'unknown', lat: 30, lng: 120 }
  ] });
  h.installSdk();
  assert.equal(await stale, false);
  assert.equal(await current, true);
  assert.equal(h.maps.length, 1);
  assert.equal(h.maps[0].container, currentContainer);
  assert.deepEqual(Array.from(h.layers[0].options.geometries, item => item.id), ['valid']);
  assert.equal(h.provider.focus({ coords: { latitude: 30, longitude: 120 } }), false);
  assert.equal(h.provider.focus({ lat: 30, lng: 120, coordType: 'wgs84' }), false);
  assert.equal(h.provider.focus({ lat: 30, lng: 120, coordType: 'gcj02' }), true);
  assert.equal(h.maps[0].centers.length, 1);
  currentContainer.isConnected = false;
  assert.equal(h.provider.focus({ lat: 30, lng: 120, coordType: 'gcj02' }), false);
  h.provider.unmount();
  assert.equal(h.maps[0].destroyed, true);
});

test('configuration changes cancel pending loads and detached mounts cannot replace a current map', async () => {
  const h = providerHarness();
  const pending = h.provider.load();
  h.provider.configure({ key: 'replacement-key' });
  await assert.rejects(pending, /配置已更新/);
  assert.equal(h.scripts[0].removed, true);
  const current = h.provider.mount({ isConnected: true });
  assert.match(h.scripts.at(-1).src, /replacement-key/);
  h.installSdk();
  assert.equal(await current, true);
  let opened = 0;
  const layer = h.layers[0];
  await h.provider.mount({ isConnected: false }, { onMarkerClick() { opened++; } });
  layer.click({ geometry: { properties: { cell: { id: 'stale' } } } });
  assert.equal(opened, 0);
  assert.equal(h.maps.length, 1);
  assert.equal(h.maps[0].destroyed, undefined);
  assert.equal(h.provider.focus({ lat: 30, lng: 120, coordType: 'gcj02' }), true);
  h.provider.configure({ key: '' });
  assert.equal(h.provider.mode, 'unavailable');
  assert.equal((await h.provider.load()).ready, false);
});

function appFunction(name, nextName) {
  const start = appSource.indexOf(`  function ${name}(`), end = appSource.indexOf(`  function ${nextName}(`, start);
  assert.ok(start >= 0 && end > start);
  return appSource.slice(start, end);
}
function locationHarness(reverseGeocode) {
  const draft = { location: { city: '原城市', district: '', place: '' } }, button = {}, messages = [];
  let callback, failure, saves = 0;
  const context = vm.createContext({ console, navigator: {}, Number,
    draft: () => draft, $: () => button,
    setBusy(node, busy) { node.disabled = busy; }, toast(message) { messages.push(message); },
    saveDraft() { saves++; }, closeLayer(rec) { rec.closing = true; }, render() {},
    YK_API: { remote: true, reverseGeocode },
    YK_NATIVE: { geolocation: { getCurrentPosition(success, reject) { callback = success; failure = reject; } } }
  });
  context.window = context;
  vm.runInContext(appFunction('locateMe', 'locationSheet'), context);
  const rec = { node: {}, closing: false };
  context.locateMe(rec);
  return { context, draft, rec, button, messages, callback: position => callback(position), failure: error => failure(error), saves: () => saves };
}

test('capture GPS uses WGS-84 conversion, preserves the returned coordinate system and ignores a closed editor', async () => {
  const requests = [], pending = deferred();
  const h = locationHarness((...args) => { requests.push(args); return pending.promise; });
  const fix = h.callback({ coords: { latitude: 30, longitude: 120 } });
  assert.deepEqual(requests[0], [30, 120, 'wgs84']);
  h.rec.closing = true;
  pending.resolve({ city: '杭州', district: '西湖区', place: '地点', lat: 30.1, lng: 120.1, coordType: 'gcj02' });
  await fix;
  assert.equal(h.draft.location.city, '原城市');
  assert.equal(h.saves(), 0);
  const success = locationHarness(async () => ({ city: '杭州', district: '西湖区', place: '地点', lat: 30.1, lng: 120.1, coordType: 'gcj02' }));
  await success.callback({ coords: { latitude: 30, longitude: 120 } });
  assert.equal(success.draft.location.coordType, 'gcj02');
  assert.equal(success.saves(), 1);
});

test('invalid conversions never replace the capture location or claim successful GPS', async () => {
  const h = locationHarness(async () => ({ city: '杭州', lat: 30, lng: 120, coordType: 'wgs84' }));
  await h.callback({ coords: { latitude: 30, longitude: 120 } });
  assert.equal(h.draft.location.city, '原城市');
  assert.equal(h.saves(), 0);
  assert.equal(h.button.disabled, false);
  assert.equal(h.messages.includes('已获取当前位置'), false);
});

test('recording from a public cell copies its coarse label without inheriting coordinates', () => {
  const draft = {}, rec = { node: {} };
  const context = vm.createContext({ S: { db: { catches: [] }, byId: {} }, C: {}, F: { fishSVG: () => '' }, ICON: {}, state: {},
    esc: value => value || '', draft: () => draft, ensureDraftV2: value => value,
    sheet: () => rec, closeLayer() {}, render() {}
  });
  vm.runInContext(appFunction('mapDetailV2', 'renderMapV2'), context);
  context.mapDetailV2({ city: '杭州', district: '西湖区', place: '西湖区附近', lat: 30, lng: 120, coordType: 'gcj02', records: [], catchCount: 1, speciesCount: 1, publicUserCount: 1 });
  rec.node.onclick({ target: { closest: selector => selector === '[data-go-map-catch]' ? {} : null } });
  assert.equal(draft.location.city, '杭州');
  assert.equal(draft.location.place, '西湖区附近');
  assert.equal('lat' in draft.location, false);
  assert.equal('lng' in draft.location, false);
});

function mapPageHarness({ mode = 'tencent', remote = true, mount = async () => true, reverseGeocode, focus = () => true } = {}) {
  const messages = [], focuses = [], requests = [];
  let controls;
  const element = () => ({ isConnected: true, hidden: false, disabled: false, setAttribute(name, value) { this[name] = value; } });
  const view = {
    set innerHTML(html) {
      if (controls) controls['.tmap-root'].isConnected = false;
      this.markup = html;
      controls = Object.fromEntries(['.tmap-root', '.map-fallback', '[data-map-status]', '[data-map-retry]', '[data-map-locate]', '[data-map-zoom]'].map(selector => [selector, element()]));
    },
    querySelector(selector) { return controls[selector] || null; }
  };
  const context = vm.createContext({ console, Number, Map,
    state: {}, F: { fishSVG: () => '<svg></svg>' }, S: { byId: {}, db: { me: { city: '杭州' } }, CITIES: { 杭州: { lat: 30.2, lng: 120.1 } }, SPECIES: [], mapCells: () => [{ id: 'cell', city: '杭州', place: '西湖区附近', catchCount: 1, speciesCount: 1 }] },
    C: { RV: {} }, RARITIES: [], ICON: {}, M: {}, esc: value => String(value ?? ''),
    $: (selector, root) => root.querySelector(selector),
    toast(message) { messages.push(message); }, setBusy(node, busy) { node.disabled = busy; },
    YK_API: { remote, async reverseGeocode(...args) { requests.push(args); return reverseGeocode ? reverseGeocode(...args) : { lat: 30.3, lng: 120.2, coordType: 'gcj02' }; } },
    YK_MAP_PROVIDER: { mode, unmount() {}, mount,
      locate: async () => ({ coords: { latitude: 30, longitude: 120 } }),
      focus(point) { focuses.push(point); return focus(point); }
    }
  });
  context.window = context;
  vm.runInContext(appFunction('renderMapV2', 'demoUnlockV2'), context);
  const render = () => context.renderMapV2(view);
  const click = selector => view.onclick({ target: { closest: value => value === selector ? {} : null } });
  render();
  return { context, render, click, view, messages, focuses, requests, get controls() { return controls; } };
}

test('map page shows unavailable state with a real list and no spatial placeholder when the service is absent', async () => {
  const h = mapPageHarness({ mode: 'unavailable' });
  await new Promise(setImmediate);
  assert.equal(h.controls['[data-map-status]'].textContent, '钓点分布示意 · 实景地图即将开通');
  assert.equal(h.controls['.map-fallback'].hidden, false);
  assert.match(h.view.markup, /map-cell-row/);
  assert.doesNotMatch(h.view.markup, /map-marker|m-0/);
  h.click('[data-map-locate]');
  await new Promise(setImmediate);
  assert.equal(h.requests.length, 0);
  assert.equal(h.messages.includes('已定位到当前位置'), false);
});

test('a failed map mount exposes retry and a successful retry restores positioning', async () => {
  let attempts = 0;
  const h = mapPageHarness({ mount: async () => { if (++attempts === 1) throw new Error('地图加载失败，请重试'); return true; } });
  await new Promise(setImmediate);
  assert.equal(h.controls['[data-map-retry]'].hidden, false);
  assert.match(h.controls['[data-map-status]'].textContent, /加载失败/);
  h.click('[data-map-retry]');
  await new Promise(setImmediate);
  assert.equal(h.controls['.map-fallback'].hidden, true);
  assert.equal(h.controls['[data-map-locate]'].disabled, false);
  h.click('[data-map-locate]');
  await new Promise(setImmediate);
  assert.deepEqual(h.requests[0], [30, 120, 'wgs84']);
  assert.equal(h.focuses[0].coordType, 'gcj02');
  assert.equal(h.messages.includes('已定位到当前位置'), true);
});

test('failed focus or a location conversion for a replaced map never reports success', async () => {
  const failed = mapPageHarness({ focus: () => false });
  await new Promise(setImmediate);
  failed.click('[data-map-locate]');
  await new Promise(setImmediate);
  assert.equal(failed.messages.includes('已定位到当前位置'), false);
  const pending = deferred(), stale = mapPageHarness({ reverseGeocode: () => pending.promise });
  await new Promise(setImmediate);
  stale.click('[data-map-locate]');
  await new Promise(setImmediate);
  stale.render();
  pending.resolve({ lat: 30.3, lng: 120.2, coordType: 'gcj02' });
  await new Promise(setImmediate);
  assert.equal(stale.focuses.length, 0);
  assert.equal(stale.messages.includes('已定位到当前位置'), false);
});

test('photo bubbles cluster by screen distance and split when points spread apart', () => {
  const h = providerHarness();
  const near = [{ x: 100, y: 100, cell: { id: 'a' } }, { x: 130, y: 110, cell: { id: 'b' } }, { x: 400, y: 400, cell: { id: 'c' } }];
  const clustered = h.provider.clusterPoints(near, 64);
  assert.equal(clustered.length, 2);
  assert.equal(JSON.stringify(Array.from(clustered, c => c.items.length).sort()), '[1,2]');
  const spread = near.map(p => ({ ...p, x: p.x * 4, y: p.y * 4 }));
  assert.equal(h.provider.clusterPoints(spread, 64).length, 3);
});
