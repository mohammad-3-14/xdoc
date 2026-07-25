<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'

const { mode, toggle } = useColorMode()
const { t } = useI18n()
</script>

<template>
  <UiButton variant="ghost" size="icon" :aria-label="t('theme.toggle')" @click="toggle">
    <Sun v-if="mode === 'dark'" class="h-4 w-4" />
    <Moon v-else class="h-4 w-4" />
  </UiButton>
</template>
