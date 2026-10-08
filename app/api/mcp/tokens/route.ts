import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { isMasterAuthorized } from '../../../../lib/client-auth';
import { EQUIPO, hashToken, kvGet, kvSet } from '../../../../lib/teamboard';

// Tokens del MCP del master board, uno por persona del equipo.
// Solo con cookie de equipo o maestra. El token se muestra una sola vez;
// en Upstash queda guardado su hash.
//   POST   { persona } -> { token }
//   GET                -> [{ persona, creado, ultimo_uso, pista }]
//   DELETE { persona } -> revoca todos los tokens de esa persona

type Tokens = Record<string, { persona: string; creado: string; ultimo_uso?: string; pista: string }>;
const KEY = 'mcp:tokens';

function esEquipo(req: NextRequest): boolean {
  const t = req.cookies.get('agrowth_team')?.value;
  return Boolean((t && t === (process.env.AGROWTH_TEAM_KEY || 'EQUIPO2226')) || isMasterAuthorized(req.cookies.get('agrowth_master')?.value));
}

export async function POST(req: NextRequest) {
  if (!esEquipo(req)) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const { persona } = await req.json().catch(() => ({}));
  if (!EQUIPO.includes(persona) || persona === 'Equipo') return NextResponse.json({ error: 'persona' }, { status: 400 });
  const token = 'agt_' + randomBytes(24).toString('base64url');
  const tokens = (await kvGet<Tokens>(KEY)) || {};
  tokens[hashToken(token)] = { persona, creado: new Date().toISOString(), pista: token.slice(-4) };
  await kvSet(KEY, tokens);
  return NextResponse.json({ token, persona });
}

export async function GET(req: NextRequest) {
  if (!esEquipo(req)) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const tokens = (await kvGet<Tokens>(KEY)) || {};
  return NextResponse.json(Object.values(tokens));
}

export async function DELETE(req: NextRequest) {
  if (!esEquipo(req)) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const { persona } = await req.json().catch(() => ({}));
  const tokens = (await kvGet<Tokens>(KEY)) || {};
  for (const [h, v] of Object.entries(tokens)) if (v.persona === persona) delete tokens[h];
  await kvSet(KEY, tokens);
  return NextResponse.json({ ok: true });
}
