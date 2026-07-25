import type { ContentNavigationItem } from '@nuxt/content'

/**
 * Recursively drop draft pages from a navigation tree.
 * Drafts are only ever queried in dev mode (see the `where` clause below),
 * so in a production build they never reach the client at all; this is a
 * second guard for the (dev-only) case where a folder index is a draft but
 * has non-draft children, etc.
 */
function pruneDrafts(items: ContentNavigationItem[]): ContentNavigationItem[] {
  return items
    .filter((item) => !(item as { draft?: boolean }).draft)
    .map((item) => ({
      ...item,
      children: item.children ? pruneDrafts(item.children) : item.children,
    }))
}

/**
 * Loads the navigation tree for the active locale's collection.
 * Cached per-locale so switching locales re-fetches.
 * Draft pages (draft: true) are excluded in production builds and visible in dev.
 */
// `useAsyncData`'s return value is itself awaitable (Nuxt attaches the underlying
// promise), so callers should `const { navigation } = await useDocsNav()`. This lets
// Vue's automatic Suspense boundary block rendering until the tree resolves — which
// matters for SSG: sidebar/breadcrumb links must exist in the prerendered HTML for
// Nitro's `crawlLinks` crawler to discover and prerender the pages they point to.
export async function useDocsNav() {
  const { locale } = useI18n()

  const { data: navigation, pending, error, refresh } = await useAsyncData<ContentNavigationItem[]>(
    () => `navigation-${locale.value}`,
    async () => {
      const query = queryCollectionNavigation(locale.value as 'fa' | 'en')
      const tree = await query
      return import.meta.dev ? tree : pruneDrafts(tree)
    },
    { watch: [locale] },
  )

  return { navigation, pending, error, refresh }
}
