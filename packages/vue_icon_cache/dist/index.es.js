const g = (e, n) => n.some((t) => e instanceof t);
let w, b;
function V() {
  return w || (w = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function S() {
  return b || (b = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const y = /* @__PURE__ */ new WeakMap(), m = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap();
function j(e) {
  const n = new Promise((t, r) => {
    const i = () => {
      e.removeEventListener("success", c), e.removeEventListener("error", o);
    }, c = () => {
      t(d(e.result)), i();
    }, o = () => {
      r(e.error), i();
    };
    e.addEventListener("success", c), e.addEventListener("error", o);
  });
  return l.set(n, e), n;
}
function A(e) {
  if (y.has(e))
    return;
  const n = new Promise((t, r) => {
    const i = () => {
      e.removeEventListener("complete", c), e.removeEventListener("error", o), e.removeEventListener("abort", o);
    }, c = () => {
      t(), i();
    }, o = () => {
      r(e.error || new DOMException("AbortError", "AbortError")), i();
    };
    e.addEventListener("complete", c), e.addEventListener("error", o), e.addEventListener("abort", o);
  });
  y.set(e, n);
}
let I = {
  get(e, n, t) {
    if (e instanceof IDBTransaction) {
      if (n === "done")
        return y.get(e);
      if (n === "store")
        return t.objectStoreNames[1] ? void 0 : t.objectStore(t.objectStoreNames[0]);
    }
    return d(e[n]);
  },
  set(e, n, t) {
    return e[n] = t, !0;
  },
  has(e, n) {
    return e instanceof IDBTransaction && (n === "done" || n === "store") ? !0 : n in e;
  }
};
function L(e) {
  I = e(I);
}
function O(e) {
  return S().includes(e) ? function(...n) {
    return e.apply(h(this), n), d(this.request);
  } : function(...n) {
    return d(e.apply(h(this), n));
  };
}
function T(e) {
  return typeof e == "function" ? O(e) : (e instanceof IDBTransaction && A(e), g(e, V()) ? new Proxy(e, I) : e);
}
function d(e) {
  if (e instanceof IDBRequest)
    return j(e);
  if (m.has(e))
    return m.get(e);
  const n = T(e);
  return n !== e && (m.set(e, n), l.set(n, e)), n;
}
const h = (e) => l.get(e);
function v(e, n, { blocked: t, upgrade: r, blocking: i, terminated: c } = {}) {
  const o = indexedDB.open(e, n), a = d(o);
  return r && o.addEventListener("upgradeneeded", (s) => {
    r(d(o.result), s.oldVersion, s.newVersion, d(o.transaction), s);
  }), t && o.addEventListener("blocked", (s) => t(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    s.oldVersion,
    s.newVersion,
    s
  )), a.then((s) => {
    c && s.addEventListener("close", () => c()), i && s.addEventListener("versionchange", (u) => i(u.oldVersion, u.newVersion, u));
  }).catch(() => {
  }), a;
}
const N = ["get", "getKey", "getAll", "getAllKeys", "count"], W = ["put", "add", "delete", "clear"], D = /* @__PURE__ */ new Map();
function E(e, n) {
  if (!(e instanceof IDBDatabase && !(n in e) && typeof n == "string"))
    return;
  if (D.get(n))
    return D.get(n);
  const t = n.replace(/FromIndex$/, ""), r = n !== t, i = W.includes(t);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(t in (r ? IDBIndex : IDBObjectStore).prototype) || !(i || N.includes(t))
  )
    return;
  const c = async function(o, ...a) {
    const s = this.transaction(o, i ? "readwrite" : "readonly");
    let u = s.store;
    return r && (u = u.index(a.shift())), (await Promise.all([
      u[t](...a),
      i && s.done
    ]))[0];
  };
  return D.set(n, c), c;
}
L((e) => ({
  ...e,
  get: (n, t, r) => E(n, t) || e.get(n, t, r),
  has: (n, t) => !!E(n, t) || e.has(n, t)
}));
const F = ["continue", "continuePrimaryKey", "advance"], P = {}, B = /* @__PURE__ */ new WeakMap(), x = /* @__PURE__ */ new WeakMap(), k = {
  get(e, n) {
    if (!F.includes(n))
      return e[n];
    let t = P[n];
    return t || (t = P[n] = function(...r) {
      B.set(this, x.get(this)[n](...r));
    }), t;
  }
};
async function* K(...e) {
  let n = this;
  if (n instanceof IDBCursor || (n = await n.openCursor(...e)), !n)
    return;
  n = n;
  const t = new Proxy(n, k);
  for (x.set(t, n), l.set(t, h(n)); n; )
    yield t, n = await (B.get(t) || n.continue()), B.delete(t);
}
function M(e, n) {
  return n === Symbol.asyncIterator && g(e, [IDBIndex, IDBObjectStore, IDBCursor]) || n === "iterate" && g(e, [IDBIndex, IDBObjectStore]);
}
L((e) => ({
  ...e,
  get(n, t, r) {
    return M(n, t) ? K : e.get(n, t, r);
  },
  has(n, t) {
    return M(n, t) || e.has(n, t);
  }
}));
const C = "images-db", f = "images", R = (e) => typeof e == "string" ? parseInt(e.replace(/\D/g, "")) || 1 : e || 1, $ = async () => new Promise((e, n) => {
  const t = indexedDB.open(C);
  t.onsuccess = () => {
    const r = t.result.version;
    t.result.close(), e(r);
  }, t.onerror = () => n(t.error), t.onupgradeneeded = (r) => e(r.oldVersion || 0);
}), _ = async (e) => v(C, e, {
  upgrade(n) {
    n.objectStoreNames.contains(f) || n.createObjectStore(f);
  }
}), p = async (e) => {
  const n = R(e), t = await $(), r = () => _(n);
  return {
    closeDB: async () => {
      (await r()).close();
    },
    setImage: async (a, s) => {
      if (n === t)
        return;
      await (await r()).put(f, s, a);
    },
    getImage: async (a) => (await r()).get(f, a),
    version: n,
    oldVersion: t
  };
}, z = {
  install(e) {
    e.config.globalProperties.$imageDB = p, e.provide("$imageDB", p);
  }
};
export {
  p as imageDB,
  z as imageDBPlugin
};
