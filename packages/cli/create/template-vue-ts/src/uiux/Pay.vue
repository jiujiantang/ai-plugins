<style scoped lang="less">
.pop {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .mask {
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.6;
    display: block;
  }
}
.pop_pay {
  width: 610px;
  height: 680px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url("https://lykstatic.3d66.com/liuyunku/application/packages/year25/src/assets/img/PayBg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.pop_pay #_close {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 26px;
  right: 32px;
  cursor: pointer;
}
.pop_pay .title {
  font-size: 36px;
  font-weight: 500;
  color: #7C2619;
  width: 100%;
  height: 45px;
  margin-top: 53px;
  text-align: center;
  line-height: 45px;
}
.pop_pay .ref {
  width: 152px;
  height: 152px;
  margin: 114px auto 0;
  position: relative;
}
.pop_pay .ref .past {
  width: 100%;
  height: 152px;
  position: absolute;
  z-index: 9;
  text-align: center;
  line-height: 152px;
  font-size: 14px;
  color: #fff;
  background: black;
  opacity: 0.8;
  display: none;
}
.pop_pay .qrcode {
  width: 152px;
  height: 152px;
  position: absolute;
  top: 0;
  left: 0;
}
.pop_pay .form-paypal-submit {
  width: 291px;
  height: 49px;
  border-radius: 264px;
  opacity: 1;
  background: linear-gradient(90deg, #EA6DC2 -4%, #FA7459 106%);
  border: 1px solid #FFC0C0;
  box-shadow: inset 0 4px 10px 0 rgba(255, 255, 255, 0.6);
  text-align: center;
  line-height: 49px;
  font-size: 18px;
  font-weight: bold;
  color: #FFFFFF;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.pop_pay .form-paypal-submit:hover{
  background: linear-gradient(90deg, #FC275F 0%, #FF4429 100%) !important;
  box-shadow: inset 0 0.02083rem 0.05208rem 0 rgba(255, 255, 255, 0.8) !important;
}
.pop_pay .price {
  font-size: 42px;
  font-weight: bold;
  line-height: 46px;
  letter-spacing: 0.1em;
  color: #E74479;
  text-align: center;
  width: 100%;
  height: 46px;
  margin-top: 20px;
}
.pop_pay .price span {
  font-size: 24px;
}
.pop_pay .priceTips {
  margin-top: 20px;
  width: 100%;
  text-align: center;
  font-family: "Alibaba PuHuiTi",serif;
  font-size: 24px;
  font-weight: 500;
  color: #999999;
}
.pop_pay .priceTips span {
  color: #E74479;
}
.pop_pay .desc {
  font-size: 24px;
  font-weight: 500;
  color: #999999;
  width: 100%;
  height: 24px;
  line-height: 24px;
  text-align: center;
  margin-top: 20px;
}
.pop_pay .desc span {
  color: #FE275F;
}
.pop_pay .payBtn {
  width: 546px;
  height: 76px;
  border-radius: 20px;
  background: #F0F0F0;
  gap: 16px;
  margin: 40px auto 0 auto;
  padding: 12px 16px;
  display: flex;
  text-align: center;
}
.pop_pay .payBtn li {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% auto;
  height: 52px;
}
.pop_pay .payBtn li[data-type="100"] {
  width: 217px;
  background-image: url("https://lykstatic.3d66.com/liuyunku/application/packages/year25/src/assets/img/one.png?v=2");
}
.pop_pay .payBtn li[data-type="100"].active {
  background-image: url("https://lykstatic.3d66.com/liuyunku/application/packages/year25/src/assets/img/one_act.png?v=2") !important;
}
.pop_pay .payBtn li[data-type="1"] {
  width: 149px;
  background-image: url("https://lykstatic.3d66.com/liuyunku/application/packages/year25/src/assets/img/two.png?v=2");
}
.pop_pay .payBtn li[data-type="1"].active {
  background-image: url("https://lykstatic.3d66.com/liuyunku/application/packages/year25/src/assets/img/two_act.png?v=2") !important;
}
.pop_pay .payBtn li[data-type="2"] {
  width: 169px;
  background-image: url("https://lykstatic.3d66.com/liuyunku/application/packages/year25/src/assets/img/four.png?v=2");
}
.pop_pay .payBtn li[data-type="2"].active {
  background-image: url("https://lykstatic.3d66.com/liuyunku/application/packages/year25/src/assets/img/four_act.png?v=2") !important;
}
.pop_pay .payBtn li[data-type="3"] {
  width: 164px;
  background-image: url("https://lykstatic.3d66.com/liuyunku/application/packages/year25/src/assets/img/three.png?v=2");
}
.pop_pay .payBtn li[data-type="3"].active {
  background-image: url("https://lykstatic.3d66.com/liuyunku/application/packages/year25/src/assets/img/three_act.png?v=2") !important;
}
.pop_pay .paypalSubmit {
  display: none;
}
</style>
<template>
  <div v-if="state.isShow" class="pop" id="_pop">
    <div class="mask" @click="close()"></div>
    <div class="pop_pay">
      <div id="_close" @click="close()"></div>
      <h1 class="title"></h1>
      <div class="ref">
        <div v-if="activePayType !== 3" class="qrcode btn active" id="_qrcode"></div>
        <div v-if="activePayType === 3"  class="form-paypal-submit btn" id="_form-paypal-submit" data-id="nineGif" @click="paypalSubmit()">GO to pay for it</div>
        <div class="paypalSubmit" id="_paypalSubmit"></div>
        <div class="past">二维码已过期</div>
      </div>
      <p class="price"><span>{{activePayType === 3 ? '$' : '￥'}}</span>{{activePayType === 3 ? resData?.package_dollar : resData?.package_rmb}}</p>
      <p class="priceTips">
        <slot></slot>
      </p>
      <ul class="payBtn" id="_payBtn" :style="{width: state.payTypeList.length === 3 ? '546px' : '429px'}">
        <li v-for="(payType, index) in state.payTypeList" :key="payType.pay_type" :data-type="payType.pay_type" :class="{active: activePayType === payType.pay_type}" @click="checkPayType(payType.pay_type, payType.cz_type)"></li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts" >
import axios from "axios";
import {nextTick, reactive, ref, defineExpose, defineProps} from "vue";
import Common from 'common'

const {useUrl} = Common
const {getServiceUrl} = useUrl()

enum Status {
  SUCCESS = 1,
}
interface payType {
  cz_type: number,
  pay_type: number,
  pay_name: string,
  is_current: number,
}
interface resDataType {
  package_id: number,
  package_rmb: number,
  package_dollar: number,
  package_total?: number,
  package_coin_unit?: number,
  package_value?: number,
  give_value?: number,
  pay_type_list: payType[],
  order_type: number,
  cz_entrance?: number,
  cz_source?: number,
  activity_id?: number
}

const state = reactive<{payTypeList: payType[], isShow: boolean}>({
  payTypeList: [],
  isShow: false
})
const activePayType = ref(100)
const activeCzType = ref(0)
const resData = ref<resDataType|null>(null)
const payParams = ref<payParamsType|null>(null)

const close = () => {
  state.isShow = false
}

const buy = async (product_id: number, cb: ()=>void) =>  {

  if(!window._lib_pay?.clearTabCheckPay) {
    console.error(".env中未配置支付功能")
    return
  }

  const { data: {status, data, msg} } = await axios.get(getServiceUrl(`/api/v1/lyk/twelve_anniversary_purchase_limit_activity/getPayInfo?product_id=${product_id}`), {}, {
    withCredentials: true, // 确保请求中携带 cookies
  })

  if(status === Status.SUCCESS) {
    // 默认支付二维码
    // 1-1. 接口返回参数
    const {package_id, package_rmb, package_dollar, pay_type_list, package_total} = data
    const {order_type, cz_entrance, cz_source, activity_id} = data.base_pay_info
    resData.value= {
      package_id,
      package_rmb,
      package_dollar,
      pay_type_list,
      order_type,
      cz_entrance,
      cz_source,
      activity_id,
      package_total
    }

    // 1-2 渲染支付按钮
    state.payTypeList = pay_type_list
    const currentPayType = pay_type_list.filter((item: payType) => item.is_current === 1);
    if(currentPayType.length > 0){
      activePayType.value = currentPayType[0].pay_type
      activeCzType.value = currentPayType[0].cz_type
    }

    // 1-3. 支付参数
    payParams.value = {
      package_id: package_id || 0,
      coupon_id: 0,
      activity_id: activity_id,
      cz_type: activeCzType.value || 0,
      order_type: order_type || 0,
      cz_source: cz_source || 0,
      entrance: cz_entrance || 0,
      plan_id: 0,
      benefits: '0',
      vip_type: '1',
      qrcode_size:"152",
      lyk_version :'4.0',
      is_union: activePayType.value === 100 ? 1 : 0 ,
      payvisit_source: 0,
    };

    // 获取二维码
    await nextTick(() => {
      window._lib_pay.paymentFcun(payParams.value, () => {
        state.isShow = false
        cb()
        layer.msg("支付成功")
      });
    })

    // 2. 支付弹窗信息回显
    state.isShow = true

  }else if(status === 106602004 || status === 106602005 || status === 106602008){
    cb()
  }else{
    layer.msg(msg)
  }
}

const checkPayType = async (dataType: number, cz_type: number) => {
  window._lib_pay.clearTabCheckPay()

  // 1. 构建参数
  if (payParams.value) {
    if (payParams.value.cz_type !== undefined) {
      payParams.value.cz_type = dataType === 100 ? 0 : (cz_type || 0);
    }
    if (payParams.value.is_union !== undefined) {
      payParams.value.is_union = dataType === 100 ? 1 : 0;
    }
  }
  activePayType.value = dataType
  activeCzType.value = cz_type

  // 2. 回显支付链接，检查支付状态
  if(payParams.value?.package_id && payParams.value?.package_id > 0){
    if(dataType !== 3){
      await nextTick(() => {
        window._lib_pay.paymentFcun(payParams.value, () => {
          state.isShow = false
          layer.msg("支付成功")
        });
      })
    }
  }
}

const paypalSubmit = async () => {
  await nextTick(() => {
    window._lib_pay.paymentFcun(payParams.value, () => {
      state.isShow = false
      layer.msg("支付成功")
    });
  })
}

defineExpose({
  buy
})
</script>
