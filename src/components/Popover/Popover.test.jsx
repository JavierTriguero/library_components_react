import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { Button } from '../Button/Button.jsx';
import { HoverCard } from '../HoverCard/HoverCard.jsx';
import { Popover } from './Popover.jsx';

describe('Popover', () => {
  it('se abre al pulsar el disparador y se cierra con Escape', async () => {
    render(
      <Popover trigger={<Button>Compartir</Button>} title="Compartir enlace">
        <p>Contenido del panel</p>
      </Popover>,
    );
    const trigger = screen.getByRole('button', { name: 'Compartir' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(trigger);
    expect(await screen.findByText('Contenido del panel')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Compartir enlace' })).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await userEvent.keyboard('{Escape}');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('children como función recibe close', async () => {
    render(<Popover trigger={<Button>Abrir</Button>}>{({ close }) => <button onClick={close}>Listo</button>}</Popover>);
    await userEvent.click(screen.getByRole('button', { name: 'Abrir' }));
    await userEvent.click(await screen.findByRole('button', { name: 'Listo' }));
    // Espera a que termine la animación de salida.
    await waitFor(() => expect(screen.queryByRole('button', { name: 'Listo' })).not.toBeInTheDocument());
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(<Popover trigger={<Button>Abrir</Button>}>Hola</Popover>);
    expect(await axeViolations(container)).toEqual([]);
  });
});

describe('HoverCard', () => {
  it('aparece al enfocar el disparador y desaparece con Escape', async () => {
    render(
      <HoverCard trigger={<a href="/ana">@ana</a>} openDelay={0}>
        Ana Torres · Diseñadora
      </HoverCard>,
    );
    expect(screen.queryByText('Ana Torres · Diseñadora')).not.toBeInTheDocument();
    await userEvent.tab();
    expect(await screen.findByText('Ana Torres · Diseñadora')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    await expect.poll(() => screen.queryByText('Ana Torres · Diseñadora')).toBeNull();
  });

  it('aparece al pasar el ratón', async () => {
    render(
      <HoverCard trigger={<a href="/ana">@ana</a>} openDelay={0}>
        Perfil
      </HoverCard>,
    );
    await userEvent.hover(screen.getByRole('link', { name: '@ana' }));
    expect(await screen.findByText('Perfil')).toBeInTheDocument();
  });
});
