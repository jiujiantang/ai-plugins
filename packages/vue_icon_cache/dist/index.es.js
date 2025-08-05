import { ref as g } from "vue";
const a = g({}), w = 1e3 * 60 * 60 * 24, m = () => {
  const t = localStorage.getItem("icon_cache");
  if (t)
    try {
      a.value = JSON.parse(t);
    } catch {
      console.warn("[iconCache] localStorage 解析失败");
    }
}, b = () => {
  localStorage.setItem("icon_cache", JSON.stringify(a.value));
}, h = (t) => Date.now() - t.timestamp >= t.ttl, f = async (t, e, n, o = w) => {
  const c = a.value[t] || {}, s = c[e];
  if (s && !h(s))
    return s.url;
  const r = await (await fetch(n)).blob(), i = URL.createObjectURL(r);
  return a.value[t] = {
    ...c,
    [e]: { url: i, timestamp: Date.now(), ttl: o }
  }, b(), i;
}, p = async (t, e) => {
  const n = e.map((o) => f(t, o.key, o.url, o.ttl));
  return Promise.all(n);
}, v = async () => {
  const t = Date.now();
  for (const e in a.value) {
    const n = a.value[e];
    for (const o in n) {
      const c = n[o];
      if (h(c))
        try {
          debugger;
          const l = await (await fetch(c.url)).blob(), r = URL.createObjectURL(l);
          URL.revokeObjectURL(c.url), c.url = r, c.timestamp = t;
        } catch {
          console.warn(`[iconCache] 刷新失败: ${e}/${o}`);
        }
    }
  }
  b();
};
m();
const u = {
  icons: a,
  getIcon: f,
  preloadIcons: p,
  autoRefresh: v
}, L = {
  install(t) {
    t.config.globalProperties.$icon = u, t.provide("$icon", u);
  }
};
export {
  u as $icon,
  L as default
};
