import { SampleMetadata } from '@/types/sample'

// Shared document ID for both iframes to collaborate on the same document
const SHARED_DOCUMENT_ID = 'reactflow-playground-demo'

const metadata: SampleMetadata = {
  id: 'reactflow-playground',
  title: 'REACTFLOW · PLAYGROUND',
  category: 'feature',
  section: 'ReactFlow',
  iframeUrl: `https://sample-apps-reactflow-demo.vercel.app?documentId=${SHARED_DOCUMENT_ID}`,
  iframeUrl2: `https://sample-apps-reactflow-demo.vercel.app?documentId=${SHARED_DOCUMENT_ID}`,
  githubUrl: 'https://github.com/velt-js/sample-apps/tree/main/apps/react/canvas/libraries/reactflow/reactflow-demo',
  githubRepoPath: 'velt-js/sample-apps',
  displayMode: 'dual',
  isDefault: false
}

export default metadata

