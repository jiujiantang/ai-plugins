import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig(() => {
  const rootDir = process.env.NODE_ENV === 'development' ? 'playground' : '.';
  return {
    root: path.resolve(__dirname, rootDir),
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'VueIconCachePlugin',
        fileName: format => `index.${format}.js`,
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: ['vue', 'pinia'],
        output: {
          globals: {
            vue: 'Vue',
            pinia: 'Pinia',
          },
        },
      },
    },
    plugins: [vue(), dts()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 3000,
      open: true,
    },
  }
});
