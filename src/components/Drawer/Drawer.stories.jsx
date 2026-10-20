import { useState } from 'react';
import { Drawer } from './Drawer.jsx';
import { Button } from '../Button/Button.jsx';
import { Checkbox } from '../Checkbox/Checkbox.jsx';
import { Slider } from '../Slider/Slider.jsx';

function DrawerDemo(args) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir filtros</Button>
      <Drawer
        {...args}
        open={open}
        onClose={close}
        footer={
          <>
            <Button variant="secondary" onClick={close}>
              Cancelar
            </Button>
            <Button onClick={close}>Aplicar</Button>
          </>
        }
      >
        <div className="flex flex-col gap-6">
          <Slider label="Precio máximo (€)" defaultValue={60} showValue />
          <div className="flex flex-col gap-3">
            <Checkbox label="Envío gratis" defaultChecked />
            <Checkbox label="Solo en stock" />
            <Checkbox label="Con valoraciones" />
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default {
  title: 'Componentes/Drawer',
  component: Drawer,
  args: { title: 'Filtros', description: 'Ajusta los resultados de la búsqueda.', side: 'auto', size: 'md' },
  render: (args) => <DrawerDemo {...args} />,
};

export const Auto = {};
export const Right = { args: { side: 'right' } };
export const Bottom = { args: { side: 'bottom' } };
export const Left = { args: { side: 'left', size: 'sm' } };
