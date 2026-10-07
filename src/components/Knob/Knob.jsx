import { useRef } from 'react';
import { cn } from '../../utils/cn.js';
import { useControllableState } from '../../utils/useControllableState.js';

// El arco empieza abajo a la izquierda (135°) y recorre 270° en sentido horario.
const START = 135;
const SWEEP = 270;
const RADIUS = 40;

function point(angle) {
  const rad = (angle * Math.PI) / 180;
  return [50 + RADIUS * Math.cos(rad), 50 + RADIUS * Math.sin(rad)];
}

function arc(fromAngle, toAngle) {
  const [x1, y1] = point(fromAngle);
  const [x2, y2] = point(toAngle);
  const largeArc = toAngle - fromAngle > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${x2} ${y2}`;
}

/**
 * Control circular para elegir un valor numérico arrastrando o con el teclado
 * (flechas, Re Pág / Av Pág, Inicio / Fin).
 *
 * @param {object} props
 * @param {number} [props.value] Valor controlado.
 * @param {number} [props.defaultValue] Valor inicial (por defecto `min`).
 * @param {(value: number) => void} [props.onChange]
 * @param {number} [props.min=0]
 * @param {number} [props.max=100]
 * @param {number} [props.step=1]
 * @param {number} [props.size=100] Diámetro en píxeles.
 * @param {boolean} [props.showValue=true]
 * @param {(value: number) => string} [props.valueTemplate] Formato del valor mostrado.
 * @param {string} [props.label='Valor'] Nombre accesible.
 * @param {boolean} [props.readOnly=false]
 * @param {boolean} [props.disabled=false]
 * @param {string} [props.className]
 */
export function Knob({
  value,
  defaultValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  size = 100,
  showValue = true,
  valueTemplate = String,
  label = 'Valor',
  readOnly = false,
  disabled = false,
  className,
}) {
  const [current, setCurrent] = useControllableState(value, defaultValue ?? min, onChange);
  const svgRef = useRef(null);
  const interactive = !readOnly && !disabled;

  const update = (next) => {
    const snapped = Math.round((next - min) / step) * step + min;
    const clamped = Math.min(max, Math.max(min, Number(snapped.toFixed(10))));
    if (clamped !== current) setCurrent(clamped);
  };

  const updateFromPointer = (event) => {
    const rect = svgRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    let relative = ((Math.atan2(y, x) * 180) / Math.PI - START + 360) % 360;
    // Zona muerta inferior: se pega al extremo más cercano.
    if (relative > SWEEP) relative = relative > SWEEP + (360 - SWEEP) / 2 ? 0 : SWEEP;
    update(min + (relative / SWEEP) * (max - min));
  };

  const onKeyDown = (event) => {
    const big = step * 10;
    const actions = {
      ArrowRight: current + step,
      ArrowUp: current + step,
      ArrowLeft: current - step,
      ArrowDown: current - step,
      PageUp: current + big,
      PageDown: current - big,
      Home: min,
      End: max,
    };
    if (event.key in actions) {
      event.preventDefault();
      update(actions[event.key]);
    }
  };

  const ratio = (current - min) / (max - min);

  return (
    <div
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={current}
      aria-valuetext={valueTemplate(current)}
      aria-readonly={readOnly || undefined}
      aria-disabled={disabled || undefined}
      onKeyDown={interactive ? onKeyDown : undefined}
      className={cn(
        'inline-block rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        disabled && 'opacity-50',
        className,
      )}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        width={size}
        height={size}
        aria-hidden="true"
        className={cn('touch-none', interactive && 'cursor-pointer')}
        onPointerDown={
          interactive
            ? (e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                updateFromPointer(e);
              }
            : undefined
        }
        onPointerMove={
          interactive ? (e) => e.currentTarget.hasPointerCapture(e.pointerId) && updateFromPointer(e) : undefined
        }
      >
        <path
          d={arc(START, START + SWEEP)}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          className="stroke-muted"
        />
        {ratio > 0 && (
          <path
            d={arc(START, START + SWEEP * ratio)}
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            className="stroke-primary"
          />
        )}
        {showValue && (
          <text x="50" y="57" textAnchor="middle" className="fill-foreground text-xl font-semibold">
            {valueTemplate(current)}
          </text>
        )}
      </svg>
    </div>
  );
}
