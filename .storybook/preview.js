import './tailwind.css';

/** @type {import('@storybook/react-vite').Preview} */
export default {
  parameters: {
    controls: { expanded: true },
    // Un problema de accesibilidad (axe) hace fallar el test de la historia.
    a11y: { test: 'error' },
  },
};
