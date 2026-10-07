import axe from 'axe-core';

/**
 * Ejecuta axe sobre un elemento y devuelve las infracciones de accesibilidad.
 * Uso: expect(await axeViolations(container)).toEqual([]);
 */
export async function axeViolations(element) {
  const { violations } = await axe.run(element, {
    // jsdom no calcula colores ni layout: el contraste se revisa en Storybook.
    rules: { 'color-contrast': { enabled: false } },
  });
  return violations.map((v) => `${v.id}: ${v.help} (${v.nodes.map((n) => n.target).join(', ')})`);
}
