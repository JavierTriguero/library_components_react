import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { Card } from './Card.jsx';

describe('Card', () => {
  it('muestra título, descripción, contenido y pie', () => {
    render(
      <Card title="Plan Pro" description="Para equipos" footer={<button>Contratar</button>}>
        Contenido
      </Card>,
    );
    expect(screen.getByRole('heading', { name: 'Plan Pro' })).toBeInTheDocument();
    expect(screen.getByText('Para equipos')).toBeInTheDocument();
    expect(screen.getByText('Contenido')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Contratar' })).toBeInTheDocument();
  });

  it('no renderiza la cabecera si no hay título ni descripción', () => {
    render(<Card>Solo contenido</Card>);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('pasa props extra y la ref al contenedor', () => {
    const ref = createRef();
    render(
      <Card ref={ref} data-testid="card" className="max-w-sm">
        X
      </Card>,
    );
    expect(screen.getByTestId('card')).toHaveClass('max-w-sm');
    expect(ref.current).toBe(screen.getByTestId('card'));
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(
      <Card title="Plan Pro" description="Para equipos">
        Contenido
      </Card>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });
});
