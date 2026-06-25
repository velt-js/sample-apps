# Velt Demo Creation Handoff and Playbook

**Last updated:** 2026-06-25
**Owner:** yoen@velt.dev (GitHub `yoen-velt`)

## Purpose

This is the repeatable process for creating or polishing a Velt integration demo. A complete demo usually has two deliverables:

1. A docs page in `/Users/yoenzhang/Downloads/docs`.
2. A sample app in `/Users/yoenzhang/Downloads/sample-apps`, registered in `apps/master-sample-app`.

Do not commit, push, deploy, or create PRs unless the user explicitly asks.

## Repos

| Deliverable | Repo | Local path |
|---|---|---|
| Docs | `velt-js/docs` | `/Users/yoenzhang/Downloads/docs` |
| Sample apps | `velt-js/sample-apps` | `/Users/yoenzhang/Downloads/sample-apps` |

## Start Every Run

1. Read the source integration docs first, especially any `INTEGRATION.md` in the package repo.
2. Read the closest existing docs pages and sample apps before editing.
3. Prefer cloning a sibling demo over scaffolding from scratch.
4. Keep edits scoped to the new integration and its master-app registration.
5. Run verification before final handoff.

For text-editor comment demos, compare against these docs and demos before writing:

- Docs: Tiptap, SlateJS, CodeMirror, Lexical setup pages.
- Apps: `apps/react/comments/text-editors/tiptap`, `slatejs`, `codemirror`, `lexical`, and `quill`.

## Naming and Taxonomy

Sample app path:

```text
apps/<framework>/<feature>/<document>/<library>/<demo>/
```

Example for DraftJS comments:

```text
apps/react/comments/text-editors/draftjs/draftjs-comments-demo
```

Derived names must stay consistent:

| Thing | Rule | DraftJS example |
|---|---|---|
| Package name | Match the nearest sibling demo convention. Text-editor comment demos omit the `comments` path segment. | `@apps/react-text-editors-draftjs-draftjs-comments-demo` |
| Master id | route path segments joined with hyphens | `react-comments-text-editors-draftjs-draftjs-comments-demo` |
| Master routePath | folder path without `apps` | `/react/comments/text-editors/draftjs/draftjs-comments-demo` |
| Vercel URL | `sample-apps-<demo>.vercel.app` | `sample-apps-draftjs-comments-demo.vercel.app` |

Always confirm deployed Vercel hostnames with `curl -I`. Vercel may truncate long project names.

## Docs Page Rules

### Location

Text editor comment setup pages live in:

```text
/Users/yoenzhang/Downloads/docs/async-collaboration/comments/setup/<library>.mdx
```

Register the page in `/Users/yoenzhang/Downloads/docs/docs.json`.

### Structure for Text Editor Setup Pages

Use the same structure as CodeMirror, SlateJS, Tiptap, and Lexical:

```mdx
---
title: "<Library> Setup"
---

![](/gifs/Add-Text-Comments.gif)

## Setup

#### Step 1: Add Comment components
#### Step 2: Install the Velt <Library> extension
#### Step 3: Create a <Library> editor component with Velt Comments
#### Step 4: Add a comment button
#### Step 5: Call `addComment` to add a comment
#### Step 6: Render comments in <Library> editor
#### Step 7: Export content without Velt comment entities (optional)
#### Step 8: Style the commented text

## Complete Example

<Frame>
  <iframe src="https://sample-apps-<demo>.vercel.app/" className="w-full" height="500px" />
</Frame>

## APIs
```

### Docs Alignment Requirements

- Frontmatter should be `title:` only unless neighboring pages require more.
- Keep the hero GIF at the top.
- Step 1 should use the short provider snippet used by neighboring pages:
  ```jsx
  import { VeltComments } from '@veltdev/react';

  <VeltComments textMode={false} />
  ```
- Use `textMode={false}` for editor-specific text-comment integrations.
- Wrap API examples in `<Tabs>` and `<Tab title="React / Next.js">`, even for React-only integrations, so layout matches neighboring pages.
- Link API headings and model types to `/api-reference/...` anchors, matching neighboring setup pages.
- If the integration exposes public helper APIs or request/props models and those anchors do not exist yet, add them in the same run:
  - Add API entries to `/Users/yoenzhang/Downloads/docs/api-reference/sdk/api/api-methods.mdx`.
  - Add request/config/props/data-model entries to `/Users/yoenzhang/Downloads/docs/api-reference/sdk/models/data-models.mdx`.
  - Link the setup page API headings to `api-methods.mdx`.
  - Link setup page params, props, config, return types, and model mentions to `data-models.mdx`.
  - Link API-reference entries back to the setup page's detailed API sections.
- Do not leave API headings or model names as plain text just because the API reference entry is missing. Create the missing reference entry unless the integration has no public API surface to document.
- Never add guessed or broken anchors. Check the actual generated heading slugs, especially when repeated names like `addComment()` or `AddCommentRequest` create numbered anchors.
- Keep optional persistence wording parallel across editor pages. For example, DraftJS should use `Export content without Velt comment entities (optional)` because it exports clean DraftJS content.
- Prefer `velt-comment-text[comment-available="true"]` for text editor comment highlighting unless the package docs intentionally require broad `velt-comment-text`.
- Keep code examples focused and copy-pasteable. Avoid unused variables in snippets.

### Integration-Specific Docs Notes

Use the current wrapper API from the integration package docs. For example, the DraftJS package currently uses:

- `DraftJSVeltEditor`
- `addComment`
- `renderComments`
- `exportContentStateWithoutComments`
- `useCommentAnnotations` from `@veltdev/react`

When the integration receives an editor wrapper object, prefer a stable editor ref in examples when calling `renderComments` so the effect depends on annotations, not every editor-state update. DraftJS example:

```jsx
const editorRef = useRef({ editorState, setEditorState });

useEffect(() => {
  editorRef.current = { editorState, setEditorState };
}, [editorState]);

useEffect(() => {
  renderComments({
    editor: editorRef.current,
    editorId: 'EDITOR_ID',
    commentAnnotations: annotations ?? [],
  });
}, [annotations]);
```

For editor integrations where button focus clears the active text selection, preserve selection with `onMouseDown`. DraftJS example:

```jsx
<button
  onMouseDown={(event) => event.preventDefault()}
  onClick={() => addComment({ editor: editorRef.current })}
>
  Add Comment
</button>
```

Keep this event pattern consistent everywhere on the page. `onMouseDown` should preserve selection only; the actual comment action should run from `onClick` unless the source integration docs explicitly require a different event.

### Docs Verification

Run:

```bash
cd /Users/yoenzhang/Downloads/docs
node -e "JSON.parse(require('fs').readFileSync('docs.json','utf8')); console.log('docs.json ok')"
```

Validate new setup/API/data-model cross-links before handing off. This catches duplicate-heading anchors such as `addcomment-8` or `rendercommentsrequest-7`:

```bash
cd /Users/yoenzhang/Downloads/docs
node <<'NODE'
const fs = require('fs');

function slugify(heading) {
  return heading
    .toLowerCase()
    .trim()
    .replace(/<[^>]*>/g, '')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/&[a-z]+;/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

function collectAnchors(file) {
  const counts = new Map();
  const anchors = new Set();

  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const match = /^(#{2,6})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const base = slugify(match[2]);
    const count = counts.get(base) || 0;
    counts.set(base, count + 1);
    anchors.add(count === 0 ? base : `${base}-${count}`);
  }

  return anchors;
}

const apiAnchors = collectAnchors('api-reference/sdk/api/api-methods.mdx');
const modelAnchors = collectAnchors('api-reference/sdk/models/data-models.mdx');

const required = [
  // Replace these examples with the anchors added for the current integration.
  ['api', 'addcomment-8', apiAnchors],
  ['models', 'addcommentrequest-7', modelAnchors],
];

for (const [file, anchor, anchors] of required) {
  if (!anchors.has(anchor)) {
    console.error(`${file}#${anchor}: missing`);
    process.exitCode = 1;
  } else {
    console.log(`${file}#${anchor}: ok`);
  }
}
NODE
```

If the repo has a docs preview available, also run Mintlify locally and confirm the page renders in the sidebar.

## Sample App Creation

### Clone a Sibling Demo

Do not use the bare demo scaffold for real demos. Clone the closest sibling:

```bash
cd /Users/yoenzhang/Downloads/sample-apps
rsync -a \
  --exclude node_modules \
  --exclude .next \
  --exclude .turbo \
  --exclude .DS_Store \
  apps/react/comments/text-editors/<sibling>/<sibling-comments-demo>/ \
  apps/react/comments/text-editors/<library>/<library-comments-demo>/
```

DraftJS example:

```bash
cd /Users/yoenzhang/Downloads/sample-apps
rsync -a \
  --exclude node_modules \
  --exclude .next \
  --exclude .turbo \
  --exclude .DS_Store \
  apps/react/comments/text-editors/lexical/lexical-comments-demo/ \
  apps/react/comments/text-editors/draftjs/draftjs-comments-demo/
```

### Rename Checklist

After cloning, update:

- `package.json` name and dependencies.
- `app/layout.tsx` metadata.
- `app/userAuth/AppUserContext.tsx` storage key.
- `app/document/DocumentContext.tsx` document-id storage key and `documentName`.
- `README.md`.
- Any route, title, or old-library strings.

Then run a sweep:

```bash
rg -n "<old-library>|<OldLibrary>|<old-package-name>" \
  apps/react/comments/text-editors/<library>/<library-comments-demo> \
  -g '!node_modules' -g '!.next'
```

Expected result: no copied editor folders, no copied editor dependencies, and no stale old-library references.

### Dependency Rules

- Keep `next` and React versions aligned with sibling demos.
- Keep `@veltdev/react` and `@veltdev/types` aligned with the integration package requirements and nearby demos.
- Audit `@veltdev/client`: keep it only if the app, package, or parity convention needs it. If the demo does not directly import it, note why it remains or remove it.
- Never leave dependencies from the cloned editor if the new demo does not use them.

### Required Config Files

Each demo should have:

```text
.npmrc
next.config.js
tsconfig.json
tailwind.config.js
postcss.config.js
```

`.npmrc` must match:

```text
public-hoist-pattern[]=*
public-hoist-pattern[]=!tailwindcss
shamefully-hoist=false
```

`next.config.js` should keep:

- `reactStrictMode: false`
- CSP allowing the master app to iframe the demo.
- A correct workspace root for the app depth.

If an integration package is browser-only or SSR-incompatible, isolate the editor component with a client-only dynamic import:

```tsx
import dynamic from 'next/dynamic'

const EditorComponent = dynamic(() => import('./EditorComponent'), {
  ssr: false,
})
```

If an integration package fails under Turbopack or server-side evaluation, use webpack scripts. DraftJS is one known example:

```json
{
  "scripts": {
    "dev": "next dev --webpack",
    "build": "next build --webpack",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## Velt Setup Requirements

Every React sample should include:

- `VeltProvider` with `authProvider`.
- `VeltInitializeUser` using auth-provider token generation.
- `/api/velt/token/route.ts` for JWT generation.
- `VeltInitializeDocument` waiting for `useCurrentUser()` before calling `setDocuments`.
- `VeltCollaboration` mounting `VeltComments textMode={false}` for text-editor comment integrations.
- `VeltCommentsSidebar` and relevant tools/customization components.

Do not switch to older `useIdentify` patterns unless the user explicitly asks.

## Text Editor Demo Requirements

Keep the editor integration focused on the package being demonstrated:

- Use the package's official editor wrapper or plugin API.
- Use the package's documented `addComment` flow.
- Use the package's documented `renderComments` or annotation-rendering flow.
- Use the package's documented clean-content export or comment-mark persistence flow before saving app content.
- Use `onMouseDown={(event) => event.preventDefault()}` on comment buttons when the editor loses selection on button focus.
- Preserve scroll position when adding a comment if the toolbar action can move focus.
- Keep the editor placeholder aligned with sibling demos: `Start typing...`.

DraftJS example:

- `DraftJSVeltEditor`
- `addComment({ editor, editorId })`
- `renderComments({ editor, editorId, commentAnnotations })`
- `exportContentStateWithoutComments` before saving raw DraftJS content

### Shared Text-Editor Content Parity

New text-editor demos should use the same full sample document family as TipTap, Lexical, SlateJS, and Quill, not a shortened version.

Represent the shared content using the target editor's native document model. Map structure as closely as the editor reasonably allows:

- Title block for the title.
- Major heading blocks for major sections.
- Subheading blocks for subsections such as `Encoder and Decoder Stacks`.
- Paragraph blocks for body copy.
- Blockquote only where a sibling demo does.
- Bold marks/ranges for useful parity labels like `Encoder:` and reference numbers where practical.
- Include author affiliations, h3 subsections, acknowledgements, and full references when siblings include them.

Do not change the Velt integration while updating sample content unless testing surfaces a real bug.

When changing DraftJS `initialContent`, also bump `DRAFTJS_CONTENT_STORAGE_KEY` in `components/document/DraftJSComponent/constants.ts`. The demo persists edited DraftJS content in `localStorage`, so old browser state can keep rendering shortened or stale text even after the source content is fixed. The current DraftJS demo uses `draftjs-comments-demo-content-v2` for the aligned full sample document.

## README Requirements

The demo README should be as complete as sibling text-editor readmes:

- Clear title and live demo URL.
- Folder path and package name.
- Feature list.
- Directory tree that includes `app/api/velt/token/route.ts`, `app/document`, `app/userAuth`, `components/document/<EditorComponent>`, `components/velt`, `styles`, and config files.
- Installation and dev command.
- Production build command.
- `.npmrc` snippet matching the real file.
- Integration points explaining the editor wrapper/plugin, `addComment`, `renderComments` or equivalent annotation rendering, clean-content export or comment-mark persistence, `VeltComments textMode={false}`, and auth/document setup.
- Troubleshooting, including a clear "Velt not loading" note: verify API key, auth token route, document initialization, and browser console/network errors.

## Master Sample App Registration

All master registration files live under:

```text
/Users/yoenzhang/Downloads/sample-apps/apps/master-sample-app
```

Add:

- `samples/<demo>/metadata.ts`
- `samples/<demo>/code-files.ts`
- `generated/<demo>.json`
- imports and `SAMPLES` entry in `samples/index.ts`

### Metadata

Use lowercase route/title segments to match existing text-editor entries. DraftJS example:

```ts
import { SampleMetadata } from '@/types/sample'

const metadata: SampleMetadata = {
  id: 'react-comments-text-editors-draftjs-draftjs-comments-demo',
  title: 'react / comments / text-editors / draftjs / draftjs-comments-demo',
  category: 'feature',
  section: 'draftjs',
  iframeUrl: 'https://sample-apps-draftjs-comments-demo.vercel.app',
  iframeUrl2: 'https://sample-apps-draftjs-comments-demo-velt-team-eng.vercel.app',
  githubUrl: 'https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/text-editors/draftjs/draftjs-comments-demo',
  githubRepoPath: 'velt-js/sample-apps',
  displayMode: 'dual',
  isDefault: false,
  routePath: '/react/comments/text-editors/draftjs/draftjs-comments-demo',
}

export default metadata
```

### Code Viewer JSON

`code-files.ts` should import `../../generated/<demo>.json` plus one `?raw` import per source file. The JSON is what the code viewer renders.

If you edit a displayed file after the JSON has been generated, update the JSON too. For example, after bumping the DraftJS content storage key or changing `initialContent`, sync `apps/master-sample-app/generated/draftjs-comments-demo.json` so `draftjsConstantsContent` matches `components/document/DraftJSComponent/constants.ts`.

After editing any displayed source file, regenerate the JSON manually:

```bash
cd /Users/yoenzhang/Downloads/sample-apps
node <<'NODE'
const fs = require('fs');
const path = require('path');
const demo = '<library-comments-demo>';
const base = path.resolve(`apps/master-sample-app/samples/${demo}`);
const src = fs.readFileSync(path.join(base, 'code-files.ts'), 'utf8');
const out = {};
const importRe = /import\s+(\w+)\s+from\s+'(\.\.\/\.\.\/\.\.\/react\/.+?)\?raw'/g;
let match;
while ((match = importRe.exec(src))) {
  const [, variable, rel] = match;
  out[variable] = fs.readFileSync(path.resolve(base, rel), 'utf8');
}
fs.writeFileSync(
  path.resolve(`apps/master-sample-app/generated/${demo}.json`),
  `${JSON.stringify(out, null, 2)}\n`
);
console.log(`${Object.keys(out).length} files written`);
NODE
```

### Thumbnail Rule

Do not copy a sibling thumbnail unless the new integration has a real dedicated thumbnail.

If there is no dedicated thumbnail:

- Do not add the library to `COMMENT_LIBS` in `apps/master-sample-app/lib/thumbnails.ts`.
- Do not add `public/thumbnails/comment-<library>.svg`.
- Let `DemoCard` use the existing generic framework placeholder.

For example, DraftJS should use the generic placeholder unless a proper DraftJS thumbnail is created.

### Master Build

Run:

```bash
cd /Users/yoenzhang/Downloads/sample-apps/apps/master-sample-app
pnpm build
```

This runs `next build --webpack`. The master app uses raw code-viewer imports, so webpack is required.

## Verification Checklist

### Docs

- [ ] `docs.json` parses.
- [ ] New setup page appears in the text-editor setup nav group.
- [ ] Page structure matches CodeMirror, SlateJS, Tiptap, and Lexical.
- [ ] API examples are tabbed.
- [ ] Public helper APIs are listed in `api-methods.mdx`.
- [ ] Public request/config/props models are listed in `data-models.mdx`.
- [ ] Setup API headings link to `api-methods.mdx`.
- [ ] Setup params, props, config, return types, and model mentions link to `data-models.mdx`.
- [ ] API-reference entries link back to the setup page.
- [ ] Generated anchors are validated; no guessed or broken API reference links.

### Demo

- [ ] No copied editor folders are present under `components/document`.
- [ ] No dependencies from the cloned editor remain in `package.json`.
- [ ] `.npmrc` matches the expected hoist guard.
- [ ] README directory tree and troubleshooting are complete.
- [ ] Placeholder is `Start typing...`.
- [ ] Initial content matches sibling text-editor sample content depth.
- [ ] Velt editor integration remains untouched unless testing finds a bug.

### Commands

Run from the sample-apps repo root unless noted:

```bash
pnpm install
pnpm --filter @apps/<package-name> build
cd apps/react/comments/text-editors/<library>/<library-comments-demo> && pnpm exec tsc --noEmit
cd /Users/yoenzhang/Downloads/sample-apps/apps/master-sample-app && pnpm build
```

For local browser smoke testing:

```bash
cd /Users/yoenzhang/Downloads/sample-apps/apps/react/comments/text-editors/<library>/<library-comments-demo>
pnpm exec next dev --hostname 127.0.0.1 --port 3124
```

If the integration needs webpack, add `--webpack` before `--hostname`. DraftJS is one known example.

DraftJS command examples:

```bash
pnpm --filter @apps/react-text-editors-draftjs-draftjs-comments-demo build
cd apps/react/comments/text-editors/draftjs/draftjs-comments-demo && pnpm exec tsc --noEmit
cd apps/react/comments/text-editors/draftjs/draftjs-comments-demo && pnpm exec next dev --webpack --hostname 127.0.0.1 --port 3124
```

Then verify:

- Page returns `GET / 200`.
- `/api/velt/token` returns `200`.
- Editor hydrates and exposes the expected editable root.
- `velt-comments` is mounted.
- Browser console has no errors.

Stop the dev server after verification unless the user explicitly wants it kept running.

## Common Gotchas

- `generate-code-files.js` skips samples that already import generated JSON. Regenerate JSON manually after displayed-source edits.
- DraftJS can appear to show the wrong sample document because it restores previous editor content from `localStorage`. When aligning the visible text with sibling demos, bump the DraftJS content storage key and refresh/reload before judging the rendered copy.
- `tsc` can collide with `next build` if run in parallel because `.next/types` is regenerated. Run them sequentially.
- Browser-only editor packages may SSR-fail even when the client appears to hydrate. Check server logs for `GET / 500`, not just browser DOM.
- For integrations like DraftJS that SSR-fail, dynamic-import the editor component with `ssr: false` and use webpack scripts.
- Master app builds with webpack. Do not switch it to Turbopack.
- Do not stage unrelated generated files such as `next-env.d.ts` unless the user asked.
- Vercel `-velt-team-eng` URLs can be behind SSO deployment protection. Confirm with `curl`.

## Final Handoff Format

When done, report:

- Files changed in docs repo.
- Files changed in sample-apps repo.
- Verification commands and results.
- Any skipped checks and why.
- Whether dev servers are stopped or still running.
