# Nutrient Comments Demo

> View live demo: https://sample-apps-nutrient-comments-demo.vercel.app

This demo showcases Velt text comments in a Nutrient PDF viewer. Users can select text in the PDF, add a contextual Velt comment from the selection bubble, and review discussions in the Velt comments sidebar.

## Location

```txt
apps/react/comments/text-editors/nutrient/nutrient-comments-demo/
```

Package name:

```txt
@apps/react-text-editors-nutrient-nutrient-comments-demo
```

## Features

- Nutrient Web SDK PDF viewer loaded client-side
- Text selection comments powered by `@veltdev/nutrient-velt-comments`
- Selection bubble with an Add Comment button
- Velt comments sidebar, notifications, presence, and user identity
- Light and dark demo shell that matches the other text-editor sample apps

## Directory Tree

```txt
nutrient-comments-demo/
├── app/
│   ├── api/velt/token/route.ts          # Demo JWT token endpoint
│   ├── document/                        # Demo document context
│   ├── userAuth/                        # Demo random user auth
│   ├── layout.tsx                       # App layout and Nutrient CDN script
│   └── page.tsx                         # VeltProvider + demo canvas
├── components/
│   ├── document/
│   │   ├── NutrientComponent/
│   │   │   ├── NutrientComponent.tsx    # Nutrient viewer with Velt integration
│   │   │   ├── constants.ts             # PDF URL, editor id, page nav
│   │   │   ├── types.ts                 # Demo component types
│   │   │   └── ui/AddCommentToolbar.tsx # Selection bubble comment button
│   │   └── document-canvas.tsx          # Shared sample-app shell
│   ├── header/                          # Top-right Velt tool chrome
│   ├── sidebar/                         # Collapsible page navigation
│   ├── theme/                           # Light/dark theme controls
│   └── velt/                            # Velt collaboration setup
├── public/
│   ├── icons/
│   └── velt-test-document.pdf           # Bundled PDF fixture
├── styles/globals.css                   # App, viewer, and highlight styles
├── .npmrc                               # pnpm config to prevent Tailwind v4 hoisting
├── next.config.js
├── package.json
└── tsconfig.json
```

## Core Packages

- `@nutrient-sdk/viewer` `1.15.1`
- `@veltdev/react`
- `@veltdev/nutrient-velt-comments`

This demo is scoped to Nutrient. It does not include dependencies from other editor demos.

## Running Locally

From the sample-apps repo root:

```bash
pnpm install
pnpm --filter @apps/react-text-editors-nutrient-nutrient-comments-demo dev
```

Production build:

```bash
pnpm --filter @apps/react-text-editors-nutrient-nutrient-comments-demo build
```

## Integration Notes

- `app/layout.tsx` loads the Nutrient Web SDK CDN script because the viewer is browser-only.
- `components/document/document-canvas.tsx` uses `next/dynamic` with `ssr: false`.
- `NutrientVeltComments.configure({ editorId }).attach(instance)` wires Velt comments to the ready Nutrient instance.
- The selection bubble is a UI shell only; selection capture, annotation creation, durable anchors, and highlight rendering come from `@veltdev/nutrient-velt-comments`.
- `captureSelection(instance)` preserves the current Nutrient text selection before toolbar clicks can clear it.
- `addComment({ instance })` creates a Velt comment annotation for the captured Nutrient selection.
- `renderComments({ instance, commentAnnotations })` renders Velt comment overlays inside the Nutrient viewer.
- `VeltComments` is rendered with `textMode={false}` so the Nutrient package owns text-comment rendering.

## Environment Variables

This demo follows the existing sample-app pattern and includes demo Velt credentials in `app/page.tsx` and `app/api/velt/token/route.ts`. Replace those values with your own Velt API key and auth token before adapting this demo for another project.

The Nutrient license key is optional:

```bash
NEXT_PUBLIC_NUTRIENT_LICENSE_KEY=your_nutrient_license_key
```

Without a Nutrient license key, the viewer may run in trial mode.

## Important Configuration

### `.npmrc` File

This demo includes a `.npmrc` file that prevents pnpm from hoisting Tailwind CSS v4 from other workspace packages:

```txt
public-hoist-pattern[]=*
public-hoist-pattern[]=!tailwindcss
shamefully-hoist=false
```

This matters because the demo uses Tailwind CSS v3.4.x with traditional PostCSS configuration. Do not delete `.npmrc`; it keeps this demo aligned with the other text-editor sample apps.

## Troubleshooting

### Nutrient Viewer Does Not Load

1. Confirm the CDN script in `app/layout.tsx` is reachable.
2. Confirm the PDF exists at `/velt-test-document.pdf`.
3. Check the browser console for Nutrient license, network, or CSP errors.

### Velt Comments Do Not Appear

1. Confirm the demo Velt API key and auth token in `app/page.tsx` and `app/api/velt/token/route.ts` are valid.
2. Confirm the demo user is initialized and the document is registered with Velt.
3. Select text in the PDF before using either Add Comment entry point.
4. Confirm `NutrientVeltComments.configure(...).attach(instance)` runs after `NutrientViewer.load(...)` resolves.
5. Confirm `renderComments()` receives the same Nutrient instance that was attached.

## References

- [Nutrient Web SDK Documentation](https://www.nutrient.io/guides/web/)
- [Velt Nutrient Comments Guide](https://docs.velt.dev/async-collaboration/comments/setup/nutrient)
