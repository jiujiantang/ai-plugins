<template>
  <section class="ad" @click="handleAd">
  </section>
</template>

<script setup lang="ts">
import {useSc} from "@/uiux/useSc";
import {useLyk} from "@/uiux/useLyk";

const { scTrack } = useSc()
const lyk = useLyk()

const handleAd = () => {
  scTrack("Lyk12zhounianqingClick", {"zhounianqing_click_section": [12, 'number']})
  lyk.withLyk('lykOperation', 'lyk4://OpenCharge|{"type":0,"page":0,"activate_source":0}')
}

</script>

<style scoped lang="less">
@font: "Alibaba PuHuiTi 2.0", serif;
@content-width: 1600px;
@image-domain: "https://lykstatic.3d66.com/liuyunku/application/packages/year25/src/assets/img";
.ad{
  margin-top: 40px;
  width: 1600px;
  height: 240px;
  background-image: url("@{image-domain}/1920/ad.png");
  background-repeat: no-repeat;
  background-size: 1600px 993px;
  background-position: 0 -376px;
  cursor: pointer;
}
@media screen and (max-width: @content-width) {
  .ad {
    width: 1376px;
    height: 240px;
    background-image: url("@{image-domain}/1360/ad.png");
    background-size: 1376px 993px;
    background-position: 0 -376px;
  }
}
</style>