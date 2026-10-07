import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Área con scroll propio y barra de desplazamiento fina acorde al tema.
 * Recibe el foco con el teclado para poder desplazarse con las flechas.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props['aria-label']] Nombre accesible de la región.
 * @param {string} [props.className] Define aquí la altura, p. ej. `h-64`.
 */
export const ScrollPanel = forwardRef(function ScrollPanel({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- las regiones con scroll deben ser accesibles por teclado
      tabIndex={0}
      className={cn(
        'overflow-auto rounded-md [scrollbar-color:var(--color-border)_transparent] [scrollbar-width:thin]',
        'focus-visible:outline-2 focus-visible:outline-ring',
        className,
      )}
      {...props}
    />
  );
});
