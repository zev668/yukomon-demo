import { defineConfig, mergeConfig } from 'vite';
import base from './vite.config.js';
import { fileURLToPath, URL } from 'node:url';
import { existsSync } from 'node:fs';
export default mergeConfig(base, defineConfig({
  publicDir: false,
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    outDir: existsSync(new URL('../demo/index.html', import.meta.url)) ? '../demo/vendor/reflective-card' : '../vendor/reflective-card', emptyOutDir: true,
    lib: { entry: fileURLToPath(new URL('./src/app-card.jsx', import.meta.url)), name: 'YKReflectiveBundle', formats: ['iife'], fileName: () => 'reflective-card.js', cssFileName: 'reflective-card' }
  }
}));
