import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { EmptyState } from '../EmptyState/EmptyState.jsx';
import { Drawer } from './Drawer.jsx';

describe('Drawer', () => {
  it('cerrado no renderiza nada', () => {
    render(<Drawer open={false} onClose={() => {}} title="Filtros" />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('abierto es un diálogo con título, contenido y pie', async () => {
    render(
      <Drawer
        open
        onClose={() => {}}
        title="Filtros"
        description="Ajusta la búsqueda"
        footer={<button>Aplicar</button>}
      >
        <p>Contenido</p>
      </Drawer>,
    );
    const dialog = await screen.findByRole('dialog', { name: 'Filtros' });
    expect(dialog).toHaveAccessibleDescription('Ajusta la búsqueda');
    expect(screen.getByText('Contenido')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Aplicar' })).toBeInTheDocument();
  });

  it('se cierra con el botón Cerrar y con Escape', async () => {
    const onClose = vi.fn();
    render(<Drawer open onClose={onClose} title="Filtros" />);
    await userEvent.click(await screen.findByRole('button', { name: 'Cerrar' }));
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('la hoja inferior se cierra al arrastrarla hacia abajo', async () => {
    const onClose = vi.fn();
    render(<Drawer open onClose={onClose} side="bottom" title="Filtros" />);
    const dialog = await screen.findByRole('dialog');
    const handle = dialog.querySelector('[aria-hidden="true"].cursor-grab');
    fireEvent.pointerDown(handle, { clientY: 100, pointerId: 1 });
    fireEvent.pointerMove(handle, { clientY: 400, pointerId: 1 });
    fireEvent.pointerUp(handle, { clientY: 400, pointerId: 1 });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('los paneles laterales no tienen asa de arrastre', async () => {
    render(<Drawer open onClose={() => {}} side="right" title="Filtros" />);
    const dialog = await screen.findByRole('dialog');
    expect(dialog.querySelector('.cursor-grab')).toBeNull();
  });

  it('no tiene problemas de accesibilidad', async () => {
    render(
      <Drawer open onClose={() => {}} title="Filtros">
        Contenido
      </Drawer>,
    );
    expect(await axeViolations(await screen.findByRole('dialog'))).toEqual([]);
  });
});

describe('EmptyState', () => {
  it('muestra título, descripción y acciones con el nivel de encabezado indicado', async () => {
    const { container } = render(
      <EmptyState
        title="Sin proyectos"
        description="Crea tu primer proyecto para empezar."
        actions={<button>Nuevo proyecto</button>}
        titleAs="h2"
        bordered
      />,
    );
    expect(screen.getByRole('heading', { level: 2, name: 'Sin proyectos' })).toBeInTheDocument();
    expect(screen.getByText('Crea tu primer proyecto para empezar.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Nuevo proyecto' })).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('border-dashed');
    expect(await axeViolations(container)).toEqual([]);
  });
});
