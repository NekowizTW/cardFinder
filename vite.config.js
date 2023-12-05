import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [react(), visualizer({
    gzipSize: true,
    brotliSize: true,
    emitFile: false,
    filename: 'rollupStats.html',
    open: true,
  })],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          rc: ['rc-input-number', 'rc-pagination', 'rc-select', 'rc-tabs'],
        },
      },
    },
  },
});
