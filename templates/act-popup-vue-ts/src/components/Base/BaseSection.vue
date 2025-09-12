<template>
  <section class="wrap">
      <div class="inner">
        <!-- 标题 -->
        <div class="title">
          <span class="titleImg" :class="title"></span>
        </div>

        <!-- 插槽内容 -->
        <slot></slot>
      </div>
  </section>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  title: string
}>()
</script>

<style scoped lang="less">
@font: "Alibaba PuHuiTi 2.0", serif;
@content-width: 1600px;
@image-domain: "https://lykstatic.3d66.com/liuyunku/application/packages/year25/src/assets/img";
.wrap {
  margin-top: 128px;
  width: 1600px;
  height: auto;
  border-radius: 60px;
  background: linear-gradient(129deg, #F3766C 2%, #E9625D 39%, #F67D68 77%, #FD5D58 113%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  .inner {
    border-radius: 60px;
    position: relative;
    .title {
      width: 100%;
      height: 114px;
      position: absolute;
      top: -78px;
      display: flex;
      justify-content: center;
      z-index: 9;
      .titleImg {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center;
        &.lottery{
          background-image: url("@{image-domain}/1920/lotteryTitle.png");
        }
        &.exchange{
          background-image: url("@{image-domain}/1920/exchangeTitle.png");
        }
        &.rule{
          background-image: url("@{image-domain}/1920/ruleTitle.png");
        }
        &.lowPrice{
          background-image: url("@{image-domain}/1920/lowPriceTitle.png");
        }
      }
    }
  }
}
@media screen and (max-width: @content-width) {
  .wrap {
    width: 1300px;
    .inner {
      .title {
        .titleImg {
          &.lottery{
            background-image: url("@{image-domain}/1360/lotteryTitle.png");
          }
          &.exchange{
            background-image: url("@{image-domain}/1360/exchangeTitle.png");
          }
          &.rule{
            background-image: url("@{image-domain}/1360/ruleTitle.png");
          }
        }
      }
    }
  }
}
</style>
