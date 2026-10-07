import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { Inplace } from './Inplace.jsx';

describe('Inplace', () => {
  it('al pulsar el contenido de lectura muestra el activo y le pasa el foco', async () => {
    const onToggle = vi.fn();
    render(
      <Inplace display="Editar nombre" onToggle={onToggle}>
        <input aria-label="Nombre" />
      </Inplace>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Editar nombre' }));
    expect(screen.getByLabelText('Nombre')).toHaveFocus();
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('closable vuelve al modo lectura y recupera el foco', async () => {
    render(
      <Inplace display="Editar" closable defaultActive>
        <input aria-label="Nombre" />
      </Inplace>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Cerrar' }));
    expect(screen.getByRole('button', { name: 'Editar' })).toHaveFocus();
  });

  it('no se activa si está deshabilitado', async () => {
    render(
      <Inplace display="Editar" disabled>
        <input aria-label="Nombre" />
      </Inplace>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Editar' }));
    expect(screen.queryByLabelText('Nombre')).not.toBeInTheDocument();
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(
      <Inplace display="Editar">
        <input aria-label="Nombre" />
      </Inplace>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });
});
