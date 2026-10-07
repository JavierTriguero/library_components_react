import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

const lineTypes = { solid: 'border-solid', dashed: 'border-dashed', dotted: 'border-dotted' };

const aligns = {
  left: 'before:w-4 before:flex-none',
  center: '',
  right: 'after:w-4 after:flex-none',
};

/**
 * Línea separadora, horizontal o vertical, con texto opcional.
 *
 * @param {object} props
 * @param {'horizontal' | 'vertical'} [props.orientation='horizontal']
 * @param {'solid' | 'dashed' | 'dotted'} [props.type='solid']
 * @param {'left' | 'center' | 'right'} [props.align='center'] Posición del texto (solo horizontal).
 * @param {React.ReactNode} [props.children] Texto en mitad de la línea.
 * @param {string} [props.className]
 */
export const Divider = forwardRef(function Divider(
  { orientation = 'horizontal', type = 'solid', align = 'center', children, className, ...props },
  ref,
) {
  if (orientation === 'vertical') {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="vertical"
        className={cn('mx-2 self-stretch border-l border-border', lineTypes[type], className)}
        {...props}
      />
    );
  }

  if (!children) {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn('my-4 w-full border-t border-border', lineTypes[type], className)}
        {...props}
      />
    );
  }

  return (
    <div
      ref={ref}
      role="separator"
      className={cn(
        'my-4 flex w-full items-center gap-3 text-sm text-muted-foreground',
        'before:flex-1 before:border-t before:border-border after:flex-1 after:border-t after:border-border',
        type === 'dashed' && 'before:border-dashed after:border-dashed',
        type === 'dotted' && 'before:border-dotted after:border-dotted',
        aligns[align],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
