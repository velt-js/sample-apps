# CodeMirror CRDT Demo (Vanilla JavaScript)

Real-time collaborative code editing built with CodeMirror 6 and Velt CRDT extension.

## What Changed

This demo was converted from React/Next.js to **vanilla JavaScript** with Vite:

- **Removed**: React, Next.js, @veltdev/react, @veltdev/codemirror-crdt-react
- **Added**: @veltdev/client, @veltdev/codemirror-crdt (non-React versions)
- **Bundler**: Vite instead of Next.js
- **UI**: Same layout and styling, implemented with vanilla JS DOM manipulation

## Features

- Real-time collaborative code editing
- Live cursors and presence awareness
- CRDT-based conflict resolution (Yjs)
- Velt collaboration tools (presence, comments, notifications)

## Directory Structure

```
codemirror-crdt-demo/
├── src/
│   ├── main.js                    # Entry point
│   ├── lib/
│   │   ├── user.js                # User management
│   │   ├── document.js            # Document ID management
│   │   └── velt.js                # Velt client initialization
│   ├── components/
│   │   ├── sidebar.js             # Left sidebar component
│   │   ├── header.js              # Header with Velt tools
│   │   ├── document-canvas.js     # Main layout
│   │   └── codemirror.js          # CodeMirror with CRDT
│   └── styles/
│       └── velt-customization.css # Velt theme variables
├── styles/
│   ├── globals.css                # Global styles (Tailwind)
│   └── codemirror.css             # Editor styles
├── public/                        # Static assets
├── index.html                     # HTML entry
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
└── package.json
```

## Getting Started

### Install Dependencies

```bash
pnpm install
```

### Run Development Server

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

### Build for Production

```bash
pnpm build
pnpm preview
```

## Testing Collaboration

1. Open the demo in two browser tabs (or different browsers)
2. Both tabs will automatically get unique users
3. Edit code in one tab and see changes appear in the other
4. Observe live cursors showing other users' positions

## Key Technologies

- **Vite** - Build tool
- **CodeMirror 6** - Code editor
- **@veltdev/client** - Velt SDK (vanilla JS)
- **@veltdev/codemirror-crdt** - CRDT extension for CodeMirror
- **y-codemirror.next** - Yjs binding for CodeMirror
- **Tailwind CSS v3.4** - Styling

## Velt Integration

The demo uses these Velt features:

1. **@veltdev/client** for initialization:
   ```js
   import { initVelt } from '@veltdev/client';
   const client = await initVelt('YOUR_API_KEY');
   await client.identify(user);
   await client.setDocument(documentId);
   ```

2. **@veltdev/codemirror-crdt** for collaborative editing:
   ```js
   import { createVeltCodeMirrorStore } from '@veltdev/codemirror-crdt';
   const store = await createVeltCodeMirrorStore({
     editorId: 'editor-1',
     veltClient: client,
     initialContent: '...',
   });
   ```

3. **Velt web components** for collaboration UI:
   ```html
   <velt-presence></velt-presence>
   <velt-comments></velt-comments>
   <velt-notifications-tool></velt-notifications-tool>
   ```

## Troubleshooting

### Editor Not Loading
- Check browser console for errors
- Verify Velt client initialization succeeded
- Ensure document ID is set before creating the editor

### Collaboration Not Working
- Open in two different browser profiles (not just tabs)
- Check that both sessions have the same document ID
- Verify user authentication completed

### Styles Not Applied
- Run `pnpm install` to ensure Tailwind is installed
- Check that CSS files are imported in main.js

## Resources

- [Velt Documentation](https://docs.velt.dev)
- [CodeMirror Documentation](https://codemirror.net/)
- [Velt CodeMirror CRDT Guide](https://docs.velt.dev/realtime-collaboration/crdt/setup/codemirror)
