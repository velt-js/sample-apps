# Velt Sample Apps (Monorepo)

A lightweight monorepo that groups demo apps by category (ReactFlow, Tiptap, CodeMirror, etc.).
Each demo is **self-contained** — no shared utils/packages.

---

## Structure

- `apps/reactflow/*`
- `apps/tiptap/*`
- `apps/codemirror/*`
- `apps/misc/*`
- `docs/` — shared guidelines (no shared code)

Each app lives under `apps/<category>/<demo-name>` and exposes standard npm scripts:
- `dev` — run the app locally
- `build` — production build
- `lint` — lint the codebase

---

## For new developers

### Interesting folders

- See `Structure` for `apps/*` categories and layout.
- `scripts/` — helper scripts like `list-apps.js`.
- `docs/` — shared guidelines and checklists (no shared code).
- `turbo.json` — Turborepo configuration for running builds/dev across workspaces.
- `package.json` — workspace root with npm scripts and workspaces config.

### How to try and run

1. Install dependencies (Node 20+ recommended). See Quickstart below.

2. List available demos. See Useful commands below.

3. Run one specific app. See Useful commands below.

4. Environment variables: Some apps (e.g., ReactFlow presence/cursor) require a `.env.local` in that app folder. Typical keys:

       NEXT_PUBLIC_VELT_API_KEY=YOUR_VELT_API_KEY
       VELT_AUTH_TOKEN=YOUR_VELT_AUTH_TOKEN

   See each app’s README for exact variables and setup.

### Velt Collaboration SDK

With Velt SDK you can add powerful collaboration features to your product extremely fast. The SDK provides fullstack components that are fully customizable and backed by a fully‑managed, scalable realtime backend.

#### Key features

- Comments like Figma, Frame.io, Google Docs, Sheets and more
- Recording like Loom (audio, video, screen)
- Huddle like Slack (audio, video, screensharing)
- In‑app and off‑app notifications
- @mentions and assignment
- Presence, Cursors, Live Selection
- Live state sync with Single Editor mode
- Multiplayer editing with conflict resolution
- Follow mode like Figma
- …and much more

#### Installation

```bash
npm install @veltdev/client
```

#### Documentation

- Velt Collaboration SDK docs: https://docs.velt.dev
- NPM package: https://www.npmjs.com/package/@veltdev/client

#### Use cases

- Explore examples and patterns in this repo’s `apps/*/*` folders and in the official docs to see how collaboration could look in your product.

#### Releases

- See the latest changes on NPM: https://www.npmjs.com/package/@veltdev/client

#### Security

- Velt is SOC2 Type 2 and HIPAA compliant.

#### Community

- X (formerly Twitter): updates, announcements, and general Velt tips
- Discord: ask questions and share tips (less active)

#### Keywords

react, velt, real-time, realtime, toolkit, multiplayer, websockets, collaboration, collaborative, presence, synchronize, rooms, documents, conflict resolution, huddle, crdts, comment, comments, recording, video call, audio call, screen recording, webrtc, cursors, notifications, cord, liveblocks

---

## Quickstart

    npm ci
    npm run dev      # runs dev across all apps (in parallel if they expose dev)
    npm run build    # builds all apps
    npm run lint     # lints all apps

---

## Useful commands

### List all demos (by category)

    npm run list

### Run one specific app

    # dev
    npm run --workspace "apps/<category>/<demo-name>" dev

    # build
    npm run --workspace "apps/<category>/<demo-name>" build

    # lint
    npm run --workspace "apps/<category>/<demo-name>" lint

### Add a brand-new demo (Next.js example)

    # scaffold the folder
    mkdir -p apps/<category>/<demo-name>
    cd apps/<category>/<demo-name>

    # create a Next.js TS app using npm
    npm create next-app@latest . -- --ts --eslint --use-npm

    # back to repo root & commit
    cd ../../../
    git add -A
    git commit -m "feat(<category>): add <demo-name>"

### Bring in an existing repo (fast, no history)

    mkdir -p apps/<category>/<demo-name>
    rsync -a ../path-to-existing-repo/ apps/<category>/<demo-name>/ --exclude .git
    git add -A
    git commit -m "chore(<category>): add <demo-name> (no history)"

### Bring in an existing repo (with history, via git subtree)

    git remote add <short> git@github.com:velt-js/<source-repo>.git
    git fetch <short>
    git subtree add --prefix=apps/<category>/<demo-name> <short> main --squash
    # (omit --squash to keep every commit)

---

## Conventions

- **No shared packages** — keep apps independent.
- **Consistent scripts** — `dev`, `build`, `lint` in every app.
- **Namespacing** — `apps/<category>/<demo-name>` (kebab-case).
- **Node version** — use Node 20+ to match CI.
