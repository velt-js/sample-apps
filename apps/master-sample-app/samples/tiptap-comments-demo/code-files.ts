import { SampleCodeFile } from '@/types/sample'

// Import all code files using ?raw
import pageContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/app/page.tsx?raw'
import layoutContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/app/layout.tsx?raw'
import documentContextContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/app/document/DocumentContext.tsx?raw'
import useCurrentDocumentContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/app/document/useCurrentDocument.ts?raw'
import appUserContextContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/app/userAuth/AppUserContext.tsx?raw'
import appProvidersContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/app/userAuth/AppProviders.tsx?raw'
import useAppUserContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/app/userAuth/useAppUser.ts?raw'
import veltInitializeUserContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/velt/VeltInitializeUser.tsx?raw'
import veltInitializeDocumentContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/velt/VeltInitializeDocument.tsx?raw'
import veltCollaborationContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/velt/VeltCollaboration.tsx?raw'
import veltToolsContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/velt/VeltTools.tsx?raw'
import veltCustomizationContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/velt/ui-customization/VeltCustomization.tsx?raw'
import veltCommentToolWfContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/velt/ui-customization/VeltCommentToolWf.tsx?raw'
import veltNotificationsToolWfContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx?raw'
import veltSidebarButtonWfContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx?raw'
import documentCanvasContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/document-canvas.tsx?raw'
import tipTapComponentContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/TipTapComponent.tsx?raw'
import tipTapIndexContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/index.tsx?raw'
import extensionsContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/extensions.ts?raw'
import tipTapConstantsContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/constants.ts?raw'
import tipTapTypesContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/types.ts?raw'
import editorToolbarContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/ui/EditorToolbar.tsx?raw'
import bubbleMenuToolbarContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/ui/BubbleMenuToolbar.tsx?raw'
import toolbarButtonContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/ui/ToolbarButton.tsx?raw'
import toolbarDividerContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/ui/ToolbarDivider.tsx?raw'
import headerContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/header/header.tsx?raw'
import sidebarContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/sidebar/sidebar.tsx?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/app/page.tsx', language: 'typescript', content: pageContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/app/layout.tsx', language: 'typescript', content: layoutContent },
  
  // Document
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/app/document/DocumentContext.tsx', language: 'typescript', content: documentContextContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/app/document/useCurrentDocument.ts', language: 'typescript', content: useCurrentDocumentContent },
  
  // User Auth
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: appUserContextContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: appProvidersContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/app/userAuth/useAppUser.ts', language: 'typescript', content: useAppUserContent },
  
  // Velt Components
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: veltInitializeUserContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: veltInitializeDocumentContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: veltCollaborationContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/velt/VeltTools.tsx', language: 'typescript', content: veltToolsContent },
  
  // Velt UI Customization
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/velt/ui-customization/VeltCustomization.tsx', language: 'typescript', content: veltCustomizationContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/velt/ui-customization/VeltCommentToolWf.tsx', language: 'typescript', content: veltCommentToolWfContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx', language: 'typescript', content: veltNotificationsToolWfContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx', language: 'typescript', content: veltSidebarButtonWfContent },
  
  // Document Canvas
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/document-canvas.tsx', language: 'typescript', content: documentCanvasContent },
  
  // TipTap Component
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/TipTapComponent.tsx', language: 'typescript', content: tipTapComponentContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/index.tsx', language: 'typescript', content: tipTapIndexContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/extensions.ts', language: 'typescript', content: extensionsContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/constants.ts', language: 'typescript', content: tipTapConstantsContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/types.ts', language: 'typescript', content: tipTapTypesContent },
  
  // TipTap UI Components
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/ui/EditorToolbar.tsx', language: 'typescript', content: editorToolbarContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/ui/BubbleMenuToolbar.tsx', language: 'typescript', content: bubbleMenuToolbarContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/ui/ToolbarButton.tsx', language: 'typescript', content: toolbarButtonContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/ui/ToolbarDivider.tsx', language: 'typescript', content: toolbarDividerContent },
  
  // Header & Sidebar
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/header/header.tsx', language: 'typescript', content: headerContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/sidebar/sidebar.tsx', language: 'typescript', content: sidebarContent }
]
