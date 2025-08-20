(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".loader[data-v-5d8b5a3f]{font-size:14px;font-weight:500;color:#4d4d4d;height:42px;line-height:42px;box-sizing:border-box;padding:0 28px;background:#FFFFFF;box-shadow:0 4px 10px #0000004d;border-radius:10px}.vue-popup-mask{position:fixed;display:flex;top:50%;left:50%;transform:translate(-50%,-50%);justify-content:center;align-items:center}.vuePopupBg{top:0;right:0;bottom:0;left:0;transform:none;background:rgba(0,0,0,.5)}.vue-popup-content{position:relative}.vue-popup-closeBtn,.vue-popup-cancelBtn,.vue-popup-okBtn{border:none;padding:0;margin:0;cursor:pointer;z-index:9}")),document.head.appendChild(e)}}catch(o){console.error("vite-plugin-css-injected-by-js",o)}})();
import { defineComponent as _, openBlock as u, createElementBlock as a, toDisplayString as h, normalizeClass as g, withModifiers as b, createElementVNode as d, Fragment as B, createVNode as C, createCommentVNode as m, createBlock as P, render as f } from "vue";
const x = ["innerHTML"], O = /* @__PURE__ */ _({
  __name: "HtmlContentPlugin",
  props: {
    html: {}
  },
  setup(e) {
    return (n, t) => (u(), a("div", { innerHTML: n.html }, null, 8, x));
  }
}), T = ["textContent"], F = /* @__PURE__ */ _({
  __name: "ToastContentPlugin",
  props: {
    text: {}
  },
  setup(e) {
    return (n, t) => (u(), a("div", {
      class: "loader",
      textContent: h(n.text)
    }, null, 8, T));
  }
});
const $ = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [c, p] of n)
    t[c] = p;
  return t;
}, w = /* @__PURE__ */ $(F, [["__scopeId", "data-v-5d8b5a3f"]]), M = { class: "vue-popup-content" }, H = /* @__PURE__ */ _({
  __name: "Popup",
  props: {
    id: {},
    type: {},
    content: {},
    showClose: { type: Boolean },
    close: { type: Function },
    onClose: { type: Function },
    onCancel: { type: Function },
    onOk: { type: Function }
  },
  emits: ["close", "cancel", "ok"],
  setup(e, { emit: n }) {
    const t = e, c = n;
    function p() {
      t.type !== "toast" && (t.showClose || c("close"));
    }
    const k = () => {
      c("close");
    }, v = () => {
      c("cancel");
    }, y = () => {
      c("ok");
    };
    return (s, L) => (u(), a("div", {
      class: g(["vue-popup-mask", { vuePopupBg: s.type === "html" }]),
      onClick: b(p, ["self"])
    }, [
      d("div", M, [
        s.type === "html" ? (u(), a(B, { key: 0 }, [
          C(O, { html: s.content }, null, 8, ["html"]),
          s.showClose ? (u(), a("button", {
            key: 0,
            class: "vue-popup-closeBtn",
            onClick: k
          })) : m("", !0),
          d("button", {
            class: "vue-popup-cancelBtn",
            onClick: v
          }),
          d("button", {
            class: "vue-popup-okBtn",
            onClick: y
          })
        ], 64)) : s.type === "toast" ? (u(), P(w, {
          key: 1,
          text: s.content
        }, null, 8, ["text"])) : m("", !0)
      ])
    ], 2));
  }
});
var r = /* @__PURE__ */ ((e) => (e.Close = "Close", e.Cancel = "Cancel", e.Ok = "Ok", e))(r || {});
let o = null;
function i(e) {
  o && l(), o = document.createElement("div"), e.id && (o.id = e.id), document.body.appendChild(o), e = { ...e, onClose: () => {
    var t;
    l(), (t = e.close) == null || t.call(e, r.Close);
  }, onCancel: () => {
    var t;
    l(), (t = e.close) == null || t.call(e, r.Cancel);
  }, onOk: () => {
    var t;
    l(), (t = e.close) == null || t.call(e, r.Ok);
  } };
  const n = C(H, {
    ...e
  });
  f(n, o), e.type === "toast" && setTimeout(() => {
    l();
  }, 1e3);
}
function l() {
  o && (f(null, o), document.body.removeChild(o), o = null);
}
const V = {
  install(e) {
    e.config.globalProperties.$popup = { open: i, close: l }, e.directive("popup", {
      mounted(n, t) {
        n.addEventListener("click", () => i(t.value));
      }
    });
  },
  open: i,
  close: l
};
export {
  V as default
};
