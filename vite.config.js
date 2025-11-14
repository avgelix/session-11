import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { handleGeminiRequest } from './server/gemini-local.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Custom plugin to handle /api/gemini locally
    {
      name: 'local-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/gemini') {
            handleGeminiRequest(req, res);
          } else {
            next();
          }
        });
      }
    }
  ],
  server: {
    // Remove proxy in development - use local handler instead
  },
  build: {
    // Enable code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'analytics': ['@vercel/analytics'],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 600,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
      },
    },
  },
})
