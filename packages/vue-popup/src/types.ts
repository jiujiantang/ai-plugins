export interface PopupOptions {
    type: "html"; // 弹窗类型
    content: string; // 弹窗内容
    close?: () => void; // 弹窗关闭时的回调函数
}