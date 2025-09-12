// src/utils/EventEmitter.ts
export type Handler<T = any> = (payload?: T) => void;

export class EventEmitter {
    private handlers = new Map<string, Set<Handler>>();

    on<T = any>(event: string, handler: Handler<T>) {
        if (!this.handlers.has(event)) this.handlers.set(event, new Set());
        this.handlers.get(event)!.add(handler as Handler);
        return () => this.off(event, handler);
    }

    once<T = any>(event: string, handler: Handler<T>) {
        const wrapper = (payload?: T) => {
            try { handler(payload); } finally { this.off(event, wrapper); }
        };
        return this.on(event, wrapper);
    }

    off<T = any>(event: string, handler?: Handler<T>) {
        if (!handler) { this.handlers.delete(event); return; }
        const set = this.handlers.get(event);
        if (!set) return;
        set.delete(handler as Handler);
        if (set.size === 0) this.handlers.delete(event);
    }

    emit<T = any>(event: string, payload?: T) {
        const set = this.handlers.get(event);
        if (!set) return;
        Array.from(set).forEach(h => { try { (h as Handler<T>)(payload); } catch {} });
    }
}
