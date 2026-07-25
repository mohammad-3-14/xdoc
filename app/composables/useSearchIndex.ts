import Fuse from 'fuse.js'

interface SearchSection {
  id: string
  title: string
  titles: string[]
  content: string
  level: number
}

export function useSearchIndex() {
  const { locale } = useI18n()

  const { data: sections } = useAsyncData<SearchSection[]>(
    () => `search-${locale.value}`,
    () => $fetch(`/api/search/${locale.value}`),
    { watch: [locale] },
  )

  const fuse = computed(() => {
    return new Fuse(sections.value ?? [], {
      keys: [
        { name: 'title', weight: 2 },
        { name: 'titles', weight: 1.5 },
        { name: 'content', weight: 1 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
      minMatchCharLength: 2,
    })
  })

  function search(query: string) {
    if (!query.trim()) return []
    return fuse.value.search(query).slice(0, 20).map((r) => r.item)
  }

  return { search }
}
