import { App } from 'vue';
import { open, close } from './core/PopUpCore';
import { PopupOptions } from './types';

declare const _default: {
    install(app: App): void;
    open: typeof open;
    close: typeof close;
};
export default _default;
export type { PopupOptions };
