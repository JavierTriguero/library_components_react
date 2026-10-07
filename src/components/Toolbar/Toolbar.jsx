import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Barra horizontal que agrupa acciones en tres zonas: inicio, centro y final.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.start] Contenido a la izquierda.
 * @param {React.ReactNode} [props.center] Contenido centrado.
 * @param {React.ReactNode} [props.end] Contenido a la derecha.
 * @param {string} [props.className]
 */
export const Toolbar = forwardRef(function Toolbar({ start, center, end, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-wrap items-center justify-between gap-2 rounded-lg bg-muted p-3 text-foreground ring-1 ring-border',
        className,
      )}
      {...props}
    >
      <div className="flex flex-wrap items-center gap-2">{start}</div>
      {center && <div className="flex flex-wrap items-center gap-2">{center}</div>}
      <div className="flex flex-wrap items-center gap-2">{end}</div>
    </div>
  );
});
