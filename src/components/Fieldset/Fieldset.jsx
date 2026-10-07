import { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn.js';
import { ChevronDownIcon } from '../../utils/icons.jsx';
import { useControllableState } from '../../utils/useControllableState.js';

/**
 * Agrupa contenido relacionado bajo una leyenda. Opcionalmente se puede plegar.
 *
 * @param {object} props
 * @param {React.ReactNode} props.legend Título del grupo.
 * @param {boolean} [props.toggleable=false] Permite plegar y desplegar el contenido.
 * @param {boolean} [props.collapsed] Estado plegado controlado.
 * @param {boolean} [props.defaultCollapsed=false] Estado plegado inicial.
 * @param {(collapsed: boolean) => void} [props.onToggle]
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.className]
 */
export const Fieldset = forwardRef(function Fieldset(
  { legend, toggleable = false, collapsed, defaultCollapsed = false, onToggle, children, className, ...props },
  ref,
) {
  const [isCollapsed, setCollapsed] = useControllableState(collapsed, defaultCollapsed, onToggle);
  const contentId = useId();
  const hidden = toggleable && isCollapsed;

  return (
    <fieldset
      ref={ref}
      className={cn('rounded-lg border border-border px-4 pt-1 pb-4 text-foreground', hidden && 'pb-1', className)}
      {...props}
    >
      <legend className="px-2 text-sm font-semibold">
        {toggleable ? (
          <button
            type="button"
            aria-expanded={!isCollapsed}
            aria-controls={contentId}
            onClick={() => setCollapsed(!isCollapsed)}
            className="-mx-1 flex items-center gap-1 rounded px-1 hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
          >
            <ChevronDownIcon className={cn('size-4 transition-transform', isCollapsed && '-rotate-90')} />
            {legend}
          </button>
        ) : (
          legend
        )}
      </legend>
      <div id={contentId} hidden={hidden} className="text-sm">
        {children}
      </div>
    </fieldset>
  );
});
