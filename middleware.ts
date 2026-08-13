import { NextRequest, NextResponse } from 'next/server';
import { CLIENT_PASSWORDS, isClientAuthorized, isMasterAuthorized } from './lib/client-auth';

// Portal de clientes protegido con clave (validación server-side vía cookie):
//   /clients/<cliente>                    → hub      (public/clients/<cliente>-hub.html)
//   /clients/<cliente>/reports            → reporte actual (public/clients/<cliente>.html)
//   /clients/<cliente>/reports/<fecha>    → reporte fechado (public/clients/<cliente>-report-<fecha>.html)
//   /clients/<cliente>/approvals          → kanban   (public/clients/<cliente>-approvals.html)
//   /clients/<cliente>/ideas              → banco    (public/clients/<cliente>-ideas.html)
//   /clients/<cliente>/transcripts        → reuniones (public/clients/<cliente>-transcripts.html)
//   /clients/<cliente>/context            → contexto vivo (public/clients/<cliente>-context.html)
export function middleware(req: NextRequest) {
  // HQ interno de A+Growth: /hq con clave maestra (env AGROWTH_MASTER_KEY).
  if (req.nextUrl.pathname === '/hq' || req.nextUrl.pathname === '/hq.html' || req.nextUrl.pathname === '/hq/') {
    const master = req.cookies.get('agrowth_master')?.value;
    if (isMasterAuthorized(master)) return NextResponse.rewrite(new URL('/hq.html', req.url));
    return NextResponse.rewrite(new URL('/hq-login.html', req.url));
  }

  const match = req.nextUrl.pathname.match(
    /^\/clients\/([^/]+?)(?:\.html)?(?:\/(approvals|reports|ideas|transcripts|context)(?:\/(\d{4}-\d{2}-\d{2}))?)?\/?$/
  );
  if (!match) return NextResponse.next();

  const client = match[1];
  const section = match[2];
  const date = match[3];

  // Archivos internos (-hub, -approvals, -ideas, -report-<fecha>) nunca se sirven por URL directa; -login sí.
  if (client.endsWith('-login')) return NextResponse.next();
  if (
    client.endsWith('-hub') ||
    client.endsWith('-approvals') ||
    client.endsWith('-ideas') ||
    client.endsWith('-transcripts') ||
    client.endsWith('-context') ||
    /-report-\d{4}-\d{2}-\d{2}$/.test(client)
  ) {
    const base = client.replace(/-(hub|approvals|ideas|transcripts|context|report-\d{4}-\d{2}-\d{2})$/, '');
    return NextResponse.rewrite(new URL(`/clients/${base}-login.html`, req.url));
  }

  if (!(client in CLIENT_PASSWORDS)) return NextResponse.next();

  const cookie = req.cookies.get(`client_auth_${client}`)?.value;
  const master = req.cookies.get('agrowth_master')?.value;
  if (!isClientAuthorized(client, cookie, master)) {
    return NextResponse.rewrite(new URL(`/clients/${client}-login.html`, req.url));
  }

  if (section === 'approvals') return NextResponse.rewrite(new URL(`/clients/${client}-approvals.html`, req.url));
  if (section === 'ideas') return NextResponse.rewrite(new URL(`/clients/${client}-ideas.html`, req.url));
  if (section === 'transcripts') return NextResponse.rewrite(new URL(`/clients/${client}-transcripts.html`, req.url));
  if (section === 'context') return NextResponse.rewrite(new URL(`/clients/${client}-context.html`, req.url));
  if (section === 'reports' && date) return NextResponse.rewrite(new URL(`/clients/${client}-report-${date}.html`, req.url));
  if (section === 'reports') return NextResponse.rewrite(new URL(`/clients/${client}.html`, req.url));
  if (req.nextUrl.pathname.endsWith('.html')) return NextResponse.next();
  return NextResponse.rewrite(new URL(`/clients/${client}-hub.html`, req.url));
}

export const config = {
  matcher: ['/clients/:path*', '/hq', '/hq.html', '/hq/'],
};
