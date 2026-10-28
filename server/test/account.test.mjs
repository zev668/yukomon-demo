import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { createApp } from '../app.mjs';
import { hashSecret, verifySecret } from '../auth/passwords.mjs';

async function fixture({ dataDir, ...options } = {}) {
  const dir = dataDir || mkdtempSync(join(tmpdir(), 'yukomon-account-'));
  let now = Date.UTC(2026, 9, 26);
  const service = createApp({ dataDir: dir, now: () => now, production: true, ...options });
  const server = service.app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}/api`;
  async function api(path, { body, token, method = body ? 'POST' : 'GET', expected = 200 } = {}) {
    const response = await fetch(base + path, {
      method,
      headers: { ...(body ? { 'Content-Type': 'application/json' } : {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: body ? JSON.stringify(body) : undefined
    });
    const result = response.status === 204 ? null : await response.json();
    assert.ok((Array.isArray(expected) ? expected : [expected]).includes(response.status), `${method} ${path} (${response.status}): ${JSON.stringify(result)}`);
    return result;
  }
  return {
    ...service, api, dir,
    advance(ms) { now += ms; },
    async closeAll({ preserve = false } = {}) {
      await new Promise(resolve => server.close(resolve));
      service.close();
      if (!preserve) rmSync(dir, { force: true, recursive: true });
    }
  };
}

const credentials = { username: 'angler_01', password: 'river ! secret 2026' };
const register = (f, body = credentials) => f.api('/auth/register', { body, expected: 201 });

test('scrypt uses independent salts and verifies malformed or absent hashes safely', async () => {
  const one = await hashSecret('密码 with spaces 2026'), two = await hashSecret('密码 with spaces 2026');
  assert.notEqual(one, two);
  assert.match(one, /^scrypt\$32768\$8\$1\$[a-f0-9]{32}\$[a-f0-9]{64}$/);
  assert.equal(await verifySecret('密码 with spaces 2026', one), true);
  assert.equal(await verifySecret('wrong password', one), false);
  assert.equal(await verifySecret('wrong password', undefined), false);
  assert.equal(await verifySecret('wrong password', 'scrypt$999999999$8$1$broken'), false);
});

test('production supports normalized account registration and login without exposing credentials', async () => {
  const f = await fixture();
  try {
    const health = await f.api('/health');
    assert.equal(health.accountLogin, true); assert.equal(health.devLogin, false);
    const created = await register(f, { ...credentials, username: '  Angler_01  ', nickname: '独立钓友' });
    assert.equal(created.me.username, credentials.username);
    assert.equal(created.me.nickname, '独立钓友');
    assert.match(created.recoveryCode, /^[A-F0-9]{8}(?:-[A-F0-9]{8}){3}$/);
    const row = f.db.prepare('SELECT * FROM auth_credentials').get();
    assert.equal(await verifySecret(credentials.password, row.password_hash), true);
    assert.equal(await verifySecret(created.recoveryCode, row.recovery_hash), true);
    assert.ok(!JSON.stringify(row).includes(credentials.password));
    assert.ok(!JSON.stringify(row).includes(created.recoveryCode));
    await f.api('/auth/register', { body: { ...credentials, username: 'ANGLER_01' }, expected: 409 });
    assert.equal(f.db.prepare('SELECT count(*) AS n FROM users').get().n, 1);
    const login = await f.api('/auth/login', { body: { ...credentials, username: 'ANGLER_01' } });
    assert.equal(login.me.serverId, created.me.serverId);
    assert.notEqual(login.token, created.token);
    assert.equal('recoveryCode' in login, false);
    const exported = await f.api('/me/export', { token: login.token });
    assert.equal(exported.me.username, credentials.username);
    assert.ok(!JSON.stringify(exported).includes(row.password_hash));
    assert.ok(!JSON.stringify(exported).includes(created.recoveryCode));
    await f.api('/auth/logout', { token: login.token, method: 'POST', expected: 204 });
    await f.api('/me', { token: login.token, expected: 401 });
    await f.api('/me', { token: created.token });
  } finally { await f.closeAll(); }
});

test('registration rejects invalid fields and hashes preserve password whitespace', async () => {
  const f = await fixture();
  try {
    for (const body of [
      { ...credentials, username: '用户' },
      { ...credentials, username: 'a' },
      { ...credentials, password: '         ' },
      { ...credentials, password: '鱼'.repeat(100) }
    ]) await f.api('/auth/register', { body, expected: 400 });
    const password = ' spaces stay 2026 ';
    await register(f, { ...credentials, password });
    await f.api('/auth/login', { body: { ...credentials, password } });
    const failure = await f.api('/auth/login', { body: { ...credentials, password: password.trim() }, expected: 401 });
    assert.equal(failure.error.code, 'LOGIN_FAILED');
  } finally { await f.closeAll(); }
});

test('unknown accounts and incorrect passwords use the same public error', async () => {
  const f = await fixture();
  try {
    await register(f);
    const wrong = await f.api('/auth/login', { body: { ...credentials, password: 'different password' }, expected: 401 });
    const absent = await f.api('/auth/login', { body: { ...credentials, username: 'missing_account' }, expected: 401 });
    assert.equal(wrong.error.code, absent.error.code);
    assert.equal(wrong.error.message, absent.error.message);
    assert.equal(f.db.prepare('SELECT count(*) AS n FROM users').get().n, 1);
  } finally { await f.closeAll(); }
});

test('recovery rotates the code and password, revokes all existing sessions and preserves user data', async () => {
  const f = await fixture();
  try {
    const created = await register(f);
    const oldLogin = await f.api('/auth/login', { body: credentials });
    await f.api('/me', { token: created.token, method: 'PATCH', body: { bio: '保留我的资料' } });
    const newPassword = 'replacement secret 2026';
    const recovered = await f.api('/auth/recover', { body: { username: 'ANGLER_01', recoveryCode: created.recoveryCode.toLowerCase(), newPassword } });
    assert.notEqual(recovered.recoveryCode, created.recoveryCode);
    assert.equal(recovered.me.serverId, created.me.serverId);
    assert.equal(recovered.me.bio, '保留我的资料');
    await f.api('/me', { token: created.token, expected: 401 });
    await f.api('/me', { token: oldLogin.token, expected: 401 });
    await f.api('/me', { token: recovered.token });
    await f.api('/auth/login', { body: credentials, expected: 401 });
    await f.api('/auth/login', { body: { ...credentials, password: newPassword } });
    await f.api('/auth/recover', { body: { username: credentials.username, recoveryCode: created.recoveryCode, newPassword: 'another replacement 2026' }, expected: 401 });
    assert.equal(f.db.prepare('SELECT count(*) AS n FROM users').get().n, 1);
  } finally { await f.closeAll(); }
});

test('a recovery code can only win once when two resets run concurrently', async () => {
  const f = await fixture();
  try {
    const created = await register(f);
    const body = { username: credentials.username, recoveryCode: created.recoveryCode, newPassword: 'replacement password 2026' };
    const results = await Promise.all([
      f.api('/auth/recover', { body, expected: [200, 401] }),
      f.api('/auth/recover', { body, expected: [200, 401] })
    ]);
    assert.equal(results.filter(result => result.token).length, 1);
    assert.equal(results.filter(result => result.error?.code === 'RECOVERY_FAILED').length, 1);
    assert.equal(f.db.prepare('SELECT count(*) AS n FROM sessions').get().n, 1);
  } finally { await f.closeAll(); }
});

test('concurrent registrations reserve one normalized username without orphan users', async () => {
  const f = await fixture();
  try {
    const results = await Promise.all([
      f.api('/auth/register', { body: credentials, expected: [201, 409] }),
      f.api('/auth/register', { body: { ...credentials, username: 'ANGLER_01' }, expected: [201, 409] })
    ]);
    assert.equal(results.filter(result => result.token).length, 1);
    assert.equal(results.filter(result => result.error?.code === 'USERNAME_TAKEN').length, 1);
    assert.equal(f.db.prepare('SELECT count(*) AS n FROM users').get().n, 1);
    assert.equal(f.db.prepare('SELECT count(*) AS n FROM auth_credentials').get().n, 1);
  } finally { await f.closeAll(); }
});

test('authenticated security changes require the password, rotate recovery and revoke old sessions on password change', async () => {
  const f = await fixture();
  try {
    const created = await register(f), other = await f.api('/auth/login', { body: credentials });
    await f.api('/auth/recovery-code', { body: { password: credentials.password }, expected: 401 });
    await f.api('/auth/password', { token: created.token, body: { password: 'incorrect password', newPassword: 'replacement password 2026' }, expected: 401 });
    const code = await f.api('/auth/recovery-code', { token: created.token, body: { password: credentials.password } });
    assert.deepEqual(Object.keys(code), ['recoveryCode']);
    assert.notEqual(code.recoveryCode, created.recoveryCode);
    const account = f.db.prepare('SELECT * FROM auth_credentials').get();
    assert.equal(await verifySecret(code.recoveryCode, account.recovery_hash), true);
    await f.api('/me', { token: other.token });
    const newPassword = 'my updated password 2026';
    const changed = await f.api('/auth/password', { token: created.token, body: { password: credentials.password, newPassword } });
    assert.notEqual(changed.recoveryCode, code.recoveryCode);
    await f.api('/me', { token: created.token, expected: 401 });
    await f.api('/me', { token: other.token, expected: 401 });
    await f.api('/me', { token: changed.token });
    await f.api('/auth/login', { body: credentials, expected: 401 });
    await f.api('/auth/login', { body: { ...credentials, password: newPassword } });
    await f.api('/auth/recover', { body: { username: credentials.username, recoveryCode: code.recoveryCode, newPassword: credentials.password }, expected: 401 });
  } finally { await f.closeAll(); }
});

test('registration and password attempts are rate limited with an expiring account window', async () => {
  const f = await fixture();
  try {
    await register(f);
    for (let i = 0; i < 10; i++) {
      await f.api('/auth/login', { body: { ...credentials, password: 'incorrect password 2026' }, expected: 401 });
    }
    const limited = await f.api('/auth/login', { body: credentials, expected: 429 });
    assert.equal(limited.error.code, 'RATE_LIMIT');
    f.advance(900001);
    await f.api('/auth/login', { body: credentials });
    for (let i = 0; i < 4; i++) await f.api('/auth/register', { body: credentials, expected: 409 });
    await f.api('/auth/register', { body: { ...credentials, username: 'next_account' }, expected: 429 });
    assert.equal(f.db.prepare('SELECT count(*) AS n FROM users').get().n, 1);
  } finally { await f.closeAll(); }
});

test('account credentials survive restart and account deletion removes credentials and sessions', async () => {
  const first = await fixture();
  let created;
  try { created = await register(first); }
  finally { await first.closeAll({ preserve: true }); }
  const f = await fixture({ dataDir: first.dir });
  try {
    const login = await f.api('/auth/login', { body: credentials });
    assert.equal(login.me.serverId, created.me.serverId);
    await f.api('/me', { token: login.token, method: 'DELETE', expected: 204 });
    await f.api('/me', { token: created.token, expected: 401 });
    await f.api('/me', { token: login.token, expected: 401 });
    assert.equal(f.db.prepare('SELECT count(*) AS n FROM auth_credentials').get().n, 0);
    assert.equal(f.db.prepare('SELECT count(*) AS n FROM sessions').get().n, 0);
    await f.api('/auth/login', { body: credentials, expected: 401 });
    await f.api('/auth/recover', { body: { username: credentials.username, recoveryCode: created.recoveryCode, newPassword: 'a replacement password' }, expected: 401 });
    const replacement = await register(f);
    assert.notEqual(replacement.me.serverId, created.me.serverId);
  } finally { await f.closeAll(); }
});

test('credential migration preserves existing users from the previous schema', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'yukomon-account-migration-'));
  const legacy = new DatabaseSync(join(dir, 'yukomon.sqlite'));
  legacy.exec(`CREATE TABLE users (
    id TEXT PRIMARY KEY, identity TEXT UNIQUE NOT NULL, nickname TEXT NOT NULL,
    city TEXT NOT NULL, bio TEXT NOT NULL DEFAULT '', settings TEXT NOT NULL DEFAULT '{}', created_at INTEGER NOT NULL
  ); PRAGMA user_version=2;`);
  legacy.prepare('INSERT INTO users(id,identity,nickname,city,created_at) VALUES(?,?,?,?,?)').run('legacy-user', 'wx:legacy', '旧钓友', '杭州', 1);
  legacy.close();
  const f = await fixture({ dataDir: dir });
  try {
    assert.equal(f.db.prepare('PRAGMA user_version').get().user_version, 3);
    assert.equal(f.db.prepare('SELECT nickname FROM users WHERE id=?').get('legacy-user').nickname, '旧钓友');
    await register(f);
    assert.equal(f.db.prepare('SELECT count(*) AS n FROM users').get().n, 2);
    assert.equal(f.db.prepare('SELECT count(*) AS n FROM auth_credentials').get().n, 1);
  } finally { await f.closeAll(); }
});
