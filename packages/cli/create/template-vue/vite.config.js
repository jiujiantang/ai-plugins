import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock';
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: './src/mock',
      localEnabled: true, // 开发环境启用 mock
      prodEnabled: false, // 生产环境禁用 mock
      injectCode: `
        import { setupProdMockServer } from './mockProdServer';
        setupProdMockServer();
      `,
    })
  ],
  base: './', //打包后，路径相对dist/
  server: {
    allowedHosts: ['localhost.3d66.com'], // 配置热更新时不阻止的主机 (localhost.3d66.com)
    port: 8888,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
