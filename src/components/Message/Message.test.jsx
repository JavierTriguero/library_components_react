import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { Message } from './Message.jsx';

describe('Message', () => {
  it('los mensajes informativos usan role="status"', () => {
    render(<Message severity="success" text="Guardado" />);
    expect(screen.getByRole('status')).toHaveTextContent('Guardado');
  });

  it('los errores y avisos usan role="alert"', () => {
    render(<Message severity="danger" title="Error" text="No se pudo guardar" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Error');
    expect(alert).toHaveTextContent('No se pudo guardar');
  });

  it('con onClose muestra un botón para cerrar', async () => {
    const onClose = vi.fn();
    render(<Message text="Hola" onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: 'Cerrar' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(<Message severity="warning" text="Cuidado" onClose={() => {}} />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
