import { SampleCodeFile } from '@/types/sample'

// Import all code files using ?raw
import pageContent from '../../../react/crdt/text-editors/tiptap/tiptap-crdt-demo/app/page.tsx?raw'
import layoutContent from '../../../react/crdt/text-editors/tiptap/tiptap-crdt-demo/app/layout.tsx?raw'
import documentContextContent from '../../../react/crdt/text-editors/tiptap/tiptap-crdt-demo/app/document/DocumentContext.tsx?raw'
import appUserContextContent from '../../../react/crdt/text-editors/tiptap/tiptap-crdt-demo/app/userAuth/AppUserContext.tsx?raw'
import appProvidersContent from '../../../react/crdt/text-editors/tiptap/tiptap-crdt-demo/app/userAuth/AppProviders.tsx?raw'
import veltInitializeUserContent from '../../../react/crdt/text-editors/tiptap/tiptap-crdt-demo/components/velt/VeltInitializeUser.tsx?raw'
import veltInitializeDocumentContent from '../../../react/crdt/text-editors/tiptap/tiptap-crdt-demo/components/velt/VeltInitializeDocument.tsx?raw'
import veltCollaborationContent from '../../../react/crdt/text-editors/tiptap/tiptap-crdt-demo/components/velt/VeltCollaboration.tsx?raw'
import documentCanvasContent from '../../../react/crdt/text-editors/tiptap/tiptap-crdt-demo/components/document/document-canvas.tsx?raw'
import tipTapComponentContent from '../../../react/crdt/text-editors/tiptap/tiptap-crdt-demo/components/document/TipTapComponent/TipTapComponent.tsx?raw'
import extensionsContent from '../../../react/crdt/text-editors/tiptap/tiptap-crdt-demo/components/document/TipTapComponent/extensions.ts?raw'
import bubbleMenuToolbarContent from '../../../react/crdt/text-editors/tiptap/tiptap-crdt-demo/components/document/TipTapComponent/ui/BubbleMenuToolbar.tsx?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/crdt/text-editors/tiptap/tiptap-crdt-demo/app/page.tsx', language: 'typescript', content: pageContent },
  { path: 'apps/react/crdt/text-editors/tiptap/tiptap-crdt-demo/app/layout.tsx', language: 'typescript', content: layoutContent },
  
  // Document
  { path: 'apps/react/crdt/text-editors/tiptap/tiptap-crdt-demo/app/document/DocumentContext.tsx', language: 'typescript', content: documentContextContent },
  
  // User Auth
  { path: 'apps/react/crdt/text-editors/tiptap/tiptap-crdt-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: appUserContextContent },
  { path: 'apps/react/crdt/text-editors/tiptap/tiptap-crdt-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: appProvidersContent },
  
  // Velt Components
  { path: 'apps/react/crdt/text-editors/tiptap/tiptap-crdt-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: veltInitializeUserContent },
  { path: 'apps/react/crdt/text-editors/tiptap/tiptap-crdt-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: veltInitializeDocumentContent },
  { path: 'apps/react/crdt/text-editors/tiptap/tiptap-crdt-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: veltCollaborationContent },
  
  // Document Canvas
  { path: 'apps/react/crdt/text-editors/tiptap/tiptap-crdt-demo/components/document/document-canvas.tsx', language: 'typescript', content: documentCanvasContent },
  
  // TipTap Component
  { path: 'apps/react/crdt/text-editors/tiptap/tiptap-crdt-demo/components/document/TipTapComponent/TipTapComponent.tsx', language: 'typescript', content: tipTapComponentContent },
  { path: 'apps/react/crdt/text-editors/tiptap/tiptap-crdt-demo/components/document/TipTapComponent/extensions.ts', language: 'typescript', content: extensionsContent },
  
  // TipTap UI Components
  { path: 'apps/react/crdt/text-editors/tiptap/tiptap-crdt-demo/components/document/TipTapComponent/ui/BubbleMenuToolbar.tsx', language: 'typescript', content: bubbleMenuToolbarContent }
]
