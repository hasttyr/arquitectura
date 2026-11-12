import { createContext, useContext } from 'react';
import { FIGURAS } from '../figuras.js';

export const VisorContext = createContext({ abrir: () => {} });

/** Párrafo de entrada, más grande. */
export const Lead = ({ children }) => <p className="lead">{children}</p>;

/** Fila de cifras grandes. */
export const Stats = ({ items }) => (
  <div className="stats">
    {items.map((s) => (
      <div className="stat" key={s.l}>
        <div className="stat-v">{s.v}</div>
        <div className="stat-l">{s.l}</div>
        {s.s && <div className="stat-s">{s.s}</div>}
      </div>
    ))}
  </div>
);

/** Rejilla de tarjetas. `tone` colorea el borde superior. */
export const Cards = ({ items, cols = 3, small }) => (
  <div className={`cards${small ? ' cards-sm' : ''}`} style={{ '--cols': cols }}>
    {items.map((c, i) => (
      <article className={`card tone-${c.tone || 'base'}`} key={i}>
        {c.tag && <div className="card-tag">{c.tag}</div>}
        {c.t && <h3>{c.t}</h3>}
        {c.d && <div className="card-d">{c.d}</div>}
      </article>
    ))}
  </div>
);

/** Tabla compacta. La primera columna va en negrita. */
export const T = ({ head, rows, dense, first = true }) => (
  <div className="tbl-wrap">
    <table className={`tbl${dense ? ' dense' : ''}${first ? ' first' : ''}`}>
      <thead>
        <tr>{head.map((h) => <th key={h}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>{r.map((c, j) => <td key={j} data-label={head[j]}>{c}</td>)}</tr>
        ))}
      </tbody>
    </table>
  </div>
);

/** Lista con viñetas. */
export const List = ({ items, cols }) => (
  <ul className="list" style={cols ? { columns: cols } : undefined}>
    {items.map((x, i) => <li key={i}>{x}</li>)}
  </ul>
);

/** Dos (o más) columnas. `r` = plantilla de columnas CSS. */
export const Cols = ({ children, r = '1fr 1fr', center }) => (
  <div className={`cols${center ? ' center' : ''}`} style={{ '--r': r }}>{children}</div>
);

export const Pill = ({ children, tone = 'base' }) => <span className={`pill tone-${tone}`}>{children}</span>;

export const Code = ({ children }) => <code className="code">{children}</code>;

/** Figura del documento: se amplía a pantalla completa con clic. */
export function Fig({ id, h }) {
  const { abrir } = useContext(VisorContext);
  const fig = FIGURAS[id];
  const etiqueta = id === '6T' ? fig.titulo : `Figura ${id.replace(/[ab]$/, '')}. ${fig.titulo}`;
  return (
    <figure className="fig" data-fig={id}>
      <button
        className="fig-btn"
        onClick={(e) => abrir(id, e.currentTarget)}
        aria-label={`Ampliar ${etiqueta}`}
        style={h ? { '--fig-h': h } : undefined}
      >
        <img src={fig.src} alt={etiqueta} loading="lazy" draggable="false" />
        <span className="fig-zoom" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          Ampliar
        </span>
      </button>
      <figcaption>
        <b>{etiqueta}</b>
        <span>{fig.desc}</span>
      </figcaption>
    </figure>
  );
}
