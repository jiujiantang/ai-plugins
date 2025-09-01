基于全局 open/close API 的弹窗组件，通过npm install vue-easy-popup安装使用。

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import VuePopupPlugin from "vue-easy-popup";

const app = createApp(App);
app.use(VuePopupPlugin);
if(typeof window !== 'undefined') {
    window.easyPop = VuePopupPlugin;
}
app.mount('#app');
```
```vue
<script lang="ts" setup>
  import {onMounted} from 'vue';
  const popupOptions = {
    type: "html",
    showClose: false,
    content: `
    <div style='width: 200px;height: 150px;padding: 20px;background: #ffffff;border-radius: 8px;text-align: center;box-shadow: 0 2px 12px rgba(0,0,0,0.15)'>这是一个默认弹窗</div>
  `,
    close: (type: string) => console.log(type),
  }
  onMounted(()=>{
    window.easyPop.open(popupOptions);
    window.easyPop.open({type: "toast", content: "支付成功"});
  })
</script>
<template>
  <button v-popup="popupOptions">打开</button>
</template>
```