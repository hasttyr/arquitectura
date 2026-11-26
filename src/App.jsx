import { useCallback, useEffect, useRef, useState } from 'react';
import { SLIDES, SECCIONES } from './presentacion.jsx';
import { VisorContext } from './components/ui.jsx';
import { ModoContext } from './components/interactivos.jsx';
import Visor from './components/Visor.jsx';
import Presentador from './components/Presentador.jsx';

const params = new URLSearchParams(window.location.search);
const CANAL = 'presentacion-reservas';

const leerHash = () => {
  const n = parseInt(window.location.hash.replace(/^#\/?/, ''), 10);
  return Number.isFinite(n) ? Math.min(Math.max(n - 1, 0), SLIDES.length - 1) : 0;
};

/** Diapositivas de una parte ('ruta' o 'anexo') con su índice global. */
const deParte = (p) => SLIDES.map((s, k) => [s, k]).filter(([s]) => s.parte === p);
const RUTA = deParte('ruta');

const leerTema = () => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
function useTema() {
  const [tema, setTema] = useState(leerTema);
  useEffect(() => {
    document.documentElement.dataset.theme = tema;
    try { localStorage.setItem('tema', tema); } catch { /* sin almacenamiento */ }
  }, [tema]);
  // La ventana del presentador y la presentación comparten el tema.
  useEffect(() => {
    const onStorage = (e) => { if (e.key === 'tema' && e.newValue) setTema(e.newValue === 'dark' ? 'dark' : 'light'); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  return [tema, () => setTema((t) => (t === 'dark' ? 'light' : 'dark'))];
}
const ANEXO = deParte('anexo');

function Diapositiva({ s, n, dir, ir }) {
  const sec = SECCIONES.find((x) => x.n === s.sec);
  return (
    <section className={`slide ${s.parte || ''} ${s.layout || ''} ${dir > 0 ? 'in-next' : 'in-prev'}`} aria-roledescription="diapositiva" aria-label={`${n}: ${s.title || ''}`}>
      {s.title && !['cover', 'divisoria', 'end'].includes(s.layout) && (
        <div className="slide-head">
          <h2>{s.title}</h2>
        </div>
      )}
      <div className="slide-body">{typeof s.body === 'function' ? s.body({ ir, slides: SLIDES }) : s.body}</div>
    </section>
  );
}

/** ?imprimir: todas las diapositivas una tras otra, para guardar el PDF de respaldo. */
function Impresion() {
  // Una diapositiva que no cabe en su página se reduce hasta caber, en vez de cortarse.
  useEffect(() => {
    const ajustar = () => document.querySelectorAll('.print-page').forEach((p) => {
      const s = p.querySelector('.slide');
      s.style.zoom = '';
      if (s.scrollHeight > p.clientHeight) s.style.zoom = String(p.clientHeight / s.scrollHeight);
    });
    const t = setTimeout(ajustar, 600);
    window.addEventListener('beforeprint', ajustar);
    return () => { clearTimeout(t); window.removeEventListener('beforeprint', ajustar); };
  }, []);
  return (
    <ModoContext.Provider value={{ imprimir: true }}>
      <VisorContext.Provider value={{ abrir: () => {} }}>
        <div className="print">
          {SLIDES.map((s, k) => (
            <div className="print-page" key={k}>
              <div className="print-tag mono">{s.parte === 'ruta' ? 'EXPOSICIÓN' : 'ANEXO'} · {String(k + 1).padStart(2, '0')}{s.kicker ? ` · ${s.kicker}` : ''}</div>
              <Diapositiva s={s} n={k + 1} dir={1} ir={() => {}} />
            </div>
          ))}
        </div>
      </VisorContext.Provider>
    </ModoContext.Provider>
  );
}

function Presentacion() {
  const [i, setI] = useState(leerHash);
  const [dir, setDir] = useState(1);
  const [menu, setMenu] = useState(false);
  const [negro, setNegro] = useState(false);
  const [visor, setVisor] = useState(null); // { ids, index }
  const [tema, cambiarTema] = useTema();
  const cuerpo = useRef(null);
  const toque = useRef(null);
  const canal = useRef(null);

  const ir = useCallback((n) => {
    setI((prev) => {
      const sig = Math.min(Math.max(n, 0), SLIDES.length - 1);
      setDir(sig >= prev ? 1 : -1);
      return sig;
    });
  }, []);

  const s = SLIDES[i];
  const parte = s.parte === 'ruta' ? RUTA : ANEXO;
  const pos = parte.findIndex(([, k]) => k === i);

  // Las flechas recorren solo la parte actual: la exposición o el anexo.
  const paso = useCallback((d) => {
    const sig = parte[pos + d];
    if (sig) ir(sig[1]);
  }, [parte, pos, ir]);

  useEffect(() => {
    const h = `#/${i + 1}`;
    if (window.location.hash !== h) window.history.replaceState(null, '', h);
    cuerpo.current?.scrollTo(0, 0);
    canal.current?.postMessage({ i });
  }, [i]);

  // Si una diapositiva no cabe en la pantalla (p. ej. un proyector de 1280x720), se reduce hasta caber,
  // sin bajar del 72 %; por debajo de eso se deja el desplazamiento para no volverla ilegible.
  // Si sobra espacio, se amplía (hasta 125 %) para que se lea mejor desde el fondo del salón.
  useEffect(() => {
    const ajustar = () => {
      const st = cuerpo.current;
      const sl = st?.querySelector('.slide');
      if (!sl) return;
      sl.style.zoom = '';
      const sobra = sl.scrollHeight - st.clientHeight;
      if (sobra > 2) { sl.style.zoom = String(Math.max(0.72, st.clientHeight / sl.scrollHeight)); return; }
      // Los interactivos crecen mientras se usan: no se amplían, para que no se desborden a mitad de la demostración.
      if (st.clientWidth < 900 || sl.querySelector('.c14, .mx, .saga, .intr')) return;
      for (const z of [1.25, 1.2, 1.15, 1.1, 1.05]) {
        sl.style.zoom = String(z);
        if (st.scrollHeight <= st.clientHeight + 1 && st.scrollWidth <= st.clientWidth + 1) return;
      }
      sl.style.zoom = '';
    };
    const tiempos = [0, 120, 650].map((ms) => setTimeout(ajustar, ms));
    window.addEventListener('resize', ajustar);
    return () => { tiempos.forEach(clearTimeout); window.removeEventListener('resize', ajustar); };
  }, [i]);

  // Sincronía con la ventana del presentador.
  useEffect(() => {
    if (!('BroadcastChannel' in window)) return undefined;
    const c = new BroadcastChannel(CANAL);
    canal.current = c;
    c.onmessage = (e) => {
      if (typeof e.data?.ir === 'number') ir(e.data.ir);
      if (e.data?.hola) c.postMessage({ i: leerHash() });
      if (e.data?.negro !== undefined) setNegro((v) => !v);
    };
    return () => { c.close(); if (canal.current === c) canal.current = null; };
  }, [ir]);

  useEffect(() => {
    const onHash = () => { setVisor(null); setMenu(false); ir(leerHash()); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [ir]);

  const pantallaCompleta = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  };
  const abrirPresentador = () => window.open(`${window.location.pathname}?presentador${window.location.hash}`, 'presentador', 'width=1100,height=720');

  useEffect(() => {
    const onKey = (e) => {
      if (visor || e.metaKey || e.ctrlKey || e.altKey) return;
      // Dentro de un componente interactivo, las teclas son del componente.
      if (e.target.closest?.('input, select, textarea')) return;
      if ((e.key === ' ' || e.key === 'Enter') && e.target.closest?.('button')) return;
      if (menu && e.key === 'Escape') { setMenu(false); return; }
      if (negro && !['b', 'B', '.'].includes(e.key)) setNegro(false);
      switch (e.key) {
        case 'ArrowRight': case 'PageDown': case ' ': paso(1); break;
        case 'ArrowLeft': case 'PageUp': paso(-1); break;
        case 'Home': ir(parte[0][1]); break;
        case 'End': ir(parte[parte.length - 1][1]); break;
        case 'm': case 'M': setMenu((m) => !m); break;
        case 'f': case 'F': pantallaCompleta(); break;
        case 'b': case 'B': case '.': setNegro((v) => !v); break;
        case 'p': case 'P': abrirPresentador(); break;
        case 'r': case 'R': ir(RUTA[0][1]); break;
        case 't': case 'T': cambiarTema(); break;
        default: return;
      }
      e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paso, ir, parte, menu, visor, negro, cambiarTema]);

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
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.6) paso(dx < 0 ? 1 : -1);
  };

  const sec = SECCIONES.find((x) => x.n === s.sec);
  const secsParte = SECCIONES.filter((x) => parte.some(([z]) => z.sec === x.n));
  const enRuta = s.parte === 'ruta';

  return (
    <VisorContext.Provider value={{ abrir }}>
      <div className="app">
        <header className="topbar">
          <button className="brand" onClick={() => ir(RUTA[0][1])} aria-label="Ir a la portada">
            <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true"><path d="M5 19l22-9-4.5 11-6.5-2.2-3.4 5.4-1-6.6z" fill="currentColor" /></svg>
            <span>Sistema de Reservas</span>
          </button>
          {sec && (
            <div className="topbar-sec mono">
              <span className="gate">{sec.code}</span>
              <span className="sec-name">{sec.t}{s.kicker && <i> / {s.kicker}</i>}</span>
            </div>
          )}
          <div className="topbar-right">
            {!enRuta && <button className="parte-btn mono" onClick={() => ir(RUTA[0][1])} title="Volver a la exposición (R)">ANEXO · volver a la exposición</button>}
            <span className="mono counter">{enRuta ? '' : 'A '}{String(pos + 1).padStart(2, '0')}<i>/{parte.length}</i></span>
            <button className="icon-btn" onClick={cambiarTema} aria-label={tema === 'dark' ? 'Cambiar a tema claro (T)' : 'Cambiar a tema oscuro (T)'} title={tema === 'dark' ? 'Tema claro (T)' : 'Tema oscuro (T)'}>
              {tema === 'dark'
                ? <svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                : <svg viewBox="0 0 24 24" width="18" height="18"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>}
            </button>
            <button className="icon-btn" onClick={abrirPresentador} aria-label="Modo presentador (P)" title="Modo presentador (P)">
              <svg viewBox="0 0 24 24" width="18" height="18"><path d="M3 5h18v11H3zM8 20h8M12 16v4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button className="icon-btn" onClick={() => setMenu(true)} aria-label="Abrir índice (M)" title="Índice (M)">
              <svg viewBox="0 0 24 24" width="18" height="18"><path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
            <button className="icon-btn" onClick={pantallaCompleta} aria-label="Pantalla completa (F)" title="Pantalla completa (F)">
              <svg viewBox="0 0 24 24" width="18" height="18"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>
        </header>

        <main className="stage" ref={cuerpo} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <Diapositiva key={i} s={s} n={i + 1} dir={dir} ir={ir} />
        </main>

        <nav className="bottombar" aria-label="Navegación">
          <button className="nav-btn" onClick={() => paso(-1)} disabled={pos === 0} aria-label="Anterior">
            <svg viewBox="0 0 24 24" width="18" height="18"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div className="track" role="presentation">
            {secsParte.map((x) => {
              const de = parte.filter(([z]) => z.sec === x.n).map(([, k]) => k);
              const desde = de[0];
              const cuantos = de.length;
              const hechos = de.filter((k) => k <= i).length;
              const lleno = i > de[de.length - 1] ? 1 : hechos / cuantos;
              return (
                <button key={x.n} className={`seg${s.sec === x.n ? ' on' : ''}`} style={{ flexGrow: cuantos }} onClick={() => ir(desde)} title={`${x.code} · ${x.t}`} aria-label={`Ir a ${x.t}`}>
                  <span style={{ transform: `scaleX(${lleno})` }} />
                </button>
              );
            })}
          </div>
          <button className="nav-btn" onClick={() => paso(1)} disabled={pos === parte.length - 1} aria-label="Siguiente">
            <svg viewBox="0 0 24 24" width="18" height="18"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </nav>

        {menu && (
          <div className="drawer-bg" onClick={() => setMenu(false)}>
            <aside className="drawer" onClick={(e) => e.stopPropagation()} aria-label="Índice">
              <div className="drawer-head">
                <span className="mono">ÍNDICE · {RUTA.length} de exposición + {ANEXO.length} de anexo</span>
                <button className="icon-btn" onClick={() => setMenu(false)} aria-label="Cerrar índice">✕</button>
              </div>
              <div className="drawer-list">
                {[['EXPOSICIÓN', RUTA], ['ANEXO DE RESPALDO', ANEXO]].map(([t, lista]) => (
                  <div key={t}>
                    <div className="drawer-parte mono">{t}</div>
                    {SECCIONES.filter((x) => lista.some(([z]) => z.sec === x.n)).map((x) => (
                      <div key={x.n} className="drawer-sec">
                        <div className="drawer-sec-t"><span className="mono gate">{x.code}</span>{x.t}</div>
                        {lista.map(([z, k], j) => z.sec === x.n && (
                          <button key={k} className={`drawer-item${k === i ? ' on' : ''}`} onClick={() => { ir(k); setMenu(false); }}>
                            <span className="mono">{lista === ANEXO ? 'A' : ''}{String(j + 1).padStart(2, '0')}</span>{z.title || 'Portada'}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="drawer-keys mono">← → navegar · M índice · R volver a la exposición · T tema claro/oscuro · P presentador · B pantalla negra · F pantalla completa</div>
            </aside>
          </div>
        )}

        {negro && <button className="negro" onClick={() => setNegro(false)} aria-label="Volver a la presentación" />}

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

export default function App() {
  if (params.has('imprimir')) return <Impresion />;
  if (params.has('presentador')) return <Presentador slides={SLIDES} secciones={SECCIONES} canal={CANAL} />;
  return <Presentacion />;
}
