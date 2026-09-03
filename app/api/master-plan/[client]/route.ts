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
// `agencia` existe porque no todos los portales van con la marca de A+Growth:
// el de Human at Scale esta brandeado como OutDo, que es quien factura ahi.
const CONTEXTO: Record<string, { idioma: string; contexto: string; agencia?: string }> = {
  'human-at-scale': {
    idioma: 'English (US). Chase is a native English speaker; never reply in Spanish.',
    agencia: 'OutDo',
    contexto: `BUSINESS
Human at Scale, founded by Chase Damiano. Operations consulting for accounting firms in the US. Core thesis: the owner is the bottleneck. The firm cannot grow past what the owner personally touches.
Main offer: an Operations Audit. How work actually flows, where the money is actually made, and what the tech stack does for the team versus to it. The deliverable is a prioritized roadmap with sequencing, success metrics and expected return.
ICP: owners and operators of US accounting firms. Firms that are too small are disqualified rather than nurtured.

PARTNERSHIP
Signed with Gusto to run eight of their partner firms through the Operations Audit. Firms are Gusto-nominated only. Language guardrails: never "exclusive", "official" or "Gusto's operations partner"; no implication that firms can apply; no client names or Gusto data.

CHANNELS AND WHAT EACH IS FOR
Ops Notes newsletter, every other Friday. Written by Chase. This is the authority engine.
LinkedIn: Chase's own posts plus paid amplification. Its job is constant presence, not lead capture. Steady profile traffic compounds into the authority that makes webinar hosts and podcasts say yes, and it stops the day the spend stops. Held steady at the current level rather than cut.
Meta: the volume and testing channel. Runs in rounds, one variable at a time. The attention it buys is cheap and that part works, but recent leads have not matched the ICP: firms too small to have a bottleneck worth removing, and clicks without real intent. That is why the native lead forms are being rebuilt with pre-qualifying questions about the firm, size, service mix and what is stuck, so filtering happens at capture instead of after a call is booked.
Webinars: partner communities such as The Collaboration Room. Treated as content assets first and lead sources second.
Podcasts: guesting strategy, not sponsorship. Priority order is Unofficial QuickBooks Accountants, then The Accounting Podcast, then Oh My Fraud.
Case studies: two published, Quadrant and FinClarity. Eight more exist from previous work but are not accounting firms, so they stay unpublished until ICP case studies exist.

SPEND TO DATE (account totals, all campaigns)
Total 1,547.66 USD. LinkedIn 1,290.77, which is 83 percent: 69,641 impressions, 1,562 clicks, 0.83 average cost per click. Meta 256.89 over the last 30 days, which is 17 percent.
What each LinkedIn campaign proved: Thought Leader v2, the engagement campaign, spent 921.14 and buys clicks at 0.63. Three campaigns tried to capture newsletter signups directly and all three were paused: the website conversion version reached 2.28 per click, and LinkedIn's own native lead form reached 24.64 per click for 3 clicks total, roughly 39 times the cost of the engagement campaign. The conclusion is the account's own: on LinkedIn, buying attention works and buying signups does not.
Meta has run three rounds. Round one sent traffic to the Operations Assessment, 155.43 spent at 0.40 per landing page view, high volume and no filtering. Round two moved capture into a native lead form with basic questions, 101.46 spent at 4.41 per lead, a named contact instead of an anonymous visit but too loose a filter. Round three, running now, adds pre-qualifying questions about the firm so people are qualified before they reach the assessment. Cost per result rises with each round and that is the intent: qualification keeps moving earlier in the funnel.
Attributed leads: zero for that cycle, because the Meta pixel was not yet installed. The pixel went live on August 26, so conversion events are now recording and the first real cost-per-lead reads arrive with the next reporting cycle.

THE CENTRAL CONSTRAINT
The pixel is installed as of August 26. What remains is letting data accumulate, connecting events through to the CRM view, and switching campaign optimization from clicks to conversions. Until enough data lands, spend decisions still lack a reliable cost-per-lead number.

HOW THE PIECES FIT
Content builds authority. Authority makes webinars and podcasts say yes. Those produce recordings. Recordings become clips and newsletter issues, which feed the content engine again. Paid amplifies whatever already works organically rather than replacing it. The Operations Assessment is where interest becomes a measurable action, and the Audit is where it becomes revenue.

WORKING AGREEMENTS
Nothing Chase writes gets rewritten by AI. Grammar and formatting only. Everything published is manually reviewed before it goes out, including checking that tags render and links resolve.

WHAT IS OPEN RIGHT NOW
CRM connection to complete the attribution loop. Pre-qualifying questions on the Meta lead forms. The custom tracker replacing the spreadsheet. Nurture campaigns for people who took the Operations Assessment, requested repeatedly and still not confirmed live. New pages with Makai Web for humanOS and the Operations Audit, plus dedicated Partners pages, with the copy upleveled. A repeatable process for cutting clips from long-form content.

RECENTLY DONE
Meta pixel installed August 26. Native lead forms running. Publishing QA checklist live in the portal, built after a formal escalation about content quality. The "Welcome, choose your path" email drafted and sent to Chase. Webinar framework published.`,
  },
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

PLAN DE LANZAMIENTO POR FASES (Córdoba Capital)
Fase 1, sembrar demanda, semanas 1 a 4: definir la lista corta de 30 a 50 talleres objetivo elegidos a mano y mapear su zona de influencia; recién después sale la pauta segmentada por radio sobre esas zonas. Entre 5 y 10 conceptos creativos en paralelo, evaluados a los 3 o 4 días. Todo el tráfico va al buscador de patente. Señal que se busca: búsquedas de patente por zona y costo por búsqueda.
Fase 2, convertir la demanda en presión, semanas 3 a 8: se superpone con la fase 1 a propósito, apenas una zona muestra volumen empieza el trabajo sobre el taller. Al usuario que buscó una patente se le muestra cómo pedir que le registren el service. Ventas contacta los talleres de las zonas activas con el dato de cuánta gente buscó su patente cerca. Sigue la validación telefónica personalizada. Señal que se busca: talleres registrados y cuántos llegaron porque un cliente se lo pidió.
Fase 3, escalar, semana 8 en adelante: se replica el modelo sobre nuevas zonas una por una y se sube el presupuesto solo en los conceptos con costo por búsqueda sostenido. Recién acá tiene sentido abrir prensa del sector e influencers. Señal que se busca: costo por taller sumado y repetición del modelo por zona.
Las fases se superponen a propósito: no son tramos que arrancan cuando termina el anterior.
El plan completo está disponible en PDF dentro del Master Plan.

NOTIFICACIONES POR WHATSAPP
Entra en el plan porque el historial sirve cuando el usuario vuelve a mirarlo: WhatsApp es el canal para avisarle que le registraron un service y recordarle cuándo toca el próximo mantenimiento. La configuración la hace QHU porque requiere accesos y documentación de la empresa; A+Growth dejó una guía paso a paso en PDF dentro del Master Plan, basada en la documentación oficial de Meta.
Datos clave de esa guía: el número que se conecte a la API no puede tener WhatsApp instalado (conviene una línea nueva sin la app). Sin verificación de negocio el límite es de 250 destinatarios por día; verificado sube a 2.000 y de ahí escala solo si la calidad se mantiene. Fuera de la ventana de 24 horas solo se pueden enviar plantillas aprobadas por Meta, y las de categoría utilidad (service registrado, recordatorio de mantenimiento) son las más baratas y las que menos se rechazan. Hace falta consentimiento previo del usuario: el momento natural para pedirlo es cuando escanea el QR del taller, lo que implica sumar una casilla al registro.
Los tiempos de verificación y de aprobación de plantillas los define Meta, no A+Growth ni QHU.

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
    `You are the Master Plan assistant inside the private client portal of ${cfg.agencia || 'A+Growth'}, a growth marketing agency. ` +
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
