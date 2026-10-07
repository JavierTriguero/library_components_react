import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { Chip } from './Chip.jsx';

describe('Chip', () => {
  it('muestra la etiqueta', () => {
    render(<Chip label="React" />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('con removable muestra un botón accesible que llama a onRemove', async () => {
    const onRemove = vi.fn();
    render(<Chip label="React" removable onRemove={onRemove} />);
    await userEvent.click(screen.getByRole('button', { name: 'Eliminar React' }));
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(<Chip label="Ana" image="/ana.jpg" removable />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
