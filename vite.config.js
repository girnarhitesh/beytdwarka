import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { site } from './src/site.config.js'

export default defineConfig({
  base: site.base,
  plugins: [react()],
  optimizeDeps: {
    exclude: ['maplibre-gl'],
  },
})
