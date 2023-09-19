import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/hi': 'http://localhost:3000',
      '/topten': 'http://localhost:3000',
      '/popularity': 'http://localhost:3000',
      '/favorites': 'http://localhost:3000',
    }
  },

});





