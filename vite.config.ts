import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/versailles-points-counter/",
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['public/img/icons/favicon-32x32.png', 'robots.txt'], // fichiers à inclure
      workbox: {
        runtimeCaching: [{
          urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
          handler: 'CacheFirst',
          options: {
            cacheName: 'assets-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 jours
            },
          },
        }],
      },
    })
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: ['src/main.ts', './index.html']
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
