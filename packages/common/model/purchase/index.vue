<!-- 宫格抽奖模版 -->
<template>
  <section class="spike" id="_spike">
    <ul class="flex" id="product_list" style="padding-top: 208px;">

      <template v-for="(item, index) in state.product_list" :key="item.id">
        <li>
          <div class="product">
            <span class="product_stock">限量30份</span>
            <span data-type="product_name">
              <img src="https://lykstatic.3d66.com/liuyunku/lyk_shop/dist/images/spike/icon.png" alt="Icon" class="icon">
            </span>
            <span data-type="package_discount_fee"><icon class="icon">￥</icon>1</span>
          </div>
          <a class="btn" data-id="oneGif">立即秒杀</a>
        </li>
      </template>
    </ul>
  </section>
</template>

<script setup>
import {reactive, onUnmounted, defineProps, ref} from "vue"

const {json, lottery, gameOverCb} = defineProps({
  json: {},
  lottery: null,
  gameOverCb: null
})

const state = reactive({
  product_list: [ //商品列表
    {
      "product_id": 1, //商品id
      "product_type": 1, //商品类型：1-下载币、2-渲染币、3-动画币
      "product_stock": "每日2:00-16:00限时购", //商品数量
      "package_id": 8110, //套包id
      "product_name": "100下载币", //商品名称
      "package_total_fee": 30, //套包原价
      "package_discount_fee": 1, //套包优惠价
      "package_user_pay": "10元购买", //套包实付价
      "product_status": 1 //商品状态：1-可购买、2-已购买、3-已售罄
    },
    {
      "product_id": 1, //商品id
      "product_type": 1, //商品类型：1-下载币、2-渲染币、3-动画币
      "product_stock": "每日2:00-16:00限时购", //商品数量
      "package_id": 8110, //套包id
      "product_name": "100下载币", //商品名称
      "package_total_fee": 30, //套包原价
      "package_discount_fee": 1, //套包优惠价
      "package_user_pay": "10元购买", //套包实付价
      "product_status": 1 //商品状态：1-可购买、2-已购买、3-已售罄
    },
    {
      "product_id": 1, //商品id
      "product_type": 1, //商品类型：1-下载币、2-渲染币、3-动画币
      "product_stock": "每日2:00-16:00限时购", //商品数量
      "package_id": 8110, //套包id
      "product_name": "100下载币", //商品名称
      "package_total_fee": 30, //套包原价
      "package_discount_fee": 1, //套包优惠价
      "package_user_pay": "10元购买", //套包实付价
      "product_status": 1 //商品状态：1-可购买、2-已购买、3-已售罄
    },
    {
      "product_id": 1, //商品id
      "product_type": 1, //商品类型：1-下载币、2-渲染币、3-动画币
      "product_stock": "每日2:00-16:00限时购", //商品数量
      "package_id": 8110, //套包id
      "product_name": "100下载币", //商品名称
      "package_total_fee": 30, //套包原价
      "package_discount_fee": 1, //套包优惠价
      "package_user_pay": "10元购买", //套包实付价
      "product_status": 1 //商品状态：1-可购买、2-已购买、3-已售罄
    },
    {
      "product_id": 1, //商品id
      "product_type": 1, //商品类型：1-下载币、2-渲染币、3-动画币
      "product_stock": "每日2:00-16:00限时购", //商品数量
      "package_id": 8110, //套包id
      "product_name": "100下载币", //商品名称
      "package_total_fee": 30, //套包原价
      "package_discount_fee": 1, //套包优惠价
      "package_user_pay": "10元购买", //套包实付价
      "product_status": 1 //商品状态：1-可购买、2-已购买、3-已售罄
    },
  ]
})

</script>

<style scoped lang="less">
@image-domain: "https://lykstatic.3d66.com/liuyunku/lyk_shop/dist";
.spike {
  width: 100%;
  height: 100%;
  #product_list {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    .product {
      width: 220px;
      height: 310px;
      background-image: url("@{image-domain}/images/spike/product.png?1107");
      position: absolute;
      background-size: 100% 100%;
      .product_stock {
        font-family: "Alibaba PuHuiTi 2.0",serif;
        font-size: 16px;
        font-weight: bold;
        line-height: 16px;
        color: #E74479;
      }
    }
  }
}

.spike .product span {
  width: 100%;
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}

.spike .product span[data-type="product_name"] {
  margin-top: 82px;
  font-size: 26px;
  font-weight: bold;
  letter-spacing: 0.1em;
  color: #333333;
  width: 100%;
  display: flex;
  justify-content: center;
}
.spike .product span[data-type="product_name"] .icon {
  width: 32px;
  height: 32px;
}

.spike .product span[data-type="product_name"] .text {
  display: inline-block;
  margin-left: 20px;
}

.spike .product span[data-type="package_discount_fee"] {
  top: 184px;
  font-size: 24px;
  font-weight: bold;
  line-height: 46px;
  letter-spacing: 0.1em;
  color: black;
}

.spike .product span[data-type="package_user_pay"] {
  top: 300px;
  left: 48%;
  font-size: 42px;
  font-weight: bold;
  line-height: 46px;
  letter-spacing: 0.1em;
  color: #FE275F;
}

.spike .product span[data-type="package_discount_fee"] .icon {
  display: inline-block;
  transform: scale(0.7);
  width: 18px;
}

.spike .product span[data-type="package_user_pay"] .icon {
  display: inline-block;
  transform: scale(0.7);
  width: 30px;
}

.spike .activity_countdown {
  width: 378px;
  height: 32px;
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translate(-50%, 0);
  margin-left: 118px;
  text-align: center;
  line-height: 32px;
  font-size: 20px;
  font-weight: bold;
  color: #FFFFFF;
}
.spike .activity_countdown span{
  display: inline-block;
  min-width: 32px;
  height: 100%;
  color: #FE275F;
  font-size: 20px;
  font-weight: bold;
  border-radius: 6px;
  opacity: 1;
  background: #FFFFFF;
}
.gif {
  position: absolute;
  width: 240px;
  height: 240px;
  z-index: 99999;
  left: 50%;
  transform: translate(-50%, 0);
  display: none;
}
.spike #product_list li {
  flex: 1;
  height: 100%;
  position: relative;
}
.spike #product_list li .btn {
  width: 195px;
  height: 54px;
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translate(-50%, 0);
  background: linear-gradient(90deg, #FF4475 0%, #FF6E59 100%);
  border: 1px solid #FFC0C0;
  box-shadow: inset 0 4px 10px 0 rgba(255, 255, 255, 0.6);
  text-align: center;
  line-height: 54px;
  border-radius: 27px;
  font-size: 24px;
  font-weight: bold;
  color: #FFFFFF;
  z-index: 999999;
}

.spike #product_list li .btn.dis {
  background: linear-gradient(90deg, #FF9AB2 0%, #FFAAA0 100%) !important;
  box-shadow: inset 0 4px 10px 0 rgba(255, 255, 255, 0.6) !important;
}



.spike #product_list li .btn.active {
  background: linear-gradient(90deg, #FC275F 0%, #FF4429 100%) !important;
  box-shadow: inset 0 4px 10px 0 rgba(255, 255, 255, 0.8) !important;
}

.spike .product:hover {
  background-image: url("@{image-domain}/images/spike/product_act.png?1107") !important;
}
.spike .product.active {
  background-image: url("@{image-domain}/images/spike/product_act.png?1107") !important;
}

.spike .subscribed {
  width: 32px;
  height: 32px;
  background: url("@{image-domain}/images/spike/sel.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 191px;
  left: 50%;
  transform: translate(-150px, 0);
  z-index: 9;
}
.spike .subscribed.active {
  background-image: url("@{image-domain}/images/spike/sel_act.png") !important;
}
</style>