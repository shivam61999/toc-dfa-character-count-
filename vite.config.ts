import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'pwa-icon.svg'],
      manifest: {
        name: 'DFA Exact Character Count Validator (3m, 2n)',
        short_name: 'TOC DFA',
        description: 'Exact Character Count (3m "a"s, 2n "b"s) DFA Simulator & Offline Validator for Android & Desktop',
        theme_color: '#020617',
        background_color: '#020617',
        display: 'standalone',
        start_url: './',
        icons: [
          {
            src: 'pwa-icon.svg',
            sizes: '192x192 512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}']
      }
    })
  ],
  base: './', // Ensures assets load correctly on GitHub Pages, Vercel, and Render
})
