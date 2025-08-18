import type { App } from 'vue';
import { open, close } from "@/core/PopUpCore";
import PopupOptions from "@/types";

export default {
  install(app: App) {
    app.config.globalProperties.$popup = { open, close }; // 在全局属性中添加弹窗方法
    app.directive("popup", {
      mounted(el, binding) {
        el.addEventListener("click", () => open(binding.value)); // 为元素添加点击事件监听器，以指定的绑定值打开弹窗
      },
    });
  },
  open,
  close,
};

export type { PopupOptions }