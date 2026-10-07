import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { Input } from './Input.jsx';

describe('Input', () => {
  it('asocia la etiqueta con el campo', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInstanceOf(HTMLInputElement);
  });

  it('permite escribir y notifica los cambios', async () => {
    const onChange = vi.fn();
    render(<Input label="Nombre" onChange={onChange} />);
    await userEvent.type(screen.getByLabelText('Nombre'), 'Ana');
    expect(screen.getByLabelText('Nombre')).toHaveValue('Ana');
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it('enlaza la descripción con el campo', () => {
    render(<Input label="Email" description="No lo compartiremos." />);
    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription('No lo compartiremos.');
  });

  it('con error, marca el campo como inválido y muestra el error en lugar de la descripción', () => {
    render(<Input label="Email" description="Ayuda" error="Email no válido" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Email no válido');
    expect(screen.queryByText('Ayuda')).not.toBeInTheDocument();
  });

  it('se puede deshabilitar', () => {
    render(<Input label="Email" disabled />);
    expect(screen.getByLabelText('Email')).toBeDisabled();
  });

  it('reenvía la ref al elemento <input>', () => {
    const ref = createRef();
    render(<Input label="Email" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(<Input label="Email" description="Ayuda" error="Error" />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
