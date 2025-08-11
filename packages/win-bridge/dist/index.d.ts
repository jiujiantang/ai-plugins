export declare function useWindowBridgeProvider(): void;
export declare function useWindowBridge(): {
    debugPanel: (logContainerSelector?: string) => void;
    logger: (message: string) => void;
    callExternalMethod: (method: string, ...args: any[]) => void;
    registerClientMethod: (funcName: string, callback: (...args: any[]) => void) => void;
};
