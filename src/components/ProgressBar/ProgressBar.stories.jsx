import { ProgressBar } from './ProgressBar.jsx';
import { ProgressSpinner } from '../ProgressSpinner/ProgressSpinner.jsx';

export default {
  title: 'Componentes/ProgressBar',
  component: ProgressBar,
  args: { value: 60, showValue: true, severity: 'primary' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    severity: { control: 'select', options: ['primary', 'success', 'info', 'warning', 'danger'] },
  },
};

export const Determinate = {};
export const Indeterminate = { args: { value: undefined } };
export const Spinner = {
  render: () => (
    <div className="flex items-center gap-4">
      <ProgressSpinner size="sm" />
      <ProgressSpinner />
      <ProgressSpinner size="lg" className="text-success" />
    </div>
  ),
};
