import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { Knob } from './Knob.jsx';

describe('Knob', () => {
  it('es un slider accesible con su valor', () => {
    render(<Knob label="Volumen" defaultValue={40} valueTemplate={(v) => `${v}%`} />);
    const knob = screen.getByRole('slider', { name: 'Volumen' });
    expect(knob).toHaveAttribute('aria-valuenow', '40');
    expect(knob).toHaveAttribute('aria-valuetext', '40%');
    expect(knob).toHaveTextContent('40%');
  });

  it('se maneja con el teclado y respeta los límites', async () => {
    const onChange = vi.fn();
    render(<Knob label="Volumen" defaultValue={95} step={5} onChange={onChange} />);
    screen.getByRole('slider').focus();
    await userEvent.keyboard('{ArrowUp}');
    expect(onChange).toHaveBeenLastCalledWith(100);
    await userEvent.keyboard('{ArrowUp}');
    expect(onChange).toHaveBeenCalledTimes(1);
    await userEvent.keyboard('{Home}');
    expect(onChange).toHaveBeenLastCalledWith(0);
    await userEvent.keyboard('{PageUp}');
    expect(onChange).toHaveBeenLastCalledWith(50);
  });

  it('readOnly ignora el teclado', async () => {
    const onChange = vi.fn();
    render(<Knob label="Volumen" value={10} readOnly onChange={onChange} />);
    screen.getByRole('slider').focus();
    await userEvent.keyboard('{ArrowUp}');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(<Knob label="Volumen" defaultValue={30} />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
