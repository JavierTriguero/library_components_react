# TrigReact

Componentes React accesibles construidos con [Tailwind CSS v4](https://tailwindcss.com) y [Headless UI](https://headlessui.com).

- **Accesibles**: navegación por teclado, gestión del foco y atributos ARIA incluidos.
- **Personalizables**: colores definidos como variables CSS que puedes sobrescribir.
- **Modo oscuro** automático según la preferencia del sistema.
- **Compatibles con Next.js** (App Router) y cualquier proyecto React 18 o superior.

## Requisitos

- React 18 o superior
- Tailwind CSS 4 o superior configurado en tu proyecto

## Instalación

```bash
npm install trigreact
```

En el archivo CSS principal de tu proyecto, importa el tema y añade la librería como fuente de Tailwind:

```css
@import 'tailwindcss';
@import 'trigreact/theme.css';
@source '../node_modules/trigreact/dist';
```

> La ruta de `@source` es relativa a tu archivo CSS. Ajústala si tu CSS no está en una carpeta de primer nivel (por ejemplo, `src/`).

## Uso

```jsx
import { Button, Input, Modal } from 'trigreact';

export function App() {
  return (
    <form className="flex flex-col gap-4">
      <Input label="Email" type="email" description="Nunca lo compartiremos." />
      <Button type="submit">Enviar</Button>
    </form>
  );
}
```

## Componentes

Puedes verlos todos funcionando en Storybook (`npm run storybook`).

### Formulario

| Componente        | Props principales                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| `Input`           | `label`, `description`, `error`, `disabled` y cualquier prop de `<input>`                                          |
| `Textarea`        | `label`, `description`, `error`, `autoResize` y cualquier prop de `<textarea>`                                     |
| `Select`          | `options` (`{ value, label, disabled? }[]`), `value` / `defaultValue`, `onChange(value)`, `label`, `error`         |
| `Checkbox`        | `label`, `description`, `checked` / `defaultChecked`, `onChange(checked)`, `indeterminate`                         |
| `RadioGroup`      | `options`, `value` / `defaultValue`, `onChange(value)`, `label`, `error`, `orientation`                            |
| `Switch`          | `label`, `description`, `checked` / `defaultChecked`, `onChange(checked)`                                          |
| `SelectButton`    | `options`, `value` / `defaultValue`, `onChange(value)`, `multiple`                                                 |
| `ToggleButton`    | `checked` / `defaultChecked`, `onChange(checked)`, `onLabel`, `offLabel`, `onIcon`, `offIcon`                      |
| `Rating`          | `value` / `defaultValue`, `onChange(value)`, `stars`, `cancel`, `readOnly`                                         |
| `Slider`          | `value` / `defaultValue`, `onChange(value)`, `min`, `max`, `step`, `range`, `label`, `showValue`                   |
| `Knob`            | `value` / `defaultValue`, `onChange(value)`, `min`, `max`, `step`, `size`, `valueTemplate`                         |
| `TagsInput`       | `value` / `defaultValue`, `onChange(tags)`, `label`, `max`, `validate`, `separators`, `allowDuplicates`            |
| `DateRangePicker` | `value` / `defaultValue` (`[inicio, fin]`), `onChange(range)`, `presets`, `months`, `locale`, `minDate`, `maxDate` |

### Botones

| Componente    | Props principales                                                           |
| ------------- | --------------------------------------------------------------------------- |
| `Button`      | `variant` (`primary` · `secondary` · `danger`), `size` (`sm` · `md` · `lg`) |
| `ButtonGroup` | `aria-label`; une varios `Button` en un bloque                              |

### Paneles y estructura

| Componente    | Props principales                                                                |
| ------------- | -------------------------------------------------------------------------------- |
| `Card`        | `title`, `description`, `footer`                                                 |
| `Panel`       | `header`, `icons`, `footer`, `toggleable`, `collapsed` / `defaultCollapsed`      |
| `Fieldset`    | `legend`, `toggleable`, `collapsed` / `defaultCollapsed`                         |
| `Toolbar`     | `start`, `center`, `end`                                                         |
| `Divider`     | `orientation`, `type` (`solid` · `dashed` · `dotted`), `align`, `children`       |
| `ScrollPanel` | `aria-label`; define la altura con `className`                                   |
| `Modal`       | `open`, `onClose`, `title`, `description`, `footer`, `size` (`sm` · `md` · `lg`) |

### Superposiciones y búsqueda

| Componente       | Props principales                                                                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `Drawer`         | `open`, `onClose`, `title`, `side` (`auto` · `bottom` · `top` · `right` · `left`), `footer`; en móvil se cierra arrastrando                    |
| `Popover`        | `trigger`, `children` (o función con `close`), `title`, `placement`                                                                            |
| `HoverCard`      | `trigger`, `children`, `placement`, `openDelay`, `closeDelay`                                                                                  |
| `CommandPalette` | `groups` (`{ heading, items: { id, label, icon?, shortcut?, keywords?, onSelect? }[] }[]`), `open` / `onOpenChange`, `hotkey` (⌘K por defecto) |

### Visualización y estado

| Componente        | Props principales                                               |
| ----------------- | --------------------------------------------------------------- |
| `Avatar`          | `image`, `label`, `icon`, `alt`, `size`, `shape`                |
| `AvatarGroup`     | agrupa varios `Avatar`                                          |
| `Badge`           | `value`, `severity`, `size`; sin `value` se muestra como punto  |
| `Tag`             | `value`, `icon`, `severity`, `rounded`                          |
| `Chip`            | `label`, `image`, `icon`, `removable`, `onRemove`               |
| `Message`         | `severity`, `title`, `text`, `icon`, `onClose`                  |
| `ProgressBar`     | `value` (sin valor es indeterminada), `showValue`, `severity`   |
| `ProgressSpinner` | `size`, `label`                                                 |
| `MeterGroup`      | `values` (`{ label, value, severity?, color? }[]`), `max`       |
| `Skeleton`        | `shape`, `width`, `height`, `size`, `animation`                 |
| `EmptyState`      | `title`, `description`, `icon` / `image`, `actions`, `bordered` |

### Utilidades

| Componente    | Props principales                                                         |
| ------------- | ------------------------------------------------------------------------- |
| `BlockUI`     | `blocked`, `fullScreen`, `template`; el contenido bloqueado queda `inert` |
| `Inplace`     | `display`, `children`, `active` / `defaultActive`, `closable`             |
| `ScrollTop`   | `target` (`window` · `parent`), `threshold`, `behavior`                   |
| `ThemeToggle` | Selector claro / oscuro / sistema; `storageKey`, `onChange`, `labels`     |

`severity` acepta `primary`, `secondary`, `success`, `info`, `warning` y `danger`.

Todos aceptan `className` para añadir clases propias. Las props están documentadas con JSDoc, así que tu editor las mostrará al autocompletar.

### Ejemplo: Modal

```jsx
import { useState } from 'react';
import { Button, Modal } from 'trigreact';

function DeleteProject() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        Eliminar proyecto
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="¿Eliminar proyecto?"
        description="Esta acción no se puede deshacer."
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="danger">Eliminar</Button>
          </>
        }
      />
    </>
  );
}
```

## Personalizar el tema

Sobrescribe las variables después de importar el tema:

```css
@import 'tailwindcss';
@import 'trigreact/theme.css';
@source '../node_modules/trigreact/dist';

:root {
  --color-primary: #0f766e;
  --color-primary-hover: #14b8a6;
}
```

| Variable                                    | Uso                              |
| ------------------------------------------- | -------------------------------- |
| `--color-primary`, `-hover`, `-foreground`  | Acción principal y su texto      |
| `--color-danger`, `-hover`, `-foreground`   | Acciones destructivas y errores  |
| `--color-success`, `-foreground`            | Confirmaciones                   |
| `--color-warning`, `-foreground`            | Avisos                           |
| `--color-info`, `-foreground`               | Información                      |
| `--color-background`, `--color-foreground`  | Fondo y texto de los componentes |
| `--color-muted`, `--color-muted-foreground` | Fondos suaves y texto secundario |
| `--color-border`, `--color-ring`            | Bordes y anillo de foco          |

Estas variables también generan utilidades de Tailwind (`bg-primary`, `text-muted-foreground`...) que puedes usar en tu propio código.

### Modo oscuro

Por defecto sigue la preferencia del sistema (`prefers-color-scheme`). Para forzarlo, pon `data-theme="dark"` o `data-theme="light"` en `<html>`; sin el atributo vuelve a seguir al sistema.

La forma más sencilla es usar `ThemeToggle` (claro / oscuro / sistema), que guarda la elección en `localStorage`. Si necesitas tu propio control, usa el hook:

```jsx
import { useTheme } from 'trigreact';

const { theme, resolvedTheme, setTheme } = useTheme(); // theme: 'light' | 'dark' | 'system'
```

Para evitar que la página parpadee en claro al cargar, añade este script en el `<head>` (por ejemplo, en el layout raíz de Next.js):

```jsx
import { getThemeScript } from 'trigreact';

<script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />;
```

Para cambiar los colores oscuros, sobrescríbelos en los dos casos (por sistema y forzado):

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    --color-primary: #2dd4bf;
  }
}
:root[data-theme='dark'] {
  --color-primary: #2dd4bf;
}
```

Si usas la variante `dark:` de Tailwind en tu propio código, haz que siga la misma regla:

```css
@custom-variant dark {
  &:where([data-theme='dark'], [data-theme='dark'] *) {
    @slot;
  }
  @media (prefers-color-scheme: dark) {
    &:not(:where([data-theme='light'], [data-theme='light'] *)) {
      @slot;
    }
  }
}
```

## Desarrollo

```bash
npm install
npx playwright install chromium   # una vez: navegador para los tests de las historias
npm run storybook   # catálogo y documentación de componentes en http://localhost:6006
npm test            # tests unitarios (jsdom) y de cada historia en Chromium, con accesibilidad (axe)
npm run lint        # ESLint
npm run format      # Prettier
npm run build       # genera dist/
npm run chromatic   # tests visuales en Chromatic (requiere CHROMATIC_PROJECT_TOKEN)
```

Para que un cambio aparezca en la próxima versión, crea un changeset con `npx changeset` (ver [.changeset/README.md](.changeset/README.md)).

## Licencia

[MIT](LICENSE)
