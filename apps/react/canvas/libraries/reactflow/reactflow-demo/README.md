# ReactFlow CRDT Demo

## Overview

This demo showcases **real-time collaborative canvas** functionality using **ReactFlow** with **Velt's CRDT** extension. Multiple users can simultaneously create, edit, and comment on nodes and edges in real-time with automatic conflict resolution.

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

### UI Components
- **Dark Mode**: Custom dark theme with Velt integration
- **Custom Styling**: Matching Figma design specifications
- **Interactive Controls**: Bottom toolbar with preview, undo/redo (UI placeholders)
- **Side Panel**: Edit node names and properties

## Directory Structure

```
reactflow-demo/
├── app/
│   ├── layout.tsx                      # Root layout with Velt provider
│   └── page.tsx                        # Main page
├── components/
│   ├── header/
│   │   └── header.tsx                  # Velt tools (presence, notifications, huddle)
│   ├── sidebar/
│   │   └── sidebar.tsx                 # Left sidebar for dragging nodes
│   ├── document/
│   │   └── document-canvas.tsx         # Document wrapper
│   └── velt/
│       ├── ReactFlowComponent.tsx      # Main ReactFlow + Velt CRDT integration
│       ├── VeltInitializeUser.tsx      # User initialization
│       ├── VeltInitializeDocument.tsx  # Document setup
│       ├── VeltCollaboration.tsx       # Velt client setup
│       ├── VeltTools.tsx               # Velt component exports
│       ├── hooks/
│       │   └── useCurrentDocument.ts   # Document management hook
│       └── ui-customization/           # Customized Velt components
│           ├── VeltCommentBubbleWf.tsx
│           ├── VeltCommentToolWf.tsx
│           ├── VeltNotificationsToolWf.tsx
│           ├── VeltSidebarButtonWf.tsx
│           ├── VeltCustomization.tsx
│           └── styles.css
├── hooks/                              # Custom React hooks
├── lib/
│   └── utils.ts                        # Utility functions
├── public/
│   ├── icons/                          # SVG icons for nodes and controls
│   └── background-pattern.png          # Canvas background pattern
├── styles/
│   └── globals.css                     # Global styles
├── .npmrc                              # pnpm config (prevents Tailwind v4 hoisting)
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

### Velt CRDT Integration

The core integration uses the `useVeltReactFlowCrdtExtension` hook:

```tsx
const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useVeltReactFlowCrdtExtension({
    editorId: 'react-flow-crdt-2025-10-10',
    initialEdges,
    initialNodes,
});
```

This hook provides:
- Real-time synchronized nodes and edges
- Automatic conflict resolution when multiple users edit simultaneously
- Change handlers that broadcast updates to all connected users

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

The `data-velt-target-comment-element-id` attribute on the node label enables targeted commenting.

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

## Customization

### UI Customization

Velt components are customized using wireframes in `components/velt/ui-customization/`:
- Custom comment bubble styling
- Branded notification panel
- Styled sidebar button
- Theme-matched comment tools

### Adding New Node Types

1. Define node data type in `ReactFlowComponent.tsx`
2. Create a new node component function
3. Add to `nodeTypes` object
4. Include in sidebar for drag & drop

### Styling

- Global styles: `styles/globals.css`
- Velt customization: `components/velt/ui-customization/styles.css`
- Tailwind config: `tailwind.config.js`

## Development Notes

- **Velt initialization**: App waits for `useVeltInitState()` before rendering ReactFlow
- **Document setup**: Users are initialized with `VeltInitializeUser` and documents with `VeltInitializeDocument`
- **Dark mode**: Automatically enabled via `client.setDarkMode(true)`
- **Auto-fit**: Canvas centers nodes on load with offset for sidebar
- **Node IDs**: Generated using `crypto.randomUUID()` for uniqueness

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

## Next Steps

- [ ] Implement undo/redo functionality (currently UI placeholders)
- [ ] Add more node types with different behaviors
- [ ] Implement node grouping and nested structures
- [ ] Add export/import functionality for canvas state
- [ ] Create more sophisticated edge styling options
- [ ] Add mini-map for large canvases
- [ ] Implement node search and filtering

## Learn More

- [ReactFlow Documentation](https://reactflow.dev/)
- [Velt Documentation](https://docs.velt.dev)
- [Velt ReactFlow CRDT Guide](https://docs.velt.dev/live-co-editing/canvas/reactflow)
- [Monorepo Structure Guide](../../../../README_MONOREPO.md)
- [Structure Documentation](../../../../docs/structure.md)

## Support

For issues or questions:
- ReactFlow: [GitHub Issues](https://github.com/xyflow/xyflow/issues)
- Velt: [Documentation](https://docs.velt.dev)
