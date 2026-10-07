import { Skeleton } from './Skeleton.jsx';

export default {
  title: 'Componentes/Skeleton',
  component: Skeleton,
};

export const Card = {
  render: () => (
    <div className="flex max-w-sm gap-4 rounded-lg p-4 ring-1 ring-border">
      <Skeleton shape="circle" size="3rem" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton width="60%" />
        <Skeleton />
        <Skeleton width="80%" />
      </div>
    </div>
  ),
};
