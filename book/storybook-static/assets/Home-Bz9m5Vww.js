import{j as n,b as o,c as a}from"./index-D4CwRzcz.js";import{useMDXComponents as i}from"./index-CBHjznyA.js";import"./iframe-Cz5J1NMh.js";import"./index-8_2S3kac.js";import"./index-DrFu-skq.js";const s=""+new URL("addon-library-BWUCAmyN.png",import.meta.url).href,d=`\r
### vue-count-down\r
可声明多个实例的倒计时组件。\r
\r
\`\`\`shell\r
pnpm install vue-countdown-plugin\r
\`\`\`\r
\r
### vue-easy-popup\r
基于全局 open/close API 的弹窗组件。\r
\r
\`\`\`shell\r
pnpm install vue-easy-popup\r
\`\`\`\r
\r
### vue-ellipsis-title\r
自定义指令，当文本溢出时显示省略号，并在鼠标悬停时显示完整内容的提示框。\r
\r
\`\`\`shell\r
pnpm install vue-ellipsis-title\r
\`\`\`\r
\r
### vue_icon_cache\r
ImageDB 工具，用于在 IndexedDB 中存储和检索图片。\r
\r
\`\`\`shell\r
pnpm install vue_icon_cache\r
\`\`\`\r
\r
### vue_icon_in\r
背景切换组件，支持平滑过渡效果。当背景URL变化时，会显示淡入淡出的切换动画。\r
\r
\`\`\`shell\r
pnpm install vue_icon_in\r
\`\`\`\r
\r
### win-bridge\r
客户端连接桥插件。\r
\r
\`\`\`shell\r
pnpm install win-bridge\r
\`\`\`\r
\r
\r
\r
\r
`,l=()=>{const e={path:"path",svg:"svg",...i()};return n.jsx(e.svg,{viewBox:"0 0 14 14",width:"8px",height:"14px",style:{marginLeft:"4px",display:"inline-block",shapeRendering:"inherit",verticalAlign:"middle",fill:"currentColor","path fill":"currentColor"},children:n.jsx(e.path,{d:"m11.1 7.35-5.5 5.5a.5.5 0 0 1-.7-.7L10.04 7 4.9 1.85a.5.5 0 1 1 .7-.7l5.5 5.5c.2.2.2.5 0 .7Z"})})};function r(e){return n.jsxs(n.Fragment,{children:[n.jsx(o,{title:"组件库介绍"}),`
`,n.jsxs("div",{className:"sb-addon",children:[n.jsxs("div",{className:"sb-addon-text",children:[n.jsx("h4",{children:"前端组件库"}),n.jsx("p",{className:"sb-section-item-paragraph",children:"通过npm安装你急需的组件"}),n.jsxs("a",{href:"https://storybook.js.org",target:"_blank",children:["learn more",n.jsx(l,{})]})]}),n.jsx("div",{className:"sb-addon-img",children:n.jsx("img",{src:s,alt:"Integrate your tools with Storybook to connect workflows."})})]}),`
`,n.jsx("div",{children:n.jsx(a,{children:d})}),`
`,n.jsx("style",{children:`
  .sb-container {
    margin-bottom: 48px;
  }

  .sb-section {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  img {
    object-fit: cover;
  }

  .sb-section-title {
    margin-bottom: 32px;
  }

  .sb-section a:not(h1 a, h2 a, h3 a) {
    font-size: 14px;
  }

  .sb-section-item, .sb-grid-item {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .sb-section-item-heading {
    padding-top: 20px !important;
    padding-bottom: 5px !important;
    margin: 0 !important;
  }
  .sb-section-item-paragraph {
    margin: 0;
    padding-bottom: 10px;
  }

  .sb-chevron {
    margin-left: 5px;
  }

  .sb-features-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 32px 20px;
  }

  .sb-socials {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  .sb-socials p {
    margin-bottom: 10px;
  }

  .sb-explore-image {
    max-height: 32px;
    align-self: flex-start;
  }

  .sb-addon {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    background-color: #EEF3F8;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    background: #EEF3F8;
    height: 180px;
    margin-bottom: 48px;
    overflow: hidden;
  }

  .sb-addon-text {
    padding-left: 48px;
    max-width: 240px;
  }

  .sb-addon-text h4 {
    padding-top: 0px;
  }

  .sb-addon-img {
    position: absolute;
    left: 345px;
    top: 0;
    height: 100%;
    width: 200%;
    overflow: hidden;
  }

  .sb-addon-img img {
    width: 650px;
    transform: rotate(-15deg);
    margin-left: 40px;
    margin-top: -72px;
    box-shadow: 0 0 1px rgba(255, 255, 255, 0);
    backface-visibility: hidden;
  }

  @media screen and (max-width: 800px) {
    .sb-addon-img {
      left: 300px;
    }
  }

  @media screen and (max-width: 600px) {
    .sb-section {
      flex-direction: column;
    }

    .sb-features-grid {
      grid-template-columns: repeat(1, 1fr);
    }

    .sb-socials {
      grid-template-columns: repeat(2, 1fr);
    }

    .sb-addon {
      height: 280px;
      align-items: flex-start;
      padding-top: 32px;
      overflow: hidden;
    }

    .sb-addon-text {
      padding-left: 24px;
    }

    .sb-addon-img {
      right: 0;
      left: 0;
      top: 130px;
      bottom: 0;
      overflow: hidden;
      height: auto;
      width: 124%;
    }

    .sb-addon-img img {
      width: 1200px;
      transform: rotate(-12deg);
      margin-left: 0;
      margin-top: 48px;
      margin-bottom: -40px;
      margin-left: -24px;
    }
  }
  `})]})}function h(e={}){const{wrapper:t}={...i(),...e.components};return t?n.jsx(t,{...e,children:n.jsx(r,{...e})}):r()}export{l as RightArrow,h as default};
