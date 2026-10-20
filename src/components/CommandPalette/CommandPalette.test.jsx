import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { CommandPalette, defaultCommandFilter } from './CommandPalette.jsx';

const makeGroups = (onSelect = () => {}) => [
  {
    heading: 'Navegación',
    items: [
      { id: 'home', label: 'Ir al inicio', onSelect: () => onSelect('home') },
      {
        id: 'settings',
        label: 'Ajustes',
        keywords: ['configuración', 'preferencias'],
        onSelect: () => onSelect('settings'),
      },
    ],
  },
  {
    heading: 'Acciones',
    items: [
      { id: 'new', label: 'Nuevo proyecto', shortcut: ['⌘', 'N'], onSelect: () => onSelect('new') },
      { id: 'delete', label: 'Eliminar proyecto', disabled: true },
    ],
  },
];

describe('defaultCommandFilter', () => {
  it('busca todas las palabras sin distinguir mayúsculas ni tildes, también en keywords', () => {
    const item = { label: 'Ajustes', keywords: ['configuración'] };
    expect(defaultCommandFilter(item, 'CONFIGURACION')).toBe(true);
    expect(defaultCommandFilter(item, 'ajus conf')).toBe(true);
    expect(defaultCommandFilter(item, 'perfil')).toBe(false);
  });
});

describe('CommandPalette', () => {
  it('se abre con Ctrl+K y enfoca el buscador', async () => {
    const onOpenChange = vi.fn();
    render(<CommandPalette groups={makeGroups()} onOpenChange={onOpenChange} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await userEvent.keyboard('{Control>}k{/Control}');
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(await screen.findByRole('dialog', { name: 'Paleta de comandos' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Paleta de comandos' })).toHaveFocus();
  });

  it('muestra los grupos, filtra al escribir y avisa si no hay resultados', async () => {
    render(<CommandPalette groups={makeGroups()} defaultOpen />);
    expect(await screen.findByRole('group', { name: 'Navegación' })).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(4);

    await userEvent.type(screen.getByRole('combobox'), 'preferencias');
    expect(screen.getAllByRole('option').map((o) => o.textContent)).toEqual(['Ajustes']);
    expect(screen.queryByRole('group', { name: 'Acciones' })).not.toBeInTheDocument();

    await userEvent.type(screen.getByRole('combobox'), 'xyz');
    expect(screen.getByRole('status')).toHaveTextContent('No hay resultados.');
  });

  it('ejecuta el comando con el teclado y se cierra', async () => {
    const onSelect = vi.fn();
    render(<CommandPalette groups={makeGroups(onSelect)} defaultOpen />);
    await userEvent.type(await screen.findByRole('combobox'), 'nuevo');
    await userEvent.keyboard('{ArrowDown}{Enter}');
    expect(onSelect).toHaveBeenCalledWith('new');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('ejecuta el comando con un clic y no permite elegir los deshabilitados', async () => {
    const onSelect = vi.fn();
    render(<CommandPalette groups={makeGroups(onSelect)} defaultOpen />);
    await userEvent.click(await screen.findByRole('option', { name: /Eliminar proyecto/ }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('option', { name: 'Ajustes' }));
    expect(onSelect).toHaveBeenCalledWith('settings');
  });

  it('hotkey={false} desactiva el atajo', async () => {
    render(<CommandPalette groups={makeGroups()} hotkey={false} />);
    await userEvent.keyboard('{Control>}k{/Control}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('no tiene problemas de accesibilidad', async () => {
    render(<CommandPalette groups={makeGroups()} defaultOpen />);
    expect(await axeViolations(await screen.findByRole('dialog'))).toEqual([]);
  });
});
