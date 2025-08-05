export interface IconItem {
    key: string;
    url: string;
    ttl?: number;
}
export interface CachedIcon {
    url: string;
    timestamp: number;
    ttl: number;
}
export type IconMap = Record<string, CachedIcon>;
export type GroupedIcons = Record<string, IconMap>;
