# Monorepo Structure: The 5-Level Ladder

This document explains the organizational structure of the sample-apps monorepo using the "Framework → Document → Type → Implementation → Library/Solution → Demo" ladder.

## The 5-Level Ladder

Every demo application in this monorepo is placed according to these five hierarchical levels:

```
Level 1: Framework         (react, vue, angular)
   ↓
Level 2: Document          (canvas, crdt, comments, recording)
   ↓
Level 3: Type              (text-editors, screen-recording, table)
   ↓
Level 4: Implementation    (libraries, custom-implementation)
   ↓
Level 5: Library/Solution  (reactflow, tiptap, basic, with-pip-mode)
   ↓
Level 6: Demo              (reactflow-master-app, tiptap-basic)
```

## Directory Pattern

```
apps/
  <framework>/
    <document>/
      <type>/
        libraries/
          <library-name>/
            <demo-name>/
        custom-implementation/
          <solution-name>/
            <demo-name>/
```

## Real Examples

### Example 1: ReactFlow Canvas Library Demo

**Path**: `apps/react/canvas/libraries/reactflow/reactflow-master-app/`

**Breakdown**:
- **Level 1 (Framework)**: `react` - Built with React
- **Level 2 (Document)**: `canvas` - Demonstrates canvas/whiteboard features
- **Level 3 (Type)**: Implicitly "general canvas" (can be explicit if needed)
- **Level 4 (Implementation)**: `libraries` - Uses a third-party library
- **Level 5 (Library)**: `reactflow` - Specifically uses ReactFlow
- **Level 6 (Demo)**: `reactflow-master-app` - The master demo application

**Package name**: `@apps/react-canvas-reactflow-reactflow-master-app`

### Example 2: TipTap Text Editor with CRDT

**Path**: `apps/react/crdt/text-editors/libraries/tiptap/tiptap-basic/`

**Breakdown**:
- **Level 1 (Framework)**: `react` - Built with React
- **Level 2 (Document)**: `crdt` - Demonstrates CRDT (Conflict-free Replicated Data Types)
- **Level 3 (Type)**: `text-editors` - Specifically for text editing
- **Level 4 (Implementation)**: `libraries` - Uses TipTap library
- **Level 5 (Library)**: `tiptap` - The TipTap editor library
- **Level 6 (Demo)**: `tiptap-basic` - A basic TipTap implementation

**Package name**: `@apps/react-crdt-tiptap-tiptap-basic`

### Example 3: Custom Screen Recording with PiP

**Path**: `apps/react/recording/screen-recording/custom-implementation/with-pip-mode/`

**Breakdown**:
- **Level 1 (Framework)**: `react` - Built with React
- **Level 2 (Document)**: `recording` - Demonstrates recording features
- **Level 3 (Type)**: `screen-recording` - Screen capture functionality
- **Level 4 (Implementation)**: `custom-implementation` - Custom-built solution
- **Level 5 (Solution)**: `with-pip-mode` - Includes Picture-in-Picture mode
- **Level 6 (Demo)**: Could be the app itself, or nested further if multiple demos

**Package name**: `@apps/react-recording-custom-with-pip-mode`

### Example 4: CodeMirror CRDT Text Editor

**Path**: `apps/react/crdt/text-editors/libraries/codemirror/codemirror-basic/`

**Breakdown**:
- **Level 1 (Framework)**: `react` - Built with React
- **Level 2 (Document)**: `crdt` - CRDT collaborative editing
- **Level 3 (Type)**: `text-editors` - Text editing functionality
- **Level 4 (Implementation)**: `libraries` - Uses CodeMirror library
- **Level 5 (Library)**: `codemirror` - The CodeMirror editor
- **Level 6 (Demo)**: `codemirror-basic` - Basic implementation

**Package name**: `@apps/react-crdt-codemirror-codemirror-basic`

### Example 5: AG-Grid Comments on Table

**Path**: `apps/react/comments/table/libraries/ag-grid/ag-grid-basic/`

**Breakdown**:
- **Level 1 (Framework)**: `react` - Built with React
- **Level 2 (Document)**: `comments` - Demonstrates commenting features
- **Level 3 (Type)**: `table` - On table/spreadsheet data
- **Level 4 (Implementation)**: `libraries` - Uses AG-Grid library
- **Level 5 (Library)**: `ag-grid` - The AG-Grid data grid
- **Level 6 (Demo)**: `ag-grid-basic` - Basic table with comments

**Package name**: `@apps/react-comments-ag-grid-ag-grid-basic`

## Decision Tree

Use this tree when deciding where to place a new demo:

```
1. What framework?
   └─→ react / vue / angular / ...

2. What document/feature area?
   └─→ canvas / crdt / comments / recording / ...

3. What type/subdomain?
   └─→ text-editors / screen-recording / table / ...

4. Library or custom?
   ├─→ libraries (using 3rd-party library)
   └─→ custom-implementation (custom-built)

5. Which library or solution?
   ├─→ [Library name]: reactflow / tiptap / codemirror / ag-grid / ...
   └─→ [Solution name]: basic / advanced / with-pip-mode / ...

6. Demo name
   └─→ Descriptive name for the specific demo
```

## Implementation Types

### Using `libraries/`

When your demo uses a well-known third-party library:

```
apps/react/crdt/text-editors/libraries/
  ├── tiptap/
  │   ├── tiptap-basic/
  │   └── tiptap-advanced/
  ├── codemirror/
  │   └── codemirror-basic/
  └── quill/
      └── quill-basic/
```

### Using `custom-implementation/`

When you build a custom solution without a major library:

```
apps/react/recording/screen-recording/custom-implementation/
  ├── basic/
  └── with-pip-mode/
```

## Package Naming Convention

Package names follow this pattern:

```
@apps/<framework>-<document>-<library-or-solution>-<demo>
```

Examples:
- `@apps/react-canvas-reactflow-reactflow-master-app`
- `@apps/react-crdt-tiptap-tiptap-basic`
- `@apps/react-recording-custom-with-pip-mode`
- `@apps/master-sample-app` (special case)

## Current Monorepo Structure

```
apps/
  master-sample-app/                          # Top-level demo aggregator
  react/
    canvas/
      libraries/
        reactflow/
          reactflow-master-app/               # Main ReactFlow demo
          reactflow-pipeline-demo/            # Pipeline-specific demo
          reactflow-presence-cursor/          # Presence/cursor demo
```

## When to Create New Levels

### Create a new **document** when:
- You're demonstrating a completely different feature area
- Examples: `canvas`, `crdt`, `comments`, `recording`, `notifications`

### Create a new **type** when:
- You're working within a document but targeting a specific subdomain
- Examples under CRDT: `text-editors`, `canvas`, `data-structures`

### Create a new **library/solution** when:
- You're using a different third-party library
- You're creating a distinct custom solution approach

### Create a new **demo** when:
- You want to show a different use case or configuration of the same library
- Examples: `basic`, `advanced`, `with-authentication`, `multi-user`

## Special Cases

### Top-Level Apps

The `master-sample-app` lives at the top level because it's an aggregator that showcases multiple demos. This is the only exception to the 5-level rule.

### Shared Packages

If you need shared utilities, create them under `packages/`:

```
packages/
  shared-utils/
  velt-helpers/
  common-types/
```

These follow standard package conventions and can be imported by any app.

## Adding Your First Demo

### Step 1: Identify Your Ladder Levels

Answer these questions:
1. Framework? (e.g., `react`)
2. Document/Feature? (e.g., `crdt`)
3. Type? (e.g., `text-editors`)
4. Library or Custom? (e.g., `libraries`)
5. Which Library/Solution? (e.g., `tiptap`)
6. Demo Name? (e.g., `tiptap-collaborative`)

### Step 2: Create the Path

```bash
cd apps
mkdir -p react/crdt/text-editors/libraries/tiptap/tiptap-collaborative
```

### Step 3: Initialize the App

```bash
cd react/crdt/text-editors/libraries/tiptap/tiptap-collaborative
npx create-next-app@latest . --typescript --tailwind
```

### Step 4: Update package.json

```json
{
  "name": "@apps/react-crdt-tiptap-tiptap-collaborative",
  "private": true,
  "version": "0.1.0"
}
```

### Step 5: Install from Root

```bash
cd /path/to/sample-apps
pnpm -w install
```

### Step 6: Test Build

```bash
pnpm -w build
```

## Summary

The 5-level ladder ensures:
- **Consistent organization** across all demos
- **Easy discovery** of related implementations
- **Clear separation** between libraries and custom solutions
- **Scalable structure** that grows with the project
- **Predictable paths** for tooling and CI/CD

When in doubt, look at existing examples and follow the pattern!

