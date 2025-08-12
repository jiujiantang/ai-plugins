import { CountdownCore } from './CountdownCore';

export declare class CountdownManager {
    private cores;
    private interval;
    constructor(interval?: number);
    /** 获取某个 key 对应的倒计时核心，若无则新建 */
    getCore(key: string): CountdownCore;
    /** 清理某个 key 的倒计时实例 */
    deleteCore(key: string): void;
    /** 清理所有倒计时 */
    clear(): void;
}
export declare const countdownManager: CountdownManager;
