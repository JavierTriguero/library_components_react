import { SelectButton } from './SelectButton.jsx';

const options = [
  { value: 'day', label: 'Día' },
  { value: 'week', label: 'Semana' },
  { value: 'month', label: 'Mes' },
];

export default {
  title: 'Componentes/SelectButton',
  component: SelectButton,
  args: { options, 'aria-label': 'Periodo' },
};

export const Single = { args: { defaultValue: 'week' } };
export const Multiple = { args: { multiple: true, defaultValue: ['day'] } };
