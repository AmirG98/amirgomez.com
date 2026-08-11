import { NextRequest, NextResponse } from 'next/server';
import { CLIENT_PASSWORDS, isClientAuthorized } from './lib/client-auth';

// Protege los espacios de clientes con clave (validación server-side vía cookie):
//   /clients/<cliente>            → reporte  (public/clients/<cliente>.html)
//   /clients/<cliente>/approvals  → kanban   (public/clients/<cliente>-approvals.html)
export function middleware(req: NextRequest) {
  const match = req.nextUrl.pathname.match(/^\/clients\/([^/]+?)(?:\.html)?(\/approvals)?\/?$/);
  if (!match) return NextResponse.next();

  const client = match[1];
  const isApprovals = Boolean(match[2]);
  if (client.endsWith('-login') || client.endsWith('-approvals')) {
    // Los archivos internos solo se sirven vía rewrite, nunca por URL directa.
    return client.endsWith('-login')
      ? NextResponse.next()
      : NextResponse.rewrite(new URL(`/clients/${client.replace(/-approvals$/, '')}-login.html`, req.url));
  }

  if (!(client in CLIENT_PASSWORDS)) return NextResponse.next();

  const cookie = req.cookies.get(`client_auth_${client}`)?.value;
  if (!isClientAuthorized(client, cookie)) {
    return NextResponse.rewrite(new URL(`/clients/${client}-login.html`, req.url));
  }

  if (isApprovals) {
    return NextResponse.rewrite(new URL(`/clients/${client}-approvals.html`, req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/clients/:path*',
};
