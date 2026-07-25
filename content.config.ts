import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const pageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  date: z.string().optional(),
  updatedAt: z.string().optional(),
  draft: z.boolean().optional(),
  navigation: z
    .object({
      title: z.string().optional(),
      icon: z.string().optional(),
    })
    .or(z.boolean())
    .optional(),
})

export default defineContentConfig({
  collections: {
    fa: defineCollection({
      type: 'page',
      source: {
        include: 'fa/**/*.md',
        prefix: '',
      },
      schema: pageSchema,
    }),
    en: defineCollection({
      type: 'page',
      source: {
        include: 'en/**/*.md',
        prefix: '',
      },
      schema: pageSchema,
    }),
  },
})
