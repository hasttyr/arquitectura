// Arma la presentación: un recorrido principal (parte 'ruta') y el anexo
// con todo el detalle del documento (parte 'anexo'), que se abre desde el índice (M).
import { ANEXO, SECCIONES as SECCIONES_ANEXO } from './slides.jsx';
import { Asiento14C, Interruptores, MatrizInteractiva, Puerta, SagaAnimada, Src } from './components/interactivos.jsx';
import { Cards, Cols, Fig, List, T } from './components/ui.jsx';

const K = ({ children }) => <span className="k">{children}</span>;
const buscar = (t) => {
  const s = ANEXO.find((x) => x.title === t);
  if (!s) throw new Error(`No existe la diapositiva «${t}» en el anexo`);
  return s;
};
const PORTADA = ANEXO[0];
const GRACIAS = ANEXO[ANEXO.length - 1];

const ACTOS = [
  { n: 'a1', code: 'A1', t: 'El problema y el negocio', quien: 'Luis' },
  { n: 'a2', code: 'A2', t: 'La arquitectura', quien: 'Nilson' },
  { n: 'a3', code: 'A3', t: 'Construir y operar', quien: 'Carolina' },
  { n: 'a4', code: 'A4', t: 'Cuando algo falla', quien: 'Carolina', quienes: 'Carolina y Luis' },
  { n: 'a5', code: 'A5', t: 'Aterrizaje', quien: 'Nilson' },
];

const puerta = (a, destino, pregunta, notas) => ({
  sec: a.n, layout: 'divisoria', title: destino, quien: a.quien, notas,
  body: () => <Puerta code={a.code} destino={destino} pregunta={pregunta} quien={a.quienes || a.quien} />,
});
const [A1, A2, A3, A4, A5] = ACTOS;
// El acto 4 lo comparten: Carolina hasta "Degradar antes que caer" y Luis desde el modelo de disponibilidad.
const A4L = { ...A4, quien: 'Luis' };

/** Diapositiva del anexo que también se expone: conserva su contenido y cambia acto, kicker, expositor y notas. */
const ver = (titulo, a, kicker, notas) => ({ ...buscar(titulo), sec: a.n, kicker, quien: a.quien, notas });

// [tema, modelos que produjimos, diapositiva del anexo que lo detalla, ¿se expone hoy?]
const MAPA = [
  ['Arquitectura empresarial y de negocio', 'TOGAF · ArchiMate · BPMN', [
    ['Interesados y escenarios', '8 interesados con poder e interés; 7 escenarios de calidad', 'Escenarios de calidad'],
    ['Controladores y metas', 'D1–D6 → M1–M6 con KPI → requisitos medibles', 'Lo que el negocio le exige al sistema'],
    ['Capacidades y ArchiMate', 'mapa de capacidades, vista de motivación y de negocio', 'Vista de arquitectura de negocio (ArchiMate)'],
    ['Proceso BPMN', 'reservar un tiquete, con caminos de falla', 'Lo que el negocio le exige al sistema'],
    ['Estilos y decisión', 'alternativa 0, 3 candidatas, matriz ponderada, DOFA', 'La decisión: ¿monolito, microservicios o serverless?'],
  ]],
  ['Seis puntos de vista', 'Rozanski y Woods', [
    ['Funcional', 'componentes, estilos, secuencia de la Saga', 'Componentes y estilos: los servicios nunca se llaman entre sí'],
    ['Información', 'clases, entidad-relación, flujo de datos, 5 máquinas de estado', 'Modelo de datos e invariantes'],
    ['Concurrencia', 'procesos e hilos, estados de la Saga, 14 escenarios de falla', 'Diagrama de concurrencia'],
    ['Despliegue', 'plataforma de ejecución, red, dependencias y versiones', 'Dónde corre: solo servicios administrados de AWS'],
    ['Desarrollo', 'módulos, diseño común, línea de código y pipeline', 'Arquitectura hexagonal en cada servicio'],
    ['Operacional', 'instalación, migración, administración, soporte, respaldo', 'Cómo se construye y cómo se opera'],
  ]],
  ['Cuatro perspectivas', 'preocupaciones → tácticas → hallazgos', [
    ['Seguridad', '12 amenazas STRIDE, PCI-DSS, Ley 1581', 'Perspectiva de seguridad: amenazas STRIDE'],
    ['Desempeño', 'metas, modelo de carga, presupuesto de latencia', 'Perspectiva de desempeño: metas y modelo'],
    ['Disponibilidad', 'clases de servicio, MTBF/MTTR, pilot light', 'Modelo de disponibilidad y presupuesto de indisponibilidad'],
    ['Evolución', 'cambios previstos, puntos de variación, tradeoffs', 'Perspectiva de evolución: cambios previstos'],
  ]],
  ['Cierre de la descripción', 'IEEE 1471 / ISO 42010', [
    ['Trazabilidad', 'cada requisito → decisión → punto de vista', 'Trazabilidad entre requisitos y diseño'],
    ['Gobernanza y ADM', 'ADR, comités técnico y de dirección, fases A–H', 'Gobernanza de la arquitectura'],
    ['Costo, supuestos y riesgos', 'costo total con equipo, riesgos aceptados', 'Costo y beneficio'],
  ]],
];

function MapaAD({ ir, slides }) {
  const donde = (t) => {
    const r = slides.findIndex((z) => z.parte === 'ruta' && z.title === t);
    return r >= 0 ? [r, true] : [slides.findIndex((z) => z.parte === 'anexo' && z.title === t), false];
  };
  return (
    <>
      <div className="mapa">
        {MAPA.map(([g, marco, items]) => (
          <section key={g} className="mapa-g">
            <div className="mapa-h"><b>{g}</b><span className="mono">{marco}</span></div>
            {items.map(([t, d, destino]) => {
              const [k, hoy] = donde(destino);
              return (
              <button key={t} className="mapa-i" onClick={() => k >= 0 && ir(k)} title={`Ir a: ${destino}`}>
                <span className="mapa-t">{t}<i className={`mono ${hoy ? 'hoy' : ''}`}>{hoy ? 'HOY' : 'ANEXO'}</i></span>
                <span className="mapa-d">{d}</span>
              </button>
              );
            })}
          </section>
        ))}
      </div>
      <p className="note center">Documento completo: <b>36 figuras, 39 tablas y 61 referencias</b>. Clic en un tema para ir a él. Todo lo marcado <b className="hi">HOY</b> se expone; las tablas de respaldo quedan en el anexo.</p>
    </>
  );
}

const RUTA = [
  { ...PORTADA, quien: 'Luis', notas: 'Saludo. Somos Luis Alberto Girón, Nilson Aldair Molina Rengifo y Carolina Cuero Guevara. Presentamos la arquitectura del sistema de reservas de una aerolínea, con Avianca como caso real. Cinco actos.' },
  {
    sec: 0, title: 'La descripción arquitectónica completa', kicker: 'Mapa de la exposición', quien: 'Luis',
    notas: 'No leer el mapa: mostrarlo. Decir: el documento sigue IEEE 1471 / ISO 42010 con los seis puntos de vista y las cuatro perspectivas de Rozanski y Woods, y TOGAF para la arquitectura empresarial. Hoy mostramos lo marcado HOY; todo lo demás está a un clic en el anexo, para las preguntas.',
    body: (props) => <MapaAD {...props} />,
  },

  /* ── Acto 1: el problema y el negocio ── */
  puerta(A1, 'El problema y el negocio', '¿Por qué una aerolínea necesita otra arquitectura para vender tiquetes?', 'Es la pregunta que guía el acto.'),
  {
    sec: 'a1', title: 'Una aerolínea con un solo interruptor de venta', quien: 'Luis',
    notas: 'Contar dos o tres filas, no las cinco. Idea: en todas, una falla en una parte apagó toda la venta o dejó al cliente sin canal. Cerrar con el costo: 0,7 M USD de ingresos en riesgo por hora; es aproximado porque no todo se pierde.',
    body: (
      <Cols r="1.35fr 0.9fr">
        <div className="board">
          <div className="board-row board-headrow mono"><span>AÑO</span><span>QUÉ PASÓ</span><span className="hide-sm">FUENTE</span><span>ESTADO</span></div>
          {[
            ['2018', 'La página de reservas sale de servicio un día', 'Valora Analitik', 'CANCELADO'],
            ['2019', 'Cae LifeMiles y el call center no puede reservar', 'Doctor of Credit', 'CANCELADO'],
            ['2021', '63 % de las quejas contra aerolíneas ante la SIC; multa por no atender reembolsos', 'Portafolio', 'DEMORADO'],
            ['2025', 'La caída de Azure tumba las notificaciones', 'El Colombiano', 'DEMORADO'],
            ['2025', 'Venta suspendida hasta el 8 de diciembre', 'Vanguardia', 'CANCELADO'],
          ].map(([y, q, f, st]) => (
            <div key={q} className="board-row">
              <span className="mono gate">{y}</span>
              <span className="board-dest">{q}</span>
              <span className="mono dim hide-sm">{f}</span>
              <span className={`mono board-st ${st === 'CANCELADO' ? 'st-cancel' : 'st-demora'}`}>{st}</span>
            </div>
          ))}
        </div>
        <div className="hero-num">
          <span className="mono dim">INGRESOS EN RIESGO POR HORA SIN VENTA</span>
          <b>USD 0,7 M</b>
          <span>1.509 M USD por trimestre ÷ 2.208 horas</span>
          <Src t="dato">Avianca, resultados 3T 2025</Src>
          <p>Vender ya saben. Lo difícil es que una falla <b>no apague toda la venta</b>.</p>
        </div>
      </Cols>
    ),
  },
  {
    sec: 'a1', title: 'Hot Sale, 8:00 p. m. · asiento 14C', quien: 'Luis',
    notas: 'Pedir que voten antes de lanzar. Después: uno solo confirma. A los otros 99 no se les cobra: Valkey rechaza su apartado antes de iniciar el pago, y si alguno alcanzó a tener una autorización (por ejemplo, porque su apartado venció), se anula. Este asiento 14C es el hilo de toda la presentación: volvemos a él en el acto 2.',
    body: <Asiento14C />,
  },
  ver('Interesados: preocupación, poder e interés', A1, 'Proceso de definición · interesados', 'Captura de necesidades: ocho interesados, cada uno con su preocupación y la sección que la atiende. Los de poder alto son gerencia comercial, socios GDS y cumplimiento; por eso el diseño prioriza trazabilidad y estándares del sector.'),
  ver('Requisitos de calidad medibles', A1, 'Proceso de definición · requisitos', 'Cada requisito con un objetivo medible: es el criterio de aceptación de las pruebas y del SLA. Destacar integridad (exactamente 1 confirmación) y disponibilidad (99,9 % sin exclusiones por mantenimiento).'),
  ver('Escenarios de calidad', A1, 'Proceso de definición · escenarios', 'Estructura del curso: nombre, entorno, estímulo, respuesta y medida. EC2 es el asiento 14C que acabamos de ver; EC3, EC4 y EC6 vuelven en el acto 4.'),
  {
    sec: 'a1', title: 'Lo que el negocio le exige al sistema', quien: 'Luis',
    notas: 'Una frase por cifra. De los 8 interesados y 6 controladores salen 6 metas medibles (M1–M6), y de cada meta un requisito. El proceso BPMN fija el orden: primero lo que no tiene efectos.',
    body: (
      <>
        <div className="kpis">
          <div><b>0</b><span>dobles asignaciones al año</span><Src t="meta">M2</Src></div>
          <div><b>99,9 %</b><span>disponibilidad mensual = 43,8 min de caída como máximo</span><Src t="meta">M3</Src></div>
          <div><b>121 %</b><span>pico de Cyberlunes y Hot Sale sobre la carga nominal</span><Src t="supuesto">dato del caso</Src></div>
          <div><b>≤ 7 días</b><span>para el 95 % de los reembolsos (hoy: 90 % en 30 días)</span><Src t="meta">M5</Src></div>
        </div>
        <Cols r="0.5fr 0.5fr 1.25fr">
          <div className="flow v">
            <span className="mono dim">DE LA ESTRATEGIA AL REQUISITO</span>
            {['8 interesados', '6 controladores', '6 metas con KPI', 'requisitos medibles'].map((x, k) => <span key={x} className={k === 2 ? 'on' : ''}>{x}</span>)}
          </div>
          <div className="flow v">
            <span className="mono dim">PROCESO (BPMN)</span>
            {['cotizar', 'apartar asiento', 'autorizar pago', 'confirmar', 'capturar'].map((x, k) => <span key={x} className={k === 1 ? 'on' : ''}>{x}</span>)}
          </div>
          <Fig id="5" h="min(32vh, 290px)" />
        </Cols>
      </>
    ),
  },
  ver('Mapa de capacidades de negocio', A1, 'Arquitectura de negocio · capacidades', 'Las capacidades dicen qué hace la aerolínea, no cómo; cada capacidad de venta se asigna a un componente, y eso da la frontera de cada microservicio.'),
  ver('Vista de arquitectura de negocio (ArchiMate)', A1, 'Arquitectura de negocio · ArchiMate', 'De arriba abajo: controladores y metas, procesos dentro y fuera del alcance, los dos servicios de negocio y los ocho roles. Modelo hecho en Archi.'),
  ver('Contexto actual (AS-IS) y brechas', A1, 'Selección de estilos · contexto actual', 'Paso 3 de la selección de estilos: hoy todo corre en Amadeus Altéa. Las brechas, por dominio de arquitectura empresarial, explican qué cambia.'),
  ver('Alternativa 0 frente al PSS y hoja de ruta por etapas', A1, 'Selección de estilos · comprar o construir', 'Antes del estilo se decide qué construir: la alternativa 0 se descarta; la etapa 1 construye alrededor de Altéa y la etapa 2, condicionada, migra el inventario.'),
  {
    sec: 'a1', title: 'La decisión: ¿monolito, microservicios o serverless?', quien: 'Luis',
    notas: 'Primero aclarar: no compramos otro PSS (alternativa 0) porque las fallas están en la postventa y los canales; la etapa 1 construye alrededor de Altéa. Pedir voto, revelar, y mover "La operación pesa más": B empata con C. Esa es nuestra autocrítica: la complejidad operativa es el riesgo aceptado.',
    body: (
      <>
        <p className="strip"><b>Antes:</b> seguir solo con Altéa (alternativa 0) no resuelve las fallas → <b>etapa 1:</b> venta, postventa, pagos y millas propios alrededor de Altéa · <b>etapa 2</b> condicionada: inventario propio.</p>
        <MatrizInteractiva />
      </>
    ),
  },
  ver('Autocrítica y mitigaciones', A1, 'Selección de estilos · riesgos', 'Lo que puede salir mal con B y cómo se mitiga. Decirlo con honestidad: para un equipo pequeño, el monolito sería una alternativa legítima.'),
  ver('Costo y beneficio', A1, 'Selección de estilos · costo total', 'B cuesta unos 112.000 USD al mes con el equipo, 44.000 más que A. Se paga si evita unas 8 horas de caída total al año. Los costos del equipo y el 10 % de pérdida son supuestos, a validar con la aerolínea.'),

  /* ── Acto 2: la arquitectura ── */
  puerta(A2, 'La arquitectura', '¿Cómo se vende el 14C una sola vez sin detener todo lo demás?', 'Cambio de expositor: Nilson.'),
  {
    sec: 'a2', title: 'Componentes y estilos: los servicios nunca se llaman entre sí', kicker: 'Punto de vista funcional · estilos', quien: 'Nilson',
    notas: 'Nueve servicios, uno por capacidad de negocio. Estilo principal: microservicios con publicación/suscripción sobre Kafka. Subsidiarios: hub de integración (GDS, NDC, Altéa), multicapa, cliente-servidor con el API Gateway y hexagonal dentro de cada servicio. Regla P9: entre servicios solo Kafka; HTTP queda en el borde.',
    body: (
      <Cols r="1.3fr 1fr">
        <Fig id="7" h="min(50vh, 540px)" />
        <div>
          <h4 className="h4">Un estilo principal y cuatro subsidiarios</h4>
          <List items={[
            <><b>Microservicios con publicación/suscripción</b> sobre Kafka: un servicio por capacidad, con su propia base.</>,
            <><b>Hub de integración:</b> la Capa de Integración traduce EDIFACT, NDC y Altéa a un modelo canónico.</>,
            <><b>Multicapa:</b> canales → entrada → negocio → mensajería → datos.</>,
            <><b>Cliente-servidor:</b> los canales solo hablan con el API Gateway.</>,
            <><b>Hexagonal:</b> dentro de cada servicio, el dominio no depende de la tecnología.</>,
          ]} />
          <div className="callout">
            <div className="callout-v">P9</div>
            <div>Entre servicios, solo comandos y eventos en Kafka. Si Pagos se cae, sus comandos esperan en la cola: <b>nadie depende de que otro esté arriba</b>.</div>
          </div>
        </div>
      </Cols>
    ),
  },
  ver('Componentes, responsabilidades y contratos', A2, 'Punto de vista funcional · contratos', 'No leer la tabla: señalar que cada servicio declara qué comandos consume y qué eventos publica. Es el contrato que permite que no se llamen entre sí.'),
  {
    sec: 'a2', title: 'La Saga de una reserva, paso a paso', kicker: 'Funcional · comportamiento', quien: 'Nilson',
    notas: 'Es el comportamiento del punto de vista funcional (las secuencias UML están en el anexo). Recorrer "Todo sale bien" rápido (5-6 clics). Luego "Asiento perdido": el pago llega tarde, Inventario responde ConflictoAsientos y se anula la autorización sin cobrar. Mencionar: Outbox (estado y mensaje en la misma transacción) e idempotencia (un mensaje repetido no repite el efecto).',
    body: <SagaAnimada />,
  },
  ver('Comunicación del flujo y emisión posterior', A2, 'Punto de vista funcional · UML de comportamiento', 'Los mismos mensajes de la Saga como diagrama de comunicación UML, y lo que pasa después de confirmar: emisión, notificación y acumulación de millas.'),
  {
    sec: 'a2', title: 'Cada dato tiene un solo dueño', kicker: 'Punto de vista de información', quien: 'Nilson',
    notas: 'Tres modelos del punto de vista: estructura (clases y entidad-relación en el anexo), flujo (este diagrama: cada servicio escribe en su base y publica desde el Outbox) y ciclo de vida (las máquinas de estado). Lo derivado, como Valkey o el modelo de lectura, nunca es autoridad. Cerrar con retención: 10 años para lo financiero y borrado criptográfico para los datos personales.',
    body: (
      <Cols r="1.1fr 1fr">
        <Fig id="18" h="min(50vh, 540px)" />
        <div className="stack">
          <T dense head={['Dato', 'Dueño', 'Ciclo de vida']} rows={[
            ['Reserva', 'Gestión de Reservas', 'PENDIENTE → CONFIRMADA · FALLIDA · EXPIRADA · CANCELADA'],
            ['Asiento', 'Inventario', 'DISPONIBLE → OCUPADO (APARTADO solo en Valkey)'],
            ['Pago y reembolso', 'Pagos', 'AUTORIZADO → CAPTURADO · ANULADO · REEMBOLSADO'],
            ['Tiquete', 'Emisión', 'PENDIENTE_EMISION → EMITIDO · ANULADO'],
            ['Millas', 'Perfil y Fidelización', 'BLOQUEADO → CONFIRMADO · LIBERADO'],
          ]} />
          <List items={[
            <><b>Integridad en la base:</b> UK (id_vuelo, numero_asiento), reembolso ≤ pago, saldo ≥ millas bloqueadas.</>,
            <><b>Latencia:</b> los demás servicios ven el cambio en &lt; 2 s (p99).</>,
            <><b>Retención:</b> 10 años lo financiero; datos personales con borrado criptográfico.</>,
          ]} />
        </div>
      </Cols>
    ),
  },
  ver('Modelo de datos e invariantes', A2, 'Punto de vista de información · estructura', 'Modelo entidad-relación por servicio: las líneas punteadas son referencias lógicas entre servicios, nunca claves foráneas. Las invariantes se garantizan en la base, no en el código.'),
  ver('Ciclos de vida: cinco máquinas de estado', A2, 'Punto de vista de información · ciclo de vida', 'Cada estado lo cambia solo su servicio dueño. CONFIRMADA significa asientos ocupados y pago capturado, no tiquete emitido: eso lo dice el estado del tiquete.'),
  {
    sec: 'a2', title: 'Por qué el 14C tiene un solo dueño', kicker: 'Punto de vista de concurrencia', quien: 'Nilson',
    notas: 'Este es el momento de decir la frase una sola vez: Valkey coordina, PostgreSQL decide. Aunque Valkey pierda el apartado, el UPDATE condicional por versión impide la doble asignación. Es la respuesta al acto 1.',
    body: (
      <>
        <div className="seat-demo">
          <div className="seat-col">
            <div className="mono dim">1 · APARTAR · Valkey</div>
            <code className="code block">SET asiento:14C &lt;token&gt; NX PX 600000</code>
            <p className="muted">Atómico y con vencimiento: los 99 que llegan después reciben «ya apartado».</p>
          </div>
          <div className="seat-arrow" aria-hidden="true">→</div>
          <div className="seat-col">
            <div className="mono dim">2 · VERIFICAR TOKEN · Valkey</div>
            <code className="code block">script Lua: GET asiento:14C == &lt;token&gt;</code>
            <p className="muted">Si venció o es de otro → <K>ConflictoAsientos</K> sin tocar la base.</p>
          </div>
          <div className="seat-arrow" aria-hidden="true">→</div>
          <div className="seat-col">
            <div className="mono dim">3 · CONFIRMAR · PostgreSQL</div>
            <code className="code block">UPDATE asiento SET estado='OCUPADO', version=version+1<br />WHERE id=:id AND estado='DISPONIBLE' AND version=:v</code>
            <p className="muted">0 filas → conflicto y compensación.</p>
          </div>
        </div>
        <div className="mantra">
          <span>Valkey <b>coordina</b>.</span> <span>PostgreSQL <b>decide</b>.</span>
        </div>
        <p className="note center"><b>¿Y si Valkey pierde el apartado?</b> La integridad no depende de él: PostgreSQL sigue siendo la autoridad y solo aparecen más conflictos tardíos, que se compensan sin cobrar (escenario 9).</p>
      </>
    ),
  },
  ver('Diagrama de concurrencia', A2, 'Punto de vista de concurrencia · procesos e hilos', 'Cada servicio es un proceso con sus hilos: consumidores de Kafka, relay del Outbox y un pool HTTP separado. Entre procesos, solo Kafka; Valkey es un proceso propio porque Inventario tiene varias réplicas.'),
  ver('Catorce escenarios de concurrencia y falla', A2, 'Punto de vista de concurrencia · fallas', 'Elegir tres: pago tardío (5), se cae una instancia de Reservas (7) y se pierden apartados en Valkey (9). Los 14 se prueban en staging.'),
  {
    sec: 'a2', title: 'Dónde corre: solo servicios administrados de AWS', kicker: 'Punto de vista de despliegue', quien: 'Nilson',
    notas: 'Nada on-premise. Tres zonas de disponibilidad en us-east-1: si cae una, las otras atienden en 2 minutos o menos. Por qué us-east-1: AWS no tiene región en Colombia y es la de catálogo completo; la latencia desde Bogotá cabe en el presupuesto. Contingencia en us-west-2, que vemos en el acto 3.',
    body: (
      <Cols r="1.25fr 1fr">
        <Fig id="26" h="min(48vh, 520px)" />
        <div className="zones">
          <div><span className="mono">Borde</span>CloudFront, WAF y API Gateway: único punto expuesto.</div>
          <div><span className="mono">Cómputo</span>EKS con Fargate, pods en 3 zonas; escalan por CPU (HPA) y por retraso de Kafka (KEDA).</div>
          <div className="kafka"><span className="mono">Mensajería</span>Amazon MSK, 3 brokers, replicación 3.</div>
          <div><span className="mono">Datos</span>Una base PostgreSQL por servicio, Valkey para apartados, DocumentDB para perfil y búsqueda.</div>
          <div><span className="mono">Región</span>us-east-1 (no hay región en Colombia) y contingencia en us-west-2.</div>
        </div>
      </Cols>
    ),
  },
  ver('Modelo de red', A2, 'Punto de vista de despliegue · red', 'Una VPC con subredes privadas por zona; cada base solo acepta a su servicio. Latencias esperadas por enlace y ancho de banda en el pico: unos 480 Mbps en el borde.'),
  ver('Dependencias tecnológicas', A2, 'Punto de vista de despliegue · dependencias', 'Modelo de dependencias: cada tecnología con su nodo y su versión exacta, para poder recrear el ambiente.'),

  /* ── Acto 3: construir y operar ── */
  puerta(A3, 'Construir y operar', '¿Cómo se construye, se libera y se opera sin apagar la venta?', 'Cambio de expositor: Carolina.'),
  {
    sec: 'a3', title: 'Cómo se construye y cómo se opera', kicker: 'Puntos de vista de desarrollo y operacional', quien: 'Carolina',
    notas: 'Una frase por modelo, sin leer la tabla. Desarrollo: los módulos y sus reglas los verifica el pipeline; los patrones son obligatorios; el canary revierte solo. Operacional: la migración por etapas frente a Altéa y el respaldo con RPO y RTO por tipo de dato.',
    body: (
      <Cols r="1fr 1.1fr">
        <div>
          <h4 className="h4">Desarrollo: tres modelos</h4>
          <T dense head={['Modelo', 'Decisión']} rows={[
            ['Estructura de módulos', '4 niveles con reglas de dependencia que el pipeline verifica; hexagonal en cada servicio.'],
            ['Diseño común', 'Saga, Outbox y consumidor idempotente obligatorios; bibliotecas de logging, configuración, seguridad y resiliencia.'],
            ['Línea de código', 'Un repositorio por servicio, trunk-based, SemVer y contratos FULL_ALL; CI/CD con canary y reversión en ≤ 10 min.'],
          ]} />
        </div>
        <div>
          <h4 className="h4">Operacional: cinco modelos</h4>
          <T dense head={['Modelo', 'Decisión']} rows={[
            ['Instalación', '7 grupos en orden de dependencias; si uno falla, se revierte solo ese grupo.'],
            ['Migración', 'Etapa 1 alrededor de Altéa; etapa 2 por lotes de vuelos, con un único sistema autoritativo por vuelo.'],
            ['Administración', 'OpenTelemetry de punta a punta, alarmas de negocio y mantenimiento sin cerrar la venta.'],
            ['Soporte', 'N1 → N2 → N3, incidentes P1 a P4; la venta se restaura en ≤ 30 min tras un P1.'],
            ['Respaldo', 'RPO y RTO por tipo de dato; si se pierde la región, ≤ 1 min de datos y ≤ 2 h sin vender.'],
          ]} />
        </div>
      </Cols>
    ),
  },
  ver('Arquitectura hexagonal en cada servicio', A3, 'Punto de vista de desarrollo · módulos', 'Estructura de módulos dentro de un servicio: el dominio en el centro, puertos y adaptadores alrededor. La plantilla de repositorio es igual para todos.'),
  ver('Línea de código: ramas, versiones y pipeline', A3, 'Punto de vista de desarrollo · línea de código', 'Trunk-based, SemVer, contratos FULL_ALL. El pipeline compila, prueba, despliega en staging, prueba carga y libera con canary que se revierte solo.'),
  ver('Migración por etapas frente a Altéa', A3, 'Punto de vista operacional · migración', 'Etapa 1: todo menos el inventario. Etapa 2: strangler fig por lotes de vuelos, un único sistema autoritativo por vuelo y reversión mientras Altéa conserve la venta.'),
  ver('Modelo de soporte y acuerdos de nivel de servicio', A3, 'Punto de vista operacional · soporte', 'Grupos N1 a N3, clases P1 a P4 y el SLA. El indicador nuevo: la venta se restaura en 30 minutos o menos tras un P1.'),
  ver('Configuración, respaldo y restauración', A3, 'Punto de vista operacional · respaldo', 'Nada se cambia a mano. RPO y RTO por tipo de dato; la última fila es la pérdida de la región, que cubre el pilot light del acto 4.'),

  /* ── Acto 4: cuando algo falla ── */
  puerta(A4, 'Cuando algo falla', '¿Qué sigue funcionando si cae una parte, o toda la región?', 'Sigue Carolina con seguridad, desempeño y la degradación; desde el modelo de disponibilidad habla Luis.'),
  {
    sec: 'a4', title: 'Seguridad, desempeño y evolución', kicker: 'Perspectivas: preocupación → táctica → hallazgo', quien: 'Carolina',
    notas: 'Explicar el método una vez: cada perspectiva revisa todos los puntos de vista, aplica tácticas y deja hallazgos que cambiaron el diseño. Dar un hallazgo por perspectiva: los webhooks falsificables (HMAC), las conexiones agotadas (RDS Proxy) y los contratos sin modo de compatibilidad (FULL_ALL).',
    body: (
      <>
        <Cards cols={3} items={[
          { tag: 'Seguridad', tone: 'amber', t: 'Nunca vemos la tarjeta', d: <><p><b>Preocupación:</b> inventario, pagos y datos de 16 M socios; 12 amenazas STRIDE.</p><p><b>Tácticas:</b> menor privilegio, defensa en profundidad, fallo seguro y separación de responsabilidades; solo el token de la pasarela (PCI-DSS Nivel 1).</p><p><b>Hallazgo:</b> un webhook falso podía marcar un pago → firma HMAC y deduplicación.</p></> },
          { tag: 'Desempeño y escalabilidad', t: 'Los picos no tocan la reserva', d: <><p><b>Preocupación:</b> p95 de búsqueda ≤ 2 s y de aceptación ≤ 1 s; diseño para 3.000 búsquedas y 30 reservas/s <Src t="supuesto" />.</p><p><b>Tácticas:</b> camino crítico corto (202), paralelismo por particiones, procesamiento asíncrono y escalado selectivo.</p><p><b>Hallazgo:</b> muchos pods agotaban las conexiones → RDS Proxy.</p></> },
          { tag: 'Evolución', tone: 'teal', t: 'Cambiar sin reescribir', d: <><p><b>Preocupación:</b> 9 cambios previstos por magnitud, probabilidad y plazo (tarifas, NDC, aliados, otra pasarela).</p><p><b>Tácticas:</b> encapsulamiento, 8 puntos de variación y pruebas automáticas; la multirregión se difiere a propósito.</p><p><b>Hallazgo:</b> los contratos no fijaban su compatibilidad → FULL_ALL.</p></> },
        ]} />
        <p className="note center">Cada decisión se traza a una meta M1–M6 (principio P8). La matriz de trazabilidad completa está en el anexo.</p>
      </>
    ),
  },
  ver('Perspectiva de seguridad: amenazas STRIDE', A4, 'Perspectiva de seguridad', 'Doce amenazas con su contramedida. Destacar dos que son de aerolínea: bots que apartan asientos sin pagar (seat spinning) y pruebas masivas de tarjetas robadas.'),
  ver('Perspectiva de desempeño: metas y modelo', A4, 'Perspectiva de desempeño', 'Del volumen anual a la carga por segundo: nominal 1.850 búsquedas y 6 reservas; diseño para 3.000 y 30. El presupuesto de latencia muestra por qué la aceptación cabe en 1 segundo.'),
  {
    sec: 'a4', title: 'Degradar antes que caer', kicker: 'Perspectiva de disponibilidad', quien: 'Carolina',
    notas: 'Activar "Cae LifeMiles": se sigue vendiendo con dinero (fue la falla de 2019). Activar "Kafka o Inventario caídos": modo solo consulta, la búsqueda sigue. Recordar el acto 1: antes había un solo interruptor; ahora se apaga por partes.',
    body: <Interruptores />,
  },
  ver('Modelo de disponibilidad y presupuesto de indisponibilidad', A4L, 'Perspectiva de disponibilidad · modelo', 'Toma la palabra Luis. Los SLA de AWS en serie dan 99,68 %: el 99,9 % no se respalda con contratos, se mide. La disponibilidad se gana reduciendo el tiempo de reparación; dos incidentes P1 en un mes rompen el SLA.'),
  { ...buscar('Procedimiento de conmutación regional y tiempos'), sec: 'a4', kicker: 'Recuperación ante desastres · pilot light', quien: 'Luis', notas: 'Datos y mensajería ya están replicados en us-west-2; solo se escala el cómputo. Unos 90 minutos en total: la venta vuelve en 2 horas o menos y se pierde como máximo 1 minuto de datos. Paso clave: reconciliar el inventario antes de abrir, para no vender dos veces el 14C.' },
  ver('Perspectiva de evolución: cambios previstos', A4L, 'Perspectiva de evolución', 'Cada cambio por magnitud, probabilidad y plazo. La regla: pagar la flexibilidad desde el inicio solo cuando el cambio es probable y adaptarlo después sería caro.'),

  /* ── Acto 5: aterrizaje ── */
  puerta(A5, 'Aterrizaje', '¿Cómo sabemos que el diseño responde a lo que pidió el negocio?', 'Cambio de expositor: Nilson cierra.'),
  ver('Trazabilidad entre requisitos y diseño', A5, 'Trazabilidad', 'Cada requisito o meta, con la decisión que lo sostiene en cada punto de vista y perspectiva. Es la prueba del principio P8: ninguna decisión sin propósito.'),
  ver('Gobernanza de la arquitectura', A5, 'Gobernanza · TOGAF y COBIT', 'ADR para cada decisión, comité técnico cada dos semanas y comité de dirección cada trimestre, que decide el paso a la etapa 2 y revisa las metas M1 a M6.'),
  {
    sec: 'a5', title: 'Aterrizaje: cada falla, su respuesta', quien: 'Nilson',
    notas: 'Cerrar el círculo con el acto 1. Decir con honestidad: las cifras de costo y carga son supuestos del equipo; las pruebas de concepto (PoC) son el siguiente paso. Es un diseño validable, no validado.',
    body: (
      <Cols r="1.1fr 1fr">
        <div className="board">
          <div className="board-row board-headrow mono"><span>FALLA</span><span style={{ gridColumn: 'span 2' }}>RESPUESTA DEL DISEÑO</span><span>ESTADO</span></div>
          {[
            ['2018', 'Modo solo consulta por vuelo, ruta o canal'],
            ['2019', 'Fidelización aislada: se vende con dinero'],
            ['2021', 'Reembolso automático y trazable (M5)'],
            ['2025', 'Notificaciones en Kafka y región de contingencia'],
            ['14C', 'Valkey coordina, PostgreSQL decide'],
          ].map(([y, r]) => (
            <div key={y + r} className="board-row">
              <span className="mono gate">{y}</span>
              <span className="board-dest" style={{ gridColumn: 'span 2' }}>{r}</span>
              <span className="mono board-st">A TIEMPO</span>
            </div>
          ))}
        </div>
        <div className="stack">
          <h4 className="h4">Tres decisiones que defendemos</h4>
          <ol className="steps">
            <li><b>Solo Kafka entre servicios.</b> Una caída se aísla en vez de propagarse.</li>
            <li><b>Valkey coordina, PostgreSQL decide.</b> Cero dobles asignaciones.</li>
            <li><b>Construir alrededor de Altéa primero.</b> Atacamos las fallas sin arriesgar el inventario.</li>
          </ol>
          <div className="callout">
            <div className="callout-v">Lo aprendido</div>
            <div>La complejidad operativa es el precio de esta disponibilidad (≈ 112 k USD al mes con el equipo <Src t="supuesto" />). Es un diseño <b>validable, no validado</b>: las PoC son el siguiente paso.</div>
          </div>
        </div>
      </Cols>
    ),
  },
  { ...GRACIAS, sec: 'a5', quien: 'Todos', notas: 'Agradecer y cerrar; no invitar a preguntas. Si el profesor pregunta algo, el índice (M) lleva al anexo: costo y beneficio, matriz, STRIDE, respaldo, etc.' },
];

export const SECCIONES = [
  SECCIONES_ANEXO[0],
  ...ACTOS.map((a) => ({ ...a, ruta: true })),
  { n: 'ax', code: 'ANX', t: 'Índice y resumen' },
  ...SECCIONES_ANEXO.slice(1),
];

export const SLIDES = [
  ...RUTA.map((s) => ({ ...s, parte: 'ruta' })),
  // El tablero de vuelos abre el anexo: es su índice para saltar a la respuesta de una pregunta.
  ...[{ ...ANEXO[2], sec: 'ax' }, { ...ANEXO[1], sec: 'ax' }, ...ANEXO.slice(3, -1)].map((s) => ({ ...s, parte: 'anexo' })),
];
