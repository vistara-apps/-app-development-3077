import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress warnings about pure annotations
        if (warning.code === 'INVALID_ANNOTATION') return
        warn(warning)
      }
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    include: [
      '@rainbow-me/rainbowkit',
      'wagmi',
      'viem',
      '@tanstack/react-query'
    ]
  }
})
