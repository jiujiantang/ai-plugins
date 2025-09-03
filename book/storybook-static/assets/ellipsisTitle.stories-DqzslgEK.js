let e=null;function c(){e=document.createElement("div"),e.className="ellipsis-tooltip",document.body.appendChild(e)}function u(t,i,s){e||c(),e&&(e.innerText=i,e.style.display="block",e.style.left=s.pageX+10+"px",e.style.top=s.pageY+10+"px")}function d(){e&&(e.style.display="none")}function l(t,i){t.style.overflow="hidden",t.style.textOverflow="ellipsis",t.style.whiteSpace="nowrap",t.style.cursor="default";const s=i.value||t.innerText;t.addEventListener("mouseenter",p=>{t.scrollWidth>t.clientWidth&&u(t,s,p)}),t.addEventListener("mousemove",p=>{e&&e.style.display==="block"&&(e.style.left=p.pageX+10+"px",e.style.top=p.pageY+10+"px")}),t.addEventListener("mouseleave",()=>{d()})}const m={mounted(t,i){l(t,i)},updated(t,i){l(t,i)},unmounted(){d()}},x=`自定义指令，当文本溢出时显示省略号，并在鼠标悬停时显示完整内容的提示框，通过npm install vue-ellipsis-title安装使用。\r
\r
\`\`\`ts\r
// main.ts\r
import { createApp } from "vue";\r
import App from "./App.vue";\r
import VueEllipsisTitlePlugin from "vue-ellipsis-title";\r
\r
const app = createApp(App);\r
app.use(VueEllipsisTitlePlugin);\r
app.mount("#app");\r
\`\`\`\r
\`\`\`vue\r
<script lang="ts" setup>\r
  const text = "这是一段中等长度的文本内容，用于演示效果";\r
<\/script>\r
<template>\r
  <p class="test" style="max-width: 200px" v-ellipsis-title="textRef">{{ text }}</p>\r
</template>\r
\`\`\`\r
\r
`,f={directives:{ellipsisTitle:m},props:{text:{type:String,required:!0},width:{type:String,default:"200px"}},template:`
    <div 
      :style="{
        width: width,
        padding: '8px',
        margin: '4px 0'
      }"
      v-ellipsis-title
    >
      {{ text }}
    </div>
  `},v={title:"VUE组件/vue-ellipsis-title",component:f,tags:["autodocs"],argTypes:{text:{control:"text",description:"要显示的文本内容"},width:{control:"text",description:"容器的宽度"}},parameters:{docs:{description:{component:x},source:{code:`<template>
  <p class="test" v-ellipsis-title>这是一段中等长度的文本内容，用于演示效果</p>
</template>`}}},args:{text:"这是一段中等长度的文本内容，用于演示效果",width:"200px"}},n={args:{text:"这是一段中等长度的文本内容，用于演示效果",width:"200px"}};var r,o,a;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    text: "这是一段中等长度的文本内容，用于演示效果",
    width: "200px"
  }
}`,...(a=(o=n.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};const y=["Default"];export{n as Default,y as __namedExportsOrder,v as default};
