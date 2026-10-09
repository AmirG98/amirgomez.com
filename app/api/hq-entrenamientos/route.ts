import { NextRequest, NextResponse } from 'next/server';
import { kvGet, kvSet } from '../../../lib/teamboard';

// Contenido de los trainings del equipo (02 en adelante) para /hq/equipo/entrenamientos.
// Vive en Upstash y no en el HTML porque el repo es público: el HTML solo trae
// el armazón y el training 01, y el resto lo pide acá con la cookie de equipo.
//   GET -> { index, html }      (equipo o maestra)
//   PUT { index, html }         (equipo o maestra) lo genera equipo/trainings/build.py

const KEY = 'hq:entrenamientos';

function authorized(req: NextRequest): boolean {
  const team = process.env.AGROWTH_TEAM_KEY || 'EQUIPO2226';
  if (req.cookies.get('agrowth_team')?.value === team) return true;
  const master = process.env.AGROWTH_MASTER_KEY;
  const mc = req.cookies.get('agrowth_master')?.value;
  return Boolean(master && mc && mc === master);
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  try {
    const d = await kvGet<{ index: string; html: string; actualizado?: string }>(KEY);
    return NextResponse.json(d || { index: '', html: '' }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'storage_error' }, { status: 503 });
  }
}

export async function PUT(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  let body: { index?: string; html?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }
  const index = String(body.index || ''); const html = String(body.html || '');
  if (!html) return NextResponse.json({ error: 'falta_html' }, { status: 400 });
  await kvSet(KEY, { index, html, actualizado: new Date().toISOString() });
  return NextResponse.json({ ok: true, chars: html.length });
}
