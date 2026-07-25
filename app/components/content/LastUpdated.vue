<script setup lang="ts">
import { Clock } from 'lucide-vue-next'

const props = defineProps<{ date?: string }>()
const { t, locale } = useI18n()

const formatted = computed(() => {
  if (!props.date) return null
  try {
    return new Intl.DateTimeFormat(locale.value === 'fa' ? 'fa-IR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(props.date))
  } catch {
    return props.date
  }
})
</script>

<template>
  <p v-if="formatted" class="flex items-center gap-1.5 text-sm text-muted-foreground">
    <Clock class="h-3.5 w-3.5" />
    {{ t('page.lastUpdated') }}: <time :datetime="date">{{ formatted }}</time>
  </p>
</template>
