import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import { InboxIcon } from '../../utils/icons.jsx';

/**
 * Estado vacío: explica por qué no hay contenido y qué hacer a continuación
 * (sin resultados, primera vez, error al cargar...).
 *
 * @param {object} props
 * @param {React.ReactNode} props.title Título breve.
 * @param {React.ReactNode} [props.description] Explicación o siguiente paso.
 * @param {React.ReactNode} [props.icon] Icono propio (por defecto, una bandeja vacía).
 * @param {React.ReactNode} [props.image] Ilustración en lugar del icono.
 * @param {React.ReactNode} [props.actions] Botones de acción.
 * @param {'h2' | 'h3' | 'h4'} [props.titleAs='h3'] Nivel de encabezado del título.
 * @param {boolean} [props.bordered=false] Borde discontinuo alrededor.
 * @param {string} [props.className]
 */
export const EmptyState = forwardRef(function EmptyState(
  { title, description, icon, image, actions, titleAs: Title = 'h3', bordered = false, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center justify-center px-6 py-12 text-center',
        bordered && 'rounded-lg border-2 border-dashed border-border',
        className,
      )}
      {...props}
    >
      {image ?? (
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:size-6">
          {icon ?? <InboxIcon />}
        </div>
      )}
      <Title className="text-base font-semibold text-foreground">{title}</Title>
      {description && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {actions && <div className="mt-6 flex flex-wrap justify-center gap-3">{actions}</div>}
    </div>
  );
});
