import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'chrome' }); const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await ctx.addInitScript(() => localStorage.setItem('yukomon-ai-photo-consent-v1', 'yes'));
const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('requestfailed', r => errs.push('FAIL ' + r.url()));
await p.goto('http://127.0.0.1:8787/?demo=1'); await p.waitForFunction(() => window.YK_APP); await p.waitForTimeout(1500);
const out = 'output/playwright/fish-thumbs/'; await import('node:fs').then(fs => fs.mkdirSync(out, { recursive: true }));
const m = async (sel) => p.$$eval(sel, ns => ns.slice(0, 3).map(n => { const r = n.getBoundingClientRect(), c = n.parentElement.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), pw: Math.round(c.width), ph: Math.round(c.height), ok: n.complete && n.naturalWidth > 0, fit: getComputedStyle(n).objectFit }; }));
console.log('dex thumbs', await p.$$eval('.tray .yk-card.thumb .fish-art', n => n.length), await m('.tray .yk-card.thumb .fish-art'));
await p.screenshot({ path: out + 'dex.png' });
await p.locator('[data-tab="rank"]').click(); await p.waitForTimeout(900);
console.log('rank best', await m('.board .best .fish-art')); await p.screenshot({ path: out + 'rank.png' });
await p.locator('[data-board="giant"]').click(); await p.waitForTimeout(900);
await p.locator('.giant-tray .cell[data-sp="022"]').click(); await p.waitForTimeout(900);
console.log('giant banner', await m('.sp-banner .sp-fish .fish-art')); await p.screenshot({ path: out + 'giant.png' });
await p.keyboard.press('Escape'); await p.waitForTimeout(500);
await p.locator('[data-tab="catch"]').click(); await p.waitForTimeout(1500); const sample = p.locator('.sample-btn, [data-sample]'); if (await sample.count()) { await sample.first().click(); await p.waitForTimeout(2500); }
const pick = p.locator('[data-act="species"]'); if (await pick.count()) { await pick.first().click(); await p.waitForTimeout(900); console.log('picker', await p.$$eval('.sp-row .fish-art', n => n.length), await m('.sp-row .fish-art')); await p.screenshot({ path: out + 'picker.png' }); }
console.log('errors', errs); await b.close();

