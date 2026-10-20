import './tailwind.css';
import { extractArgTypes, extractComponentDescription } from './jsdoc-docs.js';

/** @type {import('@storybook/react-vite').Preview} */
export default {
  // Genera una página «Docs» por componente a partir de su JSDoc y sus historias.
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: { extractArgTypes, extractComponentDescription },
    // Un problema de accesibilidad (axe) hace fallar el test de la historia.
    a11y: { test: 'error' },
  },
  // Selector de tema en la barra superior: aplica data-theme como lo haría ThemeToggle.
  globalTypes: {
    theme: {
      description: 'Tema',
      toolbar: {
        title: 'Tema',
        icon: 'mirror',
        items: [
          { value: 'system', title: 'Sistema' },
          { value: 'light', title: 'Claro' },
          { value: 'dark', title: 'Oscuro' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'system' },
  decorators: [
    (Story, { globals }) => {
      const root = document.documentElement;
      if (globals.theme === 'light' || globals.theme === 'dark') root.setAttribute('data-theme', globals.theme);
      else root.removeAttribute('data-theme');
      return Story();
    },
  ],
};
