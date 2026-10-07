import { useState } from 'react';
import { BlockUI } from './BlockUI.jsx';
import { Button } from '../Button/Button.jsx';
import { Card } from '../Card/Card.jsx';
import { ProgressSpinner } from '../ProgressSpinner/ProgressSpinner.jsx';

function BlockUIDemo() {
  const [blocked, setBlocked] = useState(true);
  return (
    <div className="flex max-w-sm flex-col gap-3">
      <Button variant="secondary" onClick={() => setBlocked(!blocked)}>
        {blocked ? 'Desbloquear' : 'Bloquear'}
      </Button>
      <BlockUI blocked={blocked} template={<ProgressSpinner className="text-white" />} className="rounded-lg">
        <Card title="Formulario" footer={<Button>Enviar</Button>}>
          Contenido que no se puede usar mientras está bloqueado.
        </Card>
      </BlockUI>
    </div>
  );
}

export default {
  title: 'Componentes/BlockUI',
  component: BlockUI,
};

export const Default = { render: () => <BlockUIDemo /> };
