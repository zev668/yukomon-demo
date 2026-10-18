/* Yukomon demo —— ASCII 字符画层（视觉换皮，不改业务逻辑）
 *
 * MOTION THESIS（参照 impeccable/animate）
 *   焦点时刻：主模块里的鱼被渲染成等宽字符画，入场是「字符解码」——每个字符格先乱跳，
 *             再从中心向外收敛成最终字形（约 700ms）。这是本皮肤唯一的署名动效。
 *   连续性：  保持原有 GSAP 页面 / 抽屉 / 标签切换，不叠加新的转场。
 *   反馈：    点阵进度条按 steps() 逐点点亮；红色字符像心跳一样闪动（纯 CSS，可被系统减弱动效关闭）。
 *   预算：    每个字符画只解码一次，最多约 60×17 格；离开 DOM 即停止；prefers-reduced-motion 直接出最终态。
 *
 * 实现：把现有 fishSVG() 的矢量鱼光栅化到 canvas，按「透明度 × 亮度」映射到字符梯度，
 *       最亮的约 5% 字符染成信号红。挂载点：图鉴概览（.dex-summary）、榜首（.leader .best）、
 *       鱼种巨物榜 banner（.sp-fish）。用 MutationObserver 监听，不需要改 app.js。
 */
(function () {
  'use strict';
  const S = window.YK_STORE, F = window.YK_FISH, M = window.YK_MOTION;
  if (!S || !F) return;
  const gsap = window.gsap;
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const RAMP = ' .:-=+*#%@';
  const NOISE = '.:-=+*#%@01/\\<>[]';
  const RANK = { N: 0, R: 1, SR: 2, SSR: 3, UR: 4 };
  const cache = new Map();

  // ---------- 光栅化：SVG 字符串 → 每格的密度 0..1 ----------
  function sample(svg, cols, rows) {
    return new Promise((resolve) => {
      const img = new Image();
      const SS = 4; // 超采样，抗锯齿
      img.onload = () => {
        const w = cols * SS, h = rows * SS;
        const cv = document.createElement('canvas');
        cv.width = w; cv.height = h;
        const ctx = cv.getContext('2d', { willReadFrequently: true });
        // 字符格宽:高 ≈ 0.6:1，canvas 像素因此是"非正方形"的；按物理尺寸保持鱼的比例（≈2.1:1）
        const CW = 0.6, AR = 2.1;
        const physW = Math.min(cols * CW, rows * AR) * 0.96;
        const dw = (physW / CW) * SS, dh = (physW / AR) * SS;
        ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
        const d = ctx.getImageData(0, 0, w, h).data;
        const out = new Float32Array(cols * rows);
        let max = 0;
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
          let acc = 0, cov = 0;
          for (let y = 0; y < SS; y++) for (let x = 0; x < SS; x++) {
            const i = ((r * SS + y) * w + (c * SS + x)) * 4;
            const a = d[i + 3] / 255;
            const lum = (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) / 255;
            // 透明度决定"有没有"，亮度决定"多亮"；暗色鱼背也保持可见
            acc += a * (0.45 + 0.55 * lum);
            cov += a;
          }
          const v = acc / (SS * SS), cv2 = cov / (SS * SS);
          const val = cv2 < 0.08 ? 0 : Math.max(v, 0.12 + 0.2 * cv2);
          out[r * cols + c] = val;
          if (val > max) max = val;
        }
        if (max > 0) for (let i = 0; i < out.length; i++) out[i] /= max;
        resolve(out);
      };
      img.onerror = () => resolve(null);
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    });
  }

  // ---------- 密度 → 字符网格（含色阶与红色高光） ----------
  function toGrid(v, cols, rows, seed) {
    const cells = [];
    const rnd = F.rng(seed || 1);
    for (let i = 0; i < v.length; i++) {
      const x = v[i];
      if (x <= 0.04) { cells.push(null); continue; }
      const ch = RAMP[Math.min(RAMP.length - 1, 1 + Math.floor(x * (RAMP.length - 1)))];
      // 红色只做点缀：约 7% 的高密度字符
      const tone = x > 0.62 && rnd() < 0.07 ? 'r' : x < 0.3 ? 't0' : x < 0.5 ? 't1' : x < 0.78 ? 't2' : 't3';
      cells.push([ch, tone]);
    }
    // 裁掉上下空行，字符画高度贴合鱼体
    let top = 0, bot = rows - 1;
    const empty = (r) => { for (let c = 0; c < cols; c++) if (cells[r * cols + c]) return false; return true; };
    while (top < bot && empty(top)) top++;
    while (bot > top && empty(bot)) bot--;
    return { cells: cells.slice(top * cols, (bot + 1) * cols), cols, rows: bot - top + 1 };
  }

  function gridHTML(g) {
    let html = '';
    for (let r = 0; r < g.rows; r++) {
      let run = '', runTone = null;
      const flush = () => { if (run) html += runTone ? `<span class="${runTone}">${run}</span>` : run; run = ''; };
      for (let c = 0; c < g.cols; c++) {
        const cell = g.cells[r * g.cols + c];
        const tone = cell ? cell[1] : null;
        const ch = cell ? cell[0] : ' ';
        if (tone !== runTone) { flush(); runTone = tone; }
        run += ch === '<' ? '&lt;' : ch;
      }
      flush();
      html += '\n';
    }
    return html;
  }

  async function asciiOf(sp, cols, rows) {
    const key = sp.no + ':' + cols + 'x' + rows;
    if (cache.has(key)) return cache.get(key);
    const p = sample(F.fishSVG(sp), cols, rows).then((v) => (v ? toGrid(v, cols, rows, F.hash(sp.slug || sp.no)) : null));
    cache.set(key, p);
    return p;
  }

  // ---------- 字符解码入场 ----------
  function decode(pre, g) {
    const final = gridHTML(g);
    if (reduced() || !pre.isConnected) { pre.innerHTML = final; return; }
    const { cols, rows, cells } = g;
    const cx = (cols - 1) / 2, cy = (rows - 1) / 2;
    const order = new Float32Array(cells.length);
    for (let i = 0; i < cells.length; i++) {
      const x = i % cols, y = (i / cols) | 0;
      const d = Math.hypot((x - cx) * 0.6, y - cy) / Math.hypot(cx * 0.6, cy);
      order[i] = d * 0.75 + Math.random() * 0.25;
    }
    const DUR = 720;
    let t0 = 0;
    const frame = (now) => {
      if (!pre.isConnected) return;
      if (!t0) t0 = now;
      const p = Math.min(1, (now - t0) / DUR);
      const e = 1 - Math.pow(1 - p, 3);
      if (p >= 1) { pre.innerHTML = final; return; }
      let html = '';
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c, cell = cells[i];
          if (!cell) { html += ' '; continue; }
          if (order[i] <= e) {
            const ch = cell[0] === '<' ? '&lt;' : cell[0];
            html += `<span class="${cell[1]}">${ch}</span>`;
          } else if (order[i] <= e + 0.35) {
            const n = NOISE[(Math.random() * NOISE.length) | 0];
            html += `<span class="t1">${n === '<' ? '&lt;' : n}</span>`;
          } else html += ' ';
        }
        html += '\n';
      }
      pre.innerHTML = html;
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  // 按容器宽度决定字符尺寸：cols 固定，字号 = 宽度 / (cols × 0.6)
  async function mount(host, sp, cols, rows, maxFont) {
    if (!host || !sp || host.dataset.ascii === sp.no) return;
    host.dataset.ascii = sp.no;
    const g = await asciiOf(sp, cols, rows);
    if (!g || !host.isConnected) return;
    let pre = host.querySelector(':scope > .ascii-art');
    if (!pre) { pre = document.createElement('pre'); pre.className = 'ascii-art'; pre.setAttribute('aria-hidden', 'true'); host.append(pre); }
    const w = host.clientWidth || 300;
    const fs = Math.min(maxFont || 12, w / (cols * 0.6));
    pre.style.fontSize = fs.toFixed(2) + 'px';
    pre.style.lineHeight = '1';
    host.classList.add('has-ascii');
    decode(pre, g);
  }

  // ---------- 挂载点 ----------
  function bestOwned(root) {
    const cells = [...root.querySelectorAll('.tray .cell')].filter((c) => c.querySelector('.yk-card'));
    let best = null;
    cells.forEach((c) => {
      const sp = S.byId[c.dataset.sp];
      if (sp && (!best || RANK[sp.rarity] > RANK[best.rarity])) best = sp;
    });
    return best || S.SPECIES[0];
  }
  function scan(root) {
    // 图鉴概览不再放字符画（按批注删除），只保留榜首与巨物榜 banner
    root.querySelectorAll('.leader .best').forEach((b) => {
      const sp = S.SPECIES.find((s) => s.name === b.getAttribute('title'));
      mount(b, sp, 44, 16, 7);
    });
    root.querySelectorAll('.sp-banner').forEach((ban) => {
      const no = (ban.querySelector('.tagno')?.textContent || '').replace(/^No\./i, '').trim();
      mount(ban.querySelector('.sp-fish'), S.byId[no], 80, 30, 8);
    });
  }

  // 双色标题：图鉴进度的标签改成「两行：灰 / 白」
  function retitle(root) {
    root.querySelectorAll('.dex-summary .ds-top .eyebrow').forEach((e) => {
      if (e.dataset.two) return;
      e.dataset.two = '1';
      e.innerHTML = '我的淡水鱼<br><span style="color:#fff">图鉴进度</span>';
    });
  }

  // ---------- 平滑圆角（Figma corner smoothing 60%）----------
  // 读取元素自身的 border-radius，生成 Figma 同款 squircle 路径，作为 clip-path: path() 套上。
  // 算法同 figma-squircle（preserveSmoothing）；尺寸变化由 ResizeObserver 重算。
  const SMOOTH = 0.6;
  const SQ_SEL = [
    '.tile', '.dex-summary', '.facts', '.settings-group .box', '.entry', '.rank-row', '.size-row', '.sp-row',
    '.met-row', '.callout', '.hero-photo', '.sp-banner', '.cell .slot', '.view-catch .bento', '.protect-link',
    '.protect ol', '.mount', '.publish-media', '.sheet', '.sp-stats > div', '.entry .ph', '.link-box', '.share-view .tile',
  ].join(',');
  const rad = (d) => (d * Math.PI) / 180;
  function cornerParams(R, budget) {
    let s = SMOOTH, p = (1 + s) * R;
    const arcMeasure = 90 * (1 - s);
    const arc = Math.sin(rad(arcMeasure / 2)) * R * Math.SQRT2;
    const alpha = (90 - arcMeasure) / 2;
    const p34 = R * Math.tan(rad(alpha / 2));
    const beta = 45 * s;
    const c = p34 * Math.cos(rad(beta));
    const d = c * Math.tan(rad(beta));
    let b = (p - arc - c - d) / 3, a = 2 * b;
    if (p > budget) {
      const max13 = budget - d - arc - c;
      const minA = max13 / 6;
      b = Math.min(b, max13 - minA);
      a = max13 - b;
      p = Math.min(p, budget);
    }
    return { a, b, c, d, p, arc, R };
  }
  const f = (n) => +n.toFixed(2);
  function squirclePath(w, h, rs) {
    const budget = Math.min(w, h) / 2;
    const [tl, tr, br, bl] = rs.map((r) => (r > 0 ? cornerParams(Math.min(r, budget), budget) : null));
    let s = `M ${f(w - (tr ? tr.p : 0))} 0 `;
    if (tr) { const { a, b, c, d, arc, R } = tr; s += `c ${f(a)} 0 ${f(a + b)} 0 ${f(a + b + c)} ${f(d)} a ${f(R)} ${f(R)} 0 0 1 ${f(arc)} ${f(arc)} c ${f(d)} ${f(c)} ${f(d)} ${f(b + c)} ${f(d)} ${f(a + b + c)} `; }
    s += `L ${f(w)} ${f(h - (br ? br.p : 0))} `;
    if (br) { const { a, b, c, d, arc, R } = br; s += `c 0 ${f(a)} 0 ${f(a + b)} ${f(-d)} ${f(a + b + c)} a ${f(R)} ${f(R)} 0 0 1 ${f(-arc)} ${f(arc)} c ${f(-c)} ${f(d)} ${f(-(b + c))} ${f(d)} ${f(-(a + b + c))} ${f(d)} `; }
    s += `L ${f(bl ? bl.p : 0)} ${f(h)} `;
    if (bl) { const { a, b, c, d, arc, R } = bl; s += `c ${f(-a)} 0 ${f(-(a + b))} 0 ${f(-(a + b + c))} ${f(-d)} a ${f(R)} ${f(R)} 0 0 1 ${f(-arc)} ${f(-arc)} c ${f(-d)} ${f(-c)} ${f(-d)} ${f(-(b + c))} ${f(-d)} ${f(-(a + b + c))} `; }
    s += `L 0 ${f(tl ? tl.p : 0)} `;
    if (tl) { const { a, b, c, d, arc, R } = tl; s += `c 0 ${f(-a)} 0 ${f(-(a + b))} ${f(d)} ${f(-(a + b + c))} a ${f(R)} ${f(R)} 0 0 1 ${f(arc)} ${f(-arc)} c ${f(c)} ${f(-d)} ${f(b + c)} ${f(-d)} ${f(a + b + c)} ${f(-d)} `; }
    return s + 'Z';
  }
  const radii = new WeakMap();
  function applySquircle(el) {
    const w = el.offsetWidth, h = el.offsetHeight;
    if (!w || !h) return;
    let rs = radii.get(el);
    if (!rs) {
      const cs = getComputedStyle(el);
      rs = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].map((v) => parseFloat(v) || 0);
      radii.set(el, rs);
    }
    const budget = Math.min(w, h) / 2;
    // 胶囊 / 正圆不做平滑（Figma 对这类形状也几乎无变化）；无圆角的也跳过
    if (rs.every((r) => r === 0) || rs.every((r) => r >= budget - 0.5)) { el.style.clipPath = ''; return; }
    const path = squirclePath(w, h, rs);
    el.style.clipPath = `path('${path}')`;
    el.classList.add('yk-sq');
    // Reuse the clipping contour so the glass rim follows the smoothed corners.
    if (el.matches('.dex-summary')) {
      let rim = el.querySelector(':scope > .summary-glass-rim');
      if (!rim) {
        rim = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        rim.classList.add('summary-glass-rim');
        rim.setAttribute('aria-hidden', 'true');
        rim.setAttribute('focusable', 'false');
        rim.innerHTML = '<path class="rim-edge"/><path class="rim-light"/>';
        el.append(rim);
      }
      rim.setAttribute('viewBox', `0 0 ${w} ${h}`);
      rim.firstElementChild.setAttribute('d', path);
      rim.lastElementChild.setAttribute('d', squirclePath(w - 2, h - 2, rs.map((r) => Math.max(0, r - 1))));
      rim.lastElementChild.setAttribute('transform', 'translate(1 1)');
    }
  }
  const sqSeen = new WeakSet();
  const ro = 'ResizeObserver' in window ? new ResizeObserver((es) => es.forEach((e) => applySquircle(e.target))) : null;
  function squircleAll(root) {
    if (!ro || !CSS.supports('clip-path', "path('M0 0 L1 0 L1 1 Z')")) return;
    root.querySelectorAll(SQ_SEL).forEach((el) => {
      if (sqSeen.has(el) || el.closest('.yk-card')) return;
      sqSeen.add(el);
      ro.observe(el);
    });
  }

  const app = document.querySelector('#app');
  let queued = false;
  const run = () => { queued = false; retitle(app); scan(app); squircleAll(app); };
  new MutationObserver(() => { if (!queued) { queued = true; requestAnimationFrame(run); } })
    .observe(app, { childList: true, subtree: true });

  // 主题色（浏览器地址栏）
  const meta = document.querySelector('meta[name=theme-color]');
  if (meta) meta.setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--canvas').trim());

  window.YK_ASCII = { asciiOf, mount, gridHTML, squirclePath };
})();
