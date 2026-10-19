import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import { existsSync } from 'node:fs';

const dependency = name => fileURLToPath(new URL(`./node_modules/${name}`, import.meta.url));
const appRoot = existsSync(new URL('../demo/index.html', import.meta.url)) ? '../demo/' : '../';

export default defineConfig({
  resolve: {
    alias: {
      '@yukomon/rarity-style': fileURLToPath(new URL(`${appRoot}css/rarity.css`, import.meta.url)),
      '@yukomon/rarity': fileURLToPath(new URL(`${appRoot}js/rarity.js`, import.meta.url)),
      react: dependency('react'),
      'react-dom': dependency('react-dom'),
      '@hugeicons/react': dependency('@hugeicons/react'),
      '@hugeicons/core-free-icons': dependency('@hugeicons/core-free-icons')
    }
  }
});
