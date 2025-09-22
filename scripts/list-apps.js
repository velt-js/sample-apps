const fs = require('fs');
const path = require('path');
const root = path.join(process.cwd(), 'apps');
const cats = fs.readdirSync(root).filter(x => fs.statSync(path.join(root, x)).isDirectory());
for (const c of cats) {
  const demos = fs.readdirSync(path.join(root, c)).filter(x => fs.statSync(path.join(root, c, x)).isDirectory());
  console.log(`\n${c}/`);
  for (const d of demos) console.log(`  - ${c}/${d}`);
}
