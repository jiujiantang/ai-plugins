(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".vue-easy-popup-loader{font-size:14px;font-weight:500;color:#4d4d4d;height:42px;line-height:42px;box-sizing:border-box;padding:0 28px;background:#FFFFFF;box-shadow:0 4px 10px #0000004d;border-radius:10px}.vue-popup-mask{position:fixed;display:flex;top:50%;left:50%;transform:translate(-50%,-50%);justify-content:center;align-items:center;z-index:999}.vuePopupBg{top:0;right:0;bottom:0;left:0;transform:none;background:rgba(0,0,0,.5)}.vue-popup-content{position:relative}.vue-popup-closeBtn,.vue-popup-cancelBtn,.vue-popup-okBtn{border:none;padding:0;margin:0;cursor:pointer;z-index:9}")),document.head.appendChild(e)}}catch(o){console.error("vite-plugin-css-injected-by-js",o)}})();
import { defineComponent as _, openBlock as u, createElementBlock as r, toDisplayString as v, normalizeClass as g, withModifiers as B, createElementVNode as i, Fragment as b, createVNode as h, createCommentVNode as C, createBlock as P, render as m } from "vue";
const w = ["innerHTML"], x = /* @__PURE__ */ _({
  __name: "HtmlContentPlugin",
  props: {
    html: {}
  },
  setup(e) {
    return (t, n) => (u(), r("div", { innerHTML: t.html }, null, 8, w));
  }
}), F = ["textContent"], M = /* @__PURE__ */ _({
  __name: "ToastContentPlugin",
  props: {
    text: {}
  },
  setup(e) {
    return (t, n) => (u(), r("div", {
      class: "vue-easy-popup-loader",
      textContent: v(t.text)
    }, null, 8, F));
  }
});
const O = { class: "vue-popup-content" }, T = /* @__PURE__ */ _({
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
  setup(e, { emit: t }) {
    const n = e, c = t;
    function o() {
      n.type !== "toast" && (n.showClose || c("close"));
    }
    const y = () => {
      c("close");
    }, f = () => {
      c("cancel");
    }, k = () => {
      c("ok");
    };
    return (s, $) => (u(), r("div", {
      class: g(["vue-popup-mask", { vuePopupBg: s.type === "html" }]),
      onClick: B(o, ["self"])
    }, [
      i("div", O, [
        s.type === "html" ? (u(), r(b, { key: 0 }, [
          h(x, { html: s.content }, null, 8, ["html"]),
          s.showClose ? (u(), r("button", {
            key: 0,
            class: "vue-popup-closeBtn",
            onClick: y
          })) : C("", !0),
          i("button", {
            class: "vue-popup-cancelBtn",
            onClick: f
          }),
          i("button", {
            class: "vue-popup-okBtn",
            onClick: k
          })
        ], 64)) : s.type === "toast" ? (u(), P(M, {
          key: 1,
          text: s.content
        }, null, 8, ["text"])) : C("", !0)
      ])
    ], 2));
  }
});
var p = /* @__PURE__ */ ((e) => (e.Close = "Close", e.Cancel = "Cancel", e.Ok = "Ok", e))(p || {});
const a = /* @__PURE__ */ new Map();
function d(e) {
  const t = e.type || "default";
  a.has(t) && l(t);
  const n = document.createElement("div");
  e.id && (n.id = e.id), document.body.appendChild(n), a.set(t, n);
  const c = h(T, {
    ...e,
    onClose: () => {
      var o;
      l(t), (o = e.close) == null || o.call(e, p.Close);
    },
    onCancel: () => {
      var o;
      l(t), (o = e.close) == null || o.call(e, p.Cancel);
    },
    onOk: () => {
      var o;
      l(t), (o = e.close) == null || o.call(e, p.Ok);
    }
  });
  m(c, n), t === "toast" && setTimeout(() => {
    l(t);
  }, 1500);
}
function l(e) {
  if (e) {
    const t = a.get(e);
    t && (m(null, t), document.body.removeChild(t), a.delete(e));
  } else
    a.forEach((t) => {
      m(null, t), document.body.removeChild(t);
    }), a.clear();
}
const H = {
  install(e) {
    e.config.globalProperties.$popup = { open: d, close: l }, e.directive("popup", {
      mounted(t, n) {
        t.addEventListener("click", () => d(n.value));
      }
    });
  },
  open: d,
  close: l
};
export {
  H as default
};
