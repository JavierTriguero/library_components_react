import { Radio, RadioGroup } from '@headlessui/react';
import { cn } from '../../utils/cn.js';
import { ComputerDesktopIcon, MoonIcon, SunIcon } from '../../utils/icons.jsx';
import { DEFAULT_THEME_STORAGE_KEY, useTheme } from '../../theme/useTheme.js';

const defaultLabels = { light: 'Claro', dark: 'Oscuro', system: 'Sistema' };
const icons = { light: SunIcon, dark: MoonIcon, system: ComputerDesktopIcon };

/**
 * Selector de tema claro, oscuro o del sistema. Guarda la elección en localStorage
 * y la aplica con `data-theme` en <html>. Para evitar el parpadeo al cargar, añade
 * `getThemeScript()` en el <head>.
 *
 * @param {object} props
 * @param {string} [props.storageKey='trigreact-theme'] Clave de localStorage.
 * @param {(theme: 'light' | 'dark' | 'system') => void} [props.onChange] Se llama al cambiar el tema.
 * @param {{ light?: string, dark?: string, system?: string }} [props.labels] Textos accesibles de cada opción.
 * @param {string} [props['aria-label']='Tema'] Nombre accesible del grupo.
 * @param {string} [props.className]
 */
export function ThemeToggle({
  storageKey = DEFAULT_THEME_STORAGE_KEY,
  onChange,
  labels,
  'aria-label': ariaLabel = 'Tema',
  className,
}) {
  const { theme, setTheme } = useTheme({ storageKey });
  const text = { ...defaultLabels, ...labels };

  return (
    <RadioGroup
      value={theme}
      onChange={(next) => {
        setTheme(next);
        onChange?.(next);
      }}
      aria-label={ariaLabel}
      className={cn('inline-flex gap-0.5 rounded-full bg-muted p-1 ring-1 ring-border', className)}
    >
      {['light', 'dark', 'system'].map((option) => {
        const OptionIcon = icons[option];
        return (
          <Radio
            key={option}
            value={option}
            aria-label={text[option]}
            title={text[option]}
            className={cn(
              'flex size-8 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors',
              'hover:text-foreground data-checked:bg-background data-checked:text-foreground data-checked:shadow-sm',
              'data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-ring',
            )}
          >
            <OptionIcon className="size-4" />
          </Radio>
        );
      })}
    </RadioGroup>
  );
}
