import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import path from 'path';
import pkg from './package.json';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig(() => {
  const rootDir = process.env.NODE_ENV === 'development' ? 'playground' : '.';
  return {
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version)
    },
    root: path.resolve(__dirname, rootDir),
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'VuePopupPlugin',
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
    plugins: [vue(), dts(), cssInjectedByJsPlugin()],
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
