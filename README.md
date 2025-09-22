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
