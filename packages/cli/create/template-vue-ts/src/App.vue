<!-- 页面入口 -->
<template>
  <div class="appContainer" @click="checkLogin">
<!--    <Debug />-->
    <!-- 头图 -->
    <header class="app-header"></header>
    <!-- 活动 -->
    <div class="app-content">
      <Lottery />
      <LowPrice />
      <Ad />
      <div id="exChange"></div>
      <Exchange />
      <Rule />
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue"
import { useLogin } from "@/uiux/useLogin";
import Debug from './components/Debug.vue';
import Lottery from "@/components/Lottery.vue";
import LowPrice from "@/components/LowPrice.vue";
import Ad from "@/components/Ad.vue";
import Exchange from "@/components/Exchange.vue";
import Rule from "@/components/Rule.vue";
import {useSc} from "@/uiux/useSc";
import Common from 'common'

const login = useLogin()
const { scTrack } = useSc()
const {useUrl} = Common
const {getQueryVariable} = useUrl()

onMounted(() => {
  scTrack("Lyk12zhounianqingExposure", {})

  // 导航
  if(getQueryVariable("hook") === "exChange"){
    const targetSection = document.getElementById('exChange');
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }

})

const checkLogin = () => {
  login.checkLogin()
}

</script>

<style scoped lang="less">
  @content-width: 1360px;
  @image-domain: "https://lykstatic.3d66.com/liuyunku/application/packages/year25/src/assets/img";
  .appContainer {
    height: 5853px;
    background: url("@{image-domain}/1920/bg.png") no-repeat;
    background-size: 100% 100%;
  }
  // 头图
  .app-header {
    width: 100%;
    height: 873px;
    background-image: url("@{image-domain}/1920/head.png");
    background-size: 1920px 873px;
    background-repeat: no-repeat;
    background-position: center top;
  }
  // 活动
  .app-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    //margin-top: -482px;
  }

  // 溜云库小屏
  @media screen and (max-width: @content-width) {
    .appContainer {
      height: 5796px;
      background: url("@{image-domain}/1360/bg.png") no-repeat;
    }
    .app-header{
      height: 874px;
      background-image: url("@{image-domain}/1360/head.png");
      background-size: 1360px 874px;
    }
    .app-content {
      //margin-top: -340px;
    }
  }

</style>
