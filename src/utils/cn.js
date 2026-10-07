/** Une clases CSS ignorando los valores vacíos (false, null, undefined, ''). */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
