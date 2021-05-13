import { client } from 'utils/sanity'
import Container from 'components/Container'
import styled from 'styled-components'
import { md } from 'utils/mediaQueries'
import SEO from 'components/SEO'
import Breadcrumbs from 'components/Breadcrumbs'
import NumberedList from 'components/NumberedList'

const Title = styled.h1`
  font-size: 3rem;
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

const Courses = ({ courses: { title, description, lessons } }) => {
  return (
    <Container>
      <SEO title={title} description={description} />
      <Breadcrumbs title="All courses" slug="/courses" />
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

const allSlugsQuery = `
  *[_type=="course" && isPublished == true] {
    "slug": slug.current,
  }
`

export const getStaticPaths = async () => {
  const slugs = await client.fetch(allSlugsQuery)

  const paths = slugs.map(({ slug }) => ({
    params: {
      slug,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

const coursesQuery = `
  *[_type == 'course' && slug.current == $slug][0]{
    title,
    description,
    "lessons": *[_type == 'lesson' && references(^._id) && isPublished == true] | order(positionInCourse, asc) {
      title,
      "slug": slug.current,
    },
  }
`

export const getStaticProps = async ({ params: { slug } }) => {
  const courses = await client.fetch(coursesQuery, { slug })

  return {
    props: {
      courses,
    },
  }
}

export default Courses
