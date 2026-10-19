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
    assert.equal(await page.locator('.card-detail-page').evaluate(n => getComputedStyle(n).backgroundColor), 'rgb(242, 242, 242)');
    const heroBackground = await page.locator('.card-detail-transition').evaluate(n => getComputedStyle(n).backgroundImage);
    assert.ok(heroBackground.includes('linear-gradient') && heroBackground.includes('rgb(0, 0, 0)') && heroBackground.includes('rgb(242, 242, 242)'), 'detail fades from black to the normal canvas');
    assert.deepEqual(await page.evaluate(() => YK_REFLECTIVE.material), material);
    for (const [name, expected] of [['uWarp', 1.4], ['uWarpScale', .5], ['uShine', 2.05], ['uRimIntensity', 0]]) assert.ok(Math.abs(await page.evaluate(name => __tunedUniforms[name], name) - expected) < .001, name);
    assert.ok(await page.evaluate(() => __tunedPixel[3] > 0 && __tunedPixel.slice(0, 3).some(n => n > 10)), 'actual material pixels');
    const font = await page.locator('.card-stage .yukomon-fish-card__identity p').evaluate(n => getComputedStyle(n).fontFamily);
    assert.ok(!/Georgia|Times New Roman/.test(font) && /sans-serif/.test(font));
    await contrast(page, '.card-detail-page .page-head h2, .card-detail-page .icon-btn, .card-detail-page .section-h > *, .card-detail-page .entry .where, .card-detail-page .entry .when, .card-detail-page .entry .m, .card-detail-page [data-share]');
    await layout(page, `detail-${width}`);
    await page.screenshot({ path: `${output}/tuned-card-detail-${width}.png` });
    const card = page.locator('.card-stage .reflective-shell');
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
    await page.locator('.card-detail-page [data-share]').click();
    await page.locator('[data-preview]').click(); await settle(page);
    assert.equal(await page.locator('.share-view').evaluate(n => getComputedStyle(n).backgroundColor), 'rgb(242, 242, 242)');
    assert.match(await page.locator('.share-stage').evaluate(n => getComputedStyle(n).backgroundImage), /linear-gradient/);
    await contrast(page, '.share-view .share-head b, .share-view .share-head [data-close], .share-view .cta');
    await layout(page, `share-front-${width}`);
    await page.screenshot({ path: `${output}/tuned-share-front-${width}.png` });
    await page.locator('.share-view .reflective-shell').click(); await settle(page);
    assert.equal(await page.locator('.shareback img').evaluate(n => getComputedStyle(n).objectFit), 'contain');
    assert.equal(await page.locator('.shareback').evaluate(n => n.scrollWidth > n.clientWidth), false);
    await page.screenshot({ path: `${output}/tuned-share-back-${width}.png` });
    await page.locator('.share-head [data-close]').click(); await settle(page);
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
    for (const rarity of ['N', 'SSR', 'UR']) {
      await page.evaluate(r => YK_APP.demoUnlock(r), rarity); await settle(page);
      await page.locator('.unlock .skip').click(); await settle(page);
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
