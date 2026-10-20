import { useEffect, useId, useRef, useState } from 'react';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { cn } from '../../utils/cn.js';
import { MagnifyingGlassIcon } from '../../utils/icons.jsx';
import { useControllableState } from '../../utils/useControllableState.js';

/**
 * @typedef {object} CommandItem
 * @property {string} id Identificador único.
 * @property {string} label Texto visible.
 * @property {React.ReactNode} [icon]
 * @property {string[]} [shortcut] Atajo que se muestra, p. ej. `['⌘', 'N']`.
 * @property {string[]} [keywords] Términos extra para la búsqueda.
 * @property {() => void} [onSelect] Se ejecuta al elegir el comando.
 * @property {boolean} [disabled]
 */

/**
 * @typedef {object} CommandGroup
 * @property {string} heading Título del grupo.
 * @property {CommandItem[]} items
 */

const normalize = (text) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/** Filtro por defecto: todas las palabras buscadas aparecen en la etiqueta o en las palabras clave. */
export function defaultCommandFilter(item, query) {
  const haystack = normalize([item.label, ...(item.keywords ?? [])].join(' '));
  return normalize(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

/**
 * Buscador de comandos y navegación con el teclado (⌘K / Ctrl+K).
 * Se abre con el atajo, se filtra escribiendo, se recorre con las flechas y se ejecuta con Enter.
 *
 * @param {object} props
 * @param {CommandGroup[]} props.groups Comandos agrupados.
 * @param {boolean} [props.open] Estado abierto controlado.
 * @param {boolean} [props.defaultOpen=false] Estado abierto inicial.
 * @param {(open: boolean) => void} [props.onOpenChange]
 * @param {string | false} [props.hotkey='k'] Tecla que, con ⌘ o Ctrl, abre y cierra la paleta; `false` la desactiva.
 * @param {string} [props.placeholder='Busca un comando…']
 * @param {React.ReactNode} [props.emptyMessage='No hay resultados.']
 * @param {string} [props.label='Paleta de comandos'] Nombre accesible del diálogo y del buscador.
 * @param {(item: CommandItem, query: string) => boolean} [props.filter] Filtro propio.
 */
export function CommandPalette({
  groups,
  open,
  defaultOpen = false,
  onOpenChange,
  hotkey = 'k',
  placeholder = 'Busca un comando…',
  emptyMessage = 'No hay resultados.',
  label = 'Paleta de comandos',
  filter = defaultCommandFilter,
}) {
  const [isOpen, setOpen] = useControllableState(open, defaultOpen, onOpenChange);
  const [query, setQuery] = useState('');
  const idPrefix = useId();

  // El atajo global necesita el estado actual sin volver a registrar el listener.
  const latest = useRef({ isOpen, setOpen });
  useEffect(() => {
    latest.current = { isOpen, setOpen };
  });

  useEffect(() => {
    if (!hotkey) return undefined;
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === hotkey.toLowerCase()) {
        event.preventDefault();
        latest.current.setOpen(!latest.current.isOpen);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [hotkey]);

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  const visibleGroups = groups
    .map((group) => ({ ...group, items: query ? group.items.filter((item) => filter(item, query)) : group.items }))
    .filter((group) => group.items.length > 0);

  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 transition-opacity duration-150 ease-out data-closed:opacity-0"
      />
      <div className="fixed inset-0 flex items-start justify-center p-4 pt-[15vh]">
        <DialogPanel
          transition
          className={cn(
            'w-full max-w-xl overflow-hidden rounded-xl bg-background text-foreground shadow-2xl ring-1 ring-border',
            'transition duration-150 ease-out data-closed:scale-95 data-closed:opacity-0',
          )}
        >
          <DialogTitle className="sr-only">{label}</DialogTitle>
          <Combobox
            value={null}
            onChange={(item) => {
              if (!item) return;
              close();
              item.onSelect?.();
            }}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <MagnifyingGlassIcon className="text-muted-foreground" />
              <ComboboxInput
                // Headless UI enfoca este campo al abrir el diálogo.
                data-autofocus
                aria-label={label}
                placeholder={placeholder}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            {visibleGroups.length > 0 && (
              <ComboboxOptions static className="max-h-80 scroll-py-2 overflow-y-auto p-2 focus:outline-none">
                {visibleGroups.map((group, groupIndex) => {
                  const headingId = `${idPrefix}-group-${groupIndex}`;
                  return (
                    <div key={group.heading} role="group" aria-labelledby={headingId} className="not-first:mt-2">
                      <div id={headingId} className="px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                        {group.heading}
                      </div>
                      {group.items.map((item) => (
                        <ComboboxOption
                          key={item.id}
                          value={item}
                          disabled={item.disabled}
                          className={cn(
                            'flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm select-none',
                            'data-focus:bg-muted data-disabled:cursor-not-allowed data-disabled:opacity-50',
                            '[&>svg]:size-4 [&>svg]:text-muted-foreground',
                          )}
                        >
                          {item.icon}
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.shortcut && (
                            <span className="flex gap-1">
                              {item.shortcut.map((key) => (
                                <kbd
                                  key={key}
                                  className="min-w-5 rounded border border-border bg-muted px-1.5 text-center font-sans text-xs text-foreground"
                                >
                                  {key}
                                </kbd>
                              ))}
                            </span>
                          )}
                        </ComboboxOption>
                      ))}
                    </div>
                  );
                })}
              </ComboboxOptions>
            )}
            {visibleGroups.length === 0 && (
              <p role="status" className="px-6 py-10 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </p>
            )}
          </Combobox>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
