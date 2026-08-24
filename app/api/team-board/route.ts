import { NextRequest, NextResponse } from 'next/server';

// Tablero interno del equipo de A+Growth (Pilar, Agustin y Amir).
// Una sola clave compartida: AGROWTH_TEAM_KEY, o la maestra si existe.
// Storage: Upstash Redis. Sin env vars, GET devuelve vacio y PUT 503,
// y el front cae a localStorage (queda solo en ese navegador).

export const maxDuration = 30;

// Clave de equipo con default, para que el tablero funcione aunque no
// se configure nada en Vercel. Cambiala por env cuando quieras rotarla.
function teamKey(): string {
  return process.env.AGROWTH_TEAM_KEY || 'EQUIPO2226';
}

function authorized(req: NextRequest): boolean {
  const cookie = req.cookies.get('agrowth_team')?.value;
  if (cookie && cookie === teamKey()) return true;
  const master = process.env.AGROWTH_MASTER_KEY;
  const mc = req.cookies.get('agrowth_master')?.value;
  return Boolean(master && mc && mc === master);
}

function storageConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

const KEY = 'teamboard:agrowth';

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const cfg = storageConfig();
  if (!cfg) return NextResponse.json({ error: 'storage_not_configured' }, { status: 503 });

  const res = await fetch(`${cfg.url}/get/${encodeURIComponent(KEY)}`, {
    headers: { Authorization: `Bearer ${cfg.token}` },
    cache: 'no-store',
  });
  if (!res.ok) return NextResponse.json({ error: 'storage_error' }, { status: 502 });

  const data = await res.json();
  try {
    return NextResponse.json({ state: data.result ? JSON.parse(data.result) : null });
  } catch {
    return NextResponse.json({ state: null });
  }
}

export async function PUT(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const cfg = storageConfig();
  if (!cfg) return NextResponse.json({ error: 'storage_not_configured' }, { status: 503 });

  const body = await req.json();
  const res = await fetch(`${cfg.url}/set/${encodeURIComponent(KEY)}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${cfg.token}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) return NextResponse.json({ error: 'storage_error' }, { status: 502 });
  return NextResponse.json({ ok: true });
}
