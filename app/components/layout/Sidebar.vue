<script setup lang="ts">
const { navigation } = await useDocsNav()
const emit = defineEmits<{ navigate: [] }>()

// queryCollectionNavigation returns the top-level sections directly (no root wrapper node).
const items = computed(() => navigation.value ?? [])
</script>

<template>
  <nav class="text-sm" aria-label="Docs navigation">
    <LayoutSidebarTree v-if="items.length" :items="items" @navigate="emit('navigate')" />
  </nav>
</template>
