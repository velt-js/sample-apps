import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/page-mode-demo.json'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/self-hosting/forms/page-mode-demo/app/page.tsx', language: 'typescript', content: codeContent.pageContent },
  { path: 'apps/react/self-hosting/forms/page-mode-demo/app/layout.tsx', language: 'typescript', content: codeContent.layoutContent },

  // Document
  { path: 'apps/react/self-hosting/forms/page-mode-demo/app/document/DocumentContext.tsx', language: 'typescript', content: codeContent.documentContextContent },
  { path: 'apps/react/self-hosting/forms/page-mode-demo/app/document/useCurrentDocument.ts', language: 'typescript', content: codeContent.useCurrentDocumentContent },

  // User Auth
  { path: 'apps/react/self-hosting/forms/page-mode-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: codeContent.appUserContextContent },
  { path: 'apps/react/self-hosting/forms/page-mode-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: codeContent.appProvidersContent },
  { path: 'apps/react/self-hosting/forms/page-mode-demo/app/userAuth/useAppUser.ts', language: 'typescript', content: codeContent.useAppUserContent },

  // API Routes
  { path: 'apps/react/self-hosting/forms/page-mode-demo/app/api/velt/token/route.ts', language: 'typescript', content: codeContent.tokenRouteContent },

  // Velt Components
  { path: 'apps/react/self-hosting/forms/page-mode-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: codeContent.veltInitializeUserContent },
  { path: 'apps/react/self-hosting/forms/page-mode-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: codeContent.veltInitializeDocumentContent },
  { path: 'apps/react/self-hosting/forms/page-mode-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: codeContent.veltCollaborationContent },
  { path: 'apps/react/self-hosting/forms/page-mode-demo/components/velt/VeltDataProviders.ts', language: 'typescript', content: codeContent.veltDataProvidersContent },
  { path: 'apps/react/self-hosting/forms/page-mode-demo/components/velt/VeltTools.tsx', language: 'typescript', content: codeContent.veltToolsContent },

  // Velt UI Customization
  { path: 'apps/react/self-hosting/forms/page-mode-demo/components/velt/ui-customization/VeltCustomization.tsx', language: 'typescript', content: codeContent.veltCustomizationContent },
  { path: 'apps/react/self-hosting/forms/page-mode-demo/components/velt/ui-customization/VeltCommentBubbleWf.tsx', language: 'typescript', content: codeContent.veltCommentBubbleWfContent },
  { path: 'apps/react/self-hosting/forms/page-mode-demo/components/velt/ui-customization/VeltCommentToolWf.tsx', language: 'typescript', content: codeContent.veltCommentToolWfContent },
  { path: 'apps/react/self-hosting/forms/page-mode-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx', language: 'typescript', content: codeContent.veltSidebarButtonWfContent },
  { path: 'apps/react/self-hosting/forms/page-mode-demo/components/velt/ui-customization/styles.css', language: 'css', content: codeContent.veltStylesContent },

  // Document Canvas & Components
  { path: 'apps/react/self-hosting/forms/page-mode-demo/components/document/document-canvas.tsx', language: 'typescript', content: codeContent.documentCanvasContent },

  // Header
  { path: 'apps/react/self-hosting/forms/page-mode-demo/components/header/header.tsx', language: 'typescript', content: codeContent.headerContent },

  // Styles
  { path: 'apps/react/self-hosting/forms/page-mode-demo/styles/globals.css', language: 'css', content: codeContent.globalStylesContent },

  // Django Backend - Project Config
  { path: 'apps/react/self-hosting/forms/page-mode-demo/app/api/velt/backend/requirements.txt', language: 'text', content: codeContent.backendRequirementsContent },
  { path: 'apps/react/self-hosting/forms/page-mode-demo/app/api/velt/backend/velt_test_project/settings.py', language: 'python', content: codeContent.backendSettingsContent },
  { path: 'apps/react/self-hosting/forms/page-mode-demo/app/api/velt/backend/velt_test_project/urls.py', language: 'python', content: codeContent.backendProjectUrlsContent },

  // Django Backend - Velt API
  { path: 'apps/react/self-hosting/forms/page-mode-demo/app/api/velt/backend/velt_api/velt_sdk.py', language: 'python', content: codeContent.backendVeltSdkContent },
  { path: 'apps/react/self-hosting/forms/page-mode-demo/app/api/velt/backend/velt_api/urls.py', language: 'python', content: codeContent.backendVeltApiUrlsContent },
  { path: 'apps/react/self-hosting/forms/page-mode-demo/app/api/velt/backend/velt_api/views/__init__.py', language: 'python', content: codeContent.backendViewsInitContent },
  { path: 'apps/react/self-hosting/forms/page-mode-demo/app/api/velt/backend/velt_api/views/comment_views.py', language: 'python', content: codeContent.backendCommentViewsContent },
  { path: 'apps/react/self-hosting/forms/page-mode-demo/app/api/velt/backend/velt_api/views/user_views.py', language: 'python', content: codeContent.backendUserViewsContent },
  { path: 'apps/react/self-hosting/forms/page-mode-demo/app/api/velt/backend/velt_api/views/attachment_views.py', language: 'python', content: codeContent.backendAttachmentViewsContent },
  { path: 'apps/react/self-hosting/forms/page-mode-demo/app/api/velt/backend/velt_api/views/reaction_views.py', language: 'python', content: codeContent.backendReactionViewsContent },

  // Django Backend - Host App
  { path: 'apps/react/self-hosting/forms/page-mode-demo/app/api/velt/backend/host_app/urls.py', language: 'python', content: codeContent.backendHostAppUrlsContent },
  { path: 'apps/react/self-hosting/forms/page-mode-demo/app/api/velt/backend/host_app/views.py', language: 'python', content: codeContent.backendHostAppViewsContent }
]
