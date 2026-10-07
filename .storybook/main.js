/** @type {import('@storybook/react-vite').StorybookConfig} */
export default {
  stories: ['../docs/**/*.mdx', '../src/**/*.stories.@(js|jsx)'],
  framework: '@storybook/react-vite',
  // Recursos locales de las historias (p. ej. avatares): capturas estables sin depender de servicios externos.
  staticDirs: ['./public'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    // Panel «Visual Tests»: compara capturas de cada historia con Chromatic.
    '@chromatic-com/storybook',
  ],
};
