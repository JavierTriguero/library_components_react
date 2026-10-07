/** @type {import('@storybook/react-vite').StorybookConfig} */
export default {
  stories: ['../src/**/*.stories.@(js|jsx)'],
  framework: '@storybook/react-vite',
  addons: ['@storybook/addon-vitest', '@storybook/addon-a11y'],
};
