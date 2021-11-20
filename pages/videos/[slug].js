import Container from 'components/Container'
import styled from 'styled-components'
import SEO from 'components/SEO'
import Breadcrumbs from 'components/Breadcrumbs'
import Player from 'react-player/lazy'
import { lg } from 'utils/mediaQueries'
import { Client } from '@notionhq/client'
import slugify from 'utils/slugify'
import { NotionBlocksHtmlParser } from '@notion-stuff/blocks-html-parser'
import Body from 'components/Body'
import { useState } from 'react'

const Title = styled.h1`
  margin: 3rem 0;

  ${lg`
    font-size: 3rem;
  `}
`

const VideoContainer = styled.div`
  visibility: ${(props) => (props.videoIsReady ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.videoIsReady ? 1 : 0)};
  position: relative;
  margin-top: 4rem;
  margin-bottom: 4rem;
  padding-top: 56.25%;
  transition: opacity 0.3s ease-in-out;

  &:before {
    content: '';
    position: absolute;
    left: -0.5rem;
    top: -0.5rem;
    width: calc(100% + 1rem);
    height: calc(100% + 1rem);
    background-image: ${(props) => props.theme.gradient};
  }
`

const VideoPlayer = styled(Player)`
  position: absolute;
  top: 0;
  left: 0;
`

const Lesson = ({ lesson }) => {
  const [videoIsReady, setVideoIsReady] = useState(false)

  const breadcrumbTitle = lesson.isPartOfSeries
    ? lesson.seriesTitle
    : 'All Videos'
  const breadcrumbSlug = lesson.isPartOfSeries
    ? `/video-series/${lesson.seriesSlug}`
    : '/videos'

  const handleFade = () => {
    setVideoIsReady(true)
  }

  return (
    <Container>
      <SEO title={lesson.title} description={lesson.description} />
      <Breadcrumbs title={breadcrumbTitle} slug={breadcrumbSlug} />
      <Title>{lesson.title}</Title>
      <VideoContainer videoIsReady={videoIsReady}>
        <VideoPlayer
          width="100%"
          height="100%"
          url={lesson.videoUrl}
          controls={true}
          onReady={handleFade}
        />
      </VideoContainer>
      <Body html={lesson.html} />
    </Container>
  )
}

export const getStaticPaths = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  let videos = []
  let data = {}

  do {
    data = await notion.databases.query({
      database_id: process.env.ARTICLES_DATABASE_ID,
      filter: {
        or: [
          {
            property: 'Category',
            select: {
              equals: 'Video',
            },
          },
          {
            property: 'Category',
            select: {
              equals: 'Series Video',
            },
          },
        ],
      },
      start_cursor: data?.next_cursor,
    })

    videos = [...videos, ...data.results]
  } while (data?.has_more)

  const paths = videos
    // need to manually filter for `Published` because we can't
    // combine an `and` and an `or` in query
    .filter((video) => video.properties.status === 'Published')
    .map((result) => ({
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

  let videos = []
  let data = {}

  do {
    data = await notion.databases.query({
      database_id: process.env.ARTICLES_DATABASE_ID,
      filter: {
        or: [
          {
            property: 'Category',
            select: {
              equals: 'Video',
            },
          },
          {
            property: 'Category',
            select: {
              equals: 'Series Video',
            },
          },
        ],
      },
      start_cursor: data?.next_cursor,
    })

    videos = [...videos, ...data.results]
  } while (data?.has_more)

  const pageMetaData = videos.find(
    (video) => slugify(video.properties.Name.title[0].plain_text) === slug
  )

  let blockData = {}
  let blockResults = []

  do {
    blockData = await notion.blocks.children.list({
      block_id: pageMetaData.id,
      start_cursor: blockData?.next_cursor,
    })
    blockResults = [...blockResults, ...blockData.results]
  } while (blockData?.has_more)

  let videoData = {}

  if (pageMetaData.properties.Category.select.name === 'Series Video') {
    const videosInSeriesResults = await notion.databases.query({
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
              contains: pageMetaData.properties.Series.relation[0].id,
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

    const videosInSeries = videosInSeriesResults.results.map((video) => ({
      title: video.properties.Name.title[0].plain_text,
      positionInSeries: video.properties['Position in Series'].number,
      slug: slugify(video.properties.Name.title[0].plain_text),
    }))

    const series = await notion.pages.retrieve({
      page_id: pageMetaData.properties.Series.relation[0].id,
    })

    const seriesTitle = series.properties.Name.title[0].plain_text

    videoData = {
      isPartOfSeries: true,
      seriesTitle,
      seriesSlug: slugify(seriesTitle),
      videosInSeries,
    }
  }

  const lesson = {
    title: pageMetaData.properties.Name.title[0].plain_text,
    description: pageMetaData.properties.Description.rich_text[0].plain_text,
    html: NotionBlocksHtmlParser.getInstance().parse(blockResults),
    videoUrl: pageMetaData.properties['Link'].url,
    ...videoData,
  }

  return {
    props: {
      lesson,
    },
    revalidate: 60,
  }
}

export default Lesson
