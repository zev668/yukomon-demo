import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';
import sharp from 'sharp';
import ffprobeStatic from 'ffprobe-static';
import { createHash, createHmac, randomBytes, randomUUID } from 'node:crypto';
import { mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { z } from 'zod';
import { openDatabase, transaction } from './database.mjs';
import { species, protectedSpecies, byId, cardsFor, rankFor, SCORE_VERSION, SETS, setIdFor } from './catalog.mjs';
import { createProviders, ProviderError } from './providers.mjs';
import { hashSecret, verifySecret, newRecoveryCode } from './auth/passwords.mjs';
import { mountDistribution } from './distribution.mjs';
import { mapGrid, mapRegion } from './map-grid.mjs';
import { fileURLToPath } from 'node:url';

const run = promisify(execFile);
const sha = value => createHash('sha256').update(value).digest('hex');
const text = max => z.string().trim().max(max);
const locationSchema = z.object({ city: text(40).min(1), district: text(80).default(''), place: text(120).default(''), lat: z.number().min(-90).max(90).optional(), lng: z.number().min(-180).max(180).optional(), coordType: z.enum(['wgs84', 'gcj02']).optional() }).refine(value => (value.lat === undefined) === (value.lng === undefined));
const gearSchema = z.object({ rod: text(80).default(''), reel: text(80).default(''), line: text(80).default(''), bait: text(80).default('') });
const catchSchema = z.object({
  speciesId: z.string().optional(), protectedIndex: z.number().int().min(0).max(protectedSpecies.length - 1).optional(),
  mediaId: z.string().uuid(), videoId: z.string().uuid().nullable().optional(), source: z.enum(['camera', 'album', 'sample']),
  desc: text(200).min(1), gear: gearSchema.default({ rod: '', reel: '', line: '', bait: '' }), location: locationSchema,
  lengthCm: z.number().min(1).max(300).refine(n => Math.abs(n * 10 - Math.round(n * 10)) < 1e-8).nullable().optional(), released: z.boolean().default(false),
  mapVisibility: z.enum(['private', 'city', 'grid']).default('private'),
  recognitionStatus: z.enum(['pending', 'suggested', 'confirmed', 'failed', 'manual']).default('manual'),
  recognitionProvider: z.string().max(80).optional(), recognitionModel: z.string().max(120).nullable().optional(),
  recognitionConfidence: z.number().min(0).max(1).nullable().optional(), recognitionCandidates: z.array(z.object({ speciesId: z.string(), confidence: z.number().min(0).max(1) })).max(8).optional()
});
class ApiError extends Error { constructor(status, code, message) { super(message); Object.assign(this, { status, code }); } }
const fail = (status, code, message) => { throw new ApiError(status, code, message); };
const parse = (schema, input) => { const result = schema.safeParse(input); if (!result.success) fail(400, 'VALIDATION', '输入内容有误，请检查必填项、尺寸与文字长度'); return result.data; };
const publicCatch = c => ({ ...c, location: { city: c.location.city }, gear: undefined });
const usernameSchema = z.string().trim().toLowerCase().regex(/^[a-z0-9_]{3,32}$/);
const passwordSchema = z.string().min(10).max(128).refine(value => Buffer.byteLength(value, 'utf8') <= 256 && /\S/u.test(value));
const recoveryCodeSchema = z.string().trim().toUpperCase().regex(/^[A-F0-9]{8}(?:-[A-F0-9]{8}){3}$/);

export function createApp(options = {}) {
  const production = options.production ?? process.env.NODE_ENV === 'production';
  const dataDir = resolve(options.dataDir || process.env.DATA_DIR || 'server/data');
  const mediaDir = join(dataDir, 'media');
  mkdirSync(mediaDir, { recursive: true });
  const keyPath = join(dataDir, 'media-signing-key');
  let signingKey;
  try { signingKey = readFileSync(keyPath); } catch { signingKey = randomBytes(32); writeFileSync(keyPath, signingKey, { mode: 0o600 }); }
  const mediaKey = id => createHmac('sha256', signingKey).update(id).digest('hex');
  const db = openDatabase(join(dataDir, 'yukomon.sqlite'));
  const app = express();
  const providers = options.providers || createProviders();
  let recognitionActive = 0;
  const recognitionPending = new Map();
  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  const origins = options.origins || (process.env.CORS_ORIGINS || '').split(',').filter(Boolean);
  app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.use(cors({ origin(origin, cb) {
    const local = !production && origin && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
    cb(null, !origin || origins.includes(origin) || !!local);
  }, exposedHeaders: ['X-Request-Id'] }));
  app.use((req, res, next) => {
    res.setHeader('X-Request-Id', randomUUID());
    if (req.path.startsWith('/api/')) res.setHeader('Cache-Control', 'no-store');
    const origin = req.get('origin');
    const sameOrigin = origin === `${req.protocol}://${req.get('host')}`;
    if (origin && !sameOrigin && !origins.includes(origin) && !(!production && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin))) return next(new ApiError(403, 'ORIGIN', '此站点未被允许连接服务'));
    next();
  });
  app.use(express.json({ limit: '256kb' }));
  mountDistribution(app, { root: options.websiteDir || fileURLToPath(new URL('../website/', import.meta.url)) });
  const buckets = new Map();
  function throttle(key, limit, period = 60000) {
    const now = nowFn();
    if (buckets.size > 5000) for (const [k, b] of buckets) if (b.until < now) buckets.delete(k);
    const b = buckets.get(key);
    if (!b || b.until < now) buckets.set(key, { count: 1, until: now + period });
    else if (++b.count > limit) fail(429, 'RATE_LIMIT', '操作频繁，请稍后再试');
  }
  const nowFn = options.now || Date.now;
  const getUser = id => db.prepare('SELECT * FROM users WHERE id=?').get(id);
  const meOf = user => {
    const account = db.prepare('SELECT username FROM auth_credentials WHERE user_id=?').get(user.id);
    return { id: 'me', serverId: user.id, nickname: user.nickname, bio: user.bio, city: user.city, ...(account ? { username: account.username } : {}) };
  };
  const urlFor = id => `/api/media/${id}?key=${mediaKey(id)}`;
  function catchesOf(userId, viewerId) {
    return db.prepare('SELECT * FROM catches WHERE user_id=? ORDER BY created_at DESC, id').all(userId).map(row => {
      const likes = db.prepare('SELECT count(*) AS n FROM likes WHERE catch_id=?').get(row.id).n;
      const liked = !!db.prepare('SELECT 1 FROM likes WHERE catch_id=? AND user_id=?').get(row.id, viewerId || '');
      return { ...JSON.parse(row.body), id: row.id, userId, photo: urlFor(row.media_id), mediaId: row.media_id, videoId: null, videoUrl: row.video_id ? urlFor(row.video_id) : null, createdAt: row.created_at, likesBase: likes, liked };
    });
  }
  const TIERS = [
    ['初见', 0], ['浅滩', 500], ['溪流', 1000], ['江河', 1500],
    ['深潭', 2000], ['巨物', 2500], ['传奇', 3000], ['钓圣', 3500]
  ];
  function tierFor(points) {
    let index = 0;
    TIERS.forEach(([, min], i) => { if (points >= min) index = i; });
    const [name, min] = TIERS[index], next = TIERS[index + 1] || null;
    return { name, min, index, stars: Math.min(5, Math.floor((points - min) / 100)), next: next ? { name: next[0], min: next[1] } : null, toNext: next ? next[1] - points : null };
  }
  function syncRank(userId, summary) {
    const tier = tierFor(summary.points), previous = db.prepare('SELECT peak_points, peak_tier FROM user_ranks WHERE user_id=?').get(userId);
    const peakPoints = Math.max(previous?.peak_points || 0, summary.points), peakTier = tierFor(peakPoints).name;
    db.prepare(`INSERT INTO user_ranks(user_id,points,tier,stars,peak_points,peak_tier,verified_catch_count,unique_species_count,set_completed_count,updated_at)
      VALUES(?,?,?,?,?,?,?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET points=excluded.points,tier=excluded.tier,stars=excluded.stars,peak_points=excluded.peak_points,peak_tier=excluded.peak_tier,verified_catch_count=excluded.verified_catch_count,unique_species_count=excluded.unique_species_count,set_completed_count=excluded.set_completed_count,updated_at=excluded.updated_at`)
      .run(userId, summary.points, tier.name, tier.stars, peakPoints, peakTier, summary.verifiedCatchCount, summary.uniqueSpeciesCount, summary.setCompletedCount, nowFn());
    return { ...summary, ...tier, peakPoints, peakTier };
  }
  function rankSummary(userId, catches = catchesOf(userId)) { return syncRank(userId, rankFor(catches)); }
  function persistRankEvents(userId, summary, at) {
    const active = db.prepare("SELECT * FROM rank_events WHERE user_id=? AND status='active'").all(userId);
    const keyOf = event => event.catchId ? `catch:${event.catchId}` : `set:${event.setId}`;
    const current = new Set(summary.events.map(keyOf));
    active.filter(event => !current.has(event.catch_id ? `catch:${event.catch_id}` : `set:${event.set_id}`)).forEach(event => db.prepare("UPDATE rank_events SET status='revoked', revoked_at=? WHERE id=?").run(at, event.id));
    for (const event of summary.events) {
      const key = keyOf(event), previous = active.find(row => (row.catch_id ? `catch:${row.catch_id}` : `set:${row.set_id}`) === key);
      const id = previous?.id || randomUUID();
      db.prepare(`INSERT INTO rank_events(id,user_id,catch_id,event_type,set_id,base_score,size_multiplier,repeat_multiplier,bonus_score,total_score,score_version,status,created_at,revoked_at)
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,NULL) ON CONFLICT(id) DO UPDATE SET event_type=excluded.event_type,set_id=excluded.set_id,base_score=excluded.base_score,size_multiplier=excluded.size_multiplier,repeat_multiplier=excluded.repeat_multiplier,bonus_score=excluded.bonus_score,total_score=excluded.total_score,score_version=excluded.score_version,status='active',created_at=excluded.created_at,revoked_at=NULL`)
        .run(id, userId, event.catchId || null, event.eventType, event.setId || null, event.baseScore || 0, event.sizeMultiplier || 0, event.repeatMultiplier || 1, event.bonusScore || 0, event.totalScore || 0, event.scoreVersion || SCORE_VERSION, 'active', event.createdAt || at);
    }
  }
  function entry(user, viewerId) {
    const catches = catchesOf(user.id, viewerId), summary = rankSummary(user.id, catches), cards = summary.cards;
    const owned = Object.values(cards), valid = catches.filter(c => c.status === 'confirmed' && c.source === 'camera' && c.speciesId);
    const first = new Map();
    valid.forEach(c => first.set(c.speciesId, Math.min(first.get(c.speciesId) ?? Infinity, c.createdAt)));
    const sorted = owned.filter(c => first.has(c.speciesId)).sort((a, b) => ['N', 'R', 'SR', 'SSR'].indexOf(byId[b.speciesId].rarity) - ['N', 'R', 'SR', 'SSR'].indexOf(byId[a.speciesId].rarity));
    return {
      id: user.id === viewerId ? 'me' : user.id, serverId: user.id, nickname: user.nickname, bio: user.bio, city: user.city,
      me: user.id === viewerId, count: first.size, unlockedAt: Math.max(0, ...first.values()), points: summary.points, tier: summary.name, stars: summary.stars,
      peakPoints: summary.peakPoints, peakTier: summary.peakTier, verifiedCatchCount: summary.verifiedCatchCount, uniqueSpeciesCount: summary.uniqueSpeciesCount,
      setCompletedCount: summary.setCompletedCount, reachedAt: valid.length ? Math.min(...valid.map(c => c.createdAt)) : 0,
      best: sorted[0]?.speciesId || species[0].no, top3: sorted.slice(0, 3).map(c => c.speciesId),
      byRarity: owned.reduce((m, c) => { const rk = byId[c.speciesId].rarity; m[rk] = (m[rk] || 0) + 1; return m; }, {}),
      owned: owned.map(c => c.speciesId), cards, catches, rankEvents: summary.events, setProgress: summary.setProgress
    };
  }
  function ranking(viewer, scope, entries, board = 'unlock') {
    let list = entries || db.prepare('SELECT * FROM users').all().map(u => entry(u, viewer.id));
    list = list.filter(u => u.verifiedCatchCount !== 0 && (scope !== 'city' || u.city === viewer.city));
    list.sort(board === 'ladder'
      ? (a, b) => b.points - a.points || b.uniqueSpeciesCount - a.uniqueSpeciesCount || b.setCompletedCount - a.setCompletedCount || a.reachedAt - b.reachedAt || a.serverId.localeCompare(b.serverId)
      : (a, b) => b.count - a.count || a.unlockedAt - b.unlockedAt || a.serverId.localeCompare(b.serverId));
    list = list.map(({ cards, catches, ...u }, i) => ({ ...u, rank: i + 1 }));
    return { top: list.slice(0, 100), me: list.find(u => u.me) || null, total: list.length, generatedAt: nowFn() };
  }
  function sizes(viewer, scope, entries) {
    const result = {};
    for (const sp of species) {
      let list = entries.filter(u => scope !== 'city' || u.city === viewer.city).flatMap(u => {
        const c = u.catches.filter(c => c.speciesId === sp.no && c.status === 'confirmed' && c.source === 'camera' && Number(c.lengthCm) > 0)
          .sort((a, b) => b.lengthCm - a.lengthCm || a.createdAt - b.createdAt || a.id.localeCompare(b.id))[0];
        return c ? [{ id: u.id, me: u.me, nickname: u.nickname, city: u.city, place: c.location?.city || u.city, lengthCm: Number(c.lengthCm), at: c.createdAt }] : [];
      });
      list.sort((a, b) => b.lengthCm - a.lengthCm || a.at - b.at || a.id.localeCompare(b.id));
      list = list.map((u, i) => ({ ...u, rank: i + 1 }));
      result[sp.no] = { top: list.slice(0, 100), me: list.find(u => u.me) || null, total: list.length };
    }
    return result;
  }
  function bootstrap(user) {
    const entries = db.prepare('SELECT * FROM users').all().map(u => entry(u, user.id));
    const mine = entries.find(u => u.me);
    const summary = rankSummary(user.id, mine.catches);
    return {
      v: 2, me: meOf(user), settings: { sfx: true, haptics: true, ...JSON.parse(user.settings) },
      catches: mine.catches, cards: mine.cards,
      ranks: { nation: ranking(user, 'nation', entries), city: ranking(user, 'city', entries) },
      ladderRanks: { nation: ranking(user, 'nation', entries, 'ladder'), city: ranking(user, 'city', entries, 'ladder') },
      sizeRanks: { nation: sizes(user, 'nation', entries), city: sizes(user, 'city', entries) },
      rank: { points: summary.points, tier: summary.name, stars: summary.stars, peakPoints: summary.peakPoints, peakTier: summary.peakTier, verifiedCatchCount: summary.verifiedCatchCount, uniqueSpeciesCount: summary.uniqueSpeciesCount, setCompletedCount: summary.setCompletedCount },
      rankEvents: summary.events.slice(0, 20), setProgress: summary.setProgress
    };
  }
  function issueUser(user) {
    db.prepare('DELETE FROM sessions WHERE expires_at<?').run(nowFn());
    const token = randomBytes(32).toString('base64url');
    const expiresAt = nowFn() + 30 * 86400000;
    db.prepare('INSERT INTO sessions VALUES(?,?,?)').run(sha(token), user.id, expiresAt);
    return { token, expiresAt, me: meOf(user) };
  }
  function issue(identity, profile = {}) {
    let user = db.prepare('SELECT * FROM users WHERE identity=?').get(identity);
    if (!user) {
      const id = randomUUID();
      const nickname = typeof profile.nickname === 'string' && profile.nickname.trim() ? profile.nickname.trim().slice(0, 12) : '新钓友';
      db.prepare('INSERT INTO users(id,identity,nickname,city,created_at) VALUES(?,?,?,?,?)').run(id, identity, nickname, '杭州', nowFn());
      user = getUser(id);
    }
    return { ...issueUser(user), created: user.created_at >= nowFn() - 5000 };
  }
  const wechatConfigured = () => !!(process.env.WECHAT_APP_ID && process.env.WECHAT_APP_SECRET);
  app.get('/api/health', (req, res) => {
    db.prepare('SELECT 1').get();
    res.json({ ok: true, version: '0.6.0', storage: 'sqlite', mode: production ? 'production' : 'development', devLogin: !production, accountLogin: true, wechatLogin: wechatConfigured(), services: providers.config });
  });
  app.get('/api/runtime.js', (req, res) => {
    res.type('application/javascript').send(`window.YK_RUNTIME=${JSON.stringify({ hosted: true, production, wechatLogin: wechatConfigured(), ...providers.config }).replace(/</g, '\\u003c')};`);
  });
  app.get('/api/species', (req, res) => res.json({ species, protectedSpecies, version: 1 }));
  let passwordWorkActive = 0;
  async function passwordWork(fn) {
    if (passwordWorkActive >= 4) fail(429, 'RATE_LIMIT', '登录服务繁忙，请稍后再试');
    passwordWorkActive++;
    try { return await fn(); } finally { passwordWorkActive--; }
  }
  const credentialsFor = username => db.prepare('SELECT * FROM auth_credentials WHERE username=?').get(username);
  app.post('/api/auth/register', async (req, res) => {
    throttle(`register:${req.ip}`, 5, 3600000);
    const { username, password, nickname } = parse(z.object({ username: usernameSchema, password: passwordSchema, nickname: text(12).min(1).optional() }), req.body);
    if (credentialsFor(username)) fail(409, 'USERNAME_TAKEN', '此账号已被注册，请更换账号或直接登录');
    const result = await passwordWork(async () => {
      const recoveryCode = newRecoveryCode();
      const passwordHash = await hashSecret(password), recoveryHash = await hashSecret(recoveryCode);
      return transaction(db, () => {
        if (credentialsFor(username)) fail(409, 'USERNAME_TAKEN', '此账号已被注册，请更换账号或直接登录');
        const id = randomUUID();
        db.prepare('INSERT INTO users(id,identity,nickname,city,created_at) VALUES(?,?,?,?,?)').run(id, `account:${randomUUID()}`, nickname || '新钓友', '杭州', nowFn());
        db.prepare('INSERT INTO auth_credentials VALUES(?,?,?,?,?)').run(id, username, passwordHash, recoveryHash, nowFn());
        return { ...issueUser(getUser(id)), recoveryCode };
      });
    });
    res.status(201).json(result);
  });
  app.post('/api/auth/login', async (req, res) => {
    throttle(`password-ip:${req.ip}`, 30, 900000);
    const { username, password } = parse(z.object({ username: usernameSchema, password: passwordSchema }), req.body);
    throttle(`password-account:${username}`, 10, 900000);
    const result = await passwordWork(async () => {
      const account = credentialsFor(username);
      if (!await verifySecret(password, account?.password_hash)) fail(401, 'LOGIN_FAILED', '账号或密码不正确');
      const current = credentialsFor(username), user = current && getUser(current.user_id);
      if (!user || current.password_hash !== account.password_hash) fail(401, 'LOGIN_FAILED', '账号或密码不正确');
      return issueUser(user);
    });
    res.json(result);
  });
  app.post('/api/auth/recover', async (req, res) => {
    throttle(`recovery-ip:${req.ip}`, 15, 900000);
    const { username, recoveryCode, newPassword } = parse(z.object({ username: usernameSchema, recoveryCode: recoveryCodeSchema, newPassword: passwordSchema }), req.body);
    throttle(`recovery-account:${username}`, 5, 900000);
    const result = await passwordWork(async () => {
      const account = credentialsFor(username);
      if (!await verifySecret(recoveryCode, account?.recovery_hash)) fail(401, 'RECOVERY_FAILED', '账号或恢复码不正确');
      const nextCode = newRecoveryCode();
      const passwordHash = await hashSecret(newPassword), recoveryHash = await hashSecret(nextCode);
      return transaction(db, () => {
        const current = credentialsFor(username);
        if (!current || current.recovery_hash !== account.recovery_hash) fail(401, 'RECOVERY_FAILED', '账号或恢复码不正确');
        db.prepare('UPDATE auth_credentials SET password_hash=?,recovery_hash=?,updated_at=? WHERE user_id=?').run(passwordHash, recoveryHash, nowFn(), account.user_id);
        db.prepare('DELETE FROM sessions WHERE user_id=?').run(account.user_id);
        return { ...issueUser(getUser(account.user_id)), recoveryCode: nextCode };
      });
    });
    res.json(result);
  });
  app.post('/api/auth/dev', (req, res) => {
    if (production) fail(404, 'NOT_FOUND', '接口不存在');
    throttle(`auth:${req.ip}`, 20);
    const { deviceKey } = parse(z.object({ deviceKey: z.string().min(32).max(160) }), req.body);
    res.json(issue(`dev:${sha(deviceKey)}`));
  });
  // WeChat Open Platform (mobile app) OAuth: the app obtains a one-time code via
  // the WeChat SDK; the secret never leaves the server. Identity keys on unionid
  // when available so a future mini program / web login maps to the same user.
  app.post('/api/auth/wechat', async (req, res) => {
    throttle(`auth:${req.ip}`, 20);
    const { code } = parse(z.object({ code: z.string().min(1).max(256) }), req.body);
    if (!wechatConfigured()) fail(503, 'WECHAT_UNCONFIGURED', '微信登录尚未开通，请先使用账号密码登录');
    const fetchJson = async url => {
      const response = await (options.fetch || fetch)(url, { signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error('upstream');
      return response.json();
    };
    let token;
    try {
      token = await fetchJson(`https://api.weixin.qq.com/sns/oauth2/access_token?${new URLSearchParams({ appid: process.env.WECHAT_APP_ID, secret: process.env.WECHAT_APP_SECRET, code, grant_type: 'authorization_code' })}`);
    } catch { fail(502, 'WECHAT_UNAVAILABLE', '微信服务暂时无法连接，请重试'); }
    if (!token?.openid || token.errcode) fail(401, 'WECHAT_LOGIN', '微信授权已过期，请重新登录');
    let profile = {};
    if (token.access_token && /snsapi_userinfo/.test(token.scope || '')) {
      try {
        const info = await fetchJson(`https://api.weixin.qq.com/sns/userinfo?${new URLSearchParams({ access_token: token.access_token, openid: token.openid })}`);
        if (!info.errcode) profile = { nickname: info.nickname, unionid: info.unionid };
      } catch { /* Profile is optional; login still succeeds. */ }
    }
    const unionid = token.unionid || profile.unionid;
    const identity = unionid ? `wxu:${unionid}` : `wx:${token.openid}`;
    // Users created before unionid was available keep their openid identity.
    const legacy = unionid && db.prepare('SELECT 1 FROM users WHERE identity=?').get(`wx:${token.openid}`);
    res.json(issue(legacy ? `wx:${token.openid}` : identity, profile));
  });
  function auth(req, res, next) {
    const token = (req.get('authorization') || '').replace(/^Bearer /, '');
    const session = token && db.prepare('SELECT * FROM sessions WHERE token_hash=? AND expires_at>?').get(sha(token), nowFn());
    if (!session) return next(new ApiError(401, 'UNAUTHORIZED', '登录已过期，请重新连接'));
    req.user = getUser(session.user_id);
    next();
  }
  function mediaAccess(row, viewerId) {
    if (row.user_id === viewerId) return true;
    return !!db.prepare("SELECT 1 FROM catches WHERE (media_id=? OR video_id=?) AND status='confirmed'").get(row.id, row.id);
  }
  app.get('/api/media/:id', (req, res) => {
    const row = db.prepare('SELECT * FROM media WHERE id=?').get(req.params.id);
    if (!row) fail(404, 'NOT_FOUND', '媒体不存在');
    const token = (req.get('authorization') || '').replace(/^Bearer /, '');
    const session = token && db.prepare('SELECT user_id FROM sessions WHERE token_hash=? AND expires_at>?').get(sha(token), nowFn());
    if (!mediaAccess(row, session?.user_id) && req.query.key !== mediaKey(row.id)) fail(403, 'FORBIDDEN', '不能查看此媒体');
    res.setHeader('Content-Type', row.mime);
    res.sendFile(join(mediaDir, row.filename));
  });
  app.get('/api/shares/:id', (req, res) => {
    const row = db.prepare('SELECT * FROM shares WHERE id=?').get(req.params.id);
    if (!row) fail(404, 'NOT_FOUND', '分享链接已失效');
    const user = getUser(row.user_id), c = catchesOf(user.id).find(c => c.id === row.catch_id);
    if (!c || c.status !== 'confirmed') fail(404, 'NOT_FOUND', '分享链接已失效');
    const ur = !!row.ur && c.source === 'camera' && c.lengthCm >= byId[c.speciesId]?.giantThresholdCm;
    res.json({ v: 2, ur: ur ? 1 : 0, by: user.nickname, s: c.speciesId, len: c.lengthCm, city: c.location.city, t: c.createdAt, d: c.desc, id: c.id, photo: c.photo, videoUrl: c.videoUrl });
  });
  app.use('/api', auth);
  app.get('/api/bootstrap', (req, res) => res.json(bootstrap(req.user)));
  app.get('/api/me', (req, res) => res.json(meOf(req.user)));
  app.patch('/api/me', (req, res) => {
    const p = parse(z.object({ nickname: text(12).min(1).optional(), city: text(40).min(1).optional(), bio: text(120).optional(), settings: z.object({ sfx: z.boolean(), haptics: z.boolean() }).optional() }), req.body);
    const u = req.user;
    db.prepare('UPDATE users SET nickname=?,city=?,bio=?,settings=? WHERE id=?').run(p.nickname ?? u.nickname, p.city ?? u.city, p.bio ?? u.bio, JSON.stringify(p.settings ?? JSON.parse(u.settings)), u.id);
    res.json(meOf(getUser(u.id)));
  });
  app.post('/api/auth/logout', (req, res) => { db.prepare('DELETE FROM sessions WHERE token_hash=?').run(sha(req.get('authorization').slice(7))); res.status(204).end(); });
  async function updateCredentials(userId, password, newPassword) {
    const account = db.prepare('SELECT * FROM auth_credentials WHERE user_id=?').get(userId);
    if (!account) fail(409, 'ACCOUNT_PASSWORD_REQUIRED', '此账号尚未设置独立登录密码');
    if (!await verifySecret(password, account.password_hash)) fail(401, 'LOGIN_FAILED', '当前密码不正确');
    const recoveryCode = newRecoveryCode(), recoveryHash = await hashSecret(recoveryCode);
    const passwordHash = newPassword ? await hashSecret(newPassword) : account.password_hash;
    return transaction(db, () => {
      const current = db.prepare('SELECT * FROM auth_credentials WHERE user_id=?').get(userId);
      if (!current || current.password_hash !== account.password_hash || current.recovery_hash !== account.recovery_hash) fail(409, 'CREDENTIALS_CHANGED', '账号安全信息已变更，请重新操作');
      db.prepare('UPDATE auth_credentials SET password_hash=?,recovery_hash=?,updated_at=? WHERE user_id=?').run(passwordHash, recoveryHash, nowFn(), userId);
      if (!newPassword) return { recoveryCode };
      db.prepare('DELETE FROM sessions WHERE user_id=?').run(userId);
      return { ...issueUser(getUser(userId)), recoveryCode };
    });
  }
  app.post('/api/auth/recovery-code', async (req, res) => {
    throttle(`account-security:${req.user.id}`, 5, 900000);
    const { password } = parse(z.object({ password: passwordSchema }), req.body);
    res.json(await passwordWork(() => updateCredentials(req.user.id, password)));
  });
  app.post('/api/auth/password', async (req, res) => {
    throttle(`account-security:${req.user.id}`, 5, 900000);
    const { password, newPassword } = parse(z.object({ password: passwordSchema, newPassword: passwordSchema }), req.body);
    res.json(await passwordWork(() => updateCredentials(req.user.id, password, newPassword)));
  });

  const upload = multer({ dest: mediaDir, limits: { fileSize: 60 * 1024 * 1024, files: 1, fields: 0 } });
  app.post('/api/media', (req, res, next) => {
    try {
      throttle(`upload:${req.user.id}`, 20);
      const usage = db.prepare('SELECT coalesce(sum(size),0) AS size FROM media WHERE user_id=?').get(req.user.id).size;
      if (usage >= 512 * 1024 * 1024) fail(413, 'STORAGE_QUOTA', '媒体空间已满，请删除不再使用的记录');
      upload.single('file')(req, res, next);
    } catch (error) { next(error); }
  }, async (req, res) => {
    if (!req.file) fail(400, 'MEDIA_REQUIRED', '请选择图片或视频');
    const temp = req.file.path;
    let target;
    try {
      const bytes = readFileSync(temp), id = randomUUID();
      let normalized, mime, duration = 0;
      if (req.file.mimetype.startsWith('image/')) {
        if (bytes.length > 10 * 1024 * 1024) fail(413, 'IMAGE_TOO_LARGE', '图片不能超过 10MB');
        try { normalized = await sharp(bytes, { limitInputPixels: 40e6, animated: false }).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 85 }).toBuffer(); }
        catch { fail(415, 'MEDIA_FORMAT', '图片无法读取，请选择 JPEG、PNG 或 WebP 图片'); }
        mime = 'image/jpeg';
      } else if (['video/mp4', 'video/webm', 'video/quicktime'].includes(req.file.mimetype)) {
        let probe;
        try { probe = JSON.parse((await run(process.env.FFPROBE_PATH || ffprobeStatic.path, ['-v', 'error', '-show_format', '-show_streams', '-show_packets', '-show_entries', 'format=duration,format_name:stream=index,codec_type,width,height:packet=stream_index,pts_time,duration_time', '-of', 'json', temp], { timeout: 12000, maxBuffer: 8 * 1024 * 1024 })).stdout); }
        catch (error) { if (error.code === 'ENOENT') fail(503, 'VIDEO_UNAVAILABLE', '服务端尚未安装视频校验工具'); fail(415, 'MEDIA_FORMAT', '视频无法读取'); }
        duration = Number(probe.format?.duration);
        const stream = probe.streams?.find(s => s.codec_type === 'video');
        if (!Number.isFinite(duration) && stream) {
          const packets = (probe.packets || []).filter(p => p.stream_index === stream.index && Number.isFinite(Number(p.pts_time)));
          if (packets.length) duration = Math.max(...packets.map(p => Number(p.pts_time) + (Number(p.duration_time) || 0))) - Math.min(...packets.map(p => Number(p.pts_time)));
        }
        if (!stream || !Number.isFinite(duration) || duration <= 0 || duration > 60 || stream.width * stream.height > 3840 * 2160) fail(415, 'VIDEO_LIMIT', '视频需在 60 秒内，最高支持 4K');
        mime = probe.format.format_name.includes('webm') ? 'video/webm' : 'video/mp4'; normalized = bytes;
      } else fail(415, 'MEDIA_FORMAT', '不支持的媒体格式');
      const usage = db.prepare('SELECT coalesce(sum(size),0) AS size FROM media WHERE user_id=?').get(req.user.id).size;
      if (usage + normalized.length > 512 * 1024 * 1024) fail(413, 'STORAGE_QUOTA', '媒体空间已满');
      const filename = `${id}.${mime === 'image/jpeg' ? 'jpg' : mime === 'video/webm' ? 'webm' : 'mp4'}`;
      const digest = sha(normalized);
      target = join(mediaDir, filename);
      writeFileSync(target, normalized);
      db.prepare('INSERT INTO media VALUES(?,?,?,?,?,?,?,?)').run(id, req.user.id, mime, normalized.length, digest, filename, duration, nowFn());
      res.status(201).json({ id, url: urlFor(id), mime, size: normalized.length, duration });
    } catch (error) { if (target) try { unlinkSync(target); } catch {} throw error; }
    finally { try { unlinkSync(temp); } catch {} }
  });
  function ownedMedia(id, userId, kind) {
    const m = db.prepare('SELECT * FROM media WHERE id=? AND user_id=?').get(id, userId);
    if (!m || !m.mime.startsWith(kind)) fail(400, 'MEDIA_INVALID', '媒体不存在或不属于当前账号');
    return m;
  }
  app.post('/api/recognition', async (req, res) => {
    const { mediaId, force } = parse(z.object({ mediaId: z.string().uuid(), force: z.boolean().default(false) }), req.body);
    const media = ownedMedia(mediaId, req.user.id, 'image/');
    if (!providers.config.recognition.enabled) fail(503, 'AI_UNCONFIGURED', 'AI 识别尚未配置，请手动选择鱼种');
    const configKey = JSON.stringify(providers.config.recognition);
    const cached = !force && db.prepare('SELECT response FROM recognition_requests WHERE user_id=? AND media_id=? AND config_key=? AND response IS NOT NULL ORDER BY created_at DESC, rowid DESC LIMIT 1').get(req.user.id, mediaId, configKey);
    if (cached) return res.json(JSON.parse(cached.response));
    const pendingKey = `${req.user.id}:${mediaId}`;
    if (recognitionPending.has(pendingKey)) return res.json(await recognitionPending.get(pendingKey));
    if (recognitionActive >= 2) fail(503, 'AI_BUSY', '识别任务较多，请稍后重试');
    const today = Math.floor((nowFn() + 8 * 3600000) / 86400000) * 86400000 - 8 * 3600000;
    if (db.prepare('SELECT count(*) AS n FROM recognition_requests WHERE user_id=? AND created_at>=?').get(req.user.id, today).n >= 20) fail(429, 'AI_DAILY_LIMIT', '今日识别次数已用完，请手动选择鱼种');
    throttle(`recognition:${req.user.id}`, 5);
    const id = randomUUID();
    db.prepare('INSERT INTO recognition_requests VALUES(?,?,?,?,NULL,?)').run(id, req.user.id, mediaId, configKey, nowFn());
    recognitionActive++;
    const task = (async () => {
      const result = { recognitionId: id, ...await providers.recognize(readFileSync(join(mediaDir, media.filename))) };
      db.prepare('UPDATE recognition_requests SET response=? WHERE id=?').run(JSON.stringify(result), id);
      return result;
    })();
    recognitionPending.set(pendingKey, task);
    try { res.json(await task); }
    finally { recognitionActive--; recognitionPending.delete(pendingKey); }
  });
  app.post('/api/map/reverse-geocode', async (req, res) => {
    const p = parse(z.object({ lat: z.number().min(-90).max(90), lng: z.number().min(-180).max(180), coordType: z.enum(['wgs84', 'gcj02']) }), req.body);
    throttle(`geocode:${req.user.id}`, 15);
    res.json(await providers.reverseGeocode(p.lat, p.lng, p.coordType));
  });
  app.delete('/api/media/:id', (req, res) => {
    const m = db.prepare('SELECT * FROM media WHERE id=? AND user_id=?').get(req.params.id, req.user.id);
    if (!m) fail(404, 'NOT_FOUND', '媒体不存在');
    if (db.prepare('SELECT 1 FROM catches WHERE media_id=? OR video_id=?').get(m.id, m.id)) fail(409, 'MEDIA_IN_USE', '媒体正在被渔获使用');
    db.prepare('DELETE FROM media WHERE id=?').run(m.id);
    try { unlinkSync(join(mediaDir, m.filename)); } catch {}
    res.status(204).end();
  });
  app.post('/api/catches', (req, res) => {
    const form = parse(catchSchema, req.body);
    const key = req.get('idempotency-key');
    if (!key || !/^[A-Za-z0-9_-]{16,100}$/.test(key)) fail(400, 'IDEMPOTENCY_REQUIRED', '缺少提交标识');
    const fingerprint = sha(JSON.stringify(form));
    const result = transaction(db, () => {
      const prev = db.prepare('SELECT * FROM requests WHERE user_id=? AND request_key=?').get(req.user.id, key);
      if (prev) {
        if (prev.fingerprint !== fingerprint) fail(409, 'IDEMPOTENCY_CONFLICT', '该提交标识已用于另一条记录');
        return JSON.parse(prev.response);
      }
      const now = nowFn(), today = Math.floor((now + 8 * 3600000) / 86400000) * 86400000 - 8 * 3600000;
      if (db.prepare('SELECT count(*) AS n FROM submissions WHERE user_id=? AND created_at>=?').get(req.user.id, today).n >= 30) fail(429, 'DAILY_LIMIT', '每日最多记录 30 条渔获');
      if (db.prepare('SELECT count(*) AS n FROM submissions WHERE user_id=? AND created_at>?').get(req.user.id, now - 60000).n >= 3) fail(429, 'RATE_LIMIT', '每分钟最多记录 3 条，请稍后再试');
      const media = ownedMedia(form.mediaId, req.user.id, 'image/');
      const video = form.videoId ? ownedMedia(form.videoId, req.user.id, 'video/') : null;
      if (db.prepare('SELECT 1 FROM catches WHERE user_id=? AND photo_hash=?').get(req.user.id, media.hash)) fail(409, 'DUPLICATE_MEDIA', '这张照片已经记录过了');
      const protectedItem = form.protectedIndex === undefined ? null : protectedSpecies[form.protectedIndex];
      const sp = byId[form.speciesId];
      if (!protectedItem && !sp) fail(400, 'SPECIES_INVALID', '请选择有效鱼种');
      if (protectedItem && form.speciesId) fail(400, 'SPECIES_INVALID', '保护鱼类和普通鱼种不能同时选择');
      const beforeSummary = rankSummary(req.user.id, catchesOf(req.user.id));
      const c = {
        status: protectedItem ? 'protected' : 'confirmed', speciesId: protectedItem ? null : sp.no,
        ...(protectedItem ? { protectedName: protectedItem.name, protectedLatin: protectedItem.latin, protectedLevel: protectedItem.level } : {}),
        source: form.source, verified: !protectedItem && form.source === 'camera', desc: form.desc,
        location: form.location, gear: form.gear, lengthCm: protectedItem ? null : form.lengthCm || null,
        released: protectedItem ? true : sp.releasePolicy === 'forbid' ? false : form.released,
        mapVisibility: protectedItem || form.source !== 'camera' ? 'private' : form.mapVisibility,
        recognitionStatus: protectedItem ? 'confirmed' : form.recognitionStatus,
        recognitionProvider: form.recognitionProvider || 'manual', recognitionModel: form.recognitionModel || null,
        recognitionConfidence: form.recognitionConfidence ?? null, recognitionCandidates: form.recognitionCandidates || [],
        duration: video?.duration || 0
      };
      const id = randomUUID();
      db.prepare('INSERT INTO catches VALUES(?,?,?,?,?,?,?,?,?)').run(id, req.user.id, c.speciesId, c.status, JSON.stringify(c), media.hash, media.id, video?.id || null, now);
      db.prepare('INSERT INTO submissions VALUES(?,?)').run(req.user.id, now);
      const catches = catchesOf(req.user.id), afterSummary = rankSummary(req.user.id, catches);
      persistRankEvents(req.user.id, afterSummary, now);
      const card = sp ? afterSummary.cards[sp.no] : null;
      const beforeKeys = new Set(beforeSummary.events.map(event => event.catchId ? `catch:${event.catchId}` : `set:${event.setId}`));
      const scoreEvents = afterSummary.events.filter(event => !beforeKeys.has(event.catchId ? `catch:${event.catchId}` : `set:${event.setId}`));
      const giantEvents = card?.giant?.status === 'approved' && card.giant.catchId === id ? [beforeSummary.cards[sp.no]?.giant?.status === 'approved' ? 'giant_record' : 'giant'] : [];
      const response = { events: sp ? [ ...(card?.firstCatchId === id ? ['new'] : []), ...giantEvents, ...(scoreEvents.length ? ['score'] : []) ] : ['protected'], card, catchObj: catches.find(c => c.id === id), species: sp || null, points: scoreEvents.reduce((sum, event) => sum + event.totalScore, 0), scoreEvents, rank: { points: afterSummary.points, tier: afterSummary.name, stars: afterSummary.stars, peakPoints: afterSummary.peakPoints, peakTier: afterSummary.peakTier, verifiedCatchCount: afterSummary.verifiedCatchCount, uniqueSpeciesCount: afterSummary.uniqueSpeciesCount, setCompletedCount: afterSummary.setCompletedCount }, rankDelta: afterSummary.points - beforeSummary.points };
      db.prepare('INSERT INTO requests VALUES(?,?,?,?,?)').run(req.user.id, key, fingerprint, JSON.stringify(response), now);
      return response;
    });
    res.status(201).json(result);
  });
  app.get('/api/catches', (req, res) => {
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 30));
    const offset = Math.max(0, Math.floor(Number(req.query.offset) || 0));
    const list = catchesOf(req.user.id);
    res.json({ items: list.slice(offset, offset + limit), total: list.length, nextOffset: offset + limit < list.length ? offset + limit : null });
  });
  function ownedCatch(req) {
    const row = db.prepare('SELECT * FROM catches WHERE id=? AND user_id=?').get(req.params.id, req.user.id);
    if (!row) fail(404, 'NOT_FOUND', '渔获不存在');
    return row;
  }
  app.patch('/api/catches/:id', (req, res) => {
    const row = ownedCatch(req), c = JSON.parse(row.body);
    const patch = parse(z.object({ desc: text(200).min(1).optional(), released: z.boolean().optional(), gear: gearSchema.optional(), mapVisibility: z.enum(['private', 'city', 'grid']).optional() }), req.body);
    if (c.status === 'protected') patch.released = true;
    if (byId[c.speciesId]?.releasePolicy === 'forbid') patch.released = false;
    if (c.status === 'protected' || c.source !== 'camera') patch.mapVisibility = 'private';
    db.prepare('UPDATE catches SET body=? WHERE id=?').run(JSON.stringify({ ...c, ...patch }), row.id);
    res.json(catchesOf(req.user.id).find(c => c.id === row.id));
  });
  function cleanupMedia(userId, ids) {
    const rows = db.prepare('SELECT * FROM media WHERE user_id=? AND id NOT IN (SELECT media_id FROM catches UNION SELECT video_id FROM catches WHERE video_id IS NOT NULL)').all(userId);
    for (const row of rows) { if (ids && !ids.includes(row.id)) continue; db.prepare('DELETE FROM media WHERE id=?').run(row.id); try { unlinkSync(join(mediaDir, row.filename)); } catch {} }
  }
  app.delete('/api/catches/:id', (req, res) => {
    const c = ownedCatch(req);
    transaction(db, () => {
      db.prepare('DELETE FROM catches WHERE id=?').run(c.id);
      const summary = rankSummary(req.user.id);
      persistRankEvents(req.user.id, summary, nowFn());
    });
    cleanupMedia(req.user.id, [c.media_id, c.video_id]);
    res.json(bootstrap(req.user));
  });
  app.put('/api/catches/:id/like', (req, res) => {
    const { liked } = parse(z.object({ liked: z.boolean() }), req.body);
    const c = db.prepare("SELECT * FROM catches WHERE id=? AND status='confirmed'").get(req.params.id);
    if (!c) fail(404, 'NOT_FOUND', '渔获不存在');
    if (c.user_id === req.user.id) fail(403, 'SELF_LIKE', '不能给自己的渔获点赞');
    if (liked) db.prepare('INSERT OR IGNORE INTO likes VALUES(?,?)').run(req.user.id, c.id);
    else db.prepare('DELETE FROM likes WHERE user_id=? AND catch_id=?').run(req.user.id, c.id);
    res.json({ liked, count: db.prepare('SELECT count(*) AS n FROM likes WHERE catch_id=?').get(c.id).n });
  });
  app.get('/api/dex', (req, res) => res.json({ cards: cardsFor(catchesOf(req.user.id)), total: species.length }));
  app.get('/api/ranks', (req, res) => res.json(ranking(req.user, req.query.scope === 'city' ? 'city' : 'nation')));
  app.get('/api/rank/me', (req, res) => {
    const summary = rankSummary(req.user.id);
    res.json({ points: summary.points, tier: summary.name, stars: summary.stars, peakPoints: summary.peakPoints, peakTier: summary.peakTier, verifiedCatchCount: summary.verifiedCatchCount, uniqueSpeciesCount: summary.uniqueSpeciesCount, setCompletedCount: summary.setCompletedCount, next: summary.next, toNext: summary.toNext });
  });
  app.get('/api/ranks/ladder', (req, res) => res.json(ranking(req.user, req.query.scope === 'city' ? 'city' : 'nation', undefined, 'ladder')));
  app.get('/api/ranks/size/:speciesId', (req, res) => {
    if (!byId[req.params.speciesId]) fail(404, 'NOT_FOUND', '鱼种不存在');
    const entries = db.prepare('SELECT * FROM users').all().map(u => entry(u, req.user.id));
    res.json(sizes(req.user, req.query.scope === 'city' ? 'city' : 'nation', entries)[req.params.speciesId]);
  });
  app.get('/api/rank/events', (req, res) => {
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 20));
    const summary = rankSummary(req.user.id);
    res.json({ items: summary.events.slice(0, limit) });
  });
  app.get('/api/species-sets', (req, res) => res.json({ sets: SETS.map(set => ({ ...set, memberIds: species.filter(sp => set.habitats.includes(sp.habitat)).map(sp => sp.no) })) }));
  app.get('/api/me/sets', (req, res) => res.json(rankSummary(req.user.id).setProgress));
  function mapRows(filters = {}) {
    const cutoff = nowFn() - 2 * 3600000;
    const rows = [];
    for (const user of db.prepare('SELECT users.* FROM users JOIN user_map_settings ON users.id=user_map_settings.user_id WHERE user_map_settings.enabled=1').all()) {
      for (const c of catchesOf(user.id)) {
        if (c.status !== 'confirmed' || c.source !== 'camera' || c.mapVisibility !== 'grid' || c.createdAt > cutoff) continue;
        const sp = byId[c.speciesId];
        if (!sp || sp.releasePolicy === 'forbid') continue;
        const grid = mapGrid(c.location);
        if (!grid) continue;
        if (filters.city && filters.city !== 'all' && c.location.city !== filters.city) continue;
        if (filters.speciesId && filters.speciesId !== 'all' && c.speciesId !== filters.speciesId) continue;
        if (filters.setId && filters.setId !== 'all' && setIdFor(sp) !== filters.setId) continue;
        if (filters.days && filters.days !== 'all' && nowFn() - c.createdAt > Number(filters.days) * 86400000) continue;
        if (filters.rarity && filters.rarity !== 'all' && sp.rarity !== filters.rarity) continue;
        rows.push({ grid, record: { id: c.id, userId: user.id, nickname: user.nickname, speciesId: c.speciesId, lengthCm: c.lengthCm, createdAt: c.createdAt, photo: c.photo, location: mapRegion(c.location) } });
      }
    }
    const groups = new Map();
    for (const { grid, record: row } of rows) {
      const { key, ...center } = grid;
      const cell = groups.get(key) || { id: `cell-${sha(key).slice(0, 16)}`, ...center, ...row.location, records: [], users: new Set(), species: new Set(), latestAt: row.createdAt };
      cell.records.push(row); cell.users.add(row.userId); cell.species.add(row.speciesId); cell.latestAt = Math.max(cell.latestAt, row.createdAt); groups.set(key, cell);
    }
    return [...groups.values()].map(cell => ({ id: cell.id, lat: cell.lat, lng: cell.lng, coordType: cell.coordType, gridSizeMeters: cell.gridSizeMeters, city: cell.city, district: cell.district, place: cell.place, publicUserCount: cell.users.size, speciesCount: cell.species.size, catchCount: cell.records.length, latestAt: cell.latestAt, records: cell.users.size < 3 ? [] : cell.records.sort((a, b) => b.createdAt - a.createdAt).slice(0, 20) })).sort((a, b) => b.latestAt - a.latestAt);
  }
  app.get('/api/map/cells', (req, res) => res.json({ cells: mapRows(req.query) }));
  app.get('/api/map/cells/:cellId', (req, res) => {
    const cell = mapRows(req.query).find(item => item.id === req.params.cellId);
    if (!cell) fail(404, 'NOT_FOUND', '钓点不存在或已隐藏');
    res.json(cell);
  });
  app.get('/api/me/map-settings', (req, res) => {
    const row = db.prepare('SELECT enabled FROM user_map_settings WHERE user_id=?').get(req.user.id);
    res.json({ enabled: !!row?.enabled });
  });
  app.patch('/api/me/map-settings', (req, res) => {
    const { enabled } = parse(z.object({ enabled: z.boolean() }), req.body);
    db.prepare('INSERT INTO user_map_settings(user_id,enabled,updated_at) VALUES(?,?,?) ON CONFLICT(user_id) DO UPDATE SET enabled=excluded.enabled,updated_at=excluded.updated_at').run(req.user.id, enabled ? 1 : 0, nowFn());
    res.json({ enabled });
  });
  app.get('/api/users/:id', (req, res) => {
    const user = getUser(req.params.id);
    if (!user) fail(404, 'NOT_FOUND', '钓友不存在');
    const p = entry(user, req.user.id), { catches, cards, ...u } = p;
    res.json({ user: u, cards, catches: catches.filter(c => c.status === 'confirmed').map(publicCatch) });
  });
  app.post('/api/shares', (req, res) => {
    const { catchId, ur } = parse(z.object({ catchId: z.string().uuid(), ur: z.boolean().optional() }), req.body);
    const c = db.prepare("SELECT * FROM catches WHERE id=? AND user_id=? AND status='confirmed'").get(catchId, req.user.id);
    if (!c) fail(404, 'NOT_FOUND', '可分享的渔获不存在');
    const body = JSON.parse(c.body), eligible = body.source === 'camera' && body.lengthCm >= byId[c.species_id]?.giantThresholdCm;
    if (ur && !eligible) fail(400, 'UR_UNAVAILABLE', '这条渔获未达到现场巨物卡条件');
    const id = randomBytes(12).toString('base64url');
    db.prepare('INSERT INTO shares VALUES(?,?,?,?,?)').run(id, req.user.id, catchId, (ur ?? eligible) ? 1 : 0, nowFn());
    res.status(201).json({ id });
  });
  app.delete('/api/shares/:id', (req, res) => {
    const result = db.prepare('DELETE FROM shares WHERE id=? AND user_id=?').run(req.params.id, req.user.id);
    if (!result.changes) fail(404, 'NOT_FOUND', '分享不存在');
    res.status(204).end();
  });
  app.get('/api/me/export', (req, res) => res.json({ exportedAt: nowFn(), ...bootstrap(req.user) }));
  app.delete('/api/me/catches', (req, res) => {
    transaction(db, () => {
      db.prepare('DELETE FROM catches WHERE user_id=?').run(req.user.id);
      const summary = rankSummary(req.user.id, []);
      persistRankEvents(req.user.id, summary, nowFn());
    });
    cleanupMedia(req.user.id);
    res.json(bootstrap(req.user));
  });
  app.delete('/api/me', (req, res) => {
    const media = db.prepare('SELECT filename FROM media WHERE user_id=?').all(req.user.id);
    db.prepare('DELETE FROM users WHERE id=?').run(req.user.id);
    for (const m of media) try { unlinkSync(join(mediaDir, m.filename)); } catch {}
    res.status(204).end();
  });
  app.use('/api', (req, res) => fail(404, 'NOT_FOUND', '接口不存在'));
  const staticDir = resolve(options.staticDir || process.env.STATIC_DIR || (existsSync('demo/index.html') ? 'demo' : '.'));
  for (const directory of ['css', 'js', 'img', 'vendor', 'fonts', 'fishcard', 'marble-study', 'videos']) {
    app.use(`/${directory}`, express.static(join(staticDir, directory), { dotfiles: 'deny' }));
  }
  app.get(['/', '/index.html'], (req, res) => res.sendFile(join(staticDir, 'index.html')));
  app.get('/favicon.ico', (req, res) => res.status(204).end());
  app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    const uploadError = err instanceof multer.MulterError;
    const status = err.status || (uploadError ? 413 : 500);
    const known = err instanceof ApiError || err instanceof ProviderError;
    if (status >= 500) console.error(JSON.stringify({ requestId: res.getHeader('X-Request-Id'), code: err.code || 'INTERNAL', message: known ? err.message : 'Internal server error' }));
    res.status(status).json({ error: { code: uploadError ? 'UPLOAD_LIMIT' : err.code || 'INTERNAL', message: uploadError ? '文件不能超过 60MB，且每次只能上传一个文件' : status >= 500 && !known ? '服务暂时不可用，请重试' : err.message, requestId: res.getHeader('X-Request-Id') } });
  });
  // Sweep abandoned uploads after 24h, and remove crash leftovers after a grace period.
  function sweep() {
    const cutoff = nowFn() - 86400000;
    const rows = db.prepare('SELECT * FROM media WHERE created_at<? AND id NOT IN (SELECT media_id FROM catches UNION SELECT video_id FROM catches WHERE video_id IS NOT NULL)').all(cutoff);
    for (const row of rows) { db.prepare('DELETE FROM media WHERE id=?').run(row.id); try { unlinkSync(join(mediaDir, row.filename)); } catch {} }
    const names = new Set(db.prepare('SELECT filename FROM media').all().map(m => m.filename));
    for (const name of readdirSync(mediaDir)) if (!names.has(name) && statSync(join(mediaDir, name)).mtimeMs < cutoff) try { unlinkSync(join(mediaDir, name)); } catch {}
  }
  sweep();
  const timer = setInterval(sweep, 3600000).unref();
  return { app, db, dataDir, close() { clearInterval(timer); db.close(); } };
}
