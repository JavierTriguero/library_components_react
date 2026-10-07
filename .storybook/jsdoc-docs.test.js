import { describe, expect, it } from 'vitest';
import { extractArgTypes, extractComponentDescription } from './jsdoc-docs.js';

const component = {
  __docgenInfo: {
    description: `Selector de ejemplo.
Segunda línea de la descripción.

@param {object} props
@param {SelectOption[]} props.options Opciones disponibles.
@param {'sm' | 'md' | 'lg'} [props.size='md'] Tamaño.
@param {import('../../utils/severity.js').Severity} [props.severity='primary']
@param {React.ReactNode} [props.placeholder='Selecciona una opción'] Texto sin selección.
@param {boolean} [props.disabled]
@param {string} [props['aria-label']] Nombre accesible.
@param {(value: string) => void} [props.onChange]
@param {number} [props.max] Máximo.`,
    props: { max: { defaultValue: { value: '100' } } },
  },
};

describe('extractArgTypes', () => {
  const argTypes = extractArgTypes(component);

  it('crea una entrada por cada prop, ignorando @param {object} props', () => {
    expect(Object.keys(argTypes)).toEqual([
      'options',
      'size',
      'severity',
      'placeholder',
      'disabled',
      'aria-label',
      'onChange',
      'max',
    ]);
  });

  it('marca como obligatorias las props sin corchetes', () => {
    expect(argTypes.options.type.required).toBe(true);
    expect(argTypes.size.type.required).toBe(false);
  });

  it('extrae descripción, tipo y valor por defecto (también con espacios)', () => {
    expect(argTypes.placeholder).toMatchObject({
      description: 'Texto sin selección.',
      table: { type: { summary: 'React.ReactNode' }, defaultValue: { summary: "'Selecciona una opción'" } },
    });
    expect(argTypes['aria-label'].description).toBe('Nombre accesible.');
  });

  it('usa el valor por defecto de react-docgen si el JSDoc no lo indica', () => {
    expect(argTypes.max.table.defaultValue).toEqual({ summary: '100' });
  });

  it('expande Severity y elige el control según el tipo', () => {
    expect(argTypes.severity.options).toEqual(['primary', 'secondary', 'success', 'info', 'warning', 'danger']);
    expect(argTypes.severity.control).toEqual({ type: 'select' });
    expect(argTypes.size).toMatchObject({ control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'] });
    expect(argTypes.disabled.control).toEqual({ type: 'boolean' });
    expect(argTypes.max.control).toEqual({ type: 'number' });
    expect(argTypes.onChange.control).toBe(false);
  });

  it('devuelve null si el componente no tiene información de docgen', () => {
    expect(extractArgTypes({})).toBeNull();
  });
});

describe('extractComponentDescription', () => {
  it('conserva el texto y quita las etiquetas JSDoc', () => {
    expect(extractComponentDescription(component)).toBe('Selector de ejemplo.\nSegunda línea de la descripción.');
  });
});
