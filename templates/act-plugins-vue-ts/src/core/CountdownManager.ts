import { CountdownCore } from './CountdownCore';

type CoreMap = Map<string, CountdownCore>;

// 管理 key => CountdownCore 的单例容器
export class CountdownManager {
    private cores: CoreMap = new Map();
    private interval: number;

    constructor(interval = 1000) {
        this.interval = interval;
    }

    /** 获取某个 key 对应的倒计时核心，若无则新建 */
    getCore(key: string): CountdownCore {
        if (!this.cores.has(key)) {
            this.cores.set(key, new CountdownCore(this.interval));
        }
        return this.cores.get(key)!;
    }

    /** 清理某个 key 的倒计时实例 */
    deleteCore(key: string) {
        const core = this.cores.get(key);
        if (core) {
            core.stop();
            this.cores.delete(key);
        }
    }

    /** 清理所有倒计时 */
    clear() {
        this.cores.forEach(core => core.stop());
        this.cores.clear();
    }
}

// 全局单例倒计时管理器
export const countdownManager = new CountdownManager(1000);
