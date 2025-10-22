import { Sample } from '@/types/sample'
import cursorsPlaygroundMeta from './cursors-playground/metadata'
import { codeFiles as cursorsPlaygroundCodeFiles } from './cursors-playground/code-files'
import reactflowCrdtMeta from './reactflow-crdt/metadata'
import { codeFiles as reactflowCrdtCodeFiles } from './reactflow-crdt/code-files'
import tiptapDemoMeta from './tiptap-demo/metadata'
import { codeFiles as tiptapDemoCodeFiles } from './tiptap-demo/code-files'

export const SAMPLES: Record<string, Sample> = {
  'cursors-playground': {
    metadata: cursorsPlaygroundMeta,
    codeFiles: cursorsPlaygroundCodeFiles
  },
  'react-canvas-libraries-reactflow-reactflow-demo': {
    metadata: reactflowCrdtMeta,
    codeFiles: reactflowCrdtCodeFiles
  },
  // 'react-text-editors-libraries-tiptap-tiptap-demo': {
  //   metadata: tiptapDemoMeta,
  //   codeFiles: tiptapDemoCodeFiles
  // }
}

export function getSampleById(id: string): Sample | undefined {
  return SAMPLES[id]
}

export function getDefaultSample(): Sample {
  const defaultSample = Object.values(SAMPLES).find(s => s.metadata.isDefault)
  return defaultSample || Object.values(SAMPLES)[0]
}

export function getAllSamples(): Sample[] {
  return Object.values(SAMPLES)
}

export function getSamplesByCategory(category: 'feature' | 'app-type'): Sample[] {
  return Object.values(SAMPLES).filter(s => s.metadata.category === category)
}

export function getSamplesBySection(section: string): Sample[] {
  return Object.values(SAMPLES).filter(s => s.metadata.section === section)
}

