import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { cn } from '../../utils/cn.js';

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

/**
 * Ventana modal. Se cierra con Escape o al hacer clic fuera, atrapa el foco
 * mientras está abierta y lo devuelve al cerrarse.
 *
 * @param {object} props
 * @param {boolean} props.open Si la modal está abierta.
 * @param {() => void} props.onClose Se llama cuando el usuario pide cerrarla.
 * @param {React.ReactNode} [props.title] Título (se anuncia a lectores de pantalla).
 * @param {React.ReactNode} [props.description] Texto bajo el título.
 * @param {React.ReactNode} [props.footer] Acciones, normalmente botones, alineadas a la derecha.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] Ancho máximo.
 * @param {React.ReactNode} [props.children] Contenido.
 * @param {string} [props.className] Clases adicionales para el panel.
 */
export function Modal({ open, onClose, title, description, footer, size = 'md', children, className }) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 transition-opacity duration-200 ease-out data-closed:opacity-0"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          transition
          className={cn(
            'w-full rounded-lg bg-background p-6 text-foreground shadow-xl',
            'transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0',
            sizes[size],
            className,
          )}
        >
          {title && <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>}
          {description && <Description className="mt-1 text-sm text-muted-foreground">{description}</Description>}
          {children && <div className={cn((title || description) && 'mt-4')}>{children}</div>}
          {footer && <div className="mt-6 flex justify-end gap-3">{footer}</div>}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
