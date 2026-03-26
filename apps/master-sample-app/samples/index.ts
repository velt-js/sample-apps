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
import codemirrorCrdtDemoMeta from './codemirror-crdt-demo/metadata'
import { codeFiles as codemirrorCrdtDemoCodeFiles } from './codemirror-crdt-demo/code-files'
import dashboardMongoDbDemoMeta from './dashboard-mongo-db-demo/metadata'
import { codeFiles as dashboardMongoDbDemoCodeFiles } from './dashboard-mongo-db-demo/code-files'
import dashboardPostgresDemoMeta from './dashboard-postgres-demo/metadata'
import { codeFiles as dashboardPostgresDemoCodeFiles } from './dashboard-postgres-demo/code-files'
import dashboardInlineCommentsDemoMeta from './dashboard-inline-comments-demo/metadata'
import { codeFiles as dashboardInlineCommentsDemoCodeFiles } from './dashboard-inline-comments-demo/code-files'
import freestyleCommentsDemoMeta from './freestyle-comments-demo/metadata'
import { codeFiles as freestyleCommentsDemoCodeFiles } from './freestyle-comments-demo/code-files'
import pageModeDemoMeta from './page-mode-demo/metadata'
import { codeFiles as pageModeDemoCodeFiles } from './page-mode-demo/code-files'
import imageEditorDemoMeta from './image-editor-demo/metadata'
import { codeFiles as imageEditorDemoCodeFiles } from './image-editor-demo/code-files'
import vueAgGridMultipleToolsMeta from './vue-ag-grid-multiple-tools/metadata'
import { codeFiles as vueAgGridMultipleToolsCodeFiles } from './vue-ag-grid-multiple-tools/code-files'
import blocknoteCrdtDemoMeta from './blocknote-crdt-demo/metadata'
import { codeFiles as blocknoteCrdtDemoCodeFiles } from './blocknote-crdt-demo/code-files'
import coreCrdtDemoMeta from './core-react-text-crdt-demo/metadata'
import { codeFiles as coreCrdtDemoCodeFiles } from './core-react-text-crdt-demo/code-files'
import jsCoreCrdtDemoMeta from './js-core-non-react-text-crdt-demo/metadata'
import { codeFiles as jsCoreCrdtDemoCodeFiles } from './js-core-non-react-text-crdt-demo/code-files'
import jsBlocknoteCrdtDemoMeta from './js-blocknote-crdt-demo/metadata'
import { codeFiles as jsBlocknoteCrdtDemoCodeFiles } from './js-blocknote-crdt-demo/code-files'
import jsTiptapCrdtDemoMeta from './js-tiptap-crdt-demo/metadata'
import { codeFiles as jsTiptapCrdtDemoCodeFiles } from './js-tiptap-crdt-demo/code-files'
import jsCodemirrorCrdtDemoMeta from './js-codemirror-crdt-demo/metadata'
import { codeFiles as jsCodemirrorCrdtDemoCodeFiles } from './js-codemirror-crdt-demo/code-files'
import coreArrayCrdtDemoMeta from './core-react-array-crdt-demo/metadata'
import { codeFiles as coreArrayCrdtDemoCodeFiles } from './core-react-array-crdt-demo/code-files'
import coreMapCrdtDemoMeta from './core-react-map-crdt-demo/metadata'
import { codeFiles as coreMapCrdtDemoCodeFiles } from './core-react-map-crdt-demo/code-files'
import coreXmlCrdtDemoMeta from './core-react-xml-crdt-demo/metadata'
import { codeFiles as coreXmlCrdtDemoCodeFiles } from './core-react-xml-crdt-demo/code-files'

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
  },
  'react-crdt-text-editors-codemirror-codemirror-crdt-demo': {
    metadata: codemirrorCrdtDemoMeta,
    codeFiles: codemirrorCrdtDemoCodeFiles
  },
  'react-self-hosting-dashboard-mongo-db-dashboard-mongo-db-demo': {
    metadata: dashboardMongoDbDemoMeta,
    codeFiles: dashboardMongoDbDemoCodeFiles
  },
  'react-self-hosting-dashboard-postgres-dashboard-postgres-demo': {
    metadata: dashboardPostgresDemoMeta,
    codeFiles: dashboardPostgresDemoCodeFiles
  },
  'react-comments-dashboard-inline-comments-dashboard-inline-comments-demo': {
    metadata: dashboardInlineCommentsDemoMeta,
    codeFiles: dashboardInlineCommentsDemoCodeFiles
  },
  'react-comments-website-builder-freestyle-comments-freestyle-comments-demo': {
    metadata: freestyleCommentsDemoMeta,
    codeFiles: freestyleCommentsDemoCodeFiles
  },
  'react-self-hosting-forms-page-mode-demo': {
    metadata: pageModeDemoMeta,
    codeFiles: pageModeDemoCodeFiles
  },
  'react-comments-image-editor-freestyle-comments-freestyle-comments-demo': {
    metadata: imageEditorDemoMeta,
    codeFiles: imageEditorDemoCodeFiles
  },
  'vue-comments-tables-aggrid-multiple-tools': {
    metadata: vueAgGridMultipleToolsMeta,
    codeFiles: vueAgGridMultipleToolsCodeFiles
  },
  'react-crdt-text-editors-blocknote-blocknote-demo': {
    metadata: blocknoteCrdtDemoMeta,
    codeFiles: blocknoteCrdtDemoCodeFiles
  },
  'react-crdt-text-editors-core-core-react-text-crdt-demo': {
    metadata: coreCrdtDemoMeta,
    codeFiles: coreCrdtDemoCodeFiles
  },
  'javascript-crdt-text-editors-blocknote-blocknote-crdt-demo': {
    metadata: jsBlocknoteCrdtDemoMeta,
    codeFiles: jsBlocknoteCrdtDemoCodeFiles
  },
  'javascript-crdt-text-editors-core-core-non-react-text-crdt-demo': {
    metadata: jsCoreCrdtDemoMeta,
    codeFiles: jsCoreCrdtDemoCodeFiles
  },
  'javascript-crdt-text-editors-tiptap-tiptap-crdt-demo': {
    metadata: jsTiptapCrdtDemoMeta,
    codeFiles: jsTiptapCrdtDemoCodeFiles
  },
  'javascript-crdt-text-editors-codemirror-codemirror-crdt-demo': {
    metadata: jsCodemirrorCrdtDemoMeta,
    codeFiles: jsCodemirrorCrdtDemoCodeFiles
  },
  'react-crdt-text-editors-core-core-react-array-crdt-demo': {
    metadata: coreArrayCrdtDemoMeta,
    codeFiles: coreArrayCrdtDemoCodeFiles
  },
  'react-crdt-text-editors-core-core-react-map-crdt-demo': {
    metadata: coreMapCrdtDemoMeta,
    codeFiles: coreMapCrdtDemoCodeFiles
  },
  'react-crdt-text-editors-core-core-react-xml-crdt-demo': {
    metadata: coreXmlCrdtDemoMeta,
    codeFiles: coreXmlCrdtDemoCodeFiles
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
