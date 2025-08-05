<template>
  <div v-if="state.isVisible" class="toast">
    <p>{{ state.message }}</p>
  </div>
</template>

<script setup>
import {reactive} from "vue";

const state = reactive({
  isVisible: false, // 控制 Toast 是否显示
  message: '',      // 显示的消息内容
})

// 显示 Toast 消息的方法
const show = (message, duration = 3000) => {

  state.message = message;
  state.isVisible = true;

  // 设置定时器，控制 Toast 自动消失
  setTimeout(() => {
    state.isVisible = false;
  }, duration);
}

defineExpose({
  show
})

</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  opacity: 0.9;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}
</style>
