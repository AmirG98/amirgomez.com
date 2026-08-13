import { NextRequest, NextResponse } from 'next/server';
import { isClientAuthorized } from '../../../../lib/client-auth';

// Contexto vivo del cliente: documento estructurado que se alimenta de las reuniones.
// GET/PUT: storage Upstash (key context:<cliente>), 503 sin env → el front usa localStorage.
// POST action=ingest: mergea una transcripción nueva al contexto con Claude y devuelve el contexto actualizado.

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
  const res = await fetch(`${cfg.url}/get/${encodeURIComponent(`context:${client}`)}`, {
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
  const res = await fetch(`${cfg.url}/set/${encodeURIComponent(`context:${client}`)}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${cfg.token}` },
    body: JSON.stringify(doc),
  });
  if (!res.ok) return NextResponse.json({ error: 'storage_error' }, { status: 502 });
  return NextResponse.json({ ok: true });
}

const SECTION_KEYS = ['negocio', 'oferta', 'objetivos', 'canales', 'guardrails', 'aprendizajes', 'equipo'];

export async function POST(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  if (!authorized(req, client)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const body = await req.json();
  if (body.action !== 'ingest') return NextResponse.json({ error: 'unknown_action' }, { status: 400 });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'ai_not_configured' }, { status: 503 });

  const transcript = String(body.transcript || '').slice(0, 400000);
  const current: Record<string, string[]> = {};
  for (const k of SECTION_KEYS) {
    current[k] = Array.isArray(body.context?.[k]) ? body.context[k] : [];
  }

  const system =
    'Sos el asistente de A+Growth, una agencia de marketing. Mantenés el documento de contexto vivo de un cliente de la agencia. ' +
    'Recibís el contexto actual (JSON) y la transcripción de una reunión nueva. Devolvé el contexto ACTUALIZADO como JSON válido con exactamente estas claves: ' +
    'negocio, oferta, objetivos, canales, guardrails, aprendizajes, equipo — cada una un array de strings (bullets). ' +
    'En "oferta" describí cada producto/servicio del cliente en detalle (qué es, precio si se conoce, estado). ' +
    'Reglas: sé conservador — no elimines información vigente salvo que la reunión la contradiga explícitamente (en ese caso reemplazala por la versión nueva); ' +
    'agregá lo nuevo en la sección que corresponda; máximo 8 bullets por sección (consolidá los redundantes); bullets concretos, breves, en español rioplatense; ' +
    'incluí cifras y fechas cuando la reunión las mencione. Si la reunión no aporta nada a una sección, devolvela igual que estaba. ' +
    'Respondé ÚNICAMENTE el JSON, sin texto adicional, sin markdown, sin fences.';

  const aiRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({
      model: process.env.RECAP_MODEL || 'claude-sonnet-5',
      max_tokens: 3000,
      system,
      messages: [
        {
          role: 'user',
          content:
            `Cliente: ${client}\nReunión: ${body.titulo || 'sin título'} (${body.fecha || 's/f'})\n\n` +
            `CONTEXTO ACTUAL:\n${JSON.stringify(current, null, 2)}\n\nTRANSCRIPCIÓN DE LA REUNIÓN:\n\n${transcript}`,
        },
      ],
    }),
  });

  if (!aiRes.ok) {
    const detail = await aiRes.text().catch(() => '');
    return NextResponse.json({ error: 'ai_error', detail: detail.slice(0, 300) }, { status: 502 });
  }
  const aiData = await aiRes.json();
  let text = (aiData.content || [])
    .filter((b: { type: string }) => b.type === 'text')
    .map((b: { text: string }) => b.text)
    .join('\n')
    .trim();
  text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');

  let updated: Record<string, string[]>;
  try {
    const parsed = JSON.parse(text);
    updated = {};
    for (const k of SECTION_KEYS) {
      updated[k] = Array.isArray(parsed[k]) ? parsed[k].map((x: unknown) => String(x)).slice(0, 8) : current[k];
    }
  } catch {
    return NextResponse.json({ error: 'ai_parse_error' }, { status: 502 });
  }

  return NextResponse.json({ context: updated });
}
