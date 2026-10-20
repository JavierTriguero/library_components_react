import { describe, expect, it } from 'vitest';
import {
  addDays,
  addMonths,
  compareDays,
  endOfMonth,
  getMonthWeeks,
  getWeekdayNames,
  isSameDay,
  isWithinRange,
  orderRange,
  startOfWeek,
  toISODate,
} from './dates.js';

const d = (iso) => {
  const [y, m, day] = iso.split('-').map(Number);
  return new Date(y, m - 1, day);
};

describe('dates', () => {
  it('suma días y meses cruzando límites', () => {
    expect(toISODate(addDays(d('2026-12-31'), 1))).toBe('2027-01-01');
    expect(toISODate(addMonths(d('2026-01-31'), 1))).toBe('2026-02-28');
    expect(toISODate(addMonths(d('2028-01-31'), 1))).toBe('2028-02-29');
    expect(toISODate(addMonths(d('2026-03-15'), -3))).toBe('2025-12-15');
    expect(toISODate(endOfMonth(d('2026-02-10')))).toBe('2026-02-28');
  });

  it('calcula el inicio de semana según el primer día', () => {
    // 15 de octubre de 2026 es jueves.
    expect(toISODate(startOfWeek(d('2026-10-15'), 1))).toBe('2026-10-12');
    expect(toISODate(startOfWeek(d('2026-10-15'), 0))).toBe('2026-10-11');
    expect(toISODate(startOfWeek(d('2026-10-12'), 1))).toBe('2026-10-12');
  });

  it('genera las semanas completas de un mes', () => {
    const weeks = getMonthWeeks(d('2026-10-01'), 1);
    expect(weeks).toHaveLength(5);
    expect(weeks.every((week) => week.length === 7)).toBe(true);
    expect(toISODate(weeks[0][0])).toBe('2026-09-28');
    expect(toISODate(weeks[4][6])).toBe('2026-11-01');
  });

  it('compara días ignorando la hora y ordena rangos', () => {
    expect(compareDays(new Date(2026, 9, 15, 23), new Date(2026, 9, 15, 1))).toBe(0);
    expect(isSameDay(d('2026-10-15'), new Date(2026, 9, 15, 12))).toBe(true);
    expect(isWithinRange(d('2026-10-15'), d('2026-10-10'), d('2026-10-20'))).toBe(true);
    expect(isWithinRange(d('2026-10-21'), d('2026-10-10'), d('2026-10-20'))).toBe(false);
    expect(orderRange(d('2026-10-20'), d('2026-10-10')).map(toISODate)).toEqual(['2026-10-10', '2026-10-20']);
  });

  it('obtiene los nombres de los días en el idioma indicado', () => {
    const es = getWeekdayNames('es', 1, 'long');
    expect(es[0].toLowerCase()).toBe('lunes');
    expect(es[6].toLowerCase()).toBe('domingo');
    expect(getWeekdayNames('en', 0, 'long')[0]).toBe('Sunday');
  });
});
