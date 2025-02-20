export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },

  compatibilityDate: '2025-02-20',

  llms: {
    domain: 'https://nuxt.com',
    full: {
      title: 'Nuxt Documentation',
      description: 'The complete documentation for Nuxt',
    },
  },
})
