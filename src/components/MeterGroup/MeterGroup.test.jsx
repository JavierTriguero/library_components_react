import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { MeterGroup } from './MeterGroup.jsx';

const values = [
  { label: 'Apps', value: 20 },
  { label: 'Fotos', value: 30, color: 'rgb(255, 0, 0)' },
];

describe('MeterGroup', () => {
  it('pinta un segmento proporcional por valor', () => {
    render(<MeterGroup values={values} />);
    const apps = screen.getByRole('meter', { name: 'Apps' });
    expect(apps).toHaveStyle({ width: '20%' });
    expect(apps).toHaveClass('bg-primary');
    expect(screen.getByRole('meter', { name: 'Fotos' })).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
  });

  it('muestra la leyenda con el porcentaje y respeta max', () => {
    render(<MeterGroup values={values} max={200} />);
    expect(screen.getByRole('meter', { name: 'Apps' })).toHaveStyle({ width: '10%' });
    expect(screen.getByText('(10%)')).toBeInTheDocument();
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(<MeterGroup values={values} />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
