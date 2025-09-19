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
  /** 点击事件处理函数 */
  onClick?: () => void;
}>();

const buttonClass = computed(() => ({
  'btn': true,
  'btn-disabled': props.disabled,
}));

const handleClick = () => {
  if (props.onClick && !props.disabled) {
    props.onClick();
  }
};
</script>

<style scoped>
.btn {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover:not(.btn-disabled) {
  background-color: #0056b3;
}

.btn-disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
```