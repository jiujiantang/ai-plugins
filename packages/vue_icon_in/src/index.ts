import type { App } from 'vue';
import BgSwitcher from './BgSwitcher.vue';

export default {
  install(app: App) {
    app.component('BgSwitcher', BgSwitcher);
  }
};

export { BgSwitcher };
