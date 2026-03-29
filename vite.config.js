import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['d3'],
  },
  server: {
    proxy: {
      '/api/hint': {
        target: 'https://api.anthropic.com',
        changeOrigin: true,
        rewrite: () => '/v1/messages',
        configure(proxy) {
          proxy.on('proxyReq', (proxyReq) => {
            const key = process.env.ANTHROPIC_API_KEY
            if (key) proxyReq.setHeader('x-api-key', key)
            proxyReq.setHeader('anthropic-version', '2023-06-01')
          })
        },
      },
    },
  },
})
