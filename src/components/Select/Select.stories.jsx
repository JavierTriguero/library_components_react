import { useState } from 'react';
import { Select } from './Select.jsx';

const countries = [
  { value: 'es', label: 'España' },
  { value: 'mx', label: 'México' },
  { value: 'ar', label: 'Argentina' },
  { value: 'co', label: 'Colombia', disabled: true },
];

export default {
  title: 'Componentes/Select',
  component: Select,
  args: { label: 'País', options: countries },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export const Default = {};
function ControlledSelect(args) {
  const [value, setValue] = useState('mx');
  return (
    <div className="flex flex-col gap-2">
      <Select {...args} value={value} onChange={setValue} />
      <p className="text-sm text-muted-foreground">Valor: {value}</p>
    </div>
  );
}

export const Controlled = { render: (args) => <ControlledSelect {...args} /> };
export const WithError = { args: { error: 'Selecciona un país.' } };
export const Disabled = { args: { disabled: true, defaultValue: 'es' } };
