import { forwardRef } from 'react';
import { Checkbox as HeadlessCheckbox, Description, Field, Label } from '@headlessui/react';
import { cn } from '../../utils/cn.js';

/**
 * Casilla de verificación con etiqueta.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.label] Etiqueta visible.
 * @param {React.ReactNode} [props.description] Texto de ayuda bajo la etiqueta.
 * @param {boolean} [props.checked] Estado controlado.
 * @param {boolean} [props.defaultChecked] Estado inicial (no controlado).
 * @param {(checked: boolean) => void} [props.onChange] Recibe el nuevo estado.
 * @param {string} [props.name] Nombre para envío en formularios.
 * @param {boolean} [props.disabled]
 * @param {string} [props.className] Clases adicionales para el contenedor.
 */
export const Checkbox = forwardRef(function Checkbox({ label, description, disabled, className, ...props }, ref) {
  return (
    <Field disabled={disabled} className={cn('flex items-start gap-3', className)}>
      <HeadlessCheckbox
        ref={ref}
        className={cn(
          'group mt-0.5 flex size-4 shrink-0 cursor-pointer items-center justify-center rounded',
          'bg-background ring-1 ring-inset ring-border',
          'data-checked:bg-primary data-checked:ring-primary',
          'data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-ring',
          'data-disabled:cursor-not-allowed data-disabled:opacity-50',
        )}
        {...props}
      >
        <svg
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
          className="hidden size-3 stroke-primary-foreground group-data-checked:block"
        >
          <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </HeadlessCheckbox>
      {(label || description) && (
        <div className="flex flex-col gap-0.5 text-sm">
          {label && <Label className="font-medium text-foreground data-disabled:opacity-50">{label}</Label>}
          {description && <Description className="text-muted-foreground">{description}</Description>}
        </div>
      )}
    </Field>
  );
});
