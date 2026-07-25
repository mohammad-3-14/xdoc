export default defineEventHandler(async (event) => {
  const locale = getRouterParam(event, 'locale')
  if (locale !== 'fa' && locale !== 'en') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid locale' })
  }

  const sections = await queryCollectionSearchSections(event, locale, {
    ignoredTags: ['style', 'script'],
  })

  // queryCollectionSearchSections doesn't filter drafts on its own: exclude any
  // section whose page is draft:true, and only ever expose drafts in dev mode.
  if (import.meta.dev) {
    return sections
  }

  const pages = await queryCollection(event, locale).select('path', 'draft').all()
  const draftPaths = new Set(pages.filter((p) => p.draft).map((p) => p.path))

  return sections.filter((section) => {
    const path = section.id.split('#')[0]
    return !draftPaths.has(path)
  })
})
