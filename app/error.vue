<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()
const { t, locale } = useI18n()

function handleBack() {
  clearError({ redirect: `/${locale.value}` })
}
</script>

<template>
  <NuxtLayout>
    <div class="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p class="text-7xl font-bold text-primary">404</p>
      <h1 class="mt-4 text-2xl font-semibold">{{ t('notFound.title') }}</h1>
      <p class="mt-2 max-w-md text-muted-foreground">{{ t('notFound.description') }}</p>
      <UiButton class="mt-6" @click="handleBack">{{ t('notFound.backHome') }}</UiButton>
    </div>
  </NuxtLayout>
</template>
