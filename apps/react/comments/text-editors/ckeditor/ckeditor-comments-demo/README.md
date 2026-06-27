# CKEditor Comments Demo

> View live demo: https://sample-apps-ckeditor-comments-demo.vercel.app

This demo showcases inline text commenting in a CKEditor 5 editor using Velt. Users can select text in the document, add contextual comments from the selection toolbar, and view threaded discussions in the Velt comments sidebar.

## Location

```txt
apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/
```

Package name:

```txt
@apps/react-text-editors-ckeditor-ckeditor-comments-demo
```

## Features

- Text selection comments in CKEditor 5
- Floating selection toolbar with text formatting and Add Comment
- Velt comment sidebar, notifications, presence, and user identity
- Comment annotations that follow edited CKEditor content
- Light and dark sample app shell matching the other text-editor demos
- Shared Attention Is All You Need sample document

## Directory Tree

```txt
ckeditor-comments-demo/
├── app/
│   ├── api/velt/token/route.ts             # Demo JWT token endpoint
│   ├── document/                           # Demo document context
│   ├── userAuth/                           # Demo random user auth
│   ├── layout.tsx                          # App layout and CKEditor CSS import
│   └── page.tsx                            # VeltProvider + demo canvas
├── components/
│   ├── document/
│   │   ├── CKEditorComponent/
│   │   │   ├── CKEditorComponent.tsx       # CKEditor 5 editor with Velt integration
│   │   │   ├── constants.ts                # Editor id, storage keys, content, icons
│   │   │   ├── types.ts                    # Demo component types
│   │   │   └── ui/                         # Floating toolbar controls
│   │   └── document-canvas.tsx             # Shared sample-app shell
│   ├── header/                             # Top-right Velt tool chrome
│   ├── sidebar/                            # Collapsible document navigation
│   ├── theme/                              # Light/dark theme controls
│   └── velt/                               # Velt collaboration setup
├── public/icons/
├── styles/globals.css                      # App, CKEditor, and highlight styles
├── next.config.js
├── package.json
└── tsconfig.json
```

## Core Packages

- `@ckeditor/ckeditor5-react`
- `ckeditor5`
- `@veltdev/react`
- `@veltdev/ckeditor-velt-comments`

This demo is scoped to CKEditor. It does not include dependencies from other editor, spreadsheet, or viewer demos.

## Running Locally

From the sample-apps repo root:

```bash
pnpm install
pnpm --filter @apps/react-text-editors-ckeditor-ckeditor-comments-demo dev
```

Production build:

```bash
pnpm --filter @apps/react-text-editors-ckeditor-ckeditor-comments-demo build
```

## Integration Notes

- `components/document/document-canvas.tsx` loads `CKEditorComponent` with `next/dynamic` and `ssr: false` because CKEditor depends on browser-only APIs.
- `components/velt/VeltCollaboration.tsx` renders `VeltComments` with `textMode={false}` so the CKEditor package controls text selection and highlight rendering.
- `VeltCommentsPlugin` from `@veltdev/ckeditor-velt-comments` is added to the CKEditor `plugins` list and configured with `veltComments: { editorId }`.
- `addComment({ editor, editorId })` creates a Velt comment for the current CKEditor text selection.
- `renderComments({ editor, editorId, commentAnnotations })` renders Velt annotations in CKEditor whenever the Velt annotation list changes.
- CKEditor comment highlights are view-only overlays; the demo persists `editor.getData()` HTML under a document-scoped localStorage key without storing Velt comment marks in the content.

## Environment Variables

This demo follows the existing sample-app pattern and includes demo Velt credentials in `app/page.tsx` and `app/api/velt/token/route.ts`. Replace those values with your own Velt API key and auth token before adapting this demo for another project.

CKEditor is configured with `licenseKey: 'GPL'` for this demo. Replace that license key according to your CKEditor usage.

## Troubleshooting

### CKEditor Does Not Load

1. Confirm `ckeditor5` and `@ckeditor/ckeditor5-react` are installed.
2. Confirm `ckeditor5/ckeditor5.css` is imported from `app/layout.tsx`.
3. Check the browser console for CKEditor license, plugin, or SSR errors.

### Velt Comments Do Not Appear

1. Confirm the demo Velt API key and auth token in `app/page.tsx` and `app/api/velt/token/route.ts` are valid.
2. Confirm the demo user is initialized and the document is registered with Velt.
3. Select text in the CKEditor editor before clicking Add Comment.
4. Confirm `VeltCommentsPlugin` is included in the CKEditor `plugins` list.
5. Confirm `renderComments()` receives the same editor instance that was configured with the plugin.

### CKEditor Package Is Missing

The integration package is published as `@veltdev/ckeditor-velt-comments`.

1. Confirm package name spelling.
2. Confirm `@veltdev/ckeditor-velt-comments` is present in `package.json`.
3. Confirm `ckeditor5` satisfies the package peer dependency.

## References

- [CKEditor 5 Documentation](https://ckeditor.com/docs/ckeditor5/latest/)
- [Velt CKEditor Comments Guide](https://docs.velt.dev/async-collaboration/comments/setup/ckeditor)
