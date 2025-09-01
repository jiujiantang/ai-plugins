背景切换组件，支持平滑过渡效果。当背景URL变化时，会显示淡入淡出的切换动画。宽高属性为可选，如果不设置将自适应容器大小。通过npm install vue-icon-in 安装使用。

```vue
<template>
  <BgSwitcher :width="1030" :height="650" :url="bgUrl">
    <h1 class="overlay-text">Hello World</h1>
  </BgSwitcher>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import BgSwitcher from 'vue-icon-in';

  const bgUrl = ref('https://your-image-domain.com/bg1.jpg');

  // 模拟切换
  setTimeout(() => {
    bgUrl.value = 'https://your-image-domain.com/bg2.jpg';
  }, 3000);
</script>
```