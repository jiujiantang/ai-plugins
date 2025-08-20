<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
    <div class="loader" v-text="text"></div>
</template>

<style lang="less" scoped>
.loader {
  font-size: 14px;
  font-weight: 500;
  color: #4D4D4D;
  height: 42px;
  line-height: 42px;
  box-sizing: border-box;
  padding: 0 28px;
  background: #FFFFFF;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
</style>
