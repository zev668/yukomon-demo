import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, lstatSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, relative, join } from 'node:path';
import { tmpdir } from 'node:os';

const root = resolve(import.meta.dirname, '..');
const gh = process.env.GH_BIN || (process.platform === 'win32' ? join(tmpdir(), 'yukomon-gh-cli/bin/gh.exe') : 'gh');
const repo = 'repos/zev668/yukomon-demo';
function api(path, body, method = 'GET') {
  const args = ['api', '--method', method, path];
  if (body) args.push('--input', '-');
  return JSON.parse(execFileSync(gh, args, { input: body ? JSON.stringify(body) : undefined, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, windowsHide: true }));
}
function blobSha(bytes) { return createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex'); }
const files = new Map();
function add(path, target = path) {
  const absolute = join(root, path);
  if (!existsSync(absolute) || !lstatSync(absolute).isFile()) throw new Error(`Missing release source: ${path}`);
  const bytes = readFileSync(absolute);
  files.set(target.replaceAll('\\', '/'), { path: target.replaceAll('\\', '/'), source: absolute, bytes, sha: blobSha(bytes) });
}
function walk(path, accept, targetRoot = path) {
  for (const name of readdirSync(join(root, path), { withFileTypes: true })) {
    const child = join(path, name.name);
    if (name.isSymbolicLink()) throw new Error(`Release refuses symbolic link: ${child}`);
    if (name.isDirectory()) { if (!['node_modules', 'data', 'backups', '.git'].includes(name.name)) walk(child, accept, targetRoot); }
    else if (accept(child)) add(child, relative(targetRoot, child));
  }
}
const site = existsSync(join(root, 'demo/index.html')) ? 'demo' : '.';
const webExtensions = /\.(html|css|js|json|svg|woff2?|avif|webp|png|jpe?g|gif|ico|mp4|webm)$/i;
for (const directory of ['css', 'js', 'img', 'vendor', 'fonts', 'fishcard', 'marble-study']) if (existsSync(join(root, site, directory))) walk(join(site, directory), p => webExtensions.test(p), site);
add(join(site, 'index.html'), 'index.html');
for (const path of ['package.json', 'package-lock.json', 'Dockerfile', 'compose.yaml', '.dockerignore', 'README.md',
  'server/app.mjs', 'server/index.mjs', 'server/database.mjs', 'server/catalog.mjs', 'server/backup.mjs', 'server/.env.example', 'server/README.md', 'server/test/api.test.mjs',
  'clients/wechat/api.js', 'ReflectiveCard.jsx', 'ReflectiveCard.css', 'YukomonFishCard.jsx', 'YukomonFishCard.css',
  'reflective-card-preview/package.json', 'reflective-card-preview/package-lock.json', 'reflective-card-preview/vite.config.js', 'reflective-card-preview/vite.app.config.js', 'reflective-card-preview/index.html',
  'reflective-card-preview/src/main.jsx', 'reflective-card-preview/src/MaterialLab.jsx', 'reflective-card-preview/src/material-settings.js',
  'reflective-card-preview/src/preview.css', 'reflective-card-preview/src/app-card.jsx', 'reflective-card-preview/src/app-card.css', 'reflective-card-preview/src/app-material.json',
  'reflective-card-preview/public/assets/clownfish.webp', 'reflective-card-preview/public/assets/yukomon-logo.svg', 'reflective-card-preview/public/assets/yukomon-pixel-logo.svg',
  'reflective-card-preview/public/assets/reflective-card-reference.png', 'reflective-card-preview/public/videos/slow-ripples.mp4',
  'tools/test-connected.mjs', 'tools/check-card-motion.mjs', 'tools/check-tuned-card.mjs', 'tools/check-card-material.mjs', 'tools/build-ripple-video.mjs',
  'tools/publish-release.mjs', 'docs/RELEASE-0.2.0.md']) add(path);
add(existsSync(join(root, '.release.gitignore')) ? '.release.gitignore' : '.gitignore', '.gitignore');
for (const file of files.values()) if (/\.(env|sqlite|keystore|pem|key)$|(^|\/)node_modules\/|(^|\/)data\//.test(file.path)) throw new Error(`Private path in manifest: ${file.path}`);
const branch = api(repo).default_branch;
const head = api(`${repo}/git/ref/heads/${branch}`).object.sha;
const base = api(`${repo}/git/commits/${head}`).tree.sha;
const tree = api(`${repo}/git/trees/${base}?recursive=1`);
if (tree.truncated) throw new Error('Remote tree is truncated');
const previous = new Map(tree.tree.filter(e => e.type === 'blob').map(e => [e.path, e.sha]));
const changed = [...files.values()].filter(f => previous.get(f.path) !== f.sha);
const manifest = { baseCommit: head, branch, compared: files.size, changed: changed.map(f => ({ path: f.path, bytes: f.bytes.length, sha: f.sha })) };
mkdirSync(join(root, 'output'), { recursive: true });
if (process.argv.includes('--stage')) {
  const staging = join(root, 'output/release-snapshot');
  for (const file of files.values()) { mkdirSync(resolve(staging, file.path, '..'), { recursive: true }); writeFileSync(join(staging, file.path), file.bytes); }
  console.log(`Staged release in ${staging}`);
}
writeFileSync(join(root, 'output/release-manifest.json'), JSON.stringify(manifest, null, 2));
console.log(JSON.stringify(manifest, null, 2));
if (!process.argv.includes('--push') || !changed.length) process.exit(0);
const updates = [];
for (const file of changed) {
  const blob = api(`${repo}/git/blobs`, { content: file.bytes.toString('base64'), encoding: 'base64' }, 'POST');
  if (blob.sha !== file.sha) throw new Error(`Upload hash mismatch: ${file.path}`);
  updates.push({ path: file.path, mode: '100644', type: 'blob', sha: blob.sha });
  console.log(`Uploaded ${file.path}`);
}
const nextTree = api(`${repo}/git/trees`, { base_tree: base, tree: updates }, 'POST');
const commit = api(`${repo}/git/commits`, { message: process.env.RELEASE_MESSAGE || 'Release 0.2.0: connected server and reflective pixel-glass cards', tree: nextTree.sha, parents: [head] }, 'POST');
if (api(`${repo}/git/ref/heads/${branch}`).object.sha !== head) throw new Error('Remote changed during upload; rerun to preserve its changes');
api(`${repo}/git/refs/heads/${branch}`, { sha: commit.sha, force: false }, 'PATCH');
const verified = api(`${repo}/git/trees/${commit.sha}?recursive=1`);
if (verified.truncated) throw new Error('Published tree is truncated');
const published = new Map(verified.tree.filter(e => e.type === 'blob').map(e => [e.path, e.sha]));
for (const file of files.values()) if (published.get(file.path) !== file.sha) throw new Error(`Published hash mismatch: ${file.path}`);
if (api(`${repo}/git/ref/heads/${branch}`).object.sha !== commit.sha) throw new Error('Published HEAD changed before verification');
const result = { commit: commit.sha, branch, verifiedFiles: files.size, url: `https://github.com/zev668/yukomon-demo/commit/${commit.sha}` };
writeFileSync(join(root, 'output/release-published.json'), JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
