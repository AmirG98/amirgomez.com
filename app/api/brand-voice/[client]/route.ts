import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { isClientAuthorized } from '../../../../lib/client-auth';

// Cuestionario de voz de marca, completable desde el portal del cliente.
//
//   GET  -> devuelve las respuestas guardadas, para que puedan retomar.
//   PUT  -> guarda un borrador (autosave). No notifica.
//   POST -> marca el cuestionario como enviado y avisa por mail a A+Growth.
//
// Storage: Upstash Redis (brandvoice:<cliente>). Sin env vars, el front usa
// localStorage y el envio por mail sigue funcionando igual.

export const maxDuration = 30;

type Answers = Record<string, string>;
type Doc = { answers: Answers; updatedAt?: string; submittedAt?: string };

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

const key = (client: string) => `brandvoice:${client}`;

function clean(raw: unknown): Answers {
  const out: Answers = {};
  if (!raw || typeof raw !== 'object') return out;
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof v !== 'string') continue;
    const id = String(k).slice(0, 40);
    const val = v.trim().slice(0, 4000);
    if (val) out[id] = val;
  }
  return out;
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

  const doc = await read(cfg, client);
  return NextResponse.json({ doc, stored: true });
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  if (!authorized(req, client)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const cfg = storageConfig();
  if (!cfg) return NextResponse.json({ error: 'storage_not_configured' }, { status: 503 });

  let body: { answers?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 });
  }

  const prev = await read(cfg, client);
  const doc: Doc = {
    answers: clean(body.answers),
    updatedAt: new Date().toISOString(),
    submittedAt: prev?.submittedAt,
  };
  const res = await write(cfg, client, doc);
  if (!res.ok) return NextResponse.json({ error: 'storage_error' }, { status: 502 });

  return NextResponse.json({ ok: true, count: Object.keys(doc.answers).length });
}

// Resetea el cuestionario (respuestas y estado de enviado). Sirve para limpiar
// pruebas o volver a empezar. Requiere la clave del portal, igual que el resto.
export async function DELETE(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  if (!authorized(req, client)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const cfg = storageConfig();
  if (!cfg) return NextResponse.json({ error: 'storage_not_configured' }, { status: 503 });

  const res = await fetch(`${cfg.url}/del/${encodeURIComponent(key(client))}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${cfg.token}` },
  });
  if (!res.ok) return NextResponse.json({ error: 'storage_error' }, { status: 502 });
  return NextResponse.json({ ok: true, reset: true });
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  if (!authorized(req, client)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  let body: { answers?: unknown; questions?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 });
  }

  const answers = clean(body.answers);
  if (!Object.keys(answers).length) {
    return NextResponse.json({ error: 'empty' }, { status: 400 });
  }

  // Los enunciados los manda el front para que el mail se lea solo.
  const questions: Record<string, string> = {};
  if (body.questions && typeof body.questions === 'object') {
    for (const [k, v] of Object.entries(body.questions as Record<string, unknown>)) {
      if (typeof v === 'string') questions[String(k).slice(0, 40)] = v.slice(0, 400);
    }
  }

  const now = new Date().toISOString();
  const cfg = storageConfig();
  if (cfg) {
    await write(cfg, client, { answers, updatedAt: now, submittedAt: now });
  }

  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const rows = Object.keys(answers)
    .sort()
    .map(
      (id) => `
        <p style="color:#8C8C8C;font-size:12px;margin:0 0 4px;">${esc(questions[id] || id)}</p>
        <p style="margin:0 0 16px;white-space:pre-wrap;">${esc(answers[id])}</p>`,
    )
    .join('');

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Sin Resend el cuestionario igual queda guardado: no se pierde el trabajo.
    return NextResponse.json({ ok: true, mailed: false });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: 'A+Growth Notifications <notifications@amirgomez.com>',
      to: 'amir@amirgomez.com',
      subject: `Cuestionario de voz de marca completado — ${client}`,
      html: `
        <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#2B2B2B;max-width:640px;">
          <p style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#8C8C8C;margin:0 0 6px;">Voz de marca</p>
          <h2 style="margin:0 0 4px;font-size:20px;">${esc(client)} complet&oacute; el cuestionario</h2>
          <p style="color:#4A4A4A;font-size:13px;margin:0 0 22px;">
            ${Object.keys(answers).length} respuestas. Tambi&eacute;n quedan guardadas en el portal.
          </p>
          <hr style="border:0;border-top:1px solid #E2E0DC;margin:0 0 20px;">
          ${rows}
        </div>`,
    });
    return NextResponse.json({ ok: true, mailed: true });
  } catch {
    return NextResponse.json({ ok: true, mailed: false });
  }
}
