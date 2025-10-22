'use client'

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useVeltEventCallback } from '@veltdev/react';
import { useVeltTiptapCrdtExtension } from '@veltdev/tiptap-crdt-react';
import React from 'react';
import './tiptap.css';

const TipTapEditor: React.FC = () => {
  const veltUser = useVeltEventCallback('userUpdate');
  const { VeltCrdt } = useVeltTiptapCrdtExtension({
    editorId: 'velt-tiptap-crdt-demo-1-3-sept-2025'
  });

  // Initialize the editor with our collaboration extension
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false, // Disable history when using CRDT
      }),
      ...(VeltCrdt ? [VeltCrdt] : []),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none',
      },
    },
  }, [VeltCrdt]);

  return (
    <div className="tiptap-editor-container">
      <div className="tiptap-editor-header">
        Collaborative Editor - {veltUser?.name ? `Editing as ${veltUser.name}` : 'Please login to start editing'}
      </div>
      <div className="tiptap-editor-content">
        <EditorContent editor={editor} />
      </div>
      <div className="tiptap-editor-header" style={{ borderTop: '1px solid #e1e5e9', borderBottom: 'none' }}>
        {VeltCrdt ? 'Connected to collaborative session' : 'Connecting to collaborative session...'}
      </div>
    </div>
  );
};

export default TipTapEditor;
