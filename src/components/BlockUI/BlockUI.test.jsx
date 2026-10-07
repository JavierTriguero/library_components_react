import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { BlockUI } from './BlockUI.jsx';

describe('BlockUI', () => {
  it('bloqueado, vuelve inerte el contenido y muestra la capa', () => {
    render(
      <BlockUI blocked template={<span>Cargando…</span>}>
        <button>Guardar</button>
      </BlockUI>,
    );
    expect(screen.getByText('Guardar').parentElement).toHaveAttribute('inert');
    expect(screen.getByText('Cargando…')).toBeInTheDocument();
  });

  it('desbloqueado, el contenido es interactivo', () => {
    const { rerender } = render(
      <BlockUI blocked>
        <button>Guardar</button>
      </BlockUI>,
    );
    rerender(
      <BlockUI blocked={false}>
        <button>Guardar</button>
      </BlockUI>,
    );
    expect(screen.getByRole('button', { name: 'Guardar' }).parentElement).not.toHaveAttribute('inert');
  });

  it('fullScreen cubre la ventana', () => {
    render(<BlockUI blocked fullScreen template={<span>Espera</span>} />);
    expect(screen.getByText('Espera').parentElement).toHaveClass('fixed', 'inset-0');
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(
      <BlockUI blocked>
        <p>Contenido</p>
      </BlockUI>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });
});
