/* Yukomon demo —— 媒体：视频存取（IndexedDB）、截取封面、图片压缩
 * 照片压缩成 dataURL 存在 localStorage；视频体积大，单独存 IndexedDB，渔获里只记封面和时长。
 * 正式版视频走云存储，这里只是本机演示。 */
(function () {
  const DB = 'yukomon-media', STORE = 'videos';
  let dbp = null;
  function open() {
    if (dbp) return dbp;
    dbp = new Promise((resolve) => {
      try {
        const req = indexedDB.open(DB, 1);
        req.onupgradeneeded = () => req.result.createObjectStore(STORE);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(null);
      } catch (e) {
        resolve(null);
      }
    });
    return dbp;
  }
  function tx(mode, fn) {
    return open().then((db) => new Promise((resolve) => {
      if (!db) return resolve(null);
      try {
        const t = db.transaction(STORE, mode);
        const r = fn(t.objectStore(STORE));
        t.oncomplete = () => resolve(r && 'result' in r ? r.result : true);
        t.onerror = t.onabort = () => resolve(null);
      } catch (e) {
        resolve(null);
      }
    }));
  }
  const put = (id, blob) => tx('readwrite', (s) => s.put(blob, id));
  const get = (id) => tx('readonly', (s) => s.get(id));
  const del = (id) => tx('readwrite', (s) => s.delete(id));
  async function prune(referenced = []) {
    const keep = new Set(referenced);
    const keys = await tx('readonly', s => s.getAllKeys());
    if (!keys) return;
    await Promise.all(keys.filter(id => !keep.has(id)).map(del));
  }

  // 把一帧画面画到 canvas，长边压到 max，导出 JPEG dataURL
  function frame(src, w, h, max = 720, mirror = false) {
    const k = Math.min(1, max / Math.max(w, h));
    const cv = document.createElement('canvas');
    cv.width = Math.round(w * k);
    cv.height = Math.round(h * k);
    const g = cv.getContext('2d');
    if (mirror) { g.translate(cv.width, 0); g.scale(-1, 1); }
    g.drawImage(src, 0, 0, cv.width, cv.height);
    return cv.toDataURL('image/jpeg', 0.7);
  }

  function compressImage(file) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const im = new Image();
      im.onload = () => { URL.revokeObjectURL(url); resolve(frame(im, im.naturalWidth, im.naturalHeight)); };
      im.onerror = () => { URL.revokeObjectURL(url); reject(new Error('image')); };
      im.src = url;
    });
  }

  // 视频：读时长 + 取第 0.3 秒左右的一帧做封面
  function probeVideo(blob) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(blob);
      const v = document.createElement('video');
      let done = false;
      const finish = (ok, val) => { if (done) return; done = true; clearTimeout(timer); v.removeAttribute('src'); v.load(); URL.revokeObjectURL(url); ok ? resolve(val) : reject(val); };
      const timer = setTimeout(() => finish(false, new Error('timeout')), 8000);
      v.muted = true;
      v.playsInline = true;
      v.preload = 'auto';
      v.onloadeddata = () => {
        const d = isFinite(v.duration) ? v.duration : 0;
        v.onseeked = () => finish(true, { poster: frame(v, v.videoWidth, v.videoHeight), duration: d });
        try { if (!d) finish(true, { poster: frame(v, v.videoWidth, v.videoHeight), duration: 0 }); else v.currentTime = Math.min(0.3, d / 2); } catch (e) { finish(true, { poster: frame(v, v.videoWidth, v.videoHeight), duration: d }); }
      };
      v.onerror = () => finish(false, new Error('video'));
      v.src = url;
    });
  }

  const fmtDur = (s) => { s = Math.max(0, Math.round(s || 0)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };

  window.YK_MEDIA = { put, get, del, prune, frame, compressImage, probeVideo, fmtDur };
})();
