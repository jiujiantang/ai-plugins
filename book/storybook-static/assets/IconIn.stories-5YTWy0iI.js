import{e as j,b as i,w as z,f as L,g as D,j as u,k as F,n as T,l as $,m as A}from"./vue.esm-bundler-UDJ0P5mi.js";const V={class:"content"},_=j({__name:"BgSwitcher",props:{url:{},width:{},height:{}},setup(t){const e=t,n=i(),r=i();z(()=>e.url,s=>{$(()=>{s&&U(s)})},{immediate:!0});const g=L(()=>({width:`${e.width?e.width+"px":"100%"}`,height:`${e.height?e.height+"px":"100%"}`}));function U(s){!r.value||!n.value||(r.value.style.backgroundImage=`url('${s}')`,r.value.style.opacity="1",setTimeout(()=>{n.value.style.backgroundImage=`url('${s}')`,setTimeout(()=>{r.value.style.opacity="0",r.value.style.backgroundImage=""},100)},500))}return(s,E)=>(A(),D("div",{class:"bg-switcher",style:T(g.value)},[u("div",{class:"bg-layer base",ref_key:"baseLayer",ref:n},null,512),u("div",{class:"bg-layer overlay",ref_key:"overlayLayer",ref:r},null,512),u("div",V,[F(s.$slots,"default",{},void 0,!0)])],4))}}),q=(t,e)=>{const n=t.__vccOpts||t;for(const[r,g]of e)n[r]=g;return n},o=q(_,[["__scopeId","data-v-40421220"]]);_.__docgenInfo={exportName:"default",displayName:"BgSwitcher",description:"",tags:{},props:[{name:"url",required:!0,type:{name:"string"}},{name:"width",required:!1,type:{name:"number"}},{name:"height",required:!1,type:{name:"number"}}],slots:[{name:"default"}],sourceFiles:["D:/workspace/plugins/packages/vue_icon_in/src/BgSwitcher.vue"]};const C=`背景切换组件，支持平滑过渡效果。当背景URL变化时，会显示淡入淡出的切换动画。宽高属性为可选，如果不设置将自适应容器大小。通过npm install vue-icon-in 安装使用。\r
\r
\`\`\`vue\r
<template>\r
  <BgSwitcher :width="1030" :height="650" :url="bgUrl">\r
    <h1 class="overlay-text">Hello World</h1>\r
  </BgSwitcher>\r
</template>\r
\r
<script setup lang="ts">\r
  import { ref } from 'vue';\r
  import BgSwitcher from 'vue-icon-in';\r
\r
  const bgUrl = ref('https://your-image-domain.com/bg1.jpg');\r
\r
  // 模拟切换\r
  setTimeout(() => {\r
    bgUrl.value = 'https://your-image-domain.com/bg2.jpg';\r
  }, 3000);\r
<\/script>\r
\`\`\``,a=["https://images.unsplash.com/photo-1506744038136-46273834b3fb","https://images.unsplash.com/photo-1501785888041-af3ef285b470","https://images.unsplash.com/photo-1452570053594-1b985d6ea890","https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05","https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"],M={title:"VUE组件/vue-icon-in",component:o,tags:["autodocs"],argTypes:{url:{control:"text",description:"背景图片的URL"},width:{control:{type:"number",disable:!1},description:"容器宽度（像素）- 可选",table:{category:"尺寸",defaultValue:{summary:"undefined (自适应)"}}},height:{control:{type:"number",disable:!1},description:"容器高度（像素）- 可选",table:{category:"尺寸",defaultValue:{summary:"undefined (自适应)"}}}},parameters:{docs:{description:{component:C}}},args:{url:a[0]}},c={args:{url:a[0]},render:t=>({components:{BgSwitcher:o},setup(){return{args:t}},template:`
      <div style="width: 400px; height: 300px; margin: 0 auto;overflow: hidden">
        <BgSwitcher v-bind="args" style="margin-bottom: 20px;">
          <div style="color: white; text-align: center; padding: 80px 20px; font-size: 24px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
            自适应尺寸背景
            <p style="text-align: center;">此示例未设置宽高，组件会自适应父容器大小。</p>
          </div>
        </BgSwitcher>
      </div>
    `})},l={args:{url:a[1],width:400,height:300},render:t=>({components:{BgSwitcher:o},setup(){return{args:t}},template:`
      <div style="display: flex; justify-content: center;">
        <BgSwitcher v-bind="args">
          <div style="color: white; text-align: center; padding-top: 120px; font-size: 24px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
            固定尺寸: 400x300
          </div>
        </BgSwitcher>
      </div>
    `})},p={args:{width:500,height:350},render:t=>({components:{BgSwitcher:o},setup(){const e=i(0),n=i(a[0]);return setInterval(()=>{e.value=(e.value+1)%a.length,n.value=a[e.value]},3e3),{args:t,currentUrl:n}},template:`
      <div style="display: flex; justify-content: center;">
        <BgSwitcher :url="currentUrl" :width="args.width" :height="args.height">
          <div style="color: white; text-align: center; padding-top: 140px; font-size: 24px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
            自动切换背景 (3秒切换一次)
          </div>
        </BgSwitcher>
      </div>
    `})},d={args:{width:450,height:300},render:t=>({components:{BgSwitcher:o},setup(){const e=i(a[0]);return{args:t,currentUrl:e,switchBackground:r=>{e.value=a[r]},sampleImages:a}},template:`
      <div style="text-align: center;">
        <div style="display: inline-block; margin-bottom: 15px;">
          <BgSwitcher :url="currentUrl" :width="args.width" :height="args.height">
            <div style="color: white; text-align: center; padding-top: 120px; font-size: 24px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
              手动切换背景
            </div>
          </BgSwitcher>
        </div>
        
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
          <button 
            v-for="(img, index) in sampleImages" 
            :key="index"
            @click="switchBackground(index)"
            style="padding: 8px 12px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;"
          >
            背景 {{ index + 1 }}
          </button>
        </div>
      </div>
    `})};var h,m,x;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    url: sampleImages[0]
  },
  render: args => ({
    components: {
      BgSwitcher
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="width: 400px; height: 300px; margin: 0 auto;overflow: hidden">
        <BgSwitcher v-bind="args" style="margin-bottom: 20px;">
          <div style="color: white; text-align: center; padding: 80px 20px; font-size: 24px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
            自适应尺寸背景
            <p style="text-align: center;">此示例未设置宽高，组件会自适应父容器大小。</p>
          </div>
        </BgSwitcher>
      </div>
    \`
  })
}`,...(x=(m=c.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};var v,w,y;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    url: sampleImages[1],
    width: 400,
    height: 300
  },
  render: args => ({
    components: {
      BgSwitcher
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="display: flex; justify-content: center;">
        <BgSwitcher v-bind="args">
          <div style="color: white; text-align: center; padding-top: 120px; font-size: 24px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
            固定尺寸: 400x300
          </div>
        </BgSwitcher>
      </div>
    \`
  })
}`,...(y=(w=l.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var f,b,S;p.parameters={...p.parameters,docs:{...(f=p.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    width: 500,
    height: 350
  },
  render: args => ({
    components: {
      BgSwitcher
    },
    setup() {
      const currentImageIndex = ref(0);
      const currentUrl = ref(sampleImages[0]);

      // 自动切换背景
      setInterval(() => {
        currentImageIndex.value = (currentImageIndex.value + 1) % sampleImages.length;
        currentUrl.value = sampleImages[currentImageIndex.value];
      }, 3000);
      return {
        args,
        currentUrl
      };
    },
    template: \`
      <div style="display: flex; justify-content: center;">
        <BgSwitcher :url="currentUrl" :width="args.width" :height="args.height">
          <div style="color: white; text-align: center; padding-top: 140px; font-size: 24px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
            自动切换背景 (3秒切换一次)
          </div>
        </BgSwitcher>
      </div>
    \`
  })
}`,...(S=(b=p.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var B,I,k;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    width: 450,
    height: 300
  },
  render: args => ({
    components: {
      BgSwitcher
    },
    setup() {
      const currentUrl = ref(sampleImages[0]);
      const switchBackground = (index: number) => {
        currentUrl.value = sampleImages[index];
      };
      return {
        args,
        currentUrl,
        switchBackground,
        sampleImages
      };
    },
    template: \`
      <div style="text-align: center;">
        <div style="display: inline-block; margin-bottom: 15px;">
          <BgSwitcher :url="currentUrl" :width="args.width" :height="args.height">
            <div style="color: white; text-align: center; padding-top: 120px; font-size: 24px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
              手动切换背景
            </div>
          </BgSwitcher>
        </div>
        
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
          <button 
            v-for="(img, index) in sampleImages" 
            :key="index"
            @click="switchBackground(index)"
            style="padding: 8px 12px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;"
          >
            背景 {{ index + 1 }}
          </button>
        </div>
      </div>
    \`
  })
}`,...(k=(I=d.parameters)==null?void 0:I.docs)==null?void 0:k.source}}};const O=["Default","FixedDimensions","AutoSwitching","ManualSwitching"];export{p as AutoSwitching,c as Default,l as FixedDimensions,d as ManualSwitching,O as __namedExportsOrder,M as default};
