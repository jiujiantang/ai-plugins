import { GroupedIcons, IconItem } from './types';

export declare const $icon: {
    icons: import('vue').Ref<GroupedIcons, GroupedIcons>;
    getIcon: (group: string, key: string, url: string, ttl?: number) => Promise<string>;
    preloadIcons: (group: string, iconList: IconItem[]) => Promise<string[]>;
    autoRefresh: () => Promise<void>;
};
