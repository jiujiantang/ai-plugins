<template>
  <div class="op">
    <button @click="holderClick">Switcher Icon</button>
  </div>
  <div class="wrap">
    <BgSwitcher :url="bgUrl">
      <h1 class="overlay-text">Hello World</h1>
    </BgSwitcher>
  </div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, ref} from 'vue';
import { BgSwitcher } from "@/index"

const defIcon = ref<boolean>(0)
const bgUrl = ref<string>("");
const holderClick = () => {
  setTimeout(() => {
    bgUrl.value = `https://lykstatictest.3d66.com/liuyunku/application/packages/recharge/public/image/${defIcon.value ? '1':'3'}-right1.png`;
    defIcon.value = !defIcon.value
  }, 500);
}
onMounted(() => {
  nextTick(()=>{
    bgUrl.value = "https://lykstatictest.3d66.com/liuyunku/application/packages/recharge/public/image/1-right1.png"
  })
})
</script>

<style scoped>
.wrap {
  width: 80px;
  height: 80px;
  border: 1px solid #ccc;
  margin-top: 10px;
  margin-left: 2px;
  .overlay-text {
    width: 100%;
    position: absolute;
    bottom: 0;
    font-size: 12px;
    color: #ccc;
    text-align: center;
  }
}
.op {
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
}
</style>