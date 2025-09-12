<script setup lang="ts">
import {onMounted, watchEffect, ref, reactive, nextTick, onBeforeUnmount} from "vue";
import Debug from '@/components/Debug/Debug.vue';
import {useSc} from "@/uiux/useSc";
import Common from 'common';
import Side from "@/components/Side.vue";
import Tab from "@/components/Tab.vue";
import PayPanel from "@/components/PayPanel/index.vue";
import { eventBus } from "@/components/EventBus";
import { useLyk } from "@/uiux/useLyk"
import BaseBg from "@/components/Base/BaseBg.vue";
import {getPage} from "@/data/service/pageService";
import {getPackage} from "@/data/service/packageService";
import {useGlobalProperties} from "@/data/useGlobalProperties";
import {Page} from "@/data/adapter/pageData";
import {Package} from '@/data/adapter/packageData';
import {useImageDb} from "@/data/indexDB/imageDB";
import {useWindowBridge} from "win-bridge";
import Countdown from "vue-countdown-plugin";
import {POP_BUTTON, NAV_CATEGORY, NAV_CATEGORY_CHILD} from "@/buried/buried_config_all"

// public
const newNavIds = [8, 9, 10];
const {callExternalMethod} = useWindowBridge()
const {$imageDomain, $popup, $debug} = useGlobalProperties()
const { scTrack } = useSc()
const lyk = useLyk();
const {useUrl, usePreloadImg} = Common
const {getQueryVariable, getServiceUrl} = useUrl()

// private
const baseBgRef = ref<string>('');
const sideRef = ref<Page["side"]>([]);
const sideIdRef = ref<number>(1);
const sideNameRef = ref<string>('');
const tabRef = ref<Page["side"][number]["tab"]>([]);
const packageRef = ref<Package["package"]>([]);
const packageIdRef = ref<number>(10);
const rightsRef = ref<Package["rights"]>([]);
const channelRef = ref<number>(0);
const payListRef = ref<Package["pay_type_list"]>([]);
const basePayInfoRef = ref<Package["base_pay_info"]|null>(null);
const moreBenefitsUrlRef = ref<Package["more_benefits_url"]>("");
const loadedOnceRef = ref<boolean>(false);
const upgradeOnceRef = ref<boolean>(false);
const strategyIdRef = ref<number|undefined>(undefined);
const alertsRef = ref<string | undefined>('');
const upgradeInfoRef = ref<Package["upgrade_info"]|null>(null);
const status = reactive<{user_info: Page["user_info"], vip_info: string, actCountdown: {show: number, time: number, slogan: string}}>({
  user_info: {
    user_id: 0,
    nick_name: "",
    user_img: "",
  },
  vip_info: "",
  actCountdown: {
    show: 0,
    time: 10000,
    slogan: '春季大促：年卡额外再送 30 天'
  }
})

// fn
const ElementClick = (params: string) => {
  callExternalMethod("ElementUserBehavior", params)
};
enum VipType {
  "ll_vip" = 10, // 66大会员
  "base_res_noble" = 8, // 基础素材会员
  "super_res_noble" = 9, // 高级素材会员
  "xuanran_noble" = 3,
  "base_vr_vip" = 5,
  "large_capacity_vr_vip" = 6,
  "ai_vip" = 7,
  "zixue_noble" = 4
}
const ORDER_TEXT = "66大会员>>超级素材会员>>基础素材会员";
type VipRole = {
  self: string;
  others: { key: string; label: string; weight: 1 | -1 }[];
};
const handleAlerts = (
  vipInfo: Package["vip_info"],
  productId: VipType
): string | undefined => {
  if (!vipInfo) return;

  const roles: Record<VipType, VipRole> = {
    [VipType.ll_vip]: {
      self: "66大会员",
      others: [
        { key: "is_super_res_noble", label: "超级素材会员", weight: -1 },
        { key: "is_base_res_noble", label: "基础素材会员", weight: -1 },
      ],
    },
    [VipType.base_res_noble]: {
      self: "基础素材会员",
      others: [
        { key: "is_ll_vip", label: "66大会员", weight: 1 },
        { key: "is_super_res_noble", label: "超级素材会员", weight: 1 },
      ],
    },
    [VipType.super_res_noble]: {
      self: "超级素材会员",
      others: [
        { key: "is_ll_vip", label: "66大会员", weight: 1 },
        { key: "is_base_res_noble", label: "基础素材会员", weight: -1 },
      ],
    },
    [VipType.xuanran_noble]: {
      self: "渲染贵族",
      others: [],
    },
    [VipType.base_vr_vip]: {
      self: "全景VIP",
      others: [],
    },
    [VipType.large_capacity_vr_vip]: {
      self: "大容量VIP",
      others: [],
    },
    [VipType.ai_vip]: {
      self: "AI大会员",
      others: [],
    },
    [VipType.zixue_noble]: {
      self: "自学贵族",
      others: [],
    }
  };

  const role = roles[productId];
  if (!role.others.length) return;

  const activeOthers = role.others.filter(o => (vipInfo as any)[o.key]);

  // 三个都有：固定顺序
  if (activeOthers.length === 2) {
    return `购买后将按 ${ORDER_TEXT} 的顺序依次生效权益`;
  }

  // 只有一个：根据 weight 判断优先/备用
  if (activeOthers.length === 1) {
    const other = activeOthers[0];
    const first = other.weight === 1 ? other.label : role.self;
    const second = other.weight === 1 ? role.self : other.label;

    return `购买后优先使用${first}权益，未使用的${second}权益将在前者到期后，继续生效`;
  }
};
const handleVipInfo = (vipInfo: Package["vip_info"], productId: VipType) => {
  if(vipInfo){
    let str = ''
    switch (productId) {
      case VipType.ll_vip: // 大会员
        if(vipInfo.is_ll_vip){
          str = `当前拥有大会员：剩余${vipInfo.ll_vip_remainder_days}天`
        }
        break;
      case VipType.base_res_noble: // 基础素材会员
        if(vipInfo.is_base_res_noble){
          str = `当前拥有基础素材会员：剩余${vipInfo.base_res_noble_remainder_days}天`
        }
        break;
      case VipType.super_res_noble:// 超级素材会员
        if(vipInfo.is_super_res_noble){
          str = `当前拥有超级素材会员：剩余${vipInfo.super_res_noble_remainder_days}天`
        }
        break;
      case VipType.xuanran_noble:// 渲染贵族
        if(vipInfo.is_xuanran_noble){
          str = `当前拥有渲染贵族：剩余${vipInfo.xuanran_noble_remainder_days}天`
        }
        break;
      case VipType.base_vr_vip:// 全景VIP
        if(vipInfo.is_base_vr_vip){
          str = `当前拥有全景VIP：剩余${vipInfo.base_vr_vip_remainder_days}天`
        }
        break;
      case VipType.large_capacity_vr_vip:// 大容量VIP
        if(vipInfo.is_large_capacity_vr_vip){
          str = `当前拥有大容量VIP：剩余${vipInfo.large_capacity_vr_vip_remainder_days}天`
        }
        break;
      case VipType.ai_vip:// AI大会员
        if(vipInfo.is_ai_vip){
          str = `当前拥有AI大会员：剩余${vipInfo.ai_vip_remainder_days}天`
        }
        break;
      case VipType.zixue_noble:// 自学贵族
        if(vipInfo.is_zixue_noble){
          str = `当前拥有自学贵族：剩余${vipInfo.zixue_noble_remainder_days}天`
        }
        break;
      default:
        console.log("未识别的产品ID");
    }
    status.vip_info = str
  }
}
const MemberTypeMap: Record<number, number> = {
  3: 3,  // 渲染贵族
  4: 4,  // 自学贵族
  10: 7, // 66大会员
  8: 8,  // 基础素材会员
  9: 9,  // 超级素材会员
  5: 10, // 全景VIP
  6: 11, // 全景大容量VIP
  7: 12  // AI大会员
};
const handleTrack = (_product_id: number, strategy_id: number|undefined) => {
  scTrack("LykMemberVisited", {
      asset_type: [1, 'number'],
      activate_source: [Number(getQueryVariable("activate_source")) || 0, 'number'],
      member_type: [MemberTypeMap[_product_id], 'number'],
      member_version_type: [2, 'number'],
      ...(strategy_id !== undefined && {list_user_tag: [[strategy_id], 'array']}),
  });
}
const formatUpgradeContent = (packageInfo: Package, imageDomain: string): string => {
  const { deduction_all_vip = 0, deduction_sc_vip = 0, deduction_lg_vip = 0, upgrade_deduction_price = 0 } =
    packageInfo.upgrade_info || {};

  // 整理权益
  const rights: string[] = [];
  if (deduction_all_vip) rights.push("全站vip");
  if (deduction_sc_vip) rights.push("素材贵族");
  if (deduction_lg_vip) rights.push("灵感PLUS会员");

  // 用顿号拼接
  const rightsText = rights.join("、");

  // 三种权益都存在就不换行，否则加 <br/>
  const needBreak = deduction_all_vip && deduction_sc_vip && deduction_lg_vip ? "," : "<br/>";

  // 拼接内容
  return `
    <img src='${imageDomain}/upgrade.png' alt='弹窗'>
    <div class='wrap'>
      <div class='text'>
        您当前的会员权益包含：
        <span class="redflag">${rightsText}</span>
        ${needBreak}
        旧权益可为您抵扣：
        <span class="redflag">${upgrade_deduction_price}元</span>，欢迎升级~
      </div>
    </div>
  `;
}


// init
const componentName = "Init"
onMounted(async () => {
  const pageInfo = await getPage();

  if (pageInfo) {
    const { user_info, side } = pageInfo;
    status.user_info = user_info;
    sideRef.value = side;

    const _productId = Number(getQueryVariable("product_id"));
    const _navId = Number(getQueryVariable("nav_id"));

    const currentSide = side.find(item => item.key === (_productId
      ? side.find(sideItem =>
        sideItem.tab?.some(tab => tab.key === _productId)
      )?.key
      : _navId || side[0].key)) || side[0];
    const productId = _productId || (currentSide.key === 2 ? currentSide.tab[1].key : currentSide.tab[0].key); // 默认选第一个 tab

    tabRef.value = currentSide.tab;
    await nextTick(() => {
      eventBus.publishFilter(componentName, {
        nav_id: currentSide.key,
        product_id: productId,
      });
      callExternalMethod("BrowserFinished") // 通知客户端页面加载完毕
    });
  }
});

// end => render
declare const __APP_Name__: string;
const {getImage,closeDB} = useImageDb();
const loadImage = async (key: string) => {
  const blob = await getImage(`${__APP_Name__}_bg_${key}`);
  if (blob) {
    return URL.createObjectURL(blob);
  } else {
    return `${$imageDomain}/bg${key}.png`;
  }
}

const collectResults = ref<{nav_id: number, product_id: number}>({nav_id: 0, product_id: 0});
let prevNavId: number = collectResults.value.nav_id
let prevProductId: number = collectResults.value.product_id
watchEffect(async () => {
  collectResults.value = eventBus.getCollectResults();

  // 渲染主题
  if (collectResults.value.nav_id !== prevNavId) {
    prevNavId = collectResults.value.nav_id

    const _side = sideRef.value.find(item => (item.key === collectResults.value.nav_id))
    if(collectResults.value.nav_id >= 0 && sideRef.value.length > 0 && _side){
      baseBgRef.value = await loadImage(collectResults.value.nav_id.toString())
      tabRef.value = _side["tab"];
      sideNameRef.value = _side["name"];
      sideIdRef.value = collectResults.value.nav_id; // “已优惠”主题色
    }
  }

  // 渲染支付内容(getPackage)
  if(collectResults.value.product_id >= 0){
    const packageInfo = await getPackage(collectResults.value.product_id)
    if(packageInfo) {
      rightsRef.value = packageInfo.rights || [];
      channelRef.value = packageInfo.base_pay_info.cz_coupon_channel || 0; // 渠道参数
      payListRef.value = packageInfo.pay_type_list || []; // 支付类型
      basePayInfoRef.value = packageInfo.base_pay_info || null; // 支付参数
      moreBenefitsUrlRef.value = packageInfo.more_benefits_url || "";
      packageRef.value = packageInfo.package || [];
      handleVipInfo(packageInfo.vip_info, collectResults.value.product_id); // 渲染vip信息
      alertsRef.value = handleAlerts(packageInfo.vip_info, collectResults.value.product_id); // 渲染高买低提示
      upgradeInfoRef.value = !newNavIds.includes(collectResults.value.product_id) ? null : packageInfo.upgrade_info; // 旧权益抵扣
    }

    // LykMemberVisited埋点(eg: 66大会员开通页——【切换】素材超级会员开通页，需上报66大会员开通页访问枚举，以及超级会员开通页访问枚举)
    if (collectResults.value.product_id !== prevProductId) {
      prevProductId = collectResults.value.product_id;

      strategyIdRef.value = packageInfo?.strategy_id;
      handleTrack(collectResults.value.product_id, packageInfo?.strategy_id);
    }

    // once 页面首次加载
    if(!loadedOnceRef.value){
      loadedOnceRef.value = true;
    }

    // once 折扣券弹窗（弹出时机：存在折扣信息,而且没弹出过）
    if(packageInfo && packageInfo?.upgrade_info && !upgradeOnceRef.value){
      upgradeOnceRef.value = true;
      if(packageInfo?.upgrade_info && packageInfo?.upgrade_info?.upgrade_deduction_price>0) {
        $popup.open({
          type: "html",
          id: "upgrade",
          showClose: true,
          content: formatUpgradeContent(packageInfo, $imageDomain),
          close: (type: string) => console.log(type),
        });
      }
    }
  }
});
onBeforeUnmount(()=>{
  closeDB()
})
const handleUpdatedPackageId = (newPackageId: number) => {
  packageIdRef.value = newPackageId;
}
const handleClose = () => {
  setTimeout(()=>{
    ElementClick(POP_BUTTON[1])
    callExternalMethod("MemberRetain", collectResults.value.product_id, packageIdRef.value)
    callExternalMethod("CloseLykWindow")
  },100)
}
const handleActCDFinish = () => {
  status.actCountdown.show = 0
}
</script>

<template>
  <BaseBg :width="1000" :height="620" :url="baseBgRef">
    <div class="appContainer">
      <!-- 头部 -->
      <div class="header">
        <div class="infoWrap">
          <img class="user" :src="status.user_info.user_img" alt="">
          <span class="userName">{{status.user_info.nick_name}}<span>（ID：{{status.user_info.user_id}}）</span></span>
          <span v-if="status.vip_info" class="vipInfo">{{status.vip_info}}</span>
        </div>
        <!--  活动倒计时  -->
        <Countdown keyName="actCountdown" :end="Date.now() + status.actCountdown.time" :onFinish="handleActCDFinish">
          <template #default="{ time }">
            <div class="actCountdown" v-show="!!status.actCountdown.show">
              <div class="timer">
                <span class="time">{{ time.split(",")[0] }}</span>天<span class="time">{{time.split(",")[1]}}</span>:<span class="time">{{time.split(",")[2]}}</span>:<span class="time">{{time.split(",")[3]}}</span><span v-html="status.actCountdown.slogan"></span>
              </div>
            </div>
          </template>
        </Countdown>
        <span class="close" @click="handleClose"></span>
      </div>
      <!-- 活动 -->
      <div class="app-content">
        <div class="wrap">
          <div class="sidebar-left">
            <!-- 侧边栏 -->
            <Side :side="sideRef" />
          </div>
          <div class="main-content">
            <!-- tab栏 -->
            <aside class="tabBar">
              <Tab :tab="tabRef" :side="sideRef" />
            </aside>
            <!-- 支付信息 -->
            <aside class="payInfoPanel">
              <PayPanel
                :packages="packageRef"
                :rights="rightsRef"
                :sideId="sideIdRef"
                :sideName="sideNameRef"
                :channel="channelRef"
                :payList="payListRef"
                :basePayInfo="basePayInfoRef"
                :moreBenefitsUrl ="moreBenefitsUrlRef"
                :strategyId="strategyIdRef"
                :alerts="alertsRef"
                :upgradeInfo="upgradeInfoRef"
                @update-package-id="handleUpdatedPackageId"
              />
            </aside>
          </div>
        </div>
      </div>
      <!-- 尾部 -->
      <template v-if="$debug === 'true'">
        <Debug />
        <div class="footer">
          <span>Parameters:&nbsp;&nbsp;</span>
          <span>{{JSON.stringify(collectResults)}}</span>
        </div>
      </template>
    </div>
  </BaseBg>
</template>

<style scoped lang="less">
@app-w: 1000px;
@app-h: 620px;
@app-content-w: 940px;
@app-content-h: 494px;
@app-sidebar-left-w: 161px;
@app-sidebar-left-h: 100%;
@app-sidebar-content-w: 779px;
@app-sidebar-content-h: 100%;

.appContainer {
  width: @app-w;
  height: @app-h;
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
  border-radius: 20px;
}

// 活动
.header {
  width: 100%;
  height: 81px;
  padding: 0 30px;
  gap: 8px;
  position: relative;
  .infoWrap {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 20px;
    .user {
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 15px;
      background: #fff;
    }
    .userName {
      font-size: 14px;
      font-weight: 500;
      color: #FFFFFF;
      span {
        color: #999999;
      }
    }
    .vipInfo {
      font-size: 14px;
      font-weight: 500;
      line-height: normal;
      color: #FFCE7B;
    }
  }
  .close {
    width: 40px;
    height: 37px;
    background: url("@{image-domain}/close.png") no-repeat center;
    font-size: 14px;
    font-weight: 500;
    color: #FFFFFF;
    position: absolute;
    top: 12px;
    right: 14px;
    cursor: pointer;
  }
  .actCountdown {
    position: absolute;
    top: 23px;
    right: 72px;

    font-size: 14px;
    font-weight: 500;
    height: 24px;
    line-height: 24px;
    color: #FFFFFF;
    .timer {
      display: flex;
      justify-content: center;
      gap: 10px;
      .time {
        min-width: 24px;
        height: 24px;
        line-height: 24px;
        border-radius: 4px;
        background: linear-gradient(139deg, #F94F3B 18%, #F97B46 89%);
        box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1),inset 0 4px 10px 0 rgba(222, 255, 140, 0.3),inset 0 4px 10px 0 rgba(255, 255, 255, 0.3);

        font-size: 14px;
        font-weight: bold;
        color: #FFFFFF;
      }
    }
  }
}
.footer {
  width: 100%;
  height: 25px;
  color: #fff;
  position: absolute;
  bottom: 0;
  padding: 0 30px;
  span {
    float: left;
  }
}
.app-content {
  width: @app-content-w;
  height: @app-content-h;
  position: relative;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  margin: 16px auto 0;
  padding-top: 44px;
  .wrap {
    width: 100%;
    height: 450px;
    display: flex;
    flex-direction: row;
    border-radius: 20px;
    background: #fff;
  }
  .sidebar-left {
    width: @app-sidebar-left-w;
    height: @app-sidebar-left-h;
    border-width: 0 1px 0 0;
    border-style: solid;
    border-image: linear-gradient(0deg, #F7EBD7 0%, rgba(247, 235, 215, 0) 112%) 0 0 0 1;
    position: relative;
  }
  .main-content {
    width: @app-sidebar-content-w;
    height: @app-sidebar-content-h;
    background: var(--bg-content);
    border-radius: 0 20px 20px 0;
    .tabBar {
      height: 61px;
      margin-top: -61px;
    }
    .payInfoPanel {
      width: 100%;
      height: 450px;
      overflow: hidden;
      border-radius: 0 20px 20px 0;
    }
  }
}
</style>