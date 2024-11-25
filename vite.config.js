import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['chunk-PL7FREAV'], // Add the problematic dependency here
  },
  server: {
    historyApiFallback: true,
  },
})
