# Velt Sample Apps (Monorepo)

Each demo lives under `apps/<category>/<demo-name>` and is self-contained.

## Quickstart
```bash
npm ci
npm run dev      # run all apps in parallel (if they expose dev)
npm run build    # build all apps
Structure
apps/reactflow/*

apps/tiptap/*

apps/codemirror/*

apps/misc/*

docs/ shared guidelines (no shared code)
