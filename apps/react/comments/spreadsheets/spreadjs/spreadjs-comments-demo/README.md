# SpreadJS Comments Demo

> View live demo: https://sample-apps-spreadjs-comments-demo.vercel.app

This demo showcases Velt comments in a MESCIUS SpreadJS workbook. Users can select a cell or range, add a contextual Velt comment from the selection bubble, and review discussions in the Velt comments sidebar.

## Location

```txt
apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/
```

Package name:

```txt
@apps/react-comments-spreadsheets-spreadjs-spreadjs-comments-demo
```

## Features

- SpreadJS workbook loaded client-side from a bundled XLSX file
- Cell and range comments powered by `@veltdev/spreadjs-velt-comments`
- Selection bubble with an Add Comment button
- View-only Velt comment overlays anchored to workbook cells/ranges
- Velt comments sidebar, notifications, presence, and user identity
- Light and dark demo shell that matches the other sample apps

## Directory Tree

```txt
spreadjs-comments-demo/
├── app/
│   ├── api/velt/token/route.ts             # Demo JWT token endpoint
│   ├── document/                           # Demo document context
│   ├── userAuth/                           # Demo random user auth
│   ├── layout.tsx                          # App layout and SpreadJS CSS
│   └── page.tsx                            # VeltProvider + demo canvas
├── components/
│   ├── document/
│   │   ├── SpreadJSComponent/
│   │   │   ├── SpreadJSComponent.tsx       # SpreadJS workbook with Velt integration
│   │   │   ├── constants.ts                # XLSX paths, editor id, sheet nav
│   │   │   ├── types.ts                    # Demo component types
│   │   │   └── ui/AddCommentToolbar.tsx    # Selection bubble comment button
│   │   └── document-canvas.tsx             # Shared sample-app shell
│   ├── header/                             # Top-right Velt tool chrome
│   ├── sidebar/                            # Collapsible sheet navigation
│   ├── theme/                              # Light/dark theme controls
│   └── velt/                               # Velt collaboration setup
├── public/
│   ├── icons/
│   ├── sample.xlsx                         # Demo workbook
│   └── velt-test-document.xlsx             # Deterministic workbook fixture
├── types/spread-sheets-io.d.ts             # Side-effect module declaration
├── styles/globals.css                      # App, workbook, and highlight styles
├── next.config.js
├── package.json
└── tsconfig.json
```

## Core Packages

- `@mescius/spread-sheets`
- `@mescius/spread-sheets-io`
- `@veltdev/react`
- `@veltdev/spreadjs-velt-comments`

This demo is scoped to SpreadJS. It does not include dependencies from other editor, spreadsheet, or viewer demos.

## Running Locally

From the sample-apps repo root:

```bash
pnpm install
pnpm --filter @apps/react-comments-spreadsheets-spreadjs-spreadjs-comments-demo dev
```

Production build:

```bash
pnpm --filter @apps/react-comments-spreadsheets-spreadjs-spreadjs-comments-demo build
```

## Integration Notes

- `components/document/document-canvas.tsx` uses `next/dynamic` with `ssr: false`.
- `SpreadJSVeltComments.configure({ editorId }).attach(instance)` wires Velt comments to the ready SpreadJS workbook after the XLSX import completes.
- The selection bubble is a UI shell only; selection tracking, annotation creation, durable anchors, and highlight rendering come from `@veltdev/spreadjs-velt-comments`.
- `addComment({ instance })` creates a Velt comment annotation for the selected cell or range.
- `renderComments({ instance, commentAnnotations })` renders Velt comment overlays over the workbook canvas.
- `VeltComments` is rendered with `textMode={false}` so the SpreadJS package owns selection and highlight rendering.

## Environment Variables

This demo follows the existing sample-app pattern and includes demo Velt credentials in `app/page.tsx` and `app/api/velt/token/route.ts`. Replace those values with your own Velt API key and auth token before adapting this demo for another project.

The SpreadJS license key is optional:

```bash
NEXT_PUBLIC_SPREADJS_LICENSE_KEY=your_spreadjs_license_key
```

Without a SpreadJS license key, the workbook may run in evaluation mode.

## Troubleshooting

### SpreadJS Workbook Does Not Load

1. Confirm the XLSX exists at `/sample.xlsx`.
2. Confirm `@mescius/spread-sheets` and `@mescius/spread-sheets-io` are installed.
3. Check the browser console for SpreadJS license, network, or import errors.

### Velt Comments Do Not Appear

1. Confirm the demo Velt API key and auth token in `app/page.tsx` and `app/api/velt/token/route.ts` are valid.
2. Confirm the demo user is initialized and the document is registered with Velt.
3. Select a cell or range in the workbook before clicking Add Comment.
4. Confirm `SpreadJSVeltComments.configure(...).attach(instance)` runs after `workbook.import(...)` succeeds.
5. Confirm `renderComments()` receives the same SpreadJS instance that was attached.

## References

- [MESCIUS SpreadJS Documentation](https://developer.mescius.com/spreadjs/docs/)
- [Velt SpreadJS Comments Guide](https://docs.velt.dev/async-collaboration/comments/setup/spreadjs)
