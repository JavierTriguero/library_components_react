import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { RadioGroup } from './RadioGroup.jsx';

const options = [
  { value: 'card', label: 'Tarjeta' },
  { value: 'paypal', label: 'PayPal', description: 'Pago externo' },
  { value: 'cash', label: 'Efectivo', disabled: true },
];

describe('RadioGroup', () => {
  it('es un grupo con nombre y selecciona al hacer clic', async () => {
    const onChange = vi.fn();
    render(<RadioGroup label="Pago" options={options} onChange={onChange} />);
    expect(screen.getByRole('radiogroup', { name: 'Pago' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('radio', { name: 'PayPal' }));
    expect(onChange).toHaveBeenCalledWith('paypal');
    expect(screen.getByRole('radio', { name: 'PayPal' })).toBeChecked();
  });

  it('se navega con las flechas saltando las deshabilitadas', async () => {
    const onChange = vi.fn();
    render(<RadioGroup label="Pago" options={options} defaultValue="card" onChange={onChange} />);
    await userEvent.tab();
    expect(screen.getByRole('radio', { name: 'Tarjeta' })).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    expect(onChange).toHaveBeenLastCalledWith('paypal');
    await userEvent.keyboard('{ArrowDown}');
    expect(onChange).toHaveBeenLastCalledWith('card');
  });

  it('muestra el error asociado al grupo', () => {
    render(<RadioGroup label="Pago" options={options} error="Elige un método" />);
    expect(screen.getByRole('radiogroup')).toHaveAccessibleDescription('Elige un método');
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(<RadioGroup label="Pago" options={options} defaultValue="card" />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
