window.external 上挂载客户端功能，window 上挂载网页功能，实现网站、客户端的通信。通过 npm install win-bridge 安装使用。

```vue
<script setup lang="ts">
  import {useWindowBridgeProvider} from "win-bridge";
  import BridgeConsumer from "./BridgeConsumer.vue";
  useWindowBridgeProvider()
</script>
<template> <BridgeConsumer /> </template>
```
```vue
<template>
  <div>
    <button @click="initDebug">启用 Debug 面板</button>
    <button @click="callTest">调用 external.testMethod</button>
    <button @click="triggerClient">触发 client 回调</button>
    <div id="debug-panel" style="margin-top:20px; max-height:200px; overflow:auto; border:1px solid #ddd; padding:10px;">
    </div>
  </div>
</template>
<script setup lang="ts">
  import {useWindowBridge} from "win-bridge";
  const bridge = useWindowBridge()
  const initDebug = () => {
    bridge.debugPanel('#debug-panel')
    bridge.logger('Debug panel initialized.')
  }
  const callTest = () => {
    ;(window as any).external = {
      testMethod: (msg: string) => `Echo: ${msg}`
    }
    bridge.callExternalMethod('testMethod', 'Hello from Storybook')
  }
  const triggerClient = () => {
    bridge.registerClientMethod('onMessage', (msg: string) => {
      bridge.logger(`Client received: ${msg}`)
    })
    ;(window as any).onMessage?.('Triggered manually!')
  }
</script>
```