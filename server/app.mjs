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
import { species, protectedSpecies, byId, cardsFor, eventsFor } from './catalog.mjs';

const run = promisify(execFile);
const sha = value => createHash('sha256').update(value).digest('hex');
const text = max => z.string().trim().max(max);
const locationSchema = z.object({ city: text(40).min(1), district: text(80).default(''), place: text(120).default(''), lat: z.number().min(-90).max(90).optional(), lng: z.number().min(-180).max(180).optional() });
const gearSchema = z.object({ rod: text(80).default(''), reel: text(80).default(''), line: text(80).default(''), bait: text(80).default('') });
const catchSchema = z.object({
  speciesId: z.string().optional(), protectedIndex: z.number().int().min(0).max(protectedSpecies.length - 1).optional(),
  mediaId: z.string().uuid(), videoId: z.string().uuid().nullable().optional(), source: z.enum(['camera', 'album', 'sample']),
  desc: text(200).min(1), gear: gearSchema.default({ rod: '', reel: '', line: '', bait: '' }), location: locationSchema,
  lengthCm: z.number().min(1).max(300).refine(n => Math.abs(n * 10 - Math.round(n * 10)) < 1e-8).nullable().optional(), released: z.boolean().default(false)
});
class ApiError extends Error { constructor(status, code, message) { super(message); Object.assign(this, { status, code }); } }
const fail = (status, code, message) => { throw new ApiError(status, code, message); };
const parse = (schema, input) => { const result = schema.safeParse(input); if (!result.success) fail(400, 'VALIDATION', '输入内容有误，请检查必填项、尺寸与文字长度'); return result.data; };
const publicCatch = c => ({ ...c, location: { city: c.location.city }, gear: undefined });

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
    if (origin && !origins.includes(origin) && !(!production && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin))) return next(new ApiError(403, 'ORIGIN', '此站点未被允许连接服务'));
    next();
  });
  app.use(express.json({ limit: '256kb' }));
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
  const meOf = user => ({ id: 'me', serverId: user.id, nickname: user.nickname, bio: user.bio, city: user.city });
  const urlFor = id => `/api/media/${id}?key=${mediaKey(id)}`;
  function catchesOf(userId, viewerId) {
    return db.prepare('SELECT * FROM catches WHERE user_id=? ORDER BY created_at DESC, id').all(userId).map(row => {
      const likes = db.prepare('SELECT count(*) AS n FROM likes WHERE catch_id=?').get(row.id).n;
      const liked = !!db.prepare('SELECT 1 FROM likes WHERE catch_id=? AND user_id=?').get(row.id, viewerId || '');
      return { ...JSON.parse(row.body), id: row.id, userId, photo: urlFor(row.media_id), mediaId: row.media_id, videoId: null, videoUrl: row.video_id ? urlFor(row.video_id) : null, createdAt: row.created_at, likesBase: likes, liked };
    });
  }
  function entry(user, viewerId) {
    const catches = catchesOf(user.id, viewerId), cards = cardsFor(catches);
    const owned = Object.values(cards), valid = owned.filter(c => c.verifiedUnlocked);
    const sorted = owned.slice().sort((a, b) => ['N', 'R', 'SR', 'SSR'].indexOf(byId[b.speciesId].rarity) - ['N', 'R', 'SR', 'SSR'].indexOf(byId[a.speciesId].rarity));
    return {
      id: user.id === viewerId ? 'me' : user.id, serverId: user.id, nickname: user.nickname, bio: user.bio, city: user.city,
      me: user.id === viewerId, count: valid.length, urs: owned.filter(c => c.giant.status === 'approved').length,
      reachedAt: valid.length ? Math.max(...valid.map(c => Math.min(...catches.filter(x => x.speciesId === c.speciesId && x.verified).map(x => x.createdAt)))) : 0,
      best: sorted[0]?.speciesId || species[0].no, top3: sorted.slice(0, 3).map(c => c.speciesId),
      byRarity: owned.reduce((m, c) => { const rk = byId[c.speciesId].rarity; m[rk] = (m[rk] || 0) + 1; return m; }, {}),
      owned: owned.map(c => c.speciesId), cards, catches
    };
  }
  function ranking(viewer, scope, entries) {
    let list = entries || db.prepare('SELECT * FROM users').all().map(u => entry(u, viewer.id));
    list = list.filter(u => u.count && (scope !== 'city' || u.city === viewer.city));
    list.sort((a, b) => b.count - a.count || b.urs - a.urs || a.reachedAt - b.reachedAt || a.serverId.localeCompare(b.serverId));
    list = list.map(({ cards, catches, ...u }, i) => ({ ...u, rank: i + 1 }));
    return { top: list.slice(0, 100), me: list.find(u => u.me) || null, total: list.length, generatedAt: nowFn() };
  }
  function sizes(viewer, scope, entries) {
    const result = {};
    for (const sp of species) {
      let list = entries.filter(u => scope !== 'city' || u.city === viewer.city).flatMap(u => {
        const c = u.catches.filter(c => c.speciesId === sp.no && c.status === 'confirmed' && c.verified && c.lengthCm).sort((a, b) => b.lengthCm - a.lengthCm || a.createdAt - b.createdAt)[0];
        return c ? [{ id: u.id, me: u.me, nickname: u.nickname, city: u.city, place: c.location.city, lengthCm: c.lengthCm, at: c.createdAt }] : [];
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
    return {
      v: 1, me: meOf(user), settings: { sfx: true, haptics: true, ...JSON.parse(user.settings) },
      catches: mine.catches, cards: mine.cards,
      ranks: { nation: ranking(user, 'nation', entries), city: ranking(user, 'city', entries) },
      sizeRanks: { nation: sizes(user, 'nation', entries), city: sizes(user, 'city', entries) }
    };
  }
  function issue(identity) {
    let user = db.prepare('SELECT * FROM users WHERE identity=?').get(identity);
    if (!user) {
      const id = randomUUID();
      db.prepare('INSERT INTO users(id,identity,nickname,city,created_at) VALUES(?,?,?,?,?)').run(id, identity, '新钓友', '杭州', nowFn());
      user = getUser(id);
    }
    db.prepare('DELETE FROM sessions WHERE expires_at<?').run(nowFn());
    const token = randomBytes(32).toString('base64url');
    const expiresAt = nowFn() + 30 * 86400000;
    db.prepare('INSERT INTO sessions VALUES(?,?,?)').run(sha(token), user.id, expiresAt);
    return { token, expiresAt, me: meOf(user) };
  }
  app.get('/api/health', (req, res) => {
    db.prepare('SELECT 1').get();
    res.json({ ok: true, version: '0.2.0', storage: 'sqlite', mode: production ? 'production' : 'development', devLogin: !production, wechatLogin: !!(process.env.WECHAT_APP_ID && process.env.WECHAT_APP_SECRET) });
  });
  app.get('/api/species', (req, res) => res.json({ species, protectedSpecies, version: 1 }));
  app.post('/api/auth/dev', (req, res) => {
    if (production) fail(404, 'NOT_FOUND', '接口不存在');
    throttle(`auth:${req.ip}`, 20);
    const { deviceKey } = parse(z.object({ deviceKey: z.string().min(32).max(160) }), req.body);
    res.json(issue(`dev:${sha(deviceKey)}`));
  });
  app.post('/api/auth/wechat', async (req, res) => {
    throttle(`auth:${req.ip}`, 20);
    const { code } = parse(z.object({ code: z.string().min(1).max(256) }), req.body);
    if (!process.env.WECHAT_APP_ID || !process.env.WECHAT_APP_SECRET) fail(503, 'WECHAT_UNCONFIGURED', '微信登录尚未配置');
    const query = new URLSearchParams({ appid: process.env.WECHAT_APP_ID, secret: process.env.WECHAT_APP_SECRET, js_code: code, grant_type: 'authorization_code' });
    let data;
    try {
      const response = await fetch(`https://api.weixin.qq.com/sns/jscode2session?${query}`, { signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error('upstream');
      data = await response.json();
    } catch { fail(502, 'WECHAT_UNAVAILABLE', '微信服务暂时无法连接，请重试'); }
    if (!data.openid || data.errcode) fail(401, 'WECHAT_LOGIN', '微信登录已过期，请重新登录');
    res.json(issue(`wx:${data.openid}`));
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
    const card = cardsFor(catchesOf(user.id))[c.speciesId];
    res.json({ v: 1, by: user.nickname, s: c.speciesId, ur: row.ur && card.giant.status === 'approved' ? 1 : 0, st: card.stars, len: c.lengthCm, city: c.location.city, t: c.createdAt, d: c.desc, id: c.id, photo: c.photo, videoUrl: c.videoUrl });
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
      const before = sp ? cardsFor(catchesOf(req.user.id))[sp.no] : null;
      const c = {
        status: protectedItem ? 'protected' : 'confirmed', speciesId: protectedItem ? null : sp.no,
        ...(protectedItem ? { protectedName: protectedItem.name, protectedLatin: protectedItem.latin, protectedLevel: protectedItem.level } : {}),
        source: form.source, verified: !protectedItem && form.source === 'camera', desc: form.desc,
        location: form.location, gear: form.gear, lengthCm: protectedItem ? null : form.lengthCm || null,
        released: protectedItem ? true : sp.releasePolicy === 'forbid' ? false : form.released,
        duration: video?.duration || 0
      };
      const id = randomUUID();
      db.prepare('INSERT INTO catches VALUES(?,?,?,?,?,?,?,?,?)').run(id, req.user.id, c.speciesId, c.status, JSON.stringify(c), media.hash, media.id, video?.id || null, now);
      db.prepare('INSERT INTO submissions VALUES(?,?)').run(req.user.id, now);
      const catches = catchesOf(req.user.id), card = sp ? cardsFor(catches)[sp.no] : null;
      const response = { events: sp ? eventsFor(before, card) : ['protected'], card, catchObj: catches.find(c => c.id === id), species: sp || null, rankDelta: 0 };
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
    const patch = parse(z.object({ desc: text(200).min(1).optional(), released: z.boolean().optional(), gear: gearSchema.optional() }), req.body);
    if (c.status === 'protected') patch.released = true;
    if (byId[c.speciesId]?.releasePolicy === 'forbid') patch.released = false;
    db.prepare('UPDATE catches SET body=? WHERE id=?').run(JSON.stringify({ ...c, ...patch }), row.id);
    res.json(catchesOf(req.user.id).find(c => c.id === row.id));
  });
  function cleanupMedia(userId, ids) {
    const rows = db.prepare('SELECT * FROM media WHERE user_id=? AND id NOT IN (SELECT media_id FROM catches UNION SELECT video_id FROM catches WHERE video_id IS NOT NULL)').all(userId);
    for (const row of rows) { if (ids && !ids.includes(row.id)) continue; db.prepare('DELETE FROM media WHERE id=?').run(row.id); try { unlinkSync(join(mediaDir, row.filename)); } catch {} }
  }
  app.delete('/api/catches/:id', (req, res) => {
    const c = ownedCatch(req);
    db.prepare('DELETE FROM catches WHERE id=?').run(c.id);
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
  app.get('/api/ranks/:speciesId', (req, res) => {
    if (!byId[req.params.speciesId]) fail(404, 'NOT_FOUND', '鱼种不存在');
    res.json(sizes(req.user, req.query.scope === 'city' ? 'city' : 'nation', db.prepare('SELECT * FROM users').all().map(u => entry(u, req.user.id)))[req.params.speciesId]);
  });
  app.get('/api/users/:id', (req, res) => {
    const user = getUser(req.params.id);
    if (!user) fail(404, 'NOT_FOUND', '钓友不存在');
    const p = entry(user, req.user.id), { catches, cards, ...u } = p;
    res.json({ user: u, cards, catches: catches.filter(c => c.status === 'confirmed').map(publicCatch) });
  });
  app.post('/api/shares', (req, res) => {
    const { catchId, ur } = parse(z.object({ catchId: z.string().uuid(), ur: z.boolean().default(false) }), req.body);
    const c = db.prepare("SELECT * FROM catches WHERE id=? AND user_id=? AND status='confirmed'").get(catchId, req.user.id);
    if (!c) fail(404, 'NOT_FOUND', '可分享的渔获不存在');
    const id = randomBytes(12).toString('base64url');
    db.prepare('INSERT INTO shares VALUES(?,?,?,?,?)').run(id, req.user.id, catchId, ur ? 1 : 0, nowFn());
    res.status(201).json({ id });
  });
  app.delete('/api/shares/:id', (req, res) => {
    const result = db.prepare('DELETE FROM shares WHERE id=? AND user_id=?').run(req.params.id, req.user.id);
    if (!result.changes) fail(404, 'NOT_FOUND', '分享不存在');
    res.status(204).end();
  });
  app.get('/api/me/export', (req, res) => res.json({ exportedAt: nowFn(), ...bootstrap(req.user) }));
  app.delete('/api/me/catches', (req, res) => {
    db.prepare('DELETE FROM catches WHERE user_id=?').run(req.user.id);
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
  for (const directory of ['css', 'js', 'img', 'vendor', 'fonts', 'fishcard', 'marble-study']) {
    app.use(`/${directory}`, express.static(join(staticDir, directory), { dotfiles: 'deny' }));
  }
  app.get(['/', '/index.html'], (req, res) => res.sendFile(join(staticDir, 'index.html')));
  app.get('/favicon.ico', (req, res) => res.status(204).end());
  app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    const uploadError = err instanceof multer.MulterError;
    const status = err.status || (uploadError ? 413 : 500);
    if (status >= 500) console.error(JSON.stringify({ requestId: res.getHeader('X-Request-Id'), code: err.code || 'INTERNAL', message: err instanceof ApiError ? err.message : 'Internal server error' }));
    res.status(status).json({ error: { code: uploadError ? 'UPLOAD_LIMIT' : err.code || 'INTERNAL', message: uploadError ? '文件不能超过 60MB，且每次只能上传一个文件' : status >= 500 && !(err instanceof ApiError) ? '服务暂时不可用，请重试' : err.message, requestId: res.getHeader('X-Request-Id') } });
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
