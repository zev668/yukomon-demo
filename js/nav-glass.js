/* Circular backdrop refraction adapted from the supplied GlassSurface. */
(function () {
  'use strict';
  const nav = document.querySelector('#tabbar');
  if (!nav) return;
  nav.classList.add('glass-nav');

  const webkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  if (webkit || /Firefox/.test(navigator.userAgent) || !CSS.supports('backdrop-filter', 'url(#yk-nav-glass)')) return;

  const size = 96, canvas = document.createElement('canvas');
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const map = ctx.createImageData(size, size);
  // Keep the center calm and bend the backdrop toward the circular rim.
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const nx = (x + 0.5) / size * 2 - 1, ny = (y + 0.5) / size * 2 - 1;
      const edge = Math.min(1, Math.max(0, (Math.hypot(nx, ny) - 0.5) / 0.5));
      const bend = Math.pow(edge, 1.8), i = (y * size + x) * 4;
      map.data[i] = Math.round(127.5 + nx * bend * 127.5);
      map.data[i + 1] = Math.round(127.5 + ny * bend * 127.5);
      map.data[i + 2] = 128;
      map.data[i + 3] = 255;
    }
  }
  ctx.putImageData(map, 0, 0);

  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.classList.add('nav-glass-defs');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const defs = document.createElementNS(ns, 'defs');
  const mapURL = canvas.toDataURL();
  for (const [id, diameter] of [['yk-nav-glass', 56], ['yk-nav-glass-selected', 60]]) {
    const filter = document.createElementNS(ns, 'filter');
    filter.setAttribute('id', id);
    filter.setAttribute('color-interpolation-filters', 'sRGB');
    // Explicit pixel units keep the map independent of the hidden SVG viewport.
    for (const [key, value] of Object.entries({ filterUnits: 'userSpaceOnUse', primitiveUnits: 'userSpaceOnUse', x: 0, y: 0, width: diameter, height: diameter })) filter.setAttribute(key, value);
    function primitive(name, attributes) {
      const node = document.createElementNS(ns, name);
      for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value);
      filter.append(node);
      return node;
    }
    primitive('feImage', { href: mapURL, x: 0, y: 0, width: diameter, height: diameter, preserveAspectRatio: 'none', result: 'map' });
    primitive('feGaussianBlur', { in: 'SourceGraphic', stdDeviation: 4, result: 'backdrop' });
    ['red', 'green', 'blue'].forEach((channel, index) => {
      primitive('feDisplacementMap', { in: 'backdrop', in2: 'map', scale: -28 + index * 1.25, xChannelSelector: 'R', yChannelSelector: 'G', result: `disp-${channel}` });
      const matrix = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
      matrix[index * 6] = 1;
      primitive('feColorMatrix', { in: `disp-${channel}`, type: 'matrix', values: matrix.join(' '), result: channel });
    });
    primitive('feBlend', { in: 'red', in2: 'green', mode: 'screen', result: 'rg' });
    primitive('feBlend', { in: 'rg', in2: 'blue', mode: 'screen', result: 'rgb' });
    primitive('feGaussianBlur', { in: 'rgb', stdDeviation: 0.25 });
    defs.append(filter);
  }
  svg.append(defs);
  document.body.append(svg);
  nav.classList.add('glass-nav-refractive');
})();
