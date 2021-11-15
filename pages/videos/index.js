import styled from 'styled-components'
import Container from 'components/Container'
import { lg } from 'utils/mediaQueries'
import SEO from 'components/SEO'
import MultiList from 'components/MultiList'
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

const CourseList = styled(MultiList)`
  ${lg`
    padding: 0 2rem;
  `};
`

const Videos = ({ videos }) => {
  return (
    <>
      <SEO
        title="Even more videos"
        description="A collection of developer-focused, practical, web development videos written by Jon Meyers."
      />
      <Container>
        {videos.length > 0 ? (
          <CourseList
            collection={videos}
            listPath="/videos"
            collectionPath="/videos"
            individualPath="/lessons"
          />
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
    slug: slugify(video.properties.Name.title[0].plain_text),
    description: video.properties.Description.rich_text[0].plain_text,
    publishedDate: video.properties['Published Date'].date.start,
  }))

  const seriesResults = await notion.databases.query({
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
  })

  const series = await Promise.all(
    seriesResults.results.map(async (series) => {
      const videosInSeries = await notion.databases.query({
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

      const title = series.properties.Name.title[0].plain_text
      const slug = slugify(title)
      const publishedDate = series.properties['Published Date'].date.start
      const itemsInCollection = videosInSeries.results.length
      const collection = videosInSeries.results.slice(0, 3).map((video) => ({
        title: video.properties.Name.title[0].plain_text,
        positionInSeries: video.properties['Position in Series'].number,
        slug: slugify(video.properties.Name.title[0].plain_text),
      }))

      return {
        title,
        slug,
        collection,
        itemsInCollection,
        publishedDate,
      }
    })
  )

  const videos = [...individualVideos, ...series].sort(
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
