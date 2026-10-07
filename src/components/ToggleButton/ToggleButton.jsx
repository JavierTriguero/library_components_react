import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import { useControllableState } from '../../utils/useControllableState.js';

/**
 * Botón que alterna entre activado y desactivado (aria-pressed).
 *
 * @param {object} props
 * @param {boolean} [props.checked] Estado controlado.
 * @param {boolean} [props.defaultChecked=false] Estado inicial.
 * @param {(checked: boolean) => void} [props.onChange]
 * @param {React.ReactNode} [props.onLabel] Texto cuando está activado.
 * @param {React.ReactNode} [props.offLabel] Texto cuando está desactivado.
 * @param {React.ReactNode} [props.onIcon] Icono cuando está activado.
 * @param {React.ReactNode} [props.offIcon] Icono cuando está desactivado.
 * @param {React.ReactNode} [props.children] Contenido fijo (en lugar de onLabel/offLabel).
 * @param {boolean} [props.disabled]
 * @param {string} [props.className]
 */
export const ToggleButton = forwardRef(function ToggleButton(
  { checked, defaultChecked = false, onChange, onLabel, offLabel, onIcon, offIcon, children, className, ...props },
  ref,
) {
  const [isOn, setOn] = useControllableState(checked, defaultChecked, onChange);

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={isOn}
      onClick={() => setOn(!isOn)}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md px-3.5 py-2 text-sm font-semibold shadow-sm ring-1 transition-colors ring-inset',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        'disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:size-4',
        isOn
          ? 'bg-primary text-primary-foreground ring-primary hover:bg-primary-hover'
          : 'bg-background text-foreground ring-border hover:bg-muted',
        className,
      )}
      {...props}
    >
      {isOn ? onIcon : offIcon}
      {children ?? (isOn ? onLabel : offLabel)}
    </button>
  );
});
