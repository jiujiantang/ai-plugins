<script setup>
import {reactive, defineProps} from "vue"

const props = defineProps({
  top: "0px",
  left: "0px",
  width: "100px",
  message: ""
})



</script>

<template>
  <div class="wrap">
    <slot></slot>
    <span class="bubble" :style="{top: props.top, left: props.left, width: props.width}"  v-html="props.message"></span>
  </div>
</template>

<style scoped lang="less">
.wrap{
  cursor: pointer;
  position: relative;
  &:hover{
    .bubble {
      display: inline-block;
    }
  }
}
.bubble {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 10px;
  border-radius: 16px 16px 16px 0;
  background: rgba(0, 0, 0, 0.8);
  font-size: 12px;
  letter-spacing: 0.1em;
  color: #FFE8D2;
  text-align: left;
  display: none;
}
</style>