import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/core-react-array-crdt-demo.json'

// Import all code files using ?raw
import pageContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/app/page.tsx?raw'
import layoutContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/app/layout.tsx?raw'
import documentContextContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/app/document/DocumentContext.tsx?raw'
import useCurrentDocumentContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/app/document/useCurrentDocument.ts?raw'
import appProvidersContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/app/userAuth/AppProviders.tsx?raw'
import appUserContextContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/app/userAuth/AppUserContext.tsx?raw'
import useAppUserContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/app/userAuth/useAppUser.ts?raw'
import tokenRouteContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/app/api/velt/token/route.ts?raw'
import veltInitializeUserContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/components/velt/VeltInitializeUser.tsx?raw'
import veltInitializeDocumentContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/components/velt/VeltInitializeDocument.tsx?raw'
import veltCollaborationContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/components/velt/VeltCollaboration.tsx?raw'
import veltToolsContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/components/velt/VeltTools.tsx?raw'
import useVeltEventHandlersContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/components/velt/useVeltEventHandlers.ts?raw'
import veltCustomizationContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/components/velt/ui-customization/VeltCustomization.tsx?raw'
import veltCommentToolWfContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/components/velt/ui-customization/VeltCommentToolWf.tsx?raw'
import veltCommentBubbleWfContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/components/velt/ui-customization/VeltCommentBubbleWf.tsx?raw'
import veltSidebarButtonWfContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx?raw'
import veltNotificationsToolWfContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx?raw'
import veltUiStylesContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/components/velt/ui-customization/styles.css?raw'
import documentCanvasContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/components/document/document-canvas.tsx?raw'
import taskListEditorContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/components/document/TaskListEditor/TaskListEditor.tsx?raw'
import taskRowContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/components/document/TaskListEditor/TaskRow.tsx?raw'
import taskCommentsModalContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/components/document/TaskListEditor/TaskCommentsModal.tsx?raw'
import taskListSidebarContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/components/document/TaskListEditor/TaskListSidebar.tsx?raw'
import taskListConstantsContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/components/document/TaskListEditor/constants.ts?raw'
import taskListIconsContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/components/document/TaskListEditor/icons.tsx?raw'
import taskListTypesContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/components/document/TaskListEditor/types.ts?raw'
import taskListIndexContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/components/document/TaskListEditor/index.ts?raw'
import themeContextContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/components/theme/ThemeContext.tsx?raw'
import themeToggleContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/components/theme/ThemeToggle.tsx?raw'
import headerContent from '../../../react/crdt/text-editors/core/core-react-array-crdt-demo/components/header/header.tsx?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/app/page.tsx', language: 'typescript', content: codeContent.pageContent },
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/app/layout.tsx', language: 'typescript', content: codeContent.layoutContent },

  // Document
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/app/document/DocumentContext.tsx', language: 'typescript', content: codeContent.documentContextContent },
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/app/document/useCurrentDocument.ts', language: 'typescript', content: codeContent.useCurrentDocumentContent },

  // User Auth
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: codeContent.appProvidersContent },
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: codeContent.appUserContextContent },
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/app/userAuth/useAppUser.ts', language: 'typescript', content: codeContent.useAppUserContent },

  // API
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/app/api/velt/token/route.ts', language: 'typescript', content: codeContent.tokenRouteContent },

  // Velt Components
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: codeContent.veltInitializeUserContent },
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: codeContent.veltInitializeDocumentContent },
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: codeContent.veltCollaborationContent },
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/components/velt/VeltTools.tsx', language: 'typescript', content: codeContent.veltToolsContent },
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/components/velt/useVeltEventHandlers.ts', language: 'typescript', content: codeContent.useVeltEventHandlersContent },

  // Velt UI Customization
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/components/velt/ui-customization/VeltCustomization.tsx', language: 'typescript', content: codeContent.veltCustomizationContent },
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/components/velt/ui-customization/VeltCommentToolWf.tsx', language: 'typescript', content: codeContent.veltCommentToolWfContent },
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/components/velt/ui-customization/VeltCommentBubbleWf.tsx', language: 'typescript', content: codeContent.veltCommentBubbleWfContent },
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx', language: 'typescript', content: codeContent.veltSidebarButtonWfContent },
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx', language: 'typescript', content: codeContent.veltNotificationsToolWfContent },
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/components/velt/ui-customization/styles.css', language: 'css', content: codeContent.veltUiStylesContent },

  // Document Canvas
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/components/document/document-canvas.tsx', language: 'typescript', content: codeContent.documentCanvasContent },

  // TaskList Editor
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/components/document/TaskListEditor/TaskListEditor.tsx', language: 'typescript', content: codeContent.taskListEditorContent },
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/components/document/TaskListEditor/TaskRow.tsx', language: 'typescript', content: codeContent.taskRowContent },
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/components/document/TaskListEditor/TaskCommentsModal.tsx', language: 'typescript', content: codeContent.taskCommentsModalContent },
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/components/document/TaskListEditor/TaskListSidebar.tsx', language: 'typescript', content: codeContent.taskListSidebarContent },
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/components/document/TaskListEditor/constants.ts', language: 'typescript', content: codeContent.taskListConstantsContent },
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/components/document/TaskListEditor/icons.tsx', language: 'typescript', content: codeContent.taskListIconsContent },
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/components/document/TaskListEditor/types.ts', language: 'typescript', content: codeContent.taskListTypesContent },
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/components/document/TaskListEditor/index.ts', language: 'typescript', content: codeContent.taskListIndexContent },

  // Theme
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/components/theme/ThemeContext.tsx', language: 'typescript', content: codeContent.themeContextContent },
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/components/theme/ThemeToggle.tsx', language: 'typescript', content: codeContent.themeToggleContent },

  // Header
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/components/header/header.tsx', language: 'typescript', content: codeContent.headerContent },

  // Styles
  { path: 'apps/react/crdt/text-editors/core/core-react-array-crdt-demo/styles/globals.css', language: 'css', content: codeContent.globalStylesContent },
]
