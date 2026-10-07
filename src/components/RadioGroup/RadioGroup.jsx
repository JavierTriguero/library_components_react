import { Description, Field, Label, Radio, RadioGroup as HeadlessRadioGroup } from '@headlessui/react';
import { cn } from '../../utils/cn.js';

/**
 * @typedef {object} RadioOption
 * @property {string | number} value
 * @property {React.ReactNode} label
 * @property {React.ReactNode} [description]
 * @property {boolean} [disabled]
 */

/**
 * Grupo de botones de opción: se elige una sola opción. Se navega con las flechas.
 *
 * @param {object} props
 * @param {RadioOption[]} props.options
 * @param {string | number} [props.value] Valor controlado.
 * @param {string | number} [props.defaultValue] Valor inicial (no controlado).
 * @param {(value: string | number) => void} [props.onChange]
 * @param {React.ReactNode} [props.label] Título del grupo.
 * @param {React.ReactNode} [props.error] Mensaje de error.
 * @param {'vertical' | 'horizontal'} [props.orientation='vertical']
 * @param {string} [props.name] Nombre para envío en formularios.
 * @param {boolean} [props.disabled]
 * @param {string} [props.className]
 */
export function RadioGroup({
  options,
  value,
  defaultValue,
  onChange,
  label,
  error,
  orientation = 'vertical',
  name,
  disabled,
  className,
}) {
  // Headless UI enlaza el nombre y la descripción del grupo a partir de los
  // <Label> y <Description> que son hijos directos del RadioGroup.
  return (
    <HeadlessRadioGroup
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      name={name}
      disabled={disabled}
      className={cn('flex flex-col gap-2', className)}
    >
      {label && (
        <Label as="span" className={cn('text-sm font-medium text-foreground', disabled && 'opacity-50')}>
          {label}
        </Label>
      )}
      <div className={cn('flex gap-3', orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap gap-x-6')}>
        {options.map((option) => (
          <Field key={option.value} disabled={option.disabled} className="flex items-start gap-3">
            <Radio
              value={option.value}
              className={cn(
                'group mt-0.5 flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full bg-background ring-1 ring-border ring-inset',
                'data-checked:bg-primary data-checked:ring-primary',
                'data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-ring',
                'data-disabled:cursor-not-allowed data-disabled:opacity-50',
                error && 'ring-danger',
              )}
            >
              <span className="invisible size-1.5 rounded-full bg-primary-foreground group-data-checked:visible" />
            </Radio>
            <div className="flex flex-col gap-0.5 text-sm">
              <Label className="cursor-pointer font-medium text-foreground data-disabled:cursor-not-allowed data-disabled:opacity-50">
                {option.label}
              </Label>
              {option.description && <Description className="text-muted-foreground">{option.description}</Description>}
            </div>
          </Field>
        ))}
      </div>
      {error && <Description className="text-sm text-danger">{error}</Description>}
    </HeadlessRadioGroup>
  );
}
