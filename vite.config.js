import { defineConfig } from 'vite';

// GitHub Pages (project site) is served from https://USER.github.io/REPO/
// so the base path MUST be "/REPO/". Set VITE_BASE, or edit the default below.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? (process.env.VITE_BASE || '/mybiz-pos/') : '/',
  build: { outDir: 'dist', sourcemap: false }
}));
