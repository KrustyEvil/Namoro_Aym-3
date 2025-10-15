// ...existing code...
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // ajuste conforme o nome exato do repo: https://<usuario>.github.io/ProjetoAym-3/
  base: '/ProjetoAym-3/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,      // limpa docs antes do build
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
});
// ...existing code...