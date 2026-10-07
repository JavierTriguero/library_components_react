import { Badge } from './Badge.jsx';

const severities = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];

export default {
  title: 'Componentes/Badge',
  component: Badge,
  args: { value: 4, severity: 'primary', size: 'md' },
  argTypes: {
    severity: { control: 'select', options: severities },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
};

export const Default = {};
export const Dot = { args: { value: undefined } };
export const Severities = {
  render: () => (
    <div className="flex gap-2">
      {severities.map((s) => (
        <Badge key={s} value={s} severity={s} />
      ))}
    </div>
  ),
};
