import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { Slider } from './Slider.jsx';

describe('Slider', () => {
  it('es un slider nativo con etiqueta que notifica el nuevo valor', () => {
    const onChange = vi.fn();
    render(<Slider label="Volumen" defaultValue={50} min={0} max={200} step={10} onChange={onChange} />);
    const slider = screen.getByRole('slider', { name: 'Volumen' });
    expect(slider).toHaveAttribute('max', '200');
    expect(slider).toHaveAttribute('step', '10');
    fireEvent.change(slider, { target: { value: '60' } });
    expect(onChange).toHaveBeenCalledWith(60);
    expect(slider).toHaveValue('60');
  });

  it('muestra el valor si showValue', () => {
    render(<Slider label="Volumen" value={30} showValue onChange={() => {}} />);
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  it('range: dos tiradores que no se cruzan', () => {
    const onChange = vi.fn();
    render(<Slider label="Precio" range defaultValue={[20, 80]} onChange={onChange} />);
    expect(screen.getByRole('group', { name: 'Precio' })).toBeInTheDocument();
    fireEvent.change(screen.getByRole('slider', { name: 'Mínimo' }), { target: { value: '90' } });
    expect(onChange).toHaveBeenLastCalledWith([80, 80]);
    fireEvent.change(screen.getByRole('slider', { name: 'Máximo' }), { target: { value: '10' } });
    expect(onChange).toHaveBeenLastCalledWith([80, 80]);
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(
      <>
        <Slider label="Volumen" defaultValue={20} />
        <Slider label="Precio" range />
      </>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });
});
