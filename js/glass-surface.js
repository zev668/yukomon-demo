/*
 * Vanilla adaptation of the user-supplied React Bits GlassSurface (JS + CSS).
 * Source: https://reactbits.dev/components/glass-surface
 * Upstream source and license: https://github.com/DavidHDev/react-bits
 * This retains its rectangular SVG map and RGB displacement pipeline.
 * No React runtime, synthetic screenshot backdrop, or circular map is used.
 */
(function () {
  'use strict';
  if (window.YK_GLASS) return;

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const TARGETS = '#tabbar,.map-filters .set-control,.icon-btn,.city-menu';
  const EXCLUDED = '.card-detail-page,.share-view,.unlock,.pixel-unlock,.yk-card,.reflective-shell,.card-host,.card-scene,.record-modal,[data-glass="off"]';
  const CLASSES = ['yk-glass-surface', 'yk-glass-svg', 'yk-glass-frosted', 'yk-glass-solid', 'yk-glass-dark', 'yk-glass-menu'];
  const PROPERTIES = ['--yk-glass-filter', '--yk-glass-frost', '--yk-glass-saturation'];
  const BLEND_MODES = new Set(['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity']);
  const instances = new Map();
  const dirty = new Set();
  const pendingRoots = new Set();
  const reducedTransparency = window.matchMedia('(prefers-reduced-transparency: reduce)');
  const moreContrast = window.matchMedia('(prefers-contrast: more)');
  const forcedColors = window.matchMedia('(forced-colors: active)');
  const defaults = Object.freeze({
    // Keep the supplied GlassSurface pipeline, but use a quieter material for this app.
    // backgroundOpacity is translated to a translucent tint in glass-surface.css.
    borderWidth: 0.05, brightness: 52, opacity: 0.9, blur: 9,
    displace: 0.3, backgroundOpacity: 0.52, saturation: 1.02,
    distortionScale: -120, redOffset: 0, greenOffset: 0, blueOffset: 0,
    xChannel: 'R', yChannel: 'G', mixBlendMode: 'difference', refraction: true
  });
  const presets = {
    // Match the supplied GlassSurface: a calm center and a refracting capsule rim.
    navigation: {
      refraction: true, distortionScale: -64, greenOffset: 1.5, blueOffset: 3,
      brightness: 50, opacity: 0.93, blur: 11, displace: 4,
      backgroundOpacity: 0.34, saturation: 1.08, borderWidth: 0.07
    },
    control: { distortionScale: -78, blur: 7, displace: 0.22, backgroundOpacity: 0.36, borderWidth: 0.05 },
    icon: { distortionScale: -64, blur: 7, displace: 0.2, backgroundOpacity: 0.34, borderWidth: 0.05 },
    menu: { refraction: false, blur: 14, backgroundOpacity: 0.62, borderWidth: 0.04 }
  };
  let app = null;
  let observer = null;
  let resizeObserver = null;
  let definitions = null;
  let defs = null;
  let frame = 0;
  let flushing = false;
  let sequence = 0;
  let stopped = false;

  function supports(property, value) {
    return !!window.CSS && CSS.supports(property, value);
  }

  const hasBackdrop = supports('backdrop-filter', 'blur(1px)') || supports('-webkit-backdrop-filter', 'blur(1px)');
  const ua = navigator.userAgent;
  const isWebkit = /AppleWebKit/i.test(ua) && !/(Chrome|Chromium|Edg|OPR)\//i.test(ua);
  const hasSVGBackdrop = !isWebkit && !/Firefox|FxiOS/i.test(ua) && supports('backdrop-filter', 'url(#yk-glass-probe)');

  function clamp(value, min, max, fallback) {
    const number = Number(value);
    return Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : fallback;
  }

  function settingsFor(kind, values) {
    const settings = Object.assign({}, defaults, presets[kind], values);
    for (const key of ['distortionScale', 'redOffset', 'greenOffset', 'blueOffset']) settings[key] = clamp(settings[key], -500, 500, defaults[key]);
    for (const key of ['opacity', 'backgroundOpacity', 'borderWidth']) settings[key] = clamp(settings[key], 0, 1, defaults[key]);
    settings.brightness = clamp(settings.brightness, 0, 100, 50);
    settings.blur = clamp(settings.blur, 0, 40, 11);
    settings.displace = clamp(settings.displace, 0, 12, 0.5);
    settings.saturation = clamp(settings.saturation, 0, 3, defaults.saturation);
    settings.xChannel = /^[RGB]$/.test(settings.xChannel) ? settings.xChannel : 'R';
    settings.yChannel = /^[RGB]$/.test(settings.yChannel) ? settings.yChannel : 'G';
    settings.mixBlendMode = BLEND_MODES.has(settings.mixBlendMode) ? settings.mixBlendMode : 'difference';
    return settings;
  }

  function svgNode(name, attributes, parent) {
    const node = document.createElementNS(SVG_NS, name);
    for (const [name, value] of Object.entries(attributes || {})) node.setAttribute(name, String(value));
    if (parent) parent.append(node);
    return node;
  }

  function ensureDefinitions() {
    if (defs) return;
    definitions = svgNode('svg', { class: 'yk-glass-definitions', 'aria-hidden': 'true', focusable: 'false', width: 0, height: 0 });
    defs = svgNode('defs', {}, definitions);
    document.body.append(definitions);
  }

  function createFilter(instance) {
    ensureDefinitions();
    const filter = svgNode('filter', {
      id: instance.id, filterUnits: 'userSpaceOnUse', primitiveUnits: 'userSpaceOnUse',
      x: 0, y: 0, 'color-interpolation-filters': 'sRGB'
    }, defs);
    const image = svgNode('feImage', { x: 0, y: 0, preserveAspectRatio: 'none', result: 'map' }, filter);
    const channels = ['Red', 'Green', 'Blue'].map((name, index) => {
      const displacement = svgNode('feDisplacementMap', { in: 'SourceGraphic', in2: 'map', result: 'disp' + name }, filter);
      const matrix = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
      matrix[index * 6] = 1;
      svgNode('feColorMatrix', { in: 'disp' + name, type: 'matrix', values: matrix.join(' '), result: name.toLowerCase() }, filter);
      return displacement;
    });
    svgNode('feBlend', { in: 'red', in2: 'green', mode: 'screen', result: 'rg' }, filter);
    svgNode('feBlend', { in: 'rg', in2: 'blue', mode: 'screen', result: 'output' }, filter);
    const blur = svgNode('feGaussianBlur', { in: 'output' }, filter);
    instance.filter = { node: filter, image, channels, blur };
  }

  function removeFilter(instance) {
    if (!instance.filter) return;
    instance.filter.node.remove();
    instance.filter = null;
    instance.mapKey = '';
    instance.element.style.removeProperty('--yk-glass-filter');
    if (defs && !defs.childElementCount) {
      definitions.remove();
      definitions = defs = null;
    }
  }

  // The two edge gradients and soft neutral center are the supplied algorithm.
  function displacementMap(instance, width, height, radius) {
    const s = instance.settings;
    const edge = Math.min(width, height) * s.borderWidth * 0.5;
    const red = instance.id + '-red';
    const blue = instance.id + '-blue';
    const soft = instance.id + '-soft';
    const content = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="${SVG_NS}">
      <defs>
        <linearGradient id="${red}" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="red"/></linearGradient>
        <linearGradient id="${blue}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="blue"/></linearGradient>
        <filter id="${soft}" filterUnits="userSpaceOnUse" x="0" y="0" width="${width}" height="${height}" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="${s.blur}"/></filter>
      </defs>
      <rect x="0" y="0" width="${width}" height="${height}" fill="black"/>
      <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#${red})"/>
      <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#${blue})" style="mix-blend-mode:${s.mixBlendMode}"/>
      <rect x="${edge}" y="${edge}" width="${width - edge * 2}" height="${height - edge * 2}" rx="${radius}" fill="hsl(0 0% ${s.brightness}% / ${s.opacity})" filter="url(#${soft})"/>
    </svg>`;
    return 'data:image/svg+xml,' + encodeURIComponent(content);
  }

  function modeFor(settings) {
    if (reducedTransparency.matches || moreContrast.matches || forcedColors.matches || !hasBackdrop) return 'solid';
    return settings.refraction && hasSVGBackdrop ? 'svg' : 'frosted';
  }

  function update(instance) {
    const element = instance.element;
    if (!element.isConnected || element.closest(EXCLUDED)) {
      detach(element);
      return;
    }
    const settings = instance.settings;
    element.classList.toggle('yk-glass-dark', !!element.closest('.publish-capture') || element.classList.contains('glass') || (element.id === 'tabbar' && document.body.classList.contains('cam-on')));
    const mode = modeFor(settings);
    if (mode !== instance.mode) {
      element.classList.remove('yk-glass-svg', 'yk-glass-frosted', 'yk-glass-solid');
      element.classList.add('yk-glass-' + mode);
      element.dataset.ykGlass = mode;
      instance.mode = mode;
      if (mode !== 'svg') removeFilter(instance);
    }
    element.style.setProperty('--yk-glass-frost', String(settings.backgroundOpacity));
    element.style.setProperty('--yk-glass-saturation', String(settings.saturation));

    // Layout dimensions exclude elastic press transforms and keep nav maps 72px tall.
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    if (!width || !height) return;
    const computedRadius = getComputedStyle(element).borderTopLeftRadius;
    const requestedRadius = settings.borderRadius == null
      ? (computedRadius.includes('%') ? parseFloat(computedRadius) * Math.min(width, height) / 100 : parseFloat(computedRadius))
      : Number(settings.borderRadius);
    const radius = clamp(requestedRadius, 0, Math.min(width, height) / 2, 0);
    instance.size = { width, height, radius };
    if (mode !== 'svg') return;
    if (!instance.filter) createFilter(instance);

    const mapKey = [width, height, radius, settings.borderWidth, settings.brightness, settings.opacity, settings.blur, settings.mixBlendMode].join('|');
    if (mapKey !== instance.mapKey) {
      const filter = instance.filter;
      filter.node.setAttribute('width', String(width));
      filter.node.setAttribute('height', String(height));
      filter.image.setAttribute('width', String(width));
      filter.image.setAttribute('height', String(height));
      filter.image.setAttribute('href', displacementMap(instance, width, height, radius));
      instance.mapKey = mapKey;
      instance.mapUpdates += 1;
    }
    instance.filter.channels.forEach((channel, index) => {
      channel.setAttribute('scale', String(settings.distortionScale + [settings.redOffset, settings.greenOffset, settings.blueOffset][index]));
      channel.setAttribute('xChannelSelector', settings.xChannel);
      channel.setAttribute('yChannelSelector', settings.yChannel);
    });
    instance.filter.blur.setAttribute('stdDeviation', String(settings.displace));
    element.style.setProperty('--yk-glass-filter', 'url(#' + instance.id + ')');
  }

  function queue(instance) {
    dirty.add(instance);
    schedule();
  }

  function flush() {
    frame = 0;
    flushing = true;
    for (const [element] of instances) if (!element.isConnected || element.closest(EXCLUDED)) detach(element);
    const roots = Array.from(pendingRoots);
    pendingRoots.clear();
    roots.forEach(scan);
    const updates = Array.from(dirty);
    dirty.clear();
    updates.forEach(instance => { if (instances.has(instance.element)) update(instance); });
    flushing = false;
  }

  function schedule() {
    if (!frame && !flushing && !stopped) frame = requestAnimationFrame(flush);
  }

  function kindFor(element) {
    if (element.id === 'tabbar') return 'navigation';
    if (element.matches('.city-menu')) return 'menu';
    return element.matches('.map-filters .set-control') ? 'control' : 'icon';
  }

  function attach(element, options) {
    if (stopped || !(element instanceof HTMLElement) || !element.isConnected || element.closest(EXCLUDED)) return null;
    let instance = instances.get(element);
    if (instance) {
      if (options) instance.settings = settingsFor(instance.kind, Object.assign({}, instance.settings, options));
      queue(instance);
      return instance.handle;
    }
    const kind = kindFor(element);
    instance = {
      element, kind, id: 'yk-glass-' + (++sequence), settings: settingsFor(kind, options),
      filter: null, mode: '', mapKey: '', size: null, mapUpdates: 0,
      savedProperties: PROPERTIES.map(name => [name, element.style.getPropertyValue(name), element.style.getPropertyPriority(name)]),
      savedClasses: CLASSES.filter(name => element.classList.contains(name)),
      savedMode: element.getAttribute('data-yk-glass'), savedKind: element.getAttribute('data-yk-glass-kind')
    };
    instance.handle = Object.freeze({
      update: values => { instance.settings = settingsFor(kind, Object.assign({}, instance.settings, values)); queue(instance); },
      destroy: () => detach(element)
    });
    instances.set(element, instance);
    element.classList.add('yk-glass-surface');
    element.classList.toggle('yk-glass-menu', kind === 'menu');
    element.dataset.ykGlassKind = kind;
    if (resizeObserver) resizeObserver.observe(element);
    queue(instance);
    return instance.handle;
  }

  function restoreAttribute(element, name, value) {
    if (value === null) element.removeAttribute(name);
    else element.setAttribute(name, value);
  }

  function detach(element) {
    const instance = instances.get(element);
    if (!instance) return;
    if (resizeObserver) resizeObserver.unobserve(element);
    dirty.delete(instance);
    removeFilter(instance);
    element.classList.remove(...CLASSES);
    element.classList.add(...instance.savedClasses);
    instance.savedProperties.forEach(([name, value, priority]) => {
      if (value) element.style.setProperty(name, value, priority);
      else element.style.removeProperty(name);
    });
    restoreAttribute(element, 'data-yk-glass', instance.savedMode);
    restoreAttribute(element, 'data-yk-glass-kind', instance.savedKind);
    instances.delete(element);
  }

  function scan(root) {
    if (!(root instanceof Element) || !root.isConnected || root.closest(EXCLUDED)) return;
    if (root.matches(TARGETS)) attach(root);
    root.querySelectorAll(TARGETS).forEach(element => attach(element));
  }

  function refresh(root) {
    if (stopped) return;
    pendingRoots.add(root instanceof Element ? root : app);
    for (const instance of instances.values()) dirty.add(instance);
    schedule();
  }

  function preferenceChanged() {
    for (const instance of instances.values()) dirty.add(instance);
    schedule();
  }

  function listenPreference(query, remove) {
    if (query.addEventListener) query[remove ? 'removeEventListener' : 'addEventListener']('change', preferenceChanged);
    else query[remove ? 'removeListener' : 'addListener'](preferenceChanged);
  }

  function onResize() { preferenceChanged(); }

  function init() {
    app = document.querySelector('#app');
    if (!app || stopped) return;
    if (window.ResizeObserver) resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => { const instance = instances.get(entry.target); if (instance) queue(instance); });
    });
    observer = new MutationObserver(records => {
      for (const record of records) {
        if (record.type === 'attributes') for (const instance of instances.values()) dirty.add(instance);
        else for (const node of record.addedNodes) if (node instanceof Element) pendingRoots.add(node);
      }
      schedule();
    });
    observer.observe(app, { childList: true, subtree: true });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    listenPreference(reducedTransparency, false);
    listenPreference(moreContrast, false);
    listenPreference(forcedColors, false);
    window.addEventListener('resize', onResize, { passive: true });
    refresh(app);
  }

  function destroy() {
    stopped = true;
    cancelAnimationFrame(frame);
    frame = 0;
    if (observer) observer.disconnect();
    if (resizeObserver) resizeObserver.disconnect();
    Array.from(instances.keys()).forEach(detach);
    listenPreference(reducedTransparency, true);
    listenPreference(moreContrast, true);
    listenPreference(forcedColors, true);
    window.removeEventListener('resize', onResize);
    document.removeEventListener('DOMContentLoaded', init);
    pendingRoots.clear();
    dirty.clear();
  }

  window.YK_GLASS = Object.freeze({
    attach, detach, refresh, destroy,
    inspect: () => ({
      svgSupported: hasSVGBackdrop, backdropSupported: hasBackdrop,
      reducedTransparency: reducedTransparency.matches || moreContrast.matches || forcedColors.matches,
      surfaces: Array.from(instances.values(), instance => ({
        kind: instance.kind, mode: instance.mode, id: instance.id,
        size: instance.size && Object.assign({}, instance.size), mapUpdates: instance.mapUpdates,
        connected: instance.element.isConnected
      }))
    })
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
