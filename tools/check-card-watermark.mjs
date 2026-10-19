import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const output = resolve('output/playwright');
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--enable-unsafe-swiftshader'] });
const report = { faces: [], errors: [], failedResources: [] };
const base = process.env.YK_APP_URL || 'http://127.0.0.1:8787/';

async function visibleFoil(page, card, label, back) {
  const selector = back ? '.reflective-back-foil' : '.card-front .yukomon-fish-card__laser';
  const foil = card.locator(selector);
  await page.mouse.move(3, 3);
  await page.waitForTimeout(2600);
  await card.locator('video').evaluateAll(nodes => nodes.forEach(node => node.pause()));
  await page.waitForTimeout(100);
  const idle = await foil.evaluate(node => {
    const style = getComputedStyle(node);
    return { mask: style.maskImage, opacity: Number(style.opacity), pointer: style.getPropertyValue('--rc-pointer-x'), position: style.backgroundPosition };
  });
  assert.ok(idle.mask.includes('/img/yukomon-pixel-logo.svg'), `${label}: original logo asset`);
  assert.ok(idle.opacity >= .3, `${label}: visible while idle`);
  const visible = await card.screenshot({ path: `${output}/watermark-${label}-idle.png` });
  await foil.evaluate(node => { node.style.visibility = 'hidden'; });
  const hidden = await card.screenshot();
  await foil.evaluate(node => { node.style.removeProperty('visibility'); });
  const a = await sharp(visible).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const b = await sharp(hidden).removeAlpha().raw().toBuffer();
  let changed = 0, colored = 0, totalDifference = 0;
  for (let i = 0; i < a.data.length; i += 3) {
    const pixel = [a.data[i], a.data[i + 1], a.data[i + 2]];
    const difference = pixel.reduce((sum, n, channel) => sum + Math.abs(n - b[i + channel]), 0) / 3;
    if (difference > 4) { changed++; if (Math.max(...pixel) - Math.min(...pixel) > 12) colored++; }
    totalDifference += difference;
  }
  const pixels = a.info.width * a.info.height;
  const difference = { changedRatio: changed / pixels, coloredRatio: colored / pixels, meanDifference: totalDifference / pixels };
  assert.ok(difference.changedRatio > .035 && difference.coloredRatio > .015, `${label}: visible colored logo pixels ${JSON.stringify(difference)}`);
  const r = await card.boundingBox();
  await page.mouse.move(r.x + r.width * .8, r.y + r.height * .25, { steps: 25 });
  await page.waitForTimeout(1000);
  const active = await foil.evaluate(node => {
    const style = getComputedStyle(node);
    return { pointer: Number.parseFloat(style.getPropertyValue('--rc-pointer-x')), position: style.backgroundPosition, opacity: Number(style.opacity) };
  });
  assert.ok(Math.abs(active.pointer - 80) < .1, `${label}: shared spring drives logo`);
  assert.notEqual(active.position, idle.position, `${label}: foil changes with tilt`);
  await page.screenshot({ path: `${output}/watermark-${label}-active.png` });
  report.faces.push({ label, idle, active, ...difference });
}

try {
  for (const width of [1440, 390, 320]) {
    const context = await browser.newContext({ viewport: { width, height: width === 1440 ? 1000 : 844 } });
    await context.addInitScript(() => localStorage.setItem('yukomon-api-config-v1', JSON.stringify({ mode: 'demo' })));
    const page = await context.newPage();
    page.on('pageerror', e => report.errors.push(e.message));
    page.on('console', e => { if (e.type() === 'error') report.errors.push(e.text()); });
    page.on('response', r => { if (r.status() >= 400) report.failedResources.push(`${r.status()} ${r.url()}`); });
    await page.goto(base);
    await page.locator('.cell[data-sp="002"]').click();
    await page.waitForFunction(() => document.querySelector('.card-stage video')?.videoWidth === 512);
    const card = page.locator('.card-stage .reflective-shell');
    await visibleFoil(page, card, `detail-front-${width}`, false);
    await card.focus(); await page.keyboard.press('Enter'); await page.waitForTimeout(900);
    await visibleFoil(page, card, `detail-back-${width}`, true);
    await page.locator('.card-detail-page [data-share]').click();
    await page.locator('[data-preview]').click(); await page.waitForTimeout(900);
    const shared = page.locator('.share-view .reflective-shell');
    await shared.click(); await page.waitForTimeout(900);
    await visibleFoil(page, shared, `share-back-${width}`, true);
    assert.equal(await page.locator('.shareback img').evaluate(n => getComputedStyle(n).objectFit), 'contain');
    assert.equal(await page.locator('.shareback').evaluate(n => n.scrollWidth > n.clientWidth), false);
    await page.locator('.share-head [data-close]').click();
    await page.keyboard.press('Escape'); await page.waitForTimeout(600);
    if (width === 390) {
      await page.evaluate(() => YK_APP.demoUnlock('UR')); await page.waitForTimeout(700);
      await page.locator('.unlock .skip').click(); await page.waitForTimeout(900);
      const reward = page.locator('.unlock .reflective-shell');
      await visibleFoil(page, reward, 'unlock-front-390', false);
      await reward.focus(); await page.keyboard.press('Enter'); await page.waitForTimeout(900);
      await visibleFoil(page, reward, 'unlock-back-390', true);
      await page.locator('.unlock [data-act="ok"]').click();
    }
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth === innerWidth));
    await context.close();
  }
  assert.deepEqual(report.errors, []); assert.deepEqual(report.failedResources, []);
  console.log(JSON.stringify(report, null, 2));
} finally {
  writeFileSync(`${output}/watermark-report.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
