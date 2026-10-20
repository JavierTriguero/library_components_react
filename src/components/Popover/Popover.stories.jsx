import { Popover } from './Popover.jsx';
import { Button } from '../Button/Button.jsx';
import { Input } from '../Input/Input.jsx';

export default {
  title: 'Componentes/Popover',
  component: Popover,
  args: { placement: 'bottom-start' },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'right'],
    },
  },
};

export const Default = {
  args: {
    trigger: <Button variant="secondary">Dimensiones</Button>,
    title: 'Dimensiones',
    children: ({ close }) => (
      <div className="flex flex-col gap-3">
        <Input label="Ancho" defaultValue="100%" />
        <Input label="Alto" defaultValue="25px" />
        <Button size="sm" onClick={close}>
          Aplicar
        </Button>
      </div>
    ),
  },
};

export const Simple = {
  args: {
    trigger: <Button variant="secondary">¿Qué es esto?</Button>,
    children: 'Los paneles flotantes muestran contenido extra sin salir de la página.',
  },
};
