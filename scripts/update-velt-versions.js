#!/usr/bin/env node

/**
 * Script to update all Velt package versions across the monorepo
 *
 * Usage:
 *   node scripts/update-velt-versions.js
 *   node scripts/update-velt-versions.js --dry-run
 *   node scripts/update-velt-versions.js --check  # Exit with error if versions are out of sync
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const VERSIONS_FILE = path.join(ROOT_DIR, 'velt-versions.json');
const APPS_DIR = path.join(ROOT_DIR, 'apps');

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isCheck = args.includes('--check');

function loadVersionsConfig() {
  if (!fs.existsSync(VERSIONS_FILE)) {
    console.error(`Error: ${VERSIONS_FILE} not found`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(VERSIONS_FILE, 'utf8'));
}

function findPackageJsonFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // Skip node_modules and .next directories
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.turbo') {
        continue;
      }
      findPackageJsonFiles(fullPath, files);
    } else if (entry.name === 'package.json') {
      files.push(fullPath);
    }
  }

  return files;
}

function updatePackageJson(filePath, versions, stats) {
  const content = fs.readFileSync(filePath, 'utf8');
  const pkg = JSON.parse(content);
  let modified = false;
  const changes = [];

  const updateDeps = (deps, depType) => {
    if (!deps) return;

    for (const [name, targetVersion] of Object.entries(versions)) {
      if (deps[name] && deps[name] !== targetVersion) {
        changes.push({
          package: name,
          from: deps[name],
          to: targetVersion,
          type: depType
        });
        deps[name] = targetVersion;
        modified = true;
      }
    }
  };

  updateDeps(pkg.dependencies, 'dependencies');
  updateDeps(pkg.devDependencies, 'devDependencies');
  updateDeps(pkg.peerDependencies, 'peerDependencies');

  if (modified) {
    const relativePath = path.relative(ROOT_DIR, filePath);
    stats.filesModified.push(relativePath);
    stats.changes.push({ file: relativePath, changes });

    if (!isDryRun && !isCheck) {
      // Preserve original formatting (2 spaces indent)
      fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2) + '\n');
    }
  }

  return modified;
}

function updateRootOverrides(versions, stats) {
  const rootPkgPath = path.join(ROOT_DIR, 'package.json');
  const content = fs.readFileSync(rootPkgPath, 'utf8');
  const pkg = JSON.parse(content);
  let modified = false;
  const changes = [];

  if (pkg.overrides) {
    for (const [name, targetVersion] of Object.entries(versions)) {
      if (pkg.overrides[name] && pkg.overrides[name] !== targetVersion) {
        changes.push({
          package: name,
          from: pkg.overrides[name],
          to: targetVersion,
          type: 'overrides'
        });
        pkg.overrides[name] = targetVersion;
        modified = true;
      }
    }
  }

  if (modified) {
    stats.filesModified.push('package.json');
    stats.changes.push({ file: 'package.json', changes });

    if (!isDryRun && !isCheck) {
      fs.writeFileSync(rootPkgPath, JSON.stringify(pkg, null, 2) + '\n');
    }
  }

  return modified;
}

function main() {
  console.log('Velt Version Updater');
  console.log('====================');

  if (isDryRun) {
    console.log('Mode: DRY RUN (no files will be modified)\n');
  } else if (isCheck) {
    console.log('Mode: CHECK (will exit with error if versions are out of sync)\n');
  } else {
    console.log('Mode: UPDATE (files will be modified)\n');
  }

  const config = loadVersionsConfig();
  const versions = config.versions;

  console.log('Target versions:');
  for (const [pkg, version] of Object.entries(versions)) {
    console.log(`  ${pkg}: ${version}`);
  }
  console.log('');

  const stats = {
    filesScanned: 0,
    filesModified: [],
    changes: []
  };

  // Update root package.json overrides
  updateRootOverrides(versions, stats);

  // Find and update all package.json files in apps/
  const packageFiles = findPackageJsonFiles(APPS_DIR);
  stats.filesScanned = packageFiles.length;

  for (const file of packageFiles) {
    updatePackageJson(file, versions, stats);
  }

  // Print results
  console.log(`Files scanned: ${stats.filesScanned}`);
  console.log(`Files ${isDryRun || isCheck ? 'would be ' : ''}modified: ${stats.filesModified.length}`);

  if (stats.changes.length > 0) {
    console.log('\nChanges:');
    for (const { file, changes } of stats.changes) {
      console.log(`\n  ${file}:`);
      for (const change of changes) {
        console.log(`    ${change.package}: ${change.from} -> ${change.to}`);
      }
    }
  }

  if (isCheck && stats.filesModified.length > 0) {
    console.log('\nError: Velt versions are out of sync. Run "node scripts/update-velt-versions.js" to update.');
    process.exit(1);
  }

  if (!isDryRun && !isCheck && stats.filesModified.length > 0) {
    console.log('\nDone! Run "pnpm install" to update the lockfile.');
  }
}

main();
