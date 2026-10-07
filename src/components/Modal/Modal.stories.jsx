import { useState } from 'react';
import { Button } from '../Button/Button.jsx';
import { Modal } from './Modal.jsx';

export default {
  title: 'Componentes/Modal',
  component: Modal,
  args: {
    title: '¿Eliminar proyecto?',
    description: 'Esta acción no se puede deshacer.',
    size: 'md',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir modal</Button>
        <Modal
          {...args}
          open={open}
          onClose={close}
          footer={
            <>
              <Button variant="secondary" onClick={close}>Cancelar</Button>
              <Button variant="danger" onClick={close}>Eliminar</Button>
            </>
          }
        />
      </>
    );
  },
};

export const Default = {};
export const WithContent = {
  args: {
    children: <p className="text-sm">Se eliminarán también todos los archivos asociados al proyecto.</p>,
  },
};
