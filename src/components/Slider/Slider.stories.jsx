import { Slider } from './Slider.jsx';

export default {
  title: 'Componentes/Slider',
  component: Slider,
  args: { label: 'Volumen', showValue: true },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export const Default = { args: { defaultValue: 40 } };
export const Range = { args: { label: 'Precio (€)', range: true, defaultValue: [20, 80] } };
export const Step = { args: { step: 10, defaultValue: 50 } };
