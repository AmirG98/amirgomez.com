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
//   /clients/<cliente>/dashboard          → dashboard (public/clients/<cliente>-dashboard.html)
//   /clients/<cliente>/masterplan         → master plan (public/clients/<cliente>-masterplan.html)
function buyerOk(req: NextRequest): boolean {
  const key = process.env.AGROWTH_BUYER_KEY;
  const cookie = req.cookies.get('agrowth_buyer')?.value;
  return Boolean(key && cookie && cookie === key);
}

export function middleware(req: NextRequest) {
  // Presupuestos: entran master (AGROWTH_MASTER_KEY) y media buyer (AGROWTH_BUYER_KEY).
  if (req.nextUrl.pathname === '/hq/budgets' || req.nextUrl.pathname === '/hq/budgets/') {
    const master = req.cookies.get('agrowth_master')?.value;
    if (isMasterAuthorized(master) || buyerOk(req)) {
      return NextResponse.rewrite(new URL('/hq-budgets.html', req.url));
    }
    return NextResponse.rewrite(new URL('/hq-budgets-login.html', req.url));
  }

  // HQ interno de A+Growth: /hq con clave maestra (env AGROWTH_MASTER_KEY).
  if (req.nextUrl.pathname === '/hq' || req.nextUrl.pathname === '/hq.html' || req.nextUrl.pathname === '/hq/'
      || req.nextUrl.pathname === '/hq-budgets.html') {
    const master = req.cookies.get('agrowth_master')?.value;
    if (req.nextUrl.pathname === '/hq-budgets.html') {
      if (isMasterAuthorized(master) || buyerOk(req)) return NextResponse.next();
      return NextResponse.rewrite(new URL('/hq-budgets-login.html', req.url));
    }
    if (isMasterAuthorized(master)) return NextResponse.rewrite(new URL('/hq.html', req.url));
    return NextResponse.rewrite(new URL('/hq-login.html', req.url));
  }

  const match = req.nextUrl.pathname.match(
    /^\/clients\/([^/]+?)(?:\.html)?(?:\/(approvals|reports|ideas|transcripts|context|budgets|dashboard|masterplan)(?:\/(\d{4}-\d{2}-\d{2}))?)?\/?$/
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
    client.endsWith('-dashboard') ||
    client.endsWith('-masterplan') ||
    client.endsWith('-budgets') ||
    /-report-\d{4}-\d{2}-\d{2}$/.test(client)
  ) {
    const base = client.replace(/-(hub|approvals|ideas|transcripts|context|budgets|dashboard|masterplan|report-\d{4}-\d{2}-\d{2})$/, '');
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
  if (section === 'dashboard') return NextResponse.rewrite(new URL(`/clients/${client}-dashboard.html`, req.url));
  if (section === 'masterplan') return NextResponse.rewrite(new URL(`/clients/${client}-masterplan.html`, req.url));
  if (section === 'budgets') return NextResponse.rewrite(new URL(`/clients/${client}-budgets.html`, req.url));
  if (section === 'reports' && date) return NextResponse.rewrite(new URL(`/clients/${client}-report-${date}.html`, req.url));
  if (section === 'reports') return NextResponse.rewrite(new URL(`/clients/${client}.html`, req.url));
  if (req.nextUrl.pathname.endsWith('.html')) return NextResponse.next();
  // Clientes con una sola sección: la raíz sirve el dashboard directamente,
  // así no hay que mantener un hub duplicado con un único tile.
  const SOLO_DASHBOARD = ['domic', 'casafight', 'qhu'];
  if (SOLO_DASHBOARD.includes(client)) {
    return NextResponse.rewrite(new URL(`/clients/${client}-dashboard.html`, req.url));
  }

  return NextResponse.rewrite(new URL(`/clients/${client}-hub.html`, req.url));
}

export const config = {
  matcher: ['/clients/:path*', '/hq', '/hq.html', '/hq/', '/hq/budgets', '/hq/budgets/', '/hq-budgets.html'],
};
