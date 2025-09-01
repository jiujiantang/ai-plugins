import { h } from "vue";
import { open, close } from "./core/PopUpCore";
import type { PopupOptions } from "./types";
import type { Meta } from "@storybook/vue3";
import doc from "../README.md?raw";

const meta = {
    title: "VUE组件/vue-easy-popup",
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: { type: "select" },
            options: ["html", "toast"],
            description: "弹窗类型"
        },
        content: {
            control: 'text',
            description: "弹窗内容(HTML或文本)"
        },
        showClose: {
            control: 'boolean',
            description: "是否显示关闭按钮"
        },
    },
    parameters: {
        docs: {
            description: {
                component: doc,
            },
            source: {
                code: `暂无`
            }
        },
    },
    args: {
        type: "html",
        content: "这是一个弹窗示例",
        showClose: false,
    }
} satisfies Meta;

export default meta;

const Template: StoryFn<PopupOptions> = (args) => ({
    setup() {
        return () =>
            h(
                "button",
                {
                    class: "storybook-button",
                    onClick: () => open({
                        ...args,
                        close: (e) => console.log("关闭事件：", e)
                    } as PopupOptions),
                },
                `打开${args.type === 'toast' ? 'Toast' : '弹窗'}`
            );
    },
});

// 默认弹窗
export const Default = Template.bind({});
Default.args = {
    type: "html",
    content: "<div style='width: 200px;height: 150px;padding: 20px;background: #ffffff;border-radius: 8px;text-align: center;box-shadow: 0 2px 12px rgba(0,0,0,0.15)'>这是一个默认弹窗</div>",
    showClose: false,
};
Default.parameters = {
    docs: {
        description: {
            story: "基础弹窗，支持HTML内容，可显示关闭按钮。",
        },
    },
};

// Toast 弹窗
export const Toast = Template.bind({});
Toast.args = {
    type: "toast",
    content: "操作成功！",
    showClose: false,
};
Toast.parameters = {
    docs: {
        description: {
            story: "轻量提示弹窗，通常会自动关闭，常用于操作反馈。",
        },
    },
};


// 关闭所有弹窗
export const CloseAll = {
    render: () =>
        h(
            "button",
            {
                onClick: () => close()
            },
            "关闭所有弹窗"
        )
};
CloseAll.parameters = {
    docs: {
        description: {
            story: "关闭所有当前打开的弹窗。",
        },
    },
}
