import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api':
         'http://localhost:5000',
      "/uploads": "http://localhost:5000",
      

       
        
      S
    }
  },
  build: {
    outDir: 'dist',
    mime: {
      '.jsx': 'application/javascript',
    },
  },
  mimeTypes: {
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.html': 'text/html',
    // Add more MIME types as needed
  },
  headers: {
    'Content-Type': 'application/javascript; charset=UTF-8',
  },
})
