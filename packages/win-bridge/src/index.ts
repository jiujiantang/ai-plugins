import WindowBridge from './WindowBridge'
import {provide,inject} from "vue";

export function useWindowBridgeProvider() {

  const windowBridge = new WindowBridge()

  const debugPanel = (logContainerSelector?: string) => {
    windowBridge.debugPanel(logContainerSelector)
  }
  const logger = (message: string) => {
    windowBridge.log(message)
  }
  const callExternalMethod = (method: string, ...args: any[]) => {
    windowBridge.callExternalMethod(method, ...args)
  }
  const registerClientMethod = (funcName: string, callback: (...args: any[]) => void) => {
    windowBridge.registerClientMethod(funcName, callback)
  }

  provide('windowBridge', {
    debugPanel,
    logger,
    callExternalMethod,
    registerClientMethod
  })
}

export function useWindowBridge() {
  return inject<{
    debugPanel: (logContainerSelector?: string) => void
    logger: (message: string) => void,
    callExternalMethod: (method: string, ...args: any[]) => void,
    registerClientMethod: (funcName: string, callback: (...args: any[]) => void) => void,
  }>('windowBridge')!
}