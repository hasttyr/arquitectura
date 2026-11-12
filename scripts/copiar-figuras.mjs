// Copia las figuras de ../diagramas-mermaid a public/figuras.
// Solo hace falta correrlo cuando cambien los diagramas: las copias quedan
// dentro del proyecto, así Vercel no necesita la carpeta de documentación.
// A los SVG de Mermaid (width="100%") les fija ancho y alto reales a partir
// del viewBox, para que el visor conozca su tamaño natural.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = dirname(dirname(fileURLToPath(import.meta.url)));
const origen = join(raiz, '..', 'diagramas-mermaid');
const destino = join(raiz, 'public', 'figuras');
mkdirSync(destino, { recursive: true });

for (const f of readdirSync(join(origen, 'svg'))) {
  if (!f.endsWith('.svg')) continue;
  let svg = readFileSync(join(origen, 'svg', f), 'utf8');
  const vb = svg.match(/viewBox="([-\d.\s]+)"/);
  if (vb && /<svg[^>]*width="100%"/.test(svg)) {
    const [, , w, h] = vb[1].trim().split(/\s+/).map(Number);
    svg = svg.replace(/(<svg[^>]*?)width="100%"/, `$1width="${Math.ceil(w)}" height="${Math.ceil(h)}"`);
  }
  writeFileSync(join(destino, f), svg);
}
copyFileSync(join(origen, 'png', 'tabla-06-dofa.png'), join(destino, 'tabla-06-dofa.png'));
console.log('Figuras copiadas en', destino);
