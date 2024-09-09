import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: './dist/stats.html',
      open: false,
    }),
    viteCompression({
      algorithm: 'gzip', // Usar gzip para compactação
      threshold: 20240, // Compactar arquivos maiores que 10 KB (ajustar conforme necessário)
      ext: '.gz', // Extensão dos arquivos gzip compactados
    }),
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString()
          }
        },
      },
    },
    chunkSizeWarningLimit: 750,
  },
})
