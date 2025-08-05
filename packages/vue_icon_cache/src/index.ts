import type { App } from 'vue';
import type { ImageDB } from './types'; // 建议导出类型
import imageDB from './store'; // 默认导出的是初始化方法等

// 插件形式注册：app.use(imageDBPlugin)
export const imageDBPlugin = {
  install(app: App) {
    app.config.globalProperties.$imageDB = imageDB;
    app.provide('$imageDB', imageDB); // inject('$imageDB')
  },
};

// 命名导出，清晰类型
export { imageDB };
export type { ImageDB };
