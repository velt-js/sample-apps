import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/dashboard-postgres-demo.json'

// Import all code files using ?raw
import pageContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/page.tsx?raw'
import layoutContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/layout.tsx?raw'
import jobsContextContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/document/JobsContext.tsx?raw'
import appUserContextContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/userAuth/AppUserContext.tsx?raw'
import appProvidersContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/userAuth/AppProviders.tsx?raw'
import veltInitializeUserContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/VeltInitializeUser.tsx?raw'
import veltInitializeDocumentContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/VeltInitializeDocument.tsx?raw'
import veltCollaborationContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/VeltCollaboration.tsx?raw'
import veltToolsContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/VeltTools.tsx?raw'
import veltDataProvidersContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/VeltDataProviders.ts?raw'
import documentCanvasContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/document/document-canvas.tsx?raw'
import jobsTableContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/document/JobsTable.tsx?raw'
import lineItemCommentsSidebarContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/document/LineItemCommentsSidebar.tsx?raw'
import notificationsPanelContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/document/NotificationsPanel.tsx?raw'
import actionModalContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/document/ActionModal.tsx?raw'
import headerContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/header/header.tsx?raw'
import sidebarContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/sidebar/sidebar.tsx?raw'
import storeContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/store.ts?raw'
import tokenRouteContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/token/route.ts?raw'
import commentsSaveRouteContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/comments/save/route.ts?raw'
import commentsGetRouteContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/comments/get/route.ts?raw'
import commentsDeleteRouteContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/comments/delete/route.ts?raw'
import usersSaveRouteContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/users/save/route.ts?raw'
import usersGetRouteContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/users/get/route.ts?raw'
import attachmentsSaveRouteContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/attachments/save/route.ts?raw'
import attachmentsGetRouteContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/attachments/get/[attachmentId]/route.ts?raw'
import attachmentsDeleteRouteContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/attachments/delete/route.ts?raw'
import reactionsSaveRouteContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/reactions/save/route.ts?raw'
import reactionsGetRouteContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/reactions/get/route.ts?raw'
import reactionsDeleteRouteContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/reactions/delete/route.ts?raw'
import veltCustomizationContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/ui-customization/VeltCustomization.tsx?raw'
import veltCommentDialogWfContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/ui-customization/VeltCommentDialogWf.tsx?raw'
import veltCommentsSidebarHeaderWfContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/ui-customization/VeltCommentsSidebarHeaderWf.tsx?raw'
import veltCommentsSidebarFocusedThreadWfContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/ui-customization/VeltCommentsSidebarFocusedThreadWf.tsx?raw'
import veltInlineCommentsSectionWfContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/ui-customization/VeltInlineCommentsSectionWf.tsx?raw'
import veltActionCommentsComposerWfContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/ui-customization/VeltActionCommentsComposerWf.tsx?raw'
import veltConfirmDialogWfContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/ui-customization/VeltConfirmDialogWf.tsx?raw'
import veltNotificationPanelWfContent from '../../../react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/ui-customization/VeltNotificationPanelWf.tsx?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/page.tsx', language: 'typescript', content: codeContent.pageContent },
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/layout.tsx', language: 'typescript', content: codeContent.layoutContent },
  
  // Document
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/document/JobsContext.tsx', language: 'typescript', content: codeContent.jobsContextContent },
  
  // User Auth
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: codeContent.appUserContextContent },
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: codeContent.appProvidersContent },
  
  // Velt Components
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: codeContent.veltInitializeUserContent },
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: codeContent.veltInitializeDocumentContent },
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: codeContent.veltCollaborationContent },
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/VeltTools.tsx', language: 'typescript', content: codeContent.veltToolsContent },
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/VeltDataProviders.ts', language: 'typescript', content: codeContent.veltDataProvidersContent },
  
  // Velt UI Customization
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/ui-customization/VeltCustomization.tsx', language: 'typescript', content: codeContent.veltCustomizationContent },
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/ui-customization/VeltCommentDialogWf.tsx', language: 'typescript', content: codeContent.veltCommentDialogWfContent },
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/ui-customization/VeltCommentsSidebarHeaderWf.tsx', language: 'typescript', content: codeContent.veltCommentsSidebarHeaderWfContent },
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/ui-customization/VeltCommentsSidebarFocusedThreadWf.tsx', language: 'typescript', content: codeContent.veltCommentsSidebarFocusedThreadWfContent },
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/ui-customization/VeltInlineCommentsSectionWf.tsx', language: 'typescript', content: codeContent.veltInlineCommentsSectionWfContent },
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/ui-customization/VeltActionCommentsComposerWf.tsx', language: 'typescript', content: codeContent.veltActionCommentsComposerWfContent },
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/ui-customization/VeltConfirmDialogWf.tsx', language: 'typescript', content: codeContent.veltConfirmDialogWfContent },
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/velt/ui-customization/VeltNotificationPanelWf.tsx', language: 'typescript', content: codeContent.veltNotificationPanelWfContent },
  
  // Document Canvas & Components
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/document/document-canvas.tsx', language: 'typescript', content: codeContent.documentCanvasContent },
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/document/JobsTable.tsx', language: 'typescript', content: codeContent.jobsTableContent },
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/document/LineItemCommentsSidebar.tsx', language: 'typescript', content: codeContent.lineItemCommentsSidebarContent },
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/document/NotificationsPanel.tsx', language: 'typescript', content: codeContent.notificationsPanelContent },
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/document/ActionModal.tsx', language: 'typescript', content: codeContent.actionModalContent },
  
  // Header
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/header/header.tsx', language: 'typescript', content: codeContent.headerContent },
  
  // Sidebar
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/components/sidebar/sidebar.tsx', language: 'typescript', content: codeContent.sidebarContent },
  
  // API Routes - Store
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/store.ts', language: 'typescript', content: codeContent.storeContent },
  
  // API Routes - Token
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/token/route.ts', language: 'typescript', content: codeContent.tokenRouteContent },
  
  // API Routes - Comments
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/comments/save/route.ts', language: 'typescript', content: codeContent.commentsSaveRouteContent },
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/comments/get/route.ts', language: 'typescript', content: codeContent.commentsGetRouteContent },
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/comments/delete/route.ts', language: 'typescript', content: codeContent.commentsDeleteRouteContent },
  
  // API Routes - Users
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/users/save/route.ts', language: 'typescript', content: codeContent.usersSaveRouteContent },
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/users/get/route.ts', language: 'typescript', content: codeContent.usersGetRouteContent },
  
  // API Routes - Attachments
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/attachments/save/route.ts', language: 'typescript', content: codeContent.attachmentsSaveRouteContent },
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/attachments/get/[attachmentId]/route.ts', language: 'typescript', content: codeContent.attachmentsGetRouteContent },
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/attachments/delete/route.ts', language: 'typescript', content: codeContent.attachmentsDeleteRouteContent },
  
  // API Routes - Reactions
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/reactions/save/route.ts', language: 'typescript', content: codeContent.reactionsSaveRouteContent },
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/reactions/get/route.ts', language: 'typescript', content: codeContent.reactionsGetRouteContent },
  { path: 'apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/app/api/velt/reactions/delete/route.ts', language: 'typescript', content: codeContent.reactionsDeleteRouteContent }
]
