'use client';

import { useEffect } from 'react';
import { useLiveStateSyncUtils } from '@veltdev/react';

/**
 * [Velt] Enables Single Editor Mode for the document.
 *
 * - customMode: true — TipTap/ProseMirror manages its own contenteditable, so we
 *   gate editing ourselves with editor.setEditable() (see TipTapComponent) instead
 *   of letting the SDK auto-disable DOM elements.
 * - singleTabEditor: false — the master sample app shows this demo as two iframes
 *   inside one browser tab; tab-locking would fight that layout.
 */
export default function VeltSingleEditorMode() {
  // [Velt] Live State Sync element hosts all Single Editor Mode APIs
  const liveStateSyncElement = useLiveStateSyncUtils();

  useEffect(() => {
    if (!liveStateSyncElement) return;

    // [Velt] Turn on Single Editor Mode
    liveStateSyncElement.enableSingleEditorMode({
      customMode: true,
      singleTabEditor: false,
    });

    // [Velt] Show Velt's built-in panel UI (request / accept / reject / countdown)
    liveStateSyncElement.enableDefaultSingleEditorUI();

    // [Velt] Scope Single Editor Mode to the document container only
    liveStateSyncElement.singleEditorModeContainerIds(['document-editor']);

    // [Velt] If the editor ignores an access request, auto-transfer after 15s
    liveStateSyncElement.setEditorAccessTimeout(15);
    liveStateSyncElement.enableEditorAccessTransferOnTimeOut();

    return () => {
      // [Velt] Clean up Single Editor Mode on unmount
      liveStateSyncElement.disableSingleEditorMode();
    };
  }, [liveStateSyncElement]);

  return null;
}
