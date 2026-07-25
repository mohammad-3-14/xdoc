<script setup lang="ts">
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogDescription } from 'reka-ui'
import { cn } from '~/lib/utils'

const props = defineProps<{
  open: boolean
  title?: string
  description?: string
}>()
const emit = defineEmits<{ 'update:open': [boolean] }>()
</script>

<template>
  <DialogRoot :open="open" @update:open="emit('update:open', $event)">
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogContent
        :class="cn('fixed left-1/2 top-[15%] z-50 w-[92vw] max-w-xl -translate-x-1/2 rounded-2xl border border-border bg-popover text-popover-foreground focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95', $attrs.class as string)"
      >
        <DialogTitle v-if="title" class="sr-only">{{ title }}</DialogTitle>
        <DialogDescription v-if="description" class="sr-only">{{ description }}</DialogDescription>
        <slot />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
