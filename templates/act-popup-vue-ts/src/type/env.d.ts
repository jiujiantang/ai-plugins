import { ComponentCustomProperties } from 'vue'
import { payParamsType, External } from './index'
import type {PopupOptions} from "vue-easy-popup";

// 扩展 this.$imageDomain
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $imageDomain: string;
        $debug: string;
    }
}

// ✅ 正确扩展全局 window 属性
declare global {
    interface Window {
        _lib_pay: {
            clearTabCheckPay: () => void;
            paymentFcun: (params: payParamsType | null, callback: () => void) => void;
        };
        _lib_login: {
            login: () => void;
        };
        _lib_sc: {
            trackEvent: (eventName: string, params: Record<string, any[]> | {}) => void;
            registerEvent: () => void;
        };
        external: External;
        layer: {
            msg: (str: string) => void;
            open: (obj: Record<string, unknown>) => void;
            closeAll: () => void;
        };
        easyPop: {
            open: (PopupOptions) => void;
        }
    }
}

export type LykFnTypes = keyof External;

// 防止文件被认为是一个模块，必须 export 一下
export {};
