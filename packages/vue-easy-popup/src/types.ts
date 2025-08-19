export enum ClickEvent {
    Close = 'Close',
    Cancel = 'Cancel',
    Ok = 'Ok',
}
export interface PopupOptions {
    type: "html"; // 弹窗类型
    content: string; // 弹窗内容
    close?: (type: ClickEvent) => void; // 弹窗关闭时的回调函数
    onClose?: ((...args: any[]) => any) | undefined;
    onCancel?: ((...args: any[]) => any) | undefined;
    onOk?: ((...args: any[]) => any) | undefined;
}