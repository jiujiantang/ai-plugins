<template>
  <BaseSection title="rule">
    <div class="bg">
      <p class="line1">活动详情<span>活动时间：2025年06月06日-07月07日</span></p>
      <p class="line-t">【抽千元大奖】</p>
      <p class="line">活动期内，用户每日下载付费素材&提交渲染任务所消耗币种每累计100个，即可兑换抽奖券获取一次抽奖机会，次日清理消耗币记录；</p>
      <p class="line">活动期内，充值下载、渲染、动画币300元以上即可获得1888奖池抽奖对应次数，开通全站VIP&贵族年卡可获得1888奖池1次抽奖机会；</p>
      <p class="line">抽取到实物奖品后，请及时填写收件信息，我们将在活动结束后15个工作日内安排奖品寄送发放；</p>
      <p class="line-t">【低价套包限量购】</p>
      <p class="line">活动期间内，每天02:00-16:00限量购买，每样商品每位用户每日仅可购买一次；</p>
      <p class="line-t">【提现币兑好礼】</p>
      <p class="line">提现币兑好礼为溜云库为创作者用户提供的兑换福利活动，账户内有提现币的用户均可兑换，兑换后将不可撤销、退还，请确认无误后兑换；</p>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import {useSc} from "@/uiux/useSc";
import {useLyk} from "@/uiux/useLyk";
import BaseSection from './Base/BaseSection.vue'

const { scTrack } = useSc()
const lyk = useLyk()

</script>

<style scoped lang="less">
@font: "Alibaba PuHuiTi 2.0", serif;
@content-width: 1600px;
.bg{
  width: 1576px;
  height: 556px;
  border-radius: 60px;
  background: #ffffff;
  overflow: hidden;
  padding: 115px 48px 106px;
  .line1 {
    font-family: @font;
    font-size: 20px;
    color: #333333;
    span {
      display: inline-block;
      height: 26px;
      line-height: 26px;
      border-radius: 4px;
      margin-left: 10px;
      padding: 0 12px;
      background: rgba(140, 163, 243, 0.2);

      font-size: 14px;
      font-weight: 500;
      color: #5559FF;
    }
  }
  .line-t{
    font-family: @font;
    font-size: 18px;
    font-weight: 500;
    color: #E74479;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .line{
    font-family: @font;
    font-size: 16px;
    font-weight: normal;
    line-height: 30px;
    height: 30px;
    width: 100%;
    color: #666666;
    position: relative;
    margin-left: 12px;
    &:before{
      content: "";
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #666666;
      position: absolute;
      left: -12px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
@media screen and (max-width: @content-width) {
  .bg {
    width: 1276px;
    height: 556px;
  }
}
</style>