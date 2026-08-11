import { NextRequest, NextResponse } from 'next/server';
import { CLIENT_PASSWORDS, isClientAuthorized } from './lib/client-auth';

// Portal de clientes protegido con clave (validación server-side vía cookie):
//   /clients/<cliente>            → hub      (public/clients/<cliente>-hub.html)
//   /clients/<cliente>/reports    → reporte  (public/clients/<cliente>.html)
//   /clients/<cliente>/approvals  → kanban   (public/clients/<cliente>-approvals.html)
export function middleware(req: NextRequest) {
  const match = req.nextUrl.pathname.match(/^\/clients\/([^/]+?)(?:\.html)?(?:\/(approvals|reports))?\/?$/);
  if (!match) return NextResponse.next();

  const client = match[1];
  const section = match[2];

  // Archivos internos (-hub, -approvals) nunca se sirven por URL directa; -login sí.
  if (client.endsWith('-login')) return NextResponse.next();
  if (client.endsWith('-hub') || client.endsWith('-approvals')) {
    const base = client.replace(/-(hub|approvals)$/, '');
    return NextResponse.rewrite(new URL(`/clients/${base}-login.html`, req.url));
  }

  if (!(client in CLIENT_PASSWORDS)) return NextResponse.next();

  const cookie = req.cookies.get(`client_auth_${client}`)?.value;
  if (!isClientAuthorized(client, cookie)) {
    return NextResponse.rewrite(new URL(`/clients/${client}-login.html`, req.url));
  }

  if (section === 'approvals') return NextResponse.rewrite(new URL(`/clients/${client}-approvals.html`, req.url));
  if (section === 'reports') return NextResponse.rewrite(new URL(`/clients/${client}.html`, req.url));
  if (req.nextUrl.pathname.endsWith('.html')) return NextResponse.next();
  return NextResponse.rewrite(new URL(`/clients/${client}-hub.html`, req.url));
}

export const config = {
  matcher: '/clients/:path*',
};
