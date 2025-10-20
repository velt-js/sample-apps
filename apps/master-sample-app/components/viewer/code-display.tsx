"use client"

import { useEffect, useState, useMemo } from "react"
import { SampleCodeFile } from "@/types/sample"
import { ChevronRight, File, Folder } from "lucide-react"
import { cn } from "@/lib/utils"

// Syntax highlighting function
function highlightCode(code: string): string {
  let highlighted = code
  
  // Escape HTML first
  highlighted = highlighted
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  
  // Comments (must be done before other highlighting)
  highlighted = highlighted.replace(
    /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
    '<span class="code-comment">$1</span>'
  )
  
  // Strings
  highlighted = highlighted.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
    '<span class="code-string">$1</span>'
  )
  
  // Keywords
  highlighted = highlighted.replace(
    /\b(import|export|from|const|let|var|function|return|if|else|for|while|class|interface|type|extends|implements|async|await|try|catch|throw|new|this|super|static|public|private|protected|default|case|switch|break|continue|do|in|of|typeof|instanceof|void|null|undefined|as)\b/g,
    '<span class="code-keyword">$1</span>'
  )
  
  // Numbers
  highlighted = highlighted.replace(
    /\b(\d+\.?\d*)\b/g,
    '<span class="code-number">$1</span>'
  )
  
  // Boolean and special values
  highlighted = highlighted.replace(
    /\b(true|false)\b/g,
    '<span class="code-literal">$1</span>'
  )
  
  // Function names (before parenthesis)
  highlighted = highlighted.replace(
    /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,
    '<span class="code-function">$1</span>'
  )
  
  // Types/Classes (PascalCase)
  highlighted = highlighted.replace(
    /\b([A-Z][a-zA-Z0-9_]*)\b/g,
    '<span class="code-type">$1</span>'
  )
  
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
        <span className="truncate font-mono text-xs">{node.name}</span>
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

export function CodeDisplay({ codeFiles, githubRepoPath }: CodeDisplayProps) {
  const [selectedFile, setSelectedFile] = useState<SampleCodeFile | null>(
    codeFiles.length > 0 ? codeFiles[0] : null
  )
  const [codeContent, setCodeContent] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  
  const fileTree = useMemo(() => buildFileTree(codeFiles), [codeFiles])

  useEffect(() => {
    const fetchCode = async () => {
      if (!selectedFile) {
        setCodeContent("// Select a file to view its contents")
        return
      }

      try {
        setIsLoading(true)
        // Construct the full local path - files are in sample-apps workspace
        const basePath = '/Users/yoenzhang/Downloads/sample-apps'
        const fullPath = `${basePath}/${selectedFile.path}`
        
        const response = await fetch(`/api/read-file?path=${encodeURIComponent(fullPath)}`)
        
        if (!response.ok) {
          throw new Error('Failed to read file')
        }
        
        const text = await response.text()
        setCodeContent(text)
      } catch (err) {
        console.error('Error reading code:', err)
        setCodeContent(`// Failed to load ${selectedFile.path}\n// Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCode()
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
          
            <div className="flex-1 overflow-auto bg-[#1a1a1a]">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <span className="text-sm text-muted-foreground">Loading code...</span>
                </div>
              ) : (
                <div className="flex">
                  {/* Line numbers */}
                  <div className="py-4 px-4 text-right select-none text-[#858585] text-xs font-mono leading-relaxed">
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
              )}
            </div>
        </div>
      </div>
    </div>
  )
}

