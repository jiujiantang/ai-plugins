import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock';
import tailwindcss from '@tailwindcss/vite'
import path from "path";
import legacy from '@vitejs/plugin-legacy'

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
    }),
    tailwindcss(),
    legacy({
      targets: ['ios >= 9', 'android >= 4.2', '> 1%'],
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
  build: {
    rollupOptions: {
      output: {
        // 主构建产物配置
        entryFileNames: `assets/[name].js`,
        // legacy 构建产物配置
        manualChunks: undefined,
        // 确保 legacy 块也遵循相同命名规则
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name.includes('legacy')) {
            return `assets/${chunkInfo.name.replace('-legacy', '.legacy')}.js`
          }
          return `assets/[name]-[hash].js`
        },
        // 新增 CSS 文件配置
        assetFileNames: (assetInfo) => {
          // 将所有 CSS 文件命名为 index.css
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/index.css'
          }
          // 其他资源保持原有命名规则
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  }
})
