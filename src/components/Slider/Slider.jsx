import { useId } from 'react';
import { cn } from '../../utils/cn.js';
import { useControllableState } from '../../utils/useControllableState.js';

// Tamaño del tirador en px: se usa para alinear la barra de relleno con su centro.
const THUMB = 16;

const thumbClasses = cn(
  'absolute inset-0 m-0 h-5 w-full cursor-pointer appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed',
  '[&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full',
  '[&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-primary',
  '[&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0',
  '[&::-moz-range-thumb]:bg-background [&::-moz-range-thumb]:shadow [&::-moz-range-thumb]:ring-2 [&::-moz-range-thumb]:ring-primary',
  'focus-visible:[&::-webkit-slider-thumb]:ring-4 focus-visible:[&::-moz-range-thumb]:ring-4',
);

// Los dos tiradores del rango se superponen: solo el tirador recibe el puntero.
const rangeThumbClasses = cn(
  'pointer-events-none',
  '[&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto',
);

/** Posición CSS del centro del tirador para un porcentaje dado. */
const thumbCenter = (pct) => `calc(${pct}% + ${THUMB / 2 - (pct * THUMB) / 100}px)`;

/**
 * Control deslizante para elegir un número, o un rango con `range`.
 *
 * @param {object} props
 * @param {number | [number, number]} [props.value] Valor controlado (array si `range`).
 * @param {number | [number, number]} [props.defaultValue] Valor inicial.
 * @param {(value: number | [number, number]) => void} [props.onChange]
 * @param {number} [props.min=0]
 * @param {number} [props.max=100]
 * @param {number} [props.step=1]
 * @param {boolean} [props.range=false] Dos tiradores para elegir un intervalo.
 * @param {React.ReactNode} [props.label] Etiqueta visible.
 * @param {boolean} [props.showValue=false] Muestra el valor junto a la etiqueta.
 * @param {boolean} [props.disabled]
 * @param {string} [props.name] Nombre para envío en formularios.
 * @param {string} [props.className]
 */
export function Slider({
  value,
  defaultValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  range = false,
  label,
  showValue = false,
  disabled,
  name,
  className,
}) {
  const id = useId();
  const [current, setCurrent] = useControllableState(value, defaultValue ?? (range ? [min, max] : min), onChange);
  const pct = (v) => ((v - min) / (max - min)) * 100;

  const [low, high] = range ? current : [min, current];
  const fillLeft = range ? thumbCenter(pct(low)) : '0%';
  const fillRight = thumbCenter(pct(high));

  return (
    <div className={cn('flex flex-col gap-2', disabled && 'opacity-50', className)}>
      {(label || showValue) && (
        <div className="flex justify-between text-sm">
          {label && (
            <label id={`${id}-label`} htmlFor={range ? undefined : id} className="font-medium text-foreground">
              {label}
            </label>
          )}
          {showValue && <span className="text-muted-foreground">{range ? `${low} – ${high}` : current}</span>}
        </div>
      )}
      <div
        role={range ? 'group' : undefined}
        aria-labelledby={range && label ? `${id}-label` : undefined}
        className="relative flex h-5 items-center"
      >
        <div className="absolute h-1.5 w-full rounded-full bg-muted" />
        <div
          className="absolute h-1.5 rounded-full bg-primary"
          style={{ left: fillLeft, right: `calc(100% - ${fillRight})` }}
        />
        {range ? (
          <>
            <input
              type="range"
              aria-label="Mínimo"
              name={name ? `${name}[min]` : undefined}
              min={min}
              max={max}
              step={step}
              value={low}
              disabled={disabled}
              onChange={(e) => setCurrent([Math.min(Number(e.target.value), high), high])}
              className={cn(thumbClasses, rangeThumbClasses)}
            />
            <input
              type="range"
              aria-label="Máximo"
              name={name ? `${name}[max]` : undefined}
              min={min}
              max={max}
              step={step}
              value={high}
              disabled={disabled}
              onChange={(e) => setCurrent([low, Math.max(Number(e.target.value), low)])}
              className={cn(thumbClasses, rangeThumbClasses)}
            />
          </>
        ) : (
          <input
            id={id}
            type="range"
            name={name}
            min={min}
            max={max}
            step={step}
            value={current}
            disabled={disabled}
            onChange={(e) => setCurrent(Number(e.target.value))}
            className={thumbClasses}
          />
        )}
      </div>
    </div>
  );
}
