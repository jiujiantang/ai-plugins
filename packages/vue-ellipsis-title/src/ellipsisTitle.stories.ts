import type { Meta } from "@storybook/vue3";
import { vEllipsisTitle } from "./core/TitleCore";
import doc from "../README.md?raw";

// 创建演示组件
const DemoComponent = {
    directives: {
        ellipsisTitle: vEllipsisTitle
    },
    props: {
        text: {
            type: String,
            required: true
        },
        width: {
            type: String,
            default: "200px"
        }
    },
    template: `
    <div 
      :style="{
        width: width,
        padding: '8px',
        margin: '4px 0'
      }"
      v-ellipsis-title
    >
      {{ text }}
    </div>
  `
};

const meta = {
    title: "VUE组件/vue-ellipsis-title",
    component: DemoComponent,
    tags: ['autodocs'],
    argTypes: {
        text: {
            control: 'text',
            description: "要显示的文本内容"
        },
        width: {
            control: 'text',
            description: "容器的宽度"
        }
    },
    parameters: {
        docs: {
            description: {
                component: doc
            },
            source: {
                code: `<template>
  <p class="test" v-ellipsis-title>这是一段中等长度的文本内容，用于演示效果</p>
</template>`,
            },
        },
    },
    args: {
        text: "这是一段中等长度的文本内容，用于演示效果",
        width: "200px",
    }
} satisfies Meta;

export default meta;

// 基础示例
export const Default = {
    args: {
        text: "这是一段中等长度的文本内容，用于演示效果",
        width: "200px",
    }
};