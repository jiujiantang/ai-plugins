import type { App } from 'vue';
import { $icon } from './store';
import type { IconItem } from './types';

export default {
  install(app: App) {
    app.config.globalProperties.$icon = $icon;
    app.provide('$icon', $icon);
  },
};

export { $icon };
export type { IconItem };
