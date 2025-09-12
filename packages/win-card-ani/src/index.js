
  (function () {
    // 判断是否支持 Web Components
    const supportsWebComponents = (
      'customElements' in window &&
      'content' in document.createElement('template')
    );
    const isUseWebComponents = false // 闪烁问题未解决

  if (supportsWebComponents && isUseWebComponents) {
    document.querySelector("div[data-card-group]").style.display = 'none';
    /** -------------------
     * WebComponent 版本
     * ------------------- */
    class MyCard extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render(false);
      }

      static get observedAttributes() {
        return ["active", "title", "img", "active-img"];
      }

      attributeChangedCallback() {
        this.render(this.hasAttribute("active"));
      }

      render(isActive) {
        if (this._lastActive === isActive) return;
        this._lastActive = isActive;

        const title = this.getAttribute("title") || "未命名";
        const img = isActive ? this.getAttribute("active-img") : this.getAttribute("img");
        const imgWidth= this.getAttribute("imgWidth");
        const imgHeight= this.getAttribute("imgHeight");
        const actImgWidth= this.getAttribute("actImgWidth");
        const actImgHeight= this.getAttribute("actImgHeight");

        this.shadowRoot.innerHTML = `
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
                background: ${isActive
      ? "linear-gradient(121deg, #6F63FF 0%, #425BFF 49%, #409BFB 100%)"
      : "#1E2231"};
                box-sizing: border-box;
              }
              .cardWrap {
                position: absolute;
                top: ${isActive ? "50%" : "64px"}; 
                right: ${isActive ? "40px" : "128px"};
                transform: ${isActive ? "translateY(-50%)" : ""}; 
                display: flex;
                flex-direction: column;
                align-items: center;
                transition: all 0.5s ease;
              }
              .card img {
                opacity: 1;
                width: ${isActive ? actImgWidth +"px" : imgWidth +"px" };
                height: ${isActive ? actImgHeight + "px" : imgHeight + "px"};
                object-fit: cover;
                transition: all 0.5s ease;
              }
              .sub {
                text-align: center;
                width: 100%;
                font-size: 14px;
                font-weight: 400;
                display: ${ isActive ? "none" : "block" };
                transition: opacity 0.5s ease;
                margin-top: 10px;
                color: #D2D3D6;
              }
              .title {
                width: 100%;
                position: absolute;
                top: 78px;
                left: 0;
                padding-left: 41px;
                font-size: 18px; 
                font-weight: 400;
                opacity: ${ isActive ? "1" : "0" };
                transition: opacity 0.5s ease;
                text-align: left;
              }
            </style>
            <div class="card">
              <div class="cardWrap">
                <img src="${img}" alt="">
                <div class="sub">${title}</div>
              </div>
              <div class="title">${title}</div>
            </div>
          `;
      }

      set active(val) { val ? this.setAttribute("active", "") : this.removeAttribute("active"); }
      get active() { return this.hasAttribute("active"); }
    }

    customElements.define("my-card", MyCard);

    class CardGroup extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
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
            `;
    }
    connectedCallback() {
      let ticking = false;
      let debounceTimer = null;

      const runActivate = (card, debounce = false) => {
        const exec = () => {
          if (!ticking) {
            requestAnimationFrame(() => {
              this.activate(card);
              ticking = false;
            });
            ticking = true;
          }
        };

        if (debounce) {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(exec, 120); // 120ms 停留后才触发
        } else {
          exec();
        }
      };

      this.addEventListener(
        "mouseenter",
        (e) => {
          const card = e.composedPath().find((el) => el.tagName === "MY-CARD");
          if (card) runActivate(card, true); // 鼠标进入用防抖
        },
        true
      );

      this.addEventListener("mouseleave", () => {
        runActivate(this.querySelector("my-card")); // 鼠标离开立即触发
      });
    }
    activate(card) {
      this.querySelectorAll("my-card").forEach(c => c.active = false);
      if (card) card.active = true;
    }
  }
    customElements.define("card-group", CardGroup);

    // 默认激活第一个
    window.addEventListener("DOMContentLoaded", () => {
      const first = document.querySelector("card-group")?.querySelector("my-card");
      if (first) first.active = true;
    });

} else {
    /** -------------------
     * Fallback 版本 (IE11)
     * ------------------- */
    function initFallback() {
      var groups = document.querySelectorAll("[data-card-group]");
      let debounceTimer = null;

      Array.prototype.forEach.call(groups, function (group) {
        var cards = group.querySelectorAll("[data-card]");
        if (!cards.length) return;

        function activate(card, flag) {
          Array.prototype.forEach.call(cards, function (c) {
            var img = c.querySelector("img");
            if (!img) return;

            // 切换状态
            if (c === card) {
              c.classList.add(flag);
              if (img.getAttribute("data-active-img")) {
                img.src = img.getAttribute("data-active-img");
                img.style.width = img.getAttribute("data-actImgWidth") + "px";
                img.style.height = img.getAttribute("data-actImgHeight") + "px";
              }
            } else {
              c.classList.remove(flag);
              if (img.getAttribute("data-img")) {
                img.src = img.getAttribute("data-img");
                img.style.width = img.getAttribute("data-imgWidth") + "px";
                img.style.height = img.getAttribute("data-imgHeight") + "px";
              }
            }
          });
        }

        // 默认激活第一个
        activate(cards[0],"active");

        Array.prototype.forEach.call(cards, function (card) {
          card.addEventListener("mouseenter", function () {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(()=>{
              Array.prototype.forEach.call(cards, function (c) {
                c.classList.remove("active");
              })
              activate(card, "active2");
            }, 120); // 120ms 停留后才触发
          });
        });

        group.addEventListener("mouseleave", function () {
          Array.prototype.forEach.call(cards, function (c) {
            c.classList.remove("active2");
          })
          activate(cards[0], "active");
        });
      });
    }

    // 注入基础样式
    (function addFallbackStyle() {
      var css = `
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
          [data-card].active2 {
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
            display: flex;
            top: 50%;
            transform: translateY(-50%); 
            right: 40px;
          }
          [data-card].active2 .cardWrap {
            display: none;
          }
          [data-card] img {
            display: inline-block;
            width: 57px;
            height: 32px;
            object-fit: cover;
          }
          [data-card].active img {
            display: inline-block;
            width: 139px;
            height: 77px;
          }
          [data-card].active2 img {
            display: none;
          }
          [data-card] .sub {
            font-size: 14px;
            display: block;
            margin-top: 10px;
            color: #D2D3D6;
          }
          [data-card].active .sub {
            display: none;
          }
          [data-card].active2 .sub {
            display: none;
          }
          [data-card] .title {
            width: 100%;
            height: 100%;
            padding-left: 41px;
            opacity: 0;
            text-align: left;
            position: relative;
            box-sizing: border-box;
          }
          [data-card] .title .default {
            display: block;
            width: 100%;
            height: 26px;
            line-height: 26px;
            position: absolute;
            top: 50%;
            margin-top: -13px;
            font-size: 18px; 
            font-weight: 400;
          }
          [data-card] .title .description {
            display: block;
            width: 352px;
            height: 48px;
            font-weight: 400;
            font-size: 14px;
            color: #FFFFFF;
            line-height: 24px;
            position: absolute;
            top: 50%;
            margin-top: -24px;
          }
          [data-card].active .title  {
            opacity: 1;
          }
          [data-card].active .title .default {
            display: block;
          }
          [data-card].active .title .description {
            display: none;
          }
          [data-card].active2 .title {
            opacity: 1;
          }
          [data-card].active2 .title .default {
            display: none;
          }
          [data-card].active2 .title .description {
            display: block;
          }
        `;
      var style = document.createElement("style");
      style.type = "text/css";
      if (style.styleSheet) {
        style.styleSheet.cssText = css; // IE <=8
      } else {
        style.appendChild(document.createTextNode(css));
      }
      document.head.appendChild(style);
    })();
    document.addEventListener("DOMContentLoaded", initFallback);
  }

})();
