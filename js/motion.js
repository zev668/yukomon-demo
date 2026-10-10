/* Yukomon demo —— 动效层（GSAP 3.13 + CustomEase）
 *
 * MOTION THESIS
 *   焦点时刻：鱼卡解锁 —— 每个稀有度一条 gsap.timeline，用 label 编排，可被「跳过」一键 progress(1)。
 *   连续性：  页面推入/抽屉上滑/索引标签墨线滑动、图鉴新格"盖章入册"。
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

  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);

  // ---------- 页面 / 抽屉 ----------
  function pageIn(el) {
    if (reduced()) return gsap.from(el, { autoAlpha: 0, duration: 0.15 });
    return gsap.fromTo(el, { xPercent: 100 }, { xPercent: 0, duration: 0.38, ease: 'expo.out', clearProps: 'transform' });
  }
  function pageOut(el) {
    if (reduced()) return gsap.to(el, { autoAlpha: 0, duration: 0.12 });
    return gsap.to(el, { xPercent: 100, duration: 0.24, ease: 'power2.in' });
  }
  function sheetIn(el) {
    const panel = $('.sheet', el), scrim = $('.scrim', el);
    const tl = gsap.timeline();
    tl.from(scrim, { autoAlpha: 0, duration: 0.2, ease: 'none' }, 0);
    if (reduced()) tl.from(panel, { autoAlpha: 0, duration: 0.15 }, 0);
    else tl.from(panel, { yPercent: 100, duration: 0.42, ease: 'expo.out' }, 0);
    return tl;
  }
  function sheetOut(el) {
    const panel = $('.sheet', el), scrim = $('.scrim', el);
    return gsap.timeline()
      .to(panel, reduced() ? { autoAlpha: 0, duration: 0.12 } : { yPercent: 100, duration: 0.22, ease: 'power2.in' }, 0)
      .to(scrim, { autoAlpha: 0, duration: 0.2, ease: 'none' }, 0);
  }

  // ---------- 主视图切换：只淡入 + 轻微上移，列表成组出现 ----------
  function viewIn(root) {
    if (reduced()) return gsap.from(root, { autoAlpha: 0, duration: 0.15 });
    const tl = gsap.timeline();
    tl.from(root, { autoAlpha: 0, duration: 0.2, ease: 'none' });
    const items = root.querySelectorAll('[data-stagger]');
    if (items.length) tl.from(items, { y: 10, autoAlpha: 0, duration: 0.36, stagger: { each: 0.025, amount: 0.25 } }, 0.04);
    return tl;
  }


  // ---------- 反馈 ----------
  let toastTl;
  function toast(el, msg, ms = 2000) {
    el.textContent = msg;
    if (toastTl) toastTl.kill();
    toastTl = gsap.timeline()
      .fromTo(el, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.26 })
      .to(el, { autoAlpha: 0, y: 6, duration: 0.18, ease: 'power1.in' }, `+=${ms / 1000}`);
  }
  function hapticPulse(dot) {
    gsap.fromTo(dot, { autoAlpha: 1, scale: 0.6 }, { scale: 1.8, autoAlpha: 0, duration: 0.45, ease: 'power2.out' });
  }
  function nudge(el) {
    if (reduced()) return;
    gsap.fromTo(el, { x: 0 }, { keyframes: { x: [-6, 6, -4, 4, 0] }, duration: 0.36, ease: 'none' });
  }
  function bump(el) {
    if (reduced()) return;
    gsap.fromTo(el, { scale: 1 }, { keyframes: { scale: [1, 1.18, 1] }, duration: 0.4, ease: 'power2.out' });
  }
  function countUp(el, to, opts = {}) {
    const o = { v: opts.from || 0 };
    if (reduced()) { el.textContent = to; return; }
    return gsap.to(o, { v: to, duration: opts.duration || 0.8, ease: 'power3.out', snap: { v: 1 }, onUpdate: () => (el.textContent = o.v) });
  }

  // 图鉴：刚入册的格子像标签被盖上
  function stampIn(cell) {
    if (!cell) return;
    if (reduced()) return gsap.from(cell, { autoAlpha: 0, duration: 0.2 });
    return gsap.timeline()
      .from(cell, { scale: 1.35, rotation: -6, autoAlpha: 0, duration: 0.5, ease: 'back.out(2.2)' })
      .fromTo(cell, { boxShadow: '0 0 0 0 rgba(255,214,10,0.9)' }, { boxShadow: '0 0 0 12px rgba(255,214,10,0)', duration: 0.7, ease: 'power2.out', clearProps: 'boxShadow' }, 0.25);
  }
  // 分层统计条从左生长
  function growStrata(bars) {
    if (reduced() || !bars.length) return;
    gsap.from(bars, { scaleX: 0, duration: 0.7, stagger: 0.08, ease: 'expo.out' });
  }

  // ---------- 鱼卡解锁时间线（时长与《卡片资源规范》梯度一致） ----------
  //   N 1.2s · R 1.8s · SR 2.5s · SSR 3.5s · UR 5s（UR 含 0.5s 黑场）
  function burst(box, n, spread) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < n; i++) frag.appendChild(document.createElement('i'));
    box.appendChild(frag);
    const dots = box.querySelectorAll('i');
    return gsap.timeline()
      .set(dots, { x: 0, y: 0, scale: 1, autoAlpha: 1 })
      .to(dots, {
        x: () => Math.cos(Math.random() * Math.PI * 2) * gsap.utils.random(spread * 0.4, spread),
        y: () => Math.sin(Math.random() * Math.PI * 2) * gsap.utils.random(spread * 0.4, spread),
        scale: 0.2, autoAlpha: 0, duration: gsap.utils.random(0.8, 1.2), ease: 'expo.out', stagger: { each: 0.004, from: 'random' },
      });
  }

  /**
   * @param host   .layer.unlock
   * @param cardEl 已 render 的 .yk-card（初始为背面）
   * @param rk     N | R | SR | SSR | UR
   * @param cues   { sfx(), flip(), haptics() } —— 声音/震动挂在时间线上，跳过时不会再触发
   */
  function unlockTimeline(host, cardEl, rk, cues) {
    const q = (s) => host.querySelector(s);
    const cardHost = q('.card-host'), head = q('.headline'), sub = q('.sub'), actions = q('.actions');
    const glow = q('.glow'), rays = q('.rays'), flash = q('.flash'), ring = q('.ring'), pillar = q('.pillar');
    const inner = cardEl.querySelector('.card-flip');
    const flipTo0 = (d, ease) => gsap.to(inner, { rotationY: 0, duration: d, ease });

    gsap.set([head, sub, actions], { autoAlpha: 0, y: 10 });
    gsap.set(cardHost, { autoAlpha: 0, scale: 0.4 });
    gsap.set(inner, { rotationY: 180 });

    const tl = gsap.timeline({ defaults: { ease: 'yk.settle' } });
    const outro = (at) => {
      tl.addLabel('outro', at)
        .to(head, { autoAlpha: 1, y: 0, duration: 0.4 }, 'outro')
        .to(sub, { autoAlpha: 1, y: 0, duration: 0.4 }, 'outro+=0.08')
        .to(actions, { autoAlpha: 1, y: 0, duration: 0.4 }, 'outro+=0.16');
    };

    if (reduced()) {
      tl.call(cues.sfx, null, 0).call(cues.haptics, null, 0)
        .to(cardHost, { autoAlpha: 1, scale: 1, duration: 0.25 }, 0)
        .set(inner, { rotationY: 0 }, 0.2);
      outro(0.3);
      return tl;
    }

    if (rk === 'N') {
      // 纸面的一次轻落：淡入、翻面、落定
      tl.call(cues.sfx, null, 0).call(cues.haptics, null, 0)
        .to(cardHost, { autoAlpha: 1, scale: 1, duration: 0.35 }, 0)
        .call(cues.flip, null, 0.3)
        .add(flipTo0(0.45, 'power2.inOut'), 0.3)
        .to(glow, { autoAlpha: 0.25, duration: 0.5 }, 0.45);
      outro(0.75);
    } else if (rk === 'R') {
      // 水花：涟漪 + 卡片从下方跃出
      tl.call(cues.sfx, null, 0).call(cues.haptics, null, 0)
        .fromTo(ring, { autoAlpha: 0.9, scale: 1 }, { autoAlpha: 0, scale: 14, duration: 0.9, ease: 'expo.out' }, 0.05)
        .fromTo(cardHost, { autoAlpha: 0, scale: 0.6, y: 60 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.55, ease: 'back.out(1.6)' }, 0.15)
        .call(cues.flip, null, 0.55)
        .add(flipTo0(0.55, 'power3.inOut'), 0.55)
        .to(glow, { autoAlpha: 0.35, duration: 0.6 }, 0.7)
        .add(burst(q('.burst'), 16, 150), 0.95);
      outro(1.2);
    } else if (rk === 'SR') {
      // 紫光聚拢 → 快速翻转两圈 → 炸开
      tl.call(cues.sfx, null, 0).call(cues.haptics, null, 0)
        .fromTo(glow, { autoAlpha: 0, scale: 1.8 }, { autoAlpha: 0.5, scale: 0.8, duration: 0.7, ease: 'power2.in' }, 0)
        .to(cardHost, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)' }, 0.25)
        .call(cues.flip, null, 0.9)
        .fromTo(inner, { rotationY: 540 }, { rotationY: 0, duration: 0.9, ease: 'power4.out', immediateRender: false }, 0.9)
        .to(glow, { autoAlpha: 0.45, scale: 1.1, duration: 0.6 }, 1.2)
        .fromTo(flash, { autoAlpha: 0.5 }, { autoAlpha: 0, duration: 0.5, ease: 'power2.out' }, 1.15)
        .to(rays, { autoAlpha: 1, duration: 0.6 }, 1.2)
        .add(burst(q('.burst'), 26, 190), 1.2);
      outro(1.7);
    } else if (rk === 'SSR') {
      // 金色光柱自下而上 → 卡片悬停蓄力 → 翻面落定 + 屏幕微震
      tl.call(cues.sfx, null, 0).call(cues.haptics, null, 0)
        .fromTo(pillar, { autoAlpha: 0, scaleX: 0 }, { autoAlpha: 1, scaleX: 1, duration: 0.6, ease: 'expo.out' }, 0.1)
        .to(glow, { autoAlpha: 0.45, duration: 0.8 }, 0.2)
        .fromTo(cardHost, { autoAlpha: 0, scale: 0.5, y: 80 }, { autoAlpha: 1, scale: 0.92, y: -6, duration: 0.8, ease: 'power3.out' }, 0.35)
        .to(cardHost, { y: 6, duration: 0.45, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 1.15)
        .call(cues.flip, null, 1.6)
        .add(flipTo0(0.6, 'power3.inOut'), 1.6)
        .to(cardHost, { scale: 1, y: 0, duration: 0.5, ease: 'back.out(2)' }, 1.95)
        .fromTo(flash, { autoAlpha: 0.75 }, { autoAlpha: 0, duration: 0.6, ease: 'power2.out' }, 2.1)
        .to(pillar, { autoAlpha: 0, scaleX: 1.8, duration: 0.8 }, 2.1)
        .to(rays, { autoAlpha: 1, duration: 0.6 }, 2.1)
        .add(burst(q('.burst'), 34, 220), 2.1)
        .fromTo(host, { x: 0 }, { keyframes: { x: [-5, 5, -3, 3, 0] }, duration: 0.35, ease: 'none' }, 2.12);
      outro(2.5);
    } else {
      // UR 巨物：0.5s 静默黑场 → 心跳 → 中线裂开 → 水爆闪白 → 卡片破框而出
      const blackout = q('.blackout'), crack = q('.crack');
      tl.set(blackout, { autoAlpha: 1 }, 0)
        .call(cues.sfx, null, 0.5).call(cues.haptics, null, 0)
        .fromTo(blackout, { backgroundColor: '#000' }, { backgroundColor: '#2a0820', duration: 0.12, yoyo: true, repeat: 1, ease: 'power1.out' }, 0.5)
        .fromTo(blackout, { backgroundColor: '#000' }, { backgroundColor: '#3a0a2c', duration: 0.12, yoyo: true, repeat: 1, ease: 'power1.out', immediateRender: false }, 0.95)
        .fromTo(crack, { height: 0, autoAlpha: 1 }, { height: '70%', duration: 0.35, ease: 'expo.in' }, 1.35)
        .to(crack, { scaleX: 60, autoAlpha: 0, duration: 0.3, ease: 'power2.out' }, 1.75)
        .to(blackout, { autoAlpha: 0, duration: 0.3, ease: 'none' }, 1.8)
        .fromTo(flash, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.8, ease: 'power2.out' }, 1.8)
        .fromTo(ring, { autoAlpha: 1, scale: 1 }, { autoAlpha: 0, scale: 30, duration: 1.1, ease: 'expo.out' }, 1.8)
        .fromTo(glow, { autoAlpha: 0, scale: 0.4, rotation: 0 }, { autoAlpha: 0.6, scale: 1, rotation: 120, duration: 2.4, ease: 'power2.out' }, 1.8)
        .fromTo(cardHost, { autoAlpha: 0, scale: 1.6, rotation: -8 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.7, ease: 'expo.out' }, 1.85)
        .call(cues.flip, null, 2.6)
        .fromTo(inner, { rotationY: 900 }, { rotationY: 0, duration: 1.3, ease: 'expo.out', immediateRender: false }, 2.6)
        .to(rays, { autoAlpha: 1, duration: 0.8 }, 2.8)
        .add(burst(q('.burst'), 56, 260), 2.0)
        .add(burst(q('.burst'), 40, 200), 3.2)
        .fromTo(host, { x: 0, y: 0 }, { keyframes: { x: [-8, 8, -6, 6, -3, 0], y: [3, -3, 2, -2, 0, 0] }, duration: 0.5, ease: 'none' }, 1.8);
      outro(3.6);
    }
    return tl;
  }

  /** 常驻光晕慢转（UR 解锁后），离开即 kill */
  function idleGlow(host) {
    if (reduced()) return () => {};
    const tw = gsap.to(host.querySelector('.glow'), { rotation: '+=360', duration: 14, ease: 'none', repeat: -1 });
    return () => tw.kill();
  }

  window.YK_MOTION = {
    gsap, reduced, pageIn, pageOut, sheetIn, sheetOut, viewIn,
    toast, hapticPulse, nudge, bump, countUp, stampIn, growStrata, unlockTimeline, idleGlow,
  };
})();
