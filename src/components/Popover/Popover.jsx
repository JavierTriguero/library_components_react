import { Fragment } from 'react';
import { Popover as HeadlessPopover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { cn } from '../../utils/cn.js';

/** @typedef {'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'right'} Placement */

/**
 * Panel flotante con contenido rico que se abre al pulsar el disparador.
 * Se cierra con Escape, al hacer clic fuera o al mover el foco fuera del panel.
 *
 * @param {object} props
 * @param {React.ReactElement} props.trigger Elemento que abre el panel (p. ej. un `Button`); debe aceptar `ref`.
 * @param {React.ReactNode | ((api: { close: () => void }) => React.ReactNode)} props.children
 *   Contenido; si es una función recibe `close` para cerrar el panel.
 * @param {React.ReactNode} [props.title] Título en la parte superior del panel.
 * @param {Placement} [props.placement='bottom'] Posición respecto al disparador.
 * @param {string} [props.className] Clases adicionales para el panel.
 */
export function Popover({ trigger, children, title, placement = 'bottom', className }) {
  return (
    <HeadlessPopover className="inline-flex">
      <PopoverButton as={Fragment}>{trigger}</PopoverButton>
      <PopoverPanel
        anchor={{ to: placement.replace('-', ' '), gap: 8, padding: 8 }}
        transition
        className={cn(
          'z-50 w-72 rounded-lg bg-background p-4 text-sm text-foreground shadow-lg ring-1 ring-border focus:outline-none',
          'transition duration-150 ease-out data-closed:scale-95 data-closed:opacity-0',
          className,
        )}
      >
        {({ close }) => (
          <>
            {title && <h3 className="mb-2 text-sm font-semibold">{title}</h3>}
            {typeof children === 'function' ? children({ close }) : children}
          </>
        )}
      </PopoverPanel>
    </HeadlessPopover>
  );
}
