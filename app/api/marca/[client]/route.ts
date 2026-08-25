import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { isClientAuthorized } from '../../../../lib/client-auth';

// Manual de marca del cliente: links a donde vive el material, mas los datos
// esenciales cargados a mano (colores, tipografias, que evitar).
//
//   GET  -> devuelve lo guardado.
//   PUT  -> autosave del borrador.
//   POST -> lo da por entregado y avisa por mail a A+Growth.
//
// La subida de archivos queda para cuando haya Vercel Blob configurado; por
// ahora el material vive en el Drive del cliente y aca queda el link.

export const maxDuration = 30;

type Link = { titulo: string; url: string };
type Doc = {
  links?: Link[];
  colores?: string;
  tipografias?: string;
  tono?: string;
  evitar?: string;
  notas?: string;
  actualizado?: string;
  entregado?: string;
};

function authorized(req: NextRequest, client: string): boolean {
  return isClientAuthorized(
    client,
    req.cookies.get(`client_auth_${client}`)?.value,
    req.cookies.get('agrowth_master')?.value,
  );
}

function storageConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

const key = (c: string) => `marca:${c}`;

// Solo http(s): evita que un javascript: entre por el campo de link.
function urlSegura(u: string): string {
  const s = u.trim().slice(0, 600);
  if (!s) return '';
  try {
    const p = new URL(s);
    return p.protocol === 'http:' || p.protocol === 'https:' ? s : '';
  } catch {
    return '';
  }
}

function clean(raw: unknown): Doc {
  const b = (raw || {}) as Record<string, unknown>;
  const txt = (v: unknown, n = 2000) => (typeof v === 'string' ? v.trim().slice(0, n) : '');
  const links: Link[] = [];
  if (Array.isArray(b.links)) {
    for (const l of b.links.slice(0, 12)) {
      const o = (l || {}) as Record<string, unknown>;
      const url = urlSegura(typeof o.url === 'string' ? o.url : '');
      if (!url) continue;
      links.push({ titulo: txt(o.titulo, 160) || 'Material de marca', url });
    }
  }
  return {
    links,
    colores: txt(b.colores),
    tipografias: txt(b.tipografias),
    tono: txt(b.tono),
    evitar: txt(b.evitar),
    notas: txt(b.notas),
  };
}

async function read(cfg: { url: string; token: string }, client: string): Promise<Doc | null> {
  const res = await fetch(`${cfg.url}/get/${encodeURIComponent(key(client))}`, {
    headers: { Authorization: `Bearer ${cfg.token}` },
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const data = await res.json();
  try {
    return data.result ? (JSON.parse(data.result) as Doc) : null;
  } catch {
    return null;
  }
}

async function write(cfg: { url: string; token: string }, client: string, doc: Doc) {
  return fetch(`${cfg.url}/set/${encodeURIComponent(key(client))}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${cfg.token}` },
    body: JSON.stringify(doc),
  });
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  if (!authorized(req, client)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const cfg = storageConfig();
  if (!cfg) return NextResponse.json({ doc: null, stored: false });
  return NextResponse.json({ doc: await read(cfg, client), stored: true });
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  if (!authorized(req, client)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const cfg = storageConfig();
  if (!cfg) return NextResponse.json({ error: 'storage_not_configured' }, { status: 503 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 });
  }

  const prev = await read(cfg, client);
  const doc = clean(body);
  doc.actualizado = new Date().toISOString();
  doc.entregado = prev?.entregado;

  const res = await write(cfg, client, doc);
  if (!res.ok) return NextResponse.json({ error: 'storage_error' }, { status: 502 });
  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  if (!authorized(req, client)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 });
  }

  const doc = clean(body);
  const vacio =
    !doc.links?.length && !doc.colores && !doc.tipografias && !doc.tono && !doc.evitar && !doc.notas;
  if (vacio) return NextResponse.json({ error: 'vacio' }, { status: 400 });

  const ahora = new Date().toISOString();
  doc.actualizado = ahora;
  doc.entregado = ahora;

  const cfg = storageConfig();
  if (cfg) {
    const res = await write(cfg, client, doc);
    if (!res.ok) return NextResponse.json({ error: 'storage_error' }, { status: 502 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ ok: true, mailed: false });

  const esc = (s: string) =>
    String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const bloque = (t: string, v?: string) =>
    v ? `<p style="color:#8C8C8C;font-size:12px;margin:0 0 4px;">${t}</p>
         <p style="margin:0 0 16px;white-space:pre-wrap;">${esc(v)}</p>` : '';

  const links = (doc.links || [])
    .map((l) => `<li style="margin-bottom:6px;"><a href="${esc(l.url)}">${esc(l.titulo)}</a></li>`)
    .join('');

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: 'A+Growth Notifications <notifications@amirgomez.com>',
      to: 'amir@amirgomez.com',
      subject: `Manual de marca entregado — ${client}`,
      html: `
        <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#2B2B2B;max-width:640px;">
          <p style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#8C8C8C;margin:0 0 6px;">Manual de marca</p>
          <h2 style="margin:0 0 20px;font-size:20px;">${esc(client)} dejó su material</h2>
          ${links ? `<p style="color:#8C8C8C;font-size:12px;margin:0 0 6px;">Links</p><ul style="margin:0 0 18px 18px;padding:0;">${links}</ul>` : ''}
          ${bloque('Colores', doc.colores)}
          ${bloque('Tipografías', doc.tipografias)}
          ${bloque('Tono de voz', doc.tono)}
          ${bloque('Qué evitar', doc.evitar)}
          ${bloque('Notas', doc.notas)}
          <p style="margin-top:22px;font-size:12px;color:#8C8C8C;">Todo queda también en el portal del cliente.</p>
        </div>`,
    });
    return NextResponse.json({ ok: true, mailed: true });
  } catch {
    return NextResponse.json({ ok: true, mailed: false });
  }
}
