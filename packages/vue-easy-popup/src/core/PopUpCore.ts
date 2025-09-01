import { createVNode, render } from "vue";
import Popup from "../components/Popup.vue";
import {PopupOptions, ClickEvent} from "../types";

const containers = new Map<string, HTMLElement>();

// 打开弹窗
export function open(options: PopupOptions) {
    const type = options.type || "default";

    // 如果同类型的已有弹窗，先关闭
    if (containers.has(type)) close(type);

    const container = document.createElement("div");
    if (options.id) container.id = options.id;
    document.body.appendChild(container);

    // 保存容器
    containers.set(type, container);

    // 包装事件，确保关闭时清理
    const vnode = createVNode(Popup, {
        ...options,
        onClose: () => {
            close(type);
            options.close?.(ClickEvent.Close);
        },
        onCancel: () => {
            close(type);
            options.close?.(ClickEvent.Cancel);
        },
        onOk: () => {
            close(type);
            options.close?.(ClickEvent.Ok);
        }
    });

    render(vnode, container);

    if (type === "toast") {
        setTimeout(() => {
            close(type);
        }, 1500);
    }
}

// 关闭某个类型的弹窗
export function close(type?: string) {
    if (type) {
        const container = containers.get(type);
        if (container) {
            render(null, container);
            document.body.removeChild(container);
            containers.delete(type);
        }
    } else {
        // 如果不传 type，关闭所有
        containers.forEach((container) => {
            render(null, container);
            document.body.removeChild(container);
        });
        containers.clear();
    }
}
