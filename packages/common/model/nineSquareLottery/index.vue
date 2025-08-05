<!-- 宫格抽奖模版 -->
<template>
  <div id="game">
    <div class="lotteryBg" :style="{backgroundImage: `url(${json.skin.bg})`, width: `${json.skin.bgWidth}px`, height: `${json.skin.bgHeight}px`}">
      <slot name="title"></slot>
      <template v-if="json.cellNumber === 9">
        <div class="grid-container-nine">
          <template v-for="(item, index) in json.skin.awardsList" :key="item.id">
            <div class="card" :data-type="item.id"
                 :style="{backgroundImage: index === state.actionIndex ? `url(${json.skin.blockAct})` : `url(${json.skin.block})`, width: `${json.skin.blockWidth}px`, height: `${json.skin.blockHeight}px`}">

              <slot name="card" :message="item"></slot>
            </div>
          </template>
          <div id="lottery-nine" @click="handleClick(8)" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave"  class="button squareLotteryBtn" :style="{backgroundImage: `url(${ state.isHover ? json.skin.lotteryAct : json.skin.lottery})`,width: `${json.skin.lotteryWidth}px`, height: `${json.skin.lotteryHeight}px`}">
            <slot name="lotteryTips"></slot>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import {reactive, onUnmounted, defineProps, ref} from "vue"

const {json, lottery, gameOverCb} = defineProps({
  json: {},
  lottery: null,
  gameOverCb: null
})

const state = reactive({
  actionIndex: -1,
  isHover: false,
})

const timer = ref(0)
const lock = ref(false)

// 动画

const animateSlower = (conf) => {
  let {targetIndex, cb, delay, initIndex} = conf

  let index = initIndex // 初始状态

  const executeTask = () => {
    state.actionIndex = index

    console.log(index, targetIndex)
    if(index === targetIndex){
      cb && cb()
    }else {
      setTimeout(() => {
        executeTask()
      },delay)
    }

    delay+=100
    index++
  }
  executeTask()

}

const animate = (conf) => {
  const {loopIndex, targetCircle, targetIndex, cb, delay, initIndex} = conf

  let index = initIndex // 初始状态
  let circle = 0
  let first = true
  timer.value = setInterval(()=>{

    if(first){
      if(initIndex === -1) {
        index++
      }
      first = false
    }else {
      index++
    }

    if(index === loopIndex){
      index = 0
      circle++
    }

    state.actionIndex = index

    if(circle === targetCircle){
      if(targetIndex === -1){
        clearInterval(timer.value)
        cb && cb()
      }else {
        if(index === targetIndex){
          clearInterval(timer.value)
          cb && cb()
        }
      }
    }
  },delay)
}

// hover
const handleMouseOver = () => {
  state.isHover = true
}
const handleMouseLeave = () => {
  state.isHover = false
}


// 抽奖
const handleClick = (loopIndex) => {
  if(lock.value){
    return
  }
  lock.value = true

  lottery((id)=>{
    // 滚动2圈
    animate({
      loopIndex,
      targetCircle: 4,
      targetIndex: -1,
      delay: 60,
      initIndex: -1,
      cb: ()=>{
        // 抽奖,最后1圈
        animateSlower({
          targetIndex: id,
          delay: 120,
          initIndex: 0,
          cb: () => {
            lock.value = false
            gameOverCb()
          }
        })
      }
    })
  },()=>{
    lock.value = false
  })
}

onUnmounted(()=>{
  clearInterval(timer.value)
})
</script>

<style scoped lang="less">
#game {
  position: relative;
  .title {
    color: red;
  }
  .lotteryBg {
    width: 517px;
    height: 678px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    position: relative;
  }
  .card {
    .prize {
      font-family: "AlibabaPuHuiTi-SemiBold",serif;
      color: #FF9900;
      letter-spacing: 0;
      text-align: right;
      font-size: 14px;
    }
    img {
      width: 70px;
      height: auto;
      margin-top: -20px;
    }
    .times {
      font-family: "AlibabaPuHuiTi-Regular",serif;
      color: #B9745D;
      letter-spacing: 0;
      text-align: center;
      margin-top: -20px;
      font-size: 13px;
    }
  }

  /**
   * 9宫格布局
   * grid-template-columns: repeat(4, 1fr) 4列 后面子元素copy第一个元素
   * grid-row-start: 1; 子元素 位置开始行数
   * grid-column-start: 1; 子元素 位置开始列数
   * grid-column-end: span 2; 子元素 跨越2列
   */
  .grid-container-nine {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    position: absolute;
    top: 200px;
    left: 68px;
    .card {
      width: 90px;
      height: 100px;
      background-color: #ffedde;
      border-radius: 10px;
      padding: 10px 0 10px 0;
      text-align: center;
      box-sizing: border-box;
    }
    .card:nth-child(1) {
      grid-row-start: 1;
      grid-column-start: 1;
    }
    .card:nth-child(2) {
      grid-row-start: 1;
      grid-column-start: 2;
    }
    .card:nth-child(3) {
      grid-row-start: 1;
      grid-column-start: 3;
    }
    .card:nth-child(4) {
      grid-row-start: 2;
      grid-column-start: 3;
    }
    .card:nth-child(5) {
      grid-row-start: 3;
      grid-column-start: 3;
    }
    .card:nth-child(6) {
      grid-row-start: 3;
      grid-column-start: 2;
    }
    .card:nth-child(7) {
      grid-row-start: 3;
      grid-column-start: 1;
    }
    .card:nth-child(8) {
      grid-row-start: 2;
      grid-column-start: 1;
    }
    .button {
      font-weight: bold;
      border-radius: 20px;
      text-align: center;
      line-height: 50px;
      grid-row-start: 2;
      grid-column-start: 2;
      grid-column-end: span 1;
      background-size: 100% 100%;
      background-position: center center;
      background-repeat: no-repeat;
    }
  }
}

</style>