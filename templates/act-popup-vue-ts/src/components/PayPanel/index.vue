<script setup lang="ts">
import {computed, reactive, ref, watch} from "vue";
import {getCoupon} from "@/data/service/couponService";
import type {BasePayInfo, PayType} from "@/uiux/Pay.vue";
import type {Package} from "@/data/adapter/packageData";
import type {Coupons} from "@/data/adapter/couponData";
import Coupon from "@/components/PayPanel/Coupon.vue";
import Rights from "@/components/PayPanel/Rights.vue";
import Pay from "@/uiux/Pay.vue";
import Divider from "@/components/PayPanel/Divider.vue";
import * as _ from 'lodash';
import { useLyk } from "@/uiux/useLyk";
import Countdown from "vue-countdown-plugin";
import {useGlobalProperties} from "@/data/useGlobalProperties";
import {useWindowBridge} from "win-bridge";
import {CATEGORY_OPERATE_ATTR, NAV_CATEGORY} from "@/buried/buried_config_all";

// const
const {callExternalMethod} = useWindowBridge()
const lyk = useLyk();
const NO_COUPONS_TEXT = "暂无可用优惠券";
const NO_USE_TEXT = "不使用优惠券";
// public
interface PayPanelProps {
  packages: Package["package"],
  sideId: number,
  sideName: string,
  rights: Package["rights"],
  channel: number,
  payList: PayType[],
  basePayInfo: BasePayInfo | null,
  moreBenefitsUrl: Package["more_benefits_url"],
  strategyId: number|undefined,
  alerts: string|undefined,
  upgradeInfo: Package["upgrade_info"] | null,
}
const props = defineProps<PayPanelProps>()
const {$debug} = useGlobalProperties()
const isHideHot = ref(import.meta.env.VITE_IS_HIDE_HOT === 'true');
// private
interface PayPanelState {
  packageId: number;
  actPackageId: number;
  couponId: number;
  isShowCoupon: boolean;
  coupons: Coupons;
  payType: number;
  cz_coupon_vip_type: number;
  totalPrice: number;
}
const state = reactive<PayPanelState>({
  packageId: 0,
  actPackageId: 0,
  couponId: 0,
  isShowCoupon: false,
  coupons: [],
  payType: 0,
  cz_coupon_vip_type: 0,
  totalPrice: 0,
});
const payRef = ref<InstanceType<typeof Pay> | null>(null);
const couponRef = ref<InstanceType<typeof Coupon> | null>(null);
const forceHideCoupon = ref<boolean>(false);
const bestPriceRef = ref<number>(0);
const showCouponCountDownRef = ref<number>(0);
const couponCountDownRef = ref<number>(0);
const couponCountDownSortPriceRef = ref<number>(0);
const couponCountDownLimitRef = ref<number>(0);
const emit = defineEmits<{
  (e: 'update-package-id', packageId: number): void;
}>();
const ElementClick = (params: string) => {
  callExternalMethod("ElementUserBehavior", params)
};

// 更新支付信息
const renderPayInfo = (_couponId: number) => {
  state.couponId = _couponId;
  const { packages, payList, basePayInfo, strategyId } = props;
  const { packageId, couponId, coupons } = state;

  const { key: packageKey } = packages.find(p => p.key === packageId) || {};
  const { sortPrice = 0, use_limit_price = 0, show_countdown = 0, coupon_countdown = 0  } = coupons.find(c => c.key === couponId) || {};
  totalPrice(state.payType)

  showCouponCountDownRef.value = show_countdown;
  couponCountDownRef.value = coupon_countdown;
  couponCountDownSortPriceRef.value = +Number(sortPrice).toFixed(0);
  couponCountDownLimitRef.value = +Number(use_limit_price).toFixed(0);

  if(packageKey && basePayInfo){// 二维码/payPal信息
    payRef.value?.buy(
      {
        package_id: packageKey,
        coupon_id: couponId,
        pay_type_list: payList,
        strategy_id : strategyId,
      },
      basePayInfo,
      ()=>{
        // console.log("支付成功")
      }
    )
  }
  bestPriceRef.value = bestPrice() || 0// 优惠信息
}
// 套包切换
const changePackage = async(_package: Package['package'][number]) => {
  state.isShowCoupon = !!_package.can_use_coupon;// 渲染优惠券
  let tmpCoupons = [];
  if(props.channel && state.isShowCoupon){
    const coupons = await getCoupon(
      _package.rmb_price,
      _package.key,
      props.channel,
      state.cz_coupon_vip_type,
    )
    if(coupons && Array.isArray(coupons)){
      tmpCoupons = [...coupons,{key: 0, coupon_title: (coupons.length > 0 && state.isShowCoupon) ? NO_USE_TEXT : NO_COUPONS_TEXT, sortPrice: "0"}]
    }else {
      tmpCoupons = [{key: 0, coupon_title: NO_COUPONS_TEXT, sortPrice: "0"}]
    }
  }else {
    tmpCoupons = [{key: 0, coupon_title: NO_COUPONS_TEXT, sortPrice: "0"}]
  }
  // 渲染
  state.coupons = tmpCoupons;// 券包信息
  if(state.coupons.length > 0){
    couponRef.value?.defSelect(state.coupons[0].key)
    renderPayInfo(state.coupons[0].key)// 更新支付信息
  }
}
const DebounceChangePackage = _.debounce(
  (_package: Package['package'][number])=>{
    changePackage(_package)
  },
  600
  // ,{ leading: true, trailing: false }, // 第一次立即执行，后续不执行 trailing
)
const handlePackageClick = (item: Package['package'][number]) => {
  ElementClick(CATEGORY_OPERATE_ATTR[props.sideId]['change_pkg'])
  state.packageId = item.key
  // 渲染套包
  emit('update-package-id', item.key)
  DebounceChangePackage(item);
}
watch(
  () => props.packages,
  (packages) => {
    if (!packages.length) return;

    state.payType = props?.payList[0]?.pay_type || 1;
    state.cz_coupon_vip_type = props?.basePayInfo?.cz_coupon_vip_type || 0;
    state.packageId = (packages.find(item => item.default_package) || packages[0]).key;
    state.actPackageId = state.packageId;
    emit('update-package-id', (packages.find(item => item.default_package) || packages[0]).key)
    DebounceChangePackage(packages.find(item => item.default_package) || packages[0]);
  },
  { immediate: true }
);
const handlePackageEnter = (item: Package['package'][number]) => {
  state.actPackageId = item.key;
}
const handlePackageLeave = () => {
  state.actPackageId = state.packageId;
}

watch(
  () => state.payType,
  (payType) => {
    totalPrice(payType)
  }
)

// 总价计算
const totalPrice = (payType: number) => {
  const pkg = props.packages.find(p => p.key === state.packageId);
  if (!pkg) return;

  const rmbCouponPrice = Number(state.coupons.find(c => c.key === state.couponId)?.sortPrice) || 0;
  const rmbDeduction = Number(props.upgradeInfo?.upgrade_deduction_price) || 0;
  const dollarCouponPrice = (parseInt(state.coupons.find(c => c.key === state.couponId)?.sortPrice+'') || 0)/2;
  const dollarDeduction = (parseInt(props.upgradeInfo?.upgrade_deduction_price+'') || 0)/2 || 0;

  if(payType === 3){
    state.totalPrice = Math.max(
      0,
      parseFloat(( pkg?.dollar_price - dollarCouponPrice - dollarDeduction).toFixed(2)));
  }else {
    state.totalPrice = Math.max(
      0.01,
      parseFloat(( pkg?.rmb_price - rmbCouponPrice - rmbDeduction).toFixed(2)));
  }
}

// 优惠价计算
const bestPrice = () => {
  const _currentPackage = props.packages.find(p => p.key === state.packageId)
  const _selectedCoupon = state.coupons.find(c => c.key === state.couponId);

  if (!_currentPackage || !_selectedCoupon) {
    return undefined;
  }

  const { original_price, rmb_price } = _currentPackage;
  const sortPrice = Number(_selectedCoupon.sortPrice);
  const upgrade_deduction_price = Number(props.upgradeInfo?.upgrade_deduction_price || 0);

  let discountPrice =  parseFloat((original_price + sortPrice + upgrade_deduction_price - rmb_price).toFixed(2));

  if (state.payType === 3) {
    discountPrice = parseInt(discountPrice+'')/2;
  }

  return Math.max(discountPrice, 0);
}
const selectedCoupon = computed(() => {
  return state.coupons.find(c => c.key === state.couponId) as Coupons[number]|undefined;
})
// ?号文案
const formatQuestionContent = (_upgradeInfo: Package["upgrade_info"], _payType: number):string => {
  const _currentPackage = props.packages.find(p => p.key === state.packageId)
  const _selectedCoupon = state.coupons.find(c => c.key === state.couponId);
  if (!_currentPackage || !_selectedCoupon) {
    return "";
  }
  const { original_price, rmb_price } = _currentPackage;

  const bestPrices: string[] = [];
  if (_upgradeInfo && parseInt(_upgradeInfo?.upgrade_deduction_price+'') > 0) {
    bestPrices.push(`旧权益抵扣${_payType === 3 ? parseInt(_upgradeInfo.upgrade_deduction_price+'')/2+'美元' : Number(_upgradeInfo.upgrade_deduction_price)+'元'}`);
  }
  if(original_price - rmb_price > 0){
    bestPrices.push(`限时优惠${_payType === 3 ? parseInt((original_price - rmb_price)+'')/2+'美元' : parseFloat((original_price - rmb_price).toFixed(2))+'元'}`);
  }
  if (parseInt(_selectedCoupon?.sortPrice+'') > 0) {
    bestPrices.push(`用券优惠${_payType === 3 ? parseInt(_selectedCoupon.sortPrice+'')/2+'美元' : Number(_selectedCoupon.sortPrice)+'元'}`);
  }

  // 用"+"号拼接
  return bestPrices.join("+")
}

// 协议跳转
const handleMore = () => { lyk.withLyk("OpenUrl", "https://service.3d66.com/rule/4.html") }

// 优惠券倒计时
const handleCouponCDFinish = () => {
  showCouponCountDownRef.value = 0;
}
const splitTime = (time: string) => {
  return time.split(',').map(Number);
}
const calcMinutes = (time: string) => {
  const [days, hours, minutes, seconds] = splitTime(time);
  if(minutes >= 10){
    return days * 24 * 60 + hours * 60 + minutes;
  }else {
    return String(minutes).padStart(2, '0');
  }
}
const handleCountDownClose = () => {
  showCouponCountDownRef.value = 0;
}
</script>

<template>
  <div class="packageWrap">
    <div class="wrap-l">
      <!--  套包  -->
      <div class="packages">
        <ul>
          <li v-for="(item, index) in props.packages" :key="item.key"
              :class="{hover: item.key === state.actPackageId, active: item.key === state.packageId}"
              @click="handlePackageClick(item)"
              @mouseenter ="handlePackageEnter(item)"
              @mouseleave ="handlePackageLeave"
          >
            <div class="inner">
              <p class="name"><span class="dollar">￥</span><span>{{ item.rmb_price }}</span></p>
              <p class="sub">￥{{ item.original_price }}</p>
              <p class="tag ellipsis">{{ item.package_tag }}</p>
              <p class="tip ellipsis">{{ item.package_name }}</p>
              <span v-show="item.default_package && !isHideHot" class="hot">推荐</span>
            </div>
          </li>
        </ul>
      </div>
      <!--   提示   -->
      <div class="alerts" :class="{special: alerts && alerts.length>0}">{{alerts}}</div>
      <!--   权益   -->
      <div class="rights">
        <Rights :id="sideId" :name="sideName" :rights="rights" :more_benefits_url="moreBenefitsUrl" :rowGap="alerts && alerts.length>0 ? '24px' : '32px'" />
      </div>
      <!--   分割线   -->
      <Divider />
    </div>
    <div class="wrap-r">
      <!--  总价  -->
      <div class="price"><p :class="{
        payPal: state.payType === 3,
        upgrade: upgradeInfo && upgradeInfo?.upgrade_deduction_price > 0
      }">{{state.totalPrice}}</p></div>
      <!--  已优惠价格  -->
      <div :style="{visibility: state.payType === 3 ? 'hidden' : 'visible'}" class="best">
        <div class="bestPrice">已优惠 {{state.payType === 3 ? '$':'￥'}}{{bestPriceRef}}</div>
        <div v-if="!!formatQuestionContent(upgradeInfo, state.payType)" class="question" :data-navId="sideId">
          <span class="tips">
            {{formatQuestionContent(upgradeInfo, state.payType)}}
          </span>
        </div>
      </div>
      <!--  优惠券 -->
      <Coupon :sideId="sideId" :options="state.coupons" :renderPayInfo="renderPayInfo" ref="couponRef"  />
      <!--  二维码  -->
      <Pay ref="payRef" v-model="state.payType" />
      <p class="more" @click="handleMore">支付即表示同意《3D溜溜网用户协议》</p>
    </div>
    <!--  券倒计时  -->
    <Countdown keyName="couponCountdown" :end="Date.now() + couponCountDownRef" :onFinish="handleCouponCDFinish">
      <template #default="{ time }">
        <div class="couponCountdown" v-show="!!showCouponCountDownRef">
          <p class="title"><span class="money">￥</span><span class="number">{{couponCountDownSortPriceRef}}</span></p>
          <p class="subTitle">满{{couponCountDownLimitRef}}可用</p>
          <div class="timer">
            <span>{{ calcMinutes(time) }}</span>&nbsp;:&nbsp; <span>{{time.split(",")[3]}}</span>
          </div>
          <button class="closeBtn" @click="handleCountDownClose"></button>
        </div>
      </template>
    </Countdown>
    <!--  调试  -->
    <div class="footer" v-if="$debug === 'true'">
      packageId:{{state.packageId}},
      couponId:{{state.couponId}},
      isShowCoupon:{{state.isShowCoupon}},
      channelId:{{props.channel}},
      payType:{{state.payType}}
    </div>
  </div>
</template>

<style scoped lang="less">
@app-left-w: 554px;
@app-right-w: 225px;
.packageWrap {
  display: flex;
  height: 100%;
  // 倒计时
  .couponCountdown {
    width: 65px;
    height: 78px;
    color: #ffffff;
    position: absolute;
    right: -20px;
    top: 35px;
    z-index: 999;
    background: url("@{image-domain}/couponCountdown.png") no-repeat center;
    .title {
      width: 100%;
      text-align: center;
      position: absolute;
      top: 16px;
      .money {
        font-size: 10px;
        font-weight: bold;
        line-height: 14px;
        color: #FC1D1D;
        vertical-align: top;
      }
      .number {
        font-size: 22px;
        font-weight: bold;
        line-height: 22px;
        color: #FC1D1D;
      }
    }
    .subTitle {
      font-size: 12px;
      font-weight: 500;
      line-height: 12px;
      color: #FFFFFF;
      text-shadow: 0 4px 10px #FF001B;
      width: 100%;
      text-align: center;
      position: absolute;
      bottom: 20px;
    }
    .timer {
      width: 100%;
      position: absolute;
      bottom: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 8px;
      line-height: 12px;
      span {
        width: auto;
        height: 12px;
        border-radius: 2px;
        background: #A20812;
        padding: 0 2px;

        font-size: 8px;
        font-weight: bold;
        color: #FFFFFF;
      }
    }
    .closeBtn {
      width: 14px;
      height: 14px;
      background: url("@{image-domain}/countDownClose.png") no-repeat center;
      position: absolute;
      bottom: -22px;
      left: 50%;
      margin-left: -7px;
      cursor: pointer;
    }
  }
  .wrap-l {
    width: @app-left-w;
    height: 100%;
    position: relative;
    .packages {
      width: 100%;
      height: 200px;
      margin-top: 30px;
      padding-top: 20px;
      ul {
        width: 100%;
        height: 180px;
        list-style: none;
        display: flex;
        justify-content: center;
        align-items: flex-end;
      }
      li {
        margin-bottom: 5px;
        padding-right: 10px;
        &:last-child {
          padding-right: 0;
        }
        .inner {
          cursor: pointer;
          width: 160px;
          height: 160px;
          border-radius: 12px;
          border: var(--bg-packageBottom-sub) 2px solid;
          color: #4D4D4D;
          padding-bottom: 28px;
          display: flex;
          flex-direction: column;
          justify-content: start;
          position: relative;
        }
        &:hover {
          .inner {
            background: var(--bg-package-hover);
          }
        }

        //transition: width 0.1s ease-in-out;

        p {
          width: 100%;
        }
        .name {
          font-size: 30px;
          font-weight: bold;
          line-height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 28px;
          .dollar {
            display: block;
            height: 54px;
            font-size: 16px;
            vertical-align: top;
            padding-bottom: 10px;
            line-height: 48px;
          }
        }
        .sub {
          font-size: 14px;
          line-height: 14px;
          text-decoration: line-through;
          color: #999999;
        }
        .tag {
          font-size: 14px;
          height: 32px;
          line-height: 32px;
          color: var(--bg-package-tag);
          position: absolute;
          bottom: 28px;
        }
        .tip {
          font-size: 14px;
          font-family: 'Alibaba PuHuiTi 2.0 65',serif;
          height: 28px;
          line-height: 28px;
          background: var(--bg-packageBottom-sub);
          position: absolute;
          bottom: 0;
          color: var(--bg-package-subText);
          border-radius: 0 0 10px 10px;
        }
        .hot {
          display: inline-block;
          position: absolute;
          width: 100px;
          height: 30px;
          top: -14px;
          left: -10px;
          background: url("@{image-domain}/hot.png") no-repeat center center;
          background-size: 100% 100%;

          font-family: Microsoft YaHei,serif;
          font-size: 18px;
          font-weight: bold;
          line-height: 30px;
          text-align: left;
          padding-left: 20px;
          color: #FFFFFF;
        }

        &.active{
          .inner {
            background: var(--bg-package);
            border: var(--bg-package-border) 2px solid;
            color: var(--text-color);
            padding-bottom: 32px;
            width: 180px;
            height: 180px;
            .tip {
              height: 32px;
              line-height: 32px;
              color: var(--bg-package-text);
              background: var(--bg-packageBottom);
            }
            .tag {
              bottom: 32px;
            }
          }
        }
      }
    }
    .alerts {
      width: 100%;
      height: 30px;
      line-height: 22px;
      font-size: 12px;
      color: #FF7F07;
      &.special {
        height: 40px;
      }
    }
    .rights {
      //margin-top: 30px;
    }
  }
  .wrap-r {
    width: @app-right-w;
    height: auto;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .price {
      width: 100%;
      height: 64px;
      font-size: 48px;
      font-weight: bold;
      color: var(--text-color);
      margin-top: 32px;
      p {
        display: inline-block;
        padding-left: 24px;
        position: relative;
        font-size: 48px;
        height: 48px;
        line-height: 48px;
      }
      p.upgrade::before {
        content: '以旧换新价';
        width: 90px;
        height: 26px;
        border-radius: 13px 13px 13px 0;
        background: linear-gradient(295deg, #E53935 -8%, #FF5252 95%);
        position: absolute;
        top: -27px;
        left: 50%;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        line-height: 26px;
        color: #ffffff;
      }
      P.payPal::after {
        content: "$";
      }
      p::after {
        content: "￥";
        position: absolute;
        width: 24px;
        height: 24px;
        left: 0;
        top: 5px;
        font-size: 24px;
        line-height: 24px;
        font-weight: bold;
        color: var(--text-color);
      }
    }
    .best {
      font-family: 'Alibaba PuHuiTi 2.0 65',serif;
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 10px;
      .question {
        width: 12px;
        height: 12px;
        background-repeat: no-repeat;
        background-image: url("@{image-domain}/question.png");
        background-size: 268px 16px;
        background-position: -2px -2px;
        cursor: pointer;
        position: relative;
        &:hover{
          .tips {
            display: block;
          }
          &[data-navId="2"] {
            background-position: -44px -2px;
          }
          &[data-navId="3"] {
            background-position: -128px -2px;
          }
          &[data-navId="4"] {
            background-position: -170px -2px;
          }
          &[data-navId="5"] {
            background-position: -212px -2px;
          }
          &[data-navId="6"] {
            background-position: -254px -2px;
          }
        }
        .tips {
          display: none;
          white-space: nowrap;
          padding: 2px 6px;
          border-radius: 4px;
          background: #ffffff;
          position: absolute;
          font-size: 12px;
          font-weight: 500;
          color: #4D4D4D;
          box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.3);
          right: 16px;
          top: 16px;
          z-index: 9;
        }
      }
      .bestPrice {
        color: var(--text-best-price);
        padding: 6px 10px;
        background: var(--bg-best-price);
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        line-height: 14px;
      }
    }
    .more {
      margin: 12px auto 0 auto;
      width: 100%;
      height: 17px;
      line-height: 17px;
      font-size: 12px;
      font-weight: 500;
      text-align: center;
      color: #999999;
      cursor: pointer;
    }
  }
}
.footer {
  width: 100%;
  height: 20px;
  position: absolute;
  bottom: -24px;
  left: 0;
  color: #fff;
  text-align: right;
}
</style>
