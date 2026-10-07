import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { Select } from './Select.jsx';

const options = [
  { value: 'es', label: 'España' },
  { value: 'mx', label: 'México' },
  { value: 'co', label: 'Colombia', disabled: true },
];

describe('Select', () => {
  it('muestra el placeholder si no hay selección', () => {
    render(<Select label="País" options={options} placeholder="Elige" />);
    expect(screen.getByRole('button', { name: /País/ })).toHaveTextContent('Elige');
  });

  it('muestra la etiqueta de la opción seleccionada', () => {
    render(<Select label="País" options={options} defaultValue="mx" />);
    expect(screen.getByRole('button', { name: /País/ })).toHaveTextContent('México');
  });

  it('abre la lista y selecciona una opción con el ratón', async () => {
    const onChange = vi.fn();
    render(<Select label="País" options={options} onChange={onChange} />);

    await userEvent.click(screen.getByRole('button', { name: /País/ }));
    await userEvent.click(await screen.findByRole('option', { name: 'México' }));

    expect(onChange).toHaveBeenCalledWith('mx');
    expect(screen.getByRole('button', { name: /País/ })).toHaveTextContent('México');
  });

  it('se maneja con el teclado', async () => {
    const onChange = vi.fn();
    render(<Select label="País" options={options} onChange={onChange} />);

    await userEvent.tab();
    await userEvent.keyboard('{ArrowDown}');
    expect(await screen.findByRole('listbox')).toBeInTheDocument();
    await userEvent.keyboard('{ArrowDown}{Enter}');

    expect(onChange).toHaveBeenCalledWith('mx');
  });

  it('no permite elegir opciones deshabilitadas', async () => {
    const onChange = vi.fn();
    render(<Select label="País" options={options} onChange={onChange} />);

    await userEvent.click(screen.getByRole('button', { name: /País/ }));
    const disabled = await screen.findByRole('option', { name: 'Colombia' });
    expect(disabled).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(disabled);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('con error, muestra el mensaje y marca el campo como inválido', () => {
    render(<Select label="País" options={options} error="Obligatorio" />);
    const button = screen.getByRole('button', { name: /País/ });
    expect(button).toHaveAttribute('aria-invalid', 'true');
    expect(button).toHaveAccessibleDescription('Obligatorio');
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(<Select label="País" options={options} description="Ayuda" />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
