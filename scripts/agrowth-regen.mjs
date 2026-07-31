// Regenera app/agrowth/body-html.ts a partir de app/agrowth/body-source.html.
// body-source.html es la fuente de verdad editable de la landing A+ Growth;
// body-html.ts es solo el módulo generado que consume AGrowthHome.tsx.
//   node scripts/agrowth-regen.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const srcPath = path.join(root, 'app/agrowth/body-source.html');
const outPath = path.join(root, 'app/agrowth/body-html.ts');

const html = fs.readFileSync(srcPath, 'utf8');
const out = `// Auto-generado desde app/agrowth/body-source.html (incluye los <script> inline).
// NO editar a mano: editar body-source.html y correr \`node scripts/agrowth-regen.mjs\`.
const bodyHtml: string = ${JSON.stringify(html)};
export default bodyHtml;
`;
fs.writeFileSync(outPath, out);
console.log(`regenerated ${path.relative(root, outPath)} (${html.length} chars)`);
