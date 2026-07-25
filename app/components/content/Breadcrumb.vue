<script setup lang="ts">
import { ChevronRight, ChevronLeft } from 'lucide-vue-next'

const props = defineProps<{
  path: string
}>()

const { t, locale, localeProperties } = useI18n()
const { navigation } = await useDocsNav()
const { withLocale } = useContentLink()

interface Crumb { title: string; path: string }

const crumbs = computed<Crumb[]>(() => {
  const tree = navigation.value ?? []
  const result: Crumb[] = []

  function walk(items: any[]): boolean {
    for (const item of items) {
      if (item.path === props.path) {
        result.push({ title: item.title, path: item.path })
        return true
      }
      if (item.children?.length) {
        result.push({ title: item.title, path: item.path })
        if (walk(item.children)) return true
        result.pop()
      }
    }
    return false
  }
  walk(tree)
  return result
})

const isRtl = computed(() => localeProperties.value.dir === 'rtl')
</script>

<template>
  <nav v-if="crumbs.length" class="flex flex-wrap items-center gap-1 text-sm text-muted-foreground" aria-label="Breadcrumb">
    <NuxtLinkLocale to="/" class="hover:text-foreground transition-colors">{{ t('breadcrumb.home') }}</NuxtLinkLocale>
    <template v-for="(crumb, i) in crumbs" :key="crumb.path">
      <component :is="isRtl ? ChevronLeft : ChevronRight" class="h-3.5 w-3.5 shrink-0" />
      <NuxtLink
        v-if="i < crumbs.length - 1"
        :to="withLocale(crumb.path)"
        class="hover:text-foreground transition-colors"
      >
        {{ crumb.title }}
      </NuxtLink>
      <span v-else class="text-foreground font-medium">{{ crumb.title }}</span>
    </template>
  </nav>
</template>
