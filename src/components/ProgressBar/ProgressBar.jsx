import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import { fillSeverity } from '../../utils/severity.js';

/**
 * Barra de progreso determinada (con `value`) o indeterminada.
 *
 * @param {object} props
 * @param {number} [props.value] Progreso de 0 a 100. Sin valor, la barra es indeterminada.
 * @param {boolean} [props.showValue=true] Muestra el porcentaje dentro de la barra.
 * @param {string} [props.label='Progreso'] Nombre accesible.
 * @param {import('../../utils/severity.js').Severity} [props.severity='primary']
 * @param {string} [props.className]
 */
export const ProgressBar = forwardRef(function ProgressBar(
  { value, showValue = true, label = 'Progreso', severity = 'primary', className, ...props },
  ref,
) {
  const indeterminate = value === undefined || value === null;
  const clamped = indeterminate ? 0 : Math.min(100, Math.max(0, value));

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={indeterminate ? undefined : clamped}
      className={cn('relative h-4 w-full overflow-hidden rounded-full bg-muted', className)}
      {...props}
    >
      {indeterminate ? (
        <div
          className={cn('absolute inset-y-0 w-1/4 rounded-full animate-progress-indeterminate', fillSeverity[severity])}
        />
      ) : (
        <div
          className={cn(
            'flex h-full items-center justify-end rounded-full transition-[width] duration-300',
            fillSeverity[severity],
          )}
          style={{ width: `${clamped}%` }}
        >
          {showValue && clamped >= 10 && (
            <span className="px-2 text-[0.625rem] leading-none font-semibold text-white">{Math.round(clamped)}%</span>
          )}
        </div>
      )}
    </div>
  );
});
