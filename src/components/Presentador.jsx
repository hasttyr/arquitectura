import { useEffect, useRef, useState } from 'react';

/**
 * Ventana del presentador (?presentador). Se sincroniza con la presentación por BroadcastChannel:
 * muestra quién habla, las notas y la siguiente diapositiva.
 */
export default function Presentador({ slides, secciones, canal }) {
  const [i, setI] = useState(0);
  const [ahora, setAhora] = useState(Date.now());
  const c = useRef(null);

  useEffect(() => {
    document.title = 'Presentador · Sistema de Reservas';
    if (!('BroadcastChannel' in window)) return undefined;
    const ch = new BroadcastChannel(canal);
    c.current = ch;
    ch.onmessage = (e) => { if (typeof e.data?.i === 'number') setI(e.data.i); };
    ch.postMessage({ hola: true });
    return () => { ch.close(); if (c.current === ch) c.current = null; };
  }, [canal]);

  useEffect(() => {
    const t = setInterval(() => setAhora(Date.now()), 15000);
    return () => clearInterval(t);
  }, []);

  const s = slides[i];
  const parte = slides.map((z, k) => [z, k]).filter(([z]) => z.parte === s.parte);
  const pos = parte.findIndex(([, k]) => k === i);
  const sig = parte[pos + 1]?.[0];
  const sec = secciones.find((x) => x.n === s.sec);


  const ir = (d) => { const z = parte[pos + d]; if (z) c.current?.postMessage({ ir: z[1] }); };

  useEffect(() => {
    const onKey = (e) => {
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) ir(1);
      else if (['ArrowLeft', 'PageUp'].includes(e.key)) ir(-1);
      else if (e.key === 'b' || e.key === 'B') c.current?.postMessage({ negro: true });
      else return;
      e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div className="pres">
      <header className="pres-top mono">
        <span className="gate">{sec?.code}</span>
        <span>{s.parte === 'ruta' ? `EXPOSICIÓN ${pos + 1}/${parte.length}` : `ANEXO A${pos + 1}`}</span>
        <span className="pres-quien">{s.quien ? `HABLA · ${s.quien.toUpperCase()}` : ''}</span>
        <span className="pres-reloj">{new Date(ahora).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}</span>
      </header>
      <main className="pres-main">
        <section>
          <div className="mono dim">AHORA</div>
          <h1>{s.title || 'Portada'}</h1>
          <p className="pres-notas">{s.notas || 'Diapositiva del anexo de respaldo.'}</p>
        </section>
        <aside>
          <div className="pres-sig">
            <span className="mono dim">SIGUE</span>
            <b>{sig ? sig.title || 'Portada' : 'Fin de la exposición'}</b>
            {sig?.quien && sig.quien !== s.quien && <span className="mono pres-cambio">CAMBIO DE EXPOSITOR → {sig.quien}</span>}
          </div>
          <div className="mono dim pres-keys">← → avanzar · B pantalla negra</div>
        </aside>
      </main>
    </div>
  );
}
