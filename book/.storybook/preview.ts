import type { Preview } from "@storybook/vue3";

function argsToProps(args: Record<string, any> = {}): string {
  return Object.entries(args)
      .map(([key, value]) => {
        if (value === true) return key; // 布尔 true 简写
        if (value === false || value == null) return ""; // 忽略 false 和 null
        if (typeof value === "string") return `${key}="${value}"`;
        return `:${key}="${JSON.stringify(value)}"`; // 其他类型用 v-bind 语法
      })
      .filter(Boolean)
      .join(" ");
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      source: {
        transform: (src, storyContext) => {
          const story = storyContext.originalStoryFn({});
          if (story?.template) {
            const args = storyContext.args || {};
            const props = argsToProps(args);
            // 把 <Countdown v-bind="args"> 替换成真实 props
            return story.template
                .replace(/<Countdown[^>]*>/, `<Countdown ${props}>`)
                .trim();
          }
          return src;
        },
      },
    },
  },
};

export default preview;
