import { EmptyState } from './EmptyState.jsx';
import { Button } from '../Button/Button.jsx';
import { MagnifyingGlassIcon } from '../../utils/icons.jsx';

export default {
  title: 'Componentes/EmptyState',
  component: EmptyState,
  args: {
    title: 'Aún no hay proyectos',
    description: 'Crea tu primer proyecto para empezar a organizar el trabajo del equipo.',
    actions: <Button>Nuevo proyecto</Button>,
    bordered: true,
  },
};

export const Default = {};
export const NoResults = {
  args: {
    title: 'Sin resultados',
    description: 'No hay nada que coincida con «diseño 2027». Prueba con otros términos.',
    icon: <MagnifyingGlassIcon />,
    actions: <Button variant="secondary">Limpiar búsqueda</Button>,
    bordered: false,
  },
};
