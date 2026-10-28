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
      // Cue fires on the reveal label. Layers escalate per tier:
      // N: chime; R: + rising 3-note arpeggio; SR: + major chord bloom;
      // SSR: + low impact + sparkle tail; UR: + sub boom, noise burst, 5-note run, long shimmer.
      const root = [523.25, 587.33, 659.25, 698.46, 783.99][rank];
      const chord = [1, 1.25, 1.5, 2];
      const noise = (t, dur, vol) => {
        const len = Math.max(1, Math.floor(ctx.sampleRate * dur)), buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.5);
        const src = ctx.createBufferSource(), g = ctx.createGain(), hp = ctx.createBiquadFilter();
        hp.type = 'highpass'; hp.frequency.value = 1800; src.buffer = buf; g.gain.value = vol;
        src.connect(hp).connect(g).connect(target); src.start(t); src.stop(t + dur + .02);
        if (track) active.add(src);
        src.onended = () => { src.disconnect(); active.delete(src); };
      };
      const boom = (t, f0, dur, vol) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'sine'; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f0 * .35, t + dur);
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .008); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
        o.connect(g).connect(target); o.start(t); o.stop(t + dur + .02);
        if (track) active.add(o);
        o.onended = () => { o.disconnect(); g.disconnect(); active.delete(o); };
      };
      // Base chime (all tiers).
      glass(at, root * 2, .1 + rank * .01);
      if (rank === 0) { glass(at + .09, root * 3, .05); return; }
      // Rising arpeggio, longer for higher tiers.
      const run = [1, 1.25, 1.5, 2, 2.5].slice(0, Math.min(5, rank + 2));
      run.forEach((m, i) => pulse(at + .02 + i * (.07 - rank * .006), root * m, .03 + rank * .004));
      const top = at + .02 + run.length * (.07 - rank * .006);
      glass(top, root * 2 * run[run.length - 1] / 2, .09 + rank * .01);
      if (rank >= 2) chord.forEach((m, i) => tone(ctx, target, top + i * .012, root * m, .7 + rank * .18, .04 + rank * .006, 'triangle', track));
      if (rank >= 3) {
        boom(at, 140, .45, .22 + (rank - 3) * .08);
        for (let i = 0; i < 6 + rank * 2; i++) glass(top + .12 + i * .07, root * 4 * [1, 1.25, 1.5, 2][i % 4], .03 - i * .001);
      }
      if (rank >= 4) {
        boom(at - .005, 70, .9, .3);
        noise(at, .5, .12);
        chord.forEach((m, i) => tone(ctx, target, top + .3, root * m / 2, 1.4, .05, 'sawtooth', track));
        [1, 1.5, 2, 3, 4].forEach((m, i) => tone(ctx, target, top + .6 + i * .11, root * m * 2, 1.1, .025, 'sine', track));
      }    } else if (name === 'ui_flip') {
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
    try { if (!window.YK_NATIVE) navigator.vibrate?.(VIB[kind] || 12); } catch {}
    document.dispatchEvent(new CustomEvent('yk-haptic', { detail: kind }));
  }
  function scheduleHaptics(list, offset = 0) {
    for (const [ms, kind] of list) { const id = setTimeout(() => { timers.delete(id); haptic(kind); }, ms + offset); timers.add(id); }
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopAll(); });
  window.YK_AUDIO = { play, stopAll, haptic, scheduleHaptics, settings, unlock: ensure, renderCue, get activeCount() { return active.size; } };
})();
