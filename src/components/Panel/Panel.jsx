import { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn.js';
import { ChevronDownIcon } from '../../utils/icons.jsx';
import { useControllableState } from '../../utils/useControllableState.js';

/**
 * Contenedor con cabecera, opcionalmente plegable.
 *
 * @param {object} props
 * @param {React.ReactNode} props.header Título de la cabecera.
 * @param {React.ReactNode} [props.icons] Contenido extra a la derecha de la cabecera (p. ej. botones).
 * @param {React.ReactNode} [props.footer] Pie del panel.
 * @param {boolean} [props.toggleable=false] Permite plegar y desplegar el contenido.
 * @param {boolean} [props.collapsed] Estado plegado controlado.
 * @param {boolean} [props.defaultCollapsed=false] Estado plegado inicial.
 * @param {(collapsed: boolean) => void} [props.onToggle]
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.className]
 */
export const Panel = forwardRef(function Panel(
  {
    header,
    icons,
    footer,
    toggleable = false,
    collapsed,
    defaultCollapsed = false,
    onToggle,
    children,
    className,
    ...props
  },
  ref,
) {
  const [isCollapsed, setCollapsed] = useControllableState(collapsed, defaultCollapsed, onToggle);
  const contentId = useId();
  const headerId = useId();
  const hidden = toggleable && isCollapsed;

  return (
    <section
      ref={ref}
      aria-labelledby={headerId}
      className={cn('overflow-hidden rounded-lg bg-background text-foreground ring-1 ring-border', className)}
      {...props}
    >
      <div className="flex items-center justify-between gap-2 bg-muted px-4 py-3">
        <h3 id={headerId} className="text-sm font-semibold">
          {header}
        </h3>
        <div className="flex items-center gap-1">
          {icons}
          {toggleable && (
            <button
              type="button"
              aria-expanded={!isCollapsed}
              aria-controls={contentId}
              aria-label={isCollapsed ? 'Desplegar' : 'Plegar'}
              onClick={() => setCollapsed(!isCollapsed)}
              className="flex size-7 items-center justify-center rounded text-muted-foreground hover:bg-border hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
            >
              <ChevronDownIcon className={cn('size-4 transition-transform', isCollapsed && '-rotate-90')} />
            </button>
          )}
        </div>
      </div>
      <div id={contentId} hidden={hidden}>
        <div className="p-4 text-sm">{children}</div>
        {footer && <div className="border-t border-border px-4 py-3 text-sm">{footer}</div>}
      </div>
    </section>
  );
});
