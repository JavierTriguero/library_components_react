import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { Button } from '../Button/Button.jsx';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup.jsx';
import { Toolbar } from './Toolbar.jsx';

describe('Toolbar', () => {
  it('coloca el contenido en las zonas inicio, centro y final', () => {
    render(<Toolbar start={<Button>Nuevo</Button>} center="Título" end={<Button>Salir</Button>} />);
    expect(screen.getByRole('button', { name: 'Nuevo' })).toBeInTheDocument();
    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Salir' })).toBeInTheDocument();
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(<Toolbar start={<Button>Nuevo</Button>} />);
    expect(await axeViolations(container)).toEqual([]);
  });
});

describe('ButtonGroup', () => {
  it('agrupa los botones con nombre accesible', async () => {
    const { container } = render(
      <ButtonGroup aria-label="Alineación">
        <Button variant="secondary">Izquierda</Button>
        <Button variant="secondary">Derecha</Button>
      </ButtonGroup>,
    );
    const group = screen.getByRole('group', { name: 'Alineación' });
    expect(group).toContainElement(screen.getByRole('button', { name: 'Izquierda' }));
    expect(await axeViolations(container)).toEqual([]);
  });
});
