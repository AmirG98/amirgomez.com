import { NextRequest, NextResponse } from 'next/server';

// Reportes de clientes protegidos con clave: se valida server-side vía cookie.
// Alta de un cliente nuevo: agregar entrada acá y su <cliente>-login.html en public/clients/.
const CLIENT_PASSWORDS: Record<string, string> = {
  'urban-usa': 'URBAN2226',
};

export function middleware(req: NextRequest) {
  const match = req.nextUrl.pathname.match(/^\/clients\/([^/]+?)(?:\.html)?$/);
  if (!match) return NextResponse.next();

  const client = match[1];
  if (client.endsWith('-login')) return NextResponse.next();

  const password = CLIENT_PASSWORDS[client];
  if (!password) return NextResponse.next();

  const cookie = req.cookies.get(`client_auth_${client}`)?.value;
  if (cookie === password) return NextResponse.next();

  return NextResponse.rewrite(new URL(`/clients/${client}-login.html`, req.url));
}

export const config = {
  matcher: '/clients/:path*',
};
