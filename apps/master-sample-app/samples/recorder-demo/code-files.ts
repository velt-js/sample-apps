import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/recorder-demo.json'

// Import all code files using ?raw
import pageContent from '../../../react/recorder/document/custom/recorder-demo/app/page.tsx?raw'
import layoutContent from '../../../react/recorder/document/custom/recorder-demo/app/layout.tsx?raw'
import documentContextContent from '../../../react/recorder/document/custom/recorder-demo/app/document/DocumentContext.tsx?raw'
import useCurrentDocumentContent from '../../../react/recorder/document/custom/recorder-demo/app/document/useCurrentDocument.ts?raw'
import appUserContextContent from '../../../react/recorder/document/custom/recorder-demo/app/userAuth/AppUserContext.tsx?raw'
import appProvidersContent from '../../../react/recorder/document/custom/recorder-demo/app/userAuth/AppProviders.tsx?raw'
import useAppUserContent from '../../../react/recorder/document/custom/recorder-demo/app/userAuth/useAppUser.ts?raw'
import veltInitializeUserContent from '../../../react/recorder/document/custom/recorder-demo/components/velt/VeltInitializeUser.tsx?raw'
import veltInitializeDocumentContent from '../../../react/recorder/document/custom/recorder-demo/components/velt/VeltInitializeDocument.tsx?raw'
import veltCollaborationContent from '../../../react/recorder/document/custom/recorder-demo/components/velt/VeltCollaboration.tsx?raw'
import veltRecorderConfigContent from '../../../react/recorder/document/custom/recorder-demo/components/velt/VeltRecorderConfig.tsx?raw'
import veltToolsContent from '../../../react/recorder/document/custom/recorder-demo/components/velt/VeltTools.tsx?raw'
import recordingStatusIndicatorContent from '../../../react/recorder/document/custom/recorder-demo/components/velt/RecordingStatusIndicator.tsx?raw'
import veltCustomizationContent from '../../../react/recorder/document/custom/recorder-demo/components/velt/ui-customization/VeltCustomization.tsx?raw'
import headerContent from '../../../react/recorder/document/custom/recorder-demo/components/header/header.tsx?raw'
import documentCanvasContent from '../../../react/recorder/document/custom/recorder-demo/components/document/document-canvas.tsx?raw'
import documentArticleContent from '../../../react/recorder/document/custom/recorder-demo/components/document/DocumentArticle.tsx?raw'
import recordingsPanelContent from '../../../react/recorder/document/custom/recorder-demo/components/recordings/RecordingsPanel.tsx?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/recorder/document/custom/recorder-demo/app/page.tsx', language: 'typescript', content: codeContent.pageContent },
  { path: 'apps/react/recorder/document/custom/recorder-demo/app/layout.tsx', language: 'typescript', content: codeContent.layoutContent },

  // Document
  { path: 'apps/react/recorder/document/custom/recorder-demo/app/document/DocumentContext.tsx', language: 'typescript', content: codeContent.documentContextContent },
  { path: 'apps/react/recorder/document/custom/recorder-demo/app/document/useCurrentDocument.ts', language: 'typescript', content: codeContent.useCurrentDocumentContent },

  // User Auth
  { path: 'apps/react/recorder/document/custom/recorder-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: codeContent.appUserContextContent },
  { path: 'apps/react/recorder/document/custom/recorder-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: codeContent.appProvidersContent },
  { path: 'apps/react/recorder/document/custom/recorder-demo/app/userAuth/useAppUser.ts', language: 'typescript', content: codeContent.useAppUserContent },

  // Velt Components
  { path: 'apps/react/recorder/document/custom/recorder-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: codeContent.veltInitializeUserContent },
  { path: 'apps/react/recorder/document/custom/recorder-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: codeContent.veltInitializeDocumentContent },
  { path: 'apps/react/recorder/document/custom/recorder-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: codeContent.veltCollaborationContent },
  { path: 'apps/react/recorder/document/custom/recorder-demo/components/velt/VeltRecorderConfig.tsx', language: 'typescript', content: codeContent.veltRecorderConfigContent },
  { path: 'apps/react/recorder/document/custom/recorder-demo/components/velt/VeltTools.tsx', language: 'typescript', content: codeContent.veltToolsContent },
  { path: 'apps/react/recorder/document/custom/recorder-demo/components/velt/RecordingStatusIndicator.tsx', language: 'typescript', content: codeContent.recordingStatusIndicatorContent },
  { path: 'apps/react/recorder/document/custom/recorder-demo/components/velt/ui-customization/VeltCustomization.tsx', language: 'typescript', content: codeContent.veltCustomizationContent },

  // Header
  { path: 'apps/react/recorder/document/custom/recorder-demo/components/header/header.tsx', language: 'typescript', content: codeContent.headerContent },

  // Document Canvas
  { path: 'apps/react/recorder/document/custom/recorder-demo/components/document/document-canvas.tsx', language: 'typescript', content: codeContent.documentCanvasContent },
  { path: 'apps/react/recorder/document/custom/recorder-demo/components/document/DocumentArticle.tsx', language: 'typescript', content: codeContent.documentArticleContent },

  // Recordings Panel
  { path: 'apps/react/recorder/document/custom/recorder-demo/components/recordings/RecordingsPanel.tsx', language: 'typescript', content: codeContent.recordingsPanelContent }
]
