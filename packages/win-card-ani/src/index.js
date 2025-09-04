
  (function () {
    // 判断是否支持 Web Components
    const supportsWebComponents = (
      'customElements' in window &&
      'content' in document.createElement('template')
    );

  if (supportsWebComponents) {
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
        const title = this.getAttribute("title") || "未命名";
        const img = isActive ? this.getAttribute("active-img") : this.getAttribute("img");

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
                top: ${isActive ? "52px" : "64px"}; 
                right: ${isActive ? "40px" : "128px"};
                display: flex;
                flex-direction: column;
                align-items: center;
                transition: all 0.5s ease;
              }
              .card img {
                opacity: 1;
                width: ${isActive ? "139px" : "57px"};
                height: ${isActive ? "77px" : "32px"};
                object-fit: cover;
                transition: all 0.5s ease;
              }
              .sub {
                text-align: center;
                width: 100%;
                font-size: 14px;
                font-weight: 400;
                opacity: ${ isActive ? "0" : "1" };
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
                opacity: ${ isActive ? "1" : "0" };
                transition: opacity 0.5s ease;
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
      this.addEventListener("mouseenter", (e) => {
        const card = e.composedPath().find(el => el.tagName === "MY-CARD");
        if (card) this.activate(card);
      }, true);
      this.addEventListener("mouseleave", () => {
        this.activate(this.querySelector("my-card"));
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

      Array.prototype.forEach.call(groups, function (group) {
        var cards = group.querySelectorAll("[data-card]");
        if (!cards.length) return;

        function activate(card) {
          Array.prototype.forEach.call(cards, function (c) {
            var img = c.querySelector("img");
            if (!img) return;

            // 切换状态
            if (c === card) {
              c.classList.add("active");
              if (img.getAttribute("data-active-img")) {
                img.src = img.getAttribute("data-active-img");
              }
            } else {
              c.classList.remove("active");
              if (img.getAttribute("data-img")) {
                img.src = img.getAttribute("data-img");
              }
            }
          });
        }

        // 默认激活第一个
        activate(cards[0]);

        Array.prototype.forEach.call(cards, function (card) {
          card.addEventListener("mouseenter", function () {
            activate(card);
          });
        });

        group.addEventListener("mouseleave", function () {
          activate(cards[0]);
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
