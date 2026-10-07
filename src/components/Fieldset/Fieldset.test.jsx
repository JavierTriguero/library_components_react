import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { Fieldset } from './Fieldset.jsx';

describe('Fieldset', () => {
  it('agrupa el contenido bajo la leyenda', () => {
    render(<Fieldset legend="Datos">Contenido</Fieldset>);
    expect(screen.getByRole('group', { name: 'Datos' })).toHaveTextContent('Contenido');
  });

  it('toggleable pliega y despliega el contenido', async () => {
    const onToggle = vi.fn();
    render(
      <Fieldset legend="Datos" toggleable onToggle={onToggle}>
        Contenido
      </Fieldset>,
    );
    const button = screen.getByRole('button', { name: 'Datos' });
    expect(button).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('Contenido')).not.toBeVisible();
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('respeta defaultCollapsed', () => {
    render(
      <Fieldset legend="Datos" toggleable defaultCollapsed>
        Contenido
      </Fieldset>,
    );
    expect(screen.getByText('Contenido')).not.toBeVisible();
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(
      <Fieldset legend="Datos" toggleable>
        Contenido
      </Fieldset>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });
});
