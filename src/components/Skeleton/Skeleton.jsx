import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Bloque de carga que ocupa el lugar del contenido mientras llega.
 * Es decorativo: anuncia la carga con `aria-busy` en el contenedor real.
 *
 * @param {object} props
 * @param {'rectangle' | 'circle'} [props.shape='rectangle']
 * @param {string | number} [props.width='100%'] Ancho (CSS).
 * @param {string | number} [props.height='1rem'] Alto (CSS).
 * @param {string | number} [props.size] Ancho y alto a la vez (útil con `circle`).
 * @param {'pulse' | 'none'} [props.animation='pulse']
 * @param {string} [props.className]
 */
export const Skeleton = forwardRef(function Skeleton(
  { shape = 'rectangle', width = '100%', height = '1rem', size, animation = 'pulse', className, style, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        'bg-border/60',
        shape === 'circle' ? 'rounded-full' : 'rounded-md',
        animation === 'pulse' && 'animate-pulse',
        className,
      )}
      style={{ width: size ?? width, height: size ?? height, ...style }}
      {...props}
    />
  );
});
