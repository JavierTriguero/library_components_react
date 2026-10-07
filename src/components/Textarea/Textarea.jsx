import { forwardRef, useCallback, useLayoutEffect, useRef } from 'react';
import { Description, Field, Label, Textarea as HeadlessTextarea } from '@headlessui/react';
import { cn } from '../../utils/cn.js';

/**
 * Campo de texto multilínea con etiqueta, ayuda y mensaje de error.
 * El resto de props (value, onChange, rows, placeholder...) se pasan al `<textarea>`.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.label] Etiqueta visible.
 * @param {React.ReactNode} [props.description] Texto de ayuda bajo el campo.
 * @param {React.ReactNode} [props.error] Mensaje de error; marca el campo como inválido.
 * @param {boolean} [props.autoResize=false] Crece en altura según el contenido.
 * @param {boolean} [props.disabled]
 * @param {string} [props.className] Clases adicionales para el contenedor.
 */
export const Textarea = forwardRef(function Textarea(
  { label, description, error, autoResize = false, disabled, className, rows = 3, onChange, value, ...props },
  ref,
) {
  const innerRef = useRef(null);

  const setRefs = useCallback(
    (node) => {
      innerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const resize = useCallback(() => {
    const el = innerRef.current;
    if (!autoResize || !el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [autoResize]);

  useLayoutEffect(resize, [resize, value]);

  return (
    <Field disabled={disabled} className={cn('flex flex-col gap-1.5', className)}>
      {label && <Label className="text-sm font-medium text-foreground data-disabled:opacity-50">{label}</Label>}
      <HeadlessTextarea
        ref={setRefs}
        rows={rows}
        value={value}
        invalid={Boolean(error)}
        onChange={(event) => {
          resize();
          onChange?.(event);
        }}
        className={cn(
          'block w-full rounded-md bg-background px-3 py-2 text-sm text-foreground shadow-sm',
          'ring-1 ring-border ring-inset placeholder:text-muted-foreground',
          'data-focus:ring-2 data-focus:ring-ring data-focus:outline-none',
          'data-invalid:ring-danger data-invalid:data-focus:ring-danger',
          'data-disabled:cursor-not-allowed data-disabled:opacity-50',
          autoResize ? 'resize-none overflow-hidden' : 'resize-y',
        )}
        {...props}
      />
      {description && !error && <Description className="text-sm text-muted-foreground">{description}</Description>}
      {error && <Description className="text-sm text-danger">{error}</Description>}
    </Field>
  );
});
