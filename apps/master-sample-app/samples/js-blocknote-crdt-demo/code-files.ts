import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/js-blocknote-crdt-demo.json'

// Import all code files using ?raw
import mainContent from '../../../javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/main.js?raw'
import veltContent from '../../../javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/lib/velt.js?raw'
import userContent from '../../../javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/lib/user.js?raw'
import documentContent from '../../../javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/lib/document.js?raw'
import themeContent from '../../../javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/lib/theme.js?raw'
import documentCanvasContent from '../../../javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/components/document/document-canvas.js?raw'
import blocknoteContent from '../../../javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/components/document/blocknote/blocknote.js?raw'
import blocknoteConstantsContent from '../../../javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/components/document/blocknote/constants.js?raw'
import headerContent from '../../../javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/components/header/header.js?raw'
import themeToggleContent from '../../../javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/components/header/theme-toggle.js?raw'
import sidebarContent from '../../../javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/components/sidebar/sidebar.js?raw'
import veltIndexContent from '../../../javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/components/velt/index.js?raw'
import veltCollaborationContent from '../../../javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/components/velt/velt-collaboration.js?raw'
import veltToolsContent from '../../../javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/components/velt/velt-tools.js?raw'
import veltUiStylesContent from '../../../javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/components/velt/ui-customization/styles.css?raw'
import globalsCssContent from '../../../javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/styles/globals.css?raw'

export const codeFiles: SampleCodeFile[] = [
  // Entry Point
  { path: 'apps/javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/main.js', language: 'javascript', content: codeContent.mainContent },

  // Lib
  { path: 'apps/javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/lib/velt.js', language: 'javascript', content: codeContent.veltContent },
  { path: 'apps/javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/lib/user.js', language: 'javascript', content: codeContent.userContent },
  { path: 'apps/javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/lib/document.js', language: 'javascript', content: codeContent.documentContent },
  { path: 'apps/javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/lib/theme.js', language: 'javascript', content: codeContent.themeContent },

  // Document Canvas
  { path: 'apps/javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/components/document/document-canvas.js', language: 'javascript', content: codeContent.documentCanvasContent },

  // BlockNote Component
  { path: 'apps/javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/components/document/blocknote/blocknote.js', language: 'javascript', content: codeContent.blocknoteContent },
  { path: 'apps/javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/components/document/blocknote/constants.js', language: 'javascript', content: codeContent.blocknoteConstantsContent },

  // Header & Sidebar
  { path: 'apps/javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/components/header/header.js', language: 'javascript', content: codeContent.headerContent },
  { path: 'apps/javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/components/header/theme-toggle.js', language: 'javascript', content: codeContent.themeToggleContent },
  { path: 'apps/javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/components/sidebar/sidebar.js', language: 'javascript', content: codeContent.sidebarContent },

  // Velt Components
  { path: 'apps/javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/components/velt/index.js', language: 'javascript', content: codeContent.veltIndexContent },
  { path: 'apps/javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/components/velt/velt-collaboration.js', language: 'javascript', content: codeContent.veltCollaborationContent },
  { path: 'apps/javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/components/velt/velt-tools.js', language: 'javascript', content: codeContent.veltToolsContent },

  // Velt UI Customization
  { path: 'apps/javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/src/components/velt/ui-customization/styles.css', language: 'css', content: codeContent.veltUiStylesContent },

  // Global Styles
  { path: 'apps/javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/styles/globals.css', language: 'css', content: codeContent.globalsCssContent },
]
