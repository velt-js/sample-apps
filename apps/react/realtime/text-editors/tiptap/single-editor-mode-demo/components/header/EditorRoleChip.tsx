'use client';

import { useState } from 'react';
import {
  useLiveStateSyncUtils,
  useUserEditorState,
  // [Velt] Alias required: @tiptap/react also exports a useEditor hook
  useEditor as useVeltEditor,
} from '@veltdev/react';

/**
 * [Velt] Custom Single Editor Mode role indicator + actions for the app header.
 * Velt's default panel (VeltSingleEditorModePanel) handles the request banner,
 * accept/reject and countdown UI; this chip reflects role state in the host app
 * and offers the explicit actions: claim, request, release.
 */
export default function EditorRoleChip() {
  const liveStateSyncElement = useLiveStateSyncUtils();
  // [Velt] { isEditor, isEditorOnCurrentTab } for the current user
  const editorState = useUserEditorState();
  // [Velt] The user currently holding the editor role (null when nobody edits)
  const editorUser = useVeltEditor();
  const [requestPending, setRequestPending] = useState(false);

  const isEditor = !!editorState?.isEditor;
  const editorName = editorUser?.name || editorUser?.email || 'Someone';

  const chipStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 6px 4px 12px',
    borderRadius: '23px',
    border: '1px solid var(--app-border, rgba(128,128,128,0.3))',
    background: 'var(--app-surface, transparent)',
    color: 'var(--app-text-primary, inherit)',
    fontSize: '13px',
    whiteSpace: 'nowrap',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '4px 10px',
    borderRadius: '17px',
    border: 'none',
    background: '#6366f1',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
  };

  // [Velt] Editor holds the role but is active in a different tab
  if (isEditor && editorState?.isEditorOnCurrentTab === false) {
    return (
      <div style={chipStyle}>
        <span>Editing in another tab</span>
        {/* [Velt] Move the editor role to this tab */}
        <button style={buttonStyle} onClick={() => liveStateSyncElement?.editCurrentTab()}>
          Edit here
        </button>
      </div>
    );
  }

  if (isEditor) {
    return (
      <div style={chipStyle}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
          You are editing
        </span>
        {/* [Velt] Give up the editor role so anyone can claim it */}
        <button style={buttonStyle} onClick={() => liveStateSyncElement?.resetUserAccess()}>
          Release
        </button>
      </div>
    );
  }

  if (editorUser) {
    return (
      <div style={chipStyle}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#eab308' }} />
          {editorName} is editing
        </span>
        {requestPending ? (
          // [Velt] Withdraw a pending access request
          <button
            style={{ ...buttonStyle, background: 'transparent', color: 'var(--app-text-secondary, inherit)', border: '1px solid var(--app-border, rgba(128,128,128,0.3))' }}
            onClick={() => {
              liveStateSyncElement?.cancelEditorAccessRequest();
              setRequestPending(false);
            }}
          >
            Cancel request
          </button>
        ) : (
          // [Velt] Ask the current editor for edit access; the editor sees an
          // accept/reject banner via Velt's default Single Editor Mode UI
          <button
            style={buttonStyle}
            onClick={() => {
              setRequestPending(true);
              liveStateSyncElement?.requestEditorAccess()?.subscribe((status: unknown) => {
                // [Velt] status resolves when the request is accepted/rejected/expired
                if (status !== null && status !== undefined) setRequestPending(false);
              });
            }}
          >
            Request access
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={chipStyle}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--app-text-tertiary, #9ca3af)' }} />
        No one is editing
      </span>
      {/* [Velt] Claim the editor role with an explicit action */}
      <button style={buttonStyle} onClick={() => liveStateSyncElement?.setUserAsEditor()}>
        Start editing
      </button>
    </div>
  );
}
