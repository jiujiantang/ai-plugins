export declare enum ClickEvent {
    Close = "Close",
    Cancel = "Cancel",
    Ok = "Ok"
}
export interface PopupOptions {
    type: "html";
    content: string;
    close?: (type: ClickEvent) => void;
    onClose?: ((...args: any[]) => any) | undefined;
    onCancel?: ((...args: any[]) => any) | undefined;
    onOk?: ((...args: any[]) => any) | undefined;
}
