<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{
  prev?: { title: string; path: string } | null
  next?: { title: string; path: string } | null
}>()
const { t, localeProperties } = useI18n()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')
const { withLocale } = useContentLink()
</script>

<template>
  <div v-if="prev || next" class="mt-10 grid grid-cols-1 gap-3 border-t border-border pt-6 sm:grid-cols-2">
    <NuxtLink
      v-if="prev"
      :to="withLocale(prev.path)"
      class="group flex flex-col rounded-lg border border-transparent p-3 transition-colors hover:border-border"
    >
      <span class="flex items-center gap-1 text-xs text-muted-foreground">
        <component :is="isRtl ? ChevronRight : ChevronLeft" class="h-3.5 w-3.5" />
        {{ t('page.prev') }}
      </span>
      <span class="mt-1 text-sm font-medium text-foreground group-hover:text-primary">{{ prev.title }}</span>
    </NuxtLink>
    <div v-else class="hidden sm:block" />
    <NuxtLink
      v-if="next"
      :to="withLocale(next.path)"
      class="group flex flex-col rounded-lg border border-transparent p-3 text-end transition-colors hover:border-border sm:col-start-2"
    >
      <span class="flex items-center justify-end gap-1 text-xs text-muted-foreground">
        {{ t('page.next') }}
        <component :is="isRtl ? ChevronLeft : ChevronRight" class="h-3.5 w-3.5" />
      </span>
      <span class="mt-1 text-sm font-medium text-foreground group-hover:text-primary">{{ next.title }}</span>
    </NuxtLink>
  </div>
</template>
