import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const src = resolve(root, 'node_modules/@pdftron/webviewer/public');
const destDir = resolve(root, 'public/lib/webviewer');

if (!existsSync(src)) {
  console.warn(
    '[copy-webviewer-assets] @pdftron/webviewer not installed yet — skipping.',
  );
  process.exit(0);
}

rmSync(destDir, { recursive: true, force: true });
mkdirSync(destDir, { recursive: true });

for (const folder of ['core', 'ui']) {
  const from = resolve(src, folder);
  const to = resolve(destDir, folder);
  if (!existsSync(from)) {
    console.warn(`[copy-webviewer-assets] missing ${from} — skipping.`);
    continue;
  }
  cpSync(from, to, { recursive: true });
  console.log(`[copy-webviewer-assets] copied ${folder} -> ${to}`);
}
