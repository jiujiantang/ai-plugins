import { EventEmitter } from '../utils/EventEmitter';

export type CountdownEvent = 'start' | 'tick' | 'end' | 'pause' | 'resume' | 'set';
export declare class CountdownCore {
    readonly events: EventEmitter;
    private endTime;
    private timerId;
    private interval;
    private running;
    constructor(interval?: number);
    set(endTimestamp: number): void;
    start(endTimestamp?: number): void;
    private tick;
    pause(): void;
    resume(): void;
    stop(): void;
    isRunning(): boolean;
    private stopTimer;
}
