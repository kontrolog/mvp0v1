import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.ttf', '**/*.otf', '**/*.png', '**/*.jpg'],
  publicDir: 'public',
  server: {
    watch: {
      usePolling: true,
    },
  },
});