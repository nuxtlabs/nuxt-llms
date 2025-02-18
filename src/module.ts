import { defineNuxtModule, createResolver, addServerHandler, addPrerenderRoutes, addServerImports } from '@nuxt/kit'
import type { ModuleOptions } from './types'

export * from './types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'Nuxt LLMS',
    configKey: 'llms',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.llms = {
      domain: options.domain,
      title: options.title,
      description: options.description,
      notes: options.notes || [],
      sections: options.sections || [],
    }

    addServerImports([{ name: 'llmsHooks', from: resolve('./runtime/server/utils/hooks') }])

    addServerHandler({ route: '/llms.txt', handler: resolve('./runtime/server/routes/llms_full.txt.get') })
    addPrerenderRoutes('/llms.txt')

    if (options.llmsFull) {
      addServerHandler({ route: '/llms_full.txt', handler: resolve('./runtime/server/routes/llms_full.txt.get') })
      addPrerenderRoutes('/llms_full.txt')
    }
  },
})
