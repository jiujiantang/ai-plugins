(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".vue-easy-popup-loader{font-size:14px;font-weight:500;color:#4d4d4d;height:42px;line-height:42px;box-sizing:border-box;padding:0 28px;background:#FFFFFF;box-shadow:0 4px 10px #0000004d;border-radius:10px}.vue-popup-mask{position:fixed;display:flex;top:50%;left:50%;transform:translate(-50%,-50%);justify-content:center;align-items:center;z-index:999}.vuePopupBg{top:0;right:0;bottom:0;left:0;transform:none;background:rgba(0,0,0,.5)}.vue-popup-content{position:relative}.vue-popup-closeBtn,.vue-popup-cancelBtn,.vue-popup-okBtn{border:none;padding:0;margin:0;cursor:pointer;z-index:9}")),document.head.appendChild(e)}}catch(o){console.error("vite-plugin-css-injected-by-js",o)}})();
import { defineComponent as d, openBlock as s, createElementBlock as u, toDisplayString as f, normalizeClass as g, withModifiers as B, createElementVNode as p, Fragment as P, createVNode as m, createCommentVNode as _, createBlock as b, render as C } from "vue";
const x = ["innerHTML"], F = /* @__PURE__ */ d({
  __name: "HtmlContentPlugin",
  props: {
    html: {}
  },
  setup(e) {
    return (n, t) => (s(), u("div", { innerHTML: n.html }, null, 8, x));
  }
}), O = ["textContent"], T = /* @__PURE__ */ d({
  __name: "ToastContentPlugin",
  props: {
    text: {}
  },
  setup(e) {
    return (n, t) => (s(), u("div", {
      class: "vue-easy-popup-loader",
      textContent: f(n.text)
    }, null, 8, O));
  }
});
const $ = { class: "vue-popup-content" }, w = /* @__PURE__ */ d({
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
    const t = e, a = n;
    function y() {
      t.type !== "toast" && (t.showClose || a("close"));
    }
    const k = () => {
      a("close");
    }, v = () => {
      a("cancel");
    }, h = () => {
      a("ok");
    };
    return (c, M) => (s(), u("div", {
      class: g(["vue-popup-mask", { vuePopupBg: c.type === "html" }]),
      onClick: B(y, ["self"])
    }, [
      p("div", $, [
        c.type === "html" ? (s(), u(P, { key: 0 }, [
          m(F, { html: c.content }, null, 8, ["html"]),
          c.showClose ? (s(), u("button", {
            key: 0,
            class: "vue-popup-closeBtn",
            onClick: k
          })) : _("", !0),
          p("button", {
            class: "vue-popup-cancelBtn",
            onClick: v
          }),
          p("button", {
            class: "vue-popup-okBtn",
            onClick: h
          })
        ], 64)) : c.type === "toast" ? (s(), b(T, {
          key: 1,
          text: c.content
        }, null, 8, ["text"])) : _("", !0)
      ])
    ], 2));
  }
});
var r = /* @__PURE__ */ ((e) => (e.Close = "Close", e.Cancel = "Cancel", e.Ok = "Ok", e))(r || {});
let l = null;
function i(e) {
  l && o(), l = document.createElement("div"), e.id && (l.id = e.id), document.body.appendChild(l), e = { ...e, onClose: () => {
    var t;
    o(), (t = e.close) == null || t.call(e, r.Close);
  }, onCancel: () => {
    var t;
    o(), (t = e.close) == null || t.call(e, r.Cancel);
  }, onOk: () => {
    var t;
    o(), (t = e.close) == null || t.call(e, r.Ok);
  } };
  const n = m(w, {
    ...e
  });
  C(n, l), e.type === "toast" && setTimeout(() => {
    o();
  }, 1e3);
}
function o() {
  l && (C(null, l), document.body.removeChild(l), l = null);
}
const L = {
  install(e) {
    e.config.globalProperties.$popup = { open: i, close: o }, e.directive("popup", {
      mounted(n, t) {
        n.addEventListener("click", () => i(t.value));
      }
    });
  },
  open: i,
  close: o
};
export {
  L as default
};
