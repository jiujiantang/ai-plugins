<template>
  <div class="grid-container" :style="gridStyle">
    <div v-for="(card, index) in cards" :key="index" class="grid-item">
      <slot :card="card" :index="index"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

interface Props {
  rows: number;
  cols: number;
  cards: any[];
}

const props = defineProps<Props>();

const gridStyle = computed(() => ({
  display: 'grid',
  gridTemplateRows: `repeat(${props.rows}, 1fr)`,
  gridTemplateColumns: `repeat(${props.cols}, 1fr)`,
}));
</script>

<style lang="less" scoped>
@content-width: 1600px;
.grid-container {
  width: 100%; /* Feel free to adjust or make this a prop */
  height: 100%; /* Feel free to adjust or make this a prop */
  row-gap: 90px; // 设置行间距
  column-gap: 68px; // 设置列间距
}
@media screen and (max-width: @content-width) {
  .grid-container {
    row-gap: 90px; // 设置行间距
    column-gap: 0; // 设置列间距
  }
}

</style>
