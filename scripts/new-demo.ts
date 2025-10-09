#!/usr/bin/env tsx

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

interface DemoOptions {
  framework: string;
  document: string;
  type: string;
  implementation: 'libraries' | 'custom-implementation';
  libraryOrSolution: string;
  demo: string;
}

function parseArgs(): DemoOptions | null {
  const args = process.argv.slice(2);
  const options: Partial<DemoOptions> = {};

  for (let i = 0; i < args.length; i += 2) {
    const flag = args[i];
    const value = args[i + 1];

    switch (flag) {
      case '--framework':
        options.framework = value;
        break;
      case '--document':
        options.document = value;
        break;
      case '--type':
        options.type = value;
        break;
      case '--implementation':
        if (value !== 'libraries' && value !== 'custom-implementation') {
          console.error('❌ --implementation must be "libraries" or "custom-implementation"');
          return null;
        }
        options.implementation = value;
        break;
      case '--libraryOrSolution':
        options.libraryOrSolution = value;
        break;
      case '--demo':
        options.demo = value;
        break;
      default:
        console.error(`❌ Unknown flag: ${flag}`);
        return null;
    }
  }

  const required: (keyof DemoOptions)[] = [
    'framework',
    'document',
    'type',
    'implementation',
    'libraryOrSolution',
    'demo',
  ];

  for (const key of required) {
    if (!options[key]) {
      console.error(`❌ Missing required flag: --${key}`);
      return null;
    }
  }

  return options as DemoOptions;
}

function createDemoStructure(options: DemoOptions): void {
  const { framework, document, type, implementation, libraryOrSolution, demo } = options;

  // Construct the full path
  const demoPath = join(
    process.cwd(),
    'apps',
    framework,
    document,
    type,
    implementation,
    libraryOrSolution,
    demo
  );

  // Check if directory already exists
  if (existsSync(demoPath)) {
    console.error(`❌ Directory already exists: ${demoPath}`);
    process.exit(1);
  }

  // Create the directory structure
  console.log(`📁 Creating directory: ${demoPath}`);
  mkdirSync(demoPath, { recursive: true });

  // Generate package name
  const packageName = `@apps/${framework}-${document}-${libraryOrSolution}-${demo}`;

  // Create package.json
  const packageJson = {
    name: packageName,
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint',
    },
    dependencies: {
      next: '^15',
      react: '^19',
      'react-dom': '^19',
    },
    devDependencies: {
      '@types/node': '^22',
      '@types/react': '^19',
      '@types/react-dom': '^19',
      autoprefixer: '^10',
      postcss: '^8',
      tailwindcss: '^4',
      typescript: '^5',
    },
  };

  console.log(`📝 Creating package.json`);
  writeFileSync(
    join(demoPath, 'package.json'),
    JSON.stringify(packageJson, null, 2) + '\n'
  );

  // Create README.md
  const implType = implementation === 'libraries' ? 'Library' : 'Custom Implementation';
  const readme = `# ${demo}

## Overview

This demo showcases **${libraryOrSolution}** (${implType}) for **${document}** in **${framework}**.

## Path

\`\`\`
apps/${framework}/${document}/${type}/${implementation}/${libraryOrSolution}/${demo}/
\`\`\`

## Package Name

\`${packageName}\`

## Getting Started

### Install Dependencies

From the monorepo root:

\`\`\`bash
pnpm -w install
\`\`\`

### Run Development Server

\`\`\`bash
cd apps/${framework}/${document}/${type}/${implementation}/${libraryOrSolution}/${demo}
pnpm dev
\`\`\`

Or from the root:

\`\`\`bash
pnpm --filter ${packageName} dev
\`\`\`

### Build for Production

\`\`\`bash
pnpm --filter ${packageName} build
\`\`\`

## Structure

- **Framework**: ${framework}
- **Document**: ${document}
- **Type**: ${type}
- **Implementation**: ${implementation}
- **Library/Solution**: ${libraryOrSolution}
- **Demo**: ${demo}

## Next Steps

1. Add your implementation code
2. Update this README with specific usage instructions
3. Add the demo to \`master-sample-app\` if it should be showcased
4. Update deployment configs (Vercel, GitHub Actions) if needed

## Learn More

- [Monorepo Structure Guide](../../../../../README_MONOREPO.md)
- [Structure Documentation](../../../../../docs/structure.md)
`;

  console.log(`📝 Creating README.md`);
  writeFileSync(join(demoPath, 'README.md'), readme);

  // Create tsconfig.json
  const tsconfig = {
    extends: '../../../../../tsconfig.base.json',
    compilerOptions: {
      lib: ['dom', 'dom.iterable', 'esnext'],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: 'esnext',
      moduleResolution: 'bundler',
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: 'preserve',
      incremental: true,
      plugins: [
        {
          name: 'next',
        },
      ],
      paths: {
        '@/*': ['./*'],
      },
    },
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
    exclude: ['node_modules'],
  };

  console.log(`📝 Creating tsconfig.json`);
  writeFileSync(join(demoPath, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2) + '\n');

  // Create .gitignore
  const gitignore = `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
`;

  console.log(`📝 Creating .gitignore`);
  writeFileSync(join(demoPath, '.gitignore'), gitignore);

  // Create basic Next.js app structure
  const appDir = join(demoPath, 'app');
  mkdirSync(appDir, { recursive: true });

  // Create app/layout.tsx
  const layout = `import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '${demo}',
  description: '${implType} demo for ${libraryOrSolution}',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
`;

  console.log(`📝 Creating app/layout.tsx`);
  writeFileSync(join(appDir, 'layout.tsx'), layout);

  // Create app/page.tsx
  const page = `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold mb-4">
          ${demo}
        </h1>
        <p className="text-lg mb-2">
          <strong>Framework:</strong> ${framework}
        </p>
        <p className="text-lg mb-2">
          <strong>Document:</strong> ${document}
        </p>
        <p className="text-lg mb-2">
          <strong>Type:</strong> ${type}
        </p>
        <p className="text-lg mb-2">
          <strong>Implementation:</strong> ${implementation}
        </p>
        <p className="text-lg mb-2">
          <strong>Library/Solution:</strong> ${libraryOrSolution}
        </p>
        <div className="mt-8 p-4 border rounded">
          <p>Start building your demo here!</p>
        </div>
      </div>
    </main>
  )
}
`;

  console.log(`📝 Creating app/page.tsx`);
  writeFileSync(join(appDir, 'page.tsx'), page);

  // Create app/globals.css
  const globalsCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}
`;

  console.log(`📝 Creating app/globals.css`);
  writeFileSync(join(appDir, 'globals.css'), globalsCss);

  // Create next.config.js
  const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
`;

  console.log(`📝 Creating next.config.js`);
  writeFileSync(join(demoPath, 'next.config.js'), nextConfig);

  // Create postcss.config.js
  const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;

  console.log(`📝 Creating postcss.config.js`);
  writeFileSync(join(demoPath, 'postcss.config.js'), postcssConfig);

  // Create tailwind.config.js
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;

  console.log(`📝 Creating tailwind.config.js`);
  writeFileSync(join(demoPath, 'tailwind.config.js'), tailwindConfig);

  console.log('\n✅ Demo scaffolding complete!');
  console.log('\n📋 Next steps:');
  console.log(`   1. cd apps/${framework}/${document}/${type}/${implementation}/${libraryOrSolution}/${demo}`);
  console.log(`   2. pnpm -w install`);
  console.log(`   3. pnpm --filter ${packageName} dev`);
  console.log('\n🎉 Happy coding!');
}

function printUsage(): void {
  console.log(`
Usage: pnpm new:demo -- [options]

Required Options:
  --framework <name>           Framework to use (e.g., react, vue, angular)
  --document <name>            Document/feature area (e.g., canvas, crdt, comments)
  --type <name>                Type/subdomain (e.g., text-editors, screen-recording)
  --implementation <type>      Either "libraries" or "custom-implementation"
  --libraryOrSolution <name>   Library name (e.g., reactflow, tiptap) or solution name (e.g., basic)
  --demo <name>                Demo name (e.g., my-new-demo)

Example:
  pnpm new:demo -- \\
    --framework react \\
    --document canvas \\
    --type general \\
    --implementation libraries \\
    --libraryOrSolution reactflow \\
    --demo my-reactflow-demo

This will create:
  apps/react/canvas/general/libraries/reactflow/my-reactflow-demo/

With package name:
  @apps/react-canvas-reactflow-my-reactflow-demo
`);
}

// Main execution
const options = parseArgs();

if (!options) {
  printUsage();
  process.exit(1);
}

createDemoStructure(options);

