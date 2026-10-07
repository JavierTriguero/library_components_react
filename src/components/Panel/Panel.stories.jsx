import { Panel } from './Panel.jsx';

export default {
  title: 'Componentes/Panel',
  component: Panel,
  args: {
    header: 'Resumen',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
  },
};

export const Default = {};
export const Toggleable = { args: { toggleable: true, footer: 'Actualizado hace 5 minutos' } };
