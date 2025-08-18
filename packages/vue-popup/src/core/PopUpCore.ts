import { createVNode, render } from "vue";
import Popup from "../components/Popup.vue";
import PopupOptions from "@/types";

let container: HTMLElement | null = null; // 用于渲染弹窗的容器

// 使用给定的选项打开弹窗
export function open(options: PopupOptions) {
    if (container) close(); // 如果已有弹窗，先关闭

    container = document.createElement("div"); // 创建新的容器
    document.body.appendChild(container); // 将其添加到页面中

    // 为 Popup 组件创建 Vue 虚拟节点
    options = {...options, onClose: () => {
        console.log("close");
        close(); // 关闭弹窗
        options.close?.(); // 调用用户指定的 onClose 函数（如果有）
    }, onCancel: () => {
        console.log("cancel");
    }, onOk: () => {
        console.log("ok");
    }}
    const vnode = createVNode(Popup, {
        ...options
    });
    render(vnode, container);
}

// 关闭弹窗并清理容器
export function close() {
    if (container) {
        render(null, container); // 卸载组件
        document.body.removeChild(container); // 从 DOM 中移除容器
        container = null; // 重置容器引用
    }
}