import { defineNuxtModule, createResolver, addServerHandler, addPrerenderRoutes, addServerImports, useLogger } from '@nuxt/kit'
import type { ModuleOptions } from './types'

export type * from './types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'Nuxt LLMS',
    configKey: 'llms',
  },
  defaults: {},
  setup(options, nuxt) {
    const logger = useLogger('nuxt-llms')
    const { resolve } = createResolver(import.meta.url)

    const llmsConfig = nuxt.options.runtimeConfig.llms = {
      domain: options.domain,
      title: options.title,
      description: options.description,
      notes: options.notes || [],
      sections: options.sections || [],
    }

    if (!options.domain) {
      logger.warn('nuxt-llms require a domain to be set. `llms.domain` is missing.')
      return
    }

    addServerImports([{ name: 'llmsHooks', from: resolve('./runtime/server/utils/hooks') }])
    addServerHandler({ route: '/llms.txt', handler: resolve('./runtime/server/routes/llms.txt.get') })
    addPrerenderRoutes('/llms.txt')

    if (options.full) {
      llmsConfig.sections.unshift({
        title: 'Documentation Sets',
        links: [
          {
            title: options.full.title,
            description: options.full.description,
            href: `${options.domain}/llms_full.txt`,
          },
        ],
      })
      addServerHandler({ route: '/llms_full.txt', handler: resolve('./runtime/server/routes/llms_full.txt.get') })
      addPrerenderRoutes('/llms_full.txt')
    }
  },
})
