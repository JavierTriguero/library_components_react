import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { Button } from './Button.jsx';

describe('Button', () => {
  it('renderiza un botón de tipo "button" por defecto', () => {
    render(<Button>Guardar</Button>);
    expect(screen.getByRole('button', { name: 'Guardar' })).toHaveAttribute('type', 'button');
  });

  it('llama a onClick al pulsarlo', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Guardar</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('no llama a onClick si está deshabilitado', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Guardar
      </Button>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('aplica las clases de variante y tamaño, y añade className', () => {
    render(
      <Button variant="danger" size="lg" className="w-full">
        Borrar
      </Button>,
    );
    expect(screen.getByRole('button')).toHaveClass('bg-danger', 'px-4', 'w-full');
  });

  it('reenvía la ref al elemento <button>', () => {
    const ref = createRef();
    render(<Button ref={ref}>Guardar</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(<Button>Guardar</Button>);
    expect(await axeViolations(container)).toEqual([]);
  });
});
