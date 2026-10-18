import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

const dependency = name => fileURLToPath(new URL(`./node_modules/${name}`, import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      react: dependency('react'),
      'react-dom': dependency('react-dom'),
      '@hugeicons/react': dependency('@hugeicons/react'),
      '@hugeicons/core-free-icons': dependency('@hugeicons/core-free-icons')
    }
  }
});
