import { useEffect, useRef } from 'react';
import { cn } from '../../utils/cn.js';
import { XMarkIcon } from '../../utils/icons.jsx';
import { useControllableState } from '../../utils/useControllableState.js';

/**
 * Muestra un contenido de solo lectura que, al pulsarlo, se sustituye por otro
 * (normalmente un campo editable).
 *
 * @param {object} props
 * @param {React.ReactNode} props.display Contenido visible en modo lectura.
 * @param {React.ReactNode} props.children Contenido en modo activo.
 * @param {boolean} [props.active] Estado activo controlado.
 * @param {boolean} [props.defaultActive=false] Estado activo inicial.
 * @param {(active: boolean) => void} [props.onToggle]
 * @param {boolean} [props.closable=false] Muestra un botón para volver al modo lectura.
 * @param {boolean} [props.disabled=false]
 * @param {string} [props.className]
 */
export function Inplace({
  display,
  children,
  active,
  defaultActive = false,
  onToggle,
  closable = false,
  disabled = false,
  className,
}) {
  const [isActive, setActive] = useControllableState(active, defaultActive, onToggle);
  const contentRef = useRef(null);
  const displayRef = useRef(null);
  const wasActive = useRef(isActive);

  // Al cambiar de modo, el foco sigue al contenido nuevo.
  useEffect(() => {
    if (isActive && !wasActive.current) {
      contentRef.current?.querySelector('input, textarea, select, button, [tabindex]')?.focus();
    } else if (!isActive && wasActive.current) {
      displayRef.current?.focus();
    }
    wasActive.current = isActive;
  }, [isActive]);

  if (!isActive) {
    return (
      <button
        ref={displayRef}
        type="button"
        disabled={disabled}
        onClick={() => setActive(true)}
        className={cn(
          'rounded-md px-2 py-1 text-left text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
      >
        {display}
      </button>
    );
  }

  return (
    <div ref={contentRef} className={cn('inline-flex items-center gap-2', className)}>
      {children}
      {closable && (
        <button
          type="button"
          onClick={() => setActive(false)}
          aria-label="Cerrar"
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          <XMarkIcon className="size-4" />
        </button>
      )}
    </div>
  );
}
