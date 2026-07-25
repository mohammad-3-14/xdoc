<script setup lang="ts">
import { cn } from '~/lib/utils'
</script>

<template>
  <div :class="cn('rounded-2xl border border-border bg-card text-card-foreground shadow-none transition-colors hover:border-primary/40', $attrs.class as string)">
    <slot />
  </div>
</template>
