<script setup lang="ts">
import { List } from 'lucide-vue-next'

const props = defineProps<{
  toc?: { links?: Array<{ id: string; text: string; depth: number; children?: any[] }> } | null
}>()
const { t } = useI18n()
</script>

<template>
  <div v-if="toc?.links?.length" class="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto text-sm">
    <p class="mb-2 flex items-center gap-1.5 font-semibold text-foreground">
      <List class="h-3.5 w-3.5 text-primary" />
      {{ t('page.onThisPage') }}
    </p>
    <ul class="space-y-1.5 border-s border-border ps-3">
      <li v-for="link in toc.links" :key="link.id">
        <a :href="`#${link.id}`" class="block text-muted-foreground hover:text-primary transition-colors">
          {{ link.text }}
        </a>
        <ul v-if="link.children?.length" class="mt-1.5 space-y-1.5 ps-3">
          <li v-for="child in link.children" :key="child.id">
            <a :href="`#${child.id}`" class="block text-muted-foreground hover:text-primary transition-colors">
              {{ child.text }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
