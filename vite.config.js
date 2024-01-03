import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), visualizer({
    gzipSize: true,
    brotliSize: true,
    emitFile: false,
    filename: 'rollupStats.html',
    open: true,
  })],
});
