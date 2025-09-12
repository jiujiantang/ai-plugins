<template>
    <transition name="fade">
      <div v-if="isActive" class='w-[250px] h-[50px] p-[4px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' role="alert">
        <div :class="['w-full h-full opacity-60 absolute rounded-[4px]', toastTypeClass]"></div>
        <div class="w-full h-full text-center leading-[50px] absolute text-[#fff]">{{ message }}</div>
      </div>
    </transition>
</template>
  
<script lang="ts">
  import { ref } from 'vue';
  
  export default {
    props: {
      isActive: {
        type: Boolean,
        default: false,
      },
      message: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: 'normal', // 可选值: 'success', 'error', 'warning', 'info', etc.
      },
      duration: {
        type: Number,
        default: 3000, // 默认显示时长为 3000 毫秒
      },
    },
    setup(props) {
      const toastTypeClass = ref('bg-[#000]');
  
      // 设置不同类型的样式
      switch (props.type) {
        case 'normal':
          toastTypeClass.value = 'bg-[#000]';
          break;
        default:
          toastTypeClass.value = 'bg-[#000]';
      }
  
      return {
        toastTypeClass
      };
    },
  };
</script>
  
<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
</style>