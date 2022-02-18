import { Client } from '@notionhq/client'
import slugify from 'utils/slugify'
import supabase from 'utils/supabase'

export default async (req, res) => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  let data = {}
  let content = []
  let series = []

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

    content = [...content, ...data.results]
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

  const transformedSeries = series.map((s) => {
    const title = s.properties.Name.title[0].plain_text
    const category = s.properties.Category.select.name

    return {
      id: s.id,
      title,
      slug: `/blog/${slugify(title)}`,
      description: s.properties.Description.rich_text[0].plain_text,
      published_date: s.properties['Published Date'].date.start,
      category,
      mdx: s.properties.Description.rich_text[0].plain_text,
    }
  })

  const transformedContent = content.map((c) => {
    const title = c.properties.Name.title[0].plain_text
    const category = c.properties.Category.select.name

    if (category === 'Article') {
      return {
        id: c.id,
        title,
        slug: `/blog/${slugify(title)}`,
        description: c.properties.Description.rich_text[0].plain_text,
        published_date: c.properties['Published Date'].date.start,
        category,
        mdx: c.properties.Description.rich_text[0].plain_text,
      }
    }

    if (category === 'Series Article') {
      return {
        id: c.id,
        title,
        slug: `/blog/${slugify(title)}`,
        description: c.properties.Description.rich_text[0].plain_text,
        published_date: c.properties['Published Date'].date.start,
        category,
        mdx: c.properties.Description.rich_text[0].plain_text,
        series_id: c.properties.Series.relation[0].id,
        position_in_series: c.properties['Position in Series'].number,
      }
    }

    if (category === 'Video') {
      return {
        id: c.id,
        title,
        slug: `/blog/${slugify(title)}`,
        description: c.properties.Description.rich_text[0].plain_text,
        published_date: c.properties['Published Date'].date.start,
        category,
        mdx: c.properties.Description.rich_text[0].plain_text,
        link: c.properties.Link.url,
      }
    }

    if (category === 'Series Video') {
      return {
        id: c.id,
        title,
        slug: `/blog/${slugify(title)}`,
        description: c.properties.Description.rich_text[0].plain_text,
        published_date: c.properties['Published Date'].date.start,
        category,
        mdx: c.properties.Description.rich_text[0].plain_text,
        series_id: c.properties.Series.relation[0].id,
        position_in_series: c.properties['Position in Series'].number,
        link: c.properties.Link.url,
      }
    }

    if (
      category === 'Video Link' ||
      category === 'Video Course Link' ||
      category === 'Article Link'
    ) {
      return {
        id: c.id,
        title,
        description: c.properties.Description.rich_text[0].plain_text,
        published_date: c.properties['Published Date'].date.start,
        category,
        mdx: c.properties.Description.rich_text[0].plain_text,
        link: c.properties.Link.url,
      }
    }
  })

  const { data: seriesData, error: seriesError } = await supabase
    .from('series')
    .upsert(transformedSeries, { onConflict: 'id' })

  if (seriesError) {
    console.log(seriesError.message)
  }

  const { data: contentData, error: contentError } = await supabase
    .from('content')
    .insert(transformedContent, { upsert: true })

  if (contentError) {
    console.log(contentError.message)
  }

  return res.send({ seriesData, contentData })
}
