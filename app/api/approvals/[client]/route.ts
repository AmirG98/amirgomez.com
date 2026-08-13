import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { isClientAuthorized } from '../../../../lib/client-auth';

// Tableros por cliente: aprobación de recursos (board=approvals, default) y banco de ideas (board=ideas).
// Storage: Upstash Redis via REST (UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN).
// Sin esas env vars, GET/PUT devuelven 503 y el front cae a modo local (localStorage).

function authorized(req: NextRequest, client: string): boolean {
  return isClientAuthorized(client, req.cookies.get(`client_auth_${client}`)?.value, req.cookies.get('agrowth_master')?.value);
}

function boardKey(req: NextRequest, client: string): string {
  const board = req.nextUrl.searchParams.get('board') === 'ideas' ? 'ideas' : 'approvals';
  return `${board}:${client}`;
}

function storageConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  if (!authorized(req, client)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const cfg = storageConfig();
  if (!cfg) return NextResponse.json({ error: 'storage_not_configured' }, { status: 503 });

  const res = await fetch(`${cfg.url}/get/${encodeURIComponent(boardKey(req, client))}`, {
    headers: { Authorization: `Bearer ${cfg.token}` },
    cache: 'no-store',
  });
  if (!res.ok) return NextResponse.json({ error: 'storage_error' }, { status: 502 });
  const data = await res.json();
  return NextResponse.json({ doc: data.result ? JSON.parse(data.result) : null });
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  if (!authorized(req, client)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const cfg = storageConfig();
  if (!cfg) return NextResponse.json({ error: 'storage_not_configured' }, { status: 503 });

  const doc = await req.json();
  const res = await fetch(`${cfg.url}/set/${encodeURIComponent(boardKey(req, client))}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${cfg.token}` },
    body: JSON.stringify(doc),
  });
  if (!res.ok) return NextResponse.json({ error: 'storage_error' }, { status: 502 });
  return NextResponse.json({ ok: true });
}

// Notificación por email a Amir cuando el cliente mueve/comenta un recurso.
// Funciona aun sin storage configurado (modo local del front).
export async function POST(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  if (!authorized(req, client)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  try {
    const { titulo, accion, detalle } = await req.json();
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'A+Growth Notifications <notifications@amirgomez.com>',
      to: 'amir@amirgomez.com',
      subject: `📋 [${client}] ${accion}: ${titulo}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
          <h2 style="margin: 0 0 4px; color: #2b3947;">Aprobador de recursos — ${client}</h2>
          <p style="margin: 0 0 16px; color: #888;">${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}</p>
          <p style="font-size: 16px; margin: 0 0 8px;"><strong>${titulo}</strong></p>
          <p style="font-size: 15px; margin: 0 0 8px; color: #2b3947;">${accion}${detalle ? ` — ${detalle}` : ''}</p>
          <p style="margin: 24px 0 0;"><a href="https://www.weareaplus.net/clients/${client}/approvals" style="color: #a8874f;">Ver tablero</a></p>
        </div>`,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'notify_failed' }, { status: 500 });
  }
}
