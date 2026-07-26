<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()

// route.path includes the locale prefix (/fa/frontend/vue); content paths do not
// (/frontend/vue) since each locale is its own collection with prefix stripped.
const contentPath = computed(() => {
  const rest = route.path.split('/').filter(Boolean).slice(1)
  return rest.length ? `/${rest.join('/')}` : '/'
})

const { data: page } = await useAsyncData(
  () => `page-${route.path}`,
  () => queryCollection(locale.value as 'fa' | 'en').path(contentPath.value).first(),
  { watch: [contentPath, locale] },
)

// Draft pages are visible in dev, but must 404 in production builds.
if (!page.value || (page.value.draft && !import.meta.dev)) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { navigation } = await useDocsNav()

function findNode(items: any[], path: string): any {
  for (const item of items) {
    if (item.path === path) return item
    if (item.children) {
      const found = findNode(item.children, path)
      if (found) return found
    }
  }
  return null
}

const categoryChildren = computed(() => {
  const tree = navigation.value ?? []
  const node = findNode(tree, contentPath.value)
  return node?.children?.length ? node.children : null
})

const { data: surround } = await useAsyncData(
  () => `surround-${route.path}`,
  () => queryCollectionItemSurroundings(locale.value as 'fa' | 'en', contentPath.value, {
    fields: ['title', 'path'],
  }),
  { watch: [contentPath, locale] },
)

const prev = computed(() => surround.value?.[0] ?? null)
const next = computed(() => surround.value?.[1] ?? null)

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
})
</script>

<template>
  <div v-if="page" class="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_14rem]">
    <article class="min-w-0">
      <ContentBreadcrumb :path="contentPath" class="mb-4" />
      <h1 class="text-2xl font-bold tracking-tight text-balance">{{ page.title }}</h1>
      <p v-if="page.description" class="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">{{ page.description }}</p>
      <ContentLastUpdated :date="page.updatedAt" class="mt-4" />

      <ContentCategoryGrid v-if="categoryChildren" :items="categoryChildren" class="mt-8" />

      <div class="doc-prose mt-10">
        <ContentRenderer :value="page" />
      </div>

      <ContentPrevNext :prev="prev" :next="next" />
    </article>

    <aside class="hidden xl:block">
      <ContentTableOfContents :toc="page.body?.toc" />
    </aside>
  </div>
</template>
