export type ColorMode = 'light' | 'dark'

const STORAGE_KEY = 'xdoc-color-mode'

export function useColorMode() {
  const mode = useState<ColorMode>('color-mode', () => 'dark')

  function apply(next: ColorMode) {
    mode.value = next
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', next === 'dark')
      localStorage.setItem(STORAGE_KEY, next)
      document.cookie = `${STORAGE_KEY}=${next}; path=/; max-age=31536000; SameSite=Lax`
    }
  }

  function init() {
    if (!import.meta.client) return
    const stored = localStorage.getItem(STORAGE_KEY) as ColorMode | null
    const preferred = stored ?? 'dark'
    mode.value = preferred
    document.documentElement.classList.toggle('dark', preferred === 'dark')
  }

  function toggle() {
    apply(mode.value === 'dark' ? 'light' : 'dark')
  }

  return { mode, apply, init, toggle }
}
