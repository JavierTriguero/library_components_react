import { Divider } from './Divider.jsx';

export default {
  title: 'Componentes/Divider',
  component: Divider,
  args: { type: 'solid', align: 'center' },
  argTypes: {
    type: { control: 'inline-radio', options: ['solid', 'dashed', 'dotted'] },
    align: { control: 'inline-radio', options: ['left', 'center', 'right'] },
  },
};

export const Default = {};
export const WithText = { args: { children: 'o continúa con' } };
export const Vertical = {
  render: () => (
    <div className="flex h-12 items-center text-sm">
      Inicio
      <Divider orientation="vertical" />
      Perfil
      <Divider orientation="vertical" />
      Ajustes
    </div>
  ),
};
