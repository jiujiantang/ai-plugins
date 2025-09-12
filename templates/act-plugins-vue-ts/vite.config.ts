import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import path from 'path';
import pkg from './package.json';

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
    test: {
      environment: 'jsdom', // 指定测试环境为 jsdom
      globals: true,        // 支持 describe / it / expect 全局变量
    },
    resolve: {
      alias: {
        // '@': path.resolve(__dirname, 'src'), 因为storybook的vite配置无法适配alias，插件统一不用alias
      },
    },
    server: {
      port: 3000,
      open: true,
    },
  }
});
