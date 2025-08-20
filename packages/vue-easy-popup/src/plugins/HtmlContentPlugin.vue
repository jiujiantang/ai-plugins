<script setup lang="ts">
defineProps<{
  html: string
}>()
</script>

<template>
    <div v-html="html"></div>
</template>

<style scoped></style>
