export type Handler<T = any> = (payload?: T) => void;
export declare class EventEmitter {
    private handlers;
    on<T = any>(event: string, handler: Handler<T>): () => void;
    once<T = any>(event: string, handler: Handler<T>): () => void;
    off<T = any>(event: string, handler?: Handler<T>): void;
    emit<T = any>(event: string, payload?: T): void;
}
