import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

type Theme = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

const STORAGE_KEY = 'theme-preference'

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getUrlTheme(): Theme | null {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  const t = params.get('theme')
  if (t === 'light' || t === 'dark' || t === 'system') return t
  return null
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  return getUrlTheme() || (localStorage.getItem(STORAGE_KEY) as Theme) || 'light'
}

function applyTheme(resolved: ResolvedTheme) {
  if (typeof document === 'undefined') return
  if (resolved === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Singleton state shared across all component instances
const theme = ref<Theme>(getInitialTheme())
const resolvedTheme = computed<ResolvedTheme>(() => {
  if (theme.value === 'system') return getSystemTheme()
  return theme.value
})

export function useTheme() {
  function setTheme(newTheme: Theme) {
    theme.value = newTheme
    localStorage.setItem(STORAGE_KEY, newTheme)
  }

  // Apply theme whenever it changes
  watch(resolvedTheme, (resolved) => {
    applyTheme(resolved)
  }, { immediate: true })

  // Listen for postMessage from master app
  onMounted(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'theme-change' && event.data.theme) {
        setTheme(event.data.theme as Theme)
      }
    }
    window.addEventListener('message', handler)
    onUnmounted(() => window.removeEventListener('message', handler))

    // Listen for system theme changes when in system mode
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const mqHandler = () => {
      if (theme.value === 'system') {
        applyTheme(getSystemTheme())
      }
    }
    mq.addEventListener('change', mqHandler)
    onUnmounted(() => mq.removeEventListener('change', mqHandler))
  })

  return { theme, resolvedTheme, setTheme }
}
