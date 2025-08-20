export declare enum ClickEvent {
    Close = "Close",
    Cancel = "Cancel",
    Ok = "Ok"
}
export interface PopupOptions {
    id?: string;
    type: "html" | "toast";
    content: string;
    showClose?: boolean;
    close?: (type: ClickEvent) => void;
    onClose?: ((...args: any[]) => any) | undefined;
    onCancel?: ((...args: any[]) => any) | undefined;
    onOk?: ((...args: any[]) => any) | undefined;
}
