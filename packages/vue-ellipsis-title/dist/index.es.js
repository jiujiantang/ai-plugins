(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".ellipsis-tooltip{position:absolute;max-width:300px;padding:6px 10px;background:rgba(0,0,0,.75);color:#fff;border-radius:6px;font-size:12px;line-height:1.4;z-index:9999;display:none;pointer-events:none;white-space:normal}")),document.head.appendChild(e)}}catch(n){console.error("vite-plugin-css-injected-by-js",n)}})();
let e = null;
function n() {
  e = document.createElement("div"), e.className = "ellipsis-tooltip", document.body.appendChild(e);
}
function p(t, s, i) {
  e || n(), e && (e.innerText = s, e.style.display = "block", e.style.left = i.pageX + 10 + "px", e.style.top = i.pageY + 10 + "px");
}
function o() {
  e && (e.style.display = "none");
}
const d = {
  mounted(t, s) {
    t.style.overflow = "hidden", t.style.textOverflow = "ellipsis", t.style.whiteSpace = "nowrap", t.style.cursor = "default";
    const i = s.value || t.innerText;
    t.addEventListener("mouseenter", (l) => {
      t.scrollWidth > t.clientWidth && p(t, i, l);
    }), t.addEventListener("mousemove", (l) => {
      e && e.style.display === "block" && (e.style.left = l.pageX + 10 + "px", e.style.top = l.pageY + 10 + "px");
    }), t.addEventListener("mouseleave", () => {
      o();
    });
  },
  unmounted() {
    o();
  }
}, a = {
  install(t) {
    t.directive("ellipsis-title", d);
  }
};
export {
  a as default
};
