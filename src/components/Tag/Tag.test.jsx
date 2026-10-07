import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { Tag } from './Tag.jsx';

describe('Tag', () => {
  it('muestra el valor con severidad y forma', () => {
    render(<Tag value="Activo" severity="success" rounded />);
    expect(screen.getByText('Activo')).toHaveClass('bg-success', 'rounded-full');
  });

  it('acepta children en lugar de value', () => {
    render(<Tag>Beta</Tag>);
    expect(screen.getByText('Beta')).toHaveClass('bg-primary', 'rounded');
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(<Tag value="Pendiente" severity="warning" />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
