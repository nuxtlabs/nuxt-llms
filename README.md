![nuxt-llms-social-card](https://github.com/user-attachments/assets/4570398c-0e49-4199-bc30-ab72f6680f4b)

# Nuxt LLMs

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt LLMs automatically generates [`llms.txt` markdown documentation](https://llmstxt.org/) for your Nuxt application.  It provides runtime hooks to collect data from various sources (CMS, Nuxt Content, etc.) and generate structured documentation in a text-based format.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-llms?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

- Generates & prerenders `/llms.txt` automatically
- Generate & prerenders `/llms_full.txt` when enabled
- Customizable sections directly from your `nuxt.config.ts`
- Integrates with Nuxt modules and your application via the runtime hooks system

## Quick Setup

1. Install the module:

```bash
npm i nuxt-llms
```

2. Register `nuxt-llms` in your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-llms']
})
```

3. Configure your application details:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-llms'],
  llms: {
    domain: 'https://example.com',
    title: 'My Application',
    description: 'My Application Description',
    sections: [
      {
        title: 'Section 1',
        description: 'Section 1 Description',
        links: [
          {
            title: 'Link 1',
            description: 'Link 1 Description',
            href: '/link-1',
          },
          {
            title: 'Link 2',
            description: 'Link 2 Description',
            href: '/link-2',
          },
        ],
      },
    ],
  },
})
```

That's it! You can visit `/llms.txt` to see the generated documentation ✨

## Options

- `domain`(required): The domain of the application
- `title`: The title of the application, will be displayed at the top of the documentation
- `description`: The description of the application, will be displayed at the top of the documentation right after the title
- `sections`: The sections of the documentation.
  Section are consisted of a title, one or more paragraphs of description and possibly a list of links.
  Each section is an object with the following properties:
  - `title`(required): The title of the section
  - `description`: The description of the section
  - `links`: The links of the section
    - `title`(required): The title of the link
    - `description`: The description of the link
    - `href`(required): The href of the link
- `notes`: The notes of the documentation. Notes are a special section which always appears at the end of the documentation. Notes are usefull to add any information about the application or documentation itself.
- `full`: The `llms_full.txt` configuration. Setting this option will enable the `llms_full.txt` route.
  - `title`: The title of the llms_full documentation
  - `description`: The description of the llms_full documentation

## Documentation Formats

The module generates two different documentation formats:

### llms.txt

The `/llms.txt` route generates a concise, structured documentation that follows the [llms.txt specification](https://llmstxt.org/). This format is optimized for both human readability and AI consumption. It includes:

- Application title and description
- Organized sections with titles and descriptions
- Links with titles, descriptions, and URLs
- Optional notes section

### llms_full.txt

The `/llms_full.txt` route provides a more detailed, free-form documentation format. This is useful to reduce crawler traffic on your application and provide a more detailed documentation to your users and LLMs.

By default module does not generate the `llms_full.txt` route, you need to enable it by setting `full.title` and `full.description` in your `nuxt.config.ts`.

```ts
export default defineNuxtConfig({
  llms: {
    domain: 'https://example.com',
    title: 'My Application',
    full: {
      title: 'Full Documentation',
      description: 'Full documentation of the application',
    },
  },
})
```

## Extending the documentation using hooks

The module provides a hooks system that allows you to dynamically extend both documentation formats. There are two main hooks:

### Available Hooks

#### `generate:llms(event, options)`

This hook is called for every request to `/llms.txt`. Use this hook to modify the structured documentation, It allows you to add sections, links, and metadata.

**Parameters:**
  - `event`: H3Event - The current request event
  - `options`: ModuleOptions - The module options that you can modify to add sections, links, etc.


#### `generate:llms_full(event, options, contents)`

This hook is called for every request to `/llms_full.txt`. It allows you to add custom content sections in any format.

**Parameters:**
  - `event`: H3Event - The current request event
  - `options`: ModuleOptions - The module options that you can modify to add sections, links, etc.
  - `contents`: string[] - Array of content sections you can add to or modify

### Using Hooks in Your Application

Create a server plugin in your `server/plugins` directory:

```ts
// server/plugins/llms.ts
import { onLLMsGenerate, onLLMsGenerateFull, llmsHooks } from 'nuxt-llms/runtime'

export default defineNitroPlugin(() => {
  // Method 1: Using the hooks directly
  llmsHooks.hook('generate', (event, options) => {
    // Add a new section to llms.txt
    options.sections.push({
      title: 'API Documentation',
      description: 'REST API endpoints and usage',
      links: [
        {
          title: 'Authentication',
          description: 'API authentication methods',
          href: `${options.domain}/api/auth`
        }
      ]
    })
  })

  // Method 2: Using the helper function
  onLLMsGenerateFull((event, options, contents) => {
    // Add detailed documentation to llms_full.txt
    contents.push(`## API Authentication

### Bearer Token
To authenticate API requests, include a Bearer token in the Authorization header:

\`\`\`
Authorization: Bearer <your-token>
\`\`\`

### API Keys
For server-to-server communication, use API keys:

\`\`\`
X-API-Key: <your-api-key>
\`\`\`
    `)
  })
})
```

### Using Hooks in Nuxt Modules

If you're developing a Nuxt module that needs to extend the LLMs documentation:

1. Create a server plugin in your module:
```ts
// module/runtime/server/plugins/my-module-llms.ts
export default defineNitroPlugin(() => {
  onLLMsGenerate((event, options) => {
    options.sections.push({
      title: 'My Module',
      description: 'Documentation for my module features',
      links: [/* ... */]
    })
  })
})
```

2. Register the plugin in your module setup:
```ts
import { defineNuxtModule, addServerPlugin } from '@nuxt/kit'
import { fileURLToPath } from 'url'

export default defineNuxtModule({
  setup(options, nuxt) {
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    addServerPlugin(resolve(runtimeDir, 'server/plugins/my-module-llms'))
  }
})
```

## 💻 Development

- Clone repository
- Install dependencies using `pnpm install`
- Prepare using `pnpm dev:prepare`
- Build using `pnpm prepack`
- Try playground using `pnpm dev`
- Test using `pnpm test`

## License

[MIT License](LICENSE)

Copyright (c) NuxtLabs

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-llms/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-llms

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-llms.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-llms

[license-src]: https://img.shields.io/npm/l/nuxt-llms.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-llms

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
