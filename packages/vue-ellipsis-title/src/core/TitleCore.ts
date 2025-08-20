import { DirectiveBinding } from "vue";
import "./style.less"

let tooltipEl: HTMLElement | null = null;

/**
 * 创建全局的 tooltip 元素（只创建一次）
 */
function createTooltip() {
    tooltipEl = document.createElement("div");
    tooltipEl.className = "ellipsis-tooltip";
    document.body.appendChild(tooltipEl);
}

/**
 * 显示 tooltip
 * @param el 绑定指令的元素
 * @param text 要显示的文字
 * @param event 鼠标事件（用于定位）
 */
function showTooltip(el: HTMLElement, text: string, event: MouseEvent) {
    if (!tooltipEl) createTooltip();
    if (!tooltipEl) return;

    tooltipEl.innerText = text;
    tooltipEl.style.display = "block";
    tooltipEl.style.left = event.pageX + 10 + "px"; // 鼠标右下角 10px 偏移
    tooltipEl.style.top = event.pageY + 10 + "px";
}

/**
 * 隐藏 tooltip
 */
function hideTooltip() {
    if (tooltipEl) {
        tooltipEl.style.display = "none";
    }
}

function applyEllipsis(el: HTMLElement, binding: DirectiveBinding<string>) {
    // 强制文本单行显示 + 溢出省略
    el.style.overflow = "hidden";
    el.style.textOverflow = "ellipsis";
    el.style.whiteSpace = "nowrap";
    el.style.cursor = "default";

    // 优先取指令绑定值，否则用元素的 innerText
    const text = binding.value || el.innerText;

    // 鼠标进入时检查是否溢出，溢出则显示 tooltip
    el.addEventListener("mouseenter", (e) => {
        if (el.scrollWidth > el.clientWidth) {
            showTooltip(el, text, e as MouseEvent);
        }
    });

    // 鼠标移动时，实时更新 tooltip 位置
    el.addEventListener("mousemove", (e) => {
        if (tooltipEl && tooltipEl.style.display === "block") {
            tooltipEl.style.left = e.pageX + 10 + "px";
            tooltipEl.style.top = e.pageY + 10 + "px";
        }
    });

    // 鼠标离开时，隐藏 tooltip
    el.addEventListener("mouseleave", () => {
        hideTooltip();
    });
}

/**
 * v-ellipsis-title 自定义指令
 * 功能：当文本内容溢出时，显示一个自定义 tooltip（替代系统的 title）
 */
export const vEllipsisTitle = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        applyEllipsis(el, binding);
    },
    updated(el: HTMLElement, binding: DirectiveBinding) {
        // 每次更新时重新处理
        applyEllipsis(el, binding);
    },
    unmounted() {
        // 组件卸载时，隐藏 tooltip
        hideTooltip();
    },
};