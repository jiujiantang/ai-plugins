/**
 * 初始化 imageDB 工具
 * @param versionStr - 版本号（如 "v1.0.2"）
 */
declare const config: (versionStr: string | number) => Promise<{
    closeDB: () => Promise<void>;
    setImage: (key: string, blob: Blob) => Promise<void>;
    getImage: (key: string) => Promise<Blob | undefined>;
    version: number;
    oldVersion: number;
}>;
export default config;
