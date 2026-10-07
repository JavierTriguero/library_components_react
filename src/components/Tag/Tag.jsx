import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import { solidSeverity } from '../../utils/severity.js';

/**
 * Etiqueta para categorizar o marcar el estado de un elemento.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.value] Texto (también se acepta `children`).
 * @param {React.ReactNode} [props.icon] Icono a la izquierda.
 * @param {import('../../utils/severity.js').Severity} [props.severity='primary']
 * @param {boolean} [props.rounded=false] Bordes totalmente redondeados.
 * @param {string} [props.className]
 */
export const Tag = forwardRef(function Tag(
  { value, icon, severity = 'primary', rounded = false, className, children, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold [&_svg]:size-3.5',
        rounded ? 'rounded-full' : 'rounded',
        solidSeverity[severity],
        className,
      )}
      {...props}
    >
      {icon}
      {value ?? children}
    </span>
  );
});
