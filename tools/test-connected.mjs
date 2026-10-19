import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import sharp from 'sharp';
import { createApp } from '../server/app.mjs';

const dataDir = mkdtempSync(join(tmpdir(), 'yk-browser-'));
const output = resolve('output/playwright'); mkdirSync(output, { recursive: true });
const service = createApp({ dataDir });
const server = service.app.listen(0, '127.0.0.1');
await new Promise(r => server.once('listening', r));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--enable-unsafe-swiftshader'] });
const report = { viewportChecks: [], journeys: [], audio: [], video: null, consoleErrors: [], failedRequests: [] };
function watch(page) {
  page.on('pageerror', e => report.consoleErrors.push(e.message));
  page.on('console', e => { if (e.type() === 'error' && !e.location().url?.endsWith('/api/health') && !e.location().url?.endsWith(page.expectedConsolePath || '/__none__')) report.consoleErrors.push(`${e.text()} ${e.location().url}`); });
  page.on('requestfailed', r => { if (!['net::ERR_ABORTED'].includes(r.failure()?.errorText)) report.failedRequests.push(`${r.method()} ${new URL(r.url()).pathname} ${r.failure()?.errorText}`); });
}
async function noOverflow(page, label) {
  const result = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth, appWidth: document.querySelector('#app').clientWidth, appScroll: document.querySelector('#app').scrollWidth }));
  assert.ok(result.scroll <= result.width, `${label}: document overflow ${JSON.stringify(result)}`);
  assert.ok(result.appScroll <= result.appWidth + 1, `${label}: app overflow ${JSON.stringify(result)}`);
  report.viewportChecks.push({ label, ...result });
}
async function settle(page) { await page.waitForTimeout(850); }
async function initPage(context, { offline = false } = {}) {
  const page = await context.newPage(); watch(page);
  if (offline) await page.route('**/api/health', r => r.fulfill({ status: 404, body: '{}' }));
  await page.goto(base); await page.waitForFunction(() => !!window.YK_APP);
  if (!offline) await page.waitForFunction(() => window.YK_API.connected && window.YK_API.remote);
  await settle(page); return page;
}
async function publish(page, { camera = false, color = '#138387', length = '38', species = '001', description = '清晨的第一条，拍照后放流', expectFailure = false } = {}) {
  await page.locator('[data-tab="catch"]').click();
  if (camera) {
    await page.waitForFunction(() => document.querySelector('.cam-live')?.videoWidth > 0);
    await page.locator('[data-shoot]').click();
  } else {
    const buffer = await sharp({ create: { width: 400, height: 240, channels: 3, background: color } }).png().toBuffer();
    await page.locator('[data-library]').setInputFiles({ name: 'fish.png', mimeType: 'image/png', buffer });
  }
  await page.locator('[data-next]').click();
  await page.locator('[data-act="species"]').click();
  await page.locator(`.sp-row[data-sp="${species}"]`).click();
  await page.locator('#f-len').fill(length); await page.locator('#f-desc').fill(description);
  await page.locator('[data-act="submit"]').click();
  if (expectFailure) {
    await page.waitForFunction(() => document.querySelector('#toast').textContent.includes('草稿已保留'));
    assert.equal(await page.locator('#f-desc').inputValue(), description);
    return;
  }
  await page.waitForFunction(() => document.querySelector('.unlock') || !document.querySelector('[data-act="submit"]'));
  if (await page.locator('.unlock .skip').isVisible()) await page.locator('.unlock .skip').click();
  await settle(page);
}
try {
  // Static Pages mode: real textures, fronts, backs, variants, rank thumbnails and unlocks.
  for (const width of process.argv.includes('--connected-only') ? [] : [1440, 390, 360, 320]) {
    const context = await browser.newContext({ viewport: { width, height: width === 1440 ? 1000 : 844 } });
    const page = await initPage(context, { offline: true });
    assert.equal(await page.evaluate(() => YK_API.remote), false);
    assert.equal(await page.locator('.collector > .icon-btn').count(), 0, 'settings is no longer a separate corner icon');
    const settingsEntry = page.locator('button.collector-profile[data-act="settings"]');
    assert.equal(await settingsEntry.locator('.who').count(), 1, 'avatar/profile region opens settings');
    await settingsEntry.click();
    await page.locator('#set-name').waitFor();
    await page.keyboard.press('Escape');
    await settle(page);
    const rarityLabels = await page.locator('.breakdown yk-rarity').evaluateAll(nodes => nodes.map(node => {
      const style = getComputedStyle(node);
      return { level: node.getAttribute('level'), font: style.fontFamily, background: style.backgroundColor, image: style.backgroundImage, clip: style.backgroundClip, border: style.borderWidth, color: style.color, animation: style.animationName };
    }));
    assert.equal(rarityLabels.length, 5);
    assert.equal(new Set(rarityLabels.map(label => label.color + label.image)).size, 5, 'five distinct rarity materials');
    for (const label of rarityLabels) {
      assert.match(label.font, /Georgia/);
      assert.equal(label.background, 'rgba(0, 0, 0, 0)');
      assert.equal(label.border, '0px');
      if (label.level === 'N') assert.equal(label.image, 'none');
      else {
        assert.match(label.image, /linear-gradient/);
        assert.ok(label.clip.split(',').every(clip => clip.trim() === 'text'), 'every material layer stays inside the letter shapes');
        assert.equal(label.color, 'rgba(0, 0, 0, 0)');
      }
      assert.equal(label.animation, label.level === 'SSR' ? 'yk-rarity-gold-sweep' : label.level === 'UR' ? 'yk-rarity-holo-flow' : 'none');
    }
    if (width === 390) {
      const materialPositions = () => page.locator('.breakdown yk-rarity:is([level="SSR"], [level="UR"])').evaluateAll(nodes => nodes.map(node => getComputedStyle(node).backgroundPosition));
      const before = await materialPositions();
      await page.waitForTimeout(650);
      const after = await materialPositions();
      assert.notEqual(before[1], after[1], 'holographic material actually moves');
      const goldMoves = await page.locator('.breakdown yk-rarity[level="SSR"]').evaluate(node => {
        const animation = node.getAnimations()[0];
        const originalTime = animation.currentTime;
        animation.pause(); animation.currentTime = 0;
        const a = getComputedStyle(node).backgroundPosition;
        animation.currentTime = 900;
        const b = getComputedStyle(node).backgroundPosition;
        animation.currentTime = originalTime; animation.play();
        return a !== b;
      });
      assert.ok(goldMoves, 'gold reflection sweeps across the text');
    }
    await noOverflow(page, `static-dex-${width}`);
    assert.equal(await page.locator('.tray .reflective-shell').count(), 0, 'small cards render independently of large cards');
    const smallCards = await page.locator('.tray .cell > .yk-card, .tray .cell > .slot').evaluateAll(nodes => nodes.map(node => {
      const rect = node.getBoundingClientRect();
      return { width: rect.width, height: rect.height, small: node.classList.contains('thumb') };
    }));
    assert.ok(smallCards.some(c => c.small) && smallCards.some(c => !c.small));
    for (const card of smallCards) {
      assert.ok(Math.abs(card.width - smallCards[0].width) < 1, 'unlocked and locked small cards share width');
      assert.ok(Math.abs(card.height - card.width * 7 / 5) < 1, 'all small cards retain the original 5:7 ratio');
    }
    await page.screenshot({ path: join(output, `release-dex-${width}.png`) });
    await page.locator('.cell[data-sp="001"]').click(); await settle(page);
    const card = page.locator('.card-stage .reflective-shell');
    await card.waitFor(); await page.waitForFunction(() => [...document.querySelectorAll('.card-stage img')].every(i => i.complete && i.naturalWidth > 0));
    await noOverflow(page, `static-front-${width}`);
    const visual = await page.evaluate(async () => {
      const card = document.querySelector('.card-stage .reflective-shell'), canvas = card.querySelector('canvas');
      const r = card.getBoundingClientRect();
      const material = card.querySelector('.reflective-card');
      const before = getComputedStyle(material).getPropertyValue('--rc-pointer-x');
      material.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, pointerType: 'mouse', clientX: r.right - 10, clientY: r.top + 30 }));
      await new Promise(resolve => setTimeout(resolve, 200));
      const after = getComputedStyle(material).getPropertyValue('--rc-pointer-x');
      material.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, pointerType: 'mouse', clientX: r.right - 12, clientY: r.top + 32 }));
      return await new Promise(resolve => requestAnimationFrame(() => {
        const gl = canvas.getContext('webgl2');
        let colors = [];
        if (gl) {
          const pixel = new Uint8Array(4);
          for (const x of [.05, .2, .5, .8, .95]) { gl.readPixels(Math.floor(canvas.width * x), Math.floor(canvas.height * .5), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel); colors.push([...pixel]); }
        }
        resolve({ before, after, canvas: [canvas.width, canvas.height], webgl: !!gl, colors, images: [...card.querySelectorAll('img')].map(i => [i.naturalWidth, i.naturalHeight]) });
      }));
    });
    assert.notEqual(visual.before, visual.after, 'reflection responds to input');
    assert.ok(visual.canvas[0] > 0 && visual.webgl, 'actual WebGL canvas initialized');
    assert.ok(visual.colors.some(p => p[3] > 0 && (p[0] || p[1] || p[2])), 'canvas has rendered pixels');
    report.viewportChecks.push({ label: `canvas-${width}`, ...visual });
    await page.screenshot({ path: join(output, `release-front-${width}.png`) });
    await card.click(); await settle(page);
    assert.equal(await card.evaluate(e => e.classList.contains('flipped')), true);
    assert.ok(await page.locator('.card-stage .card-back').innerText().then(t => t.includes('耐低氧')));
    await page.screenshot({ path: join(output, `release-back-${width}.png`) });
    await card.focus(); await page.keyboard.press('Enter'); await settle(page);
    assert.equal(await card.evaluate(e => e.classList.contains('flipped')), false, 'keyboard flips once');
    await page.keyboard.press('Escape'); await settle(page);
    await page.locator('[data-f="UR"]').click(); await settle(page);
    assert.equal(await page.locator('.tray .cell').count(), 1, 'UR filter returns giant variant');
    await page.locator('[data-tab="rank"]').click(); await settle(page); await noOverflow(page, `static-rank-${width}`);
    await page.screenshot({ path: join(output, `release-rank-${width}.png`) });
    for (const rk of ['N', 'R', 'SR', 'SSR', 'UR']) {
      await page.evaluate(rk => YK_APP.demoUnlock(rk), rk); await settle(page);
      await page.locator('.unlock .skip').click(); await settle(page);
      assert.equal(await page.locator('.unlock.pixel-unlock').count(), 1);
      const unlockRarity = await page.locator('.unlock yk-rarity').evaluate(node => ({ level: node.getAttribute('level'), tone: node.getAttribute('tone'), image: getComputedStyle(node).backgroundImage }));
      assert.equal(unlockRarity.level, rk);
      assert.equal(unlockRarity.tone, 'dark');
      if (rk !== 'N') assert.match(unlockRarity.image, /linear-gradient/);
      const state = await page.locator('.unlock .card-flip').evaluate(el => ({ transform: getComputedStyle(el).transform, rect: el.getBoundingClientRect().toJSON() }));
      assert.ok(!state.transform.includes('-1, 0, 0, 0, 0, 1'), 'skip ends on front');
      await noOverflow(page, `unlock-${rk}-${width}`);
      if (rk === 'UR') await page.screenshot({ path: join(output, `release-unlock-${width}.png`) });
      await page.locator('.unlock [data-act="ok"]').click(); await settle(page);
      assert.equal(await page.evaluate(() => YK_REFLECTIVE.mountedCount), 0, 'detached roots disposed');
    }
    await context.close();
  }
  const aContext = await browser.newContext({ viewport: { width: 390, height: 844 }, permissions: ['camera', 'microphone'] });
  const a = await initPage(aContext);
  await publish(a);
  assert.equal(await a.evaluate(() => YK_STORE.db.cards['001'].verifiedCount), 0);
  await a.locator('.unlock [data-act="ok"]').click(); await settle(a);
  await publish(a, { camera: true, length: '39' });
  assert.equal(await a.evaluate(() => YK_STORE.db.cards['001'].giant.status), 'approved');
  await a.locator('.unlock [data-act="dex"]').click(); await settle(a);
  await a.locator('.cell[data-sp="001"]').click(); await settle(a);
  await a.locator('[data-v="normal"]').click(); await settle(a);
  assert.equal(await a.locator('.card-stage .reflective-shell').getAttribute('data-rarity'), 'N');
  await a.locator('[data-v="ur"]').click(); await settle(a);
  assert.equal(await a.locator('.card-stage .reflective-shell').getAttribute('data-rarity'), 'UR');
  await a.locator('.page-body > .actions-row [data-share]').click();
  const url = await a.locator('.link-box').inputValue(); assert.ok(url.includes('#shared='));
  const ownerId = await a.evaluate(() => YK_STORE.db.me.serverId);
  await a.reload(); await a.waitForFunction(() => YK_API.connected && YK_STORE.db.catches.length === 2);
  report.journeys.push('album publish, camera giant publish, variant switch, server share and reload persistence');
  const bContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const b = await initPage(bContext);
  await b.locator('[data-tab="rank"]').click(); await settle(b);
  await b.locator(`[data-user="${ownerId}"]`).first().click(); await settle(b);
  await b.locator('.profile-root .cell[data-sp="001"]').click(); await settle(b);
  await b.locator('.mine-list [data-i]').first().click(); await settle(b);
  const like = b.locator('[data-like]'); await like.click(); await b.waitForFunction(() => document.querySelector('[data-like]')?.getAttribute('aria-pressed') === 'true');
  assert.equal(await like.locator('.num').textContent(), '1');
  await like.click(); await b.waitForFunction(() => document.querySelector('[data-like]')?.getAttribute('aria-pressed') === 'false');
  assert.equal(await like.locator('.num').textContent(), '0');
  report.journeys.push('second account opens real rank/profile/catch and likes/unlikes');
  const shareContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const shared = await shareContext.newPage(); watch(shared); await shared.goto(url);
  await shared.locator('.share-view .reflective-shell').waitFor(); await settle(shared);
  await shared.locator('.share-view .reflective-shell').click(); await settle(shared);
  assert.ok(await shared.locator('.shareback img').evaluate(i => i.complete && i.naturalWidth > 0));
  const shareLayout = await shared.locator('.shareback').evaluate(back => ({
    imageFit: getComputedStyle(back.querySelector('img')).objectFit,
    bodyOverflow: back.querySelector('.sb-body').scrollWidth > back.querySelector('.sb-body').clientWidth,
    overflow: back.scrollWidth > back.clientWidth,
    descriptionColor: getComputedStyle(back.querySelector('.sb-desc')).color,
    authorColor: getComputedStyle(back.querySelector('.sb-by')).color
  }));
  assert.equal(shareLayout.imageFit, 'contain', 'shared photo keeps its complete framing');
  assert.equal(shareLayout.bodyOverflow || shareLayout.overflow, false, 'share back has no horizontal scrolling');
  assert.equal(shareLayout.descriptionColor, 'rgb(244, 246, 248)');
  assert.equal(shareLayout.authorColor, 'rgb(229, 237, 245)');
  await noOverflow(shared, 'cross-device-share');
  await shared.screenshot({ path: join(output, 'release-share-390.png') });
  report.journeys.push('clean browser opens public share with real photo and city-only location');
  await shareContext.close(); await bContext.close();

  // Encode a real short video in the browser, then exercise server ffprobe and streaming.
  const video = await a.evaluate(async () => {
    const canvas = document.createElement('canvas'); canvas.width = 160; canvas.height = 120;
    const g = canvas.getContext('2d'); let n = 0;
    const stream = canvas.captureStream(12), chunks = [];
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    const done = new Promise(resolve => { recorder.onstop = async () => resolve([...new Uint8Array(await new Blob(chunks, { type: 'video/webm' }).arrayBuffer())]); });
    recorder.ondataavailable = e => chunks.push(e.data); recorder.start(100);
    const timer = setInterval(() => { g.fillStyle = n++ % 2 ? '#13b9af' : '#ffb9bc'; g.fillRect(0, 0, 160, 120); }, 80);
    await new Promise(r => setTimeout(r, 1600)); recorder.stop(); clearInterval(timer); stream.getTracks().forEach(t => t.stop()); return done;
  });
  const videoResult = await a.evaluate(async bytes => {
    const form = new FormData(); form.append('file', new Blob([new Uint8Array(bytes)], { type: 'video/webm' }), 'short.webm');
    return YK_API.request('/media', { method: 'POST', body: form });
  }, video);
  assert.ok(videoResult.duration > 1 && videoResult.duration < 3); report.video = { mime: videoResult.mime, duration: videoResult.duration, size: videoResult.size };
  const streamed = await fetch(base + videoResult.url, { headers: { Range: 'bytes=0-99' } }); assert.equal(streamed.status, 206);

  for (const cue of ['ui_flip', 'unlock_N', 'unlock_R', 'unlock_SR', 'unlock_SSR', 'unlock_UR']) {
    const stats = await a.evaluate(async cue => {
      const context = new OfflineAudioContext(1, 96000, 48000); YK_AUDIO.renderCue(context, cue, .01);
      const buffer = await context.startRendering(), samples = buffer.getChannelData(0);
      let peak = 0, energy = 0; for (const s of samples) { peak = Math.max(peak, Math.abs(s)); energy += s * s; }
      return { peak, rms: Math.sqrt(energy / samples.length) };
    }, cue);
    assert.ok(stats.peak > .01 && stats.peak < 1 && stats.rms > .0001); report.audio.push({ cue, ...stats });
  }
  await a.evaluate(() => { YK_AUDIO.settings.sfx = false; YK_AUDIO.stopAll(); YK_AUDIO.play('unlock_UR'); });
  assert.equal(await a.evaluate(() => YK_AUDIO.activeCount), 0);
  report.journeys.push('real WebM validation/byte-range streaming; six rendered audio cues and mute');
  a.expectedConsolePath = '/api/catches';
  await a.route('**/api/catches', async route => {
    if (route.request().method() !== 'POST') return route.continue();
    await route.fetch();
    await route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: { code: 'TEST_RESPONSE_LOST', message: '连接中断，草稿已保留' } }) });
  });
  await publish(a, { species: '008', color: '#1e9035', description: '重试仍然只记一次', expectFailure: true });
  assert.equal(await a.evaluate(async () => (await YK_API.request('/catches')).total), 3);
  assert.equal(await a.evaluate(() => YK_STORE.db.catches.length), 2);
  await a.unroute('**/api/catches');
  await a.locator('[data-act="submit"]').click();
  await a.waitForFunction(() => YK_STORE.db.catches.length === 3);
  await a.locator('.unlock .skip').click(); await settle(a);
  await a.locator('.unlock [data-act="dex"]').click(); await settle(a);
  a.expectedConsolePath = null;
  assert.equal(service.db.prepare('SELECT count(*) AS n FROM submissions').get().n, 3);
  report.journeys.push('lost response after commit retains draft; retry replays one catch without consuming quota twice');
  await a.locator('.cell[data-sp="001"]').click(); await settle(a);
  await a.locator('.mine-list [data-i]').first().click(); await settle(a);
  await a.locator('[data-edit]').click(); await a.locator('#edit-desc').fill('已修改的现场记录');
  await a.locator('.catch-edit button[type="submit"]').click();
  await a.waitForFunction(() => YK_STORE.db.catches.some(c => c.desc === '已修改的现场记录'));
  await settle(a);
  await a.locator('[data-del]').click(); await a.locator('.sheet-wrap').last().locator('[data-ok]').click();
  await a.waitForFunction(() => YK_STORE.db.catches.length === 2);
  assert.equal(await a.evaluate(() => YK_STORE.db.cards['001'].giant.status), 'none');
  await a.locator('[data-act="settings"]').click(); await a.locator('.service-settings').click();
  const downloaded = a.waitForEvent('download'); await a.locator('[data-export]').click();
  const download = await downloaded; assert.equal(download.suggestedFilename(), 'yukomon-records.json');
  await a.locator('[data-disconnect]').click(); await settle(a);
  assert.equal(await a.evaluate(() => YK_API.remote), false);
  assert.equal(await a.evaluate(() => YK_STORE.db.me.nickname), '大鱼');
  report.journeys.push('edit and delete through UI, giant retraction, export download, disconnect restores original local data');

  // Exercise demo mode against a healthy service, including account round trips.
  await a.evaluate(() => {
    YK_STORE.checkin({ source: 'album', photo: null, desc: '保留的本机记录', lengthCm: 42, released: true, location: { city: '杭州' }, gear: {} }, '003');
    YK_STORE.db.me.nickname = '演示保留';
    YK_STORE.db.draft = { desc: '保留的本机草稿' };
    YK_STORE.save();
  });
  await a.locator('[data-act="settings"]').click();
  await a.locator('[data-demo]').click(); await settle(a);
  assert.equal(await a.evaluate(() => YK_STORE.db.catches.length), 15);
  await a.reload(); await settle(a);
  assert.equal(await a.evaluate(() => YK_API.remote), false, 'demo choice survives a healthy localhost reload');
  assert.equal(await a.evaluate(() => YK_STORE.db.me.nickname), '演示保留');
  assert.equal(await a.evaluate(() => YK_STORE.db.draft.desc), '保留的本机草稿');
  await a.locator('[data-act="settings"]').click(); await a.locator('.service-settings').click();
  await a.locator('#service-url').fill(base); await a.locator('[data-connect]').click();
  await a.waitForFunction(() => YK_API.connected && YK_API.remote);
  assert.equal(await a.evaluate(() => YK_STORE.db.catches.length), 2, 'demo samples never enter the online account');
  assert.equal(await a.evaluate(() => JSON.parse(localStorage.getItem('yukomon-api-config-v1')).mode), undefined);
  await a.goto(`${base}/?demo=1`); await a.waitForFunction(() => !!window.YK_APP && !YK_API.remote);
  await settle(a);
  assert.equal(new URL(a.url()).searchParams.has('demo'), false, 'entry parameter is consumed so manual reconnect remains usable');
  assert.equal(await a.evaluate(() => YK_STORE.db.catches.length), 15);
  assert.equal(await a.evaluate(() => YK_STORE.db.me.nickname), '演示保留');
  assert.equal(await a.evaluate(() => JSON.parse(localStorage.getItem('yukomon-last-cloud-cache')).catches.length), 2);
  await a.goto(`${base}/?demo=1`); await a.waitForFunction(() => !!window.YK_APP && !YK_API.remote); await settle(a);
  assert.equal(await a.evaluate(() => YK_STORE.db.catches.length), 15, 'repeated entry does not duplicate samples or restore a stale backup');
  const demoData = await a.evaluate(() => ({
    catches: YK_STORE.db.catches.length,
    unlocked: Object.keys(YK_STORE.db.cards).length,
    by: YK_STORE.dexProgress().by,
    national: YK_STORE.rankOf('nation').total,
    city: YK_STORE.rankOf('city').total,
    mine: YK_STORE.rankOf('nation').me,
    albumRank: YK_STORE.sizeRankOf('002', 'nation').me,
    giantRank: YK_STORE.sizeRankOf('022', 'nation').me,
  }));
  for (const rarity of ['N', 'R', 'SR', 'SSR', 'UR']) assert.ok(demoData.by[rarity] > 0, `unlocked ${rarity} samples`);
  assert.equal(demoData.national, 161); assert.ok(demoData.city > 1 && demoData.mine);
  assert.equal(demoData.albumRank, null, 'album-only catch remains off the size leaderboard');
  assert.equal(demoData.giantRank.lengthCm, 86);
  report.demoData = demoData;
  await noOverflow(a, 'demo-dex-390');
  await a.screenshot({ path: join(output, 'demo-data-dex-390.png') });
  await a.locator('[data-f="SSR"]').click(); await settle(a);
  assert.equal(await a.locator('.tray .cell > .yk-card').count(), 2);
  await a.locator('.tray .cell[data-sp="073"]').click(); await settle(a);
  assert.equal(await a.locator('.card-stage .reflective-shell').getAttribute('data-rarity'), 'SSR');
  await a.locator('.card-stage .reflective-shell').click(); await settle(a);
  await noOverflow(a, 'demo-SSR-back-390');
  await a.screenshot({ path: join(output, 'demo-data-SSR-back-390.png') });
  await a.keyboard.press('Escape'); await settle(a);
  await a.locator('[data-tab="rank"]').click(); await settle(a);
  assert.equal(await a.locator('.board .rank-row').count(), 100);
  await a.screenshot({ path: join(output, 'demo-data-rank-390.png') });
  await a.locator('.board [data-user]').first().click(); await settle(a);
  assert.ok(await a.locator('.profile-root .cell > .yk-card').count() > 0);
  await a.keyboard.press('Escape'); await settle(a);
  await a.locator('[data-board="giant"]').click(); await settle(a);
  await a.locator('.giant-tray .cell[data-sp="022"]').click(); await settle(a);
  assert.ok(await a.locator('.size-rank .board .rank-row').count() > 1);
  await noOverflow(a, 'demo-size-rank-390');
  await a.screenshot({ path: join(output, 'demo-data-size-rank-390.png') });
  report.journeys.push('demo fill preserves local records/draft and online account; repeat/reload persistence; all rarities, mock profiles, national/city/size ranks');
  await aContext.close();
  const reducedContext = await browser.newContext({ viewport: { width: 390, height: 667 }, reducedMotion: 'reduce' });
  const reduced = await initPage(reducedContext, { offline: true });
  await reduced.evaluate(() => YK_APP.demoUnlock('UR')); await settle(reduced);
  assert.equal(await reduced.locator('.unlock .skip').isVisible(), false);
  await noOverflow(reduced, 'reduced-motion-small-height');
  await reduced.screenshot({ path: join(output, 'release-reduced-390.png') });
  await reducedContext.close();
  assert.deepEqual(report.consoleErrors, []); assert.deepEqual(report.failedRequests, []);
  console.log(JSON.stringify(report, null, 2));
} finally {
  writeFileSync(join(output, 'release-e2e-report.json'), JSON.stringify(report, null, 2));
  await browser.close(); await new Promise(r => server.close(r)); service.close(); rmSync(dataDir, { recursive: true, force: true });
}
