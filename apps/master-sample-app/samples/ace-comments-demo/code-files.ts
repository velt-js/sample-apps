import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/ace-comments-demo.json'

// Import all code files using ?raw
import pageContent from '../../../react/comments/text-editors/ace/ace-comments-demo/app/page.tsx?raw'
import layoutContent from '../../../react/comments/text-editors/ace/ace-comments-demo/app/layout.tsx?raw'
import tokenRouteContent from '../../../react/comments/text-editors/ace/ace-comments-demo/app/api/velt/token/route.ts?raw'
import documentContextContent from '../../../react/comments/text-editors/ace/ace-comments-demo/app/document/DocumentContext.tsx?raw'
import useCurrentDocumentContent from '../../../react/comments/text-editors/ace/ace-comments-demo/app/document/useCurrentDocument.ts?raw'
import appUserContextContent from '../../../react/comments/text-editors/ace/ace-comments-demo/app/userAuth/AppUserContext.tsx?raw'
import appProvidersContent from '../../../react/comments/text-editors/ace/ace-comments-demo/app/userAuth/AppProviders.tsx?raw'
import useAppUserContent from '../../../react/comments/text-editors/ace/ace-comments-demo/app/userAuth/useAppUser.ts?raw'
import veltInitializeUserContent from '../../../react/comments/text-editors/ace/ace-comments-demo/components/velt/VeltInitializeUser.tsx?raw'
import veltInitializeDocumentContent from '../../../react/comments/text-editors/ace/ace-comments-demo/components/velt/VeltInitializeDocument.tsx?raw'
import veltCollaborationContent from '../../../react/comments/text-editors/ace/ace-comments-demo/components/velt/VeltCollaboration.tsx?raw'
import veltToolsContent from '../../../react/comments/text-editors/ace/ace-comments-demo/components/velt/VeltTools.tsx?raw'
import veltCustomizationContent from '../../../react/comments/text-editors/ace/ace-comments-demo/components/velt/ui-customization/VeltCustomization.tsx?raw'
import veltCommentToolWfContent from '../../../react/comments/text-editors/ace/ace-comments-demo/components/velt/ui-customization/VeltCommentToolWf.tsx?raw'
import veltNotificationsToolWfContent from '../../../react/comments/text-editors/ace/ace-comments-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx?raw'
import veltSidebarButtonWfContent from '../../../react/comments/text-editors/ace/ace-comments-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx?raw'
import veltStylesContent from '../../../react/comments/text-editors/ace/ace-comments-demo/components/velt/ui-customization/styles.css?raw'
import documentCanvasContent from '../../../react/comments/text-editors/ace/ace-comments-demo/components/document/document-canvas.tsx?raw'
import aceComponentContent from '../../../react/comments/text-editors/ace/ace-comments-demo/components/document/AceComponent/AceComponent.tsx?raw'
import aceIndexContent from '../../../react/comments/text-editors/ace/ace-comments-demo/components/document/AceComponent/index.tsx?raw'
import aceConstantsContent from '../../../react/comments/text-editors/ace/ace-comments-demo/components/document/AceComponent/constants.ts?raw'
import aceTypesContent from '../../../react/comments/text-editors/ace/ace-comments-demo/components/document/AceComponent/types.ts?raw'
import bubbleMenuToolbarContent from '../../../react/comments/text-editors/ace/ace-comments-demo/components/document/AceComponent/ui/BubbleMenuToolbar.tsx?raw'
import toolbarButtonContent from '../../../react/comments/text-editors/ace/ace-comments-demo/components/document/AceComponent/ui/ToolbarButton.tsx?raw'
import toolbarDividerContent from '../../../react/comments/text-editors/ace/ace-comments-demo/components/document/AceComponent/ui/ToolbarDivider.tsx?raw'
import headerContent from '../../../react/comments/text-editors/ace/ace-comments-demo/components/header/header.tsx?raw'
import sidebarContent from '../../../react/comments/text-editors/ace/ace-comments-demo/components/sidebar/sidebar.tsx?raw'
import themeContextContent from '../../../react/comments/text-editors/ace/ace-comments-demo/components/theme/ThemeContext.tsx?raw'
import themeToggleContent from '../../../react/comments/text-editors/ace/ace-comments-demo/components/theme/ThemeToggle.tsx?raw'
import veltLogoContent from '../../../react/comments/text-editors/ace/ace-comments-demo/components/velt-logo.tsx?raw'
import utilsContent from '../../../react/comments/text-editors/ace/ace-comments-demo/lib/utils.ts?raw'
import globalsContent from '../../../react/comments/text-editors/ace/ace-comments-demo/styles/globals.css?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/app/page.tsx', language: 'typescript', content: codeContent.pageContent },
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/app/layout.tsx', language: 'typescript', content: codeContent.layoutContent },

  // API
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/app/api/velt/token/route.ts', language: 'typescript', content: codeContent.tokenRouteContent },

  // Document
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/app/document/DocumentContext.tsx', language: 'typescript', content: codeContent.documentContextContent },
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/app/document/useCurrentDocument.ts', language: 'typescript', content: codeContent.useCurrentDocumentContent },

  // User Auth
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: codeContent.appUserContextContent },
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: codeContent.appProvidersContent },
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/app/userAuth/useAppUser.ts', language: 'typescript', content: codeContent.useAppUserContent },

  // Velt Components
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: codeContent.veltInitializeUserContent },
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: codeContent.veltInitializeDocumentContent },
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: codeContent.veltCollaborationContent },
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/components/velt/VeltTools.tsx', language: 'typescript', content: codeContent.veltToolsContent },

  // Velt UI Customization
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/components/velt/ui-customization/VeltCustomization.tsx', language: 'typescript', content: codeContent.veltCustomizationContent },
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/components/velt/ui-customization/VeltCommentToolWf.tsx', language: 'typescript', content: codeContent.veltCommentToolWfContent },
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx', language: 'typescript', content: codeContent.veltNotificationsToolWfContent },
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx', language: 'typescript', content: codeContent.veltSidebarButtonWfContent },
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/components/velt/ui-customization/styles.css', language: 'css', content: codeContent.veltStylesContent },

  // Document Canvas
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/components/document/document-canvas.tsx', language: 'typescript', content: codeContent.documentCanvasContent },

  // Ace Component
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/components/document/AceComponent/AceComponent.tsx', language: 'typescript', content: codeContent.aceComponentContent },
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/components/document/AceComponent/index.tsx', language: 'typescript', content: codeContent.aceIndexContent },
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/components/document/AceComponent/constants.ts', language: 'typescript', content: codeContent.aceConstantsContent },
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/components/document/AceComponent/types.ts', language: 'typescript', content: codeContent.aceTypesContent },

  // Ace UI Components
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/components/document/AceComponent/ui/BubbleMenuToolbar.tsx', language: 'typescript', content: codeContent.bubbleMenuToolbarContent },
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/components/document/AceComponent/ui/ToolbarButton.tsx', language: 'typescript', content: codeContent.toolbarButtonContent },
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/components/document/AceComponent/ui/ToolbarDivider.tsx', language: 'typescript', content: codeContent.toolbarDividerContent },

  // Header & Sidebar
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/components/header/header.tsx', language: 'typescript', content: codeContent.headerContent },
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/components/sidebar/sidebar.tsx', language: 'typescript', content: codeContent.sidebarContent },

  // Theme
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/components/theme/ThemeContext.tsx', language: 'typescript', content: codeContent.themeContextContent },
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/components/theme/ThemeToggle.tsx', language: 'typescript', content: codeContent.themeToggleContent },

  // Shared Components
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/components/velt-logo.tsx', language: 'typescript', content: codeContent.veltLogoContent },

  // Lib
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/lib/utils.ts', language: 'typescript', content: codeContent.utilsContent },

  // Styles
  { path: 'apps/react/comments/text-editors/ace/ace-comments-demo/styles/globals.css', language: 'css', content: codeContent.globalsContent }
]
