import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Der Pfad zu 'src' unter Verwendung von import.meta.url und fileURLToPath
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    port: 5173, // Portnummer
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': `${__dirname}/src`, // Alias für 'src'
    },
  },
});