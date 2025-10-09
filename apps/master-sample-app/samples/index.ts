import { Sample } from '@/types/sample'
import tiptapCrdtMeta from './tiptap-crdt/metadata'
import { codeFiles as tiptapCrdtCodeFiles } from './tiptap-crdt/code-files'
import cursorsPlaygroundMeta from './cursors-playground/metadata'
import { codeFiles as cursorsPlaygroundCodeFiles } from './cursors-playground/code-files'
import reactflowCrdtMeta from './reactflow-crdt/metadata'
import { codeFiles as reactflowCrdtCodeFiles } from './reactflow-crdt/code-files'
import reactflowPlaygroundMeta from './reactflow-playground/metadata'
import { codeFiles as reactflowPlaygroundCodeFiles } from './reactflow-playground/code-files'
import codemirrorCrdtMeta from './codemirror-crdt/metadata'
import { codeFiles as codemirrorCrdtCodeFiles } from './codemirror-crdt/code-files'
import blocknoteCrdtMeta from './blocknote-crdt/metadata'
import { codeFiles as blocknoteCrdtCodeFiles } from './blocknote-crdt/code-files'

export const SAMPLES: Record<string, Sample> = {
  'cursors-playground': {
    metadata: cursorsPlaygroundMeta,
    codeFiles: cursorsPlaygroundCodeFiles
  },
  'tiptap-crdt': {
    metadata: tiptapCrdtMeta,
    codeFiles: tiptapCrdtCodeFiles
  },
  'reactflow-crdt': {
    metadata: reactflowCrdtMeta,
    codeFiles: reactflowCrdtCodeFiles
  },
  'reactflow-playground': {
    metadata: reactflowPlaygroundMeta,
    codeFiles: reactflowPlaygroundCodeFiles
  },
  'codemirror-crdt': {
    metadata: codemirrorCrdtMeta,
    codeFiles: codemirrorCrdtCodeFiles
  },
  'blocknote-crdt': {
    metadata: blocknoteCrdtMeta,
    codeFiles: blocknoteCrdtCodeFiles
  }
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

