import { create } from '@storybook/theming';
import img from './addon-library.png';

declare module '*.png' {
  const value: string;
  export default value;
}

export default create({
  base: 'light',
  brandTitle: 'My custom storybook',
  brandUrl: './',
  brandImage: img,
  brandTarget: '_self',
});
