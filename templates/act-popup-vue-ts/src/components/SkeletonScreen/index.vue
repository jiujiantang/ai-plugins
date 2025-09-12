<script setup lang="ts">

</script>

<template>
  <div class="skeleton">
    <div class="skeleton-line"></div>
    <div class="skeleton-line"></div>
    <div class="skeleton-line short"></div>
  </div>
</template>

<style scoped lang="less">
.skeleton {
  padding: 20px;
}
.skeleton-line {
  height: 20px;
  margin-bottom: 10px;
  background-color: #eee;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}
.skeleton-line.short {
  width: 60%;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>