import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import { XMarkIcon } from '../../utils/icons.jsx';

/**
 * Elemento compacto que representa una entidad (persona, filtro, etiqueta...).
 *
 * @param {object} props
 * @param {React.ReactNode} props.label Texto.
 * @param {string} [props.image] Imagen circular a la izquierda.
 * @param {React.ReactNode} [props.icon] Icono a la izquierda.
 * @param {boolean} [props.removable=false] Muestra un botón para eliminarlo.
 * @param {() => void} [props.onRemove] Se llama al pulsar el botón de eliminar.
 * @param {string} [props.removeLabel] Etiqueta accesible del botón (por defecto «Eliminar {label}»).
 * @param {string} [props.className]
 */
export const Chip = forwardRef(function Chip(
  { label, image, icon, removable = false, onRemove, removeLabel, className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex h-8 items-center gap-2 rounded-full bg-muted px-3 text-sm text-foreground',
        image && 'pl-1',
        removable && 'pr-1',
        className,
      )}
      {...props}
    >
      {image && <img src={image} alt="" className="size-6 rounded-full object-cover" />}
      {!image && icon && <span className="flex text-muted-foreground [&_svg]:size-4">{icon}</span>}
      <span>{label}</span>
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel ?? `Eliminar ${typeof label === 'string' ? label : ''}`.trim()}
          className="flex size-6 items-center justify-center rounded-full text-muted-foreground hover:bg-border hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          <XMarkIcon className="size-4" />
        </button>
      )}
    </span>
  );
});
