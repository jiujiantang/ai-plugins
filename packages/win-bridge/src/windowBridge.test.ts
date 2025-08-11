import WindowBridge from './WindowBridge';

describe('WindowBridge', () => {
    let windowBridge: WindowBridge;

    beforeEach(() => {
        document.body.innerHTML = '<div id="test-container"></div>';
        windowBridge = new WindowBridge();
    });

    it('should create a debug panel when a valid selector is provided', () => {
        windowBridge.debugPanel('#test-container');
        expect(document.querySelector('#test-container div')).not.toBeNull();
    });

    it('should log messages to the log container', () => {
        windowBridge.debugPanel('#test-container');
        windowBridge.log('Test message');
        const logElement = document.querySelector<HTMLElement>('#test-container div div');
        expect(logElement).not.toBeNull();
        expect(logElement?.innerText).toContain('Test message');
    });

    it('should call external method and log the result', () => {
        // Mock window.external
        (window as any).external = {
            testMethod: jest.fn(() => 'Mock result')
        };

        windowBridge.debugPanel('#test-container');
        const result = windowBridge.callExternalMethod('testMethod', 'arg1', 'arg2');

        expect((window as any).external.testMethod).toHaveBeenCalledWith('arg1', 'arg2');
        expect(result).toBe('Mock result');
        const logElement = document.querySelector<HTMLElement>('#test-container div div:last-child');
        expect(logElement?.innerText).toContain('Method testMethod returned: Mock result');
    });

    it('should register a client method and call the callback', () => {
        const mockCallback = jest.fn();

        windowBridge.debugPanel('#test-container');
        windowBridge.registerClientMethod('clientMethod', mockCallback);

        // Simulate calling the registered function
        (window as any).clientMethod('param1', 'param2');
        expect(mockCallback).toHaveBeenCalledWith('param1', 'param2');

        const logElement = document.querySelector<HTMLElement>('#test-container div div:last-child');
        expect(logElement?.innerText).toContain('Client method called: clientMethod with args: ["param1","param2"]');
    });
});
