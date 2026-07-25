<script setup lang="ts">
import { FileText, FolderOpen, ArrowRight, ArrowLeft } from 'lucide-vue-next'

defineProps<{
  items: Array<{ title: string; path: string; children?: unknown[] }>
}>()

const { localeProperties } = useI18n()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')
const { withLocale } = useContentLink()
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <NuxtLink v-for="item in items" :key="item.path" :to="withLocale(item.path)" class="group">
      <UiCard class="flex h-full flex-col gap-2 rounded-2xl p-5 transition-colors hover:border-primary/50 hover:bg-accent">
        <div class="flex items-center gap-2 text-primary">
          <component :is="item.children?.length ? FolderOpen : FileText" class="h-4 w-4" />
          <span class="font-medium text-foreground">{{ item.title }}</span>
        </div>
        <span class="mt-auto flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary">
          <component :is="isRtl ? ArrowLeft : ArrowRight" class="h-3.5 w-3.5" />
        </span>
      </UiCard>
    </NuxtLink>
  </div>
</template>
