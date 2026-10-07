import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import { solidSeverity } from '../../utils/severity.js';

const sizes = {
  sm: 'min-w-4 h-4 px-1 text-[0.625rem]',
  md: 'min-w-5 h-5 px-1.5 text-xs',
  lg: 'min-w-6 h-6 px-2 text-sm',
};

/**
 * Indicador numérico o de estado, normalmente junto a otro elemento.
 * Sin `value` se muestra como un punto.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.value] Contenido (número o texto corto).
 * @param {import('../../utils/severity.js').Severity} [props.severity='primary']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {string} [props.className]
 */
export const Badge = forwardRef(function Badge({ value, severity = 'primary', size = 'md', className, ...props }, ref) {
  const isDot = value === undefined || value === null || value === '';
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-full font-semibold',
        solidSeverity[severity],
        isDot ? 'size-2' : sizes[size],
        className,
      )}
      {...props}
    >
      {isDot ? null : value}
    </span>
  );
});
