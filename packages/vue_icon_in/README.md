### 解决图片加载闪烁问题
```vue
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
  import BgSwitcher from "vue-icon-in";

  const rights1 = ['/public/image/1-right1.png','/public/image/1-right2.png','/public/image/1-right3.png']
  const rights2 = ['/public/image/3-right1.png','/public/image/3-right2.png','/public/image/3-right3.png']
  const rightsRef = ref<[]>([]);

  const defIcon = ref<boolean>(0)
  const holderClick = () => {
    setTimeout(() => {
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
```