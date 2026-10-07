import { Switch } from './Switch.jsx';

export default {
  title: 'Componentes/Switch',
  component: Switch,
  args: { label: 'Notificaciones', description: 'Recibe avisos por email.' },
};

export const Default = {};
export const Checked = { args: { defaultChecked: true } };
export const Disabled = { args: { disabled: true } };
