import { defineComponent as i, ref as s, watch as u, computed as d, openBlock as y, createElementBlock as _, normalizeStyle as p, createElementVNode as l, renderSlot as v } from "vue";
const g = { class: "content" }, h = /* @__PURE__ */ i({
  __name: "BgSwitcher",
  props: {
    url: {},
    width: {},
    height: {}
  },
  setup(o) {
    const t = o, r = s(), e = s();
    u(() => t.url, (a) => {
      a && n(a);
    }, { immediate: !0 });
    const c = d(() => ({
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
    return (a, b) => (y(), _("div", {
      class: "bg-switcher",
      style: p(c.value)
    }, [
      l("div", {
        class: "bg-layer base",
        ref_key: "baseLayer",
        ref: r
      }, null, 512),
      l("div", {
        class: "bg-layer overlay",
        ref_key: "overlayLayer",
        ref: e
      }, null, 512),
      l("div", g, [
        v(a.$slots, "default", {}, void 0, !0)
      ])
    ], 4));
  }
});
const f = (o, t) => {
  const r = o.__vccOpts || o;
  for (const [e, c] of t)
    r[e] = c;
  return r;
}, m = /* @__PURE__ */ f(h, [["__scopeId", "data-v-fba164bc"]]), w = {
  install(o) {
    o.component("BgSwitcher", m);
  }
};
export {
  m as BgSwitcher,
  w as default
};
