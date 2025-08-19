解决弹窗使用的复杂性问题
```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import VuePopupPlugin from "vue-easy-popup";

const app = createApp(App);
app.use(VuePopupPlugin);
app.mount('#app');
```
```vue
<script lang="ts" setup>
const popupOptions = {
  type: "html",
  content: `
    <img src='./assets/images/demo.png' alt='demo'>
    <div class='wrap'>
      <div class='text'>
        您当前的会员权益包含：素材贵族、灵感PLUS会员
        <br/>旧权益可为您抵扣：86.31元，欢迎升级~
      </div>
    </div>
  `,
  close: (type: string) => console.log(type),
}
</script>

<template>
  <button v-popup="popupOptions">打开</button>
</template>

<style lang="less">
  .vue-popup-closeBtn {
    width: 58px;
    height: 58px;
    background: url("./assets/images/close.png") no-repeat;
    position: absolute;
    right: -40px;
    top: -24px;
  }
  .vue-popup-okBtn {
    width: 200px;
    height: 46px;
    border-radius: 23px;
    background: #222222;
    position: absolute;
    top: 297px;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    &::before {
      content: "我知道了";
      display: block;
      width: 100%;
      height: 100%;
      line-height: 46px;
      font-size: 16px;
      font-weight: 500;
      color: #FFFFFF;
    }
  }
  .vue-popup-cancelBtn,.vue-popup-mask {
    background: transparent !important;
  }
  .wrap {
  width: 420px;
  height: 58px;
  position: absolute;
  left: 50%;
  top: 102px;
  margin-left: -210px;
  overflow: hidden;
  box-sizing: border-box;
  .text {
    width: 420px;
    height: 58px;
    position: absolute;
    padding: 0 29px;
  }
  &::before {
    content: '';
    width: 420px;
    height: 362px;
    background: linear-gradient(179deg, #FFECC8 -2%, #FFFFFF 32%);
    position: absolute;
    top: -91px;
  }
}
</style>
```