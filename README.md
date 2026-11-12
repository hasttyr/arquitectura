# Presentación · Sistema de Reservas de una Aerolínea

Presentación web (Vite + React) del documento de arquitectura. Solo contiene el proyecto: las figuras ya están copiadas en `public/figuras`.

## Uso

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
```

**Teclado:** ← → (o espacio) para navegar · `M` índice · `F` pantalla completa.
**Figuras:** clic para ampliar · rueda o pellizco para zoom · arrastrar para mover · doble clic para acercar · `0` para ajustar · `Esc` para cerrar.
Cada diapositiva tiene su URL (`/#/12`).

## Desplegar en Vercel

- Opción 1: suba esta carpeta a un repositorio de GitHub e impórtelo en vercel.com. Vercel detecta Vite solo (build `npm run build`, salida `dist`).
- Opción 2: `npx vercel` dentro de esta carpeta.

## Si cambian los diagramas

`npm run figuras` vuelve a copiarlos desde `../diagramas-mermaid`.

El contenido de las diapositivas está en `src/slides.jsx`.
