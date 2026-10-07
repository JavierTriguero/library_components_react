import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import { fillSeverity } from '../../utils/severity.js';

const defaultSeverities = ['primary', 'success', 'warning', 'info', 'danger'];

/**
 * @typedef {object} MeterItem
 * @property {string} label Nombre del segmento.
 * @property {number} value Valor del segmento.
 * @property {import('../../utils/severity.js').Severity} [severity] Color del tema.
 * @property {string} [color] Color CSS propio (tiene prioridad sobre `severity`).
 */

/**
 * Barra con varios segmentos proporcionales y su leyenda (p. ej. uso de almacenamiento).
 *
 * @param {object} props
 * @param {MeterItem[]} props.values Segmentos.
 * @param {number} [props.max=100] Valor que llena la barra completa.
 * @param {boolean} [props.showLegend=true]
 * @param {(value: number, max: number) => React.ReactNode} [props.formatValue] Texto del valor en la leyenda.
 * @param {string} [props.className]
 */
export const MeterGroup = forwardRef(function MeterGroup(
  {
    values,
    max = 100,
    showLegend = true,
    formatValue = (value, total) => `${Math.round((value / total) * 100)}%`,
    className,
    ...props
  },
  ref,
) {
  const items = values.map((item, i) => ({
    ...item,
    severity: item.severity ?? defaultSeverities[i % defaultSeverities.length],
  }));

  return (
    <div ref={ref} className={cn('flex flex-col gap-3', className)} {...props}>
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
        {items.map((item) => (
          <div
            key={item.label}
            role="meter"
            aria-label={item.label}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-valuenow={item.value}
            className={cn('h-full', !item.color && fillSeverity[item.severity])}
            style={{ width: `${(item.value / max) * 100}%`, backgroundColor: item.color }}
          />
        ))}
      </div>
      {showLegend && (
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-foreground">
          {items.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={cn('size-2 rounded-full', !item.color && fillSeverity[item.severity])}
                style={{ backgroundColor: item.color }}
              />
              {item.label}
              <span className="text-muted-foreground">({formatValue(item.value, max)})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
