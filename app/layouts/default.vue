<script setup lang="ts">
const sidebarOpen = ref(false)

const route = useRoute()
const { locale } = useI18n()
const isHome = computed(() => {
  const path = route.path.replace(/\/$/, '')
  return path === '' || path === `/${locale.value}`
})
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <LayoutNavbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />

    <div class="mx-auto flex max-w-7xl gap-8 px-4">
      <!-- Sidebar: desktop, sticky -->
      <aside v-if="!isHome" class="hidden w-64 shrink-0 lg:block">
        <div class="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto py-6 pe-2">
          <LayoutSidebar />
        </div>
      </aside>

      <!-- Sidebar: mobile drawer -->
      <Teleport to="body">
        <div v-if="!isHome && sidebarOpen" class="fixed inset-0 z-50 lg:hidden">
          <div class="absolute inset-0 bg-black/50" @click="sidebarOpen = false" />
          <div class="glass absolute inset-y-0 start-0 w-72 overflow-y-auto border-y-0 border-s-0 p-4">
            <LayoutSidebar @navigate="sidebarOpen = false" />
          </div>
        </div>
      </Teleport>

      <main class="min-w-0 flex-1 py-6">
        <slot />
      </main>
    </div>
  </div>
</template>
