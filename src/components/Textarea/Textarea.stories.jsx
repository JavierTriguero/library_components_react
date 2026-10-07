import { Textarea } from './Textarea.jsx';

export default {
  title: 'Componentes/Textarea',
  component: Textarea,
  args: { label: 'Comentario', placeholder: 'Escribe aquí…' },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export const Default = {};
export const AutoResize = { args: { autoResize: true, rows: 2 } };
export const WithError = { args: { error: 'El comentario es obligatorio.' } };
