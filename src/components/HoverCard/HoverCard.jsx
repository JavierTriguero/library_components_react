import { useState } from 'react';
import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  safePolygon,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useTransitionStyles,
} from '@floating-ui/react';
import { cn } from '../../utils/cn.js';

/**
 * Tarjeta con información adicional que aparece al pasar el ratón o enfocar el disparador
 * (vista previa de un perfil, de un enlace...). Es un complemento visual: la información
 * importante debe estar también accesible de otra forma (p. ej. en la página enlazada).
 *
 * @param {object} props
 * @param {React.ReactNode} props.trigger Elemento sobre el que se pasa el ratón (normalmente un enlace).
 * @param {React.ReactNode} props.children Contenido de la tarjeta.
 * @param {import('../Popover/Popover.jsx').Placement} [props.placement='bottom']
 * @param {number} [props.openDelay=500] Milisegundos antes de mostrarse.
 * @param {number} [props.closeDelay=200] Milisegundos antes de ocultarse al salir.
 * @param {string} [props.className] Clases adicionales para la tarjeta.
 */
export function HoverCard({ trigger, children, placement = 'bottom', openDelay = 500, closeDelay = 200, className }) {
  const [open, setOpen] = useState(false);
  const {
    refs: { setReference, setFloating },
    floatingStyles,
    context,
  } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });
  const hover = useHover(context, { delay: { open: openDelay, close: closeDelay }, handleClose: safePolygon() });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss]);
  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 150,
    initial: { opacity: 0, transform: 'scale(0.96)' },
  });

  return (
    <>
      <span ref={setReference} className="inline-flex" {...getReferenceProps()}>
        {trigger}
      </span>
      {isMounted && (
        <FloatingPortal>
          <div ref={setFloating} style={floatingStyles} className="z-50" {...getFloatingProps()}>
            <div
              style={styles}
              className={cn(
                'w-72 rounded-lg bg-background p-4 text-sm text-foreground shadow-lg ring-1 ring-border',
                className,
              )}
            >
              {children}
            </div>
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
