import styled from 'styled-components'
import Container from 'components/Container'
import { lg } from 'utils/mediaQueries'
import SEO from 'components/SEO'
import ContentList from 'components/ContentList'
import { Client } from '@notionhq/client'
import slugify from 'utils/slugify'

const Centered = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  margin: 0;

  ${lg`
    font-size: 2rem;
  `};
`

const CourseList = styled(ContentList)`
  ${lg`
    padding: 0 2rem;
  `};
`

const Videos = ({ videos }) => {
  return (
    <>
      <SEO
        title="Videos"
        description="A collection of developer-focused, practical, web development video tutorials by Jon Meyers."
      />
      <Container>
        {videos.length > 0 ? (
          <CourseList content={videos} />
        ) : (
          <Centered>No blog posts!</Centered>
        )}
      </Container>
    </>
  )
}

export const getStaticProps = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  let individualVideos = []
  let externalVideos = []
  let seriesVideos = []
  let data = {}

  do {
    data = await notion.databases.query({
      database_id: process.env.ARTICLES_DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Category',
            select: {
              equals: 'Video',
            },
          },
          {
            property: 'Status',
            select: {
              equals: 'Published',
            },
          },
        ],
      },
      start_cursor: data?.next_cursor,
    })

    individualVideos = [...individualVideos, ...data.results]
  } while (data?.has_more)

  individualVideos = individualVideos.map((video) => ({
    title: video.properties.Name.title[0].plain_text,
    slug: `/videos/${slugify(video.properties.Name.title[0].plain_text)}`,
    description: video.properties.Description.rich_text[0].plain_text,
    publishedDate: video.properties['Published Date'].date.start,
    category: video.properties.Category.select.name,
  }))

  data = {}

  do {
    data = await notion.databases.query({
      database_id: process.env.ARTICLES_DATABASE_ID,
      filter: {
        or: [
          {
            property: 'Category',
            select: {
              equals: 'Video Link',
            },
          },
          {
            property: 'Category',
            select: {
              equals: 'Video Course Link',
            },
          },
        ],
      },
      start_cursor: data?.next_cursor,
    })

    externalVideos = [...externalVideos, ...data.results]
  } while (data?.has_more)

  // need to manually filter for `Published` because we can't
  // combine an `and` and an `or` in query
  externalVideos = externalVideos
    .filter((video) => video.properties.Status.select.name === 'Published')
    .map((video) => ({
      title: video.properties.Name.title[0].plain_text,
      url: video.properties.Link.url,
      description: video.properties.Description.rich_text[0].plain_text,
      publishedDate: video.properties['Published Date'].date.start,
      category: video.properties.Category.select.name,
    }))

  data = {}

  do {
    data = await notion.databases.query({
      database_id: process.env.SERIES_DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Category',
            select: {
              equals: 'Video',
            },
          },
          {
            property: 'Status',
            select: {
              equals: 'Published',
            },
          },
        ],
      },
      start_cursor: data?.next_cursor,
    })

    seriesVideos = [...seriesVideos, ...data.results]
  } while (data?.has_more)

  seriesVideos = await Promise.all(
    seriesVideos.map(async (series) => {
      data = {}
      let videosInSeries = []

      do {
        data = await notion.databases.query({
          database_id: process.env.ARTICLES_DATABASE_ID,
          filter: {
            and: [
              {
                property: 'Category',
                select: {
                  equals: 'Series Video',
                },
              },
              {
                property: 'Status',
                select: {
                  equals: 'Published',
                },
              },
              {
                property: 'Series',
                relation: {
                  contains: series.id,
                },
              },
            ],
          },
          sorts: [
            {
              property: 'Position in Series',
              direction: 'ascending',
            },
          ],
        })

        videosInSeries = [...videosInSeries, ...data.results]
      } while (data?.has_more)

      const title = series.properties.Name.title[0].plain_text
      const slug = `/video-series/${slugify(title)}`
      const publishedDate = series.properties['Published Date'].date.start
      const itemsInCollection = videosInSeries.length
      const category = 'Series'
      const collection = videosInSeries.slice(0, 3).map((video) => ({
        title: video.properties.Name.title[0].plain_text,
        positionInSeries: video.properties['Position in Series'].number,
        slug: `/videos/${slugify(video.properties.Name.title[0].plain_text)}`,
        category: video.properties.Category.select.name,
      }))

      return {
        title,
        slug,
        collection,
        itemsInCollection,
        publishedDate,
        category,
      }
    })
  )

  const videos = [...individualVideos, ...seriesVideos, ...externalVideos].sort(
    (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
  )

  return {
    props: {
      videos,
    },
    revalidate: 60,
  }
}

export default Videos
