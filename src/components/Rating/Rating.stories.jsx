import { Rating } from './Rating.jsx';

export default {
  title: 'Componentes/Rating',
  component: Rating,
  args: { defaultValue: 3 },
};

export const Default = {};
export const WithCancel = { args: { cancel: true } };
export const ReadOnly = { args: { readOnly: true, value: 4 } };
