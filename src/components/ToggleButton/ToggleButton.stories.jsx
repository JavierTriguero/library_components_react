import { ToggleButton } from './ToggleButton.jsx';

export default {
  title: 'Componentes/ToggleButton',
  component: ToggleButton,
  args: { onLabel: 'Siguiendo', offLabel: 'Seguir' },
};

export const Default = {};
export const Checked = { args: { defaultChecked: true } };
