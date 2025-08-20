import { DirectiveBinding } from 'vue';

/**
 * v-ellipsis-title 自定义指令
 * 功能：当文本内容溢出时，显示一个自定义 tooltip（替代系统的 title）
 */
export declare const vEllipsisTitle: {
    mounted(el: HTMLElement, binding: DirectiveBinding): void;
    unmounted(): void;
};
