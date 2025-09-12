import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import Common from 'common'
import {registerNineSquareLottery} from "common"

// import { useSc } from '@/uiux/useSc';
// const { scTrack } = useSc()

const {useUrl} = Common
const {getStaticUrl, getLykstaticUrl} = useUrl()

async function loadScripts() {
  if (import.meta.env.VITE_USE_SC === 'true') {
    const scriptElement = document.createElement('script');
    scriptElement.src = getStaticUrl(import.meta.env.VITE_SC_URL);
    scriptElement.async = true;
    document.head.appendChild(scriptElement);
    // 曝光埋点
    // scriptElement.addEventListener('load', () => {
    //   const currentUrl = window.location.href;
    //   const url = new URL(currentUrl);
    //   const params = new URLSearchParams(url.search);
    //   const source = params.get('source') || 0;
    //   scTrack("LyktiantianlingquanExposure", {tiantianlingquan_source: [source, 'number']})
    // });
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

loadScripts().then(r => {
  const app =  createApp(App)

  // 注册抽奖功能模块（NineSquareLottery）
  registerNineSquareLottery(app)

  app.mount('#app')
}).catch(error => {
  console.error("Error loading scripts:", error);
});