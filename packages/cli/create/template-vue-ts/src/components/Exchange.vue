<template>
  <BaseSection title="exchange">
    <div class="bg">
      <div class="cards">
        <h1 class="slogan">感恩一路共创，提现币超值兑换</h1>
        <BaseCard :rows="3" :cols="3" :cards="state.cards">
          <template #default="{ card, index }">
            <!-- 自定义每个项目的内容 -->
            <div class="card">
              <h1>{{card.name}}<span v-if="card.exchange_type === 5 || card.exchange_type === 6">每日限兑1张，7日内有效</span></h1>
              <div class="guid">
                <div class="li">
                  <img src="@/assets/img/card-award.png" alt="">
                  <p>{{card.award[0].text}}</p>
                </div>
                <div class="c"></div>
                <div class="li">
                  <img :src="card.award[1].img === 1 ? cardAwardOne : card.award[1].img === 2 ? cardAwardTwo : card.award[1].img === 3 ? cardAwardThree : card.award[1].img === 4 ? cardAwardFour : card.award[1].img === 5 ? cardAwardFive: cardAwardSix" alt="">
                  <p>{{card.award[1].text}}</p>
                </div>
              </div>
              <!--       btnErr       -->
              <button :class="card.exchange_status === 1 ? 'btnOk' : 'btnErr'" @click="handleClick(index, card.exchange_id, card.exchange_status)">{{card.exchange_status === 1 ? '兑换' : card.exchange_status === 2 ? '当日已兑换' : '当日已兑完'}}</button>
            </div>
          </template>
        </BaseCard>
      </div>
    </div>
  </BaseSection>
  <Modal v-model:show="state.showModal">
    <div class="exChangePop">
      <div class="icon" :class="`icon${state.targetCard.exchange_type}`"></div>
      <h1 class="title">{{state.targetCard.exchange_name}}</h1>
      <h1 class="tips">我的提现币：{{state.targetCard.user_cash_lb}}个</h1>
      <button class="btnOk" @click="exChangeCoin(state.targetCard.exchange_id)">确定</button>
      <button class="close"></button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import {useSc} from "@/uiux/useSc";
import {useLyk} from "@/uiux/useLyk";
import BaseSection from './Base/BaseSection.vue';
import BaseCard from "@/components/Base/BaseCard.vue";
import cardAwardOne from "@/assets/img/card-award-one.png";
import cardAwardTwo from "@/assets/img/card-award-two.png";
import cardAwardThree from "@/assets/img/card-award-three.png";
import cardAwardFour from "@/assets/img/card-award-four.png";
import cardAwardFive from "@/assets/img/card-award-five.png";
import cardAwardSix from "@/assets/img/card-award-six.png";
import axios from "axios";
import Common from 'common'
import Modal from "@/components/Base/BaseModal.vue";

const { scTrack } = useSc()
const lyk = useLyk()

const {useUrl} = Common
const {getServiceUrl} = useUrl()

const state = reactive({
  cards: [{ name: '提现币兑换', award: [{text: "1000提现币"},{text: "1100下载币", img: 1}], exchange_type: 1, exchange_status: 1, exchange_id: 1 },
    { name: '提现币兑换', award: [{text: "5000提现币"},{text: "5600下载币", img: 1}], exchange_type: 1, exchange_status: 1, exchange_id: 2 },
    { name: '提现币兑换', award: [{text: "10000提现币"},{text: "12000下载币", img: 1}], exchange_type: 1, exchange_status: 1, exchange_id: 3  },
    { name: '提现币兑换', award: [{text: "60提现币"},{text: "充值无门槛10元券", img: 5}], exchange_type: 5, exchange_status: 1, exchange_id: 4 },
    { name: '提现币兑换', award: [{text: "2300提现币"},{text: "全站VIP年卡", img: 2}], exchange_type: 2, exchange_status: 1, exchange_id: 5  },
    { name: '提现币兑换', award: [{text: "900提现币"},{text: "素材贵族年卡", img: 3}], exchange_type: 3, exchange_status: 1, exchange_id: 6  },
    { name: '提现币兑换', award: [{text: "900提现币"},{text: "渲染贵族年卡", img: 4}], exchange_type: 4, exchange_status: 1, exchange_id: 7  },
    { name: '提现币兑换', award: [{text: "100提现币"},{text: "会员贵族开通15元券", img: 6}], exchange_type: 6, exchange_status: 1, exchange_id: 8 }],
  showModal: false,
  targetCard: {}
});

const handleClick = async (index, exchange_id, exchange_status) => {
  scTrack("Lyk12zhounianqingClick", {"zhounianqing_click_section": [index+13, 'number']})

  if(exchange_status !== 1){
    return
  }

  const { data: { status, data, msg } } = await axios.post(getServiceUrl('/api/v1/lyk/twelve_anniversary_cash_lb_exchange_activity/getExchangeInfo'),{exchange_id},{
    withCredentials: true, // 确保请求中携带 cookies
  });

  if(status === 1){
    const {exchange_name, user_cash_lb, exchange_type} = data
    state.targetCard = {
      exchange_id,
      exchange_name,
      user_cash_lb,
      exchange_type,
    }
    state.showModal = true
  }else {
    layer.msg(msg)
  }
}

const exChangeCoin = async (exchange_id) => {
  const { data: { status, data, msg } } = await axios.post(getServiceUrl('/api/v1/lyk/twelve_anniversary_cash_lb_exchange_activity/exchange'),{exchange_id},{
    withCredentials: true, // 确保请求中携带 cookies
  });

  if(status === 1){
    await init()
    state.showModal = false
  }

  layer.msg(msg)
}

const init = async () => {
  const { data: { status, data } } = await axios.post(getServiceUrl('/api/v1/lyk/twelve_anniversary_cash_lb_exchange_activity/getExchangeList'),{},{
    withCredentials: true, // 确保请求中携带 cookies
  });

  if (status === 1) {
    let cardsArr = []
    data.forEach((item) => {
      cardsArr.push({
        exchange_id: item.exchange_id,
        name: '提现币兑换',
        award: [{text: item.cash_lb_name},{text: item.exchange_name, img: item.exchange_type}],
        exchange_type: item.exchange_type,
        exchange_status: item.exchange_status,
      })
    })
    state.cards = cardsArr
  }
}

onMounted(async ()=>{
  await init()
})

</script>

<style scoped lang="less">
@font: "Alibaba PuHuiTi 2.0", serif;
@content-width: 1600px;
@image-domain: "https://lykstatic.3d66.com/liuyunku/application/packages/year25/src/assets/img";
//@image-domain: "https://lykstatictest.3d66.com/liuyunku/application/packages/year25/src/assets/img";
//@image-domain: "@/assets/img";
.bg{
  width: 1576px;
  //height: 1655px;
  border-radius: 60px;
  background: #ffffff;
  overflow: hidden;
  .cards {
    width: 100%;
    height: 100%;
    padding: 164px 96px 109px;
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
      top: 70px;
      left: 50%;
      margin-left: -250px;
      background-image: url("@{image-domain}/common/slogan.png");
      background-repeat: no-repeat;
      background-size: 417px 17px;
      background-position: center bottom;
    }
    .card {
      padding-top: 52px;
      width: 416px;
      height: 410px;
      background-image: url("@{image-domain}/1920/cardBg.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      .guid {
        margin-top: 32px;
        display: flex;
        justify-content: center;
        gap: 15px;
        position: relative;
        .li {
          padding-top: 34px;
          width: 150px;
          height: 150px;
          border-radius: 12px;
          background: linear-gradient(180deg, #FEE6E8 0%, #FFEED1 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            width: 60px;
            height: 60px;
          }
          p {
            margin: 10px;
            width: 100%;
            height: 20px;
            text-align: center;
            font-family: @font;
            font-size: 14px;
            font-weight: bold;
            color: #444444;
            line-height: 20px;
          }
        }
        .c {
          position: absolute;
          top: 48px;
          width: 58px;
          height: 58px;
          border-radius: 29px;
          background: url("@{image-domain}/card-c.png") no-repeat;
        }
        .li{
          width: 150px;
          height: 150px;
          border-radius: 12px;
          background: linear-gradient(180deg, #FEE6E8 0%, #FFEED1 100%);
        }
      }
      h1 {
        font-family: @font;
        font-size: 24px;
        font-weight: bold;
        color: #333333;
        position: relative;
        span {
          box-sizing: border-box;
          content: "每日限兑1张，7日内有效";
          font-family: @font;
          display: inline-block;
          width: 152px;
          height: 25px;

          border-radius: 25px 25px 25px 0;
          opacity: 1;

          background: linear-gradient(90deg, #FF4475 0%, #FF6E59 100%);
          position: absolute;
          right: -112px;
          top: -25px;
          padding-left: 10px;

          font-size: 12px;
          font-weight: 500;
          line-height: 25px;
          color: #FFFFFF;
        }
      }
      .btnOk {
        margin-top: 28px;
        width: 219px;
        height: 54px;
        border-radius: 264px;
        border: 1px solid #FFC0C0;
        box-shadow: inset 0 4px 10px 0 rgba(255, 255, 255, 0.6);
        color: #fff;
        background: linear-gradient(90deg, #EA6DC2 -4%, #FA7459 105%);
        cursor: pointer;
      }
      .btnErr {
        margin-top: 28px;
        width: 219px;
        height: 54px;
        border-radius: 264px;
        background: linear-gradient(90deg, rgba(234, 109, 194, 0.5) -4%, rgba(250, 116, 89, 0.5) 106%);
        border: 1px solid #FFC0C0;
        box-shadow: inset 0 4px 10px 0 rgba(255, 255, 255, 0.6);
        color: #fff;
      }
    }
  }
}
.exChangePop {
  width: 388px;
  height: 247px;
  background: url("@{image-domain}/common/exChangePop.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .icon {
    width: 46px;
    height: 46px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    margin-top: 36px;
    margin-bottom: 6px;
  }
  .icon1 {
    background-image: url("@{image-domain}/card-award-one.png");
  }
  .icon2 {
    background-image: url("@{image-domain}/card-award-two.png");
  }
  .icon3 {
    background-image: url("@{image-domain}/card-award-three.png");
  }
  .icon4 {
    background-image: url("@{image-domain}/card-award-four.png");
  }
  .icon5 {
    background-image: url("@{image-domain}/card-award-five.png");
  }
  .icon6 {
    background-image: url("@{image-domain}/card-award-six.png");
  }
  .title {
    font-family: "Alibaba PuHuiTi 2.0",serif;
    font-size: 16px;
    font-weight: 500;
    color: #666666;
  }
  .tips {
    font-family: "Alibaba PuHuiTi 2.0",serif;
    font-size: 14px;
    font-weight: 500;
    color: #927749;
    margin-top: 26px;
    padding-left: 22px;
    height: 17px;
    line-height: 17px;
    position: relative;
    &::before{
      content: "";
      display: inline-block;
      width: 16px;
      height: 17px;
      background: url("@{image-domain}/common/exChangeCoin.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .btnOk {
    width: 220px;
    height: 42px;
    border-radius: 20px;
    background: linear-gradient(90deg, #EA6DC2 -4%, #FA7459 106%);
    border: 2px solid #FFC0C0;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1),inset 0 4px 10px 0 rgba(222, 255, 140, 0.3),inset 0 4px 10px 0 rgba(255, 255, 255, 0.3);

    font-family: "Alibaba PuHuiTi 2.0",serif;
    font-size: 16px;
    font-weight: bold;
    line-height: 42px;
    color: #FFFFFF;
    margin-top: 10px;
    cursor: pointer;

    &:hover {
      background: linear-gradient(90deg, #CA5BA7 -4%, #E86C52 106%), linear-gradient(90deg, #EA6DC2 -4%, #FA7459 106%);
    }
  }
  .close {
    width: 14px;
    height: 14px;
    background: url("@{image-domain}/common/exChangeClose.png") no-repeat;
    position: absolute;
    top: 30px;
    right: 36px;
  }
}
/deep/.modal-content {
  box-shadow: none;
}
@media screen and (max-width: @content-width) {
  .bg {
    width: 1276px;
    //height: 620px;
    .cards {
      padding: 164px 32px 106px;
      .card {
        width: 400px;
        height: 410px;
        background-image: url("@{image-domain}/1360/cardBg.png");
      }
    }
  }
}
</style>