import{e as f,g as d,m as p,t as V,j as y,u as $,v as h,F as D,x as O,y as z,z as I,A as g,h as q}from"./vue.esm-bundler-UDJ0P5mi.js";const L=["innerHTML"],F=f({__name:"HtmlContentPlugin",props:{html:{}},setup(e){return(n,o)=>(p(),d("div",{innerHTML:n.html},null,8,L))}});F.__docgenInfo={exportName:"default",displayName:"HtmlContentPlugin",description:"",tags:{},props:[{name:"html",required:!0,type:{name:"string"}}],sourceFiles:["D:/workspace/plugins/packages/vue-easy-popup/src/plugins/HtmlContentPlugin.vue"]};const E=["textContent"],A=f({__name:"ToastContentPlugin",props:{text:{}},setup(e){return(n,o)=>(p(),d("div",{class:"vue-easy-popup-loader",textContent:V(n.text)},null,8,E))}});A.__docgenInfo={exportName:"default",displayName:"ToastContentPlugin",description:"",tags:{},props:[{name:"text",required:!0,type:{name:"string"}}],sourceFiles:["D:/workspace/plugins/packages/vue-easy-popup/src/plugins/ToastContentPlugin.vue"]};const j={class:"vue-popup-content"},B=f({__name:"Popup",props:{id:{},type:{},content:{},showClose:{type:Boolean},close:{type:Function},onClose:{type:Function},onCancel:{type:Function},onOk:{type:Function}},emits:["close","cancel","ok"],setup(e,{emit:n}){const o=e,s=n;function t(){o.type!=="toast"&&(o.showClose||s("close"))}const N=()=>{s("close")},S=()=>{s("cancel")},H=()=>{s("ok")};return(a,J)=>(p(),d("div",{class:I(["vue-popup-mask",{vuePopupBg:a.type==="html"}]),onClick:z(t,["self"])},[y("div",j,[a.type==="html"?(p(),d(D,{key:0},[O(F,{html:a.content},null,8,["html"]),a.showClose?(p(),d("button",{key:0,class:"vue-popup-closeBtn",onClick:N})):h("",!0),y("button",{class:"vue-popup-cancelBtn",onClick:S}),y("button",{class:"vue-popup-okBtn",onClick:H})],64)):a.type==="toast"?(p(),$(A,{key:1,text:a.content},null,8,["text"])):h("",!0)])],2))}});B.__docgenInfo={exportName:"default",displayName:"Popup",description:"",tags:{},props:[{name:"id",required:!1,type:{name:"string"}},{name:"type",required:!0,type:{name:"union",elements:[{name:'"html"'},{name:'"toast"'}]}},{name:"content",required:!0,type:{name:"string"}},{name:"showClose",required:!1,type:{name:"boolean"}},{name:"close",required:!1,type:{name:"TSFunctionType"}},{name:"onClose",required:!1,type:{name:"union",elements:[{name:"TSParenthesizedType"},{name:"undefined"}]}},{name:"onCancel",required:!1,type:{name:"union",elements:[{name:"TSParenthesizedType"},{name:"undefined"}]}},{name:"onOk",required:!1,type:{name:"union",elements:[{name:"TSParenthesizedType"},{name:"undefined"}]}}],events:[{name:"close"},{name:"cancel"},{name:"ok"}],sourceFiles:["D:/workspace/plugins/packages/vue-easy-popup/src/components/Popup.vue"]};var m=(e=>(e.Close="Close",e.Cancel="Cancel",e.Ok="Ok",e))(m||{});const c=new Map;function U(e){const n=e.type||"default";c.has(n)&&r(n);const o=document.createElement("div");e.id&&(o.id=e.id),document.body.appendChild(o),c.set(n,o);const s=O(B,{...e,onClose:()=>{var t;r(n),(t=e.close)==null||t.call(e,m.Close)},onCancel:()=>{var t;r(n),(t=e.close)==null||t.call(e,m.Cancel)},onOk:()=>{var t;r(n),(t=e.close)==null||t.call(e,m.Ok)}});g(s,o),n==="toast"&&setTimeout(()=>{r(n)},1500)}function r(e){if(e){const n=c.get(e);n&&(g(null,n),document.body.removeChild(n),c.delete(e))}else c.forEach(n=>{g(null,n),document.body.removeChild(n)}),c.clear()}const G=`基于全局 open/close API 的弹窗组件，通过npm install vue-easy-popup安装使用。\r
\r
\`\`\`ts\r
// main.ts\r
import { createApp } from 'vue';\r
import App from './App.vue';\r
import VuePopupPlugin from "vue-easy-popup";\r
\r
const app = createApp(App);\r
app.use(VuePopupPlugin);\r
if(typeof window !== 'undefined') {\r
    window.easyPop = VuePopupPlugin;\r
}\r
app.mount('#app');\r
\`\`\`\r
\`\`\`vue\r
<script lang="ts" setup>\r
  import {onMounted} from 'vue';\r
  const popupOptions = {\r
    type: "html",\r
    showClose: false,\r
    content: \`\r
    <div style='width: 200px;height: 150px;padding: 20px;background: #ffffff;border-radius: 8px;text-align: center;box-shadow: 0 2px 12px rgba(0,0,0,0.15)'>这是一个默认弹窗</div>\r
  \`,\r
    close: (type: string) => console.log(type),\r
  }\r
  onMounted(()=>{\r
    window.easyPop.open(popupOptions);\r
    window.easyPop.open({type: "toast", content: "支付成功"});\r
  })\r
<\/script>\r
<template>\r
  <button v-popup="popupOptions">打开</button>\r
</template>\r
\`\`\``,Q={title:"VUE组件/vue-easy-popup",tags:["autodocs"],argTypes:{type:{control:{type:"select"},options:["html","toast"],description:"弹窗类型"},content:{control:"text",description:"弹窗内容(HTML或文本)"},showClose:{control:"boolean",description:"是否显示关闭按钮"}},parameters:{docs:{description:{component:G},source:{code:"暂无"}}},args:{type:"html",content:"这是一个弹窗示例",showClose:!1}},M=e=>({setup(){return()=>q("button",{class:"storybook-button",onClick:()=>U({...e,close:n=>console.log("关闭事件：",n)})},`打开${e.type==="toast"?"Toast":"弹窗"}`)}}),l=M.bind({});l.args={type:"html",content:"<div style='width: 200px;height: 150px;padding: 20px;background: #ffffff;border-radius: 8px;text-align: center;box-shadow: 0 2px 12px rgba(0,0,0,0.15)'>这是一个默认弹窗</div>",showClose:!1};l.parameters={docs:{description:{story:"基础弹窗，支持HTML内容，可显示关闭按钮。"}}};const u=M.bind({});u.args={type:"toast",content:"操作成功！",showClose:!1};u.parameters={docs:{description:{story:"轻量提示弹窗，通常会自动关闭，常用于操作反馈。"}}};const i={render:()=>q("button",{onClick:()=>r()},"关闭所有弹窗")};i.parameters={docs:{description:{story:"关闭所有当前打开的弹窗。"}}};var C,k,v;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`args => ({
  setup() {
    return () => h("button", {
      class: "storybook-button",
      onClick: () => open({
        ...args,
        close: e => console.log("关闭事件：", e)
      } as PopupOptions)
    }, \`打开\${args.type === 'toast' ? 'Toast' : '弹窗'}\`);
  }
})`,...(v=(k=l.parameters)==null?void 0:k.docs)==null?void 0:v.source}}};var b,_,w;u.parameters={...u.parameters,docs:{...(b=u.parameters)==null?void 0:b.docs,source:{originalSource:`args => ({
  setup() {
    return () => h("button", {
      class: "storybook-button",
      onClick: () => open({
        ...args,
        close: e => console.log("关闭事件：", e)
      } as PopupOptions)
    }, \`打开\${args.type === 'toast' ? 'Toast' : '弹窗'}\`);
  }
})`,...(w=(_=u.parameters)==null?void 0:_.docs)==null?void 0:w.source}}};var x,P,T;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => h("button", {
    onClick: () => close()
  }, "关闭所有弹窗")
}`,...(T=(P=i.parameters)==null?void 0:P.docs)==null?void 0:T.source}}};const R=["Default","Toast","CloseAll"];export{i as CloseAll,l as Default,u as Toast,R as __namedExportsOrder,Q as default};
