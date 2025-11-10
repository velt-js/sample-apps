# Velt Sample Apps (Monorepo)

A structured monorepo showcasing Velt Collaboration SDK integrations across different frameworks, libraries, and use cases. Each demo is **self-contained** and follows a consistent 4-level directory hierarchy.

---

## 🏗️ Structure

This monorepo follows a strict **4-level hierarchy** for organization and discoverability:

```
apps/
  <framework>/          # Level 1: Framework (react, vue, angular)
    <document>/         # Level 2: Feature/Document (canvas, crdt, comments, recording)
      <implementation>/ # Level 3: libraries or custom-implementation
        <library>/      # Level 4: Library name (reactflow, tiptap) or solution name
          <demo>/       # Individual demo applications
```

### Current Apps

```
apps/
  master-sample-app/                      # Top-level demo aggregator
  react/
    canvas/
      libraries/
        reactflow/
          reactflow-master-app/           # ReactFlow master demo
          reactflow-pipeline-demo/        # ReactFlow pipeline demo
          reactflow-presence-cursor/      # ReactFlow presence/cursor demo
```

**📚 For detailed structure documentation, see:**
- [`README_MONOREPO.md`](./README_MONOREPO.md) - Complete structure guide and conventions
- [`docs/structure.md`](./docs/structure.md) - 4-level hierarchy with examples

---

## 🚀 Quickstart

### Prerequisites
- Node.js 20+ recommended
- pnpm (installed automatically via Corepack)

### Install & Run

```bash
# Install all dependencies
pnpm -w install

# Run all apps in dev mode (parallel)
pnpm -w dev

# Build all apps
pnpm -w build

# Lint all apps
pnpm -w lint
```

---

## 📋 Common Commands

### List all available demos

```bash
pnpm run list
```

### Run a specific app

```bash
# Using the scoped package name
pnpm --filter @apps/react-canvas-reactflow-reactflow-master-app dev

# Or navigate to the app directory
cd apps/react/canvas/libraries/reactflow/reactflow-master-app
pnpm dev
```

### Build a specific app

```bash
pnpm --filter @apps/react-canvas-reactflow-reactflow-master-app build
```

### Lint a specific app

```bash
pnpm --filter @apps/react-canvas-reactflow-reactflow-master-app lint
```

---

## ➕ Adding a New Demo

### Using the Scaffolding Tool (Recommended)

The easiest way to add a new demo:

```bash
pnpm new:demo -- \
  --framework react \
  --feature CRDT \
  --document dashboard \
  --library reactflow \
  --demo my-new-demo
```

This creates:
- Complete directory structure following the 4-level hierarchy
- Basic Next.js app with TypeScript and Tailwind
- Properly scoped package.json with correct naming
- README.md template
- All necessary config files

### Manual Creation

If you prefer to create a demo manually:

```bash
# 1. Create the directory following the 4-level structure
mkdir -p apps/react/canvas/libraries/reactflow/my-demo
cd apps/react/canvas/libraries/reactflow/my-demo

# 2. Initialize your app (Next.js example)
npx create-next-app@latest . --typescript --tailwind --app

# 3. Update package.json with scoped name
# Edit package.json: "name": "@apps/react-canvas-reactflow-my-demo"

# 4. Install from root
cd ../../../../..
pnpm -w install

# 5. Test the build
pnpm --filter @apps/react-canvas-reactflow-my-demo build
```

**📖 For detailed instructions, see [`README_MONOREPO.md`](./README_MONOREPO.md#how-to-add-a-new-demo)**

---

## 🗂️ Understanding the 4-Level Hierarchy

### The Levels

1. **Framework** - The frontend framework (react, vue, angular)
2. **Document** - The feature area (canvas, crdt, comments, recording)
3. **Implementation** - Either `libraries` or `custom-implementation`
4. **Library/Solution** - Library name (reactflow, tiptap) or custom solution name

### Examples

**ReactFlow Canvas Demo:**
```
apps/react/canvas/libraries/reactflow/reactflow-master-app/
     └──┬─ └───┬── └───┬──── └────┬───── └────────┬──────
        │      │        │          │                │
   Framework Document Impl.     Library           Demo
```

**TipTap CRDT Editor (Conceptual):**
```
apps/react/crdt/libraries/tiptap/tiptap-basic/
```

**Custom Recording (Conceptual):**
```
apps/react/recording/custom-implementation/basic/screen-recording-demo/
```

---

## 🔧 Environment Variables

Some apps require environment variables. Create a `.env.local` file in the specific app directory:

```bash
# Example: apps/react/canvas/libraries/reactflow/reactflow-master-app/.env.local
NEXT_PUBLIC_VELT_API_KEY=your_velt_api_key
VELT_AUTH_TOKEN=your_velt_auth_token
```

See each app's README for specific environment variable requirements.

---

## 🎨 Velt Collaboration SDK

With Velt SDK you can add powerful collaboration features to your product extremely fast. The SDK provides fullstack components that are fully customizable and backed by a fully‑managed, scalable realtime backend.

### Key Features

- **Comments** - Like Figma, Frame.io, Google Docs, Sheets and more
- **Recording** - Like Loom (audio, video, screen)
- **Huddle** - Like Slack (audio, video, screensharing)
- **Notifications** - In‑app and off‑app notifications
- **Mentions & Assignment** - @mentions and task assignment
- **Presence & Cursors** - Live presence, cursors, and selection
- **Live State Sync** - Single Editor mode with state synchronization
- **Multiplayer Editing** - With conflict resolution via CRDTs
- **Follow Mode** - Like Figma's follow feature
- **…and much more**

### Installation

```bash
npm install @veltdev/client
# or
pnpm add @veltdev/client
```

### Documentation & Resources

- **Docs:** https://docs.velt.dev
- **NPM:** https://www.npmjs.com/package/@veltdev/client
- **Security:** SOC2 Type 2 and HIPAA compliant

### Community

- **X (Twitter):** Updates, announcements, and tips
- **Discord:** Ask questions and share insights

---

## 📦 Package Naming Convention

All apps use scoped package names following this pattern:

```
@apps/<framework>-<document>-<library-or-solution>-<demo>
```

**Examples:**
- `@apps/master-sample-app` (special case)
- `@apps/react-canvas-reactflow-reactflow-master-app`
- `@apps/react-canvas-reactflow-reactflow-pipeline-demo`
- `@apps/react-canvas-reactflow-reactflow-presence-cursor`

---

## 🛠️ Workspace Configuration

### pnpm Workspaces

The monorepo uses pnpm workspaces with glob patterns supporting the 4-level structure:

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "apps/*/*"
  - "apps/*/*/*"
  - "apps/*/*/*/*"
  - "packages/*"
```

### Turbo Configuration

Turbo orchestrates builds, dev servers, and linting across all apps:

```json
{
  "tasks": {
    "build": { "outputs": [".next/**", "dist/**", "build/**"] },
    "dev": { "cache": false },
    "lint": { "cache": false }
  }
}
```

---

## 📝 Conventions

### Do's ✅

- Follow the exact 4-level hierarchy for all new demos
- Use kebab-case for all directory and demo names
- Name packages with scoped convention: `@apps/<framework>-<document>-<library>-<demo>`
- Include standard scripts in every app: `dev`, `build`, `lint`
- Test builds before committing: `pnpm -w build`
- Update documentation when adding new demos

### Don'ts ❌

- Don't create custom directory structures outside the 4-level schema
- Don't place apps directly under `apps/` (except `master-sample-app`)
- Don't skip levels in the hierarchy
- Don't use camelCase or PascalCase for directory names
- Don't create shared packages (keep apps independent)
- Don't modify app logic when restructuring (only paths/configs)

---

## 🔄 Migration & History

### Bringing in Existing Repos

**Fast (no history):**
```bash
mkdir -p apps/react/<document>/<implementation>/<library>/<demo>
rsync -a ../existing-repo/ apps/react/.../demo/ --exclude .git
pnpm -w install
git add -A
git commit -m "chore: add <demo> demo"
```

**With history (git subtree):**
```bash
git remote add <shortname> git@github.com:org/<repo>.git
git fetch <shortname>
git subtree add --prefix=apps/react/.../demo <shortname> main --squash
```

---

## 📚 Additional Resources

- **Monorepo Structure Guide:** [`README_MONOREPO.md`](./README_MONOREPO.md)
- **Structure Examples:** [`docs/structure.md`](./docs/structure.md)
- **Scaffolding Tool:** [`scripts/new-demo.ts`](./scripts/new-demo.ts)
- **PR Template:** [`.github/PULL_REQUEST_TEMPLATE.md`](./.github/PULL_REQUEST_TEMPLATE.md)

---

## 🤝 Contributing

When adding a new demo:

1. Use `pnpm new:demo` to scaffold the structure
2. Follow the 4-level hierarchy strictly
3. Use the scoped package naming convention
4. Include comprehensive README in your demo
5. Test builds: `pnpm -w build`
6. Update master-sample-app if your demo should be showcased
7. Create a PR using the provided template

---

## 📄 License

ISC

---

## 🏷️ Keywords

react, velt, real-time, realtime, toolkit, multiplayer, websockets, collaboration, collaborative, presence, synchronize, rooms, documents, conflict resolution, huddle, crdts, comment, comments, recording, video call, audio call, screen recording, webrtc, cursors, notifications, cord, liveblocks, reactflow, tiptap, codemirror, monorepo, pnpm, turbo
