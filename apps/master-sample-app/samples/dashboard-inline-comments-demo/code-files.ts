import { SampleCodeFile } from '@/types/sample'

// Import all code files using ?raw
import pageContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/app/page.tsx?raw'
import layoutContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/app/layout.tsx?raw'
import documentContextContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/app/document/DocumentContext.tsx?raw'
import useCurrentDocumentContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/app/document/useCurrentDocument.ts?raw'
import appUserContextContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/app/userAuth/AppUserContext.tsx?raw'
import appProvidersContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/app/userAuth/AppProviders.tsx?raw'
import useAppUserContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/app/userAuth/useAppUser.ts?raw'
import veltInitializeUserContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/velt/VeltInitializeUser.tsx?raw'
import veltInitializeDocumentContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/velt/VeltInitializeDocument.tsx?raw'
import veltCollaborationContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/velt/VeltCollaboration.tsx?raw'
import veltToolsContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/velt/VeltTools.tsx?raw'
import documentCanvasContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/document/document-canvas.tsx?raw'
import jobsTableContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/document/JobsTable.tsx?raw'
import commentsSidebarContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/document/CommentsSidebar.tsx?raw'
import actionModalContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/document/ActionModal.tsx?raw'
import jobDetailModalContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/document/JobDetailModal.tsx?raw'
import summaryCardsContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/document/SummaryCards.tsx?raw'
import headerContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/header/header.tsx?raw'
import sidebarContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/sidebar/sidebar.tsx?raw'
import tokenRouteContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/app/api/velt/token/route.ts?raw'
import veltCustomizationContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/velt/ui-customization/VeltCustomization.tsx?raw'
import veltCommentBubbleWfContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/velt/ui-customization/VeltCommentBubbleWf.tsx?raw'
import veltCommentsSidebarHeaderWfContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/velt/ui-customization/VeltCommentsSidebarHeaderWf.tsx?raw'
import veltCommentToolWfContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/velt/ui-customization/VeltCommentToolWf.tsx?raw'
import veltNotificationsToolWfContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx?raw'
import veltSidebarButtonWfContent from '../../../react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/app/page.tsx', language: 'typescript', content: pageContent },
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/app/layout.tsx', language: 'typescript', content: layoutContent },
  
  // Document
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/app/document/DocumentContext.tsx', language: 'typescript', content: documentContextContent },
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/app/document/useCurrentDocument.ts', language: 'typescript', content: useCurrentDocumentContent },
  
  // User Auth
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: appUserContextContent },
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: appProvidersContent },
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/app/userAuth/useAppUser.ts', language: 'typescript', content: useAppUserContent },
  
  // Velt Components
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: veltInitializeUserContent },
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: veltInitializeDocumentContent },
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: veltCollaborationContent },
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/velt/VeltTools.tsx', language: 'typescript', content: veltToolsContent },
  
  // Velt UI Customization
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/velt/ui-customization/VeltCustomization.tsx', language: 'typescript', content: veltCustomizationContent },
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/velt/ui-customization/VeltCommentBubbleWf.tsx', language: 'typescript', content: veltCommentBubbleWfContent },
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/velt/ui-customization/VeltCommentsSidebarHeaderWf.tsx', language: 'typescript', content: veltCommentsSidebarHeaderWfContent },
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/velt/ui-customization/VeltCommentToolWf.tsx', language: 'typescript', content: veltCommentToolWfContent },
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx', language: 'typescript', content: veltNotificationsToolWfContent },
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx', language: 'typescript', content: veltSidebarButtonWfContent },
  
  // Document Canvas & Components
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/document/document-canvas.tsx', language: 'typescript', content: documentCanvasContent },
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/document/JobsTable.tsx', language: 'typescript', content: jobsTableContent },
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/document/CommentsSidebar.tsx', language: 'typescript', content: commentsSidebarContent },
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/document/ActionModal.tsx', language: 'typescript', content: actionModalContent },
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/document/JobDetailModal.tsx', language: 'typescript', content: jobDetailModalContent },
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/document/SummaryCards.tsx', language: 'typescript', content: summaryCardsContent },
  
  // Header
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/header/header.tsx', language: 'typescript', content: headerContent },
  
  // Sidebar
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/components/sidebar/sidebar.tsx', language: 'typescript', content: sidebarContent },
  
  // API Routes - Token
  { path: 'apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/app/api/velt/token/route.ts', language: 'typescript', content: tokenRouteContent }
]
