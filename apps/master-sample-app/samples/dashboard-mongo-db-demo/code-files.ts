import { SampleCodeFile } from '@/types/sample'

// Import all code files using ?raw
import pageContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/page.tsx?raw'
import layoutContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/layout.tsx?raw'
import jobsContextContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/document/JobsContext.tsx?raw'
import appUserContextContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/userAuth/AppUserContext.tsx?raw'
import appProvidersContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/userAuth/AppProviders.tsx?raw'
import veltInitializeUserContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/velt/VeltInitializeUser.tsx?raw'
import veltInitializeDocumentContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/velt/VeltInitializeDocument.tsx?raw'
import veltCollaborationContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/velt/VeltCollaboration.tsx?raw'
import veltToolsContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/velt/VeltTools.tsx?raw'
import veltDataProvidersContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/velt/VeltDataProviders.ts?raw'
import documentCanvasContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/document/document-canvas.tsx?raw'
import jobsTableContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/document/JobsTable.tsx?raw'
import lineItemCommentsSidebarContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/document/LineItemCommentsSidebar.tsx?raw'
import notificationsPanelContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/document/NotificationsPanel.tsx?raw'
import headerContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/header/header.tsx?raw'
import sidebarContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/sidebar/sidebar.tsx?raw'
import storeContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/store.ts?raw'
import tokenRouteContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/token/route.ts?raw'
import commentsSaveRouteContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/comments/save/route.ts?raw'
import commentsGetRouteContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/comments/get/route.ts?raw'
import commentsDeleteRouteContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/comments/delete/route.ts?raw'
import usersSaveRouteContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/users/save/route.ts?raw'
import usersGetRouteContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/users/get/route.ts?raw'
import attachmentsSaveRouteContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/attachments/save/route.ts?raw'
import attachmentsGetRouteContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/attachments/get/[attachmentId]/route.ts?raw'
import attachmentsDeleteRouteContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/attachments/delete/route.ts?raw'
import reactionsSaveRouteContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/reactions/save/route.ts?raw'
import reactionsGetRouteContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/reactions/get/route.ts?raw'
import reactionsDeleteRouteContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/reactions/delete/route.ts?raw'
import veltCustomizationContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/velt/ui-customization/VeltCustomization.tsx?raw'
import veltCommentDialogWfContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/velt/ui-customization/VeltCommentDialogWf.tsx?raw'
import veltCommentsSidebarHeaderWfContent from '../../../react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/velt/ui-customization/VeltCommentsSidebarHeaderWf.tsx?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/page.tsx', language: 'typescript', content: pageContent },
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/layout.tsx', language: 'typescript', content: layoutContent },
  
  // Document
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/document/JobsContext.tsx', language: 'typescript', content: jobsContextContent },
  
  // User Auth
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: appUserContextContent },
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: appProvidersContent },
  
  // Velt Components
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: veltInitializeUserContent },
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: veltInitializeDocumentContent },
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: veltCollaborationContent },
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/velt/VeltTools.tsx', language: 'typescript', content: veltToolsContent },
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/velt/VeltDataProviders.ts', language: 'typescript', content: veltDataProvidersContent },
  
  // Velt UI Customization
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/velt/ui-customization/VeltCustomization.tsx', language: 'typescript', content: veltCustomizationContent },
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/velt/ui-customization/VeltCommentDialogWf.tsx', language: 'typescript', content: veltCommentDialogWfContent },
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/velt/ui-customization/VeltCommentsSidebarHeaderWf.tsx', language: 'typescript', content: veltCommentsSidebarHeaderWfContent },
  
  // Document Canvas & Components
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/document/document-canvas.tsx', language: 'typescript', content: documentCanvasContent },
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/document/JobsTable.tsx', language: 'typescript', content: jobsTableContent },
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/document/LineItemCommentsSidebar.tsx', language: 'typescript', content: lineItemCommentsSidebarContent },
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/document/NotificationsPanel.tsx', language: 'typescript', content: notificationsPanelContent },
  
  // Header
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/header/header.tsx', language: 'typescript', content: headerContent },
  
  // Sidebar
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/components/sidebar/sidebar.tsx', language: 'typescript', content: sidebarContent },
  
  // API Routes - Store
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/store.ts', language: 'typescript', content: storeContent },
  
  // API Routes - Token
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/token/route.ts', language: 'typescript', content: tokenRouteContent },
  
  // API Routes - Comments
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/comments/save/route.ts', language: 'typescript', content: commentsSaveRouteContent },
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/comments/get/route.ts', language: 'typescript', content: commentsGetRouteContent },
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/comments/delete/route.ts', language: 'typescript', content: commentsDeleteRouteContent },
  
  // API Routes - Users
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/users/save/route.ts', language: 'typescript', content: usersSaveRouteContent },
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/users/get/route.ts', language: 'typescript', content: usersGetRouteContent },
  
  // API Routes - Attachments
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/attachments/save/route.ts', language: 'typescript', content: attachmentsSaveRouteContent },
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/attachments/get/[attachmentId]/route.ts', language: 'typescript', content: attachmentsGetRouteContent },
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/attachments/delete/route.ts', language: 'typescript', content: attachmentsDeleteRouteContent },
  
  // API Routes - Reactions
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/reactions/save/route.ts', language: 'typescript', content: reactionsSaveRouteContent },
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/reactions/get/route.ts', language: 'typescript', content: reactionsGetRouteContent },
  { path: 'apps/react/self-hosting/dashboard/mongo-db/dashboard-mongo-db-demo/app/api/velt/reactions/delete/route.ts', language: 'typescript', content: reactionsDeleteRouteContent }
]
