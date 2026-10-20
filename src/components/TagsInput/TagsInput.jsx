import { useId, useRef, useState } from 'react';
import { cn } from '../../utils/cn.js';
import { useControllableState } from '../../utils/useControllableState.js';
import { Chip } from '../Chip/Chip.jsx';

/**
 * Campo donde lo que se escribe se convierte en etiquetas (emails, palabras clave...).
 * Enter o coma añaden la etiqueta; Retroceso con el campo vacío borra la última;
 * al pegar texto separado por comas se añaden todas.
 *
 * @param {object} props
 * @param {string[]} [props.value] Etiquetas (controlado).
 * @param {string[]} [props.defaultValue=[]] Etiquetas iniciales (no controlado).
 * @param {(tags: string[]) => void} [props.onChange]
 * @param {React.ReactNode} [props.label] Etiqueta visible.
 * @param {React.ReactNode} [props.description] Texto de ayuda.
 * @param {React.ReactNode} [props.error] Mensaje de error; marca el campo como inválido.
 * @param {string} [props.placeholder]
 * @param {string[]} [props.separators] Teclas que añaden la etiqueta (por defecto Enter y coma).
 * @param {number} [props.max] Número máximo de etiquetas.
 * @param {boolean} [props.allowDuplicates=false] Permite repetir etiquetas (sin distinguir mayúsculas).
 * @param {(tag: string) => boolean} [props.validate] Devuelve `false` para rechazar una etiqueta.
 * @param {boolean} [props.addOnBlur=true] Añade el texto pendiente al salir del campo.
 * @param {string} [props.name] Nombre para envío en formularios (un campo oculto por etiqueta).
 * @param {boolean} [props.disabled]
 * @param {string} [props.className] Clases adicionales para el contenedor.
 */
export function TagsInput({
  value,
  defaultValue = [],
  onChange,
  label,
  description,
  error,
  placeholder,
  separators = ['Enter', ','],
  max,
  allowDuplicates = false,
  validate,
  addOnBlur = true,
  name,
  disabled,
  className,
}) {
  const [tags, setTags] = useControllableState(value, defaultValue, onChange);
  const [text, setText] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const inputRef = useRef(null);
  const id = useId();
  const describedBy = [description && !error && `${id}-description`, error && `${id}-error`].filter(Boolean).join(' ');
  const full = max !== undefined && tags.length >= max;
  // Caracteres separadores (Enter es una tecla, no un carácter que aparezca al pegar).
  const separatorChars = separators.filter((s) => s.length === 1);

  /** Añade las etiquetas válidas y devuelve el texto que no se pudo añadir. */
  const addTags = (candidates) => {
    const next = [...tags];
    const rejected = [];
    for (const raw of candidates) {
      const tag = raw.trim();
      if (!tag) continue;
      const duplicate = !allowDuplicates && next.some((t) => t.toLowerCase() === tag.toLowerCase());
      const tooMany = max !== undefined && next.length >= max;
      if (duplicate || tooMany || (validate && !validate(tag))) rejected.push(tag);
      else next.push(tag);
    }
    if (next.length !== tags.length) {
      setTags(next);
      setAnnouncement(`Añadida: ${next.slice(tags.length).join(', ')}`);
    }
    return rejected.join(', ');
  };

  const removeTag = (index) => {
    const removed = tags[index];
    setTags(tags.filter((_, i) => i !== index));
    setAnnouncement(`Eliminada: ${removed}`);
    inputRef.current?.focus();
  };

  const splitBySeparators = (input) =>
    separatorChars.length ? input.split(new RegExp(`[${separatorChars.map((c) => `\\${c}`).join('')}\\n]`)) : [input];

  const onKeyDown = (event) => {
    if (separators.includes(event.key) && text.trim()) {
      event.preventDefault();
      setText(addTags([text]));
    } else if (event.key === 'Backspace' && !text && tags.length) {
      removeTag(tags.length - 1);
    }
  };

  const onPaste = (event) => {
    const pasted = event.clipboardData.getData('text');
    const parts = splitBySeparators(pasted);
    if (parts.length > 1) {
      event.preventDefault();
      setText(addTags(parts));
    }
  };

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={id} className={cn('text-sm font-medium text-foreground', disabled && 'opacity-50')}>
          {label}
        </label>
      )}
      <div
        onPointerDown={(event) => {
          // Pulsar en el hueco del contenedor lleva el foco al campo.
          if (event.target === event.currentTarget) {
            event.preventDefault();
            inputRef.current?.focus();
          }
        }}
        className={cn(
          'flex min-h-10 w-full cursor-text flex-wrap items-center gap-1.5 rounded-md bg-background px-2 py-1.5 shadow-sm ring-1 ring-border ring-inset',
          'focus-within:ring-2 focus-within:ring-ring',
          error && 'ring-danger focus-within:ring-danger',
          disabled && 'cursor-not-allowed opacity-50',
        )}
      >
        {tags.map((tag, index) => (
          <Chip
            key={`${tag}-${index}`}
            label={tag}
            removable={!disabled}
            removeLabel={`Eliminar ${tag}`}
            onRemove={() => removeTag(index)}
            className="h-7"
          />
        ))}
        <input
          ref={inputRef}
          id={id}
          type="text"
          value={text}
          disabled={disabled || full}
          placeholder={tags.length ? undefined : placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          onBlur={() => addOnBlur && text.trim() && setText(addTags([text]))}
          className="min-w-24 flex-1 bg-transparent px-1 py-0.5 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        />
      </div>
      {description && !error && (
        <p id={`${id}-description`} className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-danger">
          {error}
        </p>
      )}
      <span aria-live="polite" className="sr-only">
        {announcement}
      </span>
      {name && tags.map((tag, index) => <input key={`${tag}-${index}`} type="hidden" name={name} value={tag} />)}
    </div>
  );
}
