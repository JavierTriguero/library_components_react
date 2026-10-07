import { forwardRef, useEffect, useRef } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Bloquea la interacción con su contenido (o con toda la página) mostrando una capa encima.
 * El contenido bloqueado queda `inert`: no recibe foco ni clics y se oculta a lectores de pantalla.
 *
 * @param {object} props
 * @param {boolean} props.blocked Si el contenido está bloqueado.
 * @param {boolean} [props.fullScreen=false] Bloquea toda la ventana en lugar del contenedor.
 * @param {React.ReactNode} [props.template] Contenido de la capa (p. ej. un `ProgressSpinner`).
 * @param {React.ReactNode} [props.children] Contenido que se bloquea.
 * @param {string} [props.className]
 */
export const BlockUI = forwardRef(function BlockUI(
  { blocked, fullScreen = false, template, children, className, ...props },
  ref,
) {
  const contentRef = useRef(null);

  // `inert` se aplica a mano: React 18 no lo reconoce como prop booleana.
  useEffect(() => {
    contentRef.current?.toggleAttribute('inert', Boolean(blocked));
  }, [blocked]);

  return (
    <div ref={ref} aria-busy={blocked || undefined} className={cn('relative', className)} {...props}>
      <div ref={contentRef}>{children}</div>
      {blocked && (
        <div
          className={cn(
            'z-40 flex items-center justify-center bg-black/40',
            fullScreen ? 'fixed inset-0' : 'absolute inset-0 rounded-[inherit]',
          )}
        >
          {template}
        </div>
      )}
    </div>
  );
});
