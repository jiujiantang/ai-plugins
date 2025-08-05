# tailwindcss 针对现代浏览器设计，有兼容性，可以用于前期功能实现，后期UI实现谨慎使用
```shell
pnpm install tailwindcss @tailwindcss/vite @tailwindcss/postcss autoprefixer postcss -D
```
```js
// vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```
```js
/** tailwind.config.js */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

/** postcss.config.js */
import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default {
  plugins: [tailwindcss(), autoprefixer()],
}
```
```css
@import "tailwindcss";
```

# 功能阶段 开启， Ui实现阶段 关闭， 兼容溜云库老浏览器（不支持tailwindcss特性）
```js
// index.ts
if (import.meta.env.VITE_USE_TAILWIND === 'true') {
  import('./tailwind.css');
}
```
```css
/*tailwind.css*/
@import "tailwindcss";
```
```env
VITE_USE_TAILWIND=true
```
