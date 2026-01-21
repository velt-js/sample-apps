import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/codemirror-crdt-demo.json'

// Import all code files using ?raw
import pageContent from '../../../react/crdt/text-editors/codemirror/codemirror-crdt-demo/app/page.tsx?raw'
import layoutContent from '../../../react/crdt/text-editors/codemirror/codemirror-crdt-demo/app/layout.tsx?raw'
import documentContextContent from '../../../react/crdt/text-editors/codemirror/codemirror-crdt-demo/app/document/DocumentContext.tsx?raw'
import useCurrentDocumentContent from '../../../react/crdt/text-editors/codemirror/codemirror-crdt-demo/app/document/useCurrentDocument.ts?raw'
import appUserContextContent from '../../../react/crdt/text-editors/codemirror/codemirror-crdt-demo/app/userAuth/AppUserContext.tsx?raw'
import appProvidersContent from '../../../react/crdt/text-editors/codemirror/codemirror-crdt-demo/app/userAuth/AppProviders.tsx?raw'
import useAppUserContent from '../../../react/crdt/text-editors/codemirror/codemirror-crdt-demo/app/userAuth/useAppUser.ts?raw'
import veltInitializeUserContent from '../../../react/crdt/text-editors/codemirror/codemirror-crdt-demo/components/velt/VeltInitializeUser.tsx?raw'
import veltInitializeDocumentContent from '../../../react/crdt/text-editors/codemirror/codemirror-crdt-demo/components/velt/VeltInitializeDocument.tsx?raw'
import veltCollaborationContent from '../../../react/crdt/text-editors/codemirror/codemirror-crdt-demo/components/velt/VeltCollaboration.tsx?raw'
import veltToolsContent from '../../../react/crdt/text-editors/codemirror/codemirror-crdt-demo/components/velt/VeltTools.tsx?raw'
import documentCanvasContent from '../../../react/crdt/text-editors/codemirror/codemirror-crdt-demo/components/document/document-canvas.tsx?raw'
import codeMirrorComponentContent from '../../../react/crdt/text-editors/codemirror/codemirror-crdt-demo/components/document/CodeMirrorComponent/CodeMirrorComponent.tsx?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/crdt/text-editors/codemirror/codemirror-crdt-demo/app/page.tsx', language: 'typescript', content: codeContent.pageContent },
  { path: 'apps/react/crdt/text-editors/codemirror/codemirror-crdt-demo/app/layout.tsx', language: 'typescript', content: codeContent.layoutContent },
  
  // Document
  { path: 'apps/react/crdt/text-editors/codemirror/codemirror-crdt-demo/app/document/DocumentContext.tsx', language: 'typescript', content: codeContent.documentContextContent },
  { path: 'apps/react/crdt/text-editors/codemirror/codemirror-crdt-demo/app/document/useCurrentDocument.ts', language: 'typescript', content: codeContent.useCurrentDocumentContent },
  
  // User Auth
  { path: 'apps/react/crdt/text-editors/codemirror/codemirror-crdt-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: codeContent.appUserContextContent },
  { path: 'apps/react/crdt/text-editors/codemirror/codemirror-crdt-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: codeContent.appProvidersContent },
  { path: 'apps/react/crdt/text-editors/codemirror/codemirror-crdt-demo/app/userAuth/useAppUser.ts', language: 'typescript', content: codeContent.useAppUserContent },
  
  // Velt Components
  { path: 'apps/react/crdt/text-editors/codemirror/codemirror-crdt-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: codeContent.veltInitializeUserContent },
  { path: 'apps/react/crdt/text-editors/codemirror/codemirror-crdt-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: codeContent.veltInitializeDocumentContent },
  { path: 'apps/react/crdt/text-editors/codemirror/codemirror-crdt-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: codeContent.veltCollaborationContent },
  { path: 'apps/react/crdt/text-editors/codemirror/codemirror-crdt-demo/components/velt/VeltTools.tsx', language: 'typescript', content: codeContent.veltToolsContent },
  
  // Document Canvas
  { path: 'apps/react/crdt/text-editors/codemirror/codemirror-crdt-demo/components/document/document-canvas.tsx', language: 'typescript', content: codeContent.documentCanvasContent },
  
  // CodeMirror Component
  { path: 'apps/react/crdt/text-editors/codemirror/codemirror-crdt-demo/components/document/CodeMirrorComponent/CodeMirrorComponent.tsx', language: 'typescript', content: codeContent.codeMirrorComponentContent }
]

