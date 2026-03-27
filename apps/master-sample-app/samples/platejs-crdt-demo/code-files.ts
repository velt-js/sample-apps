import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/platejs-crdt-demo.json'

// Import all code files using ?raw
import pageContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/app/page.tsx?raw'
import layoutContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/app/layout.tsx?raw'
import documentContextContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/app/document/DocumentContext.tsx?raw'
import useCurrentDocumentContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/app/document/useCurrentDocument.ts?raw'
import appProvidersContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/app/userAuth/AppProviders.tsx?raw'
import appUserContextContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/app/userAuth/AppUserContext.tsx?raw'
import useAppUserContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/app/userAuth/useAppUser.ts?raw'
import tokenRouteContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/app/api/velt/token/route.ts?raw'
import veltInitializeUserContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/components/velt/VeltInitializeUser.tsx?raw'
import veltInitializeDocumentContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/components/velt/VeltInitializeDocument.tsx?raw'
import veltCollaborationContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/components/velt/VeltCollaboration.tsx?raw'
import veltToolsContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/components/velt/VeltTools.tsx?raw'
import veltCustomizationContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/components/velt/ui-customization/VeltCustomization.tsx?raw'
import veltCommentToolWfContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/components/velt/ui-customization/VeltCommentToolWf.tsx?raw'
import veltCommentBubbleWfContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/components/velt/ui-customization/VeltCommentBubbleWf.tsx?raw'
import veltSidebarButtonWfContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx?raw'
import veltNotificationsToolWfContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx?raw'
import veltUiStylesContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/components/velt/ui-customization/styles.css?raw'
import documentCanvasContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/components/document/document-canvas.tsx?raw'
import plateComponentContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/components/document/PlateComponent/PlateComponent.tsx?raw'
import plateConstantsContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/components/document/PlateComponent/constants.ts?raw'
import plateTypesContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/components/document/PlateComponent/types.ts?raw'
import plateIndexContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/components/document/PlateComponent/index.tsx?raw'
import bubbleMenuToolbarContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/components/document/PlateComponent/ui/BubbleMenuToolbar.tsx?raw'
import toolbarButtonContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/components/document/PlateComponent/ui/ToolbarButton.tsx?raw'
import toolbarDividerContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/components/document/PlateComponent/ui/ToolbarDivider.tsx?raw'
import headerContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/components/header/header.tsx?raw'
import sidebarContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/components/sidebar/sidebar.tsx?raw'
import themeContextContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/components/theme/ThemeContext.tsx?raw'
import themeToggleContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/components/theme/ThemeToggle.tsx?raw'
import globalStylesContent from '../../../react/crdt/text-editors/platejs/platejs-crdt-demo/styles/globals.css?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/app/page.tsx', language: 'typescript', content: codeContent.pageContent },
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/app/layout.tsx', language: 'typescript', content: codeContent.layoutContent },

  // Document
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/app/document/DocumentContext.tsx', language: 'typescript', content: codeContent.documentContextContent },
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/app/document/useCurrentDocument.ts', language: 'typescript', content: codeContent.useCurrentDocumentContent },

  // User Auth
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: codeContent.appProvidersContent },
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: codeContent.appUserContextContent },
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/app/userAuth/useAppUser.ts', language: 'typescript', content: codeContent.useAppUserContent },

  // API
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/app/api/velt/token/route.ts', language: 'typescript', content: codeContent.tokenRouteContent },

  // Velt Components
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: codeContent.veltInitializeUserContent },
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: codeContent.veltInitializeDocumentContent },
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: codeContent.veltCollaborationContent },
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/components/velt/VeltTools.tsx', language: 'typescript', content: codeContent.veltToolsContent },

  // Velt UI Customization
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/components/velt/ui-customization/VeltCustomization.tsx', language: 'typescript', content: codeContent.veltCustomizationContent },
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/components/velt/ui-customization/VeltCommentToolWf.tsx', language: 'typescript', content: codeContent.veltCommentToolWfContent },
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/components/velt/ui-customization/VeltCommentBubbleWf.tsx', language: 'typescript', content: codeContent.veltCommentBubbleWfContent },
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx', language: 'typescript', content: codeContent.veltSidebarButtonWfContent },
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx', language: 'typescript', content: codeContent.veltNotificationsToolWfContent },
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/components/velt/ui-customization/styles.css', language: 'css', content: codeContent.veltUiStylesContent },

  // Document Canvas
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/components/document/document-canvas.tsx', language: 'typescript', content: codeContent.documentCanvasContent },

  // PlateJS Component
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/components/document/PlateComponent/PlateComponent.tsx', language: 'typescript', content: codeContent.plateComponentContent },
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/components/document/PlateComponent/constants.ts', language: 'typescript', content: codeContent.plateConstantsContent },
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/components/document/PlateComponent/types.ts', language: 'typescript', content: codeContent.plateTypesContent },
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/components/document/PlateComponent/index.tsx', language: 'typescript', content: codeContent.plateIndexContent },

  // PlateJS UI Components
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/components/document/PlateComponent/ui/BubbleMenuToolbar.tsx', language: 'typescript', content: codeContent.bubbleMenuToolbarContent },
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/components/document/PlateComponent/ui/ToolbarButton.tsx', language: 'typescript', content: codeContent.toolbarButtonContent },
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/components/document/PlateComponent/ui/ToolbarDivider.tsx', language: 'typescript', content: codeContent.toolbarDividerContent },

  // Header
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/components/header/header.tsx', language: 'typescript', content: codeContent.headerContent },

  // Sidebar
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/components/sidebar/sidebar.tsx', language: 'typescript', content: codeContent.sidebarContent },

  // Theme
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/components/theme/ThemeContext.tsx', language: 'typescript', content: codeContent.themeContextContent },
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/components/theme/ThemeToggle.tsx', language: 'typescript', content: codeContent.themeToggleContent },

  // Styles
  { path: 'apps/react/crdt/text-editors/platejs/platejs-crdt-demo/styles/globals.css', language: 'css', content: codeContent.globalStylesContent },
]
