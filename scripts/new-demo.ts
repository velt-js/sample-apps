#!/usr/bin/env tsx

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

interface DemoOptions {
  framework: string;
  document: string;
  implementation: 'libraries' | 'custom-implementation';
  libraryOrSolution: string;
  demo: string;
}

function parseArgs(): DemoOptions | null {
  // Filter out the '--' separator that pnpm adds
  const args = process.argv.slice(2).filter(arg => arg !== '--');
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
  const { framework, document, implementation, libraryOrSolution, demo } = options;

  // Construct the full path
  const demoPath = join(
    process.cwd(),
    'apps',
    framework,
    document,
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
      clsx: '^2',
      'tailwind-merge': '^2',
    },
    devDependencies: {
      '@types/node': '^22',
      '@types/react': '^19',
      '@types/react-dom': '^19',
      autoprefixer: '^10',
      postcss: '^8',
      tailwindcss: '^3.4.0',
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
apps/${framework}/${document}/${implementation}/${libraryOrSolution}/${demo}/
\`\`\`

## Package Name

\`${packageName}\`

## Directory Structure

\`\`\`
${demo}/
├── app/
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page
├── components/
│   ├── header/             # Header components (Velt notifications, etc.)
│   │   └── header.tsx
│   ├── sidebar/            # Sidebar components
│   │   └── sidebar.tsx
│   └── document/           # Main document/canvas logic
│       └── document-canvas.tsx
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
│   └── utils.ts
├── public/                 # Static assets
├── styles/                 # Global styles
│   └── globals.css
├── .npmrc                  # pnpm config to prevent Tailwind v4 hoisting
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── components.json         # shadcn/ui configuration
└── package.json
\`\`\`

## Getting Started

### Install Dependencies

From the monorepo root:

\`\`\`bash
pnpm -w install
\`\`\`

### Run Development Server

\`\`\`bash
cd apps/${framework}/${document}/${implementation}/${libraryOrSolution}/${demo}
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
- **Implementation**: ${implementation}
- **Library/Solution**: ${libraryOrSolution}
- **Demo**: ${demo}

## Component Organization

- **\`components/header/\`** - Contains Velt components like notifications, presence indicators, header buttons
- **\`components/sidebar/\`** - Contains sidebar-related components
- **\`components/document/\`** - Contains the main application logic and ${libraryOrSolution} integration
- **\`hooks/\`** - Custom React hooks for state management and side effects
- **\`lib/\`** - Utility functions and helpers

## Important Configuration

### .npmrc File
This demo includes a \`.npmrc\` file that prevents pnpm from hoisting Tailwind CSS v4 from other workspace packages. This is necessary because:
- This demo uses Tailwind CSS v3.4.x with traditional PostCSS configuration
- Other apps in the monorepo may use Tailwind CSS v4
- Without the \`.npmrc\`, pnpm would hoist v4 and cause PostCSS errors

**Do not delete the \`.npmrc\` file** - it ensures the correct Tailwind version is used.

## Next Steps

1. Add your ${libraryOrSolution} implementation in \`components/document/\`
2. Add Velt collaboration features in \`components/header/\`
3. Update this README with specific usage instructions
4. Add the demo to \`master-sample-app\` if it should be showcased
5. Update deployment configs (Vercel, GitHub Actions) if needed

## Learn More

- [Monorepo Structure Guide](../../../../README_MONOREPO.md)
- [Structure Documentation](../../../../docs/structure.md)
- [Velt Documentation](https://docs.velt.dev)
`;

  console.log(`📝 Creating README.md`);
  writeFileSync(join(demoPath, 'README.md'), readme);

  // Create tsconfig.json
  const tsconfig = {
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

  // Create .npmrc to prevent Tailwind v4 hoisting from other workspace packages
  const npmrc = `public-hoist-pattern[]=*
public-hoist-pattern[]=!tailwindcss
shamefully-hoist=false
`;

  console.log(`📝 Creating .npmrc`);
  writeFileSync(join(demoPath, '.npmrc'), npmrc);

  // Create directory structure
  const appDir = join(demoPath, 'app');
  const componentsDir = join(demoPath, 'components');
  const headerDir = join(componentsDir, 'header');
  const sidebarDir = join(componentsDir, 'sidebar');
  const documentDir = join(componentsDir, 'document');
  const hooksDir = join(demoPath, 'hooks');
  const libDir = join(demoPath, 'lib');
  const publicDir = join(demoPath, 'public');
  const stylesDir = join(demoPath, 'styles');

  console.log(`📁 Creating directory structure...`);
  mkdirSync(appDir, { recursive: true });
  mkdirSync(headerDir, { recursive: true });
  mkdirSync(sidebarDir, { recursive: true });
  mkdirSync(documentDir, { recursive: true });
  mkdirSync(hooksDir, { recursive: true });
  mkdirSync(libDir, { recursive: true });
  mkdirSync(publicDir, { recursive: true });
  mkdirSync(stylesDir, { recursive: true });

  // Create app/layout.tsx
  const layout = `import type { Metadata } from 'next'
import '../styles/globals.css'

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
  const page = `import DocumentCanvas from '@/components/document/document-canvas'

export default function Home() {
  return (
    <main className="flex h-screen w-screen">
      <DocumentCanvas />
    </main>
  )
}
`;

  console.log(`📝 Creating app/page.tsx`);
  writeFileSync(join(appDir, 'page.tsx'), page);

  // Create components/header/header.tsx
  const header = `export default function Header() {
  return (
    <div className="flex items-center gap-2 p-2 border-b bg-background">
      <h1 className="text-lg font-semibold">${demo}</h1>
      {/* Add Velt components here: notifications, user presence, etc. */}
    </div>
  )
}
`;

  console.log(`📝 Creating components/header/header.tsx`);
  writeFileSync(join(headerDir, 'header.tsx'), header);

  // Create components/sidebar/sidebar.tsx
  const sidebar = `export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-background p-4">
      <h2 className="text-sm font-medium mb-4">Sidebar</h2>
      {/* Add sidebar content here */}
    </aside>
  )
}
`;

  console.log(`📝 Creating components/sidebar/sidebar.tsx`);
  writeFileSync(join(sidebarDir, 'sidebar.tsx'), sidebar);

  // Create components/document/document-canvas.tsx
  const documentCanvas = `'use client'

import Header from '@/components/header/header'
import Sidebar from '@/components/sidebar/sidebar'

export default function DocumentCanvas() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 p-4">
          <div className="w-full h-full border rounded-lg bg-card p-4">
            <h2 className="text-2xl font-bold mb-4">${demo}</h2>
            <p className="text-muted-foreground mb-2">
              <strong>Framework:</strong> ${framework}
            </p>
            <p className="text-muted-foreground mb-2">
              <strong>Document:</strong> ${document}
            </p>
            <p className="text-muted-foreground mb-2">
              <strong>Implementation:</strong> ${implementation}
            </p>
            <p className="text-muted-foreground mb-2">
              <strong>Library/Solution:</strong> ${libraryOrSolution}
            </p>
            <div className="mt-8 p-4 border rounded">
              <p>Start building your ${libraryOrSolution} integration here!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
`;

  console.log(`📝 Creating components/document/document-canvas.tsx`);
  writeFileSync(join(documentDir, 'document-canvas.tsx'), documentCanvas);

  // Create lib/utils.ts
  const libUtils = `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;

  console.log(`📝 Creating lib/utils.ts`);
  writeFileSync(join(libDir, 'utils.ts'), libUtils);

  // Create hooks/.gitkeep
  console.log(`📝 Creating hooks/.gitkeep`);
  writeFileSync(join(hooksDir, '.gitkeep'), '');

  // Create public/.gitkeep
  console.log(`📝 Creating public/.gitkeep`);
  writeFileSync(join(publicDir, '.gitkeep'), '');

  // Create styles/globals.css
  const globalsCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`;

  console.log(`📝 Creating styles/globals.css`);
  writeFileSync(join(stylesDir, 'globals.css'), globalsCss);

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
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
    },
  },
  plugins: [],
}
`;

  console.log(`📝 Creating tailwind.config.js`);
  writeFileSync(join(demoPath, 'tailwind.config.js'), tailwindConfig);

  // Create components.json (for shadcn/ui support)
  const componentsJson = {
    "$schema": "https://ui.shadcn.com/schema.json",
    "style": "default",
    "rsc": true,
    "tsx": true,
    "tailwind": {
      "config": "tailwind.config.js",
      "css": "styles/globals.css",
      "baseColor": "slate",
      "cssVariables": true,
      "prefix": ""
    },
    "aliases": {
      "components": "@/components",
      "utils": "@/lib/utils"
    }
  };

  console.log(`📝 Creating components.json`);
  writeFileSync(join(demoPath, 'components.json'), JSON.stringify(componentsJson, null, 2) + '\n');

  console.log('\n✅ Demo scaffolding complete!');
  console.log('\n📋 Next steps:');
  console.log(`   1. Add pnpm override to root package.json:`);
  console.log(`      "${packageName}>tailwindcss": "3.4.18"`);
  console.log(`   2. cd apps/${framework}/${document}/${implementation}/${libraryOrSolution}/${demo}`);
  console.log(`   3. pnpm -w install`);
  console.log(`   4. pnpm --filter ${packageName} dev`);
  console.log('\n⚠️  IMPORTANT: Add the pnpm override to prevent Tailwind v4 hoisting!');
  console.log('\n🎉 Happy coding!');
}

function printUsage(): void {
  console.log(`
Usage: pnpm new:demo -- [options]

Required Options:
  --framework <name>           Framework to use (e.g., react, vue, angular)
  --document <name>            Document/feature area (e.g., canvas, crdt, comments)
  --implementation <type>      Either "libraries" or "custom-implementation"
  --libraryOrSolution <name>   Library name (e.g., reactflow, tiptap) or solution name (e.g., basic)
  --demo <name>                Demo name (e.g., my-new-demo)

Example:
  pnpm new:demo -- \\
    --framework react \\
    --document canvas \\
    --implementation libraries \\
    --libraryOrSolution reactflow \\
    --demo my-reactflow-demo

This will create:
  apps/react/canvas/libraries/reactflow/my-reactflow-demo/

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

