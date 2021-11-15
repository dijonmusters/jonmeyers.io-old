import styled from 'styled-components'
import Container from 'components/Container'
import { lg } from 'utils/mediaQueries'
import SEO from 'components/SEO'
import MultiList from 'components/MultiList'
import { Client } from '@notionhq/client'
import slugify from 'utils/slugify'

// TODO! Make this only video series!
// TODO! Male [slug].js only video series

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

const Courses = ({ courses }) => {
  return (
    <>
      <SEO
        title="Even more courses"
        description="A collection of developer-focused, practical, web development courses written by Jon Meyers."
      />
      <Container>
        {courses.length > 0 ? (
          <CourseList
            collection={courses}
            listPath="/courses"
            collectionPath="/courses"
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

  const coursesResults = await notion.databases.query({
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

  const courses = await Promise.all(
    coursesResults.results.map(async (series) => {
      const articlesInSeries = await notion.databases.query({
        database_id: process.env.ARTICLES_DATABASE_ID,
        filter: {
          and: [
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

  return {
    props: {
      courses,
    },
    revalidate: 60,
  }
}

export default Courses
