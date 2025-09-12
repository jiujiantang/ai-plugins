<script setup lang="ts">
import { useSc } from "@/uiux/useSc";
import { useLyk } from "@/uiux/useLyk";
import { onMounted, reactive } from "vue";
import { eventBus } from "@/components/EventBus";
import { useTheme } from '@/components/Theme'
import Common from "common";
import { Page } from "@/data/adapter/pageData";
import * as _ from 'lodash';
import {useGlobalProperties} from "@/data/useGlobalProperties";
import {NAV_CATEGORY} from "@/buried/buried_config_all";
import {useWindowBridge} from "win-bridge";

const { theme, setTheme } = useTheme()
const {useUrl,usePreloadImg} = Common
const {getQueryVariable} = useUrl()
const props = defineProps<{side: Page["side"]}>()
const {$imageDomain} = useGlobalProperties()

const status = reactive({
  value: 0 as number,
});

// 使用 useSc 和 useLyk
const { scTrack } = useSc();
const lyk = useLyk();
const {callExternalMethod} = useWindowBridge()
const ElementClick = (params: string) => {
  callExternalMethod("ElementUserBehavior", params)
};

const componentName = 'Side';
onMounted(()=>{
  setTheme(getQueryVariable("nav_id") || 1)
  usePreloadImg(`${$imageDomain}/side1-act.png`)
  usePreloadImg(`${$imageDomain}/side2-act.png`)
  usePreloadImg(`${$imageDomain}/side3-act.png`)
  usePreloadImg(`${$imageDomain}/side4-act.png`)
  usePreloadImg(`${$imageDomain}/side5-act.png`)
  usePreloadImg(`${$imageDomain}/side6-act.png`)

  const handleFilter = (component: string, params: any) => {
    if(component === "Init"){
      status.value = params.nav_id;
    }else {
      return { nav_id: status.value };
    }
  }
  eventBus.subscribeFilter(componentName,handleFilter)
})
const changeNavId = (key: number) => {
  setTheme(key);// 主题切换
  const params = { nav_id: key };
  eventBus.publishFilter(componentName, params);
}
const DebounceChangeNavId = _.debounce((key: number)=>{
  changeNavId(key)
},600)
const handleClick = (key: number) => {
  ElementClick(NAV_CATEGORY[key])
  status.value = key;
  DebounceChangeNavId(key)
}

</script>
<template>
  <ul>
    <li v-for="(item, index) in props.side" :key="item.key" @click="handleClick(item.key)" :class="{active: item.key === status.value}">
      {{ item.name }}
    </li>
  </ul>
<!--  <p class="more">更多特权敬请期待...</p>-->
</template>
<style scoped lang="less">
ul {
  width: 100%;
  height: 100%;
  margin: 0;
  list-style: none; /* 去掉默认的列表样式 */
  padding: 36px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

li {
  font-family: 'Alibaba PuHuiTi 2.0 65',serif;
  transition: background-color 0.3s ease;
  cursor: pointer;
  width: 128px;
  height: 40px;
  border-radius: 6px;

  font-size: 14px;
  font-weight: 500;
  line-height: 40px;
  color: #4D4D4D;

  background-repeat: no-repeat;
  background-position: 15px center;
  background-size: 32px 32px;

  padding-left: 53px;
  text-align: left;
  &:hover {
    background-color: #F5F6F8;
  }

  &:nth-child(1){
    background-image: url("@{image-domain}/side1.png");
    &.active {
      background-color: #F5F6F8;
      background-image: url("@{image-domain}/side1-act.png");
    }
  }
  &:nth-child(2){
    background-image: url("@{image-domain}/side2.png");
    &.active {
      background-color: #F5F6F8;
      background-image: url("@{image-domain}/side2-act.png");
    }
  }
  &:nth-child(3){
    background-image: url("@{image-domain}/side3.png");
    &.active {
      background-color: #F5F6F8;
      background-image: url("@{image-domain}/side3-act.png");
    }
  }
  &:nth-child(4){
    background-image: url("@{image-domain}/side4.png");
    &.active {
      background-color: #F5F6F8;
      background-image: url("@{image-domain}/side4-act.png");
    }
  }
  &:nth-child(5){
    background-image: url("@{image-domain}/side5.png");
    &.active {
      background-color: #F5F6F8;
      background-image: url("@{image-domain}/side5-act.png");
    }
  }
  &:nth-child(6){
    background-image: url("@{image-domain}/side6.png");
    &.active {
      background-color: #F5F6F8;
      background-image: url("@{image-domain}/side6-act.png");
    }
  }
}
.more {
  position: absolute;
  left: 50%;
  margin-left: -53px ;
  bottom: 20px;
  width: 106px;
  height: 17px;
  font-size: 12px;
  font-weight: 500;
  line-height: 17px;
  color: #999999;
}
</style>
