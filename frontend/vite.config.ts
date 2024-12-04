import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import macroPlugin from "vite-plugin-babel-macros"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    macroPlugin(),
  ],
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:7001',
        changeOrigin: true
      },
    },
  },
  build: { chunkSizeWarningLimit: 1600, }
})
