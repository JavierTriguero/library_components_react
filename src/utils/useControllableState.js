import { useCallback, useState } from 'react';

/**
 * Estado que funciona en modo controlado (`value` definido) o no controlado (`defaultValue`).
 * Devuelve `[valorActual, setValor]`; `setValor` actualiza el estado interno
 * si no está controlado y siempre notifica con `onChange`.
 */
export function useControllableState(value, defaultValue, onChange) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const setValue = useCallback(
    (next) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return [current, setValue];
}
