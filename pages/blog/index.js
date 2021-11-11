import styled from 'styled-components'
import Container from 'components/Container'
import MultiList from 'components/MultiList'
import { lg } from 'utils/mediaQueries'
import SEO from 'components/SEO'
import slugify from 'utils/slugify'
import { Client } from '@notionhq/client'

const ArticleList = styled(MultiList)`
  max-width: 100vw;

  ${lg`
    padding: 0 2rem;
  `};
`

const Centered = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  margin: 0;

  ${lg`
    font-size: 2rem;
  `};
`

const BlogList = ({ articles }) => (
  <>
    <SEO
      title="Yet another blog"
      description="A collection of developer-focused, practical, web development blog posts written by Jon Meyers."
    />
    <Container>
      {articles.length > 0 ? (
        <ArticleList
          collection={articles}
          listPath="/blog"
          collectionPath="/series"
          individualPath="/blog"
        />
      ) : (
        <Centered>No blog posts!</Centered>
      )}
    </Container>
  </>
)

export const getStaticProps = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  let individualArticles = []
  let data = {}

  do {
    data = await notion.databases.query({
      database_id: process.env.ARTICLES_DATABASE_ID,
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

    individualArticles = [...individualArticles, ...data.results]
  } while (data?.has_more)

  individualArticles = individualArticles.map((article) => ({
    title: article.properties.Name.title[0].plain_text,
    slug: slugify(article.properties.Name.title[0].plain_text),
    description: article.properties.Description.rich_text[0].plain_text,
    publishedDate: article.properties['Published Date'].date.start,
  }))

  const seriesResults = await notion.databases.query({
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
          property: 'Is Published',
          checkbox: {
            equals: true,
          },
        },
      ],
    },
  })

  const series = await Promise.all(
    seriesResults.results.map(async (series) => {
      const articlesInSeries = await notion.databases.query({
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
      const itemsInCollection = articlesInSeries.results.length
      const collection = articlesInSeries.results
        .slice(0, 3)
        .map((article) => ({
          title: article.properties.Name.title[0].plain_text,
          positionInSeries: article.properties['Position in Series'].number,
          slug: slugify(article.properties.Name.title[0].plain_text),
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

  const articles = [...individualArticles, ...series].sort(
    (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
  )

  return {
    props: {
      articles,
    },
    revalidate: 60,
  }
}

export default BlogList
