"use client"

import { useEffect, useState } from "react"
import { SampleCodeFile } from "@/types/sample"

interface CodeDisplayProps {
  codeFiles: SampleCodeFile[]
  githubRepoPath?: string
}

export function CodeDisplay({ codeFiles, githubRepoPath }: CodeDisplayProps) {
  const [codeContent, setCodeContent] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCode = async () => {
      if (!githubRepoPath || codeFiles.length === 0) {
        // Fallback to default code if no GitHub path
        setCodeContent(`import { TiptapVeltComments } from '@velt/editor/tiptap-velt'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TiptapComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'tiptap-angular';
  focusMode = false;

  editor = new Editor({
    extensions: [
      TiptapVeltComments.configure({
        persistVolatiles: false
      }),
      StarterKit,
      Placeholder,
      Underline,
      TextAlign,
      Image
    ],
    editorProps: {
      // ... editor configuration
    }
  });
}`)
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const file = codeFiles[0]
        const url = `https://raw.githubusercontent.com/${githubRepoPath}/main/${file.path}`
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error('Failed to fetch code')
        }
        
        const text = await response.text()
        setCodeContent(text)
        setError(null)
      } catch (err) {
        console.error('Error fetching code:', err)
        setError('Failed to load code from GitHub')
        // Fallback to default content
        setCodeContent(`import { TiptapVeltComments } from '@velt/editor/tiptap-velt'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TiptapComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'tiptap-angular';
  focusMode = false;

  editor = new Editor({
    extensions: [
      TiptapVeltComments.configure({
        persistVolatiles: false
      }),
      StarterKit,
      Placeholder,
      Underline,
      TextAlign,
      Image
    ],
    editorProps: {
      // ... editor configuration
    }
  });
}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCode()
  }, [codeFiles, githubRepoPath])

  return (
    <div className="h-full rounded-lg border border-border bg-card p-6 overflow-auto">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <span className="text-sm text-muted-foreground">Loading code...</span>
        </div>
      ) : (
        <pre className="text-xs font-mono text-foreground">
          <code>{codeContent}</code>
        </pre>
      )}
    </div>
  )
}

