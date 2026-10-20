import { useRef, useState } from 'react';
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { cn } from '../../utils/cn.js';
import { XMarkIcon } from '../../utils/icons.jsx';

// `auto`: hoja inferior en móvil y panel lateral derecho desde `md` (48rem).
const DESKTOP_QUERY = '(min-width: 48rem)';

const sides = {
  auto: cn(
    'inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl data-closed:translate-y-full',
    'md:inset-x-auto md:inset-y-0 md:right-0 md:h-full md:max-h-none md:w-full md:rounded-none',
    'md:data-closed:translate-x-full md:data-closed:translate-y-0',
  ),
  bottom: 'inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl data-closed:translate-y-full',
  top: 'inset-x-0 top-0 max-h-[85vh] rounded-b-2xl data-closed:-translate-y-full',
  right: 'inset-y-0 right-0 h-full w-full data-closed:translate-x-full',
  left: 'inset-y-0 left-0 h-full w-full data-closed:-translate-x-full',
};

// Ancho máximo de los paneles laterales.
const sizes = {
  sm: 'md:max-w-sm',
  md: 'md:max-w-md',
  lg: 'md:max-w-2xl',
};

/**
 * Panel que se desliza desde un borde de la pantalla. Con `side="auto"` es una hoja
 * inferior en móvil, que se cierra arrastrándola hacia abajo, y un panel lateral en escritorio.
 * Como un `Modal`, atrapa el foco y se cierra con Escape o al pulsar fuera.
 *
 * @param {object} props
 * @param {boolean} props.open Si está abierto.
 * @param {() => void} props.onClose Se llama cuando el usuario pide cerrarlo.
 * @param {React.ReactNode} props.title Título (se anuncia a lectores de pantalla).
 * @param {React.ReactNode} [props.description] Texto bajo el título.
 * @param {React.ReactNode} [props.footer] Acciones fijas en la parte inferior.
 * @param {'auto' | 'bottom' | 'top' | 'right' | 'left'} [props.side='auto'] Borde desde el que aparece.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] Ancho máximo de los paneles laterales.
 * @param {boolean} [props.dragToClose=true] Permite cerrar la hoja inferior arrastrándola.
 * @param {React.ReactNode} [props.children] Contenido (con scroll propio si no cabe).
 * @param {string} [props.className] Clases adicionales para el panel.
 */
export function Drawer({
  open,
  onClose,
  title,
  description,
  footer,
  side = 'auto',
  size = 'md',
  dragToClose = true,
  children,
  className,
}) {
  const panelRef = useRef(null);
  const drag = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  const canDrag = () =>
    dragToClose && (side === 'bottom' || (side === 'auto' && !window.matchMedia?.(DESKTOP_QUERY).matches));

  const onPointerDown = (event) => {
    if (!canDrag()) return;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    drag.current = { startY: event.clientY, startTime: event.timeStamp };
  };

  const onPointerMove = (event) => {
    if (!drag.current) return;
    setOffsetY(Math.max(0, event.clientY - drag.current.startY));
  };

  const onPointerUp = (event) => {
    if (!drag.current) return;
    const distance = Math.max(0, event.clientY - drag.current.startY);
    const velocity = distance / Math.max(1, event.timeStamp - drag.current.startTime);
    const height = panelRef.current?.offsetHeight ?? 1;
    drag.current = null;
    setOffsetY(0);
    // Se cierra si se arrastra más de un cuarto de su altura o con un gesto rápido.
    if (distance > height / 4 || velocity > 0.5) onClose();
  };

  const dragging = offsetY > 0;
  const showHandle = side === 'bottom' || side === 'auto';

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-out data-closed:opacity-0"
      />
      <DialogPanel
        ref={panelRef}
        transition
        style={dragging ? { transform: `translateY(${offsetY}px)`, transition: 'none' } : undefined}
        className={cn(
          'fixed flex flex-col bg-background text-foreground shadow-xl transition duration-300 ease-out',
          sides[side],
          (side === 'right' || side === 'left' || side === 'auto') && sizes[size],
          className,
        )}
      >
        {showHandle && (
          <div
            aria-hidden="true"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className={cn(
              'flex shrink-0 cursor-grab touch-none justify-center pt-3 pb-1',
              side === 'auto' && 'md:hidden',
            )}
          >
            <div className="h-1.5 w-12 rounded-full bg-border" />
          </div>
        )}
        <div className="flex shrink-0 items-start justify-between gap-4 px-6 pt-4 pb-2">
          <div>
            <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
            {description && <Description className="mt-1 text-sm text-muted-foreground">{description}</Description>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="-mr-2 flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <XMarkIcon />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 text-sm">{children}</div>
        {footer && <div className="flex shrink-0 justify-end gap-3 border-t border-border px-6 py-4">{footer}</div>}
      </DialogPanel>
    </Dialog>
  );
}
