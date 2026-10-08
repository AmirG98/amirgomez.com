import { NextRequest, NextResponse } from 'next/server';
import { isMasterAuthorized } from '../../../../lib/client-auth';

// Gabi, el second brain de A+ Growth. INTERNO: solo el equipo (cookie agrowth_team
// o maestra). "Antes de preguntarle a Amir, preguntale a Gabi."
//
// [client] es el slug del apartado del master board ("founder-accelerator",
// "casafight") o "general" para mirar todos los clientes.
//
//   POST            -> { answer, en_contexto }
//   GET             -> { log }            qué preguntaron y si estaba en contexto
//   GET ?docs=1     -> { docs }           qué contextos tiene cargados
//   PUT ?doc=<slug> -> sube el contexto interno de un cliente (o "agencia")
//   DELETE          -> vacía el registro
//
// El contexto interno vive en Upstash (gabi:contexto:<slug>), no en el código:
// el repo es público.

export const maxDuration = 60;

type Turn = { role: 'user' | 'assistant'; content: string };
type Registro = { ts: string; quien: string; apartado: string; pregunta: string; respuesta: string; en_contexto: boolean };
type Card = { titulo: string; quien: string; cliente?: string; columna: string; vence?: string; urgente?: boolean; nota?: string; canal?: string; pedido_por?: string; pedido_fecha?: string; mensaje?: string; links?: string[] };
type Ficha = Record<string, unknown>;
type Board = { cards?: Card[]; clientes?: Record<string, Ficha> };

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
  await fetch(`${cfg.url}/set/${encodeURIComponent(key)}`, { method: 'POST', headers: { Authorization: `Bearer ${cfg.token}` }, body: JSON.stringify(valor) });
}
const slugify = (n: string) => n.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

function tarjetas(cards: Card[]): string {
  if (!cards.length) return 'Sin tareas.';
  return cards.map((c) =>
    `- [${c.columna}] ${c.titulo} | responsable: ${c.quien}${c.cliente ? ` | cliente: ${c.cliente}` : ''}${c.vence ? ` | vence ${c.vence}` : ''}${c.urgente ? ' | urgente' : ''}` +
    (c.nota ? `\n    detalle: ${c.nota}` : '') +
    (c.canal || c.pedido_por ? `\n    origen: ${c.canal || ''} ${c.pedido_por ? 'pedido por ' + c.pedido_por : ''} ${c.pedido_fecha || ''}` : '') +
    (c.mensaje ? `\n    pedido textual: ${c.mensaje}` : '') +
    (c.links && c.links.length ? `\n    links: ${c.links.join(' , ')}` : '')).join('\n');
}
function ficha(nombre: string, f: Ficha): string {
  const lista = (k: string) => Array.isArray(f[k]) ? (f[k] as unknown[]).map((x) => typeof x === 'string' ? `- ${x}` : `- ${Object.values(x as object).join(' | ')}`).join('\n') : '';
  return `FICHA DE ${nombre.toUpperCase()}\nEstado: ${f.estado || ''} ${f.estado_txt || ''}\nObjetivo: ${f.objetivo || ''}\nNúmeros clave:\n${lista('kpis')}\nAcordado en la última reunión:\n${lista('acuerdos')}\nPendiente de ellos:\n${lista('de_ellos')}\nA decidir:\n${lista('abierto')}\nFechas:\n${lista('hitos')}\nReunión: ${f.reunion || ''}\nContactos: ${f.contactos || ''}\nLinks:\n${lista('links')}`;
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  if (!esEquipo(req)) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  if (req.nextUrl.searchParams.get('docs')) {
    const idx = ((await leer('gabi:docs')) as string[] | null) || [];
    return NextResponse.json({ docs: idx });
  }
  void client;
  return NextResponse.json({ log: (await leer('gabi:log')) || [] });
}

export async function PUT(req: NextRequest) {
  if (!esEquipo(req)) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const slug = slugify(req.nextUrl.searchParams.get('doc') || '');
  if (!slug) return NextResponse.json({ error: 'falta_doc' }, { status: 400 });
  const body = await req.json().catch(() => ({}));
  const texto = typeof body.texto === 'string' ? body.texto.slice(0, 120000) : '';
  await escribir(`gabi:contexto:${slug}`, { texto, actualizado: new Date().toISOString() });
  const idx = new Set(((await leer('gabi:docs')) as string[] | null) || []); idx.add(slug);
  await escribir('gabi:docs', Array.from(idx));
  return NextResponse.json({ ok: true, slug, chars: texto.length });
}

export async function DELETE(req: NextRequest) {
  if (!esEquipo(req)) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  await escribir('gabi:log', []);
  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  if (!esEquipo(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'ai_not_configured' }, { status: 503 });

  let body: { question?: string; history?: Turn[]; quien?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }
  const question = String(body.question || '').trim().slice(0, 1500);
  if (question.length < 3) return NextResponse.json({ error: 'question_too_short' }, { status: 400 });
  const history: Turn[] = (Array.isArray(body.history) ? body.history : [])
    .filter((t): t is Turn => !!t && (t.role === 'user' || t.role === 'assistant') && typeof t.content === 'string')
    .slice(-6).map((t) => ({ role: t.role, content: t.content.slice(0, 2500) }));
  const quien = String(body.quien || '').trim().slice(0, 40) || 'Equipo';

  const board = ((await leer('teamboard:agrowth')) as Board | null) || {};
  const fichas = board.clientes || {};
  const nombre = Object.keys(fichas).find((n) => slugify(n) === client) || '';
  const general = !nombre;
  const cards = (board.cards || []).filter((c) => general || c.cliente === nombre);
  const abiertas = cards.filter((c) => c.columna !== 'Listo');
  const listas = cards.filter((c) => c.columna === 'Listo').slice(-25);

  const agencia = (await leer('gabi:contexto:agencia')) as { texto?: string } | null;
  const docsCliente = general
    ? await Promise.all(Object.keys(fichas).map(async (n) => ({ n, d: (await leer(`gabi:contexto:${slugify(n)}`)) as { texto?: string; actualizado?: string } | null })))
    : [{ n: nombre, d: (await leer(`gabi:contexto:${client}`)) as { texto?: string; actualizado?: string } | null }];
  // Los trainings del equipo (gabi:contexto:training-NN) se leen siempre, en cualquier apartado.
  const slugsTraining = (((await leer('gabi:docs')) as string[] | null) || []).filter((s) => s.startsWith('training-')).sort();
  const trainings = await Promise.all(slugsTraining.map(async (s) => ((await leer(`gabi:contexto:${s}`)) as { texto?: string } | null)?.texto || ''));
  const hoy = new Date().toISOString().slice(0, 10);

  const system =
    `Sos Gabi, el second brain de A+ Growth. Le respondés al equipo interno (Pilar, Agustín, Joel) para que no tengan que preguntarle a Amir lo que ya está documentado. Si te preguntan quién sos, decilo en una oración.\n\n` +
    `IDIOMA: español rioplatense con voseo, directo y corto.\nHOY: ${hoy}.\nQUIÉN PREGUNTA: ${quien}.\nAPARTADO: ${general ? 'General (todos los clientes)' : nombre}.\n\n` +
    `REGLAS Y FORMA DE TRABAJO DE LA AGENCIA\n${(agencia && agencia.texto) || 'Sin cargar.'}\n\n` +
    (trainings.some(Boolean) ? `TRAININGS DEL EQUIPO (banco interno en /hq/equipo/entrenamientos; citá el número del training cuando respondas con uno)\n${trainings.filter(Boolean).join('\n\n')}\n\n` : '') +
    (general ? Object.entries(fichas).map(([n, f]) => ficha(n, f)).join('\n\n') : (nombre ? ficha(nombre, fichas[nombre]) : '')) + '\n\n' +
    docsCliente.filter((x) => x.d && x.d.texto).map((x) => `CONTEXTO INTERNO DE ${x.n.toUpperCase()} (actualizado ${String(x.d!.actualizado || '').slice(0, 10)})\n${x.d!.texto}`).join('\n\n') + '\n\n' +
    `TAREAS ABIERTAS DEL MASTER BOARD\n${tarjetas(abiertas)}\n\nTAREAS TERMINADAS RECIENTES\n${tarjetas(listas)}\n\n` +
    `CÓMO RESPONDÉS\n` +
    `- Solo con lo que está arriba. Si hay contradicción, vale lo más reciente: el board y la ficha mandan sobre el contexto escrito.\n` +
    `- Si preguntan qué tienen que hacer, quién lleva algo o para cuándo, usá el board: tarea, responsable, estado, fecha y el pedido textual si sirve.\n` +
    `- Si preguntan cómo hacer algo (tono, idioma de un cliente, formato de un entregable, a quién va qué), usá los trainings, las reglas de la agencia y el contexto del cliente. Lo marcado [A CONFIRMAR] en un training todavía no es regla: decilo.\n` +
    `- Decí de dónde sale el dato cuando ayude: "según el board", "lo que se decidió el 7/10", "está en el CONTEXTO de FA".\n\n` +
    `REGLAS DURAS\n` +
    `1. Nunca inventes números, fechas, precios, decisiones ni compromisos. Si no está arriba, no lo tenés.\n` +
    `2. Si la respuesta no está o no alcanza para responder con seguridad, empezá exactamente con la marca [SIN_CONTEXTO] y en una o dos oraciones decí que no está documentado y que hay que preguntárselo a Amir. No rellenes con consejos genéricos.\n` +
    `3. No des contraseñas ni credenciales de cuentas de clientes: decí dónde se consultan.\n` +
    `4. Nunca uses rayas largas (em dash).`;

  const pedir = (model: string) => fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'anthropic-beta': 'server-side-fallback-2026-07-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model, max_tokens: 1000, fallbacks: 'default', system, messages: [...history, { role: 'user', content: question }] }),
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

  const log = ((await leer('gabi:log')) as Registro[] | null) || [];
  log.unshift({ ts: new Date().toISOString(), quien, apartado: general ? 'General' : nombre, pregunta: question, respuesta: answer.slice(0, 1500), en_contexto: enContexto });
  await escribir('gabi:log', log.slice(0, 300));
  return NextResponse.json({ answer, en_contexto: enContexto });
}
