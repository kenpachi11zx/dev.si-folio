import { defineConfig } from 'vite'

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  envDir: "../",
  server: {
    port: 3000,
    host: true
  }
}) 