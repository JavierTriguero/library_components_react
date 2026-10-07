import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { ScrollPanel } from './ScrollPanel.jsx';

describe('ScrollPanel', () => {
  it('se puede enfocar con el teclado para desplazarse', async () => {
    render(
      <ScrollPanel aria-label="Términos" className="h-32">
        Texto largo
      </ScrollPanel>,
    );
    await userEvent.tab();
    expect(screen.getByLabelText('Términos')).toHaveFocus();
    expect(screen.getByLabelText('Términos')).toHaveClass('overflow-auto', 'h-32');
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(
      <ScrollPanel role="region" aria-label="Términos">
        Texto
      </ScrollPanel>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });
});
