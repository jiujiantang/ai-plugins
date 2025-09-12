<style scoped lang="less">
.pop {
  width: 185px;
  height: 190px;
  margin: 47px auto 0 auto;
  position: relative;
  background-color: #fff;
  border-radius: 0 0 8px 8px;
}
.pop_pay {
  width: 100%;
  height: 100%;
}
.pop_pay .ref {
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: relative;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 0 1px 1px 1px;
  border-style: solid;
  border-color: #E5E5E5;
  border-radius: 0 0 8px 8px;
}
.pop_pay .ref .past {
  width: 120px;
  height: 120px;
  position: absolute;
  z-index: 9;
  text-align: center;
  line-height: 120px;
  font-size: 14px;
  color: #fff;
  background: black;
  opacity: 0.8;
  display: none;
}
.pop_pay .ref .past.loading {
  background: url("@{image-domain}/loading.png") no-repeat center;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.pop_pay .qrcode {
  width: 140px;
  height: 140px;
  padding: 10px;
  background: #FFFFFF url("@{image-domain}/maKuang.png") no-repeat center center ;
}
.pop_pay .form-paypal-submit {
  width: 157px;
  height: 41px;
  border-radius: 10px;
  opacity: 1;
  background: conic-gradient(from 180deg at 50% 50%, #41392C -217deg, #4F4C47 142deg, #41392C 143deg, #4F4C47 502deg);
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "Alibaba PuHuiTi 2.0",serif;
  font-size: 18px;
  font-weight: bold;
  line-height: 41px;
  color: #FFFFFF;
  cursor: pointer;
}
.pop_pay .form-paypal-submit:hover{
  background: conic-gradient(from 180deg at 50% 50%, #41392C -217deg, #6A6660 142deg, #41392C 143deg, #6A6660 502deg) !important;
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
  width: 100%;
  height: 22px;
  border-radius: 8px 8px 0 0;
  background: #F5F6F8;
  display: flex;
  text-align: center;
  justify-content: center;
  list-style: none;
  position: absolute;
  top: -22px;
  border-width: 1px 1px 1px 1px;
  border-style: solid;
  border-color: #E5E5E5;
}
.pop_pay .payBtn li {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  .payIcon {
    width: 14px;
    height: 14px;
    background-repeat: no-repeat;
    background-position: center center;
    cursor: pointer;
  }
}
.pop_pay .payBtn li[data-type="100"] {
  .payIcon{
    width: 32px;
    height: 14px;
    background-image: url("@{image-domain}/union.png");
  }
}
.pop_pay .payBtn li[data-type="100"].active {
  flex: none;
  width: 153px;
  height: 31px;
  margin-top: -6px;
  margin-left: -1px;
  background: url("@{image-domain}/payTab100.png") no-repeat center center ;
  .payIcon{
    width: 120px;
    height: 20px;
    background-image: url("@{image-domain}/unionAct.png") !important;
    margin-left: -10px;
  }
}
.pop_pay .payBtn li[data-type="1"] {
  .payIcon{
    background-image: url("@{image-domain}/wechat.png");
  }
}
.pop_pay .payBtn li[data-type="1"].active {
  flex: none;
  width: 120px;
  height: 31px;
  margin-top: -6px;
  margin-left: -1px;
  background: url("@{image-domain}/payTab1.png") no-repeat center center ;
  .payIcon{
    width: 78px;
    height: 21px;
    background-image: url("@{image-domain}/wechatAct.png") !important;
    margin-right: 10px;
  }
}

.pop_pay .payBtn li[data-type="2"] {
  .payIcon{
    background-image: url("@{image-domain}/ali.png");
  }
}
.pop_pay .payBtn li[data-type="2"].active {
  flex: none;
  width: 115px;
  height: 31px;
  margin-top: -6px;
  background: url("@{image-domain}/payTab2.png") no-repeat center center ;
  .payIcon{
    width: 64px;
    height: 20px;
    background-image: url("@{image-domain}/aliAct.png") !important;
  }
}
.pop_pay .payBtn li[data-type="3"] {
  .payIcon{
    background-image: url("@{image-domain}/paypal.png");
  }
}
.pop_pay .payBtn li[data-type="3"].active {
  flex: none;
  width: 120px;
  height: 31px;
  margin-top: -6px;
  margin-right: -1px;
  background: url("@{image-domain}/payTab3.png") no-repeat center center ;
  .payIcon{
    width: 72px;
    height: 18px;
    background-image: url("@{image-domain}/paypalAct.png") !important;
    margin-left: 10px;
  }
}
.pop_pay .paypalSubmit {
  display: none;
}
.recharge-popup .pay-loadding span {
  position: absolute;
  display: block;
  width: 32px;
  height: 32px;
  top: 50%;
  left: 50%;
  margin: -16px 0 0 -16px;
  -webkit-animation: iconfont 1.8s linear infinite;
  animation: iconfont 1.8s linear infinite;
  background: url("@{image-domain}/loading.png") 50% no-repeat
}
</style>
<template>
  <div v-if="state.isShow" class="pop" id="_pop">
    <div class="pop_pay">
      <div class="ref">
        <div v-if="activePayType !== 3" class="qrcode btn active" id="_qrcode"></div>
        <div v-if="activePayType === 3"  class="form-paypal-submit btn" id="_form-paypal-submit" data-id="nineGif" @click="paypalSubmit()">GO to pay for it</div>
        <div class="paypalSubmit" id="_paypalSubmit"></div>
        <div class="past">二维码已过期</div>
      </div>
      <ul class="payBtn" id="_payBtn">
        <li v-for="(payType, index) in state.payTypeList" :key="payType.pay_type" :data-type="payType.pay_type" :class="{active: activePayType === payType.pay_type}" @click="handleCheckPayType(payType.pay_type, payType.cz_type)">
          <span class="payIcon"></span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts" >
import {nextTick, reactive, ref} from "vue";
import Common from 'common'
import {payParamsType} from '@/type'
import {debounce} from "lodash";
const {useUrl} = Common
const {getServiceUrl, getQueryVariable} = useUrl()
export interface PayType {
  cz_type: number,
  pay_type: number,
  pay_name: string,
  is_current: number,
}
export interface PayInfo {
  package_id: number;
  coupon_id: number;
  pay_type_list: PayType[];
  strategy_id: number|undefined;
}
export interface BasePayInfo {
  order_type: number;
  cz_source: number;
  cz_entrance: number;
  cz_coupon_channel: number;
  cz_coupon_vip_type: number;
}
const props = defineProps<{
  modelValue: number;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();


const state = reactive<{payTypeList: PayType[], isShow: boolean}>({
  payTypeList: [],
  isShow: true,
})
const activePayType = ref(100)
const activeCzType = ref(0)
const payParams = ref<payParamsType|null>(null)

const buy = async (payInfo: PayInfo, basePayInfo: BasePayInfo, cb: ()=>void) =>  {
  if(!window._lib_pay?.clearTabCheckPay) {
    console.error(".env中未配置支付功能")
    return
  }

  // 默认支付二维码
  // 1-1. 接口返回参数
  const {package_id, coupon_id, pay_type_list, strategy_id} = payInfo
  const {order_type, cz_entrance, cz_source} = basePayInfo

  // 1-2 渲染支付按钮
  state.payTypeList = pay_type_list
  const currentPayType = pay_type_list.filter((item: PayType) => item.is_current === 1);
  if(currentPayType.length > 0){
    activePayType.value = currentPayType[0].pay_type
    activeCzType.value = currentPayType[0].cz_type
    emit('update:modelValue', currentPayType[0].pay_type);
  }

  // 1-3. 支付参数(OpenVipPayObj)
  payParams.value = {
    package_id: package_id || 0,
    coupon_id: coupon_id || 0,
    activity_id: 0,
    cz_type: activeCzType.value || 0,
    order_type: order_type || 0,
    cz_source: cz_source || 0,
    qrcode_size:"120",
    entrance: cz_entrance+'' || "0",
    lyk_version :'4.0',
    is_union: activePayType.value === 100 ? 1 : 0 ,
    activate_source: getQueryVariable('activate_source') || '',
    ...(strategy_id !== undefined && {strategy_id}),
  };

  // 获取二维码
  await nextTick(() => {
    window._lib_pay.paymentFcun(payParams.value, () => {
      cb()
      window.easyPop.open({type: "toast", content: "支付成功"});
    });
  })
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
  emit('update:modelValue', dataType);

  // 2. 回显支付链接，检查支付状态
  if(payParams.value?.package_id && payParams.value?.package_id > 0){
    if(dataType !== 3){
      await nextTick(() => {
        window._lib_pay.paymentFcun(payParams.value, () => {
          window.easyPop.open({type: "toast", content: "支付成功"});
        });
      })
    }
  }
}
const DebounceCheckPayType = debounce((dataType: number, cz_type: number)=>{
  checkPayType(dataType, cz_type)
},600)
const handleCheckPayType = (dataType: number, cz_type: number) => {
  activePayType.value = dataType
  DebounceCheckPayType(dataType, cz_type)
}

const paypalSubmit = async () => {
  await nextTick(() => {
    window._lib_pay.paymentFcun(payParams.value, () => {
      window.easyPop.open({type: "toast", content: "支付成功"});
    });
  })
}

defineExpose({
  buy
})
</script>
