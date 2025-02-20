export interface LLMsSection {
  title: string
  description?: string
  links?: Array<{
    title: string
    description?: string
    href: string
  }>
}

export interface ModuleOptions {
  /**
   * Domain of the documentation
   */
  domain: string
  /**
   * Enable the full documentation
   */
  full?: {
    title: string
    description: string
  }
  sections: Array<LLMsSection>
  title?: string
  description?: string
  notes?: string[]
}
