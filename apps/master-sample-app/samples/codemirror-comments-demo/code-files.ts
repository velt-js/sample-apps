import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/codemirror-comments-demo.json'

// Import all code files using ?raw
import pageContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/app/page.tsx?raw'
import layoutContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/app/layout.tsx?raw'
import tokenRouteContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/app/api/velt/token/route.ts?raw'
import documentContextContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/app/document/DocumentContext.tsx?raw'
import useCurrentDocumentContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/app/document/useCurrentDocument.ts?raw'
import appUserContextContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/app/userAuth/AppUserContext.tsx?raw'
import appProvidersContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/app/userAuth/AppProviders.tsx?raw'
import useAppUserContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/app/userAuth/useAppUser.ts?raw'
import veltInitializeUserContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/components/velt/VeltInitializeUser.tsx?raw'
import veltInitializeDocumentContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/components/velt/VeltInitializeDocument.tsx?raw'
import veltCollaborationContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/components/velt/VeltCollaboration.tsx?raw'
import veltToolsContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/components/velt/VeltTools.tsx?raw'
import veltCustomizationContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/components/velt/ui-customization/VeltCustomization.tsx?raw'
import veltCommentBubbleWfContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/components/velt/ui-customization/VeltCommentBubbleWf.tsx?raw'
import veltCommentToolWfContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/components/velt/ui-customization/VeltCommentToolWf.tsx?raw'
import veltNotificationsToolWfContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx?raw'
import veltSidebarButtonWfContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx?raw'
import veltStylesContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/components/velt/ui-customization/styles.css?raw'
import documentCanvasContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/components/document/document-canvas.tsx?raw'
import codeMirrorComponentContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/components/document/CodeMirrorComponent/CodeMirrorComponent.tsx?raw'
import bubbleMenuToolbarContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/components/document/CodeMirrorComponent/ui/BubbleMenuToolbar.tsx?raw'
import headerContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/components/header/header.tsx?raw'
import sidebarContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/components/sidebar/sidebar.tsx?raw'
import themeContextContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/components/theme/ThemeContext.tsx?raw'
import themeToggleContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/components/theme/ThemeToggle.tsx?raw'
import veltLogoContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/components/velt-logo.tsx?raw'
import utilsContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/lib/utils.ts?raw'
import globalsContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/styles/globals.css?raw'
import codemirrorCssContent from '../../../react/comments/text-editors/codemirror/codemirror-comments-demo/styles/codemirror.css?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/app/page.tsx', language: 'typescript', content: codeContent.pageContent },
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/app/layout.tsx', language: 'typescript', content: codeContent.layoutContent },

  // API
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/app/api/velt/token/route.ts', language: 'typescript', content: codeContent.tokenRouteContent },

  // Document
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/app/document/DocumentContext.tsx', language: 'typescript', content: codeContent.documentContextContent },
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/app/document/useCurrentDocument.ts', language: 'typescript', content: codeContent.useCurrentDocumentContent },

  // User Auth
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: codeContent.appUserContextContent },
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: codeContent.appProvidersContent },
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/app/userAuth/useAppUser.ts', language: 'typescript', content: codeContent.useAppUserContent },

  // Velt Components
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: codeContent.veltInitializeUserContent },
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: codeContent.veltInitializeDocumentContent },
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: codeContent.veltCollaborationContent },
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/components/velt/VeltTools.tsx', language: 'typescript', content: codeContent.veltToolsContent },

  // Velt UI Customization
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/components/velt/ui-customization/VeltCustomization.tsx', language: 'typescript', content: codeContent.veltCustomizationContent },
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/components/velt/ui-customization/VeltCommentBubbleWf.tsx', language: 'typescript', content: codeContent.veltCommentBubbleWfContent },
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/components/velt/ui-customization/VeltCommentToolWf.tsx', language: 'typescript', content: codeContent.veltCommentToolWfContent },
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx', language: 'typescript', content: codeContent.veltNotificationsToolWfContent },
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx', language: 'typescript', content: codeContent.veltSidebarButtonWfContent },
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/components/velt/ui-customization/styles.css', language: 'css', content: codeContent.veltStylesContent },

  // Document Canvas
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/components/document/document-canvas.tsx', language: 'typescript', content: codeContent.documentCanvasContent },

  // CodeMirror Component
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/components/document/CodeMirrorComponent/CodeMirrorComponent.tsx', language: 'typescript', content: codeContent.codeMirrorComponentContent },
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/components/document/CodeMirrorComponent/ui/BubbleMenuToolbar.tsx', language: 'typescript', content: codeContent.bubbleMenuToolbarContent },

  // Header & Sidebar
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/components/header/header.tsx', language: 'typescript', content: codeContent.headerContent },
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/components/sidebar/sidebar.tsx', language: 'typescript', content: codeContent.sidebarContent },

  // Theme
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/components/theme/ThemeContext.tsx', language: 'typescript', content: codeContent.themeContextContent },
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/components/theme/ThemeToggle.tsx', language: 'typescript', content: codeContent.themeToggleContent },

  // Shared Components
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/components/velt-logo.tsx', language: 'typescript', content: codeContent.veltLogoContent },

  // Lib
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/lib/utils.ts', language: 'typescript', content: codeContent.utilsContent },

  // Styles
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/styles/globals.css', language: 'css', content: codeContent.globalsContent },
  { path: 'apps/react/comments/text-editors/codemirror/codemirror-comments-demo/styles/codemirror.css', language: 'css', content: codeContent.codemirrorCssContent }
]
