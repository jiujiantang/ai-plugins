var d = Object.defineProperty;
var g = (r, e, t) => e in r ? d(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var s = (r, e, t) => (g(r, typeof e != "symbol" ? e + "" : e, t), t);
import { provide as a, inject as c } from "vue";
class h {
  constructor() {
    s(this, "debug");
    s(this, "logContainer");
    this.debug = !1, this.logContainer = null;
  }
  createDebugPanel(e) {
    const t = document.createElement("div"), o = document.querySelector(e);
    o ? (o.appendChild(t), this.logContainer = t) : console.warn(`Selector "${e}" not found.`);
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
    const o = window.external;
    try {
      if (typeof window < "u" && o && typeof o[e] == "function")
        try {
          const n = o[e](...t);
          return this.log(`Method ${e} returned: ${n}`), n;
        } catch (n) {
          this.log(`Error in method: ${e}, Error: ${n instanceof Error ? n.message : n}`);
        }
      else
        this.log(`Method ${e} not found`);
    } catch (n) {
      n instanceof Error ? this.log(n.message) : this.log("An unknown error occurred");
    }
    return null;
  }
  registerClientMethod(e, t) {
    typeof window < "u" && (window[e] = (...o) => {
      this.log(`Client method called: ${e} with args: ${JSON.stringify(o)}`);
      try {
        t(...o);
      } catch (n) {
        this.log(`Error in callback for ${e}, Error: ${n instanceof Error ? n.message : n}`);
      }
    });
  }
}
function f() {
  const r = new h();
  a("windowBridge", {
    debugPanel: (i) => {
      r.debugPanel(i);
    },
    logger: (i) => {
      r.log(i);
    },
    callExternalMethod: (i, ...l) => {
      r.callExternalMethod(i, ...l);
    },
    registerClientMethod: (i, l) => {
      r.registerClientMethod(i, l);
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
