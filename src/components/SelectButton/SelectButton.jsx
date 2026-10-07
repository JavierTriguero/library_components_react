import { Radio, RadioGroup } from '@headlessui/react';
import { cn } from '../../utils/cn.js';
import { useControllableState } from '../../utils/useControllableState.js';

/**
 * @typedef {object} SelectButtonOption
 * @property {string | number} value
 * @property {React.ReactNode} label
 * @property {boolean} [disabled]
 */

const segment = cn(
  'relative -ml-px inline-flex cursor-pointer items-center justify-center gap-2 px-3.5 py-2 text-sm font-semibold ring-1 ring-border ring-inset first:ml-0 first:rounded-l-md last:rounded-r-md',
  'bg-background text-foreground hover:bg-muted',
  'focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
);
const segmentOn = 'z-[1] bg-primary text-primary-foreground ring-primary hover:bg-primary-hover';
const segmentDisabled = 'cursor-not-allowed opacity-50';

/**
 * Conjunto de botones donde se elige una opción (o varias con `multiple`).
 *
 * @param {object} props
 * @param {SelectButtonOption[]} props.options
 * @param {*} [props.value] Valor controlado (array si `multiple`).
 * @param {*} [props.defaultValue] Valor inicial.
 * @param {(value: *) => void} [props.onChange]
 * @param {boolean} [props.multiple=false] Permite seleccionar varias opciones.
 * @param {string} [props['aria-label']] Nombre accesible del grupo.
 * @param {boolean} [props.disabled]
 * @param {string} [props.className]
 */
export function SelectButton({ multiple = false, ...props }) {
  return multiple ? <MultipleSelectButton {...props} /> : <SingleSelectButton {...props} />;
}

function SingleSelectButton({ options, value, defaultValue, onChange, disabled, className, ...props }) {
  return (
    <RadioGroup
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      disabled={disabled}
      className={cn('inline-flex isolate', className)}
      {...props}
    >
      {options.map((option) => (
        <Radio
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          className={cn(
            segment,
            'data-checked:z-[1] data-checked:bg-primary data-checked:text-primary-foreground data-checked:ring-primary data-checked:hover:bg-primary-hover',
            'data-focus:z-10 data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-ring',
            'data-disabled:cursor-not-allowed data-disabled:opacity-50',
          )}
        >
          {option.label}
        </Radio>
      ))}
    </RadioGroup>
  );
}

function MultipleSelectButton({ options, value, defaultValue = [], onChange, disabled, className, ...props }) {
  const [selected, setSelected] = useControllableState(value, defaultValue, onChange);

  const toggle = (optionValue) =>
    setSelected(
      selected.includes(optionValue) ? selected.filter((v) => v !== optionValue) : [...selected, optionValue],
    );

  return (
    <div role="group" className={cn('inline-flex isolate', className)} {...props}>
      {options.map((option) => {
        const isOn = selected.includes(option.value);
        const isDisabled = disabled || option.disabled;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isOn}
            disabled={isDisabled}
            onClick={() => toggle(option.value)}
            className={cn(segment, isOn && segmentOn, isDisabled && segmentDisabled)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
