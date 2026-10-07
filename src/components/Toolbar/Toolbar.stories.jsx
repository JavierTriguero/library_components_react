import { Button } from '../Button/Button.jsx';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup.jsx';
import { Toolbar } from './Toolbar.jsx';

export default {
  title: 'Componentes/Toolbar',
  component: Toolbar,
};

export const Default = {
  args: {
    start: (
      <>
        <Button size="sm">Nuevo</Button>
        <Button size="sm" variant="secondary">
          Subir
        </Button>
      </>
    ),
    end: (
      <Button size="sm" variant="danger">
        Eliminar
      </Button>
    ),
  },
};

export const Group = {
  render: () => (
    <ButtonGroup aria-label="Alineación">
      <Button variant="secondary">Izquierda</Button>
      <Button variant="secondary">Centro</Button>
      <Button variant="secondary">Derecha</Button>
    </ButtonGroup>
  ),
};
