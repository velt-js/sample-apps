import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/ckeditor-comments-demo.json'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/app/page.tsx', language: 'typescript', content: codeContent.pageContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/app/layout.tsx', language: 'typescript', content: codeContent.layoutContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/app/api/velt/token/route.ts', language: 'typescript', content: codeContent.tokenRouteContent },

  // Document
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/app/document/DocumentContext.tsx', language: 'typescript', content: codeContent.documentContextContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/app/document/useCurrentDocument.ts', language: 'typescript', content: codeContent.useCurrentDocumentContent },

  // User Auth
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: codeContent.appUserContextContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: codeContent.appProvidersContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/app/userAuth/useAppUser.ts', language: 'typescript', content: codeContent.useAppUserContent },

  // Velt Components
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: codeContent.veltInitializeUserContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: codeContent.veltInitializeDocumentContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: codeContent.veltCollaborationContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/components/velt/VeltTools.tsx', language: 'typescript', content: codeContent.veltToolsContent },

  // Velt UI Customization
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/components/velt/ui-customization/VeltCustomization.tsx', language: 'typescript', content: codeContent.veltCustomizationContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/components/velt/ui-customization/VeltCommentToolWf.tsx', language: 'typescript', content: codeContent.veltCommentToolWfContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx', language: 'typescript', content: codeContent.veltNotificationsToolWfContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx', language: 'typescript', content: codeContent.veltSidebarButtonWfContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/components/velt/ui-customization/styles.css', language: 'css', content: codeContent.veltUiStylesContent },

  // Document Canvas
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/components/document/document-canvas.tsx', language: 'typescript', content: codeContent.documentCanvasContent },

  // CKEditor Component
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/components/document/CKEditorComponent/CKEditorComponent.tsx', language: 'typescript', content: codeContent.ckeditorComponentContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/components/document/CKEditorComponent/index.tsx', language: 'typescript', content: codeContent.ckeditorIndexContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/components/document/CKEditorComponent/constants.ts', language: 'typescript', content: codeContent.ckeditorConstantsContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/components/document/CKEditorComponent/types.ts', language: 'typescript', content: codeContent.ckeditorTypesContent },

  // CKEditor UI Components
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/components/document/CKEditorComponent/ui/BubbleMenuToolbar.tsx', language: 'typescript', content: codeContent.bubbleMenuToolbarContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/components/document/CKEditorComponent/ui/ToolbarButton.tsx', language: 'typescript', content: codeContent.toolbarButtonContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/components/document/CKEditorComponent/ui/ToolbarDivider.tsx', language: 'typescript', content: codeContent.toolbarDividerContent },

  // Shared UI
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/components/header/header.tsx', language: 'typescript', content: codeContent.headerContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/components/sidebar/sidebar.tsx', language: 'typescript', content: codeContent.sidebarContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/components/theme/ThemeContext.tsx', language: 'typescript', content: codeContent.themeContextContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/components/theme/ThemeToggle.tsx', language: 'typescript', content: codeContent.themeToggleContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/components/velt-logo.tsx', language: 'typescript', content: codeContent.veltLogoContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/lib/utils.ts', language: 'typescript', content: codeContent.utilsContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/styles/globals.css', language: 'css', content: codeContent.globalStylesContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/next.config.js', language: 'javascript', content: codeContent.nextConfigContent },
  { path: 'apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo/package.json', language: 'json', content: codeContent.packageJsonContent }
]
