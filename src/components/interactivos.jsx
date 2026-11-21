import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

/** En modo impresión (PDF de respaldo) los componentes se muestran en su estado final. */
export const ModoContext = createContext({ imprimir: false });
const useImprimir = () => useContext(ModoContext).imprimir;

const reducido = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/* ───────────────────────── Origen de una cifra ───────────────────────── */
const ORIGEN = {
  dato: ['DATO PÚBLICO', 'teal'],
  supuesto: ['SUPUESTO DEL EQUIPO', 'amber'],
  estimado: ['ESTIMADO', 'violet'],
  meta: ['META DEL DISEÑO', 'base'],
};
/** Etiqueta que dice de dónde sale una cifra: dato público, supuesto, estimado o meta. */
export const Src = ({ t, children }) => {
  const [txt, tone] = ORIGEN[t];
  return <span className={`src tone-${tone}`} title={children ? String(children) : undefined}>{txt}{children && <i> · {children}</i>}</span>;
};

/* ───────────────────────── Divisoria "cambio de puerta" ───────────────────────── */
function Flap({ texto, desde = 0 }) {
  return (
    <span className="flap" aria-label={texto}>
      {[...texto].map((c, k) => (
        <span key={k} className={`flap-c${c === ' ' ? ' sp' : ''}`} style={{ animationDelay: `${desde + k * 32}ms` }} aria-hidden="true">{c === ' ' ? ' ' : c}</span>
      ))}
    </span>
  );
}

export function Puerta({ code, destino, pregunta, quien, estado = 'EMBARCANDO', paradas }) {
  return (
    <div className="puerta">
      <div className="puerta-top mono">
        <span>PUERTA</span><span>DESTINO</span><span>ESTADO</span>
      </div>
      <div className="puerta-row">
        <div className="puerta-code">{code}</div>
        <div className="puerta-dest"><Flap texto={destino.toUpperCase()} /></div>
        <div className="puerta-st mono">{estado}</div>
      </div>
      <p className="puerta-q">{pregunta}</p>
      <div className="puerta-foot mono">
        <span>{quien}</span>
        {paradas && <span>{paradas}</span>}
      </div>
    </div>
  );
}

/* ───────────────────────── 100 pasajeros contra el asiento 14C ───────────────────────── */
const FILAS = [12, 13, 14, 15, 16];
const COLS = ['A', 'B', 'C', '', 'D', 'E', 'F'];
const GANADOR = 37;

export function Asiento14C() {
  const imprimir = useImprimir();
  const [fase, setFase] = useState(imprimir ? 'resuelto' : 'idle'); // idle | vuelo | resuelto
  const [voto, setVoto] = useState(null);
  const timers = useRef([]);
  const escena = useRef(null);
  const objetivo = useRef(null);
  const [seat, setSeat] = useState({ x: 76, y: 52 }); // centro del 14C en % del escenario
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => {
    const medir = () => {
      const e = escena.current?.getBoundingClientRect();
      const t = objetivo.current?.getBoundingClientRect();
      if (e && t && e.width) setSeat({ x: ((t.left + t.width / 2 - e.left) / e.width) * 100, y: ((t.top + t.height / 2 - e.top) / e.height) * 100 });
    };
    medir();
    window.addEventListener('resize', medir);
    return () => window.removeEventListener('resize', medir);
  }, []);

  const lanzar = () => {
    timers.current.forEach(clearTimeout);
    if (reducido()) { setFase('resuelto'); return; }
    setFase('vuelo');
    timers.current = [setTimeout(() => setFase('resuelto'), 1700)];
  };
  const reiniciar = () => { timers.current.forEach(clearTimeout); setFase('idle'); setVoto(null); };

  // Posiciones en % dentro del escenario: pasajeros en una rejilla de 10 x 10 a la izquierda.
  const puntos = useMemo(() => Array.from({ length: 100 }, (_, k) => ({
    x: 4 + (k % 10) * 4.1, y: 8 + Math.floor(k / 10) * 9, d: ((k * 37) % 100) * 7,
  })), []);

  return (
    <div className="c14">
      <div className="c14-escena" data-fase={fase} ref={escena}>
        {puntos.map((p, k) => {
          const vuela = fase === 'vuelo';
          const gana = fase === 'resuelto' && k === GANADOR;
          const pierde = fase === 'resuelto' && k !== GANADOR;
          const pos = vuela || gana ? seat : p;
          return (
            <span
              key={k}
              className={`c14-pax${gana ? ' win' : ''}${pierde ? ' lose' : ''}`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, transitionDelay: vuela ? `${p.d / 10}ms` : '0ms' }}
            />
          );
        })}
        <div className="c14-cabina" aria-hidden="true">
          <div className="c14-cols mono">{COLS.map((c, k) => <span key={k}>{c}</span>)}</div>
          {FILAS.map((f) => (
            <div key={f} className="c14-fila">
              {COLS.map((c, k) => c === ''
                ? <span key={k} className="c14-pasillo mono">{f}</span>
                : (f === 14 && c === 'C')
                  ? <span key={k} ref={objetivo} className="c14-seat target" />
                  : <span key={k} className="c14-seat occ" />)}
            </div>
          ))}
        </div>
        <span className="c14-label mono">14C · ÚLTIMO ASIENTO LIBRE</span>
      </div>

      <div className="c14-panel">
        {fase !== 'resuelto' ? (
          <>
            <p className="c14-q">Cien personas pagan <b>al mismo tiempo</b> el último asiento libre del vuelo.</p>
            <div className="c14-voto">
              <span className="mono dim">¿CUÁNTAS SE QUEDAN CON EL 14C?</span>
              <div>
                {['0', '1', 'Más de 1'].map((v) => (
                  <button key={v} className={`chip-btn${voto === v ? ' on' : ''}`} onClick={() => setVoto(v)}>{v}</button>
                ))}
              </div>
            </div>
            <button className="cta" onClick={lanzar} disabled={fase === 'vuelo'}>{fase === 'vuelo' ? 'Comprando…' : '▶ Abrir la venta'}</button>
          </>
        ) : (
          <>
            <div className="c14-res">
              <div><b className="ok">1</b><span>CONFIRMADA</span></div>
              <div><b className="bad">99</b><span>FALLIDA · asiento no disponible</span></div>
              <div><b>99</b><span>pagos sin cobrar: no se inician o se anulan</span></div>
              <div><b className="ok">0</b><span>cobros sin asiento</span></div>
            </div>
            <div className="ec mono">
              <b>ESCENARIO DE CALIDAD EC2 · META M2</b>
              <span><i>Entorno</i> vuelo de alta demanda con pocos asientos</span>
              <span><i>Estímulo</i> 100 clientes compran el mismo asiento a la vez</span>
              <span><i>Respuesta</i> solo una reserva confirma; las demás se compensan</span>
              <span><i>Medida</i> exactamente 1 confirmación y 0 cobros sin asiento</span>
            </div>
            {!imprimir && <button className="chip-btn" onClick={reiniciar}>↺ Repetir</button>}
          </>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────── Matriz de decisión con pesos ajustables ───────────────────────── */
const CRITERIOS = [
  ['Disponibilidad y tolerancia a fallos', [5, 9, 8]],
  ['Escalabilidad y picos', [4, 9, 9]],
  ['Integridad del inventario', [9, 7, 6]],
  ['Tiempo de respuesta', [8, 7, 6]],
  ['Mantenibilidad y evolución', [5, 8, 7]],
  ['Complejidad operativa (10 = menor)', [9, 4, 6]],
  ['Costo total: infra + equipo (10 = menor)', [8, 5, 6]],
];
const PRESETS = {
  'Pesos del equipo': [25, 20, 15, 10, 10, 10, 10],
  'La operación pesa más': [15, 20, 15, 10, 10, 20, 10],
  'La integridad pesa más': [20, 15, 25, 10, 10, 10, 10],
};
const CAND = ['A · Monolito', 'B · Microservicios', 'C · Serverless'];

export function MatrizInteractiva() {
  const imprimir = useImprimir();
  const [w, setW] = useState(PRESETS['Pesos del equipo']);
  const [visible, setVisible] = useState(imprimir);
  const suma = w.reduce((a, b) => a + b, 0) || 1;
  const tot = [0, 1, 2].map((c) => CRITERIOS.reduce((a, [, s], k) => a + s[c] * w[k], 0) / suma);
  const max = Math.max(...tot);

  return (
    <div className="mx">
      <div className="mx-pesos">
        <div className="mx-presets">
          {Object.entries(PRESETS).map(([n, v]) => (
            <button key={n} className={`chip-btn${v.every((x, k) => x === w[k]) ? ' on' : ''}`} onClick={() => setW(v)}>{n}</button>
          ))}
        </div>
        {CRITERIOS.map(([n, s], k) => (
          <label key={n} className="mx-row">
            <span className="mx-n">{n}</span>
            <input type="range" min="0" max="40" step="5" value={w[k]} onChange={(e) => setW(w.map((x, j) => (j === k ? +e.target.value : x)))} />
            <span className="mono mx-w">{Math.round((w[k] / suma) * 100)} %</span>
            <span className="mono mx-s">{s.join(' · ')}</span>
          </label>
        ))}
        <p className="muted mx-nota">Puntajes A · B · C de 1 a 10 con la rúbrica del equipo: 9–10 si cumple por diseño, 6–8 con mecanismos adicionales, 4–5 con dificultad. <Src t="supuesto">juicio del equipo</Src></p>
      </div>
      <div className="mx-res">
        {!visible ? (
          <div className="mx-voto">
            <span className="mono dim">ANTES DE VER EL RESULTADO</span>
            <p>¿Quién gana? Mano arriba: <b>A</b>, <b>B</b> o <b>C</b>.</p>
            <button className="cta" onClick={() => setVisible(true)}>Revelar</button>
          </div>
        ) : (
          <div className="bars">
            {tot.map((v, c) => (
              <div key={c} className={`bar${v === max ? ' win' : ''}`}>
                <div className="bar-l"><span>{CAND[c]}</span><b className="mono">{v.toFixed(2).replace('.', ',')}</b></div>
                <div className="bar-t"><span style={{ width: `${v * 10}%` }} /></div>
              </div>
            ))}
            <p className="muted">Mueva los pesos: B gana o empata salvo que la complejidad operativa pese mucho. Por eso la operación es el principal <b>riesgo aceptado</b>.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────── Saga paso a paso ───────────────────────── */
const CARRILES = ['Cliente', 'Reservas', 'Tarifas', 'Inventario', 'Pagos', 'Emisión'];
const P = (de, a, msg, nota, estado, http) => ({ de, a, msg, nota, estado, http });
const INICIO = [
  P(0, 1, 'POST /reservas → 202', 'Guarda la reserva, la Saga y el primer comando en una transacción (Outbox).', 'PENDIENTE', true),
  P(1, 2, 'CotizarReserva', 'Los pasos sin efectos van primero.', 'PENDIENTE'),
  P(2, 1, 'CotizacionCalculada', 'El precio siempre lo calcula Tarifas.', 'PENDIENTE'),
  P(1, 3, 'ApartarAsientos', 'Apartado en Valkey con TTL de 10 min (SET NX PX).', 'PENDIENTE'),
  P(3, 1, 'AsientosApartados', 'Regla de tiempos: ¿queda tiempo para esperar la pasarela?', 'PENDIENTE'),
  P(1, 4, 'IniciarPago', 'Pagos habla con la pasarela por HTTPS.', 'PENDIENTE'),
];
const CONFIRMAR = [
  P(1, 3, 'ConfirmarAsientos', 'Verifica el token y aplica el CAS por versión en PostgreSQL.', 'PENDIENTE'),
  P(3, 1, 'AsientosConfirmados', 'Valkey coordinó; PostgreSQL decidió.', 'PENDIENTE'),
  P(1, 4, 'CapturarPago', 'Recién ahora se cobra.', 'PENDIENTE'),
  P(4, 1, 'PagoCapturado', 'Reserva y evento en la misma transacción.', 'CONFIRMADA'),
  P(1, 5, 'ReservaConfirmada → TiqueteEmitido', 'Si la emisión falla, no deshace la reserva: reintenta.', 'CONFIRMADA'),
];
const ESCENARIOS = {
  'Todo sale bien': [...INICIO, P(4, 1, 'PagoAutorizado', 'Autorizado, todavía sin cobrar.', 'PENDIENTE'), ...CONFIRMAR],
  'Pago rechazado': [...INICIO,
    P(4, 1, 'PagoRechazado', 'La tarjeta no pasó.', 'PENDIENTE'),
    P(1, 3, 'LiberarApartado', 'Compensación: el asiento vuelve a estar libre.', 'FALLIDA')],
  'Pasarela lenta': [...INICIO,
    P(4, 1, 'PagoEnVerificacion', 'Más de 60 s sin respuesta, o 3-D Secure / PSE en curso.', 'PENDIENTE'),
    P(1, 3, 'RenovarApartado', 'Extiende el apartado hasta 15 min más; la reserva no expira.', 'PENDIENTE'),
    P(4, 1, 'PagoAutorizado (webhook)', 'Firma HMAC verificada y deduplicada.', 'PENDIENTE'), ...CONFIRMAR],
  'Asiento perdido': [...INICIO,
    P(4, 1, 'PagoAutorizado', 'Llegó tarde: el apartado ya venció.', 'PENDIENTE'),
    P(1, 3, 'ConfirmarAsientos', 'El token no coincide: otra reserva tiene el asiento.', 'PENDIENTE'),
    P(3, 1, 'ConflictoAsientos', 'No toca PostgreSQL: un pago tardío no le quita el asiento a nadie.', 'PENDIENTE'),
    P(1, 4, 'AnularAutorizacion', 'Compensación sin cobrar. Cero cobros sin asiento.', 'FALLIDA')],
};

export function SagaAnimada() {
  const imprimir = useImprimir();
  const [esc, setEsc] = useState('Todo sale bien');
  const pasos = ESCENARIOS[esc];
  const [n, setN] = useState(imprimir ? pasos.length : 1);
  const actual = pasos[n - 1];
  const log = useRef(null);
  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight, behavior: 'smooth' }); }, [n, esc]);
  const elegir = (e) => { setEsc(e); setN(1); };
  const izq = Math.min(actual.de, actual.a);
  const ancho = Math.abs(actual.a - actual.de);

  return (
    <div className="saga">
      <div className="saga-esc">
        {Object.keys(ESCENARIOS).map((e) => <button key={e} className={`chip-btn${e === esc ? ' on' : ''}`} onClick={() => elegir(e)}>{e}</button>)}
        <span className={`saga-estado mono st-${actual.estado.toLowerCase()}`}>RESERVA · {actual.estado}</span>
      </div>
      <div className="saga-carriles" style={{ '--n': CARRILES.length }}>
        {CARRILES.map((c, k) => <div key={c} className={`saga-lane${k === actual.de || k === actual.a ? ' on' : ''}`}><span className="mono">{c}</span></div>)}
        <div
          key={`${esc}-${n}`}
          className={`saga-msg${actual.http ? ' http' : ''}${actual.a < actual.de ? ' back' : ''}`}
          style={{ '--l': izq, '--w': ancho }}
        >
          <span className="saga-pill mono">{actual.msg}</span>
        </div>
      </div>
      <div className="saga-bajo">
        <p className="saga-nota"><span className="mono dim">{String(n).padStart(2, '0')}/{pasos.length} · {actual.http ? 'HTTP de borde' : 'Kafka'}</span>{actual.nota}</p>
        <div className="saga-ctrl">
          <button className="chip-btn" onClick={() => setN(Math.max(1, n - 1))} disabled={n === 1} aria-label="Paso anterior">◀</button>
          <button className="cta" onClick={() => setN(Math.min(pasos.length, n + 1))} disabled={n === pasos.length}>Siguiente paso ▶</button>
        </div>
      </div>
      <ol className="saga-log mono" ref={log}>
        {pasos.slice(0, n).map((p, k) => (
          <li key={k} className={k === n - 1 ? 'on' : ''}><span>{CARRILES[p.de]} → {CARRILES[p.a]}</span><b>{p.msg}</b></li>
        ))}
      </ol>
    </div>
  );
}

/* ───────────────────────── Interruptores de fallas ───────────────────────── */
const FALLAS = [
  ['fidel', 'Cae LifeMiles (Perfil y Fidelización)'],
  ['tarifas', 'Cae Tarifas'],
  ['pasarela', 'La pasarela tarda más de 60 s'],
  ['zona', 'Cae una zona de AWS'],
  ['nucleo', 'Kafka o Inventario caídos varios minutos'],
  ['region', 'Se pierde la región us-east-1'],
];
const FUNCIONES = [
  ['A', 'Buscar vuelos'], ['A', 'Reservar con dinero'], ['B', 'Reservar con millas'], ['B', 'Emitir el tiquete'],
  ['B', 'Cancelar y reembolsar'], ['C', 'Perfil del pasajero'], ['C', 'Notificaciones'], ['C', 'Acumular millas'],
];
// Efecto de cada falla sobre cada función: [nivel, nota]; nivel 1 = degradado, 2 = no disponible.
const EFECTO = {
  fidel: { 'Reservar con millas': [2, 'no se degrada: solo se vende con dinero'], 'Perfil del pasajero': [1, 'sin personalización'], 'Acumular millas': [1, 'espera en Kafka'] },
  tarifas: { 'Reservar con dinero': [1, 'cotiza con la réplica local de tarifas'], 'Reservar con millas': [1, 'réplica local de tarifas'] },
  pasarela: { 'Reservar con dinero': [1, 'pago EN_VERIFICACION; la reserva no expira'], 'Cancelar y reembolsar': [1, 'reembolsos encolados'] },
  zona: {},
  nucleo: { 'Reservar con dinero': [2, 'modo solo consulta: 503 con mensaje claro'], 'Reservar con millas': [2, 'modo solo consulta'], 'Emitir el tiquete': [1, 'diferida hasta 24 h'], 'Notificaciones': [1, 'esperan en Kafka'], 'Cancelar y reembolsar': [1, 'encolados'] },
};

export function Interruptores() {
  const [on, setOn] = useState({});
  const t = (k) => setOn((o) => ({ ...o, [k]: !o[k] }));
  const region = on.region;
  const estado = (f) => {
    if (region) return [2, 'pilot light: vuelve en ≤ 2 h'];
    let peor = [0, on.zona ? 'las otras dos zonas atienden' : ''];
    for (const k of Object.keys(on)) if (on[k] && EFECTO[k]?.[f] && EFECTO[k][f][0] > peor[0]) peor = EFECTO[k][f];
    return peor;
  };
  const activas = Object.keys(on).filter((k) => on[k]);
  const modo = region ? ['CONTINGENCIA REGIONAL', 'red']
    : on.nucleo ? ['SOLO CONSULTA', 'amber']
      : activas.some((k) => k !== 'zona') ? ['DEGRADADO', 'amber'] : ['OPERACIÓN COMPLETA', 'teal'];

  return (
    <div className="intr">
      <div className="intr-sw">
        <span className="mono dim">PROVOQUE UNA FALLA</span>
        {FALLAS.map(([k, n]) => (
          <button key={k} role="switch" aria-checked={!!on[k]} className={`sw${on[k] ? ' on' : ''}`} onClick={() => t(k)}>
            <span className="sw-t" aria-hidden="true"><span /></span>{n}
          </button>
        ))}
        {Object.values(on).some(Boolean) && <button className="chip-btn" onClick={() => setOn({})}>↺ Todo en orden</button>}
      </div>
      <div className="intr-board">
        <div className={`intr-modo mono tone-${modo[1]}`}>MODO · {modo[0]}</div>
        <div className="board">
          {FUNCIONES.map(([c, f]) => {
            const [lv, nota] = estado(f);
            return (
              <div key={f} className="board-row intr-row">
                <span className={`mono gate clase-${c}`}>{c}</span>
                <span className="board-dest">{f}</span>
                <span className="intr-nota">{nota}</span>
                <span className={`mono intr-st lv${lv}`}>{['A TIEMPO', 'DEMORADO', 'CANCELADO'][lv]}</span>
              </div>
            );
          })}
        </div>
        <p className="muted intr-pie">Clase A crítica (99,9 %), B posventa (99,5 %), C complementaria (99 %). La integridad del asiento y del saldo <b>nunca</b> se degrada: si no se puede garantizar, se rechaza.</p>
      </div>
    </div>
  );
}
