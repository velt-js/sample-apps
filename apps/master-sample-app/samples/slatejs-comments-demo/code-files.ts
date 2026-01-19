import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/slatejs-comments-demo.json'

// Import all code files using ?raw
import pageContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/app/page.tsx?raw'
import layoutContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/app/layout.tsx?raw'
import documentContextContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/app/document/DocumentContext.tsx?raw'
import useCurrentDocumentContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/app/document/useCurrentDocument.ts?raw'
import appUserContextContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/app/userAuth/AppUserContext.tsx?raw'
import appProvidersContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/app/userAuth/AppProviders.tsx?raw'
import useAppUserContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/app/userAuth/useAppUser.ts?raw'
import veltInitializeUserContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/components/velt/VeltInitializeUser.tsx?raw'
import veltInitializeDocumentContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/components/velt/VeltInitializeDocument.tsx?raw'
import veltCollaborationContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/components/velt/VeltCollaboration.tsx?raw'
import veltToolsContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/components/velt/VeltTools.tsx?raw'
import veltCustomizationContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/components/velt/ui-customization/VeltCustomization.tsx?raw'
import veltCommentToolWfContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/components/velt/ui-customization/VeltCommentToolWf.tsx?raw'
import veltNotificationsToolWfContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx?raw'
import veltSidebarButtonWfContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx?raw'
import documentCanvasContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/components/document/document-canvas.tsx?raw'
import slateJSComponentContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/components/document/SlateJSComponent/SlateJSComponent.tsx?raw'
import slateJSIndexContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/components/document/SlateJSComponent/index.tsx?raw'
import slateJSConstantsContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/components/document/SlateJSComponent/constants.ts?raw'
import slateJSTypesContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/components/document/SlateJSComponent/types.ts?raw'
import bubbleMenuToolbarContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/components/document/SlateJSComponent/ui/BubbleMenuToolbar.tsx?raw'
import toolbarButtonContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/components/document/SlateJSComponent/ui/ToolbarButton.tsx?raw'
import toolbarDividerContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/components/document/SlateJSComponent/ui/ToolbarDivider.tsx?raw'
import headerContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/components/header/header.tsx?raw'
import sidebarContent from '../../../react/comments/text-editors/slatejs/slatejs-comments-demo/components/sidebar/sidebar.tsx?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/app/page.tsx', language: 'typescript', content: codeContent.pageContent },
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/app/layout.tsx', language: 'typescript', content: codeContent.layoutContent },
  
  // Document
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/app/document/DocumentContext.tsx', language: 'typescript', content: codeContent.documentContextContent },
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/app/document/useCurrentDocument.ts', language: 'typescript', content: codeContent.useCurrentDocumentContent },
  
  // User Auth
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: codeContent.appUserContextContent },
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: codeContent.appProvidersContent },
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/app/userAuth/useAppUser.ts', language: 'typescript', content: codeContent.useAppUserContent },
  
  // Velt Components
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: codeContent.veltInitializeUserContent },
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: codeContent.veltInitializeDocumentContent },
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: codeContent.veltCollaborationContent },
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/components/velt/VeltTools.tsx', language: 'typescript', content: codeContent.veltToolsContent },
  
  // Velt UI Customization
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/components/velt/ui-customization/VeltCustomization.tsx', language: 'typescript', content: codeContent.veltCustomizationContent },
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/components/velt/ui-customization/VeltCommentToolWf.tsx', language: 'typescript', content: codeContent.veltCommentToolWfContent },
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx', language: 'typescript', content: codeContent.veltNotificationsToolWfContent },
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx', language: 'typescript', content: codeContent.veltSidebarButtonWfContent },
  
  // Document Canvas
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/components/document/document-canvas.tsx', language: 'typescript', content: codeContent.documentCanvasContent },
  
  // SlateJS Component
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/components/document/SlateJSComponent/SlateJSComponent.tsx', language: 'typescript', content: codeContent.slateJSComponentContent },
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/components/document/SlateJSComponent/index.tsx', language: 'typescript', content: codeContent.slateJSIndexContent },
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/components/document/SlateJSComponent/constants.ts', language: 'typescript', content: codeContent.slateJSConstantsContent },
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/components/document/SlateJSComponent/types.ts', language: 'typescript', content: codeContent.slateJSTypesContent },
  
  // SlateJS UI Components
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/components/document/SlateJSComponent/ui/BubbleMenuToolbar.tsx', language: 'typescript', content: codeContent.bubbleMenuToolbarContent },
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/components/document/SlateJSComponent/ui/ToolbarButton.tsx', language: 'typescript', content: codeContent.toolbarButtonContent },
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/components/document/SlateJSComponent/ui/ToolbarDivider.tsx', language: 'typescript', content: codeContent.toolbarDividerContent },
  
  // Header & Sidebar
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/components/header/header.tsx', language: 'typescript', content: codeContent.headerContent },
  { path: 'apps/react/comments/text-editors/slatejs/slatejs-comments-demo/components/sidebar/sidebar.tsx', language: 'typescript', content: codeContent.sidebarContent }
]

