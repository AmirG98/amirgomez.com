import { NextRequest, NextResponse } from 'next/server';
import { Board, Card, COLUMNAS, guardarBoard, hashToken, kvGet, kvSet, leerBoard, log } from '../../../lib/teamboard';
import { CLIENT_PASSWORDS } from '../../../lib/client-auth';
import { borrarSitio, guardarSitio, leerIndice, MAX_BYTES, PUEDEN_PUBLICAR, rutaValida } from '../../../lib/sitios';

// MCP del master board de A+ Growth (Streamable HTTP, sin estado).
// Para que cada persona del equipo conecte su Claude y vea sus tareas, las mueva,
// anote qué hizo y deje el link del entregable.
//
// Auth: token personal (POST /api/mcp/tokens), por header
//   Authorization: Bearer <token>   o por query  ?token=<token>
// La persona sale del token: lo que hace queda firmado con su nombre.
// Permisos: Amir toca todo. El resto modifica sus tareas y las de "Equipo"
// (al tomar una de "Equipo" pasa a su nombre). Leer, lee todo.
// Sitios: Amir y Agustín pueden publicar páginas HTML en weareaplus.net/s/<ruta>
// (lib/sitios.ts). Cada uno edita y despublica lo suyo; Amir, todo.

export const maxDuration = 30;

type Tokens = Record<string, { persona: string; creado: string; ultimo_uso?: string; pista: string }>;
type Rpc = { jsonrpc: '2.0'; id?: string | number | null; method: string; params?: Record<string, unknown> };

const VERSIONES = ['2025-06-18', '2025-03-26', '2024-11-05'];

async function persona(req: NextRequest): Promise<string | null> {
  const h = req.headers.get('authorization') || '';
  const token = h.toLowerCase().startsWith('bearer ') ? h.slice(7).trim() : (req.nextUrl.searchParams.get('token') || '');
  if (!token) return null;
  const tokens = (await kvGet<Tokens>('mcp:tokens')) || {};
  const t = tokens[hashToken(token)];
  if (!t) return null;
  const hoy = new Date().toISOString().slice(0, 10);
  if ((t.ultimo_uso || '').slice(0, 10) !== hoy) { t.ultimo_uso = new Date().toISOString(); await kvSet('mcp:tokens', tokens).catch(() => {}); }
  return t.persona;
}

const TOOLS = [
  { name: 'mis_tareas', description: 'Lista las tareas asignadas a quien está conectado (y las de "Equipo" que nadie tomó), ordenadas por urgencia y fecha límite. Usala para arrancar el día.',
    inputSchema: { type: 'object', properties: { incluir_listas: { type: 'boolean', description: 'Incluir también las que ya están en Listo.' } } } },
  { name: 'buscar_tareas', description: 'Busca tareas del master board por texto, cliente, columna o responsable. Devuelve el id de cada una.',
    inputSchema: { type: 'object', properties: {
      texto: { type: 'string' }, cliente: { type: 'string', description: 'Ej: Founder Accelerator, Casafight, Urban USA' },
      columna: { type: 'string', enum: COLUMNAS }, quien: { type: 'string' } } } },
  { name: 'ver_tarea', description: 'Detalle completo de una tarea: qué pidieron, quién y por dónde, el texto original del pedido, links e historial.',
    inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] } },
  { name: 'completar_tarea', description: 'Marca una tarea como terminada: la pasa a Revisión (o a Listo si se indica), anota qué se hizo y suma los links de los entregables. Es lo que hay que usar al terminar un trabajo.',
    inputSchema: { type: 'object', properties: {
      id: { type: 'string' }, que_hice: { type: 'string', description: 'Qué se entregó, en una o dos oraciones.' },
      links: { type: 'array', items: { type: 'string' }, description: 'Links a los entregables (Drive, Figma, etc.).' },
      columna: { type: 'string', enum: ['Revisión', 'Listo'], description: 'Por defecto Revisión, para que Amir lo vea antes de cerrarla.' } },
      required: ['id', 'que_hice'] } },
  { name: 'mover_tarea', description: 'Cambia una tarea de columna (Por asignar, Haciendo, Revisión, Listo). Para empezar una tarea, movela a Haciendo.',
    inputSchema: { type: 'object', properties: { id: { type: 'string' }, columna: { type: 'string', enum: COLUMNAS } }, required: ['id', 'columna'] } },
  { name: 'agregar_nota', description: 'Agrega una nota a una tarea (avance, bloqueo, duda) sin moverla.',
    inputSchema: { type: 'object', properties: { id: { type: 'string' }, texto: { type: 'string' } }, required: ['id', 'texto'] } },
  { name: 'crear_tarea', description: 'Crea una tarea nueva en el master board. Si el pedido llegó por WhatsApp o Slack, pegá el mensaje tal cual en "mensaje".',
    inputSchema: { type: 'object', properties: {
      titulo: { type: 'string' }, cliente: { type: 'string' }, nota: { type: 'string' },
      quien: { type: 'string', description: 'Responsable. Por defecto, quien está conectado.' },
      vence: { type: 'string', description: 'Fecha límite AAAA-MM-DD.' }, urgente: { type: 'boolean' },
      canal: { type: 'string', enum: ['WhatsApp', 'Slack', 'Reunión', 'Mail', 'Portal', 'Interno'] },
      pedido_por: { type: 'string' }, mensaje: { type: 'string', description: 'Texto original del pedido.' } },
      required: ['titulo'] } },
  { name: 'ver_ficha', description: 'Ficha de un cliente: estado, objetivo, números, lo acordado en la última reunión, lo pendiente de ellos, fechas y contactos.',
    inputSchema: { type: 'object', properties: { cliente: { type: 'string' } }, required: ['cliente'] } },
];

const SITIO_TOOLS = [
  { name: 'publicar_sitio', description: 'Publica (o actualiza) una página HTML en weareaplus.net/s/<ruta>, al instante y sin deploy. Sirve para landings, previews para clientes y páginas sueltas. El HTML tiene que ser un solo archivo autocontenido (CSS y JS inline; imágenes por URL o en base64). Si se indica cliente, la página pide la misma clave que el portal de ese cliente.',
    inputSchema: { type: 'object', properties: {
      ruta: { type: 'string', description: 'Ruta en minúsculas con guiones, hasta 3 niveles. Ej: qhu/landing-c, glowing-home/preview-oferta.' },
      html: { type: 'string', description: 'El HTML completo de la página.' },
      url: { type: 'string', description: 'Alternativa a html: link https público a un archivo HTML para descargarlo y publicarlo.' },
      titulo: { type: 'string', description: 'Nombre corto para reconocerla en el listado.' },
      cliente: { type: 'string', description: 'Opcional. Slug del portal del cliente (ej: qhu, casafight, urban-usa) para protegerla con su clave.' } },
      required: ['ruta'] } },
  { name: 'listar_sitios', description: 'Lista las páginas publicadas en weareaplus.net/s/: ruta, link, quién la publicó, cliente y última actualización.',
    inputSchema: { type: 'object', properties: {} } },
  { name: 'despublicar_sitio', description: 'Saca una página publicada en weareaplus.net/s/<ruta>. El link deja de funcionar.',
    inputSchema: { type: 'object', properties: { ruta: { type: 'string' } }, required: ['ruta'] } },
];
const ALL_TOOLS = [...TOOLS, ...SITIO_TOOLS];
const BASE = 'https://www.weareaplus.net/s/';

async function llamarSitio(p: string, nombre: string, a: Record<string, unknown>): Promise<{ text: string; error?: boolean }> {
  if (!PUEDEN_PUBLICAR.includes(p)) return { text: 'Publicar sitios está habilitado solo para Amir y Agustín.', error: true };
  const indice = await leerIndice();

  if (nombre === 'listar_sitios') {
    const filas = Object.entries(indice).sort((x, y) => y[1].actualizado.localeCompare(x[1].actualizado))
      .map(([r, s]) => `- ${s.titulo || r} · ${BASE}${r} · ${s.autor}${s.cliente ? ` · clave de ${s.cliente}` : ' · pública'} · ${s.actualizado.slice(0, 10)}`);
    return { text: filas.length ? `Sitios publicados:\n${filas.join('\n')}` : 'Todavía no hay sitios publicados.' };
  }

  const ruta = String(a.ruta || '').trim().toLowerCase().replace(/^\/+|\/+$/g, '').replace(/^s\//, '');
  if (!rutaValida(ruta)) return { text: 'Ruta inválida. Usá minúsculas, números y guiones, hasta 3 niveles separados por "/". Ej: qhu/landing-c.', error: true };
  const previo = indice[ruta];
  if (previo && previo.autor !== p && p !== 'Amir') return { text: `Esa ruta la publicó ${previo.autor}. Elegí otra ruta.`, error: true };

  if (nombre === 'despublicar_sitio') {
    if (!previo) return { text: 'No hay ninguna página publicada en esa ruta.', error: true };
    await borrarSitio(ruta);
    return { text: `Listo, ${BASE}${ruta} ya no está publicada.` };
  }

  let html = typeof a.html === 'string' ? a.html : '';
  if (!html.trim() && a.url) {
    const u = String(a.url);
    if (!/^https:\/\//i.test(u)) return { text: 'El link tiene que ser https.', error: true };
    const r = await fetch(u, { signal: AbortSignal.timeout(15000), redirect: 'follow' }).catch(() => null);
    if (!r || !r.ok) return { text: 'No pude descargar el HTML de ese link. Revisá que sea público.', error: true };
    html = await r.text();
  }
  if (!html.trim()) return { text: 'Falta el contenido: pasá el HTML completo en "html" o un link en "url".', error: true };
  if (!/<html|<body|<!doctype/i.test(html.slice(0, 5000))) return { text: 'Eso no parece una página HTML completa (falta <html> o <body>).', error: true };
  if (Buffer.byteLength(html, 'utf8') > MAX_BYTES) return { text: 'La página pesa más de 4 MB. Sacá imágenes en base64 y usalas por URL.', error: true };

  const cliente = a.cliente ? String(a.cliente).trim().toLowerCase() : '';
  if (cliente && !(cliente in CLIENT_PASSWORDS)) return { text: `No existe el portal "${cliente}". Opciones: ${Object.keys(CLIENT_PASSWORDS).join(', ')}.`, error: true };

  const ahora = new Date().toISOString();
  await guardarSitio(ruta, html, {
    titulo: String(a.titulo || previo?.titulo || ruta).slice(0, 120), autor: previo?.autor || p,
    cliente: cliente || undefined, creado: previo?.creado || ahora, actualizado: ahora,
  });
  return { text: `${previo ? 'Actualizada' : 'Publicada'}: ${BASE}${ruta}\n${cliente ? `Protegida con la clave del portal de ${cliente}.` : 'Pública por link (no aparece en Google).'}` };
}

const linea = (c: Card) => `- [${c.id}] ${c.titulo} · ${c.cliente || 'Sin cliente'} · ${c.quien} · ${c.columna}${c.vence ? ` · vence ${c.vence}` : ''}${c.urgente ? ' · URGENTE' : ''}`;
const norm = (t: string) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const hoy = () => new Date().toISOString().slice(0, 10);

function detalle(c: Card): string {
  return [`${c.titulo}`, `id: ${c.id}`, `Cliente: ${c.cliente || 'Sin cliente'} · Responsable: ${c.quien} · Columna: ${c.columna}`,
    c.vence ? `Fecha límite: ${c.vence}${c.vence < hoy() && c.columna !== 'Listo' ? ' (VENCIDA)' : ''}` : '', c.urgente ? 'Urgente' : '',
    c.canal || c.pedido_por ? `Origen: ${c.canal || ''}${c.pedido_por ? ', pedido por ' + c.pedido_por : ''}${c.pedido_fecha ? ', el ' + c.pedido_fecha : ''}` : '',
    c.mensaje ? `Pedido textual: "${c.mensaje}"` : '', c.nota ? `Detalle: ${c.nota}` : '',
    c.links && c.links.length ? `Links: ${c.links.join(' , ')}` : '',
    c.historial && c.historial.length ? `Historial:\n${c.historial.slice(0, 8).map((h) => `  ${h.ts.slice(0, 16).replace('T', ' ')} ${h.que}`).join('\n')}` : '',
  ].filter(Boolean).join('\n');
}

function puede(p: string, c: Card) { return p === 'Amir' || c.quien === p || c.quien === 'Equipo'; }

async function llamar(p: string, nombre: string, a: Record<string, unknown>): Promise<{ text: string; error?: boolean }> {
  if (SITIO_TOOLS.some((t) => t.name === nombre)) return llamarSitio(p, nombre, a);
  const b: Board = await leerBoard();
  const buscar = (id: unknown) => b.cards.find((c) => c.id === String(id || ''));
  const ahora = new Date().toISOString();

  if (nombre === 'mis_tareas') {
    const orden = (c: Card) => `${c.urgente ? 0 : 1}${c.vence || '9999'}`;
    const mias = b.cards.filter((c) => (c.quien === p || c.quien === 'Equipo') && (a.incluir_listas || c.columna !== 'Listo')).sort((x, y) => orden(x).localeCompare(orden(y)));
    return { text: mias.length ? `Tareas de ${p} (y de Equipo):\n${mias.map(linea).join('\n')}` : `No hay tareas abiertas a nombre de ${p}.` };
  }
  if (nombre === 'buscar_tareas') {
    const t = norm(String(a.texto || '')), cli = norm(String(a.cliente || '')), q = String(a.quien || '');
    const r = b.cards.filter((c) => (!t || norm(`${c.titulo} ${c.nota} ${c.mensaje || ''}`).includes(t)) && (!cli || norm(c.cliente || '').includes(cli)) &&
      (!a.columna || c.columna === a.columna) && (!q || c.quien === q));
    return { text: r.length ? r.slice(0, 40).map(linea).join('\n') : 'No encontré tareas con esos filtros.' };
  }
  if (nombre === 'ver_tarea') {
    const c = buscar(a.id); return c ? { text: detalle(c) } : { text: 'No existe una tarea con ese id.', error: true };
  }
  if (nombre === 'ver_ficha') {
    const n = Object.keys(b.clientes || {}).find((k) => norm(k).includes(norm(String(a.cliente || ''))));
    if (!n) return { text: `No hay ficha para ese cliente. Fichas disponibles: ${Object.keys(b.clientes || {}).join(', ')}.`, error: true };
    const f = (b.clientes || {})[n] as Record<string, unknown>;
    const l = (k: string) => Array.isArray(f[k]) ? (f[k] as unknown[]).map((x) => `- ${typeof x === 'string' ? x : Object.values(x as object).join(' | ')}`).join('\n') : '';
    return { text: `FICHA DE ${n}\nEstado: ${f.estado_txt || f.estado || ''}\nObjetivo: ${f.objetivo || ''}\nNúmeros:\n${l('kpis')}\nAcordado:\n${l('acuerdos')}\nPendiente de ellos:\n${l('de_ellos')}\nA decidir:\n${l('abierto')}\nFechas:\n${l('hitos')}\nReunión: ${f.reunion || ''}\nContactos: ${f.contactos || ''}` };
  }
  if (nombre === 'crear_tarea') {
    const titulo = String(a.titulo || '').trim().slice(0, 200);
    if (!titulo) return { text: 'Falta el título.', error: true };
    const quien = String(a.quien || p);
    const c: Card = {
      id: 't' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), titulo, quien,
      cliente: String(a.cliente || 'Sin cliente'), nota: String(a.nota || ''), urgente: !!a.urgente, columna: 'Por asignar',
      actualizado: ahora, canal: String(a.canal || 'Interno'), pedido_por: String(a.pedido_por || p), pedido_fecha: hoy(),
      mensaje: String(a.mensaje || ''), vence: /^\d{4}-\d{2}-\d{2}$/.test(String(a.vence || '')) ? String(a.vence) : '', links: [],
      historial: [{ ts: ahora, que: `Creada por ${p} desde Claude` }],
    };
    b.cards.unshift(c); await guardarBoard(b);
    return { text: `Tarea creada.\n${linea(c)}` };
  }

  const c = buscar(a.id);
  if (!c) return { text: 'No existe una tarea con ese id. Usá mis_tareas o buscar_tareas para ver los ids.', error: true };
  if (!puede(p, c)) return { text: `Esa tarea es de ${c.quien}. Solo podés modificar las tuyas o las de Equipo.`, error: true };
  if (c.quien === 'Equipo' && p !== 'Amir' && nombre !== 'agregar_nota') { c.quien = p; log(c, `${p} la tomó`); }

  if (nombre === 'mover_tarea') {
    const col = String(a.columna || '');
    if (!COLUMNAS.includes(col)) return { text: `Columna inválida. Opciones: ${COLUMNAS.join(', ')}.`, error: true };
    if (col !== c.columna) { log(c, `${p} desde Claude: ${c.columna} → ${col}`); c.columna = col; }
  } else if (nombre === 'completar_tarea') {
    const col = a.columna === 'Listo' ? 'Listo' : 'Revisión';
    const que = String(a.que_hice || '').trim().slice(0, 1500);
    if (!que) return { text: 'Contá en una o dos oraciones qué hiciste.', error: true };
    const links = Array.isArray(a.links) ? (a.links as unknown[]).map(String).filter(Boolean) : [];
    c.nota = `${c.nota ? c.nota + '\n\n' : ''}Entregado por ${p} (${hoy()}): ${que}`;
    c.links = Array.from(new Set([...(c.links || []), ...links]));
    log(c, `${p} desde Claude: ${c.columna} → ${col}. ${que.slice(0, 120)}`);
    c.columna = col;
  } else if (nombre === 'agregar_nota') {
    const t = String(a.texto || '').trim().slice(0, 1500);
    if (!t) return { text: 'La nota está vacía.', error: true };
    c.nota = `${c.nota ? c.nota + '\n\n' : ''}${p} (${hoy()}): ${t}`;
    log(c, `${p} agregó una nota desde Claude`);
  } else {
    return { text: `No existe la herramienta ${nombre}.`, error: true };
  }
  c.actualizado = ahora;
  await guardarBoard(b);
  return { text: `Hecho.\n${detalle(c)}` };
}

async function manejar(p: string, m: Rpc): Promise<object | null> {
  const ok = (result: object) => ({ jsonrpc: '2.0', id: m.id ?? null, result });
  const err = (code: number, message: string) => ({ jsonrpc: '2.0', id: m.id ?? null, error: { code, message } });
  if (m.id === undefined || m.id === null) return null; // notificación
  switch (m.method) {
    case 'initialize': {
      const pedida = String((m.params || {}).protocolVersion || '');
      return ok({
        protocolVersion: VERSIONES.includes(pedida) ? pedida : VERSIONES[0],
        capabilities: { tools: {} },
        serverInfo: { name: 'agrowth-board', version: '1.0.0' },
        instructions: `Master board de A+ Growth. Conectado como ${p}. Al arrancar, usá mis_tareas. Al terminar un trabajo, usá completar_tarea con lo que hiciste y el link del entregable: queda en Revisión para que Amir lo vea.${PUEDEN_PUBLICAR.includes(p) ? ' Para subir una página a weareaplus.net usá publicar_sitio y pasá el link que devuelve como entregable.' : ''} Escribí en español rioplatense.`,
      });
    }
    case 'ping': return ok({});
    case 'tools/list': return ok({ tools: PUEDEN_PUBLICAR.includes(p) ? ALL_TOOLS : TOOLS });
    case 'tools/call': {
      const n = String((m.params || {}).name || '');
      if (!ALL_TOOLS.some((t) => t.name === n)) return err(-32602, `Herramienta desconocida: ${n}`);
      try {
        const r = await llamar(p, n, ((m.params || {}).arguments as Record<string, unknown>) || {});
        return ok({ content: [{ type: 'text', text: r.text }], isError: !!r.error });
      } catch {
        return ok({ content: [{ type: 'text', text: 'No pude leer o guardar el board. Probá de nuevo en un momento.' }], isError: true });
      }
    }
    default: return err(-32601, `Método no soportado: ${m.method}`);
  }
}

export async function POST(req: NextRequest) {
  const p = await persona(req).catch(() => null);
  if (!p) return NextResponse.json({ error: 'unauthorized' }, { status: 401, headers: { 'WWW-Authenticate': 'Bearer' } });
  let body: Rpc | Rpc[];
  try { body = await req.json(); } catch { return NextResponse.json({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }, { status: 400 }); }
  if (Array.isArray(body)) {
    const r = (await Promise.all(body.map((m) => manejar(p, m)))).filter(Boolean);
    return r.length ? NextResponse.json(r) : new NextResponse(null, { status: 202 });
  }
  const r = await manejar(p, body);
  return r ? NextResponse.json(r) : new NextResponse(null, { status: 202 });
}

export async function GET() {
  return new NextResponse('Este MCP no usa SSE. Conectá por POST.', { status: 405, headers: { Allow: 'POST' } });
}
