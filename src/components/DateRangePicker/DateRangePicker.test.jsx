import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe.js';
import { toISODate } from '../../utils/dates.js';
import { DateRangePicker } from './DateRangePicker.jsx';

// Solo se simula la fecha: los temporizadores reales siguen funcionando para userEvent.
beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date(2026, 9, 15, 10)); // jueves, 15 de octubre de 2026
});
afterEach(() => vi.useRealTimers());

const iso = (range) => range && range.map(toISODate);

describe('DateRangePicker', () => {
  it('muestra el placeholder y abre el calendario con dos meses', async () => {
    render(<DateRangePicker label="Periodo" />);
    const trigger = screen.getByRole('button', { name: /Periodo/ });
    expect(trigger).toHaveTextContent('Elige un rango de fechas');

    await userEvent.click(trigger);
    expect(await screen.findByRole('grid', { name: 'octubre de 2026' })).toBeInTheDocument();
    expect(screen.getByRole('grid', { name: 'noviembre de 2026' })).toBeInTheDocument();
    // El foco va al día de hoy.
    expect(screen.getByRole('button', { name: /jueves, 15 de octubre de 2026/ })).toHaveFocus();
  });

  it('elige un rango con dos clics (en cualquier orden) y se cierra', async () => {
    const onChange = vi.fn();
    render(<DateRangePicker label="Periodo" onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: /Periodo/ }));
    await userEvent.click(await screen.findByRole('button', { name: /20 de octubre de 2026/ }));
    await userEvent.click(screen.getByRole('button', { name: /10 de octubre de 2026/ }));

    expect(iso(onChange.mock.calls[0][0])).toEqual(['2026-10-10', '2026-10-20']);
    await waitFor(() => expect(screen.queryByRole('grid')).not.toBeInTheDocument());
    expect(screen.getByRole('button', { name: /Periodo/ })).toHaveTextContent(/10.*20 oct 2026/);
  });

  it('se maneja con el teclado', async () => {
    const onChange = vi.fn();
    render(<DateRangePicker label="Periodo" onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: /Periodo/ }));
    await screen.findByRole('grid', { name: 'octubre de 2026' });

    await userEvent.keyboard('{Enter}'); // inicio: 15 oct
    await userEvent.keyboard('{ArrowDown}{ArrowRight}'); // 23 oct
    expect(screen.getByRole('button', { name: /23 de octubre de 2026/ })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(iso(onChange.mock.calls[0][0])).toEqual(['2026-10-15', '2026-10-23']);
  });

  it('Re Pág avanza de mes y mueve los meses visibles', async () => {
    render(<DateRangePicker label="Periodo" months={1} />);
    await userEvent.click(screen.getByRole('button', { name: /Periodo/ }));
    await screen.findByRole('grid', { name: 'octubre de 2026' });
    await userEvent.keyboard('{PageDown}');
    expect(screen.getByRole('grid', { name: 'noviembre de 2026' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /15 de noviembre de 2026/ })).toHaveFocus();
  });

  it('los atajos aplican el rango calculado desde hoy', async () => {
    const onChange = vi.fn();
    render(<DateRangePicker label="Periodo" onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: /Periodo/ }));
    const presets = await screen.findByRole('list', { name: 'Atajos' });
    await userEvent.click(within(presets).getByRole('button', { name: 'Últimos 7 días' }));
    expect(iso(onChange.mock.calls[0][0])).toEqual(['2026-10-09', '2026-10-15']);
  });

  it('respeta minDate/maxDate y marca el rango seleccionado', async () => {
    render(
      <DateRangePicker
        label="Periodo"
        defaultValue={[new Date(2026, 9, 12), new Date(2026, 9, 14)]}
        minDate={new Date(2026, 9, 5)}
        maxDate={new Date(2026, 9, 25)}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: /Periodo/ }));
    expect(await screen.findByRole('button', { name: /, 4 de octubre de 2026/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: /, 26 de octubre de 2026/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: /13 de octubre de 2026/ }).closest('td')).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('envía el rango en campos ocultos y con error se marca inválido', () => {
    const { container } = render(
      <DateRangePicker
        label="Periodo"
        name="periodo"
        error="Obligatorio"
        defaultValue={[new Date(2026, 9, 1), new Date(2026, 9, 3)]}
      />,
    );
    expect(container.querySelector('input[name="periodo[start]"]')).toHaveValue('2026-10-01');
    expect(container.querySelector('input[name="periodo[end]"]')).toHaveValue('2026-10-03');
    const trigger = screen.getByRole('button', { name: /Periodo/ });
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(trigger).toHaveAccessibleDescription('Obligatorio');
  });

  it('no tiene problemas de accesibilidad abierto', async () => {
    render(<DateRangePicker label="Periodo" />);
    await userEvent.click(screen.getByRole('button', { name: /Periodo/ }));
    await screen.findByRole('grid', { name: 'octubre de 2026' });
    expect(await axeViolations(document.body)).toEqual([]);
  });
});
