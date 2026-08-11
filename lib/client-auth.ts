// Claves de acceso de los espacios de clientes (/clients/*).
// Alta de cliente: agregar acá + su <cliente>-login.html en public/clients/.
export const CLIENT_PASSWORDS: Record<string, string> = {
  'urban-usa': 'URBAN2226',
};

export function isClientAuthorized(client: string, cookieValue: string | undefined): boolean {
  const password = CLIENT_PASSWORDS[client];
  if (!password) return false;
  return cookieValue === password;
}
