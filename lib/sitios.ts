// Sitios publicados desde el MCP del equipo (landings, previews, páginas sueltas).
// Se guardan en el mismo Upstash del board y se sirven en /s/<ruta> sin pasar por un deploy.
// El HTML va partido en trozos porque Upstash limita el tamaño de cada request.

import { storage, kvGet, kvSet } from './teamboard';

export const SITIOS_INDEX = 'sitios:index';
export const PUEDEN_PUBLICAR = ['Amir', 'Agustín'];
export const MAX_BYTES = 4 * 1024 * 1024;
const TROZO = 400 * 1024;

export type Sitio = {
  titulo: string; autor: string; cliente?: string;
  creado: string; actualizado: string; bytes: number; partes: number;
};
export type Indice = Record<string, Sitio>;

export const rutaValida = (r: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*){0,2}$/.test(r) && r.length <= 80;
const trozoKey = (ruta: string, n: number) => `sitio:${ruta}:${n}`;

export async function leerIndice(): Promise<Indice> {
  return (await kvGet<Indice>(SITIOS_INDEX)) || {};
}

export async function guardarSitio(ruta: string, html: string, meta: Omit<Sitio, 'bytes' | 'partes'>): Promise<Sitio> {
  const indice = await leerIndice();
  const previas = indice[ruta]?.partes || 0;
  const partes = Math.max(1, Math.ceil(html.length / TROZO));
  for (let i = 0; i < partes; i++) await kvSet(trozoKey(ruta, i), html.slice(i * TROZO, (i + 1) * TROZO));
  for (let i = partes; i < previas; i++) await kvDel(trozoKey(ruta, i));
  const sitio: Sitio = { ...meta, bytes: Buffer.byteLength(html, 'utf8'), partes };
  indice[ruta] = sitio;
  await kvSet(SITIOS_INDEX, indice);
  return sitio;
}

export async function leerHtml(ruta: string, partes: number): Promise<string | null> {
  const trozos = await Promise.all(Array.from({ length: partes }, (_, i) => kvGet<string>(trozoKey(ruta, i))));
  if (trozos.some((t) => typeof t !== 'string')) return null;
  return trozos.join('');
}

export async function borrarSitio(ruta: string): Promise<void> {
  const indice = await leerIndice();
  const s = indice[ruta];
  if (!s) return;
  for (let i = 0; i < s.partes; i++) await kvDel(trozoKey(ruta, i));
  delete indice[ruta];
  await kvSet(SITIOS_INDEX, indice);
}

async function kvDel(key: string): Promise<void> {
  const cfg = storage(); if (!cfg) throw new Error('storage_not_configured');
  await fetch(`${cfg.url}/del/${encodeURIComponent(key)}`, { method: 'POST', headers: { Authorization: `Bearer ${cfg.token}` } });
}
