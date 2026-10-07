// Clases por severidad. Escritas completas para que Tailwind las detecte.

/** Fondo sólido con texto de contraste (Badge, Tag). */
export const solidSeverity = {
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-muted text-muted-foreground',
  success: 'bg-success text-success-foreground',
  info: 'bg-info text-info-foreground',
  warning: 'bg-warning text-warning-foreground',
  danger: 'bg-danger text-danger-foreground',
};

/** Fondo suave con texto del color (Message). */
export const softSeverity = {
  primary: 'bg-primary/10 text-primary ring-primary/30',
  secondary: 'bg-muted text-foreground ring-border',
  success: 'bg-success/10 text-success ring-success/30',
  info: 'bg-info/10 text-info ring-info/30',
  warning: 'bg-warning/15 text-foreground ring-warning/50',
  danger: 'bg-danger/10 text-danger ring-danger/30',
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
