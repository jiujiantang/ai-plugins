import type { Meta, StoryFn } from '@storybook/vue3';
import Countdown from './index';
import type CountdownProType from './types';
import doc from "../README.md?raw";

const meta: Meta<typeof Countdown> = {
    title: 'VUE组件/vue-countdown-plugin',
    component: Countdown,
    tags: ['autodocs'],
    argTypes: {
        keyName: { control: 'text' },
        end: { control: 'number' },
        autoStart: { control: 'boolean' },
        onFinish: { action: 'onFinish' },
    },
    parameters: {
        docs: {
            description: {
                component: doc,
            },
        },
    },
};
export default meta;

// Story 模板
const Template: StoryFn<typeof Countdown> = (args:CountdownProType) => ({
    components: { Countdown },
    setup() {
        return { args };
    },
    template: `
<Countdown v-bind="args">
  <template #default="{ time, left }">
    <p>倒计时: {{ time }}</p>
  </template>
</Countdown>
  `,
});

// 示例 Story
export const Demo = Template.bind({});
Demo.args = {
    keyName: 'onlyKey',
    end: Date.now() + 6000,
    autoStart: true,
};
