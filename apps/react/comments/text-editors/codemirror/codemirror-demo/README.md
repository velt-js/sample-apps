# CodeMirror Collaborative Code Editor Demo

## Overview

This demo showcases **real-time collaborative code editing** with **CodeMirror 6**, the modern code editor library, integrated with **Velt's CRDT extension**. Multiple developers can simultaneously edit code files with automatic conflict resolution, live cursors, and syntax highlighting.

CodeMirror is specifically designed for **code editing** rather than document editing, making it the ideal choice for collaborative coding environments, online IDEs, code review tools, and documentation platforms with code examples. This demo features a **multi-tab code editor** supporting HTML, CSS, JavaScript, and TypeScript with real-time synchronization across all collaborators.

### Why Choose CodeMirror?

- **Code-First Design**: Built from the ground up for code editing, not adapted from document editors
- **Syntax Highlighting**: Robust language support with customizable syntax highlighting
- **Extensible Architecture**: Modular extension system for adding custom functionality
- **Performance**: Handles large files efficiently with incremental parsing
- **Accessibility**: Built-in keyboard navigation and screen reader support
- **Autocomplete**: Intelligent code completion out of the box

**Compared to other editors:**
- **vs Monaco**: Lighter weight, more customizable, easier to integrate
- **vs Ace**: Modern architecture with better TypeScript support and extensibility
- **vs Text Editors (TipTap, Lexical, SlateJS)**: Purpose-built for code, not prose
- **For code collaboration**: Industry-standard choice for online code editors

## Path

```
apps/react/comments/text-editors/codemirror/codemirror-demo/
```

## Package Name

`@apps/react-text-editors-codemirror-codemirror-demo`

## Features

### Real-time Collaboration Features
- **Live Co-editing**: Multiple users can simultaneously edit code with Velt's CRDT synchronization
- **Multi-File Support**: Collaborate on multiple code files simultaneously with tab-based interface
- **Live Cursors**: See collaborators' cursor positions in real-time while coding
- **Presence Awareness**: View who's currently working on which files
- **Conflict Resolution**: Automatic CRDT-based merge of simultaneous code edits
- **Undo/Redo**: Distributed undo that respects collaborative changes
- **Awareness Protocol**: See what other developers are typing in real-time

### CodeMirror Editor Features
- **Syntax Highlighting**: Language-aware syntax highlighting for:
  - HTML with tag and attribute highlighting
  - CSS with property and selector highlighting
  - JavaScript/TypeScript with keyword and identifier highlighting
- **Autocomplete**: Intelligent code completion suggestions
- **Line Numbers**: Clear line numbering for code navigation
- **Code Folding**: Collapse and expand code blocks
- **Multiple Selections**: Edit multiple locations simultaneously
- **Search & Replace**: Built-in find and replace functionality
- **Bracket Matching**: Automatic bracket pair highlighting
- **Indentation**: Smart automatic indentation
- **Tab Management**: Switch between multiple code files seamlessly

### Multi-Tab Interface
- **Tab Switching**: Click tabs to switch between HTML, CSS, and JavaScript files
- **Tab Icons**: Visual file type indicators (🌐 HTML, 🎨 CSS, 📜 JS, 📘 TS)
- **Close Tabs**: Remove tabs with close button (×)
- **Active Tab Highlighting**: Clear visual indication of current file
- **Persistent Editors**: Each tab maintains its own editor instance and content

### Velt Integration Features
- **CRDT Synchronization**: Real-time code syncing via `@veltdev/codemirror-crdt-react`
- **Per-File Collaboration**: Each file tab has independent collaborative state
- **Loading States**: Visual feedback while connecting to collaborative session
- **Awareness Sharing**: Share cursor positions and selections with team members
- **Comments & Presence**: Full Velt commenting and presence features available

## Directory Structure

```
codemirror-demo/
├── app/
│   ├── api/
│   │   └── velt/
│   │       └── token/
│   │           └── route.ts            # Velt JWT token generation endpoint
│   ├── document/
│   │   ├── DocumentContext.tsx         # Document context provider
│   │   └── useCurrentDocument.ts       # Document management hook
│   ├── userAuth/
│   │   ├── AppProviders.tsx            # App-level providers wrapper
│   │   ├── AppUserContext.tsx          # User authentication context
│   │   ├── useAppUser.ts               # User authentication hook
│   │   └── users.ts                    # Mock user data for testing
│   ├── layout.tsx                      # Root layout with app providers
│   └── page.tsx                        # Main page with Velt provider
├── components/
│   ├── header/
│   │   └── header.tsx                  # Header with Velt tools
│   ├── sidebar/
│   │   └── sidebar.tsx                 # Left navigation sidebar
│   ├── document/
│   │   ├── document-canvas.tsx         # Main document wrapper
│   │   └── CodeMirror Components/
│   │       ├── CodeEditorTabs.tsx      # Tab management component
│   │       ├── codemirror.tsx          # CodeMirror editor with CRDT integration
│   │       └── LoadingSpinner.tsx      # Loading state component
│   └── velt/
│       ├── ui-customization/
│       │   └── ...                     # Velt UI customization components
│       ├── VeltCollaboration.tsx       # Velt client setup
│       ├── VeltInitializeDocument.tsx  # Document initialization
│       ├── VeltInitializeUser.tsx      # User initialization
│       └── VeltTools.tsx               # Velt component exports
├── hooks/                              # Custom React hooks
├── lib/
│   └── utils.ts                        # Utility functions
├── public/                             # Static assets
├── styles/
│   └── globals.css                     # Global styles with CodeMirror theming
├── .npmrc                              # pnpm config to prevent Tailwind v4 hoisting
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── components.json                     # shadcn/ui configuration
└── package.json
```

## Key Technologies

- **Next.js 15** with React 19
- **CodeMirror 6** - Modern code editor library
  - `codemirror` - Core editor package
  - `@codemirror/state` - Editor state management
  - `@codemirror/lang-html` - HTML language support
  - `@codemirror/lang-css` - CSS language support
  - `@codemirror/lang-javascript` - JavaScript/TypeScript support
  - `@codemirror/autocomplete` - Code completion system
- **@veltdev/codemirror-crdt-react** - CRDT extension for real-time collaboration
- **@veltdev/react** - Velt collaboration components
- **Yjs** - CRDT implementation for conflict-free replicated data
- **y-codemirror.next** - Yjs binding for CodeMirror 6
- **Tailwind CSS v3.4** - Styling
- **TypeScript** - Type safety

## Getting Started

### Install Dependencies

From the monorepo root:

```bash
pnpm install
```

### Run Development Server

Navigate to the demo directory:

```bash
cd apps/react/comments/text-editors/codemirror/codemirror-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-text-editors-codemirror-codemirror-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-text-editors-codemirror-codemirror-demo build
```

## Implementation Details

### Application Architecture

The application is structured around several key areas:

**User Authentication** (`app/userAuth/`)
- `AppUserContext` provides user state across the application
- `useAppUser` hook manages user selection and authentication
- `AppProviders` wraps the app with all necessary context providers
- Mock user data simulates multi-developer collaboration scenarios

**Document Management** (`app/document/`)
- `DocumentContext` manages the current project/document state
- `useCurrentDocument` hook provides document access
- Documents represent separate coding projects or file collections

**JWT Token Generation** (`app/api/velt/token/`)
- Backend route generates secure JWT tokens for Velt authentication
- Integrates with Velt's Auth Provider approach for user verification

**Tab Management** (`components/document/CodeMirror Components/CodeEditorTabs.tsx`)
- Manages multiple file tabs (HTML, CSS, JavaScript)
- Handles tab switching, closing, and active state
- Each tab maintains its own editor instance

**CodeMirror Editor** (`components/document/CodeMirror Components/codemirror.tsx`)
- Core editor component with Velt CRDT integration
- Language-specific syntax highlighting
- Loading states and initialization logic

### Velt CRDT Integration

The core integration uses the `useVeltCodeMirrorCrdtExtension` hook:

```tsx
const { store, isLoading } = useVeltCodeMirrorCrdtExtension({
  editorId
});

useEffect(() => {
  if (!store || !editorRef.current) return;

  const startState = EditorState.create({
    doc: store.getYText()?.toString() ?? '',
    extensions: [
      basicSetup,
      getLanguageExtension(fileType),
      autocompletion(),
      yCollab(
        store.getYText()!,
        store.getAwareness(),
        { undoManager: store.getUndoManager() }
      ),
    ],
  });

  viewRef.current = new EditorView({
    state: startState,
    parent: editorRef.current,
  });
}, [store, fileType]);
```

**What this hook provides:**
- **Yjs Store**: CRDT data structure for collaborative editing
- **YText**: Shared text type synchronized across all users
- **Awareness**: Protocol for sharing cursor positions and selections
- **Undo Manager**: Collaborative undo/redo that respects others' changes
- **WebSocket Connection**: Real-time sync channel to Velt backend

**How collaboration works:**
1. Each file (tab) has its own unique `editorId` (e.g., "index.html", "index.css")
2. The hook creates a Yjs shared text document for that file
3. `yCollab` extension binds CodeMirror to the Yjs document
4. All edits are converted to Yjs operations
5. Operations are broadcast to all connected users
6. Remote operations are applied locally, maintaining consistency
7. Cursors and selections are shared via the awareness protocol

### Multi-Tab Architecture

**Tab State Management:**
```tsx
const [tabs, setTabs] = useState<Tab[]>([
  { id: 'index.html', filename: 'index.html', fileType: 'html' },
  { id: 'index.css', filename: 'index.css', fileType: 'css' },
  { id: 'index.js', filename: 'index.js', fileType: 'javascript' }
]);

const [activeTabId, setActiveTabId] = useState<string>('index.html');
```

**Key Implementation Details:**
- Each tab has a unique `id` used as the CRDT `editorId`
- Switching tabs remounts the CodeMirror component with new `editorId`
- Each file maintains independent collaborative state
- All collaborators see the same file when on the same tab

### Language Support

The editor automatically configures syntax highlighting based on file type:

```tsx
const getLanguageExtension = (type: string) => {
  switch (type) {
    case 'html':
      return html();
    case 'css':
      return css();
    case 'javascript':
    case 'typescript':
    default:
      return javascript();
  }
};
```

**Supported Languages:**
- **HTML**: Tag highlighting, attribute completion
- **CSS**: Selector and property highlighting
- **JavaScript**: Keyword, identifier, and string highlighting
- **TypeScript**: Same as JavaScript (uses JS language mode)

### Velt Collaboration Setup

**Configuration** (`components/velt/VeltCollaboration.tsx`)

```tsx
<VeltComments
  popoverMode={true}
  textMode={false}
  commentPinHighlighter={false}
  dialogOnHover={false}
  popoverTriangleComponent={false}
/>
<VeltCommentsSidebar />
<VeltCursor />
<VeltPresence />
```

**Available Velt Features:**
- Comments on code selections
- Live cursor tracking
- Presence indicators
- Notifications for code reviews
- Comments sidebar for discussion threads

## Usage

### Coding with Collaboration

1. **Open the editor**: Navigate to the demo in your browser
2. **Select a file**: Click on HTML, CSS, or JS tabs
3. **Start coding**: Type code with full syntax highlighting
4. **See collaborators**: Watch live cursors of other developers
5. **Switch files**: Click different tabs to edit other files

### Multi-User Collaboration

1. **Open multiple browsers**: Test with Chrome, Firefox, or incognito windows
2. **Switch users**: Use the login panel to select different mock users
3. **Edit simultaneously**: Type in the same file and see changes merge automatically
4. **Work on different files**: Have collaborators on different tabs simultaneously
5. **See presence**: View who's online in the header

### Adding Code Comments

1. **Select code**: Highlight a line or block of code
2. **Add comment**: Click the comment button in the header
3. **Discuss code**: Leave feedback, questions, or suggestions
4. **Code review**: Use comments for collaborative code review
5. **View all comments**: Open the comments sidebar to see all discussions

### Tab Management

1. **Switch tabs**: Click tab headers to navigate between files
2. **Close tabs**: Click the × button to remove a tab
3. **File indicators**: Icons show file type (🌐 HTML, 🎨 CSS, 📜 JS)
4. **Active highlighting**: Current tab is visually highlighted

### Code Editing Features

- **Autocomplete**: Start typing and press Tab to accept suggestions
- **Line numbers**: Use for reference in code reviews
- **Multiple cursors**: Hold Cmd/Ctrl and click to add cursors
- **Undo/Redo**: Cmd/Ctrl+Z and Cmd/Ctrl+Shift+Z work collaboratively
- **Selection**: Drag to select code, double-click to select word

## Customization

### Adding More Languages

To add support for additional languages (Python, Rust, etc.):

1. Install the language package:
```bash
pnpm add @codemirror/lang-python
```

2. Import and add to `getLanguageExtension`:
```tsx
import { python } from "@codemirror/lang-python";

const getLanguageExtension = (type: string) => {
  switch (type) {
    case 'python':
      return python();
    // ... other cases
  }
};
```

3. Add tab for the new language:
```tsx
{
  id: 'app.py',
  filename: 'app.py',
  fileType: 'python'
}
```

### Theming the Editor

CodeMirror themes can be customized in `styles/globals.css`:

```css
.cm-editor {
  background: #1e1e1e;
  color: #d4d4d4;
}

.cm-gutters {
  background: #1e1e1e;
  border-right: 1px solid #333;
}
```

Or use pre-built themes:
```bash
pnpm add @codemirror/theme-one-dark
```

## Troubleshooting

### PostCSS Errors
If you see PostCSS/Tailwind errors, ensure:
1. The `.npmrc` file exists in this directory
2. You ran `pnpm install` from the monorepo root
3. You're not accidentally using Tailwind v4

### Velt Not Loading
If Velt features don't appear:
1. Check that `NEXT_PUBLIC_VELT_API_KEY` is set in `app/page.tsx`
2. Verify user initialization in browser console
3. Ensure you're running the dev server on the correct port
4. Check browser console for any Velt SDK errors

### CRDT Sync Issues
If code changes aren't syncing:
1. Check browser console for WebSocket errors
2. Verify the `editorId` matches for all users on the same file
3. Ensure multiple users are on the same document ID
4. Test with two unique users on different browser profiles
5. Check that both users successfully initialized Velt

### Editor Not Rendering
If the CodeMirror editor doesn't appear:
1. Check that the editor container has height set
2. Verify `editorRef.current` is not null
3. Ensure CodeMirror extensions are properly loaded
4. Check browser console for initialization errors
5. Verify Yjs store is successfully created

### Tab Switching Issues
If tabs don't switch properly:
1. Ensure unique `key` prop on CodeMirrorComponent
2. Check that `activeTabId` state is updating
3. Verify tab `id` matches the editor `editorId`
4. Clean up previous editor instances on unmount

### Syntax Highlighting Not Working
If code appears without colors:
1. Verify language extension is imported
2. Check that file type is correctly identified
3. Ensure language extension is added to editor state
4. Try refreshing the browser

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
- [CodeMirror Documentation](https://codemirror.net/)
- [CodeMirror 6 Examples](https://codemirror.net/examples/)
- [Velt CRDT Guide](https://docs.velt.dev/live-co-editing/overview)

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
- CodeMirror: [Documentation](https://codemirror.net/) | [Discuss](https://discuss.codemirror.net/)
- Velt: [Documentation](https://docs.velt.dev) | [Contact](https://velt.dev/contact)
