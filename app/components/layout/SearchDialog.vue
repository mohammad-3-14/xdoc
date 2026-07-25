<script setup lang="ts">
import { Search } from 'lucide-vue-next'

const { t } = useI18n()
const { search } = useSearchIndex()
const { withLocale } = useContentLink()

const open = defineModel<boolean>('open', { default: false })
const query = ref('')
const router = useRouter()

const results = computed(() => search(query.value))

function go(id: string) {
  open.value = false
  query.value = ''
  // id is content-relative and may include a #anchor (e.g. /frontend/vue#reactivity).
  const [path, hash] = id.split('#')
  router.push(withLocale(path || '/') + (hash ? `#${hash}` : ''))
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
function onKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    open.value = !open.value
  }
  if (e.key === 'Escape') open.value = false
}

watch(open, (v) => {
  if (!v) query.value = ''
})
</script>

<template>
  <UiDialog :open="open" :title="t('search.trigger')" @update:open="open = $event">
    <div class="flex items-center gap-2 border-b border-border px-3 py-2.5">
      <Search class="h-4 w-4 shrink-0 text-muted-foreground" />
      <input
        v-model="query"
        type="text"
        :placeholder="t('search.placeholder')"
        class="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        autofocus
      >
    </div>
    <div class="max-h-96 overflow-y-auto p-2">
      <ul v-if="results.length" class="space-y-0.5">
        <li v-for="r in results" :key="r.id">
          <button
            type="button"
            class="flex w-full flex-col items-start rounded-md px-3 py-2 text-start hover:bg-accent hover:text-accent-foreground"
            @click="go(r.id)"
          >
            <span class="text-sm font-medium">{{ r.title }}</span>
            <span v-if="r.titles?.length" class="text-xs text-muted-foreground">{{ r.titles.join(' / ') }}</span>
          </button>
        </li>
      </ul>
      <p v-else-if="query.trim()" class="px-3 py-6 text-center text-sm text-muted-foreground">
        {{ t('search.noResults') }}
      </p>
    </div>
  </UiDialog>
</template>
