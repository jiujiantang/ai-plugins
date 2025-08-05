export interface IconItem {
    key: string;
    url: string;
    ttl?: number; // 图标缓存时间（毫秒）
}

export interface CachedIcon {
    url: string;
    timestamp: number;
    ttl: number;
}

export type IconMap = Record<string, CachedIcon>;
export type GroupedIcons = Record<string, IconMap>;