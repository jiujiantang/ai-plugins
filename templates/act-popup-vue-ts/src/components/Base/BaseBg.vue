<template>
  <div class="bg-switcher" :style="containerStyle">
    <div ref="baseLayer" class="bg-layer base"></div>
    <div ref="overlayLayer" class="bg-layer overlay"></div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, defineProps } from 'vue';
import Common from 'common';
const { usePreloadImg } = Common;

const props = defineProps<{
  width: number;
  height: number;
  url: string;
}>();

const baseLayer = ref<HTMLElement>();
const overlayLayer = ref<HTMLElement>();

// 自动更新背景图（支持 props.url 动态变化）
watch(() => props.url, (newUrl) => {
  if (newUrl) updateBackground(newUrl);
}, { immediate: true });

const containerStyle = computed(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
}));

async function updateBackground(url: string) {

  // 设置 overlay 背景并淡入
  overlayLayer.value!.style.backgroundImage = `url('${url}')`;
  overlayLayer.value!.style.opacity = '1';

  // 过渡完成后替换 base 背景并隐藏 overlay
  setTimeout(() => {
    baseLayer.value!.style.backgroundImage = `url('${url}')`;
    setTimeout(()=>{
      overlayLayer.value!.style.opacity = '0';
      overlayLayer.value!.style.backgroundImage = '';
    },100)
  }, 500); // 与 transition 一致
}
</script>

<style lang="less" scoped>
.bg-switcher {
  position: relative;
  overflow: hidden;
}

.bg-layer {
  position: absolute;
  inset: 0; // 替代 top/left/right/bottom 全写
  background-size: 1030px 650px;
  background-position: -15px -10px;
  transition: opacity 0.6s ease;
  border-radius: 15px;
}

.base {
  z-index: 1;
}
.overlay {
  z-index: 2;
  opacity: 0;
}

.content {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  z-index: 9;
}
</style>

