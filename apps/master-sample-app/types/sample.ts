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
}

export interface SampleCodeFile {
  path: string
  language: string
}

export interface Sample {
  metadata: SampleMetadata
  codeFiles: SampleCodeFile[]
}

