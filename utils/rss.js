import blocksToHtml from '@sanity/block-content-to-html'
import { projectId, dataset } from 'utils/sanity'

const BLOG_URL = 'https://jonmeyers.io'
const BLOG_TITLE = 'Jon Meyers'
const BLOG_SUBTITLE = 'yet another blog'

const getHtml = (blocks) => {
  const h = blocksToHtml.h

  const serializers = {
    types: {
      code: (props) =>
        h(
          'pre',
          { className: props.node.language },
          h('code', props.node.code)
        ),
    },
  }

  return blocksToHtml({
    blocks,
    serializers,
    projectId,
    dataset,
  })
}

export async function generateRssItem(post) {
  const html = getHtml(post.body)

  return `
    <item>
      <guid>${BLOG_URL}/${post.slug}</guid>
      <url>${BLOG_URL}/${post.slug}</url>
      <title>${post.title}</title>
      <description>${post.seoDescription}</description>
      <link>${BLOG_URL}/${post.slug}</link>
      <pubDate>${new Date().toString()}</pubDate>
      <content:encoded><![CDATA[${html}]]></content:encoded>
      ${post.series && `<series>${post.series.title}</series>`}
    </item>
  `
}

export async function generateRss(posts) {
  const itemsList = await Promise.all(posts.map(generateRssItem))

  return `
    <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" version="2.0">
      <channel>
        <title>${BLOG_TITLE}</title>
        <link>${BLOG_URL}</link>
        <description>${BLOG_SUBTITLE}</description>
        <language>en</language>
        <lastBuildDate>${new Date().toString()}</lastBuildDate>
        <atom:link href="${BLOG_URL}" rel="self" type="application/rss+xml"/>
        ${itemsList.join('')}
      </channel>
    </rss>
  `
}
