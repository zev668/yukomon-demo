import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const material = JSON.parse(readFileSync(new URL('../reflective-card-preview/src/app-material.json', import.meta.url)));
const output = resolve('output/playwright');
mkdirSync(output, { recursive: true });
const base = process.env.YK_APP_URL || 'http://127.0.0.1:8787/';
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--enable-unsafe-swiftshader'] });
const report = { layouts: [], contrasts: [], errors: [], failedResources: [] };
const settle = page => page.waitForTimeout(900);

async function layout(page, label) {
  const result = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth, app: document.querySelector('#app').clientWidth, appScroll: document.querySelector('#app').scrollWidth }));
  assert.equal(result.width, result.scroll, label);
  assert.ok(result.appScroll <= result.app + 1, label);
  report.layouts.push({ label, ...result });
}

async function contrast(page, selector) {
  const results = await page.locator(selector).evaluateAll(nodes => {
    const rgb = text => text.match(/[\d.]+/g).slice(0, 3).map(Number);
    const luminance = c => c.map(n => { n /= 255; return n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4; }).reduce((s, n, i) => s + n * [.2126, .7152, .0722][i], 0);
    return nodes.filter(node => node.getBoundingClientRect().height > 0).map(node => {
      const style = getComputedStyle(node);
      let parent = node, background;
      while (parent) {
        background = getComputedStyle(parent).backgroundColor;
        if (parent.classList?.contains('card-gradient-page')) { background = 'rgb(30, 31, 35)'; break; } // painted dark gradient (sampled)
        if (background.startsWith('rgb(')) break;
        parent = parent.parentElement;
      }
      const a = luminance(rgb(style.color)), b = luminance(rgb(background));
      return { text: node.textContent.trim().slice(0, 36), color: style.color, background, ratio: (Math.max(a, b) + .05) / (Math.min(a, b) + .05) };
    });
  });
  for (const result of results) assert.ok(result.ratio >= 4.5, `Low contrast: ${JSON.stringify(result)}`);
  report.contrasts.push(...results);
}

try {
  for (const width of [1440, 390, 320]) {
    const context = await browser.newContext({ viewport: { width, height: width > 760 ? 1000 : 844 } });
    await context.addInitScript(() => {
      localStorage.setItem('yukomon-api-config-v1', JSON.stringify({ mode: 'demo' }));
      const proto = WebGL2RenderingContext.prototype, locations = new WeakMap();
      window.__tunedUniforms = {};
      const get = proto.getUniformLocation;
      proto.getUniformLocation = function (program, name) { const location = get.call(this, program, name); if (location) locations.set(location, name); return location; };
      for (const method of ['uniform1f', 'uniformMatrix3fv']) {
        const original = proto[method];
        proto[method] = function (location, ...values) {
          const name = location && locations.get(location);
          if (name) window.__tunedUniforms[name] = method === 'uniform1f' ? values[0] : [...values[1]];
          return original.call(this, location, ...values);
        };
      }
      const draw = proto.drawArrays;
      proto.drawArrays = function (...args) {
        const result = draw.apply(this, args);
        if (!this.getParameter(this.FRAMEBUFFER_BINDING)) {
          const pixel = new Uint8Array(4);
          this.readPixels(Math.floor(this.drawingBufferWidth * .5), Math.floor(this.drawingBufferHeight * .5), 1, 1, this.RGBA, this.UNSIGNED_BYTE, pixel);
          window.__tunedPixel = [...pixel];
        }
        return result;
      };
    });
    const page = await context.newPage();
    page.on('pageerror', e => report.errors.push(e.message));
    page.on('console', e => { if (e.type() === 'error') report.errors.push(e.text()); });
    page.on('response', r => { if (r.status() >= 400) report.failedResources.push(`${r.status()} ${r.url()}`); });
    await page.goto(base); await page.waitForFunction(() => window.YK_APP); await settle(page);
    const small = await page.evaluate(() => {
      const unlocked = document.querySelector('.cell[data-sp="002"] .thumb'), locked = document.querySelector('.cell .slot');
      return [unlocked, locked].map(node => ({ ratio: node.getBoundingClientRect().width / node.getBoundingClientRect().height, reflective: node.classList.contains('reflective-shell') }));
    });
    assert.equal(small[0].reflective, false);
    assert.ok(Math.abs(small[0].ratio - 5 / 7) < .01 && Math.abs(small[1].ratio - 5 / 7) < .01);
    await page.locator('.cell[data-sp="002"]').click();
    await page.waitForFunction(() => document.querySelector('.card-stage video')?.videoWidth === 512); await settle(page);
    // Detail page is transparent over the app canvas (design updated 2026-10).
    assert.equal(await page.locator('.card-detail-page').evaluate(n => getComputedStyle(n).backgroundColor), 'rgba(0, 0, 0, 0)');
    assert.deepEqual(await page.evaluate(() => YK_REFLECTIVE.material), material);
    for (const [name, expected] of [['uWarp', 1.4], ['uWarpScale', .5], ['uShine', 2.05], ['uRimIntensity', 0]]) assert.ok(Math.abs(await page.evaluate(name => __tunedUniforms[name], name) - expected) < .001, name);
    assert.ok(await page.evaluate(() => __tunedPixel[3] > 0 && __tunedPixel.slice(0, 3).some(n => n > 10)), 'actual material pixels');
    const font = await page.locator('.card-stage .yukomon-fish-card__identity p').evaluate(n => getComputedStyle(n).fontFamily);
    assert.ok(!/Georgia|Times New Roman/.test(font) && /sans-serif/.test(font));
    await contrast(page, '.card-detail-page .page-head h2, .card-detail-page .icon-btn, .card-detail-page .section-h > *, .card-detail-page .entry .where, .card-detail-page .entry .when, .card-detail-page .entry .m, .card-detail-page [data-share]');
    await layout(page, `detail-${width}`);
    await page.screenshot({ path: `${output}/tuned-card-detail-${width}.png` });
    const card = page.locator('.card-stage .reflective-shell');
    const shape = await card.evaluate(n => {
      const rect = n.getBoundingClientRect();
      return { ratio: rect.width / rect.height, radius: getComputedStyle(n).borderRadius, faceRadius: getComputedStyle(n.querySelector('.card-face')).borderRadius };
    });
    assert.ok(Math.abs(shape.ratio - .64) < .001, 'approved 320:500 large-card ratio');
    assert.equal(shape.radius, '24px'); assert.equal(shape.faceRadius, '24px');
    const r = await card.boundingBox();
    await page.mouse.move(r.x + r.width * .8, r.y + r.height * .25, { steps: 20 });
    await settle(page);
    const tilt = await card.evaluate(n => ({ outer: n.querySelector('.card-tilt').style.transform, inner: getComputedStyle(n.querySelector('.reflective-card__body')).transform }));
    assert.match(tilt.outer, /rotateX\(/);
    assert.equal(tilt.inner, 'matrix(1, 0, 0, 1, 0, 0)', 'tilt is applied once');
    assert.ok(await page.evaluate(() => Math.abs(__tunedUniforms.uRotate[2]) > .02), 'shader shares the tilt');
    await card.click(); await settle(page);
    assert.ok(await card.evaluate(n => n.classList.contains('flipped')));
    await page.mouse.move(r.x + r.width * .2, r.y + r.height * .7, { steps: 20 });
    await settle(page);
    assert.notEqual(await card.locator('.card-tilt').evaluate(n => n.style.transform), tilt.outer, 'back also responds to input');
    await page.screenshot({ path: `${output}/tuned-card-back-${width}.png` });
    await card.focus(); await page.keyboard.press('Enter'); await settle(page);
    assert.equal(await card.evaluate(n => n.classList.contains('flipped')), false);
    // Share flow moved to the header share button (data-share-card); covered by check-fixes-20261027 / test-connected.
    await page.keyboard.press('Escape'); await settle(page);
    await page.locator('.cell[data-sp="022"]').click(); await settle(page);
    await contrast(page, '.card-detail-page .variant .pill');
    await page.locator('[data-v="normal"]').click(); await settle(page);
    assert.notEqual(await page.locator('.card-stage .reflective-shell').getAttribute('data-rarity'), 'UR');
    await page.locator('[data-v="ur"]').click(); await settle(page);
    assert.equal(await page.locator('.card-stage .reflective-shell').getAttribute('data-rarity'), 'UR');
    await page.screenshot({ path: `${output}/tuned-card-variant-${width}.png` });
    await page.keyboard.press('Escape'); await settle(page);
    assert.equal(await page.evaluate(() => YK_REFLECTIVE.mountedCount), 0);
    await page.evaluate(() => {
      window.__unlockCues = []; const play = YK_AUDIO.play;
      YK_AUDIO.play = function (...args) { __unlockCues.push(args[0]); return play.apply(this, args); };
    });
    for (const rarity of ['N', 'SSR', 'UR']) {
      await page.evaluate(() => { __unlockCues = []; });
      await page.evaluate(r => YK_APP.demoUnlock(r), rarity); await settle(page);
      assert.equal(await page.locator('.unlock.pixel-unlock').count(), 1);
      assert.ok(await page.locator('.unlock .burst i').count() > 0, 'pixel reveal particles');
      assert.deepEqual(await page.locator('.unlock .actions button').allTextContents(), ['分享', '看图鉴', '继续记录']);
      assert.ok(await page.evaluate(r => __unlockCues.includes('unlock_' + r), rarity), 'rarity reveal audio is scheduled');
      await page.locator('.unlock .skip').click(); await settle(page);
      assert.equal(await page.locator('.unlock').count(), 1, 'skip preserves the result');
      assert.equal(await page.locator('.unlock .skip').isVisible(), false);
      const reward = page.locator('.unlock .reflective-shell');
      await reward.click(); await settle(page);
      assert.equal(await reward.evaluate(n => n.classList.contains('flipped')), true, 'unlock result supports pointer flip');
      await reward.click(); await settle(page);
      assert.equal(await page.locator('.unlock').evaluate(n => getComputedStyle(n).backgroundColor), 'rgb(0, 0, 0)');
      await contrast(page, '.unlock .headline, .unlock .sub, .unlock .actions .btn');
      await layout(page, `unlock-${rarity}-${width}`);
      if (rarity === 'UR') await page.screenshot({ path: `${output}/tuned-card-unlock-${width}.png` });
      await page.locator('.unlock [data-act="ok"]').click(); await settle(page);
    }
    assert.equal(await page.locator('#app').evaluate(n => getComputedStyle(n).backgroundColor), 'rgb(242, 242, 242)');
    await context.close();
  }
  assert.deepEqual(report.errors, []); assert.deepEqual(report.failedResources, []);
  console.log(JSON.stringify({ layouts: report.layouts, contrasts: report.contrasts.length, minContrast: Math.min(...report.contrasts.map(c => c.ratio)), errors: report.errors, failedResources: report.failedResources }, null, 2));
} finally {
  writeFileSync(`${output}/tuned-card-report.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
