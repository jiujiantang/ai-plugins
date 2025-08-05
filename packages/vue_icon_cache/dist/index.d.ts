import { App } from 'vue';
import { ImageDB } from './types';
import { default as imageDB } from './store';

export declare const imageDBPlugin: {
    install(app: App): void;
};
export { imageDB };
export type { ImageDB };
