import { forwardRef } from 'react';
import { Description, Field, Label, Switch as HeadlessSwitch } from '@headlessui/react';
import { cn } from '../../utils/cn.js';

/**
 * Interruptor de encendido/apagado para opciones que se aplican al instante.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.label] Etiqueta visible.
 * @param {React.ReactNode} [props.description] Texto de ayuda.
 * @param {boolean} [props.checked] Estado controlado.
 * @param {boolean} [props.defaultChecked] Estado inicial (no controlado).
 * @param {(checked: boolean) => void} [props.onChange]
 * @param {string} [props.name] Nombre para envío en formularios.
 * @param {boolean} [props.disabled]
 * @param {string} [props.className] Clases adicionales para el contenedor.
 */
export const Switch = forwardRef(function Switch({ label, description, disabled, className, ...props }, ref) {
  return (
    <Field disabled={disabled} className={cn('flex items-center gap-3', className)}>
      <HeadlessSwitch
        ref={ref}
        className={cn(
          'group relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-border transition-colors',
          'data-checked:bg-primary',
          'data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-ring',
          'data-disabled:cursor-not-allowed data-disabled:opacity-50',
        )}
        {...props}
      >
        <span className="size-5 translate-x-0.5 rounded-full bg-white shadow transition-transform group-data-checked:translate-x-5.5" />
      </HeadlessSwitch>
      {(label || description) && (
        <div className="flex flex-col gap-0.5 text-sm">
          {label && <Label className="font-medium text-foreground data-disabled:opacity-50">{label}</Label>}
          {description && <Description className="text-muted-foreground">{description}</Description>}
        </div>
      )}
    </Field>
  );
});
