(function () {
  const app = document.querySelector('#app');
  if (!app) return;
  const ns = 'http://www.w3.org/2000/svg';
  const sources = { system: 'img/ios-icons.svg?v=1#', pixel: 'img/pixel-icons.svg?v=1#' };
  // Bottom navigation keeps its authored face assets (nav-*.svg). Other UI
  // icons still use the role-based system/pixel sprite normalization below.
  // Navigation icons are authored as filled inline SVG assets in index.html;
  // leave them intact and only normalize ordinary role-based UI icons.
  const selector = 'svg[data-icon]';
  const icons = new Set(['back', 'arrow', 'chev', 'close', 'plus', 'search', 'gear', 'camera', 'fish', 'heart', 'lock', 'rank', 'pin', 'locate', 'eye', 'copy', 'trash', 'album', 'unlock', 'flip-camera']);
  const collectibleIcons = new Set(['fish', 'lock', 'unlock']);
  const protectedCards = '.yk-card,.reflective-shell,.gallery-card,.card-host,.card-stage,.share-stage';
  const replaced = new WeakSet();
  function use(name, role, className) {
    const node = document.createElementNS(ns, 'use');
    node.setAttribute('href', sources[role] + name);
    if (className) node.setAttribute('class', className);
    return node;
  }
  function replace(svg) {
    if (replaced.has(svg)) return;
    if (svg instanceof HTMLImageElement) {
      const image = svg, button = image.closest('#tabbar button');
      const name = button && nav[button.dataset.tab];
      if (!icons.has(name)) return;
      svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('class', image.getAttribute('class') || 'ti');
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');
      svg.dataset.icon = name;
      image.replaceWith(svg);
    }
    const button = svg.closest('#tabbar button');
    const name = button ? nav[button.dataset.tab] : svg.dataset.icon;
    if (!icons.has(name)) return;
    const protectedCard = svg.closest(protectedCards);
    // Protected cards retain the existing icon output; ordinary UI follows role mapping.
    if (!button && !protectedCard && collectibleIcons.has(name) && !svg.closest('button,a[href],[role="button"]')) return;
    const role = button ? 'pixel' : 'system';
    replaced.add(svg);
    svg.dataset.icon = name;
    svg.classList.remove('fill', 'pixel-icon');
    svg.classList.toggle('system-icon', role === 'system');
    svg.classList.toggle('pixel-icon', role === 'pixel');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.replaceChildren(...(name === 'heart'
      ? [use(name, role, 'heart-outline'), use(name, role, 'heart-solid')]
      : [use(name, role)]));
  }
  function scan(node) {
    if (!(node instanceof Element) || !node.isConnected) return;
    if (node.matches(selector)) replace(node);
    node.querySelectorAll(selector).forEach(replace);
  }
  scan(app);
  new MutationObserver((records) => {
    for (const record of records) record.addedNodes.forEach(scan);
  }).observe(app, { childList: true, subtree: true });
})();
