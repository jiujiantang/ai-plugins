(function () {
  // 判断是否支持 Web Components
  const supportsWebComponents = (
    'customElements' in window &&
    'content' in document.createElement('template')
  );

  if (supportsWebComponents) {
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
        return ["active", "title", "img", "active-img", "desc"];
      }

      attributeChangedCallback() {
        this.render(this.hasAttribute("active"));
      }

      render(isActive) {
        const title = this.getAttribute("title") || "未命名";
        const img = isActive ? this.getAttribute("active-img") : this.getAttribute("img");
        const desc = this.getAttribute("desc") || "";

        this.shadowRoot.innerHTML = `
          <style>
            .card {
              position: relative;
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
              color: ${isActive ? "red" : "#fff"};
              cursor: pointer;
              transition: flex 0.5s ease;
              height: 100%;
              background: #1E2231;
            }
            .card.active {
                color: red;
            }
            .card img {
              position: absolute;
              width: 57px;
              height: 32px;
              object-fit: cover;
              top: 0; 
              left: 0;
            }
            .overlay {
              position: relative;
              background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
              padding: 16px;
              text-align: center;
            }
            .title { font-size: 18px; font-weight: bold; }
            .desc {
              font-size: 14px;
              opacity: ${isActive ? 1 : 0};
              max-height: ${isActive ? "40px" : "0"};
              overflow: hidden;
              transition: all 0.3s ease;
            }
          </style>
          <div class="card">
            <img src="${img}">
            <div class="overlay">
              <div class="title">${title}</div>
              <div class="desc">${desc}</div>
            </div>
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
              display: flex;
              height: 300px;
              border-radius: 12px;
              overflow: hidden;
            }
            ::slotted(my-card) { flex: 1; transition: flex 0.5s ease; }
            ::slotted(my-card[active]) { flex: 2; }
            ::slotted(my-card[active] .card) { color: red; }
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
    window.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll("card-group").forEach((wc) => {
        const cards = wc.querySelectorAll("my-card");
        const fallbackGroup = document.createElement("div");
        fallbackGroup.className = "fallback-group";

        // 注入基础样式（避免外链 CSS 依赖）
        if (!document.getElementById("cardGroupFallbackCSS")) {
          const style = document.createElement("style");
          style.id = "cardGroupFallbackCSS";
          style.textContent = `
            .fallback-group { display: flex; height: 300px; border-radius: 12px; overflow: hidden; }
            .fallback-card { flex: 1; position: relative; display: flex; flex-direction: column; justify-content: flex-end; color: #fff; transition: flex 0.5s ease; cursor: pointer; overflow: hidden; }
            .fallback-card img { position: absolute; width: 100%; height: 100%; object-fit: cover; top: 0; left: 0; }
            .fallback-overlay { position: relative; background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); padding: 16px; text-align: center; width: 100%; }
            .fallback-card .title { font-size: 18px; font-weight: bold; }
            .fallback-card .desc { font-size: 14px; opacity: 0; max-height: 0; overflow: hidden; transition: all 0.3s ease; }
            .fallback-card.active { flex: 1.5; }
            .fallback-card.active .desc { opacity: 1; max-height: 40px; }
          `;
          document.head.appendChild(style);
        }

        cards.forEach((c, i) => {
          const div = document.createElement("div");
          div.className = "fallback-card" + (i === 0 ? " active" : "");
          div.innerHTML = `
            <img src="${i === 0 ? c.getAttribute("active-img") : c.getAttribute("img")}">
            <div class="fallback-overlay">
              <div class="title">${c.getAttribute("title")}</div>
              <div class="desc">${c.getAttribute("desc")}</div>
            </div>
          `;
          div.addEventListener("mouseenter", () => {
            fallbackGroup.querySelectorAll(".fallback-card").forEach(fc => {
              fc.classList.remove("active");
              fc.querySelector("img").src = fc.getAttribute("data-img");
            });
            div.classList.add("active");
            div.querySelector("img").src = c.getAttribute("active-img");
          });
          div.setAttribute("data-img", c.getAttribute("img"));
          fallbackGroup.appendChild(div);
        });

        wc.replaceWith(fallbackGroup);
      });
    });
  }
})();