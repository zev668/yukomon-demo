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
  const rb = (r, className = 'rb') => window.YK_RARITY.html(r, className);
  const tagno = (no) => `<span class="tagno">No.${no}</span>`;
  const RARITIES = ['N', 'R', 'SR', 'SSR'];
  const GEAR = [['rod', '鱼竿', '如：溪流竿1.8m UL'], ['reel', '鱼轮', '如：喜玛诺26款Majestic'], ['line', '鱼线', '如：PE 0.8号'], ['bait', '鱼饵', '如：米诺9cm']];
  const DESC_MAX = 40;
  function pixelIcon(name) {
    const source = 'img/pixel-icons.svg?v=1#';
    const glyph = name === 'heart'
      ? `<use class="heart-outline" href="${source}heart"/><use class="heart-solid" href="${source}heart-filled"/>`
      : `<use href="${source}${name}"/>`;
    return `<svg class="i fill pixel-icon" data-icon="${name}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${glyph}</svg>`;
  }
  const ICON = {
    back: pixelIcon('back'),
    arrow: pixelIcon('arrow'),
    chev: pixelIcon('chev'),
    close: pixelIcon('close'),
    plus: pixelIcon('plus'),
    search: pixelIcon('search'),
    gear: pixelIcon('gear'),
    camera: pixelIcon('camera'),
    fish: pixelIcon('fish'),
    heart: pixelIcon('heart'),
    lock: pixelIcon('lock'),
    rank: pixelIcon('rank'),
    pin: pixelIcon('pin'),
    locate: pixelIcon('locate'),
    eye: pixelIcon('eye'),
    copy: pixelIcon('copy'),
    trash: pixelIcon('trash'),
    album: pixelIcon('album'),
    rankLine: pixelIcon('rank'),
    trophy: pixelIcon('unlock'),
    ruler: pixelIcon('fish'),
    flipCamera: pixelIcon('flip-camera'),
    logo: `<svg class="brand" viewBox="6 179 674 326" aria-hidden="true"><path d="M141.205 479.932L74.1064 498.459V490.447L140.704 475.926L141.205 479.932ZM214.312 250.096L121.176 323.202L140.704 469.917L74.1064 480.934L78.1123 343.732L12.0156 257.105L65.0938 207.533L104.15 279.639L170.748 207.533L165.74 185L214.312 250.096ZM321.469 289.152C320.968 291.823 321.168 298.967 325.975 306.178C330.781 313.388 336.657 320.531 338.994 323.202L269.393 352.245L334.988 388.298L314.959 420.345L267.39 370.271C265.387 382.289 265.287 408.026 280.909 414.836C274.499 417.24 253.535 436.535 243.854 445.882C239.676 437.144 238.653 414.586 237.55 390.082C234.209 419.307 224.905 442.116 204.297 443.378C179.761 444.88 137.77 417.212 134.695 380.786C131.959 348.356 162.135 305.878 179.761 310.684C197.369 315.486 225.534 328.605 235.366 352.596C233.082 326.266 228.603 305.152 217.316 306.178L269.393 289.152L267.39 323.202L321.469 289.152ZM347.507 396.31L324.473 429.858L318.965 424.851L336.49 391.803L347.507 396.31ZM493.977 279.639C495.646 290.655 502.489 317.894 516.51 338.725C534.035 364.762 541.046 370.771 546.554 372.774C538.942 377.582 518.679 392.136 509.499 398.812L484.463 345.735C479.289 353.58 468.94 370.872 468.939 377.281C468.939 383.69 470.609 387.296 471.443 388.298C458.591 380.286 432.287 362.961 429.883 357.753C429.883 366.966 424.375 374.778 429.883 413.835L391.827 416.339C390.659 405.156 388.522 379.284 389.323 365.264C390.325 347.738 391.827 295.662 380.811 289.152C380.811 289.152 402.343 284.145 419.868 279.639C421.868 290.638 461.807 330.59 461.93 330.713L467.938 294.16L493.977 279.639ZM196.786 344.734C187.273 340.228 187.772 353.748 183.767 357.253C180.562 360.056 177.09 358.421 175.755 357.253C172.751 369.771 183.767 394.306 196.786 392.805C209.805 391.302 206.3 349.241 196.786 344.734ZM327.733 341.729C329.736 323.703 364.787 323.202 382.813 329.211C390.324 341.229 382.814 384.292 367.291 391.803C337.247 391.802 328.401 358.421 327.733 341.729ZM671.981 289.152L649.949 381.287L614.397 342.23C614.064 350.075 615.199 366.966 622.409 371.773C611.994 373.776 598.374 376.614 592.866 377.782C589.695 355.082 582.651 306.277 579.847 292.657C580.514 293.659 582.751 295.862 586.356 296.663C589.962 297.464 604.55 295.662 611.394 294.66C612.896 306.01 619.005 330.713 631.423 338.725C632.625 329.911 637.932 292.991 640.436 275.633L671.981 289.152ZM530.53 322.201C539.21 311.185 559.372 292.257 570.589 304.675C584.609 320.197 585.11 361.258 578.601 367.768C572.09 374.277 522.519 356.751 522.519 318.195L530.53 322.201ZM358.891 342.831C349.579 342.541 348.583 365.441 360.928 362.036C372.741 358.777 368.202 343.122 358.891 342.831ZM568.83 331.715C565.224 322.502 552.64 326.541 546.798 329.712C544.294 341.729 559.817 348.74 565.826 349.741C571.835 350.743 573.337 343.232 568.83 331.715ZM673.484 283.144L641.938 270.625V264.616L673.484 283.144ZM614.309 257.621C613.808 240.095 618.715 205.746 642.35 208.55C665.984 211.354 659.647 235.978 653.365 240.096C641.763 247.7 620.818 244.602 614.309 257.621ZM569.242 214.058C567.822 192.597 601.192 196.275 598.03 217.141C596.027 230.36 597.116 240.597 598.785 250.11C585.265 244.602 570.632 235.055 569.242 214.058Z" fill="currentColor"/></svg>`,
  };
  const mono = (name, cls = '') => `<span class="mono ${cls}" aria-hidden="true">${esc([...String(name || '钓')][0])}</span>`;
  const rankMedal = (rank) => {
    const file = ({ 1: 'rank-first.svg', 2: 'rank-second.svg', 3: 'rank-third.svg' })[Number(rank)];
    return file ? `<span class="n rank-medal"><img src="img/${file}?v=original-1" alt="第${rank}名"></span>` : `<span class="n">${esc(rank)}</span>`;
  };
  const rankBadge = (tier) => {
    const index = Math.max(0, Math.min(7, Number(tier?.index) || 0));
    const label = esc(tier?.name || '初见');
    return `<img class="rank-badge-img" src="img/rank-badges/rank-${index + 1}.png?v=2" alt="${label}段位徽章" width="500" height="500" decoding="async">`;
  };

  const toast = (msg, ms) => M.toast($('#toast'), msg, ms);
  const setBusy = (button, busy) => { button.disabled = busy; button.setAttribute('aria-busy', String(busy)); };
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
  const accessLocks = new Map();
  const focusable = 'button, input, select, textarea, a[href], [tabindex], video[controls], audio[controls]';
  let layerId = 0, restoringFocus = false;
  const topLayer = () => layers[layers.length - 1];
  const layerScope = (rec) => rec && (rec.recordModal?.node || $('.sheet', rec.node) || rec.node);
  const layerSurface = (rec) => rec && (rec.recordModal?.node || rec.node);
  const canFocus = (node) => node && node.isConnected && !node.closest('[inert], [hidden], [aria-hidden="true"]') && !node.matches(':disabled') && node.getClientRects().length && getComputedStyle(node).visibility !== 'hidden';
  function focusNode(node) {
    if (!canFocus(node)) return false;
    if (!node.matches(focusable)) node.setAttribute('tabindex', '-1');
    restoringFocus = true;
    try { node.focus({ preventScroll: true }); } finally { restoringFocus = false; }
    return document.activeElement === node;
  }
  function focusLayer(rec, preferred) {
    const scope = layerScope(rec);
    if (!scope) return focusNode(preferred) || focusNode($('#view'));
    if (preferred && scope.contains(preferred) && focusNode(preferred)) return true;
    const initial = $('[data-initial-focus]', scope) || $('.sheet-head h3, .page-head h2', scope) || $('.record-modal-panel', scope) || $('[data-skip], [data-close]', scope);
    return focusNode(initial) || focusNode(scope);
  }
  function syncLayerAccess(preferred) {
    const rec = topLayer(), surface = layerSurface(rec), blocked = new Set();
    // Lock sibling branches, leaving the modal's own backdrop and live messages available.
    for (let node = surface; node && node.id !== 'app'; node = node.parentElement) {
      if (!node.parentElement) break;
      for (const sibling of node.parentElement.children) {
        if (sibling !== node && sibling.id !== 'toast' && sibling.id !== 'haptic-dot') blocked.add(sibling);
      }
    }
    for (const [node, before] of accessLocks) {
      if (blocked.has(node)) continue;
      if (before.inert) node.setAttribute('inert', ''); else node.removeAttribute('inert');
      if (before.hidden === null) node.removeAttribute('aria-hidden'); else node.setAttribute('aria-hidden', before.hidden);
      accessLocks.delete(node);
    }
    const scope = layerScope(rec);
    if (preferred || (scope && !scope.contains(document.activeElement))) focusLayer(rec, preferred);
    for (const node of blocked) {
      if (!accessLocks.has(node)) accessLocks.set(node, { inert: node.hasAttribute('inert'), hidden: node.getAttribute('aria-hidden') });
      node.setAttribute('inert', ''); node.setAttribute('aria-hidden', 'true');
    }
  }
  function openLayer(node, kind) {
    const rec = { node, kind, cleanups: [], closing: false, returnFocus: document.activeElement === document.body ? $('#view') : document.activeElement, id: ++layerId };
    const dialog = $('.sheet', node) || node;
    dialog.setAttribute('role', 'dialog'); dialog.setAttribute('aria-modal', 'true'); dialog.setAttribute('tabindex', '-1');
    const heading = $('.sheet-head h3, .page-head h2', dialog);
    if (heading) { heading.id = `layer-title-${rec.id}`; dialog.setAttribute('aria-labelledby', heading.id); dialog.removeAttribute('aria-label'); }
    else dialog.setAttribute('aria-label', kind === 'unlock' ? '鱼卡解锁' : '鱼卡分享');
    $('#layers').append(node);
    layers.push(rec);
    syncLayerAccess();
    if (kind === 'page') M.pageIn(node);
    else if (kind === 'sheet') M.sheetIn(node);
    return rec;
  }
  function closeLayer(rec, instant) {
    if (!rec || rec.closing) return;
    if (rec.canClose && !rec.canClose()) return;
    const wasTop = rec === topLayer();
    rec.closing = true;
    if (rec.kind === 'unlock') M.settleUnlock(rec.node, 'close');
    const index = layers.indexOf(rec); if (index >= 0) layers.splice(index, 1);
    syncLayerAccess(wasTop ? rec.returnFocus : null);
    rec.node.setAttribute('inert', ''); rec.node.setAttribute('aria-hidden', 'true'); rec.node.style.pointerEvents = 'none';
    const done = () => {
      rec.cleanups.forEach((fn) => fn()); rec.node.remove();
      syncLayerAccess();
      if (!$('#layers .layer.page')) gsap.set('#view', { clearProps: 'transform,opacity,visibility' });
    };
    if (instant) return done();
    if (rec.kind === 'unlock') return gsap.to(rec.node, { autoAlpha: 0, duration: 0.2, ease: 'none', onComplete: done });
    (rec.kind === 'page' ? M.pageOut(rec.node) : M.sheetOut(rec.node)).eventCallback('onComplete', done);
  }
  const closeAll = () => {
    const previous = layers[0]?.returnFocus;
    layers.slice().reverse().forEach((r) => closeLayer(r, true));
    syncLayerAccess(previous);
    gsap.killTweensOf('#view'); gsap.set('#view', { clearProps: 'transform,opacity,visibility' });
  };
  document.addEventListener('keydown', (e) => {
    if (e.defaultPrevented) return;
    const rec = topLayer(), scope = layerScope(rec);
    if (e.key === 'Escape' && rec) { e.preventDefault(); back(); }
    else if (e.key === 'Tab' && scope) {
      const items = $$(focusable, scope).filter(node => node.tabIndex >= 0 && canFocus(node));
      const index = items.indexOf(document.activeElement);
      if (!items.length || index < 0 || (e.shiftKey ? index === 0 : index === items.length - 1)) {
        e.preventDefault();
        if (items.length) focusNode(e.shiftKey ? items[items.length - 1] : items[0]); else focusLayer(rec);
      }
    }
    else if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('div[role="button"]')) { e.preventDefault(); e.target.click(); }
  });
  document.addEventListener('focusin', (event) => {
    const rec = topLayer(), scope = layerScope(rec);
    if (!restoringFocus && scope && !scope.contains(event.target)) focusLayer(rec);
  });
  document.addEventListener('click', (event) => {
    const surface = layerSurface(topLayer());
    if (surface && !surface.contains(event.target)) { event.preventDefault(); event.stopImmediatePropagation(); }
  }, true);

  // 全局二级流程顶部：返回按钮 + 当前页标题，吸顶 + 毛玻璃底板（页面层、发布确认、编辑信息共用）
  const subHead = (title, attr = 'data-close', cls = '') => `<header class="page-head sub-head ${cls}"><button class="icon-btn" ${attr} aria-label="返回">${ICON.back}</button><h2 tabindex="-1">${esc(title)}</h2></header>`;
  function page(title, body) {
    const node = el(`<div class="layer page">${subHead(title)}<div class="page-body">${body}</div></div>`);
    const rec = openLayer(node, 'page');
    $('[data-close]', node).onclick = () => closeLayer(rec);
    return rec;
  }
  function sheet(title, body, cls = '') {
    const node = el(`<div class="layer sheet-wrap"><div class="scrim"></div><section class="sheet ${cls}" role="dialog" aria-label="${esc(title)}"><div class="grab" aria-hidden="true"></div><div class="sheet-head"><h3 tabindex="-1">${esc(title)}</h3><button class="icon-btn" data-close aria-label="关闭">${ICON.close}</button></div><div class="sheet-body">${body}</div></section></div>`);
    const rec = openLayer(node, 'sheet');
    $('.scrim', node).onclick = $('[data-close]', node).onclick = () => closeLayer(rec);
    return rec;
  }
  function confirmSheet(title, text, okLabel, onOk, { danger = false } = {}) {
    const rec = sheet(title, `<p class="muted confirm-copy">${esc(text)}</p><div class="row confirm-actions"><button class="btn grow confirm-cancel" data-no data-initial-focus>取消</button><button class="btn grow primary confirm-accept" data-ok>${esc(okLabel)}</button></div>`, `confirm-sheet${danger ? ' is-danger' : ''}`);
    const dialog = $('.sheet', rec.node), copy = $('.confirm-copy', rec.node);
    copy.id = `layer-description-${rec.id}`; dialog.setAttribute('role', 'alertdialog'); dialog.setAttribute('aria-describedby', copy.id);
    $('[data-no]', rec.node).onclick = () => closeLayer(rec);
    $('[data-ok]', rec.node).onclick = async (e) => {
      const button = e.currentTarget; setBusy(button, true);
      try { await onOk(); closeLayer(rec); }
      catch (error) { toast(error.message); setBusy(button, false); }
    };
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
    else if (state.tab === 'dex') mountDexV2(view, myCtx, animate);
    else if (state.tab === 'rank') renderRankV2(view);
    if (animate) M.viewIn(view, TAB_ORDER[state.tab] - TAB_ORDER[prevTab]);
    prevTab = state.tab;
  }
  const TAB_ORDER = { dex: 0, catch: 1, rank: 2, map: 3 };
  let prevTab = state.tab;
  function go(tab) { state.tab = tab; render(true); }

  // ============================================================
  // 渔获：登记表
  // ============================================================
  function blankForm() {
    const db = S.db, c = S.CITIES[db.me.city] || S.CITIES.杭州;
    return {
      photo: '', source: '', speciesId: '',
      location: window.YK_API?.remote ? { city: db.me.city, district: '', place: '' } : { city: db.me.city in S.CITIES ? db.me.city : '杭州', district: c.districts[0], place: c.places[0], lat: c.lat, lng: c.lng },
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
          // 1280px keeps enough fin/scale detail for AI recognition when the fish is small in frame.
          const k = Math.min(1, 1280 / Math.max(im.width, im.height));
          const cv = document.createElement('canvas');
          cv.width = Math.round(im.width * k);
          cv.height = Math.round(im.height * k);
          cv.getContext('2d').drawImage(im, 0, 0, cv.width, cv.height);
          resolve(cv.toDataURL('image/jpeg', 0.82));
        };
        im.src = rd.result;
      };
      rd.readAsDataURL(file);
    });
  }

  function hintsHTML(d) {
    return hintsHTMLV2(d);
  }

  let publishStep = 'capture';
  // 应用内取景：切到「发布」即打开相机。拍照 = 截一帧；拍视频 = MediaRecorder 录制，再按一次停止
  const cam = { stream: null, facing: 'environment', mode: 'image', rec: null, chunks: [], timer: null, started: 0, autoLaunch: false };
  // 1x1 transparent poster: stops Android WebView painting its grey play-icon placeholder.
  const BLANK_POSTER = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  const openCapture = () => { publishStep = 'capture'; cam.autoLaunch = true; };
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
    if (window.YK_NATIVE && cam.mode === 'image') {
      // Native photos use the system camera; never show the WebView <video> placeholder.
      msg.hidden = false; msg.innerHTML = '<b>点击快门拍照</b><span>也可以从右侧相册选择照片或视频</span>';
      if (cam.autoLaunch) { cam.autoLaunch = false; $('[data-shoot]', view)?.click(); }
      return;
    }
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
  let mediaSelection = 0;
  function resetPhotoRecognition(d) {
    Object.assign(d, { speciesId: '', recognitionStatus: 'idle', recognitionToken: null,
      recognitionCandidates: [], recognitionError: '', recognitionProvider: '', recognitionModel: null, recognitionConfidence: null });
  }
  async function useMedia(d, file, source) {
    if (file.size > 60 * 1024 * 1024) return toast('请选择小于 60MB 的视频或图片');
    const old = d.videoId, selection = ++mediaSelection;
    let photo, videoId = null, duration = 0;
    if (file.type.startsWith('video/')) {
      const info = await window.YK_MEDIA.probeVideo(file), id = S.uuid();
      if (!info.duration || info.duration > 60) throw new Error('视频需在 60 秒内');
      if (selection !== mediaSelection || state.tab !== 'catch' || state.draft !== d) return;
      if (await window.YK_MEDIA.put(id, file) == null) throw new Error('storage');
      photo = info.poster; videoId = id; duration = info.duration;
    } else photo = await window.YK_MEDIA.compressImage(file);
    if (selection !== mediaSelection || state.tab !== 'catch' || state.draft !== d) { if (videoId) await window.YK_MEDIA.del(videoId); return; }
    d.photo = photo; d.videoId = videoId; d.duration = duration;
    resetPhotoRecognition(d);
    if (old && old !== d.videoId) window.YK_MEDIA.del(old);
    d.source = source; d.sample = false;
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
      const enteringStep = publishStep;
      requestAnimationFrame(() => {
        if (state.tab !== 'catch' || publishStep !== enteringStep) return;
        const root = view.firstElementChild;
        if (!root) return;
        gsap.fromTo(root, { x: 18 * dir, autoAlpha: .35 }, { x: 0, autoAlpha: 1, duration: .28, ease: 'power3.out', clearProps: 'transform,opacity,visibility', overwrite: 'auto' });
      });
    }
    lastPubStep = publishStep;
    if (publishStep === 'edit' && d.photo) {
      renderCatchFormV2(view);
      view.insertAdjacentHTML('afterbegin', subHead('编辑信息', 'data-pub-back'));
      $('[data-pub-back]', view).onclick = () => { publishStep = 'preview'; render(); };
      return;
    }
    const preview = publishStep === 'preview' && d.photo;
    if (preview) {
      view.innerHTML = `<div class="publish-capture is-preview">
        ${subHead('确认渔获', 'data-pub-exit', 'on-dark')}
        <div class="publish-media"><img src="${esc(d.photo)}" alt="待发布渔获"></div>
        <div class="confirm-bar"><button class="confirm-btn retake" data-retake>重拍</button><button class="confirm-btn next" data-next><span>下一步</span>${ICON.arrow}</button></div></div>`;
      $('[data-pub-exit]', view).onclick = () => { publishStep = 'capture'; render(); };
      $('[data-retake]', view).onclick = () => { openCapture(); render(); };
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
      <div class="cam-stage"><video class="cam-live" playsinline muted autoplay poster="${BLANK_POSTER}"${window.YK_NATIVE && cam.mode === 'image' ? ' hidden' : ''}></video>
        <div class="cam-msg"><b>正在打开相机…</b></div>
        <div class="cam-rec" hidden><i></i><span class="num">00:00</span></div></div>
        <header class="cam-top"><button class="icon-btn glass" data-pub-exit aria-label="关闭">${ICON.close}</button><span class="grow"></span><button class="icon-btn glass" data-flip aria-label="翻转镜头">${ICON.flipCamera}</button></header>
      <div class="cam-bottom">
        <div class="cam-modes" role="tablist"><button role="tab" aria-selected="${cam.mode === 'image'}" class="${cam.mode === 'image' ? 'on' : ''}" data-cmode="image">拍照</button><button role="tab" aria-selected="${cam.mode === 'video'}" class="${cam.mode === 'video' ? 'on' : ''}" data-cmode="video" ${canRec ? '' : 'disabled title="当前浏览器不支持录像，请用相册选择视频"'}>拍视频</button></div>
        <div class="cam-row"><span class="cam-side" aria-hidden="true"></span>
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
      $$('[data-cmode]', view).forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b); });
      shoot.classList.toggle('video', cam.mode === 'video');
      shoot.setAttribute('aria-label', cam.mode === 'video' ? '开始录像' : '拍照');
      if (!M.reduced()) gsap.fromTo($('i', shoot), { scale: 0.6 }, { scale: 1, duration: 0.35, ease: 'back.out(2.4)' });
      live.hidden = !!(window.YK_NATIVE && cam.mode === 'image');
      startCamera(view); // 录像需要麦克风，重新取流；原生拍照模式只显示提示
    }));
    $('[data-album]', view).onclick = () => $('[data-library]', view).click();
    $('[data-library]', view).onchange = async (e) => { const f = e.target.files[0]; if (!f) return; try { await useMedia(d, f, 'album'); } catch (err) { toast('媒体读取或保存失败，请换一个文件重试'); } };
    shoot.onclick = async () => {
      if (window.YK_NATIVE && cam.mode === 'image') {
        if (shoot.disabled) return;
        setBusy(shoot, true);
        try { await useMedia(d, await window.YK_NATIVE.capturePhoto(), 'camera'); }
        catch (e) { if (!/cancel/i.test(e.message || '')) toast('拍摄未完成，请检查相机权限后重试'); }
        finally { setBusy(shoot, false); }
        return;
      }
      if (!cam.stream) return toast('相机还没打开，可以先从相册选择');
      if (cam.mode === 'image') {
        if (!live.videoWidth) return;
        A.haptic('light');
        if (!M.reduced()) gsap.fromTo($('.cam-stage', view), { filter: 'brightness(2.2)' }, { filter: 'brightness(1)', duration: 0.35, clearProps: 'filter' });
        const url = window.YK_MEDIA.frame(live, live.videoWidth, live.videoHeight, 1280, cam.facing === 'user');
        d.photo = url; d.videoId = null; d.duration = 0; d.source = 'camera'; d.sample = false;
        resetPhotoRecognition(d);
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
    rec.node.classList.add('protected-page');
    $('[data-ok]', rec.node).onclick = async (e) => {
      const button = e.currentTarget;
      if (button.disabled) return;
      setBusy(button, true);
      try { await S.encounter({ ...draft() }, p); }
      catch (error) { toast(error.message); setBusy(button, false); return; }
      resetDraft();
      closeLayer(rec);
      go('dex');
      toast(`已记下与${p.name}的这次遇见`);
    };
  }

  // Only an address returned for this GPS fix may replace the draft location.
  function locateMe(rec) {
    const d = draft();
    const geolocation = window.YK_NATIVE?.geolocation || navigator.geolocation;
    if (!geolocation) return toast('这台设备不支持定位');
    const button = $('[data-locate]', rec.node);
    if (button.disabled) return;
    setBusy(button, true);
    toast('正在定位…', 4000);
    geolocation.getCurrentPosition(async (pos) => {
      if (rec.closing) return;
      const { latitude: lat, longitude: lng } = pos.coords;
      if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) { setBusy(button, false); return toast('没有获取到有效位置，请重试'); }
      if (window.YK_API.remote) {
        try {
          const location = await window.YK_API.reverseGeocode(lat, lng, 'wgs84');
          if (rec.closing) return;
          if (location.coordType !== 'gcj02' || !Number.isFinite(location.lat) || !Number.isFinite(location.lng) || Math.abs(location.lat) > 90 || Math.abs(location.lng) > 180) throw new Error('地址解析暂不可用，请手动填写地点');
          d.location = location;
          saveDraft(); closeLayer(rec); render(); toast(location.approximate ? `已定位到${location.city}附近，可修改钓点名称` : '已获取当前位置');
        } catch (error) { if (!rec.closing) { setBusy(button, false); toast(error.message); } }
        return;
      }
      d.location = { city: d.location.city || S.db.me.city, district: '', place: `${lat.toFixed(4)}, ${lng.toFixed(4)}`, lat, lng, coordType: 'wgs84' };
      saveDraft();
      closeLayer(rec);
      render();
      toast('已获取坐标，请核对城市');
    }, (err) => {
      if (rec.closing) return;
      setBusy(button, false);
      toast(err.code === 1 ? '没有定位权限，请在系统设置里允许' : '定位失败，请稍后重试或手动选择');
    }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 });
  }
  function locationSheet() {
    const d = draft();
    const rec = sheet('选择钓点', `<button class="btn primary locate-btn" data-locate><span>使用当前位置</span><i class="dot">${ICON.locate}</i></button>
      <div class="location-manual"><label>城市<input name="location-city" maxlength="40" value="${esc(d.location.city)}" autocomplete="address-level2"></label><label>区县<input name="location-district" maxlength="80" value="${esc(d.location.district)}" autocomplete="address-level3"></label><label class="location-place">地点<input name="location-place" maxlength="120" value="${esc(d.location.place)}" placeholder="填写地点名称"></label></div><button class="btn block" data-save-location>保存地点</button>`);
    rec.node.onclick = (e) => {
      if (e.target.closest('[data-locate]')) return locateMe(rec);
      if (!e.target.closest('[data-save-location]')) return;
      const city = $('[name="location-city"]', rec.node).value.trim(), district = $('[name="location-district"]', rec.node).value.trim(), place = $('[name="location-place"]', rec.node).value.trim();
      if (!city) { $('[name="location-city"]', rec.node).focus(); return toast('请填写城市'); }
      if (city !== d.location.city || district !== d.location.district || place !== d.location.place) d.location = { city, district, place };
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
    toast('还差' + (miss.length > 1 ? miss.slice(0, -1).join('、') + '和' + miss.at(-1) : miss[0]));
    if (!target) return;
    showMissing.scrollTo(target);
    target.classList.remove('need');
    void target.offsetWidth;
    target.classList.add('need');
    gsap.delayedCall(1.6, () => target.classList.remove('need'));
    M.nudge(target);
    if (miss[0] === '描述') gsap.delayedCall(0.45, () => $('#f-desc', view).focus({ preventScroll: true }));
    if (miss[0] === '全长') gsap.delayedCall(0.45, () => $('#f-len', view).focus({ preventScroll: true }));
  }
  showMissing.scrollTo = (target) => {
    const view = $('#view');
    const headH = ($('.sub-head', view) || { offsetHeight: 0 }).offsetHeight;
    const top = target.getBoundingClientRect().top - view.getBoundingClientRect().top + view.scrollTop - 16 - headH;
    gsap.to(view, { scrollTop: Math.max(0, top), duration: M.reduced() ? 0 : 0.45, ease: 'power2.out', overwrite: 'auto' });
  };
  // 发布按钮实时反映还差几项：缺项时弱化为“还差 N 项”，齐全后变实心“收入囊中”
  function syncSubmitV2(view, d) {
    const cta = $('.submit-bar .cta', view); if (!cta) return;
    const n = missing(d).length + (d.recognitionStatus === 'suggested' || d.recognitionStatus === 'pending' ? 1 : 0);
    const label = n ? `还差 ${n} 项` : '收入囊中';
    cta.classList.toggle('is-incomplete', !!n);
    const span = $('span', cta); if (span && span.textContent !== label) span.textContent = label;
  }

  // ============================================================
  // 鱼卡解锁
  // ============================================================
  const CARD_BACK = `<div class="cardback"><div class="cb-ring">${ICON.fish}</div><div class="cb-logo">YUKOMON</div><div class="cb-sub">淡水鱼采集图鉴</div></div>`;

  // ============================================================
  // 图鉴（自己的主页和别人的主页共用）
  // ============================================================
  function lockedSheet(sp) {
    const rec = sheet(`No.${sp.no} · 等你钓到`, `<div class="locked-sheet-fish" aria-hidden="true">${F.fishSVG(sp, { silhouette: true })}</div>
      <p style="margin:0 0 12px;text-align:center">${esc(sp.hint)}</p>
      <div class="facts"><div class="kv"><span>稀有度</span><span>${rb(sp.rarity)} ${C.RV[sp.rarity].name}</span></div><div class="kv"><span>栖息地</span><span>${C.HAB[sp.habitat].name}</span></div><div class="kv"><span>分布</span><span>${esc(sp.region)}</span></div><div class="kv"><span>旺季</span><span>${esc(sp.season)}</span></div><div class="kv"><span>钓法</span><span>${esc(sp.method)}</span></div></div>
      <div class="locked-sheet-actions"><button class="btn primary block" data-go-fish>${ICON.camera}去钓这条鱼</button><button class="btn quiet block" data-go-spots>${ICON.pin}看看哪里有人钓到</button></div>`);
    rec.node.addEventListener('click', (e) => {
      if (e.target.closest('[data-go-fish]')) { closeAll(); go('catch'); }
      else if (e.target.closest('[data-go-spots]')) { closeAll(); state.mapFilters = { ...(state.mapFilters || {}), city: 'all', speciesId: sp.no }; go('map'); }
    });
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
  // 鱼卡详情里的记录只保留照片与点赞，点击后由覆盖式详情弹窗补充完整信息。
  const recordTile = (c, i, title) => {
    const label = [title, c.lengthCm ? `${c.lengthCm} 厘米` : '', c.location?.city || '', C.fmtDate(c.createdAt)].filter(Boolean).join(' · ');
    const city = c.location?.city || '';
    const size = c.lengthCm ? `${c.lengthCm}<small>cm</small>` : '未量';
    const meta = [city, C.fmtDate(c.createdAt)].filter(Boolean).join(' · ');
    return `<div class="entry record-tile" data-i="${i}" role="button" tabindex="0" aria-expanded="false" aria-label="${esc(label || '渔获记录')}">
      <img class="ph" src="${esc(photoOf(c))}" alt="${esc(title || '渔获照片')}" loading="lazy"><span class="record-tile-caption"><b>${size}</b>${meta ? `<small>${esc(meta)}</small>` : ''}</span>${likeChip(c)}
    </div>`;
  };
  function metSheet(met, ctx) {
    const rec = sheet('遇见过的保护鱼类', `<div class="entry-list">${met.map((c, i) => catchRow(c, i, c.protectedName)).join('')}</div>`);
    $('.entry-list', rec.node).onclick = (e) => { const x = e.target.closest('[data-i]'); if (x) { closeLayer(rec); catchDetail(met[+x.dataset.i], ctx); } };
  }

  // ============================================================
  // 排行榜
  // ============================================================
  function collectionState(root, title, message, retry, busy = false) {
    root.setAttribute('aria-busy', String(busy));
    root.innerHTML = `<div class="empty collection-state" role="${busy ? 'status' : 'alert'}"><h3>${esc(title)}</h3>${message ? `<p>${esc(message)}</p>` : ''}${retry ? '<button class="btn" data-retry-profile>重试</button>' : ''}</div>`;
    root.onclick = retry ? e => { if (e.target.closest('[data-retry-profile]')) return retry(); } : null;
    syncLayerAccess();
  }
  async function openProfile(userId) {
    if (userId === 'me') { closeAll(); return go('dex'); }
    const rec = page('钓友图鉴', '<div class="profile-root"></div>');
    const root = $('.profile-root', rec.node);
    let request = 0;
    const load = async () => {
      const current = ++request;
      collectionState(root, '正在读取图鉴', '', null, true);
      try {
        if (S.fetchProfile) await S.fetchProfile(userId);
        if (rec.closing || current !== request) return;
        const p = S.profileOf(userId);
        if (!p) { collectionState(root, '暂时无法打开图鉴', '这位钓友的图鉴暂不可用', load); return; }
        $('.page-head h2', rec.node).textContent = `${p.user.nickname}的图鉴`;
        root.setAttribute('aria-busy', 'false');
        mountDexV2(root, { me: false, userId, filter: 'have' }, true);
        if (rec === topLayer() && (root.contains(document.activeElement) || document.activeElement === document.body)) focusLayer(rec);
      } catch (error) {
        if (rec.closing || current !== request) return;
        collectionState(root, '图鉴读取失败', error.message || '请稍后重试', load);
      }
    };
    rec.cleanups.push(() => { request++; });
    await load();
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
      ${ctx.me ? `<div class="actions-row" style="margin-bottom:8px">${sp ? `<button class="btn" data-share>${ICON.copy}分享链接</button>` : ''}<button class="btn" data-edit>编辑</button><button class="btn danger" data-del>${ICON.trash}删除</button></div>` : '<div style="height:8px"></div>'}`, 'tall catch-record-sheet');
    const node = rec.node;
    if (c.videoUrl) {
      const video = document.createElement('video'); video.controls = true; video.playsInline = true; video.preload = 'metadata'; video.poster = photoOf(c); video.src = c.videoUrl;
      $('.hero-photo img', node).replaceWith(video);
      rec.cleanups.push(() => { video.pause(); video.removeAttribute('src'); video.load(); });
    }
    if (c.videoId) window.YK_MEDIA.get(c.videoId).then(blob => {
      if (!blob || rec.closing) return;
      const v = document.createElement('video'), url = URL.createObjectURL(blob);
      v.controls = true; v.playsInline = true; v.poster = photoOf(c); v.src = url;
      $('.hero-photo img', node).replaceWith(v);
      rec.cleanups.push(() => { v.pause(); v.removeAttribute('src'); v.load(); URL.revokeObjectURL(url); });
    });
    const like = $('[data-like]', node);
    if (like) like.onclick = async () => {
      if (like.disabled) return;
      setBusy(like, true);
      let r;
      try { r = await S.toggleLike(c); } catch (error) { toast(error.message); setBusy(like, false); return; }
      setBusy(like, false);
      like.classList.toggle('on', r.liked);
      like.setAttribute('aria-pressed', r.liked);
      $('.num', like).textContent = r.count;
      A.haptic('light');
      M.likePop(like, r.liked);
      if (onLike) onLike(c, r);
    };
    const sh = $('[data-share]', node);
    const edit = $('[data-edit]', node);
    if (edit) edit.onclick = () => editCatch(c, ctx);
    if (sh) sh.onclick = () => shareSheet(sp, c);
    const del = $('[data-del]', node);
    if (del) del.onclick = () => confirmSheet('删除这条渔获？', sp ? `如果这是唯一一条${sp.name}，对应的鱼卡也会收回。` : '删除后无法恢复。', '删除', async () => { await S.removeCatch(c.id); if (c.videoId) await window.YK_MEDIA.del(c.videoId); closeAll(); render(); toast('已删除'); }, { danger: true });
  }

  function recordModal(c, ctx, id) {
    const sp = S.byId[c.speciesId], loc = c.location || {}, gear = c.gear || {}, likes = S.likesOf(c);
    const row = (label, value) => value ? `<div class="record-modal-row"><span>${label}</span><b>${value}</b></div>` : '';
    const location = ctx.me ? [loc.place, loc.city, loc.district].filter(Boolean).join(' · ') : (loc.city || '');
    const species = sp ? `${esc(sp.name)} ${rb(sp.rarity)}` : (c.protectedName ? `${esc(c.protectedName)}（保护鱼类）` : '未识别鱼种');
    const gearRows = GEAR.map(([key, label]) => row(label, esc(gear[key] || ''))).join('');
    return `<div class="record-modal" id="${id}" role="dialog" aria-modal="true" aria-label="渔获记录详情">
      <button class="record-modal-scrim" type="button" tabindex="-1" data-record-modal-close aria-label="关闭渔获记录详情"></button>
      <section class="record-modal-panel" tabindex="-1">
        <header class="record-modal-head"><div><span class="eyebrow">渔获记录详情</span><h3>${sp ? esc(sp.name) : '渔获记录'}</h3></div><button class="icon-btn" type="button" data-record-modal-close aria-label="关闭详情">${ICON.close}</button></header>
        <div class="record-modal-photo-wrap"><img class="record-modal-photo" src="${esc(photoOf(c))}" alt="${esc(sp?.name || c.protectedName || '渔获照片')}" loading="eager"><span class="record-modal-like">${ICON.heart}<span class="num">${likes.count}</span> 个赞</span></div>
        ${c.desc ? `<p class="record-modal-desc">${esc(c.desc)}</p>` : ''}
        <div class="record-modal-facts">
          ${row('鱼种', species)}
          ${row('尺寸', c.lengthCm ? `<span class="num">${c.lengthCm} cm</span>` : '')}
          ${row('钓点', esc(location))}
          ${row('时间', `<span class="num">${ctx.me ? fmtFull(c.createdAt) : C.fmtDate(c.createdAt)}</span>`)}
          ${row('状态', c.released ? '已放流' : '未放流')}
          ${gearRows}
        </div>
        ${ctx.me ? `<div class="record-modal-actions"><button class="btn" type="button" data-edit>编辑</button><button class="btn danger" type="button" data-del>删除</button></div>` : ''}
      </section>
    </div>`;
  }

  function editCatch(c, ctx) {
    const sp = S.byId[c.speciesId];
    const rec = sheet('编辑渔获', `<form class="catch-edit">
      <label for="edit-desc">描述</label><textarea id="edit-desc" required maxlength="200">${esc(c.desc)}</textarea>
      ${GEAR.map(([key, label]) => `<label for="edit-${key}">${label}</label><input id="edit-${key}" maxlength="80" value="${esc(c.gear?.[key] || '')}">`).join('')}
      ${c.status !== 'protected' && sp?.releasePolicy !== 'forbid' ? `<label class="edit-release"><input id="edit-released" type="checkbox" ${c.released ? 'checked' : ''}>已放流</label>` : ''}
      <button class="btn primary block" type="submit">保存</button></form>`);
    $('.catch-edit', rec.node).onsubmit = async e => {
      e.preventDefault();
      const button = $('button[type="submit"]', rec.node);
      if (button.disabled) return;
      setBusy(button, true);
      const patch = { desc: $('#edit-desc', rec.node).value.trim(), gear: Object.fromEntries(GEAR.map(([key]) => [key, $('#edit-' + key, rec.node).value.trim()])) };
      const released = $('#edit-released', rec.node); if (released) patch.released = released.checked;
      if (!patch.desc) { toast('请填写描述'); setBusy(button, false); return; }
      try {
        await S.updateCatch(c.id, patch);
        closeAll(); render();
        const updated = S.db.catches.find(x => x.id === c.id);
        if (updated) catchDetail(updated, ctx);
        toast('已保存');
      } catch (error) { toast(error.message); setBusy(button, false); }
    };
  }

  // 分享链接：打开就是一张视差鱼卡，背面是这条渔获的照片、地点、时间和一句话描述
  // ============================================================
  const b64 = {
    enc: (o) => btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(o)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),
    dec: (s) => JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (ch) => ch.charCodeAt(0)))),
  };
  function sharePayload(sp, c, ur) {
    return {
      v: 2, by: S.db.me.nickname, s: sp.no, ur: ur ? 1 : 0,
      len: c && c.lengthCm || null,
      city: c && c.location ? c.location.city : '', t: c ? c.createdAt : Date.now(),
      d: (c && c.desc) || `钓到一条${sp.name}`, id: c ? c.id : '',
    };
  }
  const shareURL = (p) => `${location.href.split('#')[0]}#share=${b64.enc(p)}`;

  async function shareSheet(sp, c, ur = c?.source === 'camera' && c?.lengthCm >= sp.giantThresholdCm) {
    const p = sharePayload(sp, c, ur);
    let url = shareURL(p);
    if (window.YK_API.remote) {
      if (!c?.id) return toast('试看卡不能分享，记录一条真实渔获就可以');
      try {
        const shared = await window.YK_API.share(c.id, !!ur);
        url = `${window.YK_API.base}/#shared=${shared.id}&api=${encodeURIComponent(window.YK_API.base)}`;
        p.photo = c.photo;
      } catch (error) { return toast(error.message); }
    }
    const rec = sheet('分享这张鱼卡', `
      <div class="share-targets"><button class="share-target" data-target="session"><i>微</i>微信好友</button><button class="share-target" data-target="timeline"><i>圈</i>朋友圈</button><button class="share-target" data-target="more"><i>…</i>更多</button></div>
      <p class="muted" style="margin:0 0 12px;font-size:14px">好友能看到会动的鱼卡和背面的渔获信息 · 位置只显示城市</p>
      <input class="link-box" readonly value="${esc(url)}" aria-label="分享链接">
      <div class="row actions-row" style="margin-top:10px"><button class="btn grow" data-preview>${ICON.eye}预览</button><button class="btn primary grow" data-copy>${ICON.copy}复制链接</button></div>`);
    const shareText = `${sp.name} · ${S.db.me.nickname}的渔获`;
    const copyLink = async () => {
      try { await navigator.clipboard.writeText(url); return true; }
      catch { const box = $('.link-box', rec.node); box.select(); return document.execCommand('copy'); }
    };
    const systemShare = async () => {
      if (window.YK_NATIVE?.share) return window.YK_NATIVE.share({ title: '鱼可梦 Yukomon', text: shareText, url });
      if (navigator.share) return navigator.share({ title: '鱼可梦 Yukomon', text: shareText, url });
      if (await copyLink()) toast('链接已复制，去微信粘贴吧'); else toast('请长按链接复制');
    };
    const thumbnail = async () => {
      // Small JPEG for the WeChat card; failures just omit the thumbnail.
      try {
        const src = p.photo || plate(sp, 'share');
        const img = new Image(); img.crossOrigin = 'anonymous';
        await new Promise((ok, bad) => { img.onload = ok; img.onerror = bad; img.src = src; });
        const cv = document.createElement('canvas'); cv.width = cv.height = 150;
        const s = Math.min(img.width, img.height);
        cv.getContext('2d').drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, 150, 150);
        return cv.toDataURL('image/jpeg', 0.8);
      } catch { return ''; }
    };
    $('.share-targets', rec.node).onclick = async (event) => {
      const button = event.target.closest('[data-target]'); if (!button || button.disabled) return;
      const target = button.dataset.target;
      setBusy(button, true);
      try {
        if (target === 'more') { await systemShare(); return; }
        const wx = window.YK_NATIVE?.wechat;
        const status = wx ? await wx.status() : { configured: false };
        if (wx && status.configured && status.installed) {
          const res = await wx.shareLink({ url, title: `我钓到了${sp.name}${p.len ? ` ${p.len}cm` : ''}`, description: `${S.db.me.nickname} 在鱼可梦解锁了一张${p.ur ? '巨物' : ''}鱼卡，快来看看`, scene: target, thumbBase64: await thumbnail() });
          if (res?.ok) toast('已分享到微信');
          return;
        }
        if (wx && status.configured && !status.installed) { toast('未检测到微信，已为你打开系统分享'); }
        // Before the WeChat AppID is approved, the system share sheet lists WeChat directly.
        await systemShare();
      } catch (e) { if (!/cancel/i.test(e?.message || '')) toast(e?.message || '分享未完成'); }
      finally { setBusy(button, false); }
    };
    const box = $('.link-box', rec.node);
    box.onfocus = () => box.select();
    $('[data-copy]', rec.node).onclick = async (event) => {
      const button = event.currentTarget;
      if (button.disabled) return;
      setBusy(button, true);
      try {
        try { await navigator.clipboard.writeText(url); }
        catch { box.select(); if (!document.execCommand('copy')) throw new Error('复制失败，请长按链接复制'); }
        A.haptic('light'); toast('链接已复制');
      } catch (error) { toast(error.message); }
      finally { setBusy(button, false); }
    };
    $('[data-preview]', rec.node).onclick = () => { closeLayer(rec); shareView(p); };
  }

  let shareLanding = null;
  function shareView(p, fromLink) {
    const sp = S.byId[p.s];
    if (!sp) return toast('这个分享链接已失效');
    const local = S.db.catches.find((c) => c.id === p.id);
    const photo = p.photo || (local && local.photo) || plate(sp, 'share');
    const back = `<div class="shareback"><div class="sb-photo"><img src="${esc(photo)}" alt="${esc(sp.name)}的渔获照片"></div>
      <div class="sb-body"><p class="sb-desc">${esc(p.d)}</p>
        <div class="sb-meta"><span>${esc(p.city || '未知水域')}</span><span class="num">${C.fmtDate(p.t)}</span></div>
        <div class="sb-by"><span>${esc(p.by)}</span><span>${esc(sp.name)}${p.len ? ` <span class="num">${p.len}cm</span>` : ''}</span></div></div></div>`;
    const landing = !!fromLink && !window.YK_NATIVE;
    const downloadUrl = `${window.YK_API?.base || location.origin}/download/`;
    const node = el(landing ? `<div class="layer page share-view share-landing card-gradient-page">
      <header class="share-head card-scene"><span class="grow">${mono(p.by, 'sm')}<span><b>${esc(p.by)}</b> 的渔获</span></span></header>
      <div class="share-stage card-scene card-gradient"><div class="card-host"></div><p class="share-tilt-tip" hidden>点一下翻面 · 晃一晃看反光</p></div>
      <div class="share-foot"><a class="cta share-download" href="${esc(downloadUrl)}" data-download><span>下载鱼可梦 App</span><i class="dot">${ICON.arrow}</i></a></div></div>`
      : `<div class="layer page share-view card-gradient-page">
      <header class="share-head card-scene"><span class="grow">${mono(p.by, 'sm')}<span><b>${esc(p.by)}</b> 的渔获</span></span><button class="btn sm" data-close>关闭预览</button></header>
      <div class="share-stage card-scene card-gradient"><div class="card-host"></div></div></div>`);
    const card = { speciesId: sp.no, catchCount: 1 };
    const ce = C.render(sp, { card, variant: p.ur ? 'ur' : 'normal', giantInfo: p.ur ? { lengthCm: p.len, city: p.city, at: p.t } : null, interactive: true, back, backClass: 'has-design' });
    $('.card-host', node).append(ce);
    const rec = openLayer(node, 'page');
    if (landing) rec.kind = 'share-landing';
    rec.cleanups.push(C.attach(ce), C.animate(ce));
    // iOS Safari only grants motion events after a user gesture; ask on the first touch.
    const askMotion = () => { C.requestPermission?.(); };
    node.addEventListener('pointerdown', askMotion, { once: true });
    ce.onclick = () => { C.flip(ce); A.play('ui_flip'); A.haptic('light'); };
    if (!M.reduced()) gsap.from(ce, { y: 30, autoAlpha: 0, scale: 0.92, duration: 0.6, delay: 0.15 });
    if (landing) {
      // Landing pages only promote the download; no in-page app entry, no other actions.
      if (rec.canClose === undefined) rec.canClose = () => false;
      shareLanding = rec;
      const tip = $('.share-tilt-tip', node); if (tip) tip.hidden = false;
      document.body.classList.add('share-landing-on');
      // WeChat/QQ in-app browsers block APK downloads: guide the user to the system browser.
      const inApp = /MicroMessenger|QQ\/|WeiBo/i.test(navigator.userAgent);
      const dl = $('[data-download]', node), origin = window.YK_API?.base || location.origin;
      fetch(`${origin}/api/releases`, { credentials: 'omit' }).then(r => r.json()).then(m => {
        const ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        if (ios && m.ios?.available) dl.href = m.ios.appStoreUrl;
        else if (!ios && m.android?.available) dl.href = origin + m.android.url;
      }).catch(() => {});
      dl.onclick = (event) => {
        if (!inApp) return;
        event.preventDefault();
        if ($('.open-in-browser', node)) return;
        const guide = el(`<div class="open-in-browser" role="dialog" aria-label="在浏览器中打开"><div class="oib-arrow" aria-hidden="true">↗</div><p><b>点击右上角「···」</b><br>选择「在浏览器打开」后即可下载 App</p></div>`);
        guide.onclick = () => guide.remove();
        node.append(guide);
      };
      return;
    }
    const leave = () => { if (fromLink) history.replaceState(null, '', location.href.split('#')[0]); closeLayer(rec); };
    $('[data-close]', node).onclick = leave;
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
      <div class="settings-group"><span class="eyebrow">试看解锁动画</span><div class="box"><div class="sfx-row">${[...RARITIES, 'UR'].map((r) => `<button class="btn sm" data-try="${r}">${rb(r)}</button>`).join('')}</div></div></div>
      <div class="settings-group"><span class="eyebrow">数据</span><div class="box">
        <div class="set-row"><span>填充测试数据</span><button class="btn sm" style="background:var(--bg)" data-demo>填充</button></div>
        <div class="set-row"><span>恢复演示数据</span><button class="btn sm" style="background:var(--bg)" data-reset>恢复</button></div>
        <div class="set-row"><span>清空全部记录</span><button class="btn sm danger" data-wipe>清空</button></div>
      </div></div>`);
    const node = rec.node;
    node.classList.add('settings-page');
    $('#set-name', node).onchange = (e) => { db.me.nickname = e.target.value.trim() || '大鱼'; S.save(); render(); };
    $('#set-bio', node).onchange = (e) => { db.me.bio = e.target.value.trim(); S.save(); render(); };
    const cityNative = $('#set-city', node);
    const cityPicker = $('[data-city-picker]', node);
    const cityTrigger = $('.city-trigger', cityPicker);
    const cityMenu = $('.city-menu', cityPicker);
    const cityValue = $('[data-city-value]', cityPicker);
    const closeCityMenu = () => { M.menu(cityMenu, false); cityPicker.classList.remove('open'); cityTrigger.setAttribute('aria-expanded', 'false'); };
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
      const open = cityTrigger.getAttribute('aria-expanded') !== 'true';
      if (open) {
        M.menu(cityMenu, true);
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
      else if (ds.try) demoUnlockV2(ds.try);
      else if ('demo' in ds) { try { window.YK_API.disconnect(); S.fillDemo(); closeAll(); render(); toast('已填充测试数据'); } catch (error) { toast(error.message); } }
      else if ('reset' in ds) { try { S.reset(); window.YK_MEDIA.prune(); state.draft = null; closeLayer(rec); render(); toast('已恢复演示数据'); } catch (error) { toast(error.message); } }
      else if ('wipe' in ds) confirmSheet('清空全部记录？', '所有渔获和鱼卡都会被删除，且无法恢复。', '全部清空', async () => { await S.wipe(); await window.YK_MEDIA.prune(); state.draft = null; closeLayer(rec); render(); toast('已清空'); }, { danger: true });
    });
  }
  // ============================================================
  // PRD v0.3 client prototype: AI recognition, lifetime rank, sets and map
  // ============================================================
  const recognitionTasks = new WeakMap();
  function ensureDraftV2(d) {
    d.gear = { rod: '', reel: '', line: '', bait: '', ...(d.gear || {}) };
    if (!d.mapVisibility) d.mapVisibility = 'private';
    if (!d.recognitionStatus) d.recognitionStatus = d.speciesId ? 'manual' : 'idle';
    if (d.recognitionStatus === 'pending' && !recognitionTasks.has(d)) {
      d.recognitionStatus = 'idle'; d.recognitionToken = null;
    }
    return d;
  }
  if (typeof document !== 'undefined') document.addEventListener('yk-ai-retry', () => {
    const p = document.querySelector('#view .ai-panel.pending p');
    if (p) p.textContent = '网络有点慢，正在自动重试…';
  });
  async function recognizeFish(d, force = false) {
    if (!d.photo || (d.recognitionStatus === 'pending' && !force)) return;
    const token = crypto.randomUUID(); d.recognitionToken = token;
    recognitionTasks.set(d, token);
    d.recognitionStatus = 'pending'; d.recognitionError = ''; saveDraft();
    const current = () => d.recognitionToken === token && state.draft === d && d.recognitionStatus === 'pending';
    try {
      const result = await window.YK_API.recognize(d, { force });
      if (!current()) return;
      d.recognitionCandidates = result.candidates.filter(item => S.byId[item.speciesId]);
      d.recognitionProvider = result.provider; d.recognitionModel = result.model;
      d.recognitionSeen = result.seen || ''; d.recognitionProtected = result.protectedName || '';
      d.recognitionNoFish = result.fish === false;
      d.recognitionStatus = d.recognitionCandidates.length ? 'suggested' : 'failed';
      if (!d.recognitionCandidates.length) {
        d.recognitionError = d.recognitionProtected ? `疑似国家保护鱼类「${d.recognitionProtected}」，请立即放生，不发卡`
          : d.recognitionNoFish ? '没有在照片里找到鱼，把鱼放在画面中间、拍清楚整条鱼再试'
          : d.recognitionSeen ? `看起来像「${d.recognitionSeen}」，图鉴暂未收录，可手动选择最接近的鱼种`
          : '无法确认鱼种，请手动选择';
      }
    } catch (error) {
      if (!current()) return;
      d.recognitionStatus = 'failed'; d.recognitionCandidates = []; d.recognitionError = error.message;
    } finally {
      if (recognitionTasks.get(d) === token) recognitionTasks.delete(d);
    }
    saveDraft();
    if (state.tab === 'catch' && publishStep === 'edit') render();
  }
  function confirmRecognition(d, speciesId) {
    const candidate = (d.recognitionCandidates || []).find(item => item.speciesId === speciesId);
    if (!candidate || !S.byId[speciesId]) return false;
    d.speciesId = speciesId; d.recognitionStatus = 'confirmed';
    d.recognitionConfidence = candidate.confidence ?? null;
    return true;
  }
  function recognitionHTMLV2(d) {
    if (!d.photo) return '';
    if (d.recognitionStatus === 'pending' || d.recognitionStatus === 'idle') return `<div class="ai-panel pending" data-stagger><span class="ai-spinner" aria-hidden="true"></span><div class="grow"><b>正在认鱼…</b><p>对比体型、口型、斑纹与鳍形，通常 5 秒左右</p></div><button class="btn sm quiet" data-ai-fail>手动选择</button></div>`;
    if (d.recognitionStatus === 'failed') {
      const title = d.recognitionProtected ? '疑似保护鱼类' : d.recognitionNoFish ? '没有拍到鱼' : d.recognitionSeen ? '图鉴暂未收录' : '暂时无法识别';
      const action = d.recognitionNoFish ? `<button class="btn sm" data-ai-reshoot>重拍</button>` : `<button class="btn sm" data-ai-retry>重试</button>`;
      return `<div class="ai-panel failed ${d.recognitionProtected ? 'protected' : ''}" data-stagger><span class="ai-status-icon">!</span><div class="grow"><b>${title}</b><p>${esc(d.recognitionError || '可以重试，或直接搜索鱼种')}</p></div>${action}</div>`;
    }
    if (d.recognitionStatus === 'suggested') return `<div class="ai-panel suggested" data-stagger><div class="ai-panel-head"><span class="ai-status-icon">AI</span><div class="grow"><b>可能是这些鱼</b><p>${d.recognitionSeen ? `AI 判断：${esc(d.recognitionSeen)} · ` : ''}请选择一个结果确认</p></div><button class="btn sm quiet" data-ai-fail>都不是，手动选</button></div><div class="ai-candidates">${(d.recognitionCandidates || []).map((item, i) => { const sp = S.byId[item.speciesId]; return `<button class="ai-candidate" data-ai-species="${sp.no}"><span class="ai-rank">${i + 1}</span><span class="grow"><b>${esc(sp.name)}</b><small>${esc((sp.alias || []).slice(0, 3).join(' / ') || sp.latin)}</small></span>${rb(sp.rarity)}<strong>${Math.round(item.confidence * 100)}%</strong></button>`; }).join('')}</div></div>`;
    const sp = S.byId[d.speciesId];
    return `<div class="ai-panel confirmed" data-stagger><span class="ai-status-icon">✓</span><div class="grow"><b>已确认：${sp ? esc(sp.name) : '鱼种'}</b><p>${d.recognitionStatus === 'manual' ? '手动选择' : '已核对 AI 候选'}</p></div><button class="btn sm quiet" data-ai-again>重新识别</button></div>`;
  }
  function scorePreviewHTMLV2(d) {
    if (!d.speciesId || !Number(d.lengthCm)) return '';
    if (d.source === 'album') return '<div class="score-preview muted"><span>相册记录</span><b>不计段位分</b><small>但会解锁鱼卡</small></div>';
    const score = S.scorePreview(d), tier = S.tierFor(S.db.rank.points + score.points);
    return `<div class="score-preview"><span>预计获得</span><b>+${score.points} 段位分</b><small>${esc(tier.name)} · ${score.sizeMultiplier}× 尺寸系数${score.firstBonus ? ' · 首次鱼种 +20' : ''}</small></div>`;
  }
  function renderCatchFormV2(view) {
    const d = ensureDraftV2(draft()), sp = S.byId[d.speciesId], p = d.location;
    if (d.photo && (d.recognitionStatus === 'idle' || !d.recognitionStatus)) recognizeFish(d);
    const gearRow = ([k, label, ph]) => `<div class="gear-row"><label for="g-${k}">${label}</label><input id="g-${k}" data-gear="${k}" maxlength="30" placeholder="${ph}" value="${esc(d.gear[k] || '')}"></div>`;
    const mapOptions = d.source === 'camera' ? `<div class="tile inline-tile span2 map-privacy-field"><div class="grow"><b>公开到钓点地图</b><div class="muted">默认只有你能看到；公开后位置会模糊到 1 公里</div></div><div class="segmented" role="group" aria-label="地图公开范围">${[['private', '仅自己'], ['city', '城市'], ['grid', '钓点地图']].map(([k, label]) => `<button class="${d.mapVisibility === k ? 'on' : ''}" data-map-visibility="${k}" aria-pressed="${d.mapVisibility === k}">${label}</button>`).join('')}</div></div>` : '<div class="tile inline-tile span2 album-private"><div class="grow"><b>相册记录默认私密</b><div class="muted">相册照片不会进入钓点地图或段位榜</div></div><span class="privacy-lock">仅自己</span></div>';
    view.innerHTML = `<div class="screen catch-editor">
      <section class="catch-section catch-photo" aria-labelledby="catch-photo-heading">
        <div class="catch-section-head"><h3 id="catch-photo-heading">照片</h3>${d.photo ? '<button class="btn sm quiet" data-act="retake">换一张</button>' : ''}</div>
        <div class="mount${d.photo && (d.recognitionStatus === 'pending' || d.recognitionStatus === 'idle') && d.recognitionProvider !== 'manual' ? ' is-scanning' : ''}">${d.photo ? `<img src="${esc(d.photo)}" alt="渔获照片"><i class="ai-scan" aria-hidden="true"></i><span class="shot-meta pill ${d.source === 'camera' ? 'ok' : 'warn'}">${d.source === 'camera' ? '现场拍摄' : '相册'}</span>` : `<div class="empty-shot dark"><span class="eyebrow">新渔获</span><h2>先拍下<br>这条鱼</h2><p>鱼体完整、侧面朝上最好</p><div class="shot-actions"><button class="btn accent" data-act="camera">${ICON.camera}拍照</button><button class="btn" data-act="album">相册</button><button class="btn quiet" data-act="sample">用示例照片</button></div></div>`}</div>
      </section>
      ${d.photo ? `<section class="catch-section catch-recognition" aria-labelledby="catch-recognition-heading"><div class="catch-section-head"><h3 id="catch-recognition-heading">识别鱼</h3></div>${recognitionHTMLV2(d)}</section>` : ''}
      <section class="catch-section catch-fish-info" aria-labelledby="catch-fish-heading">
        <div class="catch-section-head"><h3 id="catch-fish-heading">鱼信息</h3></div>
        <div class="bento">
          <div class="tile species-pick span2" data-act="species" role="button" tabindex="0"><span class="eyebrow">鱼种<span class="req-mark">*</span></span><div class="grow">${sp ? `<div class="nm">${esc(sp.name)} ${rb(sp.rarity)}</div><div class="sub latin">No.${sp.no} · ${esc(sp.latin)}</div>` : '<div class="placeholder">选择鱼种</div><div class="sub">AI 认出后自动填，也可手动选</div>'}</div>${sp ? `<div class="fish">${F.fishArt(sp)}</div>` : `<span class="plus">${ICON.plus}</span>`}</div>
          <div id="hints" class="span2">${hintsHTMLV2(d)}</div>
          <div class="tile field location-field" data-act="location" role="button" tabindex="0"><span class="eyebrow">钓点</span><div class="val">${esc(p.place || '选择钓点')}<small>${esc([p.city, p.district].filter(Boolean).join(' · '))}</small></div><span class="chev">${ICON.chev}</span></div>
          <label class="tile field size-tile"><span class="eyebrow">全长<span class="req-mark">*</span></span><span class="size"><input id="f-len" data-field="lengthCm" type="number" inputmode="decimal" min="1" max="300" placeholder="0" aria-label="全长，单位厘米" value="${esc(d.lengthCm)}"><span>cm</span></span></label>
          <div class="tile desc-tile span2"><label class="eyebrow" for="f-desc">描述<span class="req-mark">*</span></label><div class="catch-description"><textarea id="f-desc" data-field="desc" maxlength="${DESC_MAX}" placeholder="一句话说说这条鱼（会印在卡背）">${esc(d.desc)}</textarea><span class="count" id="desc-count">${d.desc.length}/${DESC_MAX}</span></div></div>
          ${sp && sp.releasePolicy === 'forbid' ? '' : `<div class="tile inline-tile span2"><div class="grow"><b>已放流</b><div class="muted">拍完已放回水里</div></div><button class="switch ${d.released ? 'on' : ''}" data-act="released" role="switch" aria-checked="${!!d.released}" aria-label="已放流"></button></div>`}
          ${mapOptions}
          <div class="catch-score-slot">${scorePreviewHTMLV2(d)}</div>
        </div>
      </section>
      <section class="catch-section tile gear" aria-labelledby="catch-gear-heading"><div class="catch-section-head"><h3 id="catch-gear-heading">装备信息 <span>· 选填</span></h3></div>${GEAR.map(gearRow).join('')}</section>
      <div class="submit-bar"><button class="cta" data-act="submit"><span>收入囊中</span><i class="dot">${ICON.arrow}</i></button></div>
      <input id="in-camera" type="file" accept="image/*" capture="environment" hidden><input id="in-album" type="file" accept="image/*" hidden>
    </div>`;
    syncSubmitV2(view, d);
    view.oninput = (e) => {
      const f = e.target.dataset.field, g = e.target.dataset.gear;
      if (f) d[f] = e.target.value;
      if (g) d.gear[g] = e.target.value;
      saveDraft();
      $('#desc-count', view).textContent = `${d.desc.length}/${DESC_MAX}`;
      const hints = $('#hints', view), nextHints = hintsHTMLV2(d);
      if (hints.innerHTML !== nextHints) { hints.innerHTML = nextHints; M.stateIn(hints); }
      const strip = $('.score-preview', view), preview = scorePreviewHTMLV2(d);
      if (strip && strip.outerHTML !== preview) { strip.outerHTML = preview; M.stateIn($('.score-preview', view), { distance: 2, duration: .16 }); }
      else if (!strip && preview) { $('.catch-score-slot', view).innerHTML = preview; M.stateIn($('.score-preview', view)); }
      syncSubmitV2(view, d);
    };
    view.onclick = (e) => {
      const ai = e.target.closest('[data-ai-species]');
      if (ai) { if (confirmRecognition(d, ai.dataset.aiSpecies)) { saveDraft(); render(); } return; }
      if (e.target.closest('[data-ai-retry]')) { recognizeFish(d, true); render(); return; }
      if (e.target.closest('[data-ai-reshoot]')) { openCapture(); render(); return; }
      if (e.target.closest('[data-ai-fail]')) { d.recognitionStatus = 'failed'; d.recognitionError = ''; saveDraft(); render(); speciesSheetV2(); return; }
      if (e.target.closest('[data-ai-again]')) { d.speciesId = ''; d.recognitionStatus = 'idle'; saveDraft(); recognizeFish(d, true); render(); return; }
      const h = e.target.closest('[data-hist]');
      if (h) { d.gear[h.dataset.hist] = h.dataset.v; saveDraft(); const input = $('#g-' + h.dataset.hist, view); input.value = h.dataset.v; M.stateIn(input, { distance: 2 }); return; }
      const a = e.target.closest('[data-act]');
      if (!a) {
        const pv = e.target.closest('[data-map-visibility]');
        if (pv && d.mapVisibility !== pv.dataset.mapVisibility) {
          d.mapVisibility = pv.dataset.mapVisibility; saveDraft();
          // Keep the editor header, draft inputs and scroll position mounted.
          $$('[data-map-visibility]', view).forEach(button => { button.classList.toggle('on', button === pv); button.setAttribute('aria-pressed', button === pv); });
          M.stateIn(pv.closest('.segmented'), { distance: 0, duration: .16 });
        }
        return;
      }
      const act = a.dataset.act;
      if (act === 'camera' || act === 'album') $('#in-' + act, view).click();
      else if (act === 'sample') { d.photo = plate(S.SPECIES[Math.floor(Math.random() * 30)], String(Date.now())); d.source = 'camera'; d.sample = true; resetPhotoRecognition(d); saveDraft(); render(); }
      else if (act === 'retake') { openCapture(); render(); }
      else if (act === 'species') speciesSheetV2();
      else if (act === 'location') locationSheet();
      else if (act === 'released') { d.released = !d.released; a.classList.toggle('on', d.released); a.setAttribute('aria-checked', d.released); saveDraft(); }
      else if (act === 'submit') submitV2(a);
    };
    ['camera', 'album'].forEach((kind) => { const input = $('#in-' + kind, view); input.onchange = async () => { if (!input.files[0]) return; try { d.photo = await compress(input.files[0]); d.source = kind; resetPhotoRecognition(d); A.play('ui_shutter'); saveDraft(); publishStep = 'edit'; render(); } catch (err) { toast('照片读取失败，换一张试试'); } }; });
  }
  function hintsHTMLV2(d) {
    const sp = S.byId[d.speciesId]; if (!sp) return '';
    let h = ''; const tip = S.confusableTip(sp);
    if (tip) h += `<div class="callout warn"><span class="callout-copy"><b>先核对一下：</b>${esc(tip)}。AI 只提供候选，最终鱼种由你确认。</span></div>`;
    if (sp.releasePolicy === 'forbid') h += '<div class="callout bad">这是外来入侵物种，请勿放回自然水域。</div>';
    if (Number(d.lengthCm) >= sp.giantThresholdCm) h += d.source === 'camera' && !d.sample
      ? `<div class="callout info">达到${esc(sp.name)}的巨物线 ${sp.giantThresholdCm}cm，收入囊中可解锁 UR 巨物卡。</div>`
      : `<div class="callout info">巨物线为 ${sp.giantThresholdCm}cm；只有现场拍摄能解锁 UR 巨物卡。</div>`;
    return h;
  }
  function speciesSheetV2() {
    const d = ensureDraftV2(draft());
    const row = (sp) => `<div class="sp-row ${sp.no === d.speciesId ? 'picked' : ''}" data-sp="${sp.no}" data-r="${sp.rarity}" data-q="${esc((sp.name + '|' + sp.alias.join('|') + '|' + sp.latin + '|' + sp.family + '|' + sp.no).toLowerCase().replace(/\s+/g, ''))}" role="button" tabindex="0"><div class="fish">${F.fishArt(sp)}</div><div class="grow"><div class="nm">${esc(sp.name)} ${rb(sp.rarity)}</div><div class="al">${sp.alias.length ? esc(sp.alias.join('、')) + ' · ' : ''}<span class="latin">${esc(sp.latin)}</span></div></div>${tagno(sp.no)}${sp.no === d.speciesId ? '<span class="sp-picked-mark" aria-label="已选中">✓</span>' : ''}</div>`;
    const rec = sheet('确认鱼种', `<div class="sheet-fixed"><div class="search-bar"><input class="search" type="search" placeholder="搜索名字、别名或拉丁学名" aria-label="搜索鱼种"><button class="icon-btn" data-go aria-label="搜索">${ICON.search}</button></div><div class="filter-row">${['全部', ...RARITIES].map((r, i) => `<button class="pill ${i ? '' : 'on'}" data-r="${i ? r : 'all'}">${i ? rb(r) : r}</button>`).join('')}</div></div><div class="sheet-scroll"><div class="sp-list list">${S.SPECIES.map(row).join('')}</div><button class="protect-link" data-protect><span class="grow"><b>钓到的可能是保护鱼类？</b><br><span class="muted">查看 ${S.PROTECTED.length} 种国家重点保护鱼类名录</span></span><span class="chev">${ICON.chev}</span></button></div>`, 'tall split');
    const node = rec.node;
    $$('.filter-row .pill', node).forEach(button => button.setAttribute('aria-pressed', button.classList.contains('on')));
    let rr = 'all';
    const apply = () => {
      const q = $('.search', node).value.trim().toLowerCase().replace(/\s+/g, '').replace(/鱼$/, (m, i, s) => s.length > 2 ? '' : m);
      let n = 0;
      $$('.sp-row', node).forEach((x) => {
        const show = (rr === 'all' || x.dataset.r === rr) && (!q || x.dataset.q.includes(q));
        x.hidden = !show; n += show;
      });
      const empty = $('.species-empty', node);
      if (n) empty?.remove();
      else if (!empty) $('.sp-list', node).insertAdjacentHTML('afterend', '<p class="species-empty muted" style="padding:24px;text-align:center">没找到这条鱼 · 换个叫法试试，或看看下方保护鱼类名录</p>');
      if (!n) M.stateIn($('.species-empty', node), { distance: 0 });
    };
    $('.search', node).oninput = apply;
    $('[data-go]', node).onclick = () => { apply(); $('.search', node).focus(); };
    $$('.filter-row .pill', node).forEach((b) => (b.onclick = () => {
      rr = b.dataset.r;
      $$('.filter-row .pill', node).forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
      apply();
    }));
    $('.sp-list', node).onclick = (e) => {
      const x = e.target.closest('[data-sp]'); if (!x) return;
      d.speciesId = x.dataset.sp; d.recognitionStatus = 'manual'; d.recognitionProvider = 'manual';
      d.recognitionModel = null; d.recognitionConfidence = null; d.recognitionCandidates = [];
      saveDraft(); closeLayer(rec); render();
    };
    $('[data-protect]', node).onclick = () => { closeLayer(rec); protectedSheet(); };
  }
  async function submitV2(btn) {
    if (btn.disabled) return;
    const d = ensureDraftV2(draft()), miss = missing(d);
    if (miss.length) return showMissing(miss);
    if (d.recognitionStatus === 'suggested' || d.recognitionStatus === 'pending') {
      const panel = $('.catch-recognition', $('#view'));
      if (panel) { showMissing.scrollTo(panel); panel.classList.remove('need'); void panel.offsetWidth; panel.classList.add('need'); gsap.delayedCall(1.6, () => panel.classList.remove('need')); }
      return toast(d.recognitionStatus === 'pending' ? 'AI 还在认鱼，稍等几秒或手动选择' : '先选一下 AI 认出的鱼，或手动选择');
    }
    if (d.lengthCm && (!Number.isFinite(Number(d.lengthCm)) || Number(d.lengthCm) < 1 || Number(d.lengthCm) > 300)) return toast('全长请填写 1–300cm');
    const err = S.precheck(d); if (err) return toast(err);
    setBusy(btn, true);
    let res;
    try { res = await S.checkin({ ...d, desc: d.desc.trim(), lengthCm: Number(d.lengthCm) }, d.speciesId); }
    catch (error) { toast(error.message); setBusy(btn, false); return; }
    resetDraft(); publishStep = 'capture'; go('dex'); showUnlockV2(res);
  }

  const HAPTICS = {
    N: [[0, 'light']], R: [[0, 'light'], [120, 'medium']], SR: [[0, 'medium'], [90, 'heavy'], [260, 'light']],
    SSR: [[0, 'heavy'], [90, 'medium'], [220, 'heavy'], [420, 'light']],
    // UR cue fires at the flash; the charge tremble before it is visual only.
    UR: [[0, 'heavy'], [70, 'long'], [200, 'heavy'], [360, 'medium'], [560, 'light'], [800, 'light']],
  };
  function giantInfo(card, catches = S.db.catches) {
    const c = catches.find(x => x.id === card.giant?.catchId);
    return { lengthCm: card.giant?.lengthCm, at: card.giant?.approvedAt, city: c?.location?.city || '' };
  }
  function showUnlockV2(res) {
    const sp = res.species, card = res.card, ur = res.events.includes('giant') || res.events.includes('giant_record');
    const rk = ur ? 'UR' : sp.rarity, tier = S.tierFor(res.rank.points);
    const title = ur ? (res.events.includes('giant_record') ? '刷新巨物纪录' : '巨物卡解锁') : res.events.includes('new') ? '新鱼种解锁' : '记录已收入图鉴';
    const node = el(`<div class="layer unlock card-scene r-${rk}" style="--rc:${C.RV[rk].color}">
      <div class="pixel-grid" aria-hidden="true"></div><div class="pixel-noise" aria-hidden="true"></div><div class="pixel-badge" aria-hidden="true">${rk}</div>
      <div class="glow"></div><div class="rays"></div><div class="pillar"></div><div class="ring"></div><div class="burst"></div><div class="flash"></div>
      <button class="skip" data-skip>跳过</button><div class="stage"><div class="headline">${title}</div><div class="card-host"></div>
      <div class="sub">${ur ? `${esc(sp.name)} · ${card.giant.lengthCm}cm<br>` : ''}<b class="unlock-points">+${res.points || 0}<small> 段位分</small></b><br>当前段位 ${esc(tier.name)} ${'★'.repeat(Math.max(0, tier.stars))}${res.scoreEvents?.some(e => e.eventType === 'set_complete') ? '<br><span class="pill">套组完成奖励已到账</span>' : ''}</div>
      <div class="actions"><button class="btn accent unlock-primary" data-act="share">分享这张卡</button><div class="unlock-secondary"><button class="btn quiet" data-act="dex">看图鉴</button><button class="btn quiet" data-act="ok">再记一条</button></div></div></div></div>`);
    const ce = C.render(sp, { card, variant: ur ? 'ur' : 'normal', giantInfo: ur ? giantInfo(card) : null, interactive: true, back: CARD_BACK, backClass: 'has-design' });
    $('.card-host', node).append(ce);
    const rec = openLayer(node, 'unlock'), skip = $('.skip', node);
    ce.setAttribute('aria-disabled', 'true');
    const settled = () => {
      const focusSkip = document.activeElement === skip;
      skip.hidden = true; ce.removeAttribute('aria-disabled');
      if (focusSkip && !rec.closing && rec === topLayer()) focusNode($('[data-act=ok]', node));
    };
    const tl = M.unlockTimeline(node, ce, rk, {
      sfx: () => A.play('unlock_' + rk), flip: () => A.play('ui_flip'), haptics: () => A.scheduleHaptics(HAPTICS[rk]),
      cancel: () => A.stopAll(), settled,
    });
    rec.cleanups.push(C.attach(ce), C.animate(ce), () => { tl.kill(); A.stopAll(); }, () => {
      if (res.catchObj && state.tab === 'dex') { state.stamp = sp.no; myCtx.filter = 'all'; myCtx.setId = 'all'; render(); }
    });
    skip.onclick = () => {
      M.settleUnlock(node, 'skip'); C.setFace(ce, false);
      gsap.set([$('.headline', node), $('.sub', node), $('.actions', node), $('.card-host', node)], { autoAlpha: 1, y: 0, scale: 1 });
      settled();
    };
    ce.onclick = () => { if (tl.isActive()) return; C.flip(ce); A.play('ui_flip'); A.haptic('light'); };
    $('.actions', node).onclick = e => {
      const button = e.target.closest('[data-act]'); if (!button) return;
      if (button.dataset.act === 'share') return shareSheet(sp, res.catchObj || S.db.catches.find(c => c.id === (ur ? card.giant.catchId : card.firstCatchId)), ur);
      if (button.dataset.act === 'dex') { closeAll(); state.stamp = sp.no; myCtx.filter = 'all'; myCtx.setId = 'all'; go('dex'); }
      else closeLayer(rec);
    };
  }

  function mountDexV2(root, ctx, animate) {
    const data = ctx.me ? { user: S.db.me, catches: S.db.catches, cards: S.db.cards } : S.profileOf(ctx.userId);
    if (!data || !data.user || !data.cards || !Array.isArray(data.catches) || (ctx.me && !S.db.rank)) {
      collectionState(root, '图鉴暂不可用', '请稍后重试', () => mountDexV2(root, ctx, animate));
      return;
    }
    window.YK_LANYARD?.destroyWithin(root);
    root.setAttribute('aria-busy', 'false');
    const owner = data.user || data; const cards = data.cards || {}, catches = data.catches || [], real = catches.filter((c) => c.status !== 'protected'), met = catches.filter((c) => c.status === 'protected'), total = S.SPECIES.length, owned = Object.keys(cards).length, ownedSpecies = S.SPECIES.filter((sp) => cards[sp.no]).length, rank = ctx.me ? S.db.rank : null, displayPoints = Number(ctx.me ? rank.points : owner.points || 0), displayTier = S.tierFor(displayPoints); ctx.dexMode = ctx.dexMode || 'rarity'; ctx.setId = ctx.setId || 'all';
    const rarityFilters = [...RARITIES, 'UR'].map(r => [r, r]);
    const statusFilters = [['all', '全部'], ['have', '已收集'], ['miss', '待收集']];
    if (!['all', 'have', 'miss'].includes(ctx.filter || 'all')) { ctx.rarity = ctx.filter; ctx.filter = 'all'; }
    ctx.filter = ctx.filter || 'all';
    const rarityCounts = Object.fromEntries(RARITIES.map(r => [r, S.SPECIES.filter(sp => sp.rarity === r && cards[sp.no]).length]));
    const rarityTotals = Object.fromEntries(RARITIES.map(r => [r, S.SPECIES.filter(sp => sp.rarity === r).length]));
    rarityCounts.UR = Object.values(cards).filter(card => card.giant?.status === 'approved').length; rarityTotals.UR = total;
    const rarityProgress = [...RARITIES, 'UR'].map(r => `<div class="dex-rarity-item">${rb(r)}<b><span data-n="${rarityCounts[r]}">${rarityCounts[r]}</span><small>/${rarityTotals[r]}</small></b></div>`).join('');
    const unit = (n, u) => `<b><span data-n="${n}">${n}</span><small>${u}</small></b>`;
    const starProgress = displayTier.next ? Math.max(0, Math.floor(displayPoints - displayTier.min) % 100) : 100;
    const starPercent = Math.min(100, starProgress);
    const rankStars = Array.from({ length: 5 }, (_, i) => `<span class="dex-rank-star ${i < displayTier.stars ? 'is-on' : ''}" aria-hidden="true">★</span>`).join('');
    const setFilterOptions = () => [['all', `全部套组 ${ownedSpecies}/${total}`], ...S.SETS.map((set) => {
      const members = S.SPECIES.filter((sp) => S.setIdFor(sp) === set.id);
      const unlocked = members.filter((sp) => cards[sp.no]).length;
      return [set.id, `${set.name} ${unlocked}/${members.length}`];
    })];
    const filterLabels = () => ctx.dexMode === 'rarity' ? rarityFilters : setFilterOptions();
    const filterCount = (key) => key === 'all' ? total : key === 'have' ? ownedSpecies : total - ownedSpecies;
    const filterLabelHtml = (key, text) => {
      if (ctx.dexMode === 'rarity') return rb(key);
      const match = String(text).match(/^(.*)\s(\d+\/\d+)$/);
      return match ? `${esc(match[1])} <small class="filter-count">${esc(match[2])}</small>` : esc(text);
    };
    const filterAriaLabel = (key, text) => ctx.dexMode === 'rarity' ? `${text} 品级` : text;
    const filterOn = key => ctx.dexMode === 'rarity' ? ctx.rarity === key : ctx.setId === key;
    const filterButtons = () => filterLabels().map(([key, text]) => `<button class="pill ${filterOn(key) ? 'on' : ''}" data-f="${key}" aria-label="${esc(filterAriaLabel(key, text))}" aria-pressed="${filterOn(key)}">${filterLabelHtml(key, text)}</button>`).join('');
    const statusButtons = () => statusFilters.map(([key, text]) => `<button class="pill ${ctx.filter === key ? 'on' : ''}" data-st="${key}" aria-pressed="${ctx.filter === key}">${esc(text)} <small class="filter-count">${filterCount(key)}</small></button>`).join('');
    const lanyardData = {
      nickname: owner.nickname || '大鱼',
      bio: owner.bio || '',
      avatar: [...String(owner.nickname || '钓')][0],
      rankName: `${displayTier.name}钓手`,
      rankIndex: displayTier.index,
      rankStars: displayTier.stars,
      rankProgress: starProgress,
      rankPoints: displayPoints,
      unlocked: owned,
      totalSpecies: total,
      catches: real.length,
      rarities: rarityCounts,
      rarityTotals,
    };
    root.innerHTML = `<div class="screen dex-page"><section class="dex-lanyard-section" data-stagger aria-label="${esc(owner.nickname || '钓手')}的挂牌">${ctx.me ? `<div class="dex-lanyard-tools"><button class="icon-btn dex-lanyard-settings" data-act="settings" type="button" aria-label="设置" title="设置">${ICON.gear}</button></div>` : ''}<div class="dex-lanyard-host" data-lanyard-host role="img" aria-label="${esc(owner.nickname || '钓手')}的段位挂牌"><div class="yk-lanyard-fallback"><b>挂牌暂不可用</b><span>当前设备不支持 WebGL，统计仍可继续查看</span></div></div></section><div class="dex-view-switch"><button class="pill ${ctx.dexMode === 'rarity' ? 'on' : ''}" data-dex-mode="rarity">按品级</button><button class="pill ${ctx.dexMode === 'set' ? 'on' : ''}" data-dex-mode="set">按套组</button></div><div class="dex-status" ${ctx.dexMode === 'rarity' ? '' : 'hidden'} role="group" aria-label="收集状态">${statusButtons()}</div><div class="dex-filter ${ctx.dexMode === 'rarity' ? 'is-rarity' : 'is-set'}">${filterButtons()}</div><div class="tray"></div>${ctx.me && met.length ? `<div class="met-row" data-act="met" role="button" tabindex="0"><span class="grow">遇见过的保护鱼类</span><span class="num">${met.length}</span><span class="chev">${ICON.chev}</span></div>` : ''}</div>`;
    const lanyardHost = $('[data-lanyard-host]', root);
    if (lanyardHost && window.YK_LANYARD) {
      const fallback = $('.yk-lanyard-fallback', lanyardHost);
      window.YK_LANYARD.mount(lanyardHost, {
        frontData: lanyardData,
        backData: lanyardData,
        assetBase: '/img',
        cardColor: '#000000',
        // The Lanyard camera is width-bound on narrow phones. A small width
        // lift closes the remaining inset while preserving the desktop card.
        cardWidth: lanyardHost.clientWidth > 380 ? 3.7 : 3.5,
        // Keep the render viewport full-bleed while the card face aligns with
        // the content column below it. The lanyard projection has a stable
        // minimum face width on narrow screens, so add a small responsive lift
        // until the face reaches the same 16px inset as the content column.
        size: Math.min(0.88, Math.max(0.83, 0.83 + (lanyardHost.clientWidth - 370) * 0.0025)),
        strapLength: 0.2,
        onError: () => lanyardHost.setAttribute('data-lanyard-fallback', 'true'),
      });
      window.setTimeout(() => {
        if (!lanyardHost.querySelector('canvas')) lanyardHost.setAttribute('data-lanyard-fallback', 'true');
        if (fallback && lanyardHost.querySelector('canvas')) fallback.hidden = true;
      }, 500);
    }
    $$('[data-dex-mode]', root).forEach(button => button.setAttribute('aria-pressed', button.classList.contains('on')));
    const filterOptions = filterButtons;
    // 切换筛选会清空并重建卡片流：内容高度骤降时浏览器会把滚动位置截断到顶部，
    // 表现为整屏跳动。做法是先锁定卡片流高度，重建后再解除并恢复原滚动位置。
    let scrollLock = null;
    const lockTray = () => {
      const view = $('#view'); if (!view) return;
      const el = $('.tray, .set-tray', root);
      const h = el ? Math.round(el.getBoundingClientRect().height) : 0;
      scrollLock = { top: view.scrollTop, el, locked: !!h };
      if (h) el.style.minHeight = h + 'px';
    };
    const unlockTray = () => {
      const view = $('#view'); if (!view || !scrollLock) return;
      const { top, el, locked } = scrollLock; scrollLock = null;
      requestAnimationFrame(() => {
        if (locked && el) el.style.minHeight = '';
        const max = Math.max(0, view.scrollHeight - view.clientHeight);
        view.scrollTop = Math.min(top, max);
      });
    };
    const tray = $('.tray', root), fill = () => {
      if (ctx.dexMode === 'rarity') {
        const f = ctx.filter || 'all', r = ctx.rarity || null;
        const list = S.SPECIES.filter(sp => (f === 'all' || (f === 'have' && cards[sp.no]) || (f === 'miss' && !cards[sp.no]))
          && (!r || (r === 'UR' ? cards[sp.no]?.giant?.status === 'approved' : sp.rarity === r)));
        const emptyText = r === 'UR' ? (f === 'miss' ? '巨物卡都在已收集里' : '还没有巨物卡 · 钓到超过巨物线的鱼就能拿到') : f === 'have' ? (ctx.me ? '还没有收集到鱼卡 · 去记录第一条吧' : 'TA还没有收集到鱼卡') : f === 'miss' ? '这一类已经全部收集' : '这一类还没有收集到';
        tray.className = 'tray'; tray.innerHTML = list.length ? '' : `<div class="empty" role="status" style="grid-column:1/-1">${emptyText}</div>`;
        list.forEach((sp, i) => tray.append(cardCellV2(sp, i)));
      } else {
        tray.className = 'set-tray'; const sets = ctx.setId === 'all' ? S.SETS : S.SETS.filter(set => set.id === ctx.setId);
        tray.innerHTML = sets.map(set => {
          const members = S.SPECIES.filter(sp => S.setIdFor(sp) === set.id);
          const got = members.filter(sp => cards[sp.no]).length;
          return `<section class="set-group" aria-label="${esc(set.name)}" data-set-name="${esc(set.name)}"><button class="set-group-head" type="button" data-set-detail="${esc(set.id)}" aria-label="${esc(set.name)}套组详情，已收集 ${got}/${members.length}"><b>${esc(set.name)}</b><span class="num">${got}/${members.length}</span><i class="set-group-bar" aria-hidden="true"><i style="width:${members.length ? got / members.length * 100 : 0}%"></i></i><span class="chev" aria-hidden="true">${ICON.chev}</span></button><div class="tray set-cards">${members.map((sp, i) => cardCellV2(sp, i).outerHTML).join('')}</div></section>`;
        }).join('');
      }
    };
    function cardCellV2(sp, i) {
      const card = cards[sp.no], ur = card?.giant?.status === 'approved';
      const cell = el(`<div class="cell" data-sp="${sp.no}" role="button" tabindex="0" ${i < 12 ? 'data-stagger' : ''}>${card ? '' : `<div class="slot">${window.YK_CARD_NUMBER.html(sp.no)}${rb(sp.rarity, 'grade small-card-rarity')}${F.fishSVG(sp, { silhouette: true })}<div class="q">${esc(sp.hint)}</div>${cornerTag(null)}</div>`}</div>`);
      if (card) cell.prepend(withCorner(C.render(sp, { card, thumb: true, variant: ur ? 'ur' : 'normal', giantInfo: ur ? giantInfo(card, catches) : null }), `<b class="num">${card.catchCount}</b>条`));
      return cell;
    }
    fill(); if (animate) $$('[data-n]', root).forEach((b) => M.countUp(b, +b.dataset.n)); M.growStrata($$('.bar i', root));
    root.onclick = e => {
      const mode = e.target.closest('[data-dex-mode]');
      if (mode) {
        if (mode.classList.contains('on')) return;
        gsap.killTweensOf(tray);
        ctx.dexMode = mode.dataset.dexMode;
        // 只换筛选条与卡片流，保留顶部段位概览卡不动，避免动画重新加载
        $$('[data-dex-mode]', root).forEach(button => { button.classList.toggle('on', button === mode); button.setAttribute('aria-pressed', button === mode); });
        const bar = $('.dex-filter', root);
        if (bar) { bar.innerHTML = filterOptions(); bar.className = `dex-filter ${ctx.dexMode === 'rarity' ? 'is-rarity' : 'is-set'}`; }
        const statusBar = $('.dex-status', root); if (statusBar) statusBar.hidden = ctx.dexMode !== 'rarity';
        lockTray(); fill(); unlockTray();
        M.stateIn(bar, { distance: 0 });
        return;
      }
      const refill = () => {
        gsap.killTweensOf(tray);
        lockTray();
        if (M.reduced()) { fill(); unlockTray(); return; }
        gsap.to(tray, { autoAlpha: 0, y: 6, duration: .12, ease: 'power2.in', onComplete() {
          fill(); gsap.set(tray, { autoAlpha: 1, y: 0, clearProps: 'transform,opacity,visibility' }); unlockTray();
          const empty = $('.empty', tray); if (empty) M.stateIn(empty);
        } });
      };
      const st = e.target.closest('[data-st]');
      if (st) {
        if (st.classList.contains('on')) return;
        ctx.filter = st.dataset.st;
        $$('.dex-status .pill', root).forEach(button => { button.classList.toggle('on', button === st); button.setAttribute('aria-pressed', button === st); });
        A.haptic?.('light');
        return refill();
      }
      const f = e.target.closest('[data-f]');
      if (f) {
        if (ctx.dexMode === 'rarity') {
          // Rarity chips combine with the status segment; tapping the active chip clears it.
          ctx.rarity = f.classList.contains('on') ? null : f.dataset.f;
          $$('.dex-filter .pill', root).forEach(button => { const on = button.dataset.f === ctx.rarity; button.classList.toggle('on', on); button.setAttribute('aria-pressed', on); });
          return refill();
        }
        if (f.classList.contains('on')) return;
        ctx.setId = f.dataset.f;
        $$('.dex-filter .pill', root).forEach(button => { button.classList.toggle('on', button === f); button.setAttribute('aria-pressed', button === f); });
        // 只横向滚动筛选条自身，不用 scrollIntoView（它会连带滚动整个视图造成跳动）
        const bar = $('.dex-filter', root);
        if (bar) bar.scrollTo({ left: Math.max(0, f.offsetLeft - (bar.clientWidth - f.offsetWidth) / 2), behavior: M.reduced() ? 'auto' : 'smooth' });
        return refill();
      }
      const cell = e.target.closest('[data-sp]');
      if (cell) { const sp = S.byId[cell.dataset.sp]; if (cards[sp.no]) cardDetailV2(sp, ctx, data); else lockedSheet(sp); return; }
      const setButton = e.target.closest('[data-set-detail]');
      if (setButton) return setDetailV2(S.SETS.find(set => set.id === setButton.dataset.setDetail), ctx, data);
      if (e.target.closest('[data-act="settings"]')) settingsPage();
      if (e.target.closest('[data-act="met"]')) metSheet(met, ctx);
    };
    if (ctx.me && state.stamp) {
      const cell = $(`[data-sp="${state.stamp}"]`, tray); state.stamp = null;
      if (cell) { cell.removeAttribute('data-stagger'); cell.dataset.listMotion = 'off'; cell.scrollIntoView({ block: 'center' }); gsap.delayedCall(.25, () => { if (cell.isConnected && !document.hidden && !M.reduced()) M.stampIn(cell); }); }
    }
  }
  function setDetailV2(set, ctx, data) {
    if (!set) return;
    const cards = data.cards || {};
    const members = S.SPECIES.filter((sp) => S.setIdFor(sp) === set.id);
    const unlocked = members.filter((sp) => cards[sp.no]);
    const missing = members.filter((sp) => !cards[sp.no]);
    const progress = ctx.me ? (S.db.setProgress[set.id] || {}) : { unlockedCount: unlocked.length, totalCount: members.length };
    const rewardClaimed = ctx.me && progress.rewardClaimedAt;
    const rows = members.map((sp) => `<button class="set-member-row ${cards[sp.no] ? 'is-owned' : 'is-locked'}" data-set-species="${sp.no}"><span class="set-member-icon">${cards[sp.no] ? F.fishSVG(sp, { silhouette: false }) : F.fishSVG(sp, { silhouette: true })}</span><span class="grow"><b>${esc(sp.name)}</b><small>${cards[sp.no] ? `已记录 ${cards[sp.no].catchCount} 次` : `未解锁 · ${esc(sp.hint || '去现场寻找')}`}</small></span>${rb(sp.rarity)}<span class="chev">${ICON.chev}</span></button>`).join('');
    const rec = sheet(`${set.name} · 套组`, `<div class="set-detail"><div class="set-detail-hero"><span class="eyebrow">鱼卡套组</span><h2>${esc(set.name)}</h2><p>${esc(set.description)}</p><div class="set-detail-progress"><b>${progress.unlockedCount || 0}/${progress.totalCount || members.length}</b><span><i style="width:${members.length ? ((progress.unlockedCount || 0) / members.length) * 100 : 0}%"></i></span></div></div><div class="facts"><div class="kv"><span>完成奖励</span><span>+${set.rewardScore} 段位分</span></div><div class="kv"><span>奖励状态</span><span>${rewardClaimed ? '已领取（每套一次）' : '完成后领取一次'}</span></div><div class="kv"><span>还差</span><span>${missing.length ? missing.map((sp) => esc(sp.name)).join('、') : '已完成'}</span></div></div><div class="section-h"><h3>套组成员</h3><span class="num">${unlocked.length}/${members.length}</span></div><div class="set-member-list">${rows}</div><button class="btn primary block" data-find-set>${ICON.pin}去钓点找</button></div>`, 'tall');
    rec.node.onclick = (e) => {
      const member = e.target.closest('[data-set-species]');
      if (member) { const sp = S.byId[member.dataset.setSpecies]; closeLayer(rec); if (cards[sp.no]) cardDetailV2(sp, ctx, data); else lockedSheet(sp); return; }
      if (e.target.closest('[data-find-set]')) { closeAll(); state.mapFilters = { ...(state.mapFilters || {}), city: 'all' }; go('map'); }
    };
  }
  function cardDetailV2(sp, ctx, data) {
    const card = data.cards[sp.no];
    const catches = data.catches.filter((c) => c.status === 'confirmed' && c.speciesId === sp.no).sort((a, b) => b.createdAt - a.createdAt);
    const set = S.setForSpecies(sp.no);
    const back = `<section class="b-info"><div class="b-title"><h2>${esc(sp.name)}</h2><span class="no">No.${sp.no}</span></div>
      <div class="latin">${esc(sp.latin)}</div>${(sp.alias || []).length ? `<div class="b-alias"><span>别称</span>${esc(sp.alias.slice(0, 6).join(' · '))}</div>` : ''}<p>${esc(sp.fact || '')}</p><dl>
      <div><dt>科属</dt><dd>${esc(sp.family)}</dd></div><div><dt>分布</dt><dd>${esc(sp.region)}</dd></div>
      <div><dt>体长</dt><dd>${sp.commonCm}cm · 巨物线 ${sp.giantThresholdCm}cm</dd></div><div><dt>习性</dt><dd>${esc(sp.method)}</dd></div>
      <div><dt>套组</dt><dd>${esc(set.name)}</dd></div></dl><div class="mine">${ctx.me ? '我' : 'TA'}钓到 <b>${card.catchCount}</b> 次<br>${C.fmtDate(card.firstUnlockedAt)} 解锁</div></section>`;
    const hasUR = card.giant?.status === 'approved'; let ur = hasUR;
    const rec = page(`No.${sp.no} ${sp.name}`, `<div class="card-detail-hero card-scene"><div class="card-stage detail-card-host"></div></div>
      <div class="card-detail-transition card-scene card-gradient">${hasUR ? '<div class="variant"><button class="pill on" data-v="ur">巨物卡</button><button class="pill" data-v="normal">普通卡</button></div>' : ''}</div>
      <div class="mine-list entry-list"></div><div class="record-more" hidden><button class="btn" data-more>查看更多</button></div>`);
    rec.node.classList.add('card-detail-page', 'card-gradient-page');
    $('.page-head', rec.node).classList.add('card-scene');
    const rankButton = el(`<button class="head-act icon-btn detail-rank-btn" data-size-rank aria-label="${esc(sp.name)}尺寸排行" title="${esc(sp.name)}尺寸排行">${ICON.rankLine}</button>`);
    const shareCatch = ur ? catches.find(c => c.id === card.giant?.catchId) : catches[0];
    const shareButton = shareCatch ? el(`<button class="head-act icon-btn detail-share-btn" data-share-card aria-label="分享${esc(sp.name)}鱼卡" title="分享鱼卡">${ICON.copy}</button>`) : null;
    const head = $('.page-head', rec.node), headActions = el('<div class="detail-head-actions"></div>');
    headActions.append(rankButton);
    if (shareButton) headActions.append(shareButton);
    head.append(headActions);
    rankButton.onclick = () => { closeAll(); state.board = 'giant'; go('rank'); sizeRankPage(sp); };
    const stage = $('.card-stage', rec.node); let cleanups = [], swapping = false;
    const mountCard = swap => {
      const build = () => {
        cleanups.forEach(fn => fn()); stage.replaceChildren();
        const ce = C.render(sp, { card, variant: ur ? 'ur' : 'normal', giantInfo: ur ? giantInfo(card, catches) : null, interactive: true, back });
        stage.append(ce); cleanups = [C.attach(ce), C.animate(ce), () => gsap.killTweensOf(ce)];
        ce.onclick = () => { C.flip(ce); A.play('ui_flip'); A.haptic('light'); };
        swapping = false;
        if (M.reduced()) return;
        if (swap) gsap.fromTo(ce, { rotationY: -70, scale: .9, autoAlpha: 0 }, { rotationY: 0, scale: 1, autoAlpha: 1, duration: .6, ease: 'expo.out', clearProps: 'transform,opacity,visibility' });
        else gsap.from(ce, { y: 24, autoAlpha: 0, scale: .94, duration: .55, delay: .12 });
      };
      if (swap && stage.firstElementChild && !M.reduced()) {
        swapping = true; gsap.to(stage.firstElementChild, { rotationY: 70, scale: .9, autoAlpha: 0, duration: .2, ease: 'power2.in', onComplete: build });
      } else build();
    };
    mountCard(); rec.cleanups.push(() => cleanups.forEach(fn => fn()));
    $$('[data-v]', rec.node).forEach(button => { button.onclick = () => {
      if (swapping || button.classList.contains('on')) return;
      ur = button.dataset.v === 'ur'; $$('[data-v]', rec.node).forEach(b => b.classList.toggle('on', b === button));
      A.haptic('light'); mountCard(true);
    }; });
    if (shareButton) shareButton.onclick = () => {
      const currentCatch = ur ? catches.find(c => c.id === card.giant?.catchId) : catches[0];
      if (currentCatch) shareSheet(sp, currentCatch, ur);
    };
    let limit = 20;
    let bindRecordTiles = () => {};
    const fillRecords = () => {
      $('.entry-list', rec.node).innerHTML = catches.slice(0, limit).map((c, i) => recordTile(c, i, sp.name)).join('');
      $('.record-more', rec.node).hidden = limit >= catches.length;
      bindRecordTiles();
    };
    fillRecords(); $('[data-more]', rec.node).onclick = () => { limit += 20; fillRecords(); };
    const closeRecordModal = (focusTile = false, animate = false) => {
      const modal = $('.record-modal', rec.node);
      const selected = $('.record-tile.is-selected', rec.node);
      if (modal && animate && !M.reduced()) {
        if (modal.dataset.closing) return;
        modal.dataset.closing = 'true';
        rec.recordModal = null;
        syncLayerAccess(focusTile ? selected : null);
        modal.setAttribute('inert', ''); modal.setAttribute('aria-hidden', 'true'); modal.style.pointerEvents = 'none';
        gsap.to(modal, { autoAlpha: 0, duration: .16, ease: 'power2.in', overwrite: 'auto', onComplete: () => closeRecordModal(focusTile) });
        return;
      }
      if (modal) gsap.killTweensOf(modal);
      rec.recordModal = null;
      if (selected) { selected.classList.remove('is-selected'); selected.setAttribute('aria-expanded', 'false'); selected.removeAttribute('aria-controls'); }
      modal?.remove();
      rec.node.classList.remove('record-modal-open');
      $('.page-body', rec.node).classList.remove('record-modal-scroll-lock');
      syncLayerAccess(focusTile ? selected : null);
    };
    const pageBody = $('.page-body', rec.node);
    const openRecordModal = (tile, c, index) => {
      closeRecordModal();
      const id = `record-modal-${sp.no}-${index}`;
      tile.classList.add('is-selected'); tile.setAttribute('aria-expanded', 'true'); tile.setAttribute('aria-controls', id);
      rec.node.insertAdjacentHTML('beforeend', recordModal(c, ctx, id));
      const modal = document.getElementById(id);
      rec.recordModal = { node: modal, close: () => closeRecordModal(true, true) };
      rec.node.classList.add('record-modal-open');
      pageBody.classList.add('record-modal-scroll-lock');
      $$('[data-record-modal-close]', modal).forEach(close => { close.onclick = (event) => { event.stopPropagation(); closeRecordModal(true, true); }; });
      const editBtn = $('[data-edit]', modal), delBtn = $('[data-del]', modal);
      if (editBtn) editBtn.onclick = (event) => { event.stopPropagation(); closeRecordModal(); editCatch(c, ctx); };
      if (delBtn) delBtn.onclick = (event) => { event.stopPropagation(); const csp = S.byId[c.speciesId]; confirmSheet('删除这条渔获？', csp ? `如果这是唯一一条${csp.name}，对应的鱼卡也会收回。` : '删除后无法恢复。', '删除', async () => { await S.removeCatch(c.id); if (c.videoId) await window.YK_MEDIA.del(c.videoId); closeAll(); render(); toast('已删除'); }, { danger: true }); };
      syncLayerAccess($('.record-modal-panel', modal));
      if (!M.reduced()) gsap.fromTo(modal, { autoAlpha: 0 }, { autoAlpha: 1, duration: .22, ease: 'power2.out', clearProps: 'opacity,visibility' });
    };
    rec.node.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && $('.record-modal', rec.node)) { event.preventDefault(); event.stopPropagation(); closeRecordModal(true, true); }
    });
    rec.cleanups.push(() => closeRecordModal());
    bindRecordTiles = () => {
      $$('.record-tile[data-i]', rec.node).forEach((tile) => {
        tile.onclick = (event) => {
          event.stopPropagation();
          openRecordModal(tile, catches[+tile.dataset.i], +tile.dataset.i);
        };
        tile.onkeydown = (event) => {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          event.stopPropagation();
          openRecordModal(tile, catches[+tile.dataset.i], +tile.dataset.i);
        };
      });
    };
    bindRecordTiles();
  }
  function scoreRulesSheet() {
    const r = S.db.rank || {}, events = (S.db.rankEvents || []).slice(0, 5);
    const eventLabel = (event) => event.eventType === 'set_complete' ? `完成${S.SETS.find(set => set.id === event.setId)?.name || '套组'}` : `${S.byId[S.db.catches.find(c => c.id === event.catchId)?.speciesId]?.name || '现场渔获'}记录`;
    const rows = events.length ? events.map(event => `<div class="rank-event-row"><span class="rank-event-mark">${event.eventType === 'set_complete' ? '组' : '+'}</span><span class="grow"><b>${esc(eventLabel(event))}</b><small>${event.eventType === 'catch' ? `基础 ${event.baseScore} · 尺寸 ${event.sizeMultiplier}× · 重复 ${event.repeatMultiplier}×${event.bonusScore ? ` · 首次 +${event.bonusScore}` : ''}` : '每个套组只奖励一次'}</small></span><strong>+${event.totalScore}</strong></div>`).join('') : '<div class="empty">完成一条现场渔获后，这里会显示积分事件</div>';
    sheet('积分规则', `<div class="rank-rule-sheet"><div class="rank-rule-total"><span class="eyebrow">长期累计积分</span><b>${r.points || 0}</b><small>${esc(r.tier || '初见')} · ${r.stars || 0} 星${r.peakTier ? ` · 历史最高 ${esc(r.peakTier)}` : ''}</small></div><div class="facts"><div class="kv"><span>计分公式</span><span>稀有度基础分 × 尺寸系数 × 同日递减 + 首次/套组奖励</span></div><div class="kv"><span>重复钓鱼</span><span>同鱼种当天第 1–3 条 100%，第 4–6 条 70%，第 7 条起 30%</span></div><div class="kv"><span>有效来源</span><span>仅服务端确认的现场记录；相册、示例图、保护鱼类不计分</span></div><div class="kv"><span>段位规则</span><span>每 100 分一颗星，积分长期累计，不区分赛季、不重置</span></div></div><div class="section-h"><h3>最近积分事件</h3><span class="num">${events.length} 条</span></div><div class="rank-event-list">${rows}</div></div>`);
  }
  function renderRankV2(view) {
    const boards = [['unlock', '解锁榜', ICON.trophy], ['giant', '巨物榜', ICON.ruler], ['ladder', '段位榜', ICON.rank]];
    const boardTabs = `<div class="board-switch" role="tablist" aria-label="排行榜">${boards.map(([key, label, icon]) => `<button id="board-${key}" role="tab" aria-controls="rank-results" aria-selected="${state.board === key}" tabindex="${state.board === key ? 0 : -1}" class="${state.board === key ? 'on' : ''}" data-board="${key}">${icon}${label}</button>`).join('')}<i class="ind" aria-hidden="true"></i></div>`;
    const scopeRow = `<div class="scope"><button class="pill ${state.rank === 'nation' ? 'on' : ''}" data-scope="nation" aria-pressed="${state.rank === 'nation'}">全国</button><button class="pill ${state.rank === 'city' ? 'on' : ''}" data-scope="city" aria-pressed="${state.rank === 'city'}">${esc(S.db.me.city)}</button><span class="grow"></span><span class="board-note"></span></div>`;
    view.innerHTML = `<div class="screen rank-page"><div class="rank-head">${boardTabs}</div><div class="rank-scope">${scopeRow}</div><div id="rank-results" class="rank-body" role="tabpanel" aria-labelledby="board-${state.board}"></div></div>`;
    const fill = (dir = 0, animate = false) => {
      const index = boards.findIndex(([key]) => key === state.board), body = $('.rank-body', view), ind = $('.board-switch .ind', view);
      $$('[data-board]', view).forEach((button) => {
        const selected = button.dataset.board === state.board;
        button.classList.toggle('on', selected);
        button.setAttribute('aria-selected', selected);
        button.tabIndex = selected ? 0 : -1;
      });
      $$('[data-scope]', view).forEach((button) => { button.classList.toggle('on', button.dataset.scope === state.rank); button.setAttribute('aria-pressed', button.dataset.scope === state.rank); });
      const content = rankBody();
      $('.board-note', view).innerHTML = content.note;
      body.setAttribute('aria-labelledby', `board-${state.board}`);
      gsap.killTweensOf([body, ind]);
      body.innerHTML = content.html;
      content.mount(view);
      body.scrollTop = 0;
      if (animate && !M.reduced()) {
        gsap.to(ind, { xPercent: index * 100, duration: .28, ease: 'power3.out' });
        gsap.fromTo(body, { autoAlpha: .3, x: 12 * dir, y: dir ? 0 : 4 }, { autoAlpha: 1, x: 0, y: 0, duration: .24, ease: 'power3.out', clearProps: 'transform,opacity,visibility' });
      } else {
        gsap.set(ind, { xPercent: index * 100 });
        gsap.set(body, { clearProps: 'transform,opacity,visibility' });
      }
    };
    fill();
    view.onclick = (e) => {
      const bb = e.target.closest('[data-board]');
      if (bb) {
        if (bb.dataset.board !== state.board) {
          const dir = Math.sign(boards.findIndex(([key]) => key === bb.dataset.board) - boards.findIndex(([key]) => key === state.board));
          state.board = bb.dataset.board; fill(dir, true);
        }
        return;
      }
      const s = e.target.closest('[data-scope]');
      if (s) { if (s.dataset.scope !== state.rank) { state.rank = s.dataset.scope; fill(0, true); } return; }
      const x = e.target.closest('[data-sp]');
      if (x) { if (S.db.cards[x.dataset.sp]) sizeRankPage(S.byId[x.dataset.sp]); else { toast('钓到这条鱼后才能看它的排行'); M.nudge(x); } return; }
      const u = e.target.closest('[data-user]');
      if (u) openProfile(u.dataset.user);
    };
    $('.board-switch', view).onkeydown = (e) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault();
      const index = boards.findIndex(([key]) => key === state.board);
      const next = e.key === 'Home' ? 0 : e.key === 'End' ? boards.length - 1 : (index + (e.key === 'ArrowRight' ? 1 : -1) + boards.length) % boards.length;
      const button = $(`[data-board="${boards[next][0]}"]`, view);
      button.click(); button.focus();
    };
  }
  function rankBody() {
    if (state.board === 'giant') {
      const cards = S.db.cards;
      return {
        note: `已解锁 <span class="num">${Object.keys(cards).length}</span> / ${S.SPECIES.length} 种`,
        html: '<div class="tray giant-tray"></div>',
        mount(view) {
          const tray = $('.giant-tray', view);
          S.SPECIES.forEach((sp, i) => {
            const card = cards[sp.no];
            const cell = el(`<div class="cell" data-sp="${sp.no}" role="button" tabindex="0" aria-label="${esc(sp.name)}巨物榜${card ? '' : '，未解锁'}" ${i < 12 ? 'data-stagger' : ''}>${card ? '' : `<div class="slot">${window.YK_CARD_NUMBER.html(sp.no)}${rb(sp.rarity, 'grade small-card-rarity')}${F.fishSVG(sp, { silhouette: true })}<div class="q">${esc(sp.hint)}</div>${cornerTag(null)}</div>`}</div>`);
            if (card) cell.prepend(C.render(sp, { card, thumb: true }));
            tray.append(cell);
          });
        },
      };
    }
    const ladder = state.board === 'ladder', r = ladder ? S.ladderRankOf(state.rank) : S.rankOf(state.rank);
    const row = (u, extra = '', i = 99) => `<button class="rank-row ${extra}" data-user="${u.id}" ${i < 12 ? 'data-stagger' : ''}>
      ${rankMedal(u.rank)}${mono(u.nickname, 'sm')}
      <span class="who"><span class="nm">${esc(u.nickname)}${u.me ? ' · 我' : ''}</span><small>${esc(u.city)}${ladder ? ` · ${esc(u.tier)} ${u.stars} 星` : ''}</small></span>
      ${ladder ? '' : `<span class="best" title="${esc(S.byId[u.best]?.name)}">${S.byId[u.best] ? F.fishArt(S.byId[u.best]) : ''}</span>`}
      <span class="cnt"><b>${ladder ? u.points : u.count}</b><small>${ladder ? '积分' : '鱼种'}</small></span></button>`;
    return {
      note: ladder ? `前 ${r.top.length} 名` : `前 ${r.top.length} 名 · 共 <span class="num">${r.total}</span> 人`,
      html: `<div class="board">${r.top.length ? r.top.map((u, i) => row(u, u.me ? 'is-me' : '', i)).join('') : '<div class="empty">这个范围还没有人上榜</div>'}</div><div class="rank-float">${r.me ? row(r.me, 'rank-me') : '<div class="rank-row rank-me none">用现场拍摄记录一条渔获，就能上榜。</div>'}</div>`,
      mount() {},
    };
  }
  function sizeRankPage(sp) {
    let scope = state.rank;
    const rec = page(`${sp.name} · 巨物榜`, '<div class="size-rank"></div>');
    rec.node.classList.add('size-rank-page');
    const root = $('.size-rank', rec.node);
    const draw = () => {
      const r = S.sizeRankOf(sp.no, scope), king = r.top[0];
      const row = (u, extra = '') => `<button class="rank-row size-row ${u.rank <= 3 ? 'top r' + u.rank : ''} ${extra}" data-user="${u.id}">${rankMedal(u.rank)}${mono(u.nickname, 'sm')}<span class="who"><span class="nm">${esc(u.nickname)}${u.me ? ' · 我' : ''}</span><small>${ICON.pin}${esc(u.place)}</small></span><span class="len"><b>${u.lengthCm}</b><small>cm</small></span></button>`;
      root.innerHTML = `<div class="sp-banner rar-${sp.rarity}"><div class="sp-fish">${F.fishArt(sp)}</div><div class="sp-meta">${tagno(sp.no)}<h2>${esc(sp.name)}</h2><span class="latin">${esc(sp.latin)}</span></div><div class="sp-stats"><div><small>常见体长</small><b>${sp.commonCm}<i>cm</i></b></div><div><small>${scope === 'city' ? '同城' : '全国'}纪录</small><b>${king ? king.lengthCm : '—'}</b><i>cm</i></div><div><small>上榜</small><b>${r.total}</b><i>人</i></div></div></div><div class="scope"><button class="pill ${scope === 'nation' ? 'on' : ''}" data-scope="nation">全国</button><button class="pill ${scope === 'city' ? 'on' : ''}" data-scope="city">${esc(S.db.me.city)}</button><span class="grow"></span><span class="board-note">按最大现场记录</span></div><div class="size-head"><span>排名</span><span class="grow">钓手 · 地点</span><span>尺寸</span></div><div class="size-list"><div class="board">${r.top.length ? r.top.map(u => row(u, u.me ? 'is-me' : '')).join('') : '<div class="empty">这个范围还没有人上榜</div>'}</div>${r.me ? `<div class="rank-float">${row(r.me, 'rank-me')}</div>` : ''}</div>`;
      $$('[data-scope]', root).forEach(button => button.setAttribute('aria-pressed', button.dataset.scope === scope));
    };
    draw();
    root.onclick = (e) => {
      const s = e.target.closest('[data-scope]');
      if (s) { if (s.dataset.scope !== scope) { scope = s.dataset.scope; draw(); } return; }
      const u = e.target.closest('[data-user]');
      if (u && u.dataset.user !== 'me') openProfile(u.dataset.user);
    };
    return rec;
  }
  // A spot (or a group of spots that share one place) opens one detail sheet:
  // photo strip first, then the catch list, then a single clear action.
  function mapDetailV2(input) {
    const cells = Array.isArray(input) ? input : [input];
    const cell = cells[0];
    const records = cells.flatMap(item => item.records || []).sort((a, b) => b.createdAt - a.createdAt);
    const catchCount = cells.reduce((n, item) => n + (Number(item.catchCount) || 0), 0);
    const speciesCount = new Set(records.map(r => r.speciesId)).size || cells.reduce((n, item) => n + (Number(item.speciesCount) || 0), 0);
    const anglers = cells.reduce((n, item) => n + (Number(item.publicUserCount) || 0), 0);
    const title = cells.length > 1 ? `${cell.city} · ${cells.length} 个钓点` : (cell.place || cell.city);
    const photos = records.filter(r => r.photo).slice(0, 8);
    const strip = photos.length ? `<div class="map-photo-strip" role="list">${photos.map(r => { const i = records.indexOf(r); const sp = S.byId[r.speciesId]; return `<button class="map-photo" role="listitem" data-map-catch="${i}" aria-label="${esc(sp?.name || '渔获')}照片"><img src="${esc(r.photo)}" alt="" loading="lazy" decoding="async"><span>${esc(sp?.name || '')}</span></button>`; }).join('')}</div>` : '';
    const rows = records.map((c, i) => { const sp = S.byId[c.speciesId]; if (!sp) return ''; return `<button class="map-catch-row" data-map-catch="${i}"><span class="map-catch-thumb">${c.photo ? `<img src="${esc(c.photo)}" alt="" loading="lazy" decoding="async">` : F.fishSVG(sp)}</span><span class="grow"><b>${esc(sp.name)} ${rb(sp.rarity)}</b><small>${esc(c.nickname)}${c.lengthCm ? ` · ${c.lengthCm} cm` : ''} · ${C.fmtDate(c.createdAt)}</small></span><span class="chev">${ICON.chev}</span></button>`; }).join('');
    const emptyText = catchCount > 0 ? '这里有公开渔获，钓友较少时为保护隐私不显示明细' : '这里还没有公开渔获';
    const rec = sheet(title, `<div class="map-detail-head"><span class="eyebrow">${esc(cell.city)}${cell.district ? ` · ${esc(cell.district)}` : ''}</span><h2>${esc(title)}</h2><div class="map-detail-stats"><div><b>${catchCount}</b><small>条渔获</small></div><div><b>${speciesCount}</b><small>种鱼</small></div><div><b>${anglers}</b><small>位钓友</small></div></div></div>${strip}<div class="map-catch-list">${rows || `<div class="empty" role="status">${emptyText}</div>`}</div><p class="map-privacy-note">不显示精确坐标：位置模糊到约 1 公里范围，渔获公开 2 小时后才会上图。</p><button class="btn primary block" data-go-map-catch>${ICON.camera}在这里记录一条</button>`, 'map-detail-sheet');
    rec.node.onclick = (e) => {
      const row = e.target.closest('[data-map-catch]');
      if (row) {
        const catchItem = records[Number(row.dataset.mapCatch)];
        if (!catchItem) return;
        const mine = S.db.catches.some((item) => item.id === catchItem.id);
        closeLayer(rec, true);
        catchDetail(catchItem, { me: mine, userId: mine ? 'me' : catchItem.userId }, null);
        return;
      }
      if (e.target.closest('[data-go-map-catch]')) { closeLayer(rec); const d = ensureDraftV2(draft()); d.location = { city: cell.city, district: cell.district || '', place: cell.place }; state.tab = 'catch'; publishStep = 'capture'; render(); }
    };
  }
  function renderMapV2(view) {
    const priorFilters = state.mapFilters || {};
    const f = state.mapFilters = { city: priorFilters.city || S.db.me.city, rarity: priorFilters.rarity || 'all', speciesId: priorFilters.speciesId || 'all' };
    const cells = S.mapCells(f), provider = window.YK_MAP_PROVIDER;
    const remote = !!window.YK_API?.remote;
    provider?.unmount?.();
    const photoOf = cell => (cell.records || []).find(r => r.photo)?.photo || '';
    const leadSpecies = cell => S.byId[(cell.records || [])[0]?.speciesId];
    const cellHTML = cells.map(cell => { const sp = leadSpecies(cell), photo = photoOf(cell); return `<button class="map-cell-row" data-cell="${esc(cell.id)}"><span class="map-cell-thumb">${photo ? `<img src="${esc(photo)}" alt="" loading="lazy" decoding="async">` : sp ? F.fishSVG(sp) : ICON.pin}</span><span class="grow"><b>${esc(cell.place || cell.city)}</b><small>${esc(cell.city)} · ${cell.catchCount} 条渔获 · ${cell.speciesCount} 种鱼</small></span><span class="chev">${ICON.chev}</span></button>`; }).join('');
    const mapSelect = (key, label, value, options) => `<div class="map-select city-picker" data-map-select="${key}"><button type="button" class="set-control city-trigger" aria-label="${label}" aria-haspopup="listbox" aria-expanded="false"><span>${esc(value)}</span>${ICON.chev}</button><div class="city-menu" role="listbox" aria-label="选择${label}" hidden>${options.map(([optionValue, optionLabel]) => `<button type="button" class="city-option${optionValue === f[key] ? ' on' : ''}" role="option" aria-selected="${optionValue === f[key]}" data-map-option="${esc(optionValue)}">${esc(optionLabel)}</button>`).join('')}</div></div>`;
    const cityChoices = [['all', '全国'], ...Object.keys(S.CITIES).map((city) => [city, city])];
    const speciesChoices = [['all', '全部鱼种'], ...S.SPECIES.map((sp) => [sp.no, sp.name])];
    const rarityChoices = [['all', '全部品级'], ...RARITIES.map((rarity) => [rarity, C.RV[rarity].name])];
    const cityLabel = f.city === 'all' ? '全国' : f.city;
    const speciesLabel = f.speciesId === 'all' ? '全部鱼种' : (S.byId[f.speciesId]?.name || '全部鱼种');
    const rarityLabel = f.rarity === 'all' ? '全部品级' : (C.RV[f.rarity]?.name || '全部品级');
    const totalCatches = cells.reduce((n, c) => n + (Number(c.catchCount) || 0), 0);
    // Schematic spot map shown until the Tencent map loads (or if it fails): same photo bubbles.
    const schematic = (() => {
      const pts = cells.filter(c => Number.isFinite(c.lat) && Number.isFinite(c.lng));
      if (!pts.length) return '';
      const seen = new Map();
      const placed = pts.map(c => {
        const k = `${c.lat.toFixed(2)},${c.lng.toFixed(2)}`, n = seen.get(k) || 0; seen.set(k, n + 1);
        const a = n * 2.4, r = n ? 0.012 * Math.sqrt(n) * (f.city === 'all' ? 25 : 1) : 0;
        return { c, lat: c.lat + Math.sin(a) * r, lng: c.lng + Math.cos(a) * r };
      });
      const lats = placed.map(p => p.lat), lngs = placed.map(p => p.lng);
      const pad = (lo, hi) => { const d = Math.max(hi - lo, f.city === 'all' ? 6 : 0.06); return [lo - d * 0.18, hi + d * 0.18]; };
      const [la0, la1] = pad(Math.min(...lats), Math.max(...lats)), [ln0, ln1] = pad(Math.min(...lngs), Math.max(...lngs));
      const pins = placed.map(({ c, lat, lng }) => {
        const x = ((lng - ln0) / (ln1 - ln0) * 100).toFixed(1), y = ((la1 - lat) / (la1 - la0) * 100).toFixed(1);
        const photo = photoOf(c), sp = leadSpecies(c);
        return `<button class="map-bubble in" style="left:${x}%;top:${y}%" data-cell="${esc(c.id)}" aria-label="${esc(c.place || c.city)}，${c.catchCount} 条渔获"><span class="mb-photo">${photo ? `<img src="${esc(photo)}" alt="" loading="lazy" decoding="async">` : sp ? F.fishSVG(sp) : ''}</span>${c.catchCount > 1 ? `<em class="mb-count">${c.catchCount}</em>` : ''}<span class="mb-label">${esc(c.place || c.city)}</span></button>`;
      }).join('');
      return `<div class="map-schematic" aria-label="钓点分布示意">${pins}</div>`;
    })();
    view.innerHTML = `<div class="map-page"><div class="map-filters" aria-label="地图筛选">${mapSelect('city', '城市', cityLabel, cityChoices)}${mapSelect('speciesId', '鱼种', speciesLabel, speciesChoices)}${mapSelect('rarity', '稀有度', rarityLabel, rarityChoices)}</div><div class="map-summary" data-map-summary aria-live="polite">${cells.length ? `${cells.length} 个钓点 · ${totalCatches} 条公开渔获` : '暂无公开钓点'}</div><div class="map-zoom" data-map-zoom hidden><button class="icon-btn" data-map-zoom-in aria-label="放大">+</button><button class="icon-btn" data-map-zoom-out aria-label="缩小">−</button></div><button class="icon-btn map-locate" data-map-locate aria-label="定位到我" title="定位到我" disabled>${ICON.locate}</button><div class="map-canvas" data-map-root><div class="tmap-root" data-tmap-root aria-label="公开钓点地图" aria-hidden="true"></div><div class="map-fallback map-list-fallback" data-map-fallback><div class="map-service-state"><p data-map-status role="status">${remote ? '地图加载中' : '示例钓点'}</p><button class="btn sm" data-map-retry hidden>重试</button></div>${schematic}<div class="map-cell-list" aria-label="${remote ? '公开' : '示例'}钓点">${cellHTML || '<p class="map-list-empty">当前筛选还没有公开钓点，换个城市或鱼种看看</p>'}</div></div></div></div>`;
    const mapRoot = $('.tmap-root', view), fallback = $('.map-fallback', view);
    const currentMap = () => mapRoot.isConnected && $('.tmap-root', view) === mapRoot;
    const status = $('[data-map-status]', view), retry = $('[data-map-retry]', view), locateButton = $('[data-map-locate]', view), zoom = $('[data-map-zoom]', view);
    let mapReady = false, mounting = false;
    const mountProvider = async () => {
      if (mounting || !currentMap()) return;
      if (!remote || !provider?.mount || provider.mode !== 'tencent') {
        status.textContent = remote ? '钓点分布示意 · 实景地图即将开通' : '示例钓点';
        return;
      }
      mounting = true;
      status.textContent = '地图加载中'; retry.hidden = true; locateButton.disabled = true;
      try {
        const mounted = await provider.mount(mapRoot, { cells, photoOf, center: S.CITIES[f.city]?.lat ? { lat: S.CITIES[f.city].lat, lng: S.CITIES[f.city].lng } : null, onMarkerClick: (cell) => { if (currentMap()) mapDetailV2(cell); } });
        if (!currentMap()) return;
        mapReady = !!mounted;
        fallback.hidden = mapReady;
        mapRoot.setAttribute('aria-hidden', String(!mapReady));
        locateButton.disabled = !mapReady;
        if (zoom) zoom.hidden = !mapReady;
        if (!mounted) { status.textContent = '地图暂不可用'; retry.hidden = false; }
        else status.textContent = '';
      } catch (error) {
        if (!currentMap()) return;
        mapReady = false;
        fallback.hidden = false;
        status.textContent = error.message || '地图暂不可用，请重试';
        retry.hidden = false;
      } finally { mounting = false; }
    };
    mountProvider();
    view.onclick = (e) => {
      const select = e.target.closest('[data-map-select]');
      const option = e.target.closest('[data-map-option]');
      if (option && select) {
        f[select.dataset.mapSelect] = option.dataset.mapOption;
        renderMapV2(view);
        M.listIn($$('.map-bubble, .map-cell-row', view), { distance: 5, duration: .24, spread: .08 });
        return;
      }
      const trigger = e.target.closest('[data-map-select] .city-trigger');
      if (trigger && select) {
        const menu = $('.city-menu', select);
        const open = trigger.getAttribute('aria-expanded') !== 'true';
        $$('.map-select .city-menu', view).filter(item => item !== menu).forEach((item) => {
          M.menu(item, false);
          item.closest('.map-select')?.classList.remove('open');
          item.closest('.map-select')?.querySelector('.city-trigger')?.setAttribute('aria-expanded', 'false');
        });
        M.menu(menu, open);
        select.classList.toggle('open', open);
        trigger.setAttribute('aria-expanded', String(open));
        return;
      }
      const x = e.target.closest('[data-cell]');
      if (x) { const cell = cells.find((c) => c.id === x.dataset.cell); if (cell) mapDetailV2(cell); return; }
      if (e.target.closest('[data-map-zoom-in]')) { provider?.zoomBy?.(1); return; }
      if (e.target.closest('[data-map-zoom-out]')) { provider?.zoomBy?.(-1); return; }
      if (e.target.closest('[data-map-retry]')) { mountProvider(); return; }
      if (e.target.closest('[data-map-locate]')) {
        if (!mapReady || locateButton.disabled) return;
        setBusy(locateButton, true);
        (async () => {
          try {
            const position = await provider.locate();
            if (!currentMap()) return;
            const point = await window.YK_API.reverseGeocode(position.coords.latitude, position.coords.longitude, 'wgs84');
            if (!currentMap()) return;
            if (!provider.focus(point)) throw new Error('地图暂不可用，请重试');
            toast('已定位到当前位置');
          } catch (error) { if (currentMap()) toast(error.message || '定位失败，请重试'); }
          finally { if (currentMap()) setBusy(locateButton, false); }
        })();
      }
    };
  }
  function demoUnlockV2(rk) {
    const sp = S.SPECIES.find(s => s.rarity === rk) || S.SPECIES[0];
    showUnlockV2({ species: sp, card: { speciesId: sp.no, catchCount: 1, giant: { status: rk === 'UR' ? 'approved' : 'none', lengthCm: sp.giantThresholdCm, approvedAt: Date.now() } }, events: rk === 'UR' ? ['new', 'giant'] : ['new'], points: S.SCORE[sp.rarity] || 10, rank: S.db.rank, scoreEvents: [] });
  }
  function renderV2(animate) {
    const view = $('#view'), active = document.activeElement;
    const sameStep = !animate && state.tab === prevTab && (state.tab !== 'catch' || lastPubStep === publishStep);
    const scrollTop = sameStep ? view.scrollTop : 0;
    const focusId = sameStep && view.contains(active) ? active.id : '';
    const selection = focusId && typeof active.selectionStart === 'number' ? [active.selectionStart, active.selectionEnd] : null;
    view.onclick = view.oninput = null;
    view.className = 'view-' + state.tab;
    $$('#tabbar button').forEach((b) => {
      const selected = b.dataset.tab === state.tab;
      b.classList.toggle('on', selected);
      if (selected) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
    });
    if (state.tab !== 'catch') { stopCamera(); lastPubStep = null; }
    if (state.tab !== 'map') window.YK_MAP_PROVIDER?.unmount?.();
    document.body.classList.toggle('cam-on', state.tab === 'catch' && publishStep === 'capture');
    document.body.classList.toggle('pub-sub', state.tab === 'catch' && publishStep !== 'capture');
    if (state.tab === 'catch') renderPublish(view);
    else if (state.tab === 'dex') mountDexV2(view, myCtx, animate);
    else if (state.tab === 'rank') renderRankV2(view);
    else if (state.tab === 'map') renderMapV2(view);
    view.scrollTop = scrollTop;
    const input = focusId && document.getElementById(focusId);
    if (input && view.contains(input)) { input.focus({ preventScroll: true }); if (selection) input.setSelectionRange(...selection); }
    syncLayerAccess();
    if (animate) M.viewIn(view, TAB_ORDER[state.tab] - TAB_ORDER[prevTab]);
    else if (sameStep && state.tab === 'catch' && publishStep === 'edit') M.listIn($$('.ai-panel:not(:has(.ai-candidate)), .species-pick, #hints, .score-preview', view), { distance: 3, duration: .18, spread: .03 });
    else if (sameStep || M.reduced()) M.stateIn(view.firstElementChild, { distance: 4 });
    prevTab = state.tab;
  }
  render = renderV2;

  // Keep source and keyboard order aligned with the product navigation:
  // collection, capture, ranking and map remain stable across desktop and mobile.
  const nav = $('#tabbar');
  ['dex', 'catch', 'rank', 'map'].forEach((key) => {
    const button = nav && nav.querySelector(`[data-tab="${key}"]`);
    if (button) nav.appendChild(button);
  });

  // ---------- 启动 ----------
  $('#tabbar').onclick = (e) => { const b = e.target.closest('[data-tab]'); if (b && (b.dataset.tab !== state.tab || layers.length)) { closeAll(); if (b.dataset.tab === 'catch' && (publishStep === 'capture' || !draft().photo)) openCapture(); go(b.dataset.tab); } };
  // 切到后台就关相机（省电、释放占用）；回到前台且仍在取景页时重新打开
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopCamera();
    else if (state.tab === 'catch' && publishStep === 'capture' && !layers.length) startCamera($('#view'));
  });
  // 深链：#share=…（分享链接）；演示用 #tab=dex|rank|map、#profile=u3、#unlock=SSR
  let q = new URLSearchParams(location.hash.slice(1));
  let handledDeepLink = '';
  function readDeepLink() { return new URLSearchParams(location.hash.slice(1)); }
  async function applyDeepLink({ overlays = true, force = false } = {}) {
    q = readDeepLink();
    const tab = q.get('tab');
    if (['catch', 'dex', 'rank', 'map'].includes(tab) && state.tab !== tab) {
      closeAll();
      state.tab = tab;
      render(true);
    }
    if (!overlays) return;
    const key = location.hash;
    if (!force && handledDeepLink === key) return;
    handledDeepLink = key;
    if (q.get('shared')) {
      try { shareView(await window.YK_API.shared(q.get('shared'), q.get('api')), true); }
      catch (error) { toast(error.message); }
    }
    if (q.get('share')) {
      try { shareView(b64.dec(q.get('share')), true); } catch (e) { toast('这个分享链接已失效'); }
    }
    if (q.get('profile')) openProfile(q.get('profile'));
    if (q.get('unlock')) demoUnlockV2(q.get('unlock'));
  }
  if (['catch', 'dex', 'rank', 'map'].includes(q.get('tab'))) state.tab = q.get('tab');
  render(true);
  window.addEventListener('hashchange', () => applyDeepLink({ force: true }));
  // 安卓返回键：先关最上层弹层（解锁动画按"继续"处理），没有弹层时回到「渔获」页，已在首页才交给系统退出
  function back() {
    const top = layers[layers.length - 1];
    if (top && top.kind === 'share-landing') return true;
    if (top) {
      if (top.recordModal) top.recordModal.close();
      else if (top.kind === 'unlock') { const ok = top.node.querySelector('[data-act=ok]'); if (ok) ok.click(); else closeLayer(top); }
      else closeLayer(top);
      return true;
    }
    if (state.tab === 'catch' && publishStep !== 'capture') { publishStep = publishStep === 'edit' ? 'preview' : 'capture'; render(); return true; }
    if (state.tab !== 'dex') { go('dex'); return true; }
    return false;
  }
  document.addEventListener('yk-notice', e => toast(e.detail, 4000));
  document.addEventListener('yk-native-background', stopCamera);
  document.addEventListener('yk-data-ready', () => { if (shareLanding) return; closeAll(); state.draft = null; applyDeepLink({ overlays: false }); render(); });
  document.addEventListener('yk-map-ready', () => { if (state.tab === 'map') render(); });
  document.addEventListener('yk-service-settings', () => {
    const api = window.YK_API;
    const serviceStatus = api.remote ? api.connected ? 'connected' : 'disconnected' : 'local';
    const rec = sheet('服务连接', `<div class="service-state is-${serviceStatus}" data-status="${serviceStatus}" role="status">${api.remote ? api.connected ? '已连接' : '连接中断' : '本机演示'}</div>
      <label class="service-label" for="service-url">服务器地址</label><input id="service-url" class="link-box" type="url" placeholder="https://api.example.com" value="${esc(api.base)}">
      <label class="service-label" for="service-token">测试会话</label><input id="service-token" class="link-box" type="password" autocomplete="off" placeholder="限时令牌（选填）">
      <div class="actions-row service-actions"><button class="btn primary service-connect" data-connect>连接</button><button class="btn service-disconnect" data-disconnect>断开</button><button class="btn service-export" data-export>导出记录</button></div>`, 'service-sheet');
    rec.node.classList.add('service-layer');
    rec.node.dataset.status = serviceStatus;
    $('[data-connect]', rec.node).onclick = async e => {
      const b = e.currentTarget;
      if (b.disabled) return;
      setBusy(b, true);
      try { await api.connect($('#service-url', rec.node).value.trim(), $('#service-token', rec.node).value.trim()); toast('已连接服务器'); }
      catch (error) { toast(error.message); }
      finally { setBusy(b, false); }
    };
    $('[data-disconnect]', rec.node).disabled = api.hosted;
    $('[data-disconnect]', rec.node).onclick = () => { api.disconnect(); toast('已切回本机演示'); };
    $('[data-export]', rec.node).onclick = async e => {
      const b = e.currentTarget;
      if (b.disabled) return;
      setBusy(b, true);
      try { await api.exportData(); } catch (error) { toast(error.message); }
      finally { setBusy(b, false); }
    };
  });
  const originalSettingsPage = settingsPage;
  function connectedSettings() {
    originalSettingsPage();
    const body = document.querySelector('#layers .layer.page:last-child .page-body');
    if (!body) return;
    window.YK_ACCOUNT?.mountSettings(body);
    if (window.YK_API.hosted) {
      body.querySelectorAll('[data-demo], [data-reset]').forEach(b => b.closest('.set-row').remove());
      // 生产环境：试看解锁动画属于开发者选项，仅 ?demo=1 时保留
      if (!/[?&]demo=1/.test(location.search)) body.querySelector('[data-try]')?.closest('.settings-group')?.remove();
      return;
    }
    // 非生产：服务连接、填充/恢复演示数据、试看解锁动画统一收进底部“开发者选项”
    const dev = el('<div class="settings-group dev-options"><span class="eyebrow">开发者选项</span><div class="box"></div></div>');
    const box = $('.box', dev);
    const button = el(`<div class="set-row"><span>服务连接</span><button class="btn sm service-settings">${window.YK_API.remote ? '已连接' : '设置'}</button></div>`);
    $('button', button).onclick = () => document.dispatchEvent(new Event('yk-service-settings'));
    box.append(button);
    body.querySelectorAll('[data-demo], [data-reset]').forEach(b => box.append(b.closest('.set-row')));
    const tryRow = body.querySelector('[data-try]')?.closest('.sfx-row');
    if (tryRow) { const group = tryRow.closest('.settings-group'); const row = el('<div class="set-row col"><span>试看解锁动画</span></div>'); row.append(tryRow); box.append(row); group?.remove(); }
    body.append(dev);
  }
  settingsPage = connectedSettings;
  window.YK_APP = { go, openProfile, demoUnlock: demoUnlockV2, settingsPage, shareView, back, sheet, page, closeLayer, closeAll };
  window.YK_API.init().then(async () => {
    applyDeepLink();
  });
})();
