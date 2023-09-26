import { defineConfig } from 'vite';
import NodePolyfillPlugin from 'vite-plugin-node';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  optimizeDeps: {
    optimizeDeps: { exclude: ["fsevents"] },
  }
});




  // server: {
  //   proxy: {
  //     '/hi': 'http://localhost:3000',
  //     '/topten': 'http://localhost:3000',
  //     '/popularity': 'http://localhost:3000',
  //     '/favorites': 'http://localhost:3000',
  //   }
  // },





