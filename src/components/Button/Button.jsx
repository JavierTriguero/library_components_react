import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

// Las clases se escriben completas (nunca concatenadas tipo `bg-${color}`)
// para que Tailwind pueda detectarlas al escanear el código.
const variants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
  secondary: 'bg-background text-foreground ring-1 ring-inset ring-border hover:bg-muted',
  danger: 'bg-danger text-danger-foreground hover:bg-danger-hover focus-visible:outline-danger',
};

const sizes = {
  sm: 'px-2.5 py-1.5 text-sm',
  md: 'px-3.5 py-2 text-sm',
  lg: 'px-4 py-2.5 text-base',
};

/**
 * Botón básico.
 *
 * @param {object} props
 * @param {'primary' | 'secondary' | 'danger'} [props.variant='primary'] Estilo visual.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] Tamaño.
 * @param {string} [props.className] Clases adicionales.
 */
export const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', type = 'button', className, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-semibold shadow-sm transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
});
