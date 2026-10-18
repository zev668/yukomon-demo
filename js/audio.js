/* Pixel pulses and short glass partials, synthesized locally with no media download. */
(function () {
  'use strict';
  let context, master;
  const active = new Set(), timers = new Set();
  const settings = { sfx: true, haptics: true };
  const notes = [587.33, 739.99, 880, 1174.66, 1479.98];
  function ensure() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!context) {
      context = new AC(); master = context.createGain(); master.gain.value = .38;
      const compressor = context.createDynamicsCompressor();
      compressor.threshold.value = -12; compressor.ratio.value = 6;
      master.connect(compressor).connect(context.destination);
    }
    if (context.state === 'suspended') context.resume().catch(() => {});
    return context;
  }
  function tone(ctx, target, at, frequency, duration, volume, type = 'sine', track = false) {
    const source = ctx.createOscillator(), gain = ctx.createGain();
    source.type = type; source.frequency.setValueAtTime(frequency, at);
    gain.gain.setValueAtTime(0, at); gain.gain.linearRampToValueAtTime(volume, at + .004);
    gain.gain.exponentialRampToValueAtTime(.0001, at + duration);
    source.connect(gain).connect(target); source.start(at); source.stop(at + duration + .02);
    if (track) active.add(source);
    source.onended = () => { source.disconnect(); gain.disconnect(); active.delete(source); };
  }
  function renderCue(ctx, name, at = 0, target = ctx.destination, track = false) {
    const glass = (t, f, vol = .15) => {
      tone(ctx, target, t, f, .28, vol, 'sine', track);
      tone(ctx, target, t, f * 2.76, .13, vol * .16, 'sine', track);
    };
    const pulse = (t, f, vol = .045) => tone(ctx, target, t, f, .055, vol, 'square', track);
    if (name.startsWith('unlock_')) {
      const rank = Math.max(0, ['N', 'R', 'SR', 'SSR', 'UR'].indexOf(name.slice(7)));
      const n = rank + 2;
      for (let i = 0; i < n; i++) pulse(at + i * .075, notes[Math.min(i, 4)] / 2);
      const reveal = [.35, .48, .64, .8, 1][rank];
      glass(at + reveal + .18, notes[rank]); glass(at + reveal + .26, notes[rank] * 1.5, .08);
    } else if (name === 'ui_flip') {
      pulse(at, 440, .025); glass(at + .045, 1760, .035);
    } else if (name === 'star' || name === 'ui_rank_up') {
      notes.slice(0, 3).forEach((f, i) => { pulse(at + i * .06, f); glass(at + i * .06, f * 2, .06); });
    } else if (name === 'ui_fail') {
      pulse(at, 370); pulse(at + .09, 294);
    } else if (name === 'ui_shutter') {
      pulse(at, 1200, .025); pulse(at + .055, 800, .018);
    } else if (name === 'ui_protected') {
      glass(at, 880, .1); glass(at + .16, 1174.66, .07);
    } else glass(at, 1174.66, .06);
  }
  function play(name, { delay = 0 } = {}) {
    if (!settings.sfx || document.hidden || !ensure()) return;
    renderCue(context, name, context.currentTime + .015 + delay / 1000, master, true);
  }
  function stopAll() {
    for (const source of active) { try { source.stop(); source.disconnect(); } catch {} }
    active.clear(); timers.forEach(clearTimeout); timers.clear();
  }
  const VIB = { light: 12, medium: 24, heavy: 36, long: 48 };
  function haptic(kind) {
    if (!settings.haptics || document.hidden) return;
    try { navigator.vibrate?.(VIB[kind] || 12); } catch {}
    document.dispatchEvent(new CustomEvent('yk-haptic', { detail: kind }));
  }
  function scheduleHaptics(list, offset = 0) {
    for (const [ms, kind] of list) { const id = setTimeout(() => { timers.delete(id); haptic(kind); }, ms + offset); timers.add(id); }
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopAll(); });
  window.YK_AUDIO = { play, stopAll, haptic, scheduleHaptics, settings, unlock: ensure, renderCue, get activeCount() { return active.size; } };
})();
