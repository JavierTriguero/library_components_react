import {
  Description,
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { cn } from '../../utils/cn.js';

/**
 * @typedef {object} SelectOption
 * @property {string | number} value
 * @property {React.ReactNode} label
 * @property {boolean} [disabled]
 */

/**
 * Selector desplegable con navegación por teclado.
 *
 * @param {object} props
 * @param {SelectOption[]} props.options Opciones disponibles.
 * @param {string | number} [props.value] Valor controlado.
 * @param {string | number} [props.defaultValue] Valor inicial (no controlado).
 * @param {(value: string | number) => void} [props.onChange] Recibe el valor elegido.
 * @param {React.ReactNode} [props.label] Etiqueta visible.
 * @param {React.ReactNode} [props.description] Texto de ayuda bajo el campo.
 * @param {React.ReactNode} [props.error] Mensaje de error; marca el campo como inválido.
 * @param {React.ReactNode} [props.placeholder='Selecciona una opción'] Texto sin selección.
 * @param {string} [props.name] Nombre para envío en formularios.
 * @param {boolean} [props.disabled]
 * @param {string} [props.className] Clases adicionales para el contenedor.
 */
export function Select({
  options,
  value,
  defaultValue,
  onChange,
  label,
  description,
  error,
  placeholder = 'Selecciona una opción',
  name,
  disabled,
  className,
}) {
  return (
    <Field disabled={disabled} className={cn('flex flex-col gap-1.5', className)}>
      {label && <Label className="text-sm font-medium text-foreground data-disabled:opacity-50">{label}</Label>}
      <Listbox
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        name={name}
        invalid={Boolean(error)}
      >
        {({ value: selected }) => {
          const selectedOption = options.find((option) => option.value === selected);
          return (
            <>
              <ListboxButton
                className={cn(
                  'relative flex w-full cursor-pointer items-center justify-between gap-2 rounded-md bg-background py-2 pr-2 pl-3 text-left text-sm shadow-sm',
                  'ring-1 ring-inset ring-border',
                  'data-focus:outline-none data-focus:ring-2 data-focus:ring-ring',
                  'data-invalid:ring-danger',
                  'data-disabled:cursor-not-allowed data-disabled:opacity-50',
                )}
              >
                <span className={cn('truncate', selectedOption ? 'text-foreground' : 'text-muted-foreground')}>
                  {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronIcon />
              </ListboxButton>
              <ListboxOptions
                anchor="bottom start"
                transition
                className={cn(
                  'z-50 w-(--button-width) rounded-md bg-background p-1 text-sm shadow-lg ring-1 ring-border [--anchor-gap:4px] focus:outline-none',
                  'transition duration-100 ease-in data-closed:opacity-0',
                )}
              >
                {options.map((option) => (
                  <ListboxOption
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={cn(
                      'group flex cursor-pointer items-center justify-between gap-2 rounded px-2 py-1.5 text-foreground select-none',
                      'data-focus:bg-muted data-selected:font-semibold',
                      'data-disabled:cursor-not-allowed data-disabled:opacity-50',
                    )}
                  >
                    {option.label}
                    <CheckIcon />
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </>
          );
        }}
      </Listbox>
      {description && !error && (
        <Description className="text-sm text-muted-foreground">{description}</Description>
      )}
      {error && <Description className="text-sm text-danger">{error}</Description>}
    </Field>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-4 shrink-0 text-muted-foreground">
      <path
        fillRule="evenodd"
        d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className="invisible size-4 shrink-0 text-primary group-data-selected:visible"
    >
      <path
        fillRule="evenodd"
        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
