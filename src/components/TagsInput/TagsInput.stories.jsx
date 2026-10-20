import { TagsInput } from './TagsInput.jsx';

export default {
  title: 'Componentes/TagsInput',
  component: TagsInput,
  args: {
    label: 'Etiquetas',
    placeholder: 'Escribe y pulsa Enter',
    description: 'Separa con Enter o coma.',
    defaultValue: ['react', 'tailwind'],
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const Default = {};
export const Emails = {
  args: {
    label: 'Invitar por email',
    defaultValue: [],
    placeholder: 'nombre@empresa.com',
    description: 'Puedes pegar varios separados por comas. Máximo 5.',
    max: 5,
    validate: (tag) => /^\S+@\S+\.\S+$/.test(tag),
  },
};
export const WithError = { args: { defaultValue: [], error: 'Añade al menos una etiqueta.' } };
