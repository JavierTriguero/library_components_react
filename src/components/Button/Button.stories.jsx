import { Button } from './Button.jsx';

export default {
  title: 'Componentes/Button',
  component: Button,
  args: { children: 'Botón' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
};

export const Primary = { args: { variant: 'primary' } };
export const Secondary = { args: { variant: 'secondary' } };
export const Danger = { args: { variant: 'danger' } };
export const Disabled = { args: { disabled: true } };
