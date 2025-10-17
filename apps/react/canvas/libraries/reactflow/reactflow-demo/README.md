# React Flow CRDT Demo

> **[🚀 View Live Demo](https://sample-apps-reactflow-demo.vercel.app/)**
> **[Video Demo](https://github.com/user-attachments/assets/f9ea9bab-0e12-4f62-b791-eba0bef649bc)**



## Overview

This demo showcases **real-time collaborative workflow builder** built using **ReactFlow** with **Velt's CRDT** extension. Multiple users can simultaneously create, edit, and comment on nodes and edges in real-time with automatic conflict resolution.

Velt's CRDT extension is based on Yjs.

## Path

```
apps/react/canvas/libraries/reactflow/reactflow-demo/
```

## Package Name

`@apps/react-canvas-reactflow-reactflow-demo`

## Features

### Real-time Collaboration
- **Live Co-editing**: Multiple users can simultaneously add, move, and connect nodes with Velt's CRDT synchronization
- **Presence Awareness**: See who's currently viewing and editing the canvas
- **Commenting**: Add contextual comments directly on nodes with `VeltCommentBubble` and `VeltCommentTool`
- **Notifications**: Stay updated on comments and changes
- **Huddle**: Audio/video communication while collaborating
- **Comment Sidebar**: Access all comments in a centralized panel

### Canvas Features
- **Custom Node Types**: Styled nodes with icons and accent colors
- **Drag & Drop**: Add new nodes from sidebar by dragging
- **Edge Creation**: Connect nodes by dragging from handles
- **Dynamic Node Addition**: Create new nodes by dragging edges to empty space
- **Node Selection**: Click nodes to view and edit properties in side panel
- **Zoom Controls**: Zoom in/out with dedicated controls
- **Auto-fit View**: Canvas automatically centers nodes on load


## Directory Structure

```
reactflow-demo/
├── app/
│   ├── api/
│   │   └── velt/
│   │       └── token/
│   │           └── route.ts            # Velt JWT token generation endpoint
│   ├── document/
│   │   ├── DocumentContext.tsx         # Document context provider
│   │   └── useCurrentDocument.ts       # Document management hook
│   ├── userAuth/
│   │   ├── AppUserContext.tsx          # User authentication context
│   │   ├── LoginPanel.tsx              # User login panel component
│   │   ├── useAppUser.ts               # User authentication hook
│   │   └── users.ts                    # Mock user data
│   ├── layout.tsx                      # Root layout with Velt provider
│   └── page.tsx                        # Main page
├── components/
│   ├── header/
│   │   └── header.tsx                  # Header with Velt tools (presence, notifications, huddle)
│   ├── sidebar/
│   │   └── sidebar.tsx                 # Left sidebar for dragging nodes
│   ├── document/
│   │   └── document-canvas.tsx         # Document wrapper component
│   └── velt/
│       ├── ReactFlowComponent/
│       │   ├── nodes/
│       │   │   ├── CustomNode.tsx      # Custom node with Velt comments
│       │   │   └── SimpleNode.tsx      # Simple node component
│       │   ├── ui/
│       │   │   ├── BottomToolbar.tsx   # Bottom toolbar controls
│       │   │   ├── SidePanel.tsx       # Right side panel
│       │   │   └── ZoomControls.tsx    # Zoom controls component
│       │   ├── AddNodeOnEdgeDrop.tsx   # Add node on edge drop handler
│       │   ├── constants.ts            # ReactFlow constants
│       │   ├── index.tsx               # ReactFlow component index
│       │   ├── ReactFlowComponent.tsx  # Main ReactFlow + Velt CRDT integration
│       │   └── types.ts                # TypeScript type definitions
│       ├── ui-customization/
│       │   ├── VeltCommentBubbleWf.tsx # Customized comment bubble
│       │   ├── VeltCommentToolWf.tsx   # Customized comment tool
│       │   ├── VeltCustomization.tsx   # Velt UI customization wrapper
│       │   ├── VeltNotificationsToolWf.tsx # Customized notifications
│       │   ├── VeltSidebarButtonWf.tsx # Customized sidebar button
│       │   └── styles.css              # Custom Velt styles
│       ├── VeltCollaboration.tsx       # Velt client setup
│       ├── VeltInitializeDocument.tsx  # Document initialization
│       ├── VeltInitializeUser.tsx      # User initialization
│       └── VeltTools.tsx               # Velt component exports
├── hooks/                              # Custom React hooks
├── lib/
│   └── utils.ts                        # Utility functions
├── public/
│   ├── icons/                          # SVG icons for nodes and controls
│   │   ├── arrow-back-up.svg
│   │   ├── arrow-redo.svg
│   │   ├── circle-dot.svg
│   │   ├── database.svg
│   │   ├── function.svg
│   │   ├── pointer.svg
│   │   └── ...                         # Additional icons
│   └── background-pattern.png          # Canvas background pattern
├── styles/
│   └── globals.css                     # Global styles
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── components.json                     # shadcn/ui configuration
└── package.json
```

## Key Technologies

- **Next.js 15** with React 19
- **@xyflow/react** (ReactFlow v12) - Canvas and node management
- **@veltdev/reactflow-crdt** - CRDT-based real-time synchronization
- **@veltdev/react** - Velt collaboration components
- **Yjs** - Underlying CRDT implementation
- **Zustand** - State management
- **Tailwind CSS v3.4** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

## Getting Started

### Install Dependencies

From the monorepo root:

```bash
pnpm install
```

### Run Development Server

Navigate to the demo directory:

```bash
cd apps/react/canvas/libraries/reactflow/reactflow-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-canvas-reactflow-reactflow-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-canvas-reactflow-reactflow-demo build
```

## Implementation Details

### Application Architecture

The application is structured around several key areas:

**User Authentication** (`app/userAuth/`)
- `AppUserContext` provides user state across the application
- `useAppUser` hook manages user selection and authentication
- `LoginPanel` allows switching between mock users for testing collaboration
- Mock user data simulates multi-user scenarios

**Document Management** (`app/document/`)
- `DocumentContext` manages the current document state
- `useCurrentDocument` hook provides document access and switching capabilities
- Documents represent separate collaborative canvases

**JWT Token Generation** (`app/api/velt/token/`)
- Backend route generates secure JWT tokens for Velt authentication
- Integrates with Velt's Auth Provider approach

**ReactFlow Canvas** (`components/velt/ReactFlowComponent/`)
- **Main component** orchestrates the entire ReactFlow canvas with Velt integration
- **Nodes** (CustomNode, SimpleNode) render individual flowchart elements with Velt commenting
- **UI components** (BottomToolbar, SidePanel, ZoomControls) provide canvas controls
- **AddNodeOnEdgeDrop** handles drag-and-drop node creation on edges

### Velt CRDT Integration

The core integration uses the `useVeltReactFlowCrdtExtension` hook in `ReactFlowComponent.tsx`:

```tsx
const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useVeltReactFlowCrdtExtension({
    editorId: 'react-flow-crdt-2025-10-10',
    initialEdges,
    initialNodes,
});
```

This hook provides:
- Real-time synchronized nodes and edges across all connected users
- Automatic conflict resolution when multiple users edit simultaneously
- Change handlers that broadcast updates to all connected users
- CRDT-based state management for collaborative editing

### Custom Node Components

Two node types are implemented:
- **CustomNode**: Full-featured nodes with comment tools
- **SimpleNode**: Simplified version for specific use cases

Both include:
- Custom styling matching design specifications
- Inline comment bubble and comment tool
- Connection handles for edge creation
- Selection state visualization

### Comments on Nodes

Each node includes Velt commenting capabilities:

```tsx
<VeltCommentBubble targetElementId={nodeId} />
<VeltCommentTool targetElementId={nodeId} />
```

- `VeltCommentTool` provides the interface to add new comments
- `VeltCommentBubble` renders existing comments as interactive bubbles
- The `data-velt-target-comment-element-id` attribute on the node label enables targeted commenting

## Customization

### UI Customization

Velt components are customized using wireframes in `components/velt/ui-customization/`:
- Custom comment bubble styling
- Branded notification panel
- Styled sidebar button
- Theme-matched comment tools

## Usage

### Adding Nodes
1. **Drag from sidebar**: Drag pre-configured node types onto the canvas
2. **Create from edge**: Drag from a node's handle to empty space to create a new connected node

### Editing Nodes
1. Click any node to select it
2. The side panel opens with editable properties
3. Change the node name in real-time
4. All collaborators see updates instantly

### Adding Comments
1. Click the comment tool icon on any node
2. Add your comment
3. Other users receive notifications
4. View all comments in the sidebar panel

### Collaboration Features
- **See active users**: View avatars of online collaborators in the header
- **Receive notifications**: Bell icon shows comment activity
- **Join huddle**: Start audio/video call with collaborators
- **View comments**: Click sidebar button to see all canvas comments

## Troubleshooting

### PostCSS Errors
If you see PostCSS/Tailwind errors, ensure:
1. The `.npmrc` file exists in this directory
2. You ran `pnpm install` from the monorepo root
3. You're not accidentally using Tailwind v4

### Velt Not Loading
If Velt features don't appear:
1. Check that `NEXT_PUBLIC_VELT_API_KEY` is set in your environment
2. Verify user initialization in browser console
3. Ensure you're running the dev server on the correct port

### CRDT Sync Issues
If changes aren't syncing:
1. Check browser console for errors
2. Verify the `editorId` is unique for your document
3. Ensure multiple users are on the same document ID
4. Test with two unique users on two different browser profiles (e.g., Chrome regular + Chrome incognito, or different browsers)

## About Velt SDK

<a href="https://npmjs.org/package/@veltdev/react">
  <img src="https://img.shields.io/npm/v/@veltdev/react?style=flat&label=npm&color=09f" alt="NPM" />
</a>

With Velt SDK you can add powerful collaboration features to your product extremely fast.

The SDK provides **fullstack components**:
- UI and behavior are fully customizable to match your product's needs
- Fully-managed on a scalable realtime backend

**Features include:**
- **Comments** like Figma, Frame.io, Google Docs, Sheets and more
- **Recording** like Loom (audio, video, screen)
- **Huddle** like Slack (audio, video, screensharing)
- In-app and off-app **notifications**
- **@mentions** and assignment
- **Presence**, **Cursors**, **Live Selection**
- **Live state sync** with Single Editor mode
- **Multiplayer editing** with conflict resolution
- **Follow mode** like Figma
- ... and so much more


### Resources
- 📚 [Documentation](https://docs.velt.dev/get-started/overview) - Guides and API references
- 🎨 [Use Cases](https://velt.dev/use-case) - See collaboration in action
- 🎭 [Figma Template](https://www.figma.com/community/file/1402312407969730816/velt-collaboration-kit) - Visualize features for your product
- 📝 [Release Notes](https://docs.velt.dev/release-notes/) - Latest changes
- 🔒 [Security](https://velt.dev/security) - SOC2 Type 2 & HIPAA compliant
- 🐦 [X/Twitter](https://x.com/veltjs) - Updates and announcements
- 📦 [GitHub](https://github.com/velt-js/docs) - Velt documentation repository
- [ReactFlow Documentation](https://reactflow.dev/)
- [Velt Documentation](https://docs.velt.dev)
- [Velt ReactFlow CRDT Guide](https://docs.velt.dev/live-co-editing/canvas/reactflow)

## Important Configuration

### .npmrc File

This demo includes a `.npmrc` file that prevents pnpm from hoisting Tailwind CSS v4 from other workspace packages:

```
public-hoist-pattern[]=*
public-hoist-pattern[]=!@tailwindcss*
```

**Why this matters**:
- This demo uses Tailwind CSS v3.4.x with traditional PostCSS configuration
- Other apps in the monorepo may use Tailwind CSS v4
- Without the `.npmrc`, pnpm would hoist v4 and cause PostCSS build errors

**Do not delete the `.npmrc` file** - it ensures the correct Tailwind version is used.


## Support

For issues or questions:
- ReactFlow: [GitHub Issues](https://github.com/xyflow/xyflow/issues)
- Velt: [Documentation](https://docs.velt.dev)
