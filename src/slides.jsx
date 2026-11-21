import { Cards, Cols, Code, Fig, Lead, List, Pill, Stats, T } from './components/ui.jsx';

export const SECCIONES = [
  { n: 0, code: 'SR', t: 'Portada' },
  { n: 1, code: '01', t: 'Introducción' },
  { n: 2, code: '02', t: 'Contexto corporativo' },
  { n: 3, code: '03', t: 'Interesados y requisitos' },
  { n: 4, code: '04', t: 'Arquitectura de negocio' },
  { n: 5, code: '05', t: 'Candidatas y decisión' },
  { n: 6, code: '06', t: 'Arquitectura propuesta' },
  { n: 7, code: '07', t: 'Punto de vista de información' },
  { n: 8, code: '08', t: 'Punto de vista de concurrencia' },
  { n: 9, code: '09', t: 'Punto de vista de despliegue' },
  { n: 10, code: '10', t: 'Trazabilidad y gobernanza' },
  { n: 11, code: '11', t: 'Punto de vista de desarrollo' },
  { n: 12, code: '12', t: 'Punto de vista operacional' },
  { n: 13, code: '13', t: 'Seguridad y desempeño' },
  { n: 14, code: '14', t: 'Disponibilidad y evolución' },
  { n: 15, code: 'FIN', t: 'Glosario y cierre' },
];

const ESTADO_SEC = {
  1: 'A TIEMPO', 2: 'A TIEMPO', 3: 'A TIEMPO', 4: 'A TIEMPO', 5: 'DECIDIDO', 6: 'EMBARCANDO', 7: 'EMBARCANDO',
  8: 'EMBARCANDO', 9: 'EN PISTA', 10: 'EN PISTA', 11: 'EN VUELO', 12: 'EN VUELO', 13: 'EN VUELO', 14: 'EN VUELO',
  15: 'ATERRIZADO',
};

const K = ({ children }) => <span className="k">{children}</span>; // nombre de evento / comando
const S = ({ children }) => <span className="st">{children}</span>; // ESTADO

export const ANEXO = [
  /* ───────────────────────── PORTADA ───────────────────────── */
  {
    sec: 0, layout: 'cover', title: 'Sistema de Reservas de una Aerolínea',
    body: (
      <div className="cover">
        <div className="pass">
          <div className="pass-main">
            <div className="pass-top mono">
              <span>TARJETA DE EMBARQUE</span>
              <span>ARQUITECTURA DE SOFTWARE · v3.4</span>
            </div>
            <div className="route">
              <div>
                <div className="iata">REQ</div>
                <div className="mono dim">requisitos</div>
              </div>
              <svg className="plane" viewBox="0 0 120 24" aria-hidden="true">
                <path d="M2 12h100" stroke="currentColor" strokeDasharray="4 6" strokeWidth="2" />
                <path d="M96 4l20 8-20 8 4-8z" fill="currentColor" />
              </svg>
              <div>
                <div className="iata">ARQ</div>
                <div className="mono dim">arquitectura</div>
              </div>
            </div>
            <h1>Sistema de Reservas<br /><em>de una Aerolínea</em></h1>
            <p className="cover-sub">
              Microservicios orientados a eventos sobre AWS: vender cada asiento <b>una sola vez</b>, operar 24/7 y absorber los picos de Hot Sale.
            </p>
            <div className="pass-grid mono">
              <div><span>PASAJEROS</span>Carolina Cuero Guevara<br />Luis Alberto Girón<br />Nilson Aldair Molina Rengifo</div>
              <div><span>ORIGEN</span>Facultad de ingeniería y ciencias básicas</div>
              <div><span>DESTINO</span>Bogotá D.C. · 2026</div>
            </div>
          </div>
          <div className="pass-stub mono">
            <div><span>MARCO</span>ISO/IEC/IEEE 42010</div>
            <div><span>VISTAS</span>Rozanski &amp; Woods</div>
            <div><span>EA</span>TOGAF</div>
            <div className="barcode" aria-hidden="true" />
            <div className="dim">Pulse → para embarcar</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    sec: 0, title: 'Resumen ejecutivo', kicker: 'Resumen ejecutivo',
    body: (
      <>
        <Lead>
          Arquitectura del sistema de reservas de una aerolínea híbrida, con Avianca como caso de referencia. Primero se decidió construir <b>alrededor del PSS actual (Amadeus Altéa)</b> y reemplazar su inventario solo en una segunda etapa condicionada. Luego se evaluaron tres candidatas con una matriz ponderada que incluye el costo total y se eligieron los <b>microservicios orientados a eventos</b> (7,50 / 10), coordinados solo por <b>Apache Kafka</b>.
        </Lead>
        <Stats items={[
          { v: '0', l: 'dobles asignaciones', s: '100 solicitudes sobre un asiento → 1 confirmación' },
          { v: '99,9 %', l: 'disponibilidad mensual', s: 'máx. 43,8 min al mes, sin exclusiones por mantenimiento' },
          { v: '≈ 112 k', l: 'USD al mes, con el equipo', s: 'se paga si evita ≈ 8 h de caída total al año' },
          { v: '≤ 2 h', l: 'para volver a vender', s: 'si se pierde la región; ≤ 1 min de datos perdidos' },
        ]} />
        <Cards cols={3} items={[
          { tag: 'Asientos', t: 'Valkey coordina, PostgreSQL decide', d: 'Apartado con TTL en Valkey, verificación del token y confirmación condicional por estado y versión en PostgreSQL.' },
          { tag: 'Coordinación', t: 'Saga por Kafka + Outbox', d: 'Comandos y eventos con Outbox transaccional y consumidores idempotentes. HTTP solo en el borde.' },
          { tag: 'Plataforma', t: '100 % servicios administrados de AWS', d: 'EKS con Fargate, MSK, RDS PostgreSQL, DocumentDB, ElastiCache, S3 y Redshift; pilot light en us-west-2.' },
        ]} />
      </>
    ),
  },
  {
    sec: 0, title: 'Anexo: plan de vuelo completo', kicker: 'Anexo de respaldo',
    body: ({ ir, slides }) => (
      <div className="board board-2" role="table" aria-label="Anexo por sección">
        <div className="board-row board-headrow mono" role="row">
          <span>PUERTA</span><span>DESTINO</span><span className="hide-sm">DIAPOS</span><span>ESTADO</span>
        </div>
        {SECCIONES.filter((x) => x.n > 0).map((x) => {
          const desde = slides.findIndex((z) => z.sec === x.n);
          const n = slides.filter((z) => z.sec === x.n).length;
          const base = slides.findIndex((z) => z.parte === 'anexo');
          const num = (k) => `A${String(k - base + 1).padStart(2, '0')}`;
          return (
            <button key={x.n} className="board-row" role="row" onClick={() => ir(desde)}>
              <span className="mono gate">{x.code}</span>
              <span className="board-dest">{x.t}</span>
              <span className="mono dim hide-sm">{n > 1 ? `${num(desde)}–${num(desde + n - 1)}` : num(desde)}</span>
              <span className={`mono board-st st-${ESTADO_SEC[x.n].split(' ')[0].toLowerCase()}`}>{ESTADO_SEC[x.n]}</span>
            </button>
          );
        })}
      </div>
    ),
  },

  /* ───────────────────────── 1. INTRODUCCIÓN ───────────────────────── */
  {
    sec: 1, title: 'El problema: vender cada asiento una sola vez',
    body: (
      <Cols r="1.1fr 1fr">
        <div>
          <Lead>
            Una aerolínea híbrida combina la estructura de costos de una de bajo costo (tarifas desagregadas) con la complejidad de una tradicional: conexiones, GDS, venta interline y un programa de fidelización de gran escala.
          </Lead>
          <p>
            Se diseña una arquitectura que venda cada asiento una sola vez, esté disponible 24/7 y absorba los picos de las jornadas comerciales, integrando EDIFACT y NDC, la pasarela de pagos, la emisión de tiquetes y LifeMiles.
          </p>
          <div className="callout">
            <div className="callout-v">≈ USD 0,7 M</div>
            <div>de ingresos en riesgo <b>por cada hora</b> sin venta: 1.509 M USD por trimestre ÷ 2.208 horas. Es una aproximación: no todo lo que no se vende en una hora se pierde (sección 5.8).</div>
          </div>
        </div>
        <div>
          <h4 className="h4">Objetivo general</h4>
          <p className="muted">Diseñar y documentar una arquitectura que garantice la integridad del inventario, la disponibilidad continua, la trazabilidad financiera y la interoperabilidad con los canales de distribución.</p>
          <h4 className="h4">Objetivos específicos</h4>
          <List items={[
            <><b>OE1</b> Contexto, interesados, requisitos medibles, escenarios y arquitectura de negocio.</>,
            <><b>OE2</b> Evaluar tres candidatas con una matriz ponderada y justificar la elección.</>,
            <><b>OE3</b> Describir los puntos de vista funcional, de información, concurrencia, despliegue, desarrollo y operacional.</>,
            <><b>OE4</b> Modelo de datos, estados, concurrencia, idempotencia y compensación.</>,
            <><b>OE5</b> Perspectivas de seguridad, desempeño, disponibilidad y evolución; trazabilidad, supuestos y riesgos aceptados.</>,
          ]} />
        </div>
      </Cols>
    ),
  },
  {
    sec: 1, title: 'Fallas observadas en el caso y respuesta del diseño',
    body: (
      <>
        <T dense head={['Problema observado', 'Evidencia pública', 'Respuesta del diseño']} rows={[
          ['Reclamaciones y reembolsos', '1.410 de 2.247 quejas contra aerolíneas ante la SIC (63 %, 2020–2021); multa de la Supertransporte de 125 SMMLV por falta de canales idóneos (2022) [3], [4].', 'Cancelación y reembolso como flujo automático con estados y confirmación de la pasarela (6.4.3); trazabilidad (P3); meta M5: 95 % de reembolsos en ≤ 7 días.'],
          ['Venta detenida por completo', 'Página de reservas fuera de servicio un día (ago. 2018); venta suspendida hasta el 8 de diciembre de 2025 por la flota A320 [5], [6].', 'Clases de servicio y modo solo consulta aplicable por vuelo, ruta o canal, sin detener búsqueda ni postventa (14.1.1).'],
          ['Caídas de LifeMiles', 'Sitio inutilizable y call center sin poder crear ni modificar reservas (dic. 2019) [7].', 'Perfil y Fidelización aislado: su caída no detiene la venta con dinero (escenario 12).'],
          ['Proveedores sin contingencia', 'Notificaciones por WhatsApp y correo caídas por la falla global de Azure (oct. 2025) [8].', 'Notificaciones asíncronas que esperan en Kafka (clase C) y recuperación regional propia (14.1.4).'],
          ['Cambio de distribución', 'Venta de agencias concentrada en EDIFACT; NDC de terceros suspendido (dic. 2025) [9].', 'Capa de Integración con modelo canónico que soporta ambos protocolos (6.3.1).'],
        ]} />
        <p className="note">Varias de esas fallas fueron decisiones operativas o coincidieron con la pandemia y problemas de liquidez, que ninguna arquitectura resuelve. Lo que sí está a su alcance es lo que muestran: <b>no había canales trazables para reclamar</b> y el negocio solo tenía <b>un interruptor global de venta</b>.</p>
      </>
    ),
  },
  {
    sec: 1, title: 'Alcance, metodología y marcos',
    body: (
      <>
        <Cols>
          <div className="panel ok">
            <h4 className="h4">Dentro del alcance</h4>
            <List items={['Búsqueda de itinerarios', 'Reservas multi-segmento y multi-pasajero', 'Cotización con recargo por canal', 'Apartado temporal de asientos', 'Pago con tarjeta (pasarela) y con millas', 'Emisión de tiquetes, cancelación y reembolso', 'Notificaciones, integración GDS, histórico y analítica', 'Operación: instalación, migración, soporte y respaldo']} cols={2} />
          </div>
          <div className="panel bad">
            <h4 className="h4">Fuera del alcance</h4>
            <List items={['Check-in, embarque, equipaje, operación de vuelo', 'Tripulación', 'Overbooking deliberado y revenue management', 'Pago mixto (dinero + millas)', 'Inventario por clase de reserva', 'Integración real con Star Alliance', 'Ejecución real de pruebas de carga (las PoC se diseñan, no se ejecutan)']} cols={2} />
          </div>
        </Cols>
        <Cards cols={4} small items={[
          { tag: 'Descripción', t: 'IEEE 1471 / ISO 42010', d: 'Estructura: control, resumen, alcance, principios, vistas y escenarios.' },
          { tag: 'Vistas', t: 'Rozanski & Woods', d: 'Seis puntos de vista y cuatro perspectivas: seguridad, desempeño, disponibilidad y evolución.' },
          { tag: 'Empresa', t: 'TOGAF · ITIL · COBIT', d: 'Dominios, ADM y gobernanza; operación por prácticas de ITIL; controles de COBIT 2019.' },
          { tag: 'Notación', t: 'UML · ArchiMate · BPMN', d: 'Mermaid para UML, Archi para negocio, Bizagi para el proceso.' },
        ]} />
        <p className="note"><b>Doble asignación</b> (error técnico que el diseño impide) ≠ <b>overbooking</b> (práctica comercial, fuera del alcance). El <b>apartado</b> es la reserva temporal de un asiento mientras el cliente paga.</p>
      </>
    ),
  },
  {
    sec: 1, title: 'Nueve principios arquitectónicos',
    body: (
      <Cards cols={3} small items={[
        { tag: 'P1', t: 'Un asiento, una fuente de verdad', d: 'Solo Inventario confirma asientos; Valkey coordina, PostgreSQL decide.', tone: 'amber' },
        { tag: 'P2', t: 'Cada servicio es dueño de sus datos', d: 'Sin bases compartidas ni FK entre servicios; referencias por id.' },
        { tag: 'P3', t: 'Todo cambio relevante produce un evento', d: 'Outbox transaccional; el histórico conserva los eventos.' },
        { tag: 'P4', t: 'Toda operación con efectos es idempotente', d: 'Claves de idempotencia en solicitudes, comandos, pagos y millas.' },
        { tag: 'P5', t: 'Degradar antes que caer', d: 'Perfil, notificaciones y emisión se degradan; la redención de millas no.' },
        { tag: 'P6', t: 'Servicios administrados primero', d: 'Todo en AWS administrado; se acepta la dependencia del proveedor.' },
        { tag: 'P7', t: 'Seguridad por defecto', d: 'Sin datos de tarjeta; cifrado en tránsito y reposo; roles mínimos.' },
        { tag: 'P8', t: 'Toda decisión se traza a una meta', d: 'Cada decisión aparece en la matriz de trazabilidad.' },
        { tag: 'P9', t: 'Entre servicios, solo Kafka', d: 'Sin llamadas síncronas internas; HTTP solo en el borde.', tone: 'teal' },
      ]} />
    ),
  },

  /* ───────────────────────── 2. CONTEXTO ───────────────────────── */
  {
    sec: 2, title: 'Avianca en cifras: los datos que dimensionan el diseño',
    body: (
      <>
        <Stats items={[
          { v: '38 M', l: 'pasajeros en 2024', s: '≈ 37 M en 2025 · 9,7 M en el 3T 2025' },
          { v: '700+', l: 'vuelos diarios', s: '155+ rutas · 140 aeronaves' },
          { v: 'USD 1.509 M', l: 'ingresos operativos 3T 2025', s: 'impacto económico de una caída' },
          { v: '+21 %', l: 'pico de consultas', s: 'Cyberlunes y Hot Sale (dato del caso)' },
        ]} />
        <Stats items={[
          { v: '16 M', l: 'socios LifeMiles', s: 'dimensiona Perfil y Fidelización' },
          { v: '2,8 M', l: 'pasajeros con millas en 2025', s: 'libro de movimientos' },
          { v: '≈ 7.700', l: 'redenciones por día', s: 'justifica PostgreSQL para el saldo' },
        ]} />
        <p className="note">Tras su reestructuración, la compañía adoptó una estructura de bajo costo con tarifas desagregadas y mantuvo la operación de una aerolínea tradicional. Fuentes y estado de verificación en el Anexo A.</p>
      </>
    ),
  },
  {
    sec: 2, title: 'Distribución, fidelización y alianza',
    body: (
      <Cols r="1fr 1fr 0.8fr">
        <div className="panel">
          <Pill tone="amber">GDS</Pill>
          <h4 className="h4">EDIFACT y NDC conviven</h4>
          <p>Avianca fue pionera en NDC en América Latina (Sabre y Amadeus). Desde febrero de 2026 concentra la distribución a agencias en <b>EDIFACT</b> y suspende el NDC de terceros vía Avianca SYNC.</p>
          <p className="muted">Requisito: la Capa de Integración soporta EDIFACT como canal principal, mantiene NDC para socios y aplica recargos por canal, todo traducido a un modelo canónico.</p>
        </div>
        <div className="panel">
          <Pill tone="teal">LifeMiles</Pill>
          <h4 className="h4">Tres tipos de interacción</h4>
          <List items={[
            <><b>Consulta de perfil:</b> degradable. Si falla, la reserva en dinero sigue sin personalización.</>,
            <><b>Acumulación:</b> asíncrona, al emitir el tiquete (<K>TiqueteEmitido</K>) y se revierte con <K>TiqueteAnulado</K>.</>,
            <><b>Redención:</b> paso crítico de la Saga, no degradable: bloqueo, confirmación o liberación.</>,
          ]} />
          <p className="muted">La cuenta de millas y la redención pasan a ser parte del sistema (la caída de 2019 dejó sin reservas el canal telefónico); la plataforma comercial de LifeMiles queda fuera. Perfil en DocumentDB, cuenta y libro de millas en PostgreSQL.</p>
        </div>
        <div className="panel">
          <Pill tone="violet">Star Alliance</Pill>
          <h4 className="h4">Previsto, no construido</h4>
          <p>Se deja previsto un adaptador en la Capa de Integración que usaría la misma Saga y las mismas garantías. La integración real está fuera de esta versión.</p>
        </div>
      </Cols>
    ),
  },

  /* ───────────────────────── 3. INTERESADOS ───────────────────────── */
  {
    sec: 3, title: 'Interesados: preocupación, poder e interés',
    body: (
      <>
        <Cards cols={4} small items={[
          { tag: 'Poder medio · interés alto', t: 'Pasajero', d: 'Facilidad de uso, precios transparentes, disponibilidad en tiempo real. (6.4, 13.2)' },
          { tag: 'Poder bajo · interés alto', t: 'Agente de aeropuerto o call center', d: 'Herramientas rápidas; resolver cambios y reembolsos. (6.4.3)' },
          { tag: 'Poder medio · interés alto', t: 'Administrador de sistemas', d: 'Disponibilidad 24/7, seguridad, mantenimiento y monitoreo distribuido. (9, 12)' },
          { tag: 'Poder medio · interés alto', t: 'Equipo de desarrollo', d: 'Módulos claros, contratos estables, entornos reproducibles, pruebas. (11)' },
          { tag: 'Poder alto · interés alto', t: 'Gerencia comercial', d: 'Reportes y analítica desde el almacén histórico; el revenue management usa esos datos, pero queda fuera. (5.8, 10.3)', tone: 'amber' },
          { tag: 'Poder bajo · interés medio', t: 'Check-in o embarque', d: 'Estado final y vigente de la reserva y del tiquete. (6.3.1)' },
          { tag: 'Poder alto · interés medio', t: 'Socios interline o GDS', d: 'Interoperabilidad estricta con IATA NDC y EDIFACT. (2.2, 6.3.1)', tone: 'amber' },
          { tag: 'Poder alto · interés medio', t: 'Cumplimiento o auditoría', d: 'Trazabilidad financiera total y protección de datos personales. (9.5, 13.1)', tone: 'amber' },
        ]} />
        <p className="note">Cada interesado aparece también como rol en la arquitectura de negocio (Figura 4). Entre paréntesis, la sección que atiende su preocupación.</p>
      </>
    ),
  },
  {
    sec: 3, title: 'Contexto del sistema y operaciones',
    body: (
      <Cols r="1.15fr 1fr">
        <Fig id="1" />
        <div>
          <h4 className="h4">Qué hace el sistema</h4>
          <List items={[
            <><b>Buscar itinerarios:</b> Búsqueda sobre un modelo de lectura actualizado por eventos.</>,
            <><b>Reservar con dinero:</b> Saga por Kafka con apartado, autorización, confirmación condicional y captura.</>,
            <><b>Reservar con millas:</b> bloqueo, confirmación o liberación en Perfil y Fidelización.</>,
            <><b>Cancelar y reembolsar:</b> libera asientos, anula tiquetes, reembolso confirmado por la pasarela.</>,
            <><b>Actualizar pasajero:</b> <K>ReservaModificada</K>; si ya hay tiquete, se reemite.</>,
            <><b>Transferir reserva:</b> cambio con cargo vía <K>CotizarCambio</K>, cobro y reemisión.</>,
            <><b>Mejora de categoría:</b> cotiza la diferencia, aparta el asiento nuevo, cobra y libera el anterior.</>,
          ]} />
        </div>
      </Cols>
    ),
  },
  {
    sec: 3, title: 'Requisitos de calidad medibles',
    body: (
      <T dense head={['Propiedad', 'Objetivo medible', 'Mecanismo']} rows={[
        ['Integridad del inventario', 'Cero dobles asignaciones; 100 solicitudes simultáneas sobre un asiento → exactamente 1 confirmación.', 'Apartado en Valkey + confirmación condicional por estado y versión en PostgreSQL.'],
        ['Disponibilidad', '99,9 % mensual de la creación de reservas y la búsqueda (máx. 43,8 min), sin exclusiones por mantenimiento.', 'Activo-activo en 3 zonas, bases Multi-AZ, despliegues sin interrupción.'],
        ['Tiempo de respuesta', 'p95: búsqueda ≤ 2 s; aceptación 202 ≤ 1 s; asientos apartados visibles ≤ 3 s, con carga nominal y con pico.', 'Modelo de lectura, escalado selectivo, Saga asíncrona.'],
        ['Throughput en picos', 'Sostener el 121 % de la carga nominal sin perder solicitudes. Nominal: 1.850 búsquedas y 6 reservas/s; pico: 2.240 y 7,3; capacidad de diseño: 3.000 y 30.', 'Escalado horizontal por servicio; Búsqueda desacoplada.'],
        ['Consistencia', 'p99 de propagación de eventos < 2 s.', 'Outbox y consumidores idempotentes.'],
        ['Seguridad y datos', '0 datos de tarjeta; PCI-DSS v4.0.1 con tokenización; Ley 1581 de 2012.', 'Tokenización, cifrado, autenticación en el Gateway.'],
        ['Trazabilidad', '100 % de cambios financieros con evento inmutable; 10 años.', 'Almacén histórico y estados con historial.'],
        ['Interoperabilidad', 'Certificación con Amadeus y Sabre; 100 % de pruebas de contrato en verde.', 'Capa de Integración con modelo canónico.'],
        ['Operabilidad', 'Detectar un P1 en ≤ 5 min; 100 % de servicios con trazas, métricas y logs.', 'Observabilidad y vigilancia de colas de mensajes fallidos.'],
      ]} />
    ),
  },
  {
    sec: 3, title: 'Escenarios de calidad',
    body: (
      <Cards cols={4} small items={[
        { tag: 'EC1 · Pico de Hot Sale', t: 'Búsquedas al 121 % en minutos', d: 'Búsqueda escala; la reserva no se degrada. Cero 5xx por saturación.', tone: 'amber' },
        { tag: 'EC2 · Asiento disputado', t: '100 clientes, un asiento', d: 'Solo una reserva confirma; se compensan los demás pagos. Cero cobros sin asiento.', tone: 'amber' },
        { tag: 'EC3 · Cae una zona', t: 'Una AZ de AWS no responde', d: 'Las otras zonas atienden, las bases conmutan. ≤ 2 min, cero reservas perdidas.' },
        { tag: 'EC4 · Pasarela lenta', t: '> 60 s sin respuesta', d: 'Pago EN_VERIFICACION; la reserva no expira; se concilia por webhook o consulta.' },
        { tag: 'EC5 · Abuso', t: 'Miles de solicitudes por minuto', d: 'Gateway y WAF limitan y bloquean; los legítimos mantienen sus percentiles.' },
        { tag: 'EC6 · Despliegue con error', t: 'Nueva versión de Tarifas', d: 'El canary (1 pod: del 25 % al 33 % de las particiones) detecta la alarma y revierte en ≤ 10 min; como máximo un tercio de las cotizaciones afectadas, reprocesadas desde la DLQ.' },
        { tag: 'EC7 · Auditoría', t: 'Pago de hace tres años', d: 'El histórico entrega todos los eventos del pago y su reserva en < 1 día hábil.' },
      ]} />
    ),
  },

  /* ───────────────────────── 4. NEGOCIO ───────────────────────── */
  {
    sec: 4, title: 'Cadena de valor, modelo operativo y estrategia',
    body: (
      <Cols r="0.9fr 1.1fr">
        <div>
          <div className="chain">
            {['Marketing y tarifas', 'Reserva y venta', 'Check-in y embarque', 'Operación de vuelo', 'Postventa: millas, reembolsos, reclamos'].map((x, k) => (
              <div key={x} className={`chain-step${k === 1 || k === 4 ? ' on' : ''}`}><span className="mono">{k + 1}</span>{x}</div>
            ))}
          </div>
          <p className="muted">Actividades de apoyo: tecnología, gestión de flota y tripulaciones, finanzas y cumplimiento.</p>
        </div>
        <div>
          <p>El sistema cubre la <b>reserva, la venta y la emisión</b>, y la parte de la <b>postventa que nace de una reserva</b> (cambios, cancelaciones, reembolsos y millas). Es en esa postventa donde hoy se pierde valor, por las reclamaciones y sanciones. Entrega el estado de los tiquetes y la lista de pasajeros al check-in y recibe reglas de precios de marketing.</p>
          <p><b>Modelo operativo:</b> inventario centralizado (un pool de asientos por vuelo para web, app, call center, agencias y GDS) y atención descentralizada. Por eso la alta disponibilidad y la consistencia son requisitos de negocio.</p>
          <div className="callout">
            <div className="callout-v">Estrategia</div>
            <div>Propósito de Avianca: generar más acceso al transporte aéreo [32]. El sistema sostiene esa estrategia: competir con estructura de bajo costo sin perder la red, los GDS ni la fidelización de una aerolínea tradicional.</div>
          </div>
        </div>
      </Cols>
    ),
  },
  {
    sec: 4, title: 'Controladores, metas con indicador y requisitos',
    body: (
      <Cols r="1.25fr 1fr">
        <Fig id="2" />
        <div>
          <T dense head={['Meta', 'Indicador (KPI)', 'Controlador']} rows={[
            ['M1 · Ingreso por asiento', '0 min de inactividad por cambio de tarifa', 'D1 competencia de bajo costo'],
            ['M2 · Sin doble asignación', '0 casos al año', 'D2 volumen de pasajeros'],
            ['M3 · Venta 24/7 en picos', '99,9 % de disponibilidad mensual', 'D2 y D3 varios países y husos'],
            ['M4 · Estándares del sector', '100 % de mensajes certificados con Amadeus y Sabre', 'D4 EDIFACT y NDC'],
            ['M5 · Pagos y datos confiables', '0 fugas, ROC de PCI-DSS vigente y 95 % de reembolsos en ≤ 7 días (línea base 2022: 90 % en < 30 días)', 'D5 datos, PCI-DSS y derechos del pasajero'],
            ['M6 · Fidelizar con millas', '99 % de redenciones sin error', 'D6 16 M socios LifeMiles'],
          ]} />
          <p className="muted">Las líneas base que no son públicas se miden en los tres meses previos a la etapa 1; las metas se evalúan doce meses después del corte por canal. Toda decisión técnica se rastrea hasta una meta (P8).</p>
        </div>
      </Cols>
    ),
  },
  {
    sec: 4, title: 'Mapa de capacidades de negocio',
    body: (
      <Cols r="1.5fr 0.7fr">
        <Fig id="3" />
        <div>
          <Lead>Las capacidades describen <b>qué</b> hace la aerolínea, con independencia de <b>cómo</b>: son más estables que los procesos.</Lead>
          <p>Cada capacidad de venta se asigna al componente que la soporta. Ese mapeo da la frontera de cada microservicio.</p>
          <p className="muted">En gris, las capacidades de sistemas vecinos fuera del alcance: programación de vuelos y check-in, embarque y equipaje.</p>
        </div>
      </Cols>
    ),
  },
  {
    sec: 4, title: 'Vista de arquitectura de negocio (ArchiMate)',
    body: (
      <>
        <Cols>
          <Fig id="4a" />
          <Fig id="4b" />
        </Cols>
        <p className="note">Conecta, de arriba abajo, para qué existe el negocio (controladores y metas), qué procesos lo realizan, qué servicios entrega (venta y distribución de tiquetes; fidelización LifeMiles) y los ocho roles. Modelo disponible en <Code>modelos/figura-04-arquitectura-de-negocio.xml</Code> para Archi.</p>
      </>
    ),
  },
  {
    sec: 4, title: 'Proceso de reservar un tiquete (BPMN)',
    body: (
      <Cols r="1.7fr 0.7fr">
        <Fig id="5" />
        <div>
          <h4 className="h4">El orden es una decisión de diseño</h4>
          <ol className="steps">
            <li>Primero, los pasos <b>sin efectos</b>: cotizar y verificar disponibilidad.</li>
            <li>Después se <b>aparta</b> el asiento.</li>
            <li>Solo entonces se <b>autoriza</b> el pago.</li>
          </ol>
          <p>Así se reducen las compensaciones necesarias.</p>
          <p className="muted">Caminos de falla modelados: sin disponibilidad, pago rechazado, conflicto al confirmar y vencimiento.</p>
        </div>
      </Cols>
    ),
  },

  /* ───────────────────────── 5. CANDIDATAS ───────────────────────── */
  {
    sec: 5, title: 'Contexto actual (AS-IS) y brechas',
    body: (
      <Cols r="1fr 1fr">
        <div>
          <h4 className="h4">AS-IS (paso 3 de la selección de estilos)</h4>
          <List items={[
            <><b>Sistemas:</b> reservas, inventario, check-in, embarque y control de salidas corren en el PSS <b>Amadeus Altéa</b>, alojado por Amadeus (acuerdo renovado en 2021). Distribución por GDS con EDIFACT; web y app propias; LifeMiles con plataforma propia.</>,
            <><b>Equipo:</b> sin datos públicos. Se supone experiencia en Amadeus y canales digitales, pero no operando microservicios (riesgo DevOps).</>,
            <><b>Costos:</b> no son públicos; un PSS se cobra por pasajero embarcado o segmento, así que crece con el volumen.</>,
            <><b>Restricciones:</b> operación sin interrupción, solo servicios administrados de AWS (P6), PCI-DSS y datos personales, y convivencia con el actual durante la transición.</>,
          ]} />
        </div>
        <div>
          <h4 className="h4">Brechas AS-IS → TO-BE</h4>
          <T dense head={['Dominio', 'Hoy', 'Propuesta']} rows={[
            ['Negocio', 'La postventa genera reclamaciones y sanciones', 'Flujo automático y trazable'],
            ['Datos', 'Repartidos entre proveedores, sin historial propio', 'Un dueño por servicio y almacén histórico'],
            ['Aplicaciones', 'Una contingencia apaga toda la venta', 'Servicios aislados con degradación por partes'],
            ['Tecnología', 'Proveedores sin contingencia', 'Recuperación regional propia'],
            ['Gobernanza', 'Sin seguimiento de metas', 'Comités con el negocio y metas M1–M6'],
          ]} />
        </div>
      </Cols>
    ),
  },
  {
    sec: 5, title: 'Alternativa 0 frente al PSS y hoja de ruta por etapas',
    body: (
      <>
        <Lead>Antes de elegir el estilo se decide <b>qué se construye</b>: comprar (seguir con Altéa), construir alrededor de él o reemplazarlo.</Lead>
        <Cards cols={3} items={[
          { tag: 'Alternativa 0 · descartada', t: 'Seguir con Altéa y construir solo los canales', d: 'No resuelve las fallas observadas, que están en la postventa, los canales y la dependencia de proveedores sin contingencia.', tone: 'red' },
          { tag: 'Etapa 1 · adoptada', t: 'Construir alrededor del PSS', d: 'Venta, postventa, pagos y fidelización propios; Altéa sigue como inventario. Ataca las fallas sin el riesgo de migrar el inventario.', tone: 'teal' },
          { tag: 'Etapa 2 · condicionada', t: 'Inventario propio por lotes de vuelos', d: 'Solo si la etapa 1 cumple sus metas durante tres meses y la aerolínea se certifica ante los GDS como anfitrión de su inventario. Puede detenerse o revertirse.', tone: 'amber' },
        ]} />
        <p className="note">La etapa 2 se justifica por negocio, no por fallas: fijar precios y servicios complementarios por asiento sin depender del ciclo de cambios del proveedor y dejar de pagar un PSS cuyo costo crece con cada pasajero. En ambas etapas <b>Altéa conserva el check-in y el control de salidas</b>, que reciben la lista de pasajeros por mensajes IATA <b>PNL y ADL</b> desde la Capa de Integración.</p>
      </>
    ),
  },
  {
    sec: 5, title: 'Tres arquitecturas candidatas',
    body: (
      <Cards cols={3} items={[
        { tag: 'Candidata A', t: 'Monolito modular', d: <><p>Una aplicación desplegable sobre una base SQL con transacciones ACID.</p><p className="pro">+ Integridad muy alta, baja latencia, operación simple, costo bajo con volúmenes medios.</p><p className="con">− Un fallo afecta a todo, escala como unidad, el código se acopla.</p></> },
        { tag: 'Candidata B', t: 'Microservicios con Kafka', tone: 'amber', d: <><p>Servicios por dominio, cada uno con su base, comunicados por eventos con Saga y Outbox.</p><p className="pro">+ Aislamiento de fallos (si cae Fidelización, se sigue vendiendo con dinero), escalado independiente, equipos autónomos.</p><p className="con">− Complejidad operativa, mayor costo, latencia por saltos (mitigada con modelo de lectura y 202).</p></> },
        { tag: 'Candidata C', t: 'Serverless', d: <><p>Lambda, Step Functions, EventBridge y DynamoDB con escrituras condicionales.</p><p className="pro">+ Redundancia y escalado automáticos, sin servidores; infraestructura más barata que B a estos volúmenes.</p><p className="con">− Conciliación y auditoría del inventario más difíciles (sin consultas relacionales), arranques en frío, lógica fragmentada y difícil de probar.</p></> },
      ]} />
    ),
  },
  {
    sec: 5, title: 'Matriz de decisión ponderada',
    body: (
      <Cols r="1.3fr 0.9fr">
        <T head={['Criterio', 'Peso', 'A', 'B', 'C']} rows={[
          ['Disponibilidad y tolerancia a fallos', '25 %', '5', <b className="hi">9</b>, '8'],
          ['Escalabilidad y throughput en picos', '20 %', '4', <b className="hi">9</b>, <b className="hi">9</b>],
          ['Integridad del inventario', '15 %', <b className="hi">9</b>, '7', '6'],
          ['Tiempo de respuesta', '10 %', <b className="hi">8</b>, '7', '6'],
          ['Mantenibilidad y evolución', '10 %', '5', <b className="hi">8</b>, '7'],
          ['Complejidad operativa (10 = menor)', '10 %', <b className="hi">9</b>, '4', '6'],
          ['Costo total: infra + equipo (10 = menor)', '10 %', <b className="hi">8</b>, '5', '6'],
        ]} />
        <div>
          <div className="bars">
            {[['A · Monolito', 6.4], ['B · Microservicios', 7.5], ['C · Serverless', 7.2]].map(([l, v]) => (
              <div key={l} className={`bar${v === 7.5 ? ' win' : ''}`}>
                <div className="bar-l"><span>{l}</span><b className="mono">{v.toFixed(2).replace('.', ',')}</b></div>
                <div className="bar-t"><span style={{ width: `${v * 10}%` }} /></div>
              </div>
            ))}
          </div>
          <p><b>Disponibilidad y picos</b>, los dos requisitos críticos, suman el 45 % del peso. <b>Rúbrica:</b> 9–10 si cumple por diseño, 6–8 con mecanismos adicionales, 4–5 con dificultad; el costo sale de la sección 5.8.</p>
          <p className="muted"><b>Sensibilidad:</b> disponibilidad 15 % y complejidad 20 % → A 6,80, B 7,00, C 7,00. Integridad 25 % → A 6,85, B 7,30, C 6,95. B nunca queda por debajo, pero su ventaja sobre C depende del peso de la operación. La integridad pesa 15 % porque las tres pueden garantizarla; cambia el esfuerzo.</p>
        </div>
      </Cols>
    ),
  },
  {
    sec: 5, title: 'Decisión: Candidata B y sus estilos',
    body: (
      <Cols r="1fr 1.1fr">
        <div>
          <Lead>Se elige B (7,50). Un monolito sostiene con dificultad la disponibilidad 24/7 y los picos: un único punto de falla, escalado vertical costoso y despliegues que arriesgan todo.</Lead>
          <p>Frente a C, B ofrece más control sobre la integridad del inventario (transacciones de PostgreSQL sobre todos los asientos de una reserva), latencias más predecibles y una lógica de reserva más fácil de probar y de seguir, <b>a cambio de un costo de infraestructura mayor</b> (sección 5.8).</p>
        </div>
        <Cards cols={1} small items={[
          { tag: 'Principal', t: 'Microservicios con publicación/suscripción', d: 'Servicios por dominio que publican y consumen eventos en Kafka. Aislamiento y escalado independiente, a cambio de consistencia eventual.', tone: 'amber' },
          { tag: 'Subsidiario', t: 'Hub de integración (hub-and-spoke)', d: 'La Capa de Integración es el único contacto con EDIFACT, NDC, aliados y Altéa (PNL/ADL). Excepción: Control de Vuelos deja la programación en S3 (SSIM).' },
          { tag: 'Subsidiario', t: 'Multicapa', d: 'Canales, entrada, negocio, mensajería y datos, en un solo sentido.' },
          { tag: 'Subsidiario', t: 'Cliente-servidor', d: 'Entre los canales y el API Gateway.' },
          { tag: 'Subsidiario', t: 'Hexagonal', d: 'Dentro de cada servicio, puertos y adaptadores aíslan el dominio.' },
        ]} />
      </Cols>
    ),
  },
  {
    sec: 5, title: 'Autocrítica y mitigaciones',
    body: (
      <>
        <Cards cols={2} items={[
          { tag: 'Debilidad', t: 'Consistencia distribuida frente a la doble asignación', d: 'Reservas e Inventario son procesos separados. Mitigación: consistencia fuerte interna en Inventario (CAS por versión), apartado en Valkey y Saga con compensaciones.', tone: 'red' },
          { tag: 'Debilidad', t: 'Complejidad operativa', d: 'Más despliegues, monitoreo y red. Mitigación: EKS con Fargate, MSK y RDS administrados, observabilidad, CI/CD y bases lógicas agrupables al inicio.', tone: 'red' },
          { tag: 'Debilidad', t: 'Latencia acumulada', d: 'Cada salto por Kafka suma milisegundos. Mitigación: respuesta 202 inmediata, presupuesto de latencia y modelo de lectura.', tone: 'red' },
          { tag: 'Debilidad', t: 'Curva de aprendizaje y costo inicial', d: 'Para un equipo pequeño, el monolito entregaría valor antes. Es el principal argumento en contra: sin madurez operativa, A sería legítima.', tone: 'red' },
        ]} />
        <p className="note"><b>Revalidación:</b> se mantiene B porque la disponibilidad pesa más que la simplicidad. Un fallo de Tarifas no detiene la reserva; los picos se absorben escalando solo el servicio afectado. El costo de la complejidad baja con la madurez; el de escalar un monolito crece con el negocio.</p>
      </>
    ),
  },
  {
    sec: 5, title: 'Análisis DOFA de la arquitectura elegida',
    body: (
      <Cols r="1fr 1fr">
        <div className="dofa">
          <div className="dofa-q f"><b>Fortalezas</b><List items={['Escalabilidad horizontal por módulo', 'Picos aislados en Búsqueda', 'EDIFACT y NDC con un modelo canónico', 'Redenciones masivas no frenan la venta']} /></div>
          <div className="dofa-q d"><b>Debilidades</b><List items={['Consistencia distribuida con Saga', 'Latencia acumulada de red', 'Alta dependencia de madurez DevOps']} /></div>
          <div className="dofa-q o"><b>Oportunidades</b><List items={['Expansión de rutas (+38 M pax/año)', 'Tarifas dinámicas por tallas XS–L', 'Star Alliance con un nuevo adaptador']} /></div>
          <div className="dofa-q a"><b>Amenazas</b><List items={['Alto impacto financiero de las caídas', 'Irregularidades masivas simultáneas', 'Adopción lenta de NDC']} /></div>
          <p className="muted" style={{ gridColumn: '1 / -1', margin: 0 }}>Las debilidades se mitigan en la autocrítica (5.4); las oportunidades se apoyan en los puntos de variación (14.2) y las amenazas justifican la perspectiva de disponibilidad (14.1).</p>
        </div>
        <Fig id="6T" />
      </Cols>
    ),
  },
  {
    sec: 5, title: 'Validación técnica y alineación estratégica',
    body: (
      <>
        <T dense head={['Prueba de concepto', 'Qué se valida', 'Criterio de éxito']} rows={[
          ['PoC1 · Apartado bajo contención', '100 a 1.000 solicitudes simultáneas sobre un asiento en ElastiCache y RDS.', 'Exactamente 1 confirmación; p99 del apartado < 20 ms.'],
          ['PoC2 · Recuperación de la Saga', 'Detener un pod de Reservas a mitad de una Saga.', 'Otra instancia toma sus particiones; cero duplicados.'],
          ['PoC3 · Traducción EDIFACT', 'Adaptador contra el entorno de pruebas de un GDS, esperando el resultado asíncrono.', 'Mensajes de disponibilidad y reserva aceptados.'],
          ['PoC4 · Pico del 121 %', 'Prueba de carga con k6 en staging.', 'Percentiles de la Tabla 3 cumplidos.'],
          ['PoC5 · Latencia de la Saga', 'Aceptación → apartado confirmado con MSK en tres zonas.', 'p95 < 3 s.'],
        ]} />
        <Cards cols={3} small items={[
          { tag: 'TOGAF', t: 'Dominios y gobernanza', d: 'Negocio, datos, aplicaciones y tecnología.' },
          { tag: 'ITIL', t: 'Operación', d: 'Incidentes, problemas, cambios y configuración.' },
          { tag: 'COBIT', t: 'Control', d: 'Decisiones, riesgos y controles auditables.' },
        ]} />
      </>
    ),
  },
  {
    sec: 5, title: 'Supuestos externos y riesgos aceptados',
    body: (
      <Cols>
        <div>
          <h4 className="h4">Tres condiciones que el equipo no controla</h4>
          <Cards cols={1} small items={[
            { tag: 'Supuesto 1', t: 'La pasarela separa autorización y captura', d: 'Y entrega webhooks firmados. Si un medio no separa los pasos, la compensación es un reembolso.' },
            { tag: 'Supuesto 2', t: 'La pasarela aloja la captura de la tarjeta', d: 'Página, componente o enlace de pago: el sistema nunca recibe el número de tarjeta.' },
            { tag: 'Supuesto 3', t: 'Los GDS esperan el resultado de la Saga', d: 'Dentro de su sesión. Se comprueba con la PoC3.' },
          ]} />
        </div>
        <div>
          <h4 className="h4">Riesgos aceptados explícitamente</h4>
          <Cards cols={1} small items={[
            { t: 'Complejidad operativa de los microservicios', d: 'Mitigada con servicios administrados y automatización.', tone: 'red' },
            { t: 'AWS como proveedor único', d: 'Mitigada con estándares abiertos: Kafka, PostgreSQL, API de MongoDB y contenedores.', tone: 'red' },
            { t: 'Hasta 2 s de consistencia eventual en la búsqueda', d: 'La reserva siempre verifica la disponibilidad en Inventario.', tone: 'red' },
            { t: 'Si cae la región: hasta 1 min de datos y 2 h sin venta', d: 'Acotados con el pilot light en us-west-2 (14.1.4).', tone: 'red' },
          ]} />
        </div>
      </Cols>
    ),
  },
  {
    sec: 5, title: 'Costo y beneficio',
    body: (
      <Cols r="1.1fr 1fr">
        <div>
          <T dense head={['USD al mes', 'A · Monolito', 'B · Microservicios', 'C · Serverless']} rows={[
            ['Infraestructura', '≈ 6.500 + 1.500 contingencia', '≈ 10.000 + 2.000 pilot light', '≈ 6.000 + 1.500 contingencia'],
            ['Equipo (5.000 por persona)', '12 personas · 60.000', '20 personas · 100.000', '16 personas · 80.000'],
            [<b>Costo total</b>, <b className="hi">≈ 68.000</b>, <b>≈ 112.000</b>, <b>≈ 87.500</b>],
          ]} />
          <p className="muted">B: tres equipos de producto (venta; pagos y postventa; integración y fidelización) y uno de plataforma de cuatro personas que opera EKS, MSK, la observabilidad y el pipeline. Precios de lista de us-east-1 con la carga nominal; orden de magnitud a confirmar con la calculadora de AWS. El orden A &lt; C &lt; B es el que reflejan los puntajes de costo (8, 6, 5). En la etapa 1 B cuesta menos, porque el inventario sigue en Altéa.</p>
        </div>
        <div>
          <div className="callout">
            <div className="callout-v">≈ 8 h</div>
            <div>de caída total evitada al año pagan los <b>44.000 USD/mes</b> que B cuesta más que A (528.000 al año).</div>
          </div>
          <List items={[
            <><b>Pérdida por hora sin venta:</b> 0,7 M USD en riesgo; se supone que se pierde el 10 % (los demás compran después): ≈ 68.000 USD por hora.</>,
            <><b>Frente a A:</b> con un monolito al 99,5 % (cualquier fallo detiene toda la venta) caería ≈ 44 h al año frente a &lt; 9 h de B al 99,9 %. B evitaría ≈ 35 h, unos <b>2,4 M USD al año</b>, cuatro veces su costo adicional.</>,
            <><b>Frente a C:</b> B cuesta ≈ 24.500 USD/mes más, a cambio de control sobre la integridad del inventario y una lógica de reserva fácil de probar.</>,
          ]} />
          <p className="muted">Supuestos del equipo, a validar con la aerolínea (Anexo A).</p>
        </div>
      </Cols>
    ),
  },

  /* ───────────────────────── 6. ARQUITECTURA PROPUESTA ───────────────────────── */
  {
    sec: 6, title: 'Decisiones de diseño (1/2): coordinación y datos',
    body: (
      <T dense head={['Decisión', 'Por qué', 'Riesgo o alternativa descartada']} rows={[
        ['Microservicios por dominio, base lógica propia', 'Aislamiento de fallos y escalado independiente (P2).', 'Complejidad. Tarifas, Emisión y Notificaciones comparten instancia al inicio; Pagos, Inventario, Reservas y Fidelización tienen instancia propia.'],
        [<b className="hi">Kafka como único medio entre servicios</b>, 'Si Inventario o Pagos se detienen, sus comandos esperan en el tópico. Registro completo y ordenado de la coordinación (P3).', 'Más latencia por paso que REST; REST síncrono acopla la disponibilidad. Frente a SQS/SNS (sin historial para reproducir) y EventBridge (sin orden por clave).'],
        ['Saga orquestada por Reservas, con compensaciones', 'Coordina inventario, tarifas, pago y millas sin transacción distribuida; el estado vive en la base de Reservas.', 'Correlación, timeouts y lease. Se descartó la coreografía (flujo repartido, difícil de compensar) y el 2PC (bloquea recursos; no lo soportan Kafka ni bases independientes).'],
        ['Outbox transaccional + consumidores idempotentes', 'Estado y mensaje se guardan de forma atómica; los duplicados no repiten efectos.', 'Latencia del relay; una tabla Outbox por servicio.'],
        ['Valkey coordina, PostgreSQL es autoridad', 'Baja latencia del apartado con TTL; el CAS impide la doble asignación aunque Valkey pierda datos (P1).', 'Dos mecanismos para un problema; se mide con benchmark. Valkey y no Redis: continuación de código abierto (BSD) tras el cambio de licencia de 2024, compatible y más barata en ElastiCache.'],
        ['Persistencia políglota en Fidelización', 'Saldo de millas en PostgreSQL (≈ 7.700 redenciones/día); perfil flexible de lectura intensiva en DocumentDB.', 'Dos motores en un servicio. Todo en Mongo: el saldo necesita transacciones; todo en PostgreSQL: el perfil cambia de estructura.'],
        ['Pago en dos pasos: autorización y captura', 'Anula sin cobrar si el asiento se pierde.', 'Si la pasarela no separa pasos, la compensación es un reembolso.'],
        ['Histórico único en S3 + Redshift vía Kafka Connect', 'Auditoría y analítica en una sola plataforma (P3).', 'Costo creciente; ciclo de vida a Glacier.'],
      ]} />
    ),
  },
  {
    sec: 6, title: 'Decisiones de diseño (2/2): flujo, plataforma y lenguaje',
    body: (
      <T dense head={['Decisión', 'Por qué', 'Riesgo o alternativa descartada']} rows={[
        ['Orden: cotizar, apartar, autorizar, confirmar, capturar', 'Los pasos sin efectos van primero.', 'Si el precio cambia, el cliente lo ve antes del apartado.'],
        ['Inventario por asiento, no por clase de reserva', 'Simplifica el control de la doble asignación y permite elegir asiento. Los GDS esperan disponibilidad por clase: en la etapa 1 la publica Altéa; en la 2, Tarifas la calcula a partir de los asientos libres por cabina.', 'La gestión por clase (revenue management) queda como extensión.'],
        ['Modelo de lectura de Búsqueda en DocumentDB', 'Aísla los picos del núcleo transaccional y atiende el mapa de asientos.', 'Retraso < 2 s; la reserva siempre verifica en Inventario.'],
        ['EKS con perfiles de Fargate', 'KEDA, canary con Argo Rollouts, namespaces, RBAC y security groups for pods; sin instancias EC2.', 'Curva mayor que ECS; sin DaemonSets ni service mesh: timeouts y circuit breaker los da lib-resiliencia.'],
        ['TypeScript sobre Node.js con NestJS', 'Los servicios pasan el tiempo esperando E/S; un solo lenguaje para servicios, bibliotecas y contratos; módulos e inyección para la hexagonal.', 'No apto para cálculo intensivo (worker threads en Tarifas). Java/Spring descartado por memoria por pod y un segundo lenguaje.'],
        ['AWS como proveedor único, solo administrados', 'Menos carga operativa y redundancia en varias zonas (P6).', 'Dependencia del proveedor, mitigada con estándares abiertos e IaC.'],
        ['Adaptador Star Alliance previsto', 'Misma Saga y mismas garantías para la venta de aliados.', 'Fuera del alcance de esta versión.'],
      ]} />
    ),
  },
  {
    sec: 6, title: 'Vista de capas',
    body: (
      <Cols r="1fr 1fr" center>
        <Fig id="6" />
        <div>
          <Lead>Cinco capas más los sistemas externos. <b>Los servicios de negocio no se llaman entre sí:</b> toda dependencia entre ellos pasa por Kafka.</Lead>
          <div className="layers">
            <div><span className="mono">Canales</span>app móvil · sitio web · estación del agente</div>
            <div><span className="mono">Entrada</span>CloudFront + WAF + API Gateway</div>
            <div><span className="mono">Negocio</span>Búsqueda · Reservas · Inventario · Tarifas · Pagos · Emisión · Perfil · Notificaciones</div>
            <div className="kafka"><span className="mono">Mensajería</span>Kafka en Amazon MSK, único medio entre servicios</div>
            <div><span className="mono">Datos</span>PostgreSQL por servicio · DocumentDB · Valkey · S3 + Redshift</div>
          </div>
        </div>
      </Cols>
    ),
  },
  {
    sec: 6, title: 'Punto de vista funcional: componentes',
    body: (
      <Cols r="1.3fr 0.9fr">
        <Fig id="7" />
        <div>
          <p>Los clientes acceden solo por el API Gateway. Reservas orquesta la Saga publicando comandos para Tarifas, Inventario, Pagos y Fidelización, y recibe respuestas en <Code>saga.respuestas</Code>.</p>
          <h4 className="h4">Filosofía de diseño</h4>
          <List items={[
            <><b>Separación de responsabilidades:</b> un servicio por capacidad de negocio.</>,
            <><b>Alta cohesión:</b> lo que cambia junto (reserva y asignaciones) vive junto.</>,
            <><b>Bajo acoplamiento:</b> solo comandos y eventos versionados.</>,
            <><b>Flexibilidad:</b> un canal o socio nuevo es un adaptador, sin tocar el núcleo.</>,
          ]} />
          <p className="muted">Dos tipos de interfaz: contratos de comando (Kafka) y contratos HTTP de borde (solo para los servicios que atienden canales).</p>
        </div>
      </Cols>
    ),
  },
  {
    sec: 6, title: 'Componentes, responsabilidades y contratos',
    body: (
      <T dense head={['Componente', 'Responsabilidad', 'Consume', 'Publica']} rows={[
        ['API Gateway', 'Entrada única: autentica, valida, limita la tasa y enruta. Sin lógica de negocio.', 'HTTP de borde', '—'],
        ['Búsqueda', 'Disponibilidad, itinerarios y mapa de asientos, solo lectura sobre un modelo de lectura.', 'Eventos de inventario y tarifas', '—'],
        ['Gestión de Reservas', 'Orquesta las Sagas de creación y cancelación; dueña de reservas, itinerarios, pasajeros, asignaciones y estado de cada Saga. Activo-activo.', <>Respuestas de la Saga; <K>TiqueteEmitido</K>, <K>EmisionFallida</K>, <K>TarifaPublicada</K> (réplica local)</>, <>Comandos de la Saga; <K>ReservaConfirmada</K>, Modificada, Cancelada, Expirada, Fallida</>],
        ['Inventario de Asientos', 'Fuente de verdad: apartado en Valkey y CAS en PostgreSQL. Mantiene la programación de Control de Vuelos.', <><K>ApartarAsientos</K>, <K>RenovarApartado</K>, Confirmar, LiberarApartado, Liberar</>, <><K>AsientosApartados</K>, ApartadoRechazado, Confirmados, <K>ConflictoAsientos</K>, Liberados; AsientoOcupado/Liberado</>],
        ['Tarifas y Precios', 'Cotiza por tarifa, cabina, canal y vigencia; recargo por canal; reembolsable.', <><K>CotizarReserva</K>, CotizarCambio, CalcularReembolso</>, <><K>CotizacionCalculada</K>, CotizacionRechazada, CambioCotizado, ReembolsoCalculado; TarifaPublicada</>],
        ['Pagos', 'Autoriza, captura, anula y reembolsa; deduplica webhooks. Nunca guarda la tarjeta.', <><K>IniciarPago</K>, CapturarPago, AnularAutorizacion, SolicitarReembolso</>, <><K>PagoAutorizado</K>, Rechazado, EnVerificacion, Capturado, <K>CapturaRechazada</K>, PagoAnulado, ReembolsoConfirmado, ReembolsoFallido</>],
        ['Emisión de Tiquetes', 'Un tiquete por pasajero y un cupón por segmento; anula al cancelar; atiende la consulta de tiquetes.', 'ReservaConfirmada, Modificada, Cancelada', <><K>TiqueteEmitido</K>, TiqueteAnulado, EmisionFallida</>],
        ['Perfil y Fidelización', 'Perfil (DocumentDB) y cuenta LifeMiles (PostgreSQL) con movimientos idempotentes; acumula con TiqueteEmitido.', <><K>BloquearMillas</K>, ConfirmarRedencion, LiberarMillas, RevertirRedencion</>, <><K>MillasBloqueadas</K>, BloqueoMillasRechazado, RedencionConfirmada, MillasLiberadas, MillasAcumuladas</>],
        ['Notificaciones', 'Correo y SMS por evento, sin duplicados por evento y canal.', 'Eventos de reserva, tiquete y reembolso', '—'],
        ['Capa de Integración', 'EDIFACT, NDC y Star Alliance → modelo canónico; etiqueta el canal.', 'Contratos de borde', '—'],
      ]} />
    ),
  },
  {
    sec: 6, title: 'Interfaces HTTP de borde',
    body: (
      <Cols r="1.3fr 0.8fr">
        <T dense head={['Operación', 'Servicio', 'Respuesta']} rows={[
          [<Code>POST /reservas</Code>, 'Gestión de Reservas', '202 con el id de la reserva · 409 si la clave de idempotencia se reutiliza con otro contenido · 422 si los datos no son válidos'],
          [<><Code>GET /reservas/{'{id}'}</Code> · <Code>GET /reservas?localizador&amp;apellido</Code></>, 'Gestión de Reservas', 'Estado (PENDIENTE, CONFIRMADA, FALLIDA, EXPIRADA, CANCELADA) y su motivo'],
          [<Code>POST /reservas/{'{id}'}/cancelacion</Code>, 'Gestión de Reservas', '202 · 409 si el primer segmento ya salió'],
          [<><Code>GET /itinerarios</Code> · <Code>GET /vuelos/{'{id}'}/asientos</Code></>, 'Búsqueda', 'Ofertas con su id_oferta y mapa de asientos'],
          [<><Code>GET /tiquetes/{'{id}'}</Code> · <Code>GET</Code>/<Code>PUT /perfil</Code></>, 'Emisión · Perfil y Fidelización', 'Tiquete; perfil del pasajero'],
          [<Code>POST /webhooks/pasarela</Code>, 'Pagos', 'Verifica la firma HMAC; 200 tras deduplicar'],
        ]} />
        <div>
          <Lead>Son las <b>únicas</b> operaciones que los canales invocan por el API Gateway. Todo lo demás viaja por Kafka.</Lead>
          <p className="muted">Errores comunes: <b>401/403</b> autenticación y permisos, <b>429</b> límite de tasa y <b>503</b> modo solo consulta o control de admisión.</p>
          <p className="muted">El cliente envía solo el id de la oferta: el precio siempre lo calcula Tarifas en el servidor.</p>
        </div>
      </Cols>
    ),
  },
  {
    sec: 6, title: 'Capa de Integración: hub de adaptadores',
    body: (
      <Cols r="1fr 1fr" center>
        <Fig id="8" />
        <div>
          <Lead>Cada adaptador traduce los mensajes externos a un <b>modelo canónico</b>, etiqueta el canal de origen (para el recargo) y aplica la idempotencia.</Lead>
          <p>Después invoca los <b>mismos contratos de borde</b> que los canales propios: una reserva desde un GDS pasa por la misma Saga y las mismas garantías que una reserva web.</p>
          <p className="muted">Como el GDS espera respuesta en su sesión, el adaptador consulta el estado hasta que la Saga termina o vence el tiempo del GDS. El adaptador Star Alliance es un diseño previsto.</p>
          <Cards cols={2} small items={[
            { tag: 'Agencias por GDS', t: 'Pago por BSP de IATA', d: 'IniciarPago lleva el medio BSP y el código IATA de la agencia; Pagos registra la obligación sin llamar a la pasarela, y la captura y los reembolsos se reportan al BSP. El resto de la Saga no cambia.' },
            { tag: 'Altéa', t: 'Lista de pasajeros', d: 'El check-in y el control de salidas, que siguen en Altéa, reciben PNL y ADL desde la Capa de Integración.' },
          ]} />
        </div>
      </Cols>
    ),
  },
  {
    sec: 6, title: 'Reserva con pago en dinero: la Saga por Kafka',
    kicker: '6.4.1 Flujo principal',
    body: (
      <Cols r="0.9fr 1.1fr">
        <ol className="steps big">
          <li><b>Creación (HTTP).</b> Con clave de idempotencia y token de pago. En una transacción: reserva <S>PENDIENTE</S>, Saga y <K>CotizarReserva</K> en el Outbox. Responde <b>202</b>.</li>
          <li><b>Cotización.</b> Tarifas responde <K>CotizacionCalculada</K>.</li>
          <li><b>Apartado.</b> Inventario aparta en Valkey, en orden de id y todo o nada → <K>AsientosApartados</K> con su vigencia.</li>
          <li><b>Pago.</b> Si la regla de tiempos lo permite, <K>IniciarPago</K> → <K>PagoAutorizado</K>, <K>PagoRechazado</K> o <K>PagoEnVerificacion</K>. Con 3-D Secure o PSE, mientras el cliente se autentica la Saga publica <K>RenovarApartado</K> (hasta 15 min más).</li>
          <li><b>Confirmación.</b> CAS por estado y versión de todos los asientos → <K>AsientosConfirmados</K>.</li>
          <li><b>Captura.</b> <K>PagoCapturado</K> → reserva <S>CONFIRMADA</S> y <K>ReservaConfirmada</K>. Sin respuesta, reintenta con la misma clave (nunca cobra dos veces); si la rechaza, <K>CapturaRechazada</K>: se liberan los asientos y se anula la autorización.</li>
          <li><b>Emisión.</b> <K>TiqueteEmitido</K>. Si falla, no deshace la reserva: reintenta y queda <S>EMISION_FALLIDA</S>.</li>
        </ol>
        <Fig id="9" />
      </Cols>
    ),
  },
  {
    sec: 6, title: 'Comunicación del flujo y emisión posterior',
    kicker: '6.4.1 Flujo principal',
    body: (
      <>
        <Cols>
          <Fig id="10" />
          <Fig id="11" />
        </Cols>
        <p className="note">Todos los comandos y respuestas de una reserva usan <Code>id_reserva</Code> como clave de partición, así Kafka los entrega en orden. <K>TiqueteEmitido</K> lo consumen Notificaciones, Fidelización (acumula millas) y Check-in.</p>
      </>
    ),
  },
  {
    sec: 6, title: 'Estados de la Saga, compensaciones e idempotencia',
    kicker: '6.4.1 Flujo principal',
    body: (
      <Cols r="1.2fr 0.9fr">
        <Fig id="12" />
        <div>
          <p>Cada paso tiene <Code>timeout_paso</Code>. Sin respuesta, el vigilante reenvía el mismo comando hasta dos veces y luego compensa.</p>
          <h4 className="h4">Idempotencia en cada paso</h4>
          <List items={[
            <><b>Creación:</b> <Code>CLAVE_IDEMPOTENCIA</Code>; misma clave con otro contenido se rechaza.</>,
            <><b>Comandos:</b> <Code>EVENTO_PROCESADO</Code> devuelve la misma respuesta sin repetir efectos.</>,
            <><b>Apartado:</b> la clave de Valkey lleva el token de la reserva; un script Lua atómico compara el token antes de crear, renovar o liberar.</>,
            <><b>Pago:</b> clave única ante la pasarela; <Code>EVENTO_PSP</Code> deduplica webhooks.</>,
            <><b>Respuestas tardías:</b> se ignoran o se compensan.</>,
          ]} />
          <div className="callout">
            <div className="callout-v mono">t_restante &gt; timeout_pago + margen</div>
            <div><b>Regla de tiempos:</b> solo se publica <K>IniciarPago</K> si se cumple; si no, la reserva pasa a <S>EXPIRADA</S>. Se compara el tiempo que le <b>queda</b> al apartado, no su duración total.</div>
          </div>
        </div>
      </Cols>
    ),
  },
  {
    sec: 6, title: 'Conflicto de asiento y pago tardío',
    kicker: '6.4.2',
    body: (
      <Cols r="1fr 1fr">
        <div>
          <Lead>Regla determinista: <b>una reserva solo se confirma si está <S>PENDIENTE</S></b>. Una reserva <S>EXPIRADA</S> o <S>FALLIDA</S> nunca se reactiva y su pago siempre se compensa.</Lead>
          <Cards cols={1} small items={[
            { tag: 'A · Conflicto al confirmar', t: 'El asiento ya no está disponible', d: <>Inventario responde <K>ConflictoAsientos</K>; se libera el apartado, se anula la autorización sin cobrar y la reserva queda <S>FALLIDA</S> (ASIENTO_NO_DISPONIBLE).</>, tone: 'red' },
            { tag: 'B · Pago tardío', t: 'PagoAutorizado llega tarde', d: <>Se publica <K>AnularAutorizacion</K> o, si ya se capturó, <K>SolicitarReembolso</K> por el total.</>, tone: 'amber' },
            { tag: 'Reembolso', t: 'Solo cuenta cuando la pasarela confirma', d: <>Queda <S>SOLICITADO</S> y Pagos reintenta con espera creciente hasta <K>ReembolsoConfirmado</K>.</> },
          ]} />
        </div>
        <Fig id="13" />
      </Cols>
    ),
  },
  {
    sec: 6, title: 'Cancelación y reembolso',
    kicker: '6.4.3',
    body: (
      <Cols r="1fr 1fr">
        <Fig id="14" />
        <div>
          <ol className="steps">
            <li>El cliente cancela una reserva <S>CONFIRMADA</S> y recibe 202.</li>
            <li>Tarifas responde <K>ReembolsoCalculado</K> según <Code>reembolsable</Code> y <Code>porcentaje_penalidad</Code>.</li>
            <li>En una transacción: <S>CANCELADA</S> + <K>ReservaCancelada</K>, <K>LiberarAsientos</K> y <K>SolicitarReembolso</K>.</li>
            <li>Inventario libera con CAS; Emisión anula tiquetes y cupones; Pagos reembolsa.</li>
          </ol>
          <p className="muted">Si se pagó con millas, el comando es <K>RevertirRedencion</K>. Solo se cancela antes de la salida del primer segmento; los casos especiales los atiende un agente.</p>
        </div>
      </Cols>
    ),
  },
  {
    sec: 6, title: 'Reserva pagada con millas LifeMiles',
    kicker: '6.4.4',
    body: (
      <Cols r="1fr 1fr">
        <div>
          <Lead>El pago en dinero se sustituye por tres comandos: <K>BloquearMillas</K>, <K>ConfirmarRedencion</K> y <K>LiberarMillas</K>.</Lead>
          <p>La redención <b>no es degradable</b>: si <K>MillasBloqueadas</K> no llega tras los reenvíos, la reserva falla y se publica <K>LiberarMillas</K>, que es idempotente y no tiene efecto si el bloqueo nunca se aplicó. No se compromete un saldo sin certeza.</p>
          <p className="muted">Cada operación es un movimiento con clave de idempotencia; el saldo se actualiza con control de versión. No se combina con dinero en una misma reserva.</p>
        </div>
        <Fig id="15" />
      </Cols>
    ),
  },

  /* ───────────────────────── 7. INFORMACIÓN ───────────────────────── */
  {
    sec: 7, title: 'Modelo de dominio',
    body: (
      <>
        <T dense head={['Concepto', 'Dueño', 'Estados']} rows={[
          ['Reserva', 'Gestión de Reservas', 'PENDIENTE, CONFIRMADA, EXPIRADA, FALLIDA, CANCELADA'],
          ['Asignación de asiento', 'Gestión de Reservas', 'APARTADA, CONFIRMADA, LIBERADA'],
          ['Saga de reserva', 'Gestión de Reservas', 'EN_CURSO, COMPENSANDO, COMPLETADA, COMPENSADA, REQUIERE_INTERVENCION'],
          ['Asiento', 'Inventario', 'DISPONIBLE, OCUPADO (+ APARTADO lógico en Valkey)'],
          ['Pago / reembolso', 'Pagos', 'INICIADO, EN_VERIFICACION, AUTORIZADO, CAPTURADO, RECHAZADO, ANULADO, REEMBOLSADO / SOLICITADO, CONFIRMADO, FALLIDO'],
          ['Tiquete / cupón', 'Emisión', 'PENDIENTE_EMISION, EMITIDO, EMISION_FALLIDA, ANULADO / ABIERTO, UTILIZADO, ANULADO'],
          ['Cuenta LifeMiles y movimiento', 'Perfil y Fidelización', 'Movimiento: BLOQUEADO, CONFIRMADO, LIBERADO, REVERTIDO'],
        ]} />
        <Cols>
          <Fig id="16a" h="34vh" />
          <Fig id="16b" h="34vh" />
        </Cols>
      </>
    ),
  },
  {
    sec: 7, title: 'Modelo de datos e invariantes',
    body: (
      <Cols r="1.1fr 1fr">
        <div className="stack">
          <Fig id="17a" h="30vh" />
          <Fig id="17b" h="30vh" />
        </div>
        <T dense head={['Invariante', 'Cómo se garantiza']} rows={[
          ['Un asiento no se asigna a dos reservas', 'Verificación previa del token del apartado en Valkey y UPDATE condicional: estado = DISPONIBLE y version = :version, en una transacción. UK (id_vuelo, numero_asiento).'],
          ['Un asiento persistido es DISPONIBLE u OCUPADO', 'El apartado solo existe en Valkey.'],
          ['Una asignación por pasajero y segmento', 'UK (id_segmento, id_pasajero_reserva).'],
          ['Pago, reembolso y millas se aplican una vez', 'UK clave_idempotencia en cada tabla.'],
          ['Cada mensaje se procesa una vez por consumidor', 'PK (id_mensaje, consumidor) en EVENTO_PROCESADO.'],
          ['Los reembolsos no superan el pago', 'CHECK monto_reembolsado ≤ monto.'],
          ['Saldo de millas coherente', 'CHECK saldo ≥ bloqueadas ≥ 0; movimiento + versión en una transacción.'],
          ['No se almacenan tarjetas', 'Solo token_medio_pago de la pasarela.'],
          ['Estado y mensaje atómicos', 'OUTBOX_EVENTO en la misma transacción; entrega al menos una vez.'],
        ]} />
      </Cols>
    ),
  },
  {
    sec: 7, title: 'Propiedad de los datos y topología de Kafka',
    body: (
      <>
        <Cols>
          <Fig id="18" />
          <Fig id="19" />
        </Cols>
        <p className="note">Las fuentes de verdad (una PostgreSQL por servicio y DocumentDB de perfiles) se separan de los datos derivados o temporales (Valkey, modelo de lectura, histórico), que nunca son autoridad. Comandos y respuestas se particionan por <Code>id_reserva</Code>; inventario por <Code>id_vuelo</Code>; fidelización por <Code>id_cuenta</Code>. Replicación 3 y DLQ por consumidor.</p>
      </>
    ),
  },
  {
    sec: 7, title: 'Ciclos de vida: cinco máquinas de estado',
    body: (
      <>
        <div className="gallery">
          {['20', '21', '22', '23', '24'].map((id) => <Fig key={id} id={id} h="30vh" />)}
        </div>
        <p className="note">Cada estado lo cambia <b>solo su servicio propietario</b>. <S>CONFIRMADA</S> significa asientos ocupados y pago capturado, <b>no</b> tiquete emitido: eso lo dice el estado del tiquete. <S>EXPIRADA</S> = venció sin pago en curso; <S>FALLIDA</S> = rechazo, conflicto, timeout o error irrecuperable.</p>
      </>
    ),
  },
  {
    sec: 7, title: 'Expiración y parámetros temporales',
    body: (
      <Cols r="0.9fr 1.1fr">
        <div>
          <h4 className="h4">Cinco cosas vencen, cada una con su mecanismo</h4>
          <List items={[
            <><b>Apartado:</b> TTL de Valkey, automático.</>,
            <><b>Reserva PENDIENTE:</b> barrido periódico; no expira si su Saga está en el paso de autorización del pago (dato propio de SAGA_RESERVA, sin consultar la base de Pagos).</>,
            <><b>Paso de la Saga:</b> el vigilante reenvía o compensa.</>,
            <><b>Lease de la Saga:</b> otra instancia puede reclamarla.</>,
            <><b>Clave de idempotencia:</b> limpieza periódica.</>,
          ]} />
          <div className="callout">
            <div className="callout-v">minuto 8,5</div>
            <div>Con un apartado de 10 min, 60 s de pago y 30 s de margen, el pago puede iniciarse hasta aproximadamente el minuto 8,5.</div>
          </div>
        </div>
        <T head={['Parámetro', 'Valor', 'Nota']} rows={[
          ['TTL_apartado', '10 min', 'fecha_expiracion = ahora + TTL al recibir AsientosApartados.'],
          ['timeout_paso', '2 s × 2 reenvíos', 'Espera de respuesta a un comando (excepto pago). Si el retraso del tópico supera ese tiempo, no reenvía y extiende hasta 30 s.'],
          ['timeout_pago', '60 s', 'Espera máxima de la pasarela.'],
          ['margen', '30 s', 'Cubre latencia y reintentos.'],
          ['Vigilante / barrido', '1 s / 30 s', 'Pasos sin respuesta y reservas vencidas.'],
          ['lease_saga', '30 s', 'Se ajusta con PoC2.'],
          ['Reintentos de reembolso y emisión', '8, de 30 s a 1 h', 'Máx. 24 h; luego FALLIDO o EMISION_FALLIDA + alerta.'],
        ]} />
      </Cols>
    ),
  },
  {
    sec: 7, title: 'Volúmenes, calidad y retención',
    body: (
      <Cols r="1.3fr 0.8fr">
        <T dense head={['Dato', 'Registros por año', 'Tamaño por año']} rows={[
          ['Asignaciones de asiento', '38 M', '19 GB'],
          ['Reservas completas', '16 M', '32 GB'],
          ['Asientos vivos en inventario', '45 M filas vivas', '9 GB'],
          ['Pagos, reembolsos y eventos de pasarela', '64 M', '32 GB'],
          ['Movimientos de millas', '41 M (2,8 M redenciones + 38 M acumulaciones)', '13 GB'],
          ['Perfiles (DocumentDB)', '16 M documentos', '64 GB'],
          ['Mensajes en el histórico (≈ 20 por reserva)', '320 M', '320 GB antes de compresión'],
        ]} />
        <div>
          <div className="timeline">
            <div><span className="mono">0–24 m</span>En línea, después del último vuelo</div>
            <div><span className="mono">24 m</span>Archivo en Amazon S3</div>
            <div><span className="mono">36 m</span>S3 Glacier</div>
            <div className="hl"><span className="mono">10 años</span>Pagos, reembolsos, millas y sus eventos (Ley 962 de 2005)</div>
          </div>
          <p className="muted">Los datos maestros de vuelos vienen solo de Control de Vuelos; la identidad se valida en el canal. Los datos personales se eliminan o anonimizan a solicitud del titular (Ley 1581).</p>
          <p className="muted"><b>Borrado criptográfico:</b> en el histórico, los datos personales se cifran con una llave por titular (cifrado de sobre con KMS). Suprimir es destruir la llave: los eventos financieros quedan íntegros y los datos personales, ilegibles.</p>
        </div>
      </Cols>
    ),
  },

  /* ───────────────────────── 8. CONCURRENCIA ───────────────────────── */
  {
    sec: 8, title: 'Por qué un punto de vista de concurrencia',
    body: (
      <>
        <Cards cols={4} small items={[
          { tag: 'Carga', t: 'Simultánea y variable', d: 'Miles de solicitudes sobre el mismo inventario, con picos del 21 %.' },
          { tag: 'Riesgo', t: 'Condición de carrera', d: 'La doble asignación es una carrera sobre un recurso compartido.', tone: 'red' },
          { tag: 'Arquitectura', t: 'Distribuida por eventos', d: 'Bus y Saga implican procesos paralelos coordinados de forma asíncrona.' },
          { tag: 'Canales', t: 'Múltiples a la vez', d: 'Web, app, agentes, call center y GDS sobre el mismo vuelo.' },
        ]} />
        <div className="seat-demo">
          <div className="seat-col">
            <div className="mono dim">1 · APARTAR (Valkey)</div>
            <code className="code block">SET asiento:14C &lt;token&gt; NX PX 600000</code>
            <p className="muted">Operación atómica con TTL. No se usa SETNX + EXPIRE. Se libera solo si el token coincide.</p>
          </div>
          <div className="seat-arrow" aria-hidden="true">→</div>
          <div className="seat-col">
            <div className="mono dim">2 · VERIFICAR TOKEN (Valkey)</div>
            <code className="code block">script Lua atómico: GET asiento:14C == &lt;token&gt;</code>
            <p className="muted">Si el apartado venció o es de otra reserva → <K>ConflictoAsientos</K> sin tocar PostgreSQL. Un pago tardío no le quita el asiento a otro cliente.</p>
          </div>
          <div className="seat-arrow" aria-hidden="true">→</div>
          <div className="seat-col">
            <div className="mono dim">3 · CONFIRMAR (PostgreSQL)</div>
            <code className="code block">UPDATE asiento SET estado='OCUPADO', version=version+1<br />WHERE id=:id AND estado='DISPONIBLE' AND version=:v</code>
            <p className="muted">0 filas afectadas → relee, reintenta una vez o responde <K>ConflictoAsientos</K>.</p>
          </div>
        </div>
        <p className="note center"><b>Valkey coordina; PostgreSQL decide.</b> Aunque Valkey pierda un apartado, la integridad no se compromete.</p>
      </>
    ),
  },
  {
    sec: 8, title: 'Mecanismos de concurrencia, idempotencia y recuperación',
    body: (
      <T dense head={['Preocupación', 'Estrategia adoptada']} rows={[
        ['Comunicación entre procesos', 'Un solo mecanismo: mensajería asíncrona por Kafka. HTTP solo en el borde.'],
        ['Sincronización e integridad', 'SET NX PX en un solo comando (no SETNX + EXPIRE); antes de confirmar, script Lua que verifica el token. Cada script toca un solo asiento (compatible con Valkey en modo clúster); el todo o nada lo coordina Inventario.'],
        ['Orden de los mensajes', 'Clave id_reserva: orden y un solo consumidor a la vez por partición. El offset se confirma después de guardar el efecto.'],
        ['Varios asientos y deadlocks', 'Apartado en orden creciente de id_asiento, todo o nada; confirmación en una transacción ordenada. Nadie espera de forma bloqueante a otro servicio.'],
        ['Conflictos de versión', 'Si el CAS afecta 0 filas: relee; si sigue DISPONIBLE y el apartado es propio, reintenta una vez; si no, ConflictoAsientos.'],
        ['Asientos muy disputados', 'Reservas de un mismo vuelo en particiones distintas; la contención la resuelven Valkey y el CAS.'],
        ['Timeouts y respuestas tardías', 'vence_paso por paso; el vigilante reenvía con el mismo id_comando y tras dos reenvíos compensa. Control de admisión: si un tópico de comandos acumula > 30 s de retraso, las nuevas reservas reciben 503 temporal.'],
        ['Recuperación entre instancias', 'Kafka reasigna particiones; el vigilante reclama Sagas con CAS sobre version y lease_hasta.'],
        ['Pérdida de datos en Valkey', 'PostgreSQL es la autoridad; solo aumentan los conflictos tardíos. Valkey Multi-AZ.'],
        ['Fallas de consumidores', 'Reintento con espera creciente y luego DLQ para no bloquear la partición.'],
        ['Lecturas en Inventario', 'Inventario solo escribe; el mapa de asientos se lee del modelo de Búsqueda. Sin gestor de bloqueos serializado.'],
      ]} />
    ),
  },
  {
    sec: 8, title: 'Diagrama de concurrencia',
    body: (
      <Cols r="1.4fr 0.8fr">
        <Fig id="25" />
        <div>
          <Lead>Cada servicio es un proceso con sus hilos. Entre procesos, solo Kafka.</Lead>
          <List items={[
            <><b>Hilos consumidores</b> de sus tópicos de comandos o eventos.</>,
            <><b>Relay del Outbox</b> que publica sus mensajes.</>,
            <><b>Pool HTTP de borde</b> separado, para que un pico de mensajes no degrade las consultas.</>,
            <><b>Vigilante de Sagas</b> y <b>barrido de expiración</b> en Gestión de Reservas.</>,
            <><b>Valkey</b> es un proceso propio porque Inventario escala a varias réplicas.</>,
          ]} />
        </div>
      </Cols>
    ),
  },
  {
    sec: 8, title: 'Catorce escenarios de concurrencia y falla',
    body: (
      <T dense head={['#', 'Escenario', 'Comportamiento']} first={false} rows={[
        ['1', 'Pago autorizado dentro del apartado', 'CAS → OCUPADO, captura, CONFIRMADA, ReservaConfirmada y emisión.'],
        ['2', 'Pago rechazado', 'LiberarApartado; reserva FALLIDA.'],
        ['3', 'El cliente abandona', 'El TTL libera; el barrido marca EXPIRADA si no hay pago en curso.'],
        ['4', 'Conflicto al confirmar', 'Libera apartados, anula autorización; FALLIDA (ASIENTO_NO_DISPONIBLE).'],
        ['5', 'Pago tardío', 'No se reactiva; AnularAutorizacion o SolicitarReembolso.'],
        ['6', 'La pasarela no responde', 'EN_VERIFICACION; consulta y webhook; la reserva no expira; conciliación manual si persiste.'],
        ['7', 'Cae una instancia de Reservas', 'Kafka reasigna particiones; el vigilante retoma Sagas vencidas.'],
        ['8', 'Mensaje duplicado o fuera de orden', 'EVENTO_PROCESADO descarta duplicados; id_reserva preserva el orden.'],
        ['9', 'Se pierden apartados en Valkey', 'PostgreSQL decide; conflictos tardíos como en 4 y 5.'],
        ['10', 'Falla la emisión', 'Reserva sigue CONFIRMADA; reintentos y alerta; a las 24 h o < 6 h de la salida (lo revisa el barrido), cancela y reembolsa.'],
        ['11', 'Tarifas no responde', 'Reservas cotiza con su réplica local de tarifas vigentes (TarifaPublicada) y registra el id_tarifa; la respuesta tardía se ignora.'],
        ['12', 'Fidelización no responde', 'El perfil se degrada; la redención falla (no degradable) y se liberan millas.'],
        ['13', 'Inventario o Pagos detenidos minutos', 'Los comandos esperan en el tópico; las Sagas vencen y compensan.'],
        ['14', 'Falla un consumidor de Kafka', 'Reintentos, DLQ; KEDA ajusta consumidores según el retraso.'],
      ]} />
    ),
  },

  /* ───────────────────────── 9. DESPLIEGUE ───────────────────────── */
  {
    sec: 9, title: 'Preocupaciones del despliegue y región',
    body: (
      <Cols r="1fr 0.9fr">
        <Cards cols={2} small items={[
          { tag: 'Hardware', t: 'Sin servidores propios', d: 'Usuarios: navegador o app. Plataforma: pods en Fargate (vCPU y memoria) y clases de instancia de datos.' },
          { tag: 'Software', t: 'Terceros administrados', d: 'EKS + Fargate, MSK, RDS PostgreSQL, ElastiCache Valkey, DocumentDB, S3 y Redshift.' },
          { tag: 'Red', t: 'Un solo punto de exposición', d: 'CloudFront, WAF y API Gateway. Entre servicios, solo Kafka en subredes privadas.' },
          { tag: 'Observabilidad', t: 'Monitoreo distribuido', d: 'OpenTelemetry, CloudWatch y X-Ray; vigilancia de colas de mensajes fallidos.' },
        ]} />
        <div className="panel">
          <Pill tone="amber">Región</Pill>
          <h4 className="h4">us-east-1 · Norte de Virginia</h4>
          <p>AWS no tiene región en Colombia. Se elige us-east-1 por su catálogo completo de servicios administrados y su conectividad con los GDS; la latencia desde Bogotá (60–120 ms) cabe en el presupuesto.</p>
          <p className="muted">Se descartó mx-central-1 (menos latencia, menos servicios). Alojar los datos en AWS es una <b>transmisión a un encargado</b>: contrato de transmisión del Decreto 1377 de 2013, y EE. UU. figura con nivel adecuado en la Circular 005 de 2017 de la SIC; la autorización del titular se registra en el perfil o en la reserva.</p>
          <p><b>3 zonas de disponibilidad</b>, centros de datos físicamente separados; contingencia regional en <b>us-west-2</b>.</p>
        </div>
      </Cols>
    ),
  },
  {
    sec: 9, title: 'Plataforma de ejecución',
    body: (
      <Cols r="1.25fr 1fr">
        <Fig id="26" />
        <div className="zones">
          <div><span className="mono">Borde</span>CloudFront, WAF y API Gateway sin estado; reciben el webhook de la pasarela. VPC Link hacia el ALB interno.</div>
          <div><span className="mono">Aplicación</span>EKS + Fargate: un Deployment por namespace, pods en 3 zonas. HPA para APIs, KEDA para consumidores (Deployments separados). Reservas con ≥ 2 pods activo-activo.</div>
          <div className="kafka"><span className="mono">Mensajería</span>MSK con 3 brokers (uno por zona), replicación 3, ≥ 12 particiones por tópico de comandos, permisos IAM por tópico.</div>
          <div><span className="mono">Datos</span>7 bases lógicas RDS PostgreSQL Multi-AZ (Pagos con llave KMS dedicada; RDS Proxy para Inventario y Reservas), Valkey con réplica, DocumentDB 1 + 2 compartido por perfil y modelo de lectura.</div>
          <div><span className="mono">Analítica</span>MSK Connect → S3 → Redshift para analítica, auditoría y retención.</div>
          <div><span className="mono">Transversal</span>CloudWatch, X-Ray, Secrets Manager, Parameter Store, AppConfig, GitHub Actions, ECR, Helm, Argo Rollouts, Terraform.</div>
        </div>
      </Cols>
    ),
  },
  {
    sec: 9, title: 'Dimensionamiento inicial: normal y pico',
    body: (
      <>
        <T dense head={['Nodo', 'Unidad', 'Carga nominal', 'Pico y margen de diseño']} rows={[
          ['Búsqueda de Itinerarios', 'Pod Fargate 1 vCPU · 2 GB', '7 pods', <b className="hi">12 pods</b>],
          ['Gestión de Reservas', 'Pod Fargate 1 vCPU · 2 GB', '3 pods', '6 pods'],
          ['Inventario de Asientos', 'Pod Fargate 1 vCPU · 2 GB', '3 pods', <b className="hi">8 pods</b>],
          ['Tarifas y Precios', 'Pod Fargate 2 vCPU · 4 GB (cálculo)', '3 pods', '6 pods'],
          ['Pagos, Emisión, Perfil, Notificaciones, Integración', 'Pod Fargate 0,5 vCPU · 1 GB', '2 c/u', '4 c/u'],
          ['Consumidores de los servicios con API de borde', 'Pod 0,5 vCPU · 1 GB con KEDA', '2 por servicio (3 en Reservas)', 'hasta # particiones'],
          ['RDS PostgreSQL (Inventario y Reservas)', 'db.r7g.xlarge, Multi-AZ, instancia propia', '1 + espera; Reservas + 1 réplica de lectura', 'réplicas extra antes de la campaña'],
          ['RDS PostgreSQL (demás)', 'db.r7g.large, Multi-AZ', 'Pagos y Fidelización propias; Tarifas, Emisión y Notificaciones comparten', 'igual'],
          ['ElastiCache for Valkey', 'cache.r7g.large, modo clúster, 1 + 2 réplicas', '2 fragmentos', 'se amplían antes de la campaña'],
          ['Amazon DocumentDB', 'db.r6g.large, 1 + 2 réplicas', '3 instancias', '+ réplicas de lectura'],
          ['Amazon MSK', 'kafka.m7g.large', '3 brokers', '3 brokers (almacenamiento ampliable)'],
        ]} />
        <p className="note">La columna de pico dimensiona para la capacidad de diseño (<b>3.000 búsquedas y 30 reservas por segundo</b>), no solo para el 121 %; por eso casi duplica los pods. HPA y KEDA cubren la diferencia; las réplicas de bases y los fragmentos de Valkey, que tardan decenas de minutos, se amplían antes de cada campaña. Inventario y Tarifas no exponen HTTP. Se ajusta con la PoC4.</p>
      </>
    ),
  },
  {
    sec: 9, title: 'Modelo de red',
    body: (
      <Cols r="1.3fr 0.8fr">
        <Fig id="27" />
        <div>
          <p>Una VPC con subredes públicas (solo balanceadores y NAT) y privadas para aplicación, mensajería y datos, replicadas en tres zonas.</p>
          <List items={[
            <><b>Security groups for pods:</b> cada base solo acepta su servicio; Pagos queda aislado.</>,
            <><b>VPC endpoints:</b> acceso a AWS sin salir a internet.</>,
            <><b>DNS interno</b> de Kubernetes entre servicios.</>,
          ]} />
          <div className="callout">
            <div className="callout-v">≈ 480 Mbps</div>
            <div>3.000 búsquedas/s × 20 KB ≈ 60 MB/s de salida en el borde, absorbidos por CloudFront y API Gateway.</div>
          </div>
        </div>
      </Cols>
    ),
  },
  {
    sec: 9, title: 'Dependencias tecnológicas',
    body: (
      <T dense head={['Tecnología', 'Función', 'Nodo', 'Versión']} rows={[
        ['Amazon EKS + AWS Fargate', 'Orquestación y escalado', 'Aplicación', 'Kubernetes 1.35 (soporte estándar)'],
        ['KEDA, Argo Rollouts, Helm, LB Controller', 'Escalado por eventos, canary, empaquetado', 'Aplicación', 'Fijadas en el repo de infra'],
        ['Imagen base', 'SO y entorno', 'Aplicación', 'Node.js 24.22.1 · Debian bookworm-slim'],
        ['TypeScript + NestJS', 'Lenguaje y framework', 'Aplicación', 'TS 6.0.x · NestJS 12.2.0'],
        ['API Gateway, CloudFront, WAF, Cognito', 'Entrada, identidad y protección', 'Borde', 'Administrados'],
        ['Amazon MSK', 'Bus de eventos', 'Mensajería', 'Kafka 3.9.x (KRaft)'],
        ['RDS for PostgreSQL + RDS Proxy', 'Datos transaccionales', 'Datos', 'PostgreSQL 18.6'],
        ['ElastiCache for Valkey', 'Apartados con TTL', 'Datos', 'Valkey 9.1'],
        ['Amazon DocumentDB', 'Perfil y modelo de lectura', 'Datos', 'API MongoDB 8.0'],
        ['S3 + Redshift Serverless + MSK Connect', 'Histórico y analítica', 'Analítica', 'Administrados'],
        ['OpenTelemetry, CloudWatch, X-Ray', 'Monitoreo y alertas', 'Transversal', 'SDK fijado en lockfile'],
        ['Terraform · GitHub Actions · ECR', 'IaC y entrega', 'Transversal', 'Terraform 1.16.7'],
        ['EDIFACT (Amadeus, Sabre) · IATA NDC', 'Distribución', 'Integración', 'Se fija en la certificación'],
      ]} />
    ),
  },
  {
    sec: 9, title: 'Seguridad y cumplimiento',
    body: (
      <Cards cols={3} small items={[
        { tag: 'Identidad', t: 'Cognito + JWT', d: 'OAuth 2.0/OIDC con perfiles pasajero, agente, administrador y socio; MFA obligatorio para agentes y administradores. IRSA y RBAC entre servicios.' },
        { tag: 'Tránsito', t: 'TLS 1.2+', d: 'En el borde (ACM) y entre servicios, bases y Kafka.' },
        { tag: 'Reposo', t: 'AWS KMS', d: 'Todas las bases, Valkey, Kafka y S3. Pagos con llave dedicada.' },
        { tag: 'Tarjetas', t: 'PCI-DSS v4.0.1 · comercio Nivel 1', d: 'La pasarela captura la tarjeta y solo se guarda el token; los agentes envían un enlace de pago. Con > 6 M transacciones al año, lo certifica un QSA con un ROC; la página de pago aplica los controles de scripts 6.4.3 y 11.6.1.', tone: 'amber' },
        { tag: 'Datos personales', t: 'Ley 1581 de 2012', d: 'Consentimiento en el perfil o, para no socios y reservas por GDS, en PASAJERO_RESERVA; consultas en 10 días hábiles, reclamos en 15; bases inscritas en la SIC.', tone: 'amber' },
        { tag: 'Webhooks', t: 'Firma HMAC', d: 'Verificación de firma y deduplicación por id de evento.' },
        { tag: 'Red', t: 'Segmentación', d: 'Subredes privadas; solo CloudFront y API Gateway expuestos.' },
        { tag: 'Secretos', t: 'Secrets Manager', d: 'Rotación automática de credenciales de bases, pasarela y proveedores.' },
        { tag: 'Detección', t: 'GuardDuty + Security Hub', d: 'Más CloudTrail para acciones administrativas; retención de 10 años.' },
      ]} />
    ),
  },
  {
    sec: 9, title: 'Riesgos del despliegue',
    body: (
      <T dense head={['Riesgo', 'Efecto', 'Mitigación']} rows={[
        ['Valkey bajo contención de Hot Sale', 'Apartados lentos o perdidos', 'Benchmark PoC1; PostgreSQL sigue siendo la autoridad.'],
        ['Partición de Kafka sobrecargada por un vuelo', 'Retraso en eventos de inventario', 'Monitoreo del retraso; subparticiones.'],
        ['Pasarela lenta o resultado desconocido', 'Pagos en EN_VERIFICACION', 'Verificador, webhook y conciliación manual.'],
        ['Versiones no disponibles en la región', 'Fallas de instalación', 'Verificar la Tabla 16 contra la región; fijar versiones en Terraform.'],
        ['Activo-activo de Reservas', 'Saga ejecutada dos veces', 'Lease, versión y pasos idempotentes.'],
        ['Varias tecnologías de datos', 'Sobrecarga de equipo y costo', 'Administrados; Tarifas, Emisión y Notificaciones comparten instancia; Pagos propia por su llave KMS.'],
        ['Una sola región', 'Indisponibilidad ante caída regional', 'Pilot light en us-west-2: RPO ≤ 1 min, RTO ≤ 2 h; multirregión activo-activo como evolución.'],
        ['AWS como proveedor único', 'Costo de salida alto', 'Estándares abiertos e IaC.'],
        ['Certificación EDIFACT/NDC larga', 'Retrasos de integración', 'Validar con los GDS al inicio (PoC3).'],
        ['Acumulación de mensajes en picos', 'Retraso de Saga, emisión y notificaciones', 'KEDA por retraso; alarmas por tópico.'],
        ['Indisponibilidad de Kafka', 'Se detiene la coordinación', 'MSK en 3 zonas, RF 3, min ISR 2; el Outbox retiene los mensajes.'],
      ]} />
    ),
  },

  /* ───────────────────────── 10. TRAZABILIDAD ───────────────────────── */
  {
    sec: 10, title: 'Trazabilidad entre requisitos y diseño',
    body: (
      <T dense head={['Requisito / meta', 'Funcional · info · concurrencia', 'Despliegue', 'Desarrollo', 'Operacional', 'Perspectivas']} rows={[
        ['Sin doble asignación (M2)', 'Apartado en Valkey + CAS; orden de apartado; transacción única.', 'Valkey y RDS Multi-AZ.', 'Pruebas de concurrencia.', 'No corregir asignaciones sin validar versión.', 'Fallo seguro.'],
        ['Disponibilidad 24/7 (M3)', 'Aislamiento de fallos y degradación.', '3 zonas, activo-activo, Multi-AZ.', 'Canary con reversión; migraciones compatibles.', 'SLA 99,9 %, guardia 24/7, RPO/RTO.', 'EC3, EC6; disponibilidad (14.1).'],
        ['Throughput en picos (M3)', 'Búsqueda desacoplada; Saga asíncrona.', 'Escalado por servicio.', 'k6.', 'Alarmas de capacidad.', 'Modelo de desempeño (13.2).'],
        ['Consistencia entre servicios (M2, M3)', 'Saga, Outbox, idempotencia, < 2 s.', 'MSK replicado.', 'Contratos de eventos.', 'Retraso de consumo y DLQ.', '—'],
        ['Pagos tardíos y reembolsos (M5)', 'Regla determinista de compensación.', '—', 'Escenarios de falla.', 'Conciliación de EN_VERIFICACION.', '—'],
        ['Emisión separada de la reserva (M3)', 'Emisión con estados propios.', '—', '—', 'Alarma de EMISION_FALLIDA.', '—'],
        ['LifeMiles (M6)', 'Libro en PostgreSQL; redención en la Saga.', 'DocumentDB y RDS.', '—', 'Respaldo de ambos motores.', '—'],
        ['EDIFACT y NDC (M4)', 'Modelo canónico y etiqueta de canal.', 'Enlaces con GDS.', 'Contratos de mensajes.', 'Monitoreo de enlaces.', '—'],
        ['Datos y trazabilidad (M5)', 'Histórico, tokenización, consentimiento.', 'KMS y CloudTrail.', 'Logs sin datos sensibles.', 'Retención de 10 años.', 'Seguridad (13.1).'],
        ['Tarifas sin inactividad (M1)', 'Servicio de Tarifas independiente.', '—', 'Banderas en AppConfig.', 'Cambios por pipeline.', 'Puntos de variación (14.2.3).'],
        ['Operabilidad (M3)', 'Observabilidad y vigilancia de DLQ.', 'CloudWatch y X-Ray.', 'lib-observabilidad.', 'Administración y soporte.', '—'],
      ]} />
    ),
  },
  {
    sec: 10, title: 'Cobertura de arquitectura empresarial y ADM',
    body: (
      <Cols r="0.9fr 1.1fr">
        <div>
          <h4 className="h4">Cinco dimensiones de arquitectura empresarial</h4>
          <div className="layers">
            <div><span className="mono">Negocio</span>Controladores, metas, capacidades, cadena de valor, proceso (§3–4)</div>
            <div><span className="mono">Datos</span>Dominio, ER, propiedad, estados, tópicos, retención (§7)</div>
            <div><span className="mono">Aplicaciones</span>Componentes, contratos, flujos, concurrencia, desarrollo (§6, 8, 11)</div>
            <div><span className="mono">Tecnología</span>Despliegue, red, seguridad, operación (§9, 12)</div>
            <div className="kafka"><span className="mono">Gobernanza</span>Principios, ADR, comité, controles (§1.6, 10.3)</div>
          </div>
        </div>
        <div>
          <h4 className="h4">Ciclo de vida según el ADM de TOGAF</h4>
          <T dense head={['Fase del ADM', 'Dónde se cubre']} rows={[
            ['A · Visión', 'Secciones 1 y 2'],
            ['B · Negocio', 'Sección 4'],
            ['C · Datos y aplicaciones', 'Secciones 6 a 8'],
            ['D · Tecnología', 'Sección 9'],
            ['E y F · Oportunidades y migración', 'Secciones 5.8 y 12.3'],
            ['G · Gobierno de la implementación', 'Sección 10.3'],
            ['H · Gestión del cambio', 'Sección 14.2'],
          ]} />
          <p className="muted">Controles de COBIT 2019: APO03 (arquitectura empresarial), BAI03 (soluciones), BAI06 (cambios), DSS02 (incidentes) y DSS04 (continuidad). La operación sigue ITIL.</p>
        </div>
      </Cols>
    ),
  },
  {
    sec: 10, title: 'Gobernanza de la arquitectura',
    body: (
      <Cards cols={3} small items={[
        { tag: 'ADR', t: 'Registro de decisiones', d: 'Contexto, alternativas, decisión, consecuencias y principio. La Tabla 7 es el registro inicial; el documento y sus diagramas Mermaid se versionan junto a los ADR.' },
        { tag: 'Cada dos semanas', t: 'Comité técnico de arquitectura', d: 'Arquitecto, líderes de Reservas, Inventario y Pagos, operaciones y seguridad. Aprueba cambios de principios, contratos o tecnologías.' },
        { tag: 'Cada trimestre', t: 'Comité de dirección', d: 'Gerencia comercial, cumplimiento, finanzas, dirección de TI y arquitecto. Decide inversiones y el paso de la etapa 1 a la 2.', tone: 'amber' },
        { tag: 'Controles', t: 'Automáticos en el pipeline', d: 'Reglas de dependencia, contratos y políticas de infraestructura; revisión trimestral de conformidad con los principios.' },
        { tag: 'Beneficios', t: 'Seguimiento de las metas', d: 'Cada trimestre se revisan M1 a M6 y el costo real frente a la sección 5.8; si una meta no se cumple, ADR con acción correctiva.', tone: 'teal' },
        { tag: 'Excepciones', t: 'Con ADR aprobado', d: 'Toda desviación de un principio lleva riesgo y fecha de revisión.' },
      ]} />
    ),
  },

  /* ───────────────────────── 11. DESARROLLO ───────────────────────── */
  {
    sec: 11, title: 'Estructura de módulos y reglas de dependencia',
    body: (
      <Cols r="1fr 1fr" center>
        <Fig id="28" />
        <div>
          <List items={[
            <><b>Dirección:</b> un módulo solo depende de niveles inferiores. Entre servicios del mismo nivel no hay dependencia de código: solo comandos y eventos de <Code>contratos-eventos</Code>.</>,
            <><b>Datos:</b> cada servicio accede solo a su base.</>,
            <><b>Bibliotecas y contratos:</b> paquetes npm privados (<Code>@avianca/lib-resiliencia</Code>, <Code>@avianca/contratos-api</Code>…) en GitHub Packages, sin lógica de negocio y compatibles hacia atrás.</>,
            <><b>Control automático:</b> el pipeline falla con <Code>dependency-cruiser</Code> si se rompe una regla.</>,
          ]} />
        </div>
      </Cols>
    ),
  },
  {
    sec: 11, title: 'Arquitectura hexagonal en cada servicio',
    body: (
      <Cols r="1fr 0.9fr" center>
        <Fig id="29" />
        <div>
          <p>Núcleo de dominio y casos de uso aislado de la tecnología. En inventario-asientos, el adaptador primario es el consumidor de comandos de Kafka; los secundarios son Valkey (<Code>SET NX PX</Code>), PostgreSQL (CAS) y el publicador del Outbox.</p>
          <pre className="tree mono">{`inventario-asientos/
├── src/
│   ├── dominio/
│   ├── casos-uso/
│   ├── puertos/        entrada/, salida/
│   ├── adaptadores/    rest, kafka, valkey, postgres
│   ├── configuracion/  módulos NestJS
│   ├── main.http.ts    solo con API de borde
│   └── main.consumer.ts
├── test/   unitarias, integracion, contrato, concurrencia
├── migraciones/        TypeORM
├── deploy/             Dockerfile + Helm
└── .github/workflows/`}</pre>
        </div>
      </Cols>
    ),
  },
  {
    sec: 11, title: 'Diseño común: patrones y funciones transversales',
    body: (
      <Cols r="0.9fr 1.1fr">
        <div>
          <h4 className="h4">Patrones obligatorios</h4>
          <div className="chips">
            {['Arquitectura hexagonal', 'Saga orquestada con compensación', 'Transactional Outbox', 'Consumidor idempotente + DLQ', 'CAS por versión + TTL', 'Circuit breaker y timeout', 'Modelo de lectura', 'Servicios sin estado'].map((x) => <Pill key={x}>{x}</Pill>)}
          </div>
          <h4 className="h4">Concurrencia en Node.js</h4>
          <List items={[
            <><Code>main.consumer.ts</Code> como Deployment propio, escalado con KEDA.</>,
            'Pool HTTP de borde con event loop y HPA.',
            'Exclusión del asiento en Valkey + CAS, no en memoria.',
            'Worker threads para el cálculo de tarifas.',
            'Vigilante y barrido protegidos con lease.',
          ]} />
        </div>
        <T dense head={['Función', 'Estándar', 'Módulo']} rows={[
          ['Logging', 'JSON con pino y trace_id; sin tarjetas ni datos personales sin enmascarar.', 'lib-observabilidad'],
          ['Configuración', 'Parameter Store, Secrets Manager, AppConfig. No arranca si TTL ≤ timeout_pago + margen.', 'lib-config'],
          ['Seguridad', 'Cognito + JWT en el Gateway; KMS dedicada para Pagos.', 'lib-seguridad'],
          ['Internacionalización', 'nestjs-i18n; fechas UTC; monedas ISO 4217.', 'lib-config'],
          ['Resiliencia', 'Timeout, backoff, circuit breaker (opossum), idempotencia.', 'lib-resiliencia'],
          ['Instrumentación', 'OpenTelemetry → CloudWatch y X-Ray; probes; alarmas de DLQ y retraso.', 'lib-observabilidad'],
        ]} />
      </Cols>
    ),
  },
  {
    sec: 11, title: 'Línea de código: ramas, versiones y pipeline',
    body: (
      <Cols r="0.8fr 1.2fr">
        <div className="zones">
          <div><span className="mono">Repos</span>Uno por servicio, por biblioteca, para contratos y para infraestructura.</div>
          <div><span className="mono">Ramas</span>Trunk-based, ramas cortas; 2 aprobaciones en inventario y reservas.</div>
          <div><span className="mono">Versiones</span>Conventional Commits y SemVer con release-please. Un contrato incompatible es versión mayor y convive ≥ 90 días, hasta que la telemetría muestre que nadie lo usa.</div>
          <div><span className="mono">Esquemas</span>Compatibilidad FULL_ALL en comandos, respuestas y eventos; lo incompatible va a un tópico nuevo con sufijo .v2.</div>
          <div><span className="mono">Imágenes</span>Inmutables en ECR, promovidas sin recompilar.</div>
          <div><span className="mono">Entornos</span>Dev, pruebas, staging y producción, cada uno en su cuenta AWS.</div>
          <div className="kafka"><span className="mono">Producción</span>Canary con Argo Rollouts y rollback automático: HTTP 1 % → 10 % → 50 %; consumidores de Kafka por réplicas (1 pod = 3–4 de 12 particiones, 25–33 %, luego 50 %) con asignación cooperativa.</div>
          <div><span className="mono">Base de datos</span>Migraciones compatibles: esquema primero, código después.</div>
        </div>
        <Fig id="30" />
      </Cols>
    ),
  },
  {
    sec: 11, title: 'Pruebas, stack y riesgos del desarrollo',
    body: (
      <Cols r="1.15fr 0.85fr">
        <T dense head={['Prueba', 'Verifica', 'Herramienta']} rows={[
          ['Unitaria', 'Dominio y casos de uso sin tecnologías externas.', 'Vitest'],
          ['Integración', 'Adaptadores contra PostgreSQL, Valkey, Kafka y Mongo reales.', 'Testcontainers'],
          ['Contrato', 'Esquemas en Glue Schema Registry, APIs de borde, NDC y EDIFACT.', 'Pact'],
          ['Saga', 'Timeouts, reenvíos, respuestas tardías y compensaciones.', 'Vitest + Testcontainers'],
          [<b className="hi">Concurrencia</b>, '100 solicitudes sobre un asiento → exactamente 1 confirmación.', 'Vitest + Testcontainers'],
          ['Escenarios de falla', 'Tabla 14 y escenarios de calidad.', 'Staging'],
          ['Carga', '121 % de la nominal y benchmark de Valkey.', 'k6'],
        ]} />
        <div>
          <h4 className="h4">Riesgos y mitigación</h4>
          <List items={[
            <><b>Madurez DevOps:</b> pipeline e instrumentación desde el primer servicio.</>,
            <><b>Complejidad de la Saga:</b> biblioteca común y pruebas de falla en cada cambio.</>,
            <><b>Event loop bloqueado:</b> worker threads y pruebas al 121 %.</>,
            <><b>Valkey bajo contención:</b> benchmark de SET NX PX, TTL y CAS (PoC1).</>,
            <><b>Divergencia de contratos:</b> registro de esquemas, pruebas de contrato, SemVer.</>,
            <><b>Activo-activo de Reservas:</b> Saga y Outbox en la primera iteración.</>,
            <><b>Obsolescencia:</b> revisión semestral y Dependabot.</>,
          ]} />
        </div>
      </Cols>
    ),
  },

  /* ───────────────────────── 12. OPERACIONAL ───────────────────────── */
  {
    sec: 12, title: 'Modelo de instalación, actualización y reversión',
    body: (
      <Cols r="1fr 1fr">
        <Fig id="31" />
        <div>
          <p>Cada ambiente se instala con Terraform y el pipeline, en grupos que respetan sus dependencias técnicas. Si la verificación de un grupo falla, se revierte solo ese grupo.</p>
          <List items={[
            'Ambientes separados en cuentas de AWS distintas.',
            'Imágenes inmutables; se registra commit, imagen y configuración.',
            'Despliegue independiente por microservicio.',
            <>Canary en Reservas, Inventario, Tarifas y Pagos, 10 min por paso: <b>1 % → 10 % → 50 %</b> del tráfico HTTP; en consumidores de Kafka, <b>25–33 % → 50 %</b> de las particiones.</>,
            'Reversión automática ante errores, latencia o health checks fallidos.',
            'Migraciones compatibles hacia atrás.',
            <><b>Presupuesto de errores:</b> disponibilidad medida con monitoreo sintético; al consumir el 75 % de los 43,8 min se congelan las liberaciones que no corrigen fallas.</>,
          ]} />
        </div>
      </Cols>
    ),
  },
  {
    sec: 12, title: 'Migración por etapas frente a Altéa',
    body: (
      <Cols r="0.9fr 1.2fr">
        <Fig id="32" />
        <div>
          <Cards cols={2} small items={[
            { tag: 'Etapa 1', t: 'Todo menos el inventario', d: 'Canales, postventa, pagos y fidelización pasan al sistema nuevo. Inventario de Asientos funciona como adaptador que aparta y confirma en Altéa por sus interfaces; el resto de la Saga no cambia.', tone: 'teal' },
            { tag: 'Etapa 2', t: 'Strangler fig por lotes de vuelos', d: 'La autoridad del inventario pasa al sistema nuevo lote a lote. Para cada vuelo existe en todo momento un único sistema autoritativo (P1).', tone: 'amber' },
          ]} />
          <p><b>Sin CDC sobre Altéa:</b> como lo aloja Amadeus, toda sincronización usa sus interfaces (EDIFACT o sus API). El CDC solo se usa con la plataforma propia de LifeMiles. Altéa conserva siempre el check-in y el control de salidas.</p>
          <div className="callout">
            <div className="callout-v">≈ 5 M reservas</div>
            <div>con vuelos futuros (la mayoría en los próximos cuatro meses). Cada lote se copia y verifica en &lt; 10 min; al menos tres ensayos completos en staging con una copia anonimizada.</div>
          </div>
          <p className="muted"><b>Itinerarios mixtos:</b> los lotes se arman por pares de ruta y conexiones frecuentes; si una reserva combina un vuelo migrado y otro no, la Capa de Integración coordina una Saga con dos participantes. <b>Reversión:</b> la autoridad del lote vuelve a Altéa y las reservas nuevas se reenvían por sus interfaces, mientras Altéa conserve la venta (hasta la fase 5).</p>
        </div>
      </Cols>
    ),
  },
  {
    sec: 12, title: 'Modelo de administración: observabilidad',
    body: (
      <Cols>
        <div className="panel">
          <Pill tone="teal">Backend</Pill>
          <List items={[
            <><b>OpenTelemetry:</b> el trace_id viaja en las cabeceras de cada comando y evento; una Saga completa es una sola traza. Sin DaemonSets en Fargate, el colector ADOT corre como sidecar y los logs salen por Fluent Bit.</>,
            <><b>CloudWatch:</b> logs, métricas, paneles y alarmas.</>,
            <><b>X-Ray:</b> recorrido entre servicios y cuellos de botella.</>,
            <><b>Probes</b> de liveness y readiness.</>,
            <><b>Alarmas de Kafka:</b> retraso de consumo, DLQ y reintentos.</>,
            <><b>Alarmas de negocio:</b> Sagas vencidas, PENDIENTE vencidas, EN_VERIFICACION, conflictos, EMISION_FALLIDA.</>,
          ]} />
        </div>
        <div className="panel">
          <Pill tone="violet">Front-end</Pill>
          <List items={[
            <><b>CloudWatch RUM:</b> experiencia real: carga, errores JS, latencia por navegador y dispositivo.</>,
            <><b>CloudWatch Synthetics:</b> recorridos periódicos de búsqueda, selección e inicio de reserva, sin cobros.</>,
            'Identificador de correlación desde el front hasta el Gateway.',
            'App móvil con instrumentación aprobada, sin datos sensibles.',
          ]} />
          <p className="muted">Eventos medidos: búsqueda, selección de asiento, inicio de pago, confirmación y cancelación.</p>
        </div>
      </Cols>
    ),
  },
  {
    sec: 12, title: 'Mantenimiento y condiciones de error',
    body: (
      <Cols r="0.85fr 1.15fr">
        <div>
          <T dense head={['Frecuencia', 'Tarea']} rows={[
            ['Diaria', 'DLQ; conciliar EN_VERIFICACION y reembolsos FALLIDO; verificar respaldos; EMISION_FALLIDA y GuardDuty.'],
            ['Semanal', 'Tendencias de latencia y retraso; parches de Dependabot.'],
            ['Mensual', 'Probar restauración y medir RTO; costos y capacidad; permisos IAM.'],
            ['Semestral', 'Revisar versiones (Kubernetes antes del fin de su soporte en EKS); simulacro regional con el pilot light.'],
            ['Antes de campañas', 'Prueba de carga al 121 % y aumento preventivo de capacidad.'],
          ]} />
          <p className="muted">Sin cerrar el servicio: ventanas de AWS de 02:00 a 05:00 (hora de Colombia) con conmutación Multi-AZ de 1–2 min, PostgreSQL mayor con azul/verde de RDS y congelamiento de cambios desde 48 h antes de cada campaña. Por eso el SLA no excluye el mantenimiento.</p>
        </div>
        <T dense head={['Condición observada', 'Causa probable', 'Acción']} rows={[
          ['Más FALLIDA por ASIENTO_NO_DISPONIBLE', 'Pérdida de apartados o contención', 'Revisar ElastiCache; confirmar que no hay doble asignación.'],
          ['Pagos acumulados en EN_VERIFICACION', 'Pasarela lenta o caída', 'Verificar pasarela; activar conciliación.'],
          ['Retraso de consumo creciente', 'Consumidor lento o pico', 'Escalar consumidor; revisar DLQ.'],
          ['Sagas en REQUIERE_INTERVENCION', 'Compensación incompleta', 'Completar a mano con doble aprobación.'],
          ['Sagas con paso vencido en aumento', 'Participante detenido o tópico con retraso', 'Revisar el retraso y la salud del servicio; verificar que KEDA escaló.'],
          ['Conmutación de una base', 'Falla de zona o del primario', 'Verificar reconexión y retraso de réplica.'],
          ['429 masivo en el Gateway', 'Abuso o límite mal calibrado', 'Revisar reglas de WAF y límites.'],
          ['Tiquetes en EMISION_FALLIDA', 'Falla de Emisión o de un vecino', 'Reintentar; si persiste, escalar a N3.'],
        ]} />
      </Cols>
    ),
  },
  {
    sec: 12, title: 'Modelo de soporte y acuerdos de nivel de servicio',
    body: (
      <Cols r="1fr 1fr">
        <div className="stack">
          <Fig id="33" h="34vh" />
          <div className="sev">
            <div className="p1"><b className="mono">P1</b>Venta detenida o riesgo de doble asignación, cobro indebido o fuga de datos.</div>
            <div className="p2"><b className="mono">P2</b>Función importante degradada, la venta continúa.</div>
            <div className="p3"><b className="mono">P3</b>Falla con alternativa o pocos usuarios.</div>
            <div className="p4"><b className="mono">P4</b>Consulta o defecto cosmético.</div>
          </div>
        </div>
        <div>
          <T dense head={['Indicador', 'Meta']} rows={[
            ['Disponibilidad de reservas', '99,9 % mensual, sin exclusiones por mantenimiento'],
            ['Búsqueda', 'p95 ≤ 2 s'],
            ['Creación de reserva', 'p95: 202 ≤ 1 s; apartado visible ≤ 3 s (sin autorización externa)'],
            ['Propagación de eventos', 'p99 < 2 s'],
            ['Incidente P1', 'Acuse ≤ 15 min · act. 30 min · recuperación ≤ 4 h'],
            [<b className="hi">Restauración de la venta tras un P1</b>, '≤ 30 min (reversión, conmutación o modo solo consulta)'],
            ['Incidente P2', 'Acuse ≤ 30 min · act. 60 min · recuperación ≤ 8 h'],
            ['Incidente P3', 'Acuse ≤ 4 h · resolución ≤ 3 días hábiles'],
            ['Incidente P4', 'Acuse ≤ 1 día hábil'],
          ]} />
          <p className="muted">El SLA cubre canales propios y GDS y absorbe las fallas de AWS dentro de la región. Solo se excluyen, y se reportan aparte, las caídas de proveedores externos (pasarela, GDS, correo y SMS) y la pérdida total de la región (rige el RTO del pilot light).</p>
          <p className="muted">N1 mesa de servicio registra y clasifica; N2 Operaciones TI diagnostica, revierte y concilia; N3 desarrollo corrige y analiza la causa raíz. Un P2 sin resolver en 2 h pasa a N3.</p>
        </div>
      </Cols>
    ),
  },
  {
    sec: 12, title: 'Configuración, respaldo y restauración',
    body: (
      <Cols r="0.75fr 1.25fr">
        <div>
          <h4 className="h4">Nada se cambia a mano</h4>
          <div className="zones">
            <div><span className="mono">Infraestructura</span>Terraform + PR con plan revisado</div>
            <div><span className="mono">Tiempos</span>Parameter Store; validación al arrancar</div>
            <div><span className="mono">Banderas</span>AppConfig con despliegue gradual: recargos, canales, degradación y modo solo consulta (<Code>venta_suspendida</Code>)</div>
            <div><span className="mono">Secretos</span>Secrets Manager con rotación</div>
            <div><span className="mono">Resiliencia</span>PR con evidencia de carga</div>
          </div>
          <p className="muted">Copias con AWS Backup, cifradas con KMS y replicadas a <b>us-west-2</b>, donde el pilot light cubre la pérdida de la región (14.1.4).</p>
        </div>
        <T dense head={['Dato', 'Mecanismo', 'RPO', 'RTO']} rows={[
          ['PostgreSQL críticas (Reservas, Inventario, Pagos, Fidelización)', 'Multi-AZ síncrono, PITR, instantánea diaria, réplica de lectura en la 2.ª región', '0 (zona) · ≤ 5 min (corrupción)', '≤ 2 min · ≤ 1 h'],
          ['Demás PostgreSQL', 'PITR, instantánea diaria y réplica en la 2.ª región', '≤ 5 min', '≤ 2 h'],
          ['DocumentDB: perfil', 'Réplicas en 3 zonas, PITR; clúster global con secundario en la 2.ª región', '≤ 5 min', '≤ 2 h'],
          ['DocumentDB: modelo de lectura', 'Se reconstruye desde eventos', 'derivado', '≤ 4 h'],
          ['Valkey', 'No se respalda: temporal', '—', '≤ 5 min'],
          ['Kafka (MSK)', 'RF 3, 7 días, copia continua a S3', '0 (zona)', '≤ 1 h'],
          ['Histórico (S3)', 'Versionado y replicación regional', '≤ 15 min', '≤ 24 h'],
          ['Configuración e infraestructura', 'Git y Terraform', '0', '≤ 4 h por ambiente'],
          [<b className="hi">Pérdida de la región</b>, 'Pilot light: réplicas entre regiones, DocumentDB global, MSK Replicator; cómputo al conmutar', <b className="hi">≤ 1 min</b>, <b className="hi">≤ 2 h para la venta</b>],
        ]} />
      </Cols>
    ),
  },

  /* ───────────────────────── 13. PERSPECTIVAS ───────────────────────── */
  {
    sec: 13, title: 'Perspectiva de seguridad: amenazas STRIDE',
    body: (
      <>
        <p className="note">Activos: inventario (integridad), datos de pago (confidencialidad), datos personales de 16 M socios (confidencialidad), saldo de millas (integridad) y disponibilidad de la venta.</p>
        <T dense head={['Amenaza', 'Ejemplo', 'Contramedida']} rows={[
          ['Suplantación', 'Robo de credenciales de agente; relleno de credenciales en LifeMiles', 'Cognito con MFA para agentes; WAF contra bots; bloqueo por intentos'],
          ['Manipulación', 'El cliente altera el precio', 'El precio siempre lo calcula Tarifas; el cliente envía solo la oferta'],
          ['Manipulación', 'Webhook falso de la pasarela', 'Firma HMAC y consulta de confirmación'],
          ['Suplantación', 'Mensajes falsos de un supuesto GDS o socio', 'TLS mutuo con certificado por socio y lista de IP autorizadas'],
          ['Suplantación', 'Pruebas masivas de tarjetas robadas (card testing)', '3-D Secure y antifraude de la pasarela; límite de intentos por reserva e IP'],
          ['Repudio', 'Un agente niega una cancelación', 'Eventos inmutables con el actor; CloudTrail'],
          ['Divulgación', 'Datos personales en logs', 'Logs enmascarados; KMS; sin tarjetas'],
          ['Divulgación', 'Consultar reservas ajenas probando localizadores', 'Localizador + apellido o sesión; localizadores no secuenciales; límite de tasa'],
          ['Denegación de servicio', 'Ráfaga de búsquedas en Hot Sale', 'WAF, límite por cliente, escalado de Búsqueda'],
          ['Denegación de servicio', 'Bots que apartan asientos sin pagar (seat spinning)', 'Límite de apartados por cliente y medio de pago; CAPTCHA; reglas de WAF'],
          ['Elevación de privilegios', 'Un agente emite reembolsos a su favor', 'Doble aprobación sobre un umbral y registro del actor'],
          ['Elevación de privilegios', 'Servicio comprometido accede a Pagos', 'IRSA, RBAC por namespace, security groups for pods'],
        ]} />
      </>
    ),
  },
  {
    sec: 13, title: 'Tácticas de seguridad y hallazgos',
    body: (
      <Cols r="0.9fr 1.1fr">
        <Cards cols={1} small items={[
          { tag: 'Táctica', t: 'Menor privilegio', d: 'Un rol IAM por servicio con acceso solo a su base, sus tópicos (permisos IAM por tópico) y sus secretos; acceso administrativo temporal y auditado.' },
          { tag: 'Táctica', t: 'Defensa en profundidad', d: 'CloudFront + WAF → Gateway → autorización por servicio → permisos por tópico → grupos de seguridad → KMS → CloudTrail.' },
          { tag: 'Táctica', t: 'Fallo seguro', d: 'Si la redención, el token o la confirmación fallan, se rechaza. Un pago desconocido nunca confirma.', tone: 'amber' },
          { tag: 'Táctica', t: 'Separación de responsabilidades', d: 'Solo Pagos habla con la pasarela y usa comandos.pagos; correcciones manuales con doble aprobación; desarrollo sin acceso a producción.' },
        ]} />
        <T dense head={['Hallazgo', 'Mejora incorporada']} rows={[
          ['El Gateway era el único control de borde frente a bots', 'CloudFront y AWS WAF delante del Gateway'],
          ['El precio podía llegar desde el canal', 'Tarifas siempre recalcula; el cliente envía la oferta'],
          ['Los webhooks podían falsificarse', 'Firma HMAC y deduplicación'],
          ['Agentes con privilegios de cancelar y reembolsar', 'MFA obligatorio y actor en cada evento'],
          ['Logs con datos personales', 'Enmascaramiento obligatorio en lib-observabilidad'],
          ['Pagos compartía llave de cifrado', 'Llave KMS dedicada'],
        ]} />
      </Cols>
    ),
  },
  {
    sec: 13, title: 'Perspectiva de desempeño: metas y modelo',
    body: (
      <Cols r="0.85fr 1.15fr">
        <div>
          <T dense head={['Carga', 'Búsquedas / s', 'Reservas / s']} rows={[
            ['Nominal (hora pico × 5 en campaña)', '1.850', '6'],
            ['Pico Hot Sale (121 %, EC1)', '2.240', '7,3'],
            [<b className="hi">Capacidad de diseño</b>, <b className="hi">3.000</b>, <b className="hi">30</b>],
          ]} />
          <List items={[
            <><b>Responsividad:</b> búsqueda ≤ 2 s; 202 ≤ 1 s; apartado visible ≤ 3 s (p95).</>,
            <><b>Turnaround:</b> tiquete ≤ 30 s tras confirmar; reembolso solicitado ≤ 1 min.</>,
            <><b>Predictibilidad:</b> p99 ≤ 2 × p95.</>,
          ]} />
          <p className="muted"><b>Modelo:</b> 16 M reservas/año ≈ 44.000/día; hora pico 10 % → 1,2 reservas/s; relación 300:1 → 370 búsquedas/s; concentración ×5 en campaña → nominal. El margen en reservas cubre las ráfagas de los GDS. Un pod de Búsqueda ≈ 300 consultas/s → 10 pods + 20 % = 12. Relación 300:1 y factor 5 son supuestos a validar.</p>
        </div>
        <Fig id="34" />
      </Cols>
    ),
  },
  {
    sec: 13, title: 'Tácticas de desempeño y hallazgos',
    body: (
      <Cols r="0.85fr 1.15fr">
        <Cards cols={1} small items={[
          { tag: 'Táctica', t: 'Optimizar el camino crítico', d: 'Búsqueda sobre modelo precalculado sin uniones; la reserva solo guarda y responde 202.' },
          { tag: 'Táctica', t: 'Paralelismo', d: '≥ 12 particiones por id_reserva e id_vuelo; varios pods; worker threads.' },
          { tag: 'Táctica', t: 'Procesamiento asíncrono', d: 'Coordinación, emisión, notificaciones, millas e ingesta por eventos.' },
          { tag: 'Táctica', t: 'Escalado selectivo', d: 'Solo Búsqueda, Inventario y consumidores con retraso escalan agresivamente.' },
        ]} />
        <T dense head={['Hallazgo', 'Mejora incorporada']} rows={[
          ['REST síncrono entre servicios acoplaba la disponibilidad', 'Saga solo por Kafka; 202 y consulta del estado'],
          ['Un Lock Manager serializado sería cuello de botella', 'Apartado distribuido en Valkey + CAS en PostgreSQL'],
          ['Picos de eventos degradaban las consultas HTTP', 'Consumidores en procesos separados de los pools HTTP'],
          ['El cálculo de tarifas bloqueaba el event loop', 'Worker threads y pods de 2 vCPU'],
          ['Búsquedas competían con las reservas', 'Modelo de lectura en DocumentDB'],
          ['Muchos pods agotaban conexiones de PostgreSQL', 'Amazon RDS Proxy para Inventario y Reservas'],
        ]} />
      </Cols>
    ),
  },

  /* ───────────────────────── 14. DISPONIBILIDAD Y EVOLUCIÓN ───────────────────────── */
  {
    sec: 14, title: 'Clases de servicio y modos de operación',
    kicker: '14.1 Disponibilidad y resiliencia',
    body: (
      <Cols r="1.05fr 1fr">
        <div>
          <T dense head={['Clase', 'Funciones', 'Objetivo', 'Modo degradado']} rows={[
            [<b className="hi">A · Crítica para la venta</b>, 'Búsqueda, creación y pago (Reservas, Inventario, Tarifas, Pagos), Gateway e Integración', '99,9 %', 'Tarifas caído: réplica local. Pasarela lenta: EN_VERIFICACION. Falla prolongada de MSK, Inventario o Reservas: modo solo consulta.'],
            ['B · Posventa necesaria', 'Emisión, cancelación y reembolso, redención con millas', '99,5 %', 'Emisión diferida hasta 24 h; reembolsos encolados. La redención no se degrada: solo se vende con dinero.'],
            ['C · Complementaria', 'Perfil, notificaciones, acumulación de millas, ingesta analítica', '99 %', 'Se omite o se difiere: los eventos esperan en Kafka.'],
          ]} />
          <p className="note">La integridad del asiento y del saldo de millas <b>no se degrada en ninguna clase</b>: si no puede garantizarse, se rechaza (fallo seguro). El modo solo consulta lo activa la bandera <Code>venta_suspendida</Code> de AppConfig, para todo el sistema o solo un vuelo, ruta o canal: las nuevas reservas reciben 503 y la búsqueda sigue respondiendo.</p>
        </div>
        <Fig id="35" />
      </Cols>
    ),
  },
  {
    sec: 14, title: 'Modelo de disponibilidad y presupuesto de indisponibilidad',
    kicker: '14.1.2',
    body: (
      <Cols r="0.95fr 1.05fr">
        <div>
          <div className="callout">
            <div className="callout-v">99,68 %</div>
            <div>Producto de los SLA de AWS en el camino de una reserva (CloudFront, API Gateway, Fargate, MSK, RDS y ElastiCache): ≈ 140 min al mes. El 99,9 % <b>no se respalda con contratos</b>; se demuestra midiendo de extremo a extremo.</div>
          </div>
          <p><b>A = MTBF / (MTBF + MTTR).</b> Con MTTR de 4 h, el 99,9 % exige un MTBF de 3.996 h (≈ 166 días sin fallas totales); con MTTR de 30 min baja a 500 h (≈ 21 días). La disponibilidad se gana <b>reduciendo el tiempo de reparación</b>; por eso el SLA separa la restauración de la venta (≤ 30 min) de la causa raíz (≤ 4 h).</p>
          <p className="muted">Un P1 de 30 min consume el 68 % del presupuesto del mes; dos P1 rompen el SLA. Al consumir el 75 % se congelan las liberaciones que no corrigen fallas.</p>
        </div>
        <T dense head={['Causa', 'Frecuencia', 'Impacto', 'Min/mes']} rows={[
          ['Conmutación Multi-AZ de una base crítica', '2 al mes', '1,5 min de escrituras rechazadas', '3'],
          ['Conmutación de Valkey o de un broker', '1 al mes', '< 1 min con reintentos', '1'],
          ['Versión defectuosa detenida por el canary', '2 al mes', '10 min sobre ≤ ⅓ del tráfico', '6,6'],
          ['Caída de una zona', '1 al año', '≤ 2 min (EC3)', '0,2'],
          ['Incidente P1 que detiene la venta', '1 por trimestre', '≤ 30 min', '10'],
          [<b>Total estimado</b>, '', '', <b>20,8</b>],
          [<b className="hi">Reserva</b>, 'Fallas de AWS y no previstas', '', <b className="hi">23,0</b>],
        ]} />
      </Cols>
    ),
  },
  {
    sec: 14, title: 'Tácticas de disponibilidad y hallazgos',
    kicker: '14.1.3 · 14.1.5',
    body: (
      <Cols r="0.9fr 1.1fr">
        <Cards cols={1} small items={[
          { tag: 'Táctica', t: 'Clustering y failover', d: 'Pods en tres zonas; Reservas activo-activo con lease; RDS Multi-AZ con Proxy; Valkey y DocumentDB con dos réplicas; MSK con RF 3 y min ISR 2. Ninguna falla de zona requiere intervención humana.' },
          { tag: 'Táctica', t: 'Registro de transacciones', d: 'WAL de PostgreSQL (PITR ≤ 5 min), Outbox, 7 días de Kafka y copia en S3. Por la idempotencia, reproducir eventos no duplica cobros, asientos ni millas.' },
          { tag: 'Táctica', t: 'Cronograma de disponibilidad', d: 'Campañas, temporadas altas e irregularidades valen más: congelamiento 48 h antes y capacidad mínima elevada; mantenimiento de 02:00 a 05:00.' },
          { tag: 'Táctica', t: 'Aislamiento y degradación', d: 'Solo Kafka entre servicios; consumidores separados de HTTP; circuit breaker hacia pasarela y GDS; banderas para los modos de operación.' },
        ]} />
        <T dense head={['Hallazgo', 'Mejora incorporada']} rows={[
          ['Un P1 podía durar 4 h, pero el mes solo admite 43,8 min', 'Restauración de la venta ≤ 30 min; las 4 h quedan para la causa raíz'],
          ['Los SLA de AWS dan 99,68 % y no había regla de protección', 'Disponibilidad medida de extremo a extremo y presupuesto de errores'],
          ['Una falla prolongada acumulaba reservas PENDIENTE', 'Modo solo consulta con venta_suspendida'],
          ['Perder la región era perder 24 h de datos y de venta', 'Pilot light: RPO ≤ 1 min y RTO ≤ 2 h, con simulacro semestral'],
          ['Las versiones mayores de PostgreSQL reinician la base', 'Despliegues azul/verde de RDS fuera de campañas'],
          ['Mantenimiento y liberaciones podían coincidir con campañas', 'Ventanas de 02:00 a 05:00 y congelamiento de 48 h'],
        ]} />
      </Cols>
    ),
  },
  {
    sec: 14, title: 'Recuperación ante desastres: pilot light en us-west-2',
    kicker: '14.1.4',
    body: (
      <Cols r="1.1fr 1fr">
        <Fig id="36" />
        <div>
          <Lead>Cada día sin vender son ≈ 16 M USD. Los <b>datos y la mensajería</b> se mantienen replicados en marcha; solo el <b>cómputo</b>, lo más costoso, se escala al declarar el desastre.</Lead>
          <List items={[
            <><b>PostgreSQL:</b> réplica de lectura entre regiones por instancia, con segundos de retraso.</>,
            <><b>DocumentDB:</b> clúster global con secundario en us-west-2.</>,
            <><b>Kafka:</b> MSK Replicator copia tópicos y posiciones de los consumidores.</>,
            <><b>S3:</b> Replication Time Control, ≤ 15 min.</>,
            <><b>Llaves:</b> KMS multirregión desde el inicio (una llave existente no se convierte).</>,
            <><b>Identidad:</b> Cognito no replica: grupo sincronizado; tras conmutar, los pasajeros entran con un código por correo.</>,
            <><b>Listos en cero:</b> EKS con réplicas en 0, API Gateway, WAF, Valkey vacío, RDS Proxy, DNS privados, cuotas ampliadas e IP autorizadas por Amadeus, Sabre y la pasarela.</>,
          ]} />
        </div>
      </Cols>
    ),
  },
  {
    sec: 14, title: 'Procedimiento de conmutación regional y tiempos',
    kicker: '14.1.4',
    body: (
      <Cols r="1.2fr 0.8fr">
        <ol className="steps">
          <li><b>Declarar el desastre</b> si la región no responde por más de 30 min sin fecha de recuperación del proveedor. <span className="mono dim">30 min</span></li>
          <li><b>Promover</b> las réplicas de RDS y el secundario de DocumentDB a primarios, en paralelo. <span className="mono dim">≤ 15 min</span></li>
          <li><b>Escalar los pods</b> desde cero hasta la carga nominal, en paralelo con el paso 2. <span className="mono dim">≤ 15 min</span></li>
          <li><b>Reconciliar el inventario</b> antes de abrir: todo asiento con asignación confirmada, tiquete o evento de confirmación replicado se marca OCUPADO; las PENDIENTE de la ventana perdida se cancelan y sus autorizaciones se anulan; las confirmadas en el último minuto se reconstruyen desde la pasarela, los tiquetes y las notificaciones. <span className="mono dim">≤ 30 min</span></li>
          <li><b>Cambiar el origen</b> de CloudFront (o DNS con Route 53 ARC) hacia us-west-2 y abrir la venta gradualmente. <span className="mono dim">≤ 15 min</span></li>
        </ol>
        <div>
          <Stats items={[
            { v: '≈ 90 min', l: 'en total', s: 'RTO de la venta ≤ 2 h' },
            { v: '≤ 1 min', l: 'de datos perdidos', s: 'RPO; alarma de replicación a 60 s' },
          ]} />
          <p className="muted">La conmutación es una decisión del procedimiento, no automática: el origen de respaldo de CloudFront solo conmuta GET y lo haría ante cualquier error. El retorno a us-east-1 es planificado, en sentido inverso y en una ventana de bajo tráfico.</p>
          <p className="muted"><b>Límite:</b> no es activo-activo; durante la contingencia hay una sola región activa. El costo agrega réplicas, DocumentDB secundario, un MSK pequeño, el plano de control de EKS y la transferencia entre regiones.</p>
        </div>
      </Cols>
    ),
  },
  {
    sec: 14, title: 'Perspectiva de evolución: cambios previstos',
    kicker: '14.2 Evolución',
    body: (
      <>
        <T dense head={['Cambio', 'Dimensión', 'Magnitud', 'Probabilidad', 'Plazo', 'Respuesta del diseño']} rows={[
          ['Tarifas por tallas y complementarios', 'Funcional', 'Media', 'Alta', '6–12 meses', 'Tarifas aislado; reglas en AppConfig; eventos con contrato compatible.'],
          ['Inventario por clase de reserva', 'Funcional', 'Alta (P1)', 'Media', '1–2 años', 'Se difiere; la hexagonal lo aísla en Inventario; exige un ADR.'],
          ['Mezcla EDIFACT/NDC o nueva versión de NDC', 'Entorno', 'Baja', 'Alta', 'Meses', 'Adaptadores por protocolo, modelo canónico y bandera de canales.'],
          ['Venta de aliados de Star Alliance', 'Entorno', 'Media', 'Media', '1–2 años', 'Nuevo adaptador; la Saga y la integridad no cambian.'],
          ['Otra pasarela de pagos', 'Entorno', 'Media', 'Media', '1–2 años', 'Puerto de pasarela en Pagos.'],
          ['Actualizaciones de plataforma', 'Plataforma', 'Baja, frecuentes', 'Segura', 'Continua', 'Revisión semestral, imágenes inmutables, azul/verde, Terraform.'],
          ['Multirregión activo-activo', 'Plataforma', 'Alta', 'Baja a media', '2–3 años', 'Se difiere; pilot light y Terraform por región preparan el camino.'],
          ['Cambio de proveedor de nube', 'Plataforma', 'Muy alta', 'Baja', 'Indefinida', 'No se abstrae; estándares abiertos reducen el costo de salida.'],
          ['Cambios regulatorios', 'Entorno', 'Baja a media', 'Media', 'Anual', 'Tarjetas fuera del sistema; consentimiento; lib-seguridad.'],
        ]} />
        <p className="note"><b>Tradeoff:</b> se paga la flexibilidad desde el inicio cuando el cambio es probable y adaptarlo después sería caro (P2, P9, adaptadores, puertos hexagonales); se difiere cuando es improbable o cuesta más de lo que ahorra (multirregión activo-activo, que rediseñaría la autoridad única del inventario, e independencia de la nube, que renunciaría a los administrados).</p>
      </>
    ),
  },
  {
    sec: 14, title: 'Puntos de variación y hallazgos de evolución',
    kicker: '14.2.3 · 14.2.4',
    body: (
      <Cols r="1.1fr 0.9fr">
        <T dense head={['Punto de variación', 'Mecanismo', 'Qué cambia sin reescribir']} rows={[
          ['Adaptadores de Integración', 'Modelo canónico, un adaptador por protocolo', 'Un GDS, una versión de NDC o un aliado'],
          ['Puerto de pasarela', 'Hexagonal en Pagos', 'Una pasarela o medio de pago'],
          ['Puertos de persistencia', 'Hexagonal en cada servicio', 'El motor de datos de un servicio'],
          ['Suscripción a eventos', 'Publicación/suscripción en Kafka', 'Funciones nuevas como consumidores'],
          ['Contratos versionados', 'Registro de esquemas FULL_ALL', 'Campos y eventos nuevos'],
          ['Reglas y banderas', 'AWS AppConfig', 'Recargos, canales y modos degradados'],
          ['Parámetros', 'Parameter Store', 'TTL, timeouts, reintentos, circuit breaker'],
          ['Infraestructura', 'Terraform por ambiente y región', 'Ambientes y región de contingencia'],
        ]} />
        <div>
          <h4 className="h4">Hallazgos y mejoras</h4>
          <List items={[
            <><b>Modo de compatibilidad sin fijar</b> → FULL_ALL, porque productores y consumidores se despliegan en cualquier orden y el histórico se reproduce años después.</>,
            <><b>Convivencia de versiones sin plazo</b> → ≥ 90 días y hasta que nadie use la anterior.</>,
            <><b>Documento y ADR podían divergir</b> → se versionan juntos; cada ADR actualiza su sección.</>,
            <><b>Kubernetes podía salir del soporte de EKS</b> → la revisión semestral planifica su actualización.</>,
          ]} />
          <p className="muted"><b>Preservación del conocimiento:</b> ADR, diagramas como código Mermaid, contratos en el registro de esquemas, hexagonal y procedimientos de operación.</p>
        </div>
      </Cols>
    ),
  },

  /* ───────────────────────── 15. CIERRE ───────────────────────── */
  {
    sec: 15, title: 'Glosario esencial',
    body: (
      <div className="glossary">
        {[
          ['Apartado', 'Reserva temporal de un asiento en Valkey, con TTL, mientras el cliente paga.'],
          ['CAS', 'Compare-and-set: actualización que solo se aplica si la versión no cambió.'],
          ['Saga', 'Pasos locales con compensaciones que coordinan una transacción entre servicios.'],
          ['Outbox', 'Tabla donde se guarda el mensaje en la misma transacción que el cambio de estado.'],
          ['Idempotencia', 'Mismo resultado aunque la operación se ejecute varias veces.'],
          ['Comando', 'Mensaje que pide a un servicio ejecutar un paso de la Saga.'],
          ['DLQ', 'Cola de mensajes fallidos para no bloquear la partición.'],
          ['Lease', 'Reclamación temporal de una Saga por una instancia.'],
          ['Canary', 'Despliegue que envía primero una fracción pequeña del tráfico o de las particiones.'],
          ['PSS', 'Sistema de servicio al pasajero (reservas, inventario, check-in), como Amadeus Altéa.'],
          ['PNL y ADL', 'Mensajes IATA con la lista de pasajeros de un vuelo y sus cambios.'],
          ['BSP', 'Sistema de IATA por el que las agencias liquidan las ventas hechas por GDS.'],
          ['EDIFACT / NDC', 'Mensajería de los GDS / estándar IATA de distribución moderna.'],
          ['RPO / RTO', 'Máxima pérdida de datos aceptable / tiempo máximo de recuperación.'],
          ['Pilot light', 'Datos y mensajería replicados en otra región; el cómputo se escala al declarar el desastre.'],
          ['Presupuesto de errores', 'Indisponibilidad que admite la meta: 43,8 min al mes para el 99,9 %.'],
          ['Modo solo consulta', 'La búsqueda sigue activa y las nuevas reservas se rechazan (venta_suspendida).'],
          ['Borrado criptográfico', 'Suprimir un dato cifrado destruyendo su llave.'],
          ['MTBF / MTTR', 'Tiempo medio entre fallas / tiempo medio de reparación.'],
          ['Punto de variación', 'Lugar preparado para extender o reemplazar una parte sin reescribir el resto.'],
        ].map(([t, d]) => (
          <div key={t} className="gl"><b>{t}</b><span>{d}</span></div>
        ))}
      </div>
    ),
  },
  {
    sec: 15, layout: 'end', title: 'Gracias',
    body: (
      <div className="end">
        <div className="mono dim">VUELO COMPLETADO · ATERRIZAJE EN HORARIO</div>
        <h2 className="end-t">¡Gracias!</h2>
        <p className="end-sub">El asiento 14C tiene un solo dueño, y ninguna falla vuelve a apagar toda la venta. Gracias por su atención.</p>
        <div className="refs">
          <b className="mono">REFERENCIAS PRINCIPALES</b>
          <span>Rozanski y Woods (2009). <i>Software Systems Architecture</i>. Addison-Wesley.</span>
          <span>The Open Group (2011). <i>TOGAF 9.1</i>. · IEEE Std 1471-2000.</span>
          <span>Hitpass (2014). <i>Business Process Management</i>. · Bijlsma et al. (2011). <i>Software Architecture</i>.</span>
          <span>Richardson (2018). <i>Microservices Patterns</i>. · Beyer et al. (2016). <i>Site Reliability Engineering</i>.</span>
          <span>AWS (2021). <i>Disaster Recovery of Workloads on AWS</i>. · Fowler (2004). <i>StranglerFigApplication</i>.</span>
          <span>Avianca Group (2025), resultados 3T · Amadeus (2021) · Ley 1581 de 2012 · Decreto 1377 de 2013 · PCI-DSS v4.0.1 · Ley 962 de 2005.</span>
        </div>
        <div className="mono dim">Carolina Cuero Guevara · Luis Alberto Girón · Nilson Aldair Molina Rengifo · 2026</div>
      </div>
    ),
  },
];
