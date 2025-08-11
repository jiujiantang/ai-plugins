declare class WindowBridge {
    private debug;
    private logContainer;
    constructor();
    private createDebugPanel;
    debugPanel(logContainerSelector?: string): void;
    log(message: string): void;
    callExternalMethod(method: string, ...args: any[]): any;
    registerClientMethod(funcName: string, callback: (...args: any[]) => void): void;
}
export default WindowBridge;
