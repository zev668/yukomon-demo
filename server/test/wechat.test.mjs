import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createApp } from '../app.mjs';

async function boot(fetchImpl) {
  const dir = mkdtempSync(join(tmpdir(), 'yukomon-wx-'));
  const service = createApp({ dataDir: dir, production: true, fetch: fetchImpl });
  const server = service.app.listen(0, '127.0.0.1');
  await new Promise(r => server.once('listening', r));
  const base = `http://127.0.0.1:${server.address().port}/api`;
  const post = async (path, body) => { const r = await fetch(base + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }); return { status: r.status, body: await r.json() }; };
  return { post, base, close: async () => { await new Promise(r => server.close(r)); service.close(); rmSync(dir, { recursive: true, force: true }); } };
}
const saved = { id: process.env.WECHAT_APP_ID, secret: process.env.WECHAT_APP_SECRET };
const restore = () => { for (const [k, v] of [['WECHAT_APP_ID', saved.id], ['WECHAT_APP_SECRET', saved.secret]]) if (v === undefined) delete process.env[k]; else process.env[k] = v; };

test('wechat login reports unconfigured without credentials', async () => {
  delete process.env.WECHAT_APP_ID; delete process.env.WECHAT_APP_SECRET;
  const f = await boot();
  try {
    const r = await f.post('/auth/wechat', { code: 'abc' });
    assert.equal(r.status, 503); assert.equal(r.body.error.code, 'WECHAT_UNCONFIGURED');
  } finally { await f.close(); restore(); }
});

test('wechat login exchanges code, uses unionid and nickname, and is stable', async () => {
  process.env.WECHAT_APP_ID = 'wx_test'; process.env.WECHAT_APP_SECRET = 'secret_test';
  const calls = [];
  const fake = async (url) => {
    calls.push(String(url));
    if (String(url).includes('/sns/oauth2/access_token')) return { ok: true, json: async () => ({ access_token: 'AT', openid: 'OPEN1', scope: 'snsapi_userinfo', unionid: 'UNION1' }) };
    if (String(url).includes('/sns/userinfo')) return { ok: true, json: async () => ({ nickname: '钓鱼的大鱼', unionid: 'UNION1' }) };
    throw new Error('unexpected');
  };
  const f = await boot(fake);
  try {
    const a = await f.post('/auth/wechat', { code: 'c1' });
    assert.equal(a.status, 200); assert.ok(a.body.token); assert.equal(a.body.me.nickname, '钓鱼的大鱼');
    assert.ok(calls[0].includes('appid=wx_test') && calls[0].includes('code=c1'));
    const b = await f.post('/auth/wechat', { code: 'c2' });
    assert.equal(b.body.me.id, a.body.me.id);
  } finally { await f.close(); restore(); }
});

test('wechat login rejects an invalid code', async () => {
  process.env.WECHAT_APP_ID = 'wx_test'; process.env.WECHAT_APP_SECRET = 'secret_test';
  const f = await boot(async () => ({ ok: true, json: async () => ({ errcode: 40029, errmsg: 'invalid code' }) }));
  try {
    const r = await f.post('/auth/wechat', { code: 'bad' });
    assert.equal(r.status, 401); assert.equal(r.body.error.code, 'WECHAT_LOGIN');
  } finally { await f.close(); restore(); }
});
