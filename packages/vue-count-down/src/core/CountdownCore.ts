import { EventEmitter } from '@/utils/EventEmitter';

export type CountdownEvent = 'start' | 'tick' | 'end' | 'pause' | 'resume' | 'set';

export class CountdownCore {
    readonly events = new EventEmitter();
    private endTime = 0;
    private timerId: number | null = null;
    private interval: number;
    private running = false;

    constructor(interval = 1000) {
        this.interval = Math.max(16, interval);
    }

    set(endTimestamp: number) {
        this.endTime = endTimestamp;
        this.events.emit('set', endTimestamp);
    }

    start(endTimestamp?: number) {
        if (typeof endTimestamp === 'number') this.endTime = endTimestamp;
        if (!this.endTime) throw new Error('endTime not set');
        if (this.running) return;
        this.running = true;
        this.events.emit('start', this.endTime);
        this.tick();
        this.timerId = window.setInterval(() => this.tick(), this.interval);
    }

    private tick() {
        const now = Date.now();
        const left = Math.max(0, this.endTime - now);
        this.events.emit('tick', left);

        if (left <= 0) {
            this.stopTimer();
            this.events.emit('end');
            this.running = false;
        }
    }

    pause() {
        if (!this.running) return;
        this.stopTimer();
        this.running = false;
        this.events.emit('pause');
    }

    resume() {
        if (this.running || !this.endTime) return;
        this.running = true;
        this.events.emit('resume');
        this.tick();
        this.timerId = window.setInterval(() => this.tick(), this.interval);
    }

    stop() {
        this.stopTimer();
        this.endTime = 0;
        this.running = false;
    }

    isRunning() {
        return this.running;
    }

    private stopTimer() {
        if (this.timerId !== null) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }
}
