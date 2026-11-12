import { useCallback, useEffect, useRef, useState } from 'react';
import { SLIDES, SECCIONES } from './slides.jsx';
import { VisorContext } from './components/ui.jsx';
import Visor from './components/Visor.jsx';

const leerHash = () => {
  const n = parseInt(window.location.hash.replace(/^#\/?/, ''), 10);
  return Number.isFinite(n) ? Math.min(Math.max(n - 1, 0), SLIDES.length - 1) : 0;
};

export default function App() {
  const [i, setI] = useState(leerHash);
  const [dir, setDir] = useState(1);
  const [menu, setMenu] = useState(false);
  const [visor, setVisor] = useState(null); // { ids, index }
  const cuerpo = useRef(null);
  const toque = useRef(null);

  const ir = useCallback((n) => {
    setI((prev) => {
      const sig = Math.min(Math.max(n, 0), SLIDES.length - 1);
      setDir(sig >= prev ? 1 : -1);
      return sig;
    });
  }, []);

  useEffect(() => {
    const h = `#/${i + 1}`;
    if (window.location.hash !== h) window.history.replaceState(null, '', h);
    cuerpo.current?.scrollTo(0, 0);
  }, [i]);

  useEffect(() => {
    const onHash = () => { setVisor(null); setMenu(false); ir(leerHash()); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [ir]);

  const pantallaCompleta = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  };

  useEffect(() => {
    const onKey = (e) => {
      if (visor || e.metaKey || e.ctrlKey || e.altKey) return;
      if (menu && e.key === 'Escape') { setMenu(false); return; }
      switch (e.key) {
        case 'ArrowRight': case 'PageDown': case ' ': ir(i + 1); break;
        case 'ArrowLeft': case 'PageUp': ir(i - 1); break;
        case 'Home': ir(0); break;
        case 'End': ir(SLIDES.length - 1); break;
        case 'm': case 'M': setMenu((m) => !m); break;
        case 'f': case 'F': pantallaCompleta(); break;
        default: return;
      }
      e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [i, ir, menu, visor]);

  const abrir = useCallback((id, el) => {
    const slide = el.closest('.slide');
    const ids = slide ? [...slide.querySelectorAll('[data-fig]')].map((n) => n.dataset.fig) : [id];
    setVisor({ ids, index: Math.max(ids.indexOf(id), 0) });
  }, []);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    toque.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    if (!toque.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - toque.current.x;
    const dy = t.clientY - toque.current.y;
    toque.current = null;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.6) ir(i + (dx < 0 ? 1 : -1));
  };

  const s = SLIDES[i];
  const sec = SECCIONES.find((x) => x.n === s.sec);

  return (
    <VisorContext.Provider value={{ abrir }}>
      <div className="app">
        <header className="topbar">
          <button className="brand" onClick={() => ir(0)} aria-label="Ir a la portada">
            <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true"><path d="M5 19l22-9-4.5 11-6.5-2.2-3.4 5.4-1-6.6z" fill="currentColor" /></svg>
            <span>Sistema de Reservas</span>
          </button>
          {sec && (
            <div className="topbar-sec mono">
              <span className="gate">{sec.code}</span>
              <span className="sec-name">{sec.t}</span>
            </div>
          )}
          <div className="topbar-right">
            <span className="mono counter">{String(i + 1).padStart(2, '0')}<i>/{SLIDES.length}</i></span>
            <button className="icon-btn" onClick={() => setMenu(true)} aria-label="Abrir índice (M)" title="Índice (M)">
              <svg viewBox="0 0 24 24" width="18" height="18"><path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
            <button className="icon-btn" onClick={pantallaCompleta} aria-label="Pantalla completa (F)" title="Pantalla completa (F)">
              <svg viewBox="0 0 24 24" width="18" height="18"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>
        </header>

        <main className="stage" ref={cuerpo} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <section key={i} className={`slide ${s.layout || ''} ${dir > 0 ? 'in-next' : 'in-prev'}`} aria-roledescription="diapositiva" aria-label={`${i + 1} de ${SLIDES.length}: ${s.title || ''}`}>
            {s.title && s.layout !== 'cover' && (
              <div className="slide-head">
                {sec && <div className="kicker mono">{sec.code} · {s.kicker || sec.t}</div>}
                <h2>{s.title}</h2>
              </div>
            )}
            <div className="slide-body">{typeof s.body === 'function' ? s.body({ ir }) : s.body}</div>
          </section>
        </main>

        <nav className="bottombar" aria-label="Navegación">
          <button className="nav-btn" onClick={() => ir(i - 1)} disabled={i === 0} aria-label="Anterior">
            <svg viewBox="0 0 24 24" width="18" height="18"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div className="track" role="presentation">
            {SECCIONES.map((x) => {
              const desde = SLIDES.findIndex((z) => z.sec === x.n);
              const cuantos = SLIDES.filter((z) => z.sec === x.n).length;
              if (desde < 0) return null;
              const activo = s.sec === x.n;
              const lleno = i >= desde + cuantos ? 1 : i < desde ? 0 : (i - desde + 1) / cuantos;
              return (
                <button key={x.n} className={`seg${activo ? ' on' : ''}`} style={{ flexGrow: cuantos }} onClick={() => ir(desde)} title={`${x.code} · ${x.t}`} aria-label={`Ir a ${x.t}`}>
                  <span style={{ transform: `scaleX(${lleno})` }} />
                </button>
              );
            })}
          </div>
          <button className="nav-btn" onClick={() => ir(i + 1)} disabled={i === SLIDES.length - 1} aria-label="Siguiente">
            <svg viewBox="0 0 24 24" width="18" height="18"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </nav>

        {menu && (
          <div className="drawer-bg" onClick={() => setMenu(false)}>
            <aside className="drawer" onClick={(e) => e.stopPropagation()} aria-label="Índice">
              <div className="drawer-head">
                <span className="mono">ÍNDICE · {SLIDES.length} diapositivas</span>
                <button className="icon-btn" onClick={() => setMenu(false)} aria-label="Cerrar índice">✕</button>
              </div>
              <div className="drawer-list">
                {SECCIONES.map((x) => (
                  <div key={x.n} className="drawer-sec">
                    <div className="drawer-sec-t"><span className="mono gate">{x.code}</span>{x.t}</div>
                    {SLIDES.map((z, k) => z.sec === x.n && (
                      <button key={k} className={`drawer-item${k === i ? ' on' : ''}`} onClick={() => { ir(k); setMenu(false); }}>
                        <span className="mono">{String(k + 1).padStart(2, '0')}</span>{z.title || 'Portada'}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
              <div className="drawer-keys mono">← → navegar · M índice · F pantalla completa · clic en una figura para ampliarla</div>
            </aside>
          </div>
        )}

        {visor && (
          <Visor
            ids={visor.ids}
            index={visor.index}
            onIndex={(index) => setVisor((v) => ({ ...v, index }))}
            onClose={() => setVisor(null)}
          />
        )}
      </div>
    </VisorContext.Provider>
  );
}
