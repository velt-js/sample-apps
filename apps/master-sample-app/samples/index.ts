import { Sample } from '@/types/sample'
import tiptapCrdtMeta from './tiptap-crdt/metadata'
import { codeFiles as tiptapCrdtCodeFiles } from './tiptap-crdt/code-files'
import cursorsPlaygroundMeta from './cursors-playground/metadata'
import { codeFiles as cursorsPlaygroundCodeFiles } from './cursors-playground/code-files'

export const SAMPLES: Record<string, Sample> = {
  'cursors-playground': {
    metadata: cursorsPlaygroundMeta,
    codeFiles: cursorsPlaygroundCodeFiles
  },
  'tiptap-crdt': {
    metadata: tiptapCrdtMeta,
    codeFiles: tiptapCrdtCodeFiles
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

