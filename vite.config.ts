// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'  // oder dein aktuelles React-Plugin

export default defineConfig({
  base: '/cozy-control-craft/',  // trailing slash wichtig für GitHub Pages Project-Site

  plugins: [react()],

  server: {
    host: '::',
    port: 8080,
    hmr: {
      overlay: false,
    },
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets'   // ← hier war das Problem: kein Komma vor 'assetsDir' oder falsche Einrückung
  },
})
