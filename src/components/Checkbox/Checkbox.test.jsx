import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { Checkbox } from './Checkbox.jsx';

describe('Checkbox', () => {
  it('se marca y desmarca al hacer clic, notificando el nuevo estado', async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Acepto" onChange={onChange} />);
    const checkbox = screen.getByRole('checkbox', { name: 'Acepto' });

    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(onChange).toHaveBeenLastCalledWith(true);

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(onChange).toHaveBeenLastCalledWith(false);
  });

  it('se marca al hacer clic en la etiqueta', async () => {
    render(<Checkbox label="Acepto" />);
    await userEvent.click(screen.getByText('Acepto'));
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('se marca con la barra espaciadora', async () => {
    render(<Checkbox label="Acepto" />);
    await userEvent.tab();
    expect(screen.getByRole('checkbox')).toHaveFocus();
    await userEvent.keyboard(' ');
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('respeta el estado controlado', async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Acepto" checked={false} onChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('no cambia si está deshabilitado', async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Acepto" disabled onChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-disabled', 'true');
  });

  it('indeterminate se anuncia como estado mixto', () => {
    render(<Checkbox label="Seleccionar todo" indeterminate />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(<Checkbox label="Acepto" description="Detalles" defaultChecked />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
