import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { isClientAuthorized } from '../../../../lib/client-auth';

// Feedback flotante de los portales: el cliente marca un comentario desde
// cualquier página y queda guardado + notificado.
// Storage: Upstash Redis via REST. Key: feedback:<cliente>, una lista de entradas.

function authorized(req: NextRequest, client: string): boolean {
  return isClientAuthorized(client, req.cookies.get(`client_auth_${client}`)?.value, req.cookies.get('agrowth_master')?.value);
}

function storageConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

function esc(s: string): string {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Lista completa de feedback: solo para Amir (clave maestra), no para el cliente.
export async function GET(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  const master = req.cookies.get('agrowth_master')?.value;
  const expected = process.env.AGROWTH_MASTER_KEY;
  if (!expected || master !== expected) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const cfg = storageConfig();
  if (!cfg) return NextResponse.json({ error: 'storage_not_configured' }, { status: 503 });
  const res = await fetch(`${cfg.url}/get/${encodeURIComponent(`feedback:${client}`)}`, {
    headers: { Authorization: `Bearer ${cfg.token}` },
    cache: 'no-store',
  });
  if (!res.ok) return NextResponse.json({ error: 'storage_error' }, { status: 502 });
  const data = await res.json();
  return NextResponse.json({ items: data.result ? JSON.parse(data.result) : [] });
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  if (!authorized(req, client)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => null);
  const mensaje = String(body?.mensaje || '').trim().slice(0, 4000);
  const seccion = String(body?.seccion || '').slice(0, 200);
  const pagina = String(body?.pagina || '').slice(0, 200);
  const autor = String(body?.autor || '').trim().slice(0, 120);
  if (!mensaje) return NextResponse.json({ error: 'empty' }, { status: 400 });

  const entrada = {
    mensaje, seccion, pagina, autor,
    fecha: new Date().toISOString(),
  };

  // Guardar (best-effort: si falla el storage igual mandamos el mail)
  const cfg = storageConfig();
  let guardado = false;
  if (cfg) {
    try {
      const prev = await fetch(`${cfg.url}/get/${encodeURIComponent(`feedback:${client}`)}`, {
        headers: { Authorization: `Bearer ${cfg.token}` },
        cache: 'no-store',
      });
      const data = prev.ok ? await prev.json() : null;
      const items = data?.result ? JSON.parse(data.result) : [];
      items.unshift(entrada);
      const put = await fetch(`${cfg.url}/set/${encodeURIComponent(`feedback:${client}`)}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${cfg.token}` },
        body: JSON.stringify(items.slice(0, 500)),
      });
      guardado = put.ok;
    } catch { /* seguimos al mail */ }
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'A+Growth Notifications <notifications@amirgomez.com>',
      to: 'amir@amirgomez.com',
      subject: `💬 [${client}] Feedback${seccion ? ` — ${seccion}` : ''}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
          <h2 style="margin: 0 0 4px; color: #0F1633;">Feedback nuevo — ${esc(client)}</h2>
          <p style="margin: 0 0 16px; color: #888;">${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}${autor ? ` · ${esc(autor)}` : ''}</p>
          ${seccion ? `<p style="margin:0 0 12px;color:#4338F0;font-size:13px;font-weight:600;">Sección: ${esc(seccion)}</p>` : ''}
          <div style="font-size:15px;line-height:1.6;color:#0F1633;background:#F7F8FC;border-left:3px solid #4338F0;padding:14px 16px;white-space:pre-wrap;">${esc(mensaje)}</div>
          <p style="margin: 20px 0 0; color:#888; font-size:12px;">${esc(pagina)}</p>
        </div>`,
    });
  } catch {
    return NextResponse.json({ ok: guardado, guardado, email: false });
  }

  return NextResponse.json({ ok: true, guardado, email: true });
}
