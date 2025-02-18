import { createHooks } from 'hookable'
import type { H3Event } from 'h3'
import type { ModuleOptions } from '@nuxtjs/llms'

export interface LLMSHooks {
  'llms': (event: H3Event, options: ModuleOptions, sections: ModuleOptions['sections']) => void
  'llms:full': (event: H3Event, options: ModuleOptions, contents: string[]) => void
}

export const llmsHooks = createHooks<LLMSHooks>()
