import { ThemeToggle } from './ThemeToggle.jsx';
import { Card } from '../Card/Card.jsx';
import { Button } from '../Button/Button.jsx';

export default {
  title: 'Componentes/ThemeToggle',
  component: ThemeToggle,
};

export const Default = {};

export const WithContent = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <ThemeToggle />
      <Card title="Vista previa" footer={<Button>Acción</Button>}>
        Cambia el tema para ver cómo se adapta.
      </Card>
    </div>
  ),
};
