(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".popup-img[data-v-b2a31790]{max-width:100%;border-radius:8px}.vue-popup-mask{position:fixed;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.5);display:flex;justify-content:center;align-items:center}.vue-popup-content{position:relative}.vue-popup-closeBtn,.vue-popup-cancelBtn,.vue-popup-okBtn{border:none;padding:0;margin:0;cursor:pointer;z-index:9}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { defineComponent as p, openBlock as _, createElementBlock as m, withModifiers as k, createElementVNode as u, createBlock as C, createCommentVNode as f, createVNode as h, render as i } from "vue";
const y = ["innerHTML"], b = /* @__PURE__ */ p({
  __name: "HtmlContentPlugin",
  props: {
    html: {}
  },
  setup(e) {
    return (t, n) => (_(), m("div", { innerHTML: t.html }, null, 8, y));
  }
});
const g = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, a] of t)
    n[o] = a;
  return n;
}, B = /* @__PURE__ */ g(b, [["__scopeId", "data-v-b2a31790"]]), P = { class: "vue-popup-content" }, H = /* @__PURE__ */ p({
  __name: "Popup",
  props: {
    type: {},
    content: {}
  },
  emits: ["close", "cancel", "ok"],
  setup(e, { emit: t }) {
    const n = t, o = () => {
      n("close");
    }, a = () => {
      n("cancel");
    }, v = () => {
      n("ok");
    };
    return (d, O) => (_(), m("div", {
      class: "vue-popup-mask",
      onClick: k(o, ["self"])
    }, [
      u("div", P, [
        d.type === "html" ? (_(), C(B, {
          key: 0,
          html: d.content
        }, null, 8, ["html"])) : f("", !0),
        u("button", {
          class: "vue-popup-closeBtn",
          onClick: o
        }),
        u("button", {
          class: "vue-popup-cancelBtn",
          onClick: a
        }),
        u("button", {
          class: "vue-popup-okBtn",
          onClick: v
        })
      ])
    ]));
  }
});
var s = /* @__PURE__ */ ((e) => (e.Close = "Close", e.Cancel = "Cancel", e.Ok = "Ok", e))(s || {});
let c = null;
function r(e) {
  c && l(), c = document.createElement("div"), document.body.appendChild(c), e = { ...e, onClose: () => {
    var n;
    l(), (n = e.close) == null || n.call(e, s.Close);
  }, onCancel: () => {
    var n;
    l(), (n = e.close) == null || n.call(e, s.Cancel);
  }, onOk: () => {
    var n;
    l(), (n = e.close) == null || n.call(e, s.Ok);
  } };
  const t = h(H, {
    ...e
  });
  i(t, c);
}
function l() {
  c && (i(null, c), document.body.removeChild(c), c = null);
}
const L = {
  install(e) {
    e.config.globalProperties.$popup = { open: r, close: l }, e.directive("popup", {
      mounted(t, n) {
        t.addEventListener("click", () => r(n.value));
      }
    });
  },
  open: r,
  close: l
};
export {
  L as default
};
