import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/lexical-comments-demo.json'

// Import all code files using ?raw
import pageContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/app/page.tsx?raw'
import layoutContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/app/layout.tsx?raw'
import documentContextContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/app/document/DocumentContext.tsx?raw'
import useCurrentDocumentContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/app/document/useCurrentDocument.ts?raw'
import appUserContextContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/app/userAuth/AppUserContext.tsx?raw'
import appProvidersContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/app/userAuth/AppProviders.tsx?raw'
import useAppUserContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/app/userAuth/useAppUser.ts?raw'
import veltInitializeUserContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/components/velt/VeltInitializeUser.tsx?raw'
import veltInitializeDocumentContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/components/velt/VeltInitializeDocument.tsx?raw'
import veltCollaborationContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/components/velt/VeltCollaboration.tsx?raw'
import veltToolsContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/components/velt/VeltTools.tsx?raw'
import veltCustomizationContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/components/velt/ui-customization/VeltCustomization.tsx?raw'
import veltCommentToolWfContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/components/velt/ui-customization/VeltCommentToolWf.tsx?raw'
import veltNotificationsToolWfContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx?raw'
import veltSidebarButtonWfContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx?raw'
import documentCanvasContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/components/document/document-canvas.tsx?raw'
import lexicalComponentContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/LexicalComponent.tsx?raw'
import lexicalIndexContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/index.tsx?raw'
import lexicalConstantsContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/constants.ts?raw'
import lexicalTypesContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/types.ts?raw'
import headingSpanNodeContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/nodes/HeadingSpanNode.tsx?raw'
import bubbleMenuPluginContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/plugins/BubbleMenuPlugin.tsx?raw'
import formattingPluginContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/plugins/FormattingPlugin.tsx?raw'
import headingPluginContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/plugins/HeadingPlugin.tsx?raw'
import initialContentPluginContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/plugins/InitialContentPlugin.tsx?raw'
import textAlignPluginContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/plugins/TextAlignPlugin.tsx?raw'
import bubbleMenuToolbarContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/ui/BubbleMenuToolbar.tsx?raw'
import toolbarButtonContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/ui/ToolbarButton.tsx?raw'
import toolbarDividerContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/ui/ToolbarDivider.tsx?raw'
import headerContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/components/header/header.tsx?raw'
import sidebarContent from '../../../react/comments/text-editors/lexical/lexical-comments-demo/components/sidebar/sidebar.tsx?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/app/page.tsx', language: 'typescript', content: codeContent.pageContent },
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/app/layout.tsx', language: 'typescript', content: codeContent.layoutContent },
  
  // Document
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/app/document/DocumentContext.tsx', language: 'typescript', content: codeContent.documentContextContent },
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/app/document/useCurrentDocument.ts', language: 'typescript', content: codeContent.useCurrentDocumentContent },
  
  // User Auth
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: codeContent.appUserContextContent },
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: codeContent.appProvidersContent },
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/app/userAuth/useAppUser.ts', language: 'typescript', content: codeContent.useAppUserContent },
  
  // Velt Components
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: codeContent.veltInitializeUserContent },
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: codeContent.veltInitializeDocumentContent },
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: codeContent.veltCollaborationContent },
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/components/velt/VeltTools.tsx', language: 'typescript', content: codeContent.veltToolsContent },
  
  // Velt UI Customization
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/components/velt/ui-customization/VeltCustomization.tsx', language: 'typescript', content: codeContent.veltCustomizationContent },
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/components/velt/ui-customization/VeltCommentToolWf.tsx', language: 'typescript', content: codeContent.veltCommentToolWfContent },
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx', language: 'typescript', content: codeContent.veltNotificationsToolWfContent },
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx', language: 'typescript', content: codeContent.veltSidebarButtonWfContent },
  
  // Document Canvas
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/components/document/document-canvas.tsx', language: 'typescript', content: codeContent.documentCanvasContent },
  
  // Lexical Component
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/LexicalComponent.tsx', language: 'typescript', content: codeContent.lexicalComponentContent },
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/index.tsx', language: 'typescript', content: codeContent.lexicalIndexContent },
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/constants.ts', language: 'typescript', content: codeContent.lexicalConstantsContent },
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/types.ts', language: 'typescript', content: codeContent.lexicalTypesContent },
  
  // Lexical Nodes
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/nodes/HeadingSpanNode.tsx', language: 'typescript', content: codeContent.headingSpanNodeContent },
  
  // Lexical Plugins
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/plugins/BubbleMenuPlugin.tsx', language: 'typescript', content: codeContent.bubbleMenuPluginContent },
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/plugins/FormattingPlugin.tsx', language: 'typescript', content: codeContent.formattingPluginContent },
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/plugins/HeadingPlugin.tsx', language: 'typescript', content: codeContent.headingPluginContent },
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/plugins/InitialContentPlugin.tsx', language: 'typescript', content: codeContent.initialContentPluginContent },
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/plugins/TextAlignPlugin.tsx', language: 'typescript', content: codeContent.textAlignPluginContent },
  
  // Lexical UI Components
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/ui/BubbleMenuToolbar.tsx', language: 'typescript', content: codeContent.bubbleMenuToolbarContent },
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/ui/ToolbarButton.tsx', language: 'typescript', content: codeContent.toolbarButtonContent },
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/components/document/LexicalComponent/ui/ToolbarDivider.tsx', language: 'typescript', content: codeContent.toolbarDividerContent },
  
  // Header & Sidebar
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/components/header/header.tsx', language: 'typescript', content: codeContent.headerContent },
  { path: 'apps/react/comments/text-editors/lexical/lexical-comments-demo/components/sidebar/sidebar.tsx', language: 'typescript', content: codeContent.sidebarContent }
]

