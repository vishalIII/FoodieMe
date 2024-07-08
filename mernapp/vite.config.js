import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/createuser': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/item': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
});
