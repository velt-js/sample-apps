'use client'

import { useRef, useCallback, useMemo, useState, useEffect } from 'react'
import { useStore } from '@veltdev/crdt-react'
import { VeltCommentTool } from '@veltdev/react'
import { CoreEditorProps } from './types'
import { initialContent, sectionHeadings } from './constants'

const STORE_ID = 'core-crdt-notepad-1'

// Parse plain text into sections based on known heading titles
function parseSections(text: string): { id: string; title: string; heading: 'h1' | 'h2' | 'h3' | null; content: string }[] {
  const lines = text.split('\n')
  const sections: { id: string; title: string; heading: 'h1' | 'h2' | 'h3' | null; content: string }[] = []
  let currentSection: { id: string; title: string; heading: 'h1' | 'h2' | 'h3' | null; lines: string[] } | null = null

  for (const line of lines) {
    const trimmed = line.trim()
    const headingLevel = sectionHeadings[trimmed]

    if (headingLevel) {
      if (currentSection) {
        sections.push({
          ...currentSection,
          content: currentSection.lines.join('\n').trim(),
        })
      }
      const id = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      currentSection = {
        id: `section-${id}`,
        title: trimmed,
        heading: headingLevel,
        lines: [],
      }
    } else if (currentSection) {
      currentSection.lines.push(line)
    } else {
      if (!currentSection) {
        currentSection = {
          id: 'section-intro',
          title: '',
          heading: null,
          lines: [line],
        }
      }
    }
  }

  if (currentSection) {
    sections.push({
      ...currentSection,
      content: currentSection.lines.join('\n').trim(),
    })
  }

  return sections
}

export default function CoreEditor({ scrollContainerRef }: CoreEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const isUpdatingFromCrdt = useRef(false)

  // [Velt] Initialize CRDT store for real-time collaborative text editing
  // useStore internally gates on useVeltClient() + useVeltInitState() from VeltProvider context
  const {
    value: text,
    update: updateText,
    isLoading,
    isSynced: hookSynced,
    status: hookStatus,
    error,
    store,
  } = useStore<string>({
    storeId: STORE_ID,
    type: 'text',
    initialValue: initialContent,
  })

  // Workaround: useStore has a race condition where the provider emits 'connected'
  // before the hook subscribes to events. Poll the provider's actual status.
  const [realStatus, setRealStatus] = useState<string>('connecting')
  const [realSynced, setRealSynced] = useState(false)

  useEffect(() => {
    if (!store) return
    const provider = store.getProvider?.()
    if (!provider) return

    // Capture current state (may have been missed by useStore's subscription)
    if (provider.status && provider.status !== 'connecting') {
      setRealStatus(provider.status)
    }
    if (provider.synced) {
      setRealSynced(true)
    }

    // Also subscribe for future changes
    const onStatus = ({ status: s }: { status: string }) => setRealStatus(s)
    const onSynced = (synced: boolean) => setRealSynced(synced)
    provider.on('status', onStatus)
    provider.on('synced', onSynced)

    return () => {
      provider.off?.('status', onStatus)
      provider.off?.('synced', onSynced)
    }
  }, [store])

  // Use our direct provider status, falling back to useStore's status
  const status = realStatus !== 'connecting' ? realStatus : hookStatus
  const isSynced = realSynced || hookSynced

  // Parse sections from the current text value
  const sections = useMemo(() => parseSections(text ?? initialContent), [text])

  // Handle contentEditable input for a section
  const handleSectionInput = useCallback((sectionId: string, newContent: string) => {
    if (isUpdatingFromCrdt.current) return

    const currentText = text ?? initialContent
    const currentSections = parseSections(currentText)

    const updatedLines: string[] = []
    for (const section of currentSections) {
      if (section.title) {
        updatedLines.push(section.title)
      }
      if (section.id === sectionId) {
        updatedLines.push(newContent)
      } else {
        updatedLines.push(section.content)
      }
      updatedLines.push('')
    }

    updateText(updatedLines.join('\n').replace(/\n{3,}/g, '\n\n').trim())
  }, [text, updateText])

  // [Velt] Real-time connection and sync status
  const statusDotColor =
    status === 'connected' ? (isSynced ? '#22c55e' : '#eab308') :
    status === 'connecting' ? '#eab308' : '#ef4444'

  const statusLabel =
    status === 'connected' ? (isSynced ? 'Synced' : 'Syncing…') :
    status === 'connecting' ? 'Connecting…' : 'Disconnected'

  return (
    <div className="relative size-full overflow-hidden" style={{ backgroundColor: 'var(--app-bg)' }} data-name="Core / CRDT Editor">
      <div ref={scrollContainerRef} className="absolute inset-0 overflow-y-auto pb-20">
        <div className="flex justify-center pt-[51px] px-4">
          <div className="w-full max-w-[850px]">
            {/* [Velt] Real-time connection and sync status from useStore */}
            <div className="flex items-center gap-1.5 mb-2 px-1">
              <span
                className="inline-block size-2 rounded-full shrink-0"
                style={{ backgroundColor: statusDotColor }}
              />
              <span className="text-xs" style={{ color: 'var(--app-text-tertiary)' }}>
                {statusLabel}
              </span>
            </div>
            <div className="border border-solid rounded-[16px] p-[42px_56px_64px_56px] min-h-[880px]" style={{ backgroundColor: 'var(--app-surface)', borderColor: 'var(--app-surface-border)' }}>
              <div ref={editorRef} className="w-full max-w-[738px] core-editor-content">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    id={section.id}
                    data-velt-target-comment-element-id={section.id}
                    className="section-block"
                  >
                    {section.title && (
                      <div data-heading={section.heading}>
                        <span
                          contentEditable
                          suppressContentEditableWarning
                          spellCheck={false}
                        >
                          {section.title}
                        </span>
                      </div>
                    )}
                    {section.content && (
                      <div
                        className="section-body"
                        contentEditable
                        suppressContentEditableWarning
                        spellCheck={false}
                        onBlur={(e) => {
                          const newContent = e.currentTarget.innerText
                          handleSectionInput(section.id, newContent)
                        }}
                        dangerouslySetInnerHTML={{
                          __html: section.content
                            .split('\n\n')
                            .filter(p => p.trim())
                            .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
                            .join('')
                        }}
                      />
                    )}
                    <div className="section-comment-tool">
                      <VeltCommentTool targetElementId={section.id} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
