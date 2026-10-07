import { Tag } from './Tag.jsx';

const severities = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];

export default {
  title: 'Componentes/Tag',
  component: Tag,
  args: { value: 'Nuevo', severity: 'primary', rounded: false },
  argTypes: { severity: { control: 'select', options: severities } },
};

export const Default = {};
export const Rounded = { args: { rounded: true } };
export const Severities = {
  render: () => (
    <div className="flex gap-2">
      {severities.map((s) => (
        <Tag key={s} value={s} severity={s} />
      ))}
    </div>
  ),
};
