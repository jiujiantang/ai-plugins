var p=Object.defineProperty;var b=(n,e,r)=>e in n?p(n,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):n[e]=r;var s=(n,e,r)=>b(n,typeof e!="symbol"?e+"":e,r);import{d as h,p as m,e as u,h as w}from"./vue.esm-bundler-UDJ0P5mi.js";class f{constructor(){s(this,"debug");s(this,"logContainer");this.debug=!1,this.logContainer=null}createDebugPanel(e){const r=document.createElement("div"),o=document.querySelector(e);o?(o.appendChild(r),this.logContainer=r):console.warn(`Selector "${e}" not found.`)}debugPanel(e){this.debug=!0,e&&this.createDebugPanel(e)}log(e){if(this.logContainer){const r=document.createElement("div");r.innerText=`${new Date().toISOString()} - ${e}`,this.logContainer.appendChild(r),this.logContainer.scrollTop=this.logContainer.scrollHeight}}callExternalMethod(e,...r){this.log(`Calling method: ${e} with args: ${JSON.stringify(r)}`);const o=window.external;try{if(typeof window<"u"&&o&&typeof o[e]=="function")try{const t=o[e](...r);return this.log(`Method ${e} returned: ${t}`),t}catch(t){this.log(`Error in method: ${e}, Error: ${t instanceof Error?t.message:t}`)}else this.log(`Method ${e} not found`)}catch(t){t instanceof Error?this.log(t.message):this.log("An unknown error occurred")}return null}registerClientMethod(e,r){typeof window<"u"&&(window[e]=(...o)=>{this.log(`Client method called: ${e} with args: ${JSON.stringify(o)}`);try{r(...o)}catch(t){this.log(`Error in callback for ${e}, Error: ${t instanceof Error?t.message:t}`)}})}}function C(){const n=new f;m("windowBridge",{debugPanel:i=>{n.debugPanel(i)},logger:i=>{n.log(i)},callExternalMethod:(i,...d)=>{n.callExternalMethod(i,...d)},registerClientMethod:(i,d)=>{n.registerClientMethod(i,d)}})}function x(){return h("windowBridge")}const M=`window.external 上挂载客户端功能，window 上挂载网页功能，实现网站、客户端的通信。通过 npm install win-bridge 安装使用。\r
\r
\`\`\`vue\r
<script setup lang="ts">\r
  import {useWindowBridgeProvider} from "win-bridge";\r
  import BridgeConsumer from "./BridgeConsumer.vue";\r
  useWindowBridgeProvider()\r
<\/script>\r
<template> <BridgeConsumer /> </template>\r
\`\`\`\r
\`\`\`vue\r
<template>\r
  <div>\r
    <button @click="initDebug">启用 Debug 面板</button>\r
    <button @click="callTest">调用 external.testMethod</button>\r
    <button @click="triggerClient">触发 client 回调</button>\r
    <div id="debug-panel" style="margin-top:20px; max-height:200px; overflow:auto; border:1px solid #ddd; padding:10px;">\r
    </div>\r
  </div>\r
</template>\r
<script setup lang="ts">\r
  import {useWindowBridge} from "win-bridge";\r
  const bridge = useWindowBridge()\r
  const initDebug = () => {\r
    bridge.debugPanel('#debug-panel')\r
    bridge.logger('Debug panel initialized.')\r
  }\r
  const callTest = () => {\r
    ;(window as any).external = {\r
      testMethod: (msg: string) => \`Echo: \${msg}\`\r
    }\r
    bridge.callExternalMethod('testMethod', 'Hello from Storybook')\r
  }\r
  const triggerClient = () => {\r
    bridge.registerClientMethod('onMessage', (msg: string) => {\r
      bridge.logger(\`Client received: \${msg}\`)\r
    })\r
    ;(window as any).onMessage?.('Triggered manually!')\r
  }\r
<\/script>\r
\`\`\``,v=u({template:`
    <div>
      <button @click="initDebug">启用 Debug 面板</button>
      <button @click="callTest">调用 external.testMethod</button>
      <button @click="triggerClient">触发 client 回调</button>
      <div id="debug-panel" style="margin-top:20px; max-height:200px; overflow:auto; border:1px solid #ddd; padding:10px;"></div>
    </div>
  `,setup(){const n=x();return{initDebug:()=>{n.debugPanel("#debug-panel"),n.logger("Debug panel initialized.")},callTest:()=>{window.external={testMethod:t=>`Echo: ${t}`},n.callExternalMethod("testMethod","Hello from Storybook")},triggerClient:()=>{var t;n.registerClientMethod("onMessage",i=>{n.logger(`Client received: ${i}`)}),(t=window.onMessage)==null||t.call(window,"Triggered manually!")}}}}),E=u({setup(){C()},render(){return w(v)}}),B={title:"VUE组件/win-bridge",component:E,tags:["autodocs"],parameters:{docs:{description:{component:M},source:{code:"暂无"}}}},l={};var g,a,c;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:"{}",...(c=(a=l.parameters)==null?void 0:a.docs)==null?void 0:c.source}}};const D=["Default"];export{l as Default,D as __namedExportsOrder,B as default};
