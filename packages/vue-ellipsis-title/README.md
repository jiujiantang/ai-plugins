自定义指令，当文本溢出时显示省略号，并在鼠标悬停时显示完整内容的提示框，通过npm install vue-ellipsis-title安装使用。

```ts
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import VueEllipsisTitlePlugin from "vue-ellipsis-title";

const app = createApp(App);
app.use(VueEllipsisTitlePlugin);
app.mount("#app");
```
```vue
<script lang="ts" setup>
  const text = "这是一段中等长度的文本内容，用于演示效果";
</script>
<template>
  <p class="test" style="max-width: 200px" v-ellipsis-title="textRef">{{ text }}</p>
</template>
```

