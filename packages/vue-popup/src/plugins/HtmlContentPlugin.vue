<script setup lang="ts">
defineProps<{
  html: string
}>()
</script>

<template>
    <div v-html="html"></div>
</template>

<style scoped>
.popup-img {
    max-width: 100%;
    border-radius: 8px;
}
</style>
