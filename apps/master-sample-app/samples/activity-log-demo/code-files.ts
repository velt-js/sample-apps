import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/activity-log-demo.json'

// Import all code files using ?raw
import pageContent from '../../../react/activity/document/custom/activity-log-demo/app/page.tsx?raw'
import layoutContent from '../../../react/activity/document/custom/activity-log-demo/app/layout.tsx?raw'
import tokenRouteContent from '../../../react/activity/document/custom/activity-log-demo/app/api/velt/token/route.ts?raw'
import documentContextContent from '../../../react/activity/document/custom/activity-log-demo/app/document/DocumentContext.tsx?raw'
import useCurrentDocumentContent from '../../../react/activity/document/custom/activity-log-demo/app/document/useCurrentDocument.ts?raw'
import appUserContextContent from '../../../react/activity/document/custom/activity-log-demo/app/userAuth/AppUserContext.tsx?raw'
import appProvidersContent from '../../../react/activity/document/custom/activity-log-demo/app/userAuth/AppProviders.tsx?raw'
import useAppUserContent from '../../../react/activity/document/custom/activity-log-demo/app/userAuth/useAppUser.ts?raw'
import veltInitializeUserContent from '../../../react/activity/document/custom/activity-log-demo/components/velt/VeltInitializeUser.tsx?raw'
import veltInitializeDocumentContent from '../../../react/activity/document/custom/activity-log-demo/components/velt/VeltInitializeDocument.tsx?raw'
import veltCollaborationContent from '../../../react/activity/document/custom/activity-log-demo/components/velt/VeltCollaboration.tsx?raw'
import veltToolsContent from '../../../react/activity/document/custom/activity-log-demo/components/velt/VeltTools.tsx?raw'
import activityLogPanelContent from '../../../react/activity/document/custom/activity-log-demo/components/velt/ActivityLogPanel.tsx?raw'
import veltCustomizationContent from '../../../react/activity/document/custom/activity-log-demo/components/velt/ui-customization/VeltCustomization.tsx?raw'
import veltCommentBubbleWfContent from '../../../react/activity/document/custom/activity-log-demo/components/velt/ui-customization/VeltCommentBubbleWf.tsx?raw'
import veltCommentToolWfContent from '../../../react/activity/document/custom/activity-log-demo/components/velt/ui-customization/VeltCommentToolWf.tsx?raw'
import veltNotificationsToolWfContent from '../../../react/activity/document/custom/activity-log-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx?raw'
import veltSidebarButtonWfContent from '../../../react/activity/document/custom/activity-log-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx?raw'
import veltUiCustomizationStylesContent from '../../../react/activity/document/custom/activity-log-demo/components/velt/ui-customization/styles.css?raw'
import useActivityActionsContent from '../../../react/activity/document/custom/activity-log-demo/hooks/useActivityActions.ts?raw'
import documentCanvasContent from '../../../react/activity/document/custom/activity-log-demo/components/document/document-canvas.tsx?raw'
import documentArticleContent from '../../../react/activity/document/custom/activity-log-demo/components/document/DocumentArticle.tsx?raw'
import headerContent from '../../../react/activity/document/custom/activity-log-demo/components/header/header.tsx?raw'
import sidebarContent from '../../../react/activity/document/custom/activity-log-demo/components/sidebar/sidebar.tsx?raw'
import themeContextContent from '../../../react/activity/document/custom/activity-log-demo/components/theme/ThemeContext.tsx?raw'
import themeToggleContent from '../../../react/activity/document/custom/activity-log-demo/components/theme/ThemeToggle.tsx?raw'
import globalsCssContent from '../../../react/activity/document/custom/activity-log-demo/styles/globals.css?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/activity/document/custom/activity-log-demo/app/page.tsx', language: 'typescript', content: codeContent.pageContent },
  { path: 'apps/react/activity/document/custom/activity-log-demo/app/layout.tsx', language: 'typescript', content: codeContent.layoutContent },
  { path: 'apps/react/activity/document/custom/activity-log-demo/app/api/velt/token/route.ts', language: 'typescript', content: codeContent.tokenRouteContent },

  // Document
  { path: 'apps/react/activity/document/custom/activity-log-demo/app/document/DocumentContext.tsx', language: 'typescript', content: codeContent.documentContextContent },
  { path: 'apps/react/activity/document/custom/activity-log-demo/app/document/useCurrentDocument.ts', language: 'typescript', content: codeContent.useCurrentDocumentContent },

  // User Auth
  { path: 'apps/react/activity/document/custom/activity-log-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: codeContent.appUserContextContent },
  { path: 'apps/react/activity/document/custom/activity-log-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: codeContent.appProvidersContent },
  { path: 'apps/react/activity/document/custom/activity-log-demo/app/userAuth/useAppUser.ts', language: 'typescript', content: codeContent.useAppUserContent },

  // Velt Components
  { path: 'apps/react/activity/document/custom/activity-log-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: codeContent.veltInitializeUserContent },
  { path: 'apps/react/activity/document/custom/activity-log-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: codeContent.veltInitializeDocumentContent },
  { path: 'apps/react/activity/document/custom/activity-log-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: codeContent.veltCollaborationContent },
  { path: 'apps/react/activity/document/custom/activity-log-demo/components/velt/VeltTools.tsx', language: 'typescript', content: codeContent.veltToolsContent },

  // Activity Log (feature highlight)
  { path: 'apps/react/activity/document/custom/activity-log-demo/components/velt/ActivityLogPanel.tsx', language: 'typescript', content: codeContent.activityLogPanelContent },
  { path: 'apps/react/activity/document/custom/activity-log-demo/hooks/useActivityActions.ts', language: 'typescript', content: codeContent.useActivityActionsContent },

  // Velt UI Customization
  { path: 'apps/react/activity/document/custom/activity-log-demo/components/velt/ui-customization/VeltCustomization.tsx', language: 'typescript', content: codeContent.veltCustomizationContent },
  { path: 'apps/react/activity/document/custom/activity-log-demo/components/velt/ui-customization/VeltCommentBubbleWf.tsx', language: 'typescript', content: codeContent.veltCommentBubbleWfContent },
  { path: 'apps/react/activity/document/custom/activity-log-demo/components/velt/ui-customization/VeltCommentToolWf.tsx', language: 'typescript', content: codeContent.veltCommentToolWfContent },
  { path: 'apps/react/activity/document/custom/activity-log-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx', language: 'typescript', content: codeContent.veltNotificationsToolWfContent },
  { path: 'apps/react/activity/document/custom/activity-log-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx', language: 'typescript', content: codeContent.veltSidebarButtonWfContent },
  { path: 'apps/react/activity/document/custom/activity-log-demo/components/velt/ui-customization/styles.css', language: 'css', content: codeContent.veltUiCustomizationStylesContent },

  // Document Canvas & Content
  { path: 'apps/react/activity/document/custom/activity-log-demo/components/document/document-canvas.tsx', language: 'typescript', content: codeContent.documentCanvasContent },
  { path: 'apps/react/activity/document/custom/activity-log-demo/components/document/DocumentArticle.tsx', language: 'typescript', content: codeContent.documentArticleContent },

  // Header & Sidebar
  { path: 'apps/react/activity/document/custom/activity-log-demo/components/header/header.tsx', language: 'typescript', content: codeContent.headerContent },
  { path: 'apps/react/activity/document/custom/activity-log-demo/components/sidebar/sidebar.tsx', language: 'typescript', content: codeContent.sidebarContent },

  // Theme
  { path: 'apps/react/activity/document/custom/activity-log-demo/components/theme/ThemeContext.tsx', language: 'typescript', content: codeContent.themeContextContent },
  { path: 'apps/react/activity/document/custom/activity-log-demo/components/theme/ThemeToggle.tsx', language: 'typescript', content: codeContent.themeToggleContent },

  // Styles
  { path: 'apps/react/activity/document/custom/activity-log-demo/styles/globals.css', language: 'css', content: codeContent.globalsCssContent },
]
