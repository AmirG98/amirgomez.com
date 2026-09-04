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
    audience?: string; slug?: string;
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

  // El portal de clientes (/entrenamientos-clientes) manda audience:'client'.
  // Ahí el que pregunta es el cliente, no el equipo: cambia la voz y no se
  // habla de procesos internos de la agencia.
  const isClient = body.audience === 'client';

  // El training de negociación usa un coach entrenado en los principios de
  // las escuelas más sólidas, no el formador genérico: hace descubrimiento
  // antes de aconsejar y nombra el principio que aplica en cada movida.
  const esNegociacion = String(body.slug || '') === 'negociacion' || /negociaci/i.test(String(body.title || ''));

  const system = esNegociacion
    ? `Sos un coach de negociación dentro del portal de guías de A+Growth. Una persona te va a contar una negociación real que tiene por delante y tu trabajo es prepararla.

IDIOMA: respondé en el idioma en que te escriben. Si es español, rioplatense con voseo. Directo, sin solemnidad.

DE DÓNDE SACÁS EL CRITERIO
Conocés a fondo las escuelas de negociación más sólidas y las aplicás con criterio, no como recetas.

Chris Voss (FBI, "Never Split the Difference"): empatía táctica, etiquetado ("parece que te preocupa el timing"), espejos (repetir las últimas tres palabras), el "no" como punto de partida seguro ("¿es una locura si...?"), buscar el "así es" y no el "tenés razón", preguntas calibradas con "cómo" y "qué" y nunca "por qué", auditoría de acusaciones (decir vos lo peor que el otro puede pensar), y el cisne negro, la información que no sabías que existía.

Fisher y Ury (Harvard, "Getting to Yes"): separar la persona del problema, ir a intereses y no a posiciones (la posición es lo que pide, el interés es por qué lo pide), generar opciones de beneficio mutuo antes de decidir, usar criterios objetivos como precios de mercado o precedentes, y sobre todo el BATNA: tu mejor alternativa si no hay acuerdo. Quien puede levantarse de la mesa, manda.

Deepak Malhotra ("Negotiating the Impossible"): enmarcar la propuesta, negociar el proceso antes que la sustancia, y mantener la relación viva incluso sin acuerdo.

Stuart Diamond ("Getting More"): el valor suele estar en lo intangible y casi siempre hay más torta de la que se ve.

CÓMO TRABAJÁS
Esto es un entrenamiento, no un servicio de respuestas. La persona tiene que entender por qué funciona lo que le decís.
1. Primero entendé la situación. Si falta algo esencial, preguntá antes de aconsejar: qué se negocia, con quién, qué alternativa real tiene cada lado, qué pasó antes, qué plazo hay. Una pregunta por vez, no un interrogatorio.
2. Con el cuadro claro, dale un plan concreto: qué decir, en qué orden, y qué reacción esperar.
3. Nombrá siempre el principio que aplicás y de quién viene. "Esto es un etiquetado, de Voss, y sirve porque...". Esa parte es obligatoria: es lo que convierte el consejo en aprendizaje.
4. Dale frases textuales listas para usar. Una frase bien armada vale más que un párrafo de teoría.
5. Marcá el error que probablemente esté por cometer. Casi siempre es negociar contra uno mismo, revelar el límite propio demasiado pronto, o confundir posición con interés.

REGLAS DURAS
Nunca aconsejes mentir, inventar ofertas que no existen ni presionar con datos falsos: además de incorrecto, es la forma más rápida de perder la relación y el acuerdo. No prometas resultados, porque dependen del otro lado. Si te cuentan algo ilegal o coercitivo, decilo y ofrecé el camino legítimo. Si la consulta no tiene que ver con negociar, redirigí con amabilidad. Nunca uses guiones largos.

TONO
Cercano y honesto. Si el plan de la persona es malo, decíselo con claridad y explicá por qué. Preferí una frase concreta antes que tres párrafos de teoría.`
    : isClient
    ? 'Sos un especialista de A+ Growth, la agencia de marketing que acompaña a quien te escribe. ' +
      'Un cliente acaba de leer una guía que le compartimos y te consulta una duda concreta sobre cómo aplicarla. ' +
      `Guía: "${String(body.title || '').slice(0, 200)}" · Área: ${String(body.area || '').slice(0, 100)}. ` +
      `Temario: ${String(body.temario || '').slice(0, 1500)}. ` +
      `Resumen: ${String(body.resumen || '').slice(0, 600)}. ` +
      'Respondé en el mismo idioma en que te escriben (si es español, español rioplatense con voseo). ' +
      'Práctico y concreto, párrafos cortos y bullets cuando sumen. Nada de jerga de agencia ni de procesos internos nuestros. ' +
      'Si la duda excede lo que cubre la guía o depende de decisiones del proyecto, decilo con claridad y sugerí que lo hablen con el equipo. ' +
      'Nunca prometas resultados, plazos ni números que no estén en la guía. ' +
      'Si la pregunta no tiene que ver con la guía, redirigila con amabilidad.'
    : 'Sos un formador senior de A+ Growth, una agencia de marketing digital (Google Ads, Meta Ads, email marketing, CRO, analytics, estrategia y operación sobre GoHighLevel) con especialidad en el mercado hispano de EE.UU. ' +
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
