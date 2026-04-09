"use client"

import { useEffect, useState, useMemo } from "react"
import { SampleCodeFile } from "@/types/sample"
import { ChevronRight, File, Folder } from "lucide-react"
import { cn } from "@/lib/utils"

// Syntax highlighting function using markers to prevent regex from matching inside HTML tags
function highlightCode(code: string): string {
  // Use unique markers that won't appear in code
  const MARKERS = {
    COMMENT: '[[C:',
    STRING: '[[S:',
    KEYWORD: '[[K:',
    NUMBER: '[[N:',
    LITERAL: '[[L:',
    FUNCTION: '[[F:',
    TYPE: '[[T:',
    END: ':]]'
  }

  let highlighted = code

  // Escape HTML first
  highlighted = highlighted
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Comments (must be done before other highlighting)
  highlighted = highlighted.replace(
    /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
    `${MARKERS.COMMENT}$1${MARKERS.END}`
  )

  // Strings - but not inside already-marked regions
  highlighted = highlighted.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
    (match) => {
      // Skip if already inside a marker
      if (match.includes('[[') || match.includes(':]]')) return match
      return `${MARKERS.STRING}${match}${MARKERS.END}`
    }
  )

  // Keywords - but not inside already-marked regions
  highlighted = highlighted.replace(
    /\b(import|export|from|const|let|var|function|return|if|else|for|while|class|interface|type|extends|implements|async|await|try|catch|throw|new|this|super|static|public|private|protected|default|case|switch|break|continue|do|in|of|typeof|instanceof|void|null|undefined|as)\b/g,
    (match, p1, offset, string) => {
      // Check if this match is inside a marker (look for unclosed [[ before this position)
      const before = string.substring(0, offset)
      const openMarkers = (before.match(/\[\[/g) || []).length
      const closeMarkers = (before.match(/:]\]/g) || []).length
      if (openMarkers > closeMarkers) return match
      return `${MARKERS.KEYWORD}${match}${MARKERS.END}`
    }
  )

  // Numbers - but not inside already-marked regions
  highlighted = highlighted.replace(
    /\b(\d+\.?\d*)\b/g,
    (match, p1, offset, string) => {
      const before = string.substring(0, offset)
      const openMarkers = (before.match(/\[\[/g) || []).length
      const closeMarkers = (before.match(/:]\]/g) || []).length
      if (openMarkers > closeMarkers) return match
      return `${MARKERS.NUMBER}${match}${MARKERS.END}`
    }
  )

  // Boolean and special values
  highlighted = highlighted.replace(
    /\b(true|false)\b/g,
    (match, p1, offset, string) => {
      const before = string.substring(0, offset)
      const openMarkers = (before.match(/\[\[/g) || []).length
      const closeMarkers = (before.match(/:]\]/g) || []).length
      if (openMarkers > closeMarkers) return match
      return `${MARKERS.LITERAL}${match}${MARKERS.END}`
    }
  )

  // Function names (before parenthesis)
  highlighted = highlighted.replace(
    /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,
    (match, p1, offset, string) => {
      const before = string.substring(0, offset)
      const openMarkers = (before.match(/\[\[/g) || []).length
      const closeMarkers = (before.match(/:]\]/g) || []).length
      if (openMarkers > closeMarkers) return match
      return `${MARKERS.FUNCTION}${p1}${MARKERS.END}`
    }
  )

  // Types/Classes (PascalCase)
  highlighted = highlighted.replace(
    /\b([A-Z][a-zA-Z0-9_]*)\b/g,
    (match, p1, offset, string) => {
      const before = string.substring(0, offset)
      const openMarkers = (before.match(/\[\[/g) || []).length
      const closeMarkers = (before.match(/:]\]/g) || []).length
      if (openMarkers > closeMarkers) return match
      return `${MARKERS.TYPE}${match}${MARKERS.END}`
    }
  )

  // Convert markers to HTML spans
  highlighted = highlighted
    .replace(/\[\[C:/g, '<span class="code-comment">')
    .replace(/\[\[S:/g, '<span class="code-string">')
    .replace(/\[\[K:/g, '<span class="code-keyword">')
    .replace(/\[\[N:/g, '<span class="code-number">')
    .replace(/\[\[L:/g, '<span class="code-literal">')
    .replace(/\[\[F:/g, '<span class="code-function">')
    .replace(/\[\[T:/g, '<span class="code-type">')
    .replace(/:]\]/g, '</span>')

  return highlighted
}

interface CodeDisplayProps {
  codeFiles: SampleCodeFile[]
  githubRepoPath?: string
}

interface FileNode {
  name: string
  path: string
  type: 'file' | 'folder'
  children?: FileNode[]
  file?: SampleCodeFile
}

function buildFileTree(files: SampleCodeFile[]): FileNode[] {
  const root: FileNode[] = []

  files.forEach(file => {
    const parts = file.path.split('/')
    let currentLevel = root

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1
      const existingNode = currentLevel.find(node => node.name === part)

      if (existingNode) {
        if (!isFile && existingNode.children) {
          currentLevel = existingNode.children
        }
      } else {
        const newNode: FileNode = {
          name: part,
          path: parts.slice(0, index + 1).join('/'),
          type: isFile ? 'file' : 'folder',
          ...(isFile ? { file } : { children: [] })
        }

        currentLevel.push(newNode)

        if (!isFile && newNode.children) {
          currentLevel = newNode.children
        }
      }
    })
  })

  return root
}

function FileTreeNode({
  node,
  level = 0,
  onFileSelect,
  selectedPath
}: {
  node: FileNode
  level?: number
  onFileSelect: (file: SampleCodeFile) => void
  selectedPath?: string
}) {
  const [isExpanded, setIsExpanded] = useState(true)

  const handleClick = () => {
    if (node.type === 'folder') {
      setIsExpanded(!isExpanded)
    } else if (node.file) {
      onFileSelect(node.file)
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className={cn(
          "w-full flex items-center gap-2 px-2 py-1.5 text-left text-sm hover:bg-accent rounded-md transition-colors",
          node.type === 'file' && selectedPath === node.path && "bg-accent"
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
      >
        {node.type === 'folder' && (
          <ChevronRight
            className={cn(
              "h-3 w-3 transition-transform flex-shrink-0",
              isExpanded && "rotate-90"
            )}
          />
        )}
        {node.type === 'folder' ? (
          <Folder className="h-3.5 w-3.5 flex-shrink-0 text-yellow-500" />
        ) : (
          <File className="h-3.5 w-3.5 flex-shrink-0 text-blue-500 ml-3" />
        )}
        <span className="whitespace-nowrap font-mono text-xs">{node.name}</span>
      </button>

      {node.type === 'folder' && isExpanded && node.children && (
        <div>
          {node.children.map((child, index) => (
            <FileTreeNode
              key={`${child.path}-${index}`}
              node={child}
              level={level + 1}
              onFileSelect={onFileSelect}
              selectedPath={selectedPath}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Exported sub-components for 3-column code view layout ───

interface FileExplorerProps {
  codeFiles: SampleCodeFile[]
  selectedFile: SampleCodeFile | null
  onFileSelect: (file: SampleCodeFile) => void
}

export function FileExplorer({ codeFiles, selectedFile, onFileSelect }: FileExplorerProps) {
  const fileTree = useMemo(() => buildFileTree(codeFiles), [codeFiles])

  if (codeFiles.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <span className="text-xs text-muted-foreground">No files</span>
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto p-2" style={{ backgroundColor: 'var(--code-bg-sidebar)' }}>
      <div className="min-w-max">
        {fileTree.map((node, index) => (
          <FileTreeNode
            key={`${node.path}-${index}`}
            node={node}
            onFileSelect={onFileSelect}
            selectedPath={selectedFile?.path}
          />
        ))}
      </div>
    </div>
  )
}

interface CodeEditorProps {
  selectedFile: SampleCodeFile | null
}

export function CodeEditor({ selectedFile }: CodeEditorProps) {
  const codeContent = useMemo(() => {
    if (!selectedFile) return "// Select a file to view its contents"
    return selectedFile.content || `// No content available for ${selectedFile.path}`
  }, [selectedFile])

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--code-bg)' }}>
      {selectedFile && (
        <div className="px-4 py-2 border-b border-border shrink-0" style={{ backgroundColor: 'var(--code-bg-header)' }}>
          <span className="text-xs font-mono text-muted-foreground">{selectedFile.path}</span>
        </div>
      )}
      <div className="flex-1 overflow-auto">
        <div className="flex">
          <div className="py-4 px-4 text-right select-none text-xs font-mono leading-relaxed" style={{ color: 'var(--code-line-number)' }}>
            {codeContent.split('\n').map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <pre className="flex-1 py-4 pr-4 text-xs font-mono leading-relaxed overflow-x-auto">
            <code
              className="code-highlight"
              dangerouslySetInnerHTML={{ __html: highlightCode(codeContent) }}
            />
          </pre>
        </div>
      </div>
    </div>
  )
}

// ─── Original combined CodeDisplay (kept for backward compatibility) ───

export function CodeDisplay({ codeFiles, githubRepoPath }: CodeDisplayProps) {
  const [selectedFile, setSelectedFile] = useState<SampleCodeFile | null>(
    codeFiles.length > 0 ? codeFiles[0] : null
  )

  const fileTree = useMemo(() => buildFileTree(codeFiles), [codeFiles])

  // Get code content directly from the selected file (no async loading needed)
  const codeContent = useMemo(() => {
    if (!selectedFile) {
      return "// Select a file to view its contents"
    }
    return selectedFile.content || `// No content available for ${selectedFile.path}`
  }, [selectedFile])

  if (codeFiles.length === 0) {
    return (
      <div className="h-full rounded-lg border border-border bg-card p-6 flex items-center justify-center">
        <span className="text-sm text-muted-foreground">No code files available</span>
      </div>
    )
  }

  return (
    <div className="h-full rounded-lg border border-border bg-card overflow-hidden flex flex-col">
      {/* File Tree Sidebar */}
      <div className="flex h-full">
        <div className="w-64 border-r border-border bg-muted/30 overflow-y-auto p-2">
          <div className="mb-2 px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Files
          </div>
          {fileTree.map((node, index) => (
            <FileTreeNode
              key={`${node.path}-${index}`}
              node={node}
              onFileSelect={setSelectedFile}
              selectedPath={selectedFile?.path}
            />
          ))}
        </div>

        {/* Code Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedFile && (
            <div className="px-4 py-2 border-b border-border bg-muted/50">
              <span className="text-xs font-mono text-muted-foreground">{selectedFile.path}</span>
            </div>
          )}

            <div className="flex-1 overflow-auto" style={{ backgroundColor: 'var(--code-bg)' }}>
              <div className="flex">
                {/* Line numbers */}
                <div className="py-4 px-4 text-right select-none text-xs font-mono leading-relaxed" style={{ color: 'var(--code-line-number)' }}>
                  {codeContent.split('\n').map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                {/* Code content */}
                <pre className="flex-1 py-4 pr-4 text-xs font-mono leading-relaxed overflow-x-auto">
                  <code
                    className="code-highlight"
                    dangerouslySetInnerHTML={{ __html: highlightCode(codeContent) }}
                  />
                </pre>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}
