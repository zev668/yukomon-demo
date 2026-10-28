/* Yukomon demo —— 动效层（GSAP 3.13 + CustomEase）
 *
 * MOTION THESIS
 *   焦点时刻：鱼卡解锁 —— 每个稀有度一条 gsap.timeline，用 label 编排，可被「跳过」一键 progress(1)。
 *   连续性：  页面推入/抽屉上滑/索引标签墨线滑动、图鉴新格"盖章解锁"。
 *   反馈：    toast、按压、震动指示点。日常转场 ≤ 300ms，退出快于进入。
 *   预算：    只动 transform / opacity / autoAlpha；常驻循环离屏即 kill；
 *             prefers-reduced-motion 下全部降级为淡入淡出（gsap.matchMedia）。
 */
(function () {
  const gsap = window.gsap;
  gsap.registerPlugin(window.CustomEase);
  const { CustomEase } = window;

  // 记录式的减速：起步干脆、收尾很长，像纸张落定
  CustomEase.create('yk.settle', 'M0,0 C0.16,1 0.3,1 1,1');
  CustomEase.create('yk.press', 'M0,0 C0.4,0 0.2,1 1,1');
  gsap.defaults({ ease: 'yk.settle', duration: 0.3 });

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = () => motionQuery.matches;
  const $ = (s, r = document) => r.querySelector(s);
  const running = new Map();
  const managedKills = new WeakSet();
  function managed(animation, finish) {
    if (!animation) return animation;
    for (const [old] of running) if (old.progress?.() === 1) running.delete(old);
    if (!managedKills.has(animation)) {
      const kill = animation.kill;
      animation.kill = function (...args) { running.delete(animation); return kill.apply(this, args); };
      managedKills.add(animation);
    }
    running.set(animation, finish || (() => { animation.progress(1); animation.kill(); }));
    return animation;
  }
  function settleMotion() {
    const pending = [...running];
    running.clear();
    for (const [animation, finish] of pending) {
      if (animation.progress?.() !== 1) finish();
    }
  }

  // ---------- 页面 / 抽屉 ----------
  // 推入：新页从右滑入，下面的主视图轻微左移变暗（iOS 式视差）；页内内容成组错落浮现
  const under = () => document.querySelector('#view');
  const transitions = new WeakMap();
  function transition(el) {
    const previous = transitions.get(el);
    if (previous) { previous.kill(); running.delete(previous); }
    const tl = gsap.timeline({ defaults: { overwrite: 'auto' } });
    transitions.set(el, tl);
    return managed(tl);
  }
  function pageIn(el) {
    const tl = transition(el);
    if (reduced()) return tl.set(el, { clearProps: 'transform' }).fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12, clearProps: 'opacity,visibility' });
    tl.fromTo(el, { xPercent: 100 }, { xPercent: 0, duration: 0.3, ease: 'power3.out', clearProps: 'transform' });
    if (!document.querySelector('#layers .layer.page ~ .layer.page')) tl.to(under(), { x: -18, autoAlpha: 0.82, duration: 0.3, ease: 'power3.out' }, 0);
    const kids = el.querySelectorAll('.page-head h2, .page-head .head-act, .page-body > *:not(.profile-root):not(.size-rank):not(:has(.rank-row,.entry,.sp-row,.set-row,.set-member-row)), .size-rank > .sp-banner, .size-rank > .scope');
    if (kids.length) tl.fromTo(kids, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, stagger: { amount: 0.06 }, ease: 'power3.out', clearProps: 'opacity,visibility' }, 0.04);
    return tl;
  }
  function pageOut(el) {
    const tl = transition(el), reduce = reduced();
    if (reduce) tl.set(el, { clearProps: 'transform' });
    tl.to(el, reduce ? { autoAlpha: 0, duration: 0.12 } : { xPercent: 100, duration: 0.22, ease: 'power2.in' }, 0);
    if (document.querySelectorAll('#layers .layer.page').length <= 1) {
      if (reduce) tl.set(under(), { x: 0 }, 0);
      tl.to(under(), { x: 0, autoAlpha: 1, duration: reduce ? 0.12 : 0.22, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0);
    }
    return tl;
  }
  function sheetIn(el) {
    const panel = $('.sheet', el), scrim = $('.scrim', el);
    const tl = transition(el);
    tl.fromTo(scrim, { autoAlpha: 0 }, { autoAlpha: 1, duration: reduced() ? 0.12 : 0.16, ease: 'none', clearProps: 'opacity,visibility' }, 0);
    if (reduced()) return tl.set(panel, { clearProps: 'transform' }, 0).fromTo(panel, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12, clearProps: 'opacity,visibility' }, 0);
    tl.fromTo(panel, { yPercent: 100 }, { yPercent: 0, duration: 0.28, ease: 'power3.out', clearProps: 'transform' }, 0);
    const kids = panel.querySelectorAll('.sheet-head, .sheet-body > *:not(.kv):not(.sp-row):not(:has(.entry,.sp-row,.kv,.set-member-row,.map-catch-row))');
    if (kids.length) tl.fromTo([...kids].slice(0, 8), { y: 6, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.16, stagger: { amount: 0.04 }, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0.03);
    return tl;
  }
  function sheetOut(el) {
    const panel = $('.sheet', el), scrim = $('.scrim', el);
    const tl = transition(el), reduce = reduced();
    if (reduce) tl.set(panel, { clearProps: 'transform' });
    return tl
      .to(panel, reduce ? { autoAlpha: 0, duration: 0.12 } : { yPercent: 100, duration: 0.2, ease: 'power2.in' }, 0)
      .to(scrim, { autoAlpha: 0, duration: reduce ? 0.12 : 0.16, ease: 'none' }, 0);
  }

  // ---------- 主视图切换：按底部导航方向轻推入场（左边的标签从左来、右边的从右来），列表成组错落出现 ----------
  function viewIn(root, dir = 0) {
    const tl = transition(root);
    gsap.killTweensOf(root);
    if (reduced()) return tl.set(root, { clearProps: 'transform' }).fromTo(root, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12, clearProps: 'opacity,visibility' });
    const d = Math.sign(dir || 0);
    tl.fromTo(root, { autoAlpha: 0, x: 12 * d, y: d ? 0 : 4 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.24, ease: 'power3.out', clearProps: 'transform,opacity,visibility' });
    const items = root.querySelectorAll('[data-stagger]:not(.cell):not(.rank-row):not(:has(.ai-candidate))');
    if (items.length) tl.fromTo([...items].slice(0, 12), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.17, stagger: { amount: 0.05 }, ease: 'power3.out', clearProps: 'opacity,visibility' }, 0.02);
    return tl;
  }

  // The caller chooses a freshly replaced region; no app state is observed here.
  function stateIn(root, { distance = 4, duration = .18 } = {}) {
    if (!root) return null;
    const tl = transition(root), reduce = reduced();
    return tl.fromTo(root, { autoAlpha: reduce ? 0 : .6, y: reduce ? 0 : distance },
      { autoAlpha: 1, y: 0, duration: reduce ? .12 : duration, ease: 'power3.out', clearProps: 'transform,opacity,visibility' });
  }
  function listIn(nodes, { distance = 8, duration = .3, spread = .14, limit = Infinity, onComplete } = {}) {
    const items = [...nodes].filter(Boolean).slice(0, limit);
    if (!items.length) return null;
    const reduce = reduced();
    // Individual translate leaves press scale, card tilt and positioned rows alone.
    gsap.killTweensOf(items, 'opacity,translate');
    return managed(gsap.fromTo(items, { opacity: .12, translate: `0px ${reduce ? 0 : distance}px` },
      { opacity: 1, translate: '0px 0px', duration: reduce ? .12 : duration, stagger: { amount: reduce ? 0 : spread }, ease: 'power3.out', clearProps: 'translate,opacity', onComplete }));
  }
  const menus = new WeakMap();
  function menuVisibility(menu, open) {
    if (!menu) return null;
    let state = menus.get(menu);
    if (!state) { state = { pointerEvents: menu.style.pointerEvents }; menus.set(menu, state); }
    const wasHidden = menu.hidden, tl = transition(menu), reduce = reduced();
    menu.setAttribute('aria-hidden', String(!open));
    if (open) {
      menu.hidden = false;
      menu.style.pointerEvents = state.pointerEvents;
      if (wasHidden) gsap.set(menu, { autoAlpha: 0, y: reduce ? 0 : -4 });
      return tl.to(menu, { autoAlpha: 1, y: 0, duration: reduce ? .10 : .18, ease: 'power3.out', clearProps: 'transform,opacity,visibility' });
    }
    menu.style.pointerEvents = 'none';
    return tl.to(menu, { autoAlpha: 0, y: reduce ? 0 : -3, duration: reduce ? .08 : .12, ease: 'power2.in', onComplete: () => {
      if (transitions.get(menu) !== tl) return;
      menu.hidden = true;
      menu.style.pointerEvents = state.pointerEvents;
      gsap.set(menu, { clearProps: 'transform,opacity,visibility' });
    } });
  }


  // ---------- 反馈 ----------
  let toastTl;
  function toast(el, msg, ms) {
    const visible = getComputedStyle(el).visibility !== 'hidden' && Number(gsap.getProperty(el, 'opacity')) > 0;
    const reduce = reduced();
    // 读完再消失：时长随文字长度增长（中文约 60ms/字），最少 2s、最多 5s
    ms = ms ?? Math.min(5000, Math.max(2000, 60 * String(msg).length + 800));
    el.textContent = msg;
    if (toastTl) { toastTl.kill(); running.delete(toastTl); }
    if (!visible) gsap.set(el, { autoAlpha: 0, y: reduce ? 0 : -8, scale: reduce ? 1 : .96 });
    else if (reduce) gsap.set(el, { y: 0 });
    toastTl = gsap.timeline()
      .to(el, { autoAlpha: 1, y: 0, scale: 1, duration: reduce ? 0.12 : 0.24, ease: 'back.out(1.6)', overwrite: 'auto' })
      .to(el, { autoAlpha: 0, y: reduce ? 0 : -6, duration: 0.16, ease: 'power1.in' }, `+=${ms / 1000}`);
    return managed(toastTl);
  }
  function hapticPulse(dot) {
    return managed(gsap.fromTo(dot, { autoAlpha: 1, scale: reduced() ? 1 : 0.8 }, { scale: reduced() ? 1 : 1.35, autoAlpha: 0, duration: reduced() ? 0.12 : 0.28, ease: 'power2.out', overwrite: 'auto' }));
  }
  function nudge(el) {
    gsap.killTweensOf(el, 'x');
    if (reduced()) return;
    return managed(gsap.fromTo(el, { x: 0 }, { keyframes: { x: [-4, 4, 0] }, duration: 0.16, ease: 'none', clearProps: 'transform' }));
  }
  function bump(el) {
    if (reduced()) return;
    return managed(gsap.fromTo(el, { scale: 1 }, { keyframes: { scale: [1, 1.04, 1] }, duration: 0.22, ease: 'power2.out', overwrite: 'auto', clearProps: 'transform' }));
  }
  // Keep everyday feedback local to the heart and count; card unlock owns the celebration.
  function likePop(btn, on) {
    if (!btn) return;
    const heart = btn.querySelector('svg'), num = btn.querySelector('.num');
    const targets = [heart, num].filter(Boolean);
    gsap.killTweensOf(targets);
    if (reduced()) {
      gsap.set(targets, { clearProps: 'transform,opacity,visibility' });
      return;
    }
    const tl = gsap.timeline();
    if (heart) tl.fromTo(heart, { scale: on ? 0.92 : 1.04 }, { scale: 1, duration: 0.22, ease: 'power3.out', clearProps: 'transform' }, 0);
    if (num) tl.fromTo(num, { y: on ? 4 : -4, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.18, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0);
    return managed(tl);
  }
  const counters = new WeakMap();
  function countUp(el, to, opts = {}) {
    const previous = counters.get(el);
    if (previous) { previous.kill(); running.delete(previous); }
    const current = Number(String(el.textContent).replace(/,/g, ''));
    const o = { v: opts.from ?? (Number.isFinite(current) ? current : 0) };
    if (reduced() || o.v === to) { el.textContent = to; return; }
    const animation = gsap.to(o, { v: to, duration: Math.min(.7, Math.max(.4, opts.duration ?? .6)), ease: 'power3.out', snap: { v: 1 }, onUpdate: () => (el.textContent = o.v) });
    counters.set(el, animation);
    return managed(animation, () => { animation.kill(); el.textContent = to; });
  }

  // 图鉴：刚解锁的格子像标签被盖上
  function stampIn(cell) {
    if (!cell) return;
    if (reduced()) return managed(gsap.from(cell, { autoAlpha: 0, duration: 0.12, clearProps: 'opacity,visibility' }));
    return managed(gsap.from(cell, { scale: 1.35, rotation: -6, autoAlpha: 0, duration: 0.5, ease: 'back.out(2.2)', clearProps: 'transform,opacity,visibility' }));
  }
  // 分层统计条从左生长
  function growStrata(bars) {
    if (reduced() || !bars.length) return;
    return managed(gsap.from(bars, { scaleX: 0, duration: 0.6, stagger: { amount: .06 }, ease: 'power3.out', clearProps: 'transform' }));
  }

  // Unlock energy and time escalate per rarity: N quick fade-flip, R adds a ring
  // and sparks, SR a colour burst, SSR rays + particles, UR a multi-stage
  // charge/shake -> flash -> shockwave -> pixel confetti -> golden glow.
  const UNLOCK = {
    N:   { duration: 1.00, flip: .14, turn: .40, text: .62, enter: .18, startScale: .97, lift: 8,  waves: 0, beams: 0,  sparks: 0,  pixels: 0,  flash: 0, glow: 0, rays: 0, shock: 0, shake: 0, radius: 90 },
    R:   { duration: 1.45, flip: .32, turn: .50, text: 1.02, enter: .26, startScale: .94, lift: 14, waves: 1, beams: 0,  sparks: 8,  pixels: 0,  flash: 0, glow: 1, rays: 0, shock: 0, shake: 0, radius: 124 },
    SR:  { duration: 1.95, flip: .58, turn: .58, text: 1.42, enter: .32, startScale: .91, lift: 18, waves: 1, beams: 10, sparks: 12, pixels: 0,  flash: 1, glow: 1, rays: 0, shock: 0, shake: 0, radius: 158 },
    SSR: { duration: 2.45, flip: .86, turn: .66, text: 1.86, enter: .38, startScale: .88, lift: 22, waves: 2, beams: 12, sparks: 16, pixels: 24, flash: 1, glow: 1, rays: 1, shock: 0, shake: 0, radius: 188 },
    UR:  { duration: 3.00, flip: 1.24, turn: .74, text: 2.30, enter: .42, startScale: .84, lift: 26, waves: 3, beams: 18, sparks: 22, pixels: 34, flash: 1, glow: 1, rays: 1, shock: 1, shake: 1, rainbow: 1, radius: 220 },
  };
  const unlocks = new WeakMap();
  const liveUnlocks = new Map();
  function once(fn) {
    let fired = false;
    return () => { if (!fired) { fired = true; if (fn) fn(); } };
  }
  const PALETTE = {
    UR: ['#ffd77a', '#ff8ad8', '#9be7ff', '#c9b8ff', '#fff3c4'],
    SSR: ['#ffd27a', '#ff8ad8', '#7fd6ff', '#9bff9a', '#fff0c2'],
    SR: ['#c5a8ff', '#8b5cf6', '#7fd6ff', '#ff9ad5'],
  };
  function unlockEffects(host, cardHost, config, rarity, reduce) {
    const previous = host.querySelector('.unlock-fx');
    if (previous) previous.remove();
    const hostBox = host.getBoundingClientRect(), cardBox = cardHost.getBoundingClientRect();
    const fx = document.createElement('div');
    fx.className = 'unlock-fx';
    fx.setAttribute('aria-hidden', 'true');
    fx.style.setProperty('--unlock-x', (cardBox.left + cardBox.width / 2 - hostBox.left) + 'px');
    fx.style.setProperty('--unlock-y', (cardBox.top + cardBox.height / 2 - hostBox.top) + 'px');
    fx.style.setProperty('--unlock-size', Math.min(hostBox.width * .76, 380) + 'px');
    const colors = PALETTE[rarity] || ['var(--rc)'];
    const create = (className, count) => Array.from({ length: reduce ? 0 : count }, (_, index) => {
      const node = document.createElement('i');
      node.className = className;
      node.style.color = colors[index % colors.length];
      fx.append(node);
      return node;
    });
    // Background layers first so particles paint on top.
    const glow = create('unlock-glow', config.glow);
    const rays = create('unlock-rays', config.rays);
    const waves = create('unlock-wave', config.waves);
    const shock = create('unlock-shock', config.shock);
    const beams = create('unlock-beam', config.beams);
    const sparks = create('unlock-spark', config.sparks);
    const pixels = create('unlock-pixel', config.pixels);
    const rainbow = create('unlock-rainbow', config.rainbow || 0);
    const flash = create('unlock-flash', config.flash);
    host.prepend(fx);
    return { fx, waves, beams, sparks, pixels, glow, rays, shock, flash, rainbow };
  }

  /**
   * A single seekable timeline owns the scene. Its final sets also run when
   * progress(1, true) skips callbacks, so skip never strands a hidden card or FX.
   */
  function unlockTimeline(host, cardEl, rk, cues = {}) {
    const previous = unlocks.get(host);
    if (previous) previous.kill();
    const rarity = UNLOCK[rk] ? rk : 'N', config = UNLOCK[rarity], reduce = reduced();
    host.classList.add('pixel-unlock', 'liquid-unlock');
    host.dataset.unlockRarity = rarity;
    const q = selector => host.querySelector(selector);
    const cardHost = q('.card-host'), inner = cardEl.querySelector('.card-flip');
    const text = [q('.headline'), q('.sub'), q('.actions')].filter(Boolean);
    const { fx, waves, beams, sparks, pixels, glow, rays, shock, flash: flashes, rainbow } = unlockEffects(host, cardHost, config, rarity, reduce);
    const effects = [...glow, ...rays, ...rainbow, ...waves, ...shock, ...beams, ...sparks, ...pixels, ...flashes];
    const sfx = once(cues.sfx), haptics = once(cues.haptics), flip = once(cues.flip);
    const settled = once(cues.settled);
    let cancelled = false;
    const cancel = reason => { if (!cancelled) { cancelled = true; cues.cancel?.(reason); } };
    // A property setter is rendered by GSAP even when skip suppresses callbacks.
    const face = { get value() { return cardEl.classList.contains('flipped') ? 0 : 1; }, set value(value) { if (value === 1) cardEl.classList.remove('flipped'); } };
    const cleanup = (reason = 'interrupt') => {
      cancel(reason);
      liveUnlocks.delete(host);
      gsap.set(fx, { autoAlpha: 0 });
      if (effects.length) gsap.set(effects, { autoAlpha: 0, clearProps: 'transform' });
      gsap.set([cardHost, ...text], { autoAlpha: 1, clearProps: 'transform,opacity,visibility' });
      gsap.set(inner, { rotationY: 0 });
      cardEl.classList.remove('flipped');
      settled();
    };
    const duration = reduce ? .24 : config.duration;
    const energy = effects.length;
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      data: { kind: 'unlock', rarity, duration, flipAt: reduce ? 0 : config.flip, energy },
      onInterrupt: cleanup,
      onComplete: () => { liveUnlocks.delete(host); settled(); },
    });
    unlocks.set(host, tl);
    liveUnlocks.set(host, { tl, cleanup });
    gsap.set(text, { autoAlpha: 0, y: reduce ? 0 : 8 });
    gsap.set(cardHost, { autoAlpha: 0, scale: reduce ? 1 : config.startScale, y: reduce ? 0 : config.lift });
    gsap.set(inner, { rotationY: reduce ? 0 : 180 });
    gsap.set(fx, { autoAlpha: reduce ? 0 : 1 });
    if (effects.length) gsap.set(effects, { autoAlpha: 0 });
    tl.addLabel('prepare', 0).addLabel('charge', 0).addLabel('reveal', reduce ? 0 : config.flip).addLabel('settled', duration).addLabel('interactive', duration);
    tl.call(sfx, null, 'reveal').call(haptics, null, 'reveal');

    if (reduce) {
      tl.set(face, { value: 1 }, 0)
        .to(cardHost, { autoAlpha: 1, duration: .16 }, 0)
        .to(text, { autoAlpha: 1, duration: .16, stagger: { amount: .04 } }, .04);
    } else {
      const F = config.flip;
      tl.to(cardHost, { autoAlpha: 1, scale: rarity === 'N' ? 1 : .97, y: rarity === 'N' ? 0 : -4, duration: config.enter }, 0);
      // Anticipation: higher tiers hold and compress before the turn.
      if (config.beams) tl.to(cardHost, { scale: .95, y: -8, duration: F - config.enter, ease: 'sine.in' }, config.enter);
      glow.forEach(node => tl.fromTo(node, { scale: .3, autoAlpha: 0 }, { scale: 1, autoAlpha: rarity === 'R' ? .35 : .7, duration: Math.max(.2, F), ease: 'sine.in' }, 0)
        .to(node, { scale: 1.25, autoAlpha: rarity === 'UR' ? .55 : .3, duration: .5, ease: 'power2.out' }, F)
        .to(node, { autoAlpha: 0, duration: .5, ease: 'power1.in' }, config.duration - .55));
      if (config.shake) {
        // UR charge: a tightening tremble that builds into the flash.
        const steps = 9, start = config.enter + .1, span = F - start - .04;
        for (let i = 0; i < steps; i++) {
          const amp = 1.2 + i * .45;
          tl.to(cardHost, { x: (i % 2 ? -1 : 1) * amp, rotation: (i % 2 ? 1 : -1) * amp * .25, duration: span / steps, ease: 'sine.inOut' }, start + i * span / steps);
        }
        tl.to(cardHost, { x: 0, rotation: 0, duration: .08, ease: 'power2.out' }, F - .02);
      }
      tl.set(face, { value: 1 }, 'reveal')
        .call(flip, null, 'reveal')
        .to(inner, { rotationY: 0, duration: config.turn, ease: rarity === 'UR' || rarity === 'SSR' ? 'back.out(1.4)' : 'power3.inOut' }, 'reveal')
        .to(cardHost, { scale: rarity === 'UR' ? 1.06 : rarity === 'SSR' ? 1.03 : 1, y: 0, duration: Math.min(.4, config.turn), ease: 'power3.out' }, F + .02);
      if (rarity === 'UR' || rarity === 'SSR') tl.to(cardHost, { scale: 1, duration: .55, ease: 'elastic.out(1, .6)' }, F + .42);
      tl.to(text, { autoAlpha: 1, y: 0, duration: .26, stagger: { amount: .08 } }, config.text);

      flashes.forEach(node => tl.fromTo(node, { autoAlpha: 0 }, { autoAlpha: rarity === 'UR' ? 1 : rarity === 'SSR' ? .8 : .55, duration: .06, ease: 'none', immediateRender: false }, F - .03)
        .to(node, { autoAlpha: 0, duration: rarity === 'UR' ? .5 : .32, ease: 'power2.out' }, F + .05));
      rays.forEach(node => tl.fromTo(node, { scale: .4, rotation: 0, autoAlpha: 0 }, { scale: 1, rotation: 24, autoAlpha: .8, duration: .45, ease: 'power2.out', immediateRender: false }, F)
        .to(node, { rotation: 70, duration: config.duration - F - .45, ease: 'none' }, F + .45)
        .to(node, { autoAlpha: 0, duration: .55, ease: 'power1.in' }, config.duration - .6));
      rainbow.forEach(node => tl.fromTo(node, { autoAlpha: 0, scale: .6, rotation: 0 }, { autoAlpha: .85, scale: 1.25, rotation: 40, duration: .28, ease: 'power2.out', immediateRender: false }, F)
        .to(node, { autoAlpha: 0, rotation: 120, scale: 1.5, duration: .9, ease: 'power2.in' }, F + .28));
      shock.forEach(node => tl.fromTo(node, { scale: .15, autoAlpha: 1 }, { scale: 2.1, autoAlpha: 0, duration: .7, ease: 'power2.out', immediateRender: false }, F + .02));

      // Lines converge before the turn, then rings, sparks and pixel confetti release.
      beams.forEach((beam, index) => {
        const angle = index * Math.PI * 2 / beams.length + .19;
        const start = .06 + (index % 3) * .05;
        const distance = config.radius * (.84 + (index % 4) * .08);
        tl.fromTo(beam,
          { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance, rotation: angle * 180 / Math.PI + 90, scaleY: .42, autoAlpha: 0 },
          { x: Math.cos(angle) * 34, y: Math.sin(angle) * 34, scaleY: 1, autoAlpha: .8, duration: Math.max(.2, F - start - .08), ease: 'power2.in' }, start)
          .to(beam, { scaleY: .08, autoAlpha: 0, duration: .2, ease: 'power2.out' }, F - .04);
      });
      waves.forEach((wave, index) => {
        const start = F + .06 + index * .12;
        tl.fromTo(wave, { scale: .22, autoAlpha: .75 - index * .1 },
          { scale: 1.15 + index * .16, autoAlpha: 0, duration: .55 + config.waves * .12, ease: 'power2.out', immediateRender: false }, start);
      });
      sparks.forEach((spark, index) => {
        const angle = index * Math.PI * 2 / sparks.length + .28;
        const distance = config.radius * (.58 + (index % 5) * .09);
        const start = F + .1 + (index % 4) * .025;
        const travel = Math.min(.42 + config.sparks * .01, config.duration - start - .05);
        tl.fromTo(spark,
          { x: Math.cos(angle) * 28, y: Math.sin(angle) * 28, scale: .8, autoAlpha: 0 },
          { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance - 12, scale: .35, autoAlpha: .9, duration: travel * .62, ease: 'power2.out' }, start)
          .to(spark, { autoAlpha: 0, scale: 0, duration: travel * .38, ease: 'power1.in' }, start + travel * .62);
      });
      pixels.forEach((px, index) => {
        // Deterministic pseudo-random so replays are identical.
        const r = (n) => { const v = Math.sin((index + 1) * 12.9898 + n * 78.233) * 43758.5453; return v - Math.floor(v); };
        const angle = r(1) * Math.PI * 2, speed = config.radius * (.7 + r(2) * .9);
        const start = F + .04 + r(3) * .12, life = Math.min(.9 + r(4) * .7, config.duration - start - .05);
        const dx = Math.cos(angle) * speed, dy = Math.sin(angle) * speed - 40;
        tl.fromTo(px, { x: 0, y: 0, rotation: 0, scale: 1, autoAlpha: 0 },
          { x: dx, y: dy, rotation: (r(5) - .5) * 540, autoAlpha: 1, duration: life * .45, ease: 'power3.out', immediateRender: false }, start)
          .to(px, { y: dy + 90 + r(6) * 70, autoAlpha: 0, scale: .4, duration: life * .55, ease: 'power1.in' }, start + life * .45);
      });
    }
    tl.set(fx, { autoAlpha: 0 }, 'settled');
    if (effects.length) tl.set(effects, { autoAlpha: 0, clearProps: 'transform' }, 'settled');
    tl.set(face, { value: 1 }, 'settled')
      .set(inner, { rotationY: 0 }, 'settled')
      .set([cardHost, ...text], { autoAlpha: 1, y: 0, x: 0, rotation: 0, scale: 1, clearProps: 'transform,opacity,visibility' }, 'settled');
    return tl;
  }  function settleUnlock(host, reason = 'skip') {
    const record = liveUnlocks.get(host);
    if (!record) return;
    record.tl.progress(1, true);
    record.tl.kill();
    record.cleanup(reason);
  }
  function settleUnlocks(reason) {
    for (const host of [...liveUnlocks.keys()]) settleUnlock(host, reason);
  }

  /** 常驻光晕慢转，离开即 kill */
  function idleGlow(host) {
    if (host.classList.contains('pixel-unlock')) return () => {};
    if (reduced()) return () => {};
    const tw = gsap.to(host.querySelector('.glow'), { rotation: '+=360', duration: 14, ease: 'none', repeat: -1 });
    managed(tw, () => { tw.kill(); gsap.set(host.querySelector('.glow'), { clearProps: 'transform' }); });
    return () => tw.kill();
  }

  const stopMotion = reason => { settleMotion(); settleUnlocks(reason); };
  const onPreferenceChange = () => { if (reduced()) stopMotion('reduced-motion'); };
  if (motionQuery.addEventListener) motionQuery.addEventListener('change', onPreferenceChange);
  else motionQuery.addListener?.(onPreferenceChange);
  document.addEventListener?.('visibilitychange', () => { if (document.hidden) stopMotion('hidden'); });
  window.addEventListener?.('pagehide', () => stopMotion('pagehide'));
  window.addEventListener?.('resize', () => settleUnlocks('resize'));

  window.YK_MOTION = {
    gsap, reduced, pageIn, pageOut, sheetIn, sheetOut, viewIn, stateIn, listIn, menu: menuVisibility, likePop,
    toast, hapticPulse, nudge, bump, countUp, stampIn, growStrata, unlockTimeline, settleUnlock, idleGlow,
  };
})();
