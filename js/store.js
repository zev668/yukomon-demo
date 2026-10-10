/* Yukomon demo —— 本地数据层（模拟云函数：catch.create / remove、card.dex、rank.query、user.profile）
 * 业务规则与《开发文档》5.3–5.7、《产品设计文档》5 节一致；数据存 localStorage */
(function () {
  const SPECIES = window.YK_SPECIES;
  const PROTECTED = window.YK_PROTECTED;
  const byId = Object.fromEntries(SPECIES.map((s) => [s.no, s]));
  const KEY = 'yukomon-demo-v1';
  const STAR_STEPS = [1, 3, 7, 15, 30];
  const SCORE = { N: 1, R: 2, SR: 4, SSR: 8 }; // 仅用于按稀有度排序，不再对外展示积分
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

  function uuid() {
    return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
  }

  // ---------- 持久化 ----------
  let db;
  function load() {
    try {
      db = JSON.parse(localStorage.getItem(KEY));
    } catch (e) {
      db = null;
    }
    if (!db || db.v !== 1) db = seed();
    migrate();
    return db;
  }
  function migrate() {
    db.me.bio = db.me.bio == null ? '周末钓鱼，工作日想钓鱼' : db.me.bio;
    db.gear = { rod: '', reel: '', line: '', bait: '', ...db.gear };
    db.gearHistory = { rod: [], reel: [], line: [], bait: [], ...db.gearHistory };
    const fix = (c) => {
      if (c.desc == null) c.desc = [c.title, c.subtitle].filter(Boolean).join('，');
      delete c.title;
      delete c.subtitle;
      c.gear = { reel: '', ...(c.gear || {}) };
    };
    db.catches.forEach(fix);
    if (db.draft) fix(db.draft);
    db.likes = db.likes || {};
    // 旧数据里"审核中"的巨物：概念已取消，按现有渔获重算巨物卡
    Object.keys(db.cards).forEach((no) => {
      const gi = db.cards[no].giant || {};
      if (gi.status === 'pending' || 'pendingCatchId' in gi) rebuildCard(no);
    });
  }
  function save() {
    // localStorage 约 5MB：超出时从最旧的渔获开始丢弃照片（正式版照片在云存储，无此问题）
    for (let i = 0; i < 50; i++) {
      try {
        localStorage.setItem(KEY, JSON.stringify(db));
        return;
      } catch (e) {
        const old = db.catches.slice().reverse().find((c) => c.photo);
        if (!old) return;
        old.photo = null;
      }
    }
  }
  function reset() {
    localStorage.removeItem(KEY);
    db = seed();
    save();
  }
  // 注销账号：删除全部数据，不再预置演示数据
  function wipe() {
    localStorage.removeItem(KEY);
    db = emptyDB();
    save();
  }

  function emptyDB() {
    return {
      v: 1,
      me: { id: 'me', nickname: '大鱼', city: '杭州', bio: '周末钓鱼，工作日想钓鱼' },
      settings: { sfx: true, haptics: true },
      catches: [],
      cards: {},
      gear: { rod: '', reel: '', line: '', bait: '' },
      gearHistory: { rod: [], reel: [], line: [], bait: [] },
      draft: null,
      lastRank: null,
    };
  }

  // 演示用：预置几条历史渔获，让图鉴/排行榜不是空的
  function seed() {
    db = emptyDB();
    const now = Date.now();
    const day = 86400000;
    const plan = [
      ['001', 26, 22, '杭州', true, '周末第一竿，西溪边上的板鲫', { rod: '台钓竿 4.5m', line: '尼龙 1.5号', bait: '商品饵' }],
      ['008', 24, 14, '杭州', true, '白条闹窝，一下午全是它', { rod: '台钓竿 3.6m', line: '尼龙 0.8号', bait: '拉饵' }],
      ['001', 20, 28, '杭州', true, '又是鲫鱼，红虫比商品饵好使', { rod: '台钓竿 4.5m', line: '尼龙 1.5号', bait: '红虫' }],
      ['031', 15, 52, '杭州', true, '千岛湖第一条翘嘴，清晨五点米诺远投，搏鱼三分钟', { rod: '路亚竿 2.1m ML', reel: '纺车轮 2500型', line: 'PE 1.0号', bait: '米诺 9cm' }],
      ['020', 12, 21, '武汉', true, '夜钓黄辣丁，嘎嘎叫，还被扎了一下', { rod: '台钓竿 5.4m', line: '尼龙 2.0号', bait: '蚯蚓' }],
      ['036', 9, 58, '武汉', true, '草洞炸水，雷蛙一抛就中', { rod: '雷强竿 2.1m H', reel: '水滴轮 7.2速比', line: 'PE 6.0号', bait: '雷蛙' }],
      ['001', 7, 24, '杭州', true, '', { rod: '台钓竿 4.5m', line: '尼龙 1.5号', bait: '商品饵' }],
      ['047', 5, 19, '杭州', true, '婚姻色的马口，溪流里的彩虹', { rod: '溪流竿 1.8m UL', reel: '纺车轮 1000型', line: 'PE 0.4号', bait: '亮片 2g' }],
      ['002', 3, 64, '杭州', false, '相册补录：去年的鲤鱼', { rod: '台钓竿 5.4m', line: '尼龙 3.0号', bait: '玉米' }],
      // 尺寸 ≥ 鲇的巨物线 80cm → 直接解锁巨物卡（UR）
      ['022', 1, 86, '杭州', true, '夜钓巨鲶，量鱼板都放不下了', { rod: '路亚竿 2.4m MH', reel: '纺车轮 4000型', line: 'PE 3.0号', bait: '软虫 12cm' }],
    ];
    plan.forEach(([no, ago, len, city, verified, desc, gear], i) => {
      const c = CITIES[city];
      const r = rng(i * 97 + 3);
      const catchObj = {
        id: uuid(),
        status: 'confirmed',
        speciesId: no,
        photo: null,
        source: verified ? 'camera' : 'album',
        verified,
        location: {
          lat: c.lat + (r() - 0.5) * 0.3, lng: c.lng + (r() - 0.5) * 0.3,
          city, district: c.districts[i % c.districts.length], place: c.places[i % c.places.length],
        },
        desc,
        gear: { reel: '', ...gear },
        lengthCm: len,
        released: i % 3 === 0,
        createdAt: now - ago * day - i * 3600000,
      };
      settle(catchObj);
    });
    db.gear = { rod: '路亚竿 2.1m ML', reel: '纺车轮 2500型', line: 'PE 1.0号', bait: '米诺 9cm' };
    db.gearHistory = {
      rod: ['路亚竿 2.1m ML', '台钓竿 4.5m', '溪流竿 1.8m UL', '雷强竿 2.1m H'],
      reel: ['纺车轮 2500型', '水滴轮 7.2速比', '纺车轮 1000型'],
      line: ['PE 1.0号', '尼龙 1.5号', 'PE 0.4号'],
      bait: ['米诺 9cm', '商品饵', '亮片 2g', '蚯蚓', '雷蛙'],
    };
    return db;
  }

  // ---------- 易混淆提示（用户自选鱼种时提醒保护物种近似种） ----------
  const CONFUSE_TIP = {
    onychostoma: '白甲鱼 vs 多鳞白甲鱼（国家二级保护）：多鳞白甲鱼侧线鳞更多（46–51 枚），分布于秦岭/华北山溪',
    schizothorax: '齐口裂腹鱼 vs 重口裂腹鱼（国家二级保护）：重口裂腹鱼下唇肥厚、分左右两叶',
    anguilla: '日本鳗鲡 vs 花鳗鲡（国家二级保护）：花鳗鲡体表有黄绿色大理石花纹',
    songjianglu: '花鲈 vs 松江鲈（国家二级保护）：松江鲈体小（<15cm）、头大而扁、无鳞',
    ochetobius: '赤眼鳟 vs 鳤（国家二级保护）：鳤体更细长、吻尖、眼上无红斑',
    luciobrama: '鳡 vs 鯮（国家二级保护）：鯮的吻部延长呈管状',
    salmonid: '虹鳟/褐鳟 vs 哲罗鲑、细鳞鲑（国家二级保护）：注意体侧斑点形态与分布地区',
  };
  function confusableTip(sp) {
    return CONFUSE_TIP[sp.confusableGroup] || '';
  }

  // ---------- 结算（开发文档 5.4） ----------
  function starsFor(n) {
    let s = 1;
    STAR_STEPS.forEach((step, i) => { if (n >= step) s = i + 1; });
    return s;
  }

  function settle(c) {
    db.catches.unshift(c);
    if (c.status !== 'confirmed') return { events: [c.status], catchObj: c };
    const sp = byId[c.speciesId];
    const key = sp.no;
    let card = db.cards[key];
    const events = [];
    if (!card) {
      card = db.cards[key] = {
        speciesId: key, catchCount: 0, verifiedCount: 0, stars: 1, verifiedUnlocked: false,
        firstCatchId: c.id, bestCatchId: null, bestLengthCm: null, unlockedAt: c.createdAt,
        giant: { status: 'none', catchId: null, lengthCm: null, approvedAt: null },
      };
      events.push('new');
    }
    card.catchCount += 1;
    if (c.verified) {
      card.verifiedCount += 1;
      const ns = starsFor(card.verifiedCount);
      if (ns > card.stars) { card.stars = ns; events.push('star_up'); }
      if (!card.verifiedUnlocked) card.verifiedUnlocked = true;
    }
    if (c.lengthCm && (!card.bestLengthCm || c.lengthCm > card.bestLengthCm)) {
      if (card.bestLengthCm && !events.includes('new')) events.push('record');
      card.bestLengthCm = c.lengthCm;
      card.bestCatchId = c.id;
    }
    if (c.verified && c.lengthCm && c.lengthCm >= sp.giantThresholdCm) {
      // 巨物：现场拍摄 + 达到巨物线，直接解锁巨物卡（没有审核环节）；更大的一条刷新巨物纪录
      if (card.giant.status !== 'approved') {
        card.giant = { status: 'approved', catchId: c.id, lengthCm: c.lengthCm, approvedAt: c.createdAt };
        events.push('giant');
      } else if (c.lengthCm > (card.giant.lengthCm || 0)) {
        card.giant = { ...card.giant, catchId: c.id, lengthCm: c.lengthCm, approvedAt: c.createdAt };
        events.push('giant_record');
      }
    }
    return { events, card, catchObj: c, species: sp };
  }

  /** 记录渔获：用户自选鱼种，提交即结算（没有 AI 识别与上传环节） */
  function checkin(form, speciesId) {
    const c = {
      id: uuid(),
      status: 'confirmed',
      speciesId,
      photoHash: form.photo ? hash(form.photo) : null,
      photo: form.photo,
      videoId: form.videoId || null, duration: form.duration || 0,
      source: form.source,
      verified: form.source === 'camera',
      location: form.location,
      desc: form.desc,
      gear: { ...form.gear },
      lengthCm: form.lengthCm || null,
      released: form.released,
      createdAt: Date.now(),
      likesBase: 0,
    };
    // 装备记忆
    db.gear = { ...form.gear };
    ['rod', 'reel', 'line', 'bait'].forEach((k) => {
      const v = (form.gear[k] || '').trim();
      if (!v) return;
      db.gearHistory[k] = [v, ...db.gearHistory[k].filter((x) => x !== v)].slice(0, 5);
    });
    db.draft = null;
    const before = rankOf('nation').me;
    const res = settle(c);
    const after = rankOf('nation').me;
    res.rankDelta = before && after ? before.rank - after.rank : 0;
    res.dex = dexProgress();
    save();
    return res;
  }

  /** 保护鱼类：不发卡、不计数，只记一条「遇见」 */
  function encounter(form, p) {
    const c = {
      id: uuid(), status: 'protected', speciesId: null,
      protectedName: p.name, protectedLatin: p.latin, protectedLevel: p.level,
      videoId: form.videoId || null, duration: form.duration || 0,
      photoHash: form.photo ? hash(form.photo) : null, photo: form.photo, source: form.source, verified: false,
      location: form.location, desc: form.desc || `遇见${p.name}，已放归`,
      gear: { ...form.gear }, lengthCm: null, released: true, createdAt: Date.now(),
    };
    db.catches.unshift(c);
    db.draft = null;
    save();
    return c;
  }

  // 提交前校验：每日渔获上限、频率、重复照片
  function precheck(form) {
    const today = new Date().toDateString();
    if (!db.daily || db.daily.date !== today) db.daily = { date: today, count: 0, recent: [] };
    if (db.daily.count >= 30) return '今天记录的渔获已到上限（每日 30 条）';
    const now = Date.now();
    db.daily.recent = (db.daily.recent || []).filter((t) => now - t < 60000);
    if (db.daily.recent.length >= 3) return '操作太频繁了，请 1 分钟后再试';
    if (form.photo) {
      const h = hash(form.photo);
      if (db.catches.some((c) => c.photoHash === h)) return '这张照片已经记录过了';
    }
    db.daily.count += 1;
    db.daily.recent.push(now);
    save();
    return null;
  }

  // ---------- 点赞（演示：本机记录"我赞过哪些渔获"，他人渔获的基础赞数由种子生成） ----------
  function baseLikes(c) {
    if (c.likesBase != null) return c.likesBase;
    return Math.floor(rng(hash(String(c.id)))() * 40);
  }
  function likesOf(c) {
    const liked = !!(db.likes && db.likes[c.id]);
    return { count: baseLikes(c) + (liked ? 1 : 0), liked };
  }
  function toggleLike(c) {
    db.likes = db.likes || {};
    if (db.likes[c.id]) delete db.likes[c.id];
    else db.likes[c.id] = Date.now();
    save();
    return likesOf(c);
  }

  // ---------- 删除 / 编辑（开发文档 5.7） ----------
  function removeCatch(id) {
    const c = db.catches.find((x) => x.id === id);
    if (!c) return;
    db.catches = db.catches.filter((x) => x.id !== id);
    if (c.status === 'confirmed') rebuildCard(c.speciesId);
    save();
  }
  function rebuildCard(speciesId) {
    const rest = db.catches.filter((x) => x.status === 'confirmed' && x.speciesId === speciesId).sort((a, b) => a.createdAt - b.createdAt);
    const old = db.cards[speciesId];
    if (!rest.length) {
      delete db.cards[speciesId];
      return;
    }
    const verified = rest.filter((x) => x.verified);
    const best = rest.filter((x) => x.lengthCm).sort((a, b) => b.lengthCm - a.lengthCm)[0];
    // 巨物卡跟着剩下的渔获重算：最大的一条达到巨物线就保留
    const sp = byId[speciesId];
    const g = verified.filter((x) => x.lengthCm && x.lengthCm >= sp.giantThresholdCm).sort((a, b) => b.lengthCm - a.lengthCm)[0];
    const giant = g ? { status: 'approved', catchId: g.id, lengthCm: g.lengthCm, approvedAt: g.createdAt } : { status: 'none', catchId: null, lengthCm: null, approvedAt: null };
    db.cards[speciesId] = {
      ...old,
      catchCount: rest.length,
      verifiedCount: verified.length,
      stars: verified.length ? starsFor(verified.length) : 1,
      verifiedUnlocked: verified.length > 0,
      firstCatchId: rest[0].id,
      unlockedAt: rest[0].createdAt,
      bestCatchId: best ? best.id : null,
      bestLengthCm: best ? best.lengthCm : null,
      giant,
    };
  }
  function updateCatch(id, patch) {
    const c = db.catches.find((x) => x.id === id);
    if (!c) return;
    ['desc', 'released'].forEach((k) => { if (k in patch) c[k] = patch[k]; });
    if (patch.gear) c.gear = { ...c.gear, ...patch.gear };
    save();
  }

  // ---------- 图鉴 ----------
  function dexProgress() {
    const cards = Object.values(db.cards);
    const by = { N: 0, R: 0, SR: 0, SSR: 0, UR: 0 };
    cards.forEach((c) => {
      by[byId[c.speciesId].rarity]++;
      if (c.giant.status === 'approved') by.UR++;
    });
    const total = { N: 0, R: 0, SR: 0, SSR: 0, UR: SPECIES.length };
    SPECIES.forEach((s) => total[s.rarity]++);
    return { unlocked: cards.length, total: SPECIES.length, by, totalBy: total };
  }

  // ---------- 排行榜（开发文档 5.6） ----------
  const NAMES = ['钓神老李', '江湖客', '阿强', '路亚少年', '翘嘴猎人', '野钓王', '溪流飞蝇', '鱼痴', '小鱼儿', '老王', '黑坑之王', '夜钓达人',
    '东北狗鱼控', '马口收藏家', '千岛湖老张', '鳜鱼杀手', '台钓萌新', '钓鱼佬永不空军', '水库巡逻员', '江南钓翁', '饵料大师', '渔获满满',
    '浮漂看我', '巨物追逐者', '岷江钓客', '冰钓爱好者', '新疆白斑', '梁子湖人', '流溪河鱼', '怀柔钓友', '松花江畔', '空军司令'];
  const BIOS = ['只钓野河，不进黑坑', '路亚三年，还在找第一条鳜鱼', '钓鱼不为吃，为了那一下顿口', '凌晨四点的水库最安静', '溪流马口收集中', '拍照、量长、放流', '家门口那条河就是全世界', '每年冬天去一次查干湖', '', '空军是常态，爆护是意外'];
  let mockUsers = null;
  function mocks() {
    if (mockUsers) return mockUsers;
    const r = rng(20260818);
    const cityNames = Object.keys(CITIES);
    mockUsers = [];
    for (let i = 0; i < 160; i++) {
      const skill = Math.pow(r(), 1.6);
      const count = Math.max(1, Math.round(skill * 64 + r() * 4));
      const pool = SPECIES.slice().sort((a, b) => (SCORE[a.rarity] - SCORE[b.rarity]) + (r() - 0.5) * 6 * (1 - skill));
      const owned = pool.slice(0, count);
      const urs = Math.floor(r() * r() * count * 0.15);
      const best = owned.slice().sort((a, b) => SCORE[b.rarity] - SCORE[a.rarity])[0];
      mockUsers.push({
        id: 'u' + i,
        nickname: NAMES[i % NAMES.length] + (i >= NAMES.length ? Math.floor(i / NAMES.length) + 1 : ''),
        bio: BIOS[Math.floor(r() * BIOS.length)],
        city: cityNames[Math.floor(r() * cityNames.length)],
        count, urs,
        reachedAt: Date.now() - Math.floor(r() * 90) * 86400000,
        best: best.no,
        top3: owned.slice().sort((a, b) => SCORE[b.rarity] - SCORE[a.rarity]).slice(0, 3).map((s) => s.no),
        byRarity: owned.reduce((m, s) => ((m[s.rarity] = (m[s.rarity] || 0) + 1), m), {}),
        owned: owned.map((s) => s.no),
        seed: 1000 + i * 131,
        joinedDays: 30 + Math.floor(r() * 700),
      });
    }
    return mockUsers;
  }

  // 他人主页：按用户种子确定性地生成公开渔获（只含公开字段：鱼种、城市级地点、日期、描述、尺寸）
  const DESCS = ['清晨第一口，浮漂一顿就黑了', '收竿前的惊喜', '跟了三个周末，总算上鱼', '老钓点又开口了', '顶流水作钓，小饵慢收贴底才咬', '冷锋前的爆护', '午后草边，拍完照就放了', '同行的钓友帮忙抄的网', '风有点大，好在浮漂还看得清', '终于见到你'];
  const profileCache = {};
  function profileOf(userId) {
    if (userId === 'me') return null;
    if (profileCache[userId]) return profileCache[userId];
    const u = mocks().find((x) => x.id === userId);
    if (!u) return null;
    const r = rng(u.seed);
    const homes = [u.city, ...Object.keys(CITIES).filter((c) => c !== u.city)];
    const catches = [];
    u.owned.forEach((no, idx) => {
      const sp = byId[no];
      const times = 1 + Math.floor(r() * r() * 5);
      for (let k = 0; k < times; k++) {
        const city = r() < 0.7 ? homes[0] : homes[1 + Math.floor(r() * (homes.length - 1))];
        const c = CITIES[city];
        const len = Math.round(sp.commonCm * (0.7 + r() * 0.7));
        catches.push({
          id: `${u.id}-${idx}-${k}`,
          speciesId: no,
          verified: true,
          status: 'confirmed',
          lengthCm: len,
          desc: DESCS[Math.floor(r() * DESCS.length)],
          location: {
            city, place: c.places[Math.floor(r() * c.places.length)],
            lat: c.lat + (r() - 0.5) * 0.5, lng: c.lng + (r() - 0.5) * 0.5,
          },
          createdAt: Date.now() - Math.floor(r() * u.joinedDays) * 86400000 - Math.floor(r() * 86400000),
          released: r() < 0.6,
        });
      }
    });
    catches.sort((a, b) => b.createdAt - a.createdAt);
    const cards = {};
    catches.forEach((c) => {
      const card = cards[c.speciesId] || (cards[c.speciesId] = { speciesId: c.speciesId, catchCount: 0, verifiedCount: 0, bestLengthCm: 0, unlockedAt: c.createdAt, giant: { status: 'none' } });
      card.catchCount++;
      card.verifiedCount++;
      card.bestLengthCm = Math.max(card.bestLengthCm, c.lengthCm);
      card.unlockedAt = Math.min(card.unlockedAt, c.createdAt);
    });
    Object.values(cards).forEach((card) => { card.stars = starsFor(card.verifiedCount); });
    // UR 巨物：从高稀有度里挑 u.urs 张
    Object.values(cards).sort((a, b) => SCORE[byId[b.speciesId].rarity] - SCORE[byId[a.speciesId].rarity]).slice(0, u.urs).forEach((card) => {
      const sp = byId[card.speciesId];
      card.giant = { status: 'approved', lengthCm: sp.giantThresholdCm + Math.round(r() * 12), approvedAt: card.unlockedAt };
    });
    return (profileCache[userId] = { user: u, catches, cards });
  }
  function meEntry() {
    const cards = Object.values(db.cards).filter((c) => c.verifiedUnlocked);
    const urs = Object.values(db.cards).filter((c) => c.giant.status === 'approved').length;
    if (!cards.length) return null;
    const sorted = cards.slice().sort((a, b) => SCORE[byId[b.speciesId].rarity] - SCORE[byId[a.speciesId].rarity]);
    const times = db.catches.filter((c) => c.verified && c.status === 'confirmed').map((c) => c.createdAt).sort();
    return {
      id: 'me', nickname: db.me.nickname, bio: db.me.bio, city: db.me.city, me: true,
      count: cards.length,
      urs,
      reachedAt: times[times.length - 1] || Date.now(),
      best: sorted[0].speciesId,
      top3: sorted.slice(0, 3).map((c) => c.speciesId),
      byRarity: cards.reduce((m, c) => ((m[byId[c.speciesId].rarity] = (m[byId[c.speciesId].rarity] || 0) + 1), m), {}),
    };
  }
  function rankOf(scope) {
    let list = mocks().slice();
    const me = meEntry();
    if (me) list.push(me);
    if (scope === 'city') list = list.filter((u) => u.city === db.me.city);
    list.sort((a, b) => b.count - a.count || b.urs - a.urs || a.reachedAt - b.reachedAt);
    list.forEach((u, i) => (u.rank = i + 1));
    return { top: list.slice(0, 100), me: list.find((u) => u.me) || null, total: list.length, generatedAt: Date.now() };
  }

  window.YK_STORE = {
    load, save, reset, wipe, get db() { return db; },
    SPECIES, PROTECTED, byId, CITIES, STAR_STEPS, SCORE,
    confusableTip, checkin, encounter, removeCatch, updateCatch, precheck,
    likesOf, toggleLike,
    dexProgress, rankOf, profileOf, uuid, starsFor,
  };
})();
