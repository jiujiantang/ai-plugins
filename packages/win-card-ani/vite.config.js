import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.js",
      name: "WinCard",
      fileName: (format) => `win-card-ani.${format}.js`,
      formats: ["es", "umd", "iife"], // 兼容性最好
    },
  },
});
