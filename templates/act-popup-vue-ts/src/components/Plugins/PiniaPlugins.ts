import { reactive, inject, provide } from "vue";

// 定义 Store 的类型：setup 函数，返回一个对象（包含 state、getter、action 等）
type StoreDef = () => object;

// 用于全局注入/获取的唯一 key
const STORE_KEY = Symbol("MyStore");

// 存储所有创建过的 store 实例（单例）
const storeMap = new Map<string, any>();

/**
 * defineStore：定义一个 store 创建函数
 * @param id - store 的唯一标识（命名空间）
 * @param setup - 返回 store 的函数（包含响应式数据和逻辑）
 * @returns useStore 函数（用于在组件中使用 store）
 */
export function defineStore(id: string, setup: StoreDef) {
    return function useStore() {
        // 如果该 store 尚未创建，执行 setup 并 reactive 化后存入 map
        if (!storeMap.has(id)) {
            const store = setup();
            storeMap.set(id, store); // 确保响应式
        }
        // 返回已存在的 store（确保同一个 id 的 store 是单例）
        return storeMap.get(id);
    };
}

/**
 * createStoreApp：用于创建 store 插件并注入到 Vue 应用
 * @returns 包含 install 方法的插件对象
 */
export function createStoreApp() {
    return {
        /**
         * install：Vue 插件安装函数
         * @param app - Vue 应用实例
         */
        install(app: any) {
            // 将全局 storeMap 注入到 Vue 应用中
            app.provide(STORE_KEY, storeMap);
        },
    };
}
