import { NextRequest, NextResponse } from 'next/server';
import { isClientAuthorized } from '../../../../lib/client-auth';

// Ediciones en vivo de los portales de cliente.
//
//   GET  -> cualquiera con acceso al portal (incluido el cliente) lee las ediciones
//           publicadas, para que vea el contenido actualizado.
//   PUT  -> quien tenga la clave del portal. AGROWTH_MASTER_KEY no esta configurada
//           en Vercel, asi que exigirla dejaba el editor inservible. El trade-off es
//           conocido: el cliente tiene esa misma clave y tecnicamente podria editar.
//           Por eso el editor no se anuncia en la UI y solo abre con ?edit=1.
//
// Storage: Upstash Redis via REST. Sin env vars, GET devuelve vacio y PUT 503,
// y el front cae a localStorage (las ediciones quedan solo en ese navegador).

export const maxDuration = 30;

type Edits = Record<string, string>;

function canRead(req: NextRequest, client: string): boolean {
  return isClientAuthorized(
    client,
    req.cookies.get(`client_auth_${client}`)?.value,
    req.cookies.get('agrowth_master')?.value,
  );
}

function canWrite(req: NextRequest, client: string): boolean {
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

function key(client: string, page: string): string {
  return `edits:${client}:${page}`;
}

// El slug de pagina viene del front; se acota para que no arme claves raras.
function safePage(raw: string | null): string {
  const p = (raw || 'dashboard').toLowerCase().replace(/[^a-z0-9-]/g, '');
  return p.slice(0, 40) || 'dashboard';
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  if (!canRead(req, client)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const cfg = storageConfig();
  if (!cfg) return NextResponse.json({ edits: {}, stored: false });

  const page = safePage(req.nextUrl.searchParams.get('page'));
  const res = await fetch(`${cfg.url}/get/${encodeURIComponent(key(client, page))}`, {
    headers: { Authorization: `Bearer ${cfg.token}` },
    cache: 'no-store',
  });
  if (!res.ok) return NextResponse.json({ edits: {}, stored: false });

  const data = await res.json();
  let edits: Edits = {};
  try {
    edits = data.result ? (JSON.parse(data.result) as Edits) : {};
  } catch {
    edits = {};
  }
  return NextResponse.json({ edits, stored: true });
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  if (!canWrite(req, client)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const cfg = storageConfig();
  if (!cfg) return NextResponse.json({ error: 'storage_not_configured' }, { status: 503 });

  let body: { edits?: Edits };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 });
  }

  // Se guarda texto plano, nunca HTML: el front usa textContent al aplicarlo.
  const edits: Edits = {};
  for (const [k, v] of Object.entries(body.edits || {})) {
    if (typeof v !== 'string') continue;
    edits[String(k).slice(0, 120)] = v.slice(0, 4000);
  }

  const page = safePage(req.nextUrl.searchParams.get('page'));
  const res = await fetch(`${cfg.url}/set/${encodeURIComponent(key(client, page))}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${cfg.token}` },
    body: JSON.stringify(edits),
  });
  if (!res.ok) return NextResponse.json({ error: 'storage_error' }, { status: 502 });

  return NextResponse.json({ ok: true, count: Object.keys(edits).length });
}
