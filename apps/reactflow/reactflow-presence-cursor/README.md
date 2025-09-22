## React Flow + Velt (Presence & CRDT) Demo

Collaborative React Flow canvas with Velt presence, live cursors, and CRDT-backed multiplayer. Includes a demo login pill, toolbar actions, and a sidebar for tools and node types.

### Key Features
- Velt integration
  - `VeltProvider` wrapping the app
  - `VeltCollaboration` mounting `VeltInitializeUser` + `VeltInitializeDocument`
  - `VeltCursor` for live pointers
- React Flow (multiplayer)
  - CRDT store via `@veltdev/reactflow-crdt` (`veltReactFlowStore`)
  - Local persistence per document id
  - DnD to add nodes, selection, copy/delete, add-node to selection
- Auth/login UX
  - Login pill rendered in the Toolbar (theme-aware, non-resizing)
  - Default state is logged out; select a demo user to log in
- Sidebar tools and node types
  - Select/Add/Copy/Delete tools (one-shot tools auto-return to Select)
  - Node type selection applied to new nodes

---

## Quick start

1) Install and run
```bash
pnpm install
pnpm dev
# or: npm run dev / yarn dev / bun dev
```

2) Environment
Create `.env.local` with at least:
```bash
NEXT_PUBLIC_VELT_API_KEY=YOUR_VELT_API_KEY
# Optional for token-based auth
NEXT_PUBLIC_VELT_STATIC_TOKEN=YOUR_VELT_STATIC_TOKEN
```

Open `http://localhost:3000`.

---

## How collaboration is wired

- Provider & auth: see `app/page.tsx` and `components/velt/hooks/useVeltAuthProvider.ts`.
  - The Provider reads the current user from `window.__VELT__.getUser()` which the host controls (see “Global bridges”).
- Document initialization: `components/velt/VeltInitializeDocument.tsx` always registers a document id on mount so DocService is ready even before login.
- Presence/Cursor: added via `VeltCursor` and `VeltTools.Presence` in the toolbar.

### Global bridges (host-owned)
These are the minimal interfaces Velt and the app use to communicate:
- `window.__VELT__.getDocument()` → `{ documentId, documentName, documentType }`
- `window.__VELT__.getUser()` → current user or `undefined`
- `window.__VELT__.loginAs(userId)` / `window.__VELT__.logout()` → used by the login pill; also updates `localStorage.user` and dispatches `velt:user-changed`.

### React Flow bridges (toolbar/sidebar)
Exposed by the canvas so the existing UI can call them:
- `flowZoomIn`, `flowZoomOut`, `flowFitView`
- `flowDeleteSelected`, `flowCopySelected`, `flowAddNode`
- `flowSave`, `flowExport`, `flowShare`
- `flowSelectedNodeType` (set by Sidebar when selecting a node type)

---

## React Flow CRDT + persistence

- The CRDT store (`veltReactFlowStore`) manages nodes/edges and syncing.
- State is persisted to `localStorage` by document id key: `flowchart-data-${documentId}`.
- On load, the canvas hydrates from storage; if empty, it seeds demo nodes/edges.

---

## Project structure (selected)

- `app/page.tsx` — mounts Provider, Collaboration, Cursor, Toolbar, Sidebar, Canvas
- `components/velt/ReactFlowComponent.tsx` — CRDT canvas, window bridges, persistence
- `components/velt/VeltInitializeDocument.tsx` — sets document id on mount
- `components/velt/VeltInitializeUser.tsx` — defines login/logout bridges; renders Toolbar login pill
- `components/toolbar/toolbar.tsx` — login pill + actions + presence
- `components/sidebar/sidebar.tsx` — tools and node types; sets `flowSelectedNodeType`
- `lib/theme.tsx` — light/dark theme provider used by the toolbar/login pill

---

## Usage tips

- Login first (Toolbar, top-right) to enable Velt-authenticated presence. You can still use the canvas while logged out; document id is registered on startup.
- Sidebar
  - Select node type; Add Node uses the selected type, or the base node’s type if one is selected.
  - Copy/Delete/Add run once and auto-return to Select.
- Canvas
  - Drag, select, and connect nodes. DnD from Sidebar to add nodes.

---

## Troubleshooting

- “Please set document id to continue” → ensure `VeltInitializeDocument` mounts (it's included in `VeltCollaboration`) and that `window.__VELT__.getDocument()` returns a valid id.
- Login pill shows wrong state → the pill derives its state from `useVeltAuthProvider()` (same as Provider). If you changed users in dev tools, emit `window.dispatchEvent(new Event('velt:user-changed'))`.
- Canvas disappears on resize → parent container must have non-collapsing height. We set `minHeight: 0` on grid wrappers in `app/page.tsx`.

---

## Scripts

```bash
pnpm dev     # run next dev
pnpm build   # next build
pnpm start   # next start
pnpm lint    # next lint
```

Node: Next.js 14, React 18.

---

## License
For demo use only. Replace the Velt keys with your own and adapt as needed.
