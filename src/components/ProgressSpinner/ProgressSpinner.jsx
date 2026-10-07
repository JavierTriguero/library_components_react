import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

const sizes = { sm: 'size-4', md: 'size-8', lg: 'size-12' };

/**
 * Indicador de carga circular.
 *
 * @param {object} props
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {string} [props.label='Cargando'] Texto que se anuncia a los lectores de pantalla.
 * @param {string} [props.className] Por ejemplo `text-danger` para cambiar el color.
 */
export const ProgressSpinner = forwardRef(function ProgressSpinner(
  { size = 'md', label = 'Cargando', className, ...props },
  ref,
) {
  return (
    <span ref={ref} role="status" className={cn('inline-flex text-primary', className)} {...props}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={cn('animate-spin', sizes[size])}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20" />
        <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
});
