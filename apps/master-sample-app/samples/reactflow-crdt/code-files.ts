import { SampleCodeFile } from '@/types/sample'

// Import all code files using ?raw
import pageContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/app/page.tsx?raw'
import layoutContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/app/layout.tsx?raw'
import documentContextContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/app/document/DocumentContext.tsx?raw'
import useCurrentDocumentContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/app/document/useCurrentDocument.ts?raw'
import appUserContextContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/app/userAuth/AppUserContext.tsx?raw'
import appProvidersContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/app/userAuth/AppProviders.tsx?raw'
import useAppUserContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/app/userAuth/useAppUser.ts?raw'
import veltInitializeUserContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/components/velt/VeltInitializeUser.tsx?raw'
import veltInitializeDocumentContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/components/velt/VeltInitializeDocument.tsx?raw'
import veltCollaborationContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/components/velt/VeltCollaboration.tsx?raw'
import veltToolsContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/components/velt/VeltTools.tsx?raw'
import veltCustomizationContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/components/velt/ui-customization/VeltCustomization.tsx?raw'
import veltCommentToolWfContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/components/velt/ui-customization/VeltCommentToolWf.tsx?raw'
import veltCommentBubbleWfContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/components/velt/ui-customization/VeltCommentBubbleWf.tsx?raw'
import veltSidebarButtonWfContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx?raw'
import veltNotificationsToolWfContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx?raw'
import documentCanvasContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/components/document/document-canvas.tsx?raw'
import reactFlowComponentContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/components/document/ReactFlowComponent/ReactFlowComponent.tsx?raw'
import reactFlowIndexContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/components/document/ReactFlowComponent/index.tsx?raw'
import addNodeOnEdgeDropContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/components/document/ReactFlowComponent/AddNodeOnEdgeDrop.tsx?raw'
import reactFlowConstantsContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/components/document/ReactFlowComponent/constants.ts?raw'
import reactFlowTypesContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/components/document/ReactFlowComponent/types.ts?raw'
import customNodeContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/components/document/ReactFlowComponent/nodes/CustomNode.tsx?raw'
import simpleNodeContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/components/document/ReactFlowComponent/nodes/SimpleNode.tsx?raw'
import bottomToolbarContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/components/document/ReactFlowComponent/ui/BottomToolbar.tsx?raw'
import sidePanelContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/components/document/ReactFlowComponent/ui/SidePanel.tsx?raw'
import zoomControlsContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/components/document/ReactFlowComponent/ui/ZoomControls.tsx?raw'
import headerContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/components/header/header.tsx?raw'
import sidebarContent from '../../../react/crdt/canvas/reactflow/reactflow-demo/components/sidebar/sidebar.tsx?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/app/page.tsx', language: 'typescript', content: pageContent },
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/app/layout.tsx', language: 'typescript', content: layoutContent },
  
  // Document
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/app/document/DocumentContext.tsx', language: 'typescript', content: documentContextContent },
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/app/document/useCurrentDocument.ts', language: 'typescript', content: useCurrentDocumentContent },
  
  // User Auth
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/app/userAuth/AppUserContext.tsx', language: 'typescript', content: appUserContextContent },
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/app/userAuth/AppProviders.tsx', language: 'typescript', content: appProvidersContent },
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/app/userAuth/useAppUser.ts', language: 'typescript', content: useAppUserContent },
  
  // Velt Components
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: veltInitializeUserContent },
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: veltInitializeDocumentContent },
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/components/velt/VeltCollaboration.tsx', language: 'typescript', content: veltCollaborationContent },
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/components/velt/VeltTools.tsx', language: 'typescript', content: veltToolsContent },
  
  // Velt UI Customization
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/components/velt/ui-customization/VeltCustomization.tsx', language: 'typescript', content: veltCustomizationContent },
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/components/velt/ui-customization/VeltCommentToolWf.tsx', language: 'typescript', content: veltCommentToolWfContent },
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/components/velt/ui-customization/VeltCommentBubbleWf.tsx', language: 'typescript', content: veltCommentBubbleWfContent },
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/components/velt/ui-customization/VeltSidebarButtonWf.tsx', language: 'typescript', content: veltSidebarButtonWfContent },
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/components/velt/ui-customization/VeltNotificationsToolWf.tsx', language: 'typescript', content: veltNotificationsToolWfContent },
  
  // Document Canvas
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/components/document/document-canvas.tsx', language: 'typescript', content: documentCanvasContent },
  
  // ReactFlow Component
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/components/document/ReactFlowComponent/ReactFlowComponent.tsx', language: 'typescript', content: reactFlowComponentContent },
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/components/document/ReactFlowComponent/index.tsx', language: 'typescript', content: reactFlowIndexContent },
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/components/document/ReactFlowComponent/AddNodeOnEdgeDrop.tsx', language: 'typescript', content: addNodeOnEdgeDropContent },
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/components/document/ReactFlowComponent/constants.ts', language: 'typescript', content: reactFlowConstantsContent },
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/components/document/ReactFlowComponent/types.ts', language: 'typescript', content: reactFlowTypesContent },
  
  // ReactFlow Nodes
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/components/document/ReactFlowComponent/nodes/CustomNode.tsx', language: 'typescript', content: customNodeContent },
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/components/document/ReactFlowComponent/nodes/SimpleNode.tsx', language: 'typescript', content: simpleNodeContent },
  
  // ReactFlow UI Components
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/components/document/ReactFlowComponent/ui/BottomToolbar.tsx', language: 'typescript', content: bottomToolbarContent },
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/components/document/ReactFlowComponent/ui/SidePanel.tsx', language: 'typescript', content: sidePanelContent },
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/components/document/ReactFlowComponent/ui/ZoomControls.tsx', language: 'typescript', content: zoomControlsContent },
  
  // Header & Sidebar
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/components/header/header.tsx', language: 'typescript', content: headerContent },
  { path: 'apps/react/crdt/canvas/reactflow/reactflow-demo/components/sidebar/sidebar.tsx', language: 'typescript', content: sidebarContent }
]
