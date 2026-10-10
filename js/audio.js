/* Yukomon demo —— 音效（WebAudio 实时合成，按《音效设计》时间轴；正式版替换为 MP3）
 * D 大调五声音阶：D E F# A B */
(function () {
  let ctx = null;
  let master = null;
  const settings = { sfx: true, haptics: true };
  const NOTE = { D4: 293.66, F4s: 369.99, A4: 440, D5: 587.33, E5: 659.25, F5s: 739.99, A5: 880, B5: 987.77,
    D6: 1174.66, E6: 1318.51, F6s: 1479.98, A6: 1760, B6: 1975.53, D7: 2349.32 };
  let active = [];
  let timers = [];

  function ensure() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.55;
      const comp = ctx.createDynamicsCompressor();
      master.connect(comp).connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  let noiseBuf = null;
  function noise() {
    if (noiseBuf) return noiseBuf;
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return noiseBuf;
  }

  let reverb = null;
  function verb() {
    if (reverb) return reverb;
    const len = ctx.sampleRate * 2.4;
    const buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
    }
    reverb = ctx.createConvolver();
    reverb.buffer = buf;
    const g = ctx.createGain();
    g.gain.value = 0.35;
    reverb.connect(g).connect(master);
    return reverb;
  }

  function out(node, wet = 0.3) {
    node.connect(master);
    if (wet > 0) {
      const g = ctx.createGain();
      g.gain.value = wet;
      node.connect(g).connect(verb());
    }
    active.push(node);
  }

  // ---------- 声音积木 ----------
  function bell(t, freq, { dur = 1, vol = 0.3, type = 'sine', partials = [1, 2.76, 5.4], wet = 0.35 } = {}) {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    partials.forEach((p, i) => {
      const o = ctx.createOscillator();
      o.type = type;
      o.frequency.value = freq * p;
      const pg = ctx.createGain();
      pg.gain.value = 1 / (i * 1.8 + 1);
      o.connect(pg).connect(g);
      o.start(t);
      o.stop(t + dur + 0.05);
    });
    out(g, wet);
  }

  function drop(t, { f0 = 1400, f1 = 500, vol = 0.35 } = {}) {
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(f1, t + 0.08);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    o.connect(g);
    o.start(t);
    o.stop(t + 0.15);
    out(g, 0.25);
  }

  function splash(t, { dur = 0.5, vol = 0.4, lo = 400, hi = 6000, attack = 0.01 } = {}) {
    const s = ctx.createBufferSource();
    s.buffer = noise();
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(hi, t);
    bp.frequency.exponentialRampToValueAtTime(lo, t + dur);
    bp.Q.value = 0.7;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(bp).connect(g);
    s.start(t, Math.random());
    s.stop(t + dur + 0.05);
    out(g, 0.3);
  }

  function bubbles(t, n = 6, span = 0.4, vol = 0.12) {
    for (let i = 0; i < n; i++) {
      const tt = t + Math.random() * span;
      const f = 500 + Math.random() * 900;
      const o = ctx.createOscillator();
      o.frequency.setValueAtTime(f, tt);
      o.frequency.exponentialRampToValueAtTime(f * 1.8, tt + 0.05);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, tt);
      g.gain.exponentialRampToValueAtTime(vol, tt + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, tt + 0.06);
      o.connect(g);
      o.start(tt);
      o.stop(tt + 0.08);
      out(g, 0.2);
    }
  }

  function rumble(t, dur, { f = 70, vol = 0.4, attack = 0.6 } = {}) {
    const s = ctx.createBufferSource();
    s.buffer = noise();
    s.loop = true;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 180;
    const o = ctx.createOscillator();
    o.frequency.value = f;
    const og = ctx.createGain();
    og.gain.value = 0.6;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(lp).connect(g);
    o.connect(og).connect(g);
    s.start(t);
    o.start(t);
    s.stop(t + dur + 0.1);
    o.stop(t + dur + 0.1);
    out(g, 0.1);
  }

  function heartbeat(t, vol = 0.8) {
    [0, 0.18].forEach((d, i) => {
      const o = ctx.createOscillator();
      o.frequency.setValueAtTime(70, t + d);
      o.frequency.exponentialRampToValueAtTime(40, t + d + 0.15);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t + d);
      g.gain.exponentialRampToValueAtTime(vol * (i ? 0.7 : 1), t + d + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.22);
      o.connect(g);
      o.start(t + d);
      o.stop(t + d + 0.25);
      out(g, 0.05);
    });
  }

  function pad(t, freqs, dur, { vol = 0.12, type = 'sawtooth', attack = 0.08 } = {}) {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + attack);
    g.gain.setValueAtTime(vol, t + dur * 0.35);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2400;
    lp.connect(g);
    freqs.forEach((f) => {
      [-4, 4].forEach((det) => {
        const o = ctx.createOscillator();
        o.type = type;
        o.frequency.value = f;
        o.detune.value = det;
        o.connect(lp);
        o.start(t);
        o.stop(t + dur + 0.05);
      });
    });
    out(g, 0.5);
  }

  function glitter(t, dur = 0.5, vol = 0.1) {
    const notes = [NOTE.D7, NOTE.B6, NOTE.A6, NOTE.F6s, NOTE.E6];
    for (let i = 0; i < 14; i++) bell(t + Math.random() * dur, notes[i % 5] * (1 + Math.random() * 0.01), { dur: 0.25, vol: vol * (0.5 + Math.random() * 0.5), partials: [1], wet: 0.4 });
  }

  // ---------- 音效定义（时间单位：秒，相对开始） ----------
  const SFX = {
    unlock_N: (t) => { drop(t); bell(t + 0.25, NOTE.D6, { dur: 0.35, vol: 0.28 }); },
    unlock_R: (t) => {
      splash(t, { dur: 0.3, vol: 0.3 });
      bubbles(t + 0.3, 5, 0.4, 0.06);
      bell(t + 0.3, NOTE.D6, { dur: 0.5, vol: 0.25 });
      bell(t + 0.42, NOTE.A6, { dur: 0.45, vol: 0.22 });
    },
    unlock_SR: (t) => {
      splash(t, { dur: 0.45, vol: 0.4 });
      [NOTE.D6, NOTE.F6s, NOTE.A6].forEach((f, i) => bell(t + 0.4 + i * 0.08, f, { dur: 0.8, vol: 0.22, partials: [1, 2, 3.01], wet: 0.5 }));
      glitter(t + 0.56, 0.4, 0.07);
    },
    unlock_SSR: (t) => {
      rumble(t, 1.0, { f: 80, vol: 0.45, attack: 0.6 });
      splash(t + 0.7, { dur: 0.7, vol: 0.55, lo: 250, hi: 4000 });
      bell(t + 0.7, NOTE.D4, { dur: 1.3, vol: 0.35, partials: [1, 2.0, 2.76, 4.2, 5.4], wet: 0.5 });
      pad(t + 0.9, [NOTE.D4, NOTE.F4s, NOTE.A4, NOTE.D5], 1.1, { vol: 0.06 });
      glitter(t + 1.1, 0.6, 0.08);
    },
    unlock_UR: (t) => {
      // 前端已延迟 500ms（黑场），文件从心跳开始
      heartbeat(t, 0.9);
      rumble(t + 0.4, 1.4, { f: 45, vol: 0.4, attack: 0.9 });
      heartbeat(t + 0.5, 0.95);
      heartbeat(t + 0.95, 1.0);
      splash(t + 1.3, { dur: 1.2, vol: 0.75, lo: 150, hi: 5000, attack: 0.005 });
      rumble(t + 1.3, 0.8, { f: 50, vol: 0.6, attack: 0.01 });
      pad(t + 1.3, [NOTE.D4 / 2, NOTE.D4, NOTE.F4s, NOTE.A4, NOTE.D5], 1.7, { vol: 0.08, attack: 0.02 });
      bell(t + 1.3, NOTE.D4 / 2, { dur: 1.6, vol: 0.3, partials: [1, 2, 2.76, 4.2], wet: 0.6 });
      [NOTE.D5, NOTE.E5, NOTE.F5s, NOTE.A5, NOTE.B5, NOTE.D6, NOTE.E6, NOTE.F6s, NOTE.A6, NOTE.D7]
        .forEach((f, i) => bell(t + 1.7 + i * 0.045, f, { dur: 0.7, vol: 0.14, partials: [1, 2], wet: 0.5 }));
      for (let i = 0; i < 6; i++) drop(t + 2.1 + Math.random() * 0.8, { f0: 1600, f1: 700, vol: 0.08 });
    },
    star: (t, rarity) => {
      const base = { N: NOTE.D6, R: NOTE.D6, SR: NOTE.F6s, SSR: NOTE.D5, UR: NOTE.A5 }[rarity] || NOTE.D6;
      bell(t, base, { dur: 0.3, vol: 0.22 });
      bell(t + 0.1, base * 1.5, { dur: 0.3, vol: 0.2 });
    },
    ui_shutter: (t) => { splash(t, { dur: 0.05, vol: 0.4, lo: 2000, hi: 5000, attack: 0.002 }); splash(t + 0.07, { dur: 0.05, vol: 0.3, lo: 2000, hi: 4000, attack: 0.002 }); },
    ui_scan: (t) => { bubbles(t, 4, 1.2, 0.05); bell(t + 0.2, NOTE.A5, { dur: 1.2, vol: 0.06, partials: [1], wet: 0.7 }); },
    ui_fail: (t) => { bubbles(t, 3, 0.2, 0.1); drop(t + 0.1, { f0: 500, f1: 260, vol: 0.2 }); },
    ui_protected: (t) => { splash(t, { dur: 1, vol: 0.12, lo: 300, hi: 1200, attack: 0.3 }); [NOTE.A5, NOTE.D6, NOTE.E6].forEach((f, i) => bell(t + 0.15 + i * 0.18, f, { dur: 0.7, vol: 0.12, partials: [1, 3.9], wet: 0.5 })); },
    ui_pending: (t) => { splash(t, { dur: 0.35, vol: 0.12, lo: 400, hi: 1500, attack: 0.05 }); },
    ui_flip: (t) => { splash(t, { dur: 0.12, vol: 0.18, lo: 1500, hi: 3500, attack: 0.01 }); },
    ui_rank_up: (t) => { [NOTE.D5, NOTE.F5s, NOTE.A5].forEach((f, i) => bell(t + i * 0.09, f, { dur: 0.3, vol: 0.2, type: 'triangle', partials: [1, 4] })); },
  };

  function play(name, { delay = 0, rarity } = {}) {
    if (!settings.sfx) return;
    if (!ensure()) return;
    const fn = SFX[name];
    if (fn) fn(ctx.currentTime + 0.02 + delay / 1000, rarity);
  }

  function stopAll() {
    active.forEach((n) => { try { n.disconnect(); } catch (e) { /* noop */ } });
    active = [];
    timers.forEach(clearTimeout);
    timers = [];
  }

  // ---------- 震动 ----------
  const VIB = { light: 15, medium: 30, heavy: 55, long: 400 };
  function haptic(kind) {
    if (!settings.haptics) return;
    if (navigator.vibrate) navigator.vibrate(VIB[kind] || 20);
    document.dispatchEvent(new CustomEvent('yk-haptic', { detail: kind }));
  }
  function scheduleHaptics(list, offset = 0) {
    list.forEach(([ms, kind]) => timers.push(setTimeout(() => haptic(kind), ms + offset)));
  }

  window.YK_AUDIO = { play, stopAll, haptic, scheduleHaptics, settings, unlock: ensure };
})();
