// Small helper to build the "switch locale, keep page if possible" link target.
// Falls back to that locale's home page when no translated equivalent content exists
// at the same content path.
export function useLocaleSwitchPath() {
  const route = useRoute()
  const { locales } = useI18n()

  async function targetPathFor(code: 'fa' | 'en') {
    const segments = route.path.split('/').filter(Boolean)
    // segments[0] is the current locale prefix; the rest is the content path.
    const rest = segments.slice(1)
    if (rest.length === 0) return `/${code}`

    const candidatePath = `/${rest.join('/')}`
    try {
      const match = await queryCollection(code).path(candidatePath).first()
      return match ? `/${code}${candidatePath}` : `/${code}`
    } catch {
      return `/${code}`
    }
  }

  return { targetPathFor, locales }
}
