// Documentación automática a partir del JSDoc de los componentes.
//
// react-docgen no interpreta las etiquetas `@param {tipo} [props.nombre=valor] Descripción`
// de un componente en JavaScript: las deja en la descripción como texto y solo detecta
// las props con valor por defecto. Estas funciones las convierten en la tabla de props
// (tipo, descripción, valor por defecto y control) y limpian la descripción.

const SEVERITY = "'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger'";

// `@param {tipo} ` (los tipos del JSDoc no llevan llaves anidadas).
const HEAD_RE = /^@param\s+\{([^}]+)\}\s+/;
// `props.nombre=valor` o `props['aria-label']`.
const NAME_RE = /^props(?:\.([\w$]+)|\['([^']+)'\])(?:=(.*))?$/;

/**
 * Interpreta una línea `@param {tipo} [props.nombre=valor] Descripción`
 * (o `props.nombre` sin corchetes si es obligatoria). Devuelve null si no es una prop.
 */
function parseParam(line) {
  const head = HEAD_RE.exec(line);
  if (!head) return null;

  let rest = line.slice(head[0].length);
  const optional = rest.startsWith('[');
  let spec;
  if (optional) {
    // El nombre opcional termina en el «]» seguido de espacio o fin de línea.
    const end = rest.search(/\](?:\s|$)/);
    if (end < 0) return null;
    spec = rest.slice(1, end);
    rest = rest.slice(end + 1);
  } else {
    const end = rest.search(/\s|$/);
    spec = rest.slice(0, end);
    rest = rest.slice(end);
  }

  const name = NAME_RE.exec(spec);
  if (!name) return null;
  return {
    type: head[1].trim(),
    optional,
    name: name[1] ?? name[2],
    defaultValue: name[3],
    description: rest.trim(),
  };
}

function readableType(type) {
  return type.replace(/import\([^)]*\)\.(\w+)/g, '$1').replace(/\bSeverity\b/g, SEVERITY);
}

// Los argTypes extraídos no pasan por la normalización de Storybook:
// el control debe ir ya como objeto ({ type }), no como texto.
function controlFor(type) {
  const literals = type.split('|').map((part) => part.trim());
  if (literals.length > 1 && literals.every((part) => /^'[^']*'$/.test(part))) {
    const options = literals.map((part) => part.slice(1, -1));
    return { control: { type: options.length <= 4 ? 'inline-radio' : 'select' }, options };
  }
  if (type === 'boolean') return { control: { type: 'boolean' } };
  if (type === 'number') return { control: { type: 'number' } };
  if (type === 'string' || type === 'React.ReactNode') return { control: { type: 'text' } };
  // Funciones, arrays y objetos: sin control (se editan desde la historia).
  return { control: false };
}

/** Separa el texto libre del JSDoc de sus etiquetas `@param`. */
function parseDocblock(description = '') {
  const text = [];
  const params = [];
  for (const line of description.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('@')) {
      const param = parseParam(trimmed);
      if (param) params.push(param);
    } else {
      text.push(line);
    }
  }
  return { text: text.join('\n').trim(), params };
}

/** `parameters.docs.extractArgTypes`: tabla de props desde las etiquetas `@param`. */
export function extractArgTypes(component) {
  const info = component?.__docgenInfo;
  if (!info) return null;

  const argTypes = {};
  for (const param of parseDocblock(info.description).params) {
    const type = readableType(param.type);
    const defaultValue = param.defaultValue ?? info.props?.[param.name]?.defaultValue?.value;
    argTypes[param.name] = {
      name: param.name,
      description: param.description || undefined,
      type: { name: 'other', value: type, required: !param.optional },
      table: {
        type: { summary: type },
        defaultValue: defaultValue === undefined ? undefined : { summary: defaultValue },
      },
      ...controlFor(type),
    };
  }
  return argTypes;
}

/** `parameters.docs.extractComponentDescription`: descripción sin las etiquetas JSDoc. */
export function extractComponentDescription(component) {
  return parseDocblock(component?.__docgenInfo?.description).text;
}
