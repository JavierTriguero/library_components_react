import { useState } from 'react';
import { CommandPalette } from './CommandPalette.jsx';
import { Button } from '../Button/Button.jsx';
import { ArrowUpIcon, CalendarIcon, InboxIcon, MagnifyingGlassIcon, MoonIcon, UserIcon } from '../../utils/icons.jsx';

const groups = [
  {
    heading: 'Navegación',
    items: [
      { id: 'inbox', label: 'Ir a la bandeja de entrada', icon: <InboxIcon />, shortcut: ['G', 'I'] },
      { id: 'calendar', label: 'Abrir calendario', icon: <CalendarIcon />, keywords: ['agenda', 'eventos'] },
      { id: 'profile', label: 'Ver mi perfil', icon: <UserIcon />, keywords: ['cuenta'] },
    ],
  },
  {
    heading: 'Acciones',
    items: [
      { id: 'search', label: 'Buscar en el proyecto', icon: <MagnifyingGlassIcon />, shortcut: ['⌘', 'F'] },
      { id: 'theme', label: 'Cambiar a tema oscuro', icon: <MoonIcon />, keywords: ['modo', 'noche'] },
      { id: 'upload', label: 'Subir archivo', icon: <ArrowUpIcon />, shortcut: ['⌘', 'U'] },
      { id: 'delete', label: 'Eliminar proyecto', disabled: true },
    ],
  },
];

function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState(null);
  const withAction = groups.map((group) => ({
    ...group,
    items: group.items.map((item) => ({ ...item, onSelect: () => setLast(item.label) })),
  }));
  return (
    <div className="flex flex-col items-start gap-3 text-sm text-foreground">
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Buscar comandos
        <kbd className="rounded border border-border bg-muted px-1.5 font-sans text-xs text-foreground">⌘K</kbd>
      </Button>
      <p className="text-muted-foreground">También se abre con ⌘K o Ctrl+K.</p>
      {last && <p>Último comando: {last}</p>}
      <CommandPalette groups={withAction} open={open} onOpenChange={setOpen} />
    </div>
  );
}

export default {
  title: 'Componentes/CommandPalette',
  component: CommandPalette,
};

export const Default = { render: () => <CommandPaletteDemo /> };
