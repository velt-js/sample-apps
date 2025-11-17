# SlateJS Comments Demo

## Overview

This demo showcases **inline text commenting** with **SlateJS**, a completely customizable framework for building rich text editors, integrated with **Velt's commenting system**. Users can select text passages and add contextual comments directly within the document with full control over the editor's behavior and data model.

SlateJS provides an **unopinionated, low-level framework** for building rich text editors in React. Unlike other editors that provide pre-built components, Slate gives you complete control over your editor's rendering, serialization, and behavior. It treats your document as **immutable data structures** and uses React principles to update the view, making it predictable and debuggable.

### Why Choose SlateJS?

- **Complete Flexibility**: Full control over editor behavior, rendering, and data model
- **Composable Primitives**: Build exactly the editor you need from basic building blocks
- **React-First**: Uses React components and hooks throughout
- **Nested Documents**: First-class support for nested structures (tables, callouts, etc.)
- **Immutable Operations**: Predictable editor state based on immutable operations
- **Plugin System**: True plugin architecture with no magic or hidden behaviors
- **TypeScript Support**: Excellent type definitions for the entire API

**Compared to other editors:**
- **vs Lexical**: More flexibility but steeper learning curve, community-driven
- **vs TipTap**: Lower-level with more control, no ProseMirror dependency
- **vs BlockNote**: Framework vs opinionated library, Slate requires more setup
- **vs CodeMirror**: Designed for rich documents, not code editing
- **For maximum customization**: Best choice when you need complete control over editor behavior

## Path

```
apps/react/comments/text-editors/slatejs/slatejs-comments-demo/
```

## Package Name

`@apps/react-text-editors-slatejs-slatejs-comments-demo`

## Features

### Velt Commenting Features
- **Text Selection Comments**: Highlight text passages and add inline comments
- **Comment Nodes**: SlateJS native nodes for comment markers in document structure
- **Inline Comment Rendering**: Custom SlateVeltComment component for comment display
- **Comment Bubbles**: Clickable bubbles showing comment threads
- **Threaded Discussions**: Reply to comments and maintain conversation context
- **Comment Annotations**: Automatic position tracking as document changes
- **Bubble Menu Integration**: Add comments via text selection toolbar
- **Comments Sidebar**: Centralized view of all document comments
- **Real-time Updates**: See new comments and replies instantly
- **Presence Awareness**: See who's currently viewing the document
- **Notifications**: Get notified of new comments and mentions

### SlateJS Editor Features
- **Rich Text Formatting**: Bold, italic, underline, strikethrough with custom rendering
- **Headings**: H1, H2, H3 with custom inline rendering and data attributes
- **Text Alignment**: Left, center, right alignment support
- **Bubble Menu Toolbar**: Context menu on text selection
- **Sidebar Navigation**: Auto-generated table of contents from headings
- **Scroll-to-Heading**: Click sidebar headings to navigate document
- **Custom Element Rendering**: Full control over how elements render
- **Custom Leaf Rendering**: Control over how text formatting renders
- **History**: Undo/redo with slate-history plugin
- **Pre-populated Content**: Initial document structure on load

### SlateJS Architecture
- **Immutable Documents**: Editor value is an immutable array of nodes
- **Transforms API**: Composable operations for modifying editor content
- **Editor Interface**: Query and manipulate the editor state
- **Custom Rendering**: Complete control over element and text rendering
- **Plugin Pattern**: Extend editor behavior by wrapping the editor object
- **Descendant Nodes**: Recursive node structure for complex documents

## Directory Structure

```
slatejs-comments-demo/
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
│   │   └── sidebar.tsx                 # Document outline sidebar with TOC
│   ├── document/
│   │   ├── document-canvas.tsx         # Main document wrapper
│   │   └── SlateJSComponent/
│   │       ├── SlateJSComponent.tsx    # Main SlateJS editor component
│   │       ├── constants.ts            # Initial document content
│   │       ├── types.ts                # TypeScript type definitions
│   │       └── ui/
│   │           └── BubbleMenuToolbar.tsx # Formatting toolbar component
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
│   └── globals.css                     # Global styles with SlateJS theming
├── .npmrc                              # pnpm config to prevent Tailwind v4 hoisting
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── components.json                     # shadcn/ui configuration
└── package.json
```

## Key Technologies

- **Next.js 15** with React 19
- **SlateJS 0.103.0** - Customizable editor framework
  - `slate` - Core editor package with primitives
  - `slate-react` - React bindings and hooks
  - `slate-history` - Undo/redo functionality
- **@veltdev/slate-velt-comments** - Velt comments integration for SlateJS
- **@veltdev/react** - Velt collaboration components
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
cd apps/react/comments/text-editors/slatejs/slatejs-comments-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-text-editors-slatejs-slatejs-comments-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-text-editors-slatejs-slatejs-comments-demo build
```

## Implementation Details

### Application Architecture

**User Authentication** (`app/userAuth/`)
- `AppUserContext` provides user state across the application
- `useAppUser` hook manages user selection and authentication
- `AppProviders` wraps the app with all necessary context providers
- Mock user data simulates multi-user commenting scenarios

**Document Management** (`app/document/`)
- `DocumentContext` manages the current document state
- `useCurrentDocument` hook provides document access
- Documents represent separate editing and commenting contexts

**JWT Token Generation** (`app/api/velt/token/`)
- Backend route generates secure JWT tokens for Velt authentication
- Integrates with Velt's Auth Provider approach

**SlateJS Editor** (`components/document/SlateJSComponent/`)
- Main editor component with Velt comments integration
- Custom element and leaf rendering
- Bubble menu for text formatting

### Velt Comments Integration

The integration uses Velt's SlateJS package to add commenting capabilities:

**Editor Setup with Velt Plugin:**
```tsx
const editor = useMemo(() => {
  const baseEditor = createEditor();
  return withVeltComments(withReact(withHistory(baseEditor)), {
    HistoryEditor: HistoryEditor,
  }) as CustomEditor;
}, []);
```

**Comment Rendering:**
```tsx
const commentAnnotations = useCommentAnnotations(); // [Velt] Subscribe to comment updates

useEffect(() => {
  if (editor && commentAnnotations?.length) {
    renderComments({ editor, commentAnnotations }); // [Velt] Render comment nodes
  }
}, [editor, commentAnnotations]);
```

**Adding Comments:**
```tsx
const handleAddComment = useCallback(() => {
  if (editor) {
    addComment({ editor }); // [Velt] Trigger comment on selection
  }
}, [editor]);
```

**Comment Element Rendering:**
```tsx
const Element = ({ attributes, children, element }: RenderElementProps) => {
  if (element.type === 'veltComment') {
    return <SlateVeltComment {...{ attributes, children, element }} />;
  }
  return <p {...attributes}>{children}</p>;
};
```

**How it works:**
1. `withVeltComments` plugin wraps the editor to intercept operations
2. User selects text and clicks comment button in bubble menu
3. `addComment()` creates a Velt annotation for the selection
4. Comment popover appears for user input
5. Velt inserts a 'veltComment' element node into the Slate document
6. `useCommentAnnotations()` hook detects the new comment
7. `renderComments()` updates comment nodes in the document
8. Custom `Element` renderer displays `SlateVeltComment` component
9. All users see comment bubbles immediately

**Comment Position Tracking:**
- Comments are Slate element nodes in the document tree
- Slate's path system keeps track of node positions
- Velt annotations map to Slate paths
- As users edit, Slate updates paths automatically
- Comments maintain correct positions relative to content

### SlateJS Architecture

**Immutable Document Structure:**
```tsx
const [value, setValue] = useState<Descendant[]>(initialContent);

return (
  <Slate editor={editor} initialValue={value} onChange={handleChange}>
    <Editable
      renderElement={Element}
      renderLeaf={Leaf}
      onKeyDown={handleKeyDown}
    />
  </Slate>
);
```

**Custom Element Rendering:**
```tsx
const Element = ({ attributes, children, element }: RenderElementProps) => {
  if (element.type === 'veltComment') {
    return <SlateVeltComment {...{ attributes, children, element }} />;
  }
  // Default paragraph element
  return <p {...attributes}>{children}</p>;
};
```

**Custom Leaf Rendering:**
```tsx
const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.heading === 'h1') {
    children = (
      <span className="text-[40px] font-bold" data-heading="h1">
        {children}
      </span>
    );
  }
  return <span {...attributes}>{children}</span>;
};
```

**Transforms and Editor Operations:**
```tsx
// Apply formatting
Editor.addMark(editor, 'bold', true);

// Insert text
Transforms.insertText(editor, 'Hello');

// Delete selection
Transforms.delete(editor);
```

### Bubble Menu Implementation

The bubble menu appears when text is selected:

```tsx
const updateBubbleMenu = useCallback(() => {
  const { selection } = editor;

  if (!selection || Editor.string(editor, selection) === '') {
    setShowBubbleMenu(false);
    return;
  }

  const domSelection = window.getSelection();
  const domRange = domSelection.getRangeAt(0);
  const rect = domRange.getBoundingClientRect();

  setBubbleMenuPosition({
    top: rect.top - menuHeight - 10,
    left: rect.left + rect.width / 2 - menuWidth / 2,
  });

  setShowBubbleMenu(true);
}, [editor]);
```

**Features:**
- Appears automatically on text selection
- Positioned above selected text
- Contains formatting buttons and comment tool
- Hides when selection is cleared

### History Plugin

Undo/redo functionality via slate-history:

```tsx
import { withHistory } from 'slate-history';

const editor = useMemo(() => {
  return withHistory(withReact(createEditor()));
}, []);
```

**Features:**
- Cmd/Ctrl+Z for undo
- Cmd/Ctrl+Shift+Z for redo
- Operation batching for atomic undo steps

### Sidebar Navigation

**Table of contents generation:**
- Scans document for elements with `data-heading` attribute
- Displays hierarchical list (H1, H2, H3)
- Smooth scrolls to heading on click
- Updates automatically as headings change

## Usage

### Writing and Editing

1. **Type content**: Click into the editor and start writing
2. **Format text**: Select text to reveal the bubble menu
3. **Add headings**: Select text and click H1, H2, or H3 in the bubble menu
4. **Apply styles**: Use bold, italic, underline, strikethrough buttons
5. **Navigate**: Click sidebar headings to jump to document sections

### Adding Comments

1. **Select text**: Highlight the passage to comment on
2. **Click comment button**: In the bubble menu toolbar (💬 icon)
3. **Type comment**: Enter your comment in the popover
4. **Submit**: Press Enter or click submit
5. **View comments**: Click comment bubbles to read and reply

### Viewing All Comments

1. Click the sidebar button in the header
2. Comments sidebar appears on the right
3. View all comments organized by location
4. Click a comment to jump to that text
5. Reply to comments in threads

### Keyboard Shortcuts

- **Cmd/Ctrl + B** - Toggle bold
- **Cmd/Ctrl + I** - Toggle italic
- **Cmd/Ctrl + U** - Toggle underline
- **Cmd/Ctrl + Z** - Undo
- **Cmd/Ctrl + Shift + Z** - Redo
- **Select text** - Opens bubble menu

## Customization

### Creating Custom Elements

Define a new element type:

```tsx
interface CustomElement {
  type: 'callout';
  variant: 'info' | 'warning' | 'error';
  children: Descendant[];
}

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'callout':
      return (
        <div {...attributes} className={`callout callout-${element.variant}`}>
          {children}
        </div>
      );
    case 'veltComment':
      return <SlateVeltComment {...{ attributes, children, element }} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};
```

### Adding Custom Marks

Extend text formatting:

```tsx
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.code) {
    children = <code>{children}</code>;
  }
  if (leaf.highlight) {
    children = <mark className="bg-yellow-200">{children}</mark>;
  }
  return <span {...attributes}>{children}</span>;
};

// Apply the mark
Editor.addMark(editor, 'highlight', true);
```

### Creating Editor Plugins

Wrap the editor to extend functionality:

```tsx
const withCustomPlugin = (editor: Editor) => {
  const { insertText } = editor;

  editor.insertText = (text) => {
    // Custom logic before insert
    insertText(text);
    // Custom logic after insert
  };

  return editor;
};

const editor = useMemo(() => {
  return withCustomPlugin(withVeltComments(withHistory(withReact(createEditor()))));
}, []);
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
4. Check browser console for Velt SDK errors

### Comments Not Appearing
If comments don't render:
1. Verify `withVeltComments` wraps the editor
2. Check that `SlateVeltComment` is rendered for 'veltComment' type
3. Ensure `useCommentAnnotations()` returns data
4. Verify `renderComments()` is called in useEffect
5. Check browser console for errors

### SlateJS Errors

**"Cannot resolve a Slate node from DOM node"**
- Ensure all elements have `...attributes` spread
- Check that custom elements are properly registered
- Verify editor is wrapped with `withReact`

**"Cannot get the leaf node at path"**
- Ensure operations maintain valid document structure
- Check that paths are valid when accessing nodes
- Verify editor state is not corrupted

**"Cannot apply operation on a value that does not have a selection"**
- Ensure editor has focus before applying operations
- Check that selection exists before text operations
- Use `Transforms.select()` to set selection if needed

**"A void node must contain a single spacer child"**
- Void nodes require `children={children}` in render
- Check that void nodes have `contentEditable={false}`
- Ensure void elements are properly configured

### Bubble Menu Issues
If the formatting toolbar doesn't appear:
1. Verify text is selected (not empty selection)
2. Check that `showBubbleMenu` state updates correctly
3. Ensure DOM selection exists: `window.getSelection()`
4. Verify bubble menu positioning calculations
5. Check CSS z-index and overflow properties

### History Not Working
If undo/redo doesn't work:
1. Verify `withHistory` wraps the editor
2. Ensure `HistoryEditor` is passed to `withVeltComments`
3. Check that keyboard shortcuts are not prevented
4. Verify operations are batched correctly

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
- [SlateJS Documentation](https://docs.slatejs.org/)
- [SlateJS Examples](https://www.slatejs.org/examples/richtext)
- [Velt Text Comments Documentation](https://docs.velt.dev/comments/text-comments/overview)

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
- SlateJS: [Documentation](https://docs.slatejs.org/) | [Slack](https://slate-slack.herokuapp.com/)
- Velt: [Documentation](https://docs.velt.dev) | [Contact](https://velt.dev/contact)
