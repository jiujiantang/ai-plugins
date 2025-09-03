import{b as f,o as K}from"./vue.esm-bundler-UDJ0P5mi.js";const v=(e,n)=>n.some(t=>e instanceof t);let V,P;function R(){return V||(V=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function N(){return P||(P=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const w=new WeakMap,h=new WeakMap,I=new WeakMap;function F(e){const n=new Promise((t,r)=>{const a=()=>{e.removeEventListener("success",c),e.removeEventListener("error",o)},c=()=>{t(m(e.result)),a()},o=()=>{r(e.error),a()};e.addEventListener("success",c),e.addEventListener("error",o)});return I.set(n,e),n}function U(e){if(w.has(e))return;const n=new Promise((t,r)=>{const a=()=>{e.removeEventListener("complete",c),e.removeEventListener("error",o),e.removeEventListener("abort",o)},c=()=>{t(),a()},o=()=>{r(e.error||new DOMException("AbortError","AbortError")),a()};e.addEventListener("complete",c),e.addEventListener("error",o),e.addEventListener("abort",o)});w.set(e,n)}let x={get(e,n,t){if(e instanceof IDBTransaction){if(n==="done")return w.get(e);if(n==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return m(e[n])},set(e,n,t){return e[n]=t,!0},has(e,n){return e instanceof IDBTransaction&&(n==="done"||n==="store")?!0:n in e}};function T(e){x=e(x)}function W(e){return N().includes(e)?function(...n){return e.apply(E(this),n),m(this.request)}:function(...n){return m(e.apply(E(this),n))}}function G(e){return typeof e=="function"?W(e):(e instanceof IDBTransaction&&U(e),v(e,R())?new Proxy(e,x):e)}function m(e){if(e instanceof IDBRequest)return F(e);if(h.has(e))return h.get(e);const n=G(e);return n!==e&&(h.set(e,n),I.set(n,e)),n}const E=e=>I.get(e);function Y(e,n,{blocked:t,upgrade:r,blocking:a,terminated:c}={}){const o=indexedDB.open(e,n),s=m(o);return r&&o.addEventListener("upgradeneeded",i=>{r(m(o.result),i.oldVersion,i.newVersion,m(o.transaction),i)}),t&&o.addEventListener("blocked",i=>t(i.oldVersion,i.newVersion,i)),s.then(i=>{c&&i.addEventListener("close",()=>c()),a&&i.addEventListener("versionchange",l=>a(l.oldVersion,l.newVersion,l))}).catch(()=>{}),s}const z=["get","getKey","getAll","getAllKeys","count"],H=["put","add","delete","clear"],B=new Map;function _(e,n){if(!(e instanceof IDBDatabase&&!(n in e)&&typeof n=="string"))return;if(B.get(n))return B.get(n);const t=n.replace(/FromIndex$/,""),r=n!==t,a=H.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(a||z.includes(t)))return;const c=async function(o,...s){const i=this.transaction(o,a?"readwrite":"readonly");let l=i.store;return r&&(l=l.index(s.shift())),(await Promise.all([l[t](...s),a&&i.done]))[0]};return B.set(n,c),c}T(e=>({...e,get:(n,t,r)=>_(n,t)||e.get(n,t,r),has:(n,t)=>!!_(n,t)||e.has(n,t)}));const J=["continue","continuePrimaryKey","advance"],C={},S=new WeakMap,j=new WeakMap,Q={get(e,n){if(!J.includes(n))return e[n];let t=C[n];return t||(t=C[n]=function(...r){S.set(this,j.get(this)[n](...r))}),t}};async function*X(...e){let n=this;if(n instanceof IDBCursor||(n=await n.openCursor(...e)),!n)return;n=n;const t=new Proxy(n,Q);for(j.set(t,n),I.set(t,E(n));n;)yield t,n=await(S.get(t)||n.continue()),S.delete(t)}function A(e,n){return n===Symbol.asyncIterator&&v(e,[IDBIndex,IDBObjectStore,IDBCursor])||n==="iterate"&&v(e,[IDBIndex,IDBObjectStore])}T(e=>({...e,get(n,t,r){return A(n,t)?X:e.get(n,t,r)},has(n,t){return A(n,t)||e.has(n,t)}}));const k="images-db",D="images",Z=e=>typeof e=="string"?parseInt(e.replace(/\D/g,""))||1:e||1,q=async()=>new Promise((e,n)=>{const t=indexedDB.open(k);t.onsuccess=()=>{const r=t.result.version;t.result.close(),e(r)},t.onerror=()=>n(t.error),t.onupgradeneeded=r=>e(r.oldVersion||0)}),ee=async e=>Y(k,e,{upgrade(n){n.objectStoreNames.contains(D)||n.createObjectStore(D)}}),ne=async e=>{const n=Z(e),t=await q(),r=()=>ee(n);return{closeDB:async()=>{(await r()).close()},setImage:async(s,i)=>{if(n===t)return;await(await r()).put(D,i,s)},getImage:async s=>(await r()).get(D,s),version:n,oldVersion:t}},te=`ImageDB 工具，用于在 IndexedDB 中存储和检索图片，通过npm install vue-icon-cache安装使用。\r
PS：注意，每次更新要修改数据库版本号)\r
\r
\`\`\`ts\r
// imageDB.ts\r
import { App, inject } from 'vue'\r
import { imageDB } from 'vue-icon-cache'\r
import type { ImageDB } from 'vue-icon-cache'\r
\r
declare const __APP_VERSION__: string\r
\r
/** 提供给组件注入的上下文类型 */\r
type ImageDbContext = Pick<ImageDB, 'setImage' | 'getImage' | 'closeDB'>\r
\r
/** 注入/提供 key */\r
const IMAGE_DB_KEY = Symbol('imageDB')\r
\r
/** 初始化并提供 DB */\r
export async function installImageDb(app: App) {\r
    const db = await imageDB(__APP_VERSION__)\r
    // console.log('DB版本号:', db.version, db.oldVersion)\r
\r
    const context: ImageDbContext = {\r
        setImage: db.setImage,\r
        getImage: db.getImage,\r
        closeDB: db.closeDB\r
    }\r
\r
    // 全局 provide\r
    app.provide(IMAGE_DB_KEY, context)\r
}\r
\r
/** 组件中使用 imageDB */\r
export function useImageDb() {\r
    const db = inject<ImageDbContext>(IMAGE_DB_KEY)\r
    if (!db) throw new Error('imageDB not provided')\r
    return db\r
}\r
\`\`\`\r
\`\`\`vue\r
<script setup lang="ts">\r
  import { useImageDb } from '@/imageDB';\r
  const {setImage} = useImageDb()\r
\r
  const urlToBlob = async (url: string) => {\r
    try {\r
      const response = await fetch(url);\r
      if (response.ok) {\r
        return await response.blob();\r
      }\r
    } catch (error) {\r
      console.error('Error loading image:', error);\r
    }\r
  }\r
  const file = await urlToBlob("demoUrl");\r
  if(file) await setImage("demoKey", file)\r
<\/script>\r
\`\`\`\r
`,re={props:{dbVersion:{type:String,default:"1.0.0"},showDBInfo:{type:Boolean,default:!0}},template:`
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h3>ImageDB 演示</h3>
      
      <div v-if="showDBInfo" style="margin-bottom: 20px; padding: 10px; background: #f5f5f5; border-radius: 4px;">
        <p><strong>数据库信息:</strong></p>
        <p>版本: {{ dbVersion }}</p>
        <p>状态: {{ dbStatus }}</p>
      </div>
      
      <div style="margin-bottom: 20px;">
        <input 
          type="file" 
          @change="onFileChange" 
          accept="image/*" 
          style="margin-bottom: 10px;"
        />
        <div>
          <label>
            图片键名: 
            <input 
              type="text" 
              v-model="imageKey" 
              placeholder="输入图片键名" 
              style="margin-left: 5px; padding: 5px;"
            />
          </label>
        </div>
      </div>
      
      <div v-if="errorMessage" style="color: red; margin-bottom: 15px;">
        {{ errorMessage }}
      </div>
      
      <div v-if="imgUrl" style="margin-top: 20px;">
        <p><strong>已存储并读取的图片：</strong></p>
        <img :src="imgUrl" style="max-width: 300px; border: 1px solid #ccc; border-radius: 4px;" />
        <div style="margin-top: 10px;">
          <button @click="retrieveImage(null)" style="padding: 5px 10px; background: #5352ed; color: white; border: none; border-radius: 3px; cursor: pointer; margin-right: 10px;">
            重新获取图片
          </button>
        </div>
      </div>
      
      <div v-if="operations.length > 0" style="margin-top: 20px;">
        <p><strong>操作历史:</strong></p>
        <ul style="list-style-type: none; padding: 0;">
          <li v-for="(op, index) in operations" :key="index" style="padding: 5px 0; border-bottom: 1px solid #eee;">
            {{ op }}
          </li>
        </ul>
      </div>
    </div>
  `,setup(e){const n=f(null),t=f("demo-image"),r=f(""),a=f("未初始化"),c=f([]);let o=null;const s=u=>{c.value.unshift(`${new Date().toLocaleTimeString()}: ${u}`),c.value.length>10&&c.value.pop()},i=async()=>{try{if(a.value="初始化中...",o=await ne(e.dbVersion),!o)throw new Error("❌ ImageDB 插件未注册");a.value="已初始化",s(`数据库初始化成功，版本: ${e.dbVersion}`)}catch(u){a.value="初始化失败",r.value=`初始化失败: ${u instanceof Error?u.message:String(u)}`,s(`数据库初始化失败: ${u instanceof Error?u.message:String(u)}`)}},l=async u=>{const d=u.target.files;if(!(d!=null&&d.length))return;const p=d[0];if(!p.type.startsWith("image/")){r.value="请选择图片文件";return}try{await i();const g=p.slice(),b=t.value||"demo-image";s(`开始存储图片: ${b}`),await o.setImage(b,g),s(`图片存储成功: ${b}`),await M(b)}catch(g){r.value=`存储失败: ${g instanceof Error?g.message:String(g)}`,s(`图片存储失败: ${g instanceof Error?g.message:String(g)}`)}},M=async u=>{try{await i();const d=u||t.value;s(`开始获取图片: ${d}`);const p=await o.getImage(d);p?(n.value=URL.createObjectURL(p),s(`图片获取成功: ${d}`)):(r.value=`未找到键为 ${d} 的图片`,s(`图片获取失败: 未找到键为 ${d} 的图片`))}catch(d){r.value=`获取失败: ${d instanceof Error?d.message:String(d)}`,s(`图片获取失败: ${d instanceof Error?d.message:String(d)}`)}};return K(async()=>{await i()}),{imgUrl:n,imageKey:t,errorMessage:r,dbStatus:a,operations:c,onFileChange:l,retrieveImage:M}}},se={title:"VUE组件/vue-icon-cache",component:re,tags:["autodocs"],argTypes:{dbVersion:{control:"text",description:"数据库版本号：递增",table:{defaultValue:{summary:"1.0.0"}}},showDBInfo:{control:"boolean",description:"是否显示数据库信息",table:{defaultValue:{summary:"true"}}}},parameters:{docs:{description:{component:te},source:{code:null}}},args:{dbVersion:"1.0.0",showDBInfo:!0}},y={};var L,$,O;y.parameters={...y.parameters,docs:{...(L=y.parameters)==null?void 0:L.docs,source:{originalSource:"{}",...(O=($=y.parameters)==null?void 0:$.docs)==null?void 0:O.source}}};const ie=["Default"];export{y as Default,ie as __namedExportsOrder,se as default};
