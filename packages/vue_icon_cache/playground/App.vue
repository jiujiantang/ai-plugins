<template>
  <div id="app">
    <h1>Playground for My Plugin</h1>
  </div>
</template>

<script lang="ts" setup>
import {onMounted} from 'vue';
import { $icon } from "@";

onMounted(()=>{
  const res = $icon.getIcon("rightsIcon", "0", "https://3d66.oss-cn-hangzhou.aliyuncs.com/lyk4/vip_benefit/20250716/bd9f6a1bb55b3e271c54011ae903e887.png")
  console.log(res)
})
</script>