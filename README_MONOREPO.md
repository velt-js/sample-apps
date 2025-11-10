# Monorepo Structure Guide

This monorepo follows a strict 5-level directory schema to organize demo applications and sample implementations.

## Directory Schema

All applications are organized under `apps/` using the following hierarchy:

```
apps/
  <framework>/              # Level 1: Framework (e.g., react, vue, angular)
    <document>/             # Level 2: Document/Feature area (e.g., comments, canvas, crdt)
      <type>/               # Level 3: Subdomain/Type (e.g., text-editors, screen-recording)
        <implementation>/   # Level 4: Implementation approach
          <library-or-solution>/  # Level 5: Specific library or custom solution
            <demo>/         # Level 6: Individual demo apps
```

### The 5 Levels Explained

1. **Framework**: The frontend framework being used (e.g., `react`, `vue`, `angular`)
2. **Document**: The high-level feature or document type (e.g., `comments`, `canvas`, `crdt`, `recording`)
3. **Type**: The specific subdomain or type within the document (e.g., `text-editors`, `screen-recording`)
4. **Implementation**: Either `libraries` (using third-party libraries) or `custom-implementation` (custom builds)
5. **Library or Solution**: 
   - For `libraries`: The specific library name (e.g., `reactflow`, `tiptap`, `codemirror`)
   - For `custom-implementation`: The solution name (e.g., `basic`, `with-pip-mode`)
6. **Demo**: The individual demo application folder

## Current Structure

```
apps/
  master-sample-app/                                    # Top-level aggregator (special case)
  react/                                                # Framework
    canvas/                                             # Document
      libraries/                                        # Implementation style
        reactflow/                                      # Library
          reactflow-master-app/                         # Demo
          reactflow-pipeline-demo/                      # Demo
          reactflow-presence-cursor/                    # Demo
```

## Examples by Use Case

### ReactFlow Canvas Library
```
apps/react/canvas/libraries/reactflow/reactflow-master-app/
```
- **Framework**: React
- **Document**: Canvas (working with canvas-based documents)
- **Type**: Implicitly general canvas manipulation
- **Implementation**: `libraries` (using ReactFlow library)
- **Library**: `reactflow`
- **Demo**: `reactflow-master-app`

### TipTap Text Editor (Conceptual)
```
apps/react/crdt/text-editors/libraries/tiptap/tiptap-basic/
```
- **Framework**: React
- **Document**: CRDT (collaborative real-time data types)
- **Type**: `text-editors`
- **Implementation**: `libraries` (using TipTap)
- **Library**: `tiptap`
- **Demo**: `tiptap-basic`

### Custom Screen Recording (Conceptual)
```
apps/react/recording/screen-recording/custom-implementation/with-pip-mode/
```
- **Framework**: React
- **Document**: Recording
- **Type**: `screen-recording`
- **Implementation**: `custom-implementation`
- **Solution**: `with-pip-mode`

## How to Add a New Demo

### Using the Scaffolding Tool

The easiest way to create a new demo is using the scaffolding tool:

```bash
pnpm new:demo -- \
  --framework react \
  --document canvas \
  --type general \
  --implementation libraries \
  --libraryOrSolution reactflow \
  --demo my-new-demo
```

This will:
1. Create the directory structure
2. Initialize a basic Next.js app
3. Set up the package.json with the correct scoped name
4. Create a README.md template

### Manual Creation Checklist

If you prefer to create a demo manually, follow these steps:

1. **Create the directory** following the 5-level schema:
   ```bash
   mkdir -p apps/<framework>/<document>/<type>/<implementation>/<library-or-solution>/<demo>
   ```

2. **Initialize the demo app** (for Next.js):
   ```bash
   cd apps/<framework>/<document>/<type>/<implementation>/<library-or-solution>/<demo>
   npx create-next-app@latest . --typescript --tailwind --app --no-src-dir
   ```

3. **Update package.json** with a scoped name:
   ```json
   {
     "name": "@apps/<framework>-<document>-<library-or-solution>-<demo>",
     "private": true
   }
   ```

4. **Run install** from the root:
   ```bash
   pnpm install
   ```

5. **Test the build**:
   ```bash
   pnpm build
   ```

6. **Update master-sample-app** (if applicable):
   - Add the demo to `apps/master-sample-app/samples/`
   - Update iframe URLs or local references

7. **Update CI/CD configs** (if deploying):
   - Add Vercel project configuration
   - Update GitHub Actions workflows with the new path

## Workspace Configuration

### pnpm-workspace.yaml
```yaml
packages:
  - "apps/*"
  - "apps/*/*"
  - "apps/*/*/*"
  - "apps/*/*/*/*"
  - "apps/*/*/*/*/*"
  - "packages/*"
```

### Root Scripts
```bash
# Run all dev servers in parallel
pnpm dev

# Build all apps
pnpm build

# Run linter across all apps
pnpm lint
```

## Path Aliases

The monorepo provides TypeScript path aliases in `tsconfig.base.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@apps/*": ["apps/*"],
      "@react/*": ["apps/react/*"],
      "@lib/*": ["apps/react/*/*/*/libraries/*"],
      "@custom/*": ["apps/react/*/*/*/custom-implementation/*"]
    }
  }
}
```

Apps should extend this base config in their own `tsconfig.json`.

## Guidelines

### DO:
- ✅ Follow the exact 5-level hierarchy
- ✅ Use kebab-case for all directory names
- ✅ Keep demos focused on a single feature or use case
- ✅ Update configs when adding new apps
- ✅ Test builds before committing

### DON'T:
- ❌ Create custom directory structures outside the schema
- ❌ Place apps directly under `apps/` (except `master-sample-app`)
- ❌ Skip levels in the hierarchy
- ❌ Use camelCase or PascalCase for directory names
- ❌ Modify app logic when restructuring (only paths/configs)

## Rationale

This structure provides:

1. **Discoverability**: Easy to find demos by framework, feature, and library
2. **Scalability**: Clear place for new demos without conflicts
3. **Consistency**: Every demo follows the same organizational pattern
4. **Tooling**: Path aliases and workspace globs work predictably
5. **CI/CD**: Deployment configs can target specific paths reliably

## See Also

- [`docs/structure.md`](./docs/structure.md) - Detailed structure with examples
- [`scripts/new-demo.ts`](./scripts/new-demo.ts) - Scaffolding tool source
- [`.github/PULL_REQUEST_TEMPLATE.md`](./.github/PULL_REQUEST_TEMPLATE.md) - PR template

