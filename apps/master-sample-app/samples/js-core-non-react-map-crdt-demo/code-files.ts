import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/js-core-non-react-map-crdt-demo.json'

// Import all code files using ?raw
import mainContent from '../../../javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/main.js?raw'
import veltContent from '../../../javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/lib/velt.js?raw'
import userContent from '../../../javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/lib/user.js?raw'
import documentContent from '../../../javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/lib/document.js?raw'
import themeContent from '../../../javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/lib/theme.js?raw'
import mapStoreEditorContent from '../../../javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/components/document/map-store/map-store-editor.js?raw'
import mapStoreSidebarContent from '../../../javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/components/document/map-store/map-store-sidebar.js?raw'
import constantsContent from '../../../javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/components/document/map-store/constants.js?raw'
import documentCanvasContent from '../../../javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/components/document/document-canvas.js?raw'
import headerContent from '../../../javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/components/header/header.js?raw'
import themeToggleContent from '../../../javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/components/header/theme-toggle.js?raw'
import veltIndexContent from '../../../javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/components/velt/index.js?raw'
import veltCollaborationContent from '../../../javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/components/velt/velt-collaboration.js?raw'
import veltToolsContent from '../../../javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/components/velt/velt-tools.js?raw'
import veltUiStylesContent from '../../../javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/components/velt/ui-customization/styles.css?raw'
import globalStylesContent from '../../../javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/styles/globals.css?raw'
import indexHtmlContent from '../../../javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/index.html?raw'

export const codeFiles: SampleCodeFile[] = [
  // Entry Point
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/index.html', language: 'html', content: codeContent.indexHtmlContent },
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/main.js', language: 'javascript', content: codeContent.mainContent },

  // Lib
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/lib/velt.js', language: 'javascript', content: codeContent.veltContent },
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/lib/user.js', language: 'javascript', content: codeContent.userContent },
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/lib/document.js', language: 'javascript', content: codeContent.documentContent },
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/lib/theme.js', language: 'javascript', content: codeContent.themeContent },

  // Map Store
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/components/document/map-store/map-store-editor.js', language: 'javascript', content: codeContent.mapStoreEditorContent },
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/components/document/map-store/map-store-sidebar.js', language: 'javascript', content: codeContent.mapStoreSidebarContent },
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/components/document/map-store/constants.js', language: 'javascript', content: codeContent.constantsContent },

  // Document Canvas
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/components/document/document-canvas.js', language: 'javascript', content: codeContent.documentCanvasContent },

  // Header & Theme
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/components/header/header.js', language: 'javascript', content: codeContent.headerContent },
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/components/header/theme-toggle.js', language: 'javascript', content: codeContent.themeToggleContent },

  // Velt Components
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/components/velt/index.js', language: 'javascript', content: codeContent.veltIndexContent },
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/components/velt/velt-collaboration.js', language: 'javascript', content: codeContent.veltCollaborationContent },
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/components/velt/velt-tools.js', language: 'javascript', content: codeContent.veltToolsContent },

  // Velt UI Customization
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/src/components/velt/ui-customization/styles.css', language: 'css', content: codeContent.veltUiStylesContent },

  // Styles
  { path: 'apps/javascript/crdt/text-editors/core/core-non-react-crdt-map-demo/styles/globals.css', language: 'css', content: codeContent.globalStylesContent },
]
