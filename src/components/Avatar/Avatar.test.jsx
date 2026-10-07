import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { Avatar } from '../Avatar/Avatar.jsx';
import { AvatarGroup } from '../AvatarGroup/AvatarGroup.jsx';

describe('Avatar', () => {
  it('muestra las iniciales y usa alt como nombre accesible', () => {
    render(<Avatar label="AT" alt="Ana Torres" />);
    expect(screen.getByRole('img', { name: 'Ana Torres' })).toHaveTextContent('AT');
  });

  it('muestra la imagen y vuelve a las iniciales si falla', () => {
    const { container } = render(<Avatar image="/foto.jpg" label="AT" alt="Ana" />);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', '/foto.jpg');
    fireEvent.error(img);
    expect(container.querySelector('img')).toBeNull();
    expect(screen.getByRole('img', { name: 'Ana' })).toHaveTextContent('AT');
  });

  it('aplica tamaño y forma', () => {
    render(<Avatar label="A" size="xl" shape="square" />);
    expect(screen.getByRole('img')).toHaveClass('size-16', 'rounded-md');
  });

  it('AvatarGroup agrupa varios avatares sin problemas de accesibilidad', async () => {
    const { container } = render(
      <AvatarGroup>
        <Avatar label="A" alt="Ana" />
        <Avatar label="B" alt="Beto" />
      </AvatarGroup>,
    );
    expect(screen.getAllByRole('img')).toHaveLength(2);
    expect(await axeViolations(container)).toEqual([]);
  });
});
