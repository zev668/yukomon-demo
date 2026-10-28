/* Yukomon demo - local product state.
 * The demo mirrors the server contracts from the PRD: species cards, lifetime
 * rank points, set progress and privacy-aware map cells. It intentionally uses
 * deterministic local data until the production API is connected.
 */
(function () {
  const SOURCE_SPECIES = window.YK_SPECIES;
  const SPECIES = SOURCE_SPECIES.map((s) => ({
    ...s,
    rankSizeCapCm: Number(s.rankSizeCapCm || s.commonCm * 2),
    giantThresholdCm: Number(s.giantThresholdCm || s.rankSizeCapCm || s.commonCm * 2),
  }));
  const PROTECTED = window.YK_PROTECTED;
  const byId = Object.fromEntries(SPECIES.map((s) => [s.no, s]));
  const KEY = 'yukomon-demo-v2';
  const SCORE = { N: 10, R: 20, SR: 40, SSR: 80 };
  const STAR_STEPS = [100, 200, 300, 400, 500];
  const TIERS = [
    { name: '初见', min: 0, color: '#87919a' },
    { name: '浅滩', min: 500, color: '#4eaa93' },
    { name: '溪流', min: 1000, color: '#4c8ed9' },
    { name: '江河', min: 1500, color: '#6b66c2' },
    { name: '深潭', min: 2000, color: '#d39c3b' },
    { name: '巨物', min: 2500, color: '#d96855' },
    { name: '传奇', min: 3000, color: '#b05bb8' },
    { name: '钓圣', min: 3500, color: '#c28c35' },
  ];
  const SETS = [
    { id: 'lake', name: '湖库静水', description: '湖泊、水库与开阔静水', habitats: ['lake', 'reservoir'], rewardScore: 50, sort: 1 },
    { id: 'pond', name: '池塘近岸', description: '池塘、沟渠和近岸静水', habitats: ['pond'], rewardScore: 50, sort: 2 },
    { id: 'river', name: '江河流域', description: '江河中下游和大江大湖', habitats: ['river'], rewardScore: 100, sort: 3 },
    { id: 'stream', name: '山溪急流', description: '溪流、浅滩与石缝水域', habitats: ['stream'], rewardScore: 50, sort: 4 },
    { id: 'estuary', name: '河口洄游', description: '河口与咸淡水交界', habitats: ['estuary'], rewardScore: 100, sort: 5 },
    { id: 'cold', name: '冷水冰钓', description: '冷水河流、高原与冰钓', habitats: ['cold'], rewardScore: 100, sort: 6 },
  ];
  const SET_BY_ID = Object.fromEntries(SETS.map((set) => [set.id, set]));
  const { rng, hash } = window.YK_FISH;

  const CITIES = {
    杭州: { lat: 30.27, lng: 120.15, districts: ['西湖区', '淳安县', '余杭区', '富阳区'], places: ['千岛湖', '西溪湿地', '富春江', '苕溪'] },
    上海: { lat: 31.23, lng: 121.47, districts: ['青浦区', '浦东新区', '松江区'], places: ['淀山湖', '滴水湖', '黄浦江'] },
    武汉: { lat: 30.59, lng: 114.3, districts: ['江夏区', '东西湖区', '洪山区'], places: ['梁子湖', '东湖', '汤逊湖'] },
    成都: { lat: 30.66, lng: 104.07, districts: ['都江堰市', '双流区', '大邑县'], places: ['岷江', '西河', '白沙河'] },
    广州: { lat: 23.13, lng: 113.26, districts: ['从化区', '番禺区', '增城区'], places: ['流溪河', '珠江', '增江'] },
    北京: { lat: 39.9, lng: 116.4, districts: ['怀柔区', '密云区', '顺义区'], places: ['怀柔水库', '潮白河', '白河峡谷'] },
    哈尔滨: { lat: 45.8, lng: 126.53, districts: ['道里区', '松北区', '呼兰区'], places: ['松花江', '呼兰河', '西泉眼水库'] },
    乌鲁木齐: { lat: 43.83, lng: 87.62, districts: ['天山区', '米东区'], places: ['乌伦古湖', '额尔齐斯河', '柴窝堡湖'] },
  };
  const MAP_SEEDS = [
    ['杭州', '西溪湿地', '001', 'u14', 18], ['杭州', '千岛湖', '031', 'u38', 9],
    ['杭州', '富春江', '047', 'u71', 7], ['武汉', '梁子湖', '073', 'u9', 12],
    ['武汉', '东湖', '020', 'u42', 15], ['成都', '岷江', '060', 'u65', 8],
    ['哈尔滨', '松花江', '078', 'u22', 10], ['北京', '怀柔水库', '002', 'u51', 6],
  ];

  function uuid() { return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4); }
  function dateKey(value) { const d = new Date(value); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; }
  function setIdFor(sp) { return SETS.find((set) => set.habitats.includes(sp.habitat))?.id || 'lake'; }
  function setForSpecies(speciesId) { return SET_BY_ID[setIdFor(byId[speciesId])] || SETS[0]; }
  function tierFor(points) {
    let current = TIERS[0];
    TIERS.forEach((tier) => { if (points >= tier.min) current = tier; });
    const index = TIERS.indexOf(current);
    const next = TIERS[index + 1] || null;
    const within = points - current.min;
    return { ...current, index, stars: Math.min(5, Math.floor(within / 100)), next, toNext: next ? next.min - points : null };
  }
  function sizeMultiplier(sp, length) {
    const n = Number(length);
    if (!Number.isFinite(n) || n <= 0) return 0.5;
    if (n <= sp.commonCm) return 0.8;
    if (n < sp.commonCm * 1.5) return 1;
    if (n < sp.rankSizeCapCm) return 1.3;
    return 1.6;
  }
  function repeatMultiplier(n) { return n <= 3 ? 1 : n <= 6 ? 0.7 : 0.3; }
  function activeCatch(c) { return c.status === 'confirmed' && c.speciesId && c.source === 'camera'; }
  function updateGiant(card, c) {
    card.giant ||= { status: 'none', catchId: null, lengthCm: null, approvedAt: null };
    if (activeCatch(c) && c.lengthCm >= byId[c.speciesId].giantThresholdCm && c.lengthCm > (card.giant.lengthCm || 0)) {
      card.giant = { status: 'approved', catchId: c.id, lengthCm: c.lengthCm, approvedAt: c.createdAt };
    }
  }

  function emptyDB() {
    return {
      v: 2,
      me: { id: 'me', nickname: '大鱼', city: '杭州', bio: '周末钓鱼，工作日想钓鱼' },
      settings: { sfx: true, haptics: true },
      catches: [], cards: {}, rank: { points: 0, tier: '初见', stars: 0, peakPoints: 0, peakTier: '初见', verifiedCatchCount: 0, uniqueSpeciesCount: 0, setCompletedCount: 0 },
      rankEvents: [], setProgress: {}, mapSettings: { enabled: false },
      gear: { rod: '', reel: '', line: '', bait: '' }, gearHistory: { rod: [], reel: [], line: [], bait: [] },
      draft: null, likes: {}, daily: null,
    };
  }

  let db;
  function load() {
    let stored = null;
    try { stored = JSON.parse(localStorage.getItem(KEY)); } catch (e) { stored = null; }
    if (!stored) {
      // First-run demo data keeps the prototype immediately explorable. A user
      // can still clear it from settings via the existing reset/wipe actions.
      db = window.YK_RUNTIME?.production ? emptyDB() : seed();
      save();
      return db;
    }
    db = stored;
    if (db.v !== 2) db = migrateLegacy(db);
    migrate(); rebuildDerived(); return db;
  }
  function migrateLegacy(old) {
    const next = emptyDB(); if (!old) return next;
    next.me = { ...next.me, ...(old.me || {}) }; next.settings = { ...next.settings, ...(old.settings || {}) };
    next.gear = { ...next.gear, ...(old.gear || {}) }; next.gearHistory = { ...next.gearHistory, ...(old.gearHistory || {}) }; next.draft = old.draft || null;
    next.catches = (old.catches || []).map((c) => ({ ...c, mapVisibility: c.source === 'album' ? 'private' : 'private', recognitionStatus: c.recognitionStatus || (c.speciesId ? 'manual' : 'idle') }));
    return next;
  }
  function migrate() {
    db.v = 2; db.me = { ...emptyDB().me, ...(db.me || {}) }; db.settings = { ...emptyDB().settings, ...(db.settings || {}) };
    db.catches = Array.isArray(db.catches) ? db.catches : []; db.catches.forEach((c) => { c.mapVisibility = c.source === 'album' ? 'private' : (c.mapVisibility || 'private'); c.recognitionStatus = c.recognitionStatus || (c.speciesId ? 'manual' : 'idle'); delete c.bestLengthCm; delete c.bestCatchId; delete c.giant; delete c.stars; delete c.verifiedCount; delete c.verifiedUnlocked; });
    db.draft = db.draft || null; db.mapSettings = { enabled: false, ...(db.mapSettings || {}) }; db.likes = db.likes || {};
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) { throw new Error('本机存储空间不足，请先导出记录或连接服务器'); } document.dispatchEvent(new CustomEvent('yk-store-save')); }
  function reset() { localStorage.removeItem(KEY); db = seed(); save(); }
  function wipe() { localStorage.removeItem(KEY); db = emptyDB(); save(); }

  function seed() {
    db = emptyDB(); const now = Date.now(), day = 86400000;
    const plan = [
      ['001', 26, 22, '杭州', true, '周末第一竿，西溪边上的板鲫'], ['008', 24, 14, '杭州', true, '白条闹窝，一下午全是它'], ['001', 20, 28, '杭州', true, '又是鲫鱼，红虫比商品饵好使'], ['031', 15, 52, '杭州', true, '千岛湖第一条翘嘴，清晨五点米诺远投'], ['020', 12, 21, '武汉', true, '夜钓黄辣丁，嘎嘎叫，还被扎了一下'], ['036', 9, 58, '武汉', true, '草洞炸水，雷蛙一抛就中'], ['001', 7, 24, '杭州', true, '又一条板鲫'], ['047', 5, 19, '杭州', true, '婚姻色的马口，溪流里的彩虹'], ['002', 3, 64, '杭州', false, '相册补录：去年的鲤鱼'], ['022', 1, 86, '杭州', true, '夜钓鲇鱼，量鱼板都放不下了'], ['058', 18, 84, '武汉', true, '江边缓流钓到南方鲇'], ['060', 11, 17, '杭州', true, '山溪里的光唇鱼'], ['073', 6, 96, '杭州', true, '水库守到一条青鱼'], ['078', 2, 72, '哈尔滨', true, '北方水库的黑斑狗鱼'],
    ];
    plan.forEach(([no, ago, len, city, camera, desc], i) => { const c = CITIES[city], r = rng(i * 97 + 3); db.catches.push({ id: `demo-catch-${i + 1}`, status: 'confirmed', speciesId: no, photo: null, source: camera ? 'camera' : 'album', verified: camera, location: { lat: c.lat + (r() - 0.5) * 0.08, lng: c.lng + (r() - 0.5) * 0.08, city, district: c.districts[i % c.districts.length], place: c.places[i % c.places.length] }, desc, gear: {}, lengthCm: len, released: i % 3 === 0, mapVisibility: camera && i % 3 !== 1 ? 'grid' : 'private', recognitionStatus: 'confirmed', recognitionProvider: 'client_stub', recognitionConfidence: 0.9, createdAt: now - ago * day - i * 3600000, likesBase: i * 3 }); });
    rebuildDerived(); db.gear = { rod: '路亚竿 2.1m ML', reel: '纺车轮 2500型', line: 'PE 1.0号', bait: '米诺 9cm' }; db.gearHistory = { rod: ['路亚竿 2.1m ML', '台钓竿 4.5m', '溪流竿 1.8m UL'], reel: ['纺车轮 2500型', '水滴轮 7.2速比'], line: ['PE 1.0号', '尼龙 1.5号'], bait: ['米诺 9cm', '商品饵', '亮片 2g'] }; return db;
  }
  function fillDemo(persist = true) { db = seed(); if (persist) save(); return db; }

  function rebuildDerived() {
    const cards = {}, events = [], owned = new Set(), completed = new Set(), ordered = db.catches.filter((c) => c.status === 'confirmed' && c.speciesId).slice().sort((a, b) => a.createdAt - b.createdAt); let points = 0;
    ordered.forEach((c) => {
      const sp = byId[c.speciesId]; if (!sp) return; const card = cards[sp.no] || (cards[sp.no] = { speciesId: sp.no, catchCount: 0, firstCatchId: c.id, firstUnlockedAt: c.createdAt, lastCatchAt: c.createdAt }); card.catchCount += 1; card.lastCatchAt = Math.max(card.lastCatchAt, c.createdAt); updateGiant(card, c); const isFirst = !owned.has(sp.no);
      if (activeCatch(c)) { const prior = ordered.filter((x) => activeCatch(x) && x.speciesId === sp.no && x.createdAt < c.createdAt && dateKey(x.createdAt) === dateKey(c.createdAt)).length; const firstBonus = isFirst ? 20 : 0; const baseScore = SCORE[sp.rarity] || SCORE.N; const size = sizeMultiplier(sp, c.lengthCm); const repeat = repeatMultiplier(prior + 1); const total = Math.floor(baseScore * size * repeat) + firstBonus; points += total; events.push({ id: `event-${c.id}`, catchId: c.id, eventType: 'catch', baseScore, sizeMultiplier: size, repeatMultiplier: repeat, bonusScore: firstBonus, totalScore: total, status: 'active', createdAt: c.createdAt, scoreVersion: 'rank-v1' }); }
      owned.add(sp.no);
      SETS.forEach((set) => { const members = SPECIES.filter((x) => set.habitats.includes(x.habitat)); if (!completed.has(set.id) && members.length && members.every((x) => owned.has(x.no))) { completed.add(set.id); points += set.rewardScore; events.push({ id: `set-${set.id}`, eventType: 'set_complete', setId: set.id, bonusScore: set.rewardScore, totalScore: set.rewardScore, status: 'active', createdAt: c.createdAt, scoreVersion: 'rank-v1' }); } });
    });
    const tier = tierFor(points), peak = Math.max(db.rank?.peakPoints || 0, points); db.cards = cards; db.rankEvents = events.sort((a, b) => b.createdAt - a.createdAt); db.rank = { points, tier: tier.name, stars: tier.stars, peakPoints: peak, peakTier: tierFor(peak).name, verifiedCatchCount: ordered.filter(activeCatch).length, uniqueSpeciesCount: [...owned].length, setCompletedCount: completed.size }; db.setProgress = {};
    SETS.forEach((set) => { const members = SPECIES.filter((x) => set.habitats.includes(x.habitat)), unlockedCount = members.filter((x) => owned.has(x.no)).length; db.setProgress[set.id] = { unlockedCount, totalCount: members.length, completedAt: completed.has(set.id) ? Date.now() : null, rewardClaimedAt: completed.has(set.id) ? Date.now() : null }; });
  }
  function scorePreview(form) { const sp = byId[form.speciesId]; if (!sp || form.source !== 'camera') return { points: 0, baseScore: 0, sizeMultiplier: 0, repeatMultiplier: 1, firstBonus: 0 }; const prior = db.catches.filter((c) => activeCatch(c) && c.speciesId === sp.no && dateKey(c.createdAt) === dateKey(Date.now())).length, firstBonus = db.cards[sp.no] ? 0 : 20, size = sizeMultiplier(sp, form.lengthCm), repeat = repeatMultiplier(prior + 1); return { points: Math.floor((SCORE[sp.rarity] || SCORE.N) * size * repeat) + firstBonus, baseScore: SCORE[sp.rarity] || SCORE.N, sizeMultiplier: size, repeatMultiplier: repeat, firstBonus }; }
  function settle(c) {
    const previous = db.cards[c.speciesId], before = db.rank?.points || 0;
    const priorEvents = new Set(db.rankEvents.map(e => e.id));
    db.catches.unshift(c); rebuildDerived();
    const card = db.cards[c.speciesId], points = Math.max(0, db.rank.points - before);
    const events = [...(!previous ? ['new'] : []), ...(points ? ['score'] : [])];
    if (card.giant.status === 'approved' && card.giant.catchId === c.id) events.push(previous?.giant?.status === 'approved' ? 'giant_record' : 'giant');
    return { events, catchObj: c, card, species: byId[c.speciesId], points, scoreEvents: db.rankEvents.filter(e => !priorEvents.has(e.id)), rank: db.rank, dex: dexProgress() };
  }
  function checkin(form, speciesId) {
    const source = form.sample ? 'sample' : form.source;
    const c = { id: uuid(), status: 'confirmed', speciesId, photoHash: form.photo ? hash(form.photo) : null, photo: form.photo, videoId: form.videoId || null, duration: form.duration || 0, source, verified: source === 'camera', location: form.location, desc: form.desc, gear: { ...form.gear }, lengthCm: form.lengthCm || null, released: form.released, mapVisibility: source !== 'camera' ? 'private' : (form.mapVisibility || 'private'), recognitionStatus: form.recognitionStatus || 'manual', recognitionProvider: form.recognitionProvider || 'client_stub', recognitionModel: form.recognitionModel || 'demo-fish-v0', recognitionConfidence: form.recognitionConfidence || null, createdAt: Date.now(), likesBase: 0 };
    db.gear = { ...form.gear };
    ['rod', 'reel', 'line', 'bait'].forEach(k => { const v = (form.gear[k] || '').trim(); if (v) db.gearHistory[k] = [v, ...db.gearHistory[k].filter(x => x !== v)].slice(0, 5); });
    db.draft = null; const beforeRank = rankOf('nation').me, res = settle(c); commitQuota(c.createdAt); const afterRank = rankOf('nation').me;
    res.rankDelta = beforeRank && afterRank ? beforeRank.rank - afterRank.rank : 0; save(); return res;
  }
  function encounter(form, p) { const c = { id: uuid(), status: 'protected', speciesId: null, protectedName: p.name, protectedLatin: p.latin, protectedLevel: p.level, videoId: form.videoId || null, duration: form.duration || 0, photoHash: form.photo ? hash(form.photo) : null, photo: form.photo, source: form.source, verified: false, location: form.location, desc: form.desc || `遇见${p.name}，已放归`, gear: { ...form.gear }, lengthCm: null, released: true, mapVisibility: 'private', recognitionStatus: 'confirmed', createdAt: Date.now() }; db.catches.unshift(c); db.draft = null; commitQuota(c.createdAt); save(); return c; }
  function commitQuota(now) { const today = new Date(now).toDateString(); if (!db.daily || db.daily.date !== today) db.daily = { date: today, count: 0, recent: [] }; db.daily.count++; db.daily.recent = [...(db.daily.recent || []).filter((t) => now - t < 60000), now]; }
  function precheck(form) { const today = new Date().toDateString(); if (!db.daily || db.daily.date !== today) db.daily = { date: today, count: 0, recent: [] }; if (db.daily.count >= 30) return '今天记录的渔获已到上限（每日 30 条）'; const now = Date.now(); db.daily.recent = (db.daily.recent || []).filter((t) => now - t < 60000); if (db.daily.recent.length >= 3) return '操作太频繁了，请 1 分钟后再试'; if (form.photo && db.catches.some((c) => c.photoHash === hash(form.photo))) return '这张照片已经记录过了'; return null; }

  function likesOf(c) { const liked = !!db.likes[c.id]; return { count: (c.likesBase != null ? c.likesBase : Math.floor(rng(hash(String(c.id)))() * 40)) + (liked ? 1 : 0), liked }; }
  function toggleLike(c) { if (db.likes[c.id]) delete db.likes[c.id]; else db.likes[c.id] = Date.now(); save(); return likesOf(c); }
  function removeCatch(id) { if (!db.catches.some((x) => x.id === id)) return; db.catches = db.catches.filter((x) => x.id !== id); rebuildDerived(); save(); }
  function updateCatch(id, patch) { const c = db.catches.find((x) => x.id === id); if (!c) return; ['desc', 'released', 'mapVisibility'].forEach((k) => { if (k in patch) c[k] = patch[k]; }); if (patch.gear) c.gear = { ...c.gear, ...patch.gear }; save(); }
  function dexProgress() { const cards = Object.values(db.cards), by = { N: 0, R: 0, SR: 0, SSR: 0 }, totalBy = { N: 0, R: 0, SR: 0, SSR: 0 }; SPECIES.forEach((s) => { totalBy[s.rarity]++; if (db.cards[s.no]) by[s.rarity]++; }); return { unlocked: cards.length, total: SPECIES.length, by, totalBy }; }

  const NAMES = ['钓神老李', '江湖客', '阿强', '路亚少年', '翘嘴猎人', '野钓王', '溪流飞蝇', '鱼痴', '小鱼儿', '老王', '夜钓达人', '东北狗鱼控', '马口收藏家', '千岛湖老张', '鳜鱼杀手', '台钓萌新'];
  const BIOS = ['只钓野河，不进黑坑', '路亚三年，还在找第一条鳜鱼', '钓鱼不为吃，为了那一下顿口', '凌晨四点的水库最安静', '溪流马口收集中', '拍照、量长、放流'];
  let mockUsers = null;
  function mocks() { if (mockUsers) return mockUsers; const r = rng(20260818), cities = Object.keys(CITIES); mockUsers = []; for (let i = 0; i < 90; i++) { const skill = Math.pow(r(), 1.55), owned = SPECIES.slice().sort((a, b) => (SCORE[a.rarity] - SCORE[b.rarity]) + (r() - 0.5) * 8 * (1 - skill)).slice(0, Math.max(1, Math.round(skill * 56 + r() * 4))), points = Math.round(owned.reduce((sum, s) => sum + (SCORE[s.rarity] || 10) * (0.7 + r() * 0.8), 0) + skill * 300); mockUsers.push({ id: `u${i}`, nickname: NAMES[i % NAMES.length] + (i >= NAMES.length ? Math.floor(i / NAMES.length) + 1 : ''), bio: BIOS[i % BIOS.length], city: cities[Math.floor(r() * cities.length)], points, uniqueSpeciesCount: owned.length, setCompletedCount: Math.floor(r() * 3), reachedAt: Date.now() - Math.floor(r() * 90) * 86400000, owned: owned.map((s) => s.no), seed: 1000 + i * 131, joinedDays: 30 + Math.floor(r() * 700) }); } return mockUsers; }
  function meEntry() { const r = db.rank; if (!r.verifiedCatchCount) return null; const tier = tierFor(r.points); return { id: 'me', nickname: db.me.nickname, bio: db.me.bio, city: db.me.city, me: true, points: r.points, tier: tier.name, stars: tier.stars, uniqueSpeciesCount: r.uniqueSpeciesCount, setCompletedCount: r.setCompletedCount, reachedAt: Date.now(), owned: Object.keys(db.cards) }; }
  function rankOf(scope) {
    const entry = (u, catches) => {
      const first = new Map();
      catches.filter(activeCatch).forEach((c) => first.set(c.speciesId, Math.min(first.get(c.speciesId) ?? Infinity, c.createdAt)));
      const owned = [...first.keys()].sort((a, b) => SCORE[byId[b].rarity] - SCORE[byId[a].rarity] || a.localeCompare(b));
      return { ...u, count: owned.length, best: owned[0], reachedAt: Math.max(0, ...first.values()) };
    };
    const list = mocks().map((u) => entry(u, profileOf(u.id).catches));
    list.push(entry({ ...db.me, id: 'me', me: true }, db.catches));
    const ranked = list.filter((u) => u.count && (scope !== 'city' || u.city === db.me.city));
    ranked.sort((a, b) => b.count - a.count || a.reachedAt - b.reachedAt || a.id.localeCompare(b.id));
    ranked.forEach((u, i) => (u.rank = i + 1));
    return { top: ranked.slice(0, 100), me: ranked.find((u) => u.me) || null, total: ranked.length, generatedAt: Date.now() };
  }
  function ladderRankOf(scope) { let list = mocks().map((u) => { const tier = tierFor(u.points); return { ...u, tier: tier.name, stars: tier.stars }; }), me = meEntry(); if (me) list.push(me); if (scope === 'city') list = list.filter((u) => u.city === db.me.city); list.sort((a, b) => b.points - a.points || b.uniqueSpeciesCount - a.uniqueSpeciesCount || b.setCompletedCount - a.setCompletedCount || a.reachedAt - b.reachedAt || a.id.localeCompare(b.id)); list.forEach((u, i) => (u.rank = i + 1)); return { top: list.slice(0, 100), me: list.find((u) => u.me) || null, total: list.length, generatedAt: Date.now() }; }
  function sizeRankOf(speciesId, scope) {
    const row = (u, catches) => {
      const best = catches.filter((c) => activeCatch(c) && c.speciesId === speciesId && Number(c.lengthCm) > 0)
        .sort((a, b) => b.lengthCm - a.lengthCm || a.createdAt - b.createdAt || a.id.localeCompare(b.id))[0];
      return best ? [{ id: u.id, me: !!u.me, nickname: u.nickname, city: u.city, place: best.location?.city || u.city, lengthCm: Number(best.lengthCm), at: best.createdAt }] : [];
    };
    let list = mocks().flatMap((u) => row(u, profileOf(u.id).catches));
    list.push(...row({ ...db.me, id: 'me', me: true }, db.catches));
    if (scope === 'city') list = list.filter((u) => u.city === db.me.city);
    list.sort((a, b) => b.lengthCm - a.lengthCm || a.at - b.at || a.id.localeCompare(b.id));
    list.forEach((u, i) => (u.rank = i + 1));
    return { top: list.slice(0, 100), me: list.find((u) => u.me) || null, total: list.length };
  }
  function profileOf(userId) { if (userId === 'me') return { user: meEntry(), catches: db.catches, cards: db.cards }; const u = mocks().find((x) => x.id === userId); if (!u) return null; const r = rng(u.seed), catches = []; u.owned.forEach((no, idx) => { const sp = byId[no], times = 1 + Math.floor(r() * r() * 4); for (let k = 0; k < times; k++) { const c = CITIES[u.city]; catches.push({ id: `${u.id}-${idx}-${k}`, speciesId: no, verified: true, status: 'confirmed', source: 'camera', lengthCm: Math.round(sp.commonCm * (0.7 + r() * 0.7)), desc: BIOS[Math.floor(r() * BIOS.length)], location: { city: u.city, place: c.places[Math.floor(r() * c.places.length)], lat: c.lat, lng: c.lng }, createdAt: Date.now() - Math.floor(r() * u.joinedDays) * 86400000, released: r() < 0.6, mapVisibility: r() < 0.7 ? 'grid' : 'private' }); } }); const cards = {}; catches.forEach((c) => { const card = cards[c.speciesId] || (cards[c.speciesId] = { speciesId: c.speciesId, catchCount: 0, firstCatchId: c.id, firstUnlockedAt: c.createdAt }); card.catchCount++; }); return { user: u, catches: catches.sort((a, b) => b.createdAt - a.createdAt), cards }; }

  function mapCells(filters = {}) { const rows = []; db.catches.filter((c) => c.status === 'confirmed' && c.source === 'camera' && c.mapVisibility === 'grid').forEach((c) => rows.push({ ...c, nickname: db.me.nickname })); MAP_SEEDS.forEach(([city, place, speciesId, userId, count], i) => { const u = mocks().find((x) => x.id === userId) || mocks()[i]; const c = CITIES[city]; for (let j = 0; j < count; j++) rows.push({ id: `map-${i}-${j}`, speciesId, nickname: u.nickname, status: 'confirmed', source: 'camera', mapVisibility: 'grid', lengthCm: Math.round(byId[speciesId].commonCm * (0.8 + ((j * 13) % 40) / 100)), desc: '公开钓友渔获', createdAt: Date.now() - (j + i) * 86400000, location: { city, district: c.districts[i % c.districts.length], place } }); }); const filtered = rows.filter((row) => { const sp = byId[row.speciesId]; if (!sp) return false; if (filters.speciesId && filters.speciesId !== 'all' && row.speciesId !== filters.speciesId) return false; if (filters.setId && filters.setId !== 'all' && setIdFor(sp) !== filters.setId) return false; if (filters.rarity && filters.rarity !== 'all' && sp.rarity !== filters.rarity) return false; if (filters.city && filters.city !== 'all' && row.location.city !== filters.city) return false; if (filters.days && filters.days !== 'all' && Date.now() - row.createdAt > Number(filters.days) * 86400000) return false; return true; }); const groups = new Map(); filtered.forEach((row) => { const key = `${row.location.city}-${row.location.place}`; const cell = groups.get(key) || { id: `cell-${hash(key)}`, city: row.location.city, district: row.location.district, place: row.location.place, lat: CITIES[row.location.city].lat, lng: CITIES[row.location.city].lng, records: [], publicUserCount: new Set(), species: new Set(), latestAt: row.createdAt }; cell.records.push(row); cell.publicUserCount.add(row.nickname); cell.species.add(row.speciesId); cell.latestAt = Math.max(cell.latestAt, row.createdAt); groups.set(key, cell); }); return [...groups.values()].map((cell) => ({ ...cell, publicUserCount: cell.publicUserCount.size, speciesCount: cell.species.size, catchCount: cell.records.length, records: cell.records.sort((a, b) => b.createdAt - a.createdAt).slice(0, 12) })).sort((a, b) => b.latestAt - a.latestAt); }

  function confusableTip(sp) { const tips = { onychostoma: '白甲鱼 vs 多鳞白甲鱼（国家二级保护）：多鳞白甲鱼侧线鳞更多', schizothorax: '齐口裂腹鱼 vs 重口裂腹鱼（国家二级保护）：重口裂腹鱼下唇肥厚', anguilla: '日本鳗鲡 vs 花鳗鲡（国家二级保护）：花鳗鲡体表有大理石花纹', salmonid: '虹鳟/褐鳟 vs 哲罗鲑、细鳞鲑：注意体侧斑点与分布地区' }; return tips[sp.confusableGroup] || ''; }

  window.YK_STORE = { load, save, reset, wipe, fillDemo, get db() { return db; }, replace(next) { db = next; save(); }, SPECIES, PROTECTED, byId, CITIES, SETS, SCORE, TIERS, STAR_STEPS, setIdFor, setForSpecies, tierFor, sizeMultiplier, repeatMultiplier, confusableTip, checkin, encounter, removeCatch, updateCatch, precheck, scorePreview, likesOf, toggleLike, dexProgress, rankOf, ladderRankOf, sizeRankOf, profileOf, mapCells, uuid, starsFor(n) { return Math.min(5, Math.max(0, Math.floor(n))); } };
})();
