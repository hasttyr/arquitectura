import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FIGURAS } from '../figuras.js';

const MIN = 0.1;
const MAX = 12;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/**
 * Visor a pantalla completa. La imagen se redimensiona con width/height
 * (no con transform: scale) para que el SVG se vuelva a dibujar nítido
 * a cualquier zoom.
 */
export default function Visor({ ids, index, onIndex, onClose }) {
  const fig = FIGURAS[ids[index]];
  const caja = useRef(null);
  const [nat, setNat] = useState(null); // tamaño natural de la imagen
  const [v, setV] = useState({ s: 1, x: 0, y: 0 });
  const [arrastrando, setArrastrando] = useState(false);
  const punteros = useRef(new Map());
  const pellizco = useRef(null);

  const ajustar = useCallback(() => {
    if (!nat || !caja.current) return;
    const r = caja.current.getBoundingClientRect();
    const pad = r.width < 700 ? 16 : 48;
    const s = Math.min((r.width - pad * 2) / nat.w, (r.height - pad * 2) / nat.h);
    setV({ s, x: (r.width - nat.w * s) / 2, y: (r.height - nat.h * s) / 2 });
  }, [nat]);

  useLayoutEffect(() => { setNat(null); }, [fig.src]);
  useLayoutEffect(() => { ajustar(); }, [ajustar]);
  useEffect(() => {
    window.addEventListener('resize', ajustar);
    return () => window.removeEventListener('resize', ajustar);
  }, [ajustar]);

  const zoomEn = useCallback((factor, cx, cy) => {
    setV((p) => {
      const s = clamp(p.s * factor, MIN, MAX);
      const k = s / p.s;
      return { s, x: cx - (cx - p.x) * k, y: cy - (cy - p.y) * k };
    });
  }, []);

  const zoomCentro = useCallback((factor) => {
    const r = caja.current.getBoundingClientRect();
    zoomEn(factor, r.width / 2, r.height / 2);
  }, [zoomEn]);

  const pantallaCompleta = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  };

  // Teclado
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && !document.fullscreenElement) onClose();
      else if (e.key === '+' || e.key === '=') zoomCentro(1.25);
      else if (e.key === '-' || e.key === '_') zoomCentro(0.8);
      else if (e.key === '0') ajustar();
      else if (e.key === 'ArrowRight' && ids.length > 1) onIndex((index + 1) % ids.length);
      else if (e.key === 'ArrowLeft' && ids.length > 1) onIndex((index - 1 + ids.length) % ids.length);
      else if (e.key === 'f' || e.key === 'F') pantallaCompleta();
      else return;
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [ids.length, index, onIndex, onClose, zoomCentro, ajustar]);

  // Rueda (no pasiva, para poder evitar el scroll)
  useEffect(() => {
    const el = caja.current;
    const onWheel = (e) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      const factor = Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0018));
      zoomEn(factor, e.clientX - r.left, e.clientY - r.top);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [zoomEn]);

  const local = (e) => {
    const r = caja.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const onDown = (e) => {
    if (e.target.closest('button')) return;
    caja.current.setPointerCapture(e.pointerId);
    punteros.current.set(e.pointerId, local(e));
    setArrastrando(true);
    if (punteros.current.size === 2) {
      const [a, b] = [...punteros.current.values()];
      pellizco.current = { d: Math.hypot(a.x - b.x, a.y - b.y) };
    }
  };
  const onMove = (e) => {
    if (!punteros.current.has(e.pointerId)) return;
    const prev = punteros.current.get(e.pointerId);
    const cur = local(e);
    punteros.current.set(e.pointerId, cur);
    if (punteros.current.size === 2 && pellizco.current) {
      const [a, b] = [...punteros.current.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      zoomEn(d / pellizco.current.d, (a.x + b.x) / 2, (a.y + b.y) / 2);
      pellizco.current.d = d;
    } else {
      setV((p) => ({ ...p, x: p.x + cur.x - prev.x, y: p.y + cur.y - prev.y }));
    }
  };
  const onUp = (e) => {
    punteros.current.delete(e.pointerId);
    if (punteros.current.size < 2) pellizco.current = null;
    if (punteros.current.size === 0) setArrastrando(false);
  };
  const onDouble = (e) => {
    const p = local(e);
    zoomEn(2, p.x, p.y);
  };

  const etiqueta = ids[index] === '6T' ? fig.titulo : `Figura ${ids[index].replace(/[ab]$/, '')}. ${fig.titulo}`;

  return (
    <div className="visor" role="dialog" aria-modal="true" aria-label={etiqueta}>
      <header className="visor-top">
        <div className="visor-title">
          <span className="mono">{ids.length > 1 ? `${index + 1} / ${ids.length}` : 'FIGURA'}</span>
          <b>{etiqueta}</b>
        </div>
        <div className="visor-tools">
          <button onClick={() => zoomCentro(0.8)} title="Alejar (−)" aria-label="Alejar">−</button>
          <span className="mono visor-pct">{Math.round(v.s * 100)}%</span>
          <button onClick={() => zoomCentro(1.25)} title="Acercar (+)" aria-label="Acercar">+</button>
          <button onClick={ajustar} title="Ajustar a la pantalla (0)" className="txt">Ajustar</button>
          <button onClick={() => { const r = caja.current.getBoundingClientRect(); setV({ s: 1, x: (r.width - nat.w) / 2, y: 24 }); }} title="Tamaño real" className="txt">1:1</button>
          <button onClick={pantallaCompleta} title="Pantalla completa (F)" aria-label="Pantalla completa">
            <svg viewBox="0 0 24 24" width="16" height="16"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
          <button onClick={onClose} title="Cerrar (Esc)" aria-label="Cerrar" className="close">✕</button>
        </div>
      </header>

      <div
        ref={caja}
        className={`visor-stage${arrastrando ? ' grabbing' : ''}`}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onDoubleClick={onDouble}
      >
        <img
          key={fig.src}
          src={fig.src}
          alt={etiqueta}
          draggable="false"
          onLoad={(e) => setNat({ w: e.currentTarget.naturalWidth || 1000, h: e.currentTarget.naturalHeight || 700 })}
          style={nat ? { width: nat.w * v.s, height: nat.h * v.s, left: v.x, top: v.y } : { opacity: 0 }}
        />
      </div>

      {ids.length > 1 && (
        <>
          <button className="visor-nav prev" onClick={() => onIndex((index - 1 + ids.length) % ids.length)} aria-label="Figura anterior">‹</button>
          <button className="visor-nav next" onClick={() => onIndex((index + 1) % ids.length)} aria-label="Figura siguiente">›</button>
        </>
      )}

      <footer className="visor-hint mono">
        rueda o pellizco: zoom · arrastrar: mover · doble clic: acercar · 0: ajustar · Esc: cerrar
      </footer>
    </div>
  );
}
