import type { Meta, StoryObj } from '@storybook/vue3'
import { defineComponent, h } from 'vue'
import { useWindowBridgeProvider, useWindowBridge } from './index'
import doc from "../README.md?raw";

// 子组件：只使用 inject
const BridgeConsumer = defineComponent({
    template: `
    <div>
      <button @click="initDebug">启用 Debug 面板</button>
      <button @click="callTest">调用 external.testMethod</button>
      <button @click="triggerClient">触发 client 回调</button>
      <div id="debug-panel" style="margin-top:20px; max-height:200px; overflow:auto; border:1px solid #ddd; padding:10px;"></div>
    </div>
  `,
    setup() {
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

        return { initDebug, callTest, triggerClient }
    }
})

// 父组件：提供 WindowBridge
const WindowBridgeDemo = defineComponent({
    setup() {
        useWindowBridgeProvider()
    },
    render() {
        return h(BridgeConsumer)
    }
})

const meta: Meta<typeof WindowBridgeDemo> = {
    title: 'VUE组件/win-bridge',
    component: WindowBridgeDemo,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: doc
            },
            source: {
                code: "暂无", // 隐藏源代码显示
            },
        }
    },
}
export default meta
type Story = StoryObj<typeof WindowBridgeDemo>

export const Default: Story = {}
