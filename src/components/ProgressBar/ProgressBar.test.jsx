import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { ProgressBar } from './ProgressBar.jsx';
import { ProgressSpinner } from '../ProgressSpinner/ProgressSpinner.jsx';

describe('ProgressBar', () => {
  it('expone el progreso y muestra el porcentaje', () => {
    render(<ProgressBar value={42} label="Subida" />);
    const bar = screen.getByRole('progressbar', { name: 'Subida' });
    expect(bar).toHaveAttribute('aria-valuenow', '42');
    expect(bar).toHaveTextContent('42%');
  });

  it('limita el valor entre 0 y 100', () => {
    render(<ProgressBar value={150} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('sin valor es indeterminada', () => {
    render(<ProgressBar />);
    const bar = screen.getByRole('progressbar');
    expect(bar).not.toHaveAttribute('aria-valuenow');
    expect(bar.firstChild).toHaveClass('animate-progress-indeterminate');
  });

  it('no tiene problemas de accesibilidad', async () => {
    const { container } = render(<ProgressBar value={30} />);
    expect(await axeViolations(container)).toEqual([]);
  });
});

describe('ProgressSpinner', () => {
  it('anuncia la carga', async () => {
    const { container } = render(<ProgressSpinner label="Cargando datos" />);
    expect(screen.getByRole('status')).toHaveTextContent('Cargando datos');
    expect(await axeViolations(container)).toEqual([]);
  });
});
