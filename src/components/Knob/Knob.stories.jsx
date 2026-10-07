import { Knob } from './Knob.jsx';

export default {
  title: 'Componentes/Knob',
  component: Knob,
  args: { label: 'Volumen', defaultValue: 60 },
};

export const Default = {};
export const Template = { args: { valueTemplate: (v) => v + '%', size: 140 } };
export const ReadOnly = { args: { readOnly: true, value: 35 } };
