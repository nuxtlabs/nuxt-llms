import { eventHandler, setHeader } from 'h3'
import type { ModuleOptions } from 'nuxt-llms'
import { llmsHooks } from 'nuxt-llms/runtime'
import { useRuntimeConfig } from '#imports'

export default eventHandler(async (event) => {
  const options = useRuntimeConfig(event).llms as ModuleOptions

  const contents = [] as string[]
  const llms: ModuleOptions = JSON.parse(JSON.stringify(options))

  await llmsHooks.callHook('generate:full', event, llms, contents)

  const document = [
    `# ${llms.full?.title || 'Documentation'}`,
  ]

  if (llms.description) {
    document.push(`> ${llms.full?.description}`)
  }

  for (const content of contents) {
    document.push(content)
  }

  setHeader(event, 'Content-Type', 'text/plain')
  return contents.join('\n\n')
})
