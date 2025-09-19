```vue
<template>
  <button :class="buttonClass" @click="handleClick" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// 定义组件的 props
const props = defineProps<{
  /** 按钮的文本 */
  label: string;
  /** 按钮的类型 */
  type?: 'button' | 'submit' | 'reset';
  /** 是否禁用按钮 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
}>();

const handleClick = () => {
  if (!props.disabled) {
    // 处理点击事件
    console.log(`${props.label} button clicked`);
  }
};

// 计算按钮的类名
const buttonClass = computed(() => {
  return [
    'btn',
    props.className,
    { 'btn-disabled': props.disabled }
  ];
});
</script>

<style scoped>
.btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover:not(.btn-disabled) {
  background-color: #007bff;
  color: white;
}

.btn-disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
```