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
};
