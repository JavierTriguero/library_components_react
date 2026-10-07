import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { Modal } from './Modal.jsx';

describe('Modal', () => {
  it('no renderiza nada cerrada', () => {
    render(<Modal open={false} onClose={() => {}} title="Hola" />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('abierta, muestra un diálogo con título, descripción, contenido y pie', async () => {
    render(
      <Modal open onClose={() => {}} title="Eliminar" description="No se puede deshacer." footer={<button>OK</button>}>
        <p>Contenido</p>
      </Modal>,
    );
    const dialog = await screen.findByRole('dialog', { name: 'Eliminar' });
    expect(dialog).toHaveAccessibleDescription('No se puede deshacer.');
    expect(screen.getByText('Contenido')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
  });

  it('llama a onClose al pulsar Escape', async () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="Eliminar" footer={<button>OK</button>} />);
    await screen.findByRole('dialog');
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('mueve el foco dentro del diálogo al abrirse', async () => {
    render(<Modal open onClose={() => {}} title="Eliminar" footer={<button>OK</button>} />);
    const dialog = await screen.findByRole('dialog');
    expect(dialog).toContainElement(document.activeElement);
  });

  it('no tiene problemas de accesibilidad', async () => {
    render(<Modal open onClose={() => {}} title="Eliminar" description="¿Seguro?" footer={<button>OK</button>} />);
    const dialog = await screen.findByRole('dialog');
    expect(await axeViolations(dialog)).toEqual([]);
  });
});
