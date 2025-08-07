```vue
<template>
  <BgSwitcher :width="1030" :height="650" :url="bgUrl">
    <h1 class="overlay-text">Hello World</h1>
  </BgSwitcher>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { BgSwitcher } from 'vue_icon_in';

const bgUrl = ref('https://your-image-domain.com/bg1.jpg');

// 模拟切换
setTimeout(() => {
  bgUrl.value = 'https://your-image-domain.com/bg2.jpg';
}, 3000);
</script>

<style scoped>
.overlay-text {
  color: white;
  text-align: center;
  margin-top: 100px;
  font-size: 32px;
}
</style>
```