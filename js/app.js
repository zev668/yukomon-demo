/* Yukomon demo —— 页面逻辑：记录渔获、图鉴、排行榜、钓手图鉴页、鱼卡解锁、分享链接
 * 鱼种由用户自己选择，提交即解锁；没有识别/上传环节。动效统一走 motion.js（GSAP）。 */
(function () {
  'use strict';
  const S = window.YK_STORE, C = window.YK_CARD, A = window.YK_AUDIO, F = window.YK_FISH, M = window.YK_MOTION;
  const gsap = M.gsap;
  S.load();
  Object.assign(A.settings, S.db.settings || {});

  // ---------- 小工具 ----------
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (x) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[x]));
  const el = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const pad2 = (n) => String(n).padStart(2, '0');
  const fmtFull = (t) => { const d = new Date(t); return `${C.fmtDate(t)} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`; };
  // Shared rarity token used by summary stats, filters and card badges.
  const rb = (r) => `<span class="rb rarity-badge ${r}" data-rarity="${esc(r)}">${esc(r)}</span>`;
  const tagno = (no) => `<span class="tagno">No.${no}</span>`;
  const RARITIES = ['N', 'R', 'SR', 'SSR', 'UR', 'SP'];
  const GEAR = [['rod', '鱼竿', '如：溪流竿1.8m UL'], ['reel', '鱼轮', '如：喜玛诺26款Majestic'], ['line', '鱼线', '如：PE 0.8号'], ['bait', '鱼饵', '如：米诺9cm']];
  const DESC_MAX = 40;
  const svg = (d) => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
  const svgBox = (viewBox, d) => `<svg class="i fill" viewBox="${viewBox}" aria-hidden="true" fill="currentColor">${d}</svg>`;
  const assetIcon = (src, label) => `<img class="i asset-icon" src="${src}" alt=""${label ? ` aria-label="${label}"` : ''}>`;
  const ICON = {
    back: svg('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
    arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    chev: svg('<path d="M9 6l6 6-6 6"/>'),
    close: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
    plus: svg('<path d="M12 5v14M5 12h14"/>'),
    search: svg('<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>'),
    gear: '<svg class="i fill" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84a.47.47 0 0 0-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.01-1.58zM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z"/></svg>',
    camera: svg('<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>'),
    fish: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12c3-4.5 7-6 11-6 3 0 5.5 2.5 7 6-1.5 3.5-4 6-7 6-4 0-8-1.5-11-6z"/><path d="M3 12l-1-4M3 12l-1 4"/><circle cx="16" cy="11" r="0.8"/></svg>',
    heart: svg('<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>'),
    logo: `<svg class="brand" viewBox="6 179 674 326" aria-hidden="true"><path d="M141.205 479.932L74.1064 498.459V490.447L140.704 475.926L141.205 479.932ZM214.312 250.096L121.176 323.202L140.704 469.917L74.1064 480.934L78.1123 343.732L12.0156 257.105L65.0938 207.533L104.15 279.639L170.748 207.533L165.74 185L214.312 250.096ZM321.469 289.152C320.968 291.823 321.168 298.967 325.975 306.178C330.781 313.388 336.657 320.531 338.994 323.202L269.393 352.245L334.988 388.298L314.959 420.345L267.39 370.271C265.387 382.289 265.287 408.026 280.909 414.836C274.499 417.24 253.535 436.535 243.854 445.882C239.676 437.144 238.653 414.586 237.55 390.082C234.209 419.307 224.905 442.116 204.297 443.378C179.761 444.88 137.77 417.212 134.695 380.786C131.959 348.356 162.135 305.878 179.761 310.684C197.369 315.486 225.534 328.605 235.366 352.596C233.082 326.266 228.603 305.152 217.316 306.178L269.393 289.152L267.39 323.202L321.469 289.152ZM347.507 396.31L324.473 429.858L318.965 424.851L336.49 391.803L347.507 396.31ZM493.977 279.639C495.646 290.655 502.489 317.894 516.51 338.725C534.035 364.762 541.046 370.771 546.554 372.774C538.942 377.582 518.679 392.136 509.499 398.812L484.463 345.735C479.289 353.58 468.94 370.872 468.939 377.281C468.939 383.69 470.609 387.296 471.443 388.298C458.591 380.286 432.287 362.961 429.883 357.753C429.883 366.966 424.375 374.778 429.883 413.835L391.827 416.339C390.659 405.156 388.522 379.284 389.323 365.264C390.325 347.738 391.827 295.662 380.811 289.152C380.811 289.152 402.343 284.145 419.868 279.639C421.868 290.638 461.807 330.59 461.93 330.713L467.938 294.16L493.977 279.639ZM196.786 344.734C187.273 340.228 187.772 353.748 183.767 357.253C180.562 360.056 177.09 358.421 175.755 357.253C172.751 369.771 183.767 394.306 196.786 392.805C209.805 391.302 206.3 349.241 196.786 344.734ZM327.733 341.729C329.736 323.703 364.787 323.202 382.813 329.211C390.324 341.229 382.814 384.292 367.291 391.803C337.247 391.802 328.401 358.421 327.733 341.729ZM671.981 289.152L649.949 381.287L614.397 342.23C614.064 350.075 615.199 366.966 622.409 371.773C611.994 373.776 598.374 376.614 592.866 377.782C589.695 355.082 582.651 306.277 579.847 292.657C580.514 293.659 582.751 295.862 586.356 296.663C589.962 297.464 604.55 295.662 611.394 294.66C612.896 306.01 619.005 330.713 631.423 338.725C632.625 329.911 637.932 292.991 640.436 275.633L671.981 289.152ZM530.53 322.201C539.21 311.185 559.372 292.257 570.589 304.675C584.609 320.197 585.11 361.258 578.601 367.768C572.09 374.277 522.519 356.751 522.519 318.195L530.53 322.201ZM358.891 342.831C349.579 342.541 348.583 365.441 360.928 362.036C372.741 358.777 368.202 343.122 358.891 342.831ZM568.83 331.715C565.224 322.502 552.64 326.541 546.798 329.712C544.294 341.729 559.817 348.74 565.826 349.741C571.835 350.743 573.337 343.232 568.83 331.715ZM673.484 283.144L641.938 270.625V264.616L673.484 283.144ZM614.309 257.621C613.808 240.095 618.715 205.746 642.35 208.55C665.984 211.354 659.647 235.978 653.365 240.096C641.763 247.7 620.818 244.602 614.309 257.621ZM569.242 214.058C567.822 192.597 601.192 196.275 598.03 217.141C596.027 230.36 597.116 240.597 598.785 250.11C585.265 244.602 570.632 235.055 569.242 214.058Z" fill="currentColor"/></svg>`,
    lock: svg('<rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
    rank: `<svg class="i fill" viewBox="0 0 200 200" aria-hidden="true"><path d="M168.796 96.3788H139.722V169H169.033C175.083 169 180 163.992 180 157.837V107.726C180.004 101.475 174.993 96.4008 168.796 96.3788ZM130.134 41.1958C130.134 35.0194 125.212 30 119.167 30H81.8309C75.7816 30 70.862 35.026 70.862 41.1958L70.8663 169H130.138V96.9771H130.129V41.1958M21 79.1957V157.837C21 163.989 25.9219 169 31.9668 169H61.2865V67.9295H32.198C26.0222 67.9273 21.0131 72.9665 21 79.1957Z" fill="currentColor"/></svg>`,
    rankLine: svg('<path d="M4 19V9h4v10M10 19V4h4v15M16 19v-7h4v7"/><path d="M3 20h18"/>'),
    trophy: svg('<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 20h8M10 17h4"/>'),
    ruler: svg('<path d="M4 17.5 17.5 4 20 6.5 6.5 20z"/><path d="m13 8 3 3M10.5 10.5l3 3M8 13l3 3"/>'),
    pin: svg('<path d="M12 21s-6-5.6-6-11a6 6 0 0 1 12 0c0 5.4-6 11-6 11z"/><circle cx="12" cy="10" r="2.2"/>'),
    locate: svg('<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>'),
    eye: svg('<path d="M2.5 12s3.2-5 9.5-5 9.5 5 9.5 5-3.2 5-9.5 5-9.5-5-9.5-5z"/><circle cx="12" cy="12" r="2.5"/>'),
    copy: svg('<rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),
    trash: svg('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7l1-3h4l1 3"/>'),
  };

  // Keep utility icons as stroke-based line art so they match the compact controls.
  // Product-supplied filled icon set. Keep the same viewBox proportions as the source SVGs.
  ICON.gear = svgBox('0 0 1024 1024', '<path d="M469.333 60.693a85.333 85.333 0 0 1 85.334 0l326.826 188.715a85.333 85.333 0 0 1 42.667 73.899v377.386a85.333 85.333 0 0 1-42.667 73.899L554.667 963.307a85.333 85.333 0 0 1-85.334 0L142.507 774.592a85.333 85.333 0 0 1-42.667-73.899V323.307a85.333 85.333 0 0 1 42.667-73.899zM512 134.592 185.173 323.307v377.386L512 889.408l326.827-188.715V323.307zM512 341.333a170.667 170.667 0 1 1 0 341.334 170.667 170.667 0 0 1 0-341.334zm0 85.334a85.333 85.333 0 1 0 0 170.666 85.333 85.333 0 0 0 0-170.666z"/>');
  ICON.rank = svgBox('0 0 1127 1024', '<path d="M921.6 358.4h-153.6V153.6C768 68.762 699.238 0 614.4 0H460.8C375.962 0 307.2 68.762 307.2 153.6v204.8H153.6C68.762 358.4 0 427.162 0 512v409.6C0 978.176 45.824 1024 102.4 1024h870.4c56.525 0 102.4-45.824 102.4-102.4V512c0-84.838-68.762-153.6-153.6-153.6zM307.2 921.6H138.24c-19.814 0-35.84-16.026-35.84-35.84V537.6c0-42.394 34.406-76.8 76.8-76.8h128v460.8zm358.4 0H409.6V179.2c0-42.445 34.406-76.8 76.8-76.8h102.4c42.394 0 76.8 34.355 76.8 76.8v742.4zm307.2-30.72c0 16.947-13.773 30.72-30.72 30.72H768V460.8h128c42.394 0 76.8 34.406 76.8 76.8v353.28z"/>');
  ICON.camera = svg('<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>');
  ICON.album = svgBox('0 0 1024 1024', '<path d="M938.667 553.92V768c0 64.8-52.534 117.333-117.334 117.333H202.667C137.867 885.333 85.333 832.8 85.333 768V256c0-64.8 52.534-117.333 117.334-117.333h618.666c64.8 0 117.334 52.533 117.334 117.333v297.92zM874.667 479.296V256a53.333 53.333 0 0 0-53.334-53.333H202.667A53.333 53.333 0 0 0 149.333 256v344.48A290.09 290.09 0 0 1 192 597.333a286.88 286.88 0 0 1 183.296 65.845C427.029 528.384 556.907 437.333 704 437.333c65.707 0 126.997 16.779 170.667 41.963zm0 82.24c-5.334-8.32-21.131-21.653-43.648-32.917-34.251-17.131-77.974-27.285-127.019-27.285-121.771 0-229.131 76.266-270.432 188.693-2.731 7.445-7.403 20.32-13.995 38.581-7.68 21.301-34.453 28.107-51.37 13.056-16.437-14.635-28.555-25.067-36.139-31.147A222.89 222.89 0 0 0 192 661.333c-14.464 0-28.725 1.366-42.667 4.054V768a53.333 53.333 0 0 0 53.334 53.333h618.666A53.333 53.333 0 0 0 874.667 768V561.536zM320 480a96 96 0 1 1 0-192 96 96 0 0 1 0 192zm0-64a32 32 0 1 0 0-64 32 32 0 0 0 0 64z"/>');
  ICON.flipCamera = svgBox('0 0 1024 1024', '<path d="M233.92 230.251l61.76 61.76A255.872 255.872 0 0 0 170.667 512c0 139.2 111.125 252.459 249.493 255.915L426.667 768h96.469L457.6 702.464l60.331-60.331 25.365 25.366-.064.085 166.741 166.72c-31.893 11.157-65.92 17.707-101.333 18.837l-.192.171-.171-.149-5.461.128L597.333 853.333H426.667C238.144 853.333 85.333 700.523 85.333 512c0-116.992 58.88-220.245 148.587-281.749zM597.333 170.667C785.856 170.667 938.667 323.477 938.667 512c0 116.992-58.88 220.245-148.587 281.749l-61.76-61.76A255.872 255.872 0 0 0 853.333 512c0-141.376-114.624-256-256-256h-96.469l65.515 65.515-60.331 60.33-118.016-118.037.064-.043-74.069-74.069a340.288 340.288 0 0 1 101.333-18.837l.213.171 5.44-.128 5.504-.235h170.666z"/>');
  ICON.trophy = svgBox('0 0 1024 1024', '<path d="M777.2 419.6H356.3V299.8h-.1c1.3-84.7 70.5-153.2 155.5-153.2S666 215.2 667.2 299.9c-.1 1.2-.2 2.5-.2 3.7 0 22.1 17.9 40 40 40 22 0 39.8-17.7 40-39.7h.2V302c0-62.9-24.5-122-69-166.5S574.6 66.5 511.7 66.5c-62.9 0-122 24.5-166.5 69-43.9 43.9-68.3 102.2-68.9 164.2v119.8h-30c-46.5 0-84.2 37.8-84.2 84.2v372c0 46.5 37.8 84.2 84.2 84.2h531c46.5 0 84.2-37.8 84.2-84.2v-372c0-46.3-37.8-84.1-84.3-84.1zM781.5 875.8c0 2.3-2 4.2-4.2 4.2h-531c-2.3 0-4.2-2-4.2-4.2v-372c0-2.3 2-4.2 4.2-4.2h531c2.3 0 4.2 2 4.2 4.2v372z"/>');
  ICON.ruler = svgBox('0 0 1024 1024', '<path d="M365.382 311.855c102.4 0 211.782 62.836 274.618 155.927 11.636 18.618 32.582 32.582 55.855 34.909h11.636c18.618 0 37.236-6.982 51.2-18.618l107.055-90.764c11.636-9.309 20.945-11.636 30.254-11.636 13.964 0 25.6 6.982 34.909 16.291 16.291 18.618 13.964 48.873-4.655 65.164l-102.4 86.109c-18.618 16.291-30.255 39.564-27.927 62.836 0 23.273 11.636 46.545 30.255 62.836l102.4 83.782c18.618 16.291 23.273 44.218 6.982 65.164-9.309 11.636-20.945 16.291-34.909 16.291-6.982 0-18.618-2.327-27.927-9.309L742.72 639.909c-13.964-11.636-32.582-18.618-51.2-18.618h-9.309c-20.945 2.327-41.891 13.964-53.527 30.255-65.164 81.455-165.236 134.982-258.327 134.982C209.455 872.727 86.109 721.455 86.109 591.127s118.691-279.272 279.273-279.272z"/>');
  const mono = (name, cls = '') => `<span class="mono ${cls}" aria-hidden="true">${esc([...String(name || '钓')][0])}</span>`;
  const rankMedal = (rank) => {
    const file = ({ 1: 'rank-first.svg', 2: 'rank-second.svg', 3: 'rank-third.svg' })[Number(rank)];
    return file ? `<span class="n rank-medal"><img src="img/${file}" alt="第${rank}名"></span>` : `<span class="n">${esc(rank)}</span>`;
  };

  const toast = (msg, ms) => M.toast($('#toast'), msg, ms);
  document.addEventListener('yk-haptic', () => M.hapticPulse($('#haptic-dot')));
  document.addEventListener('pointerdown', () => A.unlock(), { once: true });

  // 没有真实照片时的占位：一张标本板（纸底 + 鱼体 + 比例尺 + 标签）
  const plateCache = {};
  function plate(sp, label) {
    const key = (sp ? sp.no : 'x') + (label || '');
    if (plateCache[key]) return plateCache[key];
    const fish = sp ? F.fishSVG(sp).replace('<svg ', '<svg x="110" y="90" width="420" height="200" ') : '';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480">
      <rect width="640" height="480" fill="#eae5da"/>
      ${fish}
      <g stroke="#111110" stroke-width="2" fill="none"><path d="M60 392h200M60 384v16M110 388v8M160 384v16M210 388v8M260 384v16"/></g>
      <text x="60" y="424" font-size="15" fill="#6a6453" font-family="Arial,sans-serif">0        10       20 cm</text>
      <rect x="400" y="372" width="196" height="62" rx="16" fill="#ffffff"/>
      <text x="414" y="398" font-size="19" fill="#111110" font-weight="800" font-family="Arial,sans-serif">${esc(sp ? sp.name : label || '未定种')}</text>
      <text x="414" y="421" font-size="14" fill="#6a6453" font-style="italic" font-family="Arial,sans-serif">${esc(sp ? sp.latin : '')}</text>
      <text x="40" y="54" font-size="14" font-weight="700" fill="#6a6453" font-family="Arial,sans-serif">示例照片</text></svg>`;
    return (plateCache[key] = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg));
  }
  const photoOf = (c) => c.photo || plate(S.byId[c.speciesId], c.protectedName);

  // ---------- 图层：整页 / 底部抽屉 ----------
  const layers = [];
  function openLayer(node, kind) {
    const rec = { node, kind, cleanups: [], closing: false };
    $('#layers').append(node);
    layers.push(rec);
    if (kind === 'page') M.pageIn(node);
    else if (kind === 'sheet') M.sheetIn(node);
    return rec;
  }
  function closeLayer(rec, instant) {
    if (!rec || rec.closing) return;
    rec.closing = true;
    layers.splice(layers.indexOf(rec), 1);
    const done = () => { rec.cleanups.forEach((fn) => fn()); rec.node.remove(); if (!$('#layers .layer.page')) gsap.set('#view', { clearProps: 'transform,opacity,visibility' }); };
    if (instant) return done();
    if (rec.kind === 'unlock') return gsap.to(rec.node, { autoAlpha: 0, duration: 0.2, ease: 'none', onComplete: done });
    (rec.kind === 'page' ? M.pageOut(rec.node) : M.sheetOut(rec.node)).eventCallback('onComplete', done);
  }
  const closeAll = () => { layers.slice().forEach((r) => closeLayer(r, true)); gsap.killTweensOf('#view'); gsap.set('#view', { clearProps: 'transform,opacity,visibility' }); };
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLayer(layers[layers.length - 1]);
    else if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('div[role="button"]')) { e.preventDefault(); e.target.click(); }
  });

  // 全局二级流程顶部：返回按钮 + 当前页标题，吸顶 + 毛玻璃底板（页面层、发布确认、编辑信息共用）
  const subHead = (title, attr = 'data-close', cls = '') => `<header class="page-head sub-head ${cls}"><button class="icon-btn" ${attr} aria-label="返回">${ICON.back}</button><h2>${esc(title)}</h2></header>`;
  function page(title, body) {
    const node = el(`<div class="layer page">${subHead(title)}<div class="page-body">${body}</div></div>`);
    const rec = openLayer(node, 'page');
    $('[data-close]', node).onclick = () => closeLayer(rec);
    return rec;
  }
  function sheet(title, body, cls = '') {
    const node = el(`<div class="layer sheet-wrap"><div class="scrim"></div><section class="sheet ${cls}" role="dialog" aria-label="${esc(title)}"><div class="grab"></div><div class="sheet-head"><h3>${esc(title)}</h3><button class="icon-btn" data-close aria-label="关闭">${ICON.close}</button></div><div class="sheet-body">${body}</div></section></div>`);
    const rec = openLayer(node, 'sheet');
    $('.scrim', node).onclick = $('[data-close]', node).onclick = () => closeLayer(rec);
    return rec;
  }
  function confirmSheet(title, text, okLabel, onOk) {
    const rec = sheet(title, `<p class="muted" style="margin:0 0 16px">${esc(text)}</p><div class="row"><button class="btn grow" data-no>取消</button><button class="btn grow primary" data-ok>${esc(okLabel)}</button></div>`);
    $('[data-no]', rec.node).onclick = () => closeLayer(rec);
    $('[data-ok]', rec.node).onclick = () => { closeLayer(rec); onOk(); };
  }

  // ---------- 主视图：渔获 / 图鉴 / 排行榜 ----------
  const state = { tab: 'dex', rank: 'nation', board: 'unlock', draft: null, stamp: null };
  const myCtx = { me: true, filter: 'all' };
  function render(animate) {
    const view = $('#view');
    view.onclick = view.oninput = null;
    view.scrollTop = 0;
    view.className = 'view-' + state.tab;
    $$('#tabbar button').forEach((b) => b.classList.toggle('on', b.dataset.tab === state.tab));
    if (state.tab !== 'catch') { stopCamera(); lastPubStep = null; }
    document.body.classList.toggle('cam-on', state.tab === 'catch' && publishStep === 'capture');
    // 发布的确认渔获 / 编辑信息属于二级流程：收起底部导航
    document.body.classList.toggle('pub-sub', state.tab === 'catch' && publishStep !== 'capture');
    if (state.tab === 'catch') renderPublish(view);
    else if (state.tab === 'dex') mountDex(view, myCtx, animate);
    else renderRank(view);
    if (animate) M.viewIn(view, TAB_ORDER[state.tab] - TAB_ORDER[prevTab]);
    prevTab = state.tab;
  }
  const TAB_ORDER = { dex: 0, catch: 1, rank: 2 };
  let prevTab = state.tab;
  function go(tab) { state.tab = tab; render(true); }

  // ============================================================
  // 渔获：登记表
  // ============================================================
  function blankForm() {
    const db = S.db, c = S.CITIES[db.me.city] || S.CITIES.杭州;
    return {
      photo: '', source: '', speciesId: '',
      location: { city: db.me.city in S.CITIES ? db.me.city : '杭州', district: c.districts[0], place: c.places[0], lat: c.lat, lng: c.lng },
      desc: '', gear: { rod: '', reel: '', line: '', bait: '' }, lengthCm: '', released: true,
    };
  }
  function draft() {
    if (!state.draft) {
      const b = blankForm(), d = S.db.draft;
      state.draft = d ? { ...b, ...d, gear: { ...b.gear, ...(d.gear || {}) } } : b;
    }
    return state.draft;
  }
  const saveDraft = () => { S.db.draft = draft(); S.save(); };
  const resetDraft = () => { state.draft = null; S.db.draft = null; S.save(); };
  const missing = (d) => [!d.photo && '照片', !d.speciesId && '鱼种', !(Number(d.lengthCm) > 0) && '全长', !d.desc.trim() && '描述'].filter(Boolean);

  function compress(file) {
    return new Promise((resolve, reject) => {
      const rd = new FileReader();
      rd.onerror = reject;
      rd.onload = () => {
        const im = new Image();
        im.onerror = reject;
        im.onload = () => {
          const k = Math.min(1, 720 / Math.max(im.width, im.height));
          const cv = document.createElement('canvas');
          cv.width = Math.round(im.width * k);
          cv.height = Math.round(im.height * k);
          cv.getContext('2d').drawImage(im, 0, 0, cv.width, cv.height);
          resolve(cv.toDataURL('image/jpeg', 0.68));
        };
        im.src = rd.result;
      };
      rd.readAsDataURL(file);
    });
  }

  function hintsHTML(d) {
    const sp = S.byId[d.speciesId];
    if (!sp) return '';
    let h = '';
    const tip = S.confusableTip(sp);
    if (tip) h += `<div class="callout warn"><b>先核对一下：</b>${esc(tip)}。如果是保护种，请在鱼种列表底部改选"保护鱼类"。</div>`;
    if (sp.releasePolicy === 'forbid') h += '<div class="callout bad">这是外来入侵物种，请勿放回自然水域。</div>';
    const len = Number(d.lengthCm);
    if (len && len >= sp.giantThresholdCm) {
      h += d.source === 'album'
        ? `<div class="callout info">${len}cm 已达到${esc(sp.name)}的巨物线（${sp.giantThresholdCm}cm），但相册照片不能解锁巨物卡。</div>`
        : `<div class="callout info">${len}cm 达到${esc(sp.name)}的巨物线（${sp.giantThresholdCm}cm），收入囊中后直接解锁巨物卡。照片里最好有尺子或量鱼板。</div>`;
    }
    return h;
  }

  let publishStep = 'capture';
  // 应用内取景：切到「发布」即打开相机。拍照 = 截一帧；拍视频 = MediaRecorder 录制，再按一次停止
  const cam = { stream: null, facing: 'environment', mode: 'image', rec: null, chunks: [], timer: null, started: 0 };
  function stopCamera() {
    if (cam.rec && cam.rec.state !== 'inactive') { cam.rec.onstop = null; try { cam.rec.stop(); } catch (e) {} }
    cam.rec = null; clearInterval(cam.timer); cam.timer = null;
    if (cam.stream) cam.stream.getTracks().forEach((t) => t.stop());
    cam.stream = null;
  }
  async function startCamera(view) {
    const video = $('.cam-live', view), msg = $('.cam-msg', view);
    if (!video) return;
    stopCamera();
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { msg.hidden = false; msg.innerHTML = '<b>当前环境不能直接打开相机</b><span>请用 HTTPS 链接或 APP 打开；也可以点右侧「相册」选择照片或视频</span>'; return; }
    try {
      const want = { video: { facingMode: { ideal: cam.facing }, width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: cam.mode === 'video' };
      let stream;
      try { stream = await navigator.mediaDevices.getUserMedia(want); } catch (e) { if (!want.audio) throw e; stream = await navigator.mediaDevices.getUserMedia({ video: want.video }); }
      if (!video.isConnected || state.tab !== 'catch' || publishStep !== 'capture') { stream.getTracks().forEach((t) => t.stop()); return; }
      cam.stream = stream; video.srcObject = stream; video.muted = true; await video.play().catch(() => {});
      video.classList.toggle('mirror', cam.facing === 'user');
      msg.hidden = true;
    } catch (e) {
      msg.hidden = false;
      msg.innerHTML = e && e.name === 'NotAllowedError' ? '<b>没有相机权限</b><span>请在系统设置里允许使用相机，或点右侧「相册」选择</span><button class="btn sm" data-retry>重新打开相机</button>' : '<b>相机打开失败</b><span>可以点右侧「相册」选择照片或视频</span><button class="btn sm" data-retry>重试</button>';
      const r = $('[data-retry]', msg); if (r) r.onclick = () => startCamera(view);
    }
  }
  async function useMedia(d, file, source) {
    if (file.size > 60 * 1024 * 1024) return toast('请选择小于 60MB 的视频或图片');
    const old = d.videoId;
    if (file.type.startsWith('video/')) {
      const info = await window.YK_MEDIA.probeVideo(file), id = S.uuid();
      if (await window.YK_MEDIA.put(id, file) == null) throw new Error('storage');
      d.photo = info.poster; d.videoId = id; d.duration = info.duration;
    } else { d.photo = await window.YK_MEDIA.compressImage(file); d.videoId = null; d.duration = 0; }
    if (old && old !== d.videoId) window.YK_MEDIA.del(old);
    d.source = source;
    saveDraft(); stopCamera(); publishStep = 'preview'; render();
  }
  let lastPubStep = null;
  function renderPublish(view) {
    const d = draft();
    if (publishStep !== 'capture') stopCamera();
    // 步骤之间的过渡：前进从右推入，后退从左推入；取景页淡入
    const ORDER = { capture: 0, preview: 1, edit: 2 };
    const dir = lastPubStep == null ? 0 : Math.sign(ORDER[publishStep] - ORDER[lastPubStep]);
    if (lastPubStep !== publishStep && lastPubStep != null && !M.reduced()) {
      requestAnimationFrame(() => {
        const root = view.firstElementChild;
        if (!root) return;
        gsap.fromTo(root, { x: 40 * dir, autoAlpha: dir ? 0.2 : 0 }, { x: 0, autoAlpha: 1, duration: 0.45, ease: 'expo.out', clearProps: 'transform,opacity,visibility' });
        if (publishStep === 'preview') gsap.from($$('.publish-media, .confirm-bar .btn', view), { y: 16, scale: 0.97, autoAlpha: 0, duration: 0.5, stagger: 0.06, ease: 'expo.out', clearProps: 'all' });
        if (publishStep === 'edit') gsap.from($$('.screen > *', view).slice(0, 8), { y: 16, autoAlpha: 0, duration: 0.45, stagger: 0.035, ease: 'expo.out', clearProps: 'all' });
      });
    }
    lastPubStep = publishStep;
    if (publishStep === 'edit' && d.photo) {
      renderCatchForm(view);
      view.insertAdjacentHTML('afterbegin', subHead('编辑信息', 'data-pub-back'));
      $('.mount', view).innerHTML = `<img src="${esc(d.photo)}" alt="渔获封面"><span class="shot-meta pill ${d.source === 'camera' ? 'ok' : 'warn'}">${d.source === 'camera' ? '现场拍摄' : '相册'}</span>`;
      $('[data-pub-back]', view).onclick = () => { publishStep = 'preview'; render(); };
      return;
    }
    const preview = publishStep === 'preview' && d.photo;
    if (preview) {
      view.innerHTML = `<div class="publish-capture is-preview">
        ${subHead('确认渔获', 'data-pub-exit', 'on-dark')}
        <div class="publish-media"><img src="${esc(d.photo)}" alt="待发布渔获"></div>
        <div class="confirm-bar"><button class="btn ghost" data-retake>重拍</button><button class="btn accent next" data-next>下一步</button></div></div>`;
      $('[data-pub-exit]', view).onclick = $('[data-retake]', view).onclick = () => { publishStep = 'capture'; render(); };
      $('[data-next]', view).onclick = () => { publishStep = 'edit'; render(); };
      if (d.videoId) window.YK_MEDIA.get(d.videoId).then((blob) => {
        if (!blob || !view.querySelector('.is-preview')) return;
        const host = $('.publish-media', view), video = document.createElement('video');
        video.controls = true; video.playsInline = true; video.poster = d.photo;
        const url = URL.createObjectURL(blob); video.src = url; host.replaceChildren(video);
        const observer = new MutationObserver(() => { if (!video.isConnected) { video.pause(); URL.revokeObjectURL(url); observer.disconnect(); } });
        observer.observe(view, { childList: true, subtree: true });
      });
      return;
    }
    const canRec = typeof window.MediaRecorder === 'function';
    view.innerHTML = `<div class="publish-capture cam" data-mode="${cam.mode}">
      <div class="cam-stage"><video class="cam-live" playsinline muted autoplay></video>
        <div class="cam-msg"><b>正在打开相机…</b></div>
        <div class="cam-rec" hidden><i></i><span class="num">00:00</span></div></div>
        <header class="cam-top"><button class="icon-btn glass" data-pub-exit aria-label="关闭">${ICON.close}</button><span class="grow"></span><button class="icon-btn glass" data-flip aria-label="翻转镜头">${ICON.flipCamera}</button></header>
      <div class="cam-bottom">
        <div class="cam-modes" role="tablist"><button role="tab" class="${cam.mode === 'image' ? 'on' : ''}" data-cmode="image">拍照</button><button role="tab" class="${cam.mode === 'video' ? 'on' : ''}" data-cmode="video" ${canRec ? '' : 'disabled title="当前浏览器不支持录像，请用相册选择视频"'}>拍视频</button></div>
        <div class="cam-row"><span class="cam-side"></span>
          <button class="shutter ${cam.mode === 'video' ? 'video' : ''}" data-shoot aria-label="${cam.mode === 'video' ? '开始录像' : '拍照'}"><i></i></button>
          <span class="cam-side"><button class="album-btn" data-album aria-label="相册">${d.photo ? `<img src="${esc(d.photo)}" alt="">` : ICON.album}<span>相册</span></button></span></div>
      </div>
      <input type="file" data-library accept="image/*,video/*" hidden></div>`;
    const root = $('.publish-capture', view), live = $('.cam-live', view), shoot = $('[data-shoot]', view);
    $('[data-pub-exit]', view).onclick = () => { stopCamera(); go('dex'); };
    $('[data-flip]', view).onclick = () => { if (cam.rec) return; cam.facing = cam.facing === 'user' ? 'environment' : 'user'; startCamera(view); };
    $$('[data-cmode]', view).forEach((b) => (b.onclick = () => {
      if (cam.rec || b.dataset.cmode === cam.mode) return;
      cam.mode = b.dataset.cmode; root.dataset.mode = cam.mode;
      $$('[data-cmode]', view).forEach((x) => x.classList.toggle('on', x === b));
      shoot.classList.toggle('video', cam.mode === 'video');
      shoot.setAttribute('aria-label', cam.mode === 'video' ? '开始录像' : '拍照');
      if (!M.reduced()) gsap.fromTo($('i', shoot), { scale: 0.6 }, { scale: 1, duration: 0.35, ease: 'back.out(2.4)' });
      if (cam.mode === 'video') startCamera(view); // 录像需要麦克风，重新取流
    }));
    $('[data-album]', view).onclick = () => $('[data-library]', view).click();
    $('[data-library]', view).onchange = async (e) => { const f = e.target.files[0]; if (!f) return; try { await useMedia(d, f, 'album'); } catch (err) { toast('媒体读取或保存失败，请换一个文件重试'); } };
    shoot.onclick = async () => {
      if (!cam.stream) return toast('相机还没打开，可以先从相册选择');
      if (cam.mode === 'image') {
        if (!live.videoWidth) return;
        A.haptic('light');
        if (!M.reduced()) gsap.fromTo($('.cam-stage', view), { filter: 'brightness(2.2)' }, { filter: 'brightness(1)', duration: 0.35, clearProps: 'filter' });
        const url = window.YK_MEDIA.frame(live, live.videoWidth, live.videoHeight, 1280, cam.facing === 'user');
        d.photo = url; d.videoId = null; d.duration = 0; d.source = 'camera';
        saveDraft(); stopCamera(); publishStep = 'preview'; return render();
      }
      // 录像：再按一次结束
      if (cam.rec) { cam.rec.stop(); return; }
      const type = ['video/mp4', 'video/webm;codecs=vp9,opus', 'video/webm'].find((t) => MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t)) || '';
      let rec;
      try { rec = new MediaRecorder(cam.stream, type ? { mimeType: type } : undefined); } catch (e) { return toast('当前设备无法录像，请用相册选择视频'); }
      cam.rec = rec; cam.chunks = []; cam.started = performance.now();
      root.classList.add('recording'); shoot.setAttribute('aria-label', '停止录像');
      const badge = $('.cam-rec', view); badge.hidden = false;
      const tick = () => { const s = Math.floor((performance.now() - cam.started) / 1000); $('span', badge).textContent = `${pad2(Math.floor(s / 60))}:${pad2(s % 60)}`; if (s >= 60 && cam.rec) cam.rec.stop(); };
      cam.timer = setInterval(tick, 250);
      rec.ondataavailable = (e) => { if (e.data && e.data.size) cam.chunks.push(e.data); };
      rec.onstop = async () => {
        clearInterval(cam.timer); cam.timer = null; cam.rec = null;
        root.classList.remove('recording'); badge.hidden = true;
        const blob = new Blob(cam.chunks, { type: (rec.mimeType || 'video/webm').split(';')[0] });
        if (!blob.size) return toast('没有录到内容，再试一次');
        try { await useMedia(d, new File([blob], 'catch.' + (blob.type.includes('mp4') ? 'mp4' : 'webm'), { type: blob.type }), 'camera'); } catch (e) { toast('视频保存失败，请重试'); }
      };
      rec.start(500); A.haptic('medium');
    };
    startCamera(view);
  }

  function renderCatchForm(view) {
    const d = draft(), sp = S.byId[d.speciesId], p = d.location;
    const gearRow = ([k, label, ph]) => `
      <div class="gear-row"><label for="g-${k}">${label}</label><input id="g-${k}" data-gear="${k}" maxlength="30" placeholder="${ph}" value="${esc(d.gear[k] || '')}"></div>
      `;
    view.innerHTML = `<div class="screen">
      <div class="mount" data-stagger>
        ${d.photo
    ? `<img src="${esc(d.photo)}" alt="渔获照片"><span class="shot-meta pill ${d.source === 'camera' ? 'ok' : 'warn'}">${d.source === 'camera' ? '现场拍摄' : '相册照片'}</span><span class="shot-act"><button class="btn sm" data-act="retake">换一张</button></span>`
    : `<div class="empty-shot dark"><span class="eyebrow">新渔获</span><h2>先拍下<br>这条鱼</h2><p>鱼体完整、侧面朝上最好</p>
          <div class="shot-actions"><button class="btn accent" data-act="camera">${ICON.camera}拍照</button><button class="btn" data-act="album">相册</button><button class="btn quiet" data-act="sample">用示例照片</button></div></div>`}
      </div>
      ${d.source === 'album' ? '<p class="note">相册照片可以解锁鱼卡，但不计入排行榜、星级和巨物卡。</p>' : ''}

      <div class="bento">
        <div class="tile species-pick span2" data-act="species" role="button" tabindex="0" data-stagger>
          <div class="grow"><span class="eyebrow">鱼种<span class="req-mark">*</span>${sp ? ` · No.${sp.no}` : ''}</span>
            ${sp
    ? `<div class="nm">${esc(sp.name)} ${rb(sp.rarity)}</div><div class="sub latin">${esc(sp.latin)}</div>`
    : `<div class="placeholder">选择鱼种</div><div class="sub">${S.SPECIES.length} 种淡水鱼，可搜名字或别名</div>`}</div>
          ${sp ? `<div class="fish">${F.fishSVG(sp)}</div>` : `<span class="plus">${ICON.plus}</span>`}
        </div>
        <div id="hints" class="span2">${hintsHTML(d)}</div>
        <div class="tile field" data-act="location" role="button" tabindex="0" data-stagger><span class="eyebrow">钓点</span><div class="val">${esc(p.place)}<small>${esc(p.city)} · ${esc(p.district)}</small></div></div>
        <label class="tile field size-tile" data-stagger><span class="eyebrow">全长<span class="req-mark">*</span></span><span class="size"><input id="f-len" data-field="lengthCm" type="number" inputmode="decimal" min="1" max="300" placeholder="0" aria-label="全长，单位厘米" value="${esc(d.lengthCm)}"><span>cm</span></span></label>
        <div class="tile desc-tile span2" data-stagger><label class="eyebrow" for="f-desc">描述<span class="req-mark">*</span></label>
          <textarea id="f-desc" data-field="desc" maxlength="${DESC_MAX}" placeholder="一句话说说这条鱼，会显示在分享卡片背面">${esc(d.desc)}</textarea><span class="count" id="desc-count">${d.desc.length}/${DESC_MAX}</span></div>
        ${sp && sp.releasePolicy === 'forbid' ? '' : `<div class="tile inline-tile span2"><div class="grow"><b>已放流</b><div class="muted" style="font-size:13px">拍完照已放回水里</div></div><button class="switch ${d.released ? 'on' : ''}" data-act="released" role="switch" aria-checked="${!!d.released}" aria-label="已放流"></button></div>`}
      </div>

      <div class="tile gear"><span class="eyebrow">装备信息 · 选填</span>
        ${GEAR.map(gearRow).join('')}
      </div>

      <div class="submit-bar"><button class="cta" data-act="submit"><span>收入囊中</span><i class="dot">${ICON.arrow}</i></button></div>
      <input id="in-camera" type="file" accept="image/*" capture="environment" hidden>
      <input id="in-album" type="file" accept="image/*" hidden>
    </div>`;

    view.oninput = (e) => {
      const f = e.target.dataset.field, g = e.target.dataset.gear;
      if (f) d[f] = e.target.value;
      if (g) d.gear[g] = e.target.value;
      saveDraft();
      $('#desc-count', view).textContent = `${d.desc.length}/${DESC_MAX}`;
      $('#hints', view).innerHTML = hintsHTML(d);
    };
    view.onclick = (e) => {
      const h = e.target.closest('[data-hist]');
      if (h) { d.gear[h.dataset.hist] = h.dataset.v; saveDraft(); $('#g-' + h.dataset.hist, view).value = h.dataset.v; return; }
      const a = e.target.closest('[data-act]');
      if (!a) return;
      const act = a.dataset.act;
      if (act === 'camera' || act === 'album') $('#in-' + act, view).click();
      else if (act === 'sample') { d.photo = plate(S.byId[d.speciesId] || S.SPECIES[Math.floor(Math.random() * 30)], String(Date.now())); d.source = 'camera'; A.play('ui_shutter'); saveDraft(); render(); }
      else if (act === 'retake') { publishStep = 'capture'; render(); }
      else if (act === 'species') speciesSheet();
      else if (act === 'location') locationSheet();
      else if (act === 'released') { d.released = !d.released; a.classList.toggle('on', d.released); a.setAttribute('aria-checked', d.released); A.haptic('light'); saveDraft(); }
      else if (act === 'submit') submit(a);
    };
    ['camera', 'album'].forEach((kind) => {
      const input = $('#in-' + kind, view);
      input.onchange = async () => {
        if (!input.files[0]) return;
        try { d.photo = await compress(input.files[0]); d.source = kind; A.play('ui_shutter'); saveDraft(); render(); } catch (err) { toast('照片读取失败，换一张试试'); }
      };
    });
  }

  function speciesSheet() {
    const d = draft();
    const row = (sp) => `<div class="sp-row ${sp.no === d.speciesId ? 'picked' : ''}" data-sp="${sp.no}" data-r="${sp.rarity}" data-q="${esc((sp.name + sp.alias.join('') + sp.latin + sp.no).toLowerCase())}" role="button" tabindex="0">
      <div class="fish">${F.fishSVG(sp)}</div>
      <div class="grow"><div class="nm">${esc(sp.name)} ${rb(sp.rarity)}</div><div class="al">${sp.alias.length ? esc(sp.alias.join('、')) + ' · ' : ''}<span class="latin">${esc(sp.latin)}</span></div></div>${tagno(sp.no)}</div>`;
    // 搜索框和筛选固定在抽屉顶部，只有列表滚动
    const rec = sheet('这是什么鱼', `
      <div class="sheet-fixed">
        <div class="search-bar"><input class="search" type="search" placeholder="搜索名字、别名或拉丁学名" aria-label="搜索鱼种"><button class="icon-btn yellow" data-go aria-label="搜索">${ICON.search}</button></div>
        <div class="filter-row">${['全部', ...RARITIES].map((r, i) => `<button class="pill ${i ? '' : 'on'}" data-r="${i ? r : 'all'}">${r}</button>`).join('')}</div>
      </div>
      <div class="sheet-scroll">
        <div class="sp-list list">${S.SPECIES.map(row).join('')}</div>
        <p class="muted sp-none" hidden style="padding:24px 0;text-align:center">没有找到。换个别名试试，比如"黄辣丁"。</p>
        <button class="protect-link" data-protect><span class="grow"><b>钓到的可能是保护鱼类？</b><br><span class="muted">查看 ${S.PROTECTED.length} 种国家重点保护鱼类名录</span></span><span class="chev">${ICON.chev}</span></button>
      </div>`, 'tall split');
    const node = rec.node;
    let rr = 'all';
    const apply = () => {
      const q = $('.search', node).value.trim().toLowerCase();
      let n = 0;
      $$('.sp-row', node).forEach((x) => { const show = (rr === 'all' || x.dataset.r === rr) && (!q || x.dataset.q.includes(q)); x.hidden = !show; n += show; });
      $('.sp-none', node).hidden = n > 0;
      $('.sheet-scroll', node).scrollTop = 0;
    };
    $('.search', node).oninput = apply;
    $('[data-go]', node).onclick = () => { apply(); $('.search', node).focus(); };
    $$('.filter-row .pill', node).forEach((b) => (b.onclick = () => { rr = b.dataset.r; $$('.filter-row .pill', node).forEach((x) => x.classList.toggle('on', x === b)); apply(); }));
    $('.sp-list', node).onclick = (e) => {
      const x = e.target.closest('[data-sp]');
      if (!x) return;
      d.speciesId = x.dataset.sp;
      if (S.byId[d.speciesId].releasePolicy === 'forbid') d.released = false;
      saveDraft();
      closeLayer(rec);
      render();
    };
    $('[data-protect]', node).onclick = () => { closeLayer(rec); protectedSheet(); };
  }

  function protectedSheet() {
    const rec = sheet('国家重点保护鱼类', `<p class="muted" style="margin:0 0 12px;font-size:14px">这些鱼不会发卡，也不计数。选中后会给出放生与上报指引。</p>
      <div class="list">${S.PROTECTED.map((p, i) => `<div class="sp-row" data-i="${i}" role="button" tabindex="0"><div class="grow"><div class="nm">${esc(p.name)}</div><div class="al"><span class="latin">${esc(p.latin)}</span> · ${esc(p.group)}</div></div><span class="pill warn" style="height:28px;font-size:12px">国家${esc(p.level)}</span></div>`).join('')}</div>`);
    rec.node.onclick = (e) => { const x = e.target.closest('[data-i]'); if (x) { closeLayer(rec); protectedPage(S.PROTECTED[+x.dataset.i]); } };
  }
  function protectedPage(p) {
    A.play('ui_protected');
    const rec = page('遇见保护鱼类', `<div class="protect">
      <span class="badge">国家${esc(p.level)}重点保护野生动物</span>
      <h2>${esc(p.name)}</h2><div class="latin muted">${esc(p.latin)}</div>
      <p>${esc(p.whyAnglersMeet)}。</p>
      <ol><li>不要带走、出售或食用</li><li>${esc(p.action)}</li><li>尽量让鱼留在水里，缩短离水时间</li></ol>
      <button class="btn primary block" data-ok>已放生，记下这次遇见</button>
      <p class="muted" style="font-size:12px;text-align:center;margin-top:10px">只留一条遇见记录，不生成鱼卡</p></div>`);
    $('[data-ok]', rec.node).onclick = () => {
      S.encounter({ ...draft() }, p);
      resetDraft();
      closeLayer(rec);
      go('dex');
      toast(`已记下与${p.name}的这次遇见`);
    };
  }

  // 钓点：先用设备定位（GPS），离线演示里匹配到最近的预置城市；正式版在这里接地图 SDK 选点
  function locateMe(rec) {
    const d = draft();
    if (!navigator.geolocation) return toast('这台设备不支持定位');
    toast('正在定位…', 4000);
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      const [city, c] = Object.entries(S.CITIES).sort((a, b) => Math.hypot(a[1].lat - lat, a[1].lng - lng) - Math.hypot(b[1].lat - lat, b[1].lng - lng))[0];
      d.location = { city, district: c.districts[0], place: `${lat.toFixed(4)}, ${lng.toFixed(4)}`, lat, lng };
      saveDraft();
      closeLayer(rec);
      render();
      toast(`已定位，最近的城市：${city}`);
    }, (err) => toast(err.code === 1 ? '没有定位权限，请在系统设置里允许' : '定位失败，请稍后重试或手动选择'), { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 });
  }
  function locationSheet() {
    const d = draft();
    const rec = sheet('选择钓点', `<button class="btn primary locate-btn" data-locate><span>使用当前位置</span><i class="dot">${ICON.locate}</i></button>
      <p class="muted" style="margin:8px 2px 0;font-size:13px">或者从常去的钓点里选：</p>
      ${Object.entries(S.CITIES).map(([city, c]) => `<span class="eyebrow" style="margin:18px 2px 0">${esc(city)}</span><div class="filter-row" style="flex-wrap:wrap">${c.places.map((pl, i) => `<button class="pill ${d.location.place === pl ? 'on' : ''}" data-city="${esc(city)}" data-i="${i}">${esc(pl)}</button>`).join('')}</div>`).join('')}`);
    rec.node.onclick = (e) => {
      if (e.target.closest('[data-locate]')) return locateMe(rec);
      const b = e.target.closest('[data-city]');
      if (!b) return;
      const c = S.CITIES[b.dataset.city], i = +b.dataset.i;
      d.location = { city: b.dataset.city, district: c.districts[i % c.districts.length], place: c.places[i], lat: c.lat + (Math.random() - 0.5) * 0.2, lng: c.lng + (Math.random() - 0.5) * 0.2 };
      saveDraft();
      closeLayer(rec);
      render();
    };
  }

  // 必填项没填：滚到第一个没填的位置，并闪一下提示
  const MISS_TARGET = { 照片: '.mount', 鱼种: '.species-pick', 全长: '.size-tile', 描述: '.desc-tile' };
  function showMissing(miss) {
    const view = $('#view');
    const target = $(MISS_TARGET[miss[0]], view);
    toast('还差：' + miss.join('、'));
    if (!target) return;
    const headH = ($('.sub-head', view) || { offsetHeight: 0 }).offsetHeight;
    const top = target.getBoundingClientRect().top - view.getBoundingClientRect().top + view.scrollTop - 16 - headH;
    gsap.to(view, { scrollTop: Math.max(0, top), duration: M.reduced() ? 0 : 0.45, ease: 'power2.out', overwrite: 'auto' });
    target.classList.remove('need');
    void target.offsetWidth;
    target.classList.add('need');
    gsap.delayedCall(1.6, () => target.classList.remove('need'));
    M.nudge(target);
    if (miss[0] === '描述') gsap.delayedCall(0.45, () => $('#f-desc', view).focus({ preventScroll: true }));
    if (miss[0] === '全长') gsap.delayedCall(0.45, () => $('#f-len', view).focus({ preventScroll: true }));
  }

  function submit(btn) {
    const d = draft();
    const miss = missing(d);
    if (miss.length) return showMissing(miss);
    if (/赌博|色情/.test(`${d.desc}${Object.values(d.gear).join('')}`)) { M.nudge(btn); return toast('描述里有不合适的内容，请修改'); }
    const err = S.precheck(d);
    if (err) { M.nudge(btn); return toast(err); }
    const res = S.checkin({ ...d, desc: d.desc.trim(), lengthCm: Number(d.lengthCm) }, d.speciesId);
    resetDraft();
    publishStep = 'capture';
    go('dex');
    if (res.events.includes('giant')) showUnlock(res, { ur: true });
    else if (res.events.includes('new') || res.events.includes('star_up')) showUnlock(res);
    else {
      A.play('ui_pending');
      toast(res.events.includes('giant_record') ? `刷新了${res.species.name}的巨物纪录：${res.card.giant.lengthCm}cm` : res.events.includes('record') ? `收入囊中，刷新了你的${res.species.name}最大尺寸` : `收入囊中，这是你的第 ${res.card.catchCount} 条${res.species.name}`);
    }
  }

  // ============================================================
  // 鱼卡解锁
  // ============================================================
  const HAPTICS = {
    N: [[300, 'light']], R: [[150, 'light'], [550, 'medium']], SR: [[900, 'medium'], [1200, 'heavy']],
    SSR: [[350, 'light'], [1600, 'medium'], [2100, 'heavy']], UR: [[500, 'medium'], [950, 'medium'], [1800, 'long'], [2600, 'heavy']],
  };
  const CARD_BACK = `<div class="cardback"><div class="cb-ring">${ICON.fish}</div><div class="cb-logo">YUKOMON</div><div class="cb-sub">淡水鱼采集图鉴</div></div>`;

  function giantInfo(card, catches) {
    const c = (catches || S.db.catches).find((x) => x.id === card.giant.catchId);
    return { lengthCm: card.giant.lengthCm, at: card.giant.approvedAt, city: c && c.location ? c.location.city : '' };
  }

  function showUnlock(res, opts = {}) {
    const sp = res.species, card = res.card, ur = !!opts.ur, rk = ur ? 'UR' : sp.rarity;
    const isNew = res.events.includes('new');
    const dex = S.dexProgress();
    const node = el(`<div class="layer unlock r-${rk}" style="--rc:${C.RV[rk].color}">
      <div class="glow"></div><div class="rays"></div><div class="pillar"></div><div class="ring"></div><div class="burst"></div>
      ${ur ? '<div class="blackout"></div><div class="crack"></div>' : ''}<div class="flash"></div>
      <button class="skip">跳过</button>
      <div class="stage">
        <div class="headline">${ur ? '巨物卡解锁' : isNew ? '新鱼种解锁' : '星级提升'}</div>
        <div class="card-host"></div>
        <div class="sub">${ur ? `${esc(sp.name)} · ${card.giant.lengthCm}cm` : `图鉴 ${dex.unlocked} / ${dex.total}`}
          ${!ur && !isNew ? `<br><span class="pill">${esc(sp.name)}升到 ${card.stars} 星</span>` : ''}
          ${res.rankDelta > 0 ? `<br><span class="pill">全国榜上升 ${res.rankDelta} 名</span>` : ''}</div>
        <div class="actions"><button class="btn" data-act="share">分享</button><button class="btn" data-act="dex">看图鉴</button><button class="btn accent" data-act="ok">${ur ? '收下' : '继续记录'}</button></div>
      </div></div>`);
    const cardEl = C.render(sp, { variant: ur ? 'ur' : 'normal', card, giantInfo: ur ? giantInfo(card) : null, interactive: true, back: CARD_BACK, backClass: 'has-design' });
    $('.card-host', node).append(cardEl);
    const rec = openLayer(node, 'unlock');
    if (!ur) gsap.from(node, { autoAlpha: 0, duration: 0.2, ease: 'none' });
    rec.cleanups.push(C.attach(cardEl), C.animate(cardEl), () => A.stopAll());

    const skip = $('.skip', node);
    const tl = M.unlockTimeline(node, cardEl, rk, {
      sfx: () => { A.play('unlock_' + rk); if (!isNew && !ur) A.play('star', { delay: C.RV[rk].unlockMs * 0.6, rarity: rk }); },
      flip: () => A.play('ui_flip'),
      haptics: () => A.scheduleHaptics(HAPTICS[rk]),
    });
    const settled = () => { skip.hidden = true; if (ur) rec.cleanups.push(M.idleGlow(node)); if (res.rankDelta > 0) A.play('ui_rank_up'); };
    tl.eventCallback('onComplete', settled);
    rec.cleanups.push(() => tl.kill());
    skip.onclick = () => { A.stopAll(); tl.eventCallback('onComplete', null); tl.progress(1, true); settled(); };
    cardEl.onclick = () => { if (tl.isActive()) return; C.flip(cardEl); A.play('ui_flip'); };

    $('.actions', node).onclick = (e) => {
      const b = e.target.closest('[data-act]');
      if (!b) return;
      if (b.dataset.act === 'share') return shareSheet(sp, card, ur, res.catchObj || pickCatch(card, S.db.catches, ur));
      closeLayer(rec);
      if (b.dataset.act === 'dex') { closeAll(); state.stamp = sp.no; myCtx.filter = 'all'; go('dex'); }
      else if (state.tab !== 'catch') render();
    };
  }

  // ============================================================
  // 图鉴（自己的主页和别人的主页共用）
  // ============================================================
  function ctxData(ctx) {
    if (ctx.me) {
      const db = S.db;
      return { name: db.me.nickname, bio: db.me.bio, catches: db.catches.slice().sort((a, b) => b.createdAt - a.createdAt), cards: db.cards };
    }
    const p = S.profileOf(ctx.userId);
    return { name: p.user.nickname, bio: p.user.bio, catches: p.catches, cards: p.cards };
  }

  function mountDex(root, ctx, animate) {
    const data = ctxData(ctx), cards = data.cards;
    const owned = Object.values(cards);
    const real = data.catches.filter((c) => c.status !== 'protected');
    const met = data.catches.filter((c) => c.status === 'protected');
    const cities = new Set(real.map((c) => c.location && c.location.city).filter(Boolean));
    const giants = owned.filter((c) => c.giant.status === 'approved').length;
    const total = S.SPECIES.length;
    const by = {}, totalBy = {};
    RARITIES.forEach((r) => { by[r] = 0; totalBy[r] = 0; });
    S.SPECIES.forEach((sp) => { totalBy[sp.rarity]++; if (cards[sp.no]) by[sp.rarity]++; });
    const filters = [['all', '全部'], ['have', '已解锁'], ['miss', '未解锁'], ...RARITIES.map((r) => [r, r])];
    const bio = data.bio || (ctx.me ? '还没有个性签名，去设置里写一句' : '');

    const unit = (n, u) => `<b><span data-n="${n}">${n}</span><small>${u}</small></b>`;
    root.innerHTML = `<div class="screen dex-page">
      <div class="collector">${mono(data.name)}
        <div class="who"><h1>${esc(data.name)}</h1>${bio ? `<p class="bio">${esc(bio)}</p>` : ''}</div>
        ${ctx.me ? `<button class="icon-btn" data-act="settings" aria-label="设置">${ICON.gear}</button>` : ''}
      </div>
      <section class="dex-summary" data-stagger>
        <div class="ds-top">
          <div><div class="big"><b data-n="${owned.length}">${owned.length}</b><span>/ ${total} 种</span></div></div>
        </div>
        <div class="ds-progress"><span class="ds-pct num">${Math.round((owned.length / total) * 100)}%</span><div class="bar" aria-label="图鉴进度 ${Math.round((owned.length / total) * 100)}%"><i style="width:${Math.max(owned.length ? 3 : 0, (owned.length / total) * 100)}%"></i></div></div>
        <div class="breakdown">${RARITIES.map((r) => `<div>${rb(r)}<b>${by[r]}<small>/${totalBy[r]}</small></b></div>`).join('')}</div>
        <div class="ds-stats">
          <div class="stat"><span class="eyebrow">渔获</span>${unit(real.length, '条')}</div>
          <div class="stat"><span class="eyebrow">城市</span>${unit(cities.size, '座')}</div>
          <div class="stat"><span class="eyebrow">巨物</span>${unit(giants, '张')}</div>
        </div>
        <div class="summary-fish-pixel" aria-hidden="true"><span>·</span><b>&gt;°)))&gt;</b><span>·</span></div>
      </section>
      <div class="section-h"><h3>鱼卡</h3><span class="num">共 ${total} 种</span></div>
      <div class="dex-filter">${filters.map(([k, t]) => `<button class="pill ${ctx.filter === k ? 'on' : ''}" data-f="${k}">${t}</button>`).join('')}</div>
      <div class="tray"></div>
      ${ctx.me && met.length ? `<div class="met-row" data-act="met" role="button" tabindex="0"><span class="grow">遇见过的保护鱼类</span><span class="num">${met.length}</span><span class="chev">${ICON.chev}</span></div>` : ''}
    </div>`;

    if (animate) $$('[data-n]', root).forEach((b) => M.countUp(b, +b.dataset.n));
    M.growStrata($$('.bar i', root));
    const tray = $('.tray', root);
    const fill = () => {
      const f = ctx.filter;
      const list = S.SPECIES.filter((sp) => f === 'all' || (f === 'have' && cards[sp.no]) || (f === 'miss' && !cards[sp.no]) || sp.rarity === f);
      tray.innerHTML = list.length ? '' : '<div class="empty" style="grid-column:1/-1">这一类还没有</div>';
      list.forEach((sp, i) => {
        const card = cards[sp.no], g = card && card.giant.status === 'approved';
        const cell = el(`<div class="cell" data-sp="${sp.no}" role="button" tabindex="0" ${i < 12 ? 'data-stagger' : ''}>
          ${card ? '' : `<div class="slot">${tagno(sp.no)}<span class="grade rarity-badge ${sp.rarity}" data-rarity="${esc(sp.rarity)}">${esc(sp.rarity)}</span>${F.fishSVG(sp, { silhouette: true })}<div class="q">${esc(sp.hint)}</div>${cornerTag(null)}</div>`}</div>`);
        if (card) cell.prepend(withCorner(C.render(sp, { card, thumb: true, variant: g ? 'ur' : 'normal', giantInfo: g ? giantInfo(card, data.catches) : null }), `<b class="num">${card.catchCount}</b>条`));
        tray.append(cell);
      });
    };
    fill();
    $('.dex-filter', root).onclick = (e) => {
      const b = e.target.closest('[data-f]');
      if (!b || b.classList.contains('on')) return;
      ctx.filter = b.dataset.f;
      $$('.dex-filter .pill', root).forEach((x) => x.classList.toggle('on', x === b));
      b.scrollIntoView({ behavior: M.reduced() ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
      if (M.reduced()) return fill();
      // 旧格子轻快下沉淡出，新格子错落浮起
      gsap.killTweensOf(tray);
      gsap.to(tray, { autoAlpha: 0, y: 6, duration: 0.12, ease: 'power2.in', onComplete() {
        fill();
        gsap.set(tray, { autoAlpha: 1, y: 0, clearProps: 'all' });
        gsap.from($$('.cell', tray).slice(0, 12), { y: 18, scale: 0.96, autoAlpha: 0, duration: 0.45, stagger: 0.025, ease: 'expo.out', clearProps: 'transform,opacity,visibility' });
      } });
    };
    tray.onclick = (e) => {
      const x = e.target.closest('[data-sp]');
      if (!x) return;
      const sp = S.byId[x.dataset.sp];
      if (cards[sp.no]) cardDetail(sp, ctx, data);
      else lockedSheet(sp);
    };
    const s = $('[data-act="settings"]', root);
    if (s) s.onclick = settingsPage;
    const m = $('[data-act="met"]', root);
    if (m) m.onclick = () => metSheet(met, ctx);
    // 刚解锁的那一格：滚到视野里，盖章解锁
    if (ctx.me && state.stamp) {
      const cell = $(`[data-sp="${state.stamp}"]`, tray);
      state.stamp = null;
      if (cell) { cell.removeAttribute('data-stagger'); cell.scrollIntoView({ block: 'center' }); gsap.delayedCall(0.25, () => M.stampIn(cell)); }
    }
  }
  function lockedSheet(sp) {
    sheet(`No.${sp.no} 未解锁`, `<div class="locked-sheet-fish" aria-hidden="true">${F.fishSVG(sp, { silhouette: true })}</div>
      <p style="margin:0 0 12px;text-align:center">${esc(sp.hint)}</p>
      <div class="facts"><div class="kv"><span>稀有度</span><span>${rb(sp.rarity)} ${C.RV[sp.rarity].name}</span></div><div class="kv"><span>栖息地</span><span>${C.HAB[sp.habitat].name}</span></div><div class="kv"><span>分布</span><span>${esc(sp.region)}</span></div><div class="kv"><span>旺季</span><span>${esc(sp.season)}</span></div><div class="kv"><span>钓法</span><span>${esc(sp.method)}</span></div></div>`);
  }
  // 卡片右下角信息标签：放进卡片自身结构（已解锁 → 卡片正面；未解锁 → 剪影槽位），随卡片一起滚动与分层
  const cornerTag = (html) => (html === null ? `<span class="corner locked">${ICON.lock}未解锁</span>` : html ? `<span class="corner">${html}</span>` : '');
  const withCorner = (cardEl, html) => { const face = cardEl.querySelector('.card-front') || cardEl; if (html) face.insertAdjacentHTML('beforeend', cornerTag(html)); return cardEl; };
  // 点赞徽标：上鱼记录横条和渔获详情大图右下角共用同一份结构与样式（.like）
  const likeChip = (c) => { if (!c.speciesId) return ''; const l = S.likesOf(c); return `<span class="like static ${l.liked ? 'on' : ''}" aria-label="${l.count} 个赞">${ICON.heart}<span class="num">${l.count}</span></span>`; };
  // 上鱼记录横条：上面是尺寸（强调）+ 地点 · 时间，下面是用户写的描述（弱化）；点赞固定在最右
  const catchRow = (c, i, title) => {
    const city = c.location ? c.location.city : '';
    return `<div class="entry" data-i="${i}" role="button" tabindex="0"><img class="ph" src="${esc(photoOf(c))}" alt="" loading="lazy">
      <div class="grow">
        <div class="t">${c.lengthCm ? `<b class="size num">${c.lengthCm}<small>cm</small></b>` : '<b class="size none">未量</b>'}<span class="where">${city ? `${ICON.pin}${esc(city)}` : ''}<span class="when num">${C.fmtDate(c.createdAt)}</span></span></div>
        <div class="m">${esc(title)}</div>
      </div>${likeChip(c)}</div>`;
  };
  function metSheet(met, ctx) {
    const rec = sheet('遇见过的保护鱼类', `<div class="entry-list">${met.map((c, i) => catchRow(c, i, c.protectedName)).join('')}</div>`);
    $('.entry-list', rec.node).onclick = (e) => { const x = e.target.closest('[data-i]'); if (x) { closeLayer(rec); catchDetail(met[+x.dataset.i], ctx); } };
  }

  // ============================================================
  // 排行榜
  // ============================================================
  function renderRank(view) {
    const boardTabs = `<div class="board-switch" role="tablist"><i class="ind" aria-hidden="true"></i><button role="tab" aria-selected="${state.board === 'unlock'}" class="${state.board === 'unlock' ? 'on' : ''}" data-board="unlock">${ICON.trophy}解锁榜</button><button role="tab" aria-selected="${state.board === 'giant'}" class="${state.board === 'giant' ? 'on' : ''}" data-board="giant">${ICON.ruler}巨物榜</button></div>`;
    const scopeRow = (note) => `<div class="scope"><button class="pill ${state.rank === 'nation' ? 'on' : ''}" data-scope="nation">全国</button><button class="pill ${state.rank === 'city' ? 'on' : ''}" data-scope="city">${esc(S.db.me.city)}</button><span class="grow"></span><span class="board-note">${note}</span></div>`;
    const b = rankBody();
    // 标题块（榜单切换 + 全国/城市）合成一个吸顶头，中间不留缝
    view.innerHTML = `<div class="screen rank-page"><div class="rank-head">${boardTabs}</div><div class="rank-scope">${scopeRow(b.note)}</div><div class="rank-body">${b.html}</div></div>`;
    b.mount(view);
    gsap.set($('.board-switch .ind', view), { xPercent: state.board === 'giant' ? 100 : 0 });
    view.onclick = (e) => {
      const bb = e.target.closest('[data-board]');
      if (bb) { if (bb.dataset.board !== state.board) { const dir = bb.dataset.board === 'giant' ? 1 : -1; state.board = bb.dataset.board; swapRankBody(view, dir); } return; }
      const s = e.target.closest('[data-scope]');
      if (s) { if (s.dataset.scope !== state.rank) { state.rank = s.dataset.scope; swapRankBody(view, 0); } return; }
      const x = e.target.closest('[data-sp]');
      if (x) { if (S.db.cards[x.dataset.sp]) sizeRankPage(S.byId[x.dataset.sp]); else { toast('请先解锁该鱼种~'); M.nudge(x); } return; }
      const u = e.target.closest('[data-user]');
      if (u) openProfile(u.dataset.user);
    };
  }
  function rankBody() {
    if (state.board === 'giant') {
      const cards = S.db.cards;
      return {
        note: `已解锁 <span class="num">${Object.keys(cards).length}</span> / ${S.SPECIES.length} 种`,
        html: `<div class="tray giant-tray"></div>`,
        mount(view) {
          const tray = $('.giant-tray', view);
          S.SPECIES.forEach((sp, i) => {
            const card = cards[sp.no], g = card && card.giant.status === 'approved';
            const lockedCell = card ? '' : `<div class="slot">${tagno(sp.no)}<span class="grade rarity-badge ${sp.rarity}" data-rarity="${esc(sp.rarity)}">${esc(sp.rarity)}</span>${F.fishSVG(sp, { silhouette: true })}<div class="q">${esc(sp.hint)}</div>${cornerTag(null)}</div>`;
            const cell = el(`<div class="cell" data-sp="${sp.no}" role="button" tabindex="0" ${i < 12 ? 'data-stagger' : ''}>
              ${lockedCell}</div>`);
            if (card) cell.prepend(withCorner(C.render(sp, { card, thumb: true, variant: g ? 'ur' : 'normal', giantInfo: g ? giantInfo(card, S.db.catches) : null }), card.bestLengthCm ? `<b class="num">${card.bestLengthCm}</b>cm` : ''));
            tray.append(cell);
          });
        },
      };
    }
    const r = S.rankOf(state.rank);
    const row = (u, extra = '', i = 99) => `<button class="rank-row ${u.rank <= 3 ? 'top' : ''} ${extra}" data-user="${u.id}" ${i < 12 ? 'data-stagger' : ''}>
      ${rankMedal(u.rank)}${mono(u.nickname, 'sm')}
      <span class="who"><span class="nm">${esc(u.nickname)}${u.me ? ' · 我' : ''}</span><small>${esc(u.city)}${u.urs ? ` · 巨物 ${u.urs}` : ''}</small></span>
      <span class="best" title="${esc(S.byId[u.best].name)}">${F.fishSVG(S.byId[u.best])}</span>
      <span class="cnt"><b>${u.count}</b><small>鱼种</small></span></button>`;
    const first = r.top[0];
    const leader = first ? row(first, 'leader', 0) : '';
    return {
      note: `前 ${r.top.length} 名 · 共 <span class="num">${r.total}</span> 人`,
      html: `${leader}<div class="board">${r.top.slice(1).map((u, i) => row(u, u.me ? 'is-me' : '', i)).join('')}</div>
        ${r.me ? row(r.me, 'rank-me') : '<div class="rank-row rank-me none">用现场拍摄记录一条渔获，就能上榜。</div>'}`,
      mount() {},
    };
  }
  // 榜单 / 范围切换：头部不重建，黑色滑块带一点挤压回弹滑过去；内容按方向退出、再从另一侧弹入
  function swapRankBody(view, dir) {
    const head = $('.rank-head', view), scopeHead = $('.rank-scope', view), body = $('.rank-body', view), ind = $('.board-switch .ind', head);
    $$('[data-board]', head).forEach((x) => { const selected = x.dataset.board === state.board; x.classList.toggle('on', selected); x.setAttribute('aria-selected', selected); });
    $$('[data-scope]', scopeHead).forEach((x) => x.classList.toggle('on', x.dataset.scope === state.rank));
    const fill = () => { const nb = rankBody(); $('.board-note', scopeHead).innerHTML = nb.note; body.innerHTML = nb.html; nb.mount(view); view.scrollTop = 0; };
    if (M.reduced()) { gsap.set(ind, { xPercent: state.board === 'giant' ? 100 : 0 }); fill(); return; }
    if (dir) {
      gsap.to(ind, { xPercent: state.board === 'giant' ? 100 : 0, duration: 0.5, ease: 'expo.out' });
    }
    gsap.killTweensOf(body);
    gsap.to(body, {
      autoAlpha: 0, x: -28 * dir, y: dir ? 0 : 8, transformOrigin: '50% 0', duration: 0.15, ease: 'power2.in',
      onComplete() {
        fill();
        gsap.fromTo(body, { autoAlpha: 0, x: 28 * dir, y: dir ? 0 : 14 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.5, ease: 'expo.out', clearProps: 'transform,opacity,visibility' });
        const items = $$('[data-stagger]', body).slice(0, 12);
        if (items.length) gsap.from(items, { y: 14, autoAlpha: 0, duration: 0.42, stagger: 0.03, delay: 0.06, clearProps: 'transform,opacity,visibility' });
      },
    });
  }

  // 巨物榜 · 单个鱼种的尺寸排行：顶部鱼种 banner + 排名/头像/昵称/地点/尺寸
  function sizeRankPage(sp) {
    let scope = state.rank;
    const rec = page(`${sp.name} · 巨物榜`, '<div class="size-rank"></div>');
    const root = $('.size-rank', rec.node);
    const draw = (swap) => {
      const r = S.sizeRankOf(sp.no, scope);
      const king = r.top[0];
      const row = (u, extra = '') => `<button class="rank-row size-row ${u.rank <= 3 ? 'top r' + u.rank : ''} ${extra}" data-user="${u.id}">
        ${rankMedal(u.rank)}${mono(u.nickname, 'sm')}
        <span class="who"><span class="nm">${esc(u.nickname)}${u.me ? ' · 我' : ''}</span><small>${ICON.pin}${esc(u.place)}</small></span>
        <span class="len"><b>${u.lengthCm}</b><small>cm</small></span></button>`;
      const list = `<div class="board">${r.top.length ? r.top.map((u) => row(u, u.me ? 'is-me' : '')).join('') : '<div class="empty">这个范围还没有人上榜</div>'}</div>
        ${r.me ? row(r.me, 'rank-me') : ''}`;
      const stats = `<div><small>巨物线</small><b>${sp.giantThresholdCm}<i>cm</i></b></div><div><small>${scope === 'city' ? '同城' : '全国'}纪录</small><b data-n="${king ? king.lengthCm : 0}">${king ? king.lengthCm : '—'}</b><i>cm</i></div><div><small>上榜</small><b data-n="${r.total}">${r.total}</b><i>人</i></div>`;
      if (swap) {
        $('.sp-stats', root).innerHTML = stats;
        $$('[data-scope]', root).forEach((x) => x.classList.toggle('on', x.dataset.scope === scope));
        const body = $('.size-list', root);
        gsap.killTweensOf(body);
        gsap.to(body, { autoAlpha: 0, y: 8, duration: 0.14, ease: 'power2.in', onComplete() {
          body.innerHTML = list;
          gsap.fromTo(body, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'expo.out', clearProps: 'all' });
          if (!M.reduced()) gsap.from($$('.board .size-row', body).slice(0, 10), { y: 12, autoAlpha: 0, duration: 0.36, stagger: 0.025, clearProps: 'all' });
        } });
        if (!M.reduced()) $$('.sp-stats [data-n]', root).forEach((b) => +b.dataset.n && M.countUp(b, +b.dataset.n));
        return;
      }
      root.innerHTML = `<div class="sp-banner rar-${sp.rarity}">
          <div class="sp-fish">${F.fishSVG(sp)}</div>
          <div class="sp-meta">${tagno(sp.no)}<h2>${esc(sp.name)}</h2><span class="latin">${esc(sp.latin)}</span></div>
          <div class="sp-stats">${stats}</div>
        </div>
        <div class="scope"><button class="pill ${scope === 'nation' ? 'on' : ''}" data-scope="nation">全国</button><button class="pill ${scope === 'city' ? 'on' : ''}" data-scope="city">${esc(S.db.me.city)}</button><span class="grow"></span><span class="board-note">按最大现场记录</span></div>
        <div class="size-head"><span>排名</span><span class="grow">钓手 · 地点</span><span>尺寸</span></div>
        <div class="size-list">${list}</div>`;
      if (!M.reduced()) {
        const tl = gsap.timeline({ delay: 0.12 });
        tl.from($('.sp-fish svg', root), { x: -60, autoAlpha: 0, rotation: -6, duration: 0.9, ease: 'expo.out' })
          .from($$('.sp-meta > *, .sp-stats > div', root), { y: 12, autoAlpha: 0, duration: 0.45, stagger: 0.04 }, 0.08)
          .from($$('.board .size-row', root).slice(0, 10), { y: 12, autoAlpha: 0, duration: 0.36, stagger: 0.025, clearProps: 'all' }, 0.16);
        gsap.to($('.sp-fish svg', root), { y: -5, rotation: 1.2, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1 });
        rec.cleanups.push(() => gsap.killTweensOf($('.sp-fish svg', root)));
      }
    };
    draw(false);
    root.onclick = (e) => {
      const s = e.target.closest('[data-scope]');
      if (s) { if (s.dataset.scope !== scope) { scope = s.dataset.scope; draw(true); } return; }
      const u = e.target.closest('[data-user]');
      if (u && u.dataset.user !== 'me') openProfile(u.dataset.user);
    };
    return rec;
  }

  function openProfile(userId) {
    if (userId === 'me') { closeAll(); return go('dex'); }
    const p = S.profileOf(userId);
    if (!p) return;
    const rec = page(`${p.user.nickname}的图鉴`, '<div class="profile-root"></div>');
    const root = $('.profile-root', rec.node);
    mountDex(root, { me: false, userId, filter: 'have' }, true);
    M.viewIn(root);
  }

  // ============================================================
  // 详情：渔获 / 鱼卡
  // ============================================================
  // 渔获记录：底部弹窗。鱼种只展示，不再跳转鱼卡（鱼卡页 → 渔获 → 鱼卡 会无限套娃）
  function catchDetail(c, ctx, onLike) {
    const sp = S.byId[c.speciesId], loc = c.location || {}, g = c.gear || {};
    const kv = (k, v) => (v ? `<div class="kv"><span>${k}</span><span>${v}</span></div>` : '');
    const lk = S.likesOf(c);
    const rec = sheet('渔获记录', `
      <div class="hero-photo"><img src="${esc(photoOf(c))}" alt="渔获照片">
        ${!sp ? '' : ctx.me ? likeChip(c) : `<button class="like ${lk.liked ? 'on' : ''}" data-like aria-pressed="${lk.liked}" aria-label="点赞">${ICON.heart}<span class="num">${lk.count}</span></button>`}</div>
      ${c.desc ? `<p class="detail-desc">${esc(c.desc)}</p>` : ''}
      <div class="facts">
        ${sp ? kv('鱼种', `${esc(sp.name)} ${rb(sp.rarity)} <span class="latin muted">${esc(sp.latin)}</span>`) : kv('鱼种', `${esc(c.protectedName)}（国家${esc(c.protectedLevel)}保护）`)}
        ${kv('尺寸', c.lengthCm ? `<span class="num">${c.lengthCm} cm</span>` : '')}
        ${kv('放流', c.released ? '已放流' : '未放流')}
        ${kv('钓点', esc(ctx.me ? [loc.place, loc.city, loc.district].filter(Boolean).join(' · ') : loc.city))}
        ${kv('时间', `<span class="num">${ctx.me ? fmtFull(c.createdAt) : C.fmtDate(c.createdAt)}</span>`)}
        ${GEAR.map(([k, label]) => kv(label, esc(g[k]))).join('')}
      </div>
      ${ctx.me ? `<div class="actions-row" style="margin-bottom:8px">${sp ? `<button class="btn" data-share>${ICON.copy}分享链接</button>` : ''}<button class="btn danger" data-del>${ICON.trash}删除</button></div>` : '<div style="height:8px"></div>'}`, 'tall');
    const node = rec.node;
    if (c.videoId) window.YK_MEDIA.get(c.videoId).then(blob => {
      if (!blob || rec.closing) return;
      const v = document.createElement('video'), url = URL.createObjectURL(blob);
      v.controls = true; v.playsInline = true; v.poster = photoOf(c); v.src = url;
      $('.hero-photo img', node).replaceWith(v);
      rec.cleanups.push(() => { v.pause(); v.removeAttribute('src'); v.load(); URL.revokeObjectURL(url); });
    });
    const like = $('[data-like]', node);
    if (like) like.onclick = () => {
      const r = S.toggleLike(c);
      like.classList.toggle('on', r.liked);
      like.setAttribute('aria-pressed', r.liked);
      $('.num', like).textContent = r.count;
      A.haptic('light');
      M.likePop(like, r.liked);
      if (onLike) onLike(c, r);
    };
    const sh = $('[data-share]', node);
    if (sh) sh.onclick = () => { const cd = S.db.cards[sp.no]; shareSheet(sp, cd, cd.giant.status === 'approved' && cd.giant.catchId === c.id, c); };
    const del = $('[data-del]', node);
    if (del) del.onclick = () => confirmSheet('删除这条渔获？', sp ? `如果这是唯一一条${sp.name}，对应的鱼卡也会收回。` : '删除后无法恢复。', '删除', () => { S.removeCatch(c.id); closeAll(); render(); toast('已删除'); });
  }

  // 一张卡用哪条渔获做代表：巨物卡用认证的那条，否则用最大的一条，再否则用最早的一条
  function pickCatch(card, catches, ur) {
    const mine = catches.filter((c) => c.speciesId === card.speciesId);
    const id = ur ? card.giant.catchId : card.bestCatchId || card.firstCatchId;
    return mine.find((c) => c.id === id) || mine.slice().sort((a, b) => (b.lengthCm || 0) - (a.lengthCm || 0))[0] || null;
  }

  function cardDetail(sp, ctx, data) {
    const card = data.cards[sp.no];
    const hasUR = card.giant.status === 'approved';
    let ur = hasUR;
    const back = `<section class="b-info"><div class="b-title"><h2>${esc(sp.name)}</h2><span class="no">No.${sp.no}</span></div>
      <div class="latin">${esc(sp.latin)}</div><p>${esc(sp.fact)}</p><dl>
        <div><dt>科属</dt><dd>${esc(sp.family)}</dd></div><div><dt>分布</dt><dd>${esc(sp.region)}</dd></div>
        <div><dt>体长</dt><dd>${sp.commonCm}cm · 巨物线 ${sp.giantThresholdCm}cm</dd></div><div><dt>习性</dt><dd>${esc(sp.method)}</dd></div>
      </dl><div class="mine">${ctx.me ? '我' : 'TA'}钓到 <b>${card.catchCount}</b> 次${card.bestLengthCm ? `，最大 <b>${card.bestLengthCm}cm</b>` : ''}<br>${C.fmtDate(card.unlockedAt)} 解锁</div></section>`;
    const rec = page(`No.${sp.no} ${sp.name}`, `
      <div class="card-stage"></div>
      ${hasUR ? '<div class="variant"><button class="pill on" data-v="ur">巨物卡</button><button class="pill" data-v="normal">普通卡</button></div>' : ''}
      ${ctx.me ? '<div class="actions-row"><button class="btn primary" data-share>分享链接</button></div>' : ''}
      <div class="section-h"><h3>${ctx.me ? '我的' : 'TA 的'}${esc(sp.name)}</h3><span class="num">${card.catchCount} 条</span></div>
      <div class="mine-list entry-list"></div>`);
    // 右上角：该鱼种的尺寸排行（巨物榜）。跳到排行榜页的巨物榜，并打开这条鱼的榜单
    const head = $('.page-head', rec.node);
    const rk = el(`<button class="head-act icon-btn detail-rank-btn" data-rank aria-label="${esc(sp.name)}尺寸排行" title="${esc(sp.name)}尺寸排行">${ICON.rankLine}</button>`);
    head.append(rk);
    rk.onclick = () => { closeAll(); state.board = 'giant'; go('rank'); sizeRankPage(sp); };
    const stage = $('.card-stage', rec.node);
    let off = [];
    const mountCard = (swap) => {
      const old = stage.firstElementChild;
      const build = () => {
        off.forEach((fn) => fn());
        stage.innerHTML = '';
        const ce = C.render(sp, { card, interactive: true, presentation: 'gallery', back, variant: ur ? 'ur' : 'normal', giantInfo: ur ? giantInfo(card, data.catches) : null });
        stage.append(ce);
        off = [C.attach(ce), C.animate(ce)];
        ce.onclick = () => { C.flip(ce); A.play('ui_flip'); A.haptic('light'); };
        if (M.reduced()) return;
        if (swap) gsap.fromTo(ce, { rotationY: -70, scale: 0.9, autoAlpha: 0 }, { rotationY: 0, scale: 1, autoAlpha: 1, duration: 0.6, ease: 'expo.out', clearProps: 'transform,opacity,visibility' });
        else gsap.from(ce, { y: 24, autoAlpha: 0, scale: 0.94, duration: 0.55, delay: 0.12 });
      };
      // 巨物卡 ⇄ 普通卡：旧卡侧转收起，新卡从另一侧转出
      if (swap && old && !M.reduced()) gsap.to(old, { rotationY: 70, scale: 0.9, autoAlpha: 0, duration: 0.2, ease: 'power2.in', onComplete: build });
      else build();
    };
    mountCard();
    rec.cleanups.push(() => off.forEach((fn) => fn()));
    $$('[data-v]', rec.node).forEach((b) => (b.onclick = () => { if (b.classList.contains('on')) return; ur = b.dataset.v === 'ur'; $$('[data-v]', rec.node).forEach((x) => x.classList.toggle('on', x === b)); A.haptic('light'); mountCard(true); }));
    const mine = data.catches.filter((c) => c.speciesId === sp.no).slice(0, 20);
    $('.mine-list', rec.node).innerHTML = mine.map((c, i) => catchRow(c, i, c.desc || sp.name)).join('');
    $('.mine-list', rec.node).onclick = (e) => { const x = e.target.closest('[data-i]'); if (x) catchDetail(mine[+x.dataset.i], ctx, (c) => { const chip = $('.like', x); if (chip) chip.outerHTML = likeChip(c); }); };
    const sb = $('[data-share]', rec.node);
    if (sb) sb.onclick = () => shareSheet(sp, card, ur, pickCatch(card, data.catches, ur));
  }

  // ============================================================
  // 分享链接：打开就是一张视差鱼卡，背面是这条渔获的照片、地点、时间和一句话描述
  // ============================================================
  const b64 = {
    enc: (o) => btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(o)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),
    dec: (s) => JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (ch) => ch.charCodeAt(0)))),
  };
  function sharePayload(sp, card, ur, c) {
    return {
      v: 1, by: S.db.me.nickname, s: sp.no, ur: ur ? 1 : 0, st: card.stars || 1,
      len: (ur ? card.giant.lengthCm : c && c.lengthCm) || null,
      city: c && c.location ? c.location.city : '', t: c ? c.createdAt : card.unlockedAt,
      d: (c && c.desc) || `钓到一条${sp.name}`, id: c ? c.id : '',
    };
  }
  const shareURL = (p) => `${location.href.split('#')[0]}#share=${b64.enc(p)}`;

  function shareSheet(sp, card, ur, c) {
    const p = sharePayload(sp, card, ur, c), url = shareURL(p);
    const rec = sheet('分享这张鱼卡', `
      <p class="muted" style="margin:0 0 12px;font-size:14px">对方打开链接会看到这张会动的鱼卡，翻到背面是你的渔获照片、地点、时间和描述。地点只显示到城市。</p>
      <input class="link-box" readonly value="${esc(url)}" aria-label="分享链接">
      <div class="row actions-row" style="margin-top:10px"><button class="btn grow" data-preview>${ICON.eye}预览</button><button class="btn primary grow" data-copy>${ICON.copy}复制链接</button></div>`);
    const box = $('.link-box', rec.node);
    box.onfocus = () => box.select();
    $('[data-copy]', rec.node).onclick = async () => {
      try { await navigator.clipboard.writeText(url); } catch (e) { box.select(); document.execCommand('copy'); }
      A.haptic('light');
      toast('链接已复制');
    };
    $('[data-preview]', rec.node).onclick = () => { closeLayer(rec); shareView(p); };
  }

  function shareView(p, fromLink) {
    const sp = S.byId[p.s];
    if (!sp) return toast('这个分享链接已失效');
    const ur = !!p.ur;
    // 演示版没有服务器：同一浏览器能取到原照片，其他设备上用标本板占位；正式版照片走云存储
    const local = S.db.catches.find((c) => c.id === p.id);
    const photo = (local && local.photo) || plate(sp, 'share');
    const back = `<div class="shareback"><img src="${esc(photo)}" alt="${esc(sp.name)}的渔获照片">
      <div class="sb-body"><p class="sb-desc">${esc(p.d)}</p>
        <div class="sb-meta"><span>${esc(p.city || '未知水域')}</span><span class="num">${C.fmtDate(p.t)}</span></div>
        <div class="sb-by">${esc(p.by)} · ${esc(sp.name)}${p.len ? ` <span class="num">${p.len}cm</span>` : ''}</div></div></div>`;
    const node = el(`<div class="layer page share-view">
      <header class="share-head"><span class="grow">${mono(p.by, 'sm')}<span><b>${esc(p.by)}</b> 的渔获</span></span><button class="btn sm" data-close>${fromLink ? '进入 Yukomon' : '关闭预览'}</button></header>
      <div class="share-stage"><div class="card-host"></div><p class="card-tip">点卡片翻到背面</p></div>
      <div class="share-foot"><button class="cta" data-cta><span>我也来记录渔获</span><i class="dot">${ICON.arrow}</i></button></div></div>`);
    const card = { stars: p.st, bestLengthCm: p.len, giant: { status: ur ? 'approved' : 'none' } };
    const ce = C.render(sp, { card, interactive: true, presentation: 'gallery', back, backClass: 'has-design', variant: ur ? 'ur' : 'normal', giantInfo: ur ? { lengthCm: p.len, at: p.t, city: p.city } : null });
    $('.card-host', node).append(ce);
    const rec = openLayer(node, 'page');
    rec.cleanups.push(C.attach(ce), C.animate(ce));
    ce.onclick = () => { C.flip(ce); A.play('ui_flip'); A.haptic('light'); };
    if (!M.reduced()) gsap.from(ce, { y: 30, autoAlpha: 0, scale: 0.92, duration: 0.6, delay: 0.15 });
    const leave = () => { if (fromLink) history.replaceState(null, '', location.href.split('#')[0]); closeLayer(rec); };
    $('[data-close]', node).onclick = leave;
    $('[data-cta]', node).onclick = () => { leave(); if (state.tab !== 'catch') go('catch'); };
  }

  // ============================================================
  // 设置
  // ============================================================
  function settingsPage() {
    const db = S.db;
    const rec = page('设置', `
      <div class="settings-group"><span class="eyebrow">资料</span><div class="box">
        <div class="set-row"><span>昵称</span><input id="set-name" name="nickname" autocomplete="nickname" maxlength="12" value="${esc(db.me.nickname)}" aria-label="昵称"></div>
        <div class="set-row col"><label for="set-bio">个性签名</label><textarea id="set-bio" maxlength="30" placeholder="写一句介绍自己，显示在图鉴页昵称下面">${esc(db.me.bio)}</textarea></div>
        <div class="set-row"><span>常驻城市</span><div class="city-picker" data-city-picker>
          <select id="set-city" name="city" class="city-native" tabindex="-1" aria-hidden="true">${Object.keys(S.CITIES).map((c) => `<option ${c === db.me.city ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select>
          <button type="button" class="set-control city-trigger" aria-label="常驻城市" aria-haspopup="listbox" aria-expanded="false"><span data-city-value>${esc(db.me.city)}</span>${ICON.chev}</button>
          <div class="city-menu" role="listbox" aria-label="选择常驻城市" hidden>${Object.keys(S.CITIES).map((c) => `<button type="button" class="city-option${c === db.me.city ? ' on' : ''}" role="option" aria-selected="${c === db.me.city}" data-city-option="${esc(c)}">${esc(c)}</button>`).join('')}</div>
        </div></div>
      </div></div>
      <div class="settings-group"><span class="eyebrow">反馈</span><div class="box">
        <div class="set-row"><span>解锁音效</span><button class="switch ${A.settings.sfx ? 'on' : ''}" data-set="sfx" role="switch" aria-checked="${A.settings.sfx}" aria-label="解锁音效"></button></div>
        <div class="set-row"><span>震动</span><button class="switch ${A.settings.haptics ? 'on' : ''}" data-set="haptics" role="switch" aria-checked="${A.settings.haptics}" aria-label="震动"></button></div>
      </div></div>
      <div class="settings-group"><span class="eyebrow">试看解锁动画</span><div class="box"><div class="sfx-row">${[...RARITIES, 'UR'].map((r) => `<button class="btn sm" data-try="${r}">${r}</button>`).join('')}</div></div></div>
      <div class="settings-group"><span class="eyebrow">数据</span><div class="box">
        <div class="set-row"><span>恢复演示数据</span><button class="btn sm" style="background:var(--bg)" data-reset>恢复</button></div>
        <div class="set-row"><span>清空全部记录</span><button class="btn sm danger" style="background:var(--bg)" data-wipe>清空</button></div>
      </div></div>`);
    const node = rec.node;
    $('#set-name', node).onchange = (e) => { db.me.nickname = e.target.value.trim() || '大鱼'; S.save(); render(); };
    $('#set-bio', node).onchange = (e) => { db.me.bio = e.target.value.trim(); S.save(); render(); };
    const cityNative = $('#set-city', node);
    const cityPicker = $('[data-city-picker]', node);
    const cityTrigger = $('.city-trigger', cityPicker);
    const cityMenu = $('.city-menu', cityPicker);
    const cityValue = $('[data-city-value]', cityPicker);
    const closeCityMenu = () => { cityMenu.hidden = true; cityPicker.classList.remove('open'); cityTrigger.setAttribute('aria-expanded', 'false'); };
    const selectCity = (city) => {
      cityNative.value = city;
      cityValue.textContent = city;
      $$('.city-option', cityMenu).forEach((option) => {
        const selected = option.dataset.cityOption === city;
        option.classList.toggle('on', selected);
        option.setAttribute('aria-selected', selected);
      });
      db.me.city = city;
      S.save();
      closeCityMenu();
    };
    cityNative.onchange = (e) => selectCity(e.target.value);
    cityTrigger.onclick = () => {
      const open = cityMenu.hidden;
      if (open) {
        cityMenu.hidden = false;
        cityPicker.classList.add('open');
        cityTrigger.setAttribute('aria-expanded', 'true');
      } else closeCityMenu();
    };
    cityMenu.onclick = (e) => {
      const option = e.target.closest('[data-city-option]');
      if (option) selectCity(option.dataset.cityOption);
    };
    const onOutsideCity = (e) => { if (!cityPicker.contains(e.target)) closeCityMenu(); };
    document.addEventListener('pointerdown', onOutsideCity);
    rec.cleanups.push(() => document.removeEventListener('pointerdown', onOutsideCity));
    node.addEventListener('click', (e) => {
      const t = e.target.closest('button');
      if (!t) return;
      const ds = t.dataset;
      if (ds.set) { const k = ds.set; A.settings[k] = !A.settings[k]; db.settings[k] = A.settings[k]; S.save(); t.classList.toggle('on', A.settings[k]); t.setAttribute('aria-checked', A.settings[k]); if (A.settings[k]) k === 'sfx' ? A.play('ui_rank_up') : A.haptic('medium'); }
      else if (ds.try) demoUnlock(ds.try);
      else if ('reset' in ds) { S.reset(); state.draft = null; closeLayer(rec); render(); toast('已恢复演示数据'); }
      else if ('wipe' in ds) confirmSheet('清空全部记录？', '所有渔获和鱼卡都会删除，无法恢复。', '清空', () => { S.wipe(); state.draft = null; closeLayer(rec); render(); toast('已清空'); });
    });
  }
  // 不写入数据，只播放某个稀有度的解锁演出
  function demoUnlock(rk) {
    const ur = rk === 'UR';
    const sp = S.SPECIES.find((s) => s.rarity === (ur ? 'SSR' : rk));
    const card = { speciesId: sp.no, catchCount: 1, stars: 1, bestLengthCm: sp.commonCm, unlockedAt: Date.now(), giant: { status: ur ? 'approved' : 'none', lengthCm: sp.giantThresholdCm + 6, approvedAt: Date.now() } };
    showUnlock({ species: sp, card, events: ['new'] }, { ur });
  }

  // Keep source and keyboard order aligned with the product navigation:
  // collection on the left, capture in the middle, ranking on the right.
  const nav = $('#tabbar');
  if (nav) {
    const navAssets = { dex: 'img/nav-dex.svg', catch: 'img/nav-catch.svg', rank: 'img/nav-rank.svg' };
    Object.entries(navAssets).forEach(([key, src]) => {
      const button = nav.querySelector(`[data-tab="${key}"]`);
      const old = button && button.querySelector('svg.ti');
      if (button && old) {
        const image = document.createElement('img');
        image.className = 'ti asset-icon';
        image.src = src;
        image.alt = '';
        old.replaceWith(image);
      }
    });
  }
  ['dex', 'catch', 'rank'].forEach((key) => {
    const button = nav && nav.querySelector(`[data-tab="${key}"]`);
    if (button) nav.appendChild(button);
  });

  // ---------- 启动 ----------
  $('#tabbar').onclick = (e) => { const b = e.target.closest('[data-tab]'); if (b && (b.dataset.tab !== state.tab || layers.length)) { closeAll(); go(b.dataset.tab); } };
  // 切到后台就关相机（省电、释放占用）；回到前台且仍在取景页时重新打开
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopCamera();
    else if (state.tab === 'catch' && publishStep === 'capture' && !layers.length) startCamera($('#view'));
  });
  // 深链：#share=…（分享链接）；演示用 #tab=dex|rank、#profile=u3、#unlock=SSR
  const q = new URLSearchParams(location.hash.slice(1));
  if (['catch', 'dex', 'rank'].includes(q.get('tab'))) state.tab = q.get('tab');
  render(true);
  if (q.get('share')) { try { shareView(b64.dec(q.get('share')), true); } catch (e) { toast('这个分享链接已失效'); } }
  if (q.get('profile')) openProfile(q.get('profile'));
  if (q.get('unlock')) demoUnlock(q.get('unlock'));
  // 安卓返回键：先关最上层弹层（解锁动画按"继续"处理），没有弹层时回到「渔获」页，已在首页才交给系统退出
  function back() {
    const top = layers[layers.length - 1];
    if (top) {
      if (top.kind === 'unlock') { const ok = top.node.querySelector('[data-act=ok]'); if (ok) ok.click(); else closeLayer(top); }
      else closeLayer(top);
      return true;
    }
    if (state.tab === 'catch' && publishStep !== 'capture') { publishStep = publishStep === 'edit' ? 'preview' : 'capture'; render(); return true; }
    if (state.tab !== 'dex') { go('dex'); return true; }
    return false;
  }
  window.YK_APP = { go, openProfile, demoUnlock, settingsPage, shareView, back };
})();
