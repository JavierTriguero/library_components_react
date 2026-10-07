import { Checkbox } from './Checkbox.jsx';

export default {
  title: 'Componentes/Checkbox',
  component: Checkbox,
  args: { label: 'Acepto los términos y condiciones' },
};

export const Default = {};
export const Checked = { args: { defaultChecked: true } };
export const WithDescription = {
  args: { label: 'Newsletter', description: 'Recibe novedades una vez al mes.' },
};
export const Disabled = { args: { disabled: true, defaultChecked: true } };
