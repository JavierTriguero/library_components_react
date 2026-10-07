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

| Componente | Props principales                                                                                          |
| ---------- | ---------------------------------------------------------------------------------------------------------- |
| `Button`   | `variant` (`primary` · `secondary` · `danger`), `size` (`sm` · `md` · `lg`)                                |
| `Input`    | `label`, `description`, `error`, `disabled` y cualquier prop de `<input>`                                  |
| `Checkbox` | `label`, `description`, `checked` / `defaultChecked`, `onChange(checked)`, `disabled`                      |
| `Select`   | `options` (`{ value, label, disabled? }[]`), `value` / `defaultValue`, `onChange(value)`, `label`, `error` |
| `Modal`    | `open`, `onClose`, `title`, `description`, `footer`, `size` (`sm` · `md` · `lg`)                           |
| `Card`     | `title`, `description`, `footer`                                                                           |

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
| `--color-background`, `--color-foreground`  | Fondo y texto de los componentes |
| `--color-muted`, `--color-muted-foreground` | Fondos suaves y texto secundario |
| `--color-border`, `--color-ring`            | Bordes y anillo de foco          |

Estas variables también generan utilidades de Tailwind (`bg-primary`, `text-muted-foreground`...) que puedes usar en tu propio código.

### Modo oscuro

Se activa automáticamente cuando el sistema del usuario está en modo oscuro (`prefers-color-scheme: dark`). Para cambiar los colores oscuros, sobrescríbelos dentro de la misma media query:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #2dd4bf;
  }
}
```

## Desarrollo

```bash
npm install
npm run storybook   # catálogo de componentes en http://localhost:6006
npm test            # tests (Vitest + Testing Library + axe)
npm run lint        # ESLint
npm run format      # Prettier
npm run build       # genera dist/
```

Para que un cambio aparezca en la próxima versión, crea un changeset con `npx changeset` (ver [.changeset/README.md](.changeset/README.md)).

## Licencia

[MIT](LICENSE)
