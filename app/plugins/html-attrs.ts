export default defineNuxtPlugin({
  name: 'html-attrs',
  // @nuxtjs/i18n registers vue-i18n asynchronously; without this the plugins can
  // run in parallel and useI18n() would be called before vue-i18n is installed.
  dependsOn: ['i18n:plugin'],
  setup(nuxtApp) {
    // useI18n() requires an active component setup context, which a plugin does
    // not have. Read the global vue-i18n instance the module exposes instead.
    const i18n = nuxtApp.$i18n

    useHead({
      htmlAttrs: {
        lang: () => i18n.locale.value,
        dir: () => i18n.localeProperties.value.dir ?? 'ltr',
      },
    })

    if (import.meta.client) {
      const { init } = useColorMode()
      init()
    }
  },
})
