import { forwardRef } from 'react';
import { Description, Field, Input as HeadlessInput, Label } from '@headlessui/react';
import { cn } from '../../utils/cn.js';

/**
 * Campo de texto con etiqueta, ayuda y mensaje de error.
 * El resto de props (type, value, onChange, placeholder...) se pasan al `<input>`.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.label] Etiqueta visible.
 * @param {React.ReactNode} [props.description] Texto de ayuda bajo el campo.
 * @param {React.ReactNode} [props.error] Mensaje de error; marca el campo como inválido.
 * @param {boolean} [props.disabled]
 * @param {string} [props.className] Clases adicionales para el contenedor.
 */
export const Input = forwardRef(function Input(
  { label, description, error, disabled, className, ...props },
  ref,
) {
  return (
    <Field disabled={disabled} className={cn('flex flex-col gap-1.5', className)}>
      {label && <Label className="text-sm font-medium text-foreground data-disabled:opacity-50">{label}</Label>}
      <HeadlessInput
        ref={ref}
        invalid={Boolean(error)}
        className={cn(
          'block w-full rounded-md bg-background px-3 py-2 text-sm text-foreground shadow-sm',
          'ring-1 ring-inset ring-border placeholder:text-muted-foreground',
          'data-focus:outline-none data-focus:ring-2 data-focus:ring-ring',
          'data-invalid:ring-danger data-invalid:data-focus:ring-danger',
          'data-disabled:cursor-not-allowed data-disabled:opacity-50',
        )}
        {...props}
      />
      {description && !error && (
        <Description className="text-sm text-muted-foreground">{description}</Description>
      )}
      {error && <Description className="text-sm text-danger">{error}</Description>}
    </Field>
  );
});
