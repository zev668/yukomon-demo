import express from 'express';
import { closeSync, lstatSync, openSync, readFileSync, readSync, realpathSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { basename, dirname, join, resolve } from 'node:path';

const safeName = /^[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z0-9][a-z0-9.-]*)?\.apk$/;
const string = value => typeof value === 'string' ? value.trim() : '';
const readJson = path => { try { return JSON.parse(readFileSync(path, 'utf8')); } catch { return {}; } };
const verifiedArtifacts = new Map();
function verifyArtifact(path, info, expected) {
  const signature = `${info.size}:${info.mtimeMs}:${info.ctimeMs}:${expected}`;
  const cached = verifiedArtifacts.get(path);
  if (cached?.signature === signature) return cached.valid;
  const hash = createHash('sha256'), buffer = Buffer.alloc(1024 * 1024), fd = openSync(path, 'r');
  try {
    let bytes;
    while ((bytes = readSync(fd, buffer, 0, buffer.length, null))) hash.update(buffer.subarray(0, bytes));
  } finally { closeSync(fd); }
  const valid = hash.digest('hex') === expected;
  verifiedArtifacts.set(path, { signature, valid });
  return valid;
}

export function validAppStoreUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'apps.apple.com' && !url.username && !url.password && !url.port && /\/id[1-9][0-9]{5,}(?:\/|$)/.test(url.pathname);
  } catch { return false; }
}

export function productionMetadataMissing(site = {}) {
  const missing = [];
  if (!string(site.operator?.name)) missing.push('运营者姓名');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string(site.operator?.email))) missing.push('联系邮箱');
  if (!/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(string(site.domain))) missing.push('已实名域名');
  if (!string(site.filing?.website)) missing.push('网站 ICP 备案号');
  if (!string(site.filing?.app)) missing.push('App 备案号');
  return missing;
}

function releaseState(root) {
  const site = readJson(join(root, 'site.json'));
  const release = readJson(join(root, 'release.json'));
  const android = release.android || {};
  const missing = productionMetadataMissing(site);
  let filePath;
  if (safeName.test(string(android.filename)) && basename(android.filename) === android.filename) {
    const candidate = join(root, 'releases', android.filename);
    try {
      const info = lstatSync(candidate);
      const releasesRoot = realpathSync(join(root, 'releases'));
      if (info.isFile() && !info.isSymbolicLink() && dirname(realpathSync(candidate)) === releasesRoot && info.size > 0 && info.size === android.sizeBytes && /^[a-f0-9]{64}$/.test(android.sha256 || '') && Number.isSafeInteger(android.versionCode) && android.versionCode > 0 && ['test', 'production'].includes(android.channel) && (android.channel === 'test' || (!missing.length && site.releaseStatus === 'published')) && verifyArtifact(candidate, info, android.sha256)) filePath = candidate;
    } catch { /* A manifest without its artifact is unavailable. */ }
  }
  const storeUrl = validAppStoreUrl(site.appStoreUrl) ? new URL(site.appStoreUrl).href : null;
  return {
    filePath,
    manifest: {
      schemaVersion: 1,
      productName: string(site.productName) || '鱼可梦 Yukomon',
      releaseStatus: site.releaseStatus === 'published' && !missing.length ? 'published' : 'draft',
      site: {
        domain: string(site.domain),
        operator: { name: string(site.operator?.name), email: string(site.operator?.email) },
        filing: { website: string(site.filing?.website), app: string(site.filing?.app), publicSecurity: string(site.filing?.publicSecurity) },
        privacyUpdatedAt: string(site.privacyUpdatedAt)
      },
      readiness: { productionReady: missing.length === 0, missing },
      android: filePath ? {
        available: true,
        version: string(android.version),
        versionCode: android.versionCode,
        channel: android.channel,
        sizeBytes: android.sizeBytes,
        sha256: android.sha256,
        url: `/download/releases/${encodeURIComponent(android.filename)}`,
        publishedAt: string(android.publishedAt)
      } : { available: false, channel: null, url: null },
      ios: { available: !!storeUrl, appStoreUrl: storeUrl }
    }
  };
}

export function mountDistribution(app, { root }) {
  const websiteRoot = resolve(root);
  app.get('/api/releases', (_req, res) => {
    res.set('Cache-Control', 'no-store').json(releaseState(websiteRoot).manifest);
  });
  app.get('/download/releases/:filename', (req, res) => {
    const state = releaseState(websiteRoot);
    const expected = state.manifest.android.url?.split('/').pop();
    if (!safeName.test(req.params.filename) || encodeURIComponent(req.params.filename) !== expected || !state.filePath) return res.status(404).type('text').send('安装包不存在');
    res.set('Cache-Control', 'public, max-age=3600');
    res.set('X-Content-Type-Options', 'nosniff');
    res.type('application/vnd.android.package-archive');
    return res.download(state.filePath, req.params.filename, error => {
      if (error && !res.headersSent) res.status(404).type('text').send('安装包不存在');
    });
  });
  app.use('/download/releases', (_req, res) => res.status(404).type('text').send('安装包不存在'));
  app.get('/download', (req, res, next) => req.path.endsWith('/') ? next() : res.redirect(308, '/download/'));
  app.get(['/privacy', '/terms', '/support'], (req, res) => {
    const page = req.path.slice(1);
    res.set('Cache-Control', 'no-cache').sendFile(join(websiteRoot, `${page}.html`));
  });
  app.get('/download/', (_req, res) => res.set('Cache-Control', 'no-cache').sendFile(join(websiteRoot, 'index.html')));
  app.use('/download', (req, res, next) => {
    if (!['/site.js', '/site.css'].includes(req.path) && !req.path.startsWith('/assets/')) return res.status(404).end();
    next();
  }, express.static(websiteRoot, {
    index: 'index.html',
    dotfiles: 'deny',
    fallthrough: false,
    setHeaders(res, path) {
      res.setHeader('Cache-Control', /\.(?:webp|png|svg|css|js)$/.test(path) ? 'public, max-age=3600' : 'no-cache');
      res.setHeader('X-Content-Type-Options', 'nosniff');
    }
  }));
  return app;
}
