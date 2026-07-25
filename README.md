# xDoc

A personal, bilingual (Persian/English) documentation site for organizing technical notes by topic — frontend, backend, devops, security, and more. Built as a fully static site with no server-side runtime required.

## Tech stack

- [Nuxt 4](https://nuxt.com) (Vue 3, SSG via `nuxi generate`)
- [`@nuxt/content` v3](https://content.nuxt.com) — file-based markdown, collections API
- Tailwind CSS + [shadcn-vue](https://www.shadcn-vue.com) primitives
- [`@nuxtjs/i18n`](https://i18n.nuxtjs.org) — `fa` (default, RTL) and `en` (LTR)
- [`lucide-vue-next`](https://lucide.dev) for icons
- [Fuse.js](https://www.fusejs.io) for client-side fuzzy search
- `@fontsource/vazirmatn` (Persian) and `@fontsource/inter` (English), self-hosted
- pnpm

## Development

```bash
pnpm install
pnpm dev
```

Dev server runs at `http://localhost:3000`. Draft pages (`draft: true` in frontmatter) are visible in dev and hidden from production builds.

## Building the static site

```bash
pnpm generate
```

Output is written to `.output/public` — a fully static bundle deployable to GitHub Pages, Cloudflare Pages, Nginx, or any static host with zero server-side requirements. Preview it locally with:

```bash
npx serve .output/public
```

## Adding content

Content lives under `content/<locale>/<category>/...`, mirrored across `fa/` and `en/`:

```
content/
  fa/
    frontend/
      vue.md
      nuxt.md
    backend/
      php/
        whmcs-hooks.md
    devops/
      docker.md
    security/
    index.md
  en/
    ... (same structure)
```

To add a new page, drop a `.md` file in the right locale/category folder — the sidebar navigation, breadcrumbs, prev/next links, and search index are all generated automatically from the folder structure. No manual nav config needed.

### Frontmatter

Every content file should include:

```yaml
---
title: Page Title
description: One-line summary shown in nav, search, and meta tags.
category: frontend
tags: [vue, composition-api]
date: 2026-01-01
updatedAt: 2026-01-01
draft: false
---
```

`draft: true` hides the page from production builds and search while keeping it visible in dev.

### Folder metadata

Each folder can have a `.navigation.yml` controlling its sidebar title, icon, and order:

```yaml
title: Frontend
icon: i-lucide-layout-panel-left
```

### Adding a new category

Create matching folders under both `content/fa/<category>/` and `content/en/<category>/`, each with an `index.md` (the category landing page) and a `.navigation.yml`. The category page automatically renders a card grid linking to its sub-pages.

## Notes

- Code blocks always render left-to-right (`dir="ltr"`), even on RTL (`fa`) pages.
- Search (`Ctrl+K` / `Cmd+K`) only searches the active locale's content.
- The language switcher preserves the current page across locales, falling back to that locale's home page if no translated equivalent exists.
# dx
