import { useId, useState } from 'react';
import { cn } from '../../utils/cn.js';
import { NoSymbolIcon, StarIcon } from '../../utils/icons.jsx';
import { useControllableState } from '../../utils/useControllableState.js';

/**
 * Valoración con estrellas. Internamente es un `<fieldset>` con botones de opción
 * nativos, así que se maneja con las flechas del teclado.
 *
 * @param {object} props
 * @param {number | null} [props.value] Valor controlado (`null` = sin valorar).
 * @param {number | null} [props.defaultValue=null] Valor inicial.
 * @param {(value: number | null) => void} [props.onChange]
 * @param {number} [props.stars=5] Número de estrellas.
 * @param {boolean} [props.cancel=false] Muestra un botón para borrar la valoración.
 * @param {boolean} [props.readOnly=false] Solo muestra el valor.
 * @param {boolean} [props.disabled=false]
 * @param {string} [props.label='Valoración'] Nombre accesible del grupo.
 * @param {string} [props.name] Nombre para envío en formularios.
 * @param {string} [props.className]
 */
export function Rating({
  value,
  defaultValue = null,
  onChange,
  stars = 5,
  cancel = false,
  readOnly = false,
  disabled = false,
  label = 'Valoración',
  name,
  className,
}) {
  const [current, setCurrent] = useControllableState(value, defaultValue, onChange);
  const [hovered, setHovered] = useState(null);
  const generatedName = useId();
  const shown = hovered ?? current ?? 0;
  const items = Array.from({ length: stars }, (_, i) => i + 1);

  if (readOnly) {
    return (
      <div role="img" aria-label={`${label}: ${current ?? 0} de ${stars}`} className={cn('flex gap-1', className)}>
        {items.map((n) => (
          <StarIcon key={n} className={n <= shown ? 'text-warning' : 'text-border'} />
        ))}
      </div>
    );
  }

  return (
    <fieldset
      disabled={disabled}
      className={cn('flex items-center gap-1', disabled && 'opacity-50', className)}
      onMouseLeave={() => setHovered(null)}
    >
      <legend className="sr-only">{label}</legend>
      {cancel && (
        <button
          type="button"
          disabled={disabled || current == null}
          onClick={() => setCurrent(null)}
          aria-label="Borrar valoración"
          className="mr-1 rounded text-muted-foreground hover:text-danger focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          <NoSymbolIcon />
        </button>
      )}
      {items.map((n) => (
        <label
          key={n}
          className={cn('group relative', disabled ? 'cursor-not-allowed' : 'cursor-pointer')}
          onMouseEnter={() => !disabled && setHovered(n)}
        >
          <input
            type="radio"
            name={name ?? generatedName}
            value={n}
            checked={current === n}
            disabled={disabled}
            onChange={() => setCurrent(n)}
            className="peer sr-only"
          />
          <StarIcon
            className={cn(
              'rounded transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-ring',
              n <= shown ? 'text-warning' : 'text-border',
            )}
          />
          <span className="sr-only">{n === 1 ? '1 estrella' : `${n} estrellas`}</span>
        </label>
      ))}
    </fieldset>
  );
}
