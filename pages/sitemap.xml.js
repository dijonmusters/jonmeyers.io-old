import { client } from 'utils/sanity'

const Sitemap = () => {}

const query = `
  *[(_type=="article" && isPublished == true) || (_type=="course" && isPublished == true) || (_type=="lesson" && isPublished == true) || (_type=="series" && isPublished == true)]{
    _type == 'article' => {
        "slug": "/blog/" + slug.current
    },
    _type == 'course' => {
          "slug": "/courses/" + slug.current
      },
    _type == 'lesson' => {
          "slug": "/lessons/" + slug.current
      },
    _type == 'series' => {
          "slug": "/series/" + slug.current
    },
  }
`

export const getServerSideProps = async ({ res }) => {
  const baseUrl = process.env.BASE_URL
  const staticPages = ['/', '/blog', '/courses']
  const slugs = await client.fetch(query)
  const dynamicPages = slugs.map((slug) => slug.slug)

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
