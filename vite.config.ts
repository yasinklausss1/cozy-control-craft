// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'  // ← das ist wichtig für resolve.alias

export default defineConfig({
  base: '/cozy-control-craft/',  // für GitHub Pages Project-Site

  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // ← definiert @ als src/
    },
  },

  server: {
    host: '::',
    port: 8080,
    hmr: {
      overlay: false,
    },
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
