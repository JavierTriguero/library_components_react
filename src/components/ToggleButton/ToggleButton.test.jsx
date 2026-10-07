import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { ToggleButton } from './ToggleButton.jsx';

describe('ToggleButton', () => {
  it('alterna aria-pressed y la etiqueta', async () => {
    const onChange = vi.fn();
    render(<ToggleButton onLabel="Siguiendo" offLabel="Seguir" onChange={onChange} />);
    const button = screen.getByRole('button', { name: 'Seguir' });
    expect(button).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveTextContent('Siguiendo');
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('respeta el modo controlado', async () => {
    const onChange = vi.fn();
    render(
      <ToggleButton checked onChange={onChange}>
        Negrita
      </ToggleButton>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Negrita' }));
    expect(onChange).toHaveBeenCalledWith(false);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(<ToggleButton defaultChecked>Negrita</ToggleButton>);
    expect(await axeViolations(container)).toEqual([]);
  });
});
