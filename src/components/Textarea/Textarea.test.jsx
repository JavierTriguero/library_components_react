import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { Textarea } from './Textarea.jsx';

describe('Textarea', () => {
  it('asocia la etiqueta y permite escribir', async () => {
    const onChange = vi.fn();
    render(<Textarea label="Comentario" onChange={onChange} />);
    const textarea = screen.getByLabelText('Comentario');
    await userEvent.type(textarea, 'Hola');
    expect(textarea).toHaveValue('Hola');
    expect(onChange).toHaveBeenCalledTimes(4);
  });

  it('con error marca el campo como inválido', () => {
    render(<Textarea label="Comentario" error="Obligatorio" />);
    const textarea = screen.getByLabelText('Comentario');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAccessibleDescription('Obligatorio');
  });

  it('autoResize ajusta la altura al contenido', async () => {
    render(<Textarea label="Comentario" autoResize />);
    const textarea = screen.getByLabelText('Comentario');
    Object.defineProperty(textarea, 'scrollHeight', { configurable: true, value: 120 });
    await userEvent.type(textarea, 'a');
    expect(textarea.style.height).toBe('120px');
    expect(textarea).toHaveClass('resize-none');
  });

  it('reenvía la ref al <textarea>', () => {
    const ref = createRef();
    render(<Textarea label="Comentario" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(<Textarea label="Comentario" description="Máx. 200 caracteres" />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
