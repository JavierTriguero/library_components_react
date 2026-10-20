import { DateRangePicker } from './DateRangePicker.jsx';

export default {
  title: 'Componentes/DateRangePicker',
  component: DateRangePicker,
  args: { label: 'Periodo', months: 2, locale: 'es', weekStartsOn: 1 },
  argTypes: {
    months: { control: 'inline-radio', options: [1, 2] },
    weekStartsOn: { control: 'inline-radio', options: [0, 1] },
    locale: { control: 'select', options: ['es', 'en-US', 'fr', 'de', 'pt-BR'] },
  },
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
};

export const Default = {};
export const WithValue = { args: { defaultValue: [new Date(2026, 9, 5), new Date(2026, 9, 18)] } };
export const OneMonthNoPresets = { args: { months: 1, presets: false } };
export const English = { args: { label: 'Date range', locale: 'en-US', weekStartsOn: 0, placeholder: 'Pick a range' } };
export const WithError = { args: { error: 'Elige un periodo.' } };
