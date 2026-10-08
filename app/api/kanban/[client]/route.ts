import { NextRequest, NextResponse } from 'next/server';
import { isMasterAuthorized } from '../../../../lib/client-auth';

// Tablero de trabajo compartido con el cliente, arriba de todo en su portal.
//
//   GET  -> { doc, rol, columnas, personas }
//   POST -> { op: 'add' | 'update' | 'move' | 'comment' | 'delete', ... }
//
// Roles:
//   agencia (cookie agrowth_team o agrowth_master): edita, mueve y borra todo.
//   cliente (cookie client_auth_<cliente>): agrega tareas, comenta cualquiera y
//   edita, mueve o borra solo las que creó o están asignadas a su gente.
// Los permisos se validan acá, no en el front.

export const maxDuration = 30;

const COLUMNAS = ['Por hacer', 'En curso', 'En revisión', 'Listo'];
const AGENCIA = ['Amir', 'Pilar', 'Agustín', 'Joel', 'Equipo A+G'];
const PERSONAS_CLIENTE: Record<string, string[]> = {
  'founder-accelerators': ['Ignacio', 'Benji'],
};

type Comentario = { quien: string; texto: string; ts: string };
type Evento = { ts: string; que: string };
type Card = {
  id: string; titulo: string; detalle: string; asignado: string; columna: string;
  urgente: boolean; vence: string; links: string[]; creado_por: 'agencia' | 'cliente';
  creado: string; actualizado: string; comentarios: Comentario[]; historial: Evento[];
};
type Doc = { cards: Card[]; actualizado?: string };

function teamKey(): string { return process.env.AGROWTH_TEAM_KEY || 'EQUIPO2226'; }

function rol(req: NextRequest, client: string): 'agencia' | 'cliente' | null {
  const team = req.cookies.get('agrowth_team')?.value;
  const master = req.cookies.get('agrowth_master')?.value;
  if ((team && team === teamKey()) || isMasterAuthorized(master)) return 'agencia';
  // Interno: el cliente no tiene acceso a este tablero (decision 8/10).
  void client;
  return null;
}

function storageConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}
const key = (c: string) => `kanban:${c}`;

async function leer(cfg: { url: string; token: string }, client: string): Promise<Doc | null> {
  const res = await fetch(`${cfg.url}/get/${encodeURIComponent(key(client))}`, {
    headers: { Authorization: `Bearer ${cfg.token}` }, cache: 'no-store',
  });
  if (!res.ok) throw new Error('storage');
  const data = await res.json();
  return data.result ? JSON.parse(data.result) : null;
}
async function guardar(cfg: { url: string; token: string }, client: string, doc: Doc) {
  const res = await fetch(`${cfg.url}/set/${encodeURIComponent(key(client))}`, {
    method: 'POST', headers: { Authorization: `Bearer ${cfg.token}` }, body: JSON.stringify(doc),
  });
  if (!res.ok) throw new Error('storage');
}

const txt = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const fecha = (v: unknown) => (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : '');
const links = (v: unknown) =>
  Array.isArray(v) ? v.filter((x) => typeof x === 'string').map((x) => x.trim().slice(0, 500)).filter(Boolean).slice(0, 10) : [];

function personas(client: string) { return { agencia: AGENCIA, cliente: PERSONAS_CLIENTE[client] || [] }; }

function puedeEditar(r: 'agencia' | 'cliente', c: Card, client: string): boolean {
  if (r === 'agencia') return true;
  return c.creado_por === 'cliente' || (PERSONAS_CLIENTE[client] || []).includes(c.asignado);
}

function autorValido(r: 'agencia' | 'cliente', client: string, autor: string): string {
  const p = personas(client);
  const lista = r === 'agencia' ? p.agencia.concat(p.cliente) : p.cliente;
  return lista.includes(autor) ? autor : (r === 'agencia' ? 'A+ Growth' : 'Cliente');
}

function log(c: Card, que: string) {
  c.historial = [{ ts: new Date().toISOString(), que }, ...(c.historial || [])].slice(0, 40);
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  const r = rol(req, client);
  if (!r) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const cfg = storageConfig();
  if (!cfg) return NextResponse.json({ error: 'storage_not_configured' }, { status: 503 });
  try {
    const doc = (await leer(cfg, client)) || { cards: [] };
    return NextResponse.json({ doc, rol: r, columnas: COLUMNAS, personas: personas(client) });
  } catch {
    return NextResponse.json({ error: 'storage_error' }, { status: 502 });
  }
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  const r = rol(req, client);
  if (!r) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const cfg = storageConfig();
  if (!cfg) return NextResponse.json({ error: 'storage_not_configured' }, { status: 503 });

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }

  let doc: Doc;
  try { doc = (await leer(cfg, client)) || { cards: [] }; } catch { return NextResponse.json({ error: 'storage_error' }, { status: 502 }); }

  const p = personas(client);
  const todos = p.agencia.concat(p.cliente);
  const autor = autorValido(r, client, txt(body.autor, 40));
  const now = new Date().toISOString();
  const op = txt(body.op, 20);
  const id = txt(body.id, 60);
  const card = doc.cards.find((c) => c.id === id);
  const prohibido = () => NextResponse.json({ error: 'forbidden' }, { status: 403 });

  if (op === 'add') {
    const d = (body.card || {}) as Record<string, unknown>;
    const titulo = txt(d.titulo, 200);
    if (!titulo) return NextResponse.json({ error: 'falta_titulo' }, { status: 400 });
    let asignado = txt(d.asignado, 40);
    if (!todos.includes(asignado)) asignado = r === 'cliente' ? (p.cliente[0] || 'Equipo A+G') : 'Equipo A+G';
    const columna = COLUMNAS.includes(txt(d.columna, 30)) ? txt(d.columna, 30) : COLUMNAS[0];
    const nueva: Card = {
      id: 'k' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      titulo, detalle: txt(d.detalle, 4000), asignado, columna, urgente: !!d.urgente,
      vence: fecha(d.vence), links: links(d.links), creado_por: r, creado: now, actualizado: now,
      comentarios: [], historial: [{ ts: now, que: `Creada por ${autor}` }],
    };
    doc.cards.push(nueva);
  } else if (op === 'update') {
    if (!card) return NextResponse.json({ error: 'no_existe' }, { status: 404 });
    if (!puedeEditar(r, card, client)) return prohibido();
    const c = (body.cambios || {}) as Record<string, unknown>;
    const antes = card.asignado;
    if ('titulo' in c && txt(c.titulo, 200)) card.titulo = txt(c.titulo, 200);
    if ('detalle' in c) card.detalle = txt(c.detalle, 4000);
    if ('asignado' in c && todos.includes(txt(c.asignado, 40))) {
      const nuevo = txt(c.asignado, 40);
      // El cliente no puede pasarle a la agencia una tarea que no es suya para sacársela de encima ni al revés:
      // solo reasigna dentro de su propia gente, salvo en tareas que creó él.
      if (r === 'cliente' && card.creado_por !== 'cliente' && !p.cliente.includes(nuevo)) return prohibido();
      card.asignado = nuevo;
    }
    if ('urgente' in c) card.urgente = !!c.urgente;
    if ('vence' in c) card.vence = fecha(c.vence);
    if ('links' in c) card.links = links(c.links);
    if ('columna' in c && COLUMNAS.includes(txt(c.columna, 30)) && txt(c.columna, 30) !== card.columna) {
      log(card, `${autor}: ${card.columna} → ${txt(c.columna, 30)}`);
      card.columna = txt(c.columna, 30);
    }
    if (antes !== card.asignado) log(card, `${autor} la reasignó: ${antes} → ${card.asignado}`);
    else log(card, `Editada por ${autor}`);
    card.actualizado = now;
  } else if (op === 'move') {
    if (!card) return NextResponse.json({ error: 'no_existe' }, { status: 404 });
    if (!puedeEditar(r, card, client)) return prohibido();
    const col = txt(body.columna, 30);
    if (!COLUMNAS.includes(col)) return NextResponse.json({ error: 'columna' }, { status: 400 });
    if (col !== card.columna) log(card, `${autor}: ${card.columna} → ${col}`);
    card.columna = col; card.actualizado = now;
    doc.cards = doc.cards.filter((x) => x.id !== card.id);
    const antesDe = txt(body.antes_de, 60);
    const idx = antesDe ? doc.cards.findIndex((x) => x.id === antesDe) : -1;
    if (idx >= 0) doc.cards.splice(idx, 0, card); else doc.cards.push(card);
  } else if (op === 'comment') {
    if (!card) return NextResponse.json({ error: 'no_existe' }, { status: 404 });
    const t = txt(body.texto, 2000);
    if (!t) return NextResponse.json({ error: 'vacio' }, { status: 400 });
    card.comentarios = [...(card.comentarios || []), { quien: autor, texto: t, ts: now }].slice(-100);
    card.actualizado = now;
  } else if (op === 'delete') {
    if (!card) return NextResponse.json({ error: 'no_existe' }, { status: 404 });
    if (r === 'cliente' && card.creado_por !== 'cliente') return prohibido();
    doc.cards = doc.cards.filter((x) => x.id !== card.id);
  } else {
    return NextResponse.json({ error: 'op' }, { status: 400 });
  }

  doc.actualizado = now;
  try { await guardar(cfg, client, doc); } catch { return NextResponse.json({ error: 'storage_error' }, { status: 502 }); }
  return NextResponse.json({ doc, rol: r });
}

// Carga inicial: solo la agencia, y solo si el tablero está vacío (o con force).
export async function PUT(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  if (rol(req, client) !== 'agencia') return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const cfg = storageConfig();
  if (!cfg) return NextResponse.json({ error: 'storage_not_configured' }, { status: 503 });
  const body = await req.json();
  const actual = await leer(cfg, client);
  if (actual && actual.cards && actual.cards.length && !req.nextUrl.searchParams.get('force')) {
    return NextResponse.json({ error: 'ya_tiene_datos' }, { status: 409 });
  }
  const doc: Doc = { cards: Array.isArray(body.cards) ? body.cards : [], actualizado: new Date().toISOString() };
  await guardar(cfg, client, doc);
  return NextResponse.json({ ok: true, total: doc.cards.length });
}
