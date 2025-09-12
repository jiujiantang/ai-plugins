<script setup lang="ts">
import { useSc } from "@/uiux/useSc";
import { useLyk } from "@/uiux/useLyk";
import { Package } from "@/data/adapter/packageData";
import BgSwitcher from "vue-icon-in";
import {useWindowBridge} from "win-bridge";
import {CATEGORY_OPERATE_ATTR} from "@/buried/buried_config_all";

const {callExternalMethod} = useWindowBridge()
const ElementClick = (params: string) => {
  callExternalMethod("ElementUserBehavior", params)
};
const props = defineProps<{
  id: number;
  name: string;
  rights: Package["rights"];
  more_benefits_url: string;
  rowGap: string;
}>();

// 使用 useSc 和 useLyk
const { scTrack } = useSc();
const lyk = useLyk();

const handleMoreRights = () => {
  ElementClick(CATEGORY_OPERATE_ATTR[props.id]["more_benefit"]);
  callExternalMethod("MoreRights", props.more_benefits_url)
}
</script>
<template>
  <div class="right-header">
    <p class="name">{{props.name}}权益</p>
    <button v-if="!!more_benefits_url" class="jump" @click="handleMoreRights">更多权益>></button>
  </div>
  <ul :style="{rowGap}">
    <li
      v-for="(item, index) in props.rights"
      :key="index"
    >
      <div class="rightIcon">
        <BgSwitcher :url="item.benefit_icon" />
      </div>
      <span class="describe">
        <p :class="{lykIcon: item.is_lyk_unique}" ><span class="ellipsis" v-ellipsis-title>{{ item.name }}</span></p>
        <p class="ellipsis" v-if="item.sub.length>0" v-ellipsis-title>{{ item.sub }}</p>
      </span>
    </li>
  </ul>
</template>
<style scoped lang="less">
.right-header {
  width: 100%;
  height: 22px;
  line-height: 22px;
  padding: 0 20px;
  margin-bottom: 20px;
  .name {
    font-family: 'Alibaba PuHuiTi 2.0 65',serif;
    display: inline-block;
    height: 100%;
    font-size: 16px;
    font-weight: 500;
    color: #4D4D44;
    float: left;
  }
  .jump {
    display: inline-block;
    height: 100%;
    font-size: 14px;
    font-weight: 500;
    line-height: normal;
    color: #999999;
    float: right;
    background: none;
    padding: 0;
    margin: 0;
    text-align: right;
    cursor: pointer;
    &:hover {
      color: #666666;
    }
  }
}
ul {
  width: 100%;
  padding: 0 20px;
  margin: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 3 equal columns */
  row-gap: 32px;
  column-gap: 10px;
}
li {
  border-radius: 4px;
  height: 40px;
  padding-left: 46px;
  position: relative;
  .rightIcon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 2px;
    img {
      width: 100%;
      height: auto;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .describe {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: default;
    p {
      max-width: 122px;
      text-align: left;
      line-height: 20px;
      position: relative;
      &.lykIcon::after {
        content: '';
        position: absolute;
        left: 46%;
        top: -14px;
        width: 58px;
        height: 16px;
        background: url("@{image-domain}/lykIcon.png") no-repeat;
      }
    }
    p:nth-child(1) {
      font-family: 'Alibaba PuHuiTi 2.0 65',serif;
      font-size: 14px;
      font-weight: 500;
      color: #4D4D4D;
    }
    p:nth-child(2) {
      font-size: 14px;
      font-weight: 500;
      color: #999999;
    }
    p:last-child {
      margin-top: 3px;
    }
  }
}
</style>
