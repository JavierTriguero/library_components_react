import { Button } from '../Button/Button.jsx';
import { Card } from './Card.jsx';

export default {
  title: 'Componentes/Card',
  component: Card,
  args: {
    title: 'Plan Pro',
    description: 'Todo lo que necesitas para tu equipo.',
    children: <p className="text-sm">Usuarios ilimitados, soporte prioritario y 100 GB de almacenamiento.</p>,
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export const Default = {};
export const WithFooter = {
  args: { footer: <Button>Contratar</Button> },
};
export const OnlyContent = {
  args: { title: undefined, description: undefined },
};
