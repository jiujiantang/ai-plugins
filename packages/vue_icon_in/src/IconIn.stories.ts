import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import BgSwitcher from './BgSwitcher.vue';
import doc from "../README.md?raw";

// 预设一些图片 URL 用于演示
const sampleImages = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    'https://images.unsplash.com/photo-1452570053594-1b985d6ea890',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07'
];

const meta = {
    title: 'VUE组件/vue-icon-in',
    component: BgSwitcher,
    tags: ['autodocs'],
    argTypes: {
        url: {
            control: 'text',
            description: '背景图片的URL'
        },
        width: {
            control: {
                type: 'number',
                disable: false,
            },
            description: '容器宽度（像素）- 可选',
            table: {
                category: '尺寸',
                defaultValue: { summary: 'undefined (自适应)' }
            }
        },
        height: {
            control: {
                type: 'number',
                disable: false,
            },
            description: '容器高度（像素）- 可选',
            table: {
                category: '尺寸',
                defaultValue: { summary: 'undefined (自适应)' }
            }
        }
    },
    parameters: {
        docs: {
            description: {
                component: doc
            },
        }
    },
    args: {
        url: sampleImages[0],
        // 不设置默认宽高，展示自适应效果
    }
} satisfies Meta<typeof BgSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基础示例 - 自适应尺寸
export const Default: Story = {
    args: {
        url: sampleImages[0],
    },
    render: (args) => ({
        components: { BgSwitcher },
        setup() {
            return { args };
        },
        template: `
      <div style="width: 400px; height: 300px; margin: 0 auto;overflow: hidden">
        <BgSwitcher v-bind="args" style="margin-bottom: 20px;">
          <div style="color: white; text-align: center; padding: 80px 20px; font-size: 24px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
            自适应尺寸背景
            <p style="text-align: center;">此示例未设置宽高，组件会自适应父容器大小。</p>
          </div>
        </BgSwitcher>
      </div>
    `
    })
};

// 固定宽高示例
export const FixedDimensions: Story = {
    args: {
        url: sampleImages[1],
        width: 400,
        height: 300
    },
    render: (args) => ({
        components: { BgSwitcher },
        setup() {
            return { args };
        },
        template: `
      <div style="display: flex; justify-content: center;">
        <BgSwitcher v-bind="args">
          <div style="color: white; text-align: center; padding-top: 120px; font-size: 24px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
            固定尺寸: 400x300
          </div>
        </BgSwitcher>
      </div>
    `
    })
};

// 自动切换背景的示例
export const AutoSwitching: Story = {
    args: {
        width: 500,
        height: 350
    },
    render: (args) => ({
        components: { BgSwitcher },
        setup() {
            const currentImageIndex = ref(0);
            const currentUrl = ref(sampleImages[0]);

            // 自动切换背景
            setInterval(() => {
                currentImageIndex.value = (currentImageIndex.value + 1) % sampleImages.length;
                currentUrl.value = sampleImages[currentImageIndex.value];
            }, 3000);

            return { args, currentUrl };
        },
        template: `
      <div style="display: flex; justify-content: center;">
        <BgSwitcher :url="currentUrl" :width="args.width" :height="args.height">
          <div style="color: white; text-align: center; padding-top: 140px; font-size: 24px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
            自动切换背景 (3秒切换一次)
          </div>
        </BgSwitcher>
      </div>
    `
    })
};

// 手动切换背景的示例
export const ManualSwitching: Story = {
    args: {
        width: 450,
        height: 300
    },
    render: (args) => ({
        components: { BgSwitcher },
        setup() {
            const currentUrl = ref(sampleImages[0]);

            const switchBackground = (index: number) => {
                currentUrl.value = sampleImages[index];
            };

            return { args, currentUrl, switchBackground, sampleImages };
        },
        template: `
      <div style="text-align: center;">
        <div style="display: inline-block; margin-bottom: 15px;">
          <BgSwitcher :url="currentUrl" :width="args.width" :height="args.height">
            <div style="color: white; text-align: center; padding-top: 120px; font-size: 24px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
              手动切换背景
            </div>
          </BgSwitcher>
        </div>
        
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
          <button 
            v-for="(img, index) in sampleImages" 
            :key="index"
            @click="switchBackground(index)"
            style="padding: 8px 12px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;"
          >
            背景 {{ index + 1 }}
          </button>
        </div>
      </div>
    `
    })
};