import { Client } from '@notionhq/client'
import slugify from 'utils/slugify'

const Sitemap = () => {}

export const getServerSideProps = async ({ res }) => {
  const baseUrl = process.env.BASE_URL
  const staticPages = ['/', '/blog', '/videos']

  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  let individual = []
  let series = []
  let data = {}

  do {
    data = await notion.databases.query({
      database_id: process.env.ARTICLES_DATABASE_ID,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published',
        },
      },
      start_cursor: data?.next_cursor,
    })

    individual = [...individual, ...data.results]
  } while (data?.has_more)

  data = {}

  do {
    data = await notion.databases.query({
      database_id: process.env.SERIES_DATABASE_ID,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published',
        },
      },
      start_cursor: data?.next_cursor,
    })

    series = [...series, ...data.results]
  } while (data?.has_more)

  const individualSlugs = individual.map((result) => {
    const endPath = slugify(result.properties.Name.title[0].plain_text)
    let middlePath = ''

    switch (result.properties.Category.select.name) {
      case 'Article':
        middlePath = `blog`
        break
      case 'Series Article':
        middlePath = `blog`
        break
      case 'Video':
        middlePath = `videos`
        break
      case 'Series Video':
        middlePath = `videos`
        break
      default:
        middlePath = `unknown`
        break
    }
    return `/${middlePath}/${endPath}`
  })

  const seriesSlugs = series.map((result) => {
    const endPath = slugify(result.properties.Name.title[0].plain_text)
    let middlePath = ''

    switch (result.properties.Category.select.name) {
      case 'Article':
        middlePath = `blog-series`
        break
      case 'Video':
        middlePath = `video-series`
        break
      default:
        middlePath = `unknown`
        break
    }
    return `/${middlePath}/${endPath}`
  })

  // filter out external links
  const dynamicPages = [...individualSlugs, ...seriesSlugs].filter(
    (slug) => !slug.includes('/unknown/')
  )

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${[...staticPages, ...dynamicPages]
        .map((url) => {
          return `
            <url>
              <loc>${`${baseUrl}${url}`}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `
        })
        .join('')}
    </urlset>
  `

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default Sitemap
