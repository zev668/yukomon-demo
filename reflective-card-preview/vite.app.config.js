import { defineConfig, mergeConfig } from 'vite';
import base from './vite.config.js';
import { fileURLToPath, URL } from 'node:url';
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
const appRoot = existsSync(new URL('../demo/index.html', import.meta.url)) ? '../demo/' : '../';
export default mergeConfig(base, defineConfig({
  publicDir: false,
  plugins: [{ name: 'card-reflection-video', closeBundle() {
    const target = new URL(`${appRoot}vendor/reflective-card/`, import.meta.url);
    mkdirSync(target, { recursive: true });
    copyFileSync(new URL('./public/videos/slow-ripples.mp4', import.meta.url), new URL('slow-ripples.mp4', target));
  } }],
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    outDir: fileURLToPath(new URL(`${appRoot}vendor/reflective-card`, import.meta.url)), emptyOutDir: true,
    lib: { entry: fileURLToPath(new URL('./src/app-card.jsx', import.meta.url)), name: 'YKReflectiveBundle', formats: ['iife'], fileName: () => 'reflective-card.js', cssFileName: 'reflective-card' }
  }
}));
