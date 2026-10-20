import { HoverCard } from './HoverCard.jsx';
import { Avatar } from '../Avatar/Avatar.jsx';

export default {
  title: 'Componentes/HoverCard',
  component: HoverCard,
};

export const Profile = {
  render: () => (
    <p className="text-sm text-foreground">
      Diseño de{' '}
      <HoverCard
        trigger={
          <a href="#ana" className="font-semibold text-primary underline-offset-4 hover:underline">
            @anatorres
          </a>
        }
      >
        <div className="flex gap-3">
          <Avatar image="/avatars/avatar-5.svg" alt="Ana Torres" size="lg" />
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Ana Torres</p>
            <p className="text-muted-foreground">Diseñadora de producto. Trabaja en sistemas de diseño accesibles.</p>
            <p className="text-xs text-muted-foreground">Se unió en marzo de 2024</p>
          </div>
        </div>
      </HoverCard>{' '}
      revisado por el equipo.
    </p>
  ),
};
