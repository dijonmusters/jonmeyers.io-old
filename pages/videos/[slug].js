import Container from 'components/Container'
import styled from 'styled-components'
import { lg } from 'utils/mediaQueries'
import SEO from 'components/SEO'
import Breadcrumbs from 'components/Breadcrumbs'
import NumberedList from 'components/NumberedList'
import { Client } from '@notionhq/client'
import slugify from 'utils/slugify'
import { NotionBlocksHtmlParser } from '@notion-stuff/blocks-html-parser'

const Title = styled.h1`
  ${lg`
    font-size: 3rem;
  `}
`

const Description = styled.p`
  line-height: 32px;
  margin: 1.5rem 0;
  font-size: 1.25rem;
  font-weight: 200;
`

const Fallback = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
`

const Video = ({ video: { title, description, lessons } }) => {
  return (
    <Container>
      <SEO title={title} description={description} />
      <Breadcrumbs title="All videos" slug="/videos" />
      <Title>{title}</Title>
      <Description>{description}</Description>
      {lessons.length > 0 ? (
        <NumberedList items={lessons} individualPath="/lessons" />
      ) : (
        <Fallback>No lessons yet!</Fallback>
      )}
    </Container>
  )
}

export const getStaticPaths = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  const series = await notion.databases.query({
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

  const paths = series.results.map((result) => ({
    params: {
      slug: slugify(result.properties.Name.title[0].plain_text),
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  let seriesResults = []
  let data = {}

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

    seriesResults = [...seriesResults, ...data.results]
  } while (data?.has_more)

  const seriesMetadata = seriesResults.find(
    (series) => slugify(series.properties.Name.title[0].plain_text) === slug
  )

  const pageData = await notion.blocks.children.list({
    block_id: seriesMetadata.id,
  })

  const title = seriesMetadata.properties.Name.title[0].plain_text
  const description = NotionBlocksHtmlParser.getInstance().parse(
    pageData.results
  )

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
            contains: seriesMetadata.id,
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

  const lessons = videosInSeries.results.map((video) => ({
    title: video.properties.Name.title[0].plain_text,
    positionInSeries: video.properties['Position in Series'].number,
    slug: slugify(video.properties.Name.title[0].plain_text),
  }))

  return {
    props: {
      video: {
        title,
        description: description.replace(/(<([^>]+)>)/gi, ''),
        htmlDescription: description,
        lessons,
      },
    },
    revalidate: 60,
  }
}

export default Video
