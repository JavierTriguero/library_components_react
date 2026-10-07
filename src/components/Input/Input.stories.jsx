import { Input } from './Input.jsx';

export default {
  title: 'Componentes/Input',
  component: Input,
  args: { label: 'Email', placeholder: 'tu@email.com', type: 'email' },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
};

export const Default = {};
export const WithDescription = { args: { description: 'Nunca compartiremos tu email.' } };
export const WithError = { args: { defaultValue: 'no-es-un-email', error: 'Introduce un email válido.' } };
export const Disabled = { args: { disabled: true } };
