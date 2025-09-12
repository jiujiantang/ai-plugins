<script setup lang="ts">
import { useSc } from "@/uiux/useSc";
import { useLyk } from "@/uiux/useLyk";
import {reactive, onMounted, ref} from "vue";
import { eventBus } from "@/components/EventBus";
import { Page } from "@/data/adapter/pageData";
import * as _ from 'lodash';
import {useGlobalProperties} from "@/data/useGlobalProperties";
import {NAV_CATEGORY_CHILD} from "@/buried/buried_config_all";
import {useWindowBridge} from "win-bridge";

const {$imageDomain} = useGlobalProperties()
const props = defineProps<{tab: Page["side"][number]["tab"], side: Page["side"]}>()
const propsRef = ref(props)

// 使用 reactive 初始化状态
const status = reactive({
  value: 0 as number,
  tab: [] as Page["side"][number]["tab"],
});

// 使用 useSc 和 useLyk
const { scTrack } = useSc();
const lyk = useLyk();
const componentName = 'Tab';
const {callExternalMethod} = useWindowBridge()
const ElementClick = (params: string) => {
  callExternalMethod("ElementUserBehavior", params)
};

const changeProductId = (key: number) => {
  eventBus.publishFilter(componentName, { product_id: key });  // 发布参数收集事件
}
const DebounceChangeProductId = _.debounce(changeProductId,200) // 提高响应速度
const handleClick = (key: number) => {
  if(NAV_CATEGORY_CHILD[key]){
    ElementClick(NAV_CATEGORY_CHILD[key])
  }
  status.value = key;
  DebounceChangeProductId(key)
}
const getBgStyle = (key: number) => {
  if (key === status.value) return {};
  if (key === 8 || key === 9) return { backgroundColor: '#463937' }; // 素材会员
  if (key === 5 || key === 6) return { backgroundColor: '#21273A' }; // 全景VIP
  return {};
};

onMounted(()=>{
  const handleFilter = (component: string, params: any) => {
    const _side = propsRef.value.side.find(item => item.key === params.nav_id)
    status.tab = _side?.tab || []

    if(component === "Init"){
      status.value = params.product_id
    }else if(component === "Side"){
      status.value = _side && _side['tab'] ? _side.key === 2 ? _side["tab"][1]?.key : _side["tab"][0]?.key : 0
      return { product_id: status.value }
    }else{
      return { product_id: status.value }
    }
  }
  eventBus.subscribeFilter(componentName,handleFilter)
})
</script>

<template>
  <!-- SVG 裁剪路径定义 - 灰色按钮 -->
  <svg xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="clip-shape" clipPathUnits="userSpaceOnUse">
        <path d="M0,20L0,59L335,59L290.991,7.06957C287.191,2.58549,281.611,0,275.733,0L20,0C8.95431,0,0,8.95431,0,20Z" />
      </clipPath>
    </defs>
  </svg>
  <!-- SVG 裁剪路径定义 - 白色按钮 -->
  <svg xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="clip-polygon" clipPathUnits="userSpaceOnUse">
        <path d="M 71,0 L 70,1 L 69,1 L 68,2 L 67,2 L 66,3 L 65,3 L 61,7 L 60,7 L 55,12 L 55,13 L 52,16 L 52,17 L 50,19 L 50,20 L 48,22 L 48,23 L 46,25 L 46,26 L 45,27 L 45,28 L 43,30 L 43,31 L 41,33 L 41,34 L 39,36 L 39,37 L 37,39 L 37,40 L 27,50 L 26,50 L 24,52 L 23,52 L 21,54 L 20,54 L 19,55 L 18,55 L 17,56 L 16,56 L 15,57 L 14,57 L 13,58 L 10,58 L 9,59 L 7,59 L 6,60 L 0,60 L 334,60 L 329,60 L 328,59 L 326,59 L 325,58 L 323,58 L 322,57 L 321,57 L 320,56 L 319,56 L 318,55 L 317,55 L 316,54 L 315,54 L 314,53 L 313,53 L 310,50 L 309,50 L 297,38 L 297,37 L 294,34 L 294,33 L 291,30 L 291,29 L 289,27 L 289,26 L 286,23 L 286,22 L 284,20 L 284,19 L 282,17 L 282,16 L 280,14 L 280,13 L 278,11 L 278,10 L 275,7 L 275,6 L 271,2 L 270,2 L 269,1 L 268,1 L 267,0 Z"/>
      </clipPath>
    </defs>
  </svg>

  <ul>
    <li
      v-for="item in status.tab"
      :key="item.key"
      @click="handleClick(item.key)"
      :class="{
        active: item.key === status.value,
        mask: item.key !== status.value
      }"
      :style="getBgStyle(item.key)"
    >
      <div class="inner" :class="{mask: item.key !== status.value}">
        <p>{{ item.name }}</p>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="less">
@active-bg: url("@{image-domain}/tab-act.png") no-repeat;

ul {
  position: relative;
  width: 554px;
  height: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: hidden;
  li {
    width: 335px;
    height: 59px;
    line-height: 59px;
    border-radius: 4px;
    cursor: pointer;
    bottom: -6px;
    position: absolute;

    &.mask {
      clip-path: url(#clip-shape); // 裁剪形状
    }

    &.active{
      width: 335px;
      height: 61px;
      clip-path: url(#clip-polygon); // 裁剪形状
      overflow: hidden;

      line-height: 61px;
      background: @active-bg;
      background-size: 334px 61px;
      bottom: -2px;
      z-index: 9;
      p {
        font-size: 24px;
        padding: 0 !important;
        color: #4D4D4D;
      }
    }
    p {
      font-size: 18px;
      color: #ffffff;
      //color: #4D4D4D;
      font-family: "DingTalk JinBuTi",serif;
      text-align: center;
      position: absolute;
      z-index: 99;
      width: 100%;
    }
    &:nth-child(1){
      left: 0;
      p {
        padding-right: 50px;
      }
    }
    &:nth-child(2){
      right: 0;
      p {
        padding-left: 50px;
      }
    }

    .inner {
      width: 335px;
      height: 59px;
      &.mask {
        clip-path: url(#clip-shape);// 裁剪形状
        background: rgba(255, 255, 255, 0.5);
        position: relative;
        &:hover {
          background: rgba(255, 255, 255, 0.6);
        }
        &::after {
          content: "";
          width: 335px;
          height: 59px;
          position: absolute;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          clip-path: url(#clip-shape);// 裁剪形状
          top: 0;
          left: 0;
        }
      }
    }
  }
}

svg {
  position: absolute;
  width: 0;
  height: 0;
}
</style>
