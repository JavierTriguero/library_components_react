import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Contenedor con borde para agrupar contenido.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.title] Título de la tarjeta.
 * @param {React.ReactNode} [props.description] Texto bajo el título.
 * @param {React.ReactNode} [props.footer] Pie, normalmente acciones.
 * @param {React.ReactNode} [props.children] Contenido.
 * @param {string} [props.className] Clases adicionales.
 */
export const Card = forwardRef(function Card({ title, description, footer, children, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn('rounded-lg bg-background text-foreground shadow-sm ring-1 ring-border', className)}
      {...props}
    >
      {(title || description) && (
        <div className="px-6 pt-6">
          {title && <h3 className="text-base font-semibold">{title}</h3>}
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      {children && <div className="px-6 py-4">{children}</div>}
      {footer && <div className="flex justify-end gap-3 border-t border-border px-6 py-4">{footer}</div>}
    </div>
  );
});
