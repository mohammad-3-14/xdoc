// Content collection paths are locale-agnostic (e.g. /frontend/vue), but routes
// are locale-prefixed (e.g. /fa/frontend/vue). This prefixes a content path with
// the active locale for use in NuxtLink :to bindings.
export function useContentLink() {
  const { locale } = useI18n()

  function withLocale(path: string) {
    if (path === '/') return `/${locale.value}`
    return `/${locale.value}${path}`
  }

  return { withLocale }
}
