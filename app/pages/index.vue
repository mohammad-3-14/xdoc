<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import * as icons from 'lucide-vue-next'
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-vue-next'

// With i18n strategy "prefix", this component renders the locale home
// (e.g. /fa or /en) — a hero, category cards, and a popular-pages list
// built from the navigation tree rather than from content/<locale>/index.md.
const { locale, t, localeProperties } = useI18n()
const { withLocale } = useContentLink()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

useSeoMeta({
  title: () => t('home.title'),
  description: () => t('home.subtitle'),
})

type NavItem = ContentNavigationItem & { description?: string, icon?: string }

// Frontmatter stores icons as Iconify-style names (e.g. "i-lucide-server");
// resolve to the matching lucide-vue-next component, falling back if unknown.
function resolveIcon(name?: string) {
  if (!name) return null
  const pascal = name
    .replace(/^i-lucide-/, '')
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
  return (icons as Record<string, typeof HelpCircle>)[pascal] ?? HelpCircle
}

const { data: navigation } = await useAsyncData(
  () => `home-navigation-${locale.value}`,
  () => queryCollectionNavigation(locale.value as 'fa' | 'en', ['description']) as unknown as Promise<NavItem[]>,
  { watch: [locale] },
)

// The nav tree's own `title`/`description` on a folder node are overridden by that
// folder's `navigation.title` frontmatter (used for its *sidebar* label as a child
// link, e.g. "Overview"), so the top-level category cards fetch their real page
// title/description directly instead of trusting the tree node.
const { data: categoryPages } = await useAsyncData(
  () => `home-category-pages-${locale.value}`,
  () => queryCollection(locale.value as 'fa' | 'en').select('path', 'title', 'description', 'navigation').all(),
  { watch: [locale] },
)

function realTitle(path: string, fallback: string) {
  return categoryPages.value?.find(p => p.path === path)?.title ?? fallback
}
function realDescription(path: string) {
  return categoryPages.value?.find(p => p.path === path)?.description ?? ''
}
function realIcon(path: string, fallback?: string) {
  const nav = categoryPages.value?.find(p => p.path === path)?.navigation
  const navIcon = typeof nav === 'object' && nav ? (nav as { icon?: string }).icon : undefined
  return navIcon ?? fallback
}

// Flatten a category's subtree into leaf pages only. Every folder pushes its own
// index.md as a synthetic child sharing the folder's path (its `navigation.title`
// frontmatter, e.g. "Overview", exists for the *sidebar* — not for this list), so
// drop any child whose path equals its parent's path.
function flattenLeaves(items: NavItem[], parentPath?: string): NavItem[] {
  return items.flatMap((item) => {
    if (item.path === parentPath) return []
    if (item.children?.length) return flattenLeaves(item.children, item.path)
    return [item]
  })
}

const categories = computed(() => (navigation.value ?? []).filter(c => c.children?.length))

const monogramPalette = ['gold', 'blue'] as const
function monogramFor(index: number) {
  return monogramPalette[index % monogramPalette.length]
}
function initialsFor(title: string) {
  return title.slice(0, 2).toUpperCase()
}

const query = ref('')
function matches(title: string) {
  const q = query.value.trim().toLowerCase()
  return !q || title.toLowerCase().includes(q) || title.includes(query.value.trim())
}

const categoryCards = computed(() => categories.value.map((cat, i) => {
  const leaves = flattenLeaves(cat.children ?? [], cat.path)
  const title = realTitle(cat.path, cat.title)
  const isFiltering = query.value.trim().length > 0
  const visibleLeaves = leaves.filter(d => matches(d.title))
  return {
    path: cat.path,
    title,
    description: realDescription(cat.path),
    tone: monogramFor(i),
    initials: initialsFor(title),
    icon: resolveIcon(realIcon(cat.path, cat.icon)),
    docs: leaves.map(d => ({ ...d, visible: matches(d.title) })),
    visible: isFiltering ? visibleLeaves.length > 0 || matches(title) : true,
  }
}))

const popularDocs = computed(() => {
  const flat = categories.value.flatMap((cat, i) => {
    const leaves = flattenLeaves(cat.children ?? [], cat.path)
    return leaves.slice(0, 2).map(d => ({ ...d, catTitle: realTitle(cat.path, cat.title), tone: monogramFor(i), icon: resolveIcon(realIcon(cat.path, cat.icon)) }))
  })
  return flat.slice(0, 4).map(d => ({ ...d, visible: matches(d.title) }))
})

const anyPopularVisible = computed(() => popularDocs.value.some(d => d.visible))
</script>

<template>
  <div class="mx-auto max-w-[1120px] px-4 pb-10 pt-8 sm:px-8 sm:pt-10">
    <div class="mx-auto mb-14 max-w-xl text-center">
      <div class="mb-4 text-[13px] font-bold tracking-[0.05em] text-primary">{{ t('home.eyebrow') }}</div>
      <h1 class="text-balance mb-4 text-[32px] font-extrabold leading-[1.3] sm:text-[44px]">{{ t('home.title') }}</h1>
      <p class="text-pretty text-base leading-relaxed text-muted-foreground">{{ t('home.subtitle') }}</p>

      <div class="mx-auto mt-8 flex max-w-sm items-center gap-2 rounded-[10px] border border-border bg-secondary px-3.5 py-2.5">
        <svg class="h-4 w-4 shrink-0 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
        <input v-model="query" :placeholder="t('search.trigger')" class="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground">
      </div>
    </div>

    <div class="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div
        v-for="cat in categoryCards"
        v-show="cat.visible"
        :key="cat.path"
        class="rounded-2xl border border-border bg-card p-7"
      >
        <NuxtLink :to="withLocale(cat.path)" class="mb-4.5 flex items-center gap-3.5">
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] font-mono text-[13px] font-bold"
            :class="cat.tone === 'gold' ? 'bg-primary/14 text-primary' : 'bg-blue/14 text-blue'"
          >
            <component :is="cat.icon" v-if="cat.icon" class="h-5 w-5" />
            <template v-else>{{ cat.initials }}</template>
          </div>
          <div>
            <div class="text-lg font-bold">{{ cat.title }}</div>
            <div class="text-[13px] text-muted-foreground">{{ t('home.pagesCount', cat.docs.length, { count: cat.docs.length }) }}</div>
          </div>
        </NuxtLink>
        <p v-if="cat.description" class="mb-4.5 text-sm leading-relaxed text-muted-foreground">{{ cat.description }}</p>
        <div class="flex flex-col gap-0.5 border-t border-border pt-2.5">
          <NuxtLink
            v-for="d in cat.docs"
            v-show="d.visible"
            :key="d.path"
            :to="withLocale(d.path)"
            class="flex items-center justify-between rounded-lg px-2 py-2.5 text-[14.5px] transition-colors hover:bg-accent"
          >
            <span>{{ d.title }}</span>
            <component :is="isRtl ? ChevronLeft : ChevronRight" class="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-show="anyPopularVisible">
      <div class="mb-4 text-[13px] font-bold tracking-wide text-muted-foreground">{{ t('home.popular') }}</div>
      <div class="flex flex-col gap-px overflow-hidden rounded-2xl border border-border bg-border">
        <NuxtLink
          v-for="d in popularDocs"
          v-show="d.visible"
          :key="d.path"
          :to="withLocale(d.path)"
          class="flex items-center gap-4 bg-card px-5.5 py-4.5 transition-colors hover:bg-accent"
        >
          <span
            class="flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-bold"
            :class="d.tone === 'gold' ? 'bg-primary/14 text-primary' : 'bg-blue/14 text-blue'"
          >
            <component :is="d.icon" v-if="d.icon" class="h-4 w-4" />
            {{ d.catTitle }}
          </span>
          <div class="min-w-0 flex-1">
            <div class="truncate text-[15px] font-semibold">{{ d.title }}</div>
            <div v-if="d.description" class="truncate text-[13px] text-muted-foreground">{{ d.description }}</div>
          </div>
          <component :is="isRtl ? ChevronLeft : ChevronRight" class="h-4 w-4 shrink-0 text-muted-foreground" />
        </NuxtLink>
      </div>
    </div>

    <div class="mt-18 border-t border-border pt-6 text-center text-[13px] text-muted-foreground/70">
      {{ t('home.footer') }}
    </div>
  </div>
</template>
