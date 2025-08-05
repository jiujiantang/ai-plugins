<script setup>

import {reactive} from "vue";

const [lykFns] = defineProps({
  lykFns: {
    type: Array,
    required: true,
    default: []
  }
})

</script>

<template>
<template v-for="(item, index) in json.skin.awardsList" :key="item.id">

</template>
</template>

<style scoped lang="scss">

</style>