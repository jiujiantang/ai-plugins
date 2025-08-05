<template>
  <div class="storage-quota">
    <p>
      📦 IndexDB使用存储：
      <strong>{{ usageMB.toFixed(1) }} MB</strong> /
      <strong>{{ quotaMB.toFixed(0) }} MB</strong>
      （{{ percent.toFixed(2) }}%）
    </p>
    <div class="bar-container">
      <div
        class="bar-fill"
        :style="{
          width: percent + '%',
          backgroundColor: barColor
        }"
      ></div>
    </div>
  </div>
  <div class="op">
    <input type="file" @change="onFileChange" />
    <button @click="loadImage">Load Image from IndexedDB</button>
    <img v-if="imageSrc" :src="imageSrc" alt="Loaded Image" />
  </div>
</template>

<script lang="ts" setup>
import { imageDB } from "@";
import { ref, computed, onMounted } from 'vue';

const usage = ref(0);
const quota = ref(1); // 防止除以 0
const usageMB = computed(() => usage.value / (1024 * 1024));
const quotaMB = computed(() => quota.value / (1024 * 1024));
const percent = computed(() => (usage.value / quota.value) * 100);
const barColor = computed(() => {
  if (percent.value < 50) return '#4caf50'; // green
  if (percent.value < 80) return '#ff9800'; // orange
  return '#f44336'; // red
});

const imageSrc = ref<string|null>(null);
const onFileChange = async (event: Event) => {
  const file = (event.target as HTMLInputElement)?.files?.[0];
  if (file) {
    await $imageDB.setImage('my-image', file);
  }
}
const urlToBlob = async (url: string) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.blob();
    }
  } catch (error) {
    console.error('Error loading image:', error);
  }
}
const setImage = async () => {
  const bgArr = ["./assets/images/bg0.png","./assets/images/bg1.png","./assets/images/bg2.png","./assets/images/bg3.png","./assets/images/bg4.png","./assets/images/bg5.png"]
  bgArr.map(async (item, index) => {
    const file = await urlToBlob(item);
    if(file){
      await $imageDB.setImage(index, file);
    }
  })
}
const loadImage = async () => {
  const blob = await $imageDB.getImage(0);
  if (blob) {
    imageSrc.value = URL.createObjectURL(blob);
  } else {
    console.error('No image found in IndexedDB.');
  }
}

declare const __APP_VERSION__: string;
let $imageDB
onMounted(async () => {
  $imageDB = await imageDB(__APP_VERSION__);
  console.log("DB版本号：", $imageDB.version, $imageDB.oldVersion);
  await setImage()

  if (navigator.storage && navigator.storage.estimate) {
    const estimate = await navigator.storage.estimate();
    usage.value = estimate.usage || 0;
    quota.value = estimate.quota || 1;
  }
});
</script>

<style scoped>
.op {
  display: flex;
  flex-direction: column;
}
.op button {
  max-width: 200px;
}

.storage-quota {
  font-family: system-ui, sans-serif;
  max-width: 600px;
  padding: 8px;
}

.bar-container {
  width: 100%;
  height: 16px;
  border-radius: 8px;
  background-color: #eee;
  overflow: hidden;
  margin-top: 4px;
}

.bar-fill {
  height: 100%;
  transition: width 0.3s ease;
}
</style>