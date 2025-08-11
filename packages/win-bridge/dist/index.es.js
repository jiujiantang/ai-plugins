var d = Object.defineProperty;
var g = (o, e, t) => e in o ? d(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var s = (o, e, t) => (g(o, typeof e != "symbol" ? e + "" : e, t), t);
import { provide as a, inject as c } from "vue";
class h {
  constructor() {
    s(this, "debug");
    s(this, "logContainer");
    this.debug = !1, this.logContainer = null;
  }
  createDebugPanel(e) {
    const t = document.createElement("div"), r = document.querySelector(e);
    r ? (r.appendChild(t), this.logContainer = t) : console.warn(`Selector "${e}" not found.`);
  }
  debugPanel(e) {
    this.debug = !0, e && this.createDebugPanel(e);
  }
  log(e) {
    if (this.logContainer) {
      const t = document.createElement("div");
      t.innerText = `${(/* @__PURE__ */ new Date()).toISOString()} - ${e}`, this.logContainer.appendChild(t), this.logContainer.scrollTop = this.logContainer.scrollHeight;
    }
  }
  callExternalMethod(e, ...t) {
    this.log(`Calling method: ${e} with args: ${JSON.stringify(t)}`);
    const r = window.external;
    try {
      if (typeof window < "u" && r && typeof r[e] == "function")
        try {
          const n = r[e](...t);
          return this.log(`Method ${e} returned: ${n}`), n;
        } catch (n) {
          this.log(`Error in method: ${e}, Error: ${n instanceof Error ? n.message : n}`);
        }
      else
        this.log(`Method ${e} not found`);
    } catch (n) {
      this.log(n);
    }
    return null;
  }
  registerClientMethod(e, t) {
    typeof window < "u" && (window[e] = (...r) => {
      this.log(`Client method called: ${e} with args: ${JSON.stringify(r)}`);
      try {
        t(...r);
      } catch (n) {
        this.log(`Error in callback for ${e}, Error: ${n instanceof Error ? n.message : n}`);
      }
    });
  }
}
function f() {
  const o = new h();
  a("windowBridge", {
    debugPanel: (i) => {
      o.debugPanel(i);
    },
    logger: (i) => {
      o.log(i);
    },
    callExternalMethod: (i, ...l) => {
      o.callExternalMethod(i, ...l);
    },
    registerClientMethod: (i, l) => {
      o.registerClientMethod(i, l);
    }
  });
}
function C() {
  return c("windowBridge");
}
export {
  C as useWindowBridge,
  f as useWindowBridgeProvider
};
