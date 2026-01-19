import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/freestyle-comments-demo.json'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/comments/website-builder/freestyle-comments/freestyle-comments-demo/app/page.tsx', language: 'typescript', content: codeContent.pageContent },
  { path: 'apps/react/comments/website-builder/freestyle-comments/freestyle-comments-demo/app/layout.tsx', language: 'typescript', content: codeContent.layoutContent },

  // Document
  { path: 'apps/react/comments/website-builder/freestyle-comments/freestyle-comments-demo/app/document/DocumentContext.tsx', language: 'typescript', content: codeContent.documentContextContent },

  // User Auth
  { path: 'apps/react/comments/website-builder/freestyle-comments/freestyle-comments-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: codeContent.appUserContextContent },
  { path: 'apps/react/comments/website-builder/freestyle-comments/freestyle-comments-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: codeContent.appProvidersContent },

  // Velt Components
  { path: 'apps/react/comments/website-builder/freestyle-comments/freestyle-comments-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: codeContent.veltInitializeUserContent },
  { path: 'apps/react/comments/website-builder/freestyle-comments/freestyle-comments-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: codeContent.veltInitializeDocumentContent },
  { path: 'apps/react/comments/website-builder/freestyle-comments/freestyle-comments-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: codeContent.veltCollaborationContent },
  { path: 'apps/react/comments/website-builder/freestyle-comments/freestyle-comments-demo/components/velt/VeltTools.tsx', language: 'typescript', content: codeContent.veltToolsContent },

  // Document Canvas & Components
  { path: 'apps/react/comments/website-builder/freestyle-comments/freestyle-comments-demo/components/document/document-canvas.tsx', language: 'typescript', content: codeContent.documentCanvasContent },
  { path: 'apps/react/comments/website-builder/freestyle-comments/freestyle-comments-demo/components/document/FreestyleCanvas/FreestyleCanvas.tsx', language: 'typescript', content: codeContent.freestyleCanvasContent },

  // Header
  { path: 'apps/react/comments/website-builder/freestyle-comments/freestyle-comments-demo/components/header/header.tsx', language: 'typescript', content: codeContent.headerContent },

  // Sidebar
  { path: 'apps/react/comments/website-builder/freestyle-comments/freestyle-comments-demo/components/sidebar/sidebar.tsx', language: 'typescript', content: codeContent.sidebarContent }
]
