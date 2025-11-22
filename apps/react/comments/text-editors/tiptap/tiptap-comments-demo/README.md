# Tiptap Comments Demo

> **[🚀 View Live Demo](https://sample-apps-tiptap-comments-demo.vercel.app)**

https://github.com/user-attachments/assets/c98a84e0-b083-4a3f-818b-d33768fcb15d


## Overview

This demo showcases **contextual commenting on rich text** built using **Tiptap** with **Velt's commenting integration**. Users can select text, add comments with @mentions, and collaborate asynchronously on document feedback.

## Path

```
apps/react/comments/text-editors/tiptap/tiptap-comments-demo/
```

## Package Name

`@apps/react-text-editors-tiptap-tiptap-comments-demo`

## Features

### Commenting Features
- **Text Selection Comments**: Highlight any text to add inline comments
- **Bubble Menu**: Quick access to comment tool on text selection
- **Comment Annotations**: Visual markers showing commented text with highlighting
- **@Mentions**: Tag collaborators in comments for direct feedback
- **Notifications**: Stay updated on new comments and replies
- **Comment Sidebar**: View and manage all document comments in one place

### Editor Features
- **Rich Text Editing**: Powered by Tiptap with StarterKit extensions
- **Text Formatting**: Bold, italic, and underline styling
- **Text Alignment**: Left, center, and right alignment options
- **Custom Inline Headings**: Styled H1, H2, H3 headings that flow inline with text
- **Table of Contents**: Sidebar navigation to quickly jump between sections
- **Collapsible Sidebar**: Toggle document navigation panel

## Directory Structure

```
tiptap-comments-demo/
├── app/
│   ├── layout.tsx                       # Root layout with Velt provider
│   └── page.tsx                         # Main page
├── components/
│   ├── header/
│   │   └── header.tsx                   # Header with Velt notifications
│   ├── sidebar/
│   │   └── sidebar.tsx                  # Table of contents navigation
│   ├── document/
│   │   ├── document-canvas.tsx          # Document wrapper component
│   │   └── TipTapComponent/
│   │       ├── TipTapComponent.tsx      # Main Tiptap editor with Velt comments
│   │       ├── constants.ts             # Editor content and icons
│   │       ├── extensions.ts            # Custom Tiptap extensions (inline headings)
│   │       ├── types.ts                 # TypeScript type definitions
│   │       └── ui/
│   │           ├── BubbleMenuToolbar.tsx # Text selection toolbar with comment button
│   │           ├── ToolbarButton.tsx    # Reusable toolbar button component
│   │           └── ToolbarDivider.tsx   # Toolbar separator component
│   └── velt/
│       ├── ui-customization/
│       │   ├── VeltCommentToolWf.tsx    # Customized comment tool
│       │   ├── VeltCustomization.tsx    # Velt UI customization wrapper
│       │   ├── VeltNotificationsToolWf.tsx # Customized notifications
│       │   └── VeltSidebarButtonWf.tsx  # Customized sidebar button
│       ├── VeltCollaboration.tsx        # Velt client setup
│       ├── VeltInitializeDocument.tsx   # Document initialization
│       ├── VeltInitializeUser.tsx       # User initialization
│       └── VeltTools.tsx                # Velt component exports
├── hooks/                               # Custom React hooks
├── lib/
│   └── utils.ts                         # Utility functions
├── public/
│   └── icons/                           # SVG icons for toolbar
├── styles/
│   └── globals.css                      # Global styles
├── .npmrc                               # pnpm config to prevent Tailwind v4 hoisting
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── components.json                      # shadcn/ui configuration
└── package.json
```

## Key Technologies

- **Next.js 15** with React 19
- **@tiptap/react** - Rich text editor framework
- **@tiptap/starter-kit** - Essential Tiptap extensions
- **@tiptap/extension-text-align** - Text alignment extension
- **@tiptap/extension-underline** - Underline extension
- **@veltdev/react** - Velt collaboration components
- **@veltdev/tiptap-velt-comments** - Tiptap-specific comment integration
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
cd apps/react/comments/text-editors/tiptap/tiptap-comments-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-text-editors-tiptap-tiptap-comments-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-text-editors-tiptap-tiptap-comments-demo build
```

## Implementation Details

### Application Architecture

The application is structured around several key areas:

**Editor Component** (`components/document/TipTapComponent/`)
- **TipTapComponent** orchestrates the Tiptap editor with Velt commenting integration
- **BubbleMenuToolbar** provides text formatting controls and comment button on text selection
- **Custom extensions** (InlineH1, InlineH2, InlineH3) create styled inline headings
- **Comment annotations** are rendered dynamically based on Velt's real-time updates

**Navigation** (`components/sidebar/`)
- **Sidebar** provides table of contents navigation with section jumping
- Collapsible design to maximize editor space
- Active section highlighting for visual orientation

### Velt Comments Integration

The core integration uses the `TiptapVeltComments` extension and related utilities:

```tsx
import { useCommentAnnotations } from '@veltdev/react'
import { TiptapVeltComments, addComment, renderComments } from '@veltdev/tiptap-velt-comments'

const editor = useEditor({
  extensions: [
    StarterKit,
    TextAlign,
    Underline,
    TiptapVeltComments, // Enables comment markers in editor
  ],
  content: initialContent,
})

const commentAnnotations = useCommentAnnotations() // Real-time comment data

useEffect(() => {
  if (editor && commentAnnotations?.length) {
    renderComments({ editor, commentAnnotations }) // Render comment highlights
  }
}, [editor, commentAnnotations])
```

### Adding Comments

Comments are added through the bubble menu that appears on text selection:

```tsx
const addTiptapVeltComment = () => {
  if (editor) {
    addComment({ editor }) // Triggers Velt comment dialog
  }
}
```

The `addComment` function:
- Captures the current text selection in the editor
- Opens the Velt comment dialog
- Creates a comment annotation at the selected range
- Highlights the commented text with a visual marker

### Custom Extensions

Three custom inline heading extensions are implemented:

```tsx
const InlineH1 = Mark.create({
  name: 'inlineH1',
  // Custom heading styles that flow inline with text
})
```

These provide styled headings without breaking the text flow, ideal for document-style editing.

## Customization

### UI Customization

Velt components are customized using wireframes in `components/velt/ui-customization/`:
- Custom comment tool styling to match editor theme
- Branded notification panel
- Styled sidebar button for comment access
- Dark theme matching for all Velt UI components

### Editor Styling

The editor uses custom Tailwind classes and CSS for:
- Dark theme matching the overall application
- Prose styles for readable typography
- Comment highlight colors and hover states
- Bubble menu styling and positioning

## Usage

### Adding Comments

1. **Select text**: Highlight any portion of text in the editor
2. **Click comment icon**: In the bubble menu that appears, click the comment icon
3. **Write comment**: Add your feedback with optional @mentions
4. **Submit**: Comment appears as a highlighted annotation on the text

### Viewing Comments

1. **Inline highlights**: Commented text is visually marked with underlines/highlights
2. **Click highlights**: Click any highlighted text to view and reply to comments
3. **Comment sidebar**: Open the sidebar to see all comments in chronological order
4. **Notifications**: Check the bell icon for new comment activity

### Navigating the Document

1. **Use sidebar**: Click sidebar items to jump to different sections
2. **Scroll naturally**: Sidebar highlights active section as you scroll
3. **Collapse sidebar**: Click the collapse icon to maximize editor space

### Text Formatting

1. **Select text**: Highlight text you want to format
2. **Use bubble menu**: Choose bold, italic, underline, or comment from the popup
3. **Headings**: Apply H1, H2, H3 styles to create section headings
4. **Alignment**: Use alignment buttons to adjust text positioning

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

### Comments Not Appearing
If comments aren't showing:
1. Verify the `TiptapVeltComments` extension is loaded
2. Check browser console for errors in `renderComments`
3. Ensure the `useCommentAnnotations` hook is receiving data
4. Confirm document ID is properly initialized

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
- [Tiptap Documentation](https://tiptap.dev/)
- [Velt Tiptap Comments Guide](https://docs.velt.dev/async-collaboration/comments/setup/tiptap)

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
- Tiptap: [GitHub Issues](https://github.com/ueberdosis/tiptap/issues)
- Velt: [Documentation](https://docs.velt.dev)
- Velt Support: [Contact](https://velt.dev/contact)
