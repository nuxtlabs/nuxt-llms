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

- Generates & prerenders `/llms.txt` and `/llms_full.txt` routes automatically
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
