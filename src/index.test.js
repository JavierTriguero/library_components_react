import { expect, it } from 'vitest';
import * as library from './index.js';

it('exporta la API pública de la librería', () => {
  expect(Object.keys(library).sort()).toEqual(['Button', 'Card', 'Checkbox', 'Input', 'Modal', 'Select']);
});
