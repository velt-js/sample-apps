import { Sample } from "@/types/sample"

export interface ParsedSample {
  sampleId: string
  framework: string
  feature: string
  appType: string
  library: string
  demoName: string
}

const knownFrameworks: Record<string, string> = {
  react: 'React',
  javascript: 'JavaScript',
  vue: 'Vue',
  angular: 'Angular',
}

export function parseSample(sample: Sample): ParsedSample {
  const routePath = sample.metadata.routePath || ''
  const segments = routePath.split('/').filter(Boolean)

  const frameworkKey = segments[0]
  if (frameworkKey && knownFrameworks[frameworkKey]) {
    return {
      sampleId: sample.metadata.id,
      framework: knownFrameworks[frameworkKey],
      feature: segments[1] || '',
      appType: segments[2] || '',
      library: segments[3] || '',
      demoName: segments[4] || segments[segments.length - 1] || '',
    }
  }

  // For non-framework-prefixed routes (e.g., cursors)
  return {
    sampleId: sample.metadata.id,
    framework: 'React',
    feature: segments[0] || '',
    appType: segments[1] || '',
    library: '',
    demoName: segments[segments.length - 1] || '',
  }
}

export function formatLabel(value: string): string {
  if (!value) return ''
  return value
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Tags shown in a demo card's meta row (e.g. "CRDT • Text Editor").
export function getCardTags(parsed: ParsedSample): string[] {
  return [parsed.feature, parsed.appType]
    .filter(Boolean)
    .map(formatLabel)
}

// Fixed entries (these show even if no demos exist yet)
export const FRAMEWORK_EXTRAS = [
  { id: 'Angular', icon: 'angular' },
  { id: 'Vue', icon: 'vue' },
]

export function FrameworkIcon({ framework }: { framework: string }) {
  if (framework === 'React') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 12 12)" />
      </svg>
    )
  }
  if (framework === 'Angular') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path d="M12 2L3 6.5L4.5 18L12 22L19.5 18L21 6.5L12 2Z" fill="#DD0031" />
        <path d="M12 2V22L19.5 18L21 6.5L12 2Z" fill="#C3002F" />
        <path d="M12 5.5L7 17H9L10 14H14L15 17H17L12 5.5ZM13 12.5H11L12 9L13 12.5Z" fill="white" />
      </svg>
    )
  }
  if (framework === 'Javascript') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <rect width="24" height="24" rx="2" fill="#F7DF1E" />
        <path d="M6.4 19.2l1.7-1c.3.6.7 1 1.4 1 .7 0 1.1-.3 1.1-1.5v-8h2.1v8c0 2.4-1.4 3.5-3.4 3.5-1.8 0-2.5-.9-2.9-2zm6.9-.3l1.7-1c.4.7 1 1.2 2 1.2.8 0 1.4-.4 1.4-1s-.5-1-1.5-1.4l-.5-.2c-1.5-.6-2.4-1.4-2.4-3 0-1.5 1.1-2.6 2.9-2.6 1.3 0 2.2.4 2.8 1.6l-1.6 1c-.3-.6-.7-.9-1.3-.9-.6 0-.9.4-.9.9s.4.9 1.2 1.3l.5.2c1.7.7 2.7 1.5 2.7 3.1 0 1.8-1.4 2.8-3.3 2.8-1.8 0-3-.9-3.6-2z" fill="#000" />
      </svg>
    )
  }
  if (framework === 'JavaScript') {
    return (
      <svg width="16" height="16" viewBox="0 0 256 256" className="shrink-0">
        <rect width="256" height="256" fill="#F7DF1E" rx="16" />
        <path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574" fill="#000" />
      </svg>
    )
  }
  if (framework === 'Vue') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path d="M2 3H5.5L12 14L18.5 3H22L12 21L2 3Z" fill="#41B883" />
        <path d="M5.5 3H9.5L12 7.5L14.5 3H18.5L12 14L5.5 3Z" fill="#34495E" />
      </svg>
    )
  }
  return <div className="w-4 h-4 rounded bg-muted-foreground/20 shrink-0" />
}
