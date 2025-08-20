(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".ellipsis-tooltip{position:absolute;max-width:300px;padding:6px 10px;background:rgba(0,0,0,.75);color:#fff;border-radius:6px;font-size:12px;line-height:1.4;z-index:9999;display:none;pointer-events:none;white-space:normal}")),document.head.appendChild(e)}}catch(n){console.error("vite-plugin-css-injected-by-js",n)}})();
let e = null;
function p() {
  e = document.createElement("div"), e.className = "ellipsis-tooltip", document.body.appendChild(e);
}
function d(t, i, l) {
  e || p(), e && (e.innerText = i, e.style.display = "block", e.style.left = l.pageX + 10 + "px", e.style.top = l.pageY + 10 + "px");
}
function n() {
  e && (e.style.display = "none");
}
function o(t, i) {
  t.style.overflow = "hidden", t.style.textOverflow = "ellipsis", t.style.whiteSpace = "nowrap", t.style.cursor = "default";
  const l = i.value || t.innerText;
  t.addEventListener("mouseenter", (s) => {
    t.scrollWidth > t.clientWidth && d(t, l, s);
  }), t.addEventListener("mousemove", (s) => {
    e && e.style.display === "block" && (e.style.left = s.pageX + 10 + "px", e.style.top = s.pageY + 10 + "px");
  }), t.addEventListener("mouseleave", () => {
    n();
  });
}
const a = {
  mounted(t, i) {
    o(t, i);
  },
  updated(t, i) {
    o(t, i);
  },
  unmounted() {
    n();
  }
}, c = {
  install(t) {
    t.directive("ellipsis-title", a);
  }
};
export {
  c as default
};
