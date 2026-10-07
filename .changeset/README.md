# Changesets

Cada cambio que deba aparecer en una nueva versión necesita un _changeset_.
Créalo con `npx changeset` y elige el tipo de cambio:

- **patch**: corrección de errores sin cambios en la API (0.1.0 → 0.1.1).
- **minor**: funcionalidad nueva compatible con lo anterior (0.1.0 → 0.2.0).
- **major**: cambios incompatibles (0.1.0 → 1.0.0).

Al hacer merge en `main`, GitHub Actions abre una PR «Versión de paquetes» que
sube la versión y actualiza el CHANGELOG. Al hacer merge de esa PR, se publica en npm.
