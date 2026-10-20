import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react';

export const DEFAULT_THEME_STORAGE_KEY = 'trigreact-theme';
const CHANGE_EVENT = 'trigreact-theme-change';

/** @typedef {'light' | 'dark' | 'system'} Theme */

const normalize = (value) => (value === 'light' || value === 'dark' ? value : 'system');

function readStoredTheme(storageKey) {
  try {
    return normalize(window.localStorage.getItem(storageKey));
  } catch {
    return 'system';
  }
}

/**
 * Aplica el tema al documento: `data-theme="light" | "dark"` en <html>,
 * o quita el atributo para seguir la preferencia del sistema.
 * @param {Theme} theme
 */
export function applyTheme(theme, root = document.documentElement) {
  if (theme === 'light' || theme === 'dark') root.setAttribute('data-theme', theme);
  else root.removeAttribute('data-theme');
}

function subscribeToTheme(callback) {
  // `storage` sincroniza otras pestañas; el evento propio, otros componentes de esta pestaña.
  window.addEventListener('storage', callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function subscribeToSystem(callback) {
  const query = window.matchMedia?.('(prefers-color-scheme: dark)');
  query?.addEventListener('change', callback);
  return () => query?.removeEventListener('change', callback);
}

const getSystemTheme = () => (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

/**
 * Tema elegido por el usuario, guardado en localStorage y sincronizado entre pestañas.
 *
 * @param {{ storageKey?: string }} [options]
 * @returns {{ theme: Theme, resolvedTheme: 'light' | 'dark', setTheme: (theme: Theme) => void }}
 *   `theme` es la elección («system» si sigue al sistema); `resolvedTheme`, el que se ve.
 */
export function useTheme({ storageKey = DEFAULT_THEME_STORAGE_KEY } = {}) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    () => readStoredTheme(storageKey),
    () => 'system',
  );
  const systemTheme = useSyncExternalStore(subscribeToSystem, getSystemTheme, () => 'light');

  // Aplica el tema guardado aunque la página no use getThemeScript(). Al montar sin elección
  // guardada no toca el documento, para respetar un data-theme que haya puesto la propia app;
  // después aplica cada cambio (también los que llegan desde otra pestaña).
  const appliedTheme = useRef(null);
  useEffect(() => {
    if (appliedTheme.current === null && theme === 'system') {
      appliedTheme.current = theme;
      return;
    }
    if (appliedTheme.current !== theme) {
      applyTheme(theme);
      appliedTheme.current = theme;
    }
  }, [theme]);

  const setTheme = useCallback(
    (next) => {
      const value = normalize(next);
      try {
        if (value === 'system') window.localStorage.removeItem(storageKey);
        else window.localStorage.setItem(storageKey, value);
      } catch {
        // Sin acceso a localStorage (modo privado, etc.): se aplica igualmente en esta página.
      }
      applyTheme(value);
      window.dispatchEvent(new Event(CHANGE_EVENT));
    },
    [storageKey],
  );

  return { theme, resolvedTheme: theme === 'system' ? systemTheme : theme, setTheme };
}

/**
 * Script para el <head> que aplica el tema guardado antes de pintar la página
 * (evita el parpadeo del tema claro al cargar). Ejemplo en Next.js:
 * `<script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />`
 */
export function getThemeScript(storageKey = DEFAULT_THEME_STORAGE_KEY) {
  return `(function(){try{var t=localStorage.getItem(${JSON.stringify(storageKey)});if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`;
}
