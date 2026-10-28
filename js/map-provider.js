/* Tencent Location Service adapter. Public markers use coarse GCJ-02 cells;
 * device GPS must be converted by the server before centering this map.
 * Spots render as photo bubbles (DOM overlay) that cluster by screen distance
 * and split apart as the user zooms in. */
(function () {
  'use strict';
  const config = { key: window.YK_RUNTIME?.map?.browserKey || window.YK_TMAP_KEY || '' };
  let sdkPromise = null, cancelSdk = null, sdkVersion = 0;
  let loadedKey = window.TMap ? config.key : '';
  let map = null, markerLayer = null, mapContainer = null, mountVersion = 0, bubbleLayer = null;
  const validPoint = point => point && Number.isFinite(point.lat) && Number.isFinite(point.lng)
    && Math.abs(point.lat) <= 90 && Math.abs(point.lng) <= 180;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function releaseMap() {
    try { bubbleLayer?.destroy(); } catch { /* DOM layer already gone. */ }
    try { markerLayer?.setMap(null); } catch { /* The SDK may have already released its layer. */ }
    try { map?.destroy(); } catch { /* A detached map must not block the next mount. */ }
    bubbleLayer = markerLayer = map = mapContainer = null;
  }
  function resetSdk() {
    sdkVersion++;
    cancelSdk?.();
    cancelSdk = null;
    sdkPromise = null;
  }
  function loadSdk() {
    if (!config.key) return Promise.resolve(null);
    if (window.TMap && loadedKey === config.key) return Promise.resolve(window.TMap);
    if (sdkPromise) return sdkPromise;
    const version = sdkVersion, key = config.key;
    sdkPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      let settled = false;
      const finish = (error) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        script.onload = script.onerror = null;
        if (cancelSdk === cancel) cancelSdk = null;
        if (error) { script.remove(); reject(error); }
        else { loadedKey = key; resolve(window.TMap); }
      };
      const cancel = () => finish(new Error('地图配置已更新，请重试'));
      const timer = setTimeout(() => finish(new Error('地图加载超时，请重试')), 15000);
      cancelSdk = cancel;
      script.src = `https://map.qq.com/api/gljs?v=1.exp&key=${encodeURIComponent(key)}`;
      script.async = true;
      script.onload = () => finish(window.TMap?.Map && window.TMap?.LatLng && window.TMap?.MultiMarker ? null : new Error('地图暂不可用，请重试'));
      script.onerror = () => finish(new Error('地图加载失败，请检查网络后重试'));
      document.head.appendChild(script);
    }).catch(error => {
      if (version === sdkVersion) sdkPromise = null;
      throw error;
    });
    return sdkPromise;
  }

  /** Group cells whose screen positions are closer than `gap` pixels. Pure, testable. */
  function clusterPoints(points, gap = 64) {
    const clusters = [];
    const sorted = [...points].sort((a, b) => (b.weight || 1) - (a.weight || 1));
    for (const p of sorted) {
      const hit = clusters.find(c => Math.hypot(c.x - p.x, c.y - p.y) < gap);
      if (hit) {
        hit.items.push(p);
        const w = hit.items.length;
        hit.x += (p.x - hit.x) / w; hit.y += (p.y - hit.y) / w;
      } else clusters.push({ x: p.x, y: p.y, items: [p] });
    }
    return clusters;
  }

  // Photo bubble overlay: one absolutely positioned DOM layer over the GL canvas.
  function createBubbleLayer(TMap, nextMap, container, cells, { onCellClick, photoOf }) {
    const root = document.createElement('div');
    root.className = 'map-bubbles';
    container.appendChild(root);
    const nodes = new Map();
    let frame = 0, destroyed = false;
    const html = (cluster) => {
      const cellsIn = cluster.items.map(item => item.cell);
      const lead = cellsIn.reduce((a, b) => (b.latestAt || 0) > (a.latestAt || 0) ? b : a);
      const count = cellsIn.reduce((n, c) => n + (Number(c.catchCount) || 0), 0);
      const photo = photoOf(lead);
      const stack = cellsIn.length > 1 ? '<i class="mb-stack" aria-hidden="true"></i>' : '';
      const label = cellsIn.length > 1 ? `${cellsIn.length} 个钓点` : esc(lead.place || lead.city);
      return `${stack}<span class="mb-photo">${photo ? `<img src="${esc(photo)}" alt="" loading="lazy" decoding="async" draggable="false">` : `<b class="mb-fallback">${esc(lead.fishIcon || '')}</b>`}</span>${count > 1 ? `<em class="mb-count">${count > 99 ? '99+' : count}</em>` : ''}<span class="mb-label">${label}</span>`;
    };
    function draw() {
      frame = 0;
      if (destroyed || !container.isConnected) return;
      const pts = [];
      for (const cell of cells) {
        const px = nextMap.projectToContainer(new TMap.LatLng(cell.lat, cell.lng));
        if (!px || !Number.isFinite(px.x)) continue;
        pts.push({ x: px.x, y: px.y, cell, weight: cell.catchCount });
      }
      const w = container.clientWidth || 0, h = container.clientHeight || 0;
      const clusters = clusterPoints(pts, 68).filter(c => c.x > -80 && c.y > -80 && c.x < w + 80 && c.y < h + 120);
      const seen = new Set();
      for (const cluster of clusters) {
        const key = cluster.items.map(i => i.cell.id).sort().join('|');
        seen.add(key);
        let node = nodes.get(key);
        if (!node) {
          node = document.createElement('button');
          node.type = 'button';
          node.className = `map-bubble${cluster.items.length > 1 ? ' is-cluster' : ''}`;
          node.innerHTML = html(cluster);
          node.setAttribute('aria-label', cluster.items.length > 1 ? `${cluster.items.length} 个钓点，点按放大` : `${cluster.items[0].cell.place || cluster.items[0].cell.city}，${cluster.items[0].cell.catchCount} 条记录`);
          node._cluster = cluster;
          root.appendChild(node);
          nodes.set(key, node);
          requestAnimationFrame(() => node.classList.add('in'));
        }
        node._cluster = cluster;
        node.style.transform = `translate3d(${cluster.x.toFixed(1)}px, ${cluster.y.toFixed(1)}px, 0)`;
      }
      for (const [key, node] of nodes) if (!seen.has(key)) { node.remove(); nodes.delete(key); }
    }
    const schedule = () => { if (!frame && !destroyed) frame = requestAnimationFrame(draw); };
    const onClick = (event) => {
      const node = event.target.closest('.map-bubble');
      if (!node || !node._cluster) return;
      const cluster = node._cluster;
      if (cluster.items.length === 1) { onCellClick?.(cluster.items[0].cell); return; }
      // Split the cluster: zoom to fit its members; if they share one spot, open a combined list.
      const lats = cluster.items.map(i => i.cell.lat), lngs = cluster.items.map(i => i.cell.lng);
      const span = Math.max(Math.max(...lats) - Math.min(...lats), Math.max(...lngs) - Math.min(...lngs));
      if (span < 0.002 || nextMap.getZoom() >= 17) { onCellClick?.(cluster.items.map(i => i.cell)); return; }
      const bounds = new TMap.LatLngBounds(new TMap.LatLng(Math.min(...lats), Math.min(...lngs)), new TMap.LatLng(Math.max(...lats), Math.max(...lngs)));
      nextMap.fitBounds(bounds, { padding: { top: 140, bottom: 160, left: 70, right: 70 }, maxZoom: 16, ease: { duration: 420 } });
    };
    root.addEventListener('click', onClick);
    ['bounds_changed', 'zoom', 'pan', 'resize', 'idle', 'tilesloaded'].forEach(type => nextMap.on(type, schedule));
    schedule();
    return {
      redraw: schedule,
      destroy() {
        destroyed = true;
        if (frame) cancelAnimationFrame(frame);
        ['bounds_changed', 'zoom', 'pan', 'resize', 'idle', 'tilesloaded'].forEach(type => { try { nextMap.off(type, schedule); } catch { /* map gone */ } });
        root.remove();
        nodes.clear();
      }
    };
  }

  const provider = {
    name: '腾讯位置服务',
    mode: config.key ? 'tencent' : 'unavailable',
    clusterPoints,
    configure(next = {}) {
      if (Object.prototype.hasOwnProperty.call(next, 'key') && next.key !== config.key) {
        config.key = next.key || '';
        provider.mode = config.key ? 'tencent' : 'unavailable';
        provider.unmount();
        resetSdk();
      }
      return provider;
    },
    async load() {
      const TMap = await loadSdk();
      return { provider: 'tencent-location-service', mode: provider.mode, ready: !!TMap, TMap };
    },
    unmount() {
      mountVersion++;
      releaseMap();
    },
    async mount(container, { center, cells = [], onMarkerClick, photoOf } = {}) {
      if (!container || container.isConnected === false) return false;
      const version = ++mountVersion;
      releaseMap();
      const { TMap } = await provider.load();
      if (!TMap || version !== mountVersion || container.isConnected === false) return false;
      const valid = cells.filter(cell => validPoint(cell) && cell.coordType === 'gcj02');
      const point = validPoint(center) ? center : valid[0] || { lat: 31.2304, lng: 121.4737 };
      let nextMap, nextLayer;
      const click = (cell) => { if (version === mountVersion && container.isConnected !== false && cell) onMarkerClick?.(cell); };
      try {
        nextMap = new TMap.Map(container, { center: new TMap.LatLng(point.lat, point.lng), zoom: valid.length ? 11 : 10, viewMode: '2D', showControl: false, pitchable: false, rotatable: false });
        // Invisible marker layer keeps SDK hit-testing (and tests) for environments without DOM overlays.
        nextLayer = new TMap.MultiMarker({
          map: nextMap,
          styles: { marker: new TMap.MarkerStyle({ width: 34, height: 34, anchor: { x: 17, y: 31 }, opacity: typeof document?.createElement === 'function' && container.appendChild ? 0 : 1 }) },
          geometries: valid.map(cell => ({ id: cell.id, styleId: 'marker', position: new TMap.LatLng(cell.lat, cell.lng), properties: { cell } }))
        });
        nextLayer.on('click', event => click(event?.geometry?.properties?.cell));
        if (container.appendChild && typeof nextMap.projectToContainer === 'function') {
          bubbleLayer = createBubbleLayer(TMap, nextMap, container, valid, { onCellClick: click, photoOf: photoOf || (cell => cell.records?.find(r => r.photo)?.photo || cell.photo || '') });
        }
        if (valid.length > 1 && TMap.LatLngBounds && nextMap.fitBounds) {
          const lats = valid.map(c => c.lat), lngs = valid.map(c => c.lng);
          nextMap.fitBounds(new TMap.LatLngBounds(new TMap.LatLng(Math.min(...lats), Math.min(...lngs)), new TMap.LatLng(Math.max(...lats), Math.max(...lngs))), { padding: { top: 150, bottom: 170, left: 60, right: 60 }, maxZoom: 13 });
        }
      } catch (error) {
        try { bubbleLayer?.destroy(); nextLayer?.setMap(null); nextMap?.destroy(); } catch { /* Release a partially mounted map. */ }
        bubbleLayer = null;
        throw error;
      }
      map = nextMap; markerLayer = nextLayer; mapContainer = container;
      return true;
    },
    focus(point) {
      if (!map || mapContainer?.isConnected === false || !window.TMap || !validPoint(point) || point.coordType !== 'gcj02') return false;
      map.setCenter(new window.TMap.LatLng(point.lat, point.lng));
      map.setZoom(12);
      return true;
    },
    zoomBy(delta) {
      if (!map || mapContainer?.isConnected === false) return false;
      const z = Math.max(3, Math.min(18, (map.getZoom?.() || 10) + delta));
      if (map.zoomTo) map.zoomTo(z, { duration: 260 }); else map.setZoom(z);
      return true;
    },
    locate() {
      return new Promise((resolve, reject) => {
        const geolocation = window.YK_NATIVE?.geolocation || navigator.geolocation;
        if (!geolocation) return reject(new Error('当前设备不支持定位'));
        geolocation.getCurrentPosition(resolve, error => reject(new Error(error?.code === 1 ? '没有定位权限，请在系统设置中允许' : '定位失败，请检查权限后重试')), { enableHighAccuracy: true, timeout: 12000 });
      });
    },
    cellLabel() { return provider.mode === 'tencent' ? '腾讯位置服务' : ''; }
  };
  window.YK_MAP_PROVIDER = provider;
})();
