/* Yukomon demo —— 页面逻辑：记录渔获、图鉴、排行榜、钓手图鉴页、鱼卡解锁、分享链接
 * 鱼种由用户自己选择，提交即入册；没有识别/上传环节。动效统一走 motion.js（GSAP）。 */
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
  const rb = (r) => `<span class="rb ${r}">${r}</span>`;
  const tagno = (no) => `<span class="tagno">No.${no}</span>`;
  const RARITIES = ['N', 'R', 'SR', 'SSR'];
  const GEAR = [['rod', '鱼竿', '如：溪流竿1.8m UL'], ['reel', '鱼轮', '如：喜玛诺26款Majestic'], ['line', '鱼线', '如：PE 0.8号'], ['bait', '鱼饵', '如：米诺9cm']];
  const DESC_MAX = 40;
  const svg = (d) => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
  const ICON = {
    back: svg('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
    arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    chev: svg('<path d="M9 6l6 6-6 6"/>'),
    close: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
    plus: svg('<path d="M12 5v14M5 12h14"/>'),
    search: svg('<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>'),
    gear: svg('<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>'),
    camera: svg('<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>'),
    fish: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12c3-4.5 7-6 11-6 3 0 5.5 2.5 7 6-1.5 3.5-4 6-7 6-4 0-8-1.5-11-6z"/><path d="M3 12l-1-4M3 12l-1 4"/><circle cx="16" cy="11" r="0.8"/></svg>',
    heart: svg('<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>'),
    pin: svg('<path d="M12 21s-6-5.6-6-11a6 6 0 0 1 12 0c0 5.4-6 11-6 11z"/><circle cx="12" cy="10" r="2.2"/>'),
    locate: svg('<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>'),
  };

  const mono = (name, cls = '') => `<span class="mono ${cls}" aria-hidden="true">${esc([...String(name || '钓')][0])}</span>`;

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
    const done = () => { rec.cleanups.forEach((fn) => fn()); rec.node.remove(); };
    if (instant) return done();
    if (rec.kind === 'unlock') return gsap.to(rec.node, { autoAlpha: 0, duration: 0.2, ease: 'none', onComplete: done });
    (rec.kind === 'page' ? M.pageOut(rec.node) : M.sheetOut(rec.node)).eventCallback('onComplete', done);
  }
  const closeAll = () => layers.slice().forEach((r) => closeLayer(r, true));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLayer(layers[layers.length - 1]);
    else if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('div[role="button"]')) { e.preventDefault(); e.target.click(); }
  });

  function page(title, body) {
    const node = el(`<div class="layer page"><header class="page-head"><button class="icon-btn" data-close aria-label="返回">${ICON.back}</button><h2>${esc(title)}</h2></header><div class="page-body">${body}</div></div>`);
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
  const state = { tab: 'dex', rank: 'nation', draft: null, stamp: null };
  const myCtx = { me: true, filter: 'all' };
  function render(animate) {
    const view = $('#view');
    view.onclick = view.oninput = null;
    view.scrollTop = 0;
    view.className = 'view-' + state.tab;
    $$('#tabbar button').forEach((b) => b.classList.toggle('on', b.dataset.tab === state.tab));
    if (state.tab === 'catch') renderPublish(view);
    else if (state.tab === 'dex') mountDex(view, myCtx, animate);
    else renderRank(view);
    if (animate) M.viewIn(view);
  }
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
  const missing = (d) => [!d.photo && '照片', !d.speciesId && '鱼种', !d.desc.trim() && '描述'].filter(Boolean);

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
  function renderPublish(view) {
    const d = draft();
    if (publishStep === 'edit' && d.photo) {
      renderCatchForm(view);
      const mount = $('.mount', view);
      mount.innerHTML = `<button class="btn sm" data-pub-back>‹ 返回预览</button><img src="${esc(d.photo)}" alt="渔获封面">`;
      $('[data-pub-back]', mount).onclick = () => { publishStep = 'preview'; render(); };
      return;
    }
    const preview = publishStep === 'preview' && d.photo;
    view.innerHTML = `<div class="publish-capture ${preview ? 'is-preview' : ''}">
      <header><button class="icon-btn" data-pub-exit aria-label="返回">${ICON.back}</button><b>${preview ? '确认渔获' : '发布渔获'}</b></header>
      <div class="publish-media">${preview ? `<img src="${esc(d.photo)}" alt="待发布渔获">` : `<div class="capture-empty">${ICON.camera}<h2>记录这一刻</h2><p>拍照、拍视频，或从相册选择</p><small>点击快门打开系统相机</small></div>`}</div>
      <div class="capture-actions">${preview ? '<button class="btn" data-retake>重新拍摄</button><button class="btn accent" data-next>下一步 →</button>' : `<button class="btn" data-sample>示例</button><button class="shutter" data-shoot aria-label="拍摄"></button><button class="btn" data-album>相册</button>`}</div>
      ${preview ? '' : '<div class="capture-modes"><button class="pill on" data-mode="image">拍照</button><button class="pill" data-mode="video">拍视频</button></div>'}
      <input type="file" data-capture accept="image/*" capture="environment" hidden><input type="file" data-library accept="image/*,video/*" hidden></div>`;
    let mode = 'image';
    $('[data-pub-exit]', view).onclick = () => { if (preview) { publishStep = 'capture'; render(); } else go('dex'); };
    if (preview) {
      $('[data-retake]', view).onclick = () => { publishStep = 'capture'; render(); };
      $('[data-next]', view).onclick = () => { publishStep = 'edit'; render(); };
      if (d.videoId) window.YK_MEDIA.get(d.videoId).then(blob => {
        if (!blob || !view.querySelector('.is-preview')) return;
        const host = $('.publish-media', view), video = document.createElement('video');
        video.controls = true; video.playsInline = true; video.poster = d.photo;
        const url = URL.createObjectURL(blob); video.src = url; host.replaceChildren(video);
        const observer = new MutationObserver(() => { if (!video.isConnected) { video.pause(); URL.revokeObjectURL(url); observer.disconnect(); } });
        observer.observe(view, {childList:true,subtree:true});
      });
      return;
    }
    $$('[data-mode]', view).forEach(b => b.onclick = () => { mode = b.dataset.mode; $$('[data-mode]', view).forEach(x => x.classList.toggle('on', x === b)); $('[data-capture]', view).accept = mode + '/*'; });
    $('[data-shoot]', view).onclick = () => $('[data-capture]', view).click();
    $('[data-album]', view).onclick = () => $('[data-library]', view).click();
    $('[data-sample]', view).onclick = () => { d.photo = plate(S.SPECIES[0], String(Date.now())); d.source = 'camera'; d.videoId = null; saveDraft(); publishStep = 'preview'; render(); };
    $$('input[type=file]', view).forEach(input => input.onchange = async () => {
      const file = input.files[0]; if (!file) return;
      try {
        if (file.size > 60 * 1024 * 1024) return toast('请选择小于 60MB 的视频或图片');
        const old = d.videoId;
        if (file.type.startsWith('video/')) {
          const info = await window.YK_MEDIA.probeVideo(file), id = S.uuid();
          if (await window.YK_MEDIA.put(id, file) == null) throw new Error('storage');
          d.photo = info.poster; d.videoId = id; d.duration = info.duration;
        } else { d.photo = await window.YK_MEDIA.compressImage(file); d.videoId = null; d.duration = 0; }
        if (old) window.YK_MEDIA.del(old);
        d.source = input.hasAttribute('data-capture') ? 'camera' : 'album';
        saveDraft(); publishStep = 'preview'; render();
      } catch (e) { toast('媒体读取或保存失败，请换一个文件重试'); }
    });
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
        <label class="tile field" data-stagger><span class="eyebrow">全长 · 选填</span><span class="size"><input id="f-len" data-field="lengthCm" type="number" inputmode="decimal" min="1" max="300" placeholder="0" aria-label="全长，单位厘米" value="${esc(d.lengthCm)}"><span>cm</span></span></label>
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
      else if (act === 'retake') { d.photo = ''; d.source = ''; saveDraft(); render(); }
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
  const MISS_TARGET = { 照片: '.mount', 鱼种: '.species-pick', 描述: '.desc-tile' };
  function showMissing(miss) {
    const view = $('#view');
    const target = $(MISS_TARGET[miss[0]], view);
    toast('还差：' + miss.join('、'));
    if (!target) return;
    const top = target.getBoundingClientRect().top - view.getBoundingClientRect().top + view.scrollTop - 16;
    gsap.to(view, { scrollTop: Math.max(0, top), duration: M.reduced() ? 0 : 0.45, ease: 'power2.out', overwrite: 'auto' });
    target.classList.remove('need');
    void target.offsetWidth;
    target.classList.add('need');
    gsap.delayedCall(1.6, () => target.classList.remove('need'));
    M.nudge(target);
    if (miss[0] === '描述') gsap.delayedCall(0.45, () => $('#f-desc', view).focus({ preventScroll: true }));
  }

  function submit(btn) {
    const d = draft();
    const miss = missing(d);
    if (miss.length) return showMissing(miss);
    if (/赌博|色情/.test(`${d.desc}${Object.values(d.gear).join('')}`)) { M.nudge(btn); return toast('描述里有不合适的内容，请修改'); }
    const err = S.precheck(d);
    if (err) { M.nudge(btn); return toast(err); }
    const res = S.checkin({ ...d, desc: d.desc.trim(), lengthCm: Number(d.lengthCm) || null }, d.speciesId);
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
        <div class="headline">${ur ? '巨物卡解锁' : isNew ? '新鱼种入册' : '星级提升'}</div>
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
    const filters = [['all', '全部'], ['have', '已入册'], ['miss', '未入册'], ...RARITIES.map((r) => [r, r])];
    const bio = data.bio || (ctx.me ? '还没有个性签名，去设置里写一句' : '');

    const unit = (n, u) => `<b><span data-n="${n}">${n}</span><small>${u}</small></b>`;
    root.innerHTML = `<div class="screen dex-page">
      <div class="collector">${mono(data.name)}
        <div class="who"><h1>${esc(data.name)}</h1>${bio ? `<p class="bio">${esc(bio)}</p>` : ''}</div>
        ${ctx.me ? `<button class="icon-btn" data-act="settings" aria-label="设置">${ICON.gear}</button>` : ''}
      </div>
      <div class="tile dark progress" data-stagger>
        <span class="eyebrow">图鉴进度</span>
        <div class="big"><b data-n="${owned.length}">${owned.length}</b><span>/ ${total} 种</span></div>
        <div class="bar" aria-hidden="true"><i style="width:${Math.max(owned.length ? 3 : 0, (owned.length / total) * 100)}%"></i></div>
        <div class="breakdown">${RARITIES.map((r) => `<div>${rb(r)}<b>${by[r]}<small>/${totalBy[r]}</small></b></div>`).join('')}</div>
      </div>
      <div class="bento three">
        <div class="tile stat" data-stagger><span class="eyebrow">渔获</span>${unit(real.length, '条')}</div>
        <div class="tile stat" data-stagger><span class="eyebrow">城市</span>${unit(cities.size, '座')}</div>
        <div class="tile stat" data-stagger><span class="eyebrow">巨物</span>${unit(giants, '张')}</div>
      </div>
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
          ${card ? '' : `<div class="slot">${tagno(sp.no)}<span class="grade ${sp.rarity}">${sp.rarity}</span>${F.fishSVG(sp, { silhouette: true })}<div class="q">${esc(sp.hint)}</div></div>`}
          <div class="cap"><span>${card ? esc(sp.name) : '未入册'}</span>${card ? `<span class="num muted">×${card.catchCount}</span>` : ''}</div></div>`);
        if (card) cell.prepend(C.render(sp, { card, thumb: true, variant: g ? 'ur' : 'normal', giantInfo: g ? giantInfo(card, data.catches) : null }));
        tray.append(cell);
      });
    };
    fill();
    $('.dex-filter', root).onclick = (e) => {
      const b = e.target.closest('[data-f]');
      if (!b) return;
      ctx.filter = b.dataset.f;
      $$('.dex-filter .pill', root).forEach((x) => x.classList.toggle('on', x === b));
      fill();
      if (!M.reduced()) gsap.from($$('.cell', tray).slice(0, 12), { y: 8, autoAlpha: 0, duration: 0.3, stagger: 0.02 });
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
    // 刚解锁的那一格：滚到视野里，盖章入册
    if (ctx.me && state.stamp) {
      const cell = $(`[data-sp="${state.stamp}"]`, tray);
      state.stamp = null;
      if (cell) { cell.removeAttribute('data-stagger'); cell.scrollIntoView({ block: 'center' }); gsap.delayedCall(0.25, () => M.stampIn(cell)); }
    }
  }
  function lockedSheet(sp) {
    sheet(`No.${sp.no} 未入册`, `<div style="width:170px;margin:4px auto 10px;opacity:.3">${F.fishSVG(sp, { silhouette: true })}</div>
      <p style="margin:0 0 12px;text-align:center">${esc(sp.hint)}</p>
      <div class="facts"><div class="kv"><span>稀有度</span><span>${rb(sp.rarity)} ${C.RV[sp.rarity].name}</span></div><div class="kv"><span>栖息地</span><span>${C.HAB[sp.habitat].name}</span></div><div class="kv"><span>分布</span><span>${esc(sp.region)}</span></div><div class="kv"><span>旺季</span><span>${esc(sp.season)}</span></div><div class="kv"><span>钓法</span><span>${esc(sp.method)}</span></div></div>`);
  }
  const likeChip = (c) => { if (!c.speciesId) return ''; const l = S.likesOf(c); return `<span class="likes ${l.liked ? 'on' : ''}">${ICON.heart}<span class="num">${l.count}</span></span>`; };
  const catchRow = (c, i, title) => `<div class="entry" data-i="${i}" role="button" tabindex="0"><img class="ph" src="${esc(photoOf(c))}" alt="" loading="lazy"><div class="grow"><div class="t">${esc(title)}</div><div class="m">${c.lengthCm ? `<span class="num">${c.lengthCm}cm</span>` : ''}<span>${esc(c.location ? c.location.city : '')}</span>${likeChip(c)}</div></div><div class="d">${C.fmtDate(c.createdAt)}</div></div>`;
  function metSheet(met, ctx) {
    const rec = sheet('遇见过的保护鱼类', `<div class="entry-list">${met.map((c, i) => catchRow(c, i, c.protectedName)).join('')}</div>`);
    $('.entry-list', rec.node).onclick = (e) => { const x = e.target.closest('[data-i]'); if (x) { closeLayer(rec); catchDetail(met[+x.dataset.i], ctx); } };
  }

  // ============================================================
  // 排行榜
  // ============================================================
  function renderRank(view) {
    const r = S.rankOf(state.rank);
    const row = (u, extra = '', i = 99) => `<button class="rank-row ${u.rank <= 3 ? 'top' : ''} ${extra}" data-user="${u.id}" ${i < 12 ? 'data-stagger' : ''}>
      <span class="n">${u.rank}</span>${mono(u.nickname, 'sm')}
      <span class="who"><span class="nm">${esc(u.nickname)}${u.me ? ' · 我' : ''}</span><small>${esc(u.city)}${u.urs ? ` · 巨物 ${u.urs}` : ''}</small></span>
      <span class="best" title="${esc(S.byId[u.best].name)}">${F.fishSVG(S.byId[u.best])}</span>
      <span class="cnt"><b>${u.count}</b><small>鱼种</small></span></button>`;
    const first = r.top[0];
    const leader = first ? `<button class="tile dark leader" data-user="${first.id}" data-stagger>
      <span class="head"><span class="medal">1</span><span class="grow"><span class="nm">${esc(first.nickname)}${first.me ? ' · 我' : ''}</span><small>${esc(first.city)}${first.urs ? ` · 巨物 ${first.urs} 张` : ''}</small></span></span>
      <span class="big"><b>${first.count}</b><span>种鱼</span></span>
      <span class="best" title="${esc(S.byId[first.best].name)}">${F.fishSVG(S.byId[first.best])}</span></button>` : '';
    view.innerHTML = `<div class="screen rank-page">
      <div class="scope"><button class="pill ${state.rank === 'nation' ? 'on' : ''}" data-scope="nation">全国</button><button class="pill ${state.rank === 'city' ? 'on' : ''}" data-scope="city">${esc(S.db.me.city)}</button><span class="grow"></span><span class="board-note">前 ${r.top.length} 名 · 共 <span class="num">${r.total}</span> 人</span></div>
      ${leader}
      <div class="board">${r.top.slice(1).map((u, i) => row(u, u.me ? 'is-me' : '', i)).join('')}</div>
      ${r.me ? row(r.me, 'rank-me') : '<div class="rank-row rank-me none">用现场拍摄记录一条渔获，就能上榜。</div>'}
    </div>`;
    view.onclick = (e) => {
      const s = e.target.closest('[data-scope]');
      if (s) { state.rank = s.dataset.scope; return render(true); }
      const u = e.target.closest('[data-user]');
      if (u) openProfile(u.dataset.user);
    };
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
        ${!sp ? '' : ctx.me ? `<span class="like static" aria-label="${lk.count} 个赞">${ICON.heart}<span class="num">${lk.count}</span></span>` : `<button class="like ${lk.liked ? 'on' : ''}" data-like aria-pressed="${lk.liked}" aria-label="点赞">${ICON.heart}<span class="num">${lk.count}</span></button>`}</div>
      ${c.desc ? `<p class="detail-desc">${esc(c.desc)}</p>` : ''}
      <div class="tags">${sp ? `<span class="pill ${c.verified ? 'ok' : 'warn'}">${c.verified ? '现场拍摄' : '相册照片'}</span>` : '<span class="pill ok">保护鱼类 · 遇见</span>'}${c.released ? '<span class="pill">已放流</span>' : ''}</div>
      <div class="facts">
        ${sp ? kv('鱼种', `${esc(sp.name)} ${rb(sp.rarity)} <span class="latin muted">${esc(sp.latin)}</span>`) : kv('鱼种', `${esc(c.protectedName)}（国家${esc(c.protectedLevel)}保护）`)}
        ${kv('尺寸', c.lengthCm ? `<span class="num">${c.lengthCm} cm</span>` : '')}
        ${kv('钓点', esc(ctx.me ? [loc.place, loc.city, loc.district].filter(Boolean).join(' · ') : loc.city))}
        ${kv('时间', `<span class="num">${ctx.me ? fmtFull(c.createdAt) : C.fmtDate(c.createdAt)}</span>`)}
        ${GEAR.map(([k, label]) => kv(label, esc(g[k]))).join('')}
      </div>
      ${ctx.me ? `<div class="actions-row" style="margin-bottom:8px">${sp ? '<button class="btn" data-share>分享链接</button>' : ''}<button class="btn danger" data-del>删除</button></div>` : '<div style="height:8px"></div>'}`, 'tall');
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
      if (r.liked) M.bump(like);
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
    const back = `<h4>${esc(sp.name)}</h4><div class="lat latin">${esc(sp.latin)}</div>
      <div class="kvs"><span>科</span><span>${esc(sp.family)}</span><span>分布</span><span>${esc(sp.region)}</span><span>旺季</span><span>${esc(sp.season)}</span><span>钓法</span><span>${esc(sp.method)}</span><span>常见</span><span>${sp.commonCm}cm · 巨物线 ${sp.giantThresholdCm}cm</span></div>
      <div class="fact">${esc(sp.fact)}</div>
      <div class="mine">${ctx.me ? '我' : 'TA'}钓到 <b>${card.catchCount}</b> 次${card.bestLengthCm ? `，最大 <b>${card.bestLengthCm}cm</b>` : ''}<br>${C.fmtDate(card.unlockedAt)} 入册</div>`;
    const rec = page(`No.${sp.no} ${sp.name}`, `
      <div class="card-stage"></div>
      ${hasUR ? '<div class="variant"><button class="pill on" data-v="ur">巨物卡</button><button class="pill" data-v="normal">普通卡</button></div>' : ''}
      ${ctx.me ? '<div class="actions-row"><button class="btn primary" data-share>分享链接</button></div>' : ''}
      <div class="section-h"><h3>${ctx.me ? '我的' : 'TA 的'}${esc(sp.name)}</h3><span class="num">${card.catchCount} 条</span></div>
      <div class="mine-list entry-list"></div>`);
    const stage = $('.card-stage', rec.node);
    let off = [];
    const mountCard = () => {
      off.forEach((fn) => fn());
      stage.innerHTML = '';
      const ce = C.render(sp, { card, interactive: true, back, variant: ur ? 'ur' : 'normal', giantInfo: ur ? giantInfo(card, data.catches) : null });
      stage.append(ce);
      off = [C.attach(ce), C.animate(ce)];
      ce.onclick = () => { C.flip(ce); A.play('ui_flip'); A.haptic('light'); };
      if (!M.reduced()) gsap.from(ce, { y: 24, autoAlpha: 0, scale: 0.94, duration: 0.55, delay: 0.12 });
    };
    mountCard();
    rec.cleanups.push(() => off.forEach((fn) => fn()));
    $$('[data-v]', rec.node).forEach((b) => (b.onclick = () => { ur = b.dataset.v === 'ur'; $$('[data-v]', rec.node).forEach((x) => x.classList.toggle('on', x === b)); mountCard(); }));
    const mine = data.catches.filter((c) => c.speciesId === sp.no).slice(0, 20);
    $('.mine-list', rec.node).innerHTML = mine.map((c, i) => catchRow(c, i, c.desc || sp.name)).join('');
    $('.mine-list', rec.node).onclick = (e) => { const x = e.target.closest('[data-i]'); if (x) catchDetail(mine[+x.dataset.i], ctx, (c) => { const chip = $('.likes', x); if (chip) chip.outerHTML = likeChip(c); }); };
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
      <div class="row" style="margin-top:10px"><button class="btn grow" data-preview>预览</button><button class="btn primary grow" data-copy>复制链接</button></div>`);
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
    const ce = C.render(sp, { card, interactive: true, back, backClass: 'has-design', variant: ur ? 'ur' : 'normal', giantInfo: ur ? { lengthCm: p.len, at: p.t, city: p.city } : null });
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
        <div class="set-row"><span>昵称</span><input id="set-name" maxlength="12" value="${esc(db.me.nickname)}" aria-label="昵称"></div>
        <div class="set-row col"><label for="set-bio">个性签名</label><textarea id="set-bio" maxlength="30" placeholder="写一句介绍自己，显示在图鉴页昵称下面">${esc(db.me.bio)}</textarea></div>
        <div class="set-row"><span>常驻城市</span><select id="set-city" aria-label="常驻城市">${Object.keys(S.CITIES).map((c) => `<option ${c === db.me.city ? 'selected' : ''}>${c}</option>`).join('')}</select></div>
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
    $('#set-city', node).onchange = (e) => { db.me.city = e.target.value; S.save(); };
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

  // ---------- 启动 ----------
  $('#tabbar').onclick = (e) => { const b = e.target.closest('[data-tab]'); if (b && (b.dataset.tab !== state.tab || layers.length)) { closeAll(); go(b.dataset.tab); } };
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
