<script setup lang="ts">
import { DropdownMenuItem } from 'reka-ui'
import { cn } from '~/lib/utils'
</script>

<template>
  <DropdownMenuItem
    :class="cn('relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground', $attrs.class as string)"
  >
    <slot />
  </DropdownMenuItem>
</template>
