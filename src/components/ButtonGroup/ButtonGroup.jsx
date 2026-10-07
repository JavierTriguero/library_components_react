import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Une varios `Button` en un solo bloque visual.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children Botones.
 * @param {string} [props['aria-label']] Describe el grupo para los lectores de pantalla.
 * @param {string} [props.className]
 */
export const ButtonGroup = forwardRef(function ButtonGroup({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      role="group"
      className={cn(
        'inline-flex isolate',
        '[&>*]:relative [&>*]:rounded-none [&>*:focus-visible]:z-10',
        '[&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md [&>*:not(:first-child)]:-ml-px',
        className,
      )}
      {...props}
    />
  );
});
