import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import pkg from './package.json' with { type: 'json' };

// Todo lo que sea dependency o peerDependency se queda fuera del bundle:
// lo instala el proyecto que consume la librería.
const externals = [...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.peerDependencies ?? {})];
const isExternal = (id) => externals.some((dep) => id === dep || id.startsWith(`${dep}/`));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.js'),
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    // Sin minificar: el Tailwind del usuario escanea dist/ para encontrar las clases.
    minify: false,
    sourcemap: true,
    rollupOptions: {
      external: isExternal,
      // Los componentes usan estado y efectos: en Next.js (App Router) deben ser Client Components.
      output: { banner: "'use client';" },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    include: ['src/**/*.test.{js,jsx}'],
  },
});
