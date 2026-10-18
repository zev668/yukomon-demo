/* Mount the approved rarity pattern only when the large card is turned over. */
(function () {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const frames = new Map();
  function setPlaying(node, frame) {
    const card = node.closest('.gallery-card');
    const rect = card.getBoundingClientRect();
    const visible = rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth;
    frame.contentWindow?.postMessage({ type: 'marble-play', playing: card.classList.contains('flipped') && visible && !document.hidden && !reduced.matches }, location.origin);
  }
  function sync() {
    for (const [node, frame] of frames) {
      if (!node.isConnected) { frame.remove(); frames.delete(node); }
      else setPlaying(node, frame);
    }
    document.querySelectorAll('.gallery-card.flipped .marble-back').forEach(node => {
      if (frames.has(node)) return;
      const frame = document.createElement('iframe');
      frame.title = `${node.dataset.marbleRarity} dynamic marble background`;
      frame.setAttribute('aria-hidden', 'true');
      frame.tabIndex = -1;
      const url = new URL('marble-study/', document.baseURI);
      url.search = new URLSearchParams({ embed: '1', rarity: node.dataset.marbleRarity });
      frame.src = url.href;
      frame.onload = () => { if (node.isConnected) setPlaying(node, frame); };
      frames.set(node, frame);
      node.append(frame);
    });
  }
  let queued = false;
  function schedule() { if (queued) return; queued = true; requestAnimationFrame(() => { queued = false; sync(); }); }
  new MutationObserver(schedule).observe(document.getElementById('app') || document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  document.addEventListener('visibilitychange', schedule);
  document.addEventListener('scroll', schedule, { capture: true, passive: true });
  window.addEventListener('resize', schedule);
  reduced.addEventListener('change', schedule);
  schedule();
})();
