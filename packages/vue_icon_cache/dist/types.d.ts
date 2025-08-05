export interface ImageDB {
    setImage: (key: string, blob: Blob) => Promise<void>;
    getImage: (key: string) => Promise<Blob | undefined>;
    version: number;
    oldVersion: number;
}
