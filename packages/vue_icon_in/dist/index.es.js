(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".bg-switcher[data-v-dd0e598b]{position:relative;overflow:hidden}.bg-switcher .bg-layer[data-v-dd0e598b]{position:absolute;top:0;right:0;bottom:0;left:0;background-size:cover;background-repeat:no-repeat;background-position:center center;transition:opacity .6s ease;border-radius:15px}.bg-switcher .base[data-v-dd0e598b]{z-index:1}.bg-switcher .overlay[data-v-dd0e598b]{z-index:2;opacity:0}.bg-switcher .content[data-v-dd0e598b]{width:100%;height:100%;position:absolute;top:0;right:0;bottom:0;left:0;z-index:9}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { defineComponent as i, ref as c, watch as u, nextTick as d, computed as y, openBlock as _, createElementBlock as v, normalizeStyle as p, createElementVNode as s, renderSlot as g } from "vue";
const h = { class: "content" }, m = /* @__PURE__ */ i({
  __name: "BgSwitcher",
  props: {
    url: {},
    width: {},
    height: {}
  },
  setup(o) {
    const t = o, r = c(), e = c();
    u(() => t.url, (a) => {
      d(() => {
        a && n(a);
      });
    }, { immediate: !0 });
    const l = y(() => ({
      width: `${t.width ? t.width + "px" : "100%"}`,
      height: `${t.height ? t.height + "px" : "100%"}`
    }));
    function n(a) {
      !e.value || !r.value || (e.value.style.backgroundImage = `url('${a}')`, e.value.style.opacity = "1", setTimeout(() => {
        r.value.style.backgroundImage = `url('${a}')`, setTimeout(() => {
          e.value.style.opacity = "0", e.value.style.backgroundImage = "";
        }, 100);
      }, 500));
    }
    return (a, b) => (_(), v("div", {
      class: "bg-switcher",
      style: p(l.value)
    }, [
      s("div", {
        class: "bg-layer base",
        ref_key: "baseLayer",
        ref: r
      }, null, 512),
      s("div", {
        class: "bg-layer overlay",
        ref_key: "overlayLayer",
        ref: e
      }, null, 512),
      s("div", h, [
        g(a.$slots, "default", {}, void 0, !0)
      ])
    ], 4));
  }
});
const f = (o, t) => {
  const r = o.__vccOpts || o;
  for (const [e, l] of t)
    r[e] = l;
  return r;
}, w = /* @__PURE__ */ f(m, [["__scopeId", "data-v-dd0e598b"]]);
export {
  w as default
};
