<template>
  <div class="message-carousel" :style="{height: `${height}`}">
    <div id="carousel-wrap" :style="{transform: `translateY(${state.top}%)`}" :class="`carousel-item-wrap ${state.class}`">
      <!-- 动态渲染消息 -->
      <div
          v-for="(message, index) in msg"
          :key="index"
          :style="{height: `${height}`, lineHeight: `${height}`}"
          class="message-item"
          v-html="message"
      >
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive, onUnmounted, defineProps, watch, nextTick} from 'vue';

const {height, msg, intervalTime} = defineProps({
  height: {
    type: String,
    required: true,
  },
  msg: {
    type: Array,
    required: true,
  },
  intervalTime: {
    type: Number,
    required: true,
    default: 3000,
    validator(value) {
      return value > 1000
    }
  }
})

const state = reactive({
  top: 0,
  class: "ani_transition",
})

const timer = ref(0)
const index = ref(0)

// 控制消息轮播的函数
const scrollMessages = () => {
  index.value++
  // 轮播框的高度
  const h = 100/msg.length;
  state.top = -index.value*h
  state.class = "ani_transition"
};

// 滚动监听
const handleTransitionEnd = (event) => {
  if(event.propertyName === "transform"){
    if(index.value >= msg.length - 1){
      index.value = 0
      state.top = 0
      state.class = ""
    }
  }
}

// 动画
const animation = async () => {
  await nextTick()
  // 处理信息
  if(msg.length > 1){
    msg.push(msg[0])
    // 监听过渡完成
    const box = document.querySelector("#carousel-wrap");
    box.removeEventListener('transitionend', handleTransitionEnd);
    box.addEventListener("transitionend", handleTransitionEnd)
    // 设置定时器，每 10 秒轮播一次
    clearInterval(timer.value)
    timer.value = setInterval(scrollMessages, intervalTime);
  }
}

watch(() => msg, (newVal, oldVal) => {
  animation()
})

onUnmounted(() => {
  const box = document.querySelector("#carousel-wrap");
  box.removeEventListener('transitionend', handleTransitionEnd);
  clearInterval(timer.value)
})
</script>

<style scoped lang="less">
.message-carousel {
  overflow: hidden;
  position: absolute;
  /* 可以根据需求调整样式 */
  width: 340px;
  height: 30px;
  border-radius: 15px;
  background: #FF3D25;
  box-sizing: border-box;
  border: 1px solid #FFB48E;
  box-shadow: inset 0 4px 10px 0 rgba(255, 255, 255, 0.3);
}

.carousel-item-wrap {
  position: absolute;
  transform: translateY(0);
}

.ani_transition {
  transition: transform 0.5s ease-in-out;
}

.message-item {
  font-size: 14px;
  width: 300px;
  height: 30px;
  line-height: 30px;
  white-space: nowrap;    /* 防止文本换行 */
  overflow: hidden;       /* 隐藏超出容器范围的内容 */
  text-overflow: ellipsis; /* 超过宽度时显示省略号 */
  text-align: left;
  padding: 0 10px;
  box-sizing: border-box;
  color: #fff;
}
</style>
