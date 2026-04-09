import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/quill-comments-demo.json'

// Import all code files using ?raw
import pageContent from '../../../react/comments/text-editors/quill/quill-comments-demo/app/page.tsx?raw'
import layoutContent from '../../../react/comments/text-editors/quill/quill-comments-demo/app/layout.tsx?raw'
import tokenRouteContent from '../../../react/comments/text-editors/quill/quill-comments-demo/app/api/velt/token/route.ts?raw'
import documentContextContent from '../../../react/comments/text-editors/quill/quill-comments-demo/app/document/DocumentContext.tsx?raw'
import useCurrentDocumentContent from '../../../react/comments/text-editors/quill/quill-comments-demo/app/document/useCurrentDocument.ts?raw'
import appUserContextContent from '../../../react/comments/text-editors/quill/quill-comments-demo/app/userAuth/AppUserContext.tsx?raw'
import appProvidersContent from '../../../react/comments/text-editors/quill/quill-comments-demo/app/userAuth/AppProviders.tsx?raw'
import useAppUserContent from '../../../react/comments/text-editors/quill/quill-comments-demo/app/userAuth/useAppUser.ts?raw'
import veltInitializeUserContent from '../../../react/comments/text-editors/quill/quill-comments-demo/components/velt/VeltInitializeUser.tsx?raw'
import veltInitializeDocumentContent from '../../../react/comments/text-editors/quill/quill-comments-demo/components/velt/VeltInitializeDocument.tsx?raw'
import veltCollaborationContent from '../../../react/comments/text-editors/quill/quill-comments-demo/components/velt/VeltCollaboration.tsx?raw'
import veltToolsContent from '../../../react/comments/text-editors/quill/quill-comments-demo/components/velt/VeltTools.tsx?raw'
import veltCustomizationContent from '../../../react/comments/text-editors/quill/quill-comments-demo/components/velt/ui-customization/VeltCustomization.tsx?raw'
import veltCommentToolWfContent from '../../../react/comments/text-editors/quill/quill-comments-demo/components/velt/ui-customization/VeltCommentToolWf.tsx?raw'
import veltNotificationsToolWfContent from '../../../react/comments/text-editors/quill/quill-comments-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx?raw'
import veltSidebarButtonWfContent from '../../../react/comments/text-editors/quill/quill-comments-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx?raw'
import veltUiCustomizationStylesContent from '../../../react/comments/text-editors/quill/quill-comments-demo/components/velt/ui-customization/styles.css?raw'
import documentCanvasContent from '../../../react/comments/text-editors/quill/quill-comments-demo/components/document/document-canvas.tsx?raw'
import quillComponentContent from '../../../react/comments/text-editors/quill/quill-comments-demo/components/document/QuillComponent/QuillComponent.tsx?raw'
import quillIndexContent from '../../../react/comments/text-editors/quill/quill-comments-demo/components/document/QuillComponent/index.tsx?raw'
import quillConstantsContent from '../../../react/comments/text-editors/quill/quill-comments-demo/components/document/QuillComponent/constants.ts?raw'
import quillTypesContent from '../../../react/comments/text-editors/quill/quill-comments-demo/components/document/QuillComponent/types.ts?raw'
import bubbleMenuToolbarContent from '../../../react/comments/text-editors/quill/quill-comments-demo/components/document/QuillComponent/ui/BubbleMenuToolbar.tsx?raw'
import toolbarButtonContent from '../../../react/comments/text-editors/quill/quill-comments-demo/components/document/QuillComponent/ui/ToolbarButton.tsx?raw'
import toolbarDividerContent from '../../../react/comments/text-editors/quill/quill-comments-demo/components/document/QuillComponent/ui/ToolbarDivider.tsx?raw'
import headerContent from '../../../react/comments/text-editors/quill/quill-comments-demo/components/header/header.tsx?raw'
import sidebarContent from '../../../react/comments/text-editors/quill/quill-comments-demo/components/sidebar/sidebar.tsx?raw'
import themeContextContent from '../../../react/comments/text-editors/quill/quill-comments-demo/components/theme/ThemeContext.tsx?raw'
import themeToggleContent from '../../../react/comments/text-editors/quill/quill-comments-demo/components/theme/ThemeToggle.tsx?raw'
import veltLogoContent from '../../../react/comments/text-editors/quill/quill-comments-demo/components/velt-logo.tsx?raw'
import libUtilsContent from '../../../react/comments/text-editors/quill/quill-comments-demo/lib/utils.ts?raw'
import globalsCssContent from '../../../react/comments/text-editors/quill/quill-comments-demo/styles/globals.css?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/app/page.tsx', language: 'typescript', content: codeContent.pageContent },
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/app/layout.tsx', language: 'typescript', content: codeContent.layoutContent },
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/app/api/velt/token/route.ts', language: 'typescript', content: codeContent.tokenRouteContent },

  // Document
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/app/document/DocumentContext.tsx', language: 'typescript', content: codeContent.documentContextContent },
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/app/document/useCurrentDocument.ts', language: 'typescript', content: codeContent.useCurrentDocumentContent },

  // User Auth
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: codeContent.appUserContextContent },
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: codeContent.appProvidersContent },
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/app/userAuth/useAppUser.ts', language: 'typescript', content: codeContent.useAppUserContent },

  // Velt Components
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: codeContent.veltInitializeUserContent },
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: codeContent.veltInitializeDocumentContent },
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: codeContent.veltCollaborationContent },
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/components/velt/VeltTools.tsx', language: 'typescript', content: codeContent.veltToolsContent },

  // Velt UI Customization
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/components/velt/ui-customization/VeltCustomization.tsx', language: 'typescript', content: codeContent.veltCustomizationContent },
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/components/velt/ui-customization/VeltCommentToolWf.tsx', language: 'typescript', content: codeContent.veltCommentToolWfContent },
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx', language: 'typescript', content: codeContent.veltNotificationsToolWfContent },
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx', language: 'typescript', content: codeContent.veltSidebarButtonWfContent },
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/components/velt/ui-customization/styles.css', language: 'css', content: codeContent.veltUiCustomizationStylesContent },

  // Document Canvas
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/components/document/document-canvas.tsx', language: 'typescript', content: codeContent.documentCanvasContent },

  // Quill Component
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/components/document/QuillComponent/QuillComponent.tsx', language: 'typescript', content: codeContent.quillComponentContent },
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/components/document/QuillComponent/index.tsx', language: 'typescript', content: codeContent.quillIndexContent },
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/components/document/QuillComponent/constants.ts', language: 'typescript', content: codeContent.quillConstantsContent },
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/components/document/QuillComponent/types.ts', language: 'typescript', content: codeContent.quillTypesContent },

  // Quill UI Components
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/components/document/QuillComponent/ui/BubbleMenuToolbar.tsx', language: 'typescript', content: codeContent.bubbleMenuToolbarContent },
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/components/document/QuillComponent/ui/ToolbarButton.tsx', language: 'typescript', content: codeContent.toolbarButtonContent },
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/components/document/QuillComponent/ui/ToolbarDivider.tsx', language: 'typescript', content: codeContent.toolbarDividerContent },

  // Header & Sidebar
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/components/header/header.tsx', language: 'typescript', content: codeContent.headerContent },
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/components/sidebar/sidebar.tsx', language: 'typescript', content: codeContent.sidebarContent },

  // Theme
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/components/theme/ThemeContext.tsx', language: 'typescript', content: codeContent.themeContextContent },
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/components/theme/ThemeToggle.tsx', language: 'typescript', content: codeContent.themeToggleContent },

  // Shared Components
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/components/velt-logo.tsx', language: 'typescript', content: codeContent.veltLogoContent },

  // Lib
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/lib/utils.ts', language: 'typescript', content: codeContent.libUtilsContent },

  // Styles
  { path: 'apps/react/comments/text-editors/quill/quill-comments-demo/styles/globals.css', language: 'css', content: codeContent.globalsCssContent },
]
