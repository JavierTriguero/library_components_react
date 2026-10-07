import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { Divider } from './Divider.jsx';

describe('Divider', () => {
  it('es un separador horizontal por defecto', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toHaveClass('border-t');
  });

  it('puede ser vertical', () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('muestra texto y aplica el tipo de línea', () => {
    render(<Divider type="dashed">o</Divider>);
    const separator = screen.getByRole('separator');
    expect(separator).toHaveTextContent('o');
    expect(separator).toHaveClass('before:border-dashed');
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(<Divider align="left">Sección</Divider>);
    expect(await axeViolations(container)).toEqual([]);
  });
});
