import type { Meta, StoryObj } from "@storybook/vue3";
import { ref, onMounted } from "vue";
import type { ImageDB } from "./types";
import { imageDB } from "./index";
import doc from "../README.md?raw";

// Demo 组件：存取图片
const ImageDBDemo = {
    props: {
        dbVersion: {
            type: String,
            default: "1.0.0"
        },
        showDBInfo: {
            type: Boolean,
            default: true
        }
    },
    template: `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h3>ImageDB 演示</h3>
      
      <div v-if="showDBInfo" style="margin-bottom: 20px; padding: 10px; background: #f5f5f5; border-radius: 4px;">
        <p><strong>数据库信息:</strong></p>
        <p>版本: {{ dbVersion }}</p>
        <p>状态: {{ dbStatus }}</p>
      </div>
      
      <div style="margin-bottom: 20px;">
        <input 
          type="file" 
          @change="onFileChange" 
          accept="image/*" 
          style="margin-bottom: 10px;"
        />
        <div>
          <label>
            图片键名: 
            <input 
              type="text" 
              v-model="imageKey" 
              placeholder="输入图片键名" 
              style="margin-left: 5px; padding: 5px;"
            />
          </label>
        </div>
      </div>
      
      <div v-if="errorMessage" style="color: red; margin-bottom: 15px;">
        {{ errorMessage }}
      </div>
      
      <div v-if="imgUrl" style="margin-top: 20px;">
        <p><strong>已存储并读取的图片：</strong></p>
        <img :src="imgUrl" style="max-width: 300px; border: 1px solid #ccc; border-radius: 4px;" />
        <div style="margin-top: 10px;">
          <button @click="retrieveImage(null)" style="padding: 5px 10px; background: #5352ed; color: white; border: none; border-radius: 3px; cursor: pointer; margin-right: 10px;">
            重新获取图片
          </button>
        </div>
      </div>
      
      <div v-if="operations.length > 0" style="margin-top: 20px;">
        <p><strong>操作历史:</strong></p>
        <ul style="list-style-type: none; padding: 0;">
          <li v-for="(op, index) in operations" :key="index" style="padding: 5px 0; border-bottom: 1px solid #eee;">
            {{ op }}
          </li>
        </ul>
      </div>
    </div>
  `,
    setup(props) {
        const imgUrl = ref<string | null>(null);
        const imageKey = ref("demo-image");
        const errorMessage = ref("");
        const dbStatus = ref("未初始化");
        const operations = ref<string[]>([]);
        let dbInstance: ImageDB | null = null;

        const addOperation = (message: string) => {
            operations.value.unshift(`${new Date().toLocaleTimeString()}: ${message}`);
            // 只保留最近10条操作记录
            if (operations.value.length > 10) {
                operations.value.pop();
            }
        };

        const initializeDB = async () => {
            try {
                dbStatus.value = "初始化中...";
                dbInstance = await imageDB(props.dbVersion);

                if (!dbInstance) {
                    throw new Error("❌ ImageDB 插件未注册");
                }

                dbStatus.value = "已初始化";
                addOperation(`数据库初始化成功，版本: ${props.dbVersion}`);

            } catch (error) {
                dbStatus.value = "初始化失败";
                errorMessage.value = `初始化失败: ${error instanceof Error ? error.message : String(error)}`;
                addOperation(`数据库初始化失败: ${error instanceof Error ? error.message : String(error)}`);
            }
        };

        const onFileChange = async (e: Event) => {
            const files = (e.target as HTMLInputElement).files;
            if (!files?.length) return;

            const file = files[0];
            if (!file.type.startsWith("image/")) {
                errorMessage.value = "请选择图片文件";
                return;
            }

            try {
                await initializeDB();

                const blob = file.slice();
                const key = imageKey.value || "demo-image";

                addOperation(`开始存储图片: ${key}`);
                await dbInstance.setImage(key, blob);
                addOperation(`图片存储成功: ${key}`);

                await retrieveImage(key);
            } catch (error) {
                errorMessage.value = `存储失败: ${error instanceof Error ? error.message : String(error)}`;
                addOperation(`图片存储失败: ${error instanceof Error ? error.message : String(error)}`);
            }
        };

        const retrieveImage = async (key?: string) => {
            try {
                await initializeDB();

                const imageKeyToRetrieve = key || imageKey.value;
                addOperation(`开始获取图片: ${imageKeyToRetrieve}`);

                const stored = await dbInstance!.getImage(imageKeyToRetrieve);
                if (stored) {
                    imgUrl.value = URL.createObjectURL(stored);
                    addOperation(`图片获取成功: ${imageKeyToRetrieve}`);
                } else {
                    errorMessage.value = `未找到键为 ${imageKeyToRetrieve} 的图片`;
                    addOperation(`图片获取失败: 未找到键为 ${imageKeyToRetrieve} 的图片`);
                }
            } catch (error) {
                errorMessage.value = `获取失败: ${error instanceof Error ? error.message : String(error)}`;
                addOperation(`图片获取失败: ${error instanceof Error ? error.message : String(error)}`);
            }
        };

        onMounted(async () => {
            await initializeDB();
        });

        return {
            imgUrl,
            imageKey,
            errorMessage,
            dbStatus,
            operations,
            onFileChange,
            retrieveImage,
        };
    },
};

const meta: Meta<typeof ImageDBDemo> = {
    title: "VUE组件/vue-icon-cache",
    component: ImageDBDemo,
    tags: ["autodocs"],
    argTypes: {
        dbVersion: {
            control: "text",
            description: "数据库版本号：递增",
            table: {
                defaultValue: { summary: "1.0.0" }
            }
        },
        showDBInfo: {
            control: "boolean",
            description: "是否显示数据库信息",
            table: {
                defaultValue: { summary: "true" }
            }
        }
    },
    parameters: {
        docs: {
            description: {
                component: doc,
            },
            source: {
                code: null, // 隐藏源代码显示
            },
        },
    },
    args: {
        dbVersion: "1.0.0",
        showDBInfo: true
    }
};

export default meta;
type Story = StoryObj<typeof ImageDBDemo>;

// 默认故事
export const Default: Story = {};