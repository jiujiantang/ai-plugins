解决文本截断后，无法显示完整信息的问题

```ts
import { createApp } from "vue";
import App from "./App.vue";
import VueTitlePlugin from "vue-title";

const app = createApp(App);
app.use(VueTitlePlugin);
app.mount("#app");
```
```vue
<script lang="ts" setup>
import {ref} from "vue";
const textRef = ref<string>("AI会员权益AI会员权益AI会员权益AI会员权益AI会员权益AI会员权益AI会员权益AI会员权益AI会员权益")
</script>
<template>
  <p class="test" v-ellipsis-title="textRef">{{ textRef }}</p>
</template>
<style lang="less" scoped>
.test {
  max-width: 100px;
  height: 36px;
}
</style>
```