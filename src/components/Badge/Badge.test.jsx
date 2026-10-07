import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { Badge } from './Badge.jsx';

describe('Badge', () => {
  it('muestra el valor con la severidad indicada', () => {
    render(<Badge value={8} severity="danger" />);
    expect(screen.getByText('8')).toHaveClass('bg-danger');
  });

  it('sin valor se muestra como punto', () => {
    const { container } = render(<Badge />);
    expect(container.firstChild).toHaveClass('size-2');
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(<Badge value="Nuevo" severity="success" />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
