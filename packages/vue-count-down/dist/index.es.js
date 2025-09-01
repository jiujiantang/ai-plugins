var f = Object.defineProperty;
var m = (r, t, e) => t in r ? f(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var o = (r, t, e) => (m(r, typeof t != "symbol" ? t + "" : t, e), e);
import { defineComponent as p, ref as u, onMounted as g, watch as w, onBeforeUnmount as v, renderSlot as S, createTextVNode as y, toDisplayString as M } from "vue";
class T {
  constructor() {
    o(this, "handlers", /* @__PURE__ */ new Map());
  }
  on(t, e) {
    return this.handlers.has(t) || this.handlers.set(t, /* @__PURE__ */ new Set()), this.handlers.get(t).add(e), () => this.off(t, e);
  }
  once(t, e) {
    const n = (i) => {
      try {
        e(i);
      } finally {
        this.off(t, n);
      }
    };
    return this.on(t, n);
  }
  off(t, e) {
    if (!e) {
      this.handlers.delete(t);
      return;
    }
    const n = this.handlers.get(t);
    n && (n.delete(e), n.size === 0 && this.handlers.delete(t));
  }
  emit(t, e) {
    const n = this.handlers.get(t);
    n && Array.from(n).forEach((i) => {
      try {
        i(e);
      } catch {
      }
    });
  }
}
class C {
  constructor(t = 1e3) {
    o(this, "events", new T());
    o(this, "endTime", 0);
    o(this, "timerId", null);
    o(this, "interval");
    o(this, "running", !1);
    this.interval = Math.max(16, t);
  }
  set(t) {
    this.endTime = t, this.events.emit("set", t);
  }
  start(t) {
    if (typeof t == "number" && (this.endTime = t), !this.endTime)
      throw new Error("endTime not set");
    this.running || (this.running = !0, this.events.emit("start", this.endTime), this.tick(), this.timerId = window.setInterval(() => this.tick(), this.interval));
  }
  tick() {
    const t = Date.now(), e = Math.max(0, this.endTime - t);
    this.events.emit("tick", e), e <= 0 && (this.stopTimer(), this.events.emit("end"), this.running = !1);
  }
  pause() {
    this.running && (this.stopTimer(), this.running = !1, this.events.emit("pause"));
  }
  resume() {
    this.running || !this.endTime || (this.running = !0, this.events.emit("resume"), this.tick(), this.timerId = window.setInterval(() => this.tick(), this.interval));
  }
  stop() {
    this.stopTimer(), this.endTime = 0, this.running = !1;
  }
  isRunning() {
    return this.running;
  }
  stopTimer() {
    this.timerId !== null && (clearInterval(this.timerId), this.timerId = null);
  }
}
class I {
  constructor(t = 1e3) {
    o(this, "cores", /* @__PURE__ */ new Map());
    o(this, "interval");
    this.interval = t;
  }
  /** 获取某个 key 对应的倒计时核心，若无则新建 */
  getCore(t) {
    return this.cores.has(t) || this.cores.set(t, new C(this.interval)), this.cores.get(t);
  }
  /** 清理某个 key 的倒计时实例 */
  deleteCore(t) {
    const e = this.cores.get(t);
    e && (e.stop(), this.cores.delete(t));
  }
  /** 清理所有倒计时 */
  clear() {
    this.cores.forEach((t) => t.stop()), this.cores.clear();
  }
}
const d = new I(1e3);
function k(r) {
  const t = Math.floor(r / 1e3), e = t % 60, n = Math.floor(t / 60) % 60, i = Math.floor(t / 3600) % 24, a = Math.floor(t / 86400), h = String(e).padStart(2, "0"), l = String(n).padStart(2, "0"), s = String(i).padStart(2, "0");
  return `${String(a)},${s},${l},${h}`;
}
const $ = /* @__PURE__ */ p({
  __name: "Countdown",
  props: {
    keyName: { type: String, required: !0 },
    // 分组 key，必填
    end: { type: Number, required: !0 },
    // 结束时间戳 ms
    autoStart: { type: Boolean, default: !0 },
    onFinish: { type: Function, default: null }
  },
  setup(r) {
    const t = r, e = u(""), n = u(0);
    let i, a = null, h = null;
    function l(s) {
      typeof s < "u" && s >= 0 && (e.value = k(s), n.value = s);
    }
    return g(() => {
      i = d.getCore(t.keyName), i.set(t.end), a = i.events.on("tick", l), h = i.events.on("end", () => {
        t.onFinish(t.keyName);
      }), t.autoStart && i.start(), w(() => t.end, (s) => {
        i.set(s), i.isRunning() || i.start();
      });
    }), v(() => {
      a == null || a(), h == null || h(), d.deleteCore(t.keyName);
    }), (s, c) => S(s.$slots, "default", {
      time: e.value,
      left: n.value
    }, () => [
      y(M(e.value), 1)
    ]);
  }
});
export {
  d as countdownManager,
  $ as default
};
