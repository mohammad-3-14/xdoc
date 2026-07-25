<script setup lang="ts">
import { Copy, Check } from 'lucide-vue-next'

const props = defineProps<{
  code?: string
  language?: string | null
  filename?: string | null
}>()

const copied = ref(false)

async function copy() {
  if (!props.code) return
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    // clipboard API unavailable; ignore silently
  }
}
</script>

<template>
  <div class="doc-prose-pre group relative my-6 overflow-hidden rounded-[10px] border border-border bg-secondary dark:bg-[oklch(0.125_0.01_260)]" dir="ltr">
    <div class="flex items-center justify-between border-b border-border/60 px-4 py-2">
      <span class="font-mono text-xs font-medium tracking-wide text-muted-foreground">{{ filename || language || 'text' }}</span>
      <button
        type="button"
        class="flex items-center gap-1 rounded px-1.5 py-0.5 text-xs text-muted-foreground opacity-0 transition-opacity hover:bg-accent hover:text-accent-foreground group-hover:opacity-100"
        @click="copy"
      >
        <Check v-if="copied" class="h-3.5 w-3.5" />
        <Copy v-else class="h-3.5 w-3.5" />
      </button>
    </div>
    <pre dir="ltr" class="overflow-x-auto p-4 text-[0.875rem] leading-[1.7]"><slot /></pre>
  </div>
</template>
