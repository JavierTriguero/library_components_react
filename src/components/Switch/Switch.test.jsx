import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { Switch } from './Switch.jsx';

describe('Switch', () => {
  it('alterna al hacer clic y notifica el estado', async () => {
    const onChange = vi.fn();
    render(<Switch label="Notificaciones" onChange={onChange} />);
    const toggle = screen.getByRole('switch', { name: 'Notificaciones' });
    expect(toggle).not.toBeChecked();
    await userEvent.click(toggle);
    expect(toggle).toBeChecked();
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('alterna con la barra espaciadora', async () => {
    render(<Switch label="Notificaciones" defaultChecked />);
    await userEvent.tab();
    await userEvent.keyboard(' ');
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('no cambia si está deshabilitado', async () => {
    const onChange = vi.fn();
    render(<Switch label="Notificaciones" disabled onChange={onChange} />);
    await userEvent.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(<Switch label="Notificaciones" description="Por email" />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
