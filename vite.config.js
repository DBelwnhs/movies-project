import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Configure aliases for React Router
      'react-router-dom': resolve(__dirname, 'node_modules/react-router-dom'),
    },
  },
});
