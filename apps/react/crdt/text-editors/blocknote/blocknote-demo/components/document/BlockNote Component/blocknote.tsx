'use client'
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from "@blocknote/mantine";
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from "@blocknote/react";
import { useVeltBlockNoteCrdtExtension } from "@veltdev/blocknote-crdt-react";
import React from "react";

const BlockNoteCollaborativeEditor: React.FC = () => {

  const { collaborationConfig, isLoading } = useVeltBlockNoteCrdtExtension({
    editorId: 'velt-blocknote-crdt-demo-28-aug-2-default',
    initialContent: JSON.stringify([{ type: "paragraph", content: "" }])
  });

  // Now call the hook at top level with the config
  const editor = useCreateBlockNote({
    collaboration: collaborationConfig,
    // Add any other static options here
  }, [collaborationConfig]); // Deps ensure re-init if config changes

  return (
    <>
      <div className="editor-container">
        <div className="editor-content">
          <BlockNoteView editor={editor} key={collaborationConfig ? 'collab-on' : 'collab-off'} />
        </div>
        <div className="status">
          {!isLoading ? 'Connected to collaborative session' : 'Connecting to collaborative session...'}
        </div>
      </div>
    </>
  );
};

export default BlockNoteCollaborativeEditor;