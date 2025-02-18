import { createHooks } from 'hookable'
import type { H3Event } from 'h3'
import type { ModuleOptions } from '@nuxtjs/llms'

export interface LLMSHooks {
  'generate': (event: H3Event, options: ModuleOptions) => void
  'generate:full': (event: H3Event, options: ModuleOptions, contents: string[]) => void
}

export const llmsHooks = createHooks<LLMSHooks>()

/**
 * Run a callback when LLMs is being generated.
 */
export function onLLMsGenerate(cb: LLMSHooks['generate']) {
  return llmsHooks.hook('generate', cb)
}

/**
 * Run a callback when Full LLMs is being generated.
 */
export function onLLMsGenerateFull(cb: LLMSHooks['generate:full']) {
  return llmsHooks.hook('generate:full', cb)
}
