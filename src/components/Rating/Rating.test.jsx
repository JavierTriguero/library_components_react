import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { Rating } from './Rating.jsx';

describe('Rating', () => {
  it('selecciona estrellas al hacer clic', async () => {
    const onChange = vi.fn();
    render(<Rating onChange={onChange} />);
    expect(screen.getByRole('group', { name: 'Valoración' })).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText('4 estrellas'));
    expect(onChange).toHaveBeenCalledWith(4);
    expect(screen.getByLabelText('4 estrellas')).toBeChecked();
  });

  it('se maneja con las flechas', async () => {
    render(<Rating defaultValue={2} />);
    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByLabelText('3 estrellas')).toBeChecked();
  });

  it('cancel borra la valoración', async () => {
    const onChange = vi.fn();
    render(<Rating defaultValue={3} cancel onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Borrar valoración' }));
    expect(onChange).toHaveBeenCalledWith(null);
    expect(screen.getByRole('button', { name: 'Borrar valoración' })).toBeDisabled();
  });

  it('readOnly solo muestra el valor', () => {
    render(<Rating value={3} readOnly />);
    expect(screen.getByRole('img', { name: 'Valoración: 3 de 5' })).toBeInTheDocument();
    expect(screen.queryByRole('radio')).not.toBeInTheDocument();
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(<Rating defaultValue={2} cancel />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
