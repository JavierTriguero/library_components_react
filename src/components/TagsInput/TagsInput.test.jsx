import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { TagsInput } from './TagsInput.jsx';

describe('TagsInput', () => {
  it('añade etiquetas con Enter y coma', async () => {
    const onChange = vi.fn();
    render(<TagsInput label="Etiquetas" onChange={onChange} />);
    const input = screen.getByLabelText('Etiquetas');
    await userEvent.type(input, 'react{Enter}tailwind,');
    expect(onChange).toHaveBeenLastCalledWith(['react', 'tailwind']);
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('Retroceso con el campo vacío borra la última etiqueta', async () => {
    const onChange = vi.fn();
    render(<TagsInput label="Etiquetas" defaultValue={['a', 'b']} onChange={onChange} />);
    await userEvent.type(screen.getByLabelText('Etiquetas'), '{Backspace}');
    expect(onChange).toHaveBeenLastCalledWith(['a']);
  });

  it('elimina una etiqueta con su botón y anuncia el cambio', async () => {
    render(<TagsInput label="Etiquetas" defaultValue={['react', 'vue']} />);
    await userEvent.click(screen.getByRole('button', { name: 'Eliminar vue' }));
    expect(screen.queryByText('vue')).not.toBeInTheDocument();
    expect(screen.getByText('Eliminada: vue')).toBeInTheDocument();
  });

  it('al pegar texto separado por comas añade todas', async () => {
    const onChange = vi.fn();
    render(<TagsInput label="Emails" onChange={onChange} />);
    screen.getByLabelText('Emails').focus();
    await userEvent.paste('ana@x.com, beto@x.com,carla@x.com');
    expect(onChange).toHaveBeenLastCalledWith(['ana@x.com', 'beto@x.com', 'carla@x.com']);
  });

  it('rechaza duplicados, inválidas y las que superan el máximo', async () => {
    const onChange = vi.fn();
    render(
      <TagsInput
        label="Emails"
        defaultValue={['ana@x.com']}
        max={2}
        validate={(t) => t.includes('@')}
        onChange={onChange}
      />,
    );
    const input = screen.getByLabelText('Emails');
    await userEvent.type(input, 'ANA@x.com{Enter}');
    expect(onChange).not.toHaveBeenCalled();
    expect(input).toHaveValue('ANA@x.com');

    await userEvent.clear(input);
    await userEvent.type(input, 'sin-arroba{Enter}');
    expect(onChange).not.toHaveBeenCalled();

    await userEvent.clear(input);
    await userEvent.type(input, 'beto@x.com{Enter}');
    expect(onChange).toHaveBeenLastCalledWith(['ana@x.com', 'beto@x.com']);
    expect(input).toBeDisabled();
  });

  it('añade el texto pendiente al salir y envía campos ocultos', async () => {
    const { container } = render(<TagsInput label="Etiquetas" name="tags" />);
    await userEvent.type(screen.getByLabelText('Etiquetas'), 'pendiente');
    await userEvent.tab();
    expect(container.querySelector('input[type="hidden"][name="tags"]')).toHaveValue('pendiente');
  });

  it('con error marca el campo como inválido', () => {
    render(<TagsInput label="Etiquetas" error="Añade al menos una" />);
    const input = screen.getByLabelText('Etiquetas');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Añade al menos una');
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(<TagsInput label="Etiquetas" defaultValue={['react']} description="Pulsa Enter" />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
