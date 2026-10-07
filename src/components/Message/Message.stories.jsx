import { Message } from './Message.jsx';

export default {
  title: 'Componentes/Message',
  component: Message,
  args: { severity: 'info', text: 'Tu perfil se actualizará en unos minutos.' },
  argTypes: {
    severity: { control: 'select', options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger'] },
  },
};

export const Default = {};
export const WithTitle = { args: { severity: 'danger', title: 'No se pudo guardar', text: 'Revisa tu conexión.' } };
export const Closable = { args: { severity: 'success', text: 'Cambios guardados.', onClose: () => {} } };
export const All = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Message severity="info" text="Información" />
      <Message severity="success" text="Éxito" />
      <Message severity="warning" text="Aviso" />
      <Message severity="danger" text="Error" />
    </div>
  ),
};
