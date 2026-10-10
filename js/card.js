/* Yukomon demo —— 视差卡片渲染 + 陀螺仪/指针驱动
 * 参数与《卡片资源规范》第 3 节梯度总表一致 */
(function () {
  const { fishSVG, rng, hash } = window.YK_FISH;

  const RV = {
    N: { name: '普通', color: '#9AA4AE', layers: 3, offset: 6, rotate: 4, unlockMs: 1200 },
    R: { name: '稀有', color: '#3B82F6', layers: 4, offset: 10, rotate: 6, unlockMs: 1800 },
    SR: { name: '超稀有', color: '#8B5CF6', layers: 5, offset: 14, rotate: 8, unlockMs: 2500 },
    SSR: { name: '传说', color: '#F5B83D', layers: 6, offset: 18, rotate: 8, unlockMs: 3500 },
    UR: { name: '巨物', color: '#ff6ad5', layers: 8, offset: 24, rotate: 10, unlockMs: 5000 },
  };
  const HAB = {
    lake: { name: '静水湖泊', top: '#3d7f8c', bot: '#0d2e3a', floor: '#2a4a3a' },
    river: { name: '大江大河', top: '#7a8a6a', bot: '#2a3424', floor: '#4a4a32' },
    stream: { name: '山涧溪流', top: '#6fb8b0', bot: '#1c4a48', floor: '#6a6650' },
    reservoir: { name: '水库', top: '#3f7aa0', bot: '#0b2740', floor: '#2b3f4a' },
    pond: { name: '池塘沟渠', top: '#6a8a4a', bot: '#1f2e16', floor: '#3a3a20' },
    cold: { name: '高山冷水', top: '#8fc6dc', bot: '#173a52', floor: '#5c6a72' },
    estuary: { name: '河口咸淡水', top: '#7aa0a8', bot: '#203a44', floor: '#7a6f55' },
  };
  const STARS = (n) => '★'.repeat(n) + '<i>' + '★'.repeat(5 - n) + '</i>';

  // ---------- 场景图层（程序生成，正式版替换为写实场景图） ----------
  function sceneSVG(hab, seed, kind) {
    const h = HAB[hab] || HAB.lake;
    const r = rng(seed);
    if (kind === 'far') {
      let rays = '';
      for (let i = 0; i < 6; i++) {
        const x = 20 + r() * 260;
        rays += `<polygon points="${x},0 ${x + 18 + r() * 20},0 ${x + 60 + r() * 40},420 ${x + 10},420" fill="#fff" opacity="${0.04 + r() * 0.06}"/>`;
      }
      let far = 'M0,330 ';
      for (let x = 0; x <= 300; x += 20) far += `L${x},${300 + r() * 40} `;
      far += 'L300,420 L0,420 Z';
      return `<svg viewBox="0 0 300 420" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g${seed}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${h.top}"/><stop offset="1" stop-color="${h.bot}"/></linearGradient></defs>
        <rect width="300" height="420" fill="url(#g${seed})"/>${rays}<path d="${far}" fill="${h.floor}" opacity=".55"/></svg>`;
    }
    if (kind === 'mid') {
      let weeds = '';
      for (let i = 0; i < 9; i++) {
        const x = r() * 300, hgt = 80 + r() * 150;
        weeds += `<path d="M${x},420 C${x - 20},${420 - hgt * 0.4} ${x + 25},${420 - hgt * 0.7} ${x + (r() - 0.5) * 30},${420 - hgt}" stroke="${h.floor}" stroke-width="${3 + r() * 4}" fill="none" opacity=".8" stroke-linecap="round"/>`;
      }
      let rocks = '';
      for (let i = 0; i < 4; i++) {
        const x = r() * 300;
        rocks += `<ellipse cx="${x}" cy="${405 + r() * 10}" rx="${30 + r() * 40}" ry="${18 + r() * 16}" fill="${h.floor}" opacity=".9"/>`;
      }
      return `<svg viewBox="0 0 300 420" preserveAspectRatio="xMidYMid slice">${weeds}${rocks}</svg>`;
    }
    if (kind === 'fg') {
      let b = '';
      for (let i = 0; i < 18; i++) {
        const x = r() * 300, y = r() * 420, rad = 1.5 + r() * 6;
        b += `<circle cx="${x}" cy="${y}" r="${rad}" fill="none" stroke="#fff" stroke-width="1" opacity="${0.25 + r() * 0.4}"/><circle cx="${x - rad * 0.3}" cy="${y - rad * 0.3}" r="${rad * 0.25}" fill="#fff" opacity=".5"/>`;
      }
      let silh = '';
      for (let i = 0; i < 3; i++) {
        const x = i === 0 ? -10 : i === 1 ? 300 : r() * 300;
        silh += `<path d="M${x},420 Q${x + 15},300 ${x - 10},200" stroke="#06161f" stroke-width="10" fill="none" opacity=".55" stroke-linecap="round"/>`;
      }
      return `<svg viewBox="0 0 300 420" preserveAspectRatio="xMidYMid slice">${silh}${b}</svg>`;
    }
    return '';
  }

  function particles(n, seed, cls) {
    const r = rng(seed);
    let s = '';
    for (let i = 0; i < n; i++) {
      s += `<span class="${cls}" style="left:${(r() * 100).toFixed(1)}%;top:${(r() * 100).toFixed(1)}%;--s:${(0.5 + r()).toFixed(2)}"></span>`;
    }
    return s;
  }

  function layer(depth, html, cls = '') {
    return `<div class="ly ${cls}" style="--d:${depth}">${html}</div>`;
  }

  function fmtDate(t) {
    const d = new Date(t);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  }

  /**
   * @param sp 鱼种
   * @param o { variant:'normal'|'ur', card: 用户卡片数据, interactive, back: 背面 HTML, giantInfo:{lengthCm, at, city}, size }
   */
  function render(sp, o = {}) {
    const ur = o.variant === 'ur';
    const rk = ur ? 'UR' : sp.rarity;
    const cfg = RV[rk];
    const seed = hash(sp.slug);
    const fish = fishSVG(sp);
    const L = [];

    // —— 按稀有度梯度组装图层 ——
    if (rk === 'N') {
      L.push(layer(-0.6, '', `bg-grad hab-${sp.habitat}`));
      L.push(layer(0.4, fish, 'fish'));
    } else if (rk === 'R') {
      L.push(layer(-0.8, '', `bg-grad bg-tex hab-${sp.habitat}`));
      L.push(layer(0.4, fish, 'fish'));
      L.push('<div class="sheen"></div>');
    } else if (rk === 'SR') {
      L.push(layer(-1, sceneSVG(sp.habitat, seed, 'far'), 'scene'));
      L.push(layer(0.4, fish, 'fish'));
      L.push(layer(1, sceneSVG(sp.habitat, seed + 1, 'fg'), 'fg'));
      L.push('<div class="holo holo-rainbow"></div>');
    } else if (rk === 'SSR') {
      L.push(layer(-1, sceneSVG(sp.habitat, seed, 'far'), 'scene'));
      L.push(layer(-0.4, sceneSVG(sp.habitat, seed + 2, 'mid'), 'mid'));
      L.push(layer(0.4, fish, 'fish fish-sway'));
      L.push(layer(1, particles(22, seed, 'pt pt-gold'), 'particles'));
      L.push('<div class="holo holo-gold"></div>');
    } else {
      L.push(layer(-1, sceneSVG(sp.habitat, seed, 'far'), 'scene'));
      L.push(layer(-0.7, '<div class="caustics"></div>', ''));
      L.push(layer(-0.4, sceneSVG(sp.habitat, seed + 2, 'mid'), 'mid'));
      L.push(layer(1, particles(30, seed, 'pt pt-rainbow') + particles(10, seed + 7, 'pt pt-splash'), 'particles'));
      L.push('<div class="holo holo-glitter"></div><div class="holo holo-rainbow"></div><div class="vignette"></div>');
    }

    const c = o.card || {};
    const stars = c.stars || 0;
    const gi = o.giantInfo;
    const bottom = ur && gi
      ? `<div class="ur-plate"><b>巨物 · ${gi.lengthCm}cm</b><span>${fmtDate(gi.at)} · ${gi.city || ''}</span></div>`
      : `<div class="cd-latin">${sp.latin}</div>
         <div class="cd-meta"><span class="cd-stars">${stars ? STARS(stars) : ''}</span><span>${HAB[sp.habitat].name}${c.bestLengthCm ? ' · 最大 ' + c.bestLengthCm + 'cm' : ''}</span></div>`;

    const front = `
      <div class="card-face card-front">
        <div class="card-clip">${L.join('')}<div class="glare"></div></div>
        ${ur ? `<div class="ly fish fish-break" style="--d:0.6">${fish}</div>` : ''}
        <div class="frame frame-${rk}"></div>
        <div class="cd-top">
          <span class="cd-no">No.${sp.no}</span>
          <span class="cd-badge b-${rk}">${rk}</span>
        </div>
        <div class="cd-name">${sp.name}${ur ? '<em>巨物</em>' : ''}</div>
        <div class="cd-bottom">${bottom}</div>
        ${sp.origin === 'invasive' ? '<div class="cd-tag">入侵物种</div>' : ''}
      </div>`;
    const back = o.back ? `<div class="card-face card-back back-${rk} ${o.backClass || ''}">${o.back}</div>` : '';

    const el = document.createElement('div');
    el.className = `yk-card r-${rk}${o.interactive ? ' interactive' : ''}${o.thumb ? ' thumb' : ''}`;
    el.style.setProperty('--rc', cfg.color);
    el.style.setProperty('--rot', cfg.rotate);
    el.dataset.offset = cfg.offset;
    el.innerHTML = `<div class="card-tilt"><div class="card-flip">${front}${back}</div></div>`;
    return el;
  }

  // ---------- 动作驱动（GSAP：quickSetter 写 CSS 变量，ticker 统一驱动，见 gsap-performance） ----------
  const gsap = window.gsap;
  const M = {
    x: 0, y: 0, tx: 0, ty: 0, base: null, lastGyro: 0, cards: new Map(), ticking: false, listening: false, permission: 'unknown', idle: null,
  };
  const clamp = gsap.utils.clamp(-1, 1);

  // 陀螺仪：灵敏度约为指针的 2.2 倍（转 9° 就到满幅），满幅也放大到 1.7 倍，晃手机时视差和倾斜更明显
  const GYRO_SPAN = 9, GYRO_MAX = 1.7;
  const clampGyro = gsap.utils.clamp(-GYRO_MAX, GYRO_MAX);
  function onOrient(e) {
    if (e.beta == null || e.gamma == null) return;
    if (!M.base) M.base = { b: e.beta, g: e.gamma };
    M.tx = clampGyro((e.gamma - M.base.g) / GYRO_SPAN);
    M.ty = clampGyro((e.beta - M.base.b) / GYRO_SPAN);
    // 基准缓慢跟随当前姿态：换个姿势拿手机后几秒内自动回正，不会一直歪着
    M.base.g += (e.gamma - M.base.g) * 0.01;
    M.base.b += (e.beta - M.base.b) * 0.01;
    M.lastGyro = performance.now();
  }

  function listen() {
    if (M.listening) return;
    M.listening = true;
    window.addEventListener('deviceorientation', onOrient);
  }

  async function requestPermission() {
    const DOE = window.DeviceOrientationEvent;
    if (DOE && typeof DOE.requestPermission === 'function') {
      try {
        M.permission = await DOE.requestPermission();
      } catch (e) {
        M.permission = 'denied';
      }
      if (M.permission === 'granted') listen();
    } else {
      M.permission = DOE ? 'granted' : 'unsupported';
      listen();
    }
    return M.permission;
  }

  function gyroActive() {
    return performance.now() - M.lastGyro < 1500;
  }

  // 帧率无关的低通滤波：等效于 60fps 下 v += (target - v) * 0.15
  function tick(time, deltaMs) {
    const k = 1 - Math.pow(1 - 0.15, deltaMs / 16.667);
    M.x += (M.tx - M.x) * k;
    M.y += (M.ty - M.y) * k;
    M.cards.forEach((set, el) => {
      if (!el.isConnected) return M.cards.delete(el);
      set.x(M.x);
      set.y(M.y);
    });
    if (!M.cards.size) stopTicker();
  }
  function startTicker() {
    if (M.ticking) return;
    M.ticking = true;
    gsap.ticker.add(tick);
  }
  function stopTicker() {
    M.ticking = false;
    gsap.ticker.remove(tick);
  }

  function scaleOffset(el) {
    const w = el.getBoundingClientRect().width || 300;
    el.style.setProperty('--mo', ((+el.dataset.offset * w) / 300).toFixed(2));
  }

  // 没有陀螺仪也没有指针悬停时，卡片缓慢自摆，提示"这张卡会动"
  function startIdle() {
    if (M.idle || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const o = { a: 0 };
    M.idle = gsap.to(o, {
      a: Math.PI * 2, duration: 9, ease: 'none', repeat: -1,
      onUpdate() {
        if (gyroActive() || M.hover) return;
        M.tx = Math.sin(o.a) * 0.55;
        M.ty = Math.cos(o.a * 2) * 0.3;
      },
    });
  }
  function stopIdle() {
    if (M.idle) M.idle.kill();
    M.idle = null;
  }

  /** 让卡片随陀螺仪/指针晃动；返回解除函数 */
  function attach(el) {
    listen();
    M.base = null; // 每次打开卡片重新校准
    scaleOffset(el);
    const onMove = (e) => {
      if (gyroActive()) return;
      M.hover = true;
      const r = el.getBoundingClientRect();
      M.tx = clamp(((e.clientX - r.left) / r.width - 0.5) * 2);
      M.ty = clamp(((e.clientY - r.top) / r.height - 0.5) * 2);
    };
    const onLeave = () => { M.hover = false; if (!gyroActive()) { M.tx = 0; M.ty = 0; } };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('pointercancel', onLeave);
    M.cards.set(el, { x: gsap.quickSetter(el, '--tx'), y: gsap.quickSetter(el, '--ty') });
    startTicker();
    startIdle();
    return () => {
      M.cards.delete(el);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('pointercancel', onLeave);
      M.hover = false;
      if (!M.cards.size) { stopIdle(); M.tx = 0; M.ty = 0; }
    };
  }

  /** 翻面：正面 0° ↔ 背面 180° */
  function flip(el, toBack, opts = {}) {
    const inner = el.querySelector('.card-flip');
    const back = toBack == null ? !el.classList.contains('flipped') : toBack;
    el.classList.toggle('flipped', back);
    return gsap.to(inner, { rotationY: back ? 180 : 0, duration: opts.duration == null ? 0.6 : opts.duration, ease: opts.ease || 'power3.inOut', overwrite: 'auto' });
  }
  function setFace(el, back) {
    el.classList.toggle('flipped', back);
    gsap.set(el.querySelector('.card-flip'), { rotationY: back ? 180 : 0 });
  }

  /** 卡内常驻微动（鱼的呼吸摆动、粒子上浮、水下光斑）；返回 kill 函数 */
  function animate(el) {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const sway = el.querySelectorAll('.fish-sway .fish-svg, .fish-break .fish-svg');
      if (sway.length) gsap.to(sway, { rotation: -1.6, yPercent: -1.2, transformOrigin: '30% 50%', duration: 1.7, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      el.querySelectorAll('.pt').forEach((p) => {
        const d = gsap.utils.random(3, 6);
        gsap.timeline({ repeat: -1, delay: -gsap.utils.random(0, d) })
          .fromTo(p, { y: '10cqw' }, { y: '-30cqw', duration: d, ease: 'none' }, 0)
          .fromTo(p, { autoAlpha: 0 }, { autoAlpha: 1, duration: d * 0.2, ease: 'none' }, 0)
          .to(p, { autoAlpha: 0, duration: d * 0.5, ease: 'none' }, d * 0.5);
      });
      const ca = el.querySelector('.caustics');
      if (ca) gsap.to(ca, { xPercent: 6, yPercent: 4, scale: 1.15, rotation: 4, autoAlpha: 0.6, duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    });
    return () => mm.revert();
  }

  window.YK_CARD = { render, attach, animate, flip, setFace, requestPermission, gyroActive, RV, HAB, STARS, fmtDate, motion: M };
})();
