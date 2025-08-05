import { fn } from '@storybook/test';

import helper from 'common'

const {Toast} = helper

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Example/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    primary: true,
  },
};

