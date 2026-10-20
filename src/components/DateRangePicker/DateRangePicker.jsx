import { useId, useMemo } from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { cn } from '../../utils/cn.js';
import { addDays, endOfMonth, isSameDay, startOfDay, startOfMonth, toISODate } from '../../utils/dates.js';
import { CalendarIcon } from '../../utils/icons.jsx';
import { useControllableState } from '../../utils/useControllableState.js';
import { RangeCalendar } from './RangeCalendar.jsx';

/**
 * @typedef {object} DateRangePreset
 * @property {string} label Texto del atajo.
 * @property {(today: Date) => [Date, Date]} range Calcula el rango a partir de hoy.
 */

/** Atajos por defecto. */
export const defaultDateRangePresets = [
  { label: 'Hoy', range: (today) => [today, today] },
  { label: 'Ayer', range: (today) => [addDays(today, -1), addDays(today, -1)] },
  { label: 'Últimos 7 días', range: (today) => [addDays(today, -6), today] },
  { label: 'Últimos 30 días', range: (today) => [addDays(today, -29), today] },
  { label: 'Este mes', range: (today) => [startOfMonth(today), today] },
  {
    label: 'Mes pasado',
    range: (today) => {
      const lastMonth = addDays(startOfMonth(today), -1);
      return [startOfMonth(lastMonth), endOfMonth(lastMonth)];
    },
  },
];

/**
 * Selector de un rango de fechas con calendario y atajos («Últimos 7 días», «Este mes»...).
 * Usa Intl para los nombres de meses y días en el idioma indicado.
 *
 * @param {object} props
 * @param {[Date, Date] | null} [props.value] Rango controlado.
 * @param {[Date, Date] | null} [props.defaultValue=null] Rango inicial.
 * @param {(range: [Date, Date] | null) => void} [props.onChange]
 * @param {React.ReactNode} [props.label] Etiqueta visible.
 * @param {React.ReactNode} [props.description] Texto de ayuda.
 * @param {React.ReactNode} [props.error] Mensaje de error; marca el campo como inválido.
 * @param {string} [props.placeholder='Elige un rango de fechas']
 * @param {DateRangePreset[] | false} [props.presets] Atajos; `false` los oculta.
 * @param {1 | 2} [props.months=2] Meses visibles a la vez.
 * @param {string} [props.locale='es'] Idioma de las fechas (BCP 47).
 * @param {0 | 1} [props.weekStartsOn=1] Primer día de la semana: 0 domingo, 1 lunes.
 * @param {Date} [props.minDate] Primera fecha seleccionable.
 * @param {Date} [props.maxDate] Última fecha seleccionable.
 * @param {string} [props.name] Nombre para formularios: envía `name[start]` y `name[end]` (AAAA-MM-DD).
 * @param {boolean} [props.disabled]
 * @param {string} [props.className] Clases adicionales para el contenedor.
 */
export function DateRangePicker({
  value,
  defaultValue = null,
  onChange,
  label,
  description,
  error,
  placeholder = 'Elige un rango de fechas',
  presets = defaultDateRangePresets,
  months = 2,
  locale = 'es',
  weekStartsOn = 1,
  minDate,
  maxDate,
  name,
  disabled,
  className,
}) {
  const [range, setRange] = useControllableState(value, defaultValue, onChange);
  const id = useId();
  const describedBy = [description && !error && `${id}-description`, error && `${id}-error`].filter(Boolean).join(' ');
  const format = useMemo(
    () => new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }),
    [locale],
  );

  const text = range ? format.formatRange(range[0], range[1]) : placeholder;
  const today = startOfDay(new Date());

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <span id={`${id}-label`} className={cn('text-sm font-medium text-foreground', disabled && 'opacity-50')}>
          {label}
        </span>
      )}
      <Popover className="relative">
        <PopoverButton
          disabled={disabled}
          aria-labelledby={label ? `${id}-label ${id}-value` : undefined}
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? true : undefined}
          className={cn(
            'flex w-full items-center gap-2 rounded-md bg-background px-3 py-2 text-left text-sm shadow-sm ring-1 ring-border ring-inset',
            'data-focus:ring-2 data-focus:ring-ring data-focus:outline-none data-open:ring-2 data-open:ring-ring',
            'data-disabled:cursor-not-allowed data-disabled:opacity-50',
            error && 'ring-danger',
          )}
        >
          <CalendarIcon className="size-4 text-muted-foreground" />
          <span id={`${id}-value`} className={cn('truncate', range ? 'text-foreground' : 'text-muted-foreground')}>
            {text}
          </span>
        </PopoverButton>
        <PopoverPanel
          anchor={{ to: 'bottom start', gap: 8, padding: 8 }}
          transition
          className={cn(
            'z-50 flex flex-col gap-4 rounded-lg bg-background p-4 shadow-lg ring-1 ring-border sm:flex-row',
            'transition duration-150 ease-out data-closed:scale-95 data-closed:opacity-0',
          )}
        >
          {({ close }) => (
            <>
              {presets && presets.length > 0 && (
                <ul
                  aria-label="Atajos"
                  className="flex gap-1 overflow-x-auto border-border sm:flex-col sm:border-r sm:pr-4"
                >
                  {presets.map((preset) => {
                    const presetRange = preset.range(today);
                    const active = range && isSameDay(range[0], presetRange[0]) && isSameDay(range[1], presetRange[1]);
                    return (
                      <li key={preset.label}>
                        <button
                          type="button"
                          aria-pressed={Boolean(active)}
                          onClick={() => {
                            setRange(presetRange);
                            close();
                          }}
                          className={cn(
                            'w-full rounded-md px-3 py-1.5 text-left text-sm whitespace-nowrap text-foreground hover:bg-muted',
                            'focus-visible:outline-2 focus-visible:outline-ring',
                            active && 'bg-primary/10 font-semibold',
                          )}
                        >
                          {preset.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
              <div className="flex flex-col gap-3">
                <RangeCalendar
                  value={range}
                  months={months}
                  locale={locale}
                  weekStartsOn={weekStartsOn}
                  minDate={minDate}
                  maxDate={maxDate}
                  focusOnMount
                  onSelect={(next) => {
                    setRange(next);
                    close();
                  }}
                />
                {range && (
                  <div className="flex justify-end border-t border-border pt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setRange(null);
                        close();
                      }}
                      className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      Borrar
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </PopoverPanel>
      </Popover>
      {description && !error && (
        <p id={`${id}-description`} className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-danger">
          {error}
        </p>
      )}
      {name && range && (
        <>
          <input type="hidden" name={`${name}[start]`} value={toISODate(range[0])} />
          <input type="hidden" name={`${name}[end]`} value={toISODate(range[1])} />
        </>
      )}
    </div>
  );
}
