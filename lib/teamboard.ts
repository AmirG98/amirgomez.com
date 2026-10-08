// Master board del equipo: lectura, escritura y fusión de cambios.
// Lo usan la API del board (/api/team-board) y el MCP (/api/mcp).

import { createHash } from 'crypto';

export const BOARD_KEY = 'teamboard:agrowth';
export const COLUMNAS = ['Por asignar', 'Haciendo', 'Revisión', 'Listo'];
export const EQUIPO = ['Pilar', 'Agustín', 'Joel', 'Amir', 'Equipo'];

export type Evento = { ts: string; que: string };
export type Card = {
  id: string; titulo: string; quien: string; cliente: string; nota: string; urgente: boolean;
  columna: string; actualizado: string; canal?: string; pedido_por?: string; pedido_fecha?: string;
  mensaje?: string; vence?: string; links?: string[]; historial?: Evento[];
};
export type Board = { cards: Card[]; clientes?: Record<string, Record<string, unknown>>; leido_en?: string };

export function storage() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

export async function kvGet<T>(key: string): Promise<T | null> {
  const cfg = storage(); if (!cfg) throw new Error('storage_not_configured');
  const r = await fetch(`${cfg.url}/get/${encodeURIComponent(key)}`, { headers: { Authorization: `Bearer ${cfg.token}` }, cache: 'no-store' });
  if (!r.ok) throw new Error('storage_error');
  const d = await r.json();
  return d.result ? (JSON.parse(d.result) as T) : null;
}
export async function kvSet(key: string, value: unknown): Promise<void> {
  const cfg = storage(); if (!cfg) throw new Error('storage_not_configured');
  const r = await fetch(`${cfg.url}/set/${encodeURIComponent(key)}`, { method: 'POST', headers: { Authorization: `Bearer ${cfg.token}` }, body: JSON.stringify(value) });
  if (!r.ok) throw new Error('storage_error');
}

export async function leerBoard(): Promise<Board> {
  const b = await kvGet<Board>(BOARD_KEY);
  return b && Array.isArray(b.cards) ? b : { cards: [], clientes: {} };
}
export async function guardarBoard(b: Board): Promise<void> {
  const limpio: Board = { cards: b.cards, clientes: b.clientes || {} };
  await kvSet(BOARD_KEY, limpio);
}

// La página manda el board entero cada vez que guarda. Si mientras estaba abierta
// alguien cambió algo por el MCP, un reemplazo directo lo pisaría. Con `leido_en`
// (cuándo la página leyó el board) se fusiona tarjeta por tarjeta: gana la versión
// más nueva, y una tarjeta que la página no conocía se conserva si nació después.
// Sin `leido_en` (scripts, versiones viejas) se reemplaza como antes.
export function fusionar(actual: Board, entrante: Board): Board {
  const leido = entrante.leido_en || '';
  if (!leido) return { cards: entrante.cards || [], clientes: entrante.clientes ?? actual.clientes };
  const porIdActual = new Map(actual.cards.map((c) => [c.id, c]));
  const idsEntrante = new Set(entrante.cards.map((c) => c.id));
  const cards: Card[] = entrante.cards.map((c) => {
    const a = porIdActual.get(c.id);
    return a && (a.actualizado || '') > (c.actualizado || '') ? a : c;
  });
  for (const a of actual.cards) {
    if (!idsEntrante.has(a.id) && (a.actualizado || '') > leido) cards.push(a);
  }
  return { cards, clientes: entrante.clientes ?? actual.clientes };
}

export function log(c: Card, que: string) {
  c.historial = [{ ts: new Date().toISOString(), que }, ...(c.historial || [])].slice(0, 40);
}

export const hashToken = (t: string) => createHash('sha256').update(t).digest('hex');
