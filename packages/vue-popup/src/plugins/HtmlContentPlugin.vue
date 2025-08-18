<script setup lang="ts">
defineProps<{
  html: string
}>()
</script>

<template>
    <img v-if="image" :src="image" class="popup-img" alt=""/>
    <div v-html="html"></div>
</template>

<style scoped>
.popup-img {
    max-width: 100%;
    border-radius: 8px;
}
</style>
