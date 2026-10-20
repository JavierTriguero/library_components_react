import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../utils/cn.js';
import {
  addDays,
  addMonths,
  compareDays,
  endOfWeek,
  getMonthWeeks,
  getWeekdayNames,
  isSameDay,
  isSameMonth,
  isWithinRange,
  orderRange,
  startOfDay,
  startOfMonth,
  startOfWeek,
  toISODate,
} from '../../utils/dates.js';
import { ChevronLeftIcon, ChevronRightIcon } from '../../utils/icons.jsx';

/**
 * Calendario para elegir un rango de fechas (uso interno de DateRangePicker).
 * Primer clic: inicio; segundo clic: fin. Teclado: flechas (día/semana), Inicio/Fin (semana),
 * Re Pág/Av Pág (mes; con Mayús, año), Enter o Espacio para elegir.
 */
export function RangeCalendar({
  value,
  onSelect,
  months = 2,
  locale = 'es',
  weekStartsOn = 1,
  minDate,
  maxDate,
  focusOnMount = false,
}) {
  const today = startOfDay(new Date());
  const [anchor, setAnchor] = useState(null); // inicio elegido, a la espera del fin
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(() => (value ? value[0] : today));
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(value ? value[0] : today));
  const gridRef = useRef(null);
  const keyboardMove = useRef(focusOnMount);

  const monthFormat = useMemo(() => new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }), [locale]);
  const dayLabelFormat = useMemo(() => new Intl.DateTimeFormat(locale, { dateStyle: 'full' }), [locale]);
  const weekdayShort = getWeekdayNames(locale, weekStartsOn, 'short');
  const weekdayLong = getWeekdayNames(locale, weekStartsOn, 'long');
  const visibleMonths = Array.from({ length: months }, (_, i) => addMonths(visibleMonth, i));

  const isDisabled = (day) => (minDate && compareDays(day, minDate) < 0) || (maxDate && compareDays(day, maxDate) > 0);

  // Rango a resaltar: el elegido o, mientras se elige, el que va del inicio al día bajo el puntero.
  const preview = anchor ? orderRange(anchor, hovered ?? anchor) : value;

  // Tras mover el foco con el teclado, enfoca el botón del nuevo día.
  useEffect(() => {
    if (!keyboardMove.current) return;
    keyboardMove.current = false;
    gridRef.current?.querySelector(`[data-date="${toISODate(focused)}"]`)?.focus();
  }, [focused]);

  const moveFocus = (next) => {
    keyboardMove.current = true;
    setFocused(next);
    const lastVisible = addMonths(visibleMonth, months - 1);
    if (compareDays(next, startOfMonth(visibleMonth)) < 0) setVisibleMonth(startOfMonth(next));
    else if (compareDays(next, addMonths(lastVisible, 1)) >= 0 && !isSameMonth(next, lastVisible)) {
      setVisibleMonth(startOfMonth(addMonths(next, -(months - 1))));
    }
  };

  const choose = (day) => {
    if (isDisabled(day)) return;
    setFocused(day);
    if (!anchor) {
      setAnchor(day);
      return;
    }
    setAnchor(null);
    setHovered(null);
    onSelect(orderRange(anchor, day));
  };

  const onKeyDown = (event, day) => {
    const keys = {
      ArrowLeft: () => addDays(day, -1),
      ArrowRight: () => addDays(day, 1),
      ArrowUp: () => addDays(day, -7),
      ArrowDown: () => addDays(day, 7),
      Home: () => startOfWeek(day, weekStartsOn),
      End: () => endOfWeek(day, weekStartsOn),
      PageUp: () => addMonths(day, event.shiftKey ? -12 : -1),
      PageDown: () => addMonths(day, event.shiftKey ? 12 : 1),
    };
    if (keys[event.key]) {
      event.preventDefault();
      const next = keys[event.key]();
      moveFocus(next);
      if (anchor) setHovered(next);
    } else if (event.key === 'Escape' && anchor) {
      // Primer Escape: cancela la selección a medias (el segundo cierra el panel).
      event.stopPropagation();
      setAnchor(null);
      setHovered(null);
    }
  };

  // El día enfocable debe estar visible; si no, el primero del primer mes visible.
  const focusTarget = visibleMonths.some((m) => isSameMonth(m, focused)) ? focused : visibleMonths[0];

  return (
    <div ref={gridRef} className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="Mes anterior"
          onClick={() => setVisibleMonth(addMonths(visibleMonth, -1))}
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          <ChevronLeftIcon />
        </button>
        <button
          type="button"
          aria-label="Mes siguiente"
          onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))}
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          <ChevronRightIcon />
        </button>
      </div>
      <div className="grid gap-6 sm:grid-flow-col">
        {visibleMonths.map((month) => {
          const title = monthFormat.format(month);
          return (
            <div key={toISODate(month)} className="flex flex-col gap-2">
              <h2 aria-live="polite" className="text-center text-sm font-semibold text-foreground">
                {title.charAt(0).toLocaleUpperCase(locale) + title.slice(1)}
              </h2>
              <table role="grid" aria-label={title} className="border-collapse" onMouseLeave={() => setHovered(null)}>
                <thead>
                  <tr>
                    {weekdayShort.map((name, i) => (
                      <th
                        key={name}
                        scope="col"
                        abbr={weekdayLong[i]}
                        className="pb-1 text-xs font-medium text-muted-foreground"
                      >
                        {name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {getMonthWeeks(month, weekStartsOn).map((week) => (
                    <tr key={toISODate(week[0])}>
                      {week.map((day) => {
                        if (!isSameMonth(day, month)) return <td key={toISODate(day)} className="size-9" />;
                        const disabled = isDisabled(day);
                        const isStart = preview && isSameDay(day, preview[0]);
                        const isEnd = preview && isSameDay(day, preview[1]);
                        const inRange = preview && isWithinRange(day, preview[0], preview[1]);
                        return (
                          <td
                            key={toISODate(day)}
                            role="gridcell"
                            aria-selected={Boolean(inRange)}
                            className={cn(
                              'p-0 text-center',
                              inRange && 'bg-primary/10',
                              isStart && 'rounded-l-md',
                              isEnd && 'rounded-r-md',
                            )}
                          >
                            <button
                              type="button"
                              data-date={toISODate(day)}
                              tabIndex={isSameDay(day, focusTarget) ? 0 : -1}
                              disabled={disabled}
                              aria-label={dayLabelFormat.format(day)}
                              aria-current={isSameDay(day, today) ? 'date' : undefined}
                              onClick={() => choose(day)}
                              onKeyDown={(event) => onKeyDown(event, day)}
                              onMouseEnter={() => anchor && setHovered(day)}
                              onFocus={() => setFocused(day)}
                              className={cn(
                                'flex size-9 items-center justify-center rounded-md text-sm text-foreground',
                                'hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring',
                                'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent',
                                isSameDay(day, today) && 'font-semibold underline underline-offset-4',
                                (isStart || isEnd) && 'bg-primary text-primary-foreground hover:bg-primary-hover',
                              )}
                            >
                              {day.getDate()}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}
