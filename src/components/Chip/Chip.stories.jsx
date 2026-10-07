import { Chip } from './Chip.jsx';

export default {
  title: 'Componentes/Chip',
  component: Chip,
  args: { label: 'React' },
};

export const Default = {};
export const WithImage = { args: { label: 'Ana Torres', image: 'https://i.pravatar.cc/150?img=5' } };
export const Removable = { args: { removable: true } };
