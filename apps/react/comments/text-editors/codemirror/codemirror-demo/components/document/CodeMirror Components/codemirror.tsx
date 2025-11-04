// src/components/CodeMirror.tsx
import {
    autocompletion,
} from "@codemirror/autocomplete";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { EditorState } from "@codemirror/state";
import { useVeltCodeMirrorCrdtExtension } from '@veltdev/codemirror-crdt-react';
import { useVeltInitState } from "@veltdev/react";
import { basicSetup, EditorView } from "codemirror";
import React, { useEffect, useRef } from "react";
import { yCollab } from "y-codemirror.next";
import LoadingSpinner from './LoadingSpinner';

interface CodeMirrorProps {
    editorId: string;
    fileType: 'html' | 'css' | 'javascript' | 'typescript';
}

const CodeMirror: React.FC<CodeMirrorProps> = ({ editorId, fileType }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);

    const getLanguageExtension = (type: string) => {
        switch (type) {
            case 'html':
                return html();
            case 'css':
                return css();
            case 'javascript':
            case 'typescript':
            default:
                return javascript();
        }
    };

    const getFileTypeSubtitle = (id: string) => {
        if (id.includes('.html')) return '🌐 HTML Document';
        if (id.includes('.css')) return '🎨 Stylesheet';
        if (id.includes('.js')) return '📜 JavaScript';
        if (id.includes('.ts')) return '📘 TypeScript';
        return '';
    };

    const { store, isLoading } = useVeltCodeMirrorCrdtExtension({ editorId });

    useEffect(() => {
        if (!store || !editorRef.current) return;

        // Clean up existing view if any
        viewRef.current?.destroy();

        const startState = EditorState.create({
            doc: store.getYText()?.toString() ?? '',
            extensions: [
                basicSetup,
                getLanguageExtension(fileType),
                autocompletion(),
                yCollab(store.getYText()!, store.getAwareness(), { undoManager: store.getUndoManager() }),
            ],
        });

        viewRef.current = new EditorView({
            state: startState,
            parent: editorRef.current,
        });

        return () => {
            viewRef.current?.destroy();
            viewRef.current = null;
        };
    }, [store, fileType]);

    return (
        <div
            ref={editorRef}
            className="codemirror-container"
            style={{ position: 'relative', minHeight: '400px' }}
        >
            {isLoading && (
                <LoadingSpinner
                    loadingText={'Loading...'}
                    subtitle={getFileTypeSubtitle(editorId)}
                />
            )}
        </div>
    );
};

function CodeMirrorComponent({ editorId, fileType }: CodeMirrorProps) {
    const veltInitialized = useVeltInitState();

    if (!veltInitialized) {
        return (
            <div style={{
                position: 'relative',
                height: '100%',
                minHeight: '400px',
                width: '100%',
                flex: 1
            }}>
                <LoadingSpinner
                    loadingText="Initializing Velt collaboration..."
                    subtitle="🚀 Setting up real-time collaboration"
                    size="large"
                />
            </div>
        );
    }

    return (
        <>
            <CodeMirror editorId={editorId} fileType={fileType} />
        </>
    )
}

export default CodeMirrorComponent;
