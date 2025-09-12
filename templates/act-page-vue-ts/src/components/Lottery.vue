<template>
  <BaseSection title="lottery">
    <div class="bg">
      <div class="myAward" @click="handleMyAwards">我的奖品 >></div>
      <!-- NineSquareLottery 九宫格模版在main.js里注册了 -->
      <div class="pos">
        <NineSquareLottery :json="state.json.jsonDay" :lottery="handleDayLottery" :gameOverCb="handleDayGameOverCb" >
          <template #title>
            <div class="title">
              <p class="titleOne">今日消耗: <span class="myNum">{{state.todayConsumeCoinTotal}}币</span></p>
              <p class="titleTwo">每日消费100币抽奖1次，消费币数量次日将清零</p>
              <div class="btnWrap">
                <button style="width: 145px;" @click="handleExchangeDrawNum">兑换{{state.canExchangeDrawNum}}次抽奖机会</button>
              </div>
            </div>
          </template>
          <template #card="slotProps">
            <div class="cell">
              <div class="img"><img :src="slotProps.message.awardImg" alt="奖品图片" class="cardImg"></div>
              <div class="tips" v-html="slotProps.message.coinTips"></div>
            </div>
          </template>
          <template #lotteryTips>
            <p class="lotteryTips">剩余抽奖次数：{{state.coinRemainderDrawNum}}</p>
          </template>
        </NineSquareLottery>
      </div>
      <div class="pos">
        <NineSquareLottery :json="state.json.jsonCoin" :lottery="handleCoinLottery" :gameOverCb="handleCoinGameOverCb" >
          <template #title>
            <div class="title right">
              <p class="titleOne">指定套包&开通会员可抽</p>
              <p class="titleTwo">充值实付满300或开通全站&贵族年卡可获得抽奖次数</p>
              <div class="btnWrap">
                <button @click="handleCZ">去充值</button>
                <button @click="handleKT">去开通会员</button>
              </div>
            </div>
          </template>
          <template #card="slotProps">
            <div class="cell">
              <div class="img"><img :src="slotProps.message.awardImg" alt="奖品图片" class="cardImg"></div>
              <div class="tips" v-html="slotProps.message.coinTips"></div>
            </div>
          </template>
          <template #lotteryTips>
            <p class="lotteryTips">剩余抽奖次数：{{state.rechargeRemainderDrawNum}}</p>
          </template>
        </NineSquareLottery>
      </div>
    </div>
    <Modal v-model:show="state.showModal">
      <template v-if="state.modalType === 1">
        <div class="awardModal modalBg">
          <img :src="state.targetAward['awardImg']" alt="">
          <p v-html="state.targetAward['coinTips']"></p>
          <button class="btn"  @click="handleAwardModalClick(state.targetAward, true)">{{state.targetAward.awardType === 1 ? "查看" : state.targetAward.awardType === 4 ? "填地址" : "使用"}}</button>
        </div>
      </template>
      <template v-if="state.modalType === 2">
        <div class="addressModal modalBg">
          <ul>
            <li><span>收件人：</span><input class="input" :disabled="state.address.msg === '已填写'"  placeholder="请输入姓名" v-model="state.address.name"></li>
            <li><span>收件手机：</span><input class="input" :disabled="state.address.msg === '已填写'" placeholder="请输入手机号" v-model="state.address.phone"></li>
            <li><span>收件地址：</span><textarea class="textarea" :disabled="state.address.msg === '已填写'" placeholder="请输入收件地址" v-model="state.address.address"></textarea></li>
          </ul>
          <button class="addressModalBtn" :class="state.address.msg === '已填写' ? 'btnErr' : ''" @click="handleAddress">{{state.address.msg}}</button>
          <p>填写后将不可修改，请检查无误后提交</p>
        </div>
      </template>
      <template v-if="state.modalType === 3">
        <div class="awardListModal modalBg">
          <div class="awardListModalClose" @click="state.showModal = false"></div>
          <ul>
            <li v-for="(award, index) in state.awardList" :key="award.prize_log_id" class="flex-item">
              <span class="awardImg"><img :src="award.awardImg" alt=""></span>
              <p class="awardTips">{{award.prize_name}}</p>
              <button @click="handleAwardListClick(award)" class="awardBtn">{{award.awardType === 1 ? "查看" : award.awardType === 2 || award.awardType === 3 ? "使用" : !!award.receive_phone ? "已填写" : "填地址" }}</button>
            </li>
            <p class="noneTips" v-if="state.awardList.length === 0">还无奖品，快去抽奖吧</p>
          </ul>
        </div>
      </template>
    </Modal>
  </BaseSection>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue"
import Common from 'common'
import {useSc} from "@/uiux/useSc";
import {useLyk} from "@/uiux/useLyk";
import BaseSection from './Base/BaseSection.vue'
import axios from "axios";
import Modal from "@/components/Base/BaseModal.vue";

const { scTrack } = useSc()
const lyk = useLyk()
const {useUrl} = Common
const {getLykstaticUrl,getServiceUrl,getUserUrl} = useUrl()

const JSON1360 = {
  jsonDay: {
    cellNumber: 9,
    skin: {
      "bg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360/dayLotteryBg.png"),
      "block": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360/block.png"),
      "blockAct": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360//blockAct.png"),
      "lottery": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360/lottery.png"),
      "lotteryAct": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360/lotteryAct.png"),
      "bgWidth": 612,
      "bgHeight": 703,
      "blockWidth": 150,
      "blockHeight": 134,
      "lotteryWidth": 150,
      "lotteryHeight": 134,
      "awardsList": [{
        "id": 0,
        "awardId": 0,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360/award1.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      },{
        "id": 1,
        "awardId": 1,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360/award2.png"),
        "coinTips": '全站&贵族10元券',
        "awardType": 1,
      },{
        "id": 2,
        "awardId": 2,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360/award3.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      },{
        "id": 3,
        "awardId": 3,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360/award4.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      },{
        "id": 4,
        "awardId": 4,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360/award5.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      },{
        "id": 5,
        "awardId": 5,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360/award6.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      },{
        "id": 6,
        "awardId": 6,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360/award7.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      },{
        "id": 7,
        "awardId": 7,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360/award8.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      }],
    },
  },
  jsonCoin: {
    cellNumber: 9,
    skin: {
      "bg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360/coinLotteryBg.png"),
      "block": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360/block.png"),
      "blockAct": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360//blockAct.png"),
      "lottery": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360/lottery.png"),
      "lotteryAct": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360/lotteryAct.png"),
      "bgWidth": 613,
      "bgHeight": 703,
      "blockWidth": 150,
      "blockHeight": 134,
      "lotteryWidth": 150,
      "lotteryHeight": 134,
      "awardsList": [{
        "id": 0,
        "awardId": 0,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360/award1.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      },{
        "id": 1,
        "awardId": 1,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360/award2.png"),
        "coinTips": '全站&贵族10元券',
        "awardType": 1,
      },{
        "id": 2,
        "awardId": 2,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360/award3.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      },{
        "id": 3,
        "awardId": 3,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360/award4.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      },{
        "id": 4,
        "awardId": 4,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360/award5.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      },{
        "id": 5,
        "awardId": 5,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360/award6.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      },{
        "id": 6,
        "awardId": 6,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360/award7.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      },{
        "id": 7,
        "awardId": 7,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1360/award8.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      }],
    },
  }
}

const JSON1920 = {
  jsonDay: {
    cellNumber: 9,
    skin: {
      "bg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920/dayLotteryBg.png"),
      "block": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920/block.png"),
      "blockAct": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920//blockAct.png"),
      "lottery": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920/lottery.png"),
      "lotteryAct": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920/lotteryAct.png"),
      "bgWidth": 667,
      "bgHeight": 703,
      "blockWidth": 172,
      "blockHeight": 134,
      "lotteryWidth": 172,
      "lotteryHeight": 134,
      "awardsList": [{
        "id": 0,
        "awardId": 0,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920/award1.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      },{
        "id": 1,
        "awardId": 1,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920/award2.png"),
        "coinTips": '全站&贵族10元券',
        "awardType": 1,
      },{
        "id": 2,
        "awardId": 2,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920/award3.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      },{
        "id": 3,
        "awardId": 3,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920/award4.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      },{
        "id": 4,
        "awardId": 4,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920/award5.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      },{
        "id": 5,
        "awardId": 5,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920/award6.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      },{
        "id": 6,
        "awardId": 6,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920/award7.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      },{
        "id": 7,
        "awardId": 7,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920/award8.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      }],
    },
  },
  jsonCoin: {
    cellNumber: 9,
    skin: {
      "bg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920/coinLotteryBg.png"),
      "block": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920/block.png"),
      "blockAct": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920//blockAct.png"),
      "lottery": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920/lottery.png"),
      "lotteryAct": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920/lotteryAct.png"),
      "bgWidth": 667,
      "bgHeight": 703,
      "blockWidth": 172,
      "blockHeight": 134,
      "lotteryWidth": 172,
      "lotteryHeight": 134,
      "awardsList": [{
        "id": 0,
        "awardId": 0,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920/award1.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      },{
        "id": 1,
        "awardId": 1,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920/award2.png"),
        "coinTips": '全站&贵族10元券',
        "awardType": 1,
      },{
        "id": 2,
        "awardId": 2,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920/award3.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      },{
        "id": 3,
        "awardId": 3,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920/award4.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      },{
        "id": 4,
        "awardId": 4,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920/award5.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      },{
        "id": 5,
        "awardId": 5,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920/award6.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      },{
        "id": 6,
        "awardId": 6,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920/award7.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      },{
        "id": 7,
        "awardId": 7,
        "awardImg": getLykstaticUrl("liuyunku/application/packages/year25/public/lottery/1920/award8.png"),
        "coinTips": '<span class="num">88</span>下载币',
        "awardType": 1,
      }],
    },
  }
}

const mediaQuery = window.matchMedia('(max-width: 1600px)');
const media = ref(1920)
const state = reactive({
  json: handleMediaQueryInit(mediaQuery),
  todayConsumeCoinTotal:0, //今日消耗币总数 (左)
  canExchangeDrawNum:0,//可兑换抽奖次数
  coinRemainderDrawNum:0, //消耗币_剩余抽奖次数（左侧抽奖）
  rechargeRemainderDrawNum:0,//充值_剩余抽奖次数（右侧抽奖）
  prizeId: 1, // 奖品id
  prizeLogId: 8, //奖品记录id
  showModal: false, //显示模态框
  modalType: 1, // 1 中奖， 2 填写地址， 3， 我的奖品
  targetAward: null, // 奖品
  address: {
    name: "",
    phone: "",
    address: "",
    msg: "提交地址"
  },// 地址
  awardList: [],// 奖品列表
})

// 列表装换
function transformPrizeList(coinDrawPrizeList,size) {
  const awardImages = {
    1: ["award1.png"], // 下载币
    2: ["award2.png"], // 贵族充值券
    3: ["award3.png","award4.png"], // 币种充值券
    4: ["award5.png","award6.png","award7.png","award8.png"], // 实物奖品
  };

  return coinDrawPrizeList.map((prize, index) => {
    let awardImg, coinTips;

    // 根据 prize_type 设置图片和描述
    if (prize.prize_type === 1) {
      awardImg = getLykstaticUrl(`liuyunku/application/packages/year25/public/lottery/${size}/${awardImages[1][0]}`);
      coinTips = `<span class="num">${prize.prize_value}</span>下载币`;
    } else if (prize.prize_type === 2) {
      awardImg = getLykstaticUrl(`liuyunku/application/packages/year25/public/lottery/${size}/${awardImages[2][0]}`);
      coinTips = `${prize.prize_name}`;
    } else if (prize.prize_type === 3) {
      awardImg = getLykstaticUrl(`liuyunku/application/packages/year25/public/lottery/${size}/${prize.prize_name.indexOf("10元券") != -1 ? awardImages[3][0] : awardImages[3][1]}`);
      coinTips = `${prize.prize_name}`;
    } else if (prize.prize_type === 4) {
      awardImg = getLykstaticUrl(`liuyunku/application/packages/year25/public/lottery/${size}/${prize.prize_name.indexOf("联名鼠标垫") != -1 ? awardImages[4][0] : prize.prize_name.indexOf("无线鼠标") != -1 ? awardImages[4][1] : prize.prize_name.indexOf("抱枕") != -1 ? awardImages[4][2] : awardImages[4][3]}`);
      coinTips = `${prize.prize_name}`;
    }

    return {
      id: index,
      awardId: prize.prize_id,
      awardImg: awardImg,
      coinTips: coinTips,
      awardType: prize.prize_type,
      prize_name: prize?.prize_name || "",
      prize_log_id: prize?.prize_log_id || "",
      receive_user: prize?.receive_user || "",
      receive_phone: prize?.receive_phone || "",
      receive_address: prize?.receive_address || "",
    };
  });
}

const init = async () => {
  state.showModal = false

  const { data: { status, data } } = await axios.post(getServiceUrl('/api/v1/lyk/twelve_anniversary_draw_activity/getPageInfo'),{},{
    withCredentials: true, // 确保请求中携带 cookies
  });

  if (status === 1) {
    const coinDrawPrizeList = data.coin_draw_prize_list;
    const rechargeDrawPrizeList = data.recharge_draw_prize_list
    // 调用转换函数
    JSON1920.jsonDay.skin.awardsList = transformPrizeList(coinDrawPrizeList, 1920);
    JSON1360.jsonDay.skin.awardsList = transformPrizeList(coinDrawPrizeList, 1360);
    JSON1920.jsonCoin.skin.awardsList = transformPrizeList(rechargeDrawPrizeList, 1920);
    JSON1360.jsonCoin.skin.awardsList = transformPrizeList(rechargeDrawPrizeList, 1360);
    // 赋值
    media.value === 1920 ? state.json = JSON.parse(JSON.stringify(JSON1920)) : state.json = JSON.parse(JSON.stringify(JSON1360));
    state.todayConsumeCoinTotal = data.today_consume_coin_total; //今日消耗币总数
    state.canExchangeDrawNum = data.can_exchange_draw_num; //可兑换抽奖次数
    state.coinRemainderDrawNum = data.coin_remainder_draw_num; //消耗币_剩余抽奖次数（左侧抽奖）
    state.rechargeRemainderDrawNum = data.recharge_remainder_draw_num; //充值_剩余抽奖次数（右侧抽奖）
  }
}

// 活动信息
onMounted(async ()=>{
  await init()
})

// 左侧抽奖
const lottery = async (draw_source, cb) => {
  const { data: { status, data, msg } } = await axios.post(getServiceUrl('/api/v1/lyk/twelve_anniversary_draw_activity/draw'),{
    draw_source
  },{
    withCredentials: true, // 确保请求中携带 cookies
  });

  if (status === 1) {
    state.prizeId = data.prize_id
    state.prizeLogId = data.prize_log_id
    state.targetAward = draw_source === 1 ? state.json.jsonDay.skin.awardsList.find(award => award.awardId === state.prizeId) : state.json.jsonCoin.skin.awardsList.find(award => award.awardId === state.prizeId);
    cb(state.targetAward.id)
  }else {
    layer.msg(msg)
  }
}
const handleDayLottery = async (cb, err) => {
  scTrack("Lyk12zhounianqingClick", {"zhounianqing_click_section": [1, 'number']})
  await lottery(1, cb)
}
const handleDayGameOverCb = async () => {
  state.modalType = 1
  state.showModal = true
  state.coinRemainderDrawNum--
}
// 右侧抽奖
const handleCoinLottery = async (cb, err) => {
  scTrack("Lyk12zhounianqingClick", {"zhounianqing_click_section": [2, 'number']})
  await lottery(2,cb)
}
const handleCoinGameOverCb = async () => {
  state.modalType = 1
  state.showModal = true
  state.rechargeRemainderDrawNum--
}
// 中奖后续
const handleAwardModalClick = async (award , init) => {
  if(+award.awardType === 1){// 个人中心
    lyk.withLyk("OpenUrl", getUserUrl("asset/index/list?new=1"))
    init && await init()
  }else if(+award.awardType === 4){

    if(award.receive_phone === ""){
      state.address.msg = "提交地址"
      state.address.address = ""
      state.address.phone = ""
      state.address.name = ""
    }else {
      state.address.msg = "已填写"
      state.address.address = award.receive_address
      state.address.phone = award.receive_phone
      state.address.name = award.receive_user
    }
    state.modalType = 2
  }else if(+award.awardType === 2){// 会员充值
    lyk.withLyk('lykOperation', 'lyk4://OpenCharge|{"type":1,"page":2,"activate_source":0}')
    init && await init()
  }else {// 币种充值
    lyk.withLyk('lykOperation', 'lyk4://OpenCharge|{"type":0,"page":0,"activate_source":0}')
    init && await init()
  }
}
const handleAddress = async () => {

  /**
   * 规则说明：
   * 1、可以是1开头的11位数字（手机号）
   * 2、可以是“区号-电话号-分机号”或者是“(区号)电话号-分机号”格式
   * 3、区号是0开头的3～4位数字，可以没有区号
   *
   * 4、电话号是5～8位数字，不能以0开头
   * 5、分机号是1～8位数字，可以没有分机号
   *
   * 合法数据示例：
   * 13812341234
   * 010-12345678
   * (0432)1234567-1234
   */
  state.address.address = state.address?.address?.trim()
  state.address.phone = state.address?.phone?.trim()
  state.address.name = state.address?.name?.trim()
  const regex = new RegExp("^1\\d{10}$|^(0\\d{2,3}-?|\\(0\\d{2,3}\\))?[1-9]\\d{4,7}(-\\d{1,8})?$");
  if(!regex.test(state.address?.phone)){
    layer.msg("手机号格式不对")
    return
  }
  if(state.address?.name === ""){
    layer.msg("收件人不能为空")
    return
  }
  if(state.address?.address === ""){
    layer.msg("收件地址不能为空")
    return
  }
  if(state.address?.msg === '已填写'){
    return
  }

  const { data: { status, data, msg } } = await axios.post(getServiceUrl('/api/v1/lyk/twelve_anniversary_draw_activity/savePrizeAddress'),{
    prize_log_id: state.prizeLogId,
    receive_user: state.address.name,
    receive_phone: state.address.phone,
    receive_address: state.address.address,
  },{
    withCredentials: true, // 确保请求中携带 cookies
  });

  if(status === 1){
    layer.msg("提交成功")
    state.address.msg = "已提交"
    await init()
  }else {
    layer.msg(msg)
  }
}

// 我的奖品
const handleMyAwards = async () => {
  scTrack("Lyk12zhounianqingClick", {"zhounianqing_click_section": [6, 'number']})
  const { data: { status, data, msg } } = await axios.post(getServiceUrl('/api/v1/lyk/twelve_anniversary_draw_activity/getUserPrize'),{
    page: 1,
    page_size: 100,
  },{
    withCredentials: true, // 确保请求中携带 cookies
  });
  if(status === 1){
    state.awardList = transformPrizeList(data,1920);
    state.modalType = 3
    state.showModal = true
  }else {
    layer.msg(msg)
  }
}
const handleAwardListClick = (award) => {
  state.isShow = false
  state.prizeLogId = award.prize_log_id
  handleAwardModalClick(award,false)
}
// 兑次数
const handleExchangeDrawNum =async () => {
  scTrack("Lyk12zhounianqingClick", {"zhounianqing_click_section": [3, 'number']})
  const { data: { status, data, msg } } = await axios.post(getServiceUrl('/api/v1/lyk/twelve_anniversary_draw_activity/exchangeDrawNum'),{},{
    withCredentials: true, // 确保请求中携带 cookies
  });
  if(status === 1){
    layer.msg("兑换成功")
    await init()
  }else {
    layer.msg(msg)
  }

}
const handleCZ = () => {
  scTrack("Lyk12zhounianqingClick", {"zhounianqing_click_section": [4, 'number']})
  lyk.withLyk('lykOperation', 'lyk4://OpenCharge|{"type":0,"page":0,"activate_source":0}')
}
const  handleKT = () => {
  scTrack("Lyk12zhounianqingClick", {"zhounianqing_click_section": [5, 'number']})
  lyk.withLyk('lykOperation', 'lyk4://OpenCharge|{"type":1,"page":2,"activate_source":0}')
}


// 屏幕适配
function handleMediaQueryChange(event) {
  if (event.matches) {
    state.json = JSON1360
    media.value = 1360
  } else {
    state.json = JSON1920
    media.value = 1920
  }
}
mediaQuery.addEventListener("change",handleMediaQueryChange);

function handleMediaQueryInit(event) {
  if (event.matches) {
    media.value = 1360
    return JSON1360
  } else {
    media.value = 1920
    return JSON1920
  }
}

</script>

<style scoped lang="less">
@font: "Alibaba PuHuiTi 2.0", serif;
@content-width: 1600px;
@image-domain: "https://lykstatic.3d66.com/liuyunku/application/packages/year25/src/assets/img";
.bg{
  width: 1576px;
  height: 956px;
  border-radius: 60px;
  overflow: hidden;
  background: #ffffff;
  position: relative;
  display: flex;
  justify-content: center;
  gap: 74px;
  .myAward {
    position: absolute;
    right: 40px;
    top: 40px;
    width: 132px;
    height: 36px;
    border-radius: 6px;
    background: #F0F0F0;
    color: #666666;
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    line-height: 38px;
    padding-left: 30px;
    cursor: pointer;
    &::before {
      content: "";
      width: 20px;
      height: 20px;
      background: url("@{image-domain}/myAward.png") no-repeat;
      position: absolute;
      top: 7px;
      left: 9px;
    }
  }
  .pos {
    width: 668px;
    height: 704px;
    margin-top: 166px;
    .title {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 70px;
      .titleOne {
        font-family: YouSheBiaoTiHei,serif;
        font-size: 24px;
        font-weight: normal;
        line-height: 23px;
        color: #B9745D;
        margin-top: 18px;
        .myNum {
          color: #FF432C
        }
      }
      .titleTwo {
        margin-top: 5px;
        font-family: @font;
        font-size: 14px;
        font-weight: 500;
        line-height: 14px;
        text-align: center;
        color: #B9745D;
      }
      .btnWrap {
        position: absolute;
        top: 17px;
        right: 66px;
        display: flex;
        justify-content: center;
        gap: 10px;
        button {
          height: 38px;
          border-radius: 330px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          background: #EE5931;
          border: 1px solid #FCA220;
          box-shadow: inset 0 4px 10px 0 rgba(255, 255, 255, 0.3);

          text-align: center;
          color: #FFFFFF;
          font-family: "Alibaba PuHuiTi 2.0", serif;
          font-size: 14px;
          font-weight: 500;
          line-height: 14px;

          &:nth-child(1) {
            width: 79px;
          }
          &:nth-child(2) {
            width: 96px;
          }
        }
      }
      &.right {
        .titleOne{
          color: #FFFFFF;
        }
        .titleTwo{
          color: #FFFFFF;
        }
        button {
          background: #EE8631;
          box-shadow: inset 0 4px 10px 0 rgba(255, 255, 255, 0.3);
        }
      }
    }
    .lotteryTips {
      font-family: @font;
      font-size: 14px;
      font-weight: 500;
      color: #EC7313;
      margin-top: 76px;
    }
    .cell {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .img {
        width: 100%;
        height: 100px;
        position: relative;
        img {
          max-height: 84px;
          max-width: 140px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
      }
      .tips {
        font-family: @font;
        font-size: 14px;
        font-weight: 500;
        color: #B9745D;
      }
    }
  }
}
.modalBg {
  width: 500px;
  height: 520px;
  background: url("@{image-domain}/common/awardModalBg.png") no-repeat;
}
.awardModal {
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin-top: 205px;
  }
  p{
    margin-top: 30px;
    font-family: @font;
    font-size: 18px;
    font-weight: bold;
    color: #B9745D;
  }
  button {
    margin-top: 84px;
    width: 120px;
    height: 48px;
    border-radius: 264px;
    background: url("@{image-domain}/common/modalBtn.png") no-repeat;
    &:hover {
      background: url("@{image-domain}/common/modalBtnAct.png") no-repeat;
    }
  }
}
.awardListModal {
  width: 500px;
  height: 564px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url("@{image-domain}/common/myAwardBg.png") no-repeat;
  position: relative;
  padding-top: 118px;
  padding-bottom: 56px;
  padding-right: 8px;
  .awardListModalClose {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 20px;
    right: 20px;
    cursor: pointer;
    background: url("@{image-domain}/common/adressModalClose.png") no-repeat center;
  }
  ul {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    .noneTips {
      padding-left: 20px;
      color: #666666;
    }
    &::-webkit-scrollbar {
      /* 滚动条整体样式 */
      width: 8px; /* 高宽分别对应横竖滚动条的尺寸 */
      height: 80px;
    }
    &::-webkit-scrollbar-thumb {
      /* 滚动条里面小方块 */
      background: #F0F0F0;
      border-radius: 10px;
    }
    li {
      margin-top: 15px;
      width: 420px;
      height: 120px;
      border-radius: 20px;
      background: #FFF5F5;
      border: 1px solid rgba(255, 255, 255, 0.5);

      display: flex;
      align-items: center;
      .awardImg {
        width: 80px;
        height: 80px;
        border-radius: 10px;
        background: #EAD0CF;
        overflow: hidden;
        margin-left: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .awardTips {
        width: 196px;
        font-family: @font;
        font-size: 18px;
        font-weight: bold;
        line-height: normal;
        text-align: center;
        color: #B9745D;
        margin-left: 10px;
      }
      .awardBtn {
        width: 100px;
        height: 48px;
        border-radius: 50px;
        background: linear-gradient(91deg, #EA6DC2 -4%, #FA7459 105%);
        border: 1px solid #FFC0C0;
        box-shadow: inset 0 4px 10px 0 rgba(255, 255, 255, 0.6);
        color: #fff;
      }
    }
  }
}
.addressModal {
  width: 500px;
  height: 564px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url("@{image-domain}/common/adressModalBg.png") no-repeat;
  position: relative;
  .addressModalClose {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 20px;
    right: 20px;
    cursor: pointer;
    background: url("@{image-domain}/common/adressModalClose.png") no-repeat center;
  }
  li {
    display: flex;
    justify-content: center;
    span{
      display: inline-block;
      width: 100px;
      height: 50px;
      font-family:@font;
      font-size: 18px;
      font-weight: 500;
      line-height: 50px;
      color: #333333;
    }
    .input {
      width: 351px;
      height: 50px;
      border-radius: 6px;
      background: #FFF5F5;
      border: 1px solid #FFC5C7;
      color: black;
      padding: 10px;
      margin-bottom: 10px;
      font-size: 14px;
    }
    .textarea {
      width: 351px;
      height: 149px;
      border-radius: 6px;
      background: #FFF5F5;
      border: 1px solid #FFC5C7;
      padding: 10px;
      color: black;
      margin-bottom: 10px;
      font-size: 14px;
    }
    &:first-child {
      margin-top: 126px;
    }
  }
  .addressModalBtn {
    margin-top: 40px;
    padding: 0;

    width: 140px;
    height: 48px;
    line-height: 48px;
    border-radius: 264px;
    background: linear-gradient(90deg, #EA6DC2 -4%, #FA7459 105%);
    border: 1px solid #FFC0C0;
    box-shadow: inset 0px 4px 10px 0px rgba(255, 255, 255, 0.6);

    font-family: @font;
    font-size: 24px;
    font-weight: 500;
    color: #FFFFFF;
    &:hover {
      background: linear-gradient(91deg, #CA5BA7 -4%, #E86C52 105%);
    }
  }
  p {
    margin-top: 20px;
    font-family: @font;
    font-size: 16px;
    font-weight: 500;
    line-height: 18px;
    color: #999999;
  }
}
@media screen and (max-width: @content-width) {
  .bg {
    width: 1276px;
    height: 890px;
    gap: 0;
    padding-left: 16px;
    .pos {
      .title {
        .btnWrap {
          gap: 6px;
          button {
            padding: 0 !important;
            &:nth-child(1) {
              width: 60px;
            }
            &:nth-child(2) {
              width: 90px;
            }
          }
        }
      }
    }
  }
}
.btnErr {
  background: linear-gradient(90deg, rgba(234, 109, 194, 0.5) -4%, rgba(250, 116, 89, 0.5) 105%) !important;
}
.btn {
  color: #FFFFFF;
  font-family: "Alibaba PuHuiTi 2.0", serif;
}

</style>