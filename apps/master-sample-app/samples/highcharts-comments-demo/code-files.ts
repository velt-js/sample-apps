import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/highcharts-comments-demo.json'

// Import all code files using ?raw
import pageContent from '../../../react/comments/charts/highcharts/highcharts-comments-demo/app/page.tsx?raw'
import layoutContent from '../../../react/comments/charts/highcharts/highcharts-comments-demo/app/layout.tsx?raw'
import documentContextContent from '../../../react/comments/charts/highcharts/highcharts-comments-demo/app/document/DocumentContext.tsx?raw'
import useCurrentDocumentContent from '../../../react/comments/charts/highcharts/highcharts-comments-demo/app/document/useCurrentDocument.ts?raw'
import appUserContextContent from '../../../react/comments/charts/highcharts/highcharts-comments-demo/app/userAuth/AppUserContext.tsx?raw'
import appProvidersContent from '../../../react/comments/charts/highcharts/highcharts-comments-demo/app/userAuth/AppProviders.tsx?raw'
import useAppUserContent from '../../../react/comments/charts/highcharts/highcharts-comments-demo/app/userAuth/useAppUser.ts?raw'
import highchartsThemeContent from '../../../react/comments/charts/highcharts/highcharts-comments-demo/components/charts/highchartsTheme.ts?raw'
import sessionsLineChartContent from '../../../react/comments/charts/highcharts/highcharts-comments-demo/components/charts/SessionsLineChart.tsx?raw'
import conversionsColumnChartContent from '../../../react/comments/charts/highcharts/highcharts-comments-demo/components/charts/ConversionsColumnChart.tsx?raw'
import dashboardGridContent from '../../../react/comments/charts/highcharts/highcharts-comments-demo/components/dashboard/DashboardGrid.tsx?raw'
import metricCardContent from '../../../react/comments/charts/highcharts/highcharts-comments-demo/components/dashboard/MetricCard.tsx?raw'
import veltInitializeUserContent from '../../../react/comments/charts/highcharts/highcharts-comments-demo/components/velt/VeltInitializeUser.tsx?raw'
import veltInitializeDocumentContent from '../../../react/comments/charts/highcharts/highcharts-comments-demo/components/velt/VeltInitializeDocument.tsx?raw'
import veltCollaborationContent from '../../../react/comments/charts/highcharts/highcharts-comments-demo/components/velt/VeltCollaboration.tsx?raw'
import veltToolsContent from '../../../react/comments/charts/highcharts/highcharts-comments-demo/components/velt/VeltTools.tsx?raw'
import veltCustomizationContent from '../../../react/comments/charts/highcharts/highcharts-comments-demo/components/velt/ui-customization/VeltCustomization.tsx?raw'
import headerContent from '../../../react/comments/charts/highcharts/highcharts-comments-demo/components/header/header.tsx?raw'
import documentCanvasContent from '../../../react/comments/charts/highcharts/highcharts-comments-demo/components/document/document-canvas.tsx?raw'
import documentArticleContent from '../../../react/comments/charts/highcharts/highcharts-comments-demo/components/document/DocumentArticle.tsx?raw'
import commentsPanelContent from '../../../react/comments/charts/highcharts/highcharts-comments-demo/components/comments/CommentsPanel.tsx?raw'
import nextConfigContent from '../../../react/comments/charts/highcharts/highcharts-comments-demo/next.config.js?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/comments/charts/highcharts/highcharts-comments-demo/app/page.tsx', language: 'typescript', content: codeContent.pageContent },
  { path: 'apps/react/comments/charts/highcharts/highcharts-comments-demo/app/layout.tsx', language: 'typescript', content: codeContent.layoutContent },

  // Document
  { path: 'apps/react/comments/charts/highcharts/highcharts-comments-demo/app/document/DocumentContext.tsx', language: 'typescript', content: codeContent.documentContextContent },
  { path: 'apps/react/comments/charts/highcharts/highcharts-comments-demo/app/document/useCurrentDocument.ts', language: 'typescript', content: codeContent.useCurrentDocumentContent },

  // User Auth
  { path: 'apps/react/comments/charts/highcharts/highcharts-comments-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: codeContent.appUserContextContent },
  { path: 'apps/react/comments/charts/highcharts/highcharts-comments-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: codeContent.appProvidersContent },
  { path: 'apps/react/comments/charts/highcharts/highcharts-comments-demo/app/userAuth/useAppUser.ts', language: 'typescript', content: codeContent.useAppUserContent },

  // Highcharts + Velt integration (core)
  { path: 'apps/react/comments/charts/highcharts/highcharts-comments-demo/components/charts/SessionsLineChart.tsx', language: 'typescript', content: codeContent.sessionsLineChartContent },
  { path: 'apps/react/comments/charts/highcharts/highcharts-comments-demo/components/charts/ConversionsColumnChart.tsx', language: 'typescript', content: codeContent.conversionsColumnChartContent },
  { path: 'apps/react/comments/charts/highcharts/highcharts-comments-demo/components/charts/highchartsTheme.ts', language: 'typescript', content: codeContent.highchartsThemeContent },

  // Dashboard
  { path: 'apps/react/comments/charts/highcharts/highcharts-comments-demo/components/dashboard/DashboardGrid.tsx', language: 'typescript', content: codeContent.dashboardGridContent },
  { path: 'apps/react/comments/charts/highcharts/highcharts-comments-demo/components/dashboard/MetricCard.tsx', language: 'typescript', content: codeContent.metricCardContent },

  // Velt Components
  { path: 'apps/react/comments/charts/highcharts/highcharts-comments-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: codeContent.veltInitializeUserContent },
  { path: 'apps/react/comments/charts/highcharts/highcharts-comments-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: codeContent.veltInitializeDocumentContent },
  { path: 'apps/react/comments/charts/highcharts/highcharts-comments-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: codeContent.veltCollaborationContent },
  { path: 'apps/react/comments/charts/highcharts/highcharts-comments-demo/components/velt/VeltTools.tsx', language: 'typescript', content: codeContent.veltToolsContent },
  { path: 'apps/react/comments/charts/highcharts/highcharts-comments-demo/components/velt/ui-customization/VeltCustomization.tsx', language: 'typescript', content: codeContent.veltCustomizationContent },

  // Header
  { path: 'apps/react/comments/charts/highcharts/highcharts-comments-demo/components/header/header.tsx', language: 'typescript', content: codeContent.headerContent },

  // Document Canvas
  { path: 'apps/react/comments/charts/highcharts/highcharts-comments-demo/components/document/document-canvas.tsx', language: 'typescript', content: codeContent.documentCanvasContent },
  { path: 'apps/react/comments/charts/highcharts/highcharts-comments-demo/components/document/DocumentArticle.tsx', language: 'typescript', content: codeContent.documentArticleContent },

  // Comments Panel
  { path: 'apps/react/comments/charts/highcharts/highcharts-comments-demo/components/comments/CommentsPanel.tsx', language: 'typescript', content: codeContent.commentsPanelContent },

  // Config
  { path: 'apps/react/comments/charts/highcharts/highcharts-comments-demo/next.config.js', language: 'javascript', content: codeContent.nextConfigContent }
]
