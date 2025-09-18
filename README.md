# 🔌 AI组件库

✨ 一个由 AI 驱动的跨框架组件库，支持 Vue / React / 通用插件，助力高效开发。  
通过 **AI 快速生成 + 单元测试保障 + 在线文档支撑**，让功能开发变得更简单、更稳定。

---

## 🚀 特性

- **AI 生成**  
  借助 AI 自动化生成组件雏形，快速满足日常业务需求。

- **即插即用**  
  所有组件均以独立功能单元封装，可单独引入或批量使用。

- **稳定可靠**  
  内置单元测试，保证组件迭代过程中的稳定性。

- **跨框架支持**  
  提供 Vue 组件、React 组件与通用逻辑封装，适配多种技术栈。

- **文档齐全**  
  在线文档与示例代码，帮助开发者快速上手。

---

## 📦 目录结构

```plaintext
📦 ai-components
├── 📂 packages/
│   ├── 📂 vue-xx/        # Vue 插件
│   │   └── 📂 test/      # 单元测试
│   ├── 📂 react-xx/      # React 插件
│   └── 📂 win-xx/        # 通用插件
│
├── 📂 books/           # 在线文档 (vitepress / docusaurus)
└── README.md
````

### 命令

```shell
# 安装本地模板
npx create-project
```

### vue-count-down
可声明多个实例的倒计时组件。

```shell
pnpm install vue-countdown-plugin
```

### vue-easy-popup
基于全局 open/close API 的弹窗组件。

```shell
pnpm install vue-easy-popup
```

### vue-ellipsis-title
自定义指令，当文本溢出时显示省略号，并在鼠标悬停时显示完整内容的提示框。

```shell
pnpm install vue-ellipsis-title
```

### vue_icon_cache
ImageDB 工具，用于在 IndexedDB 中存储和检索图片。

```shell
pnpm install vue_icon_cache
```

### vue_icon_in
背景切换组件，支持平滑过渡效果。当背景URL变化时，会显示淡入淡出的切换动画。

```shell
pnpm install vue_icon_in
```

### win-bridge
客户端连接桥插件。

```shell
pnpm install win-bridge
```




