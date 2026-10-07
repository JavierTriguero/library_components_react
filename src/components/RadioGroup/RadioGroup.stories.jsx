import { RadioGroup } from './RadioGroup.jsx';

export default {
  title: 'Componentes/RadioGroup',
  component: RadioGroup,
  args: {
    label: 'Método de pago',
    defaultValue: 'card',
    options: [
      { value: 'card', label: 'Tarjeta', description: 'Visa, Mastercard o American Express' },
      { value: 'paypal', label: 'PayPal' },
      { value: 'cash', label: 'Efectivo', disabled: true },
    ],
  },
  argTypes: { orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] } },
};

export const Default = {};
export const Horizontal = { args: { orientation: 'horizontal' } };
export const WithError = { args: { defaultValue: undefined, error: 'Elige un método de pago.' } };
