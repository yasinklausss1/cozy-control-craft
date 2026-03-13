// vite.config.mts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'   // ← neu!
import path from 'path'

export default defineConfig({
  base: '/',
  build: {
    outDir: 'docs',
  },

  plugins: [
    react(),
    tailwindcss(),   // ← das war der fehlende Teil
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    host: '::',
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
})
