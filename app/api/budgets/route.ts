import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { isMasterAuthorized, isClientAuthorized, CLIENT_PASSWORDS } from '../../../lib/client-auth';

// Presupuestos por cliente/campaña/plataforma + guardrails mensuales.
// Roles:
//   - master (AGROWTH_MASTER_KEY)      → lee y escribe todo
//   - media buyer (AGROWTH_BUYER_KEY)  → lee y escribe todo (solo presupuestos)
//   - cliente (clave de su portal)     → lee SOLO su cliente, no escribe
// Storage: Upstash (key budgets:agrowth), 503 sin env → el front usa localStorage.

function buyerAuthorized(req: NextRequest): boolean {
  const key = process.env.AGROWTH_BUYER_KEY;
  const cookie = req.cookies.get('agrowth_buyer')?.value;
  return Boolean(key && cookie && cookie === key);
}

function canWrite(req: NextRequest): boolean {
  return isMasterAuthorized(req.cookies.get('agrowth_master')?.value) || buyerAuthorized(req);
}

// Devuelve: 'all' (master/buyer), el slug del cliente, o null.
function readScope(req: NextRequest): string | null {
  if (canWrite(req)) return 'all';
  for (const client of Object.keys(CLIENT_PASSWORDS)) {
    const cookie = req.cookies.get(`client_auth_${client}`)?.value;
    if (isClientAuthorized(client, cookie)) return client;
  }
  return null;
}

function storageConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

const KEY = 'budgets:agrowth';

type Line = {
  id: string;
  cliente: string;
  campana: string;
  plataforma: string;
  objetivo?: string;
  planificado: number;   // lo que el media buyer piensa invertir este mes
  gastado?: number;      // real, se completa desde el reporte
  tipo?: string;         // diario | mensual
  notas?: string;
  mes: string;           // YYYY-MM
  actualizado?: string;
  por?: string;
};

type Doc = {
  // Tope mensual aprobado por cliente: { "urban-usa": { "2026-08": 3000 } }
  caps: Record<string, Record<string, number>>;
  lines: Line[];
  log?: { ts: string; quien: string; que: string }[];
};

async function readDoc(cfg: { url: string; token: string }): Promise<Doc | null> {
  const res = await fetch(`${cfg.url}/get/${encodeURIComponent(KEY)}`, {
    headers: { Authorization: `Bearer ${cfg.token}` },
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.result ? (JSON.parse(data.result) as Doc) : null;
}

export async function GET(req: NextRequest) {
  const scope = readScope(req);
  if (!scope) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const cfg = storageConfig();
  if (!cfg) return NextResponse.json({ error: 'storage_not_configured' }, { status: 503 });
  const doc = await readDoc(cfg);
  if (!doc) return NextResponse.json({ doc: null, scope });
  if (scope === 'all') return NextResponse.json({ doc, scope });
  // Cliente: solo sus líneas y su cap.
  return NextResponse.json({
    scope,
    doc: {
      caps: { [scope]: doc.caps?.[scope] || {} },
      lines: (doc.lines || []).filter((l) => l.cliente === scope),
    },
  });
}

export async function PUT(req: NextRequest) {
  if (!canWrite(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const cfg = storageConfig();
  if (!cfg) return NextResponse.json({ error: 'storage_not_configured' }, { status: 503 });
  const doc = (await req.json()) as Doc;
  const res = await fetch(`${cfg.url}/set/${encodeURIComponent(KEY)}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${cfg.token}` },
    body: JSON.stringify(doc),
  });
  if (!res.ok) return NextResponse.json({ error: 'storage_error' }, { status: 502 });
  return NextResponse.json({ ok: true });
}

// Aviso por email cuando una carga supera (o roza) el tope aprobado del mes.
export async function POST(req: NextRequest) {
  if (!canWrite(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  try {
    const { cliente, mes, planificado, cap, pct, quien } = await req.json();
    const resend = new Resend(process.env.RESEND_API_KEY);
    const excede = Number(pct) >= 100;
    await resend.emails.send({
      from: 'A+Growth Notifications <notifications@amirgomez.com>',
      to: 'amir@amirgomez.com',
      subject: `${excede ? '🚨' : '⚠️'} [${cliente}] Presupuesto ${mes}: ${Math.round(Number(pct))}% del tope aprobado`,
      html: `<div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
        <h2 style="margin:0 0 8px; color:#101214;">${excede ? 'Tope superado' : 'Cerca del tope'} — ${cliente}</h2>
        <p style="color:#555;">Mes: <b>${mes}</b> · cargado por: ${quien || 'media buyer'}</p>
        <p style="font-size:16px;">Planificado: <b>US$${Number(planificado).toLocaleString('en-US')}</b><br>
        Tope aprobado: <b>US$${Number(cap).toLocaleString('en-US')}</b></p>
        <p style="margin-top:20px;"><a href="https://www.weareaplus.net/hq/budgets" style="color:#f97316;">Ver presupuestos</a></p>
      </div>`,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'notify_failed' }, { status: 500 });
  }
}
