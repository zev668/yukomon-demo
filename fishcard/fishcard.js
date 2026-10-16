// 鱼可梦 · 镭射卡（支持一页多张卡、多种边框主题）
// - 倾斜：指针 / 拖动 / 陀螺仪 → .tilt 的 rotateX/Y，阻尼跟随（expo.out）
// - 视差：各层按 data-depth 平移；镭射、闪粉、高光、金边反光随光位移动
// - 翻面：点击 → .flipper 绕 Y 轴 180°，过程中抬起、轻微缩放，落定时回弹
// - 空闲：无输入时卡面缓慢 8 字漂移，镭射持续流动
// - 主题：.card-wrap[data-theme]（gold / ruby / teal / jade），单卡页可用 ?theme=ruby 切换
(function () {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const clamp = (v) => Math.max(-1, Math.min(1, v));
  const cards = [...document.querySelectorAll('.card-wrap')];
  const single = cards.length === 1;
  const theme = new URLSearchParams(location.search).get('theme');
  if (single && theme) cards[0].dataset.theme = theme;

  document.querySelectorAll('[data-depth]').forEach((el) => el.style.setProperty('--d', el.dataset.depth));

  // ---------- 共享：动态水纹（所有卡共用同一个 SVG 滤镜，噪声频率缓慢变化 → 焦散亮纹流动） ----------
  if (!reduced) {
    const noise = document.getElementById('caustic-noise');
    const wv = { t: 0 };
    gsap.to(wv, { t: 1, duration: 14, ease: 'none', repeat: -1, onUpdate: () => {
      const a = wv.t * Math.PI * 2;
      noise.setAttribute('baseFrequency', `${(0.018 + Math.sin(a) * 0.0028).toFixed(5)} ${(0.026 + Math.cos(a) * 0.0036).toFixed(5)}`);
    } });
  }

  const inst = cards.map(initCard);

  // ---------- 陀螺仪（手机晃动），所有卡一起响应；iOS 需在点击后授权 ----------
  const onTilt = (e) => {
    if (e.gamma == null) return;
    inst.forEach((c) => c.gyro(clamp(e.gamma / 28), clamp((e.beta - 45) / 28)));
  };
  const D = window.DeviceOrientationEvent;
  if (D && typeof D.requestPermission === 'function') {
    addEventListener('click', () => D.requestPermission().then((s) => s === 'granted' && addEventListener('deviceorientation', onTilt)).catch(() => {}), { once: true });
  } else if (D) addEventListener('deviceorientation', onTilt);
  document.addEventListener('mouseleave', () => inst.forEach((c) => c.idle()));

  function initCard(wrap, idx) {
    const q = (s) => wrap.querySelector(s);
    const tilt = q('.tilt'), flipper = q('.flipper'), fish = q('.front .fish');

    // ---------- 气泡：大小 / 速度 / 摆幅各不相同，近大远小 ----------
    const bubbles = q('.bubbles');
    for (let i = 0; i < 16; i++) {
      const b = document.createElement('span');
      const s = rnd(1.4, 5.2);
      b.style.cssText = `left:${rnd(6, 94)}%;width:${s}cqw;height:${s}cqw`;
      bubbles.appendChild(b);
      if (reduced) continue;
      const rise = () => {
        const dur = rnd(6, 11) * (1.2 - s / 10);
        gsap.timeline({ delay: rnd(0, 6), onComplete: rise })
          .set(b, { y: 0, x: 0, opacity: 0, scale: rnd(0.7, 1) })
          .to(b, { opacity: rnd(0.55, 0.95), duration: 0.8, ease: 'power1.out' }, 0)
          .to(b, { y: () => -wrap.offsetHeight * rnd(0.85, 1.1), duration: dur, ease: 'power1.in' }, 0)
          .to(b, { x: `+=${rnd(-14, 14)}`, duration: dur / 3, ease: 'sine.inOut', yoyo: true, repeat: 2 }, 0)
          .to(b, { opacity: 0, scale: 1.25, duration: 0.5, ease: 'power2.in' }, dur - 0.5);
      };
      rise();
    }

    // ---------- 闪星：在主体周围随机闪烁 ----------
    const sparkles = q('.sparkles');
    for (let i = 0; i < 10; i++) {
      const s = document.createElement('b');
      s.style.setProperty('--s', `${rnd(3.5, 7.5)}cqw`);
      sparkles.appendChild(s);
      if (reduced) continue;
      const twinkle = () => {
        gsap.set(s, { left: `${rnd(10, 90)}%`, top: `${rnd(26, 72)}%` });
        gsap.timeline({ delay: rnd(0.4, 3.6), onComplete: twinkle })
          .fromTo(s, { opacity: 0, scale: 0.1, rotation: 0 }, { opacity: 1, scale: 1, rotation: 45, duration: 0.5, ease: 'expo.out' })
          .to(s, { opacity: 0, scale: 0.2, rotation: 90, duration: 0.7, ease: 'power2.in' });
      };
      twinkle();
    }

    // ---------- 水纹漂移 / 周期扫光（多卡时错开节奏） ----------
    if (!reduced) {
      gsap.to(q('.caustics svg'), { x: '3%', y: '2%', scale: 1.06, duration: 7, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: -idx * 1.3 });
      gsap.timeline({ repeat: -1, repeatDelay: 3.2, delay: 1.6 + idx * 0.9 }).fromTo(q('.front .sweep i'), { left: '-50%' }, { left: '130%', duration: 1.4, ease: 'power3.inOut' });
    }

    // ---------- 倾斜 / 光位状态 ----------
    const st = { x: 0, y: 0, hyp: 0, lift: 0 };
    const css = (el, k, v) => el.style.setProperty(k, v);
    let flipped = false;
    const apply = () => {
      const sx = flipped ? -st.x : st.x; // 背面朝前时镜像光位
      [wrap, tilt].forEach((el) => { css(el, '--px', st.x.toFixed(4)); css(el, '--py', st.y.toFixed(4)); css(el, '--lift', st.lift.toFixed(3)); });
      css(tilt, '--ry', `${(st.x * 14).toFixed(3)}deg`);
      css(tilt, '--rx', `${(-st.y * 14).toFixed(3)}deg`);
      css(tilt, '--mx', `${(50 + sx * 48).toFixed(2)}%`);
      css(tilt, '--my', `${(50 + st.y * 48).toFixed(2)}%`);
      css(tilt, '--hyp', st.hyp.toFixed(3));
    };
    const ease = { duration: 0.7, ease: 'expo.out', onUpdate: apply };
    const toX = gsap.quickTo(st, 'x', ease);
    const toY = gsap.quickTo(st, 'y', ease);
    const toH = gsap.quickTo(st, 'hyp', { duration: 0.6, ease: 'power3.out', onUpdate: apply });
    apply();

    // 空闲 8 字漂移（多卡时相位错开）
    let lastInput = 0;
    const t0 = performance.now() - idx * 1700;
    gsap.ticker.add(() => {
      if (reduced || performance.now() - lastInput < 2400) return;
      const t = (performance.now() - t0) / 1000;
      toX(Math.sin(t * 0.55) * 0.5);
      toY(Math.sin(t * 1.1) * 0.28);
      toH(0.3 + Math.sin(t * 0.8) * 0.12);
    });

    const fromPoint = (cx, cy, strong) => {
      const r = wrap.getBoundingClientRect();
      lastInput = performance.now();
      toX(clamp(((cx - r.left) / r.width) * 2 - 1));
      toY(clamp(((cy - r.top) / r.height) * 2 - 1));
      toH(strong ? 1 : 0.72);
    };

    // ---------- 输入：鼠标跟随（单卡页全屏跟随，多卡页仅悬停的卡）；触摸拖动；轻点翻面 ----------
    let down = null;
    (single ? window : wrap).addEventListener('pointermove', (e) => {
      if (e.pointerType === 'mouse' || down) fromPoint(e.clientX, e.clientY, !!down);
    });
    if (!single) wrap.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse' && !down) lastInput = performance.now() - 1600; });
    wrap.addEventListener('pointerdown', (e) => {
      down = { x: e.clientX, y: e.clientY, t: performance.now() };
      wrap.setPointerCapture(e.pointerId);
      fromPoint(e.clientX, e.clientY, true);
      gsap.to(st, { lift: -0.4, duration: 0.18, ease: 'power2.out', onUpdate: apply });
    });
    const release = (e) => {
      if (!down) return;
      const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
      const quick = performance.now() - down.t < 450;
      down = null;
      gsap.to(st, { lift: 0, duration: 0.5, ease: 'back.out(2)', onUpdate: apply });
      if (e.type === 'pointerup' && moved < 10 && quick) flip();
      else if (e.pointerType !== 'mouse') lastInput = performance.now() - 1800; // 松手后不久回到漂移
    };
    wrap.addEventListener('pointerup', release);
    wrap.addEventListener('pointercancel', release);
    wrap.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });

    // ---------- 翻面动画 ----------
    let rotY = 0, flipping = null;
    function flip() {
      flipped = !flipped;
      rotY += 180;
      if (flipping) flipping.kill();
      const dir = st.x >= 0 ? 1 : -1;
      if (reduced) { gsap.set(flipper, { rotationY: rotY }); apply(); return; }
      flipping = gsap.timeline({ onUpdate: apply, onComplete: () => { flipping = null; } })
        .to(st, { lift: 1, duration: 0.32, ease: 'power2.out' }, 0)
        .to(flipper, { scale: 0.94, duration: 0.32, ease: 'power2.out' }, 0)
        .to(flipper, { rotationY: rotY + dir * 8, duration: 0.62, ease: 'power3.inOut' }, 0.06)
        .to(flipper, { rotationY: rotY, duration: 0.55, ease: 'elastic.out(1, 0.55)' }, 0.68)
        .to(st, { hyp: 1, duration: 0.3, ease: 'power1.in' }, 0.1)
        .to(st, { hyp: 0.45, duration: 0.6, ease: 'power2.out' }, 0.5)
        .to(flipper, { scale: 1, duration: 0.6, ease: 'back.out(1.8)' }, 0.62)
        .to(st, { lift: 0, duration: 0.6, ease: 'power3.out' }, 0.62);
      gsap.fromTo(q(flipped ? '.back .glare' : '.front .glare'), { opacity: 1 }, { opacity: 0.45, duration: 1.1, ease: 'power2.out', clearProps: 'opacity' });
    }

    // ---------- 入场：从背面翻入，鱼淡入，文字依次出现（多卡依次入场） ----------
    if (!reduced) {
      gsap.timeline({ delay: idx * 0.14 })
        .from(flipper, { rotationY: -200, scale: 0.55, opacity: 0, duration: 1.4, ease: 'expo.out' })
        .from(fish, { opacity: 0, duration: 0.8, ease: 'power2.out' }, 0.55)
        .from(wrap.querySelectorAll('.front .f-top > *, .front .f-name > *'), { y: 14, opacity: 0, duration: 0.6, stagger: 0.06, ease: 'expo.out' }, 0.7)
        .fromTo(q('.front .sweep i'), { left: '-50%' }, { left: '130%', duration: 1.1, ease: 'power3.inOut' }, 0.9);
    }

    return {
      gyro(x, y) { if (down) return; lastInput = performance.now(); toX(x); toY(y); toH(0.8); },
      idle() { lastInput = 0; },
    };
  }
})();
