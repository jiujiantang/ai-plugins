<template>
  <BaseSection title="lowPrice">
    <div class="bg">
      <section class="spike" id="_spike">
        <h1 class="slogan">每日更新库存，低价套包限时购买</h1>
        <ul class="flex" id="product_list" style="padding-top: 208px;">
          <template v-for="(item, index) in state.product_list" :key="item.id">
            <li>
              <div class="product">
                <span class="product_title">每日2:00-16:00限时购</span>
                <span class="product_icon">
                  <img :src="item.product_type === 1 ? priceCoin : priceVIP" alt="Icon" class="icon">
                </span>
                <span class="product_name">{{item.product_name}}</span>
              </div>
              <a class="btn" :class="item.product_status === 1 ? '' : 'btnErr'" @click="buy(item.product_id, item.product_status, index)">{{item.product_status === 1 ?  item.product_price + "元购买" : item.product_status === 0 ? "未开始" : item.product_status === 2 ? "已购买" : "已结束"}}</a>
            </li>
          </template>
        </ul>
      </section>
    </div>
    <!-- 支付弹窗 -->
    <Pay ref="payRef">
      <template #default>
        {{transform(state.targetPro.product_name)}}
      </template>
    </Pay>
  </BaseSection>
</template>

<script setup lang="ts">
import {useLyk} from "@/uiux/useLyk";
import BaseSection from './Base/BaseSection.vue'
import {reactive,ref,onMounted} from "vue";
import Pay from "@/uiux/Pay.vue";
import priceCoin from "@/assets/img/common/priceCoin.png"
import priceVIP from "@/assets/img/common/priceVIP.png"
import {useSc} from "@/uiux/useSc";
import axios from "axios";
import Common from 'common'

const { scTrack } = useSc()
const lyk = useLyk()

const {useUrl} = Common
const {getServiceUrl} = useUrl()

const state = reactive({
  product_list: [ //商品列表
    {
      "product_id": 1, //商品id
      "product_name": "100下载币", //商品名称
      "product_type": 1, //商品类型：1-币、2-vip
      "product_price": "10", //价格
      "product_status": 1, //商品状态：0-未开始、 1-可购买、2-已购买、3-已结束
    },
    {
      "product_id": 2,
      "product_name": "120下载币",
      "product_type": 1,
      "product_price": "12",
      "product_status": 1
    },
    {
      "product_id":3,
      "product_name": "150下载币",
      "product_type": 1,
      "product_price": "15",
      "product_status": 1
    },
    {
      "product_id": 4,
      "product_name": "全站VIP会员1日卡",
      "product_type": 2,
      "product_price": "1",
      "product_status": 1
    },
    {
      "product_id": 5,
      "product_name": "全站VIP会员7日卡",
      "product_type": 2,
      "product_price": "10",
      "product_status": 1
    },
  ],
  targetPro: {
    product_name: ""
  }
})

const payRef = ref<Payment|null>(null)

// 购买
const buy = (product_id: number, product_status: number, index: number) => {
  if(product_status !== 1) {
    return
  }
  scTrack("Lyk12zhounianqingClick", {"zhounianqing_click_section": [index+7, 'number']})
  state.targetPro = state.product_list.find((item) => item.product_id === product_id)
  payRef.value?.buy(product_id,async ()=>{
    await init(product_id)
  })
}
const transform = (originalString) => {
  return  originalString.replace(/(d+)/, '<span>$1</span>');
}

const init = async (product_id) => {
  const { data: { status, data } } = await axios.get(getServiceUrl('/api/v1/lyk/twelve_anniversary_purchase_limit_activity/getPageInfo'),{},{
    withCredentials: true, // 确保请求中携带 cookies
  });

  if (status === 1) {
    state.product_list = data
    if(product_id){
      state.product_list.find((item) => item.product_id === product_id).product_status = 2
    }
  }
}

// 活动信息
onMounted(async ()=>{
  await init()
})

</script>

<style scoped lang="less">
@font: "Alibaba PuHuiTi 2.0", serif;
@content-width: 1600px;
@image-domain: "https://lykstatic.3d66.com/liuyunku/application/packages/year25/src/assets/img";
.bg{
  width: 1576px;
  height: 620px;
  border-radius: 60px;
  background: #ffffff;
  overflow: hidden;
  position: relative;
  .spike {
    width: 100%;
    height: 100%;
    position: relative;
    .slogan {
      width: 500px;
      height: 36px;
      font-family: @font;
      font-size: 30px;
      font-weight: 500;
      line-height: 36px;
      color: #333333;
      text-align: center;
      position: absolute;
      top: 110px;
      left: 50%;
      margin-left: -250px;
      background-image: url("@{image-domain}/common/slogan.png");
      background-repeat: no-repeat;
      background-size: 417px 17px;
      background-position: center bottom;
      &::after {
        content: "每位用户每日每个商品购买1次";
        width: 256px;
        height: 34px;
        line-height: 34px;
        border-radius: 17px 17px 17px 0;
        opacity: 1;
        background: linear-gradient(90deg, #FF4475 0%, #FF6E59 100%);
        box-shadow: inset 0 4px 10px 0 rgba(222, 255, 140, 0.3);
        position: absolute;
        left: 270px;
        top: -34px;

        font-family: @font;
        font-size: 16px;
        font-weight: normal;
        color: #FFFFFF;

        z-index: 0;
      }
    }
    #product_list {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      li {
        flex: 1;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        .product {
          width: 268px;
          height: 310px;
          background-repeat: no-repeat;
          background-image: url("@{image-domain}/1920/product.png");
          position: absolute;
          background-size: 100% 100%;
          &:hover {
            background-image: url("@{image-domain}/1920/productAct.png");
          }
          span {
            width: 100%;
            text-align: center;
            position: absolute;
          }
          .product_title {
            font-family: "Alibaba PuHuiTi 2.0",serif;
            font-size: 16px;
            font-weight: bold;
            line-height: 16px;
            color: #E74479;
            top: 14px;
          }
          .product_icon {
            display: flex;
            justify-content: center;
            top: 72px;
            img {
              max-width: 80px;
            }
          }
          .product_name {
            line-height: 46px;
            top: 164px;
            font-family: @font;
            font-size: 24px;
            font-weight: bold;
            color: #333333;
          }
        }
        .btn{
          width: 200px;
          height: 54px;
          position: absolute;
          top: 218px;
          cursor: pointer;
          text-align: center;
          line-height: 54px;
          font-family: @font;
          font-size: 24px;
          font-weight: bold;
          color: #FFFFFF;
          background: url("@{image-domain}/1920/priductBtn.png") no-repeat;
          &:hover {
            background: url("@{image-domain}/1920/priductBtnAct.png") no-repeat;
          }
        }
        .btnErr {
          background: url("@{image-domain}/1920/priductBtnErr.png") no-repeat !important;
        }
      }
    }
  }
}
@media screen and (max-width: @content-width) {
  .bg {
    width: 1276px;
    height: 620px;
    .spike{
      #product_list {
        li {
          .product {
            width: 230px;
            height: 310px;
            background-image: url("@{image-domain}/1360/product.png");
            &:hover {
              background-image: url("@{image-domain}/1360/productAct.png");
            }
          }
        }
      }
    }
  }
}

</style>