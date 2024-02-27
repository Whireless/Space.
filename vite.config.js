import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  // base: '/Space.', // Github
  server: {
    open: true,
  },
  build: {
    outDir: './build',
  },
  plugins: [
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
