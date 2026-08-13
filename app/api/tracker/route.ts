import { NextRequest, NextResponse } from 'next/server';
import { isMasterAuthorized } from '../../../lib/client-auth';

// Campaign tracker interno de A+Growth. Solo clave maestra (cookie agrowth_master vs env AGROWTH_MASTER_KEY).
// Storage: Upstash (key tracker:agrowth), 503 sin env → el front usa localStorage.

function authorized(req: NextRequest): boolean {
  return isMasterAuthorized(req.cookies.get('agrowth_master')?.value);
}

function storageConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const cfg = storageConfig();
  if (!cfg) return NextResponse.json({ error: 'storage_not_configured' }, { status: 503 });
  const res = await fetch(`${cfg.url}/get/${encodeURIComponent('tracker:agrowth')}`, {
    headers: { Authorization: `Bearer ${cfg.token}` },
    cache: 'no-store',
  });
  if (!res.ok) return NextResponse.json({ error: 'storage_error' }, { status: 502 });
  const data = await res.json();
  return NextResponse.json({ doc: data.result ? JSON.parse(data.result) : null });
}

export async function PUT(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const cfg = storageConfig();
  if (!cfg) return NextResponse.json({ error: 'storage_not_configured' }, { status: 503 });
  const doc = await req.json();
  const res = await fetch(`${cfg.url}/set/${encodeURIComponent('tracker:agrowth')}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${cfg.token}` },
    body: JSON.stringify(doc),
  });
  if (!res.ok) return NextResponse.json({ error: 'storage_error' }, { status: 502 });
  return NextResponse.json({ ok: true });
}
