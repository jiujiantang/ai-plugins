(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".popup-img[data-v-b2a31790]{max-width:100%;border-radius:8px}.vue-popup-mask{position:fixed;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.5);display:flex;justify-content:center;align-items:center}.vue-popup-content{position:relative}.vue-popup-closeBtn,.vue-popup-cancelBtn,.vue-popup-okBtn{border:none;padding:0;margin:0;cursor:pointer;z-index:9}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { defineComponent as m, openBlock as s, createElementBlock as _, withModifiers as h, createElementVNode as d, createBlock as y, createCommentVNode as i, createVNode as b, render as C } from "vue";
const g = ["innerHTML"], B = /* @__PURE__ */ m({
  __name: "HtmlContentPlugin",
  props: {
    html: {}
  },
  setup(e) {
    return (t, n) => (s(), _("div", { innerHTML: t.html }, null, 8, g));
  }
});
const O = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, a] of t)
    n[o] = a;
  return n;
}, P = /* @__PURE__ */ O(B, [["__scopeId", "data-v-b2a31790"]]), H = { class: "vue-popup-content" }, w = /* @__PURE__ */ m({
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
    const n = e, o = t;
    function a() {
      n.showClose || o("close");
    }
    const k = () => {
      o("close");
    }, v = () => {
      o("cancel");
    }, f = () => {
      o("ok");
    };
    return (r, F) => (s(), _("div", {
      class: "vue-popup-mask",
      onClick: h(a, ["self"])
    }, [
      d("div", H, [
        r.type === "html" ? (s(), y(P, {
          key: 0,
          html: r.content
        }, null, 8, ["html"])) : i("", !0),
        r.showClose ? (s(), _("button", {
          key: 1,
          class: "vue-popup-closeBtn",
          onClick: k
        })) : i("", !0),
        d("button", {
          class: "vue-popup-cancelBtn",
          onClick: v
        }),
        d("button", {
          class: "vue-popup-okBtn",
          onClick: f
        })
      ])
    ]));
  }
});
var u = /* @__PURE__ */ ((e) => (e.Close = "Close", e.Cancel = "Cancel", e.Ok = "Ok", e))(u || {});
let c = null;
function p(e) {
  c && l(), c = document.createElement("div"), c.id = e.id, document.body.appendChild(c), e = { ...e, onClose: () => {
    var n;
    l(), (n = e.close) == null || n.call(e, u.Close);
  }, onCancel: () => {
    var n;
    l(), (n = e.close) == null || n.call(e, u.Cancel);
  }, onOk: () => {
    var n;
    l(), (n = e.close) == null || n.call(e, u.Ok);
  } };
  const t = b(w, {
    ...e
  });
  C(t, c);
}
function l() {
  c && (C(null, c), document.body.removeChild(c), c = null);
}
const x = {
  install(e) {
    e.config.globalProperties.$popup = { open: p, close: l }, e.directive("popup", {
      mounted(t, n) {
        t.addEventListener("click", () => p(n.value));
      }
    });
  },
  open: p,
  close: l
};
export {
  x as default
};
