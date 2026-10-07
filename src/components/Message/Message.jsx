import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '../../utils/icons.jsx';
import { softSeverity } from '../../utils/severity.js';

const defaultIcons = {
  primary: InformationCircleIcon,
  secondary: InformationCircleIcon,
  info: InformationCircleIcon,
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  danger: XCircleIcon,
};

/**
 * Mensaje en línea para informar, confirmar o avisar de un error.
 * Los mensajes `danger` y `warning` se anuncian inmediatamente (role="alert").
 *
 * @param {object} props
 * @param {import('../../utils/severity.js').Severity} [props.severity='info']
 * @param {React.ReactNode} [props.title] Título en negrita.
 * @param {React.ReactNode} [props.text] Texto (también se acepta `children`).
 * @param {React.ReactNode | false} [props.icon] Icono propio, o `false` para ocultarlo.
 * @param {() => void} [props.onClose] Si se indica, muestra un botón para cerrar.
 * @param {string} [props.className]
 */
export const Message = forwardRef(function Message(
  { severity = 'info', title, text, icon, onClose, className, children, ...props },
  ref,
) {
  const DefaultIcon = defaultIcons[severity];
  const urgent = severity === 'danger' || severity === 'warning';

  return (
    <div
      ref={ref}
      role={urgent ? 'alert' : 'status'}
      className={cn(
        'flex items-start gap-3 rounded-md p-3 text-sm ring-1 ring-inset',
        softSeverity[severity],
        className,
      )}
      {...props}
    >
      {icon !== false && <span className="flex [&_svg]:size-5">{icon ?? <DefaultIcon />}</span>}
      <div className="flex-1">
        {title && <p className="font-semibold">{title}</p>}
        {(text ?? children) && <div className={cn(title && 'mt-1')}>{text ?? children}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="-m-1 flex rounded p-1 opacity-70 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-ring"
        >
          <XMarkIcon className="size-4" />
        </button>
      )}
    </div>
  );
});
