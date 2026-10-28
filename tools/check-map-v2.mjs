// Browser check for the photo-bubble map against the real Tencent GL SDK.
// Requires the local server on 8787 with TENCENT_MAP_BROWSER_KEY configured.
import { chromium } from 'playwright';
import fs from 'node:fs';
import sharp from 'sharp';

const out = 'output/playwright/map-v2';
fs.mkdirSync(out, { recursive: true });
const base = process.env.YK_BASE || 'http://127.0.0.1:8787';
const colors = ['#2a7f62', '#7a5a2e', '#2f5d8a', '#8a3b3b', '#556b2f', '#6b4f8a'];
const photos = await Promise.all(colors.map(c => sharp({ create: { width: 240, height: 240, channels: 3, background: c } }).jpeg().toBuffer()));
const now = Date.now();
// Hangzhou: three spots close together (cluster at low zoom), two farther away, one stacked pair.
const spots = [
  ['西湖区附近水域', 30.2465, 120.1405, '039'], ['西湖区附近水域', 30.2555, 120.1505, '002'], ['西湖区附近水域', 30.2385, 120.1325, '008'],
  ['余杭区附近水域', 30.4185, 120.2995, '034'], ['富阳区附近水域', 30.0485, 119.9605, '001'], ['淳安县附近水域', 29.6085, 119.0405, '031']
];
const cells = spots.map(([place, lat, lng, sp], i) => ({
  id: `cell-${i}`, lat, lng, coordType: 'gcj02', gridSizeMeters: 1000, city: '杭州', district: place.replace('附近水域', ''), place,
  publicUserCount: 3, speciesCount: 2, catchCount: 2 + i, latestAt: now - i * 3600000,
  records: [0, 1].map(j => ({ id: `r-${i}-${j}`, userId: `u${j}`, nickname: ['阿鱼', '老钓', '小李'][j], speciesId: j ? '001' : sp, lengthCm: 30 + i + j, createdAt: now - (i + j) * 3600000, photo: `${base}/__photo/${(i + j) % photos.length}.jpg`, location: { city: '杭州', district: '', place } }))
}));

const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader', '--ignore-gpu-blocklist'] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
await page.route('**/__photo/*.jpg', r => r.fulfill({ status: 200, contentType: 'image/jpeg', body: photos[Number(r.request().url().match(/(\d+)\.jpg/)[1])] }));
await page.route('**/api/map/cells**', r => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ cells }) }));
await page.goto(base + '/');
await page.waitForFunction(() => !!window.YK_APP && window.YK_API?.connected && window.YK_API?.remote, null, { timeout: 30000 });
const result = {};
result.mode = await page.evaluate(() => window.YK_MAP_PROVIDER.mode);
await page.evaluate(() => window.YK_APP.go('map'));
await page.waitForTimeout(800);
await page.evaluate(() => window.YK_APP.go('map')); // re-render once cells arrive
await page.waitForFunction(() => document.querySelector('.map-fallback')?.hidden || /失败|超时|不可用/.test(document.querySelector('[data-map-status]')?.textContent || ''), null, { timeout: 30000 });
result.status = await page.evaluate(() => document.querySelector('[data-map-status]')?.textContent);
result.fallbackHidden = await page.evaluate(() => document.querySelector('.map-fallback')?.hidden);
await page.waitForTimeout(3500);
const bubbles = () => page.evaluate(() => [...document.querySelectorAll('.map-bubbles .map-bubble')].map(b => ({ cluster: b.classList.contains('is-cluster'), n: b._cluster?.items.length, label: b.querySelector('.mb-label')?.textContent, count: b.querySelector('.mb-count')?.textContent })));
result.initial = await bubbles();
result.stack = await page.evaluate(() => { const b = document.querySelector('.map-bubbles .map-bubble'); if (!b) return null; const r = b.getBoundingClientRect(); const top = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); const chain = []; for (let n = top; n && chain.length < 6; n = n.parentElement) chain.push(`${n.tagName}.${[...n.classList].join('.')} z=${getComputedStyle(n).zIndex} pos=${getComputedStyle(n).position}`); const root = document.querySelector('.tmap-root'); return { top: chain, children: [...root.children].map(c => `${c.tagName}.${c.className} z=${getComputedStyle(c).zIndex}`) }; });
result.summary = await page.evaluate(() => document.querySelector('[data-map-summary]')?.textContent);
await page.screenshot({ path: `${out}/01-overview.png` });
// Zoom out: everything near the city should merge.
for (let i = 0; i < 3; i++) { await page.locator('[data-map-zoom-out]').click(); await page.waitForTimeout(500); }
await page.waitForTimeout(1500);
result.zoomedOut = await bubbles();
await page.screenshot({ path: `${out}/02-zoomed-out.png` });
console.log(JSON.stringify(result.stack, null, 1));
// Tap a cluster: should zoom in and split.
const cluster = page.locator('.map-bubbles .map-bubble.is-cluster').first();
if (await cluster.count()) {
  await cluster.click(); await page.waitForTimeout(2200);
  result.afterClusterTap = await bubbles();
  await page.screenshot({ path: `${out}/03-split.png` });
}
// Tap a single bubble: detail sheet.
const single = page.locator('.map-bubbles .map-bubble:not(.is-cluster)').first();
if (await single.count()) {
  await single.click(); await page.waitForTimeout(900);
  result.sheet = await page.evaluate(() => { const s = document.querySelector('.map-detail-sheet'); return s && { title: s.querySelector('h2')?.textContent, stats: s.querySelector('.map-detail-stats')?.innerText.replace(/\s+/g, ' '), photos: s.querySelectorAll('.map-photo').length, rows: s.querySelectorAll('.map-catch-row').length, cta: s.querySelector('[data-go-map-catch]')?.textContent }; });
  await page.screenshot({ path: `${out}/04-detail.png` });
}
result.errors = errors;
result.layout = await page.evaluate(() => {
  const r = s => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) }; };
  const sheet = document.querySelector('.map-detail-sheet');
  const cs = s => { const e = sheet?.querySelector(s); if (!e) return null; const c = getComputedStyle(e); return `${c.fontSize}/${c.fontWeight} ${c.color}`; };
  return { filters: r('.map-filters'), summary: r('.map-summary'), zoom: r('.map-zoom'), locate: r('.map-locate'), tabbar: r('#tabbar'), sheet: r('.map-detail-sheet'), h2: cs('h2'), stat: cs('.map-detail-stats b'), row: cs('.map-catch-row b'), cta: r('.map-detail-sheet [data-go-map-catch]') };
});
// Is the GL canvas actually drawing tiles (not blank)?
await page.evaluate(() => window.YK_APP.closeAll());
await page.waitForTimeout(600);
const shot = await page.locator('.tmap-root canvas').screenshot();
const { data, info } = await sharp(shot).raw().toBuffer({ resolveWithObject: true });
let min = 255, max = 0; for (let i = 0; i < data.length; i += info.channels * 97) { min = Math.min(min, data[i]); max = Math.max(max, data[i]); }
result.canvasContrast = max - min;
fs.writeFileSync(`${out}/result.json`, JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
await browser.close();
