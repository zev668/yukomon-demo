import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const output = resolve('output/playwright');
mkdirSync(output, { recursive: true });
const base = process.env.YK_MATERIAL_URL || 'http://127.0.0.1:4320/';
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--enable-unsafe-swiftshader', '--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'] });
const report = { layouts: [], controls: [], presets: [], errors: [], failedResources: [] };
const key = 'yukomon-card-material-lab-v1';
const pause = page => page.waitForTimeout(450);

async function createPage(width, { reducedMotion = 'no-preference', camera = true } = {}) {
  const context = await browser.newContext({ viewport: { width, height: width > 760 ? 960 : 844 }, deviceScaleFactor: 2, reducedMotion, permissions: camera ? ['camera', 'clipboard-read', 'clipboard-write'] : [] });
  const page = await context.newPage();
  page.on('pageerror', e => report.errors.push(e.message));
  page.on('console', e => { if (e.type() === 'error') report.errors.push(e.text()); });
  page.on('response', r => { if (r.status() >= 400) report.failedResources.push(`${r.status()} ${r.url()}`); });
  await page.addInitScript(() => {
    const proto = WebGL2RenderingContext.prototype;
    const locations = new WeakMap();
    window.__materialUniforms = {};
    const get = proto.getUniformLocation;
    proto.getUniformLocation = function (program, name) { const result = get.call(this, program, name); if (result) locations.set(result, name); return result; };
    for (const method of ['uniform1f', 'uniform2f', 'uniform3fv']) {
      const original = proto[method];
      proto[method] = function (location, ...values) {
        const name = location && locations.get(location);
        if (name) window.__materialUniforms[name] = values.length === 1 && (Array.isArray(values[0]) || ArrayBuffer.isView(values[0])) ? [...values[0]] : values;
        return original.call(this, location, ...values);
      };
    }
    const draw = proto.drawArrays;
    proto.drawArrays = function (...args) {
      const result = draw.apply(this, args);
      if (!this.getParameter(this.FRAMEBUFFER_BINDING)) {
        const pixels = new Uint8Array(4 * 5);
        for (let i = 0; i < 5; i++) this.readPixels(Math.floor(this.drawingBufferWidth * (i + 1) / 6), Math.floor(this.drawingBufferHeight / 2), 1, 1, this.RGBA, this.UNSIGNED_BYTE, pixels.subarray(i * 4, i * 4 + 4));
        window.__materialPixels = [...pixels];
      }
      return result;
    };
  });
  await page.goto(base);
  await page.waitForFunction(() => window.__materialPixels?.some(x => x > 0));
  await page.waitForTimeout(1900);
  return { page, context };
}

async function overflow(page, label) {
  const data = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth, overlaps: [...document.querySelectorAll('.slider-caption')].filter(node => node.scrollWidth > node.clientWidth + 1).length }));
  assert.equal(data.scroll, data.width, `${label}: horizontal overflow`);
  assert.equal(data.overlaps, 0, `${label}: slider text fits`);
  report.layouts.push({ label, ...data });
}

async function slider(page, name, value) {
  const input = page.getByRole('slider', { name, exact: true });
  await input.fill(String(value));
  await pause(page);
}

try {
  for (const width of [1440, 390, 320]) {
    const { page, context } = await createPage(width);
    assert.equal(await page.locator('input[type=range]').count(), 20);
    await overflow(page, `initial-${width}`);
    const bounds = await page.locator('.card-footprint').boundingBox();
    assert.ok(bounds.width > 190 && bounds.height > 300, 'visible full card');
    assert.ok(await page.evaluate(() => __materialPixels.some((x, i) => i % 4 !== 3 && x > 5)), 'canvas contains actual material pixels');
    await page.screenshot({ path: join(output, `material-lab-${width}.png`), fullPage: width < 760 });
    await page.getByRole('button', { name: '鱼卡', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('.yukomon-fish-card__fish')?.naturalWidth > 0);
    await pause(page); await overflow(page, `fish-${width}`);
    await page.screenshot({ path: join(output, `material-lab-fish-${width}.png`), fullPage: width < 760 });
    if (width !== 1440) { await context.close(); continue; }

    await page.getByRole('button', { name: '原卡', exact: true }).click();
    await page.getByRole('switch', { name: 'Intro', exact: true }).uncheck();
    await page.getByRole('switch', { name: 'Tilt', exact: true }).uncheck();
    await page.getByLabel('Reflection', { exact: true }).selectOption('studio');
    await page.waitForTimeout(1200);
    const mapping = [
      ['Metalness', 'uMetal', 0.45], ['Roughness', 'uRough', 0.65], ['Blur', 'uBlur', 12],
      ['Grayscale', 'uGray', 0.4], ['Shine', 'uShine', 1.7], ['Glare', null, 0.8],
      ['Warp', 'uWarp', 1.3], ['Warp Scale', 'uWarpScale', 2], ['Bevel', 'uBevel', 5],
      ['Radius', 'uRadius', 32], ['高光强度', 'uRimIntensity', 1.2], ['亮边宽度', 'uRimWidth', 1.5],
      ['亮边柔度', 'uRimSoftness', 0.6], ['内缘暗线', 'uRimDepth', 0.75], ['倒角起伏', 'uBevelStrength', 1.4],
    ];
    for (const [label, uniform, value] of mapping) {
      await slider(page, label, value);
      if (uniform) assert.ok(Math.abs(await page.evaluate(u => __materialUniforms[u][0], uniform) - value) < 0.001, `${label} reaches the shader`);
      report.controls.push(label);
    }
    await page.getByLabel('Tint色值', { exact: true }).fill('#a1c9ee');
    await pause(page);
    const tint = await page.evaluate(() => __materialUniforms.uTint);
    assert.ok(Math.abs(tint[0] - Math.pow(161 / 255, 2.2)) < 0.001);
    report.controls.push('Tint');
    await page.getByLabel('Theme', { exact: true }).selectOption('light'); await pause(page);
    assert.equal(await page.evaluate(() => __materialUniforms.uTheme[0]), 1);
    await page.getByLabel('Theme', { exact: true }).selectOption('dark');
    report.controls.push('Theme');
    await page.getByText('卡片内容', { exact: true }).click();
    await page.getByLabel('Name', { exact: true }).fill('Material Test');
    await page.getByLabel('Role', { exact: true }).fill('Reflective surface');
    await page.getByLabel('Badge', { exact: true }).fill('Sample');
    await page.getByLabel('Status', { exact: true }).fill('Live');
    await page.getByLabel('ID Label', { exact: true }).fill('Card ID');
    await page.getByLabel('ID Value', { exact: true }).fill('YK 2026 001');
    await page.getByLabel('Status Color色值', { exact: true }).fill('#ffa600');
    assert.equal(await page.locator('.reflective-card__name').innerText(), 'Material Test');
    assert.equal(await page.locator('.reflective-card__role').innerText(), 'Reflective surface');
    assert.equal(await page.locator('.reflective-card__dot').evaluate(e => getComputedStyle(e).backgroundColor), 'rgb(255, 166, 0)');
    report.controls.push('Name', 'Role', 'Badge', 'Status', 'ID Label', 'ID Value', 'Status Color');
    await page.getByText('尺寸与交互', { exact: true }).click();
    await slider(page, 'Width', 360); await slider(page, 'Height', 540);
    assert.deepEqual(await page.evaluate(() => __materialUniforms.uSize), [360, 540]);
    report.controls.push('Width', 'Height');
    await page.getByLabel('Reflection', { exact: true }).selectOption('video');
    await page.waitForFunction(() => document.querySelector('.reflective-card__media')?.videoWidth > 0);
    await page.getByLabel('Reflection', { exact: true }).selectOption('camera');
    await page.waitForFunction(() => [...document.querySelectorAll('video')].some(v => v.srcObject?.active));
    await page.getByLabel('Reflection', { exact: true }).selectOption('studio');
    await page.waitForFunction(() => [...document.querySelectorAll('video')].every(v => !v.srcObject));
    report.controls.push('Video', 'Studio', 'Camera');
    await page.getByRole('switch', { name: 'Tilt', exact: true }).check();
    await slider(page, 'Tilt Strength', 24);
    await page.locator('.reflective-card').dispatchEvent('pointermove', { pointerType: 'mouse', clientX: 2000, clientY: 1000 });
    await page.waitForTimeout(650);
    assert.ok(Math.abs(await page.locator('.reflective-card').evaluate(n => parseFloat(n.style.getPropertyValue('--rc-rotate-y')))) > 15);
    await page.getByRole('switch', { name: 'Tilt', exact: true }).uncheck();
    await pause(page);
    assert.equal(await page.locator('.reflective-card').evaluate(n => parseFloat(n.style.getPropertyValue('--rc-rotate-y'))), 0);
    report.controls.push('Tilt', 'Tilt Strength', 'Intro');
    const saved = await page.evaluate(k => JSON.parse(localStorage.getItem(k)), key);
    await page.reload(); await page.waitForTimeout(900);
    assert.equal(await page.getByRole('slider', { name: 'Shine', exact: true }).inputValue(), '1.7');
    assert.equal(await page.locator('.reflective-card__name').innerText(), 'Material Test');
    assert.equal(await page.getByLabel('Tint色值', { exact: true }).inputValue(), '#a1c9ee');
    const downloaded = page.waitForEvent('download'); await page.getByRole('button', { name: '导出参数', exact: true }).click();
    const download = await downloaded;
    assert.equal(download.suggestedFilename(), 'yukomon-card-material.json');
    const exported = JSON.parse(readFileSync(await download.path(), 'utf8'));
    assert.deepEqual(exported.values, saved.values);
    await page.getByRole('button', { name: '复制参数', exact: true }).click();
    assert.deepEqual(JSON.parse(await page.evaluate(() => navigator.clipboard.readText())).values, saved.values);
    report.persistence = { refresh: true, exported: true, clipboard: true };
    await page.getByRole('button', { name: '恢复原版参数', exact: true }).click();
    await pause(page);
    assert.equal(await page.getByRole('slider', { name: 'Bevel', exact: true }).inputValue(), '3');
    assert.equal(await page.locator('.reflective-card__name').innerText(), 'Alexander Doe');
    for (const [value, check, expected] of [['steel', 'Roughness', '0.3'], ['brushed', 'Roughness', '0.85'], ['mirror', 'Blur', '1.5'], ['gold', null, '#f3cf8a'], ['rose', null, '#f1b9a4'], ['satin', 'Blur', '14']]) {
      await page.getByLabel('Preset', { exact: true }).selectOption(value); await pause(page);
      assert.equal(await (check ? page.getByRole('slider', { name: check, exact: true }) : page.getByLabel('Tint色值', { exact: true })).inputValue(), expected);
      report.presets.push(value);
    }
    await page.getByLabel('Preset', { exact: true }).selectOption('glass');
    await page.getByLabel('Reflection', { exact: true }).selectOption('studio');
    await page.getByRole('switch', { name: 'Tilt', exact: true }).uncheck();
    await page.getByRole('switch', { name: 'Intro', exact: true }).uncheck();
    await page.waitForTimeout(1400);
    await page.getByRole('button', { name: '原版', exact: true }).click(); await pause(page);
    const beforePath = join(output, 'material-rim-original.png');
    await page.locator('.reflective-card__body').screenshot({ path: beforePath });
    await page.getByRole('button', { name: '优化', exact: true }).click(); await pause(page);
    const afterPath = join(output, 'material-rim-enhanced.png');
    await page.locator('.reflective-card__body').screenshot({ path: afterPath });
    const before = await sharp(beforePath).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const after = await sharp(afterPath).removeAlpha().raw().toBuffer();
    let edgeDiff = 0, edgeCount = 0, centerDiff = 0, centerCount = 0;
    const { width: w, height: h } = before.info;
    for (let y = 70; y < h - 70; y++) for (let x = 0; x < w; x++) {
      const edge = x < 8 || x >= w - 8;
      const center = x > 50 && x < w - 50;
      if (!edge && !center) continue;
      const i = (y * w + x) * 3;
      const delta = (Math.abs(before.data[i] - after[i]) + Math.abs(before.data[i + 1] - after[i + 1]) + Math.abs(before.data[i + 2] - after[i + 2])) / 3;
      if (edge) { edgeDiff += delta; edgeCount++; } else { centerDiff += delta; centerCount++; }
    }
    report.rimPixels = { meanEdgeDifference: edgeDiff / edgeCount, meanCenterDifference: centerDiff / centerCount };
    assert.ok(report.rimPixels.meanEdgeDifference > 2, 'rim controls visibly change edge pixels');
    assert.ok(report.rimPixels.meanCenterDifference < 1, 'rim optimization stays at the outer edge');
    await page.getByRole('button', { name: '查看参考截图', exact: true }).click();
    assert.ok(await page.locator('.reference-dialog img').evaluate(i => i.complete && i.naturalWidth === 550));
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.reference-dialog').isVisible(), false);
    await context.close();
  }
  const { page: reduced, context } = await createPage(390, { reducedMotion: 'reduce' });
  await overflow(reduced, 'reduced-motion-390');
  assert.equal(await reduced.locator('.reflective-card').evaluate(n => parseFloat(n.style.getPropertyValue('--rc-rotate-y')) || 0), 0);
  await context.close();
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.failedResources, []);
  console.log(JSON.stringify(report, null, 2));
} finally {
  writeFileSync(join(output, 'material-lab-report.json'), JSON.stringify(report, null, 2));
  await browser.close();
}
