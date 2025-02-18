import { eventHandler, setHeader } from 'h3'
import type { ModuleOptions } from '@nuxtjs/llms'
import { llmsHooks } from '../utils/hooks'
import { useRuntimeConfig } from '#imports'

export default eventHandler(async (event) => {
  const options = useRuntimeConfig(event).llms as ModuleOptions

  const contents = [] as string[]
  const llms = JSON.parse(JSON.stringify(options))

  await llmsHooks.callHook('llms:full', event, llms, contents)

  const document = [
    `# ${llms.llmsFull?.title || 'Documentation'}`,
  ]

  if (llms.description) {
    document.push(`> ${llms.llmsFull?.description}`)
  }

  for (const content of contents) {
    document.push(content)
  }

  setHeader(event, 'Content-Type', 'text/plain')
  return contents.join('\n\n')
})
