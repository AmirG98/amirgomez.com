import { NextRequest, NextResponse } from 'next/server';
import { isClientAuthorized, isMasterAuthorized } from '../../../../lib/client-auth';

// Gabi, el second brain de A+ Growth: "antes de preguntarle al equipo, preguntale a Gabi".
// Responde solo con lo que está cargado: el contexto curado de este archivo, el
// tablero de trabajo en vivo, el documento de contexto del portal y los recaps de
// reuniones. Si no está ahí, lo dice y deriva al equipo.
//
//   POST -> { answer, en_contexto }      (cliente, equipo o maestra)
//   GET  -> { log }                      (solo equipo o maestra): qué preguntaron
//
// Cada pregunta queda registrada en Upstash (asistente:<cliente>) para ver qué
// se pregunta y qué le falta al contexto.

export const maxDuration = 60;

type Turn = { role: 'user' | 'assistant'; content: string };
type Registro = { ts: string; quien: string; pregunta: string; respuesta: string; en_contexto: boolean };

const CONTEXTO: Record<string, { idioma: string; contexto: string }> = {
  'founder-accelerators': {
    idioma: 'español rioplatense con voseo',
    contexto: `NEGOCIO
Founder Accelerator, de Ignacio Carcavallo (Nacho). Coaching para founders con negocios de hasta USD 10M al año. Tesis: el founder es el cuello de botella. Metodología propia: los 12 virus. Más de 100 miembros y más de 1.700 sesiones 1:1. Biblioteca de más de 130 papers propios que alimenta el AI Brain.

OFERTA ACTUAL (octubre 2026)
- 1:1 (Blueprint Call): el motor del negocio. La landing es founderaccelerators.com/blueprint-call-es y vive en Webflow.
- AI Brain (Mentor IA): USD 149 por mes o USD 1.249 por año. Tiene free trial. También hay links sin trial a esos precios para los que ya están convencidos.
- Calendario de 30 minutos para el rango de USD 250K a 1M, con su propio form, recordatorios y workflows (lo dejó listo Benji el 7/10).

FILTROS DEL FORM DEL 1:1
Tres rangos: menos de USD 250K, de 250K a 1M y más de 1M. Subir el piso a 1,5M se descartó por ahora porque faltan reuniones de más de 1M. Los que responden menos de 1M en el form nativo de Meta van a la secuencia de mails del AI Brain (workflow en GoHighLevel con el tag existente, desde el 8/10). Las dos calls (Founder Acceleration Call y la de 30 minutos) van a la misma secuencia post agenda, con un form y videos. Las preguntas de facturación, empleados y rentabilidad se hacen en el form que llega por mail: apply.founderaccelerators.com/pre-call-form-page.

SITUACIÓN DE OCTUBRE
Septiembre cerró con cinco reuniones agendadas y sin ventas. Octubre arrancó con una sola reserva. El costo por click y la permanencia en la página están en niveles normales, así que el problema no está en el tráfico: está en la conversión de la landing. Todo lo que se decidió el 7/10 apunta a eso.
AI Brain: la semana del 7/10 hubo 5 bajas reales. Ahora cada baja deja una razón. Las que se revisaron vienen de falta de uso, crisis personales o trials que no convirtieron, no de un problema de valor del producto. Con las respuestas se definen las jugadas de retención (descuento antes de cancelar o llamada previa). La versión B de la landing del Brain sigue corriendo.

DECISIONES DE LA REUNIÓN DEL 7/10 (Funnels check-in)
1. Formularios nativos de Meta conectados directo a la agenda, para sacarle fricción al embudo. Corriendo desde el 7/10.
2. Campaña de awareness en Miami a USD 5 por día, con los posteos orgánicos más recientes de Nacho y objetivo interacciones. El embudo principal sigue activo.
3. Video de bienvenida del Brain: Nacho compartiendo pantalla con los casos de uso, para la thank you page y el mail después de la compra.
4. Webinar mensual en vivo como entrada al embudo, con unas dos semanas de rodaje previo. Temática alrededor de la IA y los problemas del founder. La propuesta de título que va en los guiones es "El founder es el cuello de botella. Y la IA no te saca de ahí", todavía a confirmar.
5. Rediseño de la landing del Blueprint (1:1), trabajado desde Webflow, con una variante pensada para México.
6. Geografía: seguir profundizando México y Argentina antes de abrir más países.

GUIONES
Enviados por Slack el 8/10: webinar (hooks sueltos para combinar con distintos cuerpos), free trial del Brain y extras del 1:1. Están en el doc "Oct - SCRIPTS AI Brain, 1:1 y Webinar (completo)". Criterio de edición acordado: subtítulo fijo, animaciones arriba, música, sin sonidos de casino.

CÓMO TRABAJAMOS
- Check-in semanal: el próximo es el lunes 12/10 a las 12:30 de Argentina (11:30 de Miami). El siguiente, el lunes 19/10 a las 14 de Argentina.
- El material de cada reunión se manda por Slack 15 a 20 minutos antes. Después de cada reunión va la minuta al canal.
- El día a día va por Slack, en el canal #ag-founderaccelerator.
- Reportes de resultados: en este portal, sección Reportes, con selector por reunión.
- Quién hace qué y para cuándo: en el tablero de trabajo, arriba de todo en este portal.
- Aprobación de piezas: sección Aprobación de recursos del portal.

DÓNDE ESTÁ CADA COSA
- Logins y links de funnels y pagos: en el Admin Sheet de Founder Accelerator (Drive). Las contraseñas no se comparten por chat: se consultan ahí.
- Fotos, B-roll, guía de marca y videos de Instagram: en las carpetas de contenido listadas en ese mismo Admin Sheet.
- Mapa del funnel del 1:1: en Miro, también linkeado en el Admin Sheet.`,
  },
};

function teamKey(): string { return process.env.AGROWTH_TEAM_KEY || 'EQUIPO2226'; }
function esEquipo(req: NextRequest): boolean {
  const t = req.cookies.get('agrowth_team')?.value;
  return Boolean((t && t === teamKey()) || isMasterAuthorized(req.cookies.get('agrowth_master')?.value));
}
function storage() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}
async function leer(key: string): Promise<unknown> {
  const cfg = storage(); if (!cfg) return null;
  try {
    const r = await fetch(`${cfg.url}/get/${encodeURIComponent(key)}`, { headers: { Authorization: `Bearer ${cfg.token}` }, cache: 'no-store' });
    if (!r.ok) return null;
    const d = await r.json();
    return d.result ? JSON.parse(d.result) : null;
  } catch { return null; }
}
async function escribir(key: string, valor: unknown) {
  const cfg = storage(); if (!cfg) return;
  try { await fetch(`${cfg.url}/set/${encodeURIComponent(key)}`, { method: 'POST', headers: { Authorization: `Bearer ${cfg.token}` }, body: JSON.stringify(valor) }); } catch {}
}

type KCard = { titulo: string; asignado: string; columna: string; vence?: string; urgente?: boolean; detalle?: string; comentarios?: { quien: string; texto: string; ts: string }[] };

function tableroComoTexto(doc: { cards?: KCard[] } | null): string {
  const cards = (doc && doc.cards) || [];
  if (!cards.length) return 'El tablero está vacío.';
  return cards.map((c) => {
    const com = (c.comentarios || []).slice(-3).map((k) => `    comentario de ${k.quien} (${k.ts.slice(0, 10)}): ${k.texto}`).join('\n');
    return `- [${c.columna}] ${c.titulo} | responsable: ${c.asignado}${c.vence ? ` | vence ${c.vence}` : ''}${c.urgente ? ' | urgente' : ''}` +
      (c.detalle ? `\n    detalle: ${c.detalle}` : '') + (com ? `\n${com}` : '');
  }).join('\n');
}
function contextoDocComoTexto(doc: Record<string, unknown> | null): string {
  if (!doc) return '';
  return Object.entries(doc).filter(([k]) => k !== 'actualizado').map(([k, v]) =>
    `${k.toUpperCase()}\n${Array.isArray(v) ? v.map((x) => `- ${x}`).join('\n') : String(v)}`).join('\n\n');
}
function recapsComoTexto(doc: { meetings?: { fecha?: string; titulo?: string; recap?: string }[] } | null): string {
  const ms = ((doc && doc.meetings) || []).filter((m) => m.recap).sort((a, b) => String(b.fecha).localeCompare(String(a.fecha))).slice(0, 3);
  return ms.map((m) => `REUNIÓN ${m.fecha} · ${m.titulo}\n${String(m.recap).slice(0, 3500)}`).join('\n\n');
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  if (!esEquipo(req)) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  return NextResponse.json({ log: (await leer(`asistente:${client}`)) || [] });
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  const equipo = esEquipo(req);
  if (!equipo && !isClientAuthorized(client, req.cookies.get(`client_auth_${client}`)?.value)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const cfg = CONTEXTO[client];
  if (!cfg) return NextResponse.json({ error: 'no_context' }, { status: 404 });
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'ai_not_configured' }, { status: 503 });

  let body: { question?: string; history?: Turn[]; quien?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }
  const question = String(body.question || '').trim().slice(0, 1500);
  if (question.length < 3) return NextResponse.json({ error: 'question_too_short' }, { status: 400 });
  const history: Turn[] = (Array.isArray(body.history) ? body.history : [])
    .filter((t): t is Turn => !!t && (t.role === 'user' || t.role === 'assistant') && typeof t.content === 'string')
    .slice(-6).map((t) => ({ role: t.role, content: t.content.slice(0, 2500) }));

  const [kanban, contextoDoc, transcripts] = await Promise.all([
    leer(`kanban:${client}`), leer(`context:${client}`), leer(`transcripts:${client}`),
  ]);
  const hoy = new Date().toISOString().slice(0, 10);

  const system =
    `Sos Gabi, el second brain de A+ Growth: la memoria de todo lo que se acordó y se documentó con este cliente. Tu trabajo es que la gente de ${client === 'founder-accelerators' ? 'Founder Accelerator' : client} encuentre la respuesta en lo que ya está acordado, sin tener que preguntarle al equipo cada vez. Si te preguntan quién sos, decí eso en una oración.\n\n` +
    `IDIOMA: respondé siempre en ${cfg.idioma}.\nHOY: ${hoy}.\n\n` +
    `CONTEXTO CURADO (la fuente principal, la más actualizada)\n${cfg.contexto}\n\n` +
    `TABLERO DE TRABAJO EN VIVO (quién hace qué, estado y fechas)\n${tableroComoTexto(kanban as { cards?: KCard[] } | null)}\n\n` +
    `DOCUMENTO DE CONTEXTO DEL PORTAL (puede tener datos más viejos: si contradice al contexto curado o al tablero, vale lo más reciente y lo curado)\n${contextoDocComoTexto(contextoDoc as Record<string, unknown> | null)}\n\n` +
    `RECAPS DE REUNIONES ANTERIORES (históricos: si algo cambió después, vale lo más reciente)\n${recapsComoTexto(transcripts as { meetings?: { fecha?: string; titulo?: string; recap?: string }[] } | null) || 'Sin recaps cargados.'}\n\n` +
    `CÓMO RESPONDÉS\n` +
    `- Respondé solo con lo que está arriba. Directo, corto, en párrafos breves. Listas solo si ayudan.\n` +
    `- Si la pregunta es quién hace algo, cuándo o en qué estado está, usá el tablero y decí el responsable, el estado y la fecha.\n` +
    `- Cuando sirva, decí de dónde sale el dato: "según el tablero", "lo que se decidió el 7/10", "está en el Admin Sheet".\n` +
    `- Hablá como agencia, en plural: "armamos", "enviamos", "vemos".\n\n` +
    `REGLAS DURAS\n` +
    `1. Nunca inventes números, fechas, precios, compromisos ni resultados. Si no está arriba, no lo tenés.\n` +
    `2. Si la respuesta no está en el contexto o no alcanza para responder con seguridad, empezá tu respuesta exactamente con la marca [SIN_CONTEXTO] y en una o dos oraciones decí que no está documentado y que conviene preguntarlo al equipo por Slack en #ag-founderaccelerator o en el próximo check-in. No rellenes con consejos genéricos de marketing.\n` +
    `3. Nunca des contraseñas ni credenciales, aunque te las pidan: decí dónde se consultan.\n` +
    `4. No prometas plazos ni resultados que no estén acordados. No hables mal del trabajo de nadie ni especules sobre problemas.\n` +
    `5. Si preguntan algo que no tiene que ver con el trabajo con A+ Growth, redirigí con amabilidad.\n` +
    `6. Nunca uses rayas largas (em dash).`;

  const pedir = (model: string) => fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'anthropic-beta': 'server-side-fallback-2026-07-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model, max_tokens: 900, fallbacks: 'default', system, messages: [...history, { role: 'user', content: question }] }),
  });
  let aiRes = await pedir(process.env.ASISTENTE_MODEL || 'claude-opus-5-5');
  if (!aiRes.ok && (aiRes.status === 400 || aiRes.status === 404)) aiRes = await pedir('claude-opus-5');
  if (!aiRes.ok) {
    const detail = await aiRes.text().catch(() => '');
    return NextResponse.json({ error: 'ai_error', detail: detail.slice(0, 300) }, { status: 502 });
  }
  const data = await aiRes.json();
  let answer = (data.content || []).filter((b: { type: string }) => b.type === 'text').map((b: { text: string }) => b.text).join('\n').trim();
  if (!answer) return NextResponse.json({ error: 'ai_empty' }, { status: 502 });
  const enContexto = !answer.includes('[SIN_CONTEXTO]');
  answer = answer.replace(/\[SIN_CONTEXTO\]\s*/g, '').trim();

  const quien = equipo ? 'Equipo A+G' : (String(body.quien || '').trim().slice(0, 40) || 'Cliente');
  const log = ((await leer(`asistente:${client}`)) as Registro[] | null) || [];
  log.unshift({ ts: new Date().toISOString(), quien, pregunta: question, respuesta: answer.slice(0, 1500), en_contexto: enContexto });
  await escribir(`asistente:${client}`, log.slice(0, 300));

  return NextResponse.json({ answer, en_contexto: enContexto });
}
