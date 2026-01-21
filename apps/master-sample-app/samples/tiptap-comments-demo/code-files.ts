import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/tiptap-comments-demo.json'

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
import bubbleMenuToolbarContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/ui/BubbleMenuToolbar.tsx?raw'
import toolbarButtonContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/ui/ToolbarButton.tsx?raw'
import toolbarDividerContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/ui/ToolbarDivider.tsx?raw'
import headerContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/header/header.tsx?raw'
import sidebarContent from '../../../react/comments/text-editors/tiptap/tiptap-comments-demo/components/sidebar/sidebar.tsx?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/app/page.tsx', language: 'typescript', content: codeContent.pageContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/app/layout.tsx', language: 'typescript', content: codeContent.layoutContent },
  
  // Document
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/app/document/DocumentContext.tsx', language: 'typescript', content: codeContent.documentContextContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/app/document/useCurrentDocument.ts', language: 'typescript', content: codeContent.useCurrentDocumentContent },
  
  // User Auth
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: codeContent.appUserContextContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: codeContent.appProvidersContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/app/userAuth/useAppUser.ts', language: 'typescript', content: codeContent.useAppUserContent },
  
  // Velt Components
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: codeContent.veltInitializeUserContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: codeContent.veltInitializeDocumentContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: codeContent.veltCollaborationContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/velt/VeltTools.tsx', language: 'typescript', content: codeContent.veltToolsContent },
  
  // Velt UI Customization
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/velt/ui-customization/VeltCustomization.tsx', language: 'typescript', content: codeContent.veltCustomizationContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/velt/ui-customization/VeltCommentToolWf.tsx', language: 'typescript', content: codeContent.veltCommentToolWfContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx', language: 'typescript', content: codeContent.veltNotificationsToolWfContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx', language: 'typescript', content: codeContent.veltSidebarButtonWfContent },
  
  // Document Canvas
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/document-canvas.tsx', language: 'typescript', content: codeContent.documentCanvasContent },
  
  // TipTap Component
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/TipTapComponent.tsx', language: 'typescript', content: codeContent.tipTapComponentContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/index.tsx', language: 'typescript', content: codeContent.tipTapIndexContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/extensions.ts', language: 'typescript', content: codeContent.extensionsContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/constants.ts', language: 'typescript', content: codeContent.tipTapConstantsContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/types.ts', language: 'typescript', content: codeContent.tipTapTypesContent },
  
  // TipTap UI Components
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/ui/BubbleMenuToolbar.tsx', language: 'typescript', content: codeContent.bubbleMenuToolbarContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/ui/ToolbarButton.tsx', language: 'typescript', content: codeContent.toolbarButtonContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/document/TipTapComponent/ui/ToolbarDivider.tsx', language: 'typescript', content: codeContent.toolbarDividerContent },
  
  // Header & Sidebar
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/header/header.tsx', language: 'typescript', content: codeContent.headerContent },
  { path: 'apps/react/comments/text-editors/tiptap/tiptap-comments-demo/components/sidebar/sidebar.tsx', language: 'typescript', content: codeContent.sidebarContent }
]
