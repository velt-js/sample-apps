import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/single-editor-mode-demo.json'

// Import all code files using ?raw
import pageContent from '../../../react/realtime/text-editors/tiptap/single-editor-mode-demo/app/page.tsx?raw'
import layoutContent from '../../../react/realtime/text-editors/tiptap/single-editor-mode-demo/app/layout.tsx?raw'
import documentContextContent from '../../../react/realtime/text-editors/tiptap/single-editor-mode-demo/app/document/DocumentContext.tsx?raw'
import appUserContextContent from '../../../react/realtime/text-editors/tiptap/single-editor-mode-demo/app/userAuth/AppUserContext.tsx?raw'
import appProvidersContent from '../../../react/realtime/text-editors/tiptap/single-editor-mode-demo/app/userAuth/AppProviders.tsx?raw'
import veltInitializeUserContent from '../../../react/realtime/text-editors/tiptap/single-editor-mode-demo/components/velt/VeltInitializeUser.tsx?raw'
import veltInitializeDocumentContent from '../../../react/realtime/text-editors/tiptap/single-editor-mode-demo/components/velt/VeltInitializeDocument.tsx?raw'
import veltCollaborationContent from '../../../react/realtime/text-editors/tiptap/single-editor-mode-demo/components/velt/VeltCollaboration.tsx?raw'
import veltSingleEditorModeContent from '../../../react/realtime/text-editors/tiptap/single-editor-mode-demo/components/velt/VeltSingleEditorMode.tsx?raw'
import veltToolsContent from '../../../react/realtime/text-editors/tiptap/single-editor-mode-demo/components/velt/VeltTools.tsx?raw'
import headerContent from '../../../react/realtime/text-editors/tiptap/single-editor-mode-demo/components/header/header.tsx?raw'
import editorRoleChipContent from '../../../react/realtime/text-editors/tiptap/single-editor-mode-demo/components/header/EditorRoleChip.tsx?raw'
import documentCanvasContent from '../../../react/realtime/text-editors/tiptap/single-editor-mode-demo/components/document/document-canvas.tsx?raw'
import tipTapComponentContent from '../../../react/realtime/text-editors/tiptap/single-editor-mode-demo/components/document/TipTapComponent/TipTapComponent.tsx?raw'
import extensionsContent from '../../../react/realtime/text-editors/tiptap/single-editor-mode-demo/components/document/TipTapComponent/extensions.ts?raw'
import bubbleMenuToolbarContent from '../../../react/realtime/text-editors/tiptap/single-editor-mode-demo/components/document/TipTapComponent/ui/BubbleMenuToolbar.tsx?raw'
import formattingToolbarContent from '../../../react/realtime/text-editors/tiptap/single-editor-mode-demo/components/document/TipTapComponent/ui/FormattingToolbar.tsx?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/realtime/text-editors/tiptap/single-editor-mode-demo/app/page.tsx', language: 'typescript', content: codeContent.pageContent },
  { path: 'apps/react/realtime/text-editors/tiptap/single-editor-mode-demo/app/layout.tsx', language: 'typescript', content: codeContent.layoutContent },

  // Document
  { path: 'apps/react/realtime/text-editors/tiptap/single-editor-mode-demo/app/document/DocumentContext.tsx', language: 'typescript', content: codeContent.documentContextContent },

  // User Auth
  { path: 'apps/react/realtime/text-editors/tiptap/single-editor-mode-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: codeContent.appUserContextContent },
  { path: 'apps/react/realtime/text-editors/tiptap/single-editor-mode-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: codeContent.appProvidersContent },

  // Velt Components
  { path: 'apps/react/realtime/text-editors/tiptap/single-editor-mode-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: codeContent.veltInitializeUserContent },
  { path: 'apps/react/realtime/text-editors/tiptap/single-editor-mode-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: codeContent.veltInitializeDocumentContent },
  { path: 'apps/react/realtime/text-editors/tiptap/single-editor-mode-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: codeContent.veltCollaborationContent },
  { path: 'apps/react/realtime/text-editors/tiptap/single-editor-mode-demo/components/velt/VeltSingleEditorMode.tsx', language: 'typescript', content: codeContent.veltSingleEditorModeContent },
  { path: 'apps/react/realtime/text-editors/tiptap/single-editor-mode-demo/components/velt/VeltTools.tsx', language: 'typescript', content: codeContent.veltToolsContent },

  // Header
  { path: 'apps/react/realtime/text-editors/tiptap/single-editor-mode-demo/components/header/header.tsx', language: 'typescript', content: codeContent.headerContent },
  { path: 'apps/react/realtime/text-editors/tiptap/single-editor-mode-demo/components/header/EditorRoleChip.tsx', language: 'typescript', content: codeContent.editorRoleChipContent },

  // Document Canvas
  { path: 'apps/react/realtime/text-editors/tiptap/single-editor-mode-demo/components/document/document-canvas.tsx', language: 'typescript', content: codeContent.documentCanvasContent },

  // TipTap Component
  { path: 'apps/react/realtime/text-editors/tiptap/single-editor-mode-demo/components/document/TipTapComponent/TipTapComponent.tsx', language: 'typescript', content: codeContent.tipTapComponentContent },
  { path: 'apps/react/realtime/text-editors/tiptap/single-editor-mode-demo/components/document/TipTapComponent/extensions.ts', language: 'typescript', content: codeContent.extensionsContent },

  // TipTap UI Components
  { path: 'apps/react/realtime/text-editors/tiptap/single-editor-mode-demo/components/document/TipTapComponent/ui/BubbleMenuToolbar.tsx', language: 'typescript', content: codeContent.bubbleMenuToolbarContent },
  { path: 'apps/react/realtime/text-editors/tiptap/single-editor-mode-demo/components/document/TipTapComponent/ui/FormattingToolbar.tsx', language: 'typescript', content: codeContent.formattingToolbarContent }
]
