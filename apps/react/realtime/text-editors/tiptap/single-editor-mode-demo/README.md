# Single Editor Mode Demo

> **[🚀 View Live Demo](https://sample-apps-single-editor-mode-demo.vercel.app/)**

## Overview

This demo showcases **Velt Single Editor Mode** on a Microsoft-Word-style document editor built with **TipTap**. Exactly one user can edit the document at a time while everyone else views it in read-only mode. Edit access can be passed between users with a request / accept / reject flow.

Content stays live for viewers via **Velt's CRDT extension** (based on Yjs): while the editor types, every viewer sees the changes in real time even though their own input is locked.

## Path

```
apps/react/realtime/text-editors/tiptap/single-editor-mode-demo/
```

## Package Name

`@apps/react-realtime-text-editors-tiptap-single-editor-mode-demo`

## Features

### Single Editor Mode
- **One editor at a time**: `enableSingleEditorMode` locks the document for everyone except the current editor
- **Start editing**: any user can claim the editor role with `setUserAsEditor` when nobody is editing
- **Access handoff**: viewers request edit access; the editor accepts or rejects via Velt's default Single Editor Mode panel (`VeltSingleEditorModePanel`)
- **Role indicator**: a custom header chip built with `useUserEditorState` and the Velt `useEditor` hook shows who is editing
- **Auto transfer on timeout**: if the editor ignores a request, access transfers automatically after a countdown

### Real-time Collaboration
- **Live content for viewers**: Velt CRDT keeps every viewer's document in sync with the editor
- **Presence**: see who is online
- **Huddle**: start audio/video calls with other users

### Comments & Notifications
- **Text comments**: select text and comment via the bubble menu (`@veltdev/tiptap-velt-comments`)
- **Comments sidebar**: browse and manage all comment threads
- **Notifications**: in-app notification panel with For You / Documents / All tabs

## Running Locally

```bash
pnpm install
pnpm --filter @apps/react-realtime-text-editors-tiptap-single-editor-mode-demo dev
```

Open the same `?documentId=` URL in two browser profiles (or the master sample app's dual view) to test the handoff flow.

## Environment Variables

The demo ships with shared demo credentials hardcoded. To use your own, replace the API key in `app/page.tsx` and the key/token in `app/api/velt/token/route.ts` with values from [console.velt.dev](https://console.velt.dev).

## About Velt SDK

Velt provides a complete toolkit for adding collaboration features to your app: comments, presence, cursors, recording, huddles, notifications, and real-time state sync. Learn more at [velt.dev](https://velt.dev) and [docs.velt.dev](https://docs.velt.dev).
