import { createHooks } from 'hookable'
import type { H3Event } from 'h3'
import type { ModuleOptions } from 'nuxt-llms'
import type { NitroRuntimeHooks } from 'nitropack/types'
// @ts-expect-error - useNitroApp is not typed
import { useNitroApp } from '#imports'

/**
 * @deprecated Custom hooks are deprecated in favor of NitroRuntimeHooks.
 */
export interface LLMSHooks {
  'generate': (event: H3Event, options: ModuleOptions) => void
  'generate:full': (event: H3Event, options: ModuleOptions, contents: string[]) => void
}

/**
 * @deprecated Custom hooks are deprecated in favor of NitroRuntimeHooks.
 */
export const llmsHooks = createHooks<LLMSHooks>()

llmsHooks.beforeEach(() => {
  console.warn('llmsHooks are deprecated in favor of NitroRuntimeHooks. e.g. `nitroApp.hooks.hook(\'llms:generate\', (event, options) => {})`')
})

/**
 * Run a callback when LLMs is being generated.
 *
 * @deprecated Use `nitro.hooks.hook('llms:generate', (event, options) => {})` instead
 */
export function onLLMsGenerate(cb: NitroRuntimeHooks['llms:generate']) {
  return useNitroApp().hooks.hook('llms:generate', cb)
}

/**
 * Run a callback when Full LLMs is being generated.
 *
 * @deprecated Use `nitro.hooks.hook('llms:generate:full', (event, options, contents) => {})` instead
 */
export function onLLMsGenerateFull(cb: NitroRuntimeHooks['llms:generate:full']) {
  return useNitroApp().hooks.hook('llms:generate:full', cb)
}
