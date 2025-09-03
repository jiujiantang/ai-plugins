var v=Object.defineProperty;var y=(n,e,t)=>e in n?v(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var i=(n,e,t)=>y(n,typeof e!="symbol"?e+"":e,t);import{e as C,b as m,o as k,w as b,q as S,k as M,s as A,t as N}from"./vue.esm-bundler-UDJ0P5mi.js";class F{constructor(){i(this,"handlers",new Map)}on(e,t){return this.handlers.has(e)||this.handlers.set(e,new Set),this.handlers.get(e).add(t),()=>this.off(e,t)}once(e,t){const r=o=>{try{t(o)}finally{this.off(e,r)}};return this.on(e,r)}off(e,t){if(!t){this.handlers.delete(e);return}const r=this.handlers.get(e);r&&(r.delete(t),r.size===0&&this.handlers.delete(e))}emit(e,t){const r=this.handlers.get(e);r&&Array.from(r).forEach(o=>{try{o(t)}catch{}})}}class T{constructor(e=1e3){i(this,"events",new F);i(this,"endTime",0);i(this,"timerId",null);i(this,"interval");i(this,"running",!1);this.interval=Math.max(16,e)}set(e){this.endTime=e,this.events.emit("set",e)}start(e){if(typeof e=="number"&&(this.endTime=e),!this.endTime)throw new Error("endTime not set");this.running||(this.running=!0,this.events.emit("start",this.endTime),this.tick(),this.timerId=window.setInterval(()=>this.tick(),this.interval))}tick(){const e=Date.now(),t=Math.max(0,this.endTime-e);this.events.emit("tick",t),t<=0&&(this.stopTimer(),this.events.emit("end"),this.running=!1)}pause(){this.running&&(this.stopTimer(),this.running=!1,this.events.emit("pause"))}resume(){this.running||!this.endTime||(this.running=!0,this.events.emit("resume"),this.tick(),this.timerId=window.setInterval(()=>this.tick(),this.interval))}stop(){this.stopTimer(),this.endTime=0,this.running=!1}isRunning(){return this.running}stopTimer(){this.timerId!==null&&(clearInterval(this.timerId),this.timerId=null)}}class B{constructor(e=1e3){i(this,"cores",new Map);i(this,"interval");this.interval=e}getCore(e){return this.cores.has(e)||this.cores.set(e,new T(this.interval)),this.cores.get(e)}deleteCore(e){const t=this.cores.get(e);t&&(t.stop(),this.cores.delete(e))}clear(){this.cores.forEach(e=>e.stop()),this.cores.clear()}}const p=new B(1e3);function D(n){const e=Math.floor(n/1e3),t=e%60,r=Math.floor(e/60)%60,o=Math.floor(e/3600)%24,a=Math.floor(e/86400),u=String(t).padStart(2,"0"),l=String(r).padStart(2,"0"),s=String(o).padStart(2,"0");return`${String(a)},${s},${l},${u}`}const c=C({__name:"Countdown",props:{keyName:{type:String,required:!0},end:{type:Number,required:!0},autoStart:{type:Boolean,default:!0},onFinish:{type:Function,default:null}},setup(n){const e=n,t=m(""),r=m(0);let o,a=null,u=null;function l(s){typeof s<"u"&&s>=0&&(t.value=D(s),r.value=s)}return k(()=>{o=p.getCore(e.keyName),o.set(e.end),a=o.events.on("tick",l),u=o.events.on("end",()=>{e.onFinish(e.keyName)}),e.autoStart&&o.start(),b(()=>e.end,s=>{o.set(s),o.isRunning()||o.start()})}),S(()=>{a==null||a(),u==null||u(),p.deleteCore(e.keyName)}),(s,w)=>M(s.$slots,"default",{time:t.value,left:r.value},()=>[A(N(t.value),1)])}});c.__docgenInfo={exportName:"default",displayName:"Countdown",description:"",tags:{},props:[{name:"keyName",type:{name:"string"},required:!0},{name:"end",type:{name:"number"},required:!0},{name:"autoStart",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"onFinish",type:{name:"func"},defaultValue:{func:!1,value:"null"}}],slots:[{name:"default",scoped:!0,bindings:[{name:"time",title:"binding"},{name:"left",title:"binding"}]}],sourceFiles:["D:/workspace/plugins/packages/vue-count-down/src/components/Countdown.vue"]};const I=`解决多个倒计时相互影响的问题，通过npm install vue-countdown-plugin安装使用。\r
\r
\`\`\`vue\r
<script setup lang="ts">\r
  import Countdown, {countdownManager} from 'vue-count-down'\r
\r
  const endA = Date.now() + 10000;\r
  const endB = Date.now() + 20000;\r
\r
  function pauseA() {\r
    countdownManager.getCore('groupA').pause();\r
  }\r
  function resumeA() {\r
    countdownManager.getCore('groupA').resume();\r
  }\r
  function pauseB() {\r
    countdownManager.getCore('groupB').pause();\r
  }\r
  function resumeB() {\r
    countdownManager.getCore('groupB').resume();\r
  }\r
  const handleFinish = (keyName: string) => {\r
    console.log(keyName);\r
  }\r
<\/script>\r
<template>\r
  <div>\r
    <Countdown keyName="groupA" :end="endA" :onFinish="handleFinish">\r
      <template #default="{ time }">\r
        <p>组A倒计时: {{ time }}</p>\r
      </template>\r
    </Countdown>\r
    <Countdown keyName="groupA" :end="endA" :onFinish="handleFinish">\r
      <template #default="{ time }">\r
        <p>组A另一个显示: {{ time }}</p>\r
      </template>\r
    </Countdown>\r
    <Countdown keyName="groupB" :end="endB" :onFinish="handleFinish">\r
      <template #default="{ time }">\r
        <p>组B倒计时: {{ time }}</p>\r
      </template>\r
    </Countdown>\r
\r
    <button @click="pauseA">暂停组A</button>\r
    <button @click="resumeA">继续组A</button>\r
    <button @click="pauseB">暂停组B</button>\r
    <button @click="resumeB">继续组B</button>\r
  </div>\r
</template>\r
\r
\`\`\``,q={title:"VUE组件/vue-countdown-plugin",component:c,tags:["autodocs"],argTypes:{keyName:{control:"text"},end:{control:"number"},autoStart:{control:"boolean"},onFinish:{action:"onFinish"}},parameters:{docs:{description:{component:I}}}},_=n=>({components:{Countdown:c},setup(){return{args:n}},template:`
<Countdown v-bind="args">
  <template #default="{ time, left }">
    <p>倒计时: {{ time }}</p>
  </template>
</Countdown>
  `}),d=_.bind({});d.args={keyName:"onlyKey",end:Date.now()+6e3,autoStart:!0};var h,f,g;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`(args: CountdownProType) => ({
  components: {
    Countdown
  },
  setup() {
    return {
      args
    };
  },
  template: \`
<Countdown v-bind="args">
  <template #default="{ time, left }">
    <p>倒计时: {{ time }}</p>
  </template>
</Countdown>
  \`
})`,...(g=(f=d.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};const $=["Demo"];export{d as Demo,$ as __namedExportsOrder,q as default};
