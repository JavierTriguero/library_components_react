// Utilidades de fechas sin dependencias (Date + Intl). Todas trabajan en hora local
// y devuelven fechas nuevas a medianoche; nunca modifican la fecha recibida.

export function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addDays(date, amount) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

export function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/** Suma meses conservando el día cuando existe (31 ene + 1 mes = 28/29 feb). */
export function addMonths(date, amount) {
  const target = new Date(date.getFullYear(), date.getMonth() + amount, 1);
  const lastDay = endOfMonth(target).getDate();
  return new Date(target.getFullYear(), target.getMonth(), Math.min(date.getDate(), lastDay));
}

/** Inicio de la semana; `weekStartsOn`: 0 = domingo, 1 = lunes. */
export function startOfWeek(date, weekStartsOn = 1) {
  return addDays(date, -((date.getDay() - weekStartsOn + 7) % 7));
}

export function endOfWeek(date, weekStartsOn = 1) {
  return addDays(startOfWeek(date, weekStartsOn), 6);
}

export function isSameDay(a, b) {
  return (
    Boolean(a && b) &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isSameMonth(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

/** Compara solo el día: negativo si `a` es anterior, 0 si es el mismo día, positivo si es posterior. */
export function compareDays(a, b) {
  return startOfDay(a).getTime() - startOfDay(b).getTime();
}

export function isWithinRange(date, start, end) {
  return compareDays(date, start) >= 0 && compareDays(date, end) <= 0;
}

/** Ordena los extremos de un rango. */
export function orderRange(a, b) {
  return compareDays(a, b) <= 0 ? [a, b] : [b, a];
}

/** Semanas (arrays de 7 fechas) que cubren el mes, empezando en `weekStartsOn`. */
export function getMonthWeeks(month, weekStartsOn = 1) {
  const first = startOfWeek(startOfMonth(month), weekStartsOn);
  const last = endOfWeek(endOfMonth(month), weekStartsOn);
  const weeks = [];
  for (let day = first; compareDays(day, last) <= 0; day = addDays(day, 7)) {
    weeks.push(Array.from({ length: 7 }, (_, i) => addDays(day, i)));
  }
  return weeks;
}

/** Nombres de los días de la semana en el idioma indicado, empezando en `weekStartsOn`. */
export function getWeekdayNames(locale, weekStartsOn = 1, weekday = 'short') {
  const format = new Intl.DateTimeFormat(locale, { weekday });
  // 7 de enero de 2024 fue domingo.
  return Array.from({ length: 7 }, (_, i) => format.format(new Date(2024, 0, 7 + ((weekStartsOn + i) % 7))));
}

/** Fecha en formato AAAA-MM-DD (hora local), útil como clave o valor de formulario. */
export function toISODate(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
