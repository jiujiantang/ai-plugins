import { createApp } from 'vue'
import './index.less'
import App from './App.vue'
import Common from 'common'
import axios from 'axios';
import { installImageDb } from '@/data/indexDB/imageDB.ts';
import VuePopupPlugin from "vue-easy-popup";
import VueEllipsisTitlePlugin from 'vue-ellipsis-title';

// 设置 Axios 的全局默认请求头
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const {useUrl} = Common
const {getLykstaticUrl} = useUrl()

async function loadScripts() {
  if (import.meta.env.VITE_USE_SC === 'true') {
    await import('./uiux/lib/Sc.js');
  }
  if (import.meta.env.VITE_USE_TAILWIND === 'true') {
    await import('./uiux/lib/Tailwind.css');
  }
  if (import.meta.env.VITE_USE_PAY === 'true') {
    await import('./uiux/lib/Pay.js');
  }
  if (import.meta.env.VITE_USE_LOGIN === 'true') {
    const scriptElement = document.createElement('script');
    scriptElement.src = getLykstaticUrl(import.meta.env.VITE_LOGIN_URL);
    scriptElement.async = true;
    document.head.appendChild(scriptElement); // 引入级跨js,解决登录弹窗操作父页面cookie的问题；https://static.3d66.com/tp/build/user/js/check-is-bind-phone.js 在service中引入了；

    await import('./uiux/lib/Login.js');
  }
}

loadScripts().then(async r => {
  const app =  createApp(App)
  app.config.globalProperties.$imageDomain = import.meta.env.VITE_IMAGE_DOMAIN;
  app.config.globalProperties.$debug = import.meta.env.VITE_IS_DEBUG;

  // 注册数据库
  await installImageDb(app)
  // 弹窗插件
  app.use(VuePopupPlugin)
  if(typeof window !== 'undefined') {
    window.easyPop = VuePopupPlugin;
  }
  // title插件
  app.use(VueEllipsisTitlePlugin);
  app.mount('#app')
}).catch(error => {
  console.error("Error loading scripts:", error);
});