import { client } from 'utils/sanity'
import { generateRss } from 'utils/rss'

const RSS = () => {}

const postsQuery = `
  *[_type == 'article' && isPublished == true] | order(positionInSeries, asc) {
    title,
    "slug": slug.current,
    body,
    seoDescription,
    series->{
      title,
    }
  }
`

export const getServerSideProps = async ({ res }) => {
  const posts = await client.fetch(postsQuery)
  const rss = await generateRss(posts)

  res.setHeader('Content-Type', 'text/xml')
  res.write(rss)
  res.end()

  return {
    props: {},
  }
}

export default RSS
