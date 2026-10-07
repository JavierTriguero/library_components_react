import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { Panel } from './Panel.jsx';

describe('Panel', () => {
  it('es una región con el nombre de la cabecera', () => {
    render(
      <Panel header="Resumen" footer="Pie">
        Contenido
      </Panel>,
    );
    const region = screen.getByRole('region', { name: 'Resumen' });
    expect(region).toHaveTextContent('Contenido');
    expect(region).toHaveTextContent('Pie');
  });

  it('toggleable pliega el contenido con controlado', async () => {
    const onToggle = vi.fn();
    const { rerender } = render(
      <Panel header="Resumen" toggleable collapsed={false} onToggle={onToggle}>
        Contenido
      </Panel>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Plegar' }));
    expect(onToggle).toHaveBeenCalledWith(true);
    expect(screen.getByText('Contenido')).toBeVisible();

    rerender(
      <Panel header="Resumen" toggleable collapsed onToggle={onToggle}>
        Contenido
      </Panel>,
    );
    expect(screen.getByText('Contenido')).not.toBeVisible();
    expect(screen.getByRole('button', { name: 'Desplegar' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(
      <Panel header="Resumen" toggleable>
        Contenido
      </Panel>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });
});
