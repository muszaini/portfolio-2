import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.SERVER_URL || 'http://localhost:5001',
        changeOrigin: true
      }
    }
  }
});
