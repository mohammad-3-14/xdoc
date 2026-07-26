<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import * as icons from 'lucide-vue-next'
import { ChevronDown, HelpCircle } from 'lucide-vue-next'

type NavItem = ContentNavigationItem & { icon?: string }

const props = defineProps<{
  items: NavItem[]
  depth?: number
}>()

const route = useRoute()
const { withLocale } = useContentLink()
const openMap = ref<Record<string, boolean>>({})
const emit = defineEmits<{ navigate: [] }>()

// Frontmatter stores icons as Iconify-style names (e.g. "i-lucide-network");
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

function isActive(path: string) {
  return route.path === withLocale(path)
}

function isAncestorOfActive(item: ContentNavigationItem): boolean {
  if (!item.children) return false
  return item.children.some((c: ContentNavigationItem) => isActive(c.path) || isAncestorOfActive(c))
}

function isOpen(item: ContentNavigationItem) {
  if (item.path in openMap.value) return openMap.value[item.path]
  return isAncestorOfActive(item)
}

function toggle(item: ContentNavigationItem) {
  openMap.value[item.path] = !isOpen(item)
}
</script>

<template>
  <ul :class="depth ? 'ms-3 border-s border-border ps-3 mt-1 space-y-0.5' : 'space-y-0.5'">
    <li v-for="item in items" :key="item.path">
      <template v-if="item.children && item.children.length">
        <button
          type="button"
          class="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors"
          @click="toggle(item)"
        >
          <span class="flex items-center gap-2">
            <component :is="resolveIcon(item.icon)" v-if="item.icon" class="h-4 w-4 shrink-0" />
            {{ item.title }}
          </span>
          <ChevronDown
            class="h-4 w-4 shrink-0 transition-transform"
            :class="{ '-rotate-90 rtl:rotate-90': !isOpen(item) }"
          />
        </button>
        <LayoutSidebarTree v-show="isOpen(item)" :items="item.children" :depth="(depth ?? 0) + 1" @navigate="emit('navigate')" />
      </template>
      <template v-else>
        <NuxtLink
          :to="withLocale(item.path)"
          class="relative block rounded-lg px-3 py-2 text-sm transition-colors"
          :class="isActive(item.path)
            ? 'bg-primary/14 text-primary font-bold'
            : 'text-foreground/70 hover:bg-accent hover:text-accent-foreground'"
          @click="emit('navigate')"
        >
          <span class="flex items-center gap-2">
            <component :is="resolveIcon(item.icon)" v-if="item.icon" class="h-4 w-4 shrink-0" />
            {{ item.title }}
          </span>
        </NuxtLink>
      </template>
    </li>
  </ul>
</template>
