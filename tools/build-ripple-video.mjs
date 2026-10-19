import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const ffmpeg = process.argv[2] || process.env.FFMPEG_PATH;
if (!ffmpeg) throw new Error('Pass the ffmpeg executable path as the first argument.');

const output = resolve('reflective-card-preview/public/videos/slow-ripples.mp4');
mkdirSync(dirname(output), { recursive: true });
const size = 512, fps = 24, seconds = 32, count = size * size;
const tau = Math.PI * 2;
const waves = [
  { angle: 0.42, frequency: 3.1, weight: 0.52, speed: 1, phase: 0.4 },
  { angle: 1.93, frequency: 4.3, weight: 0.28, speed: -1, phase: 1.8 },
  { angle: -0.88, frequency: 5.6, weight: 0.16, speed: 2, phase: 3.5 },
  { center: [-0.65, 0.25], frequency: 3.5, weight: 0.2, speed: 1, phase: 2.1 },
  { center: [1.4, 1.3], frequency: 4.1, weight: 0.15, speed: -2, phase: 5.2 },
  { angle: 2.7, frequency: 1.6, weight: 0.12, speed: -1, phase: 0.9 },
].map(wave => ({ ...wave, sin: new Float32Array(count), cos: new Float32Array(count) }));

for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
  const u = x / size, v = y / size, i = y * size + x;
  const px = u + 0.07 * Math.sin(v * 6.2 + u * 1.8) + 0.03 * Math.cos(v * 11.3 - u * 4.1);
  const py = v + 0.06 * Math.cos(u * 5.7 - v * 2.1) + 0.025 * Math.sin(u * 10.8 + v * 3.2);
  for (const wave of waves) {
    const distance = wave.center
      ? Math.hypot(px - wave.center[0], py - wave.center[1])
      : px * Math.cos(wave.angle) + py * Math.sin(wave.angle);
    const phase = distance * wave.frequency * tau + wave.phase;
    wave.sin[i] = Math.sin(phase) * wave.weight;
    wave.cos[i] = Math.cos(phase) * wave.weight;
  }
}

const encoder = spawn(ffmpeg, [
  '-hide_banner', '-loglevel', 'error', '-y',
  '-f', 'rawvideo', '-pixel_format', 'gray', '-video_size', `${size}x${size}`,
  '-framerate', String(fps), '-i', 'pipe:0', '-an',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '22',
  '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-threads', '2', output,
], { windowsHide: true, stdio: ['pipe', 'ignore', 'pipe'] });
const finished = new Promise((resolveExit, reject) => {
  encoder.once('error', reject);
  encoder.once('close', code => code === 0 ? resolveExit() : reject(new Error(`ffmpeg exited with ${code}`)));
});
encoder.stderr.on('data', data => process.stderr.write(data));
encoder.stdin.on('error', error => { if (error.code !== 'EPIPE') console.error(error); });
const field = new Float32Array(count);
let firstFrame, previousFrame, maxStep = 0, maxMeanDrift = 0;

// Integer temporal frequencies make both motion and its velocity continuous at the loop.
for (let frame = 0; frame < fps * seconds; frame++) {
  field.fill(0);
  const time = frame / (fps * seconds) * tau;
  for (const wave of waves) {
    const c = Math.cos(time * wave.speed), s = Math.sin(time * wave.speed);
    for (let i = 0; i < count; i++) field[i] += wave.sin[i] * c - wave.cos[i] * s;
  }
  let mean = 0;
  for (let i = 0; i < count; i++) {
    const h = field[i];
    const ridge = Math.exp(-11 * (h - 0.22) ** 2);
    field[i] = 128 + h * 27 + ridge * 25;
    mean += field[i];
  }
  // Fixed exposure prevents the material's environment normalization from pumping.
  const correction = 132 - mean / count;
  const pixels = Buffer.allocUnsafe(count);
  let brightness = 0, difference = 0;
  for (let i = 0; i < count; i++) {
    pixels[i] = Math.round(Math.max(64, Math.min(196, field[i] + correction)));
    brightness += pixels[i];
    if (previousFrame) difference += Math.abs(pixels[i] - previousFrame[i]);
  }
  maxMeanDrift = Math.max(maxMeanDrift, Math.abs(brightness / count - 132));
  if (previousFrame) maxStep = Math.max(maxStep, difference / count);
  if (!firstFrame) firstFrame = Buffer.from(pixels);
  previousFrame = pixels;
  if (!encoder.stdin.write(pixels)) await once(encoder.stdin, 'drain');
  if (frame % (fps * 8) === 0) console.log(`Rendered ${frame / fps}/${seconds}s`);
}
encoder.stdin.end();
await finished;
let loopDifference = 0;
for (let i = 0; i < count; i++) loopDifference += Math.abs(firstFrame[i] - previousFrame[i]);
console.log(JSON.stringify({ output, size, fps, seconds, maxFrameDifference: maxStep, loopFrameDifference: loopDifference / count, maxMeanDrift }, null, 2));
