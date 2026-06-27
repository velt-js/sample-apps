import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/spreadjs-comments-demo.json'

// Import all code files using ?raw
import pageContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/app/page.tsx?raw'
import layoutContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/app/layout.tsx?raw'
import tokenRouteContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/app/api/velt/token/route.ts?raw'
import documentContextContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/app/document/DocumentContext.tsx?raw'
import useCurrentDocumentContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/app/document/useCurrentDocument.ts?raw'
import appUserContextContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/app/userAuth/AppUserContext.tsx?raw'
import appProvidersContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/app/userAuth/AppProviders.tsx?raw'
import useAppUserContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/app/userAuth/useAppUser.ts?raw'
import veltInitializeUserContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/velt/VeltInitializeUser.tsx?raw'
import veltInitializeDocumentContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/velt/VeltInitializeDocument.tsx?raw'
import veltCollaborationContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/velt/VeltCollaboration.tsx?raw'
import veltToolsContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/velt/VeltTools.tsx?raw'
import veltCustomizationContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/velt/ui-customization/VeltCustomization.tsx?raw'
import veltCommentToolWfContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/velt/ui-customization/VeltCommentToolWf.tsx?raw'
import veltNotificationsToolWfContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx?raw'
import veltSidebarButtonWfContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx?raw'
import veltUiStylesContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/velt/ui-customization/styles.css?raw'
import documentCanvasContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/document/document-canvas.tsx?raw'
import spreadjsComponentContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/document/SpreadJSComponent/SpreadJSComponent.tsx?raw'
import spreadjsIndexContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/document/SpreadJSComponent/index.tsx?raw'
import spreadjsConstantsContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/document/SpreadJSComponent/constants.ts?raw'
import spreadjsTypesContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/document/SpreadJSComponent/types.ts?raw'
import addCommentToolbarContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/document/SpreadJSComponent/ui/AddCommentToolbar.tsx?raw'
import headerContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/header/header.tsx?raw'
import sidebarContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/sidebar/sidebar.tsx?raw'
import themeContextContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/theme/ThemeContext.tsx?raw'
import themeToggleContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/theme/ThemeToggle.tsx?raw'
import veltLogoContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/velt-logo.tsx?raw'
import utilsContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/lib/utils.ts?raw'
import spreadSheetsIoTypesContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/types/spread-sheets-io.d.ts?raw'
import globalStylesContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/styles/globals.css?raw'
import nextConfigContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/next.config.js?raw'
import packageJsonContent from '../../../react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/package.json?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/app/page.tsx', language: 'typescript', content: codeContent.pageContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/app/layout.tsx', language: 'typescript', content: codeContent.layoutContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/app/api/velt/token/route.ts', language: 'typescript', content: codeContent.tokenRouteContent },

  // Document
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/app/document/DocumentContext.tsx', language: 'typescript', content: codeContent.documentContextContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/app/document/useCurrentDocument.ts', language: 'typescript', content: codeContent.useCurrentDocumentContent },

  // User Auth
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: codeContent.appUserContextContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: codeContent.appProvidersContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/app/userAuth/useAppUser.ts', language: 'typescript', content: codeContent.useAppUserContent },

  // Velt Components
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: codeContent.veltInitializeUserContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: codeContent.veltInitializeDocumentContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: codeContent.veltCollaborationContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/velt/VeltTools.tsx', language: 'typescript', content: codeContent.veltToolsContent },

  // Velt UI Customization
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/velt/ui-customization/VeltCustomization.tsx', language: 'typescript', content: codeContent.veltCustomizationContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/velt/ui-customization/VeltCommentToolWf.tsx', language: 'typescript', content: codeContent.veltCommentToolWfContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx', language: 'typescript', content: codeContent.veltNotificationsToolWfContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx', language: 'typescript', content: codeContent.veltSidebarButtonWfContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/velt/ui-customization/styles.css', language: 'css', content: codeContent.veltUiStylesContent },

  // Document Canvas
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/document/document-canvas.tsx', language: 'typescript', content: codeContent.documentCanvasContent },

  // SpreadJS Component
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/document/SpreadJSComponent/SpreadJSComponent.tsx', language: 'typescript', content: codeContent.spreadjsComponentContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/document/SpreadJSComponent/index.tsx', language: 'typescript', content: codeContent.spreadjsIndexContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/document/SpreadJSComponent/constants.ts', language: 'typescript', content: codeContent.spreadjsConstantsContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/document/SpreadJSComponent/types.ts', language: 'typescript', content: codeContent.spreadjsTypesContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/document/SpreadJSComponent/ui/AddCommentToolbar.tsx', language: 'typescript', content: codeContent.addCommentToolbarContent },

  // Shared UI
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/header/header.tsx', language: 'typescript', content: codeContent.headerContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/sidebar/sidebar.tsx', language: 'typescript', content: codeContent.sidebarContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/theme/ThemeContext.tsx', language: 'typescript', content: codeContent.themeContextContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/theme/ThemeToggle.tsx', language: 'typescript', content: codeContent.themeToggleContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/components/velt-logo.tsx', language: 'typescript', content: codeContent.veltLogoContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/lib/utils.ts', language: 'typescript', content: codeContent.utilsContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/types/spread-sheets-io.d.ts', language: 'typescript', content: codeContent.spreadSheetsIoTypesContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/styles/globals.css', language: 'css', content: codeContent.globalStylesContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/next.config.js', language: 'javascript', content: codeContent.nextConfigContent },
  { path: 'apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo/package.json', language: 'json', content: codeContent.packageJsonContent }
]
