import { NextRequest, NextResponse } from 'next/server';
import { isClientAuthorized } from '../../../lib/client-auth';
import { leerHtml, leerIndice } from '../../../lib/sitios';

// Sirve los sitios publicados desde el MCP (ver lib/sitios.ts).
// Si el sitio tiene cliente, pide la misma clave que su portal: devuelve el login del
// cliente, que guarda la cookie y recarga esta misma URL.

export const dynamic = 'force-dynamic';

const HEADERS = { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store' };

export async function GET(req: NextRequest, ctx: { params: Promise<{ ruta: string[] }> }) {
  const { ruta: partes } = await ctx.params;
  const ruta = (partes || []).join('/').toLowerCase();

  let indice;
  try { indice = await leerIndice(); } catch { return new NextResponse('No pude leer el sitio. Probá de nuevo en un momento.', { status: 503 }); }
  const sitio = indice[ruta];
  if (!sitio) return new NextResponse('Not found', { status: 404 });

  if (sitio.cliente) {
    const ok = isClientAuthorized(
      sitio.cliente,
      req.cookies.get(`client_auth_${sitio.cliente}`)?.value,
      req.cookies.get('agrowth_master')?.value,
    );
    if (!ok) {
      const login = await fetch(`${req.nextUrl.origin}/clients/${sitio.cliente}-login.html`, { cache: 'no-store' }).catch(() => null);
      if (login && login.ok) return new NextResponse(await login.text(), { status: 401, headers: HEADERS });
      return new NextResponse('Acceso privado.', { status: 401 });
    }
  }

  const html = await leerHtml(ruta, sitio.partes).catch(() => null);
  if (html === null) return new NextResponse('No pude leer el sitio. Probá de nuevo en un momento.', { status: 503 });
  return new NextResponse(html, { status: 200, headers: HEADERS });
}
