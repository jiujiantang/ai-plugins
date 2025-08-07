<template>
  <div class="op">
    <button @click="holderClick">Switcher Icon</button>
  </div>
  <ul>
    <li v-for="(item, index) in rightsRef" :key="index">
      <div class="wrap">
        <BgSwitcher :url="item">
          <h1 class="overlay-text">{{index}}</h1>
        </BgSwitcher>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, ref} from 'vue';
import BgSwitcher from "@/index";

const rights1 = ['https://lykstatictest.3d66.com/liuyunku/application/packages/recharge/public/image/1-right1.png','https://lykstatictest.3d66.com/liuyunku/application/packages/recharge/public/image/1-right2.png','https://lykstatictest.3d66.com/liuyunku/application/packages/recharge/public/image/1-right3.png']
const rights2 = ['https://lykstatictest.3d66.com/liuyunku/application/packages/recharge/public/image/3-right1.png','https://lykstatictest.3d66.com/liuyunku/application/packages/recharge/public/image/3-right2.png','https://lykstatictest.3d66.com/liuyunku/application/packages/recharge/public/image/3-right3.png']
const rightsRef = ref<[]>([]);

const defIcon = ref<boolean>(0)
const bgUrl = ref<string>("");
const holderClick = () => {
  setTimeout(() => {
    bgUrl.value = `https://lykstatictest.3d66.com/liuyunku/application/packages/recharge/public/image/${defIcon.value ? '1':'3'}-right1.png`;
    rightsRef.value = defIcon.value ? rights1 : rights2;
    defIcon.value = !defIcon.value
  }, 500);
}
onMounted(() => {
  rightsRef.value = rights1
})
</script>

<style scoped>
.wrap {
  width: 80px;
  height: 80px;
  border: 1px solid #ccc;
  margin-top: 10px;
  margin-left: 2px;
  .overlay-text {
    width: 100%;
    position: absolute;
    bottom: 0;
    font-size: 12px;
    color: #ccc;
    text-align: center;
  }
}
.op {
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
}
</style>