import { createHooks } from 'hookable'
import type { H3Event } from 'h3'
import type { ModuleOptions } from 'nuxt-llms'
import type { NitroRuntimeHooks } from 'nitropack/types'
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

llmsHooks.hook('generate', () => {
  console.warn('llmsHooks are deprecated, use `nitro.hooks.hook(\'llms:generate\', (event, options) => {})` instead')
})

llmsHooks.hook('generate:full', () => {
  console.warn('llmsHooks are deprecated, use `nitro.hooks.hook(\'llms:generate:full\', (event, options, contents) => {})` instead')
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
