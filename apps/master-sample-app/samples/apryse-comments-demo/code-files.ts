import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/apryse-comments-demo.json'

// Import all code files using ?raw
import pageContent from '../../../react/comments/text-editors/apryse/apryse-comments-demo/app/page.tsx?raw'
import layoutContent from '../../../react/comments/text-editors/apryse/apryse-comments-demo/app/layout.tsx?raw'
import tokenRouteContent from '../../../react/comments/text-editors/apryse/apryse-comments-demo/app/api/velt/token/route.ts?raw'
import documentContextContent from '../../../react/comments/text-editors/apryse/apryse-comments-demo/app/document/DocumentContext.tsx?raw'
import useCurrentDocumentContent from '../../../react/comments/text-editors/apryse/apryse-comments-demo/app/document/useCurrentDocument.ts?raw'
import appUserContextContent from '../../../react/comments/text-editors/apryse/apryse-comments-demo/app/userAuth/AppUserContext.tsx?raw'
import appProvidersContent from '../../../react/comments/text-editors/apryse/apryse-comments-demo/app/userAuth/AppProviders.tsx?raw'
import useAppUserContent from '../../../react/comments/text-editors/apryse/apryse-comments-demo/app/userAuth/useAppUser.ts?raw'
import veltInitializeUserContent from '../../../react/comments/text-editors/apryse/apryse-comments-demo/components/velt/VeltInitializeUser.tsx?raw'
import veltInitializeDocumentContent from '../../../react/comments/text-editors/apryse/apryse-comments-demo/components/velt/VeltInitializeDocument.tsx?raw'
import veltCollaborationContent from '../../../react/comments/text-editors/apryse/apryse-comments-demo/components/velt/VeltCollaboration.tsx?raw'
import veltToolsContent from '../../../react/comments/text-editors/apryse/apryse-comments-demo/components/velt/VeltTools.tsx?raw'
import veltCustomizationContent from '../../../react/comments/text-editors/apryse/apryse-comments-demo/components/velt/ui-customization/VeltCustomization.tsx?raw'
import veltCommentToolWfContent from '../../../react/comments/text-editors/apryse/apryse-comments-demo/components/velt/ui-customization/VeltCommentToolWf.tsx?raw'
import veltNotificationsToolWfContent from '../../../react/comments/text-editors/apryse/apryse-comments-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx?raw'
import veltSidebarButtonWfContent from '../../../react/comments/text-editors/apryse/apryse-comments-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx?raw'
import documentCanvasContent from '../../../react/comments/text-editors/apryse/apryse-comments-demo/components/document/document-canvas.tsx?raw'
import apryseComponentContent from '../../../react/comments/text-editors/apryse/apryse-comments-demo/components/document/ApryseComponent/ApryseComponent.tsx?raw'
import apryseIndexContent from '../../../react/comments/text-editors/apryse/apryse-comments-demo/components/document/ApryseComponent/index.tsx?raw'
import apryseConstantsContent from '../../../react/comments/text-editors/apryse/apryse-comments-demo/components/document/ApryseComponent/constants.ts?raw'
import apryseTypesContent from '../../../react/comments/text-editors/apryse/apryse-comments-demo/components/document/ApryseComponent/types.ts?raw'
import addCommentToolbarContent from '../../../react/comments/text-editors/apryse/apryse-comments-demo/components/document/ApryseComponent/ui/AddCommentToolbar.tsx?raw'
import headerContent from '../../../react/comments/text-editors/apryse/apryse-comments-demo/components/header/header.tsx?raw'
import copyWebviewerAssetsContent from '../../../react/comments/text-editors/apryse/apryse-comments-demo/scripts/copy-webviewer-assets.mjs?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/comments/text-editors/apryse/apryse-comments-demo/app/page.tsx', language: 'typescript', content: codeContent.pageContent },
  { path: 'apps/react/comments/text-editors/apryse/apryse-comments-demo/app/layout.tsx', language: 'typescript', content: codeContent.layoutContent },
  { path: 'apps/react/comments/text-editors/apryse/apryse-comments-demo/app/api/velt/token/route.ts', language: 'typescript', content: codeContent.tokenRouteContent },

  // Document
  { path: 'apps/react/comments/text-editors/apryse/apryse-comments-demo/app/document/DocumentContext.tsx', language: 'typescript', content: codeContent.documentContextContent },
  { path: 'apps/react/comments/text-editors/apryse/apryse-comments-demo/app/document/useCurrentDocument.ts', language: 'typescript', content: codeContent.useCurrentDocumentContent },

  // User Auth
  { path: 'apps/react/comments/text-editors/apryse/apryse-comments-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: codeContent.appUserContextContent },
  { path: 'apps/react/comments/text-editors/apryse/apryse-comments-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: codeContent.appProvidersContent },
  { path: 'apps/react/comments/text-editors/apryse/apryse-comments-demo/app/userAuth/useAppUser.ts', language: 'typescript', content: codeContent.useAppUserContent },

  // Velt Components
  { path: 'apps/react/comments/text-editors/apryse/apryse-comments-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: codeContent.veltInitializeUserContent },
  { path: 'apps/react/comments/text-editors/apryse/apryse-comments-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: codeContent.veltInitializeDocumentContent },
  { path: 'apps/react/comments/text-editors/apryse/apryse-comments-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: codeContent.veltCollaborationContent },
  { path: 'apps/react/comments/text-editors/apryse/apryse-comments-demo/components/velt/VeltTools.tsx', language: 'typescript', content: codeContent.veltToolsContent },

  // Velt UI Customization
  { path: 'apps/react/comments/text-editors/apryse/apryse-comments-demo/components/velt/ui-customization/VeltCustomization.tsx', language: 'typescript', content: codeContent.veltCustomizationContent },
  { path: 'apps/react/comments/text-editors/apryse/apryse-comments-demo/components/velt/ui-customization/VeltCommentToolWf.tsx', language: 'typescript', content: codeContent.veltCommentToolWfContent },
  { path: 'apps/react/comments/text-editors/apryse/apryse-comments-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx', language: 'typescript', content: codeContent.veltNotificationsToolWfContent },
  { path: 'apps/react/comments/text-editors/apryse/apryse-comments-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx', language: 'typescript', content: codeContent.veltSidebarButtonWfContent },

  // Document Canvas
  { path: 'apps/react/comments/text-editors/apryse/apryse-comments-demo/components/document/document-canvas.tsx', language: 'typescript', content: codeContent.documentCanvasContent },

  // Apryse Component
  { path: 'apps/react/comments/text-editors/apryse/apryse-comments-demo/components/document/ApryseComponent/ApryseComponent.tsx', language: 'typescript', content: codeContent.apryseComponentContent },
  { path: 'apps/react/comments/text-editors/apryse/apryse-comments-demo/components/document/ApryseComponent/index.tsx', language: 'typescript', content: codeContent.apryseIndexContent },
  { path: 'apps/react/comments/text-editors/apryse/apryse-comments-demo/components/document/ApryseComponent/constants.ts', language: 'typescript', content: codeContent.apryseConstantsContent },
  { path: 'apps/react/comments/text-editors/apryse/apryse-comments-demo/components/document/ApryseComponent/types.ts', language: 'typescript', content: codeContent.apryseTypesContent },

  // Apryse UI Components
  { path: 'apps/react/comments/text-editors/apryse/apryse-comments-demo/components/document/ApryseComponent/ui/AddCommentToolbar.tsx', language: 'typescript', content: codeContent.addCommentToolbarContent },

  // Header
  { path: 'apps/react/comments/text-editors/apryse/apryse-comments-demo/components/header/header.tsx', language: 'typescript', content: codeContent.headerContent },

  // Apryse WebViewer asset copy script (postinstall)
  { path: 'apps/react/comments/text-editors/apryse/apryse-comments-demo/scripts/copy-webviewer-assets.mjs', language: 'javascript', content: codeContent.copyWebviewerAssetsContent }
]
