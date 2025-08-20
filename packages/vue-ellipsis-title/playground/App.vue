<script lang="ts" setup>
import {ref} from "vue";
const textRef = ref<string>("AI会员权益AI会员权益AI会员权益AI会员权益AI会员权益AI会员权益AI会员权益AI会员权益AI会员权益")
</script>
<template>
  <p class="test" v-ellipsis-title="textRef">{{ textRef }}</p>
</template>
<style lang="less" scoped>
.test {
  max-width: 100px;
  height: 36px;
}
</style>