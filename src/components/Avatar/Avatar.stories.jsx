import { Avatar } from './Avatar.jsx';
import { AvatarGroup } from '../AvatarGroup/AvatarGroup.jsx';

export default {
  title: 'Componentes/Avatar',
  component: Avatar,
  args: { label: 'AT', alt: 'Ana Torres', size: 'md', shape: 'circle' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] },
    shape: { control: 'inline-radio', options: ['circle', 'square'] },
  },
};

export const Initials = {};
export const WithImage = { args: { image: 'https://i.pravatar.cc/150?img=5' } };
export const Icon = { args: { label: undefined, alt: 'Usuario' } };
export const Group = {
  render: () => (
    <AvatarGroup>
      <Avatar image="https://i.pravatar.cc/150?img=1" alt="Persona 1" />
      <Avatar image="https://i.pravatar.cc/150?img=2" alt="Persona 2" />
      <Avatar image="https://i.pravatar.cc/150?img=3" alt="Persona 3" />
      <Avatar label="+4" alt="4 personas más" />
    </AvatarGroup>
  ),
};
