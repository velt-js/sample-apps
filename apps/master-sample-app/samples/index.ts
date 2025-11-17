import { Sample } from '@/types/sample'
import cursorsPlaygroundMeta from './cursors-playground/metadata'
import { codeFiles as cursorsPlaygroundCodeFiles } from './cursors-playground/code-files'
import reactflowCrdtMeta from './reactflow-crdt/metadata'
import { codeFiles as reactflowCrdtCodeFiles } from './reactflow-crdt/code-files'
import multipleToolsMeta from './multiple-tools/metadata'
import { codeFiles as multipleToolsCodeFiles } from './multiple-tools/code-files'
import agGridSingleToolMeta from './ag-grid-single-tool/metadata'
import { codeFiles as agGridSingleToolCodeFiles } from './ag-grid-single-tool/code-files'
import commentAggregationMeta from './comment-aggregation/metadata'
import { codeFiles as commentAggregationCodeFiles } from './comment-aggregation/code-files'
import tanstackCommentAggregationMeta from './tanstack-comment-aggregation/metadata'
import { codeFiles as tanstackCommentAggregationCodeFiles } from './tanstack-comment-aggregation/code-files'
import tanstackMultipleToolsMeta from './tanstack-multiple-tools/metadata'
import { codeFiles as tanstackMultipleToolsCodeFiles } from './tanstack-multiple-tools/code-files'
import tanstackSingleToolMeta from './tanstack-single-tool/metadata'
import { codeFiles as tanstackSingleToolCodeFiles } from './tanstack-single-tool/code-files'
import tiptapCommentsDemoMeta from './tiptap-comments-demo/metadata'
import { codeFiles as tiptapCommentsDemoCodeFiles } from './tiptap-comments-demo/code-files'
import slatejsCommentsDemoMeta from './slatejs-comments-demo/metadata'
import { codeFiles as slatejsCommentsDemoCodeFiles } from './slatejs-comments-demo/code-files'
import lexicalCommentsDemoMeta from './lexical-comments-demo/metadata'
import { codeFiles as lexicalCommentsDemoCodeFiles } from './lexical-comments-demo/code-files'
import dashboardDemoMeta from './dashboard-demo/metadata'
import { codeFiles as dashboardDemoCodeFiles } from './dashboard-demo/code-files'
import tiptapCrdtDemoMeta from './tiptap-crdt-demo/metadata'
import { codeFiles as tiptapCrdtDemoCodeFiles } from './tiptap-crdt-demo/code-files'

export const SAMPLES: Record<string, Sample> = {
  'cursors-playground': {
    metadata: cursorsPlaygroundMeta,
    codeFiles: cursorsPlaygroundCodeFiles
  },
  'react-crdt-canvas-reactflow-reactflow-demo': {
    metadata: reactflowCrdtMeta,
    codeFiles: reactflowCrdtCodeFiles
  },
  'react-comments-tables-aggrid-multiple-tools': {
    metadata: multipleToolsMeta,
    codeFiles: multipleToolsCodeFiles
  },
  'react-comments-tables-aggrid-single-tool': {
    metadata: agGridSingleToolMeta,
    codeFiles: agGridSingleToolCodeFiles
  },
  'react-comments-tables-aggrid-comment-aggregation': {
    metadata: commentAggregationMeta,
    codeFiles: commentAggregationCodeFiles
  },
  'react-comments-tables-tanstack-comment-aggregation': {
    metadata: tanstackCommentAggregationMeta,
    codeFiles: tanstackCommentAggregationCodeFiles
  },
  'react-comments-tables-tanstack-multiple-tools': {
    metadata: tanstackMultipleToolsMeta,
    codeFiles: tanstackMultipleToolsCodeFiles
  },
  'react-comments-tables-tanstack-single-tool': {
    metadata: tanstackSingleToolMeta,
    codeFiles: tanstackSingleToolCodeFiles
  },
  'react-comments-text-editors-tiptap-tiptap-comments-demo': {
    metadata: tiptapCommentsDemoMeta,
    codeFiles: tiptapCommentsDemoCodeFiles
  },
  'react-comments-text-editors-slatejs-slatejs-comments-demo': {
    metadata: slatejsCommentsDemoMeta,
    codeFiles: slatejsCommentsDemoCodeFiles
  },
  'react-comments-text-editors-lexical-lexical-comments-demo': {
    metadata: lexicalCommentsDemoMeta,
    codeFiles: lexicalCommentsDemoCodeFiles
  },
  'react-comments-dashboard-custom-dashboard-demo': {
    metadata: dashboardDemoMeta,
    codeFiles: dashboardDemoCodeFiles
  },
  'react-crdt-text-editors-tiptap-tiptap-crdt-demo': {
    metadata: tiptapCrdtDemoMeta,
    codeFiles: tiptapCrdtDemoCodeFiles
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
