#!/usr/bin/env node

/**
 * Script to add vercel.json with turbo-ignore to all apps
 *
 * Usage:
 *   node scripts/add-vercel-config.js
 *   node scripts/add-vercel-config.js --dry-run
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const APPS_DIR = path.join(ROOT_DIR, 'apps');

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');

const VERCEL_CONFIG = {
  buildCommand: "pnpm run build",
  installCommand: "pnpm install",
  ignoreCommand: "npx turbo-ignore",
  framework: "nextjs"
};

function findAppDirs(dir, apps = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  // Check if this directory has a package.json (is an app)
  const hasPackageJson = entries.some(e => e.name === 'package.json');

  if (hasPackageJson) {
    // Skip if it's in node_modules or .next
    const relativePath = path.relative(APPS_DIR, dir);
    if (!relativePath.includes('node_modules') && !relativePath.includes('.next')) {
      apps.push(dir);
    }
  }

  // Recurse into subdirectories
  for (const entry of entries) {
    if (entry.isDirectory() &&
        entry.name !== 'node_modules' &&
        entry.name !== '.next' &&
        entry.name !== '.turbo') {
      findAppDirs(path.join(dir, entry.name), apps);
    }
  }

  return apps;
}

function main() {
  console.log('Vercel Config Updater');
  console.log('=====================');
  console.log(isDryRun ? 'Mode: DRY RUN\n' : 'Mode: UPDATE\n');

  const appDirs = findAppDirs(APPS_DIR);

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const appDir of appDirs) {
    const vercelJsonPath = path.join(appDir, 'vercel.json');
    const relativePath = path.relative(ROOT_DIR, appDir);

    if (fs.existsSync(vercelJsonPath)) {
      // Check if it needs updating
      const existing = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));

      if (existing.ignoreCommand === VERCEL_CONFIG.ignoreCommand) {
        console.log(`[SKIP] ${relativePath}/vercel.json (already configured)`);
        skipped++;
        continue;
      }

      // Update existing config
      const merged = { ...existing, ...VERCEL_CONFIG };
      console.log(`[UPDATE] ${relativePath}/vercel.json`);

      if (!isDryRun) {
        fs.writeFileSync(vercelJsonPath, JSON.stringify(merged, null, 2) + '\n');
      }
      updated++;
    } else {
      // Create new config
      console.log(`[CREATE] ${relativePath}/vercel.json`);

      if (!isDryRun) {
        fs.writeFileSync(vercelJsonPath, JSON.stringify(VERCEL_CONFIG, null, 2) + '\n');
      }
      created++;
    }
  }

  console.log(`\nSummary:`);
  console.log(`  Created: ${created}`);
  console.log(`  Updated: ${updated}`);
  console.log(`  Skipped: ${skipped}`);
  console.log(`  Total apps: ${appDirs.length}`);
}

main();
