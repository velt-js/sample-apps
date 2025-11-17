import { SampleCodeFile } from '@/types/sample'

// Import all code files using ?raw
import pageContent from '../../../react/comments/dashboard/custom/dashboard-demo/app/page.tsx?raw'
import layoutContent from '../../../react/comments/dashboard/custom/dashboard-demo/app/layout.tsx?raw'
import documentContextContent from '../../../react/comments/dashboard/custom/dashboard-demo/app/document/DocumentContext.tsx?raw'
import appUserContextContent from '../../../react/comments/dashboard/custom/dashboard-demo/app/userAuth/AppUserContext.tsx?raw'
import appProvidersContent from '../../../react/comments/dashboard/custom/dashboard-demo/app/userAuth/AppProviders.tsx?raw'
import veltInitializeUserContent from '../../../react/comments/dashboard/custom/dashboard-demo/components/velt/VeltInitializeUser.tsx?raw'
import veltInitializeDocumentContent from '../../../react/comments/dashboard/custom/dashboard-demo/components/velt/VeltInitializeDocument.tsx?raw'
import veltCollaborationContent from '../../../react/comments/dashboard/custom/dashboard-demo/components/velt/VeltCollaboration.tsx?raw'
import documentCanvasContent from '../../../react/comments/dashboard/custom/dashboard-demo/components/document/document-canvas.tsx?raw'
import metricCardContent from '../../../react/comments/dashboard/custom/dashboard-demo/components/document/MetricCard.tsx?raw'
import chartPanelContent from '../../../react/comments/dashboard/custom/dashboard-demo/components/document/ChartPanel.tsx?raw'
import headerContent from '../../../react/comments/dashboard/custom/dashboard-demo/components/header/header.tsx?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/comments/dashboard/custom/dashboard-demo/app/page.tsx', language: 'typescript', content: pageContent },
  { path: 'apps/react/comments/dashboard/custom/dashboard-demo/app/layout.tsx', language: 'typescript', content: layoutContent },
  
  // Document
  { path: 'apps/react/comments/dashboard/custom/dashboard-demo/app/document/DocumentContext.tsx', language: 'typescript', content: documentContextContent },
  
  // User Auth
  { path: 'apps/react/comments/dashboard/custom/dashboard-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: appUserContextContent },
  { path: 'apps/react/comments/dashboard/custom/dashboard-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: appProvidersContent },
  
  // Velt Components
  { path: 'apps/react/comments/dashboard/custom/dashboard-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: veltInitializeUserContent },
  { path: 'apps/react/comments/dashboard/custom/dashboard-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: veltInitializeDocumentContent },
  { path: 'apps/react/comments/dashboard/custom/dashboard-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: veltCollaborationContent },
  
  // Document Canvas & Components
  { path: 'apps/react/comments/dashboard/custom/dashboard-demo/components/document/document-canvas.tsx', language: 'typescript', content: documentCanvasContent },
  { path: 'apps/react/comments/dashboard/custom/dashboard-demo/components/document/MetricCard.tsx', language: 'typescript', content: metricCardContent },
  { path: 'apps/react/comments/dashboard/custom/dashboard-demo/components/document/ChartPanel.tsx', language: 'typescript', content: chartPanelContent },
  
  // Header
  { path: 'apps/react/comments/dashboard/custom/dashboard-demo/components/header/header.tsx', language: 'typescript', content: headerContent }
]
