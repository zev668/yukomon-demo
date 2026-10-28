import { test } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { createHash } from 'node:crypto';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { mountDistribution } from '../distribution.mjs';

async function fixture(t, channel = 'test') {
  const root = mkdtempSync(join(tmpdir(), 'yukomon-distribution-'));
  mkdirSync(join(root, 'releases'));
  const content = Buffer.from('PK\x03\x04test artifact fixture');
  const sha256 = createHash('sha256').update(content).digest('hex');
  writeFileSync(join(root, 'releases/0.5.0.apk'), content);
  writeFileSync(join(root, 'site.json'), JSON.stringify({ domain: 'example.test' }));
  writeFileSync(join(root, 'release.json'), JSON.stringify({ android: { filename: '0.5.0.apk', version: '0.5.0', versionCode: 1, channel, sizeBytes: content.length, sha256 } }));
  const app = express(); mountDistribution(app, { root });
  const server = app.listen(0, '127.0.0.1');
  await new Promise(r => server.once('listening', r));
  t.after(async () => { await new Promise(r => server.close(r)); rmSync(root, { recursive: true, force: true }); });
  const base = `http://127.0.0.1:${server.address().port}`;
  return { root, base, content, sha256, manifest: async () => (await fetch(base + '/api/releases')).json() };
}

test('distribution serves only the manifested artifact with a matching content hash', async t => {
  const f = await fixture(t), manifest = await f.manifest();
  assert.equal(manifest.android.available, true);
  assert.equal(manifest.android.channel, 'test');
  assert.equal(manifest.releaseStatus, 'draft');
  assert.equal(manifest.ios.available, false);
  const response = await fetch(f.base + manifest.android.url);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-disposition'), /attachment/);
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), f.content);
  assert.equal((await fetch(f.base + '/download/releases/unlisted.apk')).status, 404);
  assert.equal((await fetch(f.base + '/download/site.json')).status, 404);
  assert.equal((await fetch(f.base + '/download/release.json')).status, 404);
});

test('a same-size changed APK invalidates the integrity cache and download', async t => {
  const f = await fixture(t);
  assert.equal((await f.manifest()).android.available, true);
  writeFileSync(join(f.root, 'releases/0.5.0.apk'), Buffer.alloc(f.content.length, 0));
  assert.equal((await f.manifest()).android.available, false);
  assert.equal((await fetch(f.base + '/download/releases/0.5.0.apk')).status, 404);
});

test('production downloads remain unavailable without completed publication metadata', async t => {
  const f = await fixture(t, 'production');
  assert.equal((await f.manifest()).android.available, false);
  assert.equal((await fetch(f.base + '/download/releases/0.5.0.apk')).status, 404);
});
