/* Viewport-batched GSAP entrances for app lists, including nested scrolling lists. */
(function () {
  'use strict';
  const app = document.querySelector('#app'), motion = window.YK_MOTION;
  if (!app || !motion || window.YK_LIST_MOTION) return;

  const selector = '.cell[data-sp],.board > .rank-row,.rank-float > .rank-row,.entry-list > .entry,.list > .sp-row,.sp-list > .sp-row,.set-member-row,.map-catch-row,.city-option,.settings-group .set-row,.gear-row,.facts > .kv,.record-modal-row,.ai-candidate,.met-row';
  const excluded = '.yk-card,.reflective-shell,.gallery-card,.card-host,.card-stage,.card-face,.share-stage,.share-view,.unlock,.pixel-unlock,[data-list-motion="off"]';
  const seen = new WeakSet(), pending = new Set(), ready = new Set(), active = new Map();
  let frame = 0, revealed = 0, stopped = false;
  const eligible = item => item.isConnected && !item.closest(excluded + ',[hidden],[inert]');

  function finish(animation) {
    animation.progress(1);
    animation.kill();
    active.delete(animation);
  }

  function forget(item) {
    pending.delete(item);
    ready.delete(item);
    intersection?.unobserve(item);
  }

  function schedule() {
    if (!frame && !stopped) frame = requestAnimationFrame(flush);
  }

  function flush() {
    frame = 0;
    if (document.hidden || stopped) return;
    const groups = new Map();
    for (const item of ready) {
      if (!eligible(item) || seen.has(item)) { forget(item); continue; }
      const rect = item.getBoundingClientRect();
      if (!rect.width || !rect.height || rect.bottom <= 0 || rect.top >= innerHeight) continue;
      forget(item);
      seen.add(item);
      revealed++;
      if (item.contains(document.activeElement)) continue;
      const parent = item.parentElement;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(item);
    }
    ready.clear();
    // Read all geometry before GSAP writes, and cap stagger time per visible batch.
    for (const [parent, items] of groups) {
      items.sort((a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
      let animation;
      animation = motion.listIn(items, {
        distance: parent.matches('.rank-float') ? 0 : 8,
        spread: Math.min(.14, Math.max(0, items.length - 1) * .025),
        onComplete: () => active.delete(animation)
      });
      if (animation) active.set(animation, items);
    }
  }

  const intersection = window.IntersectionObserver ? new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting && entry.intersectionRatio >= .08) ready.add(entry.target);
      else ready.delete(entry.target);
    }
    if (ready.size) schedule();
  }, { threshold: .08 }) : null;

  function refresh(root = app, { replay = false } = {}) {
    if (stopped || !(root instanceof Element) || !root.isConnected || root.closest(excluded)) return;
    const items = [...root.querySelectorAll(selector)];
    if (root.matches(selector)) items.unshift(root);
    if (replay) {
      const replaying = new Set(items);
      for (const [animation, targets] of active) if (targets.some(item => replaying.has(item))) finish(animation);
    }
    for (const item of items) {
      if (!eligible(item)) { forget(item); continue; }
      if (replay) seen.delete(item);
      if (seen.has(item) || pending.has(item)) continue;
      pending.add(item);
      if (intersection) intersection.observe(item);
      else ready.add(item);
    }
    if (ready.size) schedule();
  }

  function prune() {
    for (const item of pending) if (!eligible(item)) forget(item);
    for (const [animation, items] of active) if (items.some(item => !eligible(item))) finish(animation);
  }

  const mutations = new MutationObserver(records => {
    const roots = new Set();
    for (const record of records) {
      if (record.type === 'attributes') {
        refresh(record.target, { replay: record.attributeName === 'hidden' && !record.target.hidden });
      } else for (const node of record.addedNodes) if (node instanceof Element) roots.add(node);
    }
    prune();
    for (const root of roots) refresh(root);
  });

  function settleTarget(event) {
    for (const [animation, items] of active) if (items.some(item => item.contains(event.target))) finish(animation);
  }

  function suspend() {
    for (const [animation] of active) finish(animation);
    cancelAnimationFrame(frame);
    frame = 0;
  }

  function visibilityChanged() {
    if (document.hidden) suspend();
    else { refresh(); if (ready.size) schedule(); }
  }

  function fallbackScroll() {
    for (const item of pending) ready.add(item);
    schedule();
  }

  function destroy() {
    stopped = true;
    cancelAnimationFrame(frame);
    mutations.disconnect();
    intersection?.disconnect();
    for (const [animation] of active) finish(animation);
    pending.clear();
    ready.clear();
    app.removeEventListener('pointerdown', settleTarget, true);
    app.removeEventListener('focusin', settleTarget, true);
    app.removeEventListener('scroll', fallbackScroll, true);
    document.removeEventListener('visibilitychange', visibilityChanged);
    window.removeEventListener('pagehide', suspend);
  }

  mutations.observe(app, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden', 'inert'] });
  app.addEventListener('pointerdown', settleTarget, { capture: true, passive: true });
  app.addEventListener('focusin', settleTarget, true);
  if (!intersection) app.addEventListener('scroll', fallbackScroll, { capture: true, passive: true });
  document.addEventListener('visibilitychange', visibilityChanged);
  window.addEventListener('pagehide', suspend);
  window.YK_LIST_MOTION = Object.freeze({
    refresh, destroy, selector,
    inspect: () => ({ revealed, pending: pending.size, queued: ready.size, active: active.size })
  });
  refresh();
})();
