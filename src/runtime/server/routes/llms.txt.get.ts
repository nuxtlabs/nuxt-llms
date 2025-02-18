import { eventHandler, setHeader } from 'h3'
import type { LLMSection, ModuleOptions } from '@nuxtjs/llms'
import { llmsHooks } from '../utils/hooks'
import { useRuntimeConfig } from '#imports'

export default eventHandler(async (event) => {
  const options = useRuntimeConfig(event).llms as ModuleOptions

  const llms = JSON.parse(JSON.stringify(options))

  const sections = llms.sections || []

  await llmsHooks.callHook('llms', event, llms, sections)

  const document = [
    `# ${llms.title || 'Documentation'}`,
  ]

  if (llms.description) {
    document.push(`> ${options.description}`)
  }

  for (const section of sections) {
    document.push(`## ${section.title}`)
    if (section.description) {
      document.push(section.description)
    }
    document.push(
      (section as LLMSection).links.map((link) => {
        return `- [${link.title}](${link.href}): ${link.description}`
      }).join('\n'),
    )
  }

  if (options.notes && options.notes.length) {
    llms.push(
      '## Notes',
      (options.notes || []).map(note => `- ${note}`).join('\n'),
    )
  }

  setHeader(event, 'Content-Type', 'text/plain')
  return document.join('\n\n')
})
