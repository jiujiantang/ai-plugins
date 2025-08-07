import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'images-db';
const STORE_NAME = 'images';

// 解析版本号：支持 "v1.2.3" → 123
const parseVersion = (v: string | number): number =>
    typeof v === 'string'
        ? parseInt(v.replace(/\D/g, '')) || 1
        : v || 1;

/**
 * 获取已存在数据库的旧版本号（openDB 之前执行）
 */
const getExistingVersion = async (): Promise<number> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME);
        request.onsuccess = () => {
            const version = request.result.version;
            request.result.close();
            resolve(version);
        };
        request.onerror = () => reject(request.error);
        request.onupgradeneeded = e => resolve(e.oldVersion || 0); // 新建库时为 0
    });
};

/**
 * 创建并返回已打开的数据库实例（懒加载）
 */
const openDatabase = async (version: number): Promise<IDBPDatabase> => {
    return openDB(DB_NAME, version, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        },
    });
};

/**
 * 初始化 imageDB 工具
 * @param versionStr - 版本号（如 "v1.0.2"）
 */
const config = async (versionStr: string | number) => {
    const version = parseVersion(versionStr);
    const oldVersion = await getExistingVersion();

    // 返回封装后的工具方法
    const getDB = () => openDatabase(version);

    const closeDB =async () => {
        const db = await getDB();
        db.close();
    }

    const setImage = async (key: string, blob: Blob) => {
        if (version === oldVersion) return; // 版本一致不写入
        const db = await getDB();
        await db.put(STORE_NAME, blob, key);
    };

    const getImage = async (key: string): Promise<Blob | undefined> => {
        const db = await getDB();
        return db.get(STORE_NAME, key);
    };

    // 返回简洁接口（也可 export default）
    return {
        closeDB,
        setImage,
        getImage,
        version,
        oldVersion,
    };
};

export default config;
