import { Chip } from './Chip.jsx';

export default {
  title: 'Componentes/Chip',
  component: Chip,
  args: { label: 'React' },
};

export const Default = {};
export const WithImage = { args: { label: 'Ana Torres', image: '/avatars/avatar-5.svg' } };
export const Removable = { args: { removable: true } };
