# Recorder Demo — Async Design Review

## Overview

This demo showcases the **Velt Recorder** — async audio, video, and screen recording built into a product app. The scenario is an **async design review**: a "Q3 Launch — Product Spec" document where reviewers record walkthrough feedback instead of scheduling a meeting. Recordings can be pinned to the page, and every recording lands in a **Recordings panel** with playback, a transcript, an **AI summary**, and the beta **video editor**.

## Path

```
apps/react/recorder/document/custom/recorder-demo/
```

## Package Name

`@apps/react-recorder-document-custom-recorder-demo`

## Features

### Recorder
- **All three media types** — `<VeltRecorderTool type="all" />` lets the reviewer choose audio, video, or screen when starting a recording.
- **Floating control panel** — `<VeltRecorderControlPanel mode="floating" />` shows the live preview and pause/stop/cancel controls while recording.
- **Pinned recorder notes** — `<VeltRecorderNotes />` renders recordings pinned to locations on the document.
- **Live recordings panel** — `useRecordings()` provides a live list of every recording on the document, re-emitting on add and delete.
- **Playback + AI summary** — `<VeltRecorderPlayer recorderId summary videoEditor />` plays each recording; the AI content summary renders once transcription completes.
- **Transcription, video editor, countdown** — enabled globally via `useRecorderUtils()` (`enableRecordingTranscription()`, `enableVideoEditor()`, `enableRecordingCountdown()`).
- **Delete recordings** — `recorderElement.deleteRecordings({ recorderIds })` with an inline confirm; the panel updates automatically.

### Document
- A clean spec/article page (title, status badge, review toolbar, design mockup placeholders) designed to invite recorded feedback.
- Light/dark theme toggle, presence avatars, and notifications (shared Velt scaffold).

## Key Files

| File | Purpose |
|------|---------|
| `components/velt/VeltRecorderConfig.tsx` | Global recorder config: transcription, video editor, countdown |
| `components/velt/VeltTools.tsx` | `VeltRecorderTool type="all"` + floating `VeltRecorderControlPanel` |
| `components/recordings/RecordingsPanel.tsx` | Always-mounted drawer: `useRecordings()` list, `VeltRecorderPlayer`, delete |
| `components/document/document-canvas.tsx` | Layout + `VeltRecorderNotes` for pinned recordings |
| `components/document/DocumentArticle.tsx` | The "Q3 Launch — Product Spec" review document |

## Key Technologies

- **Next.js 16** with React 19
- **@veltdev/react** `5.0.2-beta.34` — Recorder components + hooks
- **Tailwind CSS v3.4** — styling
- **TypeScript**

## Getting Started

From the monorepo root:

```bash
pnpm install
```

Run the demo:

```bash
cd apps/react/recorder/document/custom/recorder-demo
pnpm dev
```

Or from the root:

```bash
pnpm --filter @apps/react-recorder-document-custom-recorder-demo dev
```

Open [http://localhost:3000](http://localhost:3000) and grant microphone / camera / screen permissions when prompted (recording requires `localhost` or HTTPS). To see recordings sync between users, open the same `?documentId=...` URL in two browser profiles signed in as different users.

## About Velt SDK

<a href="https://npmjs.org/package/@veltdev/react">
  <img src="https://img.shields.io/npm/v/@veltdev/react?style=flat&label=npm&color=09f" alt="NPM" />
</a>

With Velt SDK you can add powerful collaboration features to your product extremely fast.

### Resources
- 📚 [Documentation](https://docs.velt.dev/get-started/overview)
- 🎥 [Recorder](https://docs.velt.dev/async-collaboration/recorder/overview)
- 🎨 [Use Cases](https://velt.dev/use-case)
