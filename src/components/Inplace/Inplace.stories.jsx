import { Inplace } from './Inplace.jsx';
import { Input } from '../Input/Input.jsx';

export default {
  title: 'Componentes/Inplace',
  component: Inplace,
};

export const Default = {
  render: () => (
    <Inplace display="Haz clic para editar" closable>
      <Input aria-label="Nombre" defaultValue="Ana Torres" />
    </Inplace>
  ),
};
