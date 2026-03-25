'use client'
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from "@blocknote/mantine";
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from "@blocknote/react";
import { useCollaboration } from "@veltdev/blocknote-crdt-react";
import React from "react";
import { useTheme } from "@/components/theme/ThemeContext";
import { useCurrentDocument } from "@/app/document/useCurrentDocument";
import { blockNoteInitialContent } from "./constants";

function EditorWithCollaboration({ documentId }: { documentId: string }) {
  const { resolvedTheme } = useTheme();

  const {
    collaborationConfig,
    isLoading,
    isSynced,
    status,
    error,
  } = useCollaboration({
    editorId: documentId,
    initialContent: blockNoteInitialContent as any[],
    onError: (err) => console.error('Collaboration error:', err),
  });

  const editor = useCreateBlockNote(
    collaborationConfig
      ? { collaboration: collaborationConfig }
      : {},
    [collaborationConfig],
  );

  const statusDotColor =
    status === 'connected' ? (isSynced ? '#22c55e' : '#eab308') :
      status === 'connecting' ? '#eab308' : '#ef4444';

  const statusLabel =
    status === 'connected' ? (isSynced ? 'Synced' : 'Syncing\u2026') :
      status === 'connecting' ? 'Connecting\u2026' : 'Disconnected';

  if (error) {
    return (
      <div className="editor-container">
        <div className="flex items-center gap-1.5 px-4 pt-2">
          <span
            className="inline-block size-2 rounded-full shrink-0"
            style={{ backgroundColor: '#ef4444' }}
          />
          <span className="text-xs" style={{ color: '#ef4444' }}>
            Failed to initialize: {error.message}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="editor-container">
      <div className="flex items-center gap-1.5 px-4 pt-2">
        <span
          className="inline-block size-2 rounded-full shrink-0"
          style={{ backgroundColor: statusDotColor }}
        />
        <span className="text-xs" style={{ color: 'var(--app-text-tertiary)' }}>
          {statusLabel}
        </span>
      </div>
      <div className="editor-content">
        {editor && collaborationConfig ? (
          <BlockNoteView editor={editor} theme={resolvedTheme} />
        ) : (
          <div className="flex items-center justify-center h-full" style={{ color: 'var(--app-text-tertiary)' }}>
            {isLoading ? 'Connecting...' : 'Loading editor...'}
          </div>
        )}
      </div>
    </div>
  );
}

const BlockNoteCollaborativeEditor: React.FC = () => {
  const { documentId } = useCurrentDocument();

  if (!documentId) {
    return (
      <div className="editor-container">
        <div className="flex items-center justify-center h-full" style={{ color: 'var(--app-text-tertiary)' }}>
          Loading document...
        </div>
      </div>
    );
  }

  return <EditorWithCollaboration documentId={documentId} />;
};

export default BlockNoteCollaborativeEditor;
