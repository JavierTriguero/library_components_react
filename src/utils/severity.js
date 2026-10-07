// Clases por severidad. Escritas completas para que Tailwind las detecte.

/** Fondo sólido con texto de contraste (Badge, Tag). */
export const solidSeverity = {
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-muted text-foreground',
  success: 'bg-success text-success-foreground',
  info: 'bg-info text-info-foreground',
  warning: 'bg-warning text-warning-foreground',
  danger: 'bg-danger text-danger-foreground',
};

/**
 * Fondo suave con borde del color (Message). El texto usa el color normal:
 * el color de la severidad sobre su propio fondo suave no alcanza el contraste mínimo.
 */
export const softSeverity = {
  primary: 'bg-primary/10 text-foreground ring-primary/30',
  secondary: 'bg-muted text-foreground ring-border',
  success: 'bg-success/10 text-foreground ring-success/30',
  info: 'bg-info/10 text-foreground ring-info/30',
  warning: 'bg-warning/15 text-foreground ring-warning/50',
  danger: 'bg-danger/10 text-foreground ring-danger/30',
};

/** Color del icono que acompaña a un mensaje suave. */
export const iconSeverity = {
  primary: 'text-primary',
  secondary: 'text-muted-foreground',
  success: 'text-success',
  info: 'text-info',
  warning: 'text-warning',
  danger: 'text-danger',
};

/** Color de relleno (MeterGroup, ProgressBar). */
export const fillSeverity = {
  primary: 'bg-primary',
  secondary: 'bg-muted-foreground',
  success: 'bg-success',
  info: 'bg-info',
  warning: 'bg-warning',
  danger: 'bg-danger',
};

/** @typedef {'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger'} Severity */
