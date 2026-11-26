# Presentación · Sistema de Reservas de una Aerolínea

Presentación web (Vite + React) del documento de arquitectura, preparada para la exposición final. Prioriza la cobertura completa sobre la duración. La exponen Luis (portada, A1 y el final del A4), Nilson (A2 y A5) y Carolina (A3 y el comienzo del A4).

Tiene dos partes:

- **Exposición** (50 paradas, cinco actos): abre con un mapa de toda la descripción arquitectónica y recorre el negocio, los seis puntos de vista y las cuatro perspectivas con sus modelos, con el hilo del *asiento 14C* y cuatro momentos interactivos (100 pasajeros contra el 14C, matriz de decisión con pesos ajustables, Saga paso a paso e interruptores de fallas).
- **Anexo** (83 diapositivas): todas las tablas de respaldo del documento, para responder preguntas. Se abre desde el índice (`M`) o el tablero de vuelos que lo encabeza.

Las flechas recorren solo la parte en la que uno está, así que no se puede salir de la exposición por accidente.

## Teclado

| Tecla | Acción |
| --- | --- |
| ← → (o espacio, PageUp/PageDown del control) | Avanzar o retroceder |
| `M` | Índice (exposición y anexo) |
| `R` | Volver a la exposición desde el anexo |
| `P` | Abrir la ventana del presentador (notas, quién habla y siguiente diapositiva) |
| `T` | Tema claro u oscuro (se recuerda) |
| `B` | Pantalla negra |
| `F` | Pantalla completa |

En la ventana del presentador las flechas también controlan la presentación, y avisa cuando la siguiente diapositiva la expone otra persona.

Figuras: clic para ampliar · rueda o pellizco para zoom · arrastrar para mover · `0` para ajustar · `Esc` para cerrar.

## El día de la exposición

Lleven tres cosas, de la más a la menos cómoda:

1. **La URL de Vercel**, si el salón tiene buena conexión.
2. **La versión para USB**: `npm run build:usb` genera `dist-usb/`. Copien esa carpeta completa y abran `index.html` con doble clic: funciona sin internet y sin servidor, con las fuentes incluidas, y el modo presentador también funciona.
3. **El PDF de respaldo**: `respaldo/presentacion-respaldo.pdf`, una página por diapositiva (los componentes interactivos aparecen en su estado final).

Ensayen a 1280 × 720, la resolución típica de un proyector: cada diapositiva de la exposición se ajusta sola para caber completa.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/ para Vercel o un servidor
npm run build:usb  # dist-usb/index.html autocontenido
npm run figuras    # vuelve a copiar las figuras desde ../diagramas-mermaid
```

Para regenerar el PDF: abran la presentación con `?imprimir` (por ejemplo `http://localhost:4173/?imprimir`) e impriman a PDF desde Chrome con márgenes en «Ninguno» y «Gráficos de fondo» activado.

- La exposición (actos, mapa, expositores y notas del presentador) está en `src/presentacion.jsx`.
- El anexo está en `src/slides.jsx`.
- Los componentes interactivos están en `src/components/interactivos.jsx` y la ventana del presentador en `src/components/Presentador.jsx`.

## Despliegue

La presentación se publica sola en https://arquitectura-reservas.vercel.app cada vez que se hace push a `main` en GitHub (integración de Git del proyecto `arquitectura-reservas` en Vercel: build `npm run build`, salida `dist`). Las otras ramas generan una vista previa. No se despliega a mano con el CLI.
