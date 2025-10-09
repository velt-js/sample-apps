## Velt Collaboration SDK — ReactFlow Presence/Cursor Sample (Next.js)

This repository is a Next.js 15 sample that demonstrates how to integrate the **Velt Collaboration SDK** for real‑time collaboration features such as presence and cursors, along with a shared ReactFlow canvas using CRDTs.

### NPM
Install the Velt client SDK (the sample already includes it via `package.json`):
```bash
npm install @veltdev/client
```

### What the SDK provides
The SDK ships full‑stack, fully‑managed collaboration building blocks:
- UI and behavior are fully customizable to match your product’s needs
- Backed by a scalable real‑time infrastructure

### Features included in Velt
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

### This sample demonstrates
- **Velt SDK** for presence and cursors in a real app
- **ReactFlow CRDT** canvas (`@veltdev/reactflow-crdt`) for real‑time graph editing
- **Demo auth** via localStorage with a simple user switcher
- **Token API** at `app/api/velt/token/route.ts` to mint Velt JWTs (v2 API)
- Shadcn‑based UI for toolbar, sidebar, and panels

### Requirements
Create a `.env.local` file in this folder:
```
NEXT_PUBLIC_VELT_API_KEY=YOUR_VELT_API_KEY
VELT_AUTH_TOKEN=YOUR_VELT_AUTH_TOKEN
```

### Run locally
```
pnpm install
pnpm dev
# or npm install && npm run dev
# or yarn && yarn dev
```
Open http://localhost:3000 in two browsers to see presence/cursors.

### Notable files
- `app/page.tsx`: Wraps the app with `VeltProvider` and renders collaboration
- `app/api/velt/token/route.ts`: Server route to mint Velt JWTs (v2 API)
- `app/userAuth/*`: Minimal login stored in localStorage
- `components/velt/VeltInitializeUser.tsx`: Builds `authProvider` and fetches token
- `components/velt/VeltInitializeDocument.tsx`: Registers the current document with Velt
- `components/velt/VeltCollaboration.tsx`: Mounts cursor and customizations
- `components/velt/ReactFlowComponent.tsx`: Collaborative ReactFlow canvas

### Documentation
Read the official Velt documentation for guides and API references.

### Use cases
- Explore use cases to learn how collaboration could look in your product.
- Figma template: visualize how collaboration features can fit your UI.

### Releases
See the latest changes in the Velt SDK changelog.

### Security
Velt is SOC2 Type 2 and HIPAA compliant.

### Community
- X: updates, announcements, and Velt tips
- Discord: ask questions and share tips (less active)

### Notes
- Ensure `setDocuments` runs after a user exists so Velt initialization completes.
- This sample uses Next.js App Router and React 19.

### Keywords
react velt real-time realtime toolkit multiplayer websockets collaboration collaborative presence synchronize rooms documents conflict-resolution huddle crdts comment comments recording video-call audio-call screen-recording webrtc cursors notifications cord live blocks

