import { NextRequest, NextResponse } from 'next/server';

// Chat del portal de entrenamientos (/entrenamientos): responde dudas del equipo
// sobre un training usando Claude, con el temario del training como contexto.
// Anthropic API (ANTHROPIC_API_KEY) — sin env, POST devuelve 503 y el front
// ofrece abrir la pregunta en claude.ai como fallback.

export const maxDuration = 60;

type ChatTurn = { role: 'user' | 'assistant'; content: string };

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'ai_not_configured' }, { status: 503 });

  let body: {
    question?: string;
    title?: string;
    area?: string;
    level?: string;
    temario?: string;
    resumen?: string;
    history?: ChatTurn[];
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 });
  }

  const question = String(body.question || '').trim().slice(0, 2000);
  if (question.length < 3) return NextResponse.json({ error: 'question_too_short' }, { status: 400 });

  // Historial acotado: últimos 10 turnos, cada uno recortado, roles válidos.
  const history: ChatTurn[] = (Array.isArray(body.history) ? body.history : [])
    .filter((t): t is ChatTurn => !!t && (t.role === 'user' || t.role === 'assistant') && typeof t.content === 'string')
    .slice(-10)
    .map((t) => ({ role: t.role, content: t.content.slice(0, 4000) }));

  const system =
    'Sos un formador senior de A+ Growth, una agencia de marketing digital (Google Ads, Meta Ads, email marketing, CRO, analytics, estrategia y operación sobre GoHighLevel) con especialidad en el mercado hispano de EE.UU. ' +
    'Un miembro del equipo acaba de estudiar un training interno y te pregunta dudas sobre cómo operamos. ' +
    `Training: "${String(body.title || '').slice(0, 200)}" · Área: ${String(body.area || '').slice(0, 100)} · Nivel: ${String(body.level || '').slice(0, 50)}. ` +
    `Temario: ${String(body.temario || '').slice(0, 1500)}. ` +
    `Resumen: ${String(body.resumen || '').slice(0, 600)}. ` +
    'Respondé en español rioplatense (voseo), práctico y accionable, coherente con el temario del training. ' +
    'Usá párrafos cortos y bullets cuando sumen; nada de relleno. Si la duda depende de datos de un cliente puntual que no tenés, decilo y pedí ese contexto. ' +
    'Si la pregunta no tiene nada que ver con el training ni con el trabajo de la agencia, redirigila con amabilidad al tema del training.';

  const aiRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-beta': 'server-side-fallback-2026-07-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.ACADEMY_CHAT_MODEL || 'claude-opus-5',
      max_tokens: 1200,
      // Si un pedido es rechazado por seguridad, la API lo reintenta sola en un modelo alternativo.
      fallbacks: 'default',
      system,
      messages: [...history, { role: 'user', content: question }],
    }),
  });

  if (!aiRes.ok) {
    const detail = await aiRes.text().catch(() => '');
    return NextResponse.json({ error: 'ai_error', detail: detail.slice(0, 300) }, { status: 502 });
  }
  const aiData = await aiRes.json();
  const answer = (aiData.content || [])
    .filter((b: { type: string }) => b.type === 'text')
    .map((b: { text: string }) => b.text)
    .join('\n')
    .trim();
  if (!answer) return NextResponse.json({ error: 'ai_empty' }, { status: 502 });

  return NextResponse.json({ answer });
}
