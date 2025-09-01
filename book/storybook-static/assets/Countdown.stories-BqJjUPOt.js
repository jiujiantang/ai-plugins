var v=Object.defineProperty;var y=(n,t,e)=>t in n?v(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var i=(n,t,e)=>y(n,typeof t!="symbol"?t+"":t,e);import{d as C,b as m,o as S,w as T,e as k,f as M,g as b,t as N}from"./vue.esm-bundler-CjjCPUMS.js";class I{constructor(){i(this,"handlers",new Map)}on(t,e){return this.handlers.has(t)||this.handlers.set(t,new Set),this.handlers.get(t).add(e),()=>this.off(t,e)}once(t,e){const s=r=>{try{e(r)}finally{this.off(t,s)}};return this.on(t,s)}off(t,e){if(!e){this.handlers.delete(t);return}const s=this.handlers.get(t);s&&(s.delete(e),s.size===0&&this.handlers.delete(t))}emit(t,e){const s=this.handlers.get(t);s&&Array.from(s).forEach(r=>{try{r(e)}catch{}})}}class _{constructor(t=1e3){i(this,"events",new I);i(this,"endTime",0);i(this,"timerId",null);i(this,"interval");i(this,"running",!1);this.interval=Math.max(16,t)}set(t){this.endTime=t,this.events.emit("set",t)}start(t){if(typeof t=="number"&&(this.endTime=t),!this.endTime)throw new Error("endTime not set");this.running||(this.running=!0,this.events.emit("start",this.endTime),this.tick(),this.timerId=window.setInterval(()=>this.tick(),this.interval))}tick(){const t=Date.now(),e=Math.max(0,this.endTime-t);this.events.emit("tick",e),e<=0&&(this.stopTimer(),this.events.emit("end"),this.running=!1)}pause(){this.running&&(this.stopTimer(),this.running=!1,this.events.emit("pause"))}resume(){this.running||!this.endTime||(this.running=!0,this.events.emit("resume"),this.tick(),this.timerId=window.setInterval(()=>this.tick(),this.interval))}stop(){this.stopTimer(),this.endTime=0,this.running=!1}isRunning(){return this.running}stopTimer(){this.timerId!==null&&(clearInterval(this.timerId),this.timerId=null)}}class D{constructor(t=1e3){i(this,"cores",new Map);i(this,"interval");this.interval=t}getCore(t){return this.cores.has(t)||this.cores.set(t,new _(this.interval)),this.cores.get(t)}deleteCore(t){const e=this.cores.get(t);e&&(e.stop(),this.cores.delete(t))}clear(){this.cores.forEach(t=>t.stop()),this.cores.clear()}}const h=new D(1e3);function F(n){const t=Math.floor(n/1e3),e=t%60,s=Math.floor(t/60)%60,r=Math.floor(t/3600)%24,a=Math.floor(t/86400),u=String(e).padStart(2,"0"),d=String(s).padStart(2,"0"),o=String(r).padStart(2,"0");return`${String(a)},${o},${d},${u}`}const c=C({__name:"Countdown",props:{keyName:{type:String,required:!0},end:{type:Number,required:!0},autoStart:{type:Boolean,default:!0},onFinish:{type:Function,default:null}},setup(n){const t=n,e=m(""),s=m(0);let r,a=null,u=null;function d(o){typeof o<"u"&&o>=0&&(e.value=F(o),s.value=o)}return S(()=>{r=h.getCore(t.keyName),r.set(t.end),a=r.events.on("tick",d),u=r.events.on("end",()=>{t.onFinish(t.keyName)}),t.autoStart&&r.start(),T(()=>t.end,o=>{r.set(o),r.isRunning()||r.start()})}),k(()=>{a==null||a(),u==null||u(),h.deleteCore(t.keyName)}),(o,w)=>M(o.$slots,"default",{time:e.value,left:s.value},()=>[b(N(e.value),1)])}});c.__docgenInfo={exportName:"default",displayName:"Countdown",description:"",tags:{},props:[{name:"keyName",type:{name:"string"},required:!0},{name:"end",type:{name:"number"},required:!0},{name:"autoStart",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"onFinish",type:{name:"func"},defaultValue:{func:!1,value:"null"}}],slots:[{name:"default",scoped:!0,bindings:[{name:"time",title:"binding"},{name:"left",title:"binding"}]}],sourceFiles:["D:/workspace/plugins/packages/vue-count-down/src/components/Countdown.vue"]};const q={title:"VUE组件/Countdown",component:c,tags:["autodocs"],argTypes:{keyName:{control:"text"},end:{control:"number"},autoStart:{control:"boolean"},onFinish:{action:"onFinish"}},parameters:{docs:{description:{component:"解决多个倒计时相互影响的问题，通过npm install vue-countdown-plugin安装，import导入。"}}}},x=n=>({components:{Countdown:c},setup(){return{args:n}},template:`
<Countdown v-bind="args">
  <template #default="{ time, left }">
    <p>倒计时: {{ time }}</p>
  </template>
</Countdown>
  `}),l=x.bind({});l.args={keyName:"onlyKey",end:Date.now()+6e3,autoStart:!0};var f,p,g;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`(args: CountdownProType) => ({
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
})`,...(g=(p=l.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};const V=["Demo"];export{l as Demo,V as __namedExportsOrder,q as default};
