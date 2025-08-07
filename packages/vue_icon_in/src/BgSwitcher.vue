<script setup lang="ts">
import { ref, watch, computed, defineProps } from 'vue';

const props = defineProps<{
  url: string;
  width?: number;
  height?: number;
}>();
const baseLayer = ref<HTMLElement>();
const overlayLayer = ref<HTMLElement>();

watch(() => props.url, (newUrl) => {
  if (newUrl) updateBackground(newUrl);
}, { immediate: true });

const containerStyle = computed(() => ({
  width: `${props.width ? props.width+"px" : "100%"}`,
  height: `${props.height ? props.height+"px" : "100%"}`,
}));

function updateBackground(url: string) {
  if (!overlayLayer.value || !baseLayer.value) return;

  overlayLayer.value.style.backgroundImage = `url('${url}')`;
  overlayLayer.value.style.opacity = '1';

  setTimeout(() => {
    baseLayer.value!.style.backgroundImage = `url('${url}')`;
    setTimeout(() => {
      overlayLayer.value!.style.opacity = '0';
      overlayLayer.value!.style.backgroundImage = '';
    }, 100);
  }, 500);
}
</script>
<template>
  <div class="bg-switcher" :style="containerStyle">
    <div class="bg-layer base" ref="baseLayer"></div>
    <div class="bg-layer overlay" ref="overlayLayer"></div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped lang="less">
.bg-switcher {
  position: relative;
  overflow: hidden;
  .bg-layer {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
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
}
.content {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  z-index: 9;
}
</style>