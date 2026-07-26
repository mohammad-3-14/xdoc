<script setup lang="ts">
import { Search, Github, Menu, FileText } from 'lucide-vue-next'

const { t, locale, locales } = useI18n()
const route = useRoute()
const searchOpen = ref(false)
const emit = defineEmits<{ 'toggle-sidebar': [] }>()

const isHome = computed(() => {
  const path = route.path.replace(/\/$/, '')
  return path === '' || path === `/${locale.value}`
})
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-border bg-background/86 backdrop-blur-md">
    <div class="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4">
      <UiButton
        v-if="!isHome"
        variant="ghost"
        size="icon"
        class="lg:hidden"
        :aria-label="t('nav.toggleSidebar')"
        @click="emit('toggle-sidebar')"
      >
        <Menu class="h-5 w-5" />
      </UiButton>

      <NuxtLinkLocale to="/" class="flex items-center gap-2.5 font-bold tracking-tight">
        <span class="flex h-8.5 w-8.5 items-center justify-center rounded-[9px] bg-primary text-primary-foreground">
          <FileText class="h-4.5 w-4.5" />
        </span>
        <span>{{ t('site.title') }}</span>
      </NuxtLinkLocale>

      <button
        type="button"
        class="ms-2 hidden flex-1 items-center gap-2 rounded-[10px] border border-border bg-secondary px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground sm:flex max-w-sm"
        @click="searchOpen = true"
      >
        <Search class="h-4 w-4" />
        <span class="flex-1 text-start">{{ t('search.trigger') }}</span>
        <kbd class="rounded border border-border bg-background/60 px-1.5 py-0.5 text-[10px] font-mono">Ctrl K</kbd>
      </button>

      <div class="ms-auto flex items-center gap-1">
        <UiButton variant="ghost" size="icon" class="sm:hidden" :aria-label="t('search.trigger')" @click="searchOpen = true">
          <Search class="h-4 w-4" />
        </UiButton>
        <LayoutLanguageSwitcher v-if="locales.length > 1" />
        <LayoutThemeToggle />
        <UiButton as="a" href="https://github.com/mohammad-3-14/xdoc" target="_blank" rel="noopener" variant="ghost" size="icon" :aria-label="t('nav.github')">
          <Github class="h-4 w-4" />
        </UiButton>
      </div>
    </div>
  </header>

  <LayoutSearchDialog v-model:open="searchOpen" />
</template>
