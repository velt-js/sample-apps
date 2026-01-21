import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/dashboard-demo.json'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/comments/dashboard/custom/dashboard-demo/app/page.tsx', language: 'typescript', content: codeContent.pageContent },
  { path: 'apps/react/comments/dashboard/custom/dashboard-demo/app/layout.tsx', language: 'typescript', content: codeContent.layoutContent },
  
  // Document
  { path: 'apps/react/comments/dashboard/custom/dashboard-demo/app/document/DocumentContext.tsx', language: 'typescript', content: codeContent.documentContextContent },
  
  // User Auth
  { path: 'apps/react/comments/dashboard/custom/dashboard-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: codeContent.appUserContextContent },
  { path: 'apps/react/comments/dashboard/custom/dashboard-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: codeContent.appProvidersContent },
  
  // Velt Components
  { path: 'apps/react/comments/dashboard/custom/dashboard-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: codeContent.veltInitializeUserContent },
  { path: 'apps/react/comments/dashboard/custom/dashboard-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: codeContent.veltInitializeDocumentContent },
  { path: 'apps/react/comments/dashboard/custom/dashboard-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: codeContent.veltCollaborationContent },
  
  // Document Canvas & Components
  { path: 'apps/react/comments/dashboard/custom/dashboard-demo/components/document/document-canvas.tsx', language: 'typescript', content: codeContent.documentCanvasContent },
  { path: 'apps/react/comments/dashboard/custom/dashboard-demo/components/document/MetricCard.tsx', language: 'typescript', content: codeContent.metricCardContent },
  { path: 'apps/react/comments/dashboard/custom/dashboard-demo/components/document/ChartPanel.tsx', language: 'typescript', content: codeContent.chartPanelContent },
  
  // Header
  { path: 'apps/react/comments/dashboard/custom/dashboard-demo/components/header/header.tsx', language: 'typescript', content: codeContent.headerContent }
]
