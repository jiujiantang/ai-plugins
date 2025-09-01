import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), dts()],
  resolve: {
    alias: {
      // '@': path.resolve(__dirname, '../plugins/vue-count-down/src'),
    },
  },
})
