<script lang="ts" setup>
</script>
<template>
  <button v-popup="{ type: 'html', content: `
    <img src='./assets/images/demo.png' alt=''>
    <p class='text'>您当前的会员权益包含：素材贵族、灵感PLUS会员 旧权益可为您抵扣：86.31元，欢迎升级~</p>`,
    close:()=>{console.log(1)} }">打开</button>
</template>
<style>
.text {
  width: 365px;
  height: 58px;
  font-family: "Alibaba PuHuiTi 2.0",serif;
  font-size: 16px;
  font-weight: bold;
  line-height: 34px;
  color: #4D4D4D;
}
</style>