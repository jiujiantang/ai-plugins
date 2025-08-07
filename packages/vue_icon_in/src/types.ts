export interface ImageDB {
    closeDB: () => void;
    setImage: (key: string, blob: Blob) => Promise<void>;
    getImage: (key: string) => Promise<Blob | undefined>;
    version: number;
    oldVersion: number;
}