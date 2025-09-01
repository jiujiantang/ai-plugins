<script lang="ts" setup>
const text = "这是一段中等长度的文本内容，用于演示效果";
</script>
<template>
  <p class="test" style="max-width: 200px" v-ellipsis-title>{{ text }}</p>
</template>