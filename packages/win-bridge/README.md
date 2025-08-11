```vue
<script setup lang="ts">
import {useWindowBridgeProvider} from "win-bridge";
import Page from "./page.vue";
useWindowBridgeProvider()
</script>
<template>
  <Page />
</template>
```
```vue
<script setup lang="ts">
  import {nextTick, onMounted} from 'vue';
  import {useWindowBridge} from "win-bridge";
  const {debugPanel, logger, callExternalMethod, registerClientMethod} = useWindowBridge()

  onMounted(() => {
    nextTick(()=>{
      debugPanel("#log-panel")
      callExternalMethod("CloseLykWindow", 1,2,3)
      registerClientMethod("CloseLyk", (val)=>{
        console.log(val)
      })
    })
  })
</script>
<template>
  <div id="log-panel"></div>
</template>
```