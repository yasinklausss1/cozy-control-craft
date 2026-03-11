import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // oder dein Plugin

export default defineConfig({
  base: '/cozy-control-craft/',  // trailing slash wichtig!
  plugins: [react()],
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
})

  // Optional: wenn du noch mehr Kontrolle willst
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
}))
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
