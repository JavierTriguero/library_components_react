import { Fieldset } from './Fieldset.jsx';

export default {
  title: 'Componentes/Fieldset',
  component: Fieldset,
  args: {
    legend: 'Datos personales',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
  },
};

export const Default = {};
export const Toggleable = { args: { toggleable: true } };
