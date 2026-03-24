import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/js-codemirror-crdt-demo.json'

export const codeFiles: SampleCodeFile[] = [
  // Entry Point
  { path: 'apps/javascript/crdt/text-editors/codemirror/codemirror-crdt-demo/src/main.js', language: 'javascript', content: codeContent.mainContent },

  // Lib
  { path: 'apps/javascript/crdt/text-editors/codemirror/codemirror-crdt-demo/src/lib/velt.js', language: 'javascript', content: codeContent.veltContent },
  { path: 'apps/javascript/crdt/text-editors/codemirror/codemirror-crdt-demo/src/lib/user.js', language: 'javascript', content: codeContent.userContent },
  { path: 'apps/javascript/crdt/text-editors/codemirror/codemirror-crdt-demo/src/lib/document.js', language: 'javascript', content: codeContent.documentContent },

  // Document Components
  { path: 'apps/javascript/crdt/text-editors/codemirror/codemirror-crdt-demo/src/components/document/codemirror.js', language: 'javascript', content: codeContent.codemirrorContent },
  { path: 'apps/javascript/crdt/text-editors/codemirror/codemirror-crdt-demo/src/components/document/document-canvas.js', language: 'javascript', content: codeContent.documentCanvasContent },

  // Header & Sidebar
  { path: 'apps/javascript/crdt/text-editors/codemirror/codemirror-crdt-demo/src/components/header/header.js', language: 'javascript', content: codeContent.headerContent },
  { path: 'apps/javascript/crdt/text-editors/codemirror/codemirror-crdt-demo/src/components/sidebar/sidebar.js', language: 'javascript', content: codeContent.sidebarContent },

  // Velt Components
  { path: 'apps/javascript/crdt/text-editors/codemirror/codemirror-crdt-demo/src/components/velt/index.js', language: 'javascript', content: codeContent.veltIndexContent },
  { path: 'apps/javascript/crdt/text-editors/codemirror/codemirror-crdt-demo/src/components/velt/velt-collaboration.js', language: 'javascript', content: codeContent.veltCollaborationContent },
  { path: 'apps/javascript/crdt/text-editors/codemirror/codemirror-crdt-demo/src/components/velt/velt-initialize-user.js', language: 'javascript', content: codeContent.veltInitializeUserContent },
  { path: 'apps/javascript/crdt/text-editors/codemirror/codemirror-crdt-demo/src/components/velt/velt-initialize-document.js', language: 'javascript', content: codeContent.veltInitializeDocumentContent },
  { path: 'apps/javascript/crdt/text-editors/codemirror/codemirror-crdt-demo/src/components/velt/velt-tools.js', language: 'javascript', content: codeContent.veltToolsContent },

  // Velt UI Customization
  { path: 'apps/javascript/crdt/text-editors/codemirror/codemirror-crdt-demo/src/components/velt/ui-customization/styles.css', language: 'css', content: codeContent.veltUiStylesContent },

  // Global Styles
  { path: 'apps/javascript/crdt/text-editors/codemirror/codemirror-crdt-demo/styles/globals.css', language: 'css', content: codeContent.globalsCssContent },
  { path: 'apps/javascript/crdt/text-editors/codemirror/codemirror-crdt-demo/styles/codemirror.css', language: 'css', content: codeContent.codemirrorCssContent },
]
