import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/js-core-non-react-xml-crdt-demo.json'

export const codeFiles: SampleCodeFile[] = [
  // Entry Point
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-xml-crdt-demo/index.html', language: 'html', content: codeContent.indexHtmlContent },
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-xml-crdt-demo/src/main.js', language: 'javascript', content: codeContent.mainContent },

  // Lib
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-xml-crdt-demo/src/lib/velt.js', language: 'javascript', content: codeContent.veltContent },
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-xml-crdt-demo/src/lib/user.js', language: 'javascript', content: codeContent.userContent },
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-xml-crdt-demo/src/lib/document.js', language: 'javascript', content: codeContent.documentContent },
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-xml-crdt-demo/src/lib/theme.js', language: 'javascript', content: codeContent.themeContent },

  // Mind Map Editor
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-xml-crdt-demo/src/components/document/mind-map/mind-map-editor.js', language: 'javascript', content: codeContent.mindMapEditorContent },
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-xml-crdt-demo/src/components/document/mind-map/constants.js', language: 'javascript', content: codeContent.mindMapConstantsContent },
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-xml-crdt-demo/src/components/document/mind-map/mind-map-sidebar.js', language: 'javascript', content: codeContent.mindMapSidebarContent },

  // Document Canvas
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-xml-crdt-demo/src/components/document/document-canvas.js', language: 'javascript', content: codeContent.documentCanvasContent },

  // Header & Theme
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-xml-crdt-demo/src/components/header/header.js', language: 'javascript', content: codeContent.headerContent },
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-xml-crdt-demo/src/components/header/theme-toggle.js', language: 'javascript', content: codeContent.themeToggleContent },

  // Velt Components
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-xml-crdt-demo/src/components/velt/index.js', language: 'javascript', content: codeContent.veltIndexContent },
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-xml-crdt-demo/src/components/velt/velt-collaboration.js', language: 'javascript', content: codeContent.veltCollaborationContent },
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-xml-crdt-demo/src/components/velt/velt-tools.js', language: 'javascript', content: codeContent.veltToolsContent },

  // Velt UI Customization
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-xml-crdt-demo/src/components/velt/ui-customization/styles.css', language: 'css', content: codeContent.veltUiStylesContent },

  // Styles
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-xml-crdt-demo/styles/globals.css', language: 'css', content: codeContent.globalStylesContent },
]
