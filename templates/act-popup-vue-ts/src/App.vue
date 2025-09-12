<!-- 页面入口 -->
<template>
  <div class="app">
    <RechargePersonal />
  </div>
</template>

<script setup lang="ts">
import { useThemeProvider } from '@/components/Theme';
import { useImageDb } from '@/data/indexDB/imageDB';
import RechargePersonal from '@/pages/RechargePersonal.vue';
import {useGlobalProperties} from "@/data/useGlobalProperties";
import {useWindowBridgeProvider} from "win-bridge";

useWindowBridgeProvider()
useThemeProvider()
const {setImage} = useImageDb()

declare const __APP_Name__: string;
const {$imageDomain} = useGlobalProperties()
const urlToBlob = async (url: string) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.blob();
    }
  } catch (error) {
    console.error('Error loading image:', error);
  }
}
const bgImageArr = [{
  key: `${__APP_Name__}_bg_1`,// 66大会员
  url: `${$imageDomain}/bg1.png`
},{
  key: `${__APP_Name__}_bg_2`,// 素材会员
  url: `${$imageDomain}/bg2.png`
},{
  key: `${__APP_Name__}_bg_3`,// 渲染贵族
  url: `${$imageDomain}/bg3.png`
},{
  key: `${__APP_Name__}_bg_4`,// 全景VIP
  url: `${$imageDomain}/bg4.png`
},{
  key: `${__APP_Name__}_bg_5`,// AI会员
  url: `${$imageDomain}/bg5.png`
},{
  key: `${__APP_Name__}_bg_6`,// 自学贵族
  url: `${$imageDomain}/bg6.png`
}]
bgImageArr.map(async item => {
  const file = await urlToBlob(item.url);
  if(file) await setImage(item.key, file)
})
</script>

<style scoped lang="less">
</style>
