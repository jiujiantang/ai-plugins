import { ref } from 'vue';
import type { CachedIcon, GroupedIcons, IconItem } from './types';

const icons = ref<GroupedIcons>({});
const DEFAULT_TTL = 1000 * 60 * 60 * 24; // 默认24小时

const loadCache = () => {
    const raw = localStorage.getItem('icon_cache');
    if (raw) {
        try {
            icons.value = JSON.parse(raw);
        } catch {
            console.warn('[iconCache] localStorage 解析失败');
        }
    }
};

const saveCache = () => {
    localStorage.setItem('icon_cache', JSON.stringify(icons.value));
};

const isExpired = (item: CachedIcon) => Date.now() - item.timestamp >= item.ttl;

const getIcon = async (group: string, key: string, url: string, ttl = DEFAULT_TTL): Promise<string> => {
    const groupCache = icons.value[group] || {};
    const cacheItem = groupCache[key];
    if (cacheItem && !isExpired(cacheItem)) return cacheItem.url;

    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    icons.value[group] = {
        ...groupCache,
        [key]: { url: blobUrl, timestamp: Date.now(), ttl },
    };
    saveCache();
    return blobUrl;
};

const preloadIcons = async (group: string, iconList: IconItem[]) => {
    const tasks = iconList.map(item => getIcon(group, item.key, item.url, item.ttl));
    return Promise.all(tasks);
};

const autoRefresh = async () => {
    const now = Date.now();
    for (const group in icons.value) {
        const groupCache = icons.value[group];
        for (const key in groupCache) {
            const item = groupCache[key];
            if (isExpired(item)) {
                try {
                    debugger;
                    const res = await fetch(item.url);
                    const blob = await res.blob();
                    const newUrl = URL.createObjectURL(blob);
                    URL.revokeObjectURL(item.url);
                    item.url = newUrl;
                    item.timestamp = now;
                } catch {
                    console.warn(`[iconCache] 刷新失败: ${group}/${key}`);
                }
            }
        }
    }
    saveCache();
};

// 初始化加载缓存
loadCache();

// ✅ 导出模块 API
export const $icon = {
    icons,
    getIcon,
    preloadIcons,
    autoRefresh,
};
