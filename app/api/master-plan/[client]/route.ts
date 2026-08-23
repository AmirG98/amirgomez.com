import { NextRequest, NextResponse } from 'next/server';
import { isClientAuthorized } from '../../../../lib/client-auth';

// Chat del Master Plan de cada portal de cliente: responde preguntas sobre el
// plan usando Claude, con el contexto del cliente como base.
// Anthropic API (ANTHROPIC_API_KEY) — sin env, POST devuelve 503 y el front
// muestra el aviso de contactarnos directamente.

export const maxDuration = 60;

type ChatTurn = { role: 'user' | 'assistant'; content: string };

function authorized(req: NextRequest, client: string): boolean {
  return isClientAuthorized(
    client,
    req.cookies.get(`client_auth_${client}`)?.value,
    req.cookies.get('agrowth_master')?.value,
  );
}

// Contexto por cliente. Es lo que el asistente sabe: nada más que esto,
// más lo que el propio Master Plan muestra en pantalla.
const CONTEXTO: Record<string, { idioma: string; contexto: string }> = {
  qhu: {
    idioma: 'español rioplatense (voseo)',
    contexto: `NEGOCIO
QHU digitaliza el historial de servicios y arreglos de vehículos (autos, motos, camiones, lanchas). Arranca por Córdoba Capital con alcance nacional. El problema que resuelve: hoy no hay forma de verificar qué le hicieron a un vehículo, ni si le bajaron el kilometraje para venderlo más caro.

PRODUCTO
El front del sitio es la landing: un buscador donde cualquiera ingresa una patente, gratis y sin registro, y ve el vehículo. Si no hay historial cargado, devuelve el plan de mantenimiento que recomienda el fabricante. Cada empresa adherida tiene un QR propio con el que registra a sus clientes. El alta de empresas es un proceso guiado de pocos pasos, sin tarjeta, seguido de validación telefónica personalizada.

MODELO DE NEGOCIO
Gratis para el usuario. El taller paga suscripción mensual de $60.000 a $70.000 ARS.

MECÁNICA DE ADQUISICIÓN (la definición central del plan)
No se captan talleres con pauta directa. Se genera demanda de usuarios en las zonas de los talleres que se quiere sumar primero, para que sean los clientes quienes pidan el registro en el mostrador. El orden importa: vender una suscripción a un taller que nunca oyó hablar de QHU es una venta fría contra un gasto nuevo; que entre un cliente pidiéndolo cambia la conversación. Consecuencia operativa: primero se define la lista corta de talleres objetivo, elegida a mano, y después se pauta sobre sus zonas.

QUÉ COMPRA EL TALLER
El vehículo queda asociado a su taller y esa relación sobrevive al cambio de dueño. Fidelización por transparencia. Continuidad de servicios (lubricentro, tren delantero, frenos, neumáticos). Visibilidad ante usuarios nuevos. El argumento es que recupera la suscripción con pocos services adicionales al año.

FASES
1. Setup (en curso): guía de marca, contenido de la landing, redes, tracking. Dura de 4 a 6 semanas, hasta 8 si se amplía el alcance. Arranca dos semanas antes de que la plataforma esté lista.
2. Lanzamiento: primeras campañas en Meta y Google con presupuesto reforzado, entre 5 y 10 conceptos publicitarios en paralelo, evaluados a los 3 o 4 días.
3. Crecimiento: optimización mensual sobre lo que funcionó.

CANALES
Primera ola (usuarios): Meta Ads y Google Ads. Segunda ola (talleres): Meta Ads B2B y LinkedIn. Permanente: SEO y contenido. Oportunista: prensa y podcasts.

MÉTRICAS
La que manda: talleres suscriptos. También costo por taller sumado, usuarios registrados por zona, consultas al buscador, servicios cargados por taller (anticipa churn), inversión por canal.

RITMO DE TRABAJO
Update escrito semanal, llamada de trabajo cada dos semanas (30 a 45 minutos), reporte de resultados mensual, dashboard siempre al día, línea directa para lo urgente.

CONTRATO
Fase de setup USD 1.650. Marketing integral mensual USD 650. Pago 50% al inicio y 50% al finalizar. No incluye pauta: se recomienda un mínimo de USD 1.500 mensuales de inversión publicitaria.

ESTADO AL 23 DE AGOSTO DE 2026
Fase de setup. Sin campañas corriendo, sin números de performance todavía. Pendiente de QHU: materiales de marca, diseños de QR y calcomanías, confirmación de fecha de inicio, detalle del proceso de ventas. Pendiente nuestro: contenido y comunicación de la landing, definición de posicionamiento y audiencias, producción de contenido. La plataforma estaba prevista para mediados de agosto y todavía no está publicada.

CONTACTOS
Rodrigo Díaz (producto y decisión técnica), María Alejandra Díaz (administración y branding), Marcos (front end, React).`,
  },
  domic: {
    idioma: 'español rioplatense (voseo)',
    contexto: `NEGOCIO
Domic Experiences: domótica de alta gama y sistemas de control integrados (iluminación, climatización, seguridad, audio y automatización detrás de una sola interfaz). Más de 300 proyectos en ocho años en Latinoamérica, ahora expandiéndose a Estados Unidos desde Miami. Equipo de más de 50 personas.

PÚBLICOS
Dueños de casa, oficinas corporativas y desarrollos multiresidenciales de lujo. No compran de la misma manera.

QUÉ HACE DIFERENTE A DOMIC
La filosofía es devolverle el control al cliente mediante un proceso transparente: la gente decide qué necesita realmente su sistema, informada, en lugar de que le vendan productos que nunca pidió. Se vende la forma de vivir, no el equipamiento. La venta técnica se mantiene separada de la ejecución técnica.

EL PROBLEMA QUE SE RESUELVE
Cotizar es caro y lento cuando el prospecto no califica. El tiempo técnico se gasta en proyectos que nunca fueron viables. La solución es filtrar las expectativas de inversión desde la primera interacción.

CÓMO FUNCIONA LA OFERTA
Una calculadora de presupuesto permite que el visitante arme su propio alcance y vea el costo moverse según sus prioridades. En la demo, un proyecto de 10.000 sqft en Miami Beach pasó de USD 846.000 a USD 344.000 ajustando prioridades. Después, un servicio de ingeniería de USD 7.000 hace que el diseño se cobre antes de empezar la ejecución. Internamente la estimación trabaja sobre aproximadamente el 2% del valor de la propiedad, pero ese razonamiento nunca se le muestra al visitante porque sesga la percepción y espanta leads que habrían calificado.

FASES
1. Cimientos (en curso): carpeta compartida de Drive (hecho), propuesta y documentos de acceso (hecho), cuestionario de voz de marca (espera a Domic), documento de plan de acción (en curso), accesos a plataformas (espera a Domic).
2. Setup (próximo): refinamiento de la calculadora, CRM en GoHighLevel, landing pages (un camino para dueños de casa, otro para arquitectos y desarrolladores), auditoría del sitio, producción de contenido.
3. Performance (después del setup): campañas en Meta y Google, LinkedIn para B2B, cadencia de reportes.

EL EMBUDO QUE SE ESTÁ CONSTRUYENDO
Anuncio (rango de inversión preguntado de entrada) → Calculadora (el visitante arma su alcance) → Llamada calificada → Servicio de ingeniería.

MENSAJES POR PÚBLICO
A los dueños de casa se les habla de la experiencia de vivir la casa, por Meta y Google. A arquitectos y desarrolladores, de lo simple que es trabajar con Domic y los diferenciales técnicos, por LinkedIn.

MÉTRICAS
La que manda: llamadas de venta calificadas, no tráfico. También costo por llamada calificada, calculadoras completadas, servicios de ingeniería vendidos, inversión por canal.

RITMO DE TRABAJO
Update escrito semanal, llamada de trabajo cada dos semanas (30 a 45 minutos), reporte de resultados mensual, panel siempre al día, línea directa para lo urgente.

ESTADO AL 23 DE AGOSTO DE 2026
Fase de onboarding. Sin campañas corriendo, sin números de performance todavía.

CONTACTOS
Pablo Lukin (dirección comercial), Agustín Bancalari (socio, arquitecto, servicios estratégicos: gestión de proyectos, cotización y finanzas).`,
  },
};

export async function POST(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  if (!authorized(req, client)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const cfg = CONTEXTO[client];
  if (!cfg) return NextResponse.json({ error: 'no_context' }, { status: 404 });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'ai_not_configured' }, { status: 503 });

  let body: { question?: string; history?: ChatTurn[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 });
  }

  const question = String(body.question || '').trim().slice(0, 2000);
  if (question.length < 3) return NextResponse.json({ error: 'question_too_short' }, { status: 400 });

  const history: ChatTurn[] = (Array.isArray(body.history) ? body.history : [])
    .filter((t): t is ChatTurn => !!t && (t.role === 'user' || t.role === 'assistant') && typeof t.content === 'string')
    .slice(-8)
    .map((t) => ({ role: t.role, content: t.content.slice(0, 3000) }));

  // Reglas de conducta: el asistente responde solo desde el contexto cargado.
  // Cuando no alcanza para una conclusión, lo dice y deriva al equipo. Nunca
  // inventa números, promesas ni fechas.
  const system =
    `You are the Master Plan assistant inside the private client portal of A+Growth, a growth marketing agency. ` +
    `You answer questions from the client about their marketing plan.\n\n` +
    `LANGUAGE: answer in ${cfg.idioma}. Always.\n\n` +
    `WHAT YOU KNOW\n${cfg.contexto}\n\n` +
    `HOW YOU ANSWER\n` +
    `- Ground every answer in the context above. That context comes from meetings, chats and the numbers collected so far.\n` +
    `- Be concrete and useful. Short paragraphs. Bullets only when they genuinely help.\n` +
    `- When you explain a decision, explain the reasoning behind it, not just the conclusion.\n\n` +
    `HARD RULES\n` +
    `1. Never invent numbers, results, dates, or commitments. If a figure is not in the context above, you do not have it.\n` +
    `2. When the context is not enough to reach a sound conclusion, say so plainly and suggest they raise it with the team directly. Do not guess and do not fill the gap with generic marketing advice.\n` +
    `3. Never speak badly of the agency, never suggest the work is behind, off track or poorly done, and never speculate about problems. If something is genuinely pending, describe it as what it is: a step in the process, with the reason it sits where it does.\n` +
    `4. Never promise results, timelines or numbers that are not already agreed in the context.\n` +
    `5. If asked about pricing, contracts or anything commercial beyond what the context states, point them to the team.\n` +
    `6. If asked something unrelated to this client's marketing plan, redirect politely.\n\n` +
    `WHEN YOU DO NOT KNOW\n` +
    `Say it directly, in one sentence, and point them to the team. Something in the spirit of: this is not something the plan covers yet, better to raise it on the next call. Never dress up a non-answer as an answer.\n\n` +
    `TONE\n` +
    `You represent the agency: calm, competent, transparent. You are not a salesperson and you are not defensive. If a client asks a hard question, answer it honestly within what you know.\n` +
    `Never use em dashes.`;

  const aiRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-beta': 'server-side-fallback-2026-07-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.MASTER_PLAN_MODEL || 'claude-opus-5',
      max_tokens: 1000,
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
