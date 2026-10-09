import { NextRequest, NextResponse } from 'next/server';
import { isClientAuthorized, isMasterAuthorized } from '../../../../lib/client-auth';
import { kvGet, kvSet } from '../../../../lib/teamboard';

// Master Plan vivo de un cliente (/clients/<cliente>/masterplan).
// El contenido no va en el HTML porque el repo es público: vive en Upstash
// (masterplan:<cliente>) y la página lo pide con la cookie del cliente.
//   GET              -> { html, actualizado, bitacora }   (cliente, equipo o maestra)
//   PUT { html, nota } -> guarda una versión nueva y suma la nota a la bitácora (equipo o maestra)
// El cliente lee, nunca escribe. Lo actualizamos nosotros a medida que avanza el plan.

type Plan = { html: string; actualizado: string; bitacora: { fecha: string; nota: string }[] };

function esEquipo(req: NextRequest): boolean {
  const team = process.env.AGROWTH_TEAM_KEY || 'EQUIPO2226';
  if (req.cookies.get('agrowth_team')?.value === team) return true;
  return isMasterAuthorized(req.cookies.get('agrowth_master')?.value);
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ client: string }> }) {
  const { client } = await params;
  const cliente = isClientAuthorized(client, req.cookies.get(`client_auth_${client}`)?.value, req.cookies.get('agrowth_master')?.value);
  if (!cliente && !esEquipo(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  try {
    const p = await kvGet<Plan>(`masterplan:${client}`);
    return NextResponse.json(p || { html: '', actualizado: '', bitacora: [] }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'storage_error' }, { status: 503 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ client: string }> }) {
  const { client } = await params;
  if (!esEquipo(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  let body: { html?: string; nota?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }
  const html = String(body.html || '');
  if (!html) return NextResponse.json({ error: 'falta_html' }, { status: 400 });
  const previo = (await kvGet<Plan>(`masterplan:${client}`)) || { html: '', actualizado: '', bitacora: [] };
  const ahora = new Date().toISOString();
  const nota = String(body.nota || '').trim().slice(0, 500);
  const bitacora = nota ? [{ fecha: ahora, nota }, ...previo.bitacora].slice(0, 100) : previo.bitacora;
  await kvSet(`masterplan:${client}`, { html, actualizado: ahora, bitacora });
  return NextResponse.json({ ok: true, chars: html.length, entradas: bitacora.length });
}
