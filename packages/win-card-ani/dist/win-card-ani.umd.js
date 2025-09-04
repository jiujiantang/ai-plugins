(function(n){typeof define=="function"&&define.amd?define(n):n()})((function(){"use strict";(function(){if("customElements"in window&&"content"in document.createElement("template")){document.querySelector("div[data-card-group]").style.display="none";class s extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.render(!1)}static get observedAttributes(){return["active","title","img","active-img"]}attributeChangedCallback(){this.render(this.hasAttribute("active"))}render(t){const e=this.getAttribute("title")||"未命名",a=t?this.getAttribute("active-img"):this.getAttribute("img");this.shadowRoot.innerHTML=`
            <style>
              .card {
                width: 100%;
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                color: #fff;
                cursor: pointer;
                transition: background 0.5s ease;
                height: 100%;
                background: ${t?"linear-gradient(121deg, #6F63FF 0%, #425BFF 49%, #409BFB 100%)":"#1E2231"};
                box-sizing: border-box;
              }
              .cardWrap {
                position: absolute;
                top: ${t?"52px":"64px"}; 
                right: ${t?"40px":"128px"};
                display: flex;
                flex-direction: column;
                align-items: center;
                transition: all 0.5s ease;
              }
              .card img {
                opacity: 1;
                width: ${t?"139px":"57px"};
                height: ${t?"77px":"32px"};
                object-fit: cover;
                transition: all 0.5s ease;
              }
              .sub {
                text-align: center;
                width: 100%;
                font-size: 14px;
                font-weight: 400;
                opacity: ${t?"0":"1"};
                transition: opacity 0.5s ease;
              }
              .title {
                width: 100%;
                position: absolute;
                top: 78px;
                left: 0;
                padding-left: 41px;
                font-size: 18px; 
                font-weight: 400;
                opacity: ${t?"1":"0"};
                transition: opacity 0.5s ease;
              }
            </style>
            <div class="card">
              <div class="cardWrap">
                <img src="${a}" alt="">
                <div class="sub">${e}</div>
              </div>
              <div class="title">${e}</div>
            </div>
          `}set active(t){t?this.setAttribute("active",""):this.removeAttribute("active")}get active(){return this.hasAttribute("active")}}customElements.define("my-card",s);class o extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=`
              <style>
                .group {
                  width: 1400px;
                  display: flex;
                  height: 180px;
                  border-radius: 12px;
                  overflow: hidden;
                  margin: 0 auto;
                }
                ::slotted(my-card) { flex: 320; transition: flex 0.5s ease; }
                ::slotted(my-card[active]) { flex: 440; }
                ::slotted(my-card:not(:last-child)) {border-right: 1px solid #303545;}
              </style>
              <div class="group"><slot></slot></div>
            `}connectedCallback(){this.addEventListener("mouseenter",t=>{const e=t.composedPath().find(a=>a.tagName==="MY-CARD");e&&this.activate(e)},!0),this.addEventListener("mouseleave",()=>{this.activate(this.querySelector("my-card"))})}activate(t){this.querySelectorAll("my-card").forEach(e=>e.active=!1),t&&(t.active=!0)}}customElements.define("card-group",o),window.addEventListener("DOMContentLoaded",()=>{const i=document.querySelector("card-group")?.querySelector("my-card");i&&(i.active=!0)})}else{let s=function(){var o=document.querySelectorAll("[data-card-group]");Array.prototype.forEach.call(o,function(i){var t=i.querySelectorAll("[data-card]");if(!t.length)return;function e(a){Array.prototype.forEach.call(t,function(d){var r=d.querySelector("img");r&&(d===a?(d.classList.add("active"),r.getAttribute("data-active-img")&&(r.src=r.getAttribute("data-active-img"))):(d.classList.remove("active"),r.getAttribute("data-img")&&(r.src=r.getAttribute("data-img"))))})}e(t[0]),Array.prototype.forEach.call(t,function(a){a.addEventListener("mouseenter",function(){e(a)})}),i.addEventListener("mouseleave",function(){e(t[0])})})};(function(){var i=`
          [data-card-group] {
            width: 1400px;
            display: flex;
            height: 180px;
            border-radius: 12px;
            overflow: hidden;
            margin: 0 auto;
          }
          [data-card] {
            flex: 320;
            background: #1E2231;
            position: relative;
            color: #fff;
            cursor: pointer;
            transition: flex 0.5s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            box-sizing: border-box;
          }
          [data-card]:not(:last-child) {
            border-right: 1px solid #303545;
          }
          [data-card].active {
            flex: 440;
            background: linear-gradient(121deg, #6F63FF 0%, #425BFF 49%, #409BFB 100%);
          }
          [data-card] .cardWrap {
            position: absolute;
            top: 64px; 
            right: 128px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          [data-card].active .cardWrap {
            top: 52px; 
            right: 40px;
          }
          [data-card] img {
            width: 57px;
            height: 32px;
            object-fit: cover;
          }
          [data-card].active img {
            width: 139px;
            height: 77px;
          }
          [data-card] .sub {
            font-size: 14px;
            opacity: 1;
          }
          [data-card].active .sub {
            opacity: 0;
          }
          [data-card] .title {
            width: 100%;
            position: absolute;
            top: 78px;
            left: 0;
            padding-left: 41px;
            font-size: 18px; 
            font-weight: 400;
            opacity: 0;
          }
          [data-card].active .title {
            opacity: 1;
          }
        `,t=document.createElement("style");t.type="text/css",t.styleSheet?t.styleSheet.cssText=i:t.appendChild(document.createTextNode(i)),document.head.appendChild(t)})(),document.addEventListener("DOMContentLoaded",s)}})()}));
