import { MeterGroup } from './MeterGroup.jsx';

export default {
  title: 'Componentes/MeterGroup',
  component: MeterGroup,
  args: {
    values: [
      { label: 'Apps', value: 16 },
      { label: 'Mensajes', value: 8 },
      { label: 'Multimedia', value: 24 },
      { label: 'Sistema', value: 10 },
    ],
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
