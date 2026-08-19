// Claves de acceso de los espacios de clientes (/clients/*).
// Alta de cliente: agregar acá + su <cliente>-login.html en public/clients/.
export const CLIENT_PASSWORDS: Record<string, string> = {
  'urban-usa': 'URBAN2226',
  'founder-accelerators': 'FOUNDER2226',
  'human-at-scale': 'HAS2226',
};

// Clave maestra interna de A+Growth (env AGROWTH_MASTER_KEY, nunca en el repo).
// La cookie `agrowth_master` válida abre el HQ y TODOS los portales de clientes.
export function isMasterAuthorized(masterCookie: string | undefined): boolean {
  const key = process.env.AGROWTH_MASTER_KEY;
  return Boolean(key && masterCookie && masterCookie === key);
}

export function isClientAuthorized(
  client: string,
  cookieValue: string | undefined,
  masterCookie?: string | undefined
): boolean {
  if (isMasterAuthorized(masterCookie)) return true;
  const password = CLIENT_PASSWORDS[client];
  if (!password) return false;
  return cookieValue === password;
}
