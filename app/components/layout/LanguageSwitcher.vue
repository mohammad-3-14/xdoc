<script setup lang="ts">
import { Languages } from 'lucide-vue-next'

const { locale, locales, t } = useI18n()
const route = useRoute()
const router = useRouter()

async function switchTo(code: string) {
  if (code === locale.value) return

  // route.path is locale-prefixed (/fa/frontend/vue); content paths are not
  // (each locale is its own collection with the prefix stripped).
  const segments = route.path.split('/').filter(Boolean).slice(1)
  const contentPath = segments.length ? `/${segments.join('/')}` : '/'
  const targetRoute = `/${code}${contentPath === '/' ? '' : contentPath}`

  // Try the equivalent path in the target locale; if content doesn't exist there, fall back to that locale's home.
  const exists = await queryCollection(code as 'fa' | 'en').path(contentPath).first().catch(() => null)
  router.push(exists ? targetRoute : `/${code}`)
}
</script>

<template>
  <UiDropdownMenu align="end">
    <template #trigger>
      <UiButton variant="ghost" size="icon" :aria-label="t('language.switch')">
        <Languages class="h-4 w-4" />
      </UiButton>
    </template>
    <UiDropdownMenuItem
      v-for="l in locales"
      :key="l.code"
      :class="{ 'text-primary font-medium': l.code === locale }"
      @click="switchTo(l.code)"
    >
      {{ l.name }}
    </UiDropdownMenuItem>
  </UiDropdownMenu>
</template>
