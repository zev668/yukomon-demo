import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const output = resolve('output/playwright');
mkdirSync(output, { recursive: true });
const baseline = process.argv.includes('--baseline');
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--enable-unsafe-swiftshader'] });
const report = { baseline, runs: [], mobile: [], errors: [], failedResources: [] };

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await context.addInitScript(() => {
    localStorage.setItem('yukomon-api-config-v1', JSON.stringify({ mode: 'demo' }));
    window.__gpu = { uploads: 0, env: 0, plate: 0 };
    const proto = WebGL2RenderingContext.prototype;
    const upload = proto.texImage2D, draw = proto.drawArrays;
    proto.texImage2D = function (...args) {
      if (this.canvas.classList.contains('reflective-card__canvas') && args.some(arg => arg instanceof HTMLVideoElement)) __gpu.uploads++;
      return upload.apply(this, args);
    };
    proto.drawArrays = function (...args) {
      if (this.canvas.classList.contains('reflective-card__canvas')) __gpu[this.getParameter(this.FRAMEBUFFER_BINDING) ? 'env' : 'plate']++;
      return draw.apply(this, args);
    };
  });
  const page = await context.newPage();
  page.on('pageerror', e => report.errors.push(e.message));
  page.on('console', e => { if (e.type() === 'error') report.errors.push(e.text()); });
  page.on('response', r => { if (r.status() >= 400) report.failedResources.push(`${r.status()} ${r.url()}`); });
  await page.goto(process.env.YK_APP_URL || 'http://127.0.0.1:8787/');
  await page.locator('.cell[data-sp="002"]').click();
  await page.waitForFunction(() => document.querySelector('.card-stage video')?.readyState >= 2);
  await page.waitForTimeout(1800);
  const card = page.locator('.card-stage .reflective-shell');
  const rect = await card.boundingBox();
  await page.evaluate(() => {
    const shell = document.querySelector('.card-stage .reflective-shell');
    window.__motion = { samples: [], events: [], active: true };
    for (const node of [shell, shell.querySelector('.reflective-card')]) {
      for (const type of ['pointerenter', 'pointerleave']) node.addEventListener(type, event => {
        __motion.events.push({ time: performance.now(), type, node: node === shell ? 'shell' : 'root', x: event.clientX, y: event.clientY });
      });
    }
    let last = performance.now();
    function sample(time) {
      if (!__motion.active || !shell.isConnected) return;
      const angles = [...shell.querySelector('.card-tilt').style.transform.matchAll(/rotate[XY]\(([-\d.]+)deg\)/g)].map(match => Number(match[1]));
      __motion.samples.push({ time, dt: time - last, angles });
      last = time;
      requestAnimationFrame(sample);
    }
    requestAnimationFrame(sample);
  });

  async function measure(label, action) {
    await page.evaluate(() => {
      __motion.samples = []; __motion.events = [];
      __gpu = { uploads: 0, env: 0, plate: 0 };
      const video = document.querySelector('.card-stage video');
      __motion.videoFrames = video.getVideoPlaybackQuality().totalVideoFrames;
      __motion.started = performance.now();
    });
    await action();
    const run = await page.evaluate(label => {
      const video = document.querySelector('.card-stage video');
      return { label, duration: performance.now() - __motion.started, samples: __motion.samples, events: __motion.events, gpu: __gpu, decoded: video.getVideoPlaybackQuality().totalVideoFrames - __motion.videoFrames };
    }, label);
    const frames = run.samples.map(s => s.dt).sort((a, b) => a - b);
    const tail = run.samples.filter(s => s.time > (run.samples.at(-1)?.time || 0) - 800);
    run.settledRange = [0, 1].map(axis => Math.max(...tail.map(s => s.angles[axis])) - Math.min(...tail.map(s => s.angles[axis])));
    run.p95 = frames[Math.floor(frames.length * .95)];
    run.maxFrame = Math.max(...frames);
    report.runs.push(run);
    console.log(JSON.stringify({ ...run, samples: run.samples.length }));
    return run;
  }

  await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2);
  await measure('center-still', () => page.waitForTimeout(2200));
  for (const [label, nx, ny] of [['left-edge', .004, .3], ['right-edge', .996, .3], ['top-edge', .65, .004], ['bottom-edge', .65, .996]]) {
    await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2);
    await page.waitForTimeout(500);
    const run = await measure(label, async () => {
      await page.mouse.move(rect.x + rect.width * nx, rect.y + rect.height * ny, { steps: 20 });
      await page.waitForTimeout(2200);
    });
    if (!baseline) {
      const expected = [(ny * 2 - 1) * 12, -(nx * 2 - 1) * 12];
      assert.ok(run.samples.at(-1).angles.every((value, axis) => Math.abs(value - expected[axis]) < .03), `${label}: input must keep its intended tilt`);
      assert.ok(run.settledRange.every(value => value < .08), `${label}: stationary pointer must settle`);
      assert.equal(run.events.filter(event => event.node === 'shell' && event.type === 'pointerleave').length, 0, `${label}: stable input plane`);
    }
  }
  await measure('sweep-front', async () => {
    for (let i = 0; i < 3; i++) {
      await page.mouse.move(rect.x + rect.width * .05, rect.y + rect.height * .1, { steps: 35 });
      await page.mouse.move(rect.x + rect.width * .95, rect.y + rect.height * .9, { steps: 70 });
    }
  });
  await page.mouse.move(rect.x + rect.width * .85, rect.y + rect.height * .25, { steps: 25 });
  await page.waitForTimeout(900);
  if (!baseline) await page.screenshot({ path: `${output}/card-motion-front-1440.png` });
  await card.focus(); await page.keyboard.press('Enter'); await page.waitForTimeout(850);
  const back = await measure('back-edge', async () => {
    await page.mouse.move(rect.x + rect.width * .996, rect.y + rect.height * .3, { steps: 30 });
    await page.waitForTimeout(2200);
  });
  if (!baseline) {
    assert.ok(back.samples.at(-1).angles.every((angle, axis) => Math.abs(angle - [-4.8, -11.904][axis]) < .03), 'back uses the same stable coordinates');
    await page.screenshot({ path: `${output}/card-motion-back-1440.png` });
  }
  await measure('leave-reset', async () => {
    await page.mouse.move(rect.x + rect.width + 80, rect.y + rect.height / 2, { steps: 12 });
    await page.waitForTimeout(1600);
  });
  if (!baseline) {
    const final = report.runs.at(-1).samples.at(-1).angles;
    assert.ok(final.every(angle => Math.abs(angle) < .01), 'pointer leaving resets tilt');
    await page.waitForTimeout(1500);
    const steady = await measure('video-only', () => page.waitForTimeout(2100));
    assert.ok(steady.gpu.uploads > 30 && steady.gpu.uploads <= steady.decoded + 3, 'video uploads follow presented frames');
    assert.ok(steady.gpu.env <= steady.gpu.uploads * 3 + 3, 'blur is only rebuilt for new video frames');
    assert.ok(steady.gpu.plate <= steady.gpu.uploads + 5, 'settled card sleeps between video frames');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(600);
    assert.equal(await page.evaluate(() => YK_REFLECTIVE.mountedCount), 0);
    await page.evaluate(() => { __gpu = { uploads: 0, env: 0, plate: 0 }; });
    await page.waitForTimeout(350);
    assert.deepEqual(await page.evaluate(() => __gpu), { uploads: 0, env: 0, plate: 0 }, 'unmount stops GPU work');
  }
  await page.evaluate(() => { __motion.active = false; });
  await context.close();

  if (!baseline) for (const width of [390, 320]) {
    const mobileContext = await browser.newContext({ viewport: { width, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
    await mobileContext.addInitScript(() => localStorage.setItem('yukomon-api-config-v1', JSON.stringify({ mode: 'demo' })));
    const mobile = await mobileContext.newPage();
    mobile.on('pageerror', e => report.errors.push(e.message));
    mobile.on('console', e => { if (e.type() === 'error') report.errors.push(e.text()); });
    mobile.on('response', r => { if (r.status() >= 400) report.failedResources.push(`${r.status()} ${r.url()}`); });
    await mobile.goto(process.env.YK_APP_URL || 'http://127.0.0.1:8787/');
    await mobile.locator('.cell[data-sp="002"]').tap();
    await mobile.waitForTimeout(1500);
    const mobileCard = mobile.locator('.card-stage .reflective-shell');
    const bounds = await mobileCard.boundingBox();
    const cdp = await mobileContext.newCDPSession(mobile);
    const angles = () => mobileCard.locator('.card-tilt').evaluate(n => [...n.style.transform.matchAll(/rotate[XY]\(([-\d.]+)deg\)/g)].map(match => Number(match[1])));
    const touch = (type, x, y) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' || type === 'touchCancel' ? [] : [{ x, y }] });
    const drag = async (back = false) => {
      const y = bounds.y + bounds.height * .5;
      await touch('touchStart', bounds.x + bounds.width * .25, y);
      for (let i = 1; i <= 12; i++) {
        await touch('touchMove', bounds.x + bounds.width * (.25 + .6 * i / 12), y);
        await mobile.waitForTimeout(16);
      }
      await mobile.waitForTimeout(850);
      const held = await angles();
      assert.ok(Math.abs(held[0]) < .03 && Math.abs(held[1] + 8.4) < .03, `touch holds ${back ? 'back' : 'front'} tilt at ${width}`);
      await mobile.screenshot({ path: `${output}/card-motion-touch-${back ? 'back' : 'front'}-${width}.png` });
      await touch('touchEnd'); await mobile.waitForTimeout(1300);
      assert.equal(await mobileCard.evaluate(n => n.classList.contains('flipped')), back, 'drag does not accidentally flip');
      assert.ok((await angles()).every(angle => Math.abs(angle) < .01), 'touch release resets tilt');
      return held;
    };
    const front = await drag();
    await mobileCard.tap(); await mobile.waitForTimeout(800);
    const back = await drag(true);
    await mobileCard.tap(); await mobile.waitForTimeout(800);
    assert.equal(await mobileCard.evaluate(n => n.classList.contains('flipped')), false, 'tap still flips after dragging');
    await touch('touchStart', bounds.x + bounds.width * .8, bounds.y + bounds.height * .5);
    await mobile.waitForTimeout(400);
    await touch('touchCancel'); await mobile.waitForTimeout(1300);
    assert.ok((await angles()).every(angle => Math.abs(angle) < .01), 'cancel resets tilt');
    await mobile.evaluate(() => window.dispatchEvent(new DeviceOrientationEvent('deviceorientation', { beta: 25, gamma: 10 })));
    await mobile.waitForTimeout(1000);
    const gyro = await angles();
    assert.ok(Math.abs(gyro[0] - 2.8) < .03 && Math.abs(gyro[1] + 5.6) < .03, 'orientation input shares the spring');
    assert.ok(await mobile.evaluate(() => document.documentElement.scrollWidth === innerWidth), 'no mobile overflow');
    report.mobile.push({ width, front, back, gyro, cancel: true, dragDoesNotFlip: true });
    await mobile.keyboard.press('Escape'); await mobile.waitForTimeout(600);
    assert.equal(await mobile.evaluate(() => YK_REFLECTIVE.mountedCount), 0);
    await cdp.detach(); await mobileContext.close();
  }
  if (!baseline) {
    assert.deepEqual(report.errors, []);
    assert.deepEqual(report.failedResources, []);
    console.log(JSON.stringify({ mobile: report.mobile, errors: report.errors, failedResources: report.failedResources }));
  }
} finally {
  writeFileSync(`${output}/card-motion-${baseline ? 'before' : 'after'}.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
