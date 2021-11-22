import Container from 'components/Container'
import styled from 'styled-components'
import SEO from 'components/SEO'
import Breadcrumbs from 'components/Breadcrumbs'
import { lg } from 'utils/mediaQueries'
import slugify from 'utils/slugify'
import { Client } from '@notionhq/client'
import { NotionBlocksHtmlParser } from '@notion-stuff/blocks-html-parser'
import 'highlight.js/styles/night-owl.css'
import { useEffect } from 'react'
import { copyToClipboard } from 'utils/copyToClipboard'
import TableOfContents from 'components/TableOfContents'
import Body from 'components/Body'

const Title = styled.h1`
  margin: 3rem 0;

  ${lg`
    font-size: 3rem;
  `}
`

const Article = ({ article }) => {
  const breadcrumbTitle = article.isPartOfSeries
    ? article.seriesTitle
    : 'All Articles'
  const breadcrumbSlug = article.isPartOfSeries
    ? `/blog-series/${article.seriesSlug}`
    : '/blog'

  useEffect(() => {
    document.querySelectorAll('pre > code').forEach((element) => {
      element.addEventListener('click', () => {
        copyToClipboard(element.textContent)
        element.classList.add('copied')

        setTimeout(() => {
          element.classList.remove('copied')
        }, 2000)
      })
    })
  }, [])

  return (
    <Container>
      <Title>{article.title}</Title>
      <SEO title={article.title} description={article.description} />
      {article.isPartOfSeries ? (
        <TableOfContents
          series={article.articlesInSeries}
          title={breadcrumbTitle}
          slug={breadcrumbSlug}
        />
      ) : (
        <Breadcrumbs title={breadcrumbTitle} slug={breadcrumbSlug} />
      )}
      <Body html={article.html} />
    </Container>
  )
}

export const getStaticPaths = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  let articles = []
  let data = {}

  do {
    data = await notion.databases.query({
      database_id: process.env.ARTICLES_DATABASE_ID,
      filter: {
        or: [
          {
            property: 'Category',
            select: {
              equals: 'Article',
            },
          },
          {
            property: 'Category',
            select: {
              equals: 'Series Article',
            },
          },
        ],
      },
      start_cursor: data?.next_cursor,
    })

    articles = [...articles, ...data.results]
  } while (data?.has_more)

  const paths = articles
    // need to manually filter for `Published` because we can't
    // combine an `and` and an `or` in query
    .filter((article) => article.properties.status === 'Published')
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

  let articles = []
  let data = {}

  do {
    data = await notion.databases.query({
      database_id: process.env.ARTICLES_DATABASE_ID,
      filter: {
        or: [
          {
            property: 'Category',
            select: {
              equals: 'Article',
            },
          },
          {
            property: 'Category',
            select: {
              equals: 'Series Article',
            },
          },
        ],
      },
      start_cursor: data?.next_cursor,
    })

    articles = [...articles, ...data.results]
  } while (data?.has_more)

  const pageMetaData = articles.find(
    (article) => slugify(article.properties.Name.title[0].plain_text) === slug
  )

  data = {}
  let blockResults = []

  do {
    data = await notion.blocks.children.list({
      block_id: pageMetaData.id,
      start_cursor: data?.next_cursor,
    })
    blockResults = [...blockResults, ...data.results]
  } while (data?.has_more)

  let articleData = {}

  if (pageMetaData.properties.Category.select.name === 'Series Article') {
    const articlesInSeriesResults = await notion.databases.query({
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

    const articlesInSeries = articlesInSeriesResults.results.map((article) => ({
      title: article.properties.Name.title[0].plain_text,
      positionInSeries: article.properties['Position in Series'].number,
      slug: slugify(article.properties.Name.title[0].plain_text),
    }))

    const series = await notion.pages.retrieve({
      page_id: pageMetaData.properties.Series.relation[0].id,
    })

    const seriesTitle = series.properties.Name.title[0].plain_text

    articleData = {
      isPartOfSeries: true,
      seriesTitle,
      seriesSlug: slugify(seriesTitle),
      articlesInSeries,
    }
  }

  const blocks = blockResults.map((block) => {
    // Replace h1 with h2 - only the title should be h1 on the page
    if (block.type === 'heading_1') {
      const { heading_1, ...restOfBlock } = block

      return {
        ...restOfBlock,
        type: 'heading_2',
        heading_2: block.heading_1,
      }
    }

    return block
  })

  const article = {
    title: pageMetaData.properties.Name.title[0].plain_text,
    description: pageMetaData.properties.Description.rich_text[0].plain_text,
    html: NotionBlocksHtmlParser.getInstance().parse(blocks),
    ...articleData,
  }

  return {
    props: {
      article,
    },
    revalidate: 60,
  }
}

export default Article
