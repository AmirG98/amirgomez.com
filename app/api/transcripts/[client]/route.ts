import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { isClientAuthorized } from '../../../../lib/client-auth';

// Meeting transcripts por cliente: lista de reuniones con transcripción y recap generado por IA.
// Storage: Upstash (UPSTASH_REDIS_REST_URL/TOKEN) — sin env, GET/PUT devuelven 503 y el front usa localStorage.
// Recap: Anthropic API (ANTHROPIC_API_KEY) — sin env, POST recap devuelve 503 y el front lo explica.

export const maxDuration = 60;

function authorized(req: NextRequest, client: string): boolean {
  return isClientAuthorized(client, req.cookies.get(`client_auth_${client}`)?.value);
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
  const res = await fetch(`${cfg.url}/get/${encodeURIComponent(`transcripts:${client}`)}`, {
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
  const res = await fetch(`${cfg.url}/set/${encodeURIComponent(`transcripts:${client}`)}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${cfg.token}` },
    body: JSON.stringify(doc),
  });
  if (!res.ok) return NextResponse.json({ error: 'storage_error' }, { status: 502 });
  return NextResponse.json({ ok: true });
}

// POST: { action: 'recap', titulo, fecha, transcript } → genera recap con Claude y lo manda por email.
export async function POST(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  if (!authorized(req, client)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const body = await req.json();
  if (body.action !== 'recap') return NextResponse.json({ error: 'unknown_action' }, { status: 400 });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'ai_not_configured' }, { status: 503 });

  const transcript = String(body.transcript || '').slice(0, 500000);
  if (transcript.length < 200) return NextResponse.json({ error: 'transcript_too_short' }, { status: 400 });

  const system =
    'Sos el asistente de A+Growth, una agencia de marketing. Generá un recap ejecutivo en español rioplatense de la transcripción de una reunión con el cliente. ' +
    'Formato markdown, con exactamente estas secciones: "## Resumen" (3-5 líneas), "## Decisiones" (bullets), "## Accionables" (bullets con responsable y plazo si se mencionan), "## Temas abiertos" (bullets). ' +
    'Basate únicamente en lo que está en la transcripción — no inventes nada. Si una sección no tiene contenido, escribí "—". Directo y concreto, sin relleno.';

  const aiRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.RECAP_MODEL || 'claude-sonnet-5',
      max_tokens: 1500,
      system,
      messages: [
        {
          role: 'user',
          content: `Reunión: ${body.titulo || 'sin título'} · Fecha: ${body.fecha || 's/f'} · Cliente: ${client}\n\nTranscripción:\n\n${transcript}`,
        },
      ],
    }),
  });

  if (!aiRes.ok) {
    const detail = await aiRes.text().catch(() => '');
    return NextResponse.json({ error: 'ai_error', detail: detail.slice(0, 300) }, { status: 502 });
  }
  const aiData = await aiRes.json();
  const recap = (aiData.content || [])
    .filter((b: { type: string }) => b.type === 'text')
    .map((b: { text: string }) => b.text)
    .join('\n');

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'A+Growth Notifications <notifications@amirgomez.com>',
      to: 'amir@amirgomez.com',
      subject: `📝 [${client}] Recap generado: ${body.titulo || 'reunión'}`,
      html: `<div style="font-family: sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; white-space: pre-wrap;">${recap
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')}</div>
        <p style="font-family: sans-serif;"><a href="https://www.weareaplus.net/clients/${client}/transcripts" style="color:#a8874f;">Ver en el portal</a></p>`,
    });
  } catch {}

  return NextResponse.json({ recap });
}
