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

const Description = styled.div`
  line-height: 32px;
  margin: 1.5rem 0;
  font-size: 1.25rem;
  font-weight: 200;
`

const Fallback = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
`

const Series = ({
  series: { title, description, htmlDescription, articles },
}) => {
  return (
    <Container>
      <SEO title={title} description={description} />
      <Breadcrumbs title="All articles" slug="/blog" />
      <Title>{title}</Title>
      <Description dangerouslySetInnerHTML={{ __html: htmlDescription }} />
      {articles.length > 0 ? (
        <NumberedList items={articles} individualPath="/blog" />
      ) : (
        <Fallback>No articles yet!</Fallback>
      )}
    </Container>
  )
}

export const getStaticPaths = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  let series = []
  let data = {}

  do {
    data = await notion.databases.query({
      database_id: process.env.SERIES_DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Category',
            select: {
              equals: 'Article',
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

    series = [...series, ...data.results]
  } while (data?.has_more)

  const paths = series.map((result) => ({
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
              equals: 'Article',
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

  data = {}
  let articlesInSeries = []

  do {
    data = await notion.databases.query({
      database_id: process.env.ARTICLES_DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Category',
            select: {
              equals: 'Series Article',
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
      start_cursor: data?.next_cursor,
    })

    articlesInSeries = [...articlesInSeries, ...data.results]
  } while (data?.has_more)

  const articles = articlesInSeries.map((article) => ({
    title: article.properties.Name.title[0].plain_text,
    positionInSeries: article.properties['Position in Series'].number,
    slug: slugify(article.properties.Name.title[0].plain_text),
  }))

  return {
    props: {
      series: {
        title,
        description: description.replace(/(<([^>]+)>)/gi, ''),
        htmlDescription: description,
        articles,
      },
    },
    revalidate: 60,
  }
}

export default Series