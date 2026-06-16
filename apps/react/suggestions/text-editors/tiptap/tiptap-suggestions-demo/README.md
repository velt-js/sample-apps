# Tiptap Suggestions Demo

> **[🚀 View Live Demo](https://sample-apps-tiptap-suggestions-demo.vercel.app)**

## Overview

This demo showcases **suggestion mode on rich text and metadata fields** built using **Tiptap** with **Velt's Suggestions + Comments integration**. When suggestion mode is on, edits aren't written straight to the document — they're captured as proposed changes that a reviewer accepts or rejects from the comment dialog, Google Docs-style. On accept, the app applies the change; on reject, it reverts.

## Path

```
apps/react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/
```

## Package Name

`@apps/react-suggestions-text-editors-tiptap-tiptap-suggestions-demo`

## Features

### Suggestions Features
- **Suggestion Mode Toggle**: Flip between normal editing and "Suggesting" from the header
- **Field Targets**: Title, status, category, and publish-date fields are tagged as suggestion targets via `data-velt-suggestion-target`
- **Rich-Text Body Target**: The whole Tiptap body is registered as a target through a custom getter, so prose edits can be proposed too
- **Auto-Capture on Commit**: Committing an edit to a tagged target auto-creates a pending suggestion with a human-readable summary
- **Accept / Reject in the Comment Dialog**: Reviewers act on each suggestion from a customized comment dialog wireframe
- **Apply on Accept**: Accepted suggestions write `newValue` into app state; rejected ones revert to `oldValue`
- **Suggestions Panel**: Lists open suggestions with the underlying comment thread

### Commenting Features
- **Text Selection Comments**: Highlight any text to add inline comments
- **Bubble Menu**: Quick access to the comment tool on text selection
- **@Mentions**: Tag collaborators in comments for direct feedback
- **Notifications**: Stay updated on new comments and replies
- **Comment Sidebar**: View and manage all document comments in one place

### Editor Features
- **Rich Text Editing**: Powered by Tiptap with StarterKit extensions
- **Text Formatting**: Bold, italic, and underline styling
- **Custom Inline Headings**: Inline H1/H2/H3 extensions for the article body
- **Table of Contents**: Collapsible sidebar to quickly jump between sections

## Directory Structure

```
tiptap-suggestions-demo/
├── app/
│   ├── api/
│   │   └── velt/
│   │       └── token/
│   │           └── route.ts         # JWT token generation via Velt REST API
│   ├── document/
│   │   ├── DocumentContext.tsx      # useCurrentDocument hook (URL/localStorage doc ID)
│   │   └── useCurrentDocument.ts    # Re-export barrel
│   ├── userAuth/
│   │   ├── AppProviders.tsx         # Theme + AppUser providers
│   │   ├── AppUserContext.tsx       # Demo user generation
│   │   └── useAppUser.ts            # Re-export barrel
│   ├── icon.png                     # App favicon
│   ├── layout.tsx                   # Root layout
│   └── page.tsx                     # Main page with VeltProvider
├── components/
│   ├── header/
│   │   └── header.tsx               # Floating top-right controls (suggestion toggle, theme, Velt tools)
│   ├── sidebar/
│   │   └── sidebar.tsx              # Collapsible Table of Contents (jumps between headings)
│   ├── velt-logo.tsx                # Velt logo component
│   ├── document/
│   │   ├── document-canvas.tsx      # App shell: header, sidebar, fields, editor, panels
│   │   └── TipTapComponent/
│   │       ├── TipTapComponent.tsx  # Tiptap editor + Velt comments + body target
│   │       ├── constants.ts         # Initial editor content
│   │       ├── extensions.ts        # Custom inline heading extensions
│   │       ├── index.tsx            # Re-exports
│   │       ├── types.ts             # TypeScript type definitions
│   │       └── ui/
│   │           ├── BubbleMenuToolbar.tsx # Selection toolbar with comment button
│   │           ├── ToolbarButton.tsx     # Reusable toolbar button
│   │           └── ToolbarDivider.tsx    # Toolbar separator
│   ├── suggestions/
│   │   ├── ApplySuggestions.tsx     # Renderless: applies/reverts on accept/reject
│   │   ├── OpenSuggestionsPanel.tsx # Lists open suggestions + comment threads
│   │   ├── ProposalContext.tsx      # Proposal state + writeField
│   │   ├── ProposalFields.tsx       # Metadata fields tagged as suggestion targets
│   │   ├── SuggestionModeToggle.tsx # Enable/disable suggestion mode
│   │   └── types.ts                 # Proposal model + target ids
│   ├── theme/
│   │   ├── ThemeContext.tsx         # Light/dark/system theme provider
│   │   └── ThemeToggle.tsx          # Theme switcher
│   └── velt/
│       ├── ui-customization/
│       │   ├── VeltCommentDialogSuggestionModeWf.tsx # Accept/Reject dialog wireframe
│       │   ├── VeltCommentToolWf.tsx                 # Customized comment tool
│       │   ├── VeltCustomization.tsx                 # Velt UI customization wrapper
│       │   ├── VeltNotificationsToolWf.tsx           # Customized notifications
│       │   ├── VeltSidebarButtonWf.tsx               # Customized sidebar button
│       │   └── styles.css                            # Velt CSS variables + dialog styles
│       ├── VeltCollaboration.tsx     # Velt comments + sidebar + customization
│       ├── VeltInitializeBotContact.tsx # Registers bot as @-mentionable contact
│       ├── VeltInitializeDocument.tsx   # Document initialization
│       ├── VeltInitializeUser.tsx       # User initialization (JWT auth provider)
│       └── VeltTools.tsx                # Presence, sidebar, notifications, huddle
├── lib/
│   └── utils.ts                      # Utility functions
├── public/
│   └── icons/                        # SVG icons for toolbar
├── styles/
│   └── globals.css                   # Global styles
├── .npmrc                            # pnpm config to prevent Tailwind v4 hoisting
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── components.json                   # shadcn/ui configuration
└── package.json
```

## Key Technologies

- **Next.js 16** with React 19
- **@tiptap/react** - Rich text editor framework
- **@tiptap/starter-kit** - Essential Tiptap extensions
- **@veltdev/react** - Velt collaboration components + Suggestions API hooks
- **@veltdev/tiptap-velt-comments** - Tiptap-specific comment integration
- **Velt Suggestions API** - Suggestion mode, targets, accept/reject lifecycle
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
cd apps/react/suggestions/text-editors/tiptap/tiptap-suggestions-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-suggestions-text-editors-tiptap-tiptap-suggestions-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-suggestions-text-editors-tiptap-tiptap-suggestions-demo build
```

## Usage

### Proposing Changes (Suggestion Mode)

1. **Enable suggestion mode**: Click the **Editing / Suggesting** toggle in the header
2. **Edit a target**: Change the title, status, category, publish date, or the article body
3. **Commit the edit**: Blur a text/date field or change a select — the SDK captures it as a pending suggestion
4. **Review**: Open the comment dialog on the suggestion and click **Accept** or **Reject**
5. **Result**: Accepted changes are applied to the document; rejected changes revert to the original value

### Adding Comments

1. **Select text**: Highlight any portion of text in the editor
2. **Click comment icon**: In the bubble menu that appears, click the comment icon
3. **Write comment**: Add your feedback with optional @mentions
4. **Submit**: Comment appears as a highlighted annotation on the text

### Viewing Suggestions & Comments

1. **Suggestions panel**: Open suggestions are listed below the editor with their threads
2. **Inline highlights**: Commented text is visually marked; click to view and reply
3. **Comment sidebar**: Open the sidebar to see all comments
4. **Notifications**: Check the bell icon for new activity

## Troubleshooting

### PostCSS Errors
If you see PostCSS/Tailwind errors, ensure:
1. The `.npmrc` file exists in this directory
2. You ran `pnpm install` from the monorepo root
3. You're not accidentally using Tailwind v4

### Velt Not Loading
If Velt features don't appear:
1. Check that `NEXT_PUBLIC_VELT_API_KEY` is set in your environment
2. Verify user initialization in the browser console
3. Ensure you're running the dev server on the correct port

### Suggestions Not Capturing
If edits aren't becoming suggestions:
1. Confirm suggestion mode is **on** (toggle shows "Suggesting")
2. Verify the field has a `data-velt-suggestion-target` attribute
3. Ensure the value actually changed — no-op edits never create a suggestion
4. Check that the target getter reads live edit-time state (not post-commit state)

### Comments Not Appearing
If comments aren't showing:
1. Verify the `TiptapVeltComments` extension is loaded
2. Check the browser console for errors in `renderComments`
3. Ensure the `useCommentAnnotations` hook is receiving data
4. Confirm the document ID is properly initialized

## About Velt SDK

<a href="https://npmjs.org/package/@veltdev/react">
  <img src="https://img.shields.io/npm/v/@veltdev/react?style=flat&label=npm&color=09f" alt="NPM" />
</a>

With Velt SDK you can add powerful collaboration features to your product extremely fast.

The SDK provides **fullstack components**:
- UI and behavior are fully customizable to match your product's needs
- Fully-managed on a scalable realtime backend

**Features include:**
- **Suggestions** like Google Docs suggesting mode
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
- 📝 [Release Notes](https://docs.velt.dev/release-notes/version-4/sdk-changelog) - Latest changes
- 🔒 [Security](https://velt.dev/security) - SOC2 Type 2 & HIPAA compliant
- 🐦 [X/Twitter](https://x.com/veltjs) - Updates and announcements

## Important Configuration

### .npmrc File

This demo includes a `.npmrc` file that prevents pnpm from hoisting Tailwind CSS v4 from other workspace packages:

```
public-hoist-pattern[]=*
public-hoist-pattern[]=!tailwindcss
shamefully-hoist=false
```

**Why this matters**:
- This demo uses Tailwind CSS v3.4.x with traditional PostCSS configuration
- Other apps in the monorepo may use Tailwind CSS v4
- Without the `.npmrc`, pnpm would hoist v4 and cause PostCSS build errors

**Do not delete the `.npmrc` file** - it ensures the correct Tailwind version is used.
