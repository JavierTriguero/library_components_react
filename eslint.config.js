import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  { ignores: ['dist', 'storybook-static', 'node_modules'] },
  js.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
    },
    settings: { react: { version: 'detect' } },
    rules: {
      // Las props se documentan con JSDoc, no con PropTypes.
      'react/prop-types': 'off',
    },
  },
  {
    files: ['*.config.js', '.storybook/**/*.js'],
    languageOptions: { globals: { ...globals.node } },
  },
  // Desactiva las reglas de estilo que ya gestiona Prettier. Debe ir al final.
  prettier,
];
