import { External } from './types';

class WindowBridge {
    private debug: boolean;
    private logContainer: HTMLElement | null;

    constructor() {
        this.debug = false;
        this.logContainer = null;
    }

    private createDebugPanel(selector: string): void {
        const container = document.createElement('div');
        const parent = document.querySelector(selector);
        if (parent) {
            parent.appendChild(container);
            this.logContainer = container;
        } else {
            console.warn(`Selector "${selector}" not found.`);
        }
    }

    debugPanel(logContainerSelector?: string): void {
        this.debug = true;
        if (logContainerSelector) {
            this.createDebugPanel(logContainerSelector);
        }
    }

    log(message: string): void {
        if (this.logContainer) {
            const messageElement = document.createElement('div');
            messageElement.innerText = `${new Date().toISOString()} - ${message}`;
            this.logContainer.appendChild(messageElement);
            this.logContainer.scrollTop = this.logContainer.scrollHeight;
        }
    }

    callExternalMethod(method: string, ...args: any[]): any {
        this.log(`Calling method: ${method} with args: ${JSON.stringify(args)}`);

        const external:External = (window as any).external;

        try {
            if (typeof window !== 'undefined' && external && typeof external[method] === 'function') {
                try {
                    const result = external[method](...args);
                    this.log(`Method ${method} returned: ${result}`);
                    return result;
                } catch (error) {
                    this.log(`Error in method: ${method}, Error: ${error instanceof Error ? error.message : error}`);
                }
            } else {
                this.log(`Method ${method} not found`);
            }
        }catch (e: unknown){
            if (e instanceof Error) {
                this.log(e.message);
            } else {
                this.log('An unknown error occurred');
            }
        }

        return null;
    }

    registerClientMethod(funcName: string, callback: (...args: any[]) => void): void {
        if (typeof window !== 'undefined') {
            (window as any)[funcName] = (...args: any[]) => {
                this.log(`Client method called: ${funcName} with args: ${JSON.stringify(args)}`);
                try {
                    callback(...args);
                } catch (error) {
                    this.log(`Error in callback for ${funcName}, Error: ${error instanceof Error ? error.message : error}`);
                }
            };
        }
    }
}

export default WindowBridge;