export interface External {
    [method: string]: (...args: any[]) => any;
}
