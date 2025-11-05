export interface SampleMetadata {
  id: string
  title: string
  category: "feature" | "app-type"
  section?: string
  iframeUrl: string
  iframeUrl2?: string
  githubUrl: string
  githubRepoPath?: string
  isDefault?: boolean
  displayMode?: 'single' | 'dual'
  routePath?: string
}

export interface SampleCodeFile {
  path: string
  language: string
  content: string // Pre-loaded code content (imported with ?raw)
}

export interface Sample {
  metadata: SampleMetadata
  codeFiles: SampleCodeFile[]
}

