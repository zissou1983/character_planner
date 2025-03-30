import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  server: {
    port: 5173,
    open: true, // Dies öffnet automatisch den Browser
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias für src-Verzeichnis
    },
  },
});