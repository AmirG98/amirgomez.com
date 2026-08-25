import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createHash } from 'crypto';
import { isClientAuthorized } from '../../../../lib/client-auth';

// Contrato de prestacion de servicios: el cliente completa sus datos, lee el
// contrato generado y lo firma dibujando en pantalla.
//
//   GET  -> devuelve el contrato guardado (datos + estado de firma).
//   PUT  -> guarda los datos del cliente sin firmar todavia (borrador).
//   POST -> firma. Sella fecha, IP, user agent y un hash del contenido, y
//           avisa por mail a A+Growth con copia al cliente.
//
// Sobre la firma: esto deja evidencia razonable (consentimiento explicito,
// fecha cierta, IP, hash del texto firmado) pero NO es firma digital
// certificada. Para eso hace falta un proveedor con validacion de identidad.

export const maxDuration = 30;

type Datos = {
  razonSocial?: string;
  representante?: string;
  documento?: string;
  domicilio?: string;
  email?: string;
  telefono?: string;
  ciudad?: string;
};

type Doc = {
  datos: Datos;
  firma?: {
    imagen: string;      // dataURL del trazo
    nombre: string;      // quien firma, tal como lo escribio
    fecha: string;
    ip: string;
    agente: string;
    hash: string;        // sha256 del texto del contrato al momento de firmar
  };
  actualizado?: string;
};

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

const key = (c: string) => `contrato:${c}`;

function clean(raw: unknown): Datos {
  const out: Datos = {};
  if (!raw || typeof raw !== 'object') return out;
  const campos = ['razonSocial', 'representante', 'documento', 'domicilio', 'email', 'telefono', 'ciudad'] as const;
  for (const k of campos) {
    const v = (raw as Record<string, unknown>)[k];
    if (typeof v === 'string') out[k] = v.trim().slice(0, 300);
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
  return NextResponse.json({ doc: await read(cfg, client), stored: true });
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  if (!authorized(req, client)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const cfg = storageConfig();
  if (!cfg) return NextResponse.json({ error: 'storage_not_configured' }, { status: 503 });

  let body: { datos?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 });
  }

  const prev = await read(cfg, client);
  // Un contrato ya firmado no se edita: habria que anularlo y hacer uno nuevo.
  if (prev?.firma) return NextResponse.json({ error: 'ya_firmado' }, { status: 409 });

  const doc: Doc = { datos: clean(body.datos), actualizado: new Date().toISOString() };
  const res = await write(cfg, client, doc);
  if (!res.ok) return NextResponse.json({ error: 'storage_error' }, { status: 502 });
  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ client: string }> }) {
  const { client } = await ctx.params;
  if (!authorized(req, client)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  let body: { datos?: unknown; firma?: string; nombre?: string; texto?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 });
  }

  const datos = clean(body.datos);
  const firmaImg = typeof body.firma === 'string' ? body.firma : '';
  const nombre = String(body.nombre || '').trim().slice(0, 200);
  const texto = String(body.texto || '');

  if (!datos.razonSocial || !datos.representante || !datos.documento || !datos.domicilio) {
    return NextResponse.json({ error: 'faltan_datos' }, { status: 400 });
  }
  if (!firmaImg.startsWith('data:image/') || firmaImg.length < 400) {
    return NextResponse.json({ error: 'falta_firma' }, { status: 400 });
  }
  if (!nombre) return NextResponse.json({ error: 'falta_nombre' }, { status: 400 });

  const cfg = storageConfig();
  if (cfg) {
    const prev = await read(cfg, client);
    if (prev?.firma) return NextResponse.json({ error: 'ya_firmado' }, { status: 409 });
  }

  const ahora = new Date();
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'desconocida';
  const agente = (req.headers.get('user-agent') || '').slice(0, 300);
  const hash = createHash('sha256').update(texto).digest('hex');

  const doc: Doc = {
    datos,
    firma: { imagen: firmaImg.slice(0, 400000), nombre, fecha: ahora.toISOString(), ip, agente, hash },
    actualizado: ahora.toISOString(),
  };

  if (cfg) {
    const res = await write(cfg, client, doc);
    if (!res.ok) return NextResponse.json({ error: 'storage_error' }, { status: 502 });
  }

  const esc = (s: string) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const html = `
        <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#26303a;max-width:640px;">
          <p style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#8a919b;margin:0 0 6px;">Contrato firmado</p>
          <h2 style="margin:0 0 18px;font-size:20px;">${esc(datos.razonSocial || client)}</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:6px 0;color:#6b7280;">Firmó</td><td style="padding:6px 0;"><b>${esc(nombre)}</b></td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Representante</td><td style="padding:6px 0;">${esc(datos.representante || '')}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Documento</td><td style="padding:6px 0;">${esc(datos.documento || '')}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Domicilio</td><td style="padding:6px 0;">${esc(datos.domicilio || '')}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Email</td><td style="padding:6px 0;">${esc(datos.email || '')}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Fecha</td><td style="padding:6px 0;">${esc(ahora.toISOString())}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">IP</td><td style="padding:6px 0;">${esc(ip)}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Hash del texto</td><td style="padding:6px 0;font-family:monospace;font-size:11px;word-break:break-all;">${esc(hash)}</td></tr>
          </table>
          <p style="margin:20px 0 6px;font-size:13px;color:#6b7280;">Firma:</p>
          <img src="${firmaImg}" alt="Firma" style="max-width:320px;border:1px solid #e0dcd3;background:#fff;">
          <p style="margin-top:22px;font-size:12px;color:#8a919b;">El contrato completo queda en el portal del cliente.</p>
        </div>`;

      const dest = ['amir@amirgomez.com'];
      if (datos.email && /.+@.+\..+/.test(datos.email)) dest.push(datos.email);

      await resend.emails.send({
        from: 'A+Growth <notifications@amirgomez.com>',
        to: dest,
        subject: `Contrato firmado — ${datos.razonSocial || client}`,
        html,
      });
      return NextResponse.json({ ok: true, mailed: true, fecha: doc.firma!.fecha, hash });
    } catch {
      return NextResponse.json({ ok: true, mailed: false, fecha: doc.firma!.fecha, hash });
    }
  }

  return NextResponse.json({ ok: true, mailed: false, fecha: doc.firma!.fecha, hash });
}
