import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { SelectButton } from './SelectButton.jsx';

const options = [
  { value: 'day', label: 'Día' },
  { value: 'week', label: 'Semana' },
  { value: 'month', label: 'Mes' },
];

describe('SelectButton', () => {
  it('modo simple: selecciona una opción como un grupo de radios', async () => {
    const onChange = vi.fn();
    render(<SelectButton aria-label="Periodo" options={options} defaultValue="day" onChange={onChange} />);
    expect(screen.getByRole('radiogroup', { name: 'Periodo' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('radio', { name: 'Mes' }));
    expect(onChange).toHaveBeenCalledWith('month');
    expect(screen.getByRole('radio', { name: 'Mes' })).toBeChecked();
  });

  it('modo múltiple: alterna varias opciones', async () => {
    const onChange = vi.fn();
    render(<SelectButton multiple aria-label="Días" options={options} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Día' }));
    await userEvent.click(screen.getByRole('button', { name: 'Mes' }));
    expect(onChange).toHaveBeenLastCalledWith(['day', 'month']);
    expect(screen.getByRole('button', { name: 'Día' })).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(screen.getByRole('button', { name: 'Día' }));
    expect(onChange).toHaveBeenLastCalledWith(['month']);
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(
      <>
        <SelectButton aria-label="Periodo" options={options} defaultValue="day" />
        <SelectButton multiple aria-label="Días" options={options} />
      </>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });
});
