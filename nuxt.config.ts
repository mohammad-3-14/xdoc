import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
  ],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  i18n: {
    locales: [
      { code: 'fa', language: 'fa-IR', dir: 'rtl', name: 'فارسی', file: 'fa.json' },
      { code: 'en', language: 'en-US', dir: 'ltr', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'fa',
    strategy: 'prefix',
    lazy: true,
    langDir: 'locales',
    detectBrowserLanguage: false,
  },

  content: {
    build: {
      markdown: {
        toc: { depth: 3, searchDepth: 3 },
      },
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/fa', '/en', '/api/search/fa', '/api/search/en'],
      failOnError: false,
    },
  },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      htmlAttrs: { lang: 'fa', dir: 'rtl' },
      script: [
        {
          innerHTML: `(function(){try{var k='xdoc-color-mode';var s=localStorage.getItem(k);var m=s||'dark';if(m==='dark'){document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();`,
          type: 'text/javascript',
        },
      ],
    },
  },

  typescript: {
    strict: true,
  },
})
